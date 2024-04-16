package com.hms.registration.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.registration.dto.MarkvisitPatientDetailsDto;
import com.hms.registration.dto.PatientDetailsDto;
import com.hms.registration.dto.RegistrationDataDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;
import com.hms.registration.service.RegistrationService;




@Controller
@RequestMapping(value = "/register")
public class RegisterController {

	static Logger log=Logger.getLogger(RegisterController.class.getName());
	static {
		System.out.println("RegisterController is Loaded...!");
	}
	
	@Autowired
	RegistrationService regService;
	
	//@author : Vinod Udawant @date: 24-Dec-2021 @reason : To fetch registration drop down data 
	@ResponseBody
	@RequestMapping(value = "/getregdata", method = RequestMethod.POST)
	public RegistrationDataDto getRegistrationData(@RequestBody RegistrationDataDto regDto) {
		
		log.info("In RegisterController getRegistrationData()");
		regDto = regService.getRegistrationData(regDto);
		log.debug("Response--------> "+regDto);
		return regDto;
	}
	
	//@author : Vinod Udawant @date: 24-Dec-2021 @reason : To fetch doctor specialization data 
	@ResponseBody
	@RequestMapping(value = "/getSpecialization", method = RequestMethod.POST)
	public SpecializationDto getSpecialization(@RequestBody SpecializationDto regDto) {
		
		log.info("In RegisterController getSpecialization()");
		regDto = regService.getSpecialization(regDto);
		log.debug("Response--------> "+regDto);
		return regDto;
	}
	
	//@author : Vinod Udawant @date: 24-Dec-2021 @reason : To fetch registration data 
	@ResponseBody
	@RequestMapping(value = "/getDoctorBySpecialization", method = RequestMethod.POST)
	public SpecialityWiseDoctorDto getDoctorBySpecialization(@RequestBody SpecialityWiseDoctorDto regDto) {
		
		log.info("In RegisterController getDoctorBySpecialization()");
		regDto = regService.getDoctorBySpecialization(regDto);
		log.debug("Response--------> "+regDto);
		return regDto;
	}
	
	//@author : Vinod Udawant @date: 24-Dec-2021 @reason : To Save Patient Details 
	@ResponseBody
	@RequestMapping(value = "/savePatientDetails", method = RequestMethod.POST)
	public int savePatientDetails(@RequestBody RegistrationDto regDto) {

		log.info("In RegisterController savePatientDetails()");
		int patientId = regService.savePatientDetails(regDto);
		log.debug("Response--------> "+patientId);
		return patientId;
	}
	
	//@author : Vinod Udawant @date: 24-Dec-2021 @reason : To Save Patient Demographic Details
	@ResponseBody
	@RequestMapping(value = "/savePatientDemographicDetails", method = RequestMethod.POST)
	public int savePatientDemographicDetails(@RequestBody RegistrationDto regDto) {
		
		log.info("In RegisterController savePatientDemographicDetails()");
		int patientId = regService.savePatientDemographicDetails(regDto);
		log.debug("Response--------> "+patientId);
		return patientId;
	}
	
	//@author : Vinod Udawant @date: 28-Dec-2021 @reason : To fetch markvisit List
	@RequestMapping(value = "/getMarkVisitList", method = RequestMethod.POST)
	public @ResponseBody PatientDetailsDto getMarkVisitList(HttpServletRequest request, @RequestParam("startIndex") Integer startIndex) {

		log.info("In RegisterController getMarkVisitList()");
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		
		List<PatientDetailsDto> ltRegistrationViewDto = new ArrayList<PatientDetailsDto>();
		ltRegistrationViewDto = regService.getMarkVisitList(unitId,startIndex);
		
		PatientDetailsDto obj = new PatientDetailsDto();
		Integer getPatientCount =  regService.getAllGetPatCount();
		obj.setGetPatientCount(getPatientCount);
		obj.setLstRegviewDto(ltRegistrationViewDto);
		log.debug("Response--------> "+obj);
		return obj;
	}
	
	//@author : Vinod Udawant @date: 28-Dec-2021 @reason : To fetch markvisit data of perticular patient
	@RequestMapping(value = "/getMarkvisitPatientDetails", method = RequestMethod.POST)
	public @ResponseBody
	MarkvisitPatientDetailsDto getMarkvisitPatientDetails(@RequestBody MarkvisitPatientDetailsDto obj,HttpServletRequest request) {

		log.info("In RegisterController getMarkvisitPatientDetails()");
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		
		List<MarkvisitPatientDetailsDto> lstMarkVisit = new ArrayList<MarkvisitPatientDetailsDto>();
		obj.setUnitId(unitId);
		lstMarkVisit = regService.getMarkvisitPatientDetails(obj);
		
		MarkvisitPatientDetailsDto objDto = new MarkvisitPatientDetailsDto();
		objDto.setLstMarkVisit(lstMarkVisit);
		log.debug("Response--------> "+objDto);
		return objDto;
	}
	
	@RequestMapping(value = "/autoSuggestionMarkVisit", method = RequestMethod.POST)
	@ResponseBody
	public PatientDetailsDto autoSuggestionMarkVisit(@RequestParam("patientId") int patientId,@RequestParam("mobileNo") String mobileNo,
			@RequestParam("addharNo") String addharNo, HttpServletRequest request) {
		 
		log.info("In RegisterController autoSuggestionMarkVisit()");
		PatientDetailsDto objDto = new  PatientDetailsDto();
		List<PatientDetailsDto> ltRegistrationViewDto = regService.autoSuggestionMarkVisit(patientId,mobileNo,addharNo,request);	
		objDto.setLstRegviewDto(ltRegistrationViewDto);
		log.debug("Response--------> "+objDto);
		return objDto;
	}
	//@author : Vinod Udawant @date: 24-Dec-2021 @reason : To Save Patient Details 
		@ResponseBody
		@RequestMapping(value = "/savePatientDetails1", method = RequestMethod.POST)
		public int savePatientDetails1(@RequestBody RegistrationDto regDto) {

			log.info("In RegisterController savePatientDetails()");
			int patientId = regService.savePatientDetails1(regDto);
			log.debug("Response--------> "+patientId);
			return patientId;
		}
		
		@ResponseBody
		@RequestMapping(value = "/getfollowUpCount", method = RequestMethod.GET)
		public int getfollowUpCount(@RequestParam("patientId") int patientId,@RequestParam("sponsorId") int sponsorId, HttpServletRequest request) {
			 
			log.info("In RegisterController followUpCount()");
			
			int res = regService.followUpCount(patientId, sponsorId);
			
			log.debug("Response--------> "+res);
			return res;
		}
}
