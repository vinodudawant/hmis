package com.hms.inventory.controller;

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

import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.service.PartyMasterService;

@Controller
@RequestMapping(value = "/invPartyMaster")
public class PartyMasterController {
	static Logger log=Logger.getLogger(PartyMasterController.class.getName());
	@Autowired
	private PartyMasterService partyMasterService;

	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for save document master details
	 */
	@RequestMapping(value = "/savePartyMaster", method = RequestMethod.POST)
	@ResponseBody
	public int savePartyMaster(
			PartyMasterDto partyMasterDto,@RequestParam("partyMasterGeneralInfoDtoList") String partyMasterGeneralInfoDtoList,
			@RequestParam("partyMasterContactInfoDtoList") String partyMasterContactInfoDtoList,
			@RequestParam("partyMasterAddressInfoDtoList") String partyMasterAddressInfoDtoList, 
			@RequestParam("partyMasterPaymentInfoDtoList") String partyMasterPaymentInfoDtoList, 
			@RequestParam("partyMasterTermsAndConditionInfoDtoList") String partyMasterTermsAndConditionInfoDtoList, HttpServletRequest request) {
		log.info("savePartyMaster..");
		int status = partyMasterService.savePartyMaster(partyMasterDto,
				partyMasterGeneralInfoDtoList, partyMasterContactInfoDtoList,
				partyMasterAddressInfoDtoList, partyMasterPaymentInfoDtoList, partyMasterTermsAndConditionInfoDtoList, request);
		 log.debug("reponse  savePartyMaster....."+status);
		return status;
	}

	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all document master details
	 */
	@RequestMapping(value = "/getAllPartyMaster", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterDto getAllPartyMaster(HttpServletRequest request,@RequestParam("unitId") Integer unitId) {
		List<PartyMasterDto> partyMasterDtoDtoList = new ArrayList<PartyMasterDto>();
		Integer count = partyMasterService.getPageCountAllPartyMaster();
		log.info("getAllPartyMaster..");
		partyMasterDtoDtoList = partyMasterService.getAllPartyMaster(request,unitId);
		 log.debug("reponse  getAllPartyMaster....."+partyMasterDtoDtoList);
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		partyMasterDto.setPartyMasterDto(partyMasterDtoDtoList);
		partyMasterDto.setNoOfPages(count);
		return partyMasterDto;
	}

	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for edit hospital Details
	 */
	@RequestMapping(value = "/editPartyMaster", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterDto editPartyMaster(
			@RequestParam("id") Integer partyMasterId) {
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		log.info("editPartyMaster..");
		partyMasterDto = partyMasterService.editPartyMaster(partyMasterId);
		 log.debug("reponse  editPartyMaster....."+partyMasterDto);
		return partyMasterDto;
	}

	/**
	 * @since 24-10-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for delete party master Details
	 */
	@RequestMapping(value = "/deletePartyMaster", method = RequestMethod.POST)
	@ResponseBody
	public String deletePartyMaster(
			@RequestParam("id") Integer partyMasterId,
			HttpServletRequest request) {
		log.info("deletePartyMaster..");
		boolean status = partyMasterService.deletePartyMaster(partyMasterId,
				request);
		 log.debug("reponse  deletePartyMaster....."+status);
		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}

	/**
	 * @since 04-11-2019
	 * @author Vishnu Thorat
	 * @codeFor below method is created for auto suggest while party master
	 *          search details
	 */
	@RequestMapping(value = "/partyMasterAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public PartyMasterDto partyMasterAutoSuggestion(
			@RequestParam("name") String partyMasterName) {
		log.info("partyMasterAutoSuggestion..");

		return partyMasterService.partyMasterAutoSuggestion(partyMasterName);
		
	}

	@RequestMapping(value = "/getPartyMasterById", method = RequestMethod.GET)
	@ResponseBody
	public PartyMasterDto getPartyMasterById(
			@RequestParam("id") Integer partyMasterId) {
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		log.info("getPartyMasterById..");
		partyMasterDto = partyMasterService.getPartyMasterById(partyMasterId);
		 log.debug("reponse  getPartyMasterById....."+partyMasterDto);
		return partyMasterDto;
	}
	
	@RequestMapping(value = "/deletePartyMasterSlave", method = RequestMethod.POST)
	@ResponseBody
	public String deletePartyMasterSlave(
			@RequestParam("id") Integer partyMasterSlaveId,@RequestParam("partyMasterId")Integer partyMasterId,@RequestParam("callFrom")String callFrom,
			HttpServletRequest request) {
		log.info("deletePartyMasterSlave..");
		boolean status = partyMasterService.deletePartyMasterSlave(partyMasterSlaveId,partyMasterId, callFrom,
				request);
		 log.debug("reponse  deletePartyMasterSlave....."+status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}

}
