package com.hms.doctordesk.dao.impl;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.PreviousTreatmentDao;
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.doctordesk.dto.OPDAllergyAlertsDto;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.dto.Treatment;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
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


@SuppressWarnings("unchecked")
@Repository
public class PreviousTreatmentDaoImpl implements PreviousTreatmentDao {
	
	
	@Autowired
	SessionFactory sessionFactory;
	
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(PreviousTreatmentDaoImpl.class);
	
	@SuppressWarnings("unchecked")
	@Override
	public List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId) { 
		
				logger.info("-----IN PreviousTreatmentDaoImpl getAllPrescriptionsByTreatmentId  --> ");
				
				List<OPDPrescriptionDtoSP> lists = new ArrayList<>();
				
				try {
					
		            Query prescriptionSP = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_opd_prescription_data(:unitId, :treatmentId)");
		            prescriptionSP.setParameter("unitId", unitId);
		            prescriptionSP.setParameter("treatmentId", treatmentId);
		            
		            prescriptionSP.setResultTransformer(new AliasToBeanResultTransformer(OPDPrescriptionDtoSP.class));
		            
		            lists = prescriptionSP.list();
		            
		            System.out.println("PreviousTreatmentDaoImpl getAllPrescriptionsByTreatmentId : result lists size: " + lists.size());
		            
					
				} catch (Exception e) {
					logger.error("getAllPrescriptionsByTreatmentId Exception--> ",e);
				}
				
				
					for(OPDPrescriptionDtoSP obj : lists) {
						
						if(obj.getMedicineId() == 0 || obj.getMedicineId() == null) {
							
							Query query = sessionFactory.getCurrentSession().createQuery("select preparationName from PreparationMaster where preparationId='"+obj.getPrescriptionId()+"'");
							String preName = (String)query.uniqueResult();
							
							System.out.println("PreviousTreatmentDaoImpl getAllPrescriptionsByTreatmentId : general medicine - preName: " + preName);
							obj.setPrepName(preName);
							
							//	obj.setUnitName(fetchUnitName(obj.getMedicineId()));
							
							Query query1 = sessionFactory.getCurrentSession().createQuery("select uomName from UomMaster where uomId='"+obj.getUnit()+"'");
							String unitName = (String)query1.uniqueResult();
							
							System.out.println("PreviousTreatmentDaoImpl getAllPrescriptionsByTreatmentId : general medicine - unitName: " + unitName);
							obj.setUnitName(unitName);
							
							obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
							
						} else {
							
							obj.setPrepName(fetchPrepName(obj.getMedicineId()));
							obj.setUnitName(fetchUnitName(obj.getMedicineId()));
							obj.setInstructionName(fetchInstructionNames(obj.getInstruction(), obj.getUnitId()));
						}
					}
					
					System.err.println("------------> getAllPrescriptionsByTreatmentId SP---> " + lists);
			
			return lists;
	}
	
	private String fetchPrepName(Integer medId) {

		ProductMaster productMaster = new ProductMaster();

		try {

			productMaster = getMedicineById(medId);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return productMaster.getPreparationMaster().getPreparationName();
	}
	
	
	private ProductMaster getMedicineById(Integer productId) {
		
		ProductMaster productMaster = new ProductMaster();
		
		try {
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
					.createAlias("taxMaster", "taxMaster");;
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
			e.printStackTrace();
		}
		
		return productMaster;
	}

	private String fetchUnitName(Integer medicineId) {

		ProductMaster productMaster = new ProductMaster();

		try {

			productMaster = getMedicineById(medicineId);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return productMaster.getUomMaster().getUomName();
	}


	private String fetchInstructionNames(Integer instruction, Integer unitId) {
		
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
			
		}

}
	
	
	
	
	@Override
	public int setPrevPresciptionToCurrent(Integer userId, Integer patId, Integer prev, Integer current, HttpServletRequest request) {
		System.err.println("inside set prescription prev id="+prev);
		System.err.println("inside set prescription current id="+current);
		//int emrId = 0;
		int flag = 0;
		//String prevTreat = ""+prev;
		//OPDPrescriptionDtoSP oPDPrescriptionDtoSP = new OPDPrescriptionDtoSP();
		List<OPDPrescriptionDtoSP> prepList = getAllPrescriptionsByTreatmentId(prev,userId);
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		String todays_date = dateFormat.format(currentDate.getTime());
		
		 
		 
		if (prepList.size() != 0) {
			
			  for (int i = 0; i < prepList.size(); i++) {
				  System.out.println("Helllo----"+prepList);
				  OPDPrescriptionDtoSP mainObj = new OPDPrescriptionDtoSP();
				  mainObj = prepList.get(i);
				  OPDPrescriptionDto obj = new OPDPrescriptionDto();
				  
				  obj.setPatientId(mainObj.getPatientId());
				  obj.setTreatmentId(current);
				  obj.setPrep(mainObj.getPrep());
				  obj.setMedicineName(mainObj.getMedicineName());
				  obj.setStrength(mainObj.getStrength());
				  obj.setUnit(mainObj.getUnit());
				  obj.setDose(mainObj.getDose());
				  obj.setFrequency(mainObj.getFrequency());
				  obj.setInstruction(mainObj.getInstruction());
				  obj.setRoute(mainObj.getRoute());
				  obj.setDays(mainObj.getDays());
				  obj.setQty(mainObj.getQty());
				  obj.setDayPrescription(mainObj.getDayPrescription());
				  obj.setPaediatricsMedicineCapacity(mainObj.getPaediatricsMedicineCapacity());
				  obj.setUnitId(mainObj.getUnitId());
				  obj.setCreatedBy(userId);
//				  ProductMaster productMaster = new ProductMaster();
//				  productMaster.setProductId(mainObj.getMedicineId()); 
				  
				  ProductMaster productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, mainObj.getMedicineId());
					 obj.setProductMaster(productMaster); 
					 
				//  obj.setProductMaster(productMaster);
				 
				  sessionFactory.getCurrentSession().saveOrUpdate(obj);
				  
				  obj = null;
			  }
			 }else{
			flag = 0;
		}
		// sessionFactory.getCurrentSession().merge(obj);
		return flag;
	}

	@Override
	public List<Treatment> fetchPreviousTreatmentsByTreatmentID(Integer treatmentId, HttpServletRequest request) {
		List<Treatment> treatmentList = new ArrayList<Treatment>();

		try {
			
			String sql = "SELECT * FROM ehat_treatment WHERE patient_id=(SELECT patient_id FROM ehat_treatment WHERE treatment_id="+treatmentId+")"
					+ " AND treatment_id!="+treatmentId+" AND t_flag = 'N' ORDER BY treatment_id DESC";

			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();

			for (Map<String, Object> mapRS : result) {

				Treatment treatment = new Treatment();

				treatment.setPatient_ID((Integer) mapRS.get("patient_id"));
				treatment.setTreatment_ID((Integer) mapRS.get("treatment_id"));
				treatment.setTstartDate((String) mapRS.get("opdipdno"));
				treatment.setTreatmentCount((String) mapRS.get("trcount"));
				int department = (Integer) mapRS.get("department_id");
				if(department == 1){
					
					treatment.setDepartment("opd");
					
					}else if(department == 2){
						
						treatment.setDepartment("ipd");
						
					}else{
						
						treatment.setDepartment("diagnosis");
						
					}
				System.err.println("date doctor="+(Date) mapRS.get("created_date_time"));
				
				Timestamp ts = (Timestamp) mapRS.get("created_date_time");
				Date date1 = new Date();
				date1.setTime(ts.getTime());
				String tempDate = new SimpleDateFormat("dd/MM/yyyy").format(date1);
				System.out.println("date1....."+date1);


				if (tempDate.contains("-")) {
					String[] splitDate = tempDate.split("-");
					tempDate = (splitDate[0] + "/" + splitDate[1] + "/" + splitDate[2]);
					treatment.setCreatedDate(tempDate);
				} 
				else 
				{
					treatment.setCreatedDate(tempDate);
				}
				treatmentList.add(treatment);
			}

			return treatmentList;
		} catch (Exception e) {
			e.printStackTrace();
			return treatmentList;
		}
	}

	@Override
	public int setPreviousDataToCurrentTreatment(Integer userId, Integer patId, Integer prev, Integer current,
			HttpServletRequest request) {
	   try {
			RegistrationDto pobj=(RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class, patId);
			   TreatmentDto cuurentTreatObj=(TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class, current);
		   // save prevoius treat  history to current treat 
			   List<OPDHistorySlaveDTO> newlist =new ArrayList<>();
			OPDHistoryMasterDTO obj=new OPDHistoryMasterDTO();
			TreatmentDto tobj=(TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class, prev);
			List<OPDHistorySlaveDTO> list =new ArrayList<OPDHistorySlaveDTO>();
			
			Criteria c=  sessionFactory.openSession().createCriteria(OPDHistoryMasterDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			obj=(OPDHistoryMasterDTO) c.uniqueResult();
			
			if(obj !=null) {
				list=	obj.getGetListOfHistorySlaveDTO();
				  newlist= list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
				obj.setGetListOfHistorySlaveDTO(newlist);
			}
			
			OPDHistoryMasterDTO newobj=new OPDHistoryMasterDTO();
			Criteria cc=  sessionFactory.openSession().createCriteria(OPDHistoryMasterDTO.class);
			cc.add(Restrictions.eq("treatObj", cuurentTreatObj));
			cc.add(Restrictions.eq("deleted", "N"));
			newobj=(OPDHistoryMasterDTO) cc.uniqueResult();
			if(newobj !=null) {
				
			newobj.setTemplateId(obj.getTemplateId());
			newobj.setTemplateName(obj.getTemplateName());
			newobj.setMedicalOfficerName(obj.getMedicalOfficerName());
			newobj.setMrnNo(obj.getMrnNo());
			newobj.setChiefComplaints(obj.getChiefComplaints());
			newobj.setNegativeHistory(obj.getNegativeHistory());
			newobj.setDmFlag(obj.getDmFlag());
			newobj.setDmDuration(obj.getDmDuration());
			newobj.setHtnFlag(obj.getHtnFlag());
			newobj.setHtnDuration(obj.getHtnDuration());
			newobj.setIhdFlag(obj.getIhdFlag());
			newobj.setIhdDuration(obj.getIhdDuration());
			newobj.setBacopdFlag(obj.getBacopdFlag());
			newobj.setBacopdDuration(obj.getBacopdDuration());
			newobj.setOtherFlag(obj.getOtherFlag());
			newobj.setOtherDuration(obj.getOtherDuration());
			newobj.setPastSurgicalHistory(obj.getPastSurgicalHistory());
			newobj.setMedications(obj.getMedications());
			newobj.setObsHistory(obj.getObsHistory());
			newobj.setAnyAllergy(obj.getAnyAllergy());
			newobj.setFamilyHistory(obj.getFamilyHistory());
			newobj.setPersonalHistory(obj.getPersonalHistory());
			newobj.setTemperature(obj.getTemperature());
			newobj.setPallor(obj.getPallor());
			newobj.setIcterus(obj.getIcterus());
			newobj.setPulse(obj.getPulse());
			newobj.setClubbing(obj.getClubbing());
			newobj.setOedema(obj.getOedema());
			newobj.setBp(obj.getBp());
			newobj.setLymphAdenopathy(obj.getLymphAdenopathy());
			newobj.setCvs(obj.getCvs());
			newobj.setRs(obj.getRs());
			newobj.setPa(obj.getPa());
			newobj.setCns(obj.getCns());
			newobj.setLocalExamination(obj.getLocalExamination());
			newobj.setInvestigationReport(obj.getInvestigationReport());
			newobj.setPatientObj(pobj);
			newobj.setUnitId(obj.getUnitId());
			newobj.setTreatObj(cuurentTreatObj);
			newobj.setGetListOfHistorySlaveDTO(newlist);
			 sessionFactory.getCurrentSession().merge(newobj);
			}else {
				OPDHistoryMasterDTO newobj1=new OPDHistoryMasterDTO();
				newobj1.setHistoryId(0);
			newobj1.setTemplateId(obj.getTemplateId());
			newobj1.setTemplateName(obj.getTemplateName());
			newobj1.setMedicalOfficerName(obj.getMedicalOfficerName());
			newobj1.setMrnNo(obj.getMrnNo());
			newobj1.setChiefComplaints(obj.getChiefComplaints());
			newobj1.setNegativeHistory(obj.getNegativeHistory());
			newobj1.setDmFlag(obj.getDmFlag());
			newobj1.setDmDuration(obj.getDmDuration());
			newobj1.setHtnFlag(obj.getHtnFlag());
			newobj1.setHtnDuration(obj.getHtnDuration());
			newobj1.setIhdFlag(obj.getIhdFlag());
			newobj1.setIhdDuration(obj.getIhdDuration());
			newobj1.setBacopdFlag(obj.getBacopdFlag());
			newobj1.setBacopdDuration(obj.getBacopdDuration());
			newobj1.setOtherFlag(obj.getOtherFlag());
			newobj1.setOtherDuration(obj.getOtherDuration());
			newobj1.setPastSurgicalHistory(obj.getPastSurgicalHistory());
			newobj1.setMedications(obj.getMedications());
			newobj1.setObsHistory(obj.getObsHistory());
			newobj1.setAnyAllergy(obj.getAnyAllergy());
			newobj1.setFamilyHistory(obj.getFamilyHistory());
			newobj1.setPersonalHistory(obj.getPersonalHistory());
			newobj1.setTemperature(obj.getTemperature());
			newobj1.setPallor(obj.getPallor());
			newobj1.setIcterus(obj.getIcterus());
			newobj1.setPulse(obj.getPulse());
			newobj1.setClubbing(obj.getClubbing());
			newobj1.setOedema(obj.getOedema());
			newobj1.setBp(obj.getBp());
			newobj1.setLymphAdenopathy(obj.getLymphAdenopathy());
			newobj1.setCvs(obj.getCvs());
			newobj1.setRs(obj.getRs());
			newobj1.setPa(obj.getPa());
			newobj1.setCns(obj.getCns());
			newobj1.setLocalExamination(obj.getLocalExamination());
			newobj1.setInvestigationReport(obj.getInvestigationReport());
			newobj1.setPatientObj(pobj);
			newobj1.setTreatObj(cuurentTreatObj);
			newobj1.setUnitId(obj.getUnitId());
			newobj1.setGetListOfHistorySlaveDTO(newlist);
			 sessionFactory.getCurrentSession().merge(newobj1);

			
			}
			// end history
			
			// start save Previous treat  diagnosis to current treat
			
			Criteria criteria = sessionFactory.openSession().createCriteria(
					DiagonosisMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			 criteria.add(Restrictions.eq("treatObj",tobj));
			// criteria.add(Restrictions.eq("treatmentId", treatmentId));
			List<DiagonosisMasterDto> listDigno = criteria.list();
			
			if(listDigno .size() > 0) {
				         
				for(int i=0;i < listDigno.size() ;i++ ) {
					
					DiagonosisMasterDto dobj=listDigno.get(i);
					DiagonosisMasterDto newdobj=new DiagonosisMasterDto();
					newdobj.setId(0);
					newdobj.setDate(dobj.getDate());
					newdobj.setDiagndesc(dobj.getDiagndesc());
					newdobj.setDiagoName(dobj.getDiagoName());
					newdobj.setIcd10_code(dobj.getIcd10_code());
					newdobj.setDiagnoType(dobj.getDiagnoType());
					newdobj.setComment(dobj.getComment());
					newdobj.setPatientObj(pobj);
					newdobj.setTreatObj(cuurentTreatObj);
					newdobj.setUnitId(dobj.getUnitId());
					sessionFactory.getCurrentSession().merge(newdobj);
				}
				
			}
			
			// end diagnosis
			
			//start copy prescription from previous to current
			List<OPDPrescriptionDtoSP> prepList = getAllPrescriptionsByTreatmentId(prev,userId);
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			String todays_date = dateFormat.format(currentDate.getTime());
			
			 
			 
			if (prepList.size() != 0) {
				
				  for (int i = 0; i < prepList.size(); i++) {
					
					  OPDPrescriptionDtoSP mainObj = new OPDPrescriptionDtoSP();
					  mainObj = prepList.get(i);
					  OPDPrescriptionDto preobj = new OPDPrescriptionDto();
					  
					  preobj.setPatientId(mainObj.getPatientId());
					  preobj.setTreatmentId(current);
					  preobj.setPrep(mainObj.getPrep());
					  preobj.setMedicineName(mainObj.getMedicineName());
					  preobj.setStrength(mainObj.getStrength());
					  preobj.setUnit(mainObj.getUnit());
					  preobj.setDose(mainObj.getDose());
					  preobj.setFrequency(mainObj.getFrequency());
					  preobj.setInstruction(mainObj.getInstruction());
					  preobj.setRoute(mainObj.getRoute());
					  preobj.setDays(mainObj.getDays());
					  preobj.setQty(mainObj.getQty());
					  preobj.setDayPrescription(mainObj.getDayPrescription());
					  preobj.setPaediatricsMedicineCapacity(mainObj.getPaediatricsMedicineCapacity());
					  preobj.setUnitId(mainObj.getUnitId());
					  preobj.setCreatedBy(userId);
					  preobj.setUnitId(mainObj.getUnitId());
//					  ProductMaster productMaster = new ProductMaster();
//					  productMaster.setProductId(mainObj.getMedicineId()); 
					  
					  ProductMaster productMaster = (ProductMaster) sessionFactory.getCurrentSession().get(ProductMaster.class, mainObj.getMedicineId());
					  preobj.setProductMaster(productMaster); 
						 
					//  obj.setProductMaster(productMaster);
					 
					  sessionFactory.getCurrentSession().saveOrUpdate(preobj);
				  }
			}
			// end prescription
			
			// start copy prevoius Surgery Advice to current 
			Criteria csx=  sessionFactory.openSession().createCriteria(OPDSxAdvicedDTO.class);
			csx.add(Restrictions.eq("treatObj", tobj));
			csx.add(Restrictions.eq("deleted", "N"));
			
			List<OPDSxAdvicedDTO> sxlist=csx.list();
			 
			   if(sxlist .size() > 0) {
				   for(int i=0;i < sxlist .size() ;i++) {
					   OPDSxAdvicedDTO sxobj=sxlist.get(i);
					   OPDSxAdvicedDTO newsxobj=new OPDSxAdvicedDTO();
					   newsxobj.setSxAdviceMasterId(0);
					   newsxobj.setProcedureTypeId(sxobj.getProcedureTypeId());
					   newsxobj.setProcedureGroupId(sxobj.getProcedureGroupId());
					   newsxobj.setProcedureNameId(sxobj.getProcedureNameId());
					   newsxobj.setProcedureName(sxobj.getProcedureName());
					   newsxobj.setRadicalFlag(sxobj.getRadicalFlag());
					   newsxobj.setPalliativeFlag(sxobj.getPalliativeFlag());
					   newsxobj.setIndicationOfSurgery(sxobj.getIndicationOfSurgery());
					   newsxobj.setRiskFactor(sxobj.getRiskFactor());
					   newsxobj.setAdviceDate(sxobj.getAdviceDate());
					   newsxobj.setPatientObj(pobj);
					   newsxobj.setTreatObj(cuurentTreatObj);
					   newsxobj.setUnitId(sxobj.getUnitId());
					   sessionFactory.getCurrentSession().merge(newsxobj);
				   }
			   }
			// end surgery
			   
			   // start copy previous treat Diet to current Treat
			   Criteria cdiet=  sessionFactory.openSession().createCriteria(OPDDietMasterDTO.class);
			   cdiet.add(Restrictions.eq("treatObj", tobj));
			   cdiet.add(Restrictions.eq("deleted", "N"));
			   List<OPDDietMasterDTO> dietlist=cdiet.list();
			   
			   if(dietlist .size() > 0) {
				   for(int i=0; i< dietlist .size() ;i++) {
					   OPDDietMasterDTO dietObj= dietlist.get(i);
					   OPDDietMasterDTO newdietObj=new OPDDietMasterDTO ();
					   newdietObj.setDietMasterId(0);
					   newdietObj.setTemplateId(dietObj.getTemplateId());
					   newdietObj.setSpecializationId(dietObj.getSpecializationId());
					   newdietObj.setTemplateName(dietObj.getTemplateName());
					   newdietObj.setTemplateData(dietObj.getTemplateData());
					   newdietObj.setFromDate(dietObj.getFromDate());
					   newdietObj.setToDate(dietObj.getToDate());
					   newdietObj.setUnitId(dietObj.getUnitId());
					   newdietObj.setPatientObj(pobj);
					   newdietObj.setTreatObj(cuurentTreatObj);		
					   sessionFactory.getCurrentSession().merge(newdietObj);
				   }
			   }
			   // end Diet
			   
			   // start copy prevoius treat document to current Treat
			   Criteria cdoc = sessionFactory.openSession().createCriteria(OpdDocumentUploadDto.class);
			   cdoc.add(Restrictions.eq("deleted", "N"));
			   //cdoc.add(Restrictions.eq("unitId", unitId));
			   cdoc.add(Restrictions.eq("treatmentDto",tobj ));
			   //cdoc.add(Restrictions.eq("patientRegistered", registrationDto));
			   List<OpdDocumentUploadDto> listdoc = cdoc.list();
			   
			     if(listdoc.size() > 0) {
			    	 
			    	    for(int i=0; i < listdoc.size();i++ ) {
			    	    	OpdDocumentUploadDto docObj	=listdoc.get(i);
			    	    	OpdDocumentUploadDto newdocObj=new OpdDocumentUploadDto ();
			    	    	newdocObj.setDocumentId(0);
			    	    	newdocObj.setDoctorDeskFile(docObj.getDoctorDeskFile());
			    	    	newdocObj.setRemark(docObj.getRemark());
			    	    	newdocObj.setUnitId(docObj.getUnitId());
			    	    	newdocObj.setPatientRegistered(pobj);
			    	    	newdocObj.setTreatmentDto(cuurentTreatObj);
			    	    	   sessionFactory.getCurrentSession().merge(newdocObj);
			    	    }
			     }
			   
			   // end document
			     
			     // start copy previous treat alergy to current treat
			     Criteria calergy = sessionFactory.openSession().createCriteria(OPDAllergyAlertsDto.class);
			     calergy.add(Restrictions.eq("deleted","N"));
			     calergy.add(Restrictions.eq("treatmentDto", tobj));
			     List<OPDAllergyAlertsDto> listAlergy = calergy.list();
			      if(listAlergy.size() > 0) {
			    	  for(int i=0; i< listAlergy.size() ;i++) {
			    		  OPDAllergyAlertsDto alObj= listAlergy.get(i);
			    		  
			    		  OPDAllergyAlertsDto newalObj=new OPDAllergyAlertsDto();
			    		  newalObj.setAllergyAlertsId(0);
			    		  newalObj.setAllergyName(alObj.getAllergyName());
			    		  newalObj.setAllergyType(alObj.getAllergyType());
			    		  newalObj.setAllergyDate(alObj.getAllergyDate());
			    		  newalObj.setAllergyReaction(alObj.getAllergyReaction());
			    		  newalObj.setAllergyNotes(alObj.getAllergyNotes());
			    		  newalObj.setUnitId(alObj.getUnitId());
			    		  newalObj.setRegistrationDto(pobj);
			    		  newalObj.setTreatmentDto(cuurentTreatObj);
			    		  
			    		  sessionFactory.getCurrentSession().merge(newalObj);
			    	  }
			      }
			     // alergy end
			 
			 return 1;
		   
	   }catch (Exception e) {
		e.printStackTrace();
	}
		return 0;
	}

}
