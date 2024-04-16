package com.hms.administrator.controller;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.service.AdminDoctorSpecilityService;

import com.hms.dto.DoctorSpecility;


@Controller 
@RequestMapping(value="/admin")
public class AdminDoctorSpecilityController {
static Logger log=Logger.getLogger(AdminDoctorSpecilityController.class.getName());
	
	@Autowired
	AdminDoctorSpecilityService doctorservice;
	
	@RequestMapping(value = "/saveDoctorSpeciality", method = RequestMethod.POST)
	@ResponseBody
	public int saveDoctorSpeciality(DoctorSpecility cobj,HttpServletRequest request) {
		log.info("saverefertodoc..");

		int response = doctorservice.saveDoctorSpeciality(cobj, request);
	      log.debug("saveDoctorSpeciality....."+response);

		return response;	
	}
	
	@RequestMapping(value = "/defaultViewDoctorSpeciality", method = RequestMethod.GET)
	public @ResponseBody
	DoctorSpecility defaultViewDoctorSpeciality(@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("setExistingDoctorTemp..");

		List<DoctorSpecility> listDoctorSpecility = new ArrayList<DoctorSpecility>();
		listDoctorSpecility = doctorservice.defaultViewDoctorSpeciality(unitId, request);
	      log.debug("defaultViewDoctorSpeciality....."+listDoctorSpecility);
	      DoctorSpecility obj = new DoctorSpecility();
		obj.setListDoctorSpecility(listDoctorSpecility);
		return obj;
	}
	
	@RequestMapping(value = "/editDoctorSpeciality", method = RequestMethod.GET)
	public @ResponseBody
	DoctorSpecility editDoctorSpeciality(@RequestParam("docSplId") Integer docSplId) {
		log.info("editChannelDoctorMgmt..");
		DoctorSpecility obj = new DoctorSpecility();
		obj = doctorservice.editDoctorSpeciality(docSplId);
		 log.debug("editDoctorSpeciality....."+obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/deleteDoctorSpecility", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDoctorSpecility(@RequestParam("docSplId") Integer docSplId,HttpServletRequest request) {
		log.info("deleteChannelDoctorMgmt..");
		boolean response = doctorservice.deleteDoctorSpecility(docSplId, request);
	      log.debug("deleteDoctorSpecility....."+response);

				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network Issue";
		}
		return msg;
	}
	
	
	@RequestMapping(value = "/doctorSpecilityAutoSuggestion", method = RequestMethod.GET)
	public @ResponseBody
	DoctorSpecility doctorSpecilityAutoSuggestion(@RequestParam("doctorSplName") String doctorSplName,@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("channelDoctorAutoSuggestion..");

		List<DoctorSpecility> lstdoctor = new ArrayList<DoctorSpecility>();
		lstdoctor = doctorservice.doctorSpecilityAutoSuggestion(doctorSplName, unitId);
	      log.debug("doctorSpecilityAutoSuggestion....."+lstdoctor);
	      DoctorSpecility obj = new DoctorSpecility();
		obj.setListDoctorSpecility(lstdoctor);
		return obj;
	}	


}