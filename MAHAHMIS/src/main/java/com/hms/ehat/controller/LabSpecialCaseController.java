package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.LabSpecialCasesDTO;
import com.hms.ehat.service.LabSpecialCaseService;

@RestController
@RequestMapping(value = "/specialcase")
public class LabSpecialCaseController {
	
	@Autowired
	LabSpecialCaseService labSpecialCaseService;

	
/***************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment This method is to save special Case
 * @param 
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/savespecialcase", method = RequestMethod.POST)
	public int savespecialcase(LabSpecialCasesDTO labSpecialCase, HttpServletRequest request) {
		int response = labSpecialCaseService.savespecialcase(labSpecialCase, request);
		return response;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment This method is to get all special Case  List
 * @param 
 * @return
 ************************************************************************/
	@RequestMapping(value = "/getAllSpecialCases", method = RequestMethod.GET)
	public LabSpecialCasesDTO getAllSpecialCases() {
		List<LabSpecialCasesDTO> specialCaseList=new ArrayList<LabSpecialCasesDTO>();
		specialCaseList = labSpecialCaseService.getAllSpecialCase();
		LabSpecialCasesDTO labSpecialCasesDTO =new LabSpecialCasesDTO();
		labSpecialCasesDTO.setSpecialCaseList(specialCaseList);
		return  labSpecialCasesDTO;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment This method is to get special Case By Id
 * @param request  id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/editSpecialCaseById", method = RequestMethod.POST)
	public  LabSpecialCasesDTO editSpecialCaseById(@RequestParam("id") int id,HttpServletRequest request) {
		LabSpecialCasesDTO sampleContainerDTO =new LabSpecialCasesDTO();
		sampleContainerDTO = labSpecialCaseService.editSpecialCaseById(id,request);
		return  sampleContainerDTO;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment This method is to delete special Case By Id
 * @param request  id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteSpecialCaseById", method = RequestMethod.POST)
	public  boolean deleteSpecialCaseById(@RequestParam("id") int id,HttpServletRequest request) {
		boolean flag;
		flag = labSpecialCaseService.deleteSpecialCaseById(id,request);
		return  flag;
	}

	
/*************************************************************************
 * @author Ganesh Patil
 * @since 21/02/2020
 * @comment This method is to search special Case By name
 * @param request  
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/searchSpecialCaseByName", method = RequestMethod.POST)
		public  LabSpecialCasesDTO searchSpecialCaseByName(@RequestParam("searchName") String name,HttpServletRequest request) {
			List<LabSpecialCasesDTO> specialCaseList=new ArrayList<LabSpecialCasesDTO>();
			specialCaseList = labSpecialCaseService.searchSpecialCaseByName(name,request);
			LabSpecialCasesDTO labSpecialCasesDTO =new LabSpecialCasesDTO();
			labSpecialCasesDTO.setSpecialCaseList(specialCaseList);
			return  labSpecialCasesDTO;
		}

}