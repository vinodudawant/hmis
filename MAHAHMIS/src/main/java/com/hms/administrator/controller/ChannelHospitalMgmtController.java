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

import com.hms.administrator.dto.HospitalDetailsDTO;
import com.hms.administrator.service.ChannelHospitalMgmtService;

@Controller 
@RequestMapping(value="/admin")
public class ChannelHospitalMgmtController {
	static Logger log=Logger.getLogger(ChannelHospitalMgmtController.class.getName());
	
	@Autowired
	ChannelHospitalMgmtService hservice;
	
	@RequestMapping(value = "/savehospitaldetails", method = RequestMethod.POST)
	@ResponseBody
	public int saveHospitaldetails(HospitalDetailsDTO hobj,HttpServletRequest request) {
		log.info("saveHospitaldetails..");

		int response = hservice.saveHospitaldetails(hobj, request);
	      log.debug("saveHospitaldetails....."+response);

		return response;	
	}
	
	@RequestMapping(value = "/setexistinghospitaltemp", method = RequestMethod.GET)
	public @ResponseBody
	HospitalDetailsDTO setExistingHospitalTemp(@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("setExistingHospitalTemp..");

		List<HospitalDetailsDTO> lsthospital = new ArrayList<HospitalDetailsDTO>();
		lsthospital = hservice.setExistingHospitalTemp(unitId, request);
	      log.debug("setExistingHospitalTemp....."+lsthospital);
	      HospitalDetailsDTO obj = new HospitalDetailsDTO();
		obj.setHospitalDetailsDTOList(lsthospital);
		return obj;
	}
	
	@RequestMapping(value = "/editchannelhospitalmgmt", method = RequestMethod.GET)
	public @ResponseBody
	HospitalDetailsDTO editChannelHospitalMgmt(@RequestParam("hosId") Integer hosId) {
		log.info("editChannelHospitalMgmt..");
		HospitalDetailsDTO obj = new HospitalDetailsDTO();
		obj = hservice.editChannelHospitalMgmt(hosId);
		 log.debug("editChannelHospitalMgmt....."+obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/deletechannelhospitalmgmt", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChannelHospitalMgmt(@RequestParam("hosId") Integer hosId,HttpServletRequest request) {
		log.info("deleteChannelHospitalMgmt..");
		boolean response = hservice.deleteChannelHospitalMgmt(hosId, request);
	      log.debug("deleteChannelHospitalMgmt....."+response);

				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network Issue";
		}
		return msg;
	}
	
	
	
	@RequestMapping(value = "/channelhospitalautosuggestion", method = RequestMethod.GET)
	public @ResponseBody
	HospitalDetailsDTO channelHospitalAutoSuggestion(@RequestParam("hospitalName") String hospitalName,@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("channelHospitalAutoSuggestion..");

		List<HospitalDetailsDTO> lsthospital = new ArrayList<HospitalDetailsDTO>();
		lsthospital = hservice.channelHospitalAutoSuggestion(hospitalName, unitId);
	      log.debug("channelHospitalAutoSuggestion....."+lsthospital);
	      HospitalDetailsDTO obj = new HospitalDetailsDTO();
		obj.setHospitalDetailsDTOList(lsthospital);
		return obj;
	}	


}
