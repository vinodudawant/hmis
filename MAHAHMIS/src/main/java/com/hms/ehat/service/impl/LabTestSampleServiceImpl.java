package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabTestSampleDao;
import com.hms.ehat.service.LabTestSampleService;
import com.hms.pathology.dto.LabTestSampleDTO;

@Service
@Transactional
public class LabTestSampleServiceImpl implements LabTestSampleService {
	
	@Autowired
	LabTestSampleDao labTestSampleDao;
	

	@Override
	public String saveTestSample(LabTestSampleDTO dto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
				dto.setUnitId(unitId);
				dto.setCreatedBy(userId);
				
		return labTestSampleDao.saveTestSample(dto);
	}

	@Override
	public LabTestSampleDTO getAllTestSamples(String searchText, String type) {
		return labTestSampleDao.fetchAllTestSamples(searchText, type);
	}

	@Override
	public LabTestSampleDTO editTestSample(int testSampleId) {
		return labTestSampleDao.editTestSample(testSampleId);
	}

	@Override
	public boolean deleteTestSample(int testSampleId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		return labTestSampleDao.deleteTestSample(testSampleId, userId);
	}
}
