package com.hms.ambulance.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ambulance.dto.AmbulancePatientCountDto;
import com.hms.ambulance.dto.AmbulancePatientDto;
import com.hms.dto.Users;
import com.hms.ehat.dto.RegistrationDto;

public interface AmbulancePatientService {

	int saveAmbulancePatient(AmbulancePatientDto ambulancePatient, HttpServletRequest request);
	
	List<AmbulancePatientDto> getAllAmbulancePatient(String status,HttpServletRequest request);

	AmbulancePatientDto editAmbulancePatient(Integer id);

	boolean deleteAmbulancePatient(Integer patientId, HttpServletRequest request);

	List<RegistrationDto> getAmbulanceDetailsById(Integer patientId);
	
	String getDoctorName(Integer patientId);

	List<Users> getDoctors(Integer user_ID);

	List<Users> getNurse(Integer user_ID);

	List<AmbulancePatientDto> autoSuggestion(int callFrom, String text);

	List<AmbulancePatientDto> getAmbulancePatientById(Integer patientId);
	
	int approveAmbulancePatient(String id,Integer userId);

	int assignAmbulancePatient(Integer id, Integer userId);
	
	int completeAmbulancePatient(Integer id, Integer userId);

	AmbulancePatientCountDto getAmbulancePatientCount(int id, HttpServletRequest request);

	int updateAmbulancePatient(AmbulancePatientDto ambulancePatient, HttpServletRequest request);

	int updateAmbulancePatientDetails(AmbulancePatientDto obj, HttpServletRequest request);
	
	List<AmbulancePatientDto> autoSuggestionforRID(int callFrom, Integer id);
	
	List<AmbulancePatientDto> getfilterAmbulancePatientMasterWithDate(String status, String department,
			String requisitionDate, String toDate, String wardTypeSelect);
}
