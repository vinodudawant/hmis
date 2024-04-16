package com.hms.model;

import java.util.ArrayList;
import java.util.List;
import com.hms.dao.PatientDAO;
import com.hms.dto.CaseRegPatDetail;
import com.hms.dto.ClaimManage;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DischargeProcess;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorRoundReport;
import com.hms.dto.ERInformerDetails;
import com.hms.dto.EchoDetails;
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
import com.hms.dto.OPDReceiptMaster;
import com.hms.dto.Patient;
import com.hms.dto.PatientBmiDTO;
import com.hms.dto.PatientOPD;
import com.hms.dto.PatientSponsredDetails;
import com.hms.dto.RadiologyTemplate;
import com.hms.dto.StandardAndPatientBMIDetailsDTO;
import com.hms.dto.Treatment;
import com.hms.dto.TreatmentNurses;
import com.hms.dto.Treatmentipdservices;
import com.hms.dto.Users;
import com.hms.ehat.dto.CpoeOTdetails;
//import org.springframework.getContext().ApplicationContext;
//import org.springframework.getContext().support.ClassPathXmlApplicationContext;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class PatientModel extends AbstractModel {

	/*
	 * ApplicationContext getContext() = new ClassPathXmlApplicationContext(
	 * "Spring-Patient.xml");
	 */

	// ApplicationContext getContext() = ApplicationContextUtils
	// .getApplicationContext();

	public Users getUserDetails(String userName, String password) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		Users user = patientDAO.findByUserNameAndPwd(userName, password);
		return user;
	}

	public boolean setUserDetails(Patient objPatient, Treatment objTreatment,
			MLCDetail objMlcDetail, String queryType, String pagenm,
			String appoid, PatientOPD objPatientOPD,
			IpdPatientRelativeDetails obIpdPatientRelativeDetails,
			IpdDoctors objIpdDoctors,
			IpdEpisodeAndVisitDetails objEpisodeAndVisitDetails,
			PatientSponsredDetails objPatientSponsredDetails,
			ERInformerDetails informerDetails) {

		
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO.insert(objPatient, objTreatment,
				objMlcDetail, queryType, pagenm, appoid, objPatientOPD,
				obIpdPatientRelativeDetails, objIpdDoctors,
				objEpisodeAndVisitDetails, objPatientSponsredDetails,
				informerDetails);

		return isInserted;
	}

	public int findNewRegNo() {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int regNo = patientDAO.findNewRegNo();

		return regNo;
	}

	public List showTopPat() {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.fetchTopPat();

		return arrTopPat;
	}
	/*********@author husenbadashah goundi***auto suggest discharged pat******/
	public List<Patient> physicallyDischargedPatAutoSugg(String Name) {
		PatientDAO patientDAO = (PatientDAO) getContext()
				.getBean("patientDAO");
		List<Patient> ltpat = patientDAO
				.physicallyDischargedPatAutoSugg(Name);
		return ltpat;
	}

	public List showSearchpat(String searchBy, String strValue, String pageName) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.showSearchpat(searchBy, strValue,
				pageName);

		return arrSearchPat;
	}

	public List<Patient> showIPDSearchpat(String searchBy, String strValue) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.showIPDSearchpat(searchBy, strValue);

		return arrSearchPat;
	}
	public List<Patient> searchPhysicalDischrgedPat(String searchBy, String strValue) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.searchPhysicalDischrgedPat(searchBy, strValue);

		return arrSearchPat;
	}

/*	public List<RadiologyTemplate> fetchRisViewReportTemp(String TestID) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<RadiologyTemplate> arrTemplateMaster = patientDAO
				.fetchRisViewReportTemp(TestID);

		return arrTemplateMaster;
	}*/
	public List<RadiologyTemplate> fetchRisViewReportTemp(String TestID, String pID, String tretId, String idInv) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<RadiologyTemplate> arrTemplateMaster = patientDAO
				.fetchRisViewReportTemp(TestID,pID,tretId,idInv);

		return arrTemplateMaster;
	}
	public boolean saveRisImage(String TID, String TestID, String Image,
			String svDate, Integer idinv) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO
				.saveRisImage(TID, TestID, Image, svDate,idinv);

		return isInserted;
	}

	public int setDeletePatient(String pid, String tId) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int isDeleted = patientDAO.deletePatient(pid, tId);
		return isDeleted;
	}

	public List<Patient> updateManageFlag(String Type, String Pid, String Tid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List isDeleted = patientDAO.updateflag(Type, Pid, Tid);
		return isDeleted;
	}

	public List<Patient> SaveClaimDetail(String Type, String PID, String TID,
			String ClaimAmt, String TotalAmt, String Note, String ApproveAmt,
			String AmmountReq) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List isDeleted = patientDAO.saveClaimDetails(Type, PID, TID, ClaimAmt,
				TotalAmt, Note, ApproveAmt, AmmountReq);
		return isDeleted;
	}

	public List<Patient> fetchPatientData(String pageName, String PatientType,
			String patId, int userID) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.fetchPatientData(pageName, PatientType,
				patId, userID);

		return arrSearchPat;
	}

	public List<Patient> fetchDefPat(int intPatId, String page_name,
			String type, String value, String searchBy, int userID) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List display = patientDAO.displayPatient(intPatId, page_name, type,
				value, searchBy, userID);
		return display;
	}
	public List<Patient> fetchDisplayDischargedPat(int intPatId, String page_name,
			String type, String value, String searchBy, int userID) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List display = patientDAO.fetchDisplayDischargedPat(intPatId, page_name, type,
				value, searchBy, userID);
		return display;
	}

	public List<TreatmentNurses> FillDIC(String date, int tid) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.fillDIC(date, tid);

		return arrTopPat;
	}

	public int saveDic(TreatmentNurses objTreatmentNurses, String DICString,
			String datePick, String userId, String userUpdate, String password) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int isInserted = patientDAO.saveDic(objTreatmentNurses, DICString,
				datePick, userId, userUpdate, password);

		return isInserted;
	}

	public List<TreatmentNurses> setIPD_DIC(int tid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.setIPD_DIC(tid);

		return arrTopPat;
	}

	public List<Patient> displayTopPatIPD(int intPatId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List display = patientDAO.displayTopPatIPD(intPatId);
		return display;
	}

	public List<Patient> fetchOpeSummary(String trid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List displaySumm = patientDAO.displayOpeSummary(trid);
		return displaySumm;
	}

	public List<Patient> showSearchOperSum(String searchBy, String strValue,
			String pageName) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List searchSumm = patientDAO.searchOpeSummary(searchBy, strValue,
				pageName);
		return searchSumm;
	}

	public List<Patient> fetchPrevDocDeskPatient(String pid) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.fetchPrevDocDeskPatient(pid);

		return arrSearchPat;
	}

	public List<Patient> fetchPatBedDetails(String searchBy, String strValue) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.fetchPatBedDetails(searchBy,strValue);

		return arrSearchPat;
	}

	public List<Patient> fetchCliamDetails(String Type) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.fetchClaimDetails(Type);
		return arrSearchPat;
	}

	public List<ClaimManage> fetchCliamManageDetails(String PID, String TID) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.fetchClaimManageDetails(PID, TID);
		return arrSearchPat;
	}

	public List<Patient> fetchInshurPatient(String CID, String draft,
			String unpro, String enha, String needinfo, String app, String rej) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchCom = patientDAO.fetchInshurPatient(CID, draft, unpro,
				enha, needinfo, app, rej);

		return arrSearchCom;
	}

	public List<Patient> fetchCompanyDetails() {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchCom = patientDAO.fetchCompanyDetails();

		return arrSearchCom;
	}

	public List<Patient> searchPrevTreatment(String searchBy, String strValue,
			Integer doc_id) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.searchPrevTreatment(searchBy, strValue,
				doc_id);

		return arrSearchPat;
	}

	public List<EchoStudy> fetchEchoStudy(String pName, String byName) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrEchoStudy = patientDAO.fetchEchoStudy(pName, byName);

		return arrEchoStudy;
	}

	public boolean saveEchoStudy(EchoStudy objEchoStudy, String queryType,
			int inteid) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO.saveEchoStudy(objEchoStudy, queryType,
				inteid);
		return isInserted;
	}

	public List<EchoStudy> fetchEchoTestTable(int intecho_id) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrEchoStudy = patientDAO.fetchEchoTestTable(intecho_id);

		return arrEchoStudy;
	}

	public List<EchoDetails> opdEchoDetails(String from, String to,
			String testType) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrEchoDetails = patientDAO.opdEchoDetails(from, to, testType);

		return arrEchoDetails;
	}

	public List<Patient> fetchPatAllTreatments(String patientId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> arrPatient = patientDAO.fetchPatAllTreatments(patientId);

		return arrPatient;
	}

	public List<Patient> fetchPatAllOrders(String trid) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> arrPatient = patientDAO.fetchPatAllOrders(trid);

		return arrPatient;
	}

	public boolean saveOrderDetails(int intTrid, String drugsDetailString,
			String signDetailString, String remarkDetailString,
			String txtdoseDetailString, String txtIadv, String txtRefAdv,
			String date, String qtyp, String omID) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO.saveOrderDetails(intTrid,
				drugsDetailString, signDetailString, remarkDetailString,
				txtdoseDetailString, txtIadv, txtRefAdv, date, qtyp, omID);
		return isInserted;
	}

	public boolean deleteOrder(String omID) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isDeleted = patientDAO.deleteOrder(omID);
		return isDeleted;
	}

	public boolean deleteEchoReport(String echoId) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isDeleted = patientDAO.deleteEchoReport(echoId);
		return isDeleted;
	}

	public List<TreatmentNurses> printFillDIC(int tid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.printFillDIC(tid);

		return arrTopPat;
	}

	public boolean saveIPDRegister(String tridString, String dignoString,
			String remarkString) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isDeleted = patientDAO.saveIPDRegister(tridString, dignoString,
				remarkString);
		return isDeleted;
	}

	public List<Patient> fetchIPDRegisterReport(String from, String to,
			String admitUnder) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");

		List<Patient> arrPatient = patientDAO.fetchIPDRegisterReport(from, to,
				admitUnder);

		return arrPatient;
	}

	public List<CaseRegPatDetail> fetchCaseRegpatDetail(String trid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.fetchCaseRegpatDetail(trid);

		return arrTopPat;
	}

	public boolean sendOpd(Treatment objTreatment) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isSend = patientDAO.sendOpd(objTreatment);
		return isSend;
	}

	public List<Patient> fetchOPDRegister(String opdDate) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");

		List<Patient> arrPatient = patientDAO.fetchOPDRegister(opdDate);

		return arrPatient;
	}

	public List<Patient> fetchPrevDocDeskDistinctPatient(Integer doc_id) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.fetchPrevDocDeskDistinctPatient(doc_id);

		return arrSearchPat;
	}

	public String fetchPatNameByPatId(int patid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		String pname = patientDAO.fetchPatNameByPatId(patid);

		return pname;
	}

	public String fetchPatMobByPatId(int patientId) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		String pMob = patientDAO.fetchPatMobByPatId(patientId);

		return pMob;
	}

	public boolean removeDocuments(String fileDel) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isSend = patientDAO.removeDocuments(fileDel);
		return isSend;
	}

	public List<Patient> fetchCausalityPatients() {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> arrPatient = patientDAO.fetchCausalityPatients();

		return arrPatient;
	}

	public List<Patient> fetchCausalityPatientByDate(String from, String to) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> arrPatient = patientDAO.fetchCausalityPatientByDate(from,
				to);

		return arrPatient;
	}

	public List<Patient> causalityPatientSearch(String searchBy, String strValue) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> arrPatient = patientDAO.causalityPatientSearch(searchBy,
				strValue);

		return arrPatient;
	}

	public List<HospitalSpecializations> fetchDoctorSpecilizations() {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<HospitalSpecializations> listHospitalSpecializations = patientDAO
				.fetchDoctorSpecilizations();
		return listHospitalSpecializations;
	}

	public List<HospitalDepartments> fetchHospitalDepartments() {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<HospitalDepartments> listHospitalDepartments = patientDAO
				.fetchHospitalDepartments();
		return listHospitalDepartments;
	}

	public boolean setLogOutStatus(int userId) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean update = patientDAO.setLogOutStatus(userId);
		return update;
	}

	public List<Patient> fetchIPDPatientsForBedward() {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.fetchIPDPatientsForBedward();
		return arrTopPat;
	}

	public List<Patient> fetchVisitingPatient() {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.fetchVisitingPatient();
		return arrTopPat;
	}

	public boolean saveVisitingPatients(Patient objPatient,
			Treatment objTreatment, MLCDetail objMlcDetail,
			PatientOPD objPatientOPD,
			IpdPatientRelativeDetails obIpdPatientRelativeDetails,
			IpdDoctors objIpdDoctors,
			IpdEpisodeAndVisitDetails objEpisodeAndVisitDetails,
			ERInformerDetails informerDetails) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO.saveVisitingPatients(objPatient,
				objTreatment, objMlcDetail, objPatientOPD,
				obIpdPatientRelativeDetails, objIpdDoctors,
				objEpisodeAndVisitDetails, informerDetails);
		return isInserted;
	}

	public List<Patient> searchIPDPatientsForBedward(String searchBy,
			String strValue) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.searchIPDPatientsForBedward(searchBy,
				strValue);
		return arrTopPat;
	}

	public List<Patient> searchVisitingPatient(String searchBy, String strValue) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.searchVisitingPatient(searchBy, strValue);
		return arrTopPat;
	}

	public boolean saveIPDServices(
			Treatmentipdservices objtreTreatmentipdservices, String queryType) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO.saveIPDServices(
				objtreTreatmentipdservices, queryType);
		return isInserted;
	}

	public List<CpoeOTdetails> fetchIpdServices(int treatmentId,int serid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTreatmentipdservices = patientDAO.fetchIpdServices(treatmentId,serid);
		return arrTreatmentipdservices;
	}

	public int SaveDischargeProcess(DischargeProcess objDischargeProcess1,
			DischargeProcess objDischargeProcess, String queryType, int tretID,
			String[] allVals, int userId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int isInserted = patientDAO.SaveDischargeProcess(objDischargeProcess1,
				objDischargeProcess, queryType, tretID, allVals, userId);
		return isInserted;
	}

	public List<DischargeProcess> fetchDischargeProcess(String treatmentId,
			int userId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<DischargeProcess> arrDischarge = patientDAO.fetchDischargeProcess(
				treatmentId, userId);

		return arrDischarge;
	}

	public int saveConsentForm(IpdConsentForm objIpdConsentForm,
			String queryType) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int isInserted = patientDAO.saveConsentForm(objIpdConsentForm,
				queryType);
		return isInserted;
	}

	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<IpdConsentForm> IpdConsentForm = patientDAO
				.fetchAllConsentFormForTreatment(tid);
		return IpdConsentForm;
	}

	public List<Patient> featchPreviousICFpat(String searchBy, String type,
			String value) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> IpdConsentForm = patientDAO.featchPreviousICFpat(
				searchBy, type, value);
		return IpdConsentForm;
	}

	public boolean saveReasonofCancel(String trid, String pid, String reasonTxt) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO
				.saveReasonofCancel(trid, pid, reasonTxt);
		return isInserted;

	}

	public boolean savePatientSponsredDetails(
			PatientSponsredDetails objPatientSponsredDetails) {
		// TODO Auto-generated method stub
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO
				.savePatientSponsredDetails(objPatientSponsredDetails);
		return isInserted;
	}

	public boolean changePatientSponser(String selectedSponsredId, String trid) {
		// TODO Auto-generated method stub
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isInserted = patientDAO.changePatientSponser(
				selectedSponsredId, trid);
		return isInserted;
	}

	public String saveIPDDischargePlan(String queryType,
			IPDDischargePlanDTO saveIPDDischargePlanDTO) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		String isInserted = patientDAO.saveIPDDischargePlan(queryType,
				saveIPDDischargePlanDTO);
		return isInserted;
	}

	public List<IPDDischargePlanDTO> fetchIPDDischargePlan(String treatmentId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<IPDDischargePlanDTO> listSaveIPDDischargePlanDTO = patientDAO
				.fetchIPDDischargePlan(treatmentId);
		return listSaveIPDDischargePlanDTO;
	}

	public boolean deleteIPDServices(int trid, String ipdServiceID,
			String ipdservicetype, int userId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean isDeleted = patientDAO.deleteIPDServices(trid, ipdServiceID,
				ipdservicetype,userId);

		return isDeleted;
	}

	public List<Patient> fetchPatientDataByOPD_ER_IPD(String OPD_ER_IPD,
			String searchBy, String value) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrSearchPat = patientDAO.fetchPatientDataByOPD_ER_IPD(OPD_ER_IPD,
				searchBy, value);

		return arrSearchPat;
	}

	public List<OPDReceiptMaster> fetchBillDetailsByTreatmentID(String treatId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<OPDReceiptMaster> OPDReceiptMasterList = patientDAO
				.fetchBillDetailsByTreatmentID(treatId);
		return OPDReceiptMasterList;
	}

	public List<IPDDischargePlanDTO> fetchDischargeCode() {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<IPDDischargePlanDTO> ipdDischargePlanDTOList = patientDAO
				.fetchDischargeCode();
		return ipdDischargePlanDTOList;
	}

	public List<Doctor> getInHouseDoctors() {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Doctor> doctorList = patientDAO.getInHouseDoctors();
		return doctorList;
	}

	public int saveBMIFromDoctorDesk(Patient objPat, Treatment objtreat) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int isInseted = patientDAO.saveBMIFromDoctorDesk(objPat, objtreat);

		return isInseted;
	}

	// FETCH BMI Details-------------@author-----Husen
	public List<PatientBmiDTO> fetchBMIDetailsOfPatient(PatientBmiDTO objBMI) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<PatientBmiDTO> bmiList = patientDAO
				.fetchBMIDetailsOfPatient(objBMI);

		return bmiList;
	}

	public List<StandardAndPatientBMIDetailsDTO> fetchStandardAndPatientBMIDetailsUtil(
			String pid) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<StandardAndPatientBMIDetailsDTO> standardAndPatientBMIDetailsDTOList = patientDAO
				.fetchStandardAndPatientBMIDetailsUtil(pid);
		return standardAndPatientBMIDetailsDTOList;
	}

	public List<StandardAndPatientBMIDetailsDTO> fetchStandardAndPatientBMIDetailsUtilGreaterThanFiveYears(
			String pid) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<StandardAndPatientBMIDetailsDTO> standardAndPatientBMIDetailsDTOList = patientDAO
				.fetchStandardAndPatientBMIDetailsUtilGreaterThanFiveYears(pid);
		return standardAndPatientBMIDetailsDTOList;
	}

	public int fetchOPDPatientCount() {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int count = patientDAO.fetchOPDPatientCount();
		return count;
	}

	public int fetchPatientCountForDashboard(String callfrom) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int count = patientDAO.fetchPatientCountForDashboard(callfrom);
		return count;
	}

	public List<Doctor> fetchOPDConsultantDetails(String today) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Doctor> count = patientDAO.fetchOPDConsultantDetails(today);
		return count;
	}

	public List<Patient> autoPatientNameFrPreAuth(String Type) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> count = patientDAO.autoPatientNameFrPreAuthDetails(Type);
		return count;
	}

	public List<IpdPatientRelativeDetails> fetchPatientInfo(String patientID) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List pInfo = patientDAO.fetchPatientInfo(patientID);

		return pInfo;
	}

	public List<PatientSponsredDetails> fetchPatientSponsorDetailsForMarkVisit(
			int patient_id) {
		List<PatientSponsredDetails> sponsorList = new ArrayList<PatientSponsredDetails>();
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		sponsorList = patientDAO
				.fetchPatientSponsorDetailsForMarkVisit(patient_id);
		return sponsorList;
	}

	public List<Patient> fetchIPDPatientsForManualDischargeSummary(String type,
			String searchBy, String value) {
		List<Patient> PatientList = new ArrayList<Patient>();
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		PatientList = patientDAO.fetchIPDPatientsForManualDischargeSummary(
				type, searchBy, value);
		return PatientList;
	}

	public List<Patient> fetchIPDPatientsForAutoDischargeSummary(String type,
			String searchBy, String value) {
		List<Patient> PatientList = new ArrayList<Patient>();
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		PatientList = patientDAO.fetchIPDPatientsForAutoDischargeSummary(type,
				searchBy, value);
		return PatientList;
	}

	public CustomizeTemplate FetchPatientsManualDischargeSummary(
			String patientId, String treatmentId) {
		CustomizeTemplate obj = new CustomizeTemplate();
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		obj = patientDAO.FetchPatientsManualDischargeSummary(patientId,
				treatmentId);
		return obj;
	}

	public int fetchOPDPatientCountWithConsultant() {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int count = patientDAO.fetchOPDPatientCountWithConsultant();
		return count;
	}
	
	public List<TreatmentNurses> FillDrugChart(String date, int tid) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List arrTopPat = patientDAO.FillDrugChart(date, tid);

		return arrTopPat;
	}
	
	public int SaveMedicineChart(TreatmentNurses objTreatmentNurses, String DrugNameString,
			String datePick, String userId, String userUpdate, String password) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		int isInserted = patientDAO.SaveMedicineChart(objTreatmentNurses, DrugNameString,
				datePick, userId, userUpdate, password);

		return isInserted;
	}
	
	public List<Doctor> fetchOPDConsultantDetails1(String today) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Doctor> count = patientDAO.fetchOPDConsultantDetails1(today);
		return count;
	}
	
	public List<FetchTitleDTO> fetchTitle() {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<FetchTitleDTO> fTitle = patientDAO.fetchTitle();

		return fTitle;
	}
	
	public String fetchTitleGender(String title) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		String gender = patientDAO.fetchTitleGender(title);

		return gender;
	}

	public boolean updateLoginHistory(String loginHistoryId) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		boolean update = patientDAO.updateLoginHistory(loginHistoryId);
		return update;
	}

	public List<Patient> FetchPatientNameForOperationScheduler(String auto,
			String type, String findingName, String searchBy) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<Patient> list = patientDAO.fetchPatientNameForOperationScheduler(auto,type,findingName,searchBy);
		return list;
	}
	public List<RadiologyTemplate> fetchRisReportList(String testID,
			String pID, String tretId, String invidrd) {
		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List<RadiologyTemplate> arrTemplateMaster = patientDAO
				.fetchRisReportList(testID,pID,tretId,invidrd);

		return arrTemplateMaster;
	}

	public List<Patient> showSearchOperSum1(String searchBy, String strValue,
			String pageName, String fdate, String todate, int surganname, int surgerytype) {

		PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
		List searchSumm = patientDAO.showSearchOperSum1( searchBy,  strValue,
				 pageName,  fdate,  todate,  surganname , surgerytype);
		return searchSumm;
	}
	
	//Sanjay Kumar Shah
		public List<IpdConsentForm> fetchAllConsentFormForPrint(String tid,int idipdConsentForm) {

			PatientDAO patientDAO = (PatientDAO) getContext().getBean("patientDAO");
			List<IpdConsentForm> IpdConsentForm = patientDAO
					.fetchAllConsentFormForPrint(tid,idipdConsentForm);
			return IpdConsentForm;
		}
		
		   public List<DoctorRoundReport> fetchDoctorRoundForDoctorStation(int treatID) {
				PatientDAO patientDAO = (PatientDAO) getContext()
						.getBean("patientDAO");
				
				List<DoctorRoundReport> DRRli = patientDAO.fetchDoctorRoundForDoctorStation(treatID);
				return DRRli;
			}	
		   
		   public List<DoctorRoundReport> fetchDoctorRoundForDoctorStation1(int treatID,String toDate,String fromDate) {
				PatientDAO patientDAO = (PatientDAO) getContext()
						.getBean("patientDAO");
				
				List<DoctorRoundReport> DRRli = patientDAO.fetchDoctorRoundForDoctorStation1(treatID,toDate,fromDate);
				return DRRli;
			}
}
