/*******************************************************************************
 * @CodeBy : Tushar Jadhav.
 * @CodeFor : OPD_Token_Limit_Master.
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

import com.hms.dto.OpdTokenLimitDto;
import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.service.CenterService;


@Controller 
@RequestMapping(value="/centerMgttoken")
public class OpdTokenLimitController 
{
	
	@Autowired
	CenterService centerService;

	@RequestMapping(value = "/saveTokenLimitMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveTokenLimitMaster(OpdTokenLimitDto TokenMaster,	HttpServletRequest request) {
		
		int response = centerService.saveTokenLimitMaster(TokenMaster, request);		
		return response;	
	}
	
	
	@RequestMapping(value = "/getAllSpecialityMaster", method = RequestMethod.GET)
	public @ResponseBody
	OpdTokenLimitDto getAllSpecialityMaster(HttpServletRequest request) {
		List<OpdTokenLimitDto> lstSpecialityMaster = new ArrayList<OpdTokenLimitDto>();
		lstSpecialityMaster = centerService.getAllSpecialityMaster();
		OpdTokenLimitDto obj = new OpdTokenLimitDto();
		obj.setLstSpecialityMaster(lstSpecialityMaster);
		return obj;
	}	
	
	@RequestMapping(value = "/editSpecialityMaster", method = RequestMethod.GET)
	public @ResponseBody
	OpdTokenLimitDto editSpecialityMaster(@RequestParam("tokenid") Integer tokenid) {
		OpdTokenLimitDto obj = new OpdTokenLimitDto();
		obj = centerService.editSpecialityMaster(tokenid);	
		return obj;
	}	
	
	
	@RequestMapping(value = "/deleteSpecialityMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSpecialityMaster(@RequestParam("tokenid") Integer tokenid,HttpServletRequest request) {
		boolean response = centerService.deleteSpecialityMaster(tokenid, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		return msg;
	}
	
	@RequestMapping(value = "/centerSpecialityMasterAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	OpdTokenLimitDto centerSpecialityMasterAutoSuggestion(@RequestParam("specializationName")String specializationName) {
		List<OpdTokenLimitDto> lstSpecialityMaster = new ArrayList<OpdTokenLimitDto>();
		lstSpecialityMaster = centerService.getAllSpecialityMasterAutosuggestion(specializationName);
		OpdTokenLimitDto obj = new OpdTokenLimitDto();
		obj.setLstSpecialityMaster(lstSpecialityMaster);
		return obj;
	}
}
