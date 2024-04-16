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

import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dto.OrganRequestDto;
import com.hms.organdonation.service.OrganRequestService;

@Controller
@RequestMapping(value = "/organRequest")
public class OrganRequestController {
	
	static Logger log = Logger.getLogger(OrganRequestController.class.getName());
	
	@Autowired
	private OrganRequestService organRequestService;
	
	@Autowired
	private OrganRequestDto organRequestDto;
	
	@Autowired
	private RegistrationDto obj;
	
	@RequestMapping(value = "/saveOrganRequest", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganRequest(OrganRequestDto obj,@RequestParam("patientId") Integer patientId,@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		int status = organRequestService.saveOrganRequest(obj, patientId,treatmentId,request);
		return status;
	}
	
	@RequestMapping(value = "/editOrganRequest", method = RequestMethod.GET)
	public @ResponseBody
	OrganRequestDto editOrganRequest(@RequestParam("organRequestId") Integer organRequestId, HttpServletRequest request) {
		
		log.info("In OrganRequestController editOrganRequest()");
		organRequestDto = organRequestService.editOrganRequest(organRequestId, request);

		return organRequestDto;
	}
	
	@RequestMapping(value = "/deleteOrganRequest", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganRequest(@RequestParam("organRequestId") Integer organRequestId, HttpServletRequest request) {
		
		log.info("In OrganRequestController deleteOrganRequest()");
		boolean response = organRequestService.deleteOrganRequest(organRequestId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/requestAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OrganRequestDto requestAutoSuggestion(@RequestParam("organRequestId") Integer organRequestId, @RequestParam("callFrom") String callFrom) {
		OrganRequestDto organRequestDto = new OrganRequestDto();
		List<OrganRequestDto> listOrganRequestDto = new ArrayList<OrganRequestDto>();
		listOrganRequestDto = organRequestService.requestAutoSuggestion(organRequestId, callFrom);
		organRequestDto.setListOrganRequestDto(listOrganRequestDto);
		return organRequestDto;
	}
	
	@RequestMapping(value = "/getAllOrganRequestList", method = RequestMethod.GET)
	@ResponseBody
	public OrganRequestDto getAllOrganRequestList(HttpServletRequest request,@RequestParam("fromDate")String fromDate,@RequestParam("lastDate")String lastDate) {
		try {
			List<OrganRequestDto> listOrganRequestDto = new ArrayList<OrganRequestDto>();
			listOrganRequestDto = organRequestService.getAllOrganRequestList(request,fromDate,lastDate);
			organRequestDto.setListOrganRequestDto(listOrganRequestDto);
			return organRequestDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organRequestDto;
		
	}
	
	@RequestMapping(value = "/getPatientDetailsWithMaxTreatmentId", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationDto getPatientDetailsWithMaxTreatmentId(@RequestParam("patientId") Integer patientId, HttpServletRequest request) {
		obj = organRequestService.getPatientDetailsWithMaxTreatmentId(patientId, request);
		return obj;
	}
	
}
