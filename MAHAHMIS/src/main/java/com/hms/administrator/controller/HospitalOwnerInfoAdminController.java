package com.hms.administrator.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.administrator.service.HospitalOwnerAdminService;


@Controller
@RequestMapping(value = "/hospitalowner")
public class HospitalOwnerInfoAdminController {
	static Logger log=Logger.getLogger(HospitalDetailAdminController.class.getName());
	public static final String SAVE_RECORD="Save Record Successfully";
	public static final String UPDATE_RECORD="Update Record Successfully";
	public static final String UNKNOWN="Ooops Some Problem Occurred";
	public static final String DUPLICATE_RECORD="Duplicate Record Found";

	@Autowired
	HospitalOwnerAdminService hospitalOwnerAdminService;
	
	
/*********************************************************************************************
* @author	:Dnyaneshwar Kadam
* @date		: 15-Jan-2020
* @codeFor	: save hospital owner detail
*********************************************************************************************/

@RequestMapping(value = "/savehospitalownerdetail", method = RequestMethod.POST)
public @ResponseBody String savehospitalownerdetail(@RequestParam("savehospitalownerdetail") String savehospitalownerdetail,HttpServletRequest request) { 
	log.info("In HospitalDetailAdminController savehospitalownerdetail()");		
	int response = hospitalOwnerAdminService.savehospitalownerdetail(savehospitalownerdetail, request);	
	String msg = "";
	log.debug("Response---->"+msg);
	return msg = (response == 1) ? SAVE_RECORD: (response == 2) ? UPDATE_RECORD : UNKNOWN;
}

/***********************************************************************************************
* @author	:Dnyaneshwar Kadam
* @date		: 15-Jan-2020
* @codeFor	: Get FetchHospital Owner Detail
***********************************************************************************************/

@RequestMapping(value = "/getFetchHospitalOwnerDetail", method = RequestMethod.POST)
public @ResponseBody HospitalOwnerDetailDto getFetchHospitalOwnerDetail(HttpServletRequest request) { 
	log.info("In HospitalDetailAdminController getFetchHospitalOwnerDetail()");				
	HospitalOwnerDetailDto hospitalOwnerDetailDto = hospitalOwnerAdminService.getListhospitalownerdetail();
	log.debug("Response------>"+hospitalOwnerDetailDto);
	return hospitalOwnerDetailDto;
}


/**************************************************************************************************
* @author	:Dnyaneshwar Kadam
* @date		: 15-Jan-2020
* @codeFor	: Edit Hospital Owner Detail
***************************************************************************************************/

@RequestMapping(value = "/editHospitalOwnerDetail", method = RequestMethod.POST)
public @ResponseBody HospitalOwnerDetailDto editHospitalOwnerDetail(Integer hospitalOwnerlist,HttpServletRequest request) { 
	log.info("In HospitalDetailAdminController editHospitalOwnerDetail()");						
	HospitalOwnerDetailDto hospitalOwnerDetailDto = hospitalOwnerAdminService.edithospitalownerdetail(hospitalOwnerlist, request);	
	log.debug("Response------>"+hospitalOwnerDetailDto);
	return hospitalOwnerDetailDto;
}


/****************************************************************************************************
* @author	:Dnyaneshwar Kadam
* @date		: 15-Jan-2020
* @codeFor	: Delete hospital owner detail
***************************************************************************************************/

@RequestMapping(value = "/deletehospitalownerdetail", method = RequestMethod.POST)
public @ResponseBody
String deletehospitalownerdetail(@RequestParam("savehospitalownerdetail") Integer idhospitalOwner,HttpServletRequest request) {
	log.info("In HospitalDetailAdminController deletehospitalownerdetail()");							
	//System.out.println("in deletehospitalownerdetail"+idhospitalOwner);
	boolean response = hospitalOwnerAdminService.delethospitalownerdetail(idhospitalOwner, request);
	String msg = "";
	if (response == true) {
		msg = "Record Deleted Successfully";
	} else {
		msg = "Record Deleted Un-successfully";
	}
	log.debug("Response------>"+msg);
	return msg;
}

	
	
	
	
	
	
	
	
	
}
