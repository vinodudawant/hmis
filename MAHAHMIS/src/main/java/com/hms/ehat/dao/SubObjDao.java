package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.BodyPartMasterDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.ComplaintsMasterDto;
import com.hms.ehat.dto.FindingMasterDto;
import com.hms.ehat.dto.QuestionMasterDto;
import com.hms.ehat.dto.QuestionOptionMasterDto;
import com.hms.ehat.dto.SubObjTempTypeDto;
import com.hms.ehat.dto.SubObjTemplateDto;

public interface SubObjDao {
	
	int saveOrUpdateBodyPart(BodyPartMasterDto bodypartMaster);
	
	List<BodyPartMasterDto> getAllBodyparts();
	
	boolean deleteBodyPart(Integer bodyPartId,Integer userId);
	
	int saveOrUpdateSubObjTemplate(SubObjTemplateDto subObjTemplateMaster);
	
	SubObjTemplateDto getAllSubobjTemplates();
	
	int saveOrUpdateChemotherapy(ChemoTheropyMaterDto chemoTheropyMaterDto);
	
	List<ChemoTheropyMaterDto> getAllChemotherapyProtocol();
	
	boolean deleteChemotherapyProtocol(Integer chemoId,Integer userId);
	
	int saveOrUpdateQuestionDetails(QuestionMasterDto questionMasterDto2);
	
	int saveOrUpdateQuestionDetails1(QuestionOptionMasterDto obj);
	
	int updateQuestionDetails(QuestionMasterDto questionMasterDto2);
	
	int updateQuestionDetails1(QuestionOptionMasterDto obj);
	
	List<QuestionOptionMasterDto> getQuestionSlaveDetails();
	
	List<QuestionMasterDto> getQuestionMasterDetails();
	
	QuestionMasterDto getAllQuestionDetails();
	
	boolean deleteQustion(Integer questionId,Integer userId);
	
	int saveOrUpdateComplaints(ComplaintsMasterDto complaintsMasterDto);
	
	List<ComplaintsMasterDto> getAllComplaints();
	
	boolean deleteComplaint(Integer complaintId,Integer userId);
	
	int saveOrUpdateFindings(FindingMasterDto findingMasterDto);
	
	List<FindingMasterDto> getAllFindings();
	
	boolean deleteFinding(Integer findingId,Integer userId);
	
	int saveOrUpdateSubObjTempType(SubObjTempTypeDto subObjTempTypeMaster);
	
	List<SubObjTempTypeDto> getAllSubObjTempTypes();
	
	boolean deleteTempType(Integer subObjTempTypeId,Integer userId);
	
	BodyPartMasterDto getAutoSuggestionBodyPartNames(String letter);
	
	SubObjTemplateDto getAutoSuggestionSubObjTemp(String letter);
	
	ChemoTheropyMaterDto getAutoSuggestionChemo(String letter);
	
	QuestionMasterDto getAutoSuggQsnMaster(String letter);
	
	ComplaintsMasterDto getAutoSuggComplaints(String letter);
	
	FindingMasterDto getAutoSuggFindings(String letter);	
	
	SubObjTempTypeDto getAutoSuggSubObjTempType(String letter);	
	
	boolean deleteSubObjTemplate(int oncoEmrTemplateId,Integer userId);
}
