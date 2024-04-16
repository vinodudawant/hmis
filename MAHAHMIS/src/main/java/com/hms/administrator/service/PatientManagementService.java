package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import com.hms.dto.PatientTitle;
import com.hms.dto.SymptomsDetailsComp;


public interface PatientManagementService {

	public String savePatientTitle(PatientTitle patientTitle, HttpServletRequest request);
	public PatientTitle getAllPatientTitles();
	public PatientTitle getTitleById(Integer titleId);
	public boolean deletePatientTitle(int patientTitleId, HttpServletRequest request);
	
	public String saveSymptomDetails(int specializationId, String symptomDetailsString, HttpServletRequest request);
	public List<SymptomsDetailsComp> getSymptomDetails(int specializationId);
	public boolean removeSymptomDetails(int[] symptomDetailIds, HttpServletRequest request);
}
