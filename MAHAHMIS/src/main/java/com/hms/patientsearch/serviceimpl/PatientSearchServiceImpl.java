package com.hms.patientsearch.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.patientsearch.dao.PatientSearchDao;
import com.hms.patientsearch.entity.PatientSearchDTO;
import com.hms.patientsearch.service.PatientSearchService;

@Service
@Transactional
public class PatientSearchServiceImpl implements PatientSearchService {
	@Autowired
	PatientSearchDao dao;

	@Override
	public RegistrationViewDto getPatientAutoDetails(PatientSearchDTO obj) {
		   
		return dao.getPatientAutoDetails(obj);
	}

	@Override
	public PatientSearchDTO getPatientDetailsByLegacyUHIDNumber(PatientSearchDTO obj) {
		// TODO Auto-generated method stub
		return dao.getPatientDetailsByLegacyUHIDNumber(obj);
	}

}
