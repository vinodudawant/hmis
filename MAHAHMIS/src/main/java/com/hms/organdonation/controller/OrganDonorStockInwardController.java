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

import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganIssueDto;
import com.hms.organdonation.service.OrganDonorStockInwardService;

@Controller
@RequestMapping(value = "/organDonorStockInward")
public class OrganDonorStockInwardController {

	static Logger log = Logger.getLogger(OrganDonorStockInwardController.class
			.getName());

	@Autowired
	private OrganDonorStockInwardService organDonorStockInwardService;

	@Autowired
	private OrganDonorStockInwardDto organDonorStockInwardDto;
	
	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;

	@RequestMapping(value = "/saveOrganDonorStockInward", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganDonorStockInward(OrganDonorStockInwardDto obj,
			@RequestParam("organDonorId") Integer organDonorId, @RequestParam("treatmentId") Integer treatmentId,@RequestParam("organCollectionId") Integer organCollectionId,
			HttpServletRequest request) {
		
		int status = organDonorStockInwardService.saveOrganDonorStockInward(
				obj, organDonorId,treatmentId,organCollectionId,request);
		return status;
	}

	@RequestMapping(value = "/getAllOrganDonorStockInward", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorStockInwardDto getAllOrganDonorStockInward(HttpServletRequest request,@RequestParam("fromDate")String fromDate,@RequestParam("lastDate")String lastDate) {
		log.info("In OrganDonorStockInwardController getAllOrganDonorStockInward()");
		List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto = new ArrayList<OrganDonorStockInwardDto>();
		OrganDonorStockInwardDto obj = new OrganDonorStockInwardDto();
		lstOrganDonorStockInwardDto = organDonorStockInwardService.getAllOrganDonorStockInward(request,fromDate,lastDate);
		System.out.println("thisbis "+lstOrganDonorStockInwardDto);
		obj.setLstOrganDonorStockInwardDto(lstOrganDonorStockInwardDto);
		log.debug("Response----> " + obj);
		return obj;
	}

	@RequestMapping(value = "/editOrganDonorStockInward", method = RequestMethod.GET)
	public @ResponseBody
	OrganDonorStockInwardDto editOrganDonorStockInward(
			@RequestParam("stockInwardId") Integer stockInwardId) {
		log.info("In OrganDonorStockInwardController editOrganDonorStockInward()");
		OrganDonorStockInwardDto obj=new OrganDonorStockInwardDto();
		obj = organDonorStockInwardService
				.editOrganDonorStockInward(stockInwardId);
		log.error("Response-----> " + obj);
		return obj;
	}

	@RequestMapping(value = "/deleteOrganDonorStockInward", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOrganDonorStockInward(
			@RequestParam("stockInwardId") Integer stockInwardId,
			HttpServletRequest request) {
		log.info("In OrganDonorStockInwardController deleteOrganDonorStockInward()");
		System.out.println("stockInwardId :" + stockInwardId);
		boolean response = organDonorStockInwardService
				.deleteOrganDonorStockInward(stockInwardId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> " + msg);
		return msg;
	}
	
	@RequestMapping(value = "/organDonorStockInwardAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	OrganDonorStockInwardDto organDonorStockInwardAutoSuggestion(@RequestParam("stockInwardId") Integer stockInwardId, @RequestParam("callFrom") String callFrom) {
		log.info("In OrganDonorStockInwardController organDonorStockInwardAutoSuggestion()");
		List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto = new ArrayList<OrganDonorStockInwardDto>();
		OrganDonorStockInwardDto obj = new OrganDonorStockInwardDto();
		lstOrganDonorStockInwardDto = organDonorStockInwardService.organDonorStockInwardAutoSuggestion(stockInwardId,callFrom);
		obj.setLstOrganDonorStockInwardDto(lstOrganDonorStockInwardDto);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganDonorById", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonationRegistrationDto getOrganDonorById(@RequestParam("id") Integer organDonorId,HttpServletRequest request) {
		OrganDonationRegistrationDto obj=new OrganDonationRegistrationDto();
		obj = organDonorStockInwardService.getOrganDonorById(organDonorId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId", method = RequestMethod.GET)
	@ResponseBody
	public OrganDonorCheckupListDto getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(@RequestParam("organDonorId") Integer organDonorId,@RequestParam("checkupListId") Integer checkupListId,@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		OrganDonorCheckupListDto obj=new OrganDonorCheckupListDto();
		obj = organDonorStockInwardService.getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(organDonorId,checkupListId,treatmentId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getContainerList", method = RequestMethod.GET)
	public @ResponseBody
	OrganCollectionDto getContainerList(
			HttpServletRequest request) {
		log.info("In OrganDonorStockInwardController getAllOrganDonorStockInward()");
		List<OrganCollectionDto> lstOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		OrganCollectionDto obj = new OrganCollectionDto();
		lstOrganCollectionDto = organDonorStockInwardService
				.getContainerList(request);
		System.out.println("thisbis "+lstOrganCollectionDto);
		obj.setListOrganCollectionDto(lstOrganCollectionDto);
		log.debug("Response----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganCollectionById", method = RequestMethod.GET)
	@ResponseBody
	public OrganCollectionDto getOrganCollectionById(@RequestParam("organCollectionId") Integer organCollectionId,HttpServletRequest request) {
		OrganCollectionDto obj=new OrganCollectionDto();
		obj = organDonorStockInwardService.getOrganCollectionById(organCollectionId,request);
		return obj;
	}
	
	@RequestMapping(value = "/getOnSelectOrganCollectionById", method = RequestMethod.GET)
	@ResponseBody
	public OrganCollectionDto getOnSelectOrganCollectionById(@RequestParam("organCollectionId") Integer organCollectionId,HttpServletRequest request) {
		OrganCollectionDto obj=new OrganCollectionDto();
		obj = organDonorStockInwardService.getOnSelectOrganCollectionById(organCollectionId,request);
		return obj;
	}
	
	//Added By Annapurna
	@RequestMapping(value = "/getContainerListForOrgan_StockInward", method = RequestMethod.GET)
	@ResponseBody
	public OrganCollectionDto getContainerListForOrgan_StockInward(HttpServletRequest request) {
		
		log.info("In OrganReactionController getContainerListByChckpId()");
		List<OrganCollectionDto> lstOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		OrganCollectionDto obj = new OrganCollectionDto();
		lstOrganCollectionDto = organDonorStockInwardService.getContainerListForOrgan_StockInward(request);
		System.out.println("this is list---> "+lstOrganCollectionDto);
		obj.setListOrganCollectionDto(lstOrganCollectionDto);
		log.debug("Response----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/getOrganContainerNameById", method = RequestMethod.GET)
	@ResponseBody
	public OrganCrossMatchDto getOrganContainerNameById(@RequestParam("id") Integer id,HttpServletRequest request) {
		OrganCrossMatchDto obj=new OrganCrossMatchDto();
		obj = organDonorStockInwardService.getOrganContainerNameById(id,request);
		return obj;
	}

	
}
