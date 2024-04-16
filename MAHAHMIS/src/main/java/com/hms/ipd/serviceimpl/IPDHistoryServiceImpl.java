package com.hms.ipd.serviceimpl;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.hms.ipd.dao.IPDHistoryDao;
import com.hms.ipd.dto.DoctorListDTO;
import com.hms.ipd.dto.DoctorRoundDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;
import com.hms.ipd.dto.IndividualTreatmentInstructionIPD;
import com.hms.ipd.dto.PCTreatmentInstructionDTO;
import com.hms.ipd.dto.TreatmentTopicDTO;
import com.hms.ipd.service.IPDHistoryService;

@Service
@Transactional
public class IPDHistoryServiceImpl implements IPDHistoryService {

	private @Autowired IPDHistoryDao ipdHistoryDao;
	
	@Override
	public OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId) {
		
		return ipdHistoryDao.getPatientInfoByTreatmentId(treatmentId);
	}

	@Override
	public List<CpoeServdetails> fetchBillDetailsIPD(Integer tID, String callform, Integer servid) {
		
		return ipdHistoryDao.fetchBillDetailsIPD( tID, callform, servid);
	}

	@Override
	public Integer saveDoctorRound(Integer tid, String drs, String drrobj, String date,
			Integer treatmentbedid) {
		
		return ipdHistoryDao.saveDoctorRound(tid,drs,drrobj,date,treatmentbedid);
	}

	@Override
	public DoctorRoundDTO saveDoctorRounds(DoctorRoundDTO doctorRoundDTO) {
		return ipdHistoryDao.saveDoctorRounds(doctorRoundDTO);
	}

	@Override
	public List<DoctorRoundDTO> fetchDoctorRounds(Integer treatmentId, Integer unitId) {
		return ipdHistoryDao.fetchDoctorRounds(treatmentId,unitId);
	}

	@Override
	public List<DoctorListDTO> fetchDoctorList(Integer unitId) {
		return ipdHistoryDao.fetchDoctorList(unitId);
	}

	@Override
	public List<DoctorRoundTempDTO> fetchDoctorRoundTemplate(Integer unitId) {
		return ipdHistoryDao.fetchDoctorRoundTemplate(unitId);
	}
	
	@Override
	public List<DoctorRoundTempDTO> SearchDoctorRoundTemplate(String tempName) {
		return ipdHistoryDao.SearchDoctorRoundTemplate(tempName);
	}

	@Override
	public String deleteDoctorRoundIPD(Integer unitId, String doctorSlaveIds) {
		return ipdHistoryDao.deleteDoctorRoundIPD(unitId,doctorSlaveIds);
	}

	@Override
	public List<PCTreatmentInstructionDTO> fetchPCTreatmentInstruction(Integer treatmentId) {
		return ipdHistoryDao.fetchPCTreatmentInstruction(treatmentId);
	}

	@Override
	public List<TreatmentTopicDTO> fetchAllTreatmentTopic(String action, String pageName, Integer unitId) {
		return ipdHistoryDao.fetchAllTreatmentTopic(action,pageName,unitId);
	}

	@Override
	public List<IndividualTreatmentInstructionIPD> fetchIndividualTreatmentInstructionIPD(Integer treatmentId) {
		return ipdHistoryDao.fetchIndividualTreatmentInstructionIPD(treatmentId);
	}

	@Override
	public List<Patient> displayTopPat(String patId, String page_name, String userId, String type, String value,
			String searchBy) {
		return ipdHistoryDao.displayTopPat(patId,page_name,userId,type,value,searchBy);
	}

	@Override
	public List<BillComponent> patientMaterialUsed(String tid, String date) {
		String blank="";
		if(blank.equals(date))
		{
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			date=todays_date;
		}
		return ipdHistoryDao.patientMaterialUsed(tid,date);
	}

	@Override
	public List<CpoeOTdetails> fetchIpdServices(String tid, String serviceid) {
		return ipdHistoryDao.fetchIpdServices(tid,serviceid);
	}

	@Override
	public List<TreatmentNurses> fillDIC(String tid, String date) {
		return ipdHistoryDao.fillDIC(tid,date) ;
	}

	@Override
	public List<TreatmentNurses> fillDrugChart(String tid, String date) {
		return ipdHistoryDao.fillDrugChart(tid,date) ;
	}

	@Override
	public String fetchLabResultData(String treatmentId) {
		return ipdHistoryDao.fetchLabResultData(treatmentId) ;
	}

	@Override
	public List<OPDPrescriptionDtoSP> fetchNursingMedication(String todayDate, String callfrom,
			String treatmentId) {
		return ipdHistoryDao.fetchNursingMedication(todayDate,callfrom,treatmentId);
	}

	@Override
	public List<LabPkg> getPackages(String byName, String type) {
		return ipdHistoryDao.getPackages(byName,type);
	}

	@Override
	public List<IPDDischargePlanDTO> fetchDischargeCode() {
		return ipdHistoryDao.fetchDischargeCode();
	}

	@Override
	public List<IPDDischargePlanDTO> fetchIPDDischargePlan(String treatmentId) {
		return ipdHistoryDao.fetchIPDDischargePlan(treatmentId);
	}

	@Override
	public String saveIPDDischargePlan(IPDDischargePlanDTO ipdDischargePlanDTO,String queryType) {
		return ipdHistoryDao.saveIPDDischargePlan(ipdDischargePlanDTO,queryType);
	}

	@Override
	public List<DischargeProcess> fetchDischargeProcess(String treatmentId) {
		return ipdHistoryDao.fetchDischargeProcess(treatmentId);
	}

	@Override
	public int saveDischargeProcess(DischargeProcess objDischargeProcess1, DischargeProcess objDischargeProcess,
			String queryType, int inttretID, String[] allVals, int userId) {
		return ipdHistoryDao.saveDischargeProcess(objDischargeProcess1,objDischargeProcess,queryType,inttretID,allVals,userId);
	}

	@Override
	public List<CustomizeTemplate> fetchIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate) {
		return ipdHistoryDao.fetchIPDDischargeSummaryTemplate(objTemplate);
	}

	@Override
	public Integer saveUpdateIPDDischargeSummaryTemplate(CustomizeTemplate objTemplate, String queryType) {
		return ipdHistoryDao.saveUpdateIPDDischargeSummaryTemplate(objTemplate,queryType);

	}

	@Override
	public Integer saveConsentForm(IpdConsentForm objIpdConsentForm, String queryType) {
		return ipdHistoryDao.saveConsentForm(objIpdConsentForm,queryType);

	}

	@Override
	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid) {
		return ipdHistoryDao.fetchAllConsentFormForTreatment(tid);
	}
	
	@Override
	public List<IpdConsentForm> fetchAllConsentFormForTreatment(String tid,int idipdConsentForm) {
		return ipdHistoryDao.fetchAllConsentFormForTreatment(tid,idipdConsentForm);
	}

	@Override
	public List<DoctorRoundDTO> fetchDoctorRoundsByDate(Integer treatmentId, Integer unitId, String fromDate,
			String toDate) {
		// TODO Auto-generated method stub
		return ipdHistoryDao.fetchDoctorRoundsByDate(treatmentId, unitId, fromDate, toDate);
	}

	@Override
	public List<DoctorRoundDTO> fetchDoctorRoundsByDateOnchange(Integer treatmentId, Integer unitId, String fromDate) {
		// TODO Auto-generated method stub
		return ipdHistoryDao.fetchDoctorRoundsByDateOnchange(treatmentId, unitId, fromDate);
	}

	@Override
	public List<Patient> featchPreviousICFpat(String type, Integer unitId, String searchBy, String value) {
		// TODO Auto-generated method stub
		return ipdHistoryDao.featchPreviousICFpat(type,unitId,searchBy,value);
	}
	
	@Override
	public DoctorRoundDTO fetchDoctorRoundsByDateOnchangeForPrint(Integer treatmentId, Integer unitId,
			String fromDate,String toDate) {
		// TODO Auto-generated method stub
		return ipdHistoryDao.fetchDoctorRoundsByDateOnchangeForPrint(treatmentId, unitId, fromDate,toDate);
	}

	@Override
	public int saveAdministratedDoneReverse(String action, String id, String callFrom,String treatmentId,HttpServletRequest request) {
		
		return ipdHistoryDao.saveAdministratedDoneReverse(action, id, callFrom,treatmentId, request);
	}

	@Override
	public int saveNursingDoctorRound(String doctorRoundId, String dtime, String nursingnotes,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ipdHistoryDao.saveNursingDoctorRound(doctorRoundId, dtime, nursingnotes, request);
	}

}
