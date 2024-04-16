package com.hms.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.hms.constants.TableName;
import com.hms.dto.AdviceDTO;
import com.hms.dto.AllergyAlertsDTO;
import com.hms.dto.Appointment;
import com.hms.dto.Assessment;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.Doctor;
import com.hms.dto.ICD10_L;
import com.hms.dto.NursingNotesDTO;
import com.hms.dto.Order_comp_druges;
import com.hms.dto.Order_master;
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
import com.hms.dto.VaccineDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.treatment.util.FollicularStudy;
import com.hms.treatment.util.FollicularSutdyRecord;

@Transactional
public interface TreatmentDAO {

	public boolean saveTreatmentDoctor(TreatmentDoctors objTreatmentDoctor,
			String patID, List<String> chkList, String docName, String tn,
			String docid, String date, String id, String queryType);

	public List fetchTest();

	public List<Doctor> fetchDoctor(String page, String date, String stTime,
			String eTime);

	public List<TreatmentDoctors> fetchTreatmentDoctors(String pid);

	public TreatmentTests fetchPatientTest(String pid, String datepick);

	public boolean fetchTreatmentDoctorsDesk(
			TreatmentDoctors objTreatmentDoctor, String patID, String updateOn,
			String funType, int userName);

	public boolean savePatientTreatmentTests(TreatmentTests objTreatmentTests,
			Integer doc_id, String date, String trid);

	public List<Patient> fetchDoctorsApp(Integer doc_id, String pageName,
			String searchBy, String value);

	public List<Test> getTestListForUpdate(int sp_dic_master_id,
			String testType, String heading, String searchType, String testName);

	public Patient fetchDefaultRMOTreatmentUtil(String pid);

	public Patient fetchPatRMOPrevTreatmentUtil(int drRowId, int trId);

	public Patient searchDefaultRMOTreatment(String searchBy, String strValue,
			String srchType);

	// public boolean insertTest(int treat_id, List<String> chkList, String
	// date);

	public List<Order_master> fetchOrderDetails(String omID, String trid);

	public TreatmentTests fetchAllPatientTest(String trid);

	public List fetchBillTest();

	public int maxColumnId(String string, String string2);

	public List getConsultingFees();

	public Patient fetchDistinctRMOTreatment();

	public List<ICD10_L> SearchICD10Diagnosis(String serchTxt);

	public Patient FetchPatientInfo(String pid);

	public List<TreatmentDoctors> fetchDoctorTests(int treatmentId);

	public int savePrescription(Prescription objPrescription, String queryType);

	public List<Prescription> fetchPrescription(String treatmentId);

	public boolean deletePresdription(String[] prescriptionIDArray);

	public int saveAssessmentOpd(Assessment objAssessment, String queryType);

	public List<Assessment> fetchAssessment(String treatmentId);

	public boolean deleteAssessment(int diagno_slave_id);

	public boolean saveAllergyAlerts(AllergyAlertsDTO allergyAlertsDTO,
			String pid, int userid);

	public List<AllergyAlertsDTO> fetchAllergyAlerts(String pid);

	public boolean deleteAllergyAlerts(int allergyAlertsSlaveID, int userid);

	public boolean saveAdvice(int userid, AdviceDTO adviceDTO_Obj, String adviceQueryType,
			String treatmentId);

	public List<AdviceDTO> fetchAdvice(String treatmentId);

	public boolean deleteAdvice(int userid, int adviceID, String treatmentId);

	public int savefollowUpForPatient(Appointment objAppointment);

	public boolean saveReportInstruction(
			ReportInstructionDTO reportInstructionDTO);

	public List<ReportInstructionDTO> fetchReportInstruction();

	boolean deleteReportInstruction(String[] reportInstructionIDsArray);

	public boolean savePCTreatmentInstruction(int pCTreatmentInstructionNameID,
			String treatmentId);

	public List<TreatmentInstructionDTO> fetchPCTreatmentInstruction(
			String treatmentId);

	public boolean deletePCTreatmentInstruction(int PCTreatmentInstructionID,
			String treatmentId);

	public boolean saveIndividualTreatmentInstruction(String treatmentId,
			String[] individualTreatmentInstructionCheckboxIDArray);

	public List<ReportInstructionDTO> fetchIndividualTreatmentInstruction(
			String treatmentId);

	public List<Treatment> fetchPreviousTreatmentsByTreatmentID(
			String treatmentId);

	public int saveUpdateIPDDischargeSummaryTemplate(
			CustomizeTemplate objTemplate, String queryType);
	
	public int saveIPDSummaryTemplatePhysicalDischargeUtil(
			CustomizeTemplate objTemplate, String queryType);

	public List<CustomizeTemplate> fetchIPDDischargeSummaryTemplate(
			CustomizeTemplate objTemplate);

	public String fetchPatientAdmissionNote(Treatment treat);

	public int fetchRouteMasterID(String pageType);

	public int saveRouteType(RouteDTO route, String queryType);

	public List<RouteDTO> fetchAllMedicationMasterList(String pageType, String searhFlag, String searchText);

	public int deleteRouteType(String routeId);

	public List<RouteDTO> fetchPreperationsList(String pageType);

	public List<RouteDTO> fetchRouteTypeList(String pageType, String prep);

	public List<PrescriptionTemplateDTO> fetchDocPrescriptionTemplate(
			String docTemplateNameSelectID, int userId);

	public boolean saveUpdateDocPrescriptionTemplateByID(
			PrescriptionTemplateDTO prescriptionTemplateDTO);

	public boolean saveUpdatePrescriptionDocTemplateMed(
			Prescription objPrescription, int userID);

	public List<Prescription> fetchPrescriptionDocTemplateMedicine(
			int prescriptionTemplateID);

	public boolean deleteDocPrescriptionTemplateMedicine(
			String[] prepTempDocMedIDArray);

	public List<RouteDTO> fetchUnitTypeList(String pageType);

	public int savePeadiatricMedicine(Prescription objPrep);

	public List<Prescription> CompanyListUtil(String pageType);

	public List<Prescription> fetchPMedicineMaster(String searhFlag,
			String searchText);

	public boolean usePrepDocTempForTreatment(String prepTemplateDocID,
			String treatmentId);

	public boolean deletePrepDocTemp(String prepTemplateDocID);

	public boolean deletePMedicineMaster(int prescription_id);

	public int savePrescriptionInstruction(PrescriptionInstruction pInstruction);

	public List<PrescriptionInstruction> fectchAllPrescriptionInstruction(String type);

	public boolean deletePrescriptionInstructionUtil(
			String[] reportInstructionIDsArray);

	/*
	 * public List<PrescriptionInstruction> fetchPrescriptionInstructionSearch(
	 * String parameter, String parameter2, String parameter3);
	 */

	public List<PrescriptionInstruction> fetchPrescriptionInstructionSearch(
			String byId, String byName);

	public String saveAddnewOrUpdateExistingTemplate(
			PrescriptionTemplateDTO prescriptionTemplateDTO,
			String newExistingRadio, String[] prescriptionIDArray,
			String treatmentID);

	public Integer getNextId(TableName radiationMaster);

	public int saveRadiation(RadiationMaster radiation);

	public List<RadiationMaster> fectchRadiationMaster(String strValue);

	public boolean deleteRadiation(int radiationId);

	public int saveRadiotherapy(RadiotherapyDTO radio);

	public List<RadiotherapyDTO> fectchAllRadiotherapy(int treatmentId,
			int patientId);

	public boolean deleteRadiotherapy(int radiotherapyId, int treatmentId,
			int patientId);

	public List generateImmunizationChartForPatient(int pid,
			List vaccineDTOList);

	public String saveUpdateVaccinationPatientTreatment(VaccineDTO vaccineDTO,
			int userid, int pid, String treatmentID);

	public List<Appointment> fetchfollowUpForPatient(String treatmentId);

	public int saveNursingNotes(NursingNotesDTO ndto);

	public List<NursingNotesDTO> fetchAllNursingNotes(String pageType,
			String searhFlag, String searchText);

	public int deleteNursingNotes(String id);

	public Integer getNextNursingNotesId(TableName nursingNotes);

	public List<FollicularStudy> fetchFollicularAll(int patientId);

	public int saveFollicularStudyData(int userid,
			FollicularStudy studyData,int studyid);
	

	public int requestCloseTreatment(int userid, String callFrom, String tretID);

	public int saveStudyRecord(int userid, FollicularSutdyRecord study);

	public boolean DeleteStudyRec(int userid, String date, int studyidR);

	public List<FollicularSutdyRecord> fetchStudyReport(String inidate, int treatmentId);

	public int convertToIPDNotification(int userid, String treatid, String patid, String ipaddress);

	public List<RadiotherapyDTO> fectchAllRadiotherapyPrev(int treatmentId,
			int patientId);

	public String fetchRefDoc(Treatment treat);

	public List<Order_comp_druges> FetchDetailsForPharmacyMedicine(String id);

	
}
