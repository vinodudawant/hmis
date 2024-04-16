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
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganStockDiscardDto;
import com.hms.organdonation.service.OrganStockDiscardService;

@Controller
@RequestMapping(value = "/organStockDiscard")
public class OrganStockDiscardController {
	
	static Logger log = Logger.getLogger(OrganStockDiscardController.class.getName());
	
	@Autowired
	private OrganStockDiscardService organStockDiscardService;
	
	@Autowired
	private OrganStockDiscardDto organStockDiscardDto;
	
	@Autowired
	private RegistrationDto obj;
	
	@RequestMapping(value = "/saveOrganStockDiscard", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganStockDiscard(OrganStockDiscardDto obj,@RequestParam("organDonorId") Integer organDonorId,@RequestParam("organCollectionId") Integer organCollectionId,@RequestParam("organTreatmentId") Integer organTreatmentId,@RequestParam("stockInwardId") Integer stockInwardId, HttpServletRequest request) {
		int status = organStockDiscardService.saveOrganStockDiscard(obj, organDonorId,organCollectionId,organTreatmentId,stockInwardId,request);
		return status;
	}
	
	@RequestMapping(value = "/editOrganStockDiscard", method = RequestMethod.GET)
	public @ResponseBody
	OrganStockDiscardDto editOrganStockDiscard(@RequestParam("organStockDiscardId") Integer organStockDiscardId, HttpServletRequest request) {
		
		log.info("In OrganStockDiscardController editOrganStockDiscard()");
		organStockDiscardDto = organStockDiscardService.editOrganStockDiscard(organStockDiscardId, request);

		return organStockDiscardDto;
	}
	
	@RequestMapping(value = "/deleteOrganStockDiscard", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganStockDiscard(@RequestParam("organStockDiscardId") Integer organStockDiscardId, HttpServletRequest request) {
		
		log.info("In OrganStockDiscardController deleteOrganStockDiscard()");
		boolean response = organStockDiscardService.deleteOrganStockDiscard(organStockDiscardId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/stockDiscardAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OrganStockDiscardDto StockDiscardAutoSuggestion(@RequestParam("organStockDiscardId") Integer organStockDiscardId, @RequestParam("callFrom") String callFrom) {
		OrganStockDiscardDto organStockDiscardDto = new OrganStockDiscardDto();
		List<OrganStockDiscardDto> listOrganStockDiscardDto = new ArrayList<OrganStockDiscardDto>();
		listOrganStockDiscardDto = organStockDiscardService.stockDiscardAutoSuggestion(organStockDiscardId, callFrom);
		organStockDiscardDto.setLstOrganStockDiscardDto(listOrganStockDiscardDto);
		return organStockDiscardDto;
	}
	
	@RequestMapping(value = "/getAllOrganStockDiscardList", method = RequestMethod.GET)
	@ResponseBody
	public OrganStockDiscardDto getAllOrganStockDiscardList(HttpServletRequest request,@RequestParam("fromDate")String fromDate,@RequestParam("lastDate")String lastDate) {
		try {
			List<OrganStockDiscardDto> listOrganStockDiscardDto = new ArrayList<OrganStockDiscardDto>();
			listOrganStockDiscardDto = organStockDiscardService.getAllOrganStockDiscardList(request,fromDate,lastDate);
			organStockDiscardDto.setLstOrganStockDiscardDto(listOrganStockDiscardDto);
			return organStockDiscardDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organStockDiscardDto;
		
	}
	
	@RequestMapping(value = "/getContainerList", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorStockInwardDto getContainerList(
			HttpServletRequest request) {
		log.info("In OrganDonorStockInwardController getAllOrganDonorStockInward()");
		List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto = new ArrayList<OrganDonorStockInwardDto>();
		OrganDonorStockInwardDto obj = new OrganDonorStockInwardDto();
		lstOrganDonorStockInwardDto = organStockDiscardService
				.getContainerList(request);
		System.out.println("thisbis "+lstOrganDonorStockInwardDto);
		obj.setLstOrganDonorStockInwardDto(lstOrganDonorStockInwardDto);
		log.debug("Response----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganDonorStockInwardById", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorStockInwardDto getOrganDonorStockInwardById(
			@RequestParam("stockInwardId") Integer stockInwardId,HttpServletRequest request) {
		log.info("In OrganDonorStockInwardController editOrganDonorStockInward()");
		OrganDonorStockInwardDto obj=new OrganDonorStockInwardDto();
		obj = organStockDiscardService
				.getOrganDonorStockInwardById(stockInwardId,request);
		log.error("Response-----> " + obj);
		return obj;
	}
	
}
