package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.MedicationDao;
import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.UomMaster;

@Repository
@Transactional
public class MedicationDaoImpl implements MedicationDao{

	@Autowired
	SessionFactory sessionFactory;
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(MedicationDaoImpl.class);
	
	@Override
	public String saveMedication(MedicationMaster medicationMaster,HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		medicationMaster.setUnitId(unitId);
		medicationMaster.setDeleted("N");
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MedicationMaster.class);
         criteria.add(Restrictions.eq("medicineName",medicationMaster.getMedicineName() ));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
       
		
		if(medicationMaster.getId()==0) {
			  if(criteria.uniqueResult() != null){
		        	 return "Medicine with this name alredy exist";
		         }
				 
			medicationMaster.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(medicationMaster);
			 return "Medicine Saved SuccessFully";
		}else {
			medicationMaster.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(medicationMaster);
			return "Medicine Updated SuccessFully";
		}
		
	}

	@Override
	public List<MedicationMaster> getMedication(HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MedicationMaster.class);
		 criteria.add(Restrictions.eq("deleted","N"));
		 criteria.add(Restrictions.eq("unitId",unitId));
		 List<MedicationMaster> medList = criteria.list();
		return medList;
	}

	@Override
	public List<CompanyMaster> getCompanies() {
		// TODO Auto-generated method stub
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CompanyMaster.class);
		 criteria.add(Restrictions.eq("compDeleteFlag", 0));
		 List<CompanyMaster> companyList = criteria.list();
		return companyList;
	}

	@Override
	public List<PreparationMaster> getPrepNames() {
		// TODO Auto-generated method stub
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PreparationMaster.class);
		 criteria.add(Restrictions.eq("preparationDeleteFlag", 0));
		 List<PreparationMaster> preparationList = criteria.list();
		return preparationList;
	}

	@Override
	public List<UomMaster> getUoms() {
		// TODO Auto-generated method stub
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UomMaster.class);
		 criteria.add(Restrictions.eq("uomDeleteFlag", 0));
		 List<UomMaster> uomList = criteria.list();
		return uomList;
	}

	@Override
	public List<MedicationMaster> getMedicationById(int id) {
		// TODO Auto-generated method stub
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MedicationMaster.class);
		 
		 criteria.add(Restrictions.eq("deleted","N"));
		 criteria.add(Restrictions.eq("id",id));
		 List<MedicationMaster>medicationById  = criteria.list();
		return medicationById;
	}

	@Override
	public MedicationMaster medicineAutoSuggestion(String productName, String prepName, String comName,String callFrom) {
		
		logger.info("-----IN MedicationDaoImpl autoSuggestionProductlist --> ");
		
		MedicationMaster medicationMaster = new MedicationMaster();
		List<MedicationMaster> mediList = new ArrayList<MedicationMaster>();
		String sql = "";
		if (callFrom.equals("medication")) {
			sql = medicineNameSuggestion(productName,prepName,comName);
		}
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> medRows = query.list();
		for (Map<String, Object> row : medRows) {
			MedicationMaster obj = new MedicationMaster();
			obj.setProductId((Integer)row.get("product_id"));
			obj.setProductName((String)row.get("product_name"));
			mediList.add(obj);
		}
		medicationMaster.setListMedication(mediList);
		
		logger.info("-----IN MedicationDaoImpl autoSuggestionProductlist --> object : " + medicationMaster);
		
		return medicationMaster;
	}

	 String medicineNameSuggestion(String productName, String prepName, String comName) {
		String sql = "select  p.product_id,p.product_name"
			    +" from pharma_product_master p where  p.product_name like '" + productName + "%' and p.product_delete_flag='0' and p.product_preparation_id="
				+ prepName + " and p.product_comp_id=" + comName;
		return sql;
	}

	@Override
	public List<MedicationMaster> getUnitAndStrength(int id) {
		// TODO Auto-generated method stub
		List<MedicationMaster> medList = new ArrayList<MedicationMaster>();
		String sql ="select u.uom_id, u.uom_name, s.strength_name from pharma_uom_master u inner join pharma_product_master p"
				    + " on  p.product_uom_id = u.uom_id inner join pharma_strength_master s on p.product_strength_id = s.strength_id where p.product_id="+id;
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> medRows = query.list();
		for (Map<String, Object> row : medRows) {
			MedicationMaster obj = new MedicationMaster();
			obj.setStrengthName((String)row.get("strength_name"));
			obj.setUomId((Integer)row.get("uom_id"));
			medList.add(obj);
		}
		return medList;
	}

	@Override
	public String deleteMedicines(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		MedicationMaster medicatioMaster = (MedicationMaster) sessionFactory.getCurrentSession().get(MedicationMaster.class,id);
		medicatioMaster.setDeleted("Y");
		medicatioMaster.setUnitId(unitId);
		medicatioMaster.setDeleted_by(userId);
		medicatioMaster.setDeletedDate(new Date());
		sessionFactory.getCurrentSession().saveOrUpdate(medicatioMaster);
		return "Medicine Deleted SuccessFully";
	}

	@Override
	public List<MedicationMaster> medSuggesstionForSearch(String productName,
			String callFrom,HttpServletRequest request) {
		 List<MedicationMaster> listOfMed =new ArrayList<MedicationMaster>();
		if (callFrom.equals("medication")) {
			
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MedicationMaster.class);
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		criteria.add(Restrictions.eq("deleted","N"));
		 criteria.add(Restrictions.eq("unitId",unitId));
		criteria.add(Restrictions.ilike("medicineName", productName, MatchMode.START));
		criteria.setMaxResults(10);
         listOfMed = criteria.list();
		}
		
      return listOfMed;
	}

	@Override
	public List<ProductMaster> autoSuggestionProductlist(String callForm, String letter, String prep, String comName) {

		logger.info("-----IN MedicationDaoImpl autoSuggestionProductlist --> ");

		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("shelfMaster", "shelfMaster")
					.createAlias("drugMaster", "drugMaster")
					.createAlias("taxMaster", "taxMaster")
					.createAlias("categoryMaster","categoryMaster");
			
			
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			//criteria.add(Restrictions.eq("cathlabFlag", 0));
			criteria.add(Restrictions.like("productName", letter, MatchMode.ANYWHERE));
			
	//		if(prep.trim() != "0") {
			if(!prep.equalsIgnoreCase("0")) {
				
				logger.info("-----IN  --> checking if(!prep.equalsIgnoreCase(0)), applying prep = " + prep + ", to criteria---");
				
				criteria.add(Restrictions.eq("preparationMaster.preparationId", Integer.parseInt(prep)));
			}
			
	//		if(comName.trim() != "0") {
			if(!comName.equalsIgnoreCase("0")) {
				
				logger.info("-----IN  --> checking if(!comName.equalsIgnoreCase(0)), applying comName = " + comName + ", to criteria---");
				
				criteria.add(Restrictions.eq("companyMaster.compId", Integer.parseInt(comName)));
			}
			
			criteria.setMaxResults(50);

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("productName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productUnit"));
			proList.add(Projections.property("drugMaster.drugName"));
			
			proList.add(Projections.property("productH1"));
			proList.add(Projections.property("productMinLevel"));
			proList.add(Projections.property("productPrescription"));
		//	
			proList.add(Projections.property("categoryMaster.catId"));
			
		// committed by akshata, 03 JAN 21
		//	proList.add(Projections.groupProperty("productName"));
			
			proList.add(Projections.property("taxMaster.taxId"));
			proList.add(Projections.property("taxMaster.taxRate"));
			

			criteria.setProjection(proList);
			

			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
					ProductMaster productMaster = new ProductMaster();
					productMaster.setProductName(master[0].toString());

					PackingMaster packingMaster = new PackingMaster();
					packingMaster.setPackType(master[1].toString());

					CompanyMaster companyMaster = new CompanyMaster();
					CategoryMaster categoryMaster=new CategoryMaster();
					companyMaster.setCompName(master[2].toString());

					ShelfMaster shelfMaster = new ShelfMaster();
					shelfMaster.setShelfName(master[3].toString());

					productMaster.setCompanyMaster(companyMaster);
					productMaster.setShelfMaster(shelfMaster);
					productMaster.setPackingMaster(packingMaster);
					productMaster.setProductId(Integer.parseInt(master[4]
							.toString()));
					productMaster.setProductUnit(Double.parseDouble(master[5]
							.toString()));

					DrugMaster drugMaster = new DrugMaster();
					drugMaster.setDrugName(master[6].toString());

					productMaster.setDrugMaster(drugMaster);

					if (master[7] != null && master[7] != "null") {
						productMaster.setProductH1(Integer.parseInt(master[7]
								.toString()));
					}
													
										
					if (master[8] != null && master[8] != "null") {
						productMaster.setProductMinLevel(Integer
								.parseInt(master[8].toString()));
					}else
						productMaster.setProductMinLevel(Integer
								.parseInt("0"));

					if (master[9] != null && master[9] != "null") {
						productMaster.setProductPrescription(Integer
								.parseInt(master[9].toString()));
					}

					if (master[10] != null && master[10] != "null")
					{
						categoryMaster.setCatId(Integer.parseInt((master[10].toString())));
					}
					
					productMaster.setCategoryMaster(categoryMaster);
					
					TaxMaster taxMaster=new TaxMaster();
					
					if (master[11] != null && master[11] != "null")
					{
						taxMaster.setTaxId(Integer.parseInt((master[11].toString())));
					}
					
					productMaster.setTaxMaster(taxMaster);
					
					ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		logger.info("-----IN MedicationDaoImpl autoSuggestionProductlist [ltProductMaster] --> " + ltProductMaster);
		
		return ltProductMaster;

	}
	
}
