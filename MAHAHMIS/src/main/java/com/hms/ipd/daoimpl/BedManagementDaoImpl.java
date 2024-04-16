package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.math.BigInteger;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.BedManagementMessages;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.ConfigurationServiceService;
import com.hms.ehat.service.RegService;
import com.hms.ipd.dao.BedManagementDao;
import com.hms.ipd.dto.HTypeHallBedTreatmentBedDTO;
import com.hms.ipd.dto.IPDPatientDetailsDTO;
import com.hms.ipd.utility.CommonBedsMagMethods;

@Repository
public class BedManagementDaoImpl implements BedManagementDao {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	private @Autowired SessionFactory sessionFactory;
	private @Autowired ConfigurationServiceService configServiceService;
	private @Autowired CommonBedsMagMethods commonBedsMagMethods;
	private @Autowired RegService regService;

	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	SimpleDateFormat formatter4 = new SimpleDateFormat("yyyy-MM-dd");
	String todaysDate = formatter4.format(currentDate.getTime());
	/**
	 * @author Touheed
	 * @modified 25-Feb-2022
	 * @reason : allocate bed for patient
	 */
	@Override
	public synchronized String allocateBed(int bedID, int tid, String bedAllocStatus, String dallocBedId,
			String isolation, String patientType, String billableBedType, Integer userId, Integer unitId) {
		LOGGER.info("BedManagementDaoImpl: allocateBed method called for TreatmentId:" + tid);
		IPDPatientDetailsDTO ipdPatientDetails = commonBedsMagMethods.fetchPatinetTreatmentBillDetailsByTid(tid);
		String status = BedManagementMessages.BEDALLOCATED.getMessage();
		if (bedAllocStatus.equals("new")) {
			// Get treatmentbed count
			Integer isBedAllocatedCount = commonBedsMagMethods.fetchTreatmentBedsCount(bedID, tid, "Y");
			if (isBedAllocatedCount == 0) {
				//TreatmentDto treatment = commonBedsMagMethods.fetchTreatment(tid);
				List<BillDetailsIpdDto> listBillDetailsIpd = commonBedsMagMethods.fetchBillDetailsIpdServiceWise(3,
						bedID, "onBedFlag", 'Y');
				if (listBillDetailsIpd.size() > 0) {// Bed already allocated
					status = BedManagementMessages.BEDNOTAVAILABLE.getMessage();
				} else {
					// Insert into treatment beds
					//TreatMentBeds treatMentBeds = commonBedsMagMethods.saveTreatmentBeds(new TreatMentBeds(tid, bedID,
					//		"Y", new Date(), isolation, patientType, billableBedType, userId, new Date()));
					TreatMentBeds treatMentBeds = new TreatMentBeds();
					if (treatMentBeds != null) {// Is treamentbeds save
						// bill_id,sp_dic_master_id,bedridden,seropositive bedridden and seropositive
						// not present in ehat_treatment table no charges
						// So following will default charges
						Float bedrcharges = 0f;
						Float serocharges = 0f;
						Double charges = 0.0;
						Double nursingCharges = 0.0;
					
						
						HTypeHallBedTreatmentBedDTO hallBedTreatmentBed = null;// contains all hall, halltype, bed and
																				// treatment bed related data
						if (isolation.equals("1")) {// fetch isolocation charges
							if (billableBedType.equals("0"))
								hallBedTreatmentBed = commonBedsMagMethods.fetchHTypeHallBedTreatmentBed(bedID, "Y",
										"BED");
							else
								hallBedTreatmentBed = commonBedsMagMethods
										.fetchHTypeHallBedTreatmentBed(Integer.parseInt(billableBedType), "Y", "HALL");

						} else {// fetch normal charges
							if (billableBedType.equals("0"))
								hallBedTreatmentBed = commonBedsMagMethods.fetchHTypeHallBedTreatmentBed(bedID, "N",
										"BED");
							else
								hallBedTreatmentBed = commonBedsMagMethods
										.fetchHTypeHallBedTreatmentBed(Integer.parseInt(billableBedType), "N", "BED");
						}

						if (isolation.equals("1")) { 
							charges =hallBedTreatmentBed.getLease_per_bed_isolation().doubleValue();
							nursingCharges= hallBedTreatmentBed.getMedical_team().doubleValue();
						}else { 
							charges =Double.parseDouble(hallBedTreatmentBed.getLease_per_bed());
							nursingCharges=hallBedTreatmentBed.getMedical_team().doubleValue();
						}
						List<ConfigurServicesDto> listConfigurService = configServiceService.fetchMedicalTeamCharges(1, ipdPatientDetails.getCharges_master_slave_id(), 2,
									hallBedTreatmentBed.getEhat_hallid(), 0, 0);
			
						Double hallcharges = 0.0;
						Double medicalteamcharges = 0.0;
						Double otherAmount = 0.0;
						Double otherNur = 0.0;
						Integer sponsorId=0;
						
						if(ipdPatientDetails.getCharges_master_slave_id()> 0)
							sponsorId=1;
						
						if (listConfigurService.size() > 0) {
							hallcharges = listConfigurService.get(0).getHallCharges();
							medicalteamcharges = listConfigurService.get(0).getMedicalCharges();
							if (hallcharges > -1) {
								otherAmount = hallcharges;
							}
							if (medicalteamcharges > -1) {
								otherNur = medicalteamcharges;
							}
						}
						//Emergency Charges code Start
						Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
								"select count(*) from hospital_holiday where date="+todaysDate);

						Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
						
						//check for sunday today?
						SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
			    	    String currentDay = dayFormatter.format(currentDate.getTime());
			    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTimeNew()){
			    	    	//fetch emergency percentage
			    	    	Double emrChrPer = getEmergencyPerNew();
			    	    	charges = charges *(1+emrChrPer/100);
			    	    	nursingCharges = nursingCharges * (1+emrChrPer/100);
			    	    	otherAmount = otherAmount * (1+emrChrPer/100);
			    	    	otherNur = otherNur * (1+emrChrPer/100);
			    	    }
						//Emergency Charges code End
			    	    
						
						BillDetailsIpdDto billDetailsIpdDto= prepareBillDetailsIPD(
								charges,ipdPatientDetails.getBill_id(),0.0,userId,
								new Date(),0.0,0,0,
								ipdPatientDetails.getPatient_id(),1,charges,3,
								ipdPatientDetails.getSource_type_id(),0,bedID,unitId,
								tid,charges,0,2,
								otherAmount,0,0,otherAmount,
								otherAmount,'Y',0,ipdPatientDetails.getCharges_master_slave_id(),
								sponsorId
								);
						
						//inserting bed charges
						 billDetailsIpdDto = (BillDetailsIpdDto) sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
						
						//Prepare nursing charges
						 billDetailsIpdDto= prepareBillDetailsIPD(
								 	nursingCharges,ipdPatientDetails.getBill_id(),0.0,userId,
									new Date(),0.0,0,0,
									ipdPatientDetails.getPatient_id(),1,nursingCharges,3,
									ipdPatientDetails.getSource_type_id(),0,0,unitId,
									tid,nursingCharges,0,2,
									otherNur,0,0,otherNur,
									otherNur,'Y',0,ipdPatientDetails.getCharges_master_slave_id(),
									sponsorId
									);
						 //Inserting nursing charges
						 billDetailsIpdDto = (BillDetailsIpdDto) sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
						//Inserting admin charges
						 billDetailsIpdDto =  saveAdmincharges(ipdPatientDetails,userId,unitId) ;
						 commonBedsMagMethods.updateBedState(bedID,"3");//update bed status	
						 //inserting consulation charges
						 saveRegistrationNConsultationCharges(tid,billDetailsIpdDto,ipdPatientDetails.getDoctor_id());//registration and consultation charges
						 
					} // treatMentBeds

				} // else isBedAllocatedCount

			} else {
				status = BedManagementMessages.BEDALREADYALLOCATED.getMessage();
			}
		}
		return status;
	}
	
	private BillDetailsIpdDto saveAdmincharges(IPDPatientDetailsDTO ipdPatientDetails,int userId,int unitId) {
		LOGGER.info("BedManagementDaoImpl: saveAdmincharges method called.");
		BillDetailsIpdDto  billDetailsIpdDto=null;
		try {
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int servId = Integer.parseInt(resourceBundleEhat.getObject("adminServId").toString());
			int subServId = Integer.parseInt(resourceBundleEhat.getObject("adminSubServId").toString());
			if(masterConfigAccess(1,2,servId)){
				int chargesSlaveId = ipdPatientDetails.getCharges_master_slave_id();
				int sponsorId= (chargesSlaveId > 0) ? 1:0;
				String sql = "SELECT charges FROM ehat_subservice where id="+subServId+"";		
				Double adminCharges = (Double) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();	
				
				  billDetailsIpdDto= prepareBillDetailsIPD(
					 	0.0,ipdPatientDetails.getBill_id(),0.0,userId,
						new Date(),0.0,0,0,
						ipdPatientDetails.getPatient_id(),1,0.0,servId,//20 for admin service
						ipdPatientDetails.getSource_type_id(),0,subServId,unitId,
						ipdPatientDetails.getTreatment_id(),0.0,0,2,
						0.0,0,0,0.0,
						0.0,'N',0,ipdPatientDetails.getCharges_master_slave_id(),
						sponsorId
						);
					billDetailsIpdDto.setFirstAdminChrg(adminCharges);
					billDetailsIpdDto=	(BillDetailsIpdDto) sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
					
					sql="select ifnull(sum(amount),0) from ehat_bill_details_ipd where treatment_id="+ipdPatientDetails.getTreatment_id()+" and deleted='N' and cancle='N' ";
					Double totBill = (Double) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();		 
					
					sql = "update ehat_bill_master set total_bill="+totBill+"where treatment_id="+ipdPatientDetails.getTreatment_id();				
					sessionFactory.getCurrentSession().createQuery(sql).executeUpdate();
					
			}
			LOGGER.info("Admin charges save to bill details IPD values:"+billDetailsIpdDto.toString());
			return billDetailsIpdDto;
			
		} catch (NumberFormatException e) {
			LOGGER.error("Error Orrcured in saveAdmincharges during conversion:"+e.getMessage());
			return null;
		} catch (HibernateException e) {
			LOGGER.error("Error Orrcured in saveAdmincharges during DB operation:"+e.getMessage());
			return null;
		}
	}

	private void saveRegistrationNConsultationCharges(int tid, BillDetailsIpdDto billDetailsIpdDto,
			String docIdsRes) {
		String treatmentFlag="N";
		Integer count= commonBedsMagMethods.countOfTreatmentIdsByPatientId(treatmentFlag,billDetailsIpdDto.getPatienttId());
		String queryType = (count > 0) ? "markvisit" : "insert";
		regService.saveBillDetailsIpd(
				billDetailsIpdDto,
				billDetailsIpdDto.getCreatedBy(), queryType,
				docIdsRes);

		
	}



	private boolean chkEmergencyTimeNew() {
		LOGGER.info("BedManagementDaoImpl: chkEmergencyTimeNew method");
		boolean emergencyFlag = false;
		try{
		DateFormat sdf = new SimpleDateFormat("HH"); 
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
		String todays_time = formatter1.format(currentDate.getTime());
		DateFormat sdf2 = new SimpleDateFormat("mm"); 
		int fromTime = 0;
		int toTime = 0;
		String hql = "select emergencyAdmissionFromTime,emergencyAdmissionToTime from hospitalaccinfo";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(hql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> details = query.list();
		int min = Integer.parseInt(sdf2.format(Time.valueOf(todays_time)).toLowerCase());
		int inTime = Integer.parseInt(sdf.format(Time.valueOf(todays_time)).toLowerCase());
			for (Map<String, Object> row: details) {
					//assigning (fromTime & toTime)Time values from table into sdf("HH") hours
					fromTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionFromTime")).toLowerCase());
					toTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionToTime")).toLowerCase());
			}
		//business logic for registration charges.
			if ((fromTime > toTime) && (inTime >= fromTime || inTime <= toTime)) {
				if(inTime == toTime && min>0 )
				{
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else if (fromTime < toTime && (inTime >= fromTime && inTime <= toTime)) {
				if(inTime == toTime && min>0 )
				{
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else{
				emergencyFlag = false;
		}
		return emergencyFlag;
		}
		catch(Exception e){

			e.printStackTrace();
			LOGGER.error("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return emergencyFlag;
		}

	}
	
	private Double getEmergencyPerNew() {
		LOGGER.info("BedManagementDaoImpl: getEmergencyPerNew method");
		Double emerPerNew = 0.0;
		try {
			Query emerChr = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select emrChrPer from hospitalaccinfo where idhospitalAccInfo=1");

			emerPerNew = (Double) emerChr.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
			LOGGER.error("ehatException -: Class Name :"
					+ new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : "
					+ new Exception().getStackTrace()[0].getMethodName()
					+ " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return emerPerNew;
		}
		return emerPerNew;
	}
	
	
	//Setting bill ipd deatisl
	
	private BillDetailsIpdDto prepareBillDetailsIPD(
				Double charges, Integer billId, Double concession, Integer userId,
				Date date, Double discount, Integer doctorId, Integer patientCatId,
				Integer patientId, Integer quantity, Double rate, Integer serviceId, 
				Integer sourceTypeId,Integer sponserCatId, Integer subServiceId, Integer unitId,
				Integer treatementId, Double coPay, Double pay, Integer departmentId, 
				Double otherAmount, Double otherCoPay, Double otherConcession, Double otherPay,
				Double otherRate, Character onBedFlag, Double emrPer, Integer chargesSlaveId, 
				Integer sponsorId
			) {
			BillDetailsIpdDto billDetailsIpd= new BillDetailsIpdDto();
			billDetailsIpd.setAmount(charges);
			billDetailsIpd.setBillId(billId);
			billDetailsIpd.setConcession(concession);
			billDetailsIpd.setCreatedBy(userId);
			billDetailsIpd.setCreatedDateTime(date);
			billDetailsIpd.setDiscount(discount);
			billDetailsIpd.setDoctorId(doctorId);
			billDetailsIpd.setPatientCatId(patientCatId);
			billDetailsIpd.setPatienttId(patientId);
			billDetailsIpd.setQuantity(quantity);
			billDetailsIpd.setRate(rate);
			billDetailsIpd.setServiceId(serviceId);
			billDetailsIpd.setSourceTypeId(sourceTypeId);
			billDetailsIpd.setSponsorCatId(sponserCatId);
			billDetailsIpd.setSubServiceId(subServiceId);
			billDetailsIpd.setUnitId(unitId);
			billDetailsIpd.setTreatmentId(treatementId);
			billDetailsIpd.setCoPay(coPay);
			billDetailsIpd.setPay(pay);
			billDetailsIpd.setDepartmentId(departmentId);
			billDetailsIpd.setOtherAmount(otherAmount);
			billDetailsIpd.setOtherCoPay(otherCoPay);
			billDetailsIpd.setOtherConcession(otherConcession);
			billDetailsIpd.setOtherPay(otherPay);
			billDetailsIpd.setOtherRate(otherRate);
			billDetailsIpd.setOnBedFlag(onBedFlag);
			billDetailsIpd.setEmrPer(emrPer);
			billDetailsIpd.setChargesSlaveId(chargesSlaveId);
			billDetailsIpd.setSponsorId(sponsorId);
			return billDetailsIpd;
		}
	private BillDetailsIpdDto prepareBillDetailsIPD(Double charges, Integer billId, double concession, Integer userId, Date date,
			double discount, int doctorId, int patientCatId, int patientId, int quantity, Double rate,
			int serviceId, int sourceTypeId, int sponserCatId, int subServiceId, Integer unitId, int treatementId, Double coPay,
			int pay, int departmentId, Double otherAmount, int otherCoPay, int otherConcession, Double otherPay, Double otherRate,
			char onBedFlag, int emrPer, Integer chargesSlaveId, Integer sponsorId) {
		
		LOGGER.info("BedManagementDaoImpl: prepareBillDetailsIPD method called ");
		BillDetailsIpdDto billDetailsIpd= new BillDetailsIpdDto();
		billDetailsIpd.setAmount(charges);
		billDetailsIpd.setBillId(billId);
		billDetailsIpd.setConcession(concession);
		billDetailsIpd.setCreatedBy(userId);
		billDetailsIpd.setCreatedDateTime(date);
		billDetailsIpd.setDiscount(discount);
		billDetailsIpd.setDoctorId(doctorId);
		billDetailsIpd.setPatientCatId(patientCatId);
		billDetailsIpd.setPatienttId(patientId);
		billDetailsIpd.setQuantity(quantity);
		billDetailsIpd.setRate(rate);
		billDetailsIpd.setServiceId(serviceId);
		billDetailsIpd.setSourceTypeId(sourceTypeId);
		billDetailsIpd.setSponsorCatId(sponserCatId);
		billDetailsIpd.setSubServiceId(subServiceId);
		billDetailsIpd.setUnitId(unitId);
		billDetailsIpd.setTreatmentId(treatementId);
		billDetailsIpd.setCoPay(coPay);
		billDetailsIpd.setPay(pay);
		billDetailsIpd.setDepartmentId(departmentId);
		billDetailsIpd.setOtherAmount(otherAmount);
		billDetailsIpd.setOtherCoPay(otherCoPay);
		billDetailsIpd.setOtherConcession(otherConcession);
		billDetailsIpd.setOtherPay(otherPay);
		billDetailsIpd.setOtherRate(otherRate);
		billDetailsIpd.setOnBedFlag(onBedFlag);
		billDetailsIpd.setEmrPer(emrPer);
		billDetailsIpd.setChargesSlaveId(chargesSlaveId);
		billDetailsIpd.setSponsorId(sponsorId);
		return billDetailsIpd;
		
	}
	
	public boolean masterConfigAccess(int unitId, int deptId, int serviceId) {
		LOGGER.info("BedManagementDaoImpl: masterConfigAccess method called ");
		
		String sql = "SELECT count(*) FROM ehat_master_config where deleted='N' and unit_id="+unitId+" and" +
				  " dept_id="+deptId+" and service_id="+serviceId+" ";		
				
			Integer count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
	
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		}

	@Override
	public String shiftBed(int bedID, int tid, String bedAllocStatus, String dallocBedId, String isolation,
			String patientType, String billableBedType, Integer userId, Integer unitId) {
		LOGGER.info("BedManagementDaoImpl: shiftBed method called ");
		
		try {
			String status= BedManagementMessages.BEDSHIFTED.getMessage();
				Integer physicalDisCount = commonBedsMagMethods.countOfphysicalDisCountByTid(tid);
				if(physicalDisCount==0) {
					commonBedsMagMethods.updateTreamentBedForShift(dallocBedId,userId);
					commonBedsMagMethods.updateBedState(bedID,"2");
					commonBedsMagMethods.updateOnBedFlagInBillDetailsIPD(dallocBedId,tid);
					allocateBed(bedID, tid, bedAllocStatus, dallocBedId, isolation,
							patientType, billableBedType, userId, unitId);
				}
				
			return status;
		} catch (Exception e) {
			LOGGER.error("Error Orrcured in BedManagementDaoImpl  during shiftBed:"+e.getMessage());
			return BedManagementMessages.BEDSERVICEDOWN.getMessage();
		}
		
	}	
}
