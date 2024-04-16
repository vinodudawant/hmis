package com.hms.ambulance.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ambulance.dao.ChecklistMasterDao;
import com.hms.ambulance.dto.ChecklistMasterDto;
import com.hms.ambulance.service.ChecklistMasterService;

@Service
@Transactional
public class ChecklistMasterServiceImpl implements ChecklistMasterService{

	@Autowired
	ChecklistMasterDao checklistMasterdao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int saveChecklist(ChecklistMasterDto checklistDto, HttpServletRequest request) {

		return checklistMasterdao.saveChecklist(checklistDto, request);
	}


	@Override
	public List<ChecklistMasterDto> getAllChecklistMaster(HttpServletRequest request) {

		return checklistMasterdao.getAllChecklistMaster(request);
	}


	@Override
	public ChecklistMasterDto editChecklistMaster(Integer checklistId) {

		return checklistMasterdao.editChecklistMaster(checklistId);
	}


	@Override
	public boolean deleteChecklistMaster(Integer checklistId, HttpServletRequest request) {

		return checklistMasterdao.deleteChecklistMaster(checklistId,request);
	}



	

}
