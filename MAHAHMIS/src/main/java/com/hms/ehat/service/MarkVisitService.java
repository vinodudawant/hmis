package com.hms.ehat.service;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.AppointmentDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.MarkVisitDto;
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;

public interface MarkVisitService {
	
	
	List<RegistrationViewDto> getMarkVisitList();
	
	/* @author : Ajay s. Khandare @date :02-08-2019*/
	List<RegistrationViewDto> getMarkVisitListpagination(Integer startIndex, HttpServletRequest request);

	/* @author : Ajay s. Khandare @date :02-08-2019*/
	  String getCountClientMaster(HttpServletRequest request);

	List<MarkVisitDto> getPatientDetails(HttpServletRequest request);
	List<AppointmentDto> 	getappointmentList(HttpServletRequest request);
	
	List<DoctorDto> getDoctorName(HttpServletRequest request);
	RegistrationViewDto autoSuggestionMarkVisit(int patientId);
	RegistrationViewDto autoSuggestionMarkVisit1(String findingName,int patSearchType,String callFrom);
    MarkVisitDto getIPDPatientDetails(String letter);
    
    MarkVisitDto commonFuntionForSearch(String letter);
    
    List<RegistrationViewDto> getMarkVisitListDateWise(Date inputFromDate,
			Date inputToDate);
    
	List<RegistrationDto> getListBlockPat();
	
	//irfan khan 6-oct-2018 search and set block patients
	RegistrationDto setAutoCompleteBlockPatsList(String letter, String usertype);
	
	//irfan khan 6-oct-2018 Fetch date wise block patients
	 List<RegistrationDto> fetchBlockPatientByDateRange(Date inputFromDate,
				Date inputToDate);

    
}
