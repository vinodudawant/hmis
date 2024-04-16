package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.service.LabTestSampleService;
import com.hms.pathology.dto.LabTestSampleDTO;


@RestController
@RequestMapping(value = "/testsample")
public class LabTestSampleController {
	

	@Autowired
	LabTestSampleService labTestSampleService;
	
	@RequestMapping(value = "/savetestsample", method = RequestMethod.POST)
	public String saveTestSample(LabTestSampleDTO dto, HttpServletRequest request){
		return labTestSampleService.saveTestSample(dto, request);
	}
	
	@RequestMapping(value = "/getalltestsamples", method = RequestMethod.GET)
	public LabTestSampleDTO getAllTestSamples(@RequestParam("searchText") String searchText, @RequestParam("callFrom") String type){
		return labTestSampleService.getAllTestSamples(searchText, type);
	}
	
	@RequestMapping(value = "/edittestsample/{id}", method = RequestMethod.GET)
	public LabTestSampleDTO editTestSample(@PathVariable("id") int testSampleId){
		return labTestSampleService.editTestSample(testSampleId);
	}
	
	@RequestMapping(value = "/deletetestsample/{id}", method = RequestMethod.DELETE)
	public boolean deleteTestSample(@PathVariable("id") int testSampleId, HttpServletRequest request){
		return labTestSampleService.deleteTestSample(testSampleId, request);
	}

}
