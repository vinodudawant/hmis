package com.hms.ehat.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.AppointmentDto;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.MarkVisitDto;
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.service.MarkVisitService;
import com.hms.ehat.service.MasterConfigService;


@Controller
@RequestMapping(value = "/markvisit")
public class MarkVisitController {
	
	
	
	@Autowired
	MarkVisitService markvisitservice;

	/**
	 * @author : Sagar // modify by ajay s .khandare
	 * @date :  26_May_2017 // 02-08-2019 
	 * resons: these methods are used to map  request with services with Markvisit method and get count
	 * **/
	
	@RequestMapping(value = "/getMarkVisitList ", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationViewDto getMarkVisitList(HttpServletRequest request) {

		List<RegistrationViewDto> ltRegistrationViewDto = new ArrayList<RegistrationViewDto>();

		ltRegistrationViewDto = markvisitservice.getMarkVisitList();

		String count = markvisitservice.getCountClientMaster(request);

		List<String> countnubmer = new ArrayList<>();
		countnubmer.add(count);

		RegistrationViewDto obj = new RegistrationViewDto();

		obj.setLstRegviewDto(ltRegistrationViewDto);
		obj.setCountpatient(count);

		return obj;
	}
	
	
	 /* @author : Ajay s. Khandare 
	  * @date :02-08-2019
	  * resons :these methods are used to map request and used pagination  with services with Markvisit method
	 */
	@RequestMapping(value = "/getMarkVisitListpagination ", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationViewDto getMarkVisitListpagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		
		List<RegistrationViewDto> ltRegistrationViewDto = new ArrayList<RegistrationViewDto>();
		
		ltRegistrationViewDto = markvisitservice.getMarkVisitListpagination(startIndex,request);
		
		RegistrationViewDto obj=new RegistrationViewDto();
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
	
	 
		return obj;
	}
	
	
	
	
	
	
	
	
	
	/**
	 * @author Sagar @date 26_May_2017 these methods are used to map request
	 *         with services with Markvisit method
	 * **/
	@RequestMapping(value = "/getPatientDetails ", method = RequestMethod.POST)
	public @ResponseBody
	 MarkVisitDto getPatientDetails(HttpServletRequest request) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		
		List<MarkVisitDto> ltMarkVisitDto = new ArrayList<MarkVisitDto>();
		
		ltMarkVisitDto = markvisitservice.getPatientDetails(request);
	
		MarkVisitDto obj=new MarkVisitDto();
		
		obj.setLstMarkVisit(ltMarkVisitDto);
 		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		
		
		 
		return obj;
	}
	
	
	/**
	 * @author Sagar @date 26_May_2017 these methods are used to map request
	 *         with services with Markvisit method
	 * **/
	@RequestMapping(value = "/getappointmentList ", method = RequestMethod.POST)
	public @ResponseBody
	AppointmentDto getappointmentList(HttpServletRequest request) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		
		List<AppointmentDto> ltAppointmentDto = new ArrayList<AppointmentDto>();
		
		ltAppointmentDto = markvisitservice.getappointmentList(request);
	
		AppointmentDto obj=new AppointmentDto();
		
		obj.setLstAppointment(ltAppointmentDto);

		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		 
		return obj;
	}
	
	@RequestMapping(value = "/getDoctorName", method = RequestMethod.POST)
	public @ResponseBody
	DoctorDto getDoctorName(HttpServletRequest request) {
				
		/*String drId=request.getParameter("drid");
		request.setAttribute("drid", drId);*/
		//int i=Integer.valueOf(count);
		
		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
		
		ltDoctorDto = markvisitservice.getDoctorName(request);
	
		//MarkVisitDto obj=new MarkVisitDto();
		DoctorDto obj=new DoctorDto();
		
		obj.setLstDoctorDto(ltDoctorDto);
 
		return obj;
	}
	

	/*@RequestMapping(value = "/autoSuggestionMarkVisit", method = RequestMethod.POST)
	@ResponseBody
	public RegistrationViewDto autoSuggestionMarkVisit(@RequestParam("letter") String letter,@RequestParam("usertype") String usertype) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = markvisitservice.autoSuggestionMarkVisit(letter,usertype);	
		return ltRegistrationViewDto;
	}*/
	@RequestMapping(value = "/autoSuggestionMarkVisit", method = RequestMethod.POST)
	@ResponseBody
	public RegistrationViewDto autoSuggestionMarkVisit(@RequestParam("patientId") String patientId) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = markvisitservice.autoSuggestionMarkVisit(Integer.parseInt(patientId));	
		return ltRegistrationViewDto;
	}
	
	@RequestMapping(value = "/autoSuggestionMarkVisit1", method = RequestMethod.POST)
	 @ResponseBody
	public RegistrationViewDto autoSuggestionMarkVisit1(@RequestParam("findText") String findText,@RequestParam("patSearchType") String patSearchType,
			@RequestParam("callFrom") String callFrom) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = markvisitservice.autoSuggestionMarkVisit1(findText,Integer.parseInt(patSearchType),callFrom);	
		return ltRegistrationViewDto;
	}
	
	@RequestMapping(value = "/getIPDPatientDetails", method = RequestMethod.POST)
	 @ResponseBody
	public MarkVisitDto getIPDPatientDetails(@RequestParam("letter") String letter) {
		 
		MarkVisitDto ltMarkVisitDto = new  MarkVisitDto();
		ltMarkVisitDto = markvisitservice.getIPDPatientDetails(letter);	
		return ltMarkVisitDto;
	}
	
	@RequestMapping(value = "/commonFuntionForSearch", method = RequestMethod.POST)
	 @ResponseBody
	public MarkVisitDto commonFuntionForSearch(@RequestParam("letter") String letter) {
		 
		MarkVisitDto ltMarkVisitDto = new  MarkVisitDto();
		ltMarkVisitDto = markvisitservice.commonFuntionForSearch(letter);	
		return ltMarkVisitDto;
	}
	
	
	/**
	 * @author Sagar @date 26_May_2017 these methods are used to map request
	 *         with services with Markvisit method
	 * **/
	@RequestMapping(value = "/getMarkVisitListDateWise", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationViewDto getMarkVisitListDateWise(@RequestParam("inputFromDate") Date inputFromDate,
			@RequestParam("inputToDate") Date inputToDate) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		
		List<RegistrationViewDto> ltRegistrationViewDto = new ArrayList<RegistrationViewDto>();
		
		ltRegistrationViewDto = markvisitservice.getMarkVisitListDateWise(inputFromDate,inputToDate);
	
		RegistrationViewDto obj=new RegistrationViewDto();
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		
		
		 
		return obj;
	}
	
	@RequestMapping(value = "/getListBlockPat ", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationDto getListBlockPat() {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		
		List<RegistrationDto> ltRegistrationViewDto = new ArrayList<RegistrationDto>();
		
		ltRegistrationViewDto = markvisitservice.getListBlockPat();
	
		RegistrationDto obj=new RegistrationDto();
		
		obj.setListReg(ltRegistrationViewDto);
		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		
		
		 
		return obj;
	}
	
	
	//irfan khan 6-oct-2018 search and set block patients
	@RequestMapping(value = "/setAutoCompleteBlockPatsList", method = RequestMethod.POST)
	@ResponseBody
	public RegistrationDto setAutoCompleteBlockPatsList(@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype) {

		RegistrationDto ltRegistrationViewDto = new RegistrationDto();
		ltRegistrationViewDto = markvisitservice.setAutoCompleteBlockPatsList(letter, usertype);
		return ltRegistrationViewDto;
	}
	
	//irfan khan 6-oct-2018 Fetch date wise block patients
	@RequestMapping(value = "/fetchBlockPatientByDateRange", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationDto fetchBlockPatientByDateRange(@RequestParam("inputFromDate") Date inputFromDate,
			@RequestParam("inputToDate") Date inputToDate) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		
		List<RegistrationDto> ltRegistrationViewDto = new ArrayList<RegistrationDto>();
		
		ltRegistrationViewDto = markvisitservice.fetchBlockPatientByDateRange(inputFromDate,inputToDate);
	
		RegistrationDto obj=new RegistrationDto();
		
		obj.setListReg(ltRegistrationViewDto);
		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		
		
		 
		return obj;
	}
}
