package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.MarkVisitDao;
import com.hms.ehat.dto.AppointmentDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.MarkVisitDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.service.MarkVisitService;
@Service
public class MarkVisitServiceImpl implements MarkVisitService {

	@Autowired
	MarkVisitDao markvisitdao;

	/**
	 * @author: Sagar @date 26_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<RegistrationViewDto> getMarkVisitList() {

		return markvisitdao.getMarkVisitList();
	}
	
	@Override
	@Transactional
	public List<RegistrationViewDto> getMarkVisitListpagination(
			Integer startIndex, HttpServletRequest request) {
		return markvisitdao.getMarkVisitListpagination(startIndex,request);
	}

	
	@Override
	@Transactional
	public String getCountClientMaster(HttpServletRequest request) {
		return markvisitdao.getCountClientMaster(request);
	}
	
	
	
	
	@Override
	@Transactional
	public List<MarkVisitDto> getPatientDetails(HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		String s1=request.getParameter("ptid");
		int ptid=Integer.valueOf(s1);		
		return markvisitdao.getPatientDetails(ptid);
	}
	
	

	@Override
	@Transactional
	public List<AppointmentDto> getappointmentList(HttpServletRequest request) {
		
		String s1=request.getParameter("appoid");
		int appoid=Integer.valueOf(s1);		
		return markvisitdao.getappointmentList(appoid);
	}
	
	@Override
	@Transactional
	public List<DoctorDto> getDoctorName(HttpServletRequest request) {
			
		   int drId = 0;
		  //int drId=Integer.parseInt(request.getParameter("drid"));
		  	
		  	String drId1=request.getParameter("drid");
		  	if(null != drId1){
		  	    drId = Integer.valueOf(drId1);
		  	}else{
		  	    drId = 0;
		  	}		
		return markvisitdao.getDoctorName(drId);
	}
	
	@Override
	@Transactional
	public RegistrationViewDto autoSuggestionMarkVisit(int patientId) {
		
		//String s1=request.getParameter("ptid");
		 
		return markvisitdao.autoSuggestionMarkVisit(patientId);
	}
	
	@Override
	@Transactional
	public RegistrationViewDto autoSuggestionMarkVisit1(String findingName,int patSearchType,String callFrom) {
		
		//String s1=request.getParameter("ptid");
		 
		return markvisitdao.autoSuggestionMarkVisit1(findingName,patSearchType,callFrom);
	}
	
	@Override
	@Transactional
	public MarkVisitDto getIPDPatientDetails(String letter) {
		
		//String s1=request.getParameter("ptid");
		 
		return markvisitdao.getIPDPatientDetails(letter);
	}
	
	@Override
	@Transactional
	public MarkVisitDto commonFuntionForSearch(String letter) {
		
		//String s1=request.getParameter("ptid");
		 
		
		
		return markvisitdao.commonFuntionForSearch(letter);
	}
	
	@Override
	@Transactional
	public List<RegistrationViewDto> getMarkVisitListDateWise(
			Date inputFromDate, Date inputToDate) {
		return markvisitdao.getMarkVisitListDateWise(inputFromDate,inputToDate);
	}
	
	@Override
	@Transactional
	public List<RegistrationDto> getListBlockPat() {

		return markvisitdao.getListBlockPat();
	}
	
	//irfan khan 6-oct-2018 search and set block patients
	@Override
	@Transactional
	public RegistrationDto setAutoCompleteBlockPatsList(String letter,String usertype) {
		
		//String s1=request.getParameter("ptid");
		 
		return markvisitdao.setAutoCompleteBlockPatsList(letter,usertype);
	}
	
	//irfan khan 6-oct-2018 Fetch date wise block patients
	@Override
	@Transactional
	public List<RegistrationDto> fetchBlockPatientByDateRange(
			Date inputFromDate, Date inputToDate) {
		return markvisitdao.fetchBlockPatientByDateRange(inputFromDate,inputToDate);
	}

	

	
}
