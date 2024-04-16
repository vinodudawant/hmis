package com.hms.doctordesk.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OrganMasterDao;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.service.OrganMasterService;
import com.hms.ehat.dto.StateMasterDto;

@Service
@Transactional
public class OrganMasterServiceImpl implements OrganMasterService {
	@Autowired
	OrganMasterDao organMasterDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveOrganMaster(DdOrganMasterDTO organ, HttpServletRequest request) {
		return organMasterDao.saveOrganMaster(organ, request);
	}
	
	
	@Override
	@Transactional
	public List<DdOrganMasterDTO> getAllOrganMaster(HttpServletRequest request) {		
		return organMasterDao.getAllOrganMaster(request);
	}


	
	@Override
	@Transactional
	public DdOrganMasterDTO editOrganMaster(Integer organ_Id) {		
		return organMasterDao.editOrganMaster(organ_Id);
	}

	@Override
	public boolean deleteOrganMaster(Integer organ_Id, HttpServletRequest request) {
	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			return organMasterDao.deleteOrganMaster(organ_Id, userId);
		}


	@Override
	public List<DdOrganMasterDTO> getAllOrganMasterAutosuggestion(String organName) {
		// TODO Auto-generated method stub
		return organMasterDao.getAllOrganMasterAutosuggestion(organName);
	}
}
