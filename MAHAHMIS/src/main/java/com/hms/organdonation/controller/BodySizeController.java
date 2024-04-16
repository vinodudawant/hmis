package com.hms.organdonation.controller;

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

import com.hms.organdonation.dto.BodySizeDto;
import com.hms.organdonation.service.BodySizeService;

@Controller
@RequestMapping(value = "/bodySize")
public class BodySizeController {
	
	static Logger log=Logger.getLogger(SurgeryTechniqueController.class.getName());
	
	@Autowired
	private BodySizeDto bodysizedto;
	
	@Autowired
	private BodySizeService bodysizeservice;
	
	@RequestMapping(value = "/saveBodySize", method = RequestMethod.POST)
	@ResponseBody
	public int saveBodySize(BodySizeDto obj,HttpServletRequest request) {
		int status = bodysizeservice.saveBodySize(obj, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllBodySize", method = RequestMethod.GET)
	public @ResponseBody
	BodySizeDto getAllBodySize(HttpServletRequest request) {
		log.info("In BodySizeController getAllBodySize()");
		List<BodySizeDto> lstBodySizeDto = new ArrayList<BodySizeDto>();
		lstBodySizeDto = bodysizeservice.getAllBodySize(request);
		bodysizedto.setLstBodySizeDto(lstBodySizeDto);
		log.debug("Response----> "+bodysizedto);
		return bodysizedto;
	}	
	
	@RequestMapping(value = "/editBodySize", method = RequestMethod.GET)
	public @ResponseBody
	BodySizeDto editBodySize(@RequestParam("id") Integer bodySizeId) {
		log.info("In BodySizeController editBodySize()");
		bodysizedto = bodysizeservice.editBodySize(bodySizeId);
		log.error("Response-----> "+bodysizedto);
		return bodysizedto;
	}	
	
	
	@RequestMapping(value = "/deleteBodySize", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBodySize(@RequestParam("bodySizeId") Integer bodySizeId,HttpServletRequest request) {
		log.info("In BodySizeController deleteBodySize()");
		System.out.println("bodySizeId :"+bodySizeId);
		boolean response = bodysizeservice.deleteBodySize(bodySizeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}
	
	
	@RequestMapping(value = "/bodySizeAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	BodySizeDto bodySizeAutoSuggestion(@RequestParam("bodySizeName")String bodySizeName) {
		log.info("In BodySizeController bodySizeAutoSuggestion()");
		List<BodySizeDto> lstBodySizeDto = new ArrayList<BodySizeDto>();
		lstBodySizeDto = bodysizeservice.bodySizeAutoSuggestion(bodySizeName);
		try {
		bodysizedto.setLstBodySizeDto(lstBodySizeDto);
		}
		catch(Exception e){
			
			e.printStackTrace();
		}
		log.debug("Response----> "+bodysizedto);
		return bodysizedto;
	}
}
