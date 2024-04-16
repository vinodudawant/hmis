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

import com.hms.ehat.dto.NarrationDto;
import com.hms.ehat.dto.TempMasterDto;
import com.hms.ehat.service.NarrationService;

@Controller
@RequestMapping(value ="/narration")
public class NarrationController {

	@Autowired
	NarrationService narrationService;
	
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateTempMaster(NarrationDto narrsMaster,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+TempsMaster.getTempCode());
		
		int response = narrationService.saveOrUpdateTemp(narrsMaster, request);
		
		return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
	
	}
	
	/************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchNarrList", method = RequestMethod.POST)
	public @ResponseBody
	NarrationDto getAllNarrations() {
		List<NarrationDto> ltnarrMasterDto = new ArrayList<NarrationDto>();
		ltnarrMasterDto = narrationService.getAllNarrations();	
		NarrationDto objNarr=new NarrationDto();
		objNarr.setListNarr(ltnarrMasterDto);	
		return objNarr;
	}
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deleteNarrMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteNarrMaster(@RequestParam("narrId") Integer narrId,
			HttpServletRequest request) {
				boolean response = narrationService.deleteNarrMaster(narrId,
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
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	
	@RequestMapping(value = "/autoSuggestionNarrationMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	NarrationDto getautoSuggestionNarrationMasterNames(@RequestParam String letter
			) {
		List<NarrationDto> ltNarrMasters = new ArrayList<NarrationDto>();
		ltNarrMasters = narrationService.getautoSuggestionNarrationMasterNames(letter);
		NarrationDto obj = new NarrationDto();
		obj.setListNarr(ltNarrMasters);
		return obj;
	}
	/************************************************************************************
	 * @author Kishor Lokhande @date 22_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/getNarrationCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getNarrationCount() {
		
		Long totaleCount = narrationService.getNarrationCount();	
		
		//includeJSONResponseObject(ltDeptMasterDto, response);		
		return totaleCount;
	}	
	
}
