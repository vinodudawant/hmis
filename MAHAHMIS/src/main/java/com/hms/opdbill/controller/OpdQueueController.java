package com.hms.opdbill.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.opdbill.dto.OpdQueueDto;
import com.hms.opdbill.service.OpdQueueService;
import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.utility.ApplicationContextUtils;

@Controller
@RequestMapping(value = "/opdqueue")
public class OpdQueueController {

	static Logger log=Logger.getLogger(OpdQueueController.class.getName());
	static {
		System.out.println("OpdQueueController is Loaded...!");
	}
	
	@Autowired
	OpdQueueService opdQueueService;
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get opd queue patient details 
	================*/
	@ResponseBody
	@RequestMapping(value = "/getAllOpdQueuePatient", method = RequestMethod.POST)
	public OpdQueueDto getAllOpdQueuePatient(OpdQueueDto objDto, @RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		
		log.info("In OpdQueueController getAllOpdQueuePatient()");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		objDto.setUnitId(unitId);
		
		OpdQueueDto ltRegMasterDto = new OpdQueueDto();
		ltRegMasterDto = opdQueueService.getAllOpdQueuePatient(objDto,startIndex);
		Integer count =  opdQueueService.getAllOpdQueuePatientCount();
		
		ltRegMasterDto.setCount(count);
		
		return ltRegMasterDto;
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To display LED for opd queue 
	================*/
	@ResponseBody
	@RequestMapping(value = "/displayLED", method = RequestMethod.POST)
 	public org.json.simple.JSONObject displayLED(@RequestParam(value = "specialityId") Integer specialityId) {
		EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return ehatEnterpriseUtil.displayLED(specialityId);
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get diagnostic queue patient details 
	================*/
	@ResponseBody
	@RequestMapping(value = "/getAllDiagQueuePatient", method = RequestMethod.POST)
	public OpdQueueDto getAllDiagQueuePatient(OpdQueueDto objDto, @RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		
		log.info("In OpdQueueController getAllDiagQueuePatient()");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		objDto.setUnitId(unitId);
		
		OpdQueueDto ltRegMasterDto = new OpdQueueDto();
		ltRegMasterDto = opdQueueService.getAllDiagQueuePatient(objDto,startIndex);
		Integer diagCount =  opdQueueService.getAllDiagQueuePatientCount();
		ltRegMasterDto.setDiagCount(diagCount);
		return ltRegMasterDto;
	}
	

	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get diagnostic queue patient details 
	================*/
	@ResponseBody
	@RequestMapping(value = "/getAllIvfQueuePatient", method = RequestMethod.POST)
	public OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto, HttpServletRequest request) {
		
		log.info("In OpdQueueController getAllDiagQueuePatient()");
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		objDto.setUnitId(unitId);
		
		OpdQueueDto ltRegMasterDto = new OpdQueueDto();
		ltRegMasterDto = opdQueueService.getAllIvfQueuePatient(objDto);
		return ltRegMasterDto;
	}
	
	/**
	 * @author Vishant
	 * @date 26_August_2022 these methods are used to map request
	 * with services method
	 * **/
	@RequestMapping(value = "/getPreviousTreatmentPatientDiagnostic", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationViewDto2 getMarkVisitList(HttpServletRequest request,@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype,@RequestParam("deptId") int deptId, @RequestParam("startIndex") Integer startIndex) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
		
		ltRegistrationViewDto = opdQueueService.getAllPatientRecordsForPrevDiagnostic(letter,usertype,deptId,unitId,startIndex);
	
		RegistrationViewDto2 obj=new RegistrationViewDto2();
		
		Integer prevDiagCount=opdQueueService.getPrevDiagnosticCount();
		obj.setPrevDiagCount(prevDiagCount);
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
			 
		return obj;
	}
}
