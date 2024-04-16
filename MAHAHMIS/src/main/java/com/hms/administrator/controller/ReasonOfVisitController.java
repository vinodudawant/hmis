package com.hms.administrator.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.district_taluka_city;
import com.hms.administrator.service.ReasonOfVisitService;

@RestController
@RequestMapping(value = "/reasonofvisit")
public class ReasonOfVisitController {

	@Autowired
	ReasonOfVisitService mastersService;
	
	@RequestMapping(value = "/savereasonofvisit", method = RequestMethod.POST)
	public String saveReasonOfVisit(district_taluka_city dto, @RequestParam("moduleId") Integer moduleId, HttpServletRequest request) {
		return mastersService.saveReasonOfVisit(dto, moduleId, request);
	}
	
	@RequestMapping(value = "/getallreasons", method = RequestMethod.GET)
	public district_taluka_city getAllReasons(@RequestParam("searchText") String searchText, String callFrom) {
		return mastersService.getAllReasons(searchText, callFrom);
	}
	
	@RequestMapping(value = "/editreason/{id}", method = RequestMethod.GET)
	public district_taluka_city editReason(@PathVariable("id") Integer reasonId) {
		return mastersService.editReason(reasonId);
	}
	
	@RequestMapping(value = "/deletereason/{id}", method = RequestMethod.DELETE)
	public boolean deleteReason(@PathVariable("id") Integer reasonId, HttpServletRequest request){
		return mastersService.deleteReason(reasonId, request);
	}
}
