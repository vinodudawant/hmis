package com.hms.model;

import java.util.ArrayList;
import java.util.List;

//import org.springframework.getContext().ApplicationContext;
//import org.springframework.getContext().support.ClassPathXmlApplicationContext;

import com.hms.constants.TableName;
import com.hms.dao.AdminDAO;
import com.hms.dao.BillDAO;
import com.hms.dao.InventoryDAO;
import com.hms.dao.PatientDAO;
import com.hms.dao.TreatmentDAO;
import com.hms.dto.AdviceDTO;
import com.hms.dto.AllergyAlertsDTO;
import com.hms.dto.Appointment;
import com.hms.dto.Assessment;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.Doctor;
import com.hms.dto.ICD10_L;
import com.hms.dto.InventoryPurchaseOrderMaster;
import com.hms.dto.NursingNotesDTO;
import com.hms.dto.Order_comp_druges;
import com.hms.dto.Order_master;
import com.hms.dto.PackageManager;
import com.hms.dto.Patient;
import com.hms.dto.Prescription;
import com.hms.dto.PrescriptionInstruction;
import com.hms.dto.PrescriptionTemplateDTO;
import com.hms.dto.RadiationMaster;
import com.hms.dto.RadiotherapyDTO;
import com.hms.dto.ReportInstructionDTO;
import com.hms.dto.RouteDTO;
import com.hms.dto.Test;
import com.hms.dto.Treatment;
import com.hms.dto.TreatmentDoctors;
import com.hms.dto.TreatmentInstructionDTO;
import com.hms.dto.TreatmentTests;
import com.hms.dto.Users;
import com.hms.dto.VaccineDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.treatment.util.FollicularStudy;
import com.hms.treatment.util.FollicularSutdyRecord;
import com.hms.utility.ApplicationContextUtils;

public class TreatmentModel extends AbstractModel {

	/*
	 * ApplicationContext getContext() = new ClassPathXmlApplicationContext(
	 * "Spring-Treatment.xml");
	 */

	// ApplicationContext getContext() = ApplicationContextUtils
	// .getApplicationContext();

	public boolean setTreatmentDoctor(TreatmentDoctors objTreatmentDoctor,
			String patID, List<String> chkList, String docName, String tn,
			String docid, String date, String id, String queryType) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInserted = treatmentDAO.saveTreatmentDoctor(
				objTreatmentDoctor, patID, chkList, docName, tn, docid, date,
				id, queryType);
		return isInserted;
	}

	public int maxColumnId(String string, String string2) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int maxId = treatmentDAO.maxColumnId(string, string2);

		return maxId;
	}

	public List getTestList() {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List test = treatmentDAO.fetchTest();

		return test;
	}

	public List<Doctor> getDoctorList(String page, String date, String stTime,
			String eTime) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Doctor> doctor = treatmentDAO.fetchDoctor(page, date, stTime,
				eTime);

		return doctor;

	}

	public List<TreatmentDoctors> getDoctorTreatment(String pid) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<TreatmentDoctors> treatmentDoctors = treatmentDAO
				.fetchTreatmentDoctors(pid);

		return treatmentDoctors;
	}

	public boolean setTreatmentDoctorDesk(TreatmentDoctors objTreatmentDoctor,
			String patID, String updateOn, String funType, int userName) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean treatmentDoctorsDesk = treatmentDAO.fetchTreatmentDoctorsDesk(
				objTreatmentDoctor, patID, updateOn, funType, userName);

		return treatmentDoctorsDesk;
	}

	public TreatmentTests getPatientTestList(String pid, String datepick) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		TreatmentTests test = treatmentDAO.fetchPatientTest(pid, datepick);

		return test;
	}

	public boolean savePatientTreatmentTests(TreatmentTests objTreatmentTests,
			Integer doc_id, String date, String trid) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInserted = treatmentDAO.savePatientTreatmentTests(
				objTreatmentTests, doc_id, date, trid);

		return isInserted;
	}

	public List<Patient> fetchPatientData(Integer doc_id, String pageName,
			String searchBy, String value) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Patient> treatmentDoctors = treatmentDAO.fetchDoctorsApp(doc_id,
				pageName, searchBy, value);

		return treatmentDoctors;
	}

	public List<Test> getTestListForUpdate(int sp_dic_master_id,
			String testType, String heading, String searchType, String testName) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Test> liTest = treatmentDAO.getTestListForUpdate(sp_dic_master_id,
				testType, heading, searchType, testName);

		return liTest;
	}

	public Patient fetchDefaultRMOTreatmentUtil(String pid) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		Patient objPatient = treatmentDAO.fetchDefaultRMOTreatmentUtil(pid);
		return objPatient;
	}

	public Patient fetchPatRMOPrevTreatmentUtil(int drRowId, int trId) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		Patient objPatient = treatmentDAO.fetchPatRMOPrevTreatmentUtil(drRowId,
				trId);
		return objPatient;

	}

	public Patient searchDefaultRMOTreatment(String searchBy, String strValue,
			String srchType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		Patient objPatient = treatmentDAO.searchDefaultRMOTreatment(searchBy,
				strValue, srchType);
		return objPatient;
	}

	public Patient searchDefaultRMOTreatmentutill(String searchBy,
			String strValue) {
		// TODO Auto-generated method stub
		return null;
	}

	/*
	 * public boolean saveTestFormat(List<String> chkList, int treat_id, String
	 * date) { boolean isInserted = false; TreatmentDAO treatmentDAO =
	 * (TreatmentDAO) getContext() .getBean("treatmentDAO"); isInserted =
	 * treatmentDAO.insertTest(treat_id, chkList, date);
	 * 
	 * return isInserted; }
	 */
	public List<Order_master> fetchOrderDetails(String omID, String trid) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Order_master> order_masterli = treatmentDAO.fetchOrderDetails(
				omID, trid);

		return order_masterli;
	}

	public TreatmentTests getAllPatientTestList(String trid) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		TreatmentTests test = treatmentDAO.fetchAllPatientTest(trid);

		return test;
	}

	public List<Test> getBillTestList() {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List test = treatmentDAO.fetchBillTest();

		return test;
	}

	public List<Users> getConsultingFees() {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List user = treatmentDAO.getConsultingFees();

		return user;
	}

	public Patient fetchDistinctRMOTreatment() {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		Patient objPatient = treatmentDAO.fetchDistinctRMOTreatment();
		return objPatient;
	}

	public List<ICD10_L> SearchICD10Diagnosis(String serchTxt) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<ICD10_L> listICD10_L = treatmentDAO.SearchICD10Diagnosis(serchTxt);

		return listICD10_L;
	}

	public Patient FetchPatientInfo(String pid) {
		// TODO Auto-generated method stub
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		Patient objPatient = treatmentDAO.FetchPatientInfo(pid);

		return objPatient;
	}

	public List<TreatmentDoctors> fetchDoctorTests(int treatmentId) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List arrDoctorTests = treatmentDAO.fetchDoctorTests(treatmentId);
		return arrDoctorTests;
	}

	// Author : nIKHIL; Date : 24-9-2014;
	public int savePrescription(Prescription objPrescription, String queryType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int isUpdated = treatmentDAO.savePrescription(objPrescription,
				queryType);
		return isUpdated;
	}

	// * Author : nIKHIL; Date : 24-9-2014;
	public List<Prescription> fetchPrescription(String treatmentId) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Prescription> arrPrescription = treatmentDAO
				.fetchPrescription(treatmentId);
		return arrPrescription;
	}

	// Author : nIKHIL; Date : 24-9-2014;
	public boolean deletePrescription(String[] prescriptionIDArray) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO
				.deletePresdription(prescriptionIDArray);
		return isDeleted;
	}

	// Author : nIKHIL; Date : 3-10-2014;
	public int saveAssessmentOpd(Assessment objAssessment, String queryType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int isUpdated = treatmentDAO
				.saveAssessmentOpd(objAssessment, queryType);
		return isUpdated;
	}

	// Author : nIKHIL; Date : 6-10-2014;
	public List<Assessment> fetchAssessment(String treatmentId) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Assessment> arrAssessments = treatmentDAO
				.fetchAssessment(treatmentId);
		return arrAssessments;
	}

	// Author : nIKHIL; Date : 7-10-2014;
	public boolean deleteAssessment(int diagno_slave_id) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO.deleteAssessment(diagno_slave_id);
		return isDeleted;
	}

	public boolean saveAllergyAlerts(AllergyAlertsDTO allergyAlertsDTO,
			String pid, int userid) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInserted = treatmentDAO.saveAllergyAlerts(allergyAlertsDTO,
				pid, userid);
		return isInserted;
	}

	public List<AllergyAlertsDTO> fetchAllergyAlerts(String pid) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<AllergyAlertsDTO> allergyAlertsDTOList = treatmentDAO
				.fetchAllergyAlerts(pid);
		return allergyAlertsDTOList;
	}

	public boolean deleteAllergyAlerts(int allergyAlertsSlaveID, int userid) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO
				.deleteAllergyAlerts(allergyAlertsSlaveID, userid);
		return isDeleted;
	}

	public boolean saveAdvice(int userid, AdviceDTO adviceDTO_Obj, String adviceQueryType,
			String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInserted = treatmentDAO.saveAdvice(userid, adviceDTO_Obj,
				adviceQueryType, treatmentId);
		return isInserted;
	}

	public List<AdviceDTO> fetchAdvice(String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<AdviceDTO> adviceDTOList = treatmentDAO.fetchAdvice(treatmentId);
		return adviceDTOList;
	}

	public boolean deleteAdvice(int userid, int adviceID, String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO.deleteAdvice(userid, adviceID, treatmentId);
		return isDeleted;
	}

	public int savefollowUpForPatient(Appointment objAppointment) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int isInserted = treatmentDAO.savefollowUpForPatient(objAppointment);
		return isInserted;
	}

	public boolean saveReportInstruction(
			ReportInstructionDTO reportInstructionDTO) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInserted = treatmentDAO
				.saveReportInstruction(reportInstructionDTO);
		return isInserted;
	}

	public List<ReportInstructionDTO> fetchReportInstruction() {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<ReportInstructionDTO> reportInstructionDTOList = treatmentDAO
				.fetchReportInstruction();
		return reportInstructionDTOList;
	}

	public boolean deleteReportInstruction(String[] reportInstructionIDsArray) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO
				.deleteReportInstruction(reportInstructionIDsArray);
		return isDeleted;
	}

	public boolean savePCTreatmentInstruction(int pCTreatmentInstructionNameID,
			String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInserted = treatmentDAO.savePCTreatmentInstruction(
				pCTreatmentInstructionNameID, treatmentId);
		return isInserted;
	}

	public List<TreatmentInstructionDTO> fetchPCTreatmentInstruction(
			String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<TreatmentInstructionDTO> treatmentInstructionDTOList = treatmentDAO
				.fetchPCTreatmentInstruction(treatmentId);
		return treatmentInstructionDTOList;
	}

	public boolean deletePCTreatmentInstruction(int PCTreatmentInstructionID,
			String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO.deletePCTreatmentInstruction(
				PCTreatmentInstructionID, treatmentId);
		return isDeleted;
	}

	public boolean saveIndividualTreatmentInstruction(String treatmentId,
			String[] individualTreatmentInstructionCheckboxIDArray) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInserted = treatmentDAO.saveIndividualTreatmentInstruction(
				treatmentId, individualTreatmentInstructionCheckboxIDArray);
		return isInserted;
	}

	public List<ReportInstructionDTO> fetchIndividualTreatmentInstruction(
			String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<ReportInstructionDTO> reportInstructionDTOList = treatmentDAO
				.fetchIndividualTreatmentInstruction(treatmentId);
		return reportInstructionDTOList;
	}

	public List<Treatment> fetchPreviousTreatmentsByTreatmentID(
			String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Treatment> treatmentList = treatmentDAO
				.fetchPreviousTreatmentsByTreatmentID(treatmentId);

		return treatmentList;
	}

	public int saveUpdateIPDDischargeSummaryTemplate(
			CustomizeTemplate objTemplate, String queryType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int isInserted = treatmentDAO.saveUpdateIPDDischargeSummaryTemplate(
				objTemplate, queryType);
		return isInserted;
	}
	
	public int saveIPDSummaryTemplatePhysicalDischargeUtil(
			CustomizeTemplate objTemplate, String queryType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int isInserted = treatmentDAO.saveIPDSummaryTemplatePhysicalDischargeUtil(
				objTemplate, queryType);
		return isInserted;
	}

	public List<CustomizeTemplate> fetchIPDDischargeSummaryTemplate(
			CustomizeTemplate objTemplate) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<CustomizeTemplate> CustomizeTemplateList = treatmentDAO
				.fetchIPDDischargeSummaryTemplate(objTemplate);

		return CustomizeTemplateList;
	}

	public String fetchPatientAdmissionNote(Treatment treat) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		String note = treatmentDAO.fetchPatientAdmissionNote(treat);
		return note;
	}

	public int fetchRouteMasterID(String pageType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int routeId = treatmentDAO.fetchRouteMasterID(pageType);
		return routeId;
	}

	public int saveRouteType(RouteDTO route, String queryType) {
		int isInserted = 0;
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		isInserted = treatmentDAO.saveRouteType(route, queryType);
		return isInserted;
	}

	public List<RouteDTO> fetchAllMedicationMasterList(String pageType,
			String searhFlag, String searchText) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<RouteDTO> routeList = treatmentDAO.fetchAllMedicationMasterList(
				pageType, searhFlag, searchText);
		return routeList;
	}

	public int deleteRouteType(String routeId) {
		int isdeleted = 0;
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		isdeleted = treatmentDAO.deleteRouteType(routeId);
		return isdeleted;
	}

	public List<RouteDTO> fetchPreperationsList(String pageType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<RouteDTO> routeList = treatmentDAO.fetchPreperationsList(pageType);
		return routeList;
	}

	public List<RouteDTO> fetchRouteTypeList(String pageType, String prep) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<RouteDTO> routeList = treatmentDAO.fetchRouteTypeList(pageType,
				prep);
		return routeList;
	}

	public List<PrescriptionTemplateDTO> fetchDocPrescriptionTemplate(
			String docTemplateNameSelectID, int userId) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");

		List<PrescriptionTemplateDTO> prescriptionTemplateDTOList = treatmentDAO
				.fetchDocPrescriptionTemplate(docTemplateNameSelectID, userId);

		return prescriptionTemplateDTOList;

	}

	public boolean saveUpdateDocPrescriptionTemplateByID(
			PrescriptionTemplateDTO prescriptionTemplateDTO) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInsertedUpdated = treatmentDAO
				.saveUpdateDocPrescriptionTemplateByID(prescriptionTemplateDTO);
		return isInsertedUpdated;

	}

	public boolean saveUpdatePrescriptionDocTemplateMed(
			Prescription objPrescription, int userID) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isInsertedUpdated = treatmentDAO
				.saveUpdatePrescriptionDocTemplateMed(objPrescription, userID);
		return isInsertedUpdated;
	}

	public boolean deleteDocPrescriptionTemplateMedicine(
			String[] prepTempDocMedIDArray) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO
				.deleteDocPrescriptionTemplateMedicine(prepTempDocMedIDArray);
		return isDeleted;
	}

	public List<RouteDTO> fetchUnitTypeList(String pageType) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<RouteDTO> routeList = treatmentDAO.fetchUnitTypeList(pageType);
		return routeList;
	}

	public int savePeadiatricMedicine(Prescription objPrep) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int isInsertedUpdated = treatmentDAO.savePeadiatricMedicine(objPrep);
		return isInsertedUpdated;
	}

	public List<Prescription> fetchCompanyListUtil(String pageType) {
		// TODO Auto-generated method stub

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");

		List<Prescription> list = treatmentDAO.CompanyListUtil(pageType);

		return list;
	}

	public List<Prescription> fetchPMedicineMaster(String searhFlag,
			String searchText) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Prescription> arrDefaultMedicine = treatmentDAO
				.fetchPMedicineMaster(searhFlag, searchText);
		return arrDefaultMedicine;

	}

	public boolean usePrepDocTempForTreatment(String prepTemplateDocID,
			String treatmentId) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean flag = treatmentDAO.usePrepDocTempForTreatment(
				prepTemplateDocID, treatmentId);
		return flag;
	}

	public boolean deletePrepDocTemp(String prepTemplateDocID) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO.deletePrepDocTemp(prepTemplateDocID);
		return isDeleted;
	}

	public boolean deletePMedicineMaster(int prescription_id) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO.deletePMedicineMaster(prescription_id);
		return isDeleted;
	}

	public int savePrescriptionInstruction(PrescriptionInstruction pInstruction) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		int isInserted = tDAO.savePrescriptionInstruction(pInstruction);
		return isInserted;
	}

	public List<PrescriptionInstruction> fectchAllPrescriptionInstruction(String type) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		List<PrescriptionInstruction> preList = tDAO
				.fectchAllPrescriptionInstruction(type);
		return preList;
	}

	public boolean deletePrescriptionInstructionUtil(
			String[] reportInstructionIDsArray) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		boolean isDeleted = treatmentDAO
				.deletePrescriptionInstructionUtil(reportInstructionIDsArray);
		return isDeleted;
	}

	public List<PrescriptionInstruction> fetchPrescriptionInstructionSearch(
			String byId, String byName) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");

		List<PrescriptionInstruction> pListSearch = treatmentDAO
				.fetchPrescriptionInstructionSearch(byId, byName);
		return pListSearch;
	}

	public String saveAddnewOrUpdateExistingTemplate(
			PrescriptionTemplateDTO prescriptionTemplateDTO,
			String newExistingRadio, String[] prescriptionIDArray,
			String treatmentID) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");

		String msg = treatmentDAO.saveAddnewOrUpdateExistingTemplate(
				prescriptionTemplateDTO, newExistingRadio, prescriptionIDArray,
				treatmentID);

		return msg;
	}

	public Integer getNextId(TableName radiationMaster) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		Integer nextId = treatmentDAO.getNextId(radiationMaster);
		return nextId;
	}

	public int saveRadiation(RadiationMaster radiation) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		int isInserted = tDAO.saveRadiation(radiation);
		return isInserted;
	}

	public List<RadiationMaster> fectchRadiationMaster(String strValue) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		List<RadiationMaster> preList = tDAO.fectchRadiationMaster(strValue);
		return preList;
	}

	public boolean deleteRadiation(int radiationId) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		boolean isDeleted = tDAO.deleteRadiation(radiationId);
		return isDeleted;
	}

	public int saveRadiotherapy(RadiotherapyDTO radio) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		int isInserted = tDAO.saveRadiotherapy(radio);
		return isInserted;
	}

	public List<RadiotherapyDTO> fectchAllRadiotherapy(int treatmentId,
			int patientId) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		List<RadiotherapyDTO> list = tDAO.fectchAllRadiotherapy(treatmentId,
				patientId);
		return list;
	}

	public boolean deleteRadiotherapy(int radiotherapyId, int treatmentId,
			int patientId) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		boolean isDeleted = tDAO.deleteRadiotherapy(radiotherapyId,
				treatmentId, patientId);
		return isDeleted;
	}

	public List<VaccineDTO> generateImmunizationChartForPatient(int pid) {

		AdminDAO adminDAO = (AdminDAO) getContext().getBean("adminDAO");
		// loadSearchParam, searchVaccineByName
		List<VaccineDTO> vaccineDTOList = adminDAO.fetchImmunization("ONLOAD",
				"dummyParam");

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<VaccineDTO> vaccineDTOListProcessed = treatmentDAO
				.generateImmunizationChartForPatient(pid, vaccineDTOList);
		return vaccineDTOListProcessed;

	}

	public String saveUpdateVaccinationPatientTreatment(VaccineDTO vaccineDTO,
			int userid, int pid, String treatmentID) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		String msg = treatmentDAO.saveUpdateVaccinationPatientTreatment(
				vaccineDTO, userid, pid, treatmentID);

		return msg;

	}

	public List<Appointment> fetchfollowUpForPatient(String treatmentId) {

		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Appointment> patAppointment = treatmentDAO
				.fetchfollowUpForPatient(treatmentId);

		return patAppointment;

	}

	public int saveNursingNotes(NursingNotesDTO ndto) {
		int isInserted = 0;
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		isInserted = treatmentDAO.saveNursingNotes(ndto);
		return isInserted;
	}

	public List<NursingNotesDTO> fetchAllNursingNotes(String pageType,
			String searhFlag, String searchText) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<NursingNotesDTO> notesList = treatmentDAO.fetchAllNursingNotes(
				pageType, searhFlag, searchText);
		return notesList;
	}

	public int deleteNursingNotes(String id) {
		int isdeleted = 0;
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		isdeleted = treatmentDAO.deleteNursingNotes(id);
		return isdeleted;
	}

	public Integer getNextNursingNotesId(TableName nursingNotes) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		Integer nextId = treatmentDAO.getNextNursingNotesId(nursingNotes);
		return nextId;
	}

		public List<FollicularStudy> fetchFollicularAll(int patientId) {
			TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
			List<FollicularStudy> list = tDAO.fetchFollicularAll(patientId);
			return list;
		}

		public int saveFollicularStudyData(int userid, FollicularStudy studyData, int studyid) {
			int isInserted = 0;
			TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
			isInserted = tDAO.saveFollicularStudyData(userid, studyData,studyid);
			return isInserted;
		}
		

	public int requestCloseTreatment(int userid, String callFrom, String tretID) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		int cancel = treatmentDAO.requestCloseTreatment(userid,callFrom,tretID);
		return cancel;
	}

	public int saveStudyRecord(int userid, FollicularSutdyRecord study) {
			TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
			int isInserted = tDAO.saveStudyRecord(userid, study);
			return isInserted;
		}

	public boolean DeleteStudyRec(int userid, String date, int studyidR) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		boolean isDeleted = tDAO.DeleteStudyRec(userid, date, studyidR);
		return isDeleted;
	}

	public List<FollicularSutdyRecord> fetchStudyReport(String inidate, int treatmentId) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		List<FollicularSutdyRecord> list = tDAO.fetchStudyReport(inidate, treatmentId);
		return list;
	}

	public int convertToIPDNotification(int userid, String treatid, String patid, String ipaddress) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		int isNotified = tDAO.convertToIPDNotification(userid, treatid, patid,ipaddress);
		return isNotified;
	}

	public List<RadiotherapyDTO> fectchAllRadiotherapyPrev(int treatmentId,
			int patientId) {
		TreatmentDAO tDAO = (TreatmentDAO) getContext().getBean("treatmentDAO");
		List<RadiotherapyDTO> list = tDAO.fectchAllRadiotherapyPrev(treatmentId,
				patientId);
		return list;
	}
	
	public String fetchRefDoc(Treatment treat) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		String note = treatmentDAO.fetchRefDoc(treat);
		return note;
	}

	public List<Order_comp_druges> FetchDetailsForPharmacyMedicine(String id) {
		TreatmentDAO treatmentDAO = (TreatmentDAO) getContext().getBean(
				"treatmentDAO");
		List<Order_comp_druges> list = treatmentDAO.FetchDetailsForPharmacyMedicine(id);
		return list;
	}

}
