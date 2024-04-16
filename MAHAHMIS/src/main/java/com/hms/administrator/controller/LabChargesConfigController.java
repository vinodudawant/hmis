package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.BusinessCustMasterDto;
import com.hms.administrator.dto.LabChargesConfigurationDto;
import com.hms.administrator.dto.LabChargesConfigurationViewDto;
import com.hms.administrator.dto.LabConfigureServicesViewDto;
import com.hms.administrator.service.LabChargesConfigService;
import com.hms.ehat.dto.ConfigCombinationDto;
import com.hms.ehat.dto.ConfigHallWiseDto;
import com.hms.ehat.dto.ConfigSponsorDto;
import com.hms.ehat.dto.ConfigurByChargesandByHallDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.ConfigurationChargesViewDto;

@Controller
@RequestMapping(value = "/labchargesconfig")
public class LabChargesConfigController {

	@Autowired
	LabChargesConfigService configServiceService;

	@RequestMapping(value = "/saveConfiguration", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateConfigService(
			LabChargesConfigurationDto configurServicesDto,
			HttpServletRequest request,
			@RequestParam(value = "configurationDetails") String configurationlist,
			@RequestParam Integer configId,
			@RequestParam("queryType") String queryType,
			
			@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("masterId") Integer masterId,
			@RequestParam("HallId") Integer HallId,
			@RequestParam("HallSlaveId") Integer HallSlaveId,
			@RequestParam("hallCharges") double hallCharges,
			@RequestParam("medicalCharges") double medicalCharges,
			@RequestParam("isComServId") Integer isComServId,
			@RequestParam("isComServlastId") Integer isComServlastId,
			@RequestParam("unitId") Integer unitId) {
		
		int response = configServiceService.saveOrUpdateConfigServiceUnitWise(
				configurServicesDto, request, configurationlist, configId,
				queryType, chargesId, chargesSlaveId, masterId,
				HallId, HallSlaveId, hallCharges, medicalCharges, isComServId,isComServlastId, unitId);
		
		return ((response == 1) ? "Saved Successfully"
				: ((response == 2) ? "Updated Successfully"
						: "Network Error!!!"));
	}

	@RequestMapping(value = "/getConfigurationListFromView", method = RequestMethod.POST)
	public @ResponseBody
	LabChargesConfigurationViewDto getConfigurationListFromView(@RequestParam("letter") String letter,@RequestParam("callfrom") String callfrom) {
		List<LabChargesConfigurationViewDto> ltConfigurationFromView = new ArrayList<LabChargesConfigurationViewDto>();
		ltConfigurationFromView = configServiceService.getConfigurationListFromView(letter,callfrom);
		LabChargesConfigurationViewDto obj = new LabChargesConfigurationViewDto();
		obj.setLstConfigurations(ltConfigurationFromView);
		return obj;
	}
	
	@RequestMapping(value = "/deleteConfigurationList", method = RequestMethod.POST)
	public @ResponseBody
	String deleteConfigurationList(
			@RequestParam("idConfiguration") Integer idConfiguration,
			@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			HttpServletRequest request,
			@RequestParam("hallId") Integer hallId, 
			@RequestParam("hallSlaveId") Integer hallSlaveId,
			@RequestParam("isComServId") Integer isComServId, 
			@RequestParam("isComServlastId") Integer isComServlastId) {

		boolean response = configServiceService.deleteConfigurationList(
				idConfiguration, chargesId, chargesSlaveId, request, hallId, hallSlaveId, isComServId, isComServlastId);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	@RequestMapping(value = "/getConfigurationListFromViewForSub", method = RequestMethod.POST)
	public @ResponseBody
	LabConfigureServicesViewDto getConfigurationListFromViewForSub(@RequestParam("chargesId") Integer chargesId, 
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("hallId") Integer hallId, 
			@RequestParam("hallSlaveId") Integer hallSlaveId,
			@RequestParam("isComServId") Integer isComServId, 
			@RequestParam("isComServlastId") Integer isComServlastId,
			@RequestParam("customerType") Integer customerType, 
			@RequestParam("customerName") Integer customerName) {
		List<LabConfigureServicesViewDto> ltConfigurationFromViews = new ArrayList<LabConfigureServicesViewDto>();
		ltConfigurationFromViews = configServiceService.getConfigurationListFromViewForSub(chargesId,chargesSlaveId,
				hallId,hallSlaveId,isComServId,isComServlastId,customerType , customerName);
		LabConfigureServicesViewDto obj = new LabConfigureServicesViewDto();
		obj.setLstServiceConfigurations(ltConfigurationFromViews);
		return obj;
	}

}
