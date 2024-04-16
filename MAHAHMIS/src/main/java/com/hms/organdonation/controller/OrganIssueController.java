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
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganIssueDto;
import com.hms.organdonation.service.OrganIssueService;

@Controller
@RequestMapping(value = "/organIssue")
public class OrganIssueController {
	
	static Logger log = Logger.getLogger(OrganIssueController.class.getName());
	
	@Autowired
	private OrganIssueService organIssueService;
	
	@Autowired
	private OrganIssueDto organIssueDto;
	
	@Autowired
	private RegistrationDto obj;
	
	@RequestMapping(value = "/saveOrganIssue", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganIssue(OrganIssueDto obj,@RequestParam("crossMatchId") Integer crossMatchId,@RequestParam("requesterId") Integer requesterId, @RequestParam("organId") Integer organId,@RequestParam("stockInwardId") Integer stockInwardId,HttpServletRequest request) {
		int status = organIssueService.saveOrganIssue(obj, crossMatchId,requesterId,organId,stockInwardId,request);
		return status;
	}
	
	@RequestMapping(value = "/editOrganIssue", method = RequestMethod.GET)
	public @ResponseBody
	OrganIssueDto editOrganIssue(@RequestParam("organIssueId") Integer organIssueId, HttpServletRequest request) {
		
		log.info("In OrganIssueController editOrganIssue()");
		organIssueDto = organIssueService.editOrganIssue(organIssueId, request);

		return organIssueDto;
	}
	
	@RequestMapping(value = "/deleteOrganIssue", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganIssue(@RequestParam("organIssueId") Integer organIssueId, HttpServletRequest request) {
		
		log.info("In OrganIssueController deleteOrganIssue()");
		boolean response = organIssueService.deleteOrganIssue(organIssueId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/issueAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OrganIssueDto issueAutoSuggestion(@RequestParam("organIssueId") Integer organIssueId, @RequestParam("callFrom") String callFrom) {
		OrganIssueDto organIssueDto = new OrganIssueDto();
		List<OrganIssueDto> listOrganIssueDto = new ArrayList<OrganIssueDto>();
		listOrganIssueDto = organIssueService.issueAutoSuggestion(organIssueId, callFrom);
		organIssueDto.setListOrganIssueDto(listOrganIssueDto);
		return organIssueDto;
	}
	
	@RequestMapping(value = "/getAllOrganIssueList", method = RequestMethod.GET)
	@ResponseBody
	public OrganIssueDto getAllOrganIssueList(HttpServletRequest request,@RequestParam("fromDate")String fromDate,@RequestParam("lastDate")String lastDate) {
		try {
			List<OrganIssueDto> listOrganIssueDto = new ArrayList<OrganIssueDto>();
			listOrganIssueDto = organIssueService.getAllOrganIssueList(request,fromDate,lastDate);
			organIssueDto.setListOrganIssueDto(listOrganIssueDto);
			return organIssueDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organIssueDto;
		
	}
	@RequestMapping(value = "/getOrganCrossMatchById", method = RequestMethod.GET)
	public @ResponseBody
	OrganCrossMatchDto getOrganCrossMatchById(@RequestParam("requesterId") Integer requesterId, HttpServletRequest request) {
		OrganCrossMatchDto objNew =new  OrganCrossMatchDto();
		log.info("In OrganIssueController editOrganIssue()");
		objNew = organIssueService.getOrganCrossMatchById(requesterId, request);

		return objNew;
	}
	
	@RequestMapping(value = "/getAllOrganContainerList", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonorStockInwardDto getAllOrganContainerList(@RequestParam("organId") Integer organId,HttpServletRequest request) {
		OrganDonorStockInwardDto organDonorStockInwardDto = new OrganDonorStockInwardDto();
		try {
			List<OrganDonorStockInwardDto> listOrganDonorStockInwardDto = new ArrayList<OrganDonorStockInwardDto>();
			
			listOrganDonorStockInwardDto = organIssueService.getAllOrganContainerList(organId,request);
			organDonorStockInwardDto.setLstOrganDonorStockInwardDto(listOrganDonorStockInwardDto);
			return organDonorStockInwardDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organDonorStockInwardDto;
		
	}
	
	
}
