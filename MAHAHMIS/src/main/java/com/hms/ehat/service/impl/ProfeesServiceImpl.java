package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.PatientOutStandingReport;
import com.hms.ehat.dao.ProfeesDao;
import com.hms.ehat.dto.AllPfPostedRecordsDto;
import com.hms.ehat.dto.AreaWisePatientViewDto;
import com.hms.ehat.dto.AreaWisePatientViewDto2;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DocTypDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.DrPaymentVoucherDto;
import com.hms.ehat.dto.DynamicGroupMasterDto;
import com.hms.ehat.dto.DynamicGroupSlaveDto;
import com.hms.ehat.dto.GroupMasterDto;
import com.hms.ehat.dto.GroupReceiptSlaveDetails;
import com.hms.ehat.dto.GroupSlaveDto;
import com.hms.ehat.dto.HospitalReport;
import com.hms.ehat.dto.PercentMasterDto;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.ProfeesService;
import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Doctor;
import com.hms.dto.HisabProFeesDTO;
import com.hms.dto.Users;
import com.hms.ehat.dto.RefDoctorDTO;
import com.hms.ehat.dto.ReferDrPaymentVoucherDto;

@Service
public class ProfeesServiceImpl implements ProfeesService {

	@Autowired
	ProfeesDao profeesDao;
	
	@Autowired
	SessionFactory sessionFactory;

	// Irfan Khan @date: 15-June-2017 @reason : To Fetch all records
	@Override
	@Transactional
	public DeptMasterDto fetchDeptAndServices() {
		return profeesDao.fetchDeptAndServices();
	}

	// Irfan Khan @date: 19-July-2017 @reason : To save n update percentage
	@Override
	@Transactional
	public int savePercentMaster(String percentMasterList, Integer userId, int doctorId, int unitId,
			String callFrom, int caseType,int drDeptId,int chargesId,int chargesSlaveId) {
		int a=0;
		String drDeptFlag = "P"; //P for personal percentage records
		if(doctorId > 0){
			a = profeesDao.savePercentMaster(percentMasterList, userId, doctorId, unitId,
					callFrom, caseType, drDeptId, drDeptFlag,chargesId,chargesSlaveId);
		}else if(doctorId == 0 && drDeptId > 0){
			drDeptFlag = "D";//D for DrDept percentage records
			a = profeesDao.savePercentMasterDrDept(percentMasterList, userId, doctorId, unitId,
					callFrom, caseType, drDeptId, drDeptFlag,chargesId,chargesSlaveId);
		}
		
		return a;
	}
	
	// Irfan Khan @date: 22-Jan-2018 @reason : To save n update Advance percentage
	@Override
	@Transactional
	public int savePercentMaster2(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,
			int drDeptId, int chargesId, int chargesSlaveId) {
		int a = 0;
		String drDeptFlag = "P"; // P for personal percentage records
		if (doctorId > 0) {
			a = profeesDao.savePercentMaster2(percentMasterList, userId,
					doctorId, unitId, callFrom, caseType, drDeptId, drDeptFlag,
					chargesId, chargesSlaveId);
		} else if (doctorId == 0 && drDeptId > 0) {
			drDeptFlag = "D";// D for DrDept percentage records
			a = profeesDao.savePercentMasterDrDept(percentMasterList, userId,
					doctorId, unitId, callFrom, caseType, drDeptId, drDeptFlag,
					chargesId, chargesSlaveId);
		}

		return a;
	}

	// Irfan Khan @date: 19-July-2017 @reason : To Fetch all records
	@Override
	@Transactional
	public PercentMasterDto fetchPercentRecords(int doctorId,int unitId,int caseType,String callFrom) {
		return profeesDao.fetchPercentRecords(doctorId,unitId,caseType, callFrom);
	}

	// Irfan Khan @date: 20-July-2017 @reason : To Fetch record by drid and unitid
	@Override
	@Transactional
	public PercentMasterDto editPercentMaster(int doctorId, int unitId,int caseType,int chargesSlaveId) {
		return profeesDao.editPercentMaster(doctorId,unitId,caseType, chargesSlaveId);
	}

	// Irfan Khan @date: 12-Dec-2017 @reason : To Fetch record by Dr.Dept to edit and update
	@Override
	@Transactional
	public PercentMasterDto updateDrDeptPercentMaster(int drDeptId, int unitId,
			int caseType,String drDeptFlag) {
		return profeesDao.updateDrDeptPercentMaster(drDeptId,unitId,caseType,drDeptFlag);
	}
	
	// Irfan Khan @date: 20-July-2017 @reason : To Delete percentage records = N
	@Override
	@Transactional
	public int deletePercentRecord(Integer userId, int doctorId, int unitId, int caseType) {
		int a = profeesDao.deletePercentRecord(userId, doctorId, unitId, caseType);
		return a;
	}

	//Irfan Khan @date: 24-July-2017 @reason : To fetch paid records of doctor.
	@Override
	@Transactional
	public ProfeesDoctorsPaymentDto proFeesDoctorPayment(int doctorId,
			Date fromDate, Date toDate, int unitId, int deptId, String serviceId,
			Integer userId, int specialisationId, int billTypeId) {
		if(doctorId > 0){// for single doctor list
			if(deptId == 2){//IPD
				return profeesDao.proFeesDoctorPaymentIpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}else{//OPD n rest
				return profeesDao.proFeesDoctorPaymentOpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}
			
		}else{//for all doctors list
			if(deptId == 2){//IPD
				return profeesDao.proFeesDoctorPaymentForAllDocIpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}else{//OPD n rest
				return profeesDao.proFeesDoctorPaymentForAllDocOpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId,specialisationId,billTypeId);
			}
			
		}
		
	}

	//Irfan Khan @date: 7-Aug-2017 @reason : save voucher details
	@Override
	@Transactional
	public int saveDrPaymentVoucher(String voucherDetails, Integer userId, int unitId, String profeesDetails) {
		int a = profeesDao.saveDrPaymentVoucher(voucherDetails, userId, unitId, profeesDetails);
		return a;
	}

	// Irfan Khan @date: 11-Aug-2017 @reason : To Fetch all Vouchers
	@Override
	@Transactional
	public DrPaymentVoucherDto fetchDoctorsVouchers(String callFrom,
			int doctorId,int unitId,int deptId,Date fromDate,Date toDate) {
		return profeesDao.fetchDoctorsVouchers(callFrom, doctorId,unitId,deptId,fromDate,toDate);
	}

	// Irfan Khan @date: 16-Aug-2017 @reason : To Cancel Voucher
	@Override
	@Transactional
	public int cancelVoucher(Integer userId, int voucherId, int deptId) {
		int a = profeesDao.cancelVoucher(userId, voucherId, deptId);
		return a;
	}

	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@Override
	@Transactional
	public ProfeesDoctorsPaymentDto proFeesDoctorsReport(int doctorId,
			Date fromDate, Date toDate, int unitId, int deptId, int serviceId,
			Integer userId) {
		if(deptId == 2){//ipd
			return profeesDao.proFeesDoctorsReportIpd(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId);
		}else{//opd,diag,others
			return profeesDao.proFeesDoctorsReport(doctorId,fromDate,toDate,unitId,deptId,serviceId,userId);
		}
		
	}

	/*// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@Override
	@Transactional
	public ProfeesDoctorsPaymentDto proFeesAllDocReport(int doctorId,
			Date fromDate, Date toDate, int unitId, int deptId, int serviceId,
			Integer userId, int drDeptId) {
		if (deptId == 2) {
			return profeesDao.proFeesAllDocReportIpd(doctorId, fromDate, toDate,
					unitId, deptId, serviceId, userId, drDeptId);
		} else {
			return profeesDao.proFeesAllDocReport(doctorId, fromDate, toDate,
					unitId, deptId, serviceId, userId, drDeptId);
		}

	}*/
	
	//Irfan khan 29-Mar-2018 Fetch All doctors profees posted records
	@Override
	@Transactional
	public ProfeesDoctorsPaymentDto allPfPostedRecords(int doctorId,
			Date fromDate, Date toDate, int unitId, int deptId, int serviceId,
			 int drDeptId) {
	
			return profeesDao.allPfPostedRecords(doctorId, fromDate, toDate,
					unitId, deptId, serviceId, drDeptId);

	}
		
	// Irfan Khan @date: 24-Aug-2017 @reason : save group details
	@Override
	@Transactional
	public int saveGroupDetails(String groupSlaveDetails,
			String groupMasterDetails, Integer userId,String callFrom) {
		int a = profeesDao.saveGroupDetails(groupSlaveDetails,groupMasterDetails, userId,callFrom);
		return a;
	}

	// Irfan Khan @date: 28-Aug-2017 @reason : To Group master
	@Override
	@Transactional
	public GroupMasterDto fetchGroupMasterList(String callFrom, String letter) {
		return profeesDao.fetchGroupMasterList(callFrom,letter);
	}

	// Irfan Khan @date: 30-Aug-2017 @reason : To Group slave
	@Override
	@Transactional
	public GroupSlaveDto fetchGroupSlaveList(int groupId) {
		return profeesDao.fetchGroupSlaveList(groupId);
	}

	// Irfan Khan @date: 30-Aug-2017 @reason : To Delete Group Master
	@Override
	@Transactional
	public int deleteGroupMaster(Integer userId, int groupId) {
		int a = profeesDao.deleteGroupMaster(userId, groupId);
		return a;
	}
	
	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@Override
	@Transactional
	public GroupReceiptSlaveDetails proFeesGroupDoctorsReport(int doctorId,
			Date fromDate, Date toDate, int unitId, int deptId, int serviceId,
			Integer userId) {
		return profeesDao.proFeesGroupDoctorsReport(doctorId, fromDate, toDate,
				unitId, deptId, serviceId, userId);
	}

	//@author : Irfan Khan @date: 28-Sep-2017 @reason : Autosuggestion for doctor
	@Override
	@Transactional
	public List<DoctorDto> setAutoSugForDoctorList(String letter,
			String callFrom, int specialisationId) {
		
		
		if (callFrom.equalsIgnoreCase("docType")) {// doctor Type
			return profeesDao.setAutoSugForDoctorListDocType(letter, callFrom);
		}else if(callFrom.equalsIgnoreCase("profees")){
			if(specialisationId > 0){//hosp specialisation wise doctors list
				return profeesDao.setAutoSugForDocListSpcl(letter, callFrom,specialisationId);
			}else{
				return profeesDao.setAutoSugForDoctorListAll(letter, callFrom);// All Doctors
			}
			
		} else {
			return profeesDao.setAutoSugForDoctorListAll(letter, callFrom);// All Doctors
		}
		
	}

	// Irfan Khan @date: 11-oct-2017 @reason : To Fetch all hosp specialisation
	@Override
	@Transactional
	public HospitalSpecialisationDto getHospSpecialization() {
		
		return profeesDao.getHospSpecialization();
	}
	
	@Override	  
	@Transactional public HisabProFeesDTO fetchProFeesHisab(int unitId,int
			userId,int deptId,String fromDate,String toDate,int drId,int fromToRange) {
  
		return profeesDao.fetchProFeesHisab(unitId,userId,deptId,fromDate,toDate,drId,fromToRange); 
	}

	// Irfan Khan @date: 8-Dec-2017 @reason : To fetch configured list of dr dept
	@Override
	@Transactional
	public PercentMasterDto fetchConfgDrDeptList(String callFrom, String letter) {
		return profeesDao.fetchConfgDrDeptList(callFrom,letter);
	}

	// Irfan Khan @date: 12-Dec-2017 @reason : To fetch configured list of doctor personal
	@Override
	@Transactional
	public PercentMasterDto fetchConfgDrPersonalList(String callFrom, String callSearch, String letter) {
		return profeesDao.fetchConfgDrPersonalList(callFrom,callSearch,letter);
	}
		
		
	//@author : Irfan Khan @date: 11-Dec-2017 @reason : Autosuggestion for Group List
	@Override
	@Transactional
	public List<GroupMasterDto> setAutoSugForGroupList(String letter) {
		return profeesDao.setAutoSugForGroupList(letter);
	}

	// Irfan Khan @date: 11-Dec-2017 @reason : To fetch Groups report
	@Override
	@Transactional
	public GroupReceiptSlaveDetails profeesGroupWiseReport(int groupId,
			Date fromDate, Date toDate, int unitId, int deptId, int serviceId,
			Integer userId) {
		return profeesDao.profeesGroupWiseReport(groupId, fromDate, toDate,
				unitId, deptId, serviceId, userId);
	}

	//Irfan khan 2-Jan-2018 @reason : Single doctor summary report
	@Override
	@Transactional
	public ProfeesDoctorsPaymentDto profeesSingleDocSummary(int doctorId,
			Date fromDate, Date toDate) {
		return profeesDao.profeesSingleDocSummary(doctorId, fromDate, toDate);
	}	
	
	// Irfan Khan @date: 24-Aug-2017 @reason : save group details
	@Override
	@Transactional
	public int saveDynamicGroupDetails(String groupSlaveDetails,
			String groupMasterDetails, Integer userId, String callFrom) {
		int a = profeesDao.saveDynamicGroupDetails(groupSlaveDetails,
				groupMasterDetails, userId, callFrom);
		return a;
	}
	
	//Irfan khan @10-Jan-2018 to fetch dynamic group details
	@Override
	@Transactional
	public DynamicGroupMasterDto fetchDynamicGroupMasterList(String callFrom, String letter) {
		return profeesDao.fetchDynamicGroupMasterList(callFrom,letter);
	}

	@Override
	@Transactional
	public int deleteForDrDeps(Integer drDeptId, HttpServletRequest request,Integer caseType,Integer unitId) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		profeesDao.deleteForDrDeps(drDeptId, userId,caseType,unitId);
		return 1;
	}
	
	@Override
	@Transactional
	public int deleteDoctAndGroup(Integer docId, HttpServletRequest request,Integer caseType,Integer unitId) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		profeesDao.deleteDoctAndGroup(docId, userId,caseType,unitId);
		return 1;
	}
	
	@Override
	@Transactional
	public int deleteDynamicGroupMaster(Integer dMasterId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		profeesDao.deleteDynamicGroupMaster(dMasterId, userId);
		return 1;
	}
	
	@Override
	@Transactional
	public DynamicGroupSlaveDto editDynamicGroupMaster(int groupId) {
		return profeesDao.editDynamicGroupMaster(groupId);
	}
	
	//@author : Irfan Khan @date: 24-Jan-2018 @reason : Autosuggestion for doctor
	@Override
	@Transactional
	public List<DoctorDto> fetchDoctorListAutoSug(String letter,
			String callFrom, int specialisationId,int unitId) {

				return profeesDao.fetchDoctorListAutoSug(letter, callFrom,
						specialisationId,unitId);

	}

	// @author : Irfan Khan @date: 14-Feb-2018 @reason : fetch sub service % from perSlave
	@Override
	@Transactional
	public List<PercentSlaveDto> fetchAndSetSubServiceOnEdit(int serviceId,
			int unitId, int doctorId, int drDeptId, int caseType,
			int chargesId, int chargesSlaveId) {
		return profeesDao.fetchAndSetSubServiceOnEdit(serviceId, unitId,doctorId,
				drDeptId, caseType,chargesId,chargesSlaveId);
	}

	//Irfan khan-- Fetching super master of service based on there id 12-Mar-2018
	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchSuperCatPrcentMaster(
			Integer chargesMasterDto) {
			
			return profeesDao.fetchSuperCatPrcentMaster(chargesMasterDto);
		
	}

	//irfan khan 16-mar-2018 to dynamic doctors availability
	@Override
	@Transactional
	public int checkDynamicDocAvailability(int doctorId) {
		return profeesDao.checkDynamicDocAvailability(doctorId);
	}

	//Irfan khan 30-Mar-2018 records of profees voucher
	@Override
	@Transactional
	public AllPfPostedRecordsDto fetchProfeesVoucherReport(String voucherId,
			Date fromDate, Date toDate) {
		return profeesDao.fetchProfeesVoucherReport(voucherId,fromDate,toDate);
	}

	//Irfan Khan @date: 30-June-2018 @reason : get All Voucher
	@Override
	@Transactional
	public DrPaymentVoucherDto fetchAllVoucherIds() {
		return profeesDao.fetchAllVoucherIds();
	}

	//Irfan khan 6-Apr-2018 Outstanding report
	@Override
	@Transactional
	public ProfeesDoctorsPaymentDto fetchOutStandingReport(Date fromDate,
			Date toDate,int departmentId) {
		return profeesDao.fetchProfeesVoucherReport(fromDate,toDate,departmentId);
	}

	//Irfan khan 19-April-2018 Reference dr. records
	@Override
	@Transactional
	public AllPfPostedRecordsDto fetchProfeesReferenceDrReport(Date fromDate,
			Date toDate) {
		return profeesDao.fetchProfeesReferenceDrReport(fromDate,toDate);
	}

	// Irfan Khan @date: 29-June-2018 @reason : area Wise Patient Report
	@Override
	@Transactional
	public AreaWisePatientViewDto areaWisePatientReport(int townId,
			int talukaId, int districtId, int stateId) {
		return profeesDao.areaWisePatientReport(townId, talukaId,
				districtId, stateId);
	}
	
	// Irfan Khan @date: 29-June-2018 @reason : area Wise Patient Report
	@Override
	@Transactional
	public AreaWisePatientViewDto2 areaWisePatientReport2(int townId,
			int talukaId, int districtId, int stateId,String diagnosis) {
		return profeesDao.areaWisePatientReport2(townId, talukaId,
				districtId, stateId, diagnosis);
	}

	//Irfan khan 27-july-2018 fetch hall n hall type id by treatment id
	@Override
	@Transactional
	public List<Integer> fetchHallIdsToSetOnload(int treatmentId) {
		return profeesDao.fetchHallIdsToSetOnload(treatmentId);
	}

	// Irfan khan @date: 21-Sep-2018 @reason : Fetch canceled admission records
	@Override
	@Transactional
	public TreatmentDto canceledAdmissionRecords(Date fromDate, Date toDate) {
		return profeesDao.canceledAdmissionRecords(fromDate,toDate);
	}
	
	// Ajay khandare @date: 5-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, x-ray, sonography, etc..
	@Override
	@Transactional
	public List<HospitalReport> getMonthyHospitalActivitiesReport(String fromYear,
			String fromMonth) {
		return profeesDao.getMonthyHospitalActivitiesReport(fromYear,fromMonth);
	}

	@Override
	@Transactional
	public List<HospitalReport> getyearWiseAndFundInfomationHospitalReport(
			String fromYear, String Tofrom) {
		return profeesDao.getyearWiseAndFundInfomationHospitalReport(fromYear,Tofrom);
	}

	@Override
	@Transactional
	public List<HospitalReport> getMonthyHospitalActivitiesPerformanceReport(
			String fromYear, String fromMonth) {
		return profeesDao.getMonthyHospitalActivitiesPerformanceReport(fromYear,fromMonth);
	}

	@Override
	@Transactional
	public List<HospitalReport> getMonthyAndProgresiveHospitalReport1(
			String fromYear, String fromMonth) {
		return profeesDao.getMonthyAndProgresiveHospitalReport1(fromYear,fromMonth);
	}

	@Override
	@Transactional
	public List<TreatmentDto> getOPDIPDOperationSpecilitywiseReport(
			 String fromMonth,String fromYear) {
		return profeesDao.getOPDIPDOperationSpecilitywiseReport(fromMonth,fromYear);
	}

	@Override
	@Transactional
	public List<HospitalReport> getMonthlyOutPutFormatSpecilitywiseReport(
			String fromMonth, String fromYear) {
		return profeesDao.getMonthlyOutPutFormatSpecilitywiseReport(fromMonth,fromYear);

	}

	@Override
	@Transactional
	public List<HospitalReport> getDeathInformationSexwiseReport(
			String fromMonth, String fromYear) {
		return profeesDao.getDeathInformationSexwiseReport(fromMonth,fromYear);
	}

	@Override
	@Transactional
	public List<HospitalReport> getYearWiseActivitiesReport2(String fromDate,
			String ToDate) {
		return profeesDao.getYearWiseActivitiesReport2(fromDate,ToDate);
	}

	@Override
	@Transactional
	public List<HospitalReport> getYearWiseActivitiesReport3(String fromMonth,
			String fromYear) {
		return profeesDao.getYearWiseActivitiesReport3(fromMonth,fromYear);

	}
	
	@Override
	@Transactional
	public DoctorDto doctorName(int docId) {
		// TODO Auto-generated method stub
		return profeesDao.doctorName(docId);
	}
	
	
	@Override
	@Transactional 
	public int saveGroupDetails1(Users Users, Doctor
	  doctorDetails,String groupSlaveDetails, String groupMasterDetails, Integer
	  userId,String callFrom) { 
		
		int response = 0; 
		Session session1 =sessionFactory.getCurrentSession(); 
		String DoctorType=Users.getDoctorTypeIdList(); 
		DocTypDto specializationDto=new DocTypDto();
	  
		String Doctorname1 = "";
	  
		Integer DoctypeTypeInteger = Integer.parseInt(DoctorType);
	  
		if(DoctorType.equalsIgnoreCase("0") || DoctypeTypeInteger.equals(0) || DoctorType.equalsIgnoreCase("null")) 
			{ 
				Users.setDoctorTypeIdList("0");
			}else {
	  
				specializationDto = (DocTypDto) session1.get(DocTypDto.class,Integer.parseInt(Users.getDoctorTypeIdList()));
	  
				Doctorname1=specializationDto.getDoctypeName();
			}
	  
		if (doctorDetails.getDoctor_ID() == 0) 
		{ 
			//HttpSession session =request.getSession(); 
			//Integer userId = (Integer)session.getAttribute("userId1"); 
			doctorDetails.setCreatedBy(userId);
			doctorDetails.setCreatedDate(new Date(new java.util.Date().getTime()));
			Users.setCreatedBy(userId); 
			Users.setCreatedDate(new Date(new java.util.Date().getTime())); 
			doctorDetails.setUserDetails(Users); //
			//doctorDetails.setSpecializationName(specializationDto.getDoctypeName());
	  
			if(Doctorname1.equalsIgnoreCase("")) {
				doctorDetails.setSpecializationName("m");
				
			} else {
				doctorDetails.setSpecializationName(specializationDto.getDoctypeName());
				} //
	  
			response = profeesDao.saveGroupDetails1(doctorDetails,groupSlaveDetails,
							groupMasterDetails, userId,callFrom);
	  
		} else {
	  
			//HttpSession session = request.getSession(); 
			//Integer userId = (Integer)session.getAttribute("userId1"); doctorDetails.setCreatedBy(userId);
			doctorDetails.setCreatedDate(new Date(new java.util.Date().getTime()));
			Users.setCreatedBy(userId);
			Users.setCreatedDate(new Date(new java.util.Date().getTime())); 
			doctorDetails.setUserDetails(Users);
			doctorDetails.setSpecializationName(specializationDto.getDoctypeName());
			
			response = profeesDao.saveGroupDetails1(doctorDetails,groupSlaveDetails,
					groupMasterDetails, userId,callFrom);
			}
		
		return response;
		
	}

	@Override
	@Transactional
	public RefDoctorDTO fetchProfeesReferenceDrReport1(Date fromDate, Date toDate,String searchBy,String searchByDept) {
		
		return profeesDao.fetchProfeesReferenceDrReport1(fromDate, toDate,searchBy,searchByDept);
	}

	@Override
	@Transactional
	public PatientOutStandingReport fetchOutPatientStandingReport(Date fromDate, Date toDate, int departmentId) {
		// TODO Auto-generated method stub
		return profeesDao.fetchOutPatientStandingReport(fromDate, toDate, departmentId);
	}	
	
	@Override
	@Transactional
	public List<ChargesMasterSlave> getSponsorList() {
				
		return profeesDao.getSponsorList();
	}
	
	@Override
	@Transactional
	public int deleteDoctAndGroupById(Integer docId, HttpServletRequest request,Integer caseType,Integer unitId,Integer chargesSlaveId) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		profeesDao.deleteDoctAndGroupById(docId, userId,caseType,unitId,chargesSlaveId);
		return 1;
	}
	
	@Override
	@Transactional
	public HospitalDepartmentDto getHospDepartmentOfDoctor() {
		
		return profeesDao.getHospDepartmentOfDoctor();
	}

	@Override
	@Transactional
	public int saveDrPaymentVoucherForRefer(String voucherDetails, Integer userId, int unitId, String profeesDetails) {
		
		return profeesDao.saveDrPaymentVoucherForRefer(voucherDetails, userId, unitId, profeesDetails);
	}

	@Override
	@Transactional
	public ReferDrPaymentVoucherDto fetchReferDoctorsVouchers(String callFrom, int doctorId, int unitId, int deptId,
			Date fromDate, Date toDate) {
		
		return profeesDao.fetchReferDoctorsVouchers(callFrom, doctorId, unitId, deptId, fromDate, toDate);
	}

	@Override
	@Transactional
	public int cancelReferalDoctorVoucher(Integer userId, int voucherId, int deptId) {
		
		return profeesDao.cancelReferalDoctorVoucher(userId, voucherId, deptId);
	}
}

