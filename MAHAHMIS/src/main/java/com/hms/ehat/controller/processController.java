/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 ******************************************************************************/
package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.processMasterDto;
import com.hms.ehat.service.processService;

@Controller
@RequestMapping(value ="/process")
public class processController {

	@Autowired
	processService processService;
	
	/************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 * with services with Unit master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchProcessList", method = RequestMethod.POST)
	public @ResponseBody
	processMasterDto getAllUnitList(HttpServletRequest request) {
		List<processMasterDto> ltprocessMasterDto = new ArrayList<processMasterDto>();
		ltprocessMasterDto = processService.getAllProcess1(request);	 //httpservlet request  and unit1 method added by sagar
		processMasterDto objUnit=new processMasterDto();
		objUnit.setLstProcess(ltprocessMasterDto);
		//includeJSONResponseObject(ltDeptMasterDto, response);		
		return objUnit;
	}	

	 
   	
	/*************************************************************************************
	 * @author Kishor Lokhande 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateUnitMaster(processMasterDto processMaster,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+unitsMaster.getUnitCode());
		
		int response = processService.saveOrUpdateProcess(processMaster, request);
		
		return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
	
	}

	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deleteProcessMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteProcessMaster(@RequestParam("processId") Integer ProcessId,
			HttpServletRequest request) {
				boolean response = processService.deleteProcess(ProcessId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/processMasterList", method = RequestMethod.POST)
	public @ResponseBody
	processMasterDto getProcessMasterList() {
		List<processMasterDto> ltProcessMasters = new ArrayList<processMasterDto>();
		ltProcessMasters = processService.getAllProcess();
		processMasterDto obj = new processMasterDto();
		obj.setLstProcess(ltProcessMasters);
		return obj;
	}

	
	@RequestMapping(value = "/autoSuggestionProcessMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	processMasterDto getautoSuggestionUnitMasterNames(@RequestParam String letter
			) {
		List<processMasterDto> ltPMasters = new ArrayList<processMasterDto>();
		ltPMasters = processService.getAutoSuggestionPNames(letter);
		processMasterDto obj = new processMasterDto();
		obj.setLstProcess(ltPMasters);
		return obj;
	}
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	/*@RequestMapping(value = "/allUnitMasterList", method = RequestMethod.GET)
	public @ResponseBody
	List<UnitMasterDto> getAllUnitMasterList() {
		List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
		ltUnitMasters = processService.getAllUnit();
		return ltUnitMasters;
	}

	*//*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************//*
	
	@RequestMapping(value = "/autoSuggestionUnitMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	UnitMasterDto getautoSuggestionUnitMasterNames(@RequestParam String letter
			) {
		List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
		ltUnitMasters = processService.getAutoSuggestionUnitNames(letter);
		UnitMasterDto obj = new UnitMasterDto();
		obj.setLstUnit(ltUnitMasters);
		return obj;
	}
	
	
	*//*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************//*
	@RequestMapping(value = "/getUnitMasterById", method = RequestMethod.GET)
	public @ResponseBody
	List<UnitMasterDto> getUnitMasterById(
			@RequestParam("unitId") Integer unitId) {
		List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
		ltUnitMasters = processService.getUnitById(unitId);
		return ltUnitMasters;
	}
	
	*//*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************//*
	
	 
		@RequestMapping(value = "/unitMasterListOnLogin", method = RequestMethod.POST)
		public @ResponseBody
		UnitMasterDto unitMasterListOnLogin(
				@RequestParam("ulogin") String ulogin) {
			List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
			ltUnitMasters = processService.unitMasterListlogin(ulogin);
			UnitMasterDto objUnit = new UnitMasterDto();
			objUnit.setLstUnit(ltUnitMasters);
				
			return objUnit;
		}
	*/
	
	
	
	/*************************************************************************************
	 * End of Unit master controller methods
	 * *************************************************************************************/

}

	

