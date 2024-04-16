package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dto.OrganRequestDto;

public interface OrganRequestDao {
	
	int saveOrganRequest(OrganRequestDto obj, Integer patientId,
			Integer treatmentId, HttpServletRequest request);

	OrganRequestDto editOrganRequest(Integer organRequestId, HttpServletRequest request);

	boolean deleteOrganRequest(Integer organRequestId,
			HttpServletRequest request);

	List<OrganRequestDto> requestAutoSuggestion(Integer organRequestId,
			String callFrom);

	List<OrganRequestDto> getAllOrganRequestList(HttpServletRequest request,String fromDate,String lastDate);

	RegistrationDto getPatientDetailsWithMaxTreatmentId(Integer patientId,
			HttpServletRequest request);
	

}
