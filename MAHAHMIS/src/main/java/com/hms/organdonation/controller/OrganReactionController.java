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

import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorConsentFormDto;
import com.hms.organdonation.dto.OrganReactionDto;
import com.hms.organdonation.service.OrganCollectionService;
import com.hms.organdonation.service.OrganReactionService;

@Controller
@RequestMapping(value = "/organReaction")
public class OrganReactionController {
	
static Logger log = Logger.getLogger(OrganReactionController.class.getName());

@Autowired
OrganReactionService organReactionService;	
	
	@RequestMapping(value = "/searchDonorFromCheckList", method = RequestMethod.POST)
	@ResponseBody
	public OrganDonorCheckupListDto searchDonorFromCheckList(@RequestParam("findText") String findText, @RequestParam("callFrom") String callFrom) {
		 
		System.out.println("---searchDonorFromCheckList---controller--");
		
		OrganDonorCheckupListDto oDTO = new OrganDonorCheckupListDto();
		
		List<OrganDonorCheckupListDto> listCheckupList = new ArrayList<OrganDonorCheckupListDto>();
		listCheckupList = organReactionService.searchDonorFromCheckList(findText, callFrom);
		
		System.out.println("---searchDonorFromCheckList---controller-- listCheckupList " + listCheckupList);
		oDTO.setLstOrganDonorCheckupListDto(listCheckupList);
		return oDTO;
	}
	
	@RequestMapping(value = "/getContainerListByChckpId", method = RequestMethod.GET)
	@ResponseBody
	public OrganCollectionDto getContainerListByChckpId(@RequestParam("checkupListId") Integer checkupListId, HttpServletRequest request) {
		
		log.info("In OrganReactionController getContainerListByChckpId()");
		List<OrganCollectionDto> lstOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		OrganCollectionDto obj = new OrganCollectionDto();
		lstOrganCollectionDto = organReactionService.getContainerListByChckpId(checkupListId, request);
		System.out.println("this is list---> "+lstOrganCollectionDto);
		obj.setListOrganCollectionDto(lstOrganCollectionDto);
		log.debug("Response----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/saveOrganReaction", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrganReaction(OrganReactionDto obj,
									@RequestParam("organCollectionId") Integer organCollectionId,
									@RequestParam("organDonorId") Integer organDonorId,
									@RequestParam("treatmentId") Integer treatmentId,
									@RequestParam("checkupListId") Integer checkupListId,
									HttpServletRequest request) {
		
		int status = organReactionService.saveOrganReaction(obj, organCollectionId, organDonorId, treatmentId, checkupListId, request);
		return status;
	}
	
	@RequestMapping(value = "/getAllOrganReactions", method = RequestMethod.GET)
	@ResponseBody
	public OrganReactionDto getAllOrganReactions(HttpServletRequest request,@RequestParam("fromDate") String fromDate,@RequestParam("lastDate") String lastDate) {
		
		log.info("In OrganReactionController getContainerListByChckpId()");
		List<OrganReactionDto> listOrganReactionDto = new ArrayList<OrganReactionDto>();
		OrganReactionDto obj = new OrganReactionDto();
		listOrganReactionDto = organReactionService.getAllOrganReactions(request,fromDate,lastDate);
		System.out.println("this is organ reaction list ::  " + listOrganReactionDto);
		obj.setListOrganReactionDto(listOrganReactionDto);
		log.debug("Response----> " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/editDonorReactions", method = RequestMethod.GET)
	@ResponseBody
	public OrganReactionDto editDonorReactions(@RequestParam("organReactionId") Integer organReactionId,HttpServletRequest request) {
		
		System.out.println("OrganReactionController : editOrganDonor() for organDonorId : " + organReactionId);
		
		OrganReactionDto obj=new OrganReactionDto();
		obj = organReactionService.editDonorReactions(organReactionId,request);
		
		System.out.println("OrganReactionController : editDonorReactions OBJECT : " + obj);
		return obj;
	}
	
	@RequestMapping(value = "/getContainerListNew", method = RequestMethod.GET)
	@ResponseBody
	public OrganCollectionDto getContainerListNew(HttpServletRequest request) {
		
		log.info("In OrganReactionController getContainerListByChckpId()");
		List<OrganCollectionDto> lstOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		OrganCollectionDto obj = new OrganCollectionDto();
		lstOrganCollectionDto = organReactionService.getContainerListNew(request);
		System.out.println("this is list---> "+lstOrganCollectionDto);
		obj.setListOrganCollectionDto(lstOrganCollectionDto);
		log.debug("Response----> " + obj);
		return obj;
	}


// Added By Annapurna fetching organreaction search by id
@RequestMapping(value = "/organReactionAutoSuggestion", method = RequestMethod.POST)
@ResponseBody
public OrganReactionDto organReactionAutoSuggestion(HttpServletRequest request,@RequestParam("organReactionId") Integer organReactionId, @RequestParam("callFrom") String callFrom) {
	log.info("In OrganReactionController getContainerListByChckpId()");
	OrganReactionDto organReactionDto = new OrganReactionDto();
	List<OrganReactionDto> listOrganReactionDto = new ArrayList<OrganReactionDto>();
	listOrganReactionDto = organReactionService.organReactionAutoSuggestion(request,organReactionId, callFrom);
	organReactionDto.setListOrganReactionDto(listOrganReactionDto);
	//System.out.println("this is organ reaction ::  " + listOrganReactionDto);
	log.debug("Response----> " + organReactionDto);
	return organReactionDto;
 }

// Added By Annapurna
@RequestMapping(value = "/getOrganReactionById", method = RequestMethod.GET)
public @ResponseBody
OrganReactionDto getOrganReactionById(@RequestParam("organReactionId") Integer organReactionId) {
	
	log.info("In OrganCollectionController getOrganReactionById()");
	OrganReactionDto obj = new OrganReactionDto();
	obj = organReactionService.getOrganReactionById(organReactionId);
	
	log.error("Response-----> " + obj);
	return obj;
}
//Added By Annapurna
@RequestMapping(value = "/getContainerListfororgan_reaction", method = RequestMethod.GET)
@ResponseBody
public OrganCollectionDto getContainerListfororgan_reaction(HttpServletRequest request) {
	
	log.info("In OrganReactionController getContainerListByChckpId()");
	List<OrganCollectionDto> lstOrganCollectionDto = new ArrayList<OrganCollectionDto>();
	OrganCollectionDto obj = new OrganCollectionDto();
	lstOrganCollectionDto = organReactionService.getContainerListfororgan_reaction(request);
	System.out.println("this is list---> "+lstOrganCollectionDto);
	obj.setListOrganCollectionDto(lstOrganCollectionDto);
	log.debug("Response----> " + obj);
	return obj;
}

}

