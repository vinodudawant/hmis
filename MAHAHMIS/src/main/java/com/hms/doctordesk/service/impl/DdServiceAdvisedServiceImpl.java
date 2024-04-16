package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.DdServiceAdvisedDao;
import com.hms.doctordesk.dto.DdServiceAdvisedDto;
import com.hms.doctordesk.service.DdServiceAdvisedService;
import com.hms.dto.Doctor;


@Service
@Transactional
public class DdServiceAdvisedServiceImpl implements DdServiceAdvisedService {
	
	@Autowired
	DdServiceAdvisedDao ddServiceAdvisedDao;
	
	@Override
	public List<Doctor> fetchDoctor() {
		return ddServiceAdvisedDao.fetchDoctor();
	}

	@Override
	public int saveHistory(DdServiceAdvisedDto service, HttpServletRequest request) {
		return ddServiceAdvisedDao.saveHistory(service,request);
	}

	@Override
	public List<DdServiceAdvisedDto> fetchService() {
		return ddServiceAdvisedDao.fetchService();
	}

}
