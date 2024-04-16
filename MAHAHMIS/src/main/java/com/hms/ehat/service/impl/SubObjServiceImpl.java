package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.SubObjDao;
import com.hms.ehat.dto.BodyPartMasterDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.ComplaintsMasterDto;
import com.hms.ehat.dto.FindingMasterDto;
import com.hms.ehat.dto.QuestionMasterDto;
import com.hms.ehat.dto.QuestionOptionMasterDto;
import com.hms.ehat.dto.SubObjTempTypeDto;
import com.hms.ehat.dto.SubObjTemplateDto;
import com.hms.ehat.service.SubObjService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class SubObjServiceImpl implements SubObjService {
	
	@Autowired
	SubObjDao subObjDao;

	@Override
	@Transactional
	public int saveOrUpdateBodyPart(BodyPartMasterDto bodypartMaster,
			HttpServletRequest request) {
		
		if (bodypartMaster.getBodyPartId() == null)
		{
		
			bodypartMaster.setBodyPartName(bodypartMaster.getBodyPartName());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			bodypartMaster.setCreatedBy(userId);
			bodypartMaster.setCreatedBy(bodypartMaster.getCreatedBy());
			bodypartMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			bodypartMaster.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateBodyPart(bodypartMaster);
			
			return response;
		}
		else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			bodypartMaster.setUpdatedBy(userId);
			bodypartMaster.setUpdatedBy(bodypartMaster.getUpdatedBy());
			bodypartMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));
			bodypartMaster.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateBodyPart(bodypartMaster);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
		
	}

	@Override
	@Transactional
	public List<BodyPartMasterDto> getAllBodyparts(HttpServletRequest request) {
		
		return subObjDao.getAllBodyparts();
	}

	@Override
	@Transactional
	public boolean deleteBodyPart(Integer bodyPartId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return subObjDao.deleteBodyPart(bodyPartId,userId);
	}

	@Override
	@Transactional
	public int saveOrUpdateSubObjTemplate(
			SubObjTemplateDto subObjTemplateMaster, HttpServletRequest request) {
		if (subObjTemplateMaster.getOncoEmrTemplateId() == null || subObjTemplateMaster.getOncoEmrTemplateId()==0)
		{
		
			System.err.println("template aName "+subObjTemplateMaster.getTemplateName());
			subObjTemplateMaster.setTemplateName(subObjTemplateMaster.getTemplateName());
			subObjTemplateMaster.setSpeciality(subObjTemplateMaster.getSpeciality());
			subObjTemplateMaster.setBodyPart(subObjTemplateMaster.getBodyPart());
			subObjTemplateMaster.setTemplateType(subObjTemplateMaster.getTemplateType());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			subObjTemplateMaster.setCreatedBy(userId);
			subObjTemplateMaster.setCreatedBy(subObjTemplateMaster.getCreatedBy());
			subObjTemplateMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			subObjTemplateMaster.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateSubObjTemplate(subObjTemplateMaster);
			
			return response;
		}
		else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			subObjTemplateMaster.setUpdatedBy(userId);
			subObjTemplateMaster.setUpdatedBy(subObjTemplateMaster.getUpdatedBy());
			subObjTemplateMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));
			subObjTemplateMaster.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateSubObjTemplate(subObjTemplateMaster);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
	}

	@Override
	@Transactional
	public SubObjTemplateDto getAllSubobjTemplate(
			HttpServletRequest request) {
		
		return subObjDao.getAllSubobjTemplates();
	}

	@Override
	@Transactional
	public int saveOrUpdateChemoTherapy(ChemoTheropyMaterDto chemoTheropyMaterDto,
			HttpServletRequest request) {
		
		if(chemoTheropyMaterDto.getChemotheropyId() == 0 || chemoTheropyMaterDto.getChemotheropyId() == null){
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			chemoTheropyMaterDto.setCreatedBy(userId);
			chemoTheropyMaterDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			chemoTheropyMaterDto.setStatus("Y");
			chemoTheropyMaterDto.setChemotheropyId(null);
			int response = subObjDao.saveOrUpdateChemotherapy(chemoTheropyMaterDto);
			
			return response;
		}else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			chemoTheropyMaterDto.setUpdatedBy(userId);
			chemoTheropyMaterDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			chemoTheropyMaterDto.setStatus("Y");
			int response = subObjDao.saveOrUpdateChemotherapy(chemoTheropyMaterDto);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
		
	}

	@Override
	@Transactional
	public List<ChemoTheropyMaterDto> getAllChemotherapyProtocol(
			HttpServletRequest request) {
		return subObjDao.getAllChemotherapyProtocol();
	}

	@Override
	@Transactional
	public boolean deleteChemotherapyProtocol(Integer chemoId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return subObjDao.deleteChemotherapyProtocol(chemoId,userId);
	}

	@Override
	@Transactional
	public int saveOrUpdateQuestionDetails(String questionDetails,String txtQue, Integer txtQueID, String txtQueType,
			String querytype, Integer templateType,HttpServletRequest request) {
		
		QuestionMasterDto obj1 = (QuestionMasterDto) ConfigUIJSONUtility
		.getObjectFromJSON(questionDetails, QuestionMasterDto.class);
		
		int qsnMasterId=0;
		
		if(querytype.equalsIgnoreCase("insert")){
		
		System.err.println("QuestionOptionMasterDto obl1 "+obj1);
		QuestionMasterDto questionMasterDto2=new QuestionMasterDto();
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		questionMasterDto2.setQuestion(txtQue);
		questionMasterDto2.setQuestionType(txtQueType);
		questionMasterDto2.setCreatedBy(userId);
		questionMasterDto2.setTemplateType(templateType);
		questionMasterDto2.setCreatedDate(new Date(new java.util.Date().getTime()));
		questionMasterDto2.setStatus("Y");
		
		qsnMasterId = subObjDao.saveOrUpdateQuestionDetails(questionMasterDto2);
		
		for(QuestionOptionMasterDto optionList:obj1.getLstOption()){
			
			System.err.println(optionList.getQsnOptionId()+">>. "+optionList.getOptionName());
			QuestionOptionMasterDto obj=new QuestionOptionMasterDto();
			obj.setOptionName(optionList.getOptionName());
			obj.setQuestionMasterId(qsnMasterId);
			obj.setCreatedBy(userId);
			obj.setCreatedDate(new Date(new java.util.Date().getTime()));
			obj.setStatus("Y");
			
			int aaa = subObjDao.saveOrUpdateQuestionDetails1(obj);
			
		}
		return qsnMasterId;
	}else{
		
		QuestionMasterDto questionMasterDto2=new QuestionMasterDto();
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		questionMasterDto2.setQuestionId(txtQueID);
		questionMasterDto2.setQuestion(txtQue);
		questionMasterDto2.setQuestionType(txtQueType);
		questionMasterDto2.setTemplateType(templateType);
		questionMasterDto2.setUpdatedBy(userId);
		questionMasterDto2.setUpdatedDate(new Date(new java.util.Date().getTime()));
		questionMasterDto2.setStatus("Y");
		
		qsnMasterId = subObjDao.updateQuestionDetails(questionMasterDto2);
		System.err.println("===========>>>>>"+obj1.getLstOption().size());
		
		for(QuestionOptionMasterDto optionList:obj1.getLstOption()){
			
			System.err.println(optionList.getQsnOptionId()+"==="+optionList.getOptionName()+"===qsnMasterId==="+optionList.getQsnOptionId());
			QuestionOptionMasterDto obj=new QuestionOptionMasterDto();
			obj.setQsnOptionId(optionList.getQsnOptionId());
			obj.setOptionName(optionList.getOptionName());
			obj.setQuestionMasterId(txtQueID);
			obj.setUpdatedBy(userId);
			obj.setUpdatedDate(new Date(new java.util.Date().getTime()));
			obj.setStatus("Y");
			
			int aaa = subObjDao.updateQuestionDetails1(obj);
		}
	}
		return qsnMasterId;
}

	@Override
	@Transactional
	public List<QuestionOptionMasterDto> getQuestionSlaveDetails(
			HttpServletRequest request) {
		return subObjDao.getQuestionSlaveDetails();
	}

	@Override
	@Transactional
	public List<QuestionMasterDto> getQuestionMasterDetails(
			HttpServletRequest request) {
		return subObjDao.getQuestionMasterDetails();
	}

	@Override
	@Transactional
	public QuestionMasterDto getAllQuestionDetails(HttpServletRequest request) {
		return subObjDao.getAllQuestionDetails();
	}

	@Override
	@Transactional
	public boolean deleteQustion(Integer questionId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return subObjDao.deleteQustion(questionId,userId);
	}

	@Override
	@Transactional
	public int saveOrUpdateComplaints(ComplaintsMasterDto complaintsMasterDto,
			HttpServletRequest request) {
		
		if (complaintsMasterDto.getComplaintId() == null || complaintsMasterDto.getComplaintId() == 0)
		{
		
			complaintsMasterDto.setComplaintName(complaintsMasterDto.getComplaintName());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			complaintsMasterDto.setCreatedBy(userId);
			complaintsMasterDto.setCreatedBy(complaintsMasterDto.getCreatedBy());
			complaintsMasterDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			complaintsMasterDto.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateComplaints(complaintsMasterDto);
			
			return response;
		}
		else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			complaintsMasterDto.setUpdatedBy(userId);
			complaintsMasterDto.setUpdatedBy(complaintsMasterDto.getUpdatedBy());
			complaintsMasterDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			complaintsMasterDto.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateComplaints(complaintsMasterDto);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
		
	}

	@Override
	@Transactional
	public List<ComplaintsMasterDto> getAllComplaints(HttpServletRequest request) {
		
		return subObjDao.getAllComplaints();
	}

	@Override
	@Transactional
	public boolean deleteComplaint(Integer complaintId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return subObjDao.deleteComplaint(complaintId,userId);
	}

	@Override
	@Transactional
	public int saveOrUpdateFindings(FindingMasterDto findingMasterDto,
			HttpServletRequest request) {
		
		if (findingMasterDto.getFindingId() == null || findingMasterDto.getFindingId() == 0)
		{
		
			findingMasterDto.setFindingName(findingMasterDto.getFindingName());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			findingMasterDto.setCreatedBy(userId);
			findingMasterDto.setCreatedBy(findingMasterDto.getCreatedBy());
			findingMasterDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			findingMasterDto.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateFindings(findingMasterDto);
			
			return response;
		}
		else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			findingMasterDto.setUpdatedBy(userId);
			findingMasterDto.setUpdatedBy(findingMasterDto.getUpdatedBy());
			findingMasterDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			findingMasterDto.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateFindings(findingMasterDto);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
		
	}

	@Override
	@Transactional
	public List<FindingMasterDto> getAllFindings(HttpServletRequest request) {
		
		return subObjDao.getAllFindings();
	}

	@Override
	@Transactional
	public boolean deleteFinding(Integer findingId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return subObjDao.deleteFinding(findingId,userId);
	}

	@Override
	@Transactional
	public int saveOrUpdateSubObjTempType(
			SubObjTempTypeDto subObjTempTypeMaster, HttpServletRequest request) {
		
		if (subObjTempTypeMaster.getSubObjTempTypeId() == null || subObjTempTypeMaster.getSubObjTempTypeId() == 0)
		{
		
			subObjTempTypeMaster.setSubObjTempType(subObjTempTypeMaster.getSubObjTempType());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			subObjTempTypeMaster.setCreatedBy(userId);
			subObjTempTypeMaster.setCreatedBy(subObjTempTypeMaster.getCreatedBy());
			subObjTempTypeMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			subObjTempTypeMaster.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateSubObjTempType(subObjTempTypeMaster);
			
			return response;
		}
		else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			subObjTempTypeMaster.setUpdatedBy(userId);
			subObjTempTypeMaster.setUpdatedBy(subObjTempTypeMaster.getUpdatedBy());
			subObjTempTypeMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));
			subObjTempTypeMaster.setStatus("Y");
			
			int response = subObjDao.saveOrUpdateSubObjTempType(subObjTempTypeMaster);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
		
	}

	@Override
	@Transactional
	public List<SubObjTempTypeDto> getAllSubObjTempTypes(
			HttpServletRequest request) {
		
		return subObjDao.getAllSubObjTempTypes();
	}

	@Override
	@Transactional
	public boolean deleteTempType(Integer subObjTempTypeId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return subObjDao.deleteTempType(subObjTempTypeId,userId);
	}

	@Override
	@Transactional
	public BodyPartMasterDto getAutoSuggestionBodyPartNames(String letter) {
		
		return subObjDao.getAutoSuggestionBodyPartNames(letter);
	}

	@Override
	@Transactional
	public SubObjTemplateDto getAutoSuggestionSubObjTemp(String letter) {
		
		return subObjDao.getAutoSuggestionSubObjTemp(letter);
	}
	
	@Override
	@Transactional
	public ChemoTheropyMaterDto getAutoSuggestionChemo(String letter) {
		
		return subObjDao.getAutoSuggestionChemo(letter);
	}

	@Override
	@Transactional
	public QuestionMasterDto getAutoSuggQsnMaster(String letter) {
		
		return subObjDao.getAutoSuggQsnMaster(letter);
	}

	@Override
	@Transactional
	public ComplaintsMasterDto getAutoSuggComplaints(String letter) {
		
		return subObjDao.getAutoSuggComplaints(letter);
	}

	@Override
	@Transactional
	public FindingMasterDto getAutoSuggFindings(String letter) {
		
		return subObjDao.getAutoSuggFindings(letter);
	}

	@Override
	@Transactional
	public SubObjTempTypeDto getAutoSuggSubObjTempType(String letter) {
		
		return subObjDao.getAutoSuggSubObjTempType(letter);
	}

	@Override
	@Transactional
	public boolean deleteSubObjTemplate(Integer oncoEmrTemplateId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return subObjDao.deleteSubObjTemplate(oncoEmrTemplateId,userId);
	}
}
