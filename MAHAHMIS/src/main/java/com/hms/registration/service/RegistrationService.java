package com.hms.registration.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.registration.dto.MarkvisitPatientDetailsDto;
import com.hms.registration.dto.PatientDetailsDto;
import com.hms.registration.dto.RegistrationDataDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;

public interface RegistrationService {

	RegistrationDataDto getRegistrationData(RegistrationDataDto regDto);
	SpecializationDto getSpecialization(SpecializationDto regDto);
	SpecialityWiseDoctorDto getDoctorBySpecialization(SpecialityWiseDoctorDto regDto);
	
	int savePatientDetails(RegistrationDto regDto);
	int savePatientDemographicDetails(RegistrationDto regDto);
	List<PatientDetailsDto> getMarkVisitList(int unitId,Integer startIndex);
	List<MarkvisitPatientDetailsDto> getMarkvisitPatientDetails(MarkvisitPatientDetailsDto obj);
	List<PatientDetailsDto> autoSuggestionMarkVisit(int patientId,String mobileNo,String addharNo, HttpServletRequest request);
	
	int savePatientDetails1(RegistrationDto regDto);
	Integer getAllGetPatCount();
	
	int followUpCount(int patientId,int sponsorId);
}
