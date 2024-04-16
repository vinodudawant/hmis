package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PatientMaster;

public interface PatientDao {

	List<PatientMaster> getPatient();

	boolean savePatient(PatientMaster patientMaster);

	boolean deletePatient(Integer patId);

	List<PatientMaster> autoSuggestionPatient(String letter);

	List<PatientMaster> getPatientById(Integer patId);
	
	PatientMaster getPatientByIdForDate(Integer patId);

}
