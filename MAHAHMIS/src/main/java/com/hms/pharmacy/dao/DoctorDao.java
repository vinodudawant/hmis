package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.dto.Doctor;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;

public interface DoctorDao {
	Boolean saveOrUpdateDoctor(DoctorMaster doctorMaster);

	List<DoctorMaster> getDoctors();

	Boolean deleteDoctor(Integer doctorId);

	List<DoctorMaster> getAutoSuggestionDoctorNames(String letter);
	
	List<DoctorMaster> getDoctorById(Integer doctorId);
	
	DoctorMaster getDoctorByIdForDate(Integer compId);
	
	public List<Doctor> fetchAutoListForDoctorName(String letter, String autoSuggest);
}
