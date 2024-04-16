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
import org.springframework.web.multipart.MultipartFile;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.service.OrganCrossMatchService;

@Controller
@RequestMapping(value = "/organCrossMatch")
public class OrganCrossMatchController {
	
	static Logger log = Logger.getLogger(OrganCrossMatchController.class.getName());
	
	@Autowired
	private OrganCrossMatchService organCrossMatchService;
	
	@Autowired
	private OrganCrossMatchDto organCrossMatchDto;
	
	@Autowired
	private RegistrationDto obj;
	
	@RequestMapping(value = "/saveOrganCrossMatch", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganCrossMatch(OrganCrossMatchDto obj,
			@RequestParam("patientId") Integer patientId,
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("organId") Integer organId,
			@RequestParam("stockInwardId") Integer stockInwardId,
			@RequestParam("requestId") Integer requestId, @RequestParam("testResultDocumentName") MultipartFile[]  testResultDocument,
			HttpServletRequest request) {
		int status = organCrossMatchService.saveOrganCrossMatch(obj, patientId,
				treatmentId,organId,stockInwardId,requestId,testResultDocument,request);
		return status;
	}
	
	@RequestMapping(value = "/editOrganCrossMatch", method = RequestMethod.GET)
	public @ResponseBody
	OrganCrossMatchDto editOrganCrossMatch(@RequestParam("organCrossMatchId") Integer organCrossMatchId, HttpServletRequest request) {
		
		log.info("In OrganCrossMatchController editOrganCrossMatch()");
		organCrossMatchDto = organCrossMatchService.editOrganCrossMatch(organCrossMatchId, request);

		return organCrossMatchDto;
	}
	
	@RequestMapping(value = "/deleteOrganCrossMatch", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganCrossMatch(@RequestParam("organCrossMatchId") Integer organCrossMatchId, HttpServletRequest request) {
		
		log.info("In OrganCrossMatchController deleteOrganCrossMatch()");
		boolean response = organCrossMatchService.deleteOrganCrossMatch(organCrossMatchId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/crossMatchAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OrganCrossMatchDto crossMatchAutoSuggestion(@RequestParam("organCrossMatchId") Integer organCrossMatchId, @RequestParam("callFrom") String callFrom) {
		OrganCrossMatchDto organCrossMatchDto = new OrganCrossMatchDto();
		List<OrganCrossMatchDto> listOrganCrossMatchDto = new ArrayList<OrganCrossMatchDto>();
		listOrganCrossMatchDto = organCrossMatchService.crossMatchAutoSuggestion(organCrossMatchId, callFrom);
		organCrossMatchDto.setListOrganCrossMatchDto(listOrganCrossMatchDto);
		return organCrossMatchDto;
	}
	
	@RequestMapping(value = "/getAllOrganCrossMatchList", method = RequestMethod.GET)
	@ResponseBody
	public OrganCrossMatchDto getAllOrganCrossMatchList(HttpServletRequest request,@RequestParam("fromDate")String fromDate,@RequestParam("lastDate")String lastDate) {
		OrganCrossMatchDto obj = new OrganCrossMatchDto();
		try {
			List<OrganCrossMatchDto> listOrganCrossMatchDto = new ArrayList<OrganCrossMatchDto>();
		
			listOrganCrossMatchDto = organCrossMatchService.getAllOrganCrossMatchList(request,fromDate,lastDate);
			obj.setListOrganCrossMatchDto(listOrganCrossMatchDto);
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
		
	}
}
