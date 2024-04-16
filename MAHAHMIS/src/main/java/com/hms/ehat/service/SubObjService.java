package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.BodyPartMasterDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.ComplaintsMasterDto;
import com.hms.ehat.dto.FindingMasterDto;
import com.hms.ehat.dto.QuestionMasterDto;
import com.hms.ehat.dto.QuestionOptionMasterDto;
import com.hms.ehat.dto.SubObjTempTypeDto;
import com.hms.ehat.dto.SubObjTemplateDto;

public interface SubObjService {
	
	int saveOrUpdateBodyPart(BodyPartMasterDto bodypartMaster,HttpServletRequest request);
	
	List<BodyPartMasterDto> getAllBodyparts(HttpServletRequest request);
	
	boolean deleteBodyPart(Integer bodyPartId,HttpServletRequest request);
	
	int saveOrUpdateSubObjTemplate(SubObjTemplateDto subObjTemplateMaster,HttpServletRequest request);
	SubObjTemplateDto getAllSubobjTemplate(HttpServletRequest request);
	
	int saveOrUpdateChemoTherapy(ChemoTheropyMaterDto chemoTheropyMaterDto,HttpServletRequest request);
	
	List<ChemoTheropyMaterDto> getAllChemotherapyProtocol(HttpServletRequest request);
	
	boolean deleteChemotherapyProtocol(Integer chemoId,HttpServletRequest request);
	
	int saveOrUpdateQuestionDetails(String questionDetails,String txtQue,Integer txtQueID,String txtQueType,String querytype,Integer templateType,HttpServletRequest request);
	
	List<QuestionOptionMasterDto> getQuestionSlaveDetails(HttpServletRequest request);
	
	List<QuestionMasterDto> getQuestionMasterDetails(HttpServletRequest request);
	
	QuestionMasterDto getAllQuestionDetails(HttpServletRequest request);
	
	boolean deleteQustion(Integer questionId,HttpServletRequest request);
	
	int saveOrUpdateComplaints(ComplaintsMasterDto complaintsMasterDto,HttpServletRequest request);
	
	List<ComplaintsMasterDto> getAllComplaints(HttpServletRequest request);
	
	boolean deleteComplaint(Integer complaintId,HttpServletRequest request);
	
	int saveOrUpdateFindings(FindingMasterDto findingMasterDto,HttpServletRequest request);
	
	List<FindingMasterDto> getAllFindings(HttpServletRequest request);
	
	boolean deleteFinding(Integer findingId,HttpServletRequest request);
	
	int saveOrUpdateSubObjTempType(SubObjTempTypeDto subObjTempTypeMaster,HttpServletRequest request);
	
	List<SubObjTempTypeDto> getAllSubObjTempTypes(HttpServletRequest request);
	
	boolean deleteTempType(Integer subObjTempTypeId,HttpServletRequest request);
	
	BodyPartMasterDto getAutoSuggestionBodyPartNames(String letter);
	
	SubObjTemplateDto getAutoSuggestionSubObjTemp(String letter);
	
	ChemoTheropyMaterDto getAutoSuggestionChemo(String letter);
	
	QuestionMasterDto getAutoSuggQsnMaster(String letter);
	
	ComplaintsMasterDto getAutoSuggComplaints(String letter);	
	
	FindingMasterDto getAutoSuggFindings(String letter);	
	
	SubObjTempTypeDto getAutoSuggSubObjTempType(String letter);	
	
	boolean deleteSubObjTemplate(Integer oncoEmrTemplateId,HttpServletRequest request);
}
