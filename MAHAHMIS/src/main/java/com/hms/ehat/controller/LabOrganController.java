package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.LabOrgansDTO;
import com.hms.ehat.service.LabOrganService;

@RestController
@RequestMapping(value = "/laborgan")
public class LabOrganController {
	
	@Autowired
	LabOrganService labOrganService;
	
	@RequestMapping(value = "/savelaborgan", method = RequestMethod.POST)
	public String saveLabOrgan(LabOrgansDTO dto, HttpServletRequest request){
		return labOrganService.saveLabOrgan(dto, request);
	}
	
	@RequestMapping(value = "/getlaborgans", method = RequestMethod.GET)
	public LabOrgansDTO getLabOrgan(@RequestParam("searchText") String searchText, @RequestParam("type") String type){
		return labOrganService.getLabOrgans(searchText, type);
	}
	
	@RequestMapping(value = "/getlaborganbyid/{id}", method = RequestMethod.GET)
	public LabOrgansDTO getLabOrganById(@PathVariable("id") int labOrganId){
		return labOrganService.getLabOrganById(labOrganId);
	}
	
	@RequestMapping(value = "/deletelaborgan/{id}", method = RequestMethod.DELETE)
	public boolean deleteLabOrgan(@PathVariable("id") int labOrganId, HttpServletRequest request){
		return labOrganService.deleteLabOrgan(labOrganId, request);
	}


}
