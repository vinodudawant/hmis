package com.hms.administrator.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.ComparamDetails;
import com.hms.administrator.dto.ComparamMaster;
import com.hms.administrator.service.ParameterconfService;

@RestController
@RequestMapping(value = "/parameterconf")
public class ParamerterConfController {

	@Autowired
	ParameterconfService parameterconfservice;
	
	@RequestMapping(value = "/savePrefix", method = RequestMethod.POST)
	public @ResponseBody Integer savePrefix(ComparamMaster comparammaster, HttpServletRequest request) {
		int response = parameterconfservice.savePrefix(comparammaster, request);
		return response;
	}
	
	@RequestMapping(value = "/getAllPrefix", method = RequestMethod.GET)
	public ComparamMaster getAllNPrefixes() {
		List<ComparamMaster> comparamList = parameterconfservice.getAllPrefixes();
		ComparamMaster comparammaster = new ComparamMaster();
		comparammaster.setComparammaster(comparamList);
		return  comparammaster;
	}
	
	@RequestMapping(value = "/getPrefixDetails", method = RequestMethod.GET)
	public ComparamDetails getAllPrefixDetailsList(@RequestParam("id") Integer prefix_id) {
		List<ComparamDetails> comparamList = parameterconfservice.getAllprefixDetails(prefix_id);
		ComparamDetails comparamdetails = new ComparamDetails();
		comparamdetails.setComparamdetails(comparamList);
		return comparamdetails;
	}
	
	@RequestMapping(value = "/savePrefixDetails", method = RequestMethod.POST)
	public @ResponseBody Integer savePrefixDetails(ComparamDetails comparamdetails, @RequestParam("prefixId") Integer prefix_id, HttpServletRequest request) {
		int response = parameterconfservice.savePrefixDetails(comparamdetails, prefix_id, request);
		return response;
	}
	
	@RequestMapping(value = "/getPrefixById", method = RequestMethod.GET)
	public ComparamMaster getPrefixById(@RequestParam("id") Integer prefix_id) {
		List<ComparamMaster> comparamList = parameterconfservice.getPrefixById(prefix_id);
		ComparamMaster comparammaster = new ComparamMaster();
		comparammaster.setComparammaster(comparamList);
		return comparammaster;
	}
	
	@RequestMapping(value = "/getPrefixDetailById", method = RequestMethod.GET)
	public ComparamDetails getPrefixDetailById(@RequestParam("id") Integer prefix_id) {
		List<ComparamDetails> comparamList = parameterconfservice.getPrefixDetailById(prefix_id);
		ComparamDetails comparamdetails = new ComparamDetails();
		comparamdetails.setComparamdetails(comparamList);
		return comparamdetails;
	}
	
	@RequestMapping(value = "/editPrefix", method = RequestMethod.POST)
	public @ResponseBody Integer editPrefix(ComparamMaster comparammaster, @RequestParam("prefix_id") Integer prefix_id, HttpServletRequest request) {
		int response = parameterconfservice.editPrefix(comparammaster, prefix_id, request);
		return response;
	}
	
}
