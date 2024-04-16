package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.ChemotherapyDao;
import com.hms.doctordesk.dto.ChemotherapyDto;
import com.hms.doctordesk.service.ChemotherapyService;

@Service
@Transactional
public class ChemotherapyServiceImpl implements ChemotherapyService {
	
	@Autowired
	ChemotherapyDao chemotherapyDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveChemoMaster(ChemotherapyDto chemo, HttpServletRequest request) {
		return chemotherapyDao.saveChemoMaster(chemo,request);
	}

	@Override
	public List<ChemotherapyDto> getAllChemoMaster() {
		return chemotherapyDao.getAllChemoMaster();
	}

	@Override
	public boolean deleteChemoMaster(Integer chemotherapyId, HttpServletRequest request) {
	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			return chemotherapyDao.deleteChemoMaster(chemotherapyId, userId);
		}

	@Override
	public ChemotherapyDto editChemoMaster(Integer chemotherapyId) {
		return chemotherapyDao.editChemoMaster(chemotherapyId);
	}

	@Override
	public List<ChemotherapyDto> getAllChemoMasterAutosuggestion(String chemotherapyName) {
		return chemotherapyDao.getAllChemoMasterAutosuggestion(chemotherapyName);
	}

}
