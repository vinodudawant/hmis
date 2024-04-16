package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.GroupInstDao;
import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.service.GroupInstService;

@Service
@Transactional
public class GroupInstServiceImpl implements GroupInstService{

	@Autowired
	GroupInstDao groupInstDao;
	
	@Override
	public String saveGroupInstrutionDetails(GroupInstructionMaster groupInstructionMaster,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return groupInstDao.saveGroupInstrutionDetails(groupInstructionMaster, request);
	}

	@Override
	public List<GroupInstructionMaster> getAllGroupDetails(HttpServletRequest request,String callFrom) {
		// TODO Auto-generated method stub
		return groupInstDao.getAllGroupDetails(request,callFrom);
	}

	@Override
	public List<GroupInstructionMaster> getAllGroupDetailsById(int id) {
		// TODO Auto-generated method stub
		return groupInstDao.getAllGroupDetailsById(id);
	}

	@Override
	public List<GroupInstructionMaster> getAllGroupDetailByName(String searchText,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return groupInstDao.getAllGroupDetailByName(searchText,request);
	}

	@Override
	public String saveTemplate(GroupTemplateMaster groupTemplateMaster, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return groupInstDao.saveTemplate(groupTemplateMaster, request);
	}

	@Override
	public List<GroupTemplateMaster> getTemplateList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return groupInstDao.getTemplateList(request);
	}

	@Override
	public List<GroupTemplateMaster> getInstListByTempId(int templateId) {
		// TODO Auto-generated method stub
		return groupInstDao.getInstListByTempId(templateId);
	}

	@Override
	public String deleteGroupscript(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return groupInstDao.deleteGroupscript(id, request);
	}

	@Override
	public String deleteTemplate(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return groupInstDao.deleteTemplate(id, request);
	}

	@Override
	public String saveMultipleGroupDetails(GroupInstructionMaster groupInstructionMaster, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return groupInstDao.saveMultipleGroupDetails(groupInstructionMaster, request);
	}

}
