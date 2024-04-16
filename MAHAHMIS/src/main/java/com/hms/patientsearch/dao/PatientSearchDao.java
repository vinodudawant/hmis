package com.hms.patientsearch.dao;

import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.patientsearch.entity.PatientSearchDTO;

public interface PatientSearchDao {
	RegistrationViewDto getPatientAutoDetails(PatientSearchDTO obj);
	
	PatientSearchDTO getPatientDetailsByLegacyUHIDNumber(PatientSearchDTO  obj);
}
