package com.hms.administrator.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.HospitalHolidaysDto;
import com.hms.administrator.service.HospitalHolidayAdminService;

@Controller
@RequestMapping(value = "/hospitalholiday")
public class HospitalHolidayAdminController {
	
	static Logger log=Logger.getLogger(HospitalDetailAdminController.class.getName());
	public static final String SAVE_RECORD="Save Record Successfully";
	public static final String UPDATE_RECORD="Update Record Successfully";
	public static final String UNKNOWN="Ooops Some Problem Occurred";
	public static final String DUPLICATE_RECORD="Duplicate Record Found";
	
	@Autowired
	HospitalHolidayAdminService hospitalholidayadminservice;
	
	
/****************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Save Hospital Holiday Master
****************************************************************************************************/	
	
	@RequestMapping(value = "/savehospitalholidaynew", method = RequestMethod.POST)
	public @ResponseBody String saveHospitalHoliday(@RequestParam("date") String date,
			@RequestParam("reason") String reason,
			@RequestParam("idHospitalHolidays") int idHospitalHolidays,
			HttpServletRequest request) { 
		log.info("In HospitalDetailAdminController saveHospitalHoliday()");									
		String year[]=date.split("/");	
		int response = hospitalholidayadminservice.saveHospitalHoliday(date,reason,idHospitalHolidays,request);
		String msg = "";
		log.debug("Response------->"+msg);
		return msg=(response==1)? SAVE_RECORD : (response==2)? DUPLICATE_RECORD:UNKNOWN;
		}
	
/*******************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020S
	* @codeFor	: Fetch Hospital Holiday
*******************************************************************************************************/
	
	@RequestMapping(value = "/fetchHospitalHoliday", method = RequestMethod.POST)
	public @ResponseBody HospitalHolidaysDto gethospitalholidayList(String selYear, HttpServletRequest request) {
		log.info("In HospitalDetailAdminController gethospitalholidayList()");											
		HospitalHolidaysDto hospitalHolidaysDto = hospitalholidayadminservice.getListHospitalHoliday(selYear);	
		log.debug("Reponse---->"+hospitalHolidaysDto);
		return hospitalHolidaysDto;
	}
	
/*******************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Edit Hospital Holiday
****************************************************************************************************/
	
	@RequestMapping(value = "/editHospitalHoliday", method = RequestMethod.POST)
	public @ResponseBody HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHolidays,HttpServletRequest request) {
		log.info("In HospitalDetailAdminController editHospitalHoliday()");													
		HospitalHolidaysDto hospitalHolidaysDto = hospitalholidayadminservice.editHospitalHoliday(idHospitalHolidays, request);
		log.debug("Response------>"+hospitalHolidaysDto);
		return hospitalHolidaysDto;
	}
	
/********************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Delete Hospital Holiday
*******************************************************************************************************/
	
	@RequestMapping(value = "/deleteHospitalHoliday", method = RequestMethod.POST)
	public @ResponseBody
	String deleteHospitalHoliday(@RequestParam("idHospitalHolidays") Integer idHospitalHolidays,HttpServletRequest request) 
	{	
		log.info("In HospitalDetailAdminController deleteHospitalHoliday()");													
		
		boolean response = hospitalholidayadminservice.deleteHospitalHoliday(idHospitalHolidays, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		log.debug("Response------->"+msg);
		return msg;
	}
}
