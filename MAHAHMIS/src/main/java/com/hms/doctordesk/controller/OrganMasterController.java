package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.hms.doctordesk.dao.OrganMasterDao;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.service.OrganMasterService;


@RestController
@RequestMapping(value="/organ")
public class OrganMasterController {
	
	@Autowired
	OrganMasterService organMasterService;
	
	static Logger log=Logger.getLogger(OrganMasterController.class.getName());
	
	static {
		System.out.println("stateDemoController Loaded...!");
	}
	
	@RequestMapping(value = "/saveOrgan", method = RequestMethod.POST)
	public int saveOrganMast(DdOrganMasterDTO organ, HttpServletRequest request) {
		log.info("In OrganMasterController saveOrganMast()");
		String msg = "";
		int response = organMasterService.saveOrganMaster(organ, request);
		log.debug("Reponse----> "+response);
		return response;
	}
	
	
	@RequestMapping(value = "/getAllOrganMaster", method = RequestMethod.GET)
	public @ResponseBody
	DdOrganMasterDTO getAllOrganMaster(HttpServletRequest request) {
		log.info("In OrganMasterController getAllOrganMaster()");
		List<DdOrganMasterDTO> lstOrganMaster = new ArrayList<DdOrganMasterDTO>();
		lstOrganMaster = organMasterService.getAllOrganMaster(request);
		DdOrganMasterDTO obj = new DdOrganMasterDTO();
		obj.setLstOrganMaster(lstOrganMaster);
		log.debug("Reponse----> "+obj);
		return obj;
	}	
	
	
	@RequestMapping(value = "/deleteOrganMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganMaster(@RequestParam("organ_Id") Integer organ_Id,HttpServletRequest request) {
		log.info("In OrganMasterController deleteOrganMaster()");
		System.out.println("organ_Id :"+organ_Id);
		boolean response = organMasterService.deleteOrganMaster(organ_Id, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Reponse----> "+msg);
		return msg;
	}	
	
	
	@RequestMapping(value = "/editOrganMaster", method = RequestMethod.GET)
	public @ResponseBody
	DdOrganMasterDTO editOrganMaster(@RequestParam("organ_Id") Integer organ_Id) {
		log.info("In OrganMasterController editOrganMaster()");
		DdOrganMasterDTO obj = new DdOrganMasterDTO();
		obj = organMasterService.editOrganMaster(organ_Id);	
		log.debug("Reponse----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/centerOrganAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	DdOrganMasterDTO centerOrganAutoSuggestion(@RequestParam("organName")String organName) {
		log.info("In OrganMasterController centerOrganAutoSuggestion()");
		List<DdOrganMasterDTO> lstOrganMaster = new ArrayList<DdOrganMasterDTO>();
		lstOrganMaster = organMasterService.getAllOrganMasterAutosuggestion(organName);
		DdOrganMasterDTO obj = new DdOrganMasterDTO();
		obj.setLstOrganMaster(lstOrganMaster);
		log.debug("Reponse----> "+obj);
		return obj;
	}
	

}
