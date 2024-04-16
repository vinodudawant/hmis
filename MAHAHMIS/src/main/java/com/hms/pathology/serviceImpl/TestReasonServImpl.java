package com.hms.pathology.serviceImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pathology.dao.TestReasonDao;
import com.hms.pathology.dto.PathologyTestReasonDto;
import com.hms.pathology.service.TestReasonService;

@Service
@Transactional
public class TestReasonServImpl implements TestReasonService {

	
	@Autowired
	TestReasonDao testReasonDao;
	
	@Override
	public int saveTestReason(PathologyTestReasonDto labTestReasonDTO, Integer sampleTypeId, HttpServletRequest request) {
		return testReasonDao.saveTestReason(labTestReasonDTO, sampleTypeId, request);
	}

	@Override
	public List<PathologyTestReasonDto> getAllTestReason() {
		
		return testReasonDao.getAllTestReason();
	}

	@Override
	public PathologyTestReasonDto editTestReasonById(int id,
			HttpServletRequest request) {
		
		return testReasonDao.editTestReasonById(id, request);
	}

	@Override
	public boolean deleteTestReasonById(int id, HttpServletRequest request) {
		return testReasonDao.deleteTestReasonById(id, request);
	}

	@Override
	public List<PathologyTestReasonDto> searchTestReasonByName(String name,
			HttpServletRequest request) {
	
		return testReasonDao.searchTestReasonByName(name, request);
	}

}
