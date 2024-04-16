package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.service.LabTestMethodService;

@RestController
@RequestMapping(value = "/labmethod")
public class LabTestMethodController {
	
	@Autowired
	LabTestMethodService labTestMethodService;

	@RequestMapping(value = "/savetestmethod", method = RequestMethod.POST)
	public String saveTestMethod(LabTestMethodDTO dto, HttpServletRequest request){
		return labTestMethodService.saveTestMethod(dto, request);
	}
	
	@RequestMapping(value = "/getalltestmethods", method = RequestMethod.GET)
	public LabTestMethodDTO getAllTestMethods(@RequestParam("searchText") String searchText, @RequestParam("callFrom") String type){
		return labTestMethodService.getAllTestMethods(searchText, type);
	}
	
	@RequestMapping(value = "/edittestmethod/{id}", method = RequestMethod.GET)
	public LabTestMethodDTO editTestMethod(@PathVariable("id") int testMethodId){
		return labTestMethodService.editTestMethod(testMethodId);
	}
	
	@RequestMapping(value = "/deletetestmethod/{id}", method = RequestMethod.DELETE)
	public boolean deleteTestMethod(@PathVariable("id") int testMethodId, HttpServletRequest request){
		return labTestMethodService.deleteTestMethod(testMethodId, request);
	}
	
}
