package com.hms.ehat.service.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.administrator.dto.Test;
import com.hms.dao.RadiologyDetailDao;
import com.hms.dto.Doctor;
import com.hms.dto.RadiologyAssisgnTestDTO;
import com.hms.dto.RadiologyDTO;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RadiologyTestDto;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.RisImageUploadDTONew;
import com.hms.dto.TestDTO;
import com.hms.dto.ViewRisRecordsDTO;
import com.hms.ehat.dto.LabSlavePojo;
import com.hms.ehat.dto.PatientInvestigationsDTO;
import com.hms.ehat.dto.QuestionMaster;
import com.hms.ehat.dto.RisTempateDto;
import com.hms.ehat.dto.TemplateIPDHistory;
import com.hms.ehat.dto.TemplateIPDHistoryDto;
import com.hms.ehat.dto.TemplateIPDHistoryslave;
import com.hms.ehat.service.RadiologyDetailService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class RadiologyDetailServiceImpl implements RadiologyDetailService{

	@Autowired
	RadiologyDetailDao radiologyDetailDao;
	
	@Override
	@Transactional
	public RadiologyDTO getAllRadiologyDetail(HttpServletRequest request,String tId,String type,String flag,int doctorId){
		
		return radiologyDetailDao.getAllRadiologyDetail(request,tId,type,flag, doctorId);		
	}
	
	@Override
	@Transactional
	public RadiologyDTO getAllFromBegining(HttpServletRequest request,String tId,String type,String flag){
		
		return radiologyDetailDao.getAllFromBegining(request,tId,type,flag);		
	}
	@Override
	@Transactional
	public RadiologyDTO getAllRadiologyDetailByDate(HttpServletRequest request,String todays_date,String type,String flag){
		
		return radiologyDetailDao.getAllRadiologyDetailByDate(request,todays_date,type,flag);		
	}
	
	@Override
	@Transactional
	public RadiologyDTO searchPatienByName(HttpServletRequest request,String patName,String type,String flag,String textType,int patientId){
		
		return radiologyDetailDao.searchPatienByName(request,patName,type,flag,textType,patientId);		
	}
	@Override
	@Transactional
	public RadiologyDTO searchPatienBetweenDate(HttpServletRequest request,String date1,String date2,String type,String flag){	

		return radiologyDetailDao.searchPatienBetweenDate(request,date1,date2,type,flag);		
	}

	@Override
	@Transactional
	public RadiologyDTO getAllRadiologyDetailByyestrDay(HttpServletRequest request,String yestrDay,String type,String flag){	

		return radiologyDetailDao.getAllRadiologyDetailByyestrDay(request,yestrDay,type,flag);		
	}
	
	@Override
	@Transactional
	public int sendToRis(HttpServletRequest request,int treatmentId,int patientId,String subList,String invesTestFlag){
		
		RadiologyDTO radiologyDTO =new RadiologyDTO();
		
		radiologyDTO.setTreatmentId(treatmentId);
		radiologyDTO.setPatientId(patientId);
		radiologyDTO.setRadUrgentFlag(invesTestFlag);
		LabSlavePojo labSlvpo =  (LabSlavePojo) ConfigUIJSONUtility.getObjectFromJSON(subList,LabSlavePojo.class);
		int risRes =  radiologyDetailDao.sendToRis(radiologyDTO,labSlvpo,request);
		return risRes;
	}

	@Override
	@Transactional
	public int setArrivalTime(HttpServletRequest request,int treatmentId,int patientId,int idRadiology,int idMasterRadioAssignTest,int isSelected){
		
		RadiologyDTO radiologyDTO =new RadiologyDTO();
		
		radiologyDTO.setTreatmentId(treatmentId);
		radiologyDTO.setPatientId(patientId);
		radiologyDTO.setIdtestRadiology(idRadiology);
		radiologyDTO.setIdradiologyTest(idMasterRadioAssignTest);
		int result =  radiologyDetailDao.setArrivalTime(radiologyDTO,isSelected,request);
		return result;
	}
	@Override
	@Transactional
	public int setTakenTime(HttpServletRequest request,int treatmentId,int patientId,int idRadiology,int idMasterRadioAssignTest,int isSelected){
		
		RadiologyDTO radiologyDTO =new RadiologyDTO();
		
		radiologyDTO.setTreatmentId(treatmentId);
		radiologyDTO.setPatientId(patientId);
		radiologyDTO.setIdtestRadiology(idRadiology);
		radiologyDTO.setIdradiologyTest(idMasterRadioAssignTest);
		int result =  radiologyDetailDao.setTakenTime(radiologyDTO,isSelected,request);
		return result;
	}
	 
	@Override
	@Transactional
	public List<TestDTO> fetchPatientsRecordByTreatmentId(HttpServletRequest request,String testType){
		
		return radiologyDetailDao.getAllRadiologyDetail(request,testType);		
	}
	
	@Override
	@Transactional
	public List<TestDTO> fetchradiotest(HttpServletRequest request,String tid){
		
		return radiologyDetailDao.fetchradiotest(request,tid);		
	}
	@Override
	@Transactional
	public List<TestDTO> fetchtestrisdetails(HttpServletRequest request,int testId){
		
		return radiologyDetailDao.fetchtestrisdetails(request,testId);		
	}
	
	@Override
	@Transactional
	public int saveOrUpdateRisTemplate(RisTempateDto risTempateDto,
			HttpServletRequest request) {
		if (risTempateDto.getTemplateId() == null || risTempateDto.getTemplateId() == 0)
		{
		
			risTempateDto.setTemplateName(risTempateDto.getTemplateName());
			risTempateDto.setTemplateData(risTempateDto.getTemplateData());
			risTempateDto.setTemplateType(risTempateDto.getTemplateType());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			risTempateDto.setCreatedBy(userId);
			risTempateDto.setCreatedBy(risTempateDto.getCreatedBy());
			risTempateDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			risTempateDto.setStatus("Y");
			
			int response = radiologyDetailDao.saveOrUpdateRisTemplate(risTempateDto);
			
			return response;
		}
		else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			risTempateDto.setUpdatedBy(userId);
			risTempateDto.setUpdatedBy(risTempateDto.getUpdatedBy());
			risTempateDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			risTempateDto.setStatus("Y");
			
			int response = radiologyDetailDao.saveOrUpdateRisTemplate(risTempateDto);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
	}

	@Override
	@Transactional
	public List<RisTempateDto> getRisTemplateData(HttpServletRequest request) {
		
		return radiologyDetailDao.getRisTempData();
		
	}
	
	@Override
	@Transactional
	public List<RisTempateDto> getRisTemplateDataforID(HttpServletRequest request,Integer templateId) {
		
		return radiologyDetailDao.getRisTemplateDataforID(templateId);
		
	}
	
	@Override
	@Transactional
	public int saveOrUpdateTestDetails(String coRelationVal,String redoScanVal,String relatedReactionVal,String errorVal,String history,int testId,int treatId,int patId,HttpServletRequest request){
		
		RadiologyTestDto radiologyDTO =new RadiologyTestDto();
		
		radiologyDTO.setCoRelation(coRelationVal);
		radiologyDTO.setRedoScan(redoScanVal);
		radiologyDTO.setRelatedReaction(relatedReactionVal);
		radiologyDTO.setError(errorVal);
		radiologyDTO.setHistory(history);
		radiologyDTO.setTestId(testId);
		radiologyDTO.setTreatId(treatId);
		radiologyDTO.setPatId(patId);
		
		int result =  radiologyDetailDao.saveOrUpdateTestDetails(radiologyDTO,request);
		return result;
	}

	@Override
	@Transactional
	public List<Test> getRisTemplateTypes(HttpServletRequest request) {
		
		return radiologyDetailDao.getRisTemplateTypes();
	}

	@Override
	@Transactional
	public int saveCrtTemplateReport( RadiologyTemplateReportDTO radiologyTemplateReportDTO,HttpServletRequest request){
		/*HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		radiologyTemplateReportDTO.setTemplateId(radiologyTemplateReportDTO.getTemplateId());
		radiologyTemplateReportDTO.setTestId(radiologyTemplateReportDTO.getTestId());
		radiologyTemplateReportDTO.setTreatmentId(radiologyTemplateReportDTO.getTreatmentId());
		radiologyTemplateReportDTO.setTemplateTypeId(radiologyTemplateReportDTO.getTemplateTypeId());
		radiologyTemplateReportDTO.setPatientId(radiologyTemplateReportDTO.getPatientId());
		radiologyTemplateReportDTO.setTemplateData(radiologyTemplateReportDTO.getTemplateData());
		radiologyTemplateReportDTO.setRadiologyTestId(radiologyTemplateReportDTO.getRadiologyTestId());
		radiologyTemplateReportDTO.setCreatedBy(userId);*/
		
		int result =  radiologyDetailDao.saveCrtTemplateReport(radiologyTemplateReportDTO,request);
		return result;
	}
	
	@Override
	@Transactional
	public int saveUploadedPhotoRis(Integer testId,String uploadedphoto,Integer tretId,Integer radiologyTestId,Integer patientId, String documentName, String comment,HttpServletRequest request){
		RisImageUploadDTO rImageUploadDTO = new RisImageUploadDTO();
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String user_name = (String) session.getAttribute("userName");		//aniket_kanse/ 24NOV2020
		Timestamp  fromTimestamp = new  java.sql.Timestamp(new java.util.Date().getTime());
		
		rImageUploadDTO.setTestId(testId);
		rImageUploadDTO.setImageName(uploadedphoto);
		rImageUploadDTO.setTreatmentId(tretId);
		rImageUploadDTO.setCreatedBy(userId);
		rImageUploadDTO.setRadiologyTestId(radiologyTestId);
		rImageUploadDTO.setCreatedDate(fromTimestamp);
		rImageUploadDTO.setPatientId(patientId);		//aniket_kanse/ 24NOV2020
		rImageUploadDTO.setDocumentName(documentName);	//aniket_kanse/ 24NOV2020
		rImageUploadDTO.setComment(comment);			//aniket_kanse/ 24NOV2020
		rImageUploadDTO.setCreatedByUser(user_name);	//aniket_kanse/ 24NOV2020
		
		int result =  radiologyDetailDao.saveUploadedPhotoRis(rImageUploadDTO,request);
		return result;
	}
	
	@Override
	@Transactional
	public List<RadiologyTestDto> fetchTestDetails(HttpServletRequest request,Integer treatId,Integer testId,Integer patId) {
		
		return radiologyDetailDao.fetchTestDetails(request,treatId,testId,patId);
	}
	
	@Override
	@Transactional
	public List<RisImageUploadDTO> fetchImageTest(Integer treatId,Integer testId,Integer idRadiologyTest,HttpServletRequest request) {
		
		return radiologyDetailDao.fetchImageTest(treatId,testId,idRadiologyTest,request);
	}

	@Override
	@Transactional
	public RadiologyTemplateReportDTO getRadiologyTestReports(int patientId,int testId,int radiologyTestId,int treatmentId) {
		
		return radiologyDetailDao.getRadiologyTestReports(patientId,testId,radiologyTestId,treatmentId);
	}

	@Override
	@Transactional
	public List<RisTempateDto> getTemplateListById(int templateId) {
		
		return radiologyDetailDao.getTemplateListById(templateId);
	}
	
	@Override
	@Transactional
	public List<RadiologyTemplateReportDTO> getRisTestReportAll(int treatmentId) {
		return radiologyDetailDao.getRisTestReportAll(treatmentId);
	}

@Override
@Transactional
public List<RadiologyTemplateReportDTO> getRadiologyTestReports1(int patientId,
		int treatmentId)
		{
	// TODO Auto-generated method stub
	return radiologyDetailDao.getRadiologyTestReports1(patientId,treatmentId);
}

@Override
@Transactional
public RadiologyDTO getautoSuggestionNuclearTest(String letter) {
	
	return radiologyDetailDao.getautoSuggestionNuclearTest(letter);
}
@Override
@Transactional
public List<TestDTO> risTestgroupBy()
		{
	return radiologyDetailDao.risTestgroupBy();
}

@Override
@Transactional
public RadiologyDTO searchByGropuName(HttpServletRequest request,String groupTestName,String type,String flag){
	
	return radiologyDetailDao.searchByGropuName(request,groupTestName,type,flag);		
}
@Override
@Transactional
public List<TestDTO> getClinicalInstructionNote(HttpServletRequest request,int idRadiologyTest){
	
	return radiologyDetailDao.getClinicalInstructionNote(request,idRadiologyTest);		
}

@Override
@Transactional
public Map<String, String> Saveipdhistorytemp(TemplateIPDHistory master,
		TemplateIPDHistory salve, HttpServletRequest request) {
	
	HttpSession session = request.getSession(true);
	Integer userId=(Integer)session.getAttribute("userId1");
	
	java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time=dateFormat1.format(cal.getTime());
List<TemplateIPDHistoryslave> slavelist=new ArrayList<TemplateIPDHistoryslave>();
for(TemplateIPDHistory obj : salve.getLtiTemplateIPDHistory()){
	System.out.println(obj.getId_ipdhistorymaster());
	master.setId_ipdhistorymaster(obj.getId_ipdhistorymaster());
	master.setTemplatename(obj.getTemplatename());
	
	if(obj.getId_ipdhistorymaster() > 0 ){
		master.setUpdatedBy(userId)	;
		master.setUpdatedDateTime(cal.getTime());
	}else{
		master.setCreatedDateTime(cal.getTime());
		master.setCreatedBy(userId);
	}
}
for(TemplateIPDHistoryslave obj2: master.getLtITemplateIPDHistoryslave()){
	obj2.setId_ipdhistorymaster(master);
	slavelist.add(obj2);
}
master.setLtITemplateIPDHistoryslave(slavelist);
	return radiologyDetailDao.Saveipdhistorytemp( master);
}

@Transactional
public List<TemplateIPDHistory> fetchTemplateIPDHistory(String callform,
		String value) {
	// TODO Auto-generated method stub
	return radiologyDetailDao.fetchTemplateIPDHistory(value);
}

@Override
@Transactional
public Map<String, String> fetchTemplateIPD(String customizeTemplateName) {
	// TODO Auto-generated method stub
	return radiologyDetailDao.fetchTemplateIPD(customizeTemplateName);
}

@Override
@Transactional

public Map<String, String> Savequestionmaster(QuestionMaster master,
		HttpServletRequest request) {
	HttpSession session = request.getSession(true);
	Integer userId=(Integer)session.getAttribute("userId1");
	
	java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();	
	
	return radiologyDetailDao.Savequestionmaster(master,request);
}

@Override
@Transactional

public QuestionMaster fetchQuestionMaster(String callfrom, String letter) {
	// TODO Auto-generated method stub
	return radiologyDetailDao.fetchQuestionMaster(callfrom,letter);
}

@Override
@Transactional

public int deletequestionmaster(String callfrom, String id , HttpServletRequest request) {
	// TODO Auto-generated method stub
	return radiologyDetailDao.deletequestionmaster(callfrom,id,request);
}

@Override
@Transactional
public RadiologyDTO searchPatientByTest(HttpServletRequest request,
		String testName, String type, String flag, String textType) {
	return radiologyDetailDao.searchPatientByTest(request,testName,type,flag,textType);
}

@Override
@Transactional
public List<Doctor> getAllRadiologistsList() {
	
	return radiologyDetailDao.getAllRadiologistsList();
}

@Override
@Transactional
public RadiologyAssisgnTestDTO getTakenArrivalDateTime(Integer idTestRadiology,
		Integer idRadiologyTest) {
	return radiologyDetailDao.getTakenArrivalDateTime(idTestRadiology,idRadiologyTest);
}

@Override
@Transactional
public int saveRisReportRecords(ViewRisRecordsDTO viewRisRecordsDTO, HttpServletRequest request) {

	//viewRisRecordsDTO.setIsDeleted('N');
	//viewRisRecordsDTO.setVerifyFlag('N');
	
	Integer response = null;
	HttpSession session = request.getSession();
	Integer userId = (Integer) session.getAttribute("userId1");
	String user_name = (String) session.getAttribute("userName");
	
	if(viewRisRecordsDTO.getId() == 0){
		
		/*viewRisRecordsDTO.setArrivalDate(viewRisRecordsDTO.getArrivalDate());
		viewRisRecordsDTO.setArrivalTime(viewRisRecordsDTO.getArrivalTime());
		viewRisRecordsDTO.setTakenDate(viewRisRecordsDTO.getTakenDate());
		viewRisRecordsDTO.setTakenTime(viewRisRecordsDTO.getArrivalTime());
		
		viewRisRecordsDTO.setInvestigation(viewRisRecordsDTO.getInvestigation());
		viewRisRecordsDTO.setInstruction(viewRisRecordsDTO.getInstruction());
		viewRisRecordsDTO.setClinicalNotes(viewRisRecordsDTO.getClinicalNotes());
		viewRisRecordsDTO.setRadiologist(viewRisRecordsDTO.getRadiologist());
		
		viewRisRecordsDTO.setPatientId(viewRisRecordsDTO.getPatientId());
		viewRisRecordsDTO.setPatientName(viewRisRecordsDTO.getPatientName());
		viewRisRecordsDTO.setTreatmentId(viewRisRecordsDTO.getTreatmentId());
		viewRisRecordsDTO.setDepartmentNo(viewRisRecordsDTO.getDepartmentNo());
		viewRisRecordsDTO.setTestReportId(viewRisRecordsDTO.getTestReportId());
		viewRisRecordsDTO.se*/
		
		viewRisRecordsDTO.setCreatedBy(userId);
		viewRisRecordsDTO.setCreatedByUserName(user_name);
		viewRisRecordsDTO.setCreatedDateTime(new Date(new java.util.Date().getTime()));
		
		
	}else {
		/*viewRisRecordsDTO.setArrivalDate(viewRisRecordsDTO.getArrivalDate());
		viewRisRecordsDTO.setArrivalTime(viewRisRecordsDTO.getArrivalTime());
		viewRisRecordsDTO.setTakenDate(viewRisRecordsDTO.getTakenDate());
		viewRisRecordsDTO.setTakenTime(viewRisRecordsDTO.getArrivalTime());
		
		viewRisRecordsDTO.setInvestigation(viewRisRecordsDTO.getInvestigation());
		viewRisRecordsDTO.setInstruction(viewRisRecordsDTO.getInstruction());
		viewRisRecordsDTO.setClinicalNotes(viewRisRecordsDTO.getClinicalNotes());
		viewRisRecordsDTO.setRadiologist(viewRisRecordsDTO.getRadiologist());
		
		viewRisRecordsDTO.setPatientId(viewRisRecordsDTO.getPatientId());
		viewRisRecordsDTO.setPatientName(viewRisRecordsDTO.getPatientName());
		viewRisRecordsDTO.setTreatmentId(viewRisRecordsDTO.getTreatmentId());
		viewRisRecordsDTO.setDepartmentNo(viewRisRecordsDTO.getDepartmentNo());
		viewRisRecordsDTO.setTestReportId(viewRisRecordsDTO.getTestReportId());*/
		
		viewRisRecordsDTO.setCreatedByUserName(user_name);
		viewRisRecordsDTO.setUpdatedBy(userId);
		viewRisRecordsDTO.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
	}
	
	
	if (radiologyDetailDao.saveRisReportRecords(viewRisRecordsDTO)==1) 
	{
		if(viewRisRecordsDTO.getId() == 0)
		{
			return 1;
		}else{
			return 2;
		}
	} else 
	{
		return 0;
	}
}

@Override
@Transactional
public List<ViewRisRecordsDTO> fetchRisReportRecordByPatientId(Integer idRadiologyTest) {
	return radiologyDetailDao.fetchRisReportRecordByPatientId(idRadiologyTest);
}

@Override
@Transactional
public Integer verifyRisReportRecord(Integer id) {
	return radiologyDetailDao.verifyRisReportRecord(id);
}

@Override
@Transactional
public Integer deleteRisReportRecord(Integer id) {
	return radiologyDetailDao.deleteRisReportRecord(id);
}

@Override
@Transactional
public RadiologyTemplateReportDTO getRisReportRecordForPrint(Integer patientId,
		Integer testId, Integer radiologyTestId, Integer treatmentId,
		Integer idRadiologyTestReport) {
	//return radiologyDetailDao.getRadiologyTestReports(patientId,testId,radiologyTestId,treatmentId,idRadiologyTestReport);
	return radiologyDetailDao.getRisReportRecordForPrint(patientId,testId,radiologyTestId,treatmentId,idRadiologyTestReport);
}

@Override
@Transactional
public int saveUpdateCreatedRISReport(RadiologyTemplateReportDTO radiologyTemplateReportDTO,HttpServletRequest request) {
	
	//System.out.println("-- RadiologyTemplateReportDTO-- : " + radiologyTemplateReportDTO);
	Integer response = null;
	
	HttpSession session = request.getSession();
	Integer userId = (Integer) session.getAttribute("userId1");
	
	if(radiologyTemplateReportDTO.getIdRadiologyTestReport() == 0){
		radiologyTemplateReportDTO.setTemplateId(radiologyTemplateReportDTO.getTemplateId());
		radiologyTemplateReportDTO.setTestId(radiologyTemplateReportDTO.getTestId());
		radiologyTemplateReportDTO.setTreatmentId(radiologyTemplateReportDTO.getTreatmentId());
		radiologyTemplateReportDTO.setTemplateTypeId(radiologyTemplateReportDTO.getTemplateTypeId());
		radiologyTemplateReportDTO.setPatientId(radiologyTemplateReportDTO.getPatientId());
		radiologyTemplateReportDTO.setTemplateData(radiologyTemplateReportDTO.getTemplateData());
		radiologyTemplateReportDTO.setRadiologyTestId(radiologyTemplateReportDTO.getRadiologyTestId());
		radiologyTemplateReportDTO.setStatus("Y");
		radiologyTemplateReportDTO.setCreatedBy(userId);
		radiologyTemplateReportDTO.setCreatedDate(new Date(new java.util.Date().getTime()));
		radiologyTemplateReportDTO.setNuclearData(radiologyTemplateReportDTO.getNuclearData());
		radiologyTemplateReportDTO.setNuclearCreatedBy(userId);
		radiologyTemplateReportDTO.setNuclearCreatedDate(new Date(new java.util.Date().getTime()));
	} else {
		
		radiologyTemplateReportDTO.setTemplateId(radiologyTemplateReportDTO.getTemplateId());
		radiologyTemplateReportDTO.setTestId(radiologyTemplateReportDTO.getTestId());
		radiologyTemplateReportDTO.setTreatmentId(radiologyTemplateReportDTO.getTreatmentId());
		radiologyTemplateReportDTO.setTemplateTypeId(radiologyTemplateReportDTO.getTemplateTypeId());
		radiologyTemplateReportDTO.setPatientId(radiologyTemplateReportDTO.getPatientId());
		radiologyTemplateReportDTO.setTemplateData(radiologyTemplateReportDTO.getTemplateData());
		radiologyTemplateReportDTO.setRadiologyTestId(radiologyTemplateReportDTO.getRadiologyTestId());
		radiologyTemplateReportDTO.setStatus("Y");
		//radiologyTemplateReportDTO.setCreatedBy(userId);
		radiologyTemplateReportDTO.setUpdatedBy(userId);
		//radiologyTemplateReportDTO.setCreatedDate(new Date(new java.util.Date().getTime()));
		radiologyTemplateReportDTO.setUpdatedDate(new Date(new java.util.Date().getTime()));
		radiologyTemplateReportDTO.setNuclearData(radiologyTemplateReportDTO.getNuclearData());
		radiologyTemplateReportDTO.setNuclearCreatedBy(userId);
		radiologyTemplateReportDTO.setNuclearCreatedDate(new Date(new java.util.Date().getTime()));
	}
	
	
	response = radiologyDetailDao.saveUpdateCreatedRISReport(radiologyTemplateReportDTO);
	if(response == 0){
		return 0;
	} else {
		return response;
	}
	
}

@Override
@Transactional
public RadiologyTemplateReportDTO viewRisReportRecord(Integer idRadiologyTestReport) {
	
	return radiologyDetailDao.viewRisReportRecord(idRadiologyTestReport);
}

@Override
@Transactional
public ViewRisRecordsDTO getSingleRISRecord(Integer id) {
	return radiologyDetailDao.getSingleRISRecord(id);
}

@Override
@Transactional
public Integer deleteRisDocuments(Integer idRadiologyTestReport) {
	return radiologyDetailDao.deleteRisDocuments(idRadiologyTestReport);
}

@Override
@Transactional
public Integer setPostFlag(Integer testReportId) {
	return radiologyDetailDao.setPostFlag(testReportId);
}

@Override
@Transactional
public int Saveipdhistorytemp(TemplateIPDHistoryDto master,
		HttpServletRequest request) {
	// TODO Auto-generated method stub
	return radiologyDetailDao.Saveipdhistorytemp(master,request);
}

@Override
@Transactional
public List<TemplateIPDHistoryDto> fetchTemplateIPDHistoryNew(String callform,
		String value) {
	// TODO Auto-generated method stub
	return radiologyDetailDao.fetchTemplateIPDHistoryNew(value);
}

@Override
@Transactional
public List<Test> fetchRisTemplateTypeList(HttpServletRequest request) {
	return radiologyDetailDao.fetchRisTemplateTypeList(request);
}

@Override
@Transactional
public int uploadRisDocs(RisImageUploadDTONew obj, Integer patientId, Integer treatmentId,
		MultipartFile[] uploadRisDocument, HttpServletRequest request) {
	
	return radiologyDetailDao.uploadRisDocs(obj,patientId,treatmentId, uploadRisDocument, request);
}

@Override
@Transactional
public List<RisImageUploadDTONew> fetchRISDocuments(Integer testId, Integer treatmentId, Integer idRadiologyTest,
		HttpServletRequest request) {
	return radiologyDetailDao.fetchRISDocuments(testId, treatmentId, idRadiologyTest, request);
}

@Override
@Transactional
public List<PatientInvestigationsDTO> fetchInvestigations(Integer tID, Integer patientId, String callform, Integer servid,
		HttpServletRequest request) {
	return radiologyDetailDao.fetchInvestigations(tID, patientId, callform, servid, request);
}
}
