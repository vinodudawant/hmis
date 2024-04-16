package com.hms.doctordesk.controller;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.PreMasterList;
import com.hms.doctordesk.dto.PrescrptionMasterDto;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.service.PreMasterService;

@Controller
@RequestMapping(value="/prescription")
public class PreMasterController {
	
	@Autowired
	PreMasterService preMasterService;
	
	@RequestMapping(value="/presauto",method=RequestMethod.POST)
	@ResponseBody
	public List<PreMasterList> drugAutoSuggestion(@RequestParam("searchText")String searchText,@RequestParam("callform")String callfrom  ){
		List<PreMasterList> response = preMasterService.getAutoSuggestion(searchText, callfrom);
		return response;
		
	}
	@RequestMapping(value="/strAndUom",method=RequestMethod.POST)
	@ResponseBody
	public List<PreMasterList> getStrAndUomById(@RequestParam("id")int id){
		List<PreMasterList> response = preMasterService.getStrengthAndUom(id);
		return response;
		
	}
	
	@RequestMapping(value="/getRoute",method=RequestMethod.POST)
	@ResponseBody
	public List<RouteMaster> getRoutes(@RequestParam("id")int id){
		List<RouteMaster> response = preMasterService.getRouteName(id);
		return response;
		
	}
	@RequestMapping(value="/savePrescription",method=RequestMethod.POST)
	@ResponseBody
	public String savePrescription(@RequestBody PrescrptionMasterDto prescrptionMasterDto,HttpServletRequest request  ){
		String response = preMasterService.savePrescription(prescrptionMasterDto, request);
		return response;
	}
	@RequestMapping(value="/listOfPresCription",method=RequestMethod.POST)
	@ResponseBody
	public List<PrescrptionMasterDto> getPreList(@RequestParam("treatmentId")int patOrTreatId,@RequestParam("callfrom")String callfrom  ){
		List<PrescrptionMasterDto> response = preMasterService.getPresList(patOrTreatId,callfrom);
		return response;
		
	}
	@RequestMapping(value="/prescriptionById",method=RequestMethod.POST)
	@ResponseBody
	public List<PrescrptionMasterDto> getPreListById(@RequestParam("id")int id  ){
		List<PrescrptionMasterDto> response = preMasterService.getPrescriptionById(id);
		return response;
		
	}
	@RequestMapping(value="/deletePrescription",method=RequestMethod.POST)
	@ResponseBody
	public String deletePrescription(@RequestParam("id")int id ,HttpServletRequest request  ){
		String response = preMasterService.deletePrecription(id, request);
		return response;
	}
}
