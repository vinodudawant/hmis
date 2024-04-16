package com.hms.ehat.service;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.PatientOutStandingReport;
import com.hms.ehat.dto.AllPfPostedRecordsDto;
import com.hms.ehat.dto.AreaWisePatientViewDto;
import com.hms.ehat.dto.AreaWisePatientViewDto2;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
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
import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Doctor;
import com.hms.dto.HisabProFeesDTO;
import com.hms.dto.Users;
import com.hms.ehat.dto.RefDoctorDTO;
import com.hms.ehat.dto.ReferDrPaymentVoucherDto;

public interface ProfeesService {

	// Irfan Khan @date: 15-July-2017 @reason : To Fetch all records
	DeptMasterDto fetchDeptAndServices();

	// Irfan Khan @date: 19-July-2017 @reason : To Save n update percentage
	int savePercentMaster(String percentMasterList, Integer userId, int doctorId, int unitId,
			String callFrom, int caseType,int drDeptId,int chargesId,int chargesSlaveId);
	
	// Irfan Khan @date: 22-Jan-2018 @reason : To save n update Advance percentage
	int savePercentMaster2(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,
			int drDeptId, int chargesId, int chargesSlaveId);

	// Irfan Khan @date: 19-July-2017 @reason : To Fetch all records
	PercentMasterDto fetchPercentRecords(int doctorId,int unitId,int caseType,String callFrom);

	// Irfan Khan @date: 20-July-2017 @reason : To Fetch record by drid and unitid
	PercentMasterDto editPercentMaster(int doctorId, int unitId,int caseType,int chargesSlaveId);
	
	// Irfan Khan @date: 12-Dec-2017 @reason : To Fetch record by Dr.Dept to edit and update
	PercentMasterDto updateDrDeptPercentMaster(int drDeptId, int unitId,int caseType,String drDeptFlag);

	// Irfan Khan @date: 19-July-2017 @reason : To Delete percentage records = N
	int deletePercentRecord(Integer userId, int doctorId, int unitId, int caseType);

	//Irfan Khan @date: 24-July-2017 @reason : To fetch paid records of doctor.
	ProfeesDoctorsPaymentDto proFeesDoctorPayment(int doctorId, Date fromDate,
			Date toDate, int unitId, int deptId, String serviceId, Integer userId, int specialisationId,int billTypeId);

	//Irfan Khan @date: 7-Aug-2017 @reason : save voucher details
	int saveDrPaymentVoucher(String voucherDetails, Integer userId, int unitId, String profeesDetails);

	// Irfan Khan @date: 11-Aug-2017 @reason : To Fetch all Vouchers
	DrPaymentVoucherDto fetchDoctorsVouchers(String callFrom,
			 int doctorId,int unitId,int deptId,Date fromDate,Date toDate);

	// Irfan Khan @date: 16-Aug-2017 @reason : To Cancel Voucher
	int cancelVoucher(Integer userId, int voucherId, int deptId);

	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	ProfeesDoctorsPaymentDto proFeesDoctorsReport(int doctorId, Date fromDate,
			Date toDate, int unitId, int deptId, int serviceId, Integer userId);
	
	/*// Irfan Khan @date: 14-Dec-2017 @reason :  All doctors summary report
	ProfeesDoctorsPaymentDto proFeesAllDocReport(int doctorId, Date fromDate,
			Date toDate, int unitId, int deptId, int serviceId, Integer userId,int drDeptId);*/
	
	//Irfan khan 29-Mar-2018 Fetch All doctors profees posted records
	ProfeesDoctorsPaymentDto allPfPostedRecords(int doctorId, Date fromDate,
				Date toDate, int unitId, int deptId, int serviceId,int drDeptId);

	// Irfan Khan @date: 24-Aug-2017 @reason : save group details
	int saveGroupDetails(String groupSlaveDetails, String groupMasterDetails,
			Integer userId,String callFrom);

	// Irfan Khan @date: 28-Aug-2017 @reason : To Group master
	GroupMasterDto fetchGroupMasterList(String callFrom, String letter);

	// Irfan Khan @date: 30-Aug-2017 @reason : To Group slave
	GroupSlaveDto fetchGroupSlaveList(int groupId);

	// Irfan Khan @date: 30-Aug-2017 @reason : To Delete Group Master
	int deleteGroupMaster(Integer userId, int groupId);
	
	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	GroupReceiptSlaveDetails proFeesGroupDoctorsReport(int doctorId, Date fromDate,
			Date toDate, int unitId, int deptId, int serviceId, Integer userId);

	//@author : Irfan Khan @date: 28-Sep-2017 @reason : Autosuggestion for doctor
	List<DoctorDto> setAutoSugForDoctorList(String letter, String callFrom,int specialisationId);

	// Irfan Khan @date: 11-oct-2017 @reason : To Fetch all hosp specialisation
	HospitalSpecialisationDto getHospSpecialization();
	
	HisabProFeesDTO fetchProFeesHisab(int unitId,int userId,int deptId,String fromDate,String toDate,int drId,int fromToRange);

	// Irfan Khan @date: 8-Dec-2017 @reason : To fetch configured list of dr dept
	PercentMasterDto fetchConfgDrDeptList(String callFrom, String letter);
	
	// Irfan Khan @date: 12-Dec-2017 @reason : To fetch configured list of doctor personal
	PercentMasterDto fetchConfgDrPersonalList(String callFrom, String callSearch, String letter);

	//@author : Irfan Khan @date: 11-Dec-2017 @reason : Autosuggestion for Group List
	List<GroupMasterDto> setAutoSugForGroupList(String letter);

	// Irfan Khan @date: 11-Dec-2017 @reason : To fetch Groups report
	GroupReceiptSlaveDetails profeesGroupWiseReport(int groupId, Date fromDate,
			Date toDate, int unitId, int deptId, int serviceId, Integer userId);

	//Irfan khan 2-Jan-2018 @reason : Single doctor summary report
	ProfeesDoctorsPaymentDto profeesSingleDocSummary(int doctorId,
			Date fromDate, Date toDate);

	//Irfan khan @9-Jan-2018 to save dynamic group details
	int saveDynamicGroupDetails(String groupSlaveDetails, String groupMasterDetails,
			Integer userId, String callFrom);
	
	//Irfan khan @10-Jan-2018 to fetch dynamic group details
	DynamicGroupMasterDto fetchDynamicGroupMasterList(String callFrom, String letter);

	int deleteForDrDeps(Integer drDeptId, HttpServletRequest request,Integer caseType,Integer unitId);

	int deleteDoctAndGroup(Integer docId, HttpServletRequest request,Integer caseType,Integer unitId);

	int deleteDynamicGroupMaster(Integer dMasterId, HttpServletRequest request);

	DynamicGroupSlaveDto editDynamicGroupMaster(int groupId);
	
	//@author : Irfan Khan @date: 24-Jan-2018 @reason : Autosuggestion for doctor
	List<DoctorDto> fetchDoctorListAutoSug(String letter, String callFrom,int specialisationId,int unitId);

	// @author : Irfan Khan @date: 14-Feb-2018 @reason : fetch sub service % from perSlave
	List<PercentSlaveDto> fetchAndSetSubServiceOnEdit(int serviceId,
			int unitId, int doctorId, int drDeptId, int caseType,
			int chargesId, int chargesSlaveId);

	//Irfan khan-- Fetching super master of service based on there id 12-Mar-2018
	List<ChargesMasterSlave> fetchSuperCatPrcentMaster(Integer chargesMasterDto);

	//irfan khan 16-mar-2018 to dynamic doctors availability
	int checkDynamicDocAvailability(int doctorId);

	//Irfan khan 30-Mar-2018 records of profees voucher
	AllPfPostedRecordsDto fetchProfeesVoucherReport(String voucherId,
			Date fromDate, Date toDate);

	//Irfan Khan @date: 30-June-2018 @reason : get All Voucher
	DrPaymentVoucherDto fetchAllVoucherIds();

	//Irfan khan 6-Apr-2018 Outstanding report
	ProfeesDoctorsPaymentDto fetchOutStandingReport(Date fromDate, Date toDate,int departmentId);

	//Irfan khan 19-April-2018 Reference dr. records
	AllPfPostedRecordsDto fetchProfeesReferenceDrReport(Date fromDate,
			Date toDate);

	// Irfan Khan @date: 29-June-2018 @reason : area Wise Patient Report
	AreaWisePatientViewDto areaWisePatientReport(int townId, int talukaId,
			int districtId, int stateId);

	AreaWisePatientViewDto2 areaWisePatientReport2(int townId, int talukaId,
			int districtId, int stateId, String diagnosis);

	//Irfan khan 27-july-2018 fetch hall n hall type id by treatment id
	List<Integer> fetchHallIdsToSetOnload(int treatmentId);

	// Irfan khan @date: 21-Sep-2018 @reason : Fetch canceled admission records
	TreatmentDto canceledAdmissionRecords(Date fromDate, Date toDate);
	
	// Ajay khandare @date: 5-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, x-ray, sonography, etc..
	List<HospitalReport> getMonthyHospitalActivitiesReport(String fromYear, String fromMonth);
	
	// Ajay khandare @date: 5-07-2019 @reason : Fetch  Year Wise Report etc..	
	List<HospitalReport> getyearWiseAndFundInfomationHospitalReport(String fromYear, String Tofrom);
	
	// Ajay khandare @date: 5-07-2019 @reason : Fetch  monthy and progresive  Hospital Activities Performance report for ipd, opd,ICU,NICU etc..
	List<HospitalReport> getMonthyHospitalActivitiesPerformanceReport(String fromYear, String Tofrom);
	
	// Ajay khandare @date: 23-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, x-ray, sonography, etc..
	List<HospitalReport> getMonthyAndProgresiveHospitalReport1(String fromYear, String fromMonth);
	
	List<TreatmentDto> getOPDIPDOperationSpecilitywiseReport(String fromMonth, String fromYear);		
	
	// Ajay khandare @date: 08-08-2019 @reason : Fetch  monthy and progresive report for monthly out put format ipd, opd,operation ..
	List<HospitalReport> getMonthlyOutPutFormatSpecilitywiseReport(String fromMonth, String fromYear);
			
	
	// Ajay khandare @date: 08-08-2019 @reason : Fetch  monthy and progresive report for Death Information Sexwise Report ..
	List<HospitalReport> getDeathInformationSexwiseReport(String fromMonth, String fromYear);
	
	
	// Ajay khandare @date: 20-08-2019 @reason : Fetch  monthy and progresive report for monthly out put format ipd, opd,operation ..
	List<HospitalReport> getYearWiseActivitiesReport2(String fromDate, String ToDate);

	
	// Ajay khandare @date: 026-08-2019 @reason : Fetch  monthy and progresive report for monthly out put format ipd, opd,operation hospital activites report 3..
     List<HospitalReport> getYearWiseActivitiesReport3(String fromMonth, String fromYear);
     
     DoctorDto doctorName(int docId);
     
	 int saveGroupDetails1(Users Users, Doctor doctorDetails,String groupSlaveDetails, String groupMasterDetails, Integer userId,String
		  callFrom);

	RefDoctorDTO fetchProfeesReferenceDrReport1(Date fromDate, Date toDate,String searchBy,String searchByDept);
	
	PatientOutStandingReport fetchOutPatientStandingReport(Date fromDate, Date toDate,int departmentId);
	//Rohini Ambhore
	List<ChargesMasterSlave> getSponsorList();
	int deleteDoctAndGroupById(Integer docId, HttpServletRequest request,Integer caseType,Integer unitId,Integer chargesSlaveId);
	HospitalDepartmentDto getHospDepartmentOfDoctor();	 	
	
	// added by dayanand for refernce doctor voucher creation
	int saveDrPaymentVoucherForRefer(String voucherDetails, Integer userId, int unitId, String profeesDetails);
	
	ReferDrPaymentVoucherDto fetchReferDoctorsVouchers(String callFrom, int doctorId,int unitId,int deptId,Date fromDate,Date toDate);
	
	int cancelReferalDoctorVoucher(Integer userId, int voucherId, int deptId);
}

