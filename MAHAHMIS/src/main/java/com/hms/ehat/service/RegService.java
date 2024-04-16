package com.hms.ehat.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder.In;
import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Hall;

import com.hms.ehat.dto.AdmissionReportSiddhiDTO;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DemographicPatientDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.DoctorWisePatientsCountDto;
import com.hms.ehat.dto.IpdBedDetailsDTO;
import com.hms.ehat.dto.MlcDetailsDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.PaymentResponsibleDto;
import com.hms.ehat.dto.PrefixDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegTreBillDto1;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationOtherDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.admissionReportViewDto;

public interface RegService {
		
	//@author : Vinod Udawant @date: 01-June-2019 @reason : To Save and Update patient
	int savePatient(String patientDetails,String treatDetails,String billMaster,String billDetails,String queryType,
			Integer AppId,String paymentResponsibleDetails,String mlcDetails,HttpServletRequest request);
	
	//@author : Abhijit Jadhav @date: 21-Jun-2019 @reason : get patient
	List<RegTreBillDto> getAllRecordsDeptwise12(Integer deptId, Integer unitId,Integer userId1, String userType, String patientId);


	
	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update patient
	int savePatientRegDetails(RegistrationDto serviceMaster,HttpServletRequest request, String queryType,Integer AppId);
	
	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update treatment
	int saveTreatmentDetails(TreatmentDto treatmentDto,HttpServletRequest request, String queryType);
	
	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update bill
	int saveBillMaster(BillMasterDto billMasterDto,HttpServletRequest request, String queryType);
	
	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update opd_bill
	int saveBillDetails(BillDetailsDto billDetailsDto,HttpServletRequest request, String queryType,
			String doctorIdList);

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update ipd_bill
	int saveBillDetailsIpd(BillDetailsIpdDto billDetailsIpdDto,Integer userId,
			String queryType, String doctorIdList);
		
	//@author : Irfan Khan @date: 24-May-2017 @reason : To Fetch Records List
	RegTreBillDto getAllRecords();
	
	//@author : Irfan Khan @date: 31-May-2017 @reason : To Fetch Records List
	RegistrationDto getAllPatientList();
	
	//@author : Irfan Khan @date: 29-May-2017 @reason : To Save and Update Prefix
	int saveUpdatePrefix(PrefixDto prefixDto,HttpServletRequest request, String queryType);
	
	List<RegTreBillDto> fetchPatientsRecordByTreatmentId(Integer treatmentId);
	List<RegTreBillDto> getAllRecordsDeptwise(Integer deptId, Integer unitId, Integer userId1, String userType);
	
	List<RegTreBillDto1> getAllRecordsDeptwise1(Integer deptId, Integer unitId, Integer userId1, String userType);



	
	// @author : Sagar kadam @date: 16-Jun-2017 @reason : To fetch sponsor 	 details
	ChargesMasterSlave fetchSponsorRecords(Integer chargesMasterDto);

	// @author : Sagar kadam @date: 27-Jun-2017 @reason : for autosuggeion
	RegTreBillDto getAllRecordsDeptwiseWithAuto(Integer deptId, String letter, String usertype, Integer unitId);
	
	RegTreBillDto1 getAllRecordsDeptwiseWithAuto1(Integer deptId, String letter, String usertype, Integer unitId);

	//Added by Laxman on 15-Jan-2018.
	OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(Integer deptId, String letter, String usertype, Integer unitId);

	// @author : Sagar kadam @date: 27-Jun-2017 @reason : for Autosummary
	List<RegTreBillDto> getAllForAutoSummary(String letter, String type);

	IpdBedDetailsDTO getIpdBedDetailsForTid(Integer tid);

	// @author : Sagar Kadam @date: 27-Jun-2017 @reason : To Fetch All Records  List for Scheduler
	RegTreBillDto getAllRecordsForScheduler(String letter);

	// @author : Sagar Kadam @date:14-july-2017 @reason : To Fetch all Record for opdque1
	RegTreBillDto getAllRecordsforOPDque1(Integer deptId, Integer unitId, String userType, Integer userId1);
	
	//Added by Laxman on 15-Jan-2018.
	OpdQueManagmentViewDto getAllRecordsForOPDqueue1(Integer deptId, Integer unitId, String userType, Integer userId1);
	
	OpdQueManagmentViewDto getAllRecordsForOPDqueue12(Integer deptId, Integer unitId, String userType, Integer userId1, Integer invoiceCount);
	
	// @author : Sagar Kadam @date:20-july-2017 @reason : To Fetch Record of charges master list
	ChargesMasterDto getSponsorTypeList();
		
	
	// @author : Sagar Kadam @date:02-aug-2017 @reason : To Fetch Record of user name by user id 
	String getUserNameByUserid(Integer userid);
	//@author : Sagar Kadam @date: 07/aug/2017 @reason : To save other details in table
 	int saveOtherPatientRegDetails(RegistrationOtherDto serviceMaster,HttpServletRequest request, String queryType);
	//@author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record list
	RegistrationOtherDto getOthetRecords();
	//@author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record by id for edit
	RegistrationOtherDto getOthetRecordsById(int pid);
	
	//@author : Sagar Kadam @date: 07/aug/2017 @reason : Autosuggestion for  other record 
	RegistrationOtherDto autosuggesstionForOtherRecords(String letter,String usertype);

	// @author : Irfan Khan @date: 29-May-2017 @reason : To delete Patient
	int deletePatientReg(int pId, Integer userId);

	List<RegistrationDto> getPatientRecordsbypatientId(Integer patientId);

	List<TreatmentDto> gettreatment(Integer treatmentId);

	// @author : Irfan Khan @date: 8-Nov-2017 @reason : To Check registration access
	boolean getRegAccessAuth(Integer userId);

	RegistrationOtherDto getAllRecordsForOPDqueOther(Integer deptId,
			Integer unitId);

	// @author : Laxman Nikam @date: 05-Jan-2018 @reason : Check OPD send patiend Limit.
	String checkSendPatientLimit(int doctorId);

	DoctorDto getDocListUnitWise(Integer unitId, String callfrom);

	// @author : Irfan Khan @date: 15-Feb-2018 @reason : To block Patient
	int blockPatient(int pid,String blockFlag,String narration,Integer userId,String userLoginName);

	//@author :Irfan khan@Date :7-03-2018@Code :To fetch records of Admission report
	List<admissionReportViewDto> fetchAdmissionReport(Date fromDate, Date toDate,
			Integer doctorId,Integer refDocId,Integer caseTypeId,Integer mediclaimType);

	DoctorDto getConsultantDrName(Integer treatmentId);
	
	DoctorDto getAllRefDocNew(Integer unitId, String callfrom);

	//irfan khan - 4-april-2018: fetch advertisement images
	ArrayList<String> fetchAdvertisementImgNames();

	//irfan khan 18-may-2018 fetch the difference between 2 dates in days
	long fetchDifferenceInDays(Date fromDate, Date toDate);
	
	int savePayRespo(PaymentResponsibleDto paymentDto,
			HttpServletRequest request, String queryType);

	List<PaymentResponsibleDto> fetchPayResp(Integer patientId);

	int deletePayResponse(int pId, int tId, Integer userId);
	
	List<Hall> fetchPatientsBedRecords(Integer treatmentId);

	DemographicPatientDto getDemoPatientDetails(Integer patientId);

	int checkIsOldPatientAvilable(String oldPatientId);
	
	String fetchPatientsDischargeDateByTreatmentId(Integer treatmentId);

	int saveMlcDetails(MlcDetailsDto mlcDto2, HttpServletRequest request,
			String queryType);

	List<MlcDetailsDto> fetchMlcDetails(Integer patientId);

	int saveMultipleSponsor(MultipleSponsorDto multipleSponsorDto,
			HttpServletRequest request);

	MultipleSponsorDto getMultilpleSponsorList(Integer treatmentId, HttpServletRequest request);

	MultipleSponsorDto getMulSponsorData(Integer treatmentId,
			Integer chargesSlvId, HttpServletRequest request);

	int deleteMultipleSponsor(Integer treatmentId,
			Integer mulSponsorId, HttpServletRequest request);

	int setPrimarySponsor(Integer treatmentId, Integer mulSponsorId,
			HttpServletRequest request);

	int saveSponsorDetails(int treatId, Integer sponsorId,
			String queryType, HttpServletRequest request);

	// @author : Irfan Khan @date: 10-Oct-2018 @reason : To UnBlock Patient
	int unBlockPatient(int pid,String blockFlag,String narration,Integer userId,String userLoginName);

	//irfan khan 11-oct-2018 fetch patient counts
	List<Integer> patientQueueListOnDashb();
	
	//@author : Vinod Udawant @date: 01-April-2019 @reason : To Save and Update Other patient
	int saveOtherBillDetails(OtherBillingDto billDetailsDto, String queryType,HttpServletRequest request);
	
	//@author : Vinod Udawant @date: 03-April-2019 @reason : To Save bill details from appointment
	int saveFromOtherBillDetails(BillDetailsDto billDetailsDto,HttpServletRequest request, String queryType,
				List<OtherBillingDto> lstOtherBill,String doctorIdList);
	
	//@author : Vinod Udawant @date: 13-April-2019 @reason : Add new consultant doctor
	int addNewConsultantOpd(BillDetailsDto obj,String queryType);
	
	//@author : Vinod Udawant @date: 04-May-2019 @reason : Get appointment type
	String getAppointmentType(int appId);
	
	//@author : Vinod Udawant @date: 13-April-2019 @reason : Add new consultant doctor
	DoctorWisePatientsCountDto getDoctorWisePatientCount(String callFrom,Integer deptId,Integer unitId,Integer userId);

	List<ChargesMasterSlave> fetchPatientsBedRecords1(Integer treatmentId);
	
	int checkDuplicatePatientName(RegistrationDto regDto, HttpServletRequest request);
	
	List<AdmissionReportSiddhiDTO> fetchAdmissionReportSiddhivinayak(Date fromDate, Date toDate,
			Integer doctorId,Integer refDocId,Integer caseTypeId,Integer mediclaimType,Integer chargesId, Integer chargesSlaveId);

	DoctorDto getSourceDoctor(String isSourceType);
	
	ChargesMasterSlave fetchSponsorRecordsRegMaster(Integer chargesMasterDto);
}
