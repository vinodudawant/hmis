package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.BloodTransfusionDTO;
import com.hms.ehat.dto.DialysisAdviceDto;
import com.hms.ehat.dto.DialysisDto;
import com.hms.ehat.dto.DialysisSchedulerDto;
import com.hms.ehat.dto.HaeRecordModialtsisDTO;
import com.hms.ehat.dto.HemodialysisCarePlanDto;
import com.hms.ehat.dto.InformedConsentFormDto;
import com.hms.ehat.dto.PostDialysisTableDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.UploadDocumentDialysisDto;
import com.hms.ehat.dto.VirologyVaccinationDTO;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;

public interface DialysisService {
	List<IpdQueueDTO> getAlldialysisPatient();
	
	List<IpdBillPatientsBedsDTO> viewIpdbillPatientsBedsWithDialysis();
	
	int saveDialysisAdvice(DialysisAdviceDto dialysisdto,HttpServletRequest request);
	
	List<DialysisAdviceDto> getDialysisAdviceList(Integer treatmentId);	
	
	int saveHaeRecordModialtsis(String preDialysis,String postDialysis,HttpServletRequest request);
	
	public HaeRecordModialtsisDTO getDialysisListById(Integer treatmentId);
	
	int saveOnDialysisTable(String tableDialysis ,HttpServletRequest request);
	
	public List<PostDialysisTableDTO> getOnDialysisTableListById(Integer treatmentId);
	
	boolean deleteTableRows(String idTables,HttpServletRequest request);
	
	int saveCarePlan(HemodialysisCarePlanDto hemodialysiscareplandto,HttpServletRequest request);
	
	List<HemodialysisCarePlanDto> getListCarePlanDialysis(Integer careplanId);
	
	int saveBloodtransfusionList(String bloodList ,HttpServletRequest request);
	
	int savevirologyVaccinationList(String virologyVaccinationList ,HttpServletRequest request);
	
	public List<BloodTransfusionDTO> getBloodTransfusionListById(Integer treatmentId);
	
	public List<VirologyVaccinationDTO> getVirologyVaccninationListById(Integer treatmentId);

	boolean deleteForBloodTransfution(String idTables,HttpServletRequest request);
	
	boolean deleteForVirologyVaccination(String idTables,HttpServletRequest request);
	

	int uploadDocumentOnDialysis(UploadDocumentDialysisDto outDto,HttpServletRequest request);

	List<UploadDocumentDialysisDto> fetchuploadDocument(Integer treatmentId);
	
	boolean deleteuploadDocument(Integer upid, HttpServletRequest request);

	
	List<DialysisAdviceDto> getwardtypeName();
	
	List<IpdBillPatientsBedsDTO> getwardtypeNameofBedNo(Integer wardId);	
	
	List<DialysisAdviceDto> autoSuggestionPatientNameDialysis(String patiename);
	
	int saveDialysisScheduler(DialysisSchedulerDto dialysisdto,HttpServletRequest request);
	
	List<DialysisSchedulerDto> getPatientNameListAlreadyPresent(String schedulerDate,String wardId,String wardBedId);
	
	List<DialysisSchedulerDto> getPatientNameListDateWise(String schedulerDate);
	
	List<DialysisSchedulerDto> getPatientNameListDateAndWardWise(String schedulerDate,String wardId);	
	
	List<DialysisSchedulerDto> getPatientNameListDateAndWardAndChairWise(String schedulerDate,String wardId,String wardBedId);	

	List<DialysisAdviceDto> getdoctorName();
	
	List<AutosugeestionDto> autoSuggestionForTestNameDialysis(String patiename);
	
	List<RegTreBillDto> fetchPatientsRecordByOnDialysisTreatmentId(Integer treatmentId);
	
	List<IpdBillPatientsBedsDTO> getDialysisPatinetDateWise(String fromDate,String lastDate);
	
	int saveinformedconsentForm(InformedConsentFormDto fromdto,HttpServletRequest request);

	List<InformedConsentFormDto> getinformedconsentForm(Integer treatmentId);	

	List<IpdBillPatientsBedsDTO> getpatinetName(Integer patientId);	

	List<DialysisAdviceDto> autoSuggestionPatientNameByDialysis(String patiename);

	List<DialysisDto> getDialysisPreviousPatienttDetails(Integer patientId);	

	
}
