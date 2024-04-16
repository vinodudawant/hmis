package com.hms.dao;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DischargeProcess;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorRoundReport;
import com.hms.dto.ERInformerDetails;
import com.hms.dto.EchoStudy;
import com.hms.dto.FetchTitleDTO;
import com.hms.dto.HospitalDepartments;
import com.hms.dto.HospitalSpecializations;
import com.hms.dto.IPDDischargePlanDTO;
import com.hms.dto.IpdConsentForm;
import com.hms.dto.IpdDoctors;
import com.hms.dto.IpdEpisodeAndVisitDetails;
import com.hms.dto.IpdPatientRelativeDetails;
import com.hms.dto.MLCDetail;
import com.hms.dto.ManufacturerDTO;
import com.hms.dto.OPDReceiptMaster;
import com.hms.dto.Patient;
import com.hms.dto.PatientBmiDTO;
import com.hms.dto.PatientOPD;
import com.hms.dto.PatientSponsredDetails;
import com.hms.dto.RadiologyFileMaster;
import com.hms.dto.RadiologyTemplate;
import com.hms.dto.SponsoredDetailsDTO;
import com.hms.dto.StandardAndPatientBMIDetailsDTO;
import com.hms.dto.Treatment;
import com.hms.dto.TreatmentNurses;
import com.hms.dto.Treatmentipdservices;
import com.hms.dto.Users;

@Transactional
@SuppressWarnings("rawtypes")
public interface PatientDAO {
	public Users findByUserId(int userId);

	public Users findByUserNameAndPwd(String userName, String password);

	public boolean insert(Patient objPatient, Treatment objTreatment,
			MLCDetail objMlcDetail, String queryType, String pagenm,
			String appoid, PatientOPD objPatientOPD,
			IpdPatientRelativeDetails obIpdPatientRelativeDetails,
			IpdDoctors objIpdDoctors,
			IpdEpisodeAndVisitDetails objEpisodeAndVisitDetails,
			PatientSponsredDetails objPatientSponsredDetails,
			ERInformerDetails informerDetails);

	public int findNewRegNo();

	public List fetchTopPat();
	/****fetch pat names auto suggest*****husen*********/
	public List<Patient> physicallyDischargedPatAutoSugg(String name);

	public boolean saveRisImage(String TID, String TestID, String Image,
			String svDate, Integer idinv);

	/*public List<RadiologyTemplate> fetchRisViewReportTemp(String TestID);*/
	public List<RadiologyTemplate> fetchRisViewReportTemp(String TestID, String pID, String tretId, String idInv);

	public List showSearchpat(String searchBy, String strValue, String pageName);

	public List showIPDSearchpat(String searchBy, String strValue);
	public List searchPhysicalDischrgedPat(String searchBy, String strValue);

	public boolean updateByUserId(Users user);

	public boolean deleteByUserId(int userId);

	public int deletePatient(String pid, String tId);

	public List updateflag(String Type, String Pid, String Tid);

	public List displayPatient(int intPatId, String page_name, String type,
			String value, String searchBy, int userID);
	
	public List fetchDisplayDischargedPat(int intPatId, String page_name, String type,
			String value, String searchBy, int userID);

	public List fetchPatientData(String pageName, String patientType,
			String patId, int userID);

	public List fillDIC(String date, int tid);

	public int saveDic(TreatmentNurses objTreatmentNurses, String DICString,
			String datePick, String userId, String userUpdate, String password);

	public List setIPD_DIC(int tid);

	public List displayTopPatIPD(int intPatId);

	public List displayOpeSummary(String trid);

	public List searchOpeSummary(String searchBy, String strValue,
			String pageName);

	public List fetchPrevDocDeskPatient(String pid);

	public List fetchPatBedDetails(String searchBy, String strValue);

	public List fetchClaimDetails(String Type);

	public List fetchClaimManageDetails(String PID, String TID);

	public List fetchInshurPatient(String Type, String draft, String unpro,
			String enha, String needinfo, String app, String rej);

	public List searchPrevTreatment(String searchBy, String strValue,
			Integer doc_id);

	public List fetchEchoStudy(String pName, String byName);

	public List opdEchoDetails(String from, String to, String testType);

	public boolean saveEchoStudy(EchoStudy objEchoStudy, String queryType,
			int inteid);

	public List fetchEchoTestTable(int intecho_id);

	public List<Patient> fetchPatAllTreatments(String patientId);

	public List<Patient> fetchPatAllOrders(String trid);

	public boolean saveOrderDetails(int intTrid, String drugsDetailString,
			String signDetailString, String remarkDetailString,
			String txtdoseDetailString, String txtIadv, String txtRefAdv,
			String date, String qtyp, String omID);

	public boolean deleteOrder(String omID);

	public boolean deleteEchoReport(String echoId);

	public List printFillDIC(int tid);

	public boolean saveIPDRegister(String tridString, String dignoString,
			String remarkString);

	public List<Patient> fetchIPDRegisterReport(String from, String to,
			String admitUnder);

	public List fetchCaseRegpatDetail(String trid);

	public boolean sendOpd(Treatment objTreatment);

	public List<Patient> fetchOPDRegister(String opdDate);

	public List fetchPrevDocDeskDistinctPatient(Integer doc_id);

	public String fetchPatNameByPatId(int patid);

	public String fetchPatMobByPatId(int patientId);

	public boolean removeDocuments(String fileDel);

	public List<Patient> fetchCausalityPatients();

	public List<Patient> fetchCausalityPatientByDate(String from, String to);

	public List<Patient> causalityPatientSearch(String searchBy, String strValue);

	public List<HospitalSpecializations> fetchDoctorSpecilizations();

	public List<HospitalDepartments> fetchHospitalDepartments();

	public boolean setLogOutStatus(int userId);

	public List fetchIPDPatientsForBedward();

	public List fetchVisitingPatient();

	public boolean saveVisitingPatients(Patient objPatient,
			Treatment objTreatment, MLCDetail objMlcDetail,
			PatientOPD objPatientOPD,
			IpdPatientRelativeDetails obIpdPatientRelativeDetails,
			IpdDoctors objIpdDoctors,
			IpdEpisodeAndVisitDetails objEpisodeAndVisitDetails,
			ERInformerDetails informerDetails);

	public List searchIPDPatientsForBedward(String searchBy, String strValue);

	public List searchVisitingPatient(String searchBy, String strValue);

	public boolean saveIPDServices(
			Treatmentipdservices objtreTreatmentipdservices, String queryType);

	public List fetchIpdServices(int treatmentId,int serid);

	public List displayPatient(int intPatId);

	public int SaveDischargeProcess(DischargeProcess objDischargeProcess1,
			DischargeProcess objDischargeProcess, String queryType, int tretID,
			String[] allVals, int userId);

	public List<DischargeProcess> fetchDischargeProcess(String treatmentId,
			int userId);

	public int saveConsentForm(IpdConsentForm objIpdConsentForm,
			String queryType);

	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid);

	public List<Patient> featchPreviousICFpat(String strValue, String type,
			String value);

	public boolean saveReasonofCancel(String trid, String pid, String reasonTxt);

	public boolean savePatientSponsredDetails(
			PatientSponsredDetails objPatientSponsredDetails);

	public boolean changePatientSponser(String selectedSponsredId, String trid);

	public String saveIPDDischargePlan(String queryType,
			IPDDischargePlanDTO saveIPDDischargePlanDTO);

	public List<IPDDischargePlanDTO> fetchIPDDischargePlan(String treatmentId);

	public boolean deleteIPDServices(int trid, String ipdServiceID,
			String ipdservicetype, int userId);

	public List fetchPatientDataByOPD_ER_IPD(String OPD_ER_IPD,
			String searchBy, String value);

	public List<OPDReceiptMaster> fetchBillDetailsByTreatmentID(String treatId);

	public List<IPDDischargePlanDTO> fetchDischargeCode();

	public List fetchDiagnosisDetails(List<Map<String, Object>> appoDetails);

	public List fetchCompanyDetails();

	public List saveClaimDetails(String Type, String PID, String TID,
			String ClaimAmt, String TotalAmt, String Note, String ApproveAmt,
			String AmmountReq);

	public List<Doctor> getInHouseDoctors();

	public int saveBMIFromDoctorDesk(Patient objPat, Treatment objtreat);

	// FETCH BMI Details-------------@author-----Husen--09/09/2015
	public List<PatientBmiDTO> fetchBMIDetailsOfPatient(PatientBmiDTO objPatBMi);

	public List<StandardAndPatientBMIDetailsDTO> fetchStandardAndPatientBMIDetailsUtil(
			String pid);

	public int fetchOPDPatientCount();

	public int fetchPatientCountForDashboard(String callfrom);

	public List<Doctor> fetchOPDConsultantDetails(String today);

	public List<Patient> autoPatientNameFrPreAuthDetails(String Type);

	// Touheed code for jsp pdf for ipd Date: 30-Dec-2015
	// modified by @author husenbadshah since 6/1/2016
	public List<IpdPatientRelativeDetails> fetchPatientInfo(String patientID);

	public List<PatientSponsredDetails> fetchPatientSponsorDetailsForMarkVisit(
			int patient_id);

	public List<Patient> fetchIPDPatientsForManualDischargeSummary(String type,
			String searchBy, String value);

	public List<Patient> fetchIPDPatientsForAutoDischargeSummary(String type,
			String searchBy, String value);

	public CustomizeTemplate FetchPatientsManualDischargeSummary(
			String patientId, String treatmentId);

	List<StandardAndPatientBMIDetailsDTO> fetchStandardAndPatientBMIDetailsUtilGreaterThanFiveYears(
			String pid);

	public int fetchOPDPatientCountWithConsultant();
	
	public List FillDrugChart(String date, int tid);
	
	public List<FetchTitleDTO> fetchTitle();
	
	public String fetchTitleGender(String title);
	
	public int SaveMedicineChart(TreatmentNurses objTreatmentNurses, String DrugNameString,
			String datePick, String userId, String userUpdate, String password);
	
	public List<Doctor> fetchOPDConsultantDetails1(String today);

	public boolean updateLoginHistory(String loginHistoryId);

	public List<Patient> fetchPatientNameForOperationScheduler(String auto,
			String type, String findingName, String searchBy);
	public List<RadiologyTemplate> fetchRisReportList(String testID,
			String pID, String tretId, String invidrd);

	public List showSearchOperSum1(String searchBy, String strValue,
			String pageName, String fdate, String todate, int surganname, int surgerytype);
	
	public List<IpdConsentForm> fetchAllConsentFormForPrint(String tid,int idipdConsentForm) ;

	public List<DoctorRoundReport> fetchDoctorRoundForDoctorStation(int treatID);
	
	public List<DoctorRoundReport> fetchDoctorRoundForDoctorStation1(int treatID,String toDate, String fromDate);

}