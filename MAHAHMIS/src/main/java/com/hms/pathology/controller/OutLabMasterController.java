package com.hms.pathology.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.service.OutLabMasterService;

@RestController
@RequestMapping(value ="/outlabmastercontroller")
public class OutLabMasterController {
	
	static Logger log=Logger.getLogger(OutLabMasterController.class.getName());
	
	@Autowired
	OutLabMasterService outlabservice;
	
	/*******************************************************************************
	 * @author Ajay khandare
	 * @date 09 June 2020
	 * @Code This function is use to autosuggestion for test name.
	 ******************************************************************************/
	@RequestMapping(value = "/autosuggestionfortestname", method = RequestMethod.POST)
	public @ResponseBody SubServiceDto autoSuggestionForTestName(@RequestParam("testname") String testname,HttpServletResponse response) {
		List<SubServiceDto> Listsubservice = new ArrayList<SubServiceDto>();
		Listsubservice = outlabservice.autoSuggestionForTestName(testname);
		SubServiceDto objsubservice = new SubServiceDto();
		objsubservice.setLstSubService(Listsubservice);
		return objsubservice;
	}
	

	/*******************************************************************************
	 * @author Ajay khandare
	 * @date 09 June 2020
	 * @Code This function is use to save OutLab Master test .
	 ******************************************************************************/
	@RequestMapping(value = "/saveoutlabmastermaster1", method = RequestMethod.POST)
	@ResponseBody
	public int saveOutLabMaster(OutLabMasterDto outLabMasterDto,@RequestParam("outlabrGeneralInfoDto") String outlabrGeneralInfoDtoList,
			@RequestParam("outlabContactInfoDto") String outlabContactInfoDtoList,
			@RequestParam("outlabAddressInfoDto") String outlabAddressInfoDtoList, 
			@RequestParam("outlabPaymentInfoDto") String outlabPaymentInfoDtoList, 
			@RequestParam("outlabTermsAndConditionInfoDto") String outlabTermsAndConditionInfoDtoList,@RequestParam("outlabTestInfoDetails") String outlabTestInfoDetails, HttpServletRequest request) {
		 log.info("save labtest..");
		 int status = outlabservice.saveOutLabMaster(outLabMasterDto,
				 outlabrGeneralInfoDtoList,outlabContactInfoDtoList,
				 outlabAddressInfoDtoList,outlabPaymentInfoDtoList,outlabTermsAndConditionInfoDtoList,outlabTestInfoDetails,request);
		 log.debug("reponse  save labtest....."+status);
		 return status;
	}
	
	/*************************************************************************
	 * @author Ajay Khandare
	 * @date 09 June 2020
	 * @comment This method is to get all OutLab Master List
	 ************************************************************************/
	@RequestMapping(value = "/getalloutlabmaster", method = RequestMethod.POST)
	@ResponseBody
	public OutLabMasterDto getAllOutLabMaster() {
		List<OutLabMasterDto> outLabMasterDtoList = new ArrayList<OutLabMasterDto>();
		outLabMasterDtoList = outlabservice.getAllOutLabMaster();
		OutLabMasterDto outlabInfo = new OutLabMasterDto();
		outlabInfo.setOutLabMasterDtoList(outLabMasterDtoList);
		return outlabInfo;
	}

	/*************************************************************************
	 * @author Ajay Khandare
	  * @date 09 June 2020
	 * @comment This method is to delete OutLab Master  Master 
	 ************************************************************************/
	@RequestMapping(value = "/deleteoutlabmasterId", method = RequestMethod.POST)
	public @ResponseBody String deleteOutLabMasterId(@RequestParam("outlabmasterId") Integer outlabmasterId,
			HttpServletRequest request) {
		boolean response = outlabservice.deleteOutLabMasterId(outlabmasterId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/*************************************************************************
	 * @author Ajay Khandare
	 * @since 05-05-2020
	 * @comment This method is to edit OutLab Master byId
	 ************************************************************************/
	@RequestMapping(value = "/editoutlabmasterbyId", method = RequestMethod.GET)
	public @ResponseBody
	OutLabMasterDto editOutLabMasterById(@RequestParam("outlabmasterId") Integer outlabmasterId) {
		OutLabMasterDto obj = new OutLabMasterDto();
		obj = outlabservice.editOutLabMasterById(outlabmasterId);	
		return obj;
	}

	
	/*************************************************************************
	 * @author Ajay Khandare
	 * @since 05-05-2020
	 * @comment This method is to edit OutLab Master byId
	 ************************************************************************/
	@RequestMapping(value = "/deleteoutlabslave", method = RequestMethod.POST)
	@ResponseBody
	public String deleteOutLabMasterSlave(@RequestParam("id") Integer outlabslaveId,@RequestParam("labMasterId") Integer labMasterId,
			@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
		
		log.info("delete OutLab Master Slave..");
		boolean status = outlabservice.deleteOutLabMasterSlave(outlabslaveId, labMasterId, callFrom, request);
		log.debug("reponse  delete OutLab Master Slave......" + status);

		String message = "";
		if (status == true) {
			message = "Records Deleted Successfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}

	@RequestMapping(value = "/outLabMasterAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public OutLabMasterDto outLabMasterAutoSuggestion(@RequestParam("name") String outLabName, HttpServletRequest request) {
		log.info("outLabMasterAutoSuggestion..");
		return outlabservice.outLabMasterAutoSuggestion(outLabName, request);
	}
	
	/*************************************************************************
	 * @author Ajay Khandare
	 * @since 05-05-2020
	 * @comment This method is to edit OutLab Master byId
	 ************************************************************************/
	@RequestMapping(value = "/getOutLabLabMasterById", method = RequestMethod.GET)
	public @ResponseBody
	OutLabMasterDto getOutLabLabMasterById(@RequestParam("id") Integer outlabmasterId, HttpServletRequest request) {
		OutLabMasterDto obj = new OutLabMasterDto();
		obj = outlabservice.getOutLabLabMasterById(outlabmasterId, request);	
		return obj;
	}
	
	@RequestMapping(value = "/getAllOutLabMasterByTestId", method = RequestMethod.GET)
	@ResponseBody
	public OutLabMasterDto getAllOutLabMasterByTestId(@RequestParam("testId") Integer testId) {
		List<OutLabMasterDto> outLabMasterDtoList = new ArrayList<OutLabMasterDto>();
		outLabMasterDtoList = outlabservice.getAllOutLabMasterByTestId(testId);
		OutLabMasterDto outlabInfo = new OutLabMasterDto();
		outlabInfo.setOutLabMasterDtoList(outLabMasterDtoList);
		return outlabInfo;
	}
}