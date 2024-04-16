package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.DdClinicalDao;
import com.hms.doctordesk.dto.DdClinicalDto;
import com.hms.doctordesk.service.DdClinicalService;

@Service
@Transactional
public class DdClinicalServiceImpl implements DdClinicalService {
	@Autowired
	DdClinicalDao ddClinicalDao;

	@Override
	public int saveClinical(String clinicalDetails, HttpServletRequest request) {
		return ddClinicalDao.saveClinical(clinicalDetails, request);
	}

	@Override
	public List<DdClinicalDto> fetchClinical(int treatmentId) {
		return ddClinicalDao.fetchClinical(treatmentId);
	}

	@Override
	public boolean deleteDDClinical(Integer clinicalid,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ddClinicalDao.deleteDDClinical(clinicalid,request);
	}

	
	
	

}
