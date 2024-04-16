/*******************************************************************************
 * @author Kishor Lokhande
 * @date 16_May_2017 
 ******************************************************************************/
package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;



import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.TempMasterDto;
import com.hms.ehat.service.TempService;

@Controller
@RequestMapping(value ="/temp")
public class TempController {

	@Autowired
	TempService tempService;
	
	/************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchTempList", method = RequestMethod.POST)
	public @ResponseBody
	TempMasterDto getAllTempList() {
		List<TempMasterDto> ltTempMasterDto = new ArrayList<TempMasterDto>();
		ltTempMasterDto = tempService.getAllTemp();	
		TempMasterDto objTemp=new TempMasterDto();
		objTemp.setListTemp(ltTempMasterDto);
		//includeJSONResponseObject(ltDeptMasterDto, response);		
		return objTemp;
	}	

	/************************************************************************************
	 * @author Kishor Lokhande @date 22_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/getTempCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getTempCount() {
		
		Long totaleCount = tempService.getTempCount();	
		
		//includeJSONResponseObject(ltDeptMasterDto, response);		
		return totaleCount;
	}	
	
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateTempMaster(TempMasterDto tempsMaster,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+TempsMaster.getTempCode());
		
		int response = tempService.saveOrUpdateTemp(tempsMaster, request);
		
		return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
	
	}

	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deletetempMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteTempMaster(@RequestParam("tempId") Integer tempId,
			HttpServletRequest request) {
				boolean response = tempService.deleteTemp(tempId,
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
	@RequestMapping(value = "/tempMasterList", method = RequestMethod.POST)
	public @ResponseBody
	TempMasterDto getTempMasterList() {
		List<TempMasterDto> ltTempMasters = new ArrayList<TempMasterDto>();
		ltTempMasters = tempService.getAllTemp();
		TempMasterDto obj = new TempMasterDto();
		obj.setListTemp(ltTempMasters);
		return obj;
	}

	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/allTempMasterList", method = RequestMethod.GET)
	public @ResponseBody
	List<TempMasterDto> getAllTempMasterList() {
		List<TempMasterDto> ltTempMasters = new ArrayList<TempMasterDto>();
		ltTempMasters = tempService.getAllTemp();
		return ltTempMasters;
	}

	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	
	@RequestMapping(value = "/autoSuggestionTempMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	TempMasterDto getautoSuggestionTempMasterNames(@RequestParam String letter
			) {
		List<TempMasterDto> ltTempMasters = new ArrayList<TempMasterDto>();
		ltTempMasters = tempService.getAutoSuggestionTempNames(letter);
		TempMasterDto obj = new TempMasterDto();
		obj.setListTemp(ltTempMasters);
		return obj;
	}
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/getTempMasterById", method = RequestMethod.GET)
	public @ResponseBody
	List<TempMasterDto> getTempMasterById(
			@RequestParam("tempId") Integer tempId) {
		List<TempMasterDto> ltTempMasters = new ArrayList<TempMasterDto>();
		ltTempMasters = tempService.getTempById(tempId);
		return ltTempMasters;
	}
	
	
	
	
	
	/*************************************************************************************
	 * End of Temp master controller methods
	 * *************************************************************************************/

}

	

