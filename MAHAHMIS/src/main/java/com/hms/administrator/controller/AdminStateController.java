package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.service.AdminStateService;


@RestController
@RequestMapping(value = "/state")
public class AdminStateController {
	
	@Autowired
	AdminStateService adminStateService;

	
/***************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to save State 
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/saveState", method = RequestMethod.POST)
	public int saveStateMaster(AdminStateDTO state, HttpServletRequest request) {
		// System.out.println(state);
		String msg = "";
		int response = adminStateService.saveAdminState(state, request);
		// return "Y";
		return response;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to get all State List
 * @param request
 * @return
 ************************************************************************/
	@RequestMapping(value = "/getAllState", method = RequestMethod.GET)
	public  AdminStateDTO getAllState() {
		List<AdminStateDTO> stateList=new ArrayList<AdminStateDTO>();
		stateList = adminStateService.getAllState();
		AdminStateDTO stateDTO =new AdminStateDTO();
		stateDTO.setStateList(stateList);
		return  stateDTO;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to get State By Id
 * @param request  State_Id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/editStateById", method = RequestMethod.POST)
	public  AdminStateDTO editStateById(@RequestParam("state_id") int state_id,HttpServletRequest request) {
		AdminStateDTO stateDTO =new AdminStateDTO();
		stateDTO = adminStateService.editStateById(state_id,request);
		return  stateDTO;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to get State By Id
 * @param request  State_Id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteStateById", method = RequestMethod.POST)
	public  boolean deleteStateById(@RequestParam("state_id") int state_id,HttpServletRequest request) {
		boolean flag;
		flag = adminStateService.deleteStateById(state_id,request);
		return  flag;
	}

	
/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to search State By name
 * @param request  State_Id
 * @return
 ************************************************************************/	
		@RequestMapping(value = "/searchSateByName", method = RequestMethod.POST)
		public  AdminStateDTO searchSateByName(@RequestParam("searchName") String name,HttpServletRequest request) {
			List<AdminStateDTO> stateList=new ArrayList<AdminStateDTO>();
			stateList = adminStateService.searchSateByName(name,request);
			AdminStateDTO stateDTO =new AdminStateDTO();
			stateDTO.setStateList(stateList);
			return  stateDTO;
		}
}
