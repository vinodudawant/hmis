package com.hms.pharmacy.service;

import java.util.List;

import com.hms.dto.Doctor;
import com.hms.pharmacy.pojo.DoctorMaster;

public interface DoctorSevice {
	Boolean saveOrUpdateDoctor(DoctorMaster doctorMaster);

	List<DoctorMaster> getDoctors();

	Boolean deleteDoctor(Integer doctorId);

	List<DoctorMaster> getAutoSuggestionDoctorNames(String letter);

	List<DoctorMaster> getDoctorById(Integer doctorId);
	
	public List<Doctor> fetchAutoListForDoctorName(String letter, String autoSuggest);

}
