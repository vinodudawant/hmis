package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;

public interface GroupInstService {

	String saveGroupInstrutionDetails(GroupInstructionMaster groupInstructionMaster, HttpServletRequest request);

	List<GroupInstructionMaster> getAllGroupDetails(HttpServletRequest request,String callFrom);

	List<GroupInstructionMaster> getAllGroupDetailsById(int id);

	List<GroupInstructionMaster> getAllGroupDetailByName(String searchText,HttpServletRequest request);

	String saveTemplate(GroupTemplateMaster groupTemplateMaster, HttpServletRequest request);

	List<GroupTemplateMaster> getTemplateList(HttpServletRequest request);

	List<GroupTemplateMaster> getInstListByTempId(int templateId);

	String deleteGroupscript(int id, HttpServletRequest request);

	String deleteTemplate(int id, HttpServletRequest request);
	
	String saveMultipleGroupDetails(GroupInstructionMaster groupInstructionMaster, HttpServletRequest request);

}
