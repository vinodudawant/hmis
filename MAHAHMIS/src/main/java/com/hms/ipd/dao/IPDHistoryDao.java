package com.hms.ipd.dao;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dao.IPDNusringMedicationDashboardDAO;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.dto.BillComponent;
import com.hms.dto.CustomizeTemplate;
import com.hms.dto.DischargeProcess;
import com.hms.dto.DoctorRoundReport;
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

public interface IPDHistoryDao {
	

	public OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId);

	public List<CpoeServdetails> fetchBillDetailsIPD(Integer tID, String callform, Integer servid);

	public Integer saveDoctorRound(Integer tid, String drs, String drrobj, String date,
			Integer treatmentbedid);

	public DoctorRoundDTO saveDoctorRounds(DoctorRoundDTO doctorRoundDTO);

	public List<DoctorRoundDTO> fetchDoctorRounds(Integer treatmentId, Integer unitId);

	public List<DoctorListDTO> fetchDoctorList(Integer unitId);

	public List<DoctorRoundTempDTO> fetchDoctorRoundTemplate(Integer unitId);
	
	public List<DoctorRoundTempDTO> SearchDoctorRoundTemplate(String tempName);

	public String deleteDoctorRoundIPD(Integer unitId, String doctorSlaveIds);

	public List<PCTreatmentInstructionDTO> fetchPCTreatmentInstruction(Integer treatmentId);

	public List<TreatmentTopicDTO> fetchAllTreatmentTopic(String action, String pageName, Integer unitId);

	public List<IndividualTreatmentInstructionIPD> fetchIndividualTreatmentInstructionIPD(Integer treatmentId);

	public List<Patient> displayTopPat(String patId, String page_name, String userId, String type, String value,
			String searchBy);

	public List<BillComponent> patientMaterialUsed(String tid, String date);

	public List<CpoeOTdetails> fetchIpdServices(String tid, String serviceid);

	public List<TreatmentNurses> fillDIC(String tid, String date);

	public List<TreatmentNurses> fillDrugChart(String tid, String date);

	public String fetchLabResultData(String treatmentId);

	public List<OPDPrescriptionDtoSP> fetchNursingMedication(String todayDate, String callfrom,
			String treatmentId);

	public List<LabPkg> getPackages(String byName, String type);

	public List<IPDDischargePlanDTO> fetchDischargeCode();

	public List<IPDDischargePlanDTO> fetchIPDDischargePlan(String treatmentId);

	public String saveIPDDischargePlan(IPDDischargePlanDTO ipdDischargePlanDTO, String queryType);

	public List<DischargeProcess> fetchDischargeProcess(String treatmentId);

	public int saveDischargeProcess(DischargeProcess objDischargeProcess1, DischargeProcess objDischargeProcess,
			String queryType, int inttretID, String[] allVals, int userId);

	public List<CustomizeTemplate> fetchIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate);

	public Integer saveUpdateIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate, String queryType);

	public Integer saveConsentForm(IpdConsentForm objIpdConsentForm, String queryType);

	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid);
	
	
	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid,int idipdConsentForm);
	
	List<DoctorRoundDTO> fetchDoctorRoundsByDate(Integer treatmentId, Integer unitId, String fromDate, String toDate);
	
	List<DoctorRoundDTO> fetchDoctorRoundsByDateOnchange(Integer treatmentId, Integer unitId, String fromDate);

	public List<Patient> featchPreviousICFpat(String type, Integer unitId, String searchBy, String value);
	
	DoctorRoundDTO fetchDoctorRoundsByDateOnchangeForPrint(Integer treatmentId, Integer unitId, String fromDate,String toDate);
	
	int saveAdministratedDoneReverse(String action,String id,String callFrom,String treatmentId,HttpServletRequest request);
	
	int saveNursingDoctorRound(String doctorRoundId,String dtime,String nursingnotes,HttpServletRequest request);
}
