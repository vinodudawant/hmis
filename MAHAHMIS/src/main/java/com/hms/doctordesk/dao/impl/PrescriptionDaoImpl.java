package com.hms.doctordesk.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.SharedSessionContract;
import org.hibernate.Transaction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.constants.GetNextDateFromCurrentDate;
import com.hms.doctordesk.controller.PrescriptionController;
import com.hms.doctordesk.dao.PresInstructionDao;
import com.hms.doctordesk.dao.PrescriptionDao;
import com.hms.doctordesk.dto.IPDNursingStationMedication;
import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.doctordesk.dto.OPDAllergyAlertsDto;
import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplateMedicineDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplatesDTO;
import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionGenericDTO;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.dto.Doctor;
import com.hms.ecogreenapi.EcogreenSendRequestDTO;
import com.hms.ecogreenapi.PharmaSaleOrderMasterDTO;
import com.hms.ecogreenapi.PharmaSaleOrderSlaveDTO;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabProfileTestCompDTO;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.organdonation.dto.OrganReactionDto;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.StrengthMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.UomMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.itextpdf.text.pdf.PdfStructTreeController.returnType;

@Repository
@Transactional
public class PrescriptionDaoImpl implements PrescriptionDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	RestTemplate restTemplate;
	
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(PrescriptionDaoImpl.class);
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<PrescriptionInstructionDto> getAllPreDetails(HttpServletRequest request) {
		
		logger.info("-----IN PrescriptionDaoImpl getAllPreDetails --> ");
		
		HttpSession session=request.getSession();
		//int unitId=(int)session.getAttribute("uId");
		List<PrescriptionInstructionDto> list = new ArrayList<>();
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			//criteria.add(Restrictions.eq("unitId",unitId));
			list = criteria.list();
		}catch (Exception e) {
			logger.error("getAllPreDetails Exception--> ",e);
		}
		return list;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<PreparationMaster> fetchPreparationMaster() {
		
		logger.info("-----IN PrescriptionDaoImpl fetchPreparationMaster --> ");
		
		List<PreparationMaster> list = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PreparationMaster.class);
			criteria.add(Restrictions.eq("preparationDeleteFlag",0));
			list = criteria.list();
		}
		catch (Exception e) {
			logger.error("--fetchPreparationMaster Exception--> ",e);
		}
		return list;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<RouteMaster> getRoutesByPreparationId(Integer prepID, Integer unitId, HttpServletRequest request) {
		
		logger.info("-----IN PrescriptionDaoImpl getRoutesByPreparationId --> ");
		
		List<RouteMaster> list = null;
		
			try {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RouteMaster.class);
				criteria.add(Restrictions.eq("deleted","N"));
				criteria.add(Restrictions.eq("preparation_id",prepID));
				criteria.add(Restrictions.eq("unitId",unitId));
				list = criteria.list();
			} catch (Exception e) {
				logger.error("getRoutesByPreparationId Exception--> ",e);
			}
		
		return list;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<RouteMaster> getAllRoutesForPrescription(Integer unitId, HttpServletRequest request) {
		
		logger.info("-----IN PrescriptionDaoImpl getRoutesByPreparationId --> ");
		
		List<RouteMaster> list = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RouteMaster.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			list = criteria.list();
		} catch (Exception e) {
			logger.error("getAllRoutesForPrescription Exception--> ",e);
		}
	
	return list;
	}


	@Override
	public int saveOPDPrescription(OPDPrescriptionDto obj, HttpServletRequest request, Integer productId) {
		
		logger.info("-----IN PrescriptionDaoImpl saveOPDPrescription --> ");
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getPrescriptionId() == 0) {
				
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
//				ProductMaster productMaster;
//				
//				if(productId > 0) {
//					
//					 productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, productId);
//					 obj.setProductMaster(productMaster);
//					 
//				} else {
//					
//					ProductMaster pp = new ProductMaster();
//					 obj.setProductMaster(pp);
//					
//				}
				
				ProductMaster productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, productId);
				 obj.setProductMaster(productMaster);
				
				 // get drug name and check nutracal_product
				 int drugId=0;
			     String drugName="";
			     int nutracalproduct=1;
			     
			      try {
			  String drugIdSql="select  product_drug_id from pharma_product_master where product_id="+productId+" ";
			      SQLQuery qdrug = sessionFactory.getCurrentSession().createSQLQuery(drugIdSql);
			      drugId=((Number) qdrug.uniqueResult()).intValue();
			      			  
			      }catch (Exception e) {
					e.printStackTrace();
				}
			     // obj.setDrugName(drugName);
			      obj.setDrugId(drugId);
				  // end drug name
				 
				//OPDPrescriptionDto opdPrescriptionDto = (OPDPrescriptionDto) sessionFactory.getCurrentSession().merge(obj);
				
					Session s=sessionFactory.openSession();
					Transaction tr=s.beginTransaction();
					OPDPrescriptionDto opdPrescriptionDto = (OPDPrescriptionDto) s.merge(obj);
				
				
				
				//currentSession.beginTransaction();
				String morning 			= "";
				String afternoon		= "";
				String evening			= "";
				String night			= "";
				SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
				//converting date to string
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				String dateInString = formatter.format(currentDate.getTime());
				IPDNursingStationMedication ipdNursingStationMedication = new IPDNursingStationMedication();
				String dayPrescription = opdPrescriptionDto.getDayPrescription();
				double days = opdPrescriptionDto.getDays();
				int intDays = (int)days;
				String[] split = dayPrescription.split(",");
				int count=1;
		for (int j = 0; j < intDays; j++) {
			
				
			//String dateInString2 = formatter.format(obj.getCreatedDate());
			Date curntDate = GetNextDateFromCurrentDate.covertStringToDate(dateInString, "dd/MM/yyyy");
			//System.err.println("Current date in date formtate"+curntDate);
			
			Date prepDate = GetNextDateFromCurrentDate.addDays(curntDate, j);
			//System.err.println("Precription date--->"+prepDate);
			
			//converting date to string
			String dateInString2 = formatter.format(prepDate);
			System.out.println("date in string formate  ==  "+dateInString);
					
				for (int i=0;i<split.length;i++) {
					
					
					
					if(i==0 && split[i].equalsIgnoreCase("1")){
						morning="Morning";
						//save ipd nursing station dashboard
						
						
						ipdNursingStationMedication.setTreatmentId(opdPrescriptionDto.getTreatmentId());
						ipdNursingStationMedication.setPrescriptionId(opdPrescriptionDto.getPrescriptionId());
						ipdNursingStationMedication.setDurationDays(String.valueOf(opdPrescriptionDto.getDays()));
						ipdNursingStationMedication.setDurrationCurrentDay(j+1);
						
						ipdNursingStationMedication.setDurationCurrentDate(dateInString2);
						ipdNursingStationMedication.setTimeslot(morning);
						ipdNursingStationMedication.setDoneBy(userId);
						ipdNursingStationMedication.setDoneDate(dateInString);
						ipdNursingStationMedication.setQuantity(opdPrescriptionDto.getQty());
						
						//sessionFactory.getCurrentSession().merge(ipdNursingStationMedication);
						s.merge(ipdNursingStationMedication);
					
					}
					if(i==1 && split[i].equalsIgnoreCase("1")) {
						afternoon="Afternoon";
						//save ipd nursing station dashboard
						
						ipdNursingStationMedication.setTreatmentId(opdPrescriptionDto.getTreatmentId());
						ipdNursingStationMedication.setPrescriptionId(opdPrescriptionDto.getPrescriptionId());
						ipdNursingStationMedication.setDurationDays(String.valueOf(opdPrescriptionDto.getDays()));
						ipdNursingStationMedication.setDurrationCurrentDay(j+1);
						
						ipdNursingStationMedication.setDurationCurrentDate(dateInString2);
						ipdNursingStationMedication.setTimeslot(afternoon);
						ipdNursingStationMedication.setDoneBy(userId);
						ipdNursingStationMedication.setDoneDate(dateInString);
						ipdNursingStationMedication.setQuantity(opdPrescriptionDto.getQty());
						//currentSession.save(ipdNursingStationMedication);
					//sessionFactory.getCurrentSession().merge(ipdNursingStationMedication);
						s.merge(ipdNursingStationMedication);
						
					}
					if(i==2 && split[i].equalsIgnoreCase("1")){
						evening="Evening";	
						//save ipd nursing station dashboard
						
						ipdNursingStationMedication.setTreatmentId(obj.getTreatmentId());
						ipdNursingStationMedication.setPrescriptionId(opdPrescriptionDto.getPrescriptionId());
						ipdNursingStationMedication.setDurationDays(String.valueOf(opdPrescriptionDto.getDays()));
						ipdNursingStationMedication.setDurrationCurrentDay(j+1);
						
						ipdNursingStationMedication.setDurationCurrentDate(dateInString2);
						ipdNursingStationMedication.setTimeslot(evening);
						ipdNursingStationMedication.setDoneBy(userId);
						ipdNursingStationMedication.setDoneDate(dateInString);
						ipdNursingStationMedication.setQuantity(opdPrescriptionDto.getQty());
						
						//sessionFactory.getCurrentSession().merge(ipdNursingStationMedication);
						s.merge(ipdNursingStationMedication);
						
					}
					if(i==3 && split[i].equalsIgnoreCase("1")) {
						night="Night";
						//save ipd nursing station dashboard
						
						ipdNursingStationMedication.setTreatmentId(opdPrescriptionDto.getTreatmentId());
						ipdNursingStationMedication.setPrescriptionId(opdPrescriptionDto.getPrescriptionId());
						ipdNursingStationMedication.setDurationDays(String.valueOf(opdPrescriptionDto.getDays()));
						ipdNursingStationMedication.setDurrationCurrentDay(j+1);
						
						ipdNursingStationMedication.setDurationCurrentDate(dateInString2);
						ipdNursingStationMedication.setTimeslot(night);
						ipdNursingStationMedication.setDoneBy(userId);
						ipdNursingStationMedication.setDoneDate(dateInString);
						ipdNursingStationMedication.setQuantity(opdPrescriptionDto.getQty());
						//currentSession.save(ipdNursingStationMedication);
					//sessionFactory.getCurrentSession().merge(ipdNursingStationMedication);
						s.merge(ipdNursingStationMedication);
						
						}
					
				}
		}	
				//currentSession.getTransaction().commit();
		 s.flush();
		 tr.commit();
		 System.out.println("opdPrescriptionDto.getProductMaster()===="+opdPrescriptionDto.getProductMaster());
		
		 //if(opdPrescriptionDto.getProductMaster() !=null )
		     //   saleOrderDeatils(opdPrescriptionDto.getPrescriptionId());//added for send the data to ecogreen
				
		 return 1;
				
			
				
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				ProductMaster productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, productId);
				obj.setProductMaster(productMaster);
				
				 // get drug name and check nutracal_product
			     int drugId=0;
			     String drugName="";
			     int nutracalproduct=1;
			     
			      try {
			  String drugIdSql="select  product_drug_id from pharma_product_master where product_id="+productId+" ";
			      SQLQuery qdrug = sessionFactory.getCurrentSession().createSQLQuery(drugIdSql);
			      drugId=((Number) qdrug.uniqueResult()).intValue();
			      
			   //   String drugNameSql="select  drug_name from pharma_drug_master where drug_id="+drugId+" ";
			     // SQLQuery qdrugName = sessionFactory.getCurrentSession().createSQLQuery(drugNameSql);
			    //  drugName=(String) qdrugName.uniqueResult();
			      
			      }catch (Exception e) {
					e.printStackTrace();
				}
			     // obj.setDrugName(drugName);
			      obj.setDrugId(drugId);
			      
			     
			  // end drug name
			
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<ProductMaster> autoSuggestionProductlist(String letter, String prep) {
		
		logger.info("-----IN PrescriptionDaoImpl autoSuggestionProductlist --> ");

		List<ProductMaster> ltProductMaster = new ArrayList<ProductMaster>();
		
//		try {
//			
//			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProductMaster.class);
//			
//			criteria.add(Restrictions.eq("productDeleteFlag", 0));
//			criteria.add(Restrictions.like("productName", letter, MatchMode.ANYWHERE));
//			
//			
//				if(!prep.equalsIgnoreCase("0")) {
//					
//					logger.info("-----IN  --> checking if(!prep.equalsIgnoreCase(0)), applying prep = " + prep + ", to criteria---");
//					
//					criteria.add(Restrictions.eq("preparationMaster.preparationId", Integer.parseInt(prep)));
//				}
//				
//			criteria.setMaxResults(50);
//			
//			ltProductMaster = criteria.list();
//			
//			
//		} catch (Exception e) {
//			
//			e.printStackTrace();
//		}
//		
//		return ltProductMaster;
		
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
		
		return ltProductMaster;
	
	}


	@SuppressWarnings("unchecked")
	@Override
	public ProductMaster getMedicineById(Integer productId) {
		
		ProductMaster productMaster = new ProductMaster();
		
		try {
		//	Criteria criteria = sessionFactory.getCurrentSession()
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ProductMaster.class)
					.createAlias("packingMaster", "packingMaster")
					.createAlias("companyMaster", "companyMaster")
					.createAlias("drugMaster", "drugMaster")
					.createAlias("shelfMaster", "shelfMaster")
					.createAlias("categoryMaster", "categoryMaster")
					.createAlias("uomMaster", "uomMaster")
					.createAlias("preparationMaster", "preparationMaster")
					.createAlias("strengthMaster", "strengthMaster")
					.createAlias("taxMaster", "taxMaster");
			
			criteria.add(Restrictions.eq("productDeleteFlag", 0));
			
			
			if (productId != 0) {
				criteria.add(Restrictions.eq("productId", productId));
			}

			ProjectionList proList = Projections.projectionList();

			proList.add(Projections.property("productName"));
			proList.add(Projections.property("productId"));
			proList.add(Projections.property("productShortName"));
			proList.add(Projections.property("companyMaster.compName"));
			proList.add(Projections.property("packingMaster.packType"));
			proList.add(Projections.property("categoryMaster.catName"));
			proList.add(Projections.property("uomMaster.uomName"));
			proList.add(Projections.property("drugMaster.drugName"));
			proList.add(Projections.property("shelfMaster.shelfName"));
			proList.add(Projections.property("productUnit"));
			proList.add(Projections.property("productShortList"));
			proList.add(Projections.property("productSaleDisc"));
			proList.add(Projections.property("productBillingMust"));
			proList.add(Projections.property("productH1"));
			proList.add(Projections.property("rateEqualsMrp"));
			proList.add(Projections.property("productNrx"));
			proList.add(Projections.property("productBatch"));
			proList.add(Projections.property("productMinLevel"));
			proList.add(Projections.property("productMaxLevel"));
			proList.add(Projections.property("productDesc"));
			proList.add(Projections.property("productPhotoUrl"));
			proList.add(Projections.property("productMarginRate"));
			proList.add(Projections.property("productFixDiscount"));
			proList.add(Projections.property("productScheme1"));
			proList.add(Projections.property("productScheme1Qty"));
			proList.add(Projections.property("productScheme2"));
			proList.add(Projections.property("productScheme2Qty"));
			proList.add(Projections.property("productScheme3"));
			proList.add(Projections.property("productScheme3Qty"));
			proList.add(Projections.property("companyMaster.compId"));
			proList.add(Projections.property("packingMaster.packId"));
			proList.add(Projections.property("categoryMaster.catId"));
			proList.add(Projections.property("uomMaster.uomId"));
			proList.add(Projections.property("drugMaster.drugId"));
			proList.add(Projections.property("shelfMaster.shelfId"));
			proList.add(Projections
					.property("preparationMaster.preparationName"));
			
			proList.add(Projections.property("strengthMaster.strengthName"));
			proList.add(Projections.property("preparationMaster.preparationId"));
			proList.add(Projections.property("strengthMaster.strengthId"));
			proList.add(Projections.property("productX"));
			proList.add(Projections.property("productNdps"));
			proList.add(Projections.property("productPrescription"));
			proList.add(Projections.property("cathlabFlag"));
			proList.add(Projections.property("hsn"));
			proList.add(Projections.property("taxMaster.taxId"));
			proList.add(Projections
					.property("preparationMaster.preparationQty"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();

			for (Object[] master : result) {
				if (master[0] != null) {
				//	ProductMaster productMaster = new ProductMaster();

					if (master[1] != null)
						productMaster.setProductId(Integer.parseInt(master[1]
								.toString()));
					/*
					 * else productMaster.setProductId(0);
					 */

					if (master[0] != null)
						productMaster.setProductName(master[0].toString());
					else
						productMaster.setProductName("");

					if (master[2] != null)
						productMaster.setProductShortName(master[2].toString());
					else
						productMaster.setProductShortName("");

					CompanyMaster companyMaster = new CompanyMaster();
					if (master[3] != null)
						companyMaster.setCompName(master[3].toString());
					else
						companyMaster.setCompName("");

					PackingMaster packingMaster = new PackingMaster();
					if (master[4] != null)
						packingMaster.setPackType(master[4].toString());
					else
						packingMaster.setPackType("");

					CategoryMaster categoryMaster = new CategoryMaster();
					if (master[5] != null)
						categoryMaster.setCatName(master[5].toString());
					else
						categoryMaster.setCatName("");

					UomMaster uomMaster = new UomMaster();
					if (master[6] != null)
						uomMaster.setUomName(master[6].toString());
					else
						uomMaster.setUomName("");

					DrugMaster drugMaster = new DrugMaster();
					if (master[7] != null)
						drugMaster.setDrugName(master[7].toString());
					else
						drugMaster.setDrugName("");

					ShelfMaster shelfMaster = new ShelfMaster();
					if (master[7] != null)
						shelfMaster.setShelfName(master[8].toString());
					else
						shelfMaster.setShelfName("");

					productMaster.setCompanyMaster(companyMaster);
					productMaster.setPackingMaster(packingMaster);
					productMaster.setCategoryMaster(categoryMaster);
					productMaster.setUomMaster(uomMaster);
					productMaster.setDrugMaster(drugMaster);
					productMaster.setShelfMaster(shelfMaster);

					if (master[9] != null)
						productMaster.setProductUnit(Double
								.parseDouble(master[9].toString()));
					/*
					 * else
					 * productMaster.setProductUnit(0.0);
					 */

					if (master[10] != null)
						productMaster.setProductShortList(Integer
								.parseInt(master[10].toString()));
					else
						productMaster
								.setProductShortList(Integer.parseInt("0"));

					if (master[11] != null)
						productMaster.setProductSaleDisc(Integer
								.parseInt(master[11].toString()));
					else
						productMaster.setProductSaleDisc(Integer.parseInt("0"));

					if (master[12] != null)
						productMaster.setProductBillingMust(Integer
								.parseInt(master[12].toString()));
					else
						productMaster.setProductBillingMust(Integer
								.parseInt("0"));

					if (master[13] != null)
						productMaster.setProductH1(Integer.parseInt(master[13]
								.toString()));
					else
						productMaster.setProductH1(Integer.parseInt("0"));

					if (master[14] != null)
						productMaster.setRateEqualsMrp(Integer
								.parseInt(master[14].toString()));
					else
						productMaster.setRateEqualsMrp(Integer.parseInt("0"));

					if (master[15] != null)
						productMaster.setProductNrx(Integer.parseInt(master[15]
								.toString()));
					else
						productMaster.setProductNrx(Integer.parseInt("0"));

					if (master[16] != null)
						productMaster.setProductBatch(Integer
								.parseInt(master[16].toString()));
					else
						productMaster.setProductBatch(Integer.parseInt("0"));

					if (master[17] != null)
						productMaster.setProductMinLevel(Integer
								.parseInt(master[17].toString()));
					/*
					 * else
					 * productMaster.setProductMinLevel(0);
					 */

					if (master[18] != null)
						productMaster.setProductMaxLevel(Integer
								.parseInt(master[18].toString()));
					/*
					 * else
					 * productMaster.setProductMaxLevel(0);
					 */

					if (master[19] != null)
						productMaster.setProductDesc(master[19].toString());
					else
						productMaster.setProductDesc("");

					if (master[20] != null)
						productMaster.setProductPhotoUrl(master[20].toString());
					else
						productMaster.setProductPhotoUrl("");

					if (master[21] != null)
						productMaster.setProductMarginRate(Double
								.parseDouble(master[21].toString()));
					else
						productMaster.setProductMarginRate(Double
								.parseDouble("0"));

					if (master[22] != null)
						productMaster.setProductFixDiscount(Double
								.parseDouble(master[22].toString()));
					else
						productMaster.setProductFixDiscount(Double
								.parseDouble("0"));

					if (master[23] != null)
						productMaster.setProductScheme1(Double
								.parseDouble(master[23].toString()));
					else
						productMaster
								.setProductScheme1(Double.parseDouble("0"));

					if (master[24] != null)
						productMaster.setProductScheme1Qty(Double
								.parseDouble(master[24].toString()));
					else
						productMaster.setProductScheme1Qty(Double
								.parseDouble("0"));

					if (master[25] != null)
						productMaster.setProductScheme2(Double
								.parseDouble(master[25].toString()));
					else
						productMaster
								.setProductScheme2(Double.parseDouble("0"));

					if (master[26] != null)
						productMaster.setProductScheme2Qty(Double
								.parseDouble(master[26].toString()));
					else
						productMaster.setProductScheme2Qty(Double
								.parseDouble("0"));

					if (master[27] != null)
						productMaster.setProductScheme3(Double
								.parseDouble(master[27].toString()));
					else
						productMaster
								.setProductScheme3(Double.parseDouble("0"));

					if (master[28] != null)
						productMaster.setProductScheme3Qty(Double
								.parseDouble(master[28].toString()));
					else
						productMaster.setProductScheme3Qty(Double
								.parseDouble("0"));

					if (master[29] != null)
						productMaster.getCompanyMaster().setCompId(
								Integer.parseInt(master[29].toString()));

					if (master[30] != null)
						productMaster.getPackingMaster().setPackId(
								Integer.parseInt(master[30].toString()));

					if (master[31] != null)
						productMaster.getCategoryMaster().setCatId(
								Integer.parseInt(master[31].toString()));

					if (master[32] != null)
						productMaster.getUomMaster().setUomId(
								Integer.parseInt(master[32].toString()));

					if (master[33] != null)
						productMaster.getDrugMaster().setDrugId(
								Integer.parseInt(master[33].toString()));

					if (master[34] != null)
						productMaster.getShelfMaster().setShelfId(
								Integer.parseInt(master[34].toString()));

					PreparationMaster preparationMaster = new PreparationMaster();
					if (master[35] != null)
						preparationMaster.setPreparationName(master[35]
								.toString());
					else
						preparationMaster.setPreparationName("");

					StrengthMaster strengthMaster = new StrengthMaster();
					if (master[36] != null)
						strengthMaster.setStrengthName(master[36].toString());
					else
						strengthMaster.setStrengthName("");

					if (master[37] != null)
						preparationMaster.setPreparationId(Integer
								.parseInt(master[37].toString()));
					else
						preparationMaster
								.setPreparationId(0);

					if (master[38] != null)
						strengthMaster.setStrengthId(Integer
								.parseInt(master[38].toString()));
					else
						strengthMaster.setStrengthId(0);

					productMaster.setPreparationMaster(preparationMaster);
					productMaster.setStrengthMaster(strengthMaster);

					if (master[39] != null)
						productMaster.setProductX(Integer.parseInt(master[39]
								.toString()));
					else
						productMaster.setProductX(Integer.parseInt("0"));

					if (master[40] != null)
						productMaster.setProductNdps(Integer
								.parseInt(master[40].toString()));
					else
						productMaster.setProductNdps(Integer.parseInt("0"));

					if (master[41] != null)
						productMaster.setProductPrescription(Integer
								.parseInt(master[41].toString()));
					else
						productMaster.setProductPrescription(Integer.parseInt("0"));
					
					
					if (master[42] != null)
						productMaster.setCathlapFlag(Integer
								.parseInt(master[42].toString()));
					else
						productMaster.setCathlapFlag(0);
					
					if (master[43] != null)
						productMaster.setHsn(master[43].toString());
					else
						productMaster.setHsn("");
					
					TaxMaster txt=new TaxMaster();
					
					if (master[44] != null)
						txt.setTaxId(Integer.parseInt(master[44].toString()));
					else
						txt.setTaxId(Integer.parseInt(("0").toString()));
					
					if (master[45] != null)
						preparationMaster.setPreparationQty(master[45].toString());
					else
						preparationMaster.setPreparationQty("0");
					
					productMaster.setTaxMaster(txt);
					

//					List<VendorMaster> vendorMastersMasters = getVendorByProductId(Integer
//							.parseInt(master[1].toString()));
//					productMaster.setVendorMasters(vendorMastersMasters);

					// ltProductMaster.add(productMaster);
				}
			}

		} catch (Exception e) {
			
			System.err.println(e.getMessage());
			System.out.println(e.getCause());
			e.printStackTrace();
		}
		
		return productMaster;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<UomMaster> fetchAllUnits(HttpServletRequest request) {
		
		logger.info("-----IN PrescriptionDaoImpl fetchAllUnits --> ");
		
		List<UomMaster> list = new ArrayList<>();
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UomMaster.class);
			criteria.add(Restrictions.eq("uomDeleteFlag", 0));
			list = criteria.list();
			
		}catch (Exception e) {
			logger.error("fetchAllUnits Exception--> ",e);
		}
		return list;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId) { 
		
				logger.info("-----IN PrescriptionDaoImpl getAllPrescriptionsByTreatmentId  --> ");
				
				List<OPDPrescriptionDtoSP> lists = new ArrayList<>();
				
				try {
					
		            Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_opd_prescription_data(:unitId, :treatmentId)");
		            prescriptionSP.setParameter("unitId", unitId);
		            prescriptionSP.setParameter("treatmentId", treatmentId);
		            
		            prescriptionSP.setResultTransformer(new AliasToBeanResultTransformer(OPDPrescriptionDtoSP.class));
		            
		            lists = prescriptionSP.list();
		            
		            System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : result lists size: " + lists.size());
		            
					
				} catch (Exception e) {
					logger.error("getAllPrescriptionsByTreatmentId Exception--> ",e);
				}
				
				
					for(OPDPrescriptionDtoSP obj : lists) {
						
						if(obj.getMedicineId() == 0 || obj.getMedicineId() == null) {
							
							//Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrescriptionId()+"'");
							Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrep()+"'");
							String preName = (String)query.uniqueResult();
							
							System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - preName: " + preName);
							obj.setPrepName(preName);
							
							//	obj.setUnitName(fetchUnitName(obj.getMedicineId()));
							
							Query query1 = sessionFactory.getCurrentSession().createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
							String unitName = (String)query1.uniqueResult();
							
							System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - unitName: " + unitName);
							if(unitName != null) {
							obj.setUnitName(unitName);
							}else {
								obj.setUnitName("-");
							}
							obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));// for print
							obj.setInstructionNameForUI(fetchInstructionNamesForUI(obj.getInstruction(), obj.getUnitId()));// for UI
							
						} else {
							
							obj.setPrepName(fetchPrepName(obj.getMedicineId()));
							obj.setUnitName(fetchUnitName(obj.getMedicineId()));
							obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
							obj.setInstructionNameForUI(fetchInstructionNamesForUI(obj.getInstruction(), obj.getUnitId()));
						}
						//get route
						String routeName="";
						String routeUnicode="";
						String sqlR=" select count(*) from dd_route_master where route_id="+obj.getRoute()+" and deleted='N' ";
					    int countR=((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlR).uniqueResult()).intValue();
					    if(countR > 0) {
					    	String sqlRu=" select ifnull(routename,'') as routename from dd_route_master where route_id="+obj.getRoute()+" and deleted='N' ";
					    	routeName=(String) sessionFactory.getCurrentSession().createSQLQuery(sqlRu).uniqueResult();
					    	
					    	 sqlRu=" select ifnull(routeUnicode,'') as routeUnicode from dd_route_master where route_id="+obj.getRoute()+" and deleted='N' ";
					    	 routeUnicode=(String) sessionFactory.getCurrentSession().createSQLQuery(sqlRu).uniqueResult();
					    }
					    obj.setRouteName(routeName);
					    obj.setRouteUnicode(routeUnicode);
					 // for Nutrical 
						 int nutrcalProductFlag=1;
						
						 if(obj.getMedicineId() > 0) {
								 String sql="select  nutracal_product from  pharma_product_master where  product_id ="+obj.getMedicineId()+"";
								 nutrcalProductFlag= ((Number) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
						 }
						 obj.setNutracalProductFlag(nutrcalProductFlag);
						 
						// end for Nutrical
						 String sql="select  ifnull(ecogreen_prescription_id,0) as ecogreen_prescription_id  from opd_prescription  where prescription_id ="+obj.getPrescriptionId()+" ";
					  SQLQuery q= sessionFactory.getCurrentSession().createSQLQuery(sql);
					int  ecogreenPrescrptionId=((Number) q.uniqueResult()).intValue();
					
					 obj.setEcogreenPrescrptionId(ecogreenPrescrptionId);
					
					}
					
					
					
					System.err.println("------------> getAllPrescriptionsByTreatmentId SP---> " + lists);
			
			return lists;
	}


	


	public String fetchInstructionNames(Integer instruction, Integer unitId) {
		
		logger.error("fetchInstructionNames for ID : --> " + instruction);
		
		if(instruction == 0) {
			
			return "-/-/-";
			
		} else {
			
			PrescriptionInstructionDto instrDTO = new PrescriptionInstructionDto();
			
			try {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
				criteria.add(Restrictions.eq("id", instruction));
				criteria.add(Restrictions.eq("unitId", unitId));
				
				instrDTO = (PrescriptionInstructionDto) criteria.uniqueResult();
				
			}catch (Exception e) {
				logger.error("fetchInstructionNames Exception--> ",e);
			}
			
			//return instrDTO.getEnglishInstruction() + "/" + instrDTO.getHindiInstruction() + "/" + instrDTO.getMarathiInstruction();
			return instrDTO.getEnglishInstruction() + "/" + instrDTO.getUnicodeHindi() + "/" + instrDTO.getUnicode();
		}

}


	public String fetchPrepName(Integer medId) {
		ProductMaster productMaster = new ProductMaster();

		try {

			productMaster = getMedicineById(medId);

		} catch (Exception e) {
			e.printStackTrace();
		}

		if(productMaster.getPreparationMaster().getPreparationName() !=null) {
			return productMaster.getPreparationMaster().getPreparationName();			
		}else {
			return "-";
		}

	}
	
	
	public String fetchUnitName(Integer medicineId) {

		ProductMaster productMaster = new ProductMaster();

		try {

			productMaster = getMedicineById(medicineId);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return productMaster.getUomMaster().getUomName();
	}


	@SuppressWarnings("unchecked")
	@Override
	public OPDPrescriptionDtoSP getPrescriptionById(Integer unitId, Integer prescriptionId) {
		
		
		logger.info("-----IN PrescriptionDaoImpl getPrescriptionById  --> ");
		
		List<OPDPrescriptionDtoSP> lists = new ArrayList<>();
		
		try {
			
            Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_opd_prescription_data_by_presc_id(:unitId, :prescriptionId)");
            prescriptionSP.setParameter("unitId", unitId);
            prescriptionSP.setParameter("prescriptionId", prescriptionId);
            
            prescriptionSP.setResultTransformer(new AliasToBeanResultTransformer(OPDPrescriptionDtoSP.class));
            
            lists = prescriptionSP.list();
            
			
		} catch (Exception e) {
			logger.error("getAllPrescriptionsByTreatmentId Exception--> ",e);
		}
		
		
			for(OPDPrescriptionDtoSP obj : lists) {
				
				
				if(obj.getMedicineId() == 0 || obj.getMedicineId() == null) {
					
					Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrescriptionId()+"'");
					String preName = (String)query.uniqueResult();
					
					System.out.println("PrescriptionDaoImpl getPrescriptionById : general medicine - preName: " + preName);
					obj.setPrepName(preName);
					
					//	obj.setUnitName(fetchUnitName(obj.getMedicineId()));
					
					Query query1 = sessionFactory.getCurrentSession().createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
					String unitName = (String)query1.uniqueResult();
					
					System.out.println("PrescriptionDaoImpl getPrescriptionById : general medicine - unitName: " + unitName);
					obj.setUnitName(unitName);
					
					obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
					
				} else {
				
					obj.setPrepName(fetchPrepName(obj.getMedicineId()));
					obj.setUnitName(fetchUnitName(obj.getMedicineId()));
					obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
				}
			}
			
			System.err.println("------NEW------> getPrescriptionById SP---> " + lists);
			
	
		return lists.get(0);
	
	}


	@Override
	//public boolean deleteOPDPrescription(Integer unitId, Integer prescriptionId, HttpServletRequest request) {
	public boolean deleteOPDPrescription(Integer unitId, String prescriptionId, HttpServletRequest request) {	
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			//Changed by Akshata 4-April-2022
			String prescriptionArrId [] = prescriptionId.split(",");
			System.out.println("prescriptionArrId-----"+prescriptionArrId);
			for (int i = 0; i < prescriptionArrId.length; i++) {	
			OPDPrescriptionDto obj = (OPDPrescriptionDto) sessionFactory.getCurrentSession().get(OPDPrescriptionDto.class, Integer.parseInt(prescriptionArrId[i]));
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			}
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}


	@Override
	public int saveOPDPrescriptionTemplates(OPDPrescriptionTemplatesDTO obj, HttpServletRequest request) {

		logger.info("-----IN PrescriptionDaoImpl saveOPDPrescriptionTemplates --> ");
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer doctorId = (Integer) session.getAttribute("doctorId");
			if (obj.getTemplateId() == 0) {
				
				String sql = "select ifnull(count(template_id),0) from opd_prescription_templates where deleted='N' and template_name ='"+obj.getTemplateName()+"' ";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int count = ((Number)refQuery.uniqueResult()).intValue();
				
				if(count == 0){
			
				
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				obj.setDoctorName(getDoctorNameByUserId(doctorId));
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
			} else{
				
					return 3;
				}
			}else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				obj.setDoctorName(getDoctorNameByUserId(doctorId));
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	
	}


	private String getDoctorNameByUserId(Integer doctorId) {
		
		logger.info("-----IN PrescriptionDaoImpl doctorId :  --> " + doctorId);
		
		Doctor doctor = new Doctor();
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("Doctor_ID", doctorId));
			doctor = (Doctor) criteria.uniqueResult();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		logger.info("-----IN PrescriptionDaoImpl getDoctorNameByUserId --> " + doctor.getDoc_name());
		
		return doctor.getDoc_name();
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<OPDPrescriptionTemplatesDTO> fetchOPDPrescriptionTemplatesByID(Integer templateId, HttpServletRequest request) {
		
		List<OPDPrescriptionTemplatesDTO> list = new ArrayList<OPDPrescriptionTemplatesDTO>();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionTemplatesDTO.class);
		
		if(templateId == 0) {
			
			 logger.info("-----IN PrescriptionDaoImpl fetchOPDPrescription template ID is 0 -- ");
			
			try {
				
				criteria.add(Restrictions.eq("deleted", "N"));
				list = criteria.list();
				
			}catch (Exception e) {
				logger.error("PrescriptionDaoImpl Exception--> ",e);
			}
			
			 return list;
			
		} else {
			
			logger.info("-----IN PrescriptionDaoImpl fetchOPDPrescription template ID is  -- " + templateId);
			
			try {
					criteria.add(Restrictions.eq("deleted", "N"));
					criteria.add(Restrictions.eq("templateId", templateId));
					
					//OPDPrescriptionTemplatesDTO opdPrescDto = new OPDPrescriptionTemplatesDTO();
					//opdPrescDto = (OPDPrescriptionTemplatesDTO) criteria.uniqueResult();
					list = criteria.list();
					
					//opdPrescDto.setListOPDPrescriptionTemplateMedicineDto(getMedicinesForOPDTemplate(opdPrescDto));
					list.get(0).setListOPDPrescriptionTemplateMedicineDto(getMedicinesForOPDTemplate(list.get(0)));
					
					//list.add(opdPrescDto);
				
			}catch (Exception e) {
				logger.error("PrescriptionDaoImpl Exception--> ",e);
			}
		}
		
		logger.info("-----IN PrescriptionDaoImpl fetchOPDPrescriptionTemplatesByID --> WithMedicineList :  " + list);

		 return list;
		
	}


	@SuppressWarnings("unchecked")
	private List<OPDPrescriptionTemplateMedicineDto> getMedicinesForOPDTemplate(OPDPrescriptionTemplatesDTO opdPrescDto) {
		
		List<OPDPrescriptionTemplateMedicineDto> list = new ArrayList<OPDPrescriptionTemplateMedicineDto>();
				
				try {
					
					Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionTemplateMedicineDto.class);
					criteria.add(Restrictions.eq("deleted","N"));
					criteria.add(Restrictions.eq("opdPrescriptionTemplatesDto", opdPrescDto));
					list = criteria.list();
					
					logger.error("getMedicinesForOPDTemplate list size : --> " + list.size() + "-- list contents  : " + list );
					
				}catch (Exception e) {
					logger.error("getMedicinesForOPDTemplate Exception--> ",e);
				}
				
			 return list;
	}


	@Override
	public int saveUpdateOPDPrescTempMeds(OPDPrescriptionTemplateMedicineDto obj, HttpServletRequest request, Integer templateId) {
		

		
		logger.info("-----IN PrescriptionDaoImpl saveUpdateOPDPrescTempMeds --> ");
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getTemplateMedicineId() == 0) {
				
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				OPDPrescriptionTemplatesDTO opdPrescriptionTemplatesDTO = (OPDPrescriptionTemplatesDTO) sessionFactory.getCurrentSession()
																			.get(OPDPrescriptionTemplatesDTO.class, templateId);
				
				obj.setOpdPrescriptionTemplatesDto(opdPrescriptionTemplatesDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				OPDPrescriptionTemplatesDTO opdPrescriptionTemplatesDTO = (OPDPrescriptionTemplatesDTO) sessionFactory.getCurrentSession()
																			.get(OPDPrescriptionTemplatesDTO.class, templateId);
				
				obj.setOpdPrescriptionTemplatesDto(opdPrescriptionTemplatesDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}


	@Override
	public OPDPrescriptionTemplateMedicineDto getOPDPrescriptionTemplateMedicineById(Integer unitId, Integer templateMedicineId) {
		
		OPDPrescriptionTemplateMedicineDto dto = new OPDPrescriptionTemplateMedicineDto();
			
			try {
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionTemplateMedicineDto.class);
				criteria.add(Restrictions.eq("deleted","N"));
				criteria.add(Restrictions.eq("templateMedicineId", templateMedicineId));
				dto = (OPDPrescriptionTemplateMedicineDto) criteria.uniqueResult();
				
			}catch (Exception e) {
				e.printStackTrace();
			}
			
			logger.info("-----IN PrescriptionDaoImpl getOPDPrescriptionTemplateMedicineById --> " + dto);
			
			return dto;
		}


	@Override
	public boolean deleteOPDPrescriptionTemplateMedicine(Integer unitId, Integer templateMedicineId, HttpServletRequest request) {
		
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			OPDPrescriptionTemplateMedicineDto obj = (OPDPrescriptionTemplateMedicineDto) sessionFactory.getCurrentSession().get(OPDPrescriptionTemplateMedicineDto.class, templateMedicineId);
			
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}


	@Override
	public boolean usePrescriptionTemp(Integer treatmentId, Integer patientId, Integer templateId, HttpServletRequest request) {
		
		logger.info("-----IN PrescriptionDaoImpl usePrescriptionTemp --> " );
		
		List<OPDPrescriptionTemplatesDTO> listOPDPrescriptionTemplatesDTO = new ArrayList<>();
		
		OPDPrescriptionDto opdPrescription = new OPDPrescriptionDto();
		
		try {
			
			listOPDPrescriptionTemplatesDTO = fetchOPDPrescriptionTemplatesByID(templateId, request);
			
			for(OPDPrescriptionTemplatesDTO dto  : listOPDPrescriptionTemplatesDTO) {
				
				for(OPDPrescriptionTemplateMedicineDto medDto : dto.getListOPDPrescriptionTemplateMedicineDto()) {
					
					opdPrescription.setPrescriptionId(0);
					opdPrescription.setPatientId(patientId);
					opdPrescription.setTreatmentId(treatmentId);
					opdPrescription.setPrep(medDto.getPrep());
					opdPrescription.setMedicineName(medDto.getMedicineName());
					opdPrescription.setStrength(medDto.getStrength());
					opdPrescription.setUnit(medDto.getUnit());
					opdPrescription.setDose(medDto.getDose());
					opdPrescription.setFrequency(medDto.getFrequency());
					opdPrescription.setInstruction(medDto.getInstruction());
					opdPrescription.setRoute(medDto.getRoute());
					opdPrescription.setDays(medDto.getDays());
					opdPrescription.setQty(medDto.getQty());
					opdPrescription.setPaediatricsMedicineFlag("N");
					opdPrescription.setPaediatricsMedicineCapacity(0);
					opdPrescription.setDayPrescription(medDto.getDayPrescription());
					
				    saveOPDPrescription(opdPrescription, request, medDto.getMedicineID());
					
				}
			}
			
			return true;
			
		}catch (Exception e) {
			
			e.printStackTrace();
			return false;
		}
		
	}


	@Override
	public boolean deleteOPDPrescriptionTemplate(Integer unitId, Integer templateId, HttpServletRequest request) {
		
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			OPDPrescriptionTemplatesDTO obj = (OPDPrescriptionTemplatesDTO) sessionFactory.getCurrentSession().get(OPDPrescriptionTemplatesDTO.class, templateId);
			
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			
			sessionFactory.getCurrentSession().merge(obj);
			
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}


	@Override
	public String addPrescriptionAsNEWOPDTemplate(OPDPrescriptionTemplatesDTO obj, String[] prescriptionIDArray, Integer unitId, HttpServletRequest request) {
		
		logger.info("-----IN PrescriptionDaoImpl addPrescriptionAsNEWOPDTemplate --> " );
		
		OPDPrescriptionTemplatesDTO newObj = new OPDPrescriptionTemplatesDTO();
		List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
		//	Integer unitId = (Integer) session.getAttribute("uId");
			Integer doctorId = (Integer) session.getAttribute("doctorId");
			
			if (obj.getTemplateId() == 0) {
				
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				obj.setDoctorName(getDoctorNameByUserId(doctorId));
				
				newObj = (OPDPrescriptionTemplatesDTO) sessionFactory.getCurrentSession().merge(obj);
				
			}
			
			for(String prescriptionId : prescriptionIDArray) {
				
				OPDPrescriptionDtoSP prescriptionSP = new OPDPrescriptionDtoSP();
				prescriptionSP = getPrescriptionById(unitId, Integer.parseInt(prescriptionId));
				listPrescriptionsSP.add(prescriptionSP);
				
			}
			
			for(OPDPrescriptionDtoSP prescriptionDtoSP : listPrescriptionsSP) {
				
				OPDPrescriptionTemplateMedicineDto templateMedicineDto = new OPDPrescriptionTemplateMedicineDto();
				
				templateMedicineDto.setTemplateMedicineId(0);
				templateMedicineDto.setPrep(prescriptionDtoSP.getPrep());
				templateMedicineDto.setMedicineID(prescriptionDtoSP.getMedicineId());
				templateMedicineDto.setMedicineName(prescriptionDtoSP.getMedicineName());
				templateMedicineDto.setStrength(prescriptionDtoSP.getStrength());
				templateMedicineDto.setUnit(prescriptionDtoSP.getUnit());
				templateMedicineDto.setDose(prescriptionDtoSP.getDose());
				templateMedicineDto.setFrequency(prescriptionDtoSP.getFrequency());
				templateMedicineDto.setInstruction(prescriptionDtoSP.getInstruction());
				templateMedicineDto.setRoute(prescriptionDtoSP.getRoute());
				templateMedicineDto.setDays(prescriptionDtoSP.getDays());
				templateMedicineDto.setQty(prescriptionDtoSP.getQty());
				templateMedicineDto.setDayPrescription(prescriptionDtoSP.getDayPrescription());
				
				saveUpdateOPDPrescTempMeds(templateMedicineDto, request, newObj.getTemplateId());
			}

			} catch (Exception e) {
				e.printStackTrace();
		}
		return "Template Created Successfully !";
	}


	@Override
	public String updateOpdTemplateWithNewMedicines(Integer templateId, String[] prescriptionIDArray, Integer unitId, HttpServletRequest request) {
		
		logger.info("-----IN PrescriptionDaoImpl updateOpdTemplateWithNewMedicines --> " );
		
		List<OPDPrescriptionDtoSP> listPrescriptionsSP = new ArrayList<>();
		
		try {
			
			for(String prescriptionId : prescriptionIDArray) {
				
				OPDPrescriptionDtoSP prescriptionSP = new OPDPrescriptionDtoSP();
				prescriptionSP = getPrescriptionById(unitId, Integer.parseInt(prescriptionId));
				listPrescriptionsSP.add(prescriptionSP);
				
			}
			
			for(OPDPrescriptionDtoSP prescriptionDtoSP : listPrescriptionsSP) {
				
				OPDPrescriptionTemplateMedicineDto templateMedicineDto = new OPDPrescriptionTemplateMedicineDto();
				
				templateMedicineDto.setTemplateMedicineId(0);
				templateMedicineDto.setPrep(prescriptionDtoSP.getPrep());
				templateMedicineDto.setMedicineID(prescriptionDtoSP.getMedicineId());
				templateMedicineDto.setMedicineName(prescriptionDtoSP.getMedicineName());
				templateMedicineDto.setStrength(prescriptionDtoSP.getStrength());
				templateMedicineDto.setUnit(prescriptionDtoSP.getUnit());
				templateMedicineDto.setDose(prescriptionDtoSP.getDose());
				templateMedicineDto.setFrequency(prescriptionDtoSP.getFrequency());
				templateMedicineDto.setInstruction(prescriptionDtoSP.getInstruction());
				templateMedicineDto.setRoute(prescriptionDtoSP.getRoute());
				templateMedicineDto.setDays(prescriptionDtoSP.getDays());
				templateMedicineDto.setQty(prescriptionDtoSP.getQty());
				templateMedicineDto.setDayPrescription(prescriptionDtoSP.getDayPrescription());
				
				saveUpdateOPDPrescTempMeds(templateMedicineDto, request, templateId);
			}
			
			
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return "Template Updated Successfully !";
	}


	@Override
	public int savefollowUpForOPDPatient(OPDPrescriptionFolloUpDto obj, Integer treatmentId, HttpServletRequest request) {
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Integer doctorId = (Integer) session.getAttribute("doctorId");
			System.err.println("doctorId...."+doctorId);
			
			if (obj.getFollowUpId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				TreatmentDto treatDTO = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				obj.setTreatmentDto(treatDTO);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}


	@Override
	public OPDPrescriptionFolloUpDto getfollowUpForOPDPatient(Integer unitId, Integer treatmentId) {
		
		OPDPrescriptionFolloUpDto dto = new OPDPrescriptionFolloUpDto();
		
		try {
			TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionFolloUpDto.class);
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("treatmentDto", treatmentDto));
			dto = (OPDPrescriptionFolloUpDto) criteria.uniqueResult();
			
			return dto;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		logger.info("-----IN PrescriptionDaoImpl OPDPrescriptionFolloUpDto --> " + dto);
		
		return null;
		
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<MedicationMaster> paediatricsMedicineAutoSuggestList(String prep, String letter) {
		
		logger.info("-----IN PrescriptionDaoImpl paediatricsMedicineAutoSuggestList --> ");

		List<MedicationMaster> listMedicationMaster = new ArrayList<MedicationMaster>();
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MedicationMaster.class);
					
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("medicineName", letter, MatchMode.ANYWHERE));
			
			if(!prep.equalsIgnoreCase("0")) {
				
				logger.info("-----IN paediatricsMedicineAutoSuggestList --> checking if(!prep.equalsIgnoreCase(0)), applying prep = " + prep + ", to criteria---");
				criteria.add(Restrictions.eq("prepId", Integer.parseInt(prep)));
			}
			
			criteria.setMaxResults(50);
			
			listMedicationMaster = criteria.list();
			
			logger.info("-----IN PrescriptionDaoImpl paediatricsMedicineAutoSuggestList --> LIST :: " + listMedicationMaster);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return listMedicationMaster;
	}


	@Override
	public MedicationMaster getPaediatricsMedicineById(Integer id) {
		
		MedicationMaster medicationMaster = new MedicationMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MedicationMaster.class);
			criteria.add(Restrictions.eq("id", id));
			criteria.add(Restrictions.eq("deleted", "N"));
			
			medicationMaster = (MedicationMaster) criteria.uniqueResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return medicationMaster;
		
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<OPDPrescriptionDto> getPharmacyStockMedicine(String prep, String letter) {
		
		logger.info("-----IN PrescriptionDaoImpl getPharmacyStockMedicine --> ");

		List<OPDPrescriptionDto> listMedicationMaster = new ArrayList<OPDPrescriptionDto>();
		
		try {
			
			Query query = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_medicine_from_stock_by_product_name(:p_product_name)");
			query.setParameter("p_product_name", letter);
			query.setResultTransformer(Transformers.aliasToBean(OPDPrescriptionDto.class));
			
			listMedicationMaster = query.list();
			if(!prep.equalsIgnoreCase("0")) {
				
				logger.info("-----IN getPharmacyStockMedicine --> checking if(!prep.equalsIgnoreCase(0)), applying prep = " + prep + ", to criteria---");
				//criteria.add(Restrictions.eq("prepId", Integer.parseInt(prep)));
			}
			
			logger.info("-----IN PrescriptionDaoImpl getPharmacyStockMedicine --> LIST :: " + listMedicationMaster);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return listMedicationMaster;
	}


	@Override
	public OPDPrescriptionDto getMedicineFromStockById(Integer id) {
		logger.info("-----IN PrescriptionDaoImpl getMedicineFromStockById --> ");

		OPDPrescriptionDto medicationMaster = new OPDPrescriptionDto();
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_medicine_from_stock_by_id(:p_stock_product_id)");
			query.setParameter("p_stock_product_id", id);
			query.setResultTransformer(Transformers.aliasToBean(OPDPrescriptionDto.class));
			medicationMaster= (OPDPrescriptionDto) query.uniqueResult();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return medicationMaster;
	}
	
public String fetchInstructionNamesForUI(Integer instruction, Integer unitId) {
		
		logger.error("fetchInstructionNames for ID : --> " + instruction);
		
		if(instruction == 0) {
			
			return "-/-/-";
			
		} else {
			
			PrescriptionInstructionDto instrDTO = new PrescriptionInstructionDto();
			
			try {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
				criteria.add(Restrictions.eq("id", instruction));
				criteria.add(Restrictions.eq("unitId", unitId));
				
				instrDTO = (PrescriptionInstructionDto) criteria.uniqueResult();
				
			}catch (Exception e) {
				logger.error("fetchInstructionNames Exception--> ",e);
			}
			
			return instrDTO.getEnglishInstruction() + "/" + instrDTO.getHindiInstruction() + "/" + instrDTO.getMarathiInstruction();
			//return instrDTO.getEnglishInstruction() + "/" + instrDTO.getUnicodeHindi() + "/" + instrDTO.getUnicode();
		}

}


@Override
public List<OPDPrescriptionDtoSP> getAllPrescriptionsNursingStation(Integer treatmentId, Integer unitId,String date) {
	
	logger.info("-----IN PrescriptionDaoImpl getAllPrescriptionsByTreatmentId  --> ");
	
	List<OPDPrescriptionDtoSP> lists = new ArrayList<>();
	
	try {
		
        Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_opd_prescription_data(:unitId, :treatmentId)");
        prescriptionSP.setParameter("unitId", unitId);
        prescriptionSP.setParameter("treatmentId", treatmentId);
        
        prescriptionSP.setResultTransformer(new AliasToBeanResultTransformer(OPDPrescriptionDtoSP.class));
        
        lists = prescriptionSP.list();
        
        System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : result lists size: " + lists.size());
        
		
	} catch (Exception e) {
		logger.error("getAllPrescriptionsByTreatmentId Exception--> ",e);
	}
	
	
		for(OPDPrescriptionDtoSP obj : lists) {
			
			if(obj.getMedicineId() == 0 || obj.getMedicineId() == null) {
				
				//Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrescriptionId()+"'");
				Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrep()+"'");
				String preName = (String)query.uniqueResult();
				
				System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - preName: " + preName);
				obj.setPrepName(preName);
				
				//	obj.setUnitName(fetchUnitName(obj.getMedicineId()));
				
				Query query1 = sessionFactory.getCurrentSession().createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
				String unitName = (String)query1.uniqueResult();
				
				System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - unitName: " + unitName);
				if(unitName != null) {
				obj.setUnitName(unitName);
				}else {
					obj.setUnitName("-");
				}
				obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));// for print
				obj.setInstructionNameForUI(fetchInstructionNamesForUI(obj.getInstruction(), obj.getUnitId()));// for UI
				
			} else {
				
				obj.setPrepName(fetchPrepName(obj.getMedicineId()));
				obj.setUnitName(fetchUnitName(obj.getMedicineId()));
				obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
				obj.setInstructionNameForUI(fetchInstructionNamesForUI(obj.getInstruction(), obj.getUnitId()));
			}
			
			
			Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(IPDNursingStationMedication.class);
			createCriteria.add(Restrictions.eq("prescriptionId", obj.getPrescriptionId()));
			createCriteria.add(Restrictions.eq("durationCurrentDate", date));
			List<IPDNursingStationMedication> list = createCriteria.list();
			
//			String sql="select * from ipd_nursingstation_medication_dashboard where "
//					+ "prescription_id ="+obj.getPrescriptionId();
//			= sessionFactory.getCurrentSession().createSQLQuery(sql).list();
			obj.setListIPDNursingStationMedication(list);
			//Query query = sessionFactory.getCurrentSession().createQuery("select * from IPDNursingStationMedication where treatmentId='"+obj.getTreatmentId()+"'");
			//query.list()
		}
		
		System.err.println("------------> getAllPrescriptionsByTreatmentId SP---> " + lists);

 return lists;
}


	@Override
	public PreparationMaster getPreparationById(Integer id) {
		
		logger.info("-----IN PrescriptionDaoImpl getPreparationById --> ");
	
	
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PreparationMaster.class);
		criteria.add(Restrictions.eq("preparationDeleteFlag",0));
		criteria.add(Restrictions.eq("preparationId",id));
		PreparationMaster obj = (PreparationMaster) criteria.uniqueResult();
		return obj;
	}
	catch (Exception e) {
		logger.error("--fetchPreparationby id Exception--> ",e);
	}
		return null;
	}


	@Override
	public List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentIdDateWise(Integer treatmentId, Integer unitId,
			String date) { 
		
		logger.info("-----IN PrescriptionDaoImpl getAllPrescriptionsByTreatmentId  --> ");
		
		List<OPDPrescriptionDtoSP> lists = new ArrayList<>();
		
		try {
			
            Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_opd_prescription_date_wise(:unitId, :treatmentId,:date)");
            prescriptionSP.setParameter("unitId", unitId);
            prescriptionSP.setParameter("treatmentId", treatmentId);
            prescriptionSP.setParameter("date", date);
            
            prescriptionSP.setResultTransformer(new AliasToBeanResultTransformer(OPDPrescriptionDtoSP.class));
            
            lists = prescriptionSP.list();
            
            System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : result lists size: " + lists.size());
            
			
		} catch (Exception e) {
			logger.error("getAllPrescriptionsByTreatmentId Exception--> ",e);
		}
		
		
			for(OPDPrescriptionDtoSP obj : lists) {
				
				if(obj.getMedicineId() == 0 || obj.getMedicineId() == null) {
					
					//Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrescriptionId()+"'");
					Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrep()+"'");
					String preName = (String)query.uniqueResult();
					
					System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - preName: " + preName);
					obj.setPrepName(preName);
					
					//	obj.setUnitName(fetchUnitName(obj.getMedicineId()));
					
					Query query1 = sessionFactory.getCurrentSession().createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
					String unitName = (String)query1.uniqueResult();
					
					System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - unitName: " + unitName);
					if(unitName != null) {
					obj.setUnitName(unitName);
					}else {
						obj.setUnitName("-");
					}
					obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));// for print
					obj.setInstructionNameForUI(fetchInstructionNamesForUI(obj.getInstruction(), obj.getUnitId()));// for UI
					
				} else {
					
					obj.setPrepName(fetchPrepName(obj.getMedicineId()));
					obj.setUnitName(fetchUnitName(obj.getMedicineId()));
					obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
					obj.setInstructionNameForUI(fetchInstructionNamesForUI(obj.getInstruction(), obj.getUnitId()));
				}
				
				 String sql="select  ifnull(ecogreen_prescription_id,0) as ecogreen_prescription_id  from opd_prescription  where prescription_id ="+obj.getPrescriptionId()+" ";
				  SQLQuery q= sessionFactory.getCurrentSession().createSQLQuery(sql);
				int  ecogreenPrescrptionId=((Number) q.uniqueResult()).intValue();
				
				 obj.setEcogreenPrescrptionId(ecogreenPrescrptionId);
			}
			
			System.err.println("------------> getAllPrescriptionsByTreatmentId SP---> " + lists);
	
	return lists;
}


	@Override
	public int updateIPDPrescriptionSequence(HttpServletRequest request, Integer treatmentId,String prescriptionIds) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			//LabProfileDTO dto = (LabProfileDTO) session.get(OPDPrescriptionDto.class, profileId);
			
			String[] prescriptionIdList = prescriptionIds.split(",");
			for(String ids : prescriptionIdList) {
				String[] data = ids.split("-");
				Integer prescriptionId = Integer.parseInt(data[0]);
				Integer sequenceNo = Integer.parseInt(data[1]);
				
				OPDPrescriptionDto dto = (OPDPrescriptionDto) session.get(OPDPrescriptionDto.class, prescriptionId);
				if(dto!=null) {
					dto.setPrescriptionSequenceId(sequenceNo);
					session.merge(dto);
				}
				
			}
//			session.merge(dto);
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}





}


