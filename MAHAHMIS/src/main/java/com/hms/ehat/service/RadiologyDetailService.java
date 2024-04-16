package com.hms.ehat.service;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.administrator.dto.Test;
import com.hms.dto.Doctor;
import com.hms.dto.RadiologyAssisgnTestDTO;
import com.hms.dto.RadiologyDTO;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RadiologyTestDto;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.RisImageUploadDTONew;
import com.hms.dto.TestDTO;
import com.hms.dto.ViewRisRecordsDTO;
import com.hms.ehat.dto.PatientInvestigationsDTO;
import com.hms.ehat.dto.QuestionMaster;
import com.hms.ehat.dto.RisTempateDto;
import com.hms.ehat.dto.TemplateIPDHistory;
import com.hms.ehat.dto.TemplateIPDHistoryDto;

public interface RadiologyDetailService  {
	RadiologyDTO getAllRadiologyDetail(HttpServletRequest request,String tId,String type,String flag,int doctorId);
	RadiologyDTO getAllFromBegining(HttpServletRequest request,String tId,String type,String flag);
	RadiologyDTO getAllRadiologyDetailByDate(HttpServletRequest request,String todays_date,String type,String flag);
	RadiologyDTO searchPatienByName(HttpServletRequest request,String patName,String type,String flag,String textType,int patientId);	
	RadiologyDTO searchPatienBetweenDate(HttpServletRequest request,String date1,String date2,String type,String flag);
	RadiologyDTO getAllRadiologyDetailByyestrDay(HttpServletRequest request,String yestrDay,String type,String flag);
	int sendToRis(HttpServletRequest request,int treatmentId,int patientId,String subList,String invesTestFlag);
	int setArrivalTime(HttpServletRequest request,int treatmentId,int patientId,int idRadiology,int idMasterRadioAssignTest,int isSelected);
	int setTakenTime(HttpServletRequest request,int treatmentId,int patientId,int idRadiology,int idMasterRadioAssignTest,int isSelected);
	List<TestDTO> fetchPatientsRecordByTreatmentId(HttpServletRequest request,String testType);
	List<TestDTO> fetchradiotest(HttpServletRequest request,String tid);
	List<TestDTO> fetchtestrisdetails(HttpServletRequest request,int testId);
	
	int saveOrUpdateRisTemplate(RisTempateDto risTempateDto,HttpServletRequest request);
	List<RisTempateDto> getRisTemplateData(HttpServletRequest request);
	List<RisTempateDto> getRisTemplateDataforID(HttpServletRequest request,Integer templateId);
	int saveOrUpdateTestDetails(String coRelationVal,String redoScanVal,String relatedReactionVal,String errorVal,String history,int testId,int treatId,int patId,HttpServletRequest request);
	
	List<Test> getRisTemplateTypes(HttpServletRequest request);
	int saveCrtTemplateReport(RadiologyTemplateReportDTO radiologyTemplateReportDTO,HttpServletRequest request);
	int saveUploadedPhotoRis(Integer testid,String uploadedphoto,Integer tretId,Integer radiologyTestId,Integer patientId, String documentName, String comment, HttpServletRequest request);
	List<RadiologyTestDto> fetchTestDetails(HttpServletRequest request,Integer treatId,Integer testId,Integer patId);
	List<RisImageUploadDTO> fetchImageTest(Integer treatId,Integer testId,Integer idRadiologyTest,HttpServletRequest request);
	RadiologyTemplateReportDTO getRadiologyTestReports(int patientId,int testId,int radiologyTestId,int treatmentId);

	List<RisTempateDto> getTemplateListById(int templateId);
	
	List<RadiologyTemplateReportDTO> getRisTestReportAll(int treatmentId);
	
	List<RadiologyTemplateReportDTO> getRadiologyTestReports1(int patientId,
			int treatmentId);
	List<TestDTO> risTestgroupBy();
	RadiologyDTO searchByGropuName(HttpServletRequest request,String groupTestName,String type,String flag);
	RadiologyDTO getautoSuggestionNuclearTest(String letter);
	List<TestDTO> getClinicalInstructionNote(HttpServletRequest request,int idRadiologyTest);
	Map<String, String> Saveipdhistorytemp(TemplateIPDHistory master,
			TemplateIPDHistory salve, HttpServletRequest request);
	List<TemplateIPDHistory> fetchTemplateIPDHistory(String callform,
			String value);
	Map<String, String> fetchTemplateIPD(String customizeTemplateName);
	Map<String, String> Savequestionmaster(QuestionMaster master,
			HttpServletRequest request);
	QuestionMaster fetchQuestionMaster(String callfrom, String letter);
	int deletequestionmaster(String callfrom, String id,HttpServletRequest request);
	
	//below methods aniket new
	//aniket 20/01/2020
		RadiologyDTO searchPatientByTest(HttpServletRequest request,
				String testName, String type, String flag, String textType);
		List<Doctor> getAllRadiologistsList(); //aniket/28/10/2020
		RadiologyAssisgnTestDTO getTakenArrivalDateTime(Integer idTestRadiology,Integer idRadiologyTest); //aniket/04/11/2020				
		int saveRisReportRecords(ViewRisRecordsDTO viewRisRecordsDTO, HttpServletRequest request); //aniket_kanse/06/11/2020
		List<ViewRisRecordsDTO> fetchRisReportRecordByPatientId(Integer idRadiologyTest);		//aniket_kanse/07/11/2020
		Integer verifyRisReportRecord(Integer id);	//aniket_kanse/10/11/2020
		Integer deleteRisReportRecord(Integer id);	//aniket_kanse/10/11/2020
		RadiologyTemplateReportDTO getRisReportRecordForPrint(Integer patientId, Integer testId, Integer radiologyTestId, Integer treatmentId, Integer idRadiologyTestReport);	//aniket_kanse/11/11/2020
		int saveUpdateCreatedRISReport(RadiologyTemplateReportDTO radiologyTemplateReportDTO,HttpServletRequest request);
		RadiologyTemplateReportDTO viewRisReportRecord(Integer idRadiologyTestReport);	//aniket_kanse/12/11/2020
		ViewRisRecordsDTO getSingleRISRecord(Integer id);
		Integer deleteRisDocuments(Integer idRadiologyTestReport);
		Integer setPostFlag(Integer testReportId);
		
		//Vishnu 23/12/2020
		
		int Saveipdhistorytemp(TemplateIPDHistoryDto master, HttpServletRequest request);
		List<TemplateIPDHistoryDto> fetchTemplateIPDHistoryNew(String callform,
				String value);
		
		//aniket 22/01/2022
		List<Test> fetchRisTemplateTypeList(HttpServletRequest request);
		int uploadRisDocs(RisImageUploadDTONew obj, Integer patientId, Integer treatmentId,
				MultipartFile[] uploadRisDocument, HttpServletRequest request);
		List<RisImageUploadDTONew> fetchRISDocuments(Integer testId, Integer treatmentId, Integer idRadiologyTest,
				HttpServletRequest request);
		List<PatientInvestigationsDTO> fetchInvestigations(Integer tID, Integer patientId, String callform, Integer servid,
				HttpServletRequest request);
		
}
