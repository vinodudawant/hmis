package com.hms.ehat.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.IpdCollectionReportDetails;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TotalCollectionDetails;
import com.hms.ehat.service.TotalCollectionService;

@Controller
@RequestMapping("/totalcollection")
public class TotalCollectionController {
	
	@Autowired
	TotalCollectionService totalCollectionService;
	
	@RequestMapping(value="/getallserviceslist", method= RequestMethod.GET)
	@ResponseBody
	public List<ServiceMasterDto> getAllServices(HttpServletRequest req){
		List<ServiceMasterDto> services=totalCollectionService.getAllServices(req);
		return services;
	}
	
	@RequestMapping(value="/getMultipleServices",method=RequestMethod.POST)
	@ResponseBody
	public List<SubServiceDto> getMultipleServices(@RequestParam("serviceId") Integer serviceId){
		 List<SubServiceDto> response = totalCollectionService.getMultipleSubservices(serviceId);
		return response;
	}
	
	@RequestMapping(value="/getServicewisereport",method=RequestMethod.POST)
	@ResponseBody
	public List<TotalCollectionDetails> getServicewisereport(@RequestParam("fromdatetime") String fromdatetime ,@RequestParam("todatetime")String todatetime,@RequestParam("department") String department,@RequestParam("sponsorId")String sponsorId,@RequestParam("serviceId")String serviceId,@RequestParam("doctorid")int doctorid, @RequestParam("subServiceId")String subServiceId
			, @RequestParam("patientType")Integer patientType){
		 List<TotalCollectionDetails> response = totalCollectionService.getServiceWiseReport(fromdatetime, todatetime, department, sponsorId, serviceId, doctorid,subServiceId,patientType);
		return response;
	}
	
	@RequestMapping(value="/getIpdDetailsReport",method=RequestMethod.POST)
	@ResponseBody
	public List<IpdCollectionReportDetails> getIpdDetailsReport(@RequestParam("fromdatetime")String fromdatetime,@RequestParam("todatetime")String todatetime,@RequestParam("payMode") int payMode){
		List<IpdCollectionReportDetails> response = totalCollectionService.getIpdAllDetails(fromdatetime, todatetime,payMode);
		return response;
	}

}
