package com.hms.patientsearch.service;

import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.patientsearch.entity.PatientSearchDTO;

public interface PatientSearchService {

	RegistrationViewDto getPatientAutoDetails(PatientSearchDTO obj);
	
	PatientSearchDTO  getPatientDetailsByLegacyUHIDNumber(PatientSearchDTO obj);
}
