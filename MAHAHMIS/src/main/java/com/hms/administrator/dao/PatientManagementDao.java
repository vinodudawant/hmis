package com.hms.administrator.dao;

import java.util.List;
import com.hms.dto.PatientTitle;
import com.hms.dto.SymptomsDetailsComp;

public interface PatientManagementDao {

	public String insertPatientTitle(PatientTitle patientTitle);
	public PatientTitle fetchAllPatientTitles();
	public PatientTitle getTitleById(Integer titleId);
	public boolean deletePatientTitle(int patientTitleId, int userId);
	
	public String saveSymptomDetails(int specializationId, List<SymptomsDetailsComp> symptomsDetailsDtoList);
	public List<SymptomsDetailsComp> fetchSymptomDetails(int specializationId);
	public boolean deleteSymptomDetails(int[] symptomDetailIds, int userId);
}
