package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.PatientMaster;

public interface PatientService {

	List<PatientMaster> getPatient();
	boolean savePatient(PatientMaster patientMaster);
	boolean deletePatient(Integer patId);
	List<PatientMaster> autoSuggestionPatient(String letter);
	
	List<PatientMaster> getPatientById(Integer patId);
}
