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

import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.service.UnitService;

@Controller
@RequestMapping(value ="/unit")
public class UnitController {

	@Autowired
	UnitService unitService;
	
	/************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 * with services with Unit master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchUnitList", method = RequestMethod.POST)
	public @ResponseBody
	UnitMasterDto getAllUnitList(HttpServletRequest request) {
		List<UnitMasterDto> ltUnitMasterDto = new ArrayList<UnitMasterDto>();
		ltUnitMasterDto = unitService.getAllUnit1(request);	 //httpservlet request  and unit1 method added by sagar
		UnitMasterDto objUnit=new UnitMasterDto();
		objUnit.setLstUnit(ltUnitMasterDto);
		//includeJSONResponseObject(ltDeptMasterDto, response);		
		return objUnit;
	}	

	/************************************************************************************
	 * @author Kishor Lokhande @date 22_May_2017 these methods are used to map request
	 * with services with Unit master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/getUnitCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getUnitCount() {
		
		Long totaleCount = unitService.getUnitCount();	
		
		//includeJSONResponseObject(ltDeptMasterDto, response);		
		return totaleCount;
	}	
	
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateUnitMaster(UnitMasterDto unitsMaster,
			HttpServletRequest request) {
		
		int response = unitService.saveOrUpdateUnit(unitsMaster, request);
		
		if(response == 3){
			
			return "Unit is already active";			
		}else{
			
			return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
		}	
	}

	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deleteUnitMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteUnitMaster(@RequestParam("unitId") Integer unitId,
			HttpServletRequest request) {
				boolean response = unitService.deleteUnit(unitId,
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
	@RequestMapping(value = "/unitMasterList", method = RequestMethod.POST)
	public @ResponseBody
	UnitMasterDto getUnitMasterList() {
		List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
		ltUnitMasters = unitService.getAllUnit();
		UnitMasterDto obj = new UnitMasterDto();
		obj.setLstUnit(ltUnitMasters);
		return obj;
	}

	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/allUnitMasterList", method = RequestMethod.GET)
	public @ResponseBody
	List<UnitMasterDto> getAllUnitMasterList() {
		List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
		ltUnitMasters = unitService.getAllUnit();
		return ltUnitMasters;
	}

	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	
	@RequestMapping(value = "/autoSuggestionUnitMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	UnitMasterDto getautoSuggestionUnitMasterNames(@RequestParam String letter
			) {
		List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
		ltUnitMasters = unitService.getAutoSuggestionUnitNames(letter);
		UnitMasterDto obj = new UnitMasterDto();
		obj.setLstUnit(ltUnitMasters);
		return obj;
	}
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/getUnitMasterById", method = RequestMethod.GET)
	public @ResponseBody
	List<UnitMasterDto> getUnitMasterById(
			@RequestParam("unitId") Integer unitId) {
		List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
		ltUnitMasters = unitService.getUnitById(unitId);
		return ltUnitMasters;
	}
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Unit master controller methods
	 * *************************************************************************************/
	
	 
		@RequestMapping(value = "/unitMasterListOnLogin", method = RequestMethod.POST)
		public @ResponseBody
		UnitMasterDto unitMasterListOnLogin(
				@RequestParam("ulogin") String ulogin) {
			List<UnitMasterDto> ltUnitMasters = new ArrayList<UnitMasterDto>();
			ltUnitMasters = unitService.unitMasterListlogin(ulogin);
			UnitMasterDto objUnit = new UnitMasterDto();
			objUnit.setLstUnit(ltUnitMasters);
				
			return objUnit;
		}
		/************************************************************************************
		 * @author Dayanand khandekar @date 7_Nov_2019 these methods are used to get Count of Active Unit
		 * 
		 * ***********************************************************************************/
		@RequestMapping(value = "/getCountOfActiveUnit", method = RequestMethod.POST)
		public @ResponseBody
		Long getCountOfActiveUnit() {
			
			Long totaleCount = unitService.getCountOfActiveUnit();	
			 System.err.println("totaleCount is" + totaleCount );
			//includeJSONResponseObject(ltDeptMasterDto, response);		
			return totaleCount;
		}	
		
	
		@RequestMapping(value = "/getAllUnitListMaster", method = RequestMethod.POST)
		public @ResponseBody
		UnitMasterDto getAllUnitListMaster(HttpServletRequest request) {
			List<UnitMasterDto> ltUnitMasterDto = new ArrayList<UnitMasterDto>();
			ltUnitMasterDto = unitService.getAllUnitListMaster();	 //httpservlet request  and unit1 method added by sagar
			UnitMasterDto objUnit=new UnitMasterDto();
			objUnit.setLstUnit(ltUnitMasterDto);
			//includeJSONResponseObject(ltDeptMasterDto, response);		
			return objUnit;
		}
	
	/*************************************************************************************
	 * End of Unit master controller methods
	 * *************************************************************************************/

}

	

