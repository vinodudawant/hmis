package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.LabTestMethodDao;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.service.LabTestMethodService;

@Service
@Transactional
public class LabTestMethodServiceImpl implements LabTestMethodService {
	@Autowired
	LabTestMethodDao labTestMethodDao;

	@Override
	public String saveTestMethod(LabTestMethodDTO dto, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
				dto.setUnitId(unitId);
				dto.setCreatedBy(userId);
		return labTestMethodDao.saveTestMethod(dto);
	}
	
	@Override
	public LabTestMethodDTO getAllTestMethods(String searchText, String type) {
		return labTestMethodDao.fetchAllTestMethods(searchText, type);
	}

	@Override
	public LabTestMethodDTO editTestMethod(int testMethodId) {
		return labTestMethodDao.editTestMethod(testMethodId);
	}

	@Override
	public boolean deleteTestMethod(int testMethodId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		
		return labTestMethodDao.deleteTestMethod(testMethodId, userId);
	}
}
