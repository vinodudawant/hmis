package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.DdClinicalDto;

public interface DdClinicalService {

//	int saveClinical(DdClinicalDto clinical, HttpServletRequest request);

	int saveClinical(String clinicalDetails, HttpServletRequest request);


	List<DdClinicalDto> fetchClinical(int treatmentId);


	boolean deleteDDClinical(Integer clinicalid, HttpServletRequest request);

}
