package com.hms.ipd.service;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestParam;

import com.hms.dao.IPDNusringMedicationDashboardDAO;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.dto.BillComponent;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DischargeProcess;
import com.hms.dto.IPDDischargePlanDTO;
import com.hms.dto.IpdConsentForm;
import com.hms.dto.LabPkg;
import com.hms.dto.Patient;
import com.hms.dto.TreatmentNurses;
import com.hms.ehat.dto.CpoeOTdetails;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ipd.dto.DoctorListDTO;
import com.hms.ipd.dto.DoctorRoundDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;
import com.hms.ipd.dto.IndividualTreatmentInstructionIPD;
import com.hms.ipd.dto.PCTreatmentInstructionDTO;
import com.hms.ipd.dto.TreatmentTopicDTO;

public interface IPDHistoryService {

	OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId);

	List<CpoeServdetails> fetchBillDetailsIPD(Integer tID, String callform, Integer servid);

	Integer saveDoctorRound(Integer tid, String drs, String drrobj, String date, Integer treatmentbedid);

	DoctorRoundDTO saveDoctorRounds(DoctorRoundDTO doctorRoundDTO);

	List<DoctorRoundDTO> fetchDoctorRounds(Integer treatmentId, Integer unitId);

	List<DoctorListDTO> fetchDoctorList(Integer unitId);

	List<DoctorRoundTempDTO> fetchDoctorRoundTemplate(Integer unitId);
	
	List<DoctorRoundTempDTO> SearchDoctorRoundTemplate(String tempName);

	String deleteDoctorRoundIPD(Integer unitId, String doctorSlaveIds);

	List<PCTreatmentInstructionDTO> fetchPCTreatmentInstruction(Integer treatmentId);

	List<TreatmentTopicDTO> fetchAllTreatmentTopic(String action, String pageName, Integer unitId);

	List<IndividualTreatmentInstructionIPD> fetchIndividualTreatmentInstructionIPD(Integer treatmentId);

	List<Patient> displayTopPat(String patId, String page_name, String userId, String type, String value,
			String searchBy);

	List<BillComponent> patientMaterialUsed(String tid, String date);

	List<CpoeOTdetails> fetchIpdServices(String tid, String serviceid);

	List<TreatmentNurses> fillDIC(String tid, String date);

	List<TreatmentNurses> fillDrugChart(String tid, String date);

	String fetchLabResultData(String treatmentId);

	List<OPDPrescriptionDtoSP> fetchNursingMedication(String todayDate, String callfrom,
			String treatmentId);

	List<LabPkg> getPackages(String byName, String type);

	List<IPDDischargePlanDTO> fetchDischargeCode();

	List<IPDDischargePlanDTO> fetchIPDDischargePlan(String treatmentId);

	String saveIPDDischargePlan(IPDDischargePlanDTO ipdDischargePlanDTO,String queryType);

	List<DischargeProcess> fetchDischargeProcess(String treatmentId);

	int saveDischargeProcess(DischargeProcess objDischargeProcess1, DischargeProcess objDischargeProcess,
			String queryType, int inttretID, String[] allVals, int userId);

	List<CustomizeTemplate> fetchIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate);

	Integer saveUpdateIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate, String queryType);

	Integer saveConsentForm(IpdConsentForm objIpdConsentForm, String queryType);
	
	List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid);

	List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid,int idipdConsentForm);
	
	List<DoctorRoundDTO> fetchDoctorRoundsByDate(Integer treatmentId, Integer unitId, String fromDate, String toDate);
	
	List<DoctorRoundDTO> fetchDoctorRoundsByDateOnchange(Integer treatmentId, Integer unitId, String fromDate);

	List<Patient> featchPreviousICFpat(String type, Integer unitId, String searchBy, String value);
	

	DoctorRoundDTO fetchDoctorRoundsByDateOnchangeForPrint(Integer treatmentId, Integer unitId, String fromDate,String toDate);

	int saveAdministratedDoneReverse(String action,String id,String callFrom,String treatmentId,HttpServletRequest request);
	
	int saveNursingDoctorRound(String doctorRoundId,String dtime,String nursingnotes,HttpServletRequest request);
	
}
