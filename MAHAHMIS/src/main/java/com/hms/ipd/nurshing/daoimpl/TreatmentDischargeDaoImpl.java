package com.hms.ipd.nurshing.daoimpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.impl.PrescriptionDaoImpl;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplateMedicineDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplatesDTO;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.ipd.nurshing.dao.TreatmentDischargeDao;
import com.hms.ipd.nurshing.dto.TreatmentDischargeDto;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.StrengthMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.UomMaster;

@Repository
public class TreatmentDischargeDaoImpl implements TreatmentDischargeDao{
	
	@Autowired
	SessionFactory sessionFactory;
	
	
	static Logger log=Logger.getLogger(TreatmentDischargeDaoImpl.class.getName());
	@Override
	public int savetreatmentDischarge(TreatmentDischargeDto obj, HttpServletRequest request, Integer productId) {
		
		log.info("-----IN PrescriptionDaoImpl saveOPDPrescription --> ");
		
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
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				ProductMaster productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, productId);
				obj.setProductMaster(productMaster);
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	/*
	 * @Override public List<OPDPrescriptionDtoSP>
	 * getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId) {
	 * 
	 * 
	 * 
	 * List<OPDPrescriptionDtoSP> lists = new ArrayList<>();
	 * 
	 * try {
	 * 
	 * Query prescriptionSP = sessionFactory.getCurrentSession().
	 * createSQLQuery("call sp_get_opd_prescription_data(:unitId, :treatmentId)");
	 * prescriptionSP.setParameter("unitId", unitId);
	 * prescriptionSP.setParameter("treatmentId", treatmentId);
	 * 
	 * prescriptionSP.setResultTransformer(new
	 * AliasToBeanResultTransformer(OPDPrescriptionDtoSP.class));
	 * 
	 * lists = prescriptionSP.list();
	 * 
	 * System.out.
	 * println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : result lists size: "
	 * + lists.size());
	 * 
	 * 
	 * } catch (Exception e) {
	 * //logger.error("getAllPrescriptionsByTreatmentId Exception--> ",e); }
	 * 
	 * 
	 * for(OPDPrescriptionDtoSP obj : lists) {
	 * 
	 * if(obj.getMedicineId() == 0 || obj.getMedicineId() == null) {
	 * 
	 * Query query = sessionFactory.getCurrentSession().
	 * createQuery("select preparationName from PreparationMaster where preparationId='"
	 * +obj.getPrescriptionId()+"'"); String preName = (String)query.uniqueResult();
	 * 
	 * System.out.
	 * println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - preName: "
	 * + preName); obj.setPrepName(preName);
	 * 
	 * // obj.setUnitName(fetchUnitName(obj.getMedicineId()));
	 * 
	 * Query query1 = sessionFactory.getCurrentSession().
	 * createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
	 * String unitName = (String)query1.uniqueResult();
	 * 
	 * System.out.
	 * println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - unitName: "
	 * + unitName); obj.setUnitName(unitName);
	 * 
	 * obj.setInstructionName(fetchInstructionNames(obj.getInstruction(),
	 * obj.getUnitId()));
	 * 
	 * } else {
	 * 
	 * obj.setPrepName(fetchPrepName(obj.getMedicineId()));
	 * obj.setUnitName(fetchUnitName(obj.getMedicineId()));
	 * obj.setInstructionName(fetchInstructionNames(obj.getInstruction(),
	 * obj.getUnitId())); } }
	 * 
	 * System.err.println("------------> getAllPrescriptionsByTreatmentId SP---> " +
	 * lists);
	 * 
	 * return lists; }
	 */
	private String fetchUnitName(Integer medicineId) {

		ProductMaster productMaster = new ProductMaster();

		try {

			productMaster = getMedicineById(medicineId);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return productMaster.getUomMaster().getUomName();
	}
	private String fetchPrepName(Integer medId) {
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
	private ProductMaster getMedicineById(Integer productId) {
		
		ProductMaster productMaster = new ProductMaster();
		
		try {
		//	Criteria criteria = sessionFactory.getCurrentSession()
			Criteria criteria = sessionFactory.openSession()
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
	private String fetchInstructionNames(Integer instruction, Integer unitId) {
		
		//logger.error("fetchInstructionNames for ID : --> " + instruction);
		
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
			//	logger.error("fetchInstructionNames Exception--> ",e);
			}
			
//			return instrDTO.getEnglishInstruction() + "/" + instrDTO.getHindiInstruction() + "/" + instrDTO.getMarathiInstruction();
			return instrDTO.getEnglishInstruction() + "/" + instrDTO.getUnicodeHindi() + "/" + instrDTO.getUnicode();
		}

}

	@Override
	public List<TreatmentDischargeDto> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId) {
	
		List<TreatmentDischargeDto> list = new ArrayList<TreatmentDischargeDto>();
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TreatmentDischargeDto.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("deleted", "N"));
			list = criteria.list();
			
			
		for (TreatmentDischargeDto treatmentDischargeDto : list) {
			
			treatmentDischargeDto.setInstructionName(fetchInstructionNames(treatmentDischargeDto.getInstruction(), treatmentDischargeDto.getUnitId()));// for print
			treatmentDischargeDto.setInstructionNameForUI(fetchInstructionNamesForUI(treatmentDischargeDto.getInstruction(), treatmentDischargeDto.getUnitId()));// for UI
			
			
			//fetch prepration name
			Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+treatmentDischargeDto.getPrep()+"'");
			String preName = (String)query.uniqueResult();
			
			System.out.println("PrescriptionDaoImpl getAllPrescriptionsByTreatmentId : general medicine - preName: " + preName);
			treatmentDischargeDto.setPrepName(preName);
			
			
			// get drug name and check nutracal_product
			int medicineId=0;
		     int drugId=0;
		     String drugName="";
		     int nutracalproduct=1;
		     
		      try {
		    	  
		    	  String medicineIdSql="select  ifnull(medicine_id,0) as medicine_id from ipd_treatment_discharge where prescription_id="+treatmentDischargeDto.getPrescriptionId()+" ";
			      SQLQuery qMedicine = sessionFactory.getCurrentSession().createSQLQuery(medicineIdSql);
			      medicineId=((Number) qMedicine.uniqueResult()).intValue();
			      if(medicineId >0) {
		            String drugIdSql="select  ifnull(product_drug_id,0) product_drug_id from pharma_product_master where product_id="+medicineId+" ";
		              SQLQuery qdrug = sessionFactory.getCurrentSession().createSQLQuery(drugIdSql);
		               drugId=((Number) qdrug.uniqueResult()).intValue();
		          
		               if(drugId > 0) {
		                String drugNameSql="select  drug_name from pharma_drug_master where drug_id="+drugId+" ";
				          SQLQuery qdrugName = sessionFactory.getCurrentSession().createSQLQuery(drugNameSql);
				        drugName=(String) qdrugName.uniqueResult();
		               }
				      
		      }
			      treatmentDischargeDto.setDrugName(drugName);
			    //get route
					String routeName="";
					String routeUnicode="";
					String sqlR=" select count(*) from dd_route_master where route_id="+treatmentDischargeDto.getRoute()+" and deleted='N' ";
				    int countR=((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlR).uniqueResult()).intValue();
				    if(countR > 0) {
				    	String sqlRu=" select ifnull(routename,'') as routename from dd_route_master where route_id="+treatmentDischargeDto.getRoute()+" and deleted='N' ";
				    	routeName=(String) sessionFactory.getCurrentSession().createSQLQuery(sqlRu).uniqueResult();
				    	
				    	 sqlRu=" select ifnull(routeUnicode,'') as routeUnicode from dd_route_master where route_id="+treatmentDischargeDto.getRoute()+" and deleted='N' ";
				    	 routeUnicode=(String) sessionFactory.getCurrentSession().createSQLQuery(sqlRu).uniqueResult();
				    }
				    treatmentDischargeDto.setRouteName(routeName);
				    treatmentDischargeDto.setRouteUnicode(routeUnicode);
				    
				 // for Nutrical 
					 int nutrcalProductFlag=1;
					
					 if(medicineId > 0) {
							 String sql="select  nutracal_product from  pharma_product_master where  product_id ="+medicineId+"";
							 nutrcalProductFlag= ((Number) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
					 }
					 treatmentDischargeDto.setNutracalProductFlag(nutrcalProductFlag);
					 
					// end for Nutrical
		
		      }catch (Exception e) {
				e.printStackTrace();
			}
		     
		     
		  // end drug name
			
			
		}	
			
			
		} catch (Exception e) {
			log.error("Exception--> ", e);
		}
		return list;
	}

	@Override
	public boolean usePrescriptionTemp(Integer treatmentId, Integer patientId, Integer templateId,
			HttpServletRequest request) {
		
		//logger.info("-----IN PrescriptionDaoImpl usePrescriptionTemp --> " );
		
		List<OPDPrescriptionTemplatesDTO> listOPDPrescriptionTemplatesDTO = new ArrayList<>();
		
		TreatmentDischargeDto opdPrescription = new TreatmentDischargeDto();
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionTemplatesDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("templateId", templateId));
			
			OPDPrescriptionTemplatesDTO opdPrescDto = new OPDPrescriptionTemplatesDTO();
			opdPrescDto = (OPDPrescriptionTemplatesDTO) criteria.uniqueResult();
			
			opdPrescDto.setListOPDPrescriptionTemplateMedicineDto(getMedicinesForOPDTemplate(opdPrescDto));
			
			
				
				for(OPDPrescriptionTemplateMedicineDto medDto : opdPrescDto.getListOPDPrescriptionTemplateMedicineDto()) {
					
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
					
					//sessionFactory.getCurrentSession().merge(opdPrescription);
					savetreatmentDischarge(opdPrescription, request, medDto.getMedicineID());
					
				
			}
			
			return true;
			
		}catch (Exception e) {
			
			e.printStackTrace();
			return false;
		}
		
	}

	@SuppressWarnings("unchecked")
	public List<OPDPrescriptionTemplateMedicineDto> getMedicinesForOPDTemplate(OPDPrescriptionTemplatesDTO opdPrescDto) {
		
		List<OPDPrescriptionTemplateMedicineDto> list = new ArrayList<OPDPrescriptionTemplateMedicineDto>();
				
				try {
					
					Criteria criteria = sessionFactory.openSession().createCriteria(OPDPrescriptionTemplateMedicineDto.class);
					criteria.add(Restrictions.eq("deleted","N"));
					criteria.add(Restrictions.eq("opdPrescriptionTemplatesDto", opdPrescDto));
					list = criteria.list();
					
					//logger.error("getMedicinesForOPDTemplate list size : --> " + list.size() + "-- list contents  : " + list );
					
				}catch (Exception e) {
					//logger.error("getMedicinesForOPDTemplate Exception--> ",e);
				}
				
			 return list;
	}


	/*
	 * private List<OPDPrescriptionTemplatesDTO>
	 * fetchOPDPrescriptionTemplatesByID(Integer templateId, HttpServletRequest
	 * request) {
	 * 
	 * List<OPDPrescriptionTemplatesDTO> list = new ArrayList<>(); Criteria criteria
	 * =
	 * sessionFactory.getCurrentSession().createCriteria(OPDPrescriptionTemplatesDTO
	 * .class);
	 * 
	 * if(templateId == 0) {
	 * 
	 * // logger.
	 * info("-----IN PrescriptionDaoImpl fetchOPDPrescription template ID is 0 -- "
	 * );
	 * 
	 * try {
	 * 
	 * criteria.add(Restrictions.eq("deleted", "N")); list = criteria.list();
	 * 
	 * }catch (Exception e) { //logger.error("PrescriptionDaoImpl Exception--> ",e);
	 * }
	 * 
	 * return list;
	 * 
	 * } else {
	 * 
	 * //logger.
	 * info("-----IN PrescriptionDaoImpl fetchOPDPrescription template ID is  -- " +
	 * templateId);
	 * 
	 * try { criteria.add(Restrictions.eq("deleted", "N"));
	 * criteria.add(Restrictions.eq("templateId", templateId));
	 * 
	 * OPDPrescriptionTemplatesDTO opdPrescDto = new OPDPrescriptionTemplatesDTO();
	 * opdPrescDto = (OPDPrescriptionTemplatesDTO) criteria.uniqueResult();
	 * 
	 * opdPrescDto.setListOPDPrescriptionTemplateMedicineDto(
	 * getMedicinesForOPDTemplate(opdPrescDto));
	 * 
	 * list.add(opdPrescDto);
	 * 
	 * }catch (Exception e) { //logger.error("PrescriptionDaoImpl Exception--> ",e);
	 * } }
	 * 
	 * // logger.
	 * info("-----IN PrescriptionDaoImpl fetchOPDPrescriptionTemplatesByID --> WithMedicineList :  "
	 * + list);
	 * 
	 * return list;
	 * 
	 * }
	 * 
	 * private List<OPDPrescriptionTemplateMedicineDto> getMedicinesForOPDTemplate(
	 * OPDPrescriptionTemplatesDTO opdPrescDto) {
	 * 
	 * List<OPDPrescriptionTemplateMedicineDto> list = new
	 * ArrayList<OPDPrescriptionTemplateMedicineDto>();
	 * 
	 * try {
	 * 
	 * Criteria criteria = sessionFactory.openSession().createCriteria(
	 * OPDPrescriptionTemplateMedicineDto.class);
	 * criteria.add(Restrictions.eq("deleted","N"));
	 * criteria.add(Restrictions.eq("opdPrescriptionTemplatesDto", opdPrescDto));
	 * list = criteria.list();
	 * 
	 * // logger.error("getMedicinesForOPDTemplate list size : --> " + list.size() +
	 * "-- list contents  : " + list );
	 * 
	 * }catch (Exception e) { //
	 * logger.error("getMedicinesForOPDTemplate Exception--> ",e); }
	 * 
	 * return list; }
	 */

public String fetchInstructionNamesForUI(Integer instruction, Integer unitId) {
		
		log.error("fetchInstructionNames for ID : --> " + instruction);
		
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
				log.error("fetchInstructionNames Exception--> ",e);
			}
			
			return instrDTO.getEnglishInstruction() + "/" + instrDTO.getHindiInstruction() + "/" + instrDTO.getMarathiInstruction();
			//return instrDTO.getEnglishInstruction() + "/" + instrDTO.getUnicodeHindi() + "/" + instrDTO.getUnicode();
		}

}

@Override
public TreatmentDischargeDto editIPDTreatmentAtDicharge(Integer prescriptionId, HttpServletRequest request) {
	log.info("inside a  editIPDTreatmentAtDicharge method : --> " + prescriptionId);
	try {
		TreatmentDischargeDto treatmentDischargeDto = (TreatmentDischargeDto) sessionFactory.getCurrentSession().get(TreatmentDischargeDto.class, prescriptionId);
		return treatmentDischargeDto;
	}catch (Exception e) {
		e.printStackTrace();
	}
	return null;
}

@Override
public boolean deleteIPDTreatmentAtDicharge(Integer unitId, String prescriptionId, HttpServletRequest request) {	
	try {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		//Changed by Akshata 4-April-2022
		String prescriptionArrId [] = prescriptionId.split(",");
		System.out.println("prescriptionArrId-----"+prescriptionArrId);
		for (int i = 0; i < prescriptionArrId.length; i++) {	
		TreatmentDischargeDto obj = (TreatmentDischargeDto) sessionFactory.getCurrentSession().get(TreatmentDischargeDto.class, Integer.parseInt(prescriptionArrId[i]));
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

}
