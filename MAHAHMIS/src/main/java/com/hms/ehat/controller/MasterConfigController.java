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
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.service.MasterConfigService;

@Controller
@RequestMapping(value = "/masterconfig")
public class MasterConfigController {

	@Autowired
	MasterConfigService masterconfigservice;
	 
	
	/**
	 * @author Sagar @date 26_May_2017 these methods are used to map request
	 *         with services with MasterConfig   controller methods
	 * **/
 
	@RequestMapping(value = "/saveConfigMaster", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateConfigMaster(HttpServletRequest request,MasterConfigDto configMaster) {
		
		String configList[] = request.getParameterValues("ulist");
	 
		int response = masterconfigservice.saveOrUpdateConfigMaster(configList,request,configMaster);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		}else if (response == 3) {
			  msg = "duplicate department.....plz remove unit";
		}
		
		else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	 
		
	}
	 
	/**
	 * @author Sagar @date 26_May_2017 these methods are used to map request
	 *         with services with Config master methods
	 * **/
	@RequestMapping(value = "/getConfigMasterCount", method = RequestMethod.POST)
	public @ResponseBody
	MasterConfigDto getConfigMasterCount() {
		List<MasterConfigDto> ltMasterConfigDto = new ArrayList<MasterConfigDto>();
		ltMasterConfigDto = masterconfigservice.getConfigMasterCount();
		MasterConfigDto obj = new MasterConfigDto();
		obj.setLstConfigMaster(ltMasterConfigDto);
		System.err.println("count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount()); 
		return obj;
		/*return ltMasterConfigDto;*/
	}
	
	/**
	 * @author Sagar @date 26_May_2017 these methods are used to map request
	 *         with services with Config master methods
	 * **/
	@RequestMapping(value = "/getConfigMasterListByCount", method = RequestMethod.POST)
	public @ResponseBody
	MasterConfigDto getConfigMasterList(HttpServletRequest request) {
		
		String count=request.getParameter("configCount");
		int i=Integer.valueOf(count);
		
		List<MasterConfigDto> ltMasterConfigDto = new ArrayList<MasterConfigDto>();
		
		ltMasterConfigDto = masterconfigservice.getConfigMasterListByCount(i);
		MasterConfigDto obj=new MasterConfigDto();
		
		obj.setConfigCount(i);
		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		
		
		obj.setLstConfigMaster(ltMasterConfigDto);
		return obj;
	}
	
	/**
	 * @author Sagar @date 26_May_2017 these methods are used to map request
	 *         with services with Config master methods
	 * **/
	@RequestMapping(value = "/deleteConfigMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteConfigMaster(@RequestParam("confcnt") Integer cnfId,HttpServletRequest request) {
		 
		
		boolean response = masterconfigservice.deleteConfigMaster(cnfId,request);
			 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
		
	}
	
	/**
	 * @author Sagar @date 11_july_2017 these methods are used to map request
	 *         with services with Config master methods
	 * **/
	@RequestMapping(value = "/getConfigMasterListByUnitId", method = RequestMethod.POST)
	@ResponseBody
	public MasterConfigDto getConfigMasterListByUnitId(HttpServletRequest request) {
		
		List<MasterConfigDto> ltMasterConfigDto = new ArrayList<MasterConfigDto>();
		String configList[] = request.getParameterValues("ulist");
		String count1=request.getParameter("configCount");
		int i=Integer.valueOf(count1);
		 
		ltMasterConfigDto = masterconfigservice.getConfigMasterListByUnitId(configList,request,i);
	
			MasterConfigDto obj=new MasterConfigDto();
		 
		obj.setLstConfigMaster(ltMasterConfigDto);
		return obj;
	}
	 
}
	
	
	
	
	
	

	

	  
	

