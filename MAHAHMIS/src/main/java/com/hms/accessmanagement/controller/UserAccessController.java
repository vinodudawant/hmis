package com.hms.accessmanagement.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.accessmanagement.service.NewUserAccessService;
import com.hms.dto.ModuleMasterDto;
import com.hms.dto.NewUserAccessDto;

@Controller
@RequestMapping(value = "/NewUserAccess")
public class UserAccessController {

	@Autowired
	NewUserAccessService newUserAccessService;
	
	@ResponseBody
	@RequestMapping(value = "/getUserAccessModules", method = RequestMethod.POST)
	public ModuleMasterDto getUserAccessModules(HttpServletRequest request) {
		
		return newUserAccessService.getModuleList();
	}
	
	@ResponseBody
	@RequestMapping(value = "/getUserAccessToPage", method = RequestMethod.POST)
	public  NewUserAccessDto getUserAccess(@RequestParam("moduleId") int moduleId ,HttpServletRequest request) {
		
		NewUserAccessDto obj1 = new NewUserAccessDto();
		obj1 =   newUserAccessService.getUserAccess(moduleId);
		return obj1;
	}
	
}
