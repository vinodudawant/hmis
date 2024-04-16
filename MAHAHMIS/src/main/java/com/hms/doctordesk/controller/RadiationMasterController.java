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
import com.hms.doctordesk.dto.RadiationDto;
import com.hms.doctordesk.service.RadiationMasterService;


@RestController
@RequestMapping(value="/radiation_master")
public class RadiationMasterController {
	
	static Logger log=Logger.getLogger(RadiationMasterController.class.getName());
	
	@Autowired
	RadiationMasterService radiationService;
	
	static {
		System.out.println("stateDemoController Loaded...!");
	}
	@RequestMapping(value = "/getAllRadiationMaster", method = RequestMethod.GET)
	public @ResponseBody
	RadiationDto getAllRadiationMaster(HttpServletRequest request) {
		log.info("In RadiationMasterController getAllRadiationMaster()");
		List<RadiationDto> lstRadiationMaster = new ArrayList<RadiationDto>();
		lstRadiationMaster = radiationService.getAllRadiationMaster();
		RadiationDto obj = new RadiationDto();
		obj.setLstradiationMaster(lstRadiationMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/saveRadiationMaster", method = RequestMethod.POST)
	public int saveRadiationMaster(RadiationDto radio, HttpServletRequest request) {
		log.info("In RadiationMasterController saveRadiationMaster()");
		//System.out.println(radio);
		//String msg = "";
		int response = radiationService.saveRadiationMaster(radio, request);
		log.debug("Response----->"+response);
		return response;
	}
	@RequestMapping(value = "/editRadiationMaster", method = RequestMethod.GET)
	public @ResponseBody
	RadiationDto editRadiationMaster(@RequestParam("radiationId") Integer radiationId) {
		log.info("In RadiationMasterController editRadiationMaster()");
		RadiationDto obj = new RadiationDto();
		obj = radiationService.editRadiationMaster(radiationId);
		log.debug("Response---> "+obj);
		return obj;
	}
	@RequestMapping(value = "/deleteRadiationMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteRadiationMaster(@RequestParam("radiationId") Integer radiationId,HttpServletRequest request) {
		log.info("In RadiationMasterController deleteRadiationMaster()");
		System.out.println("radiationId :"+radiationId);
		boolean response = radiationService.deleteRadiationMaster(radiationId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response----> "+msg);
		return msg;
	}	
	@RequestMapping(value = "/centerRadiationutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	RadiationDto centerRadiationutoSuggestion(@RequestParam("radiationName")String radiationName) {
		log.info("In RadiationMasterController centerRadiationutoSuggestion()");
		List<RadiationDto> lstRadiaionMaster = new ArrayList<RadiationDto>();
		lstRadiaionMaster = radiationService.getAllRadiationMasterAutosuggestion(radiationName);
		RadiationDto obj = new RadiationDto();
		obj.setLstradiationMaster(lstRadiaionMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	@RequestMapping(value = "/getNextRadiationMasterID", method = RequestMethod.GET)
	public @ResponseBody
	String getNextRadiationMasterID(HttpServletRequest request){
		log.info("In RadiationMasterController getNextRadiationMasterID()");
		String obj = radiationService.getNextRadiationMasterID();
		log.debug("Response-----> "+obj);
		return obj;
	}

	

}
