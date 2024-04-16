package com.hms.pathology.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.pathology.dto.PathologyTestReasonDto;
import com.hms.pathology.service.TestReasonService;
@RestController
@RequestMapping(value = "/testReason")
public class TestReasonController {

	@Autowired
	TestReasonService testReasonService;
	
/***************************************************************************
 * @author Ajay Khandare
 * @since 15-04-2020
 * @comment This method is to save Test Reason 
 * @param 
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/saveTestReason", method = RequestMethod.POST)
	public int saveTestReason(PathologyTestReasonDto labSpecialCase, @RequestParam("sampleType") Integer sampleTypeId, HttpServletRequest request) {
		int response = testReasonService.saveTestReason(labSpecialCase, sampleTypeId, request);
		return response;
	}
	
	
/*************************************************************************
  * @author Ajay Khandare
 * @since 15-04-2020
 * @comment This method is to get all Test Reason  List
 * @param 
 * @return
 ************************************************************************/
	@RequestMapping(value = "/getAllTestReason", method = RequestMethod.GET)
	public PathologyTestReasonDto getAllTestReason() {
		List<PathologyTestReasonDto> testReasonlist=new ArrayList<PathologyTestReasonDto>();
		testReasonlist = testReasonService.getAllTestReason();
		PathologyTestReasonDto labtestReasonDTO =new PathologyTestReasonDto();
		labtestReasonDTO.setTestReasonlist(testReasonlist);
		return  labtestReasonDTO;
	}
	
/*************************************************************************
  * @author Ajay Khandare
 * @since 15-04-2020
 * @comment This method is to get Test Reason  By Id
 * @param request  id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/editTestReasonById", method = RequestMethod.POST)
	public  PathologyTestReasonDto editTestReasonById(@RequestParam("id") int id,HttpServletRequest request) {
		PathologyTestReasonDto labtestReasonDTO =new PathologyTestReasonDto();
		labtestReasonDTO = testReasonService.editTestReasonById(id,request);
		return  labtestReasonDTO;
	}
	
/*************************************************************************
 * @author Ajay Khandare
 * @since 15-04-2020
 * @comment This method is to delete Test Reason  By Id
 * @param request  id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteTestReasonById", method = RequestMethod.POST)
	public  boolean deleteTestReasonById(@RequestParam("id") int id,HttpServletRequest request) {
		boolean flag;
		flag = testReasonService.deleteTestReasonById(id,request);
		return  flag;
	}

	
/*************************************************************************
 * @author Ajay Khandare
 * @since 15-04-2020
 * @comment This method is to search Test Reason  By name
 * @param request  
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/searchTestReasonByName", method = RequestMethod.POST)
		public  PathologyTestReasonDto searchTestReasonByName(@RequestParam("searchName") String name,HttpServletRequest request) {
			List<PathologyTestReasonDto> testReasonlist=new ArrayList<PathologyTestReasonDto>();
			testReasonlist = testReasonService.searchTestReasonByName(name,request);
			PathologyTestReasonDto labtestReasonDTO =new PathologyTestReasonDto();
			labtestReasonDTO.setTestReasonlist(testReasonlist);
			return  labtestReasonDTO;
	}



}
