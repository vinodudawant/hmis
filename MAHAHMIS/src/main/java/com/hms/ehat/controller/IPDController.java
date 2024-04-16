package com.hms.ehat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.HallManagementDto;
import com.hms.administrator.service.WardTypeService;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.service.IPDService;

@Controller
@RequestMapping(value="/ipdbed")
public class IPDController {
	@Autowired
	IPDService ipdservice;
	
	
	@RequestMapping(value = "/fetchWordNameList", method = RequestMethod.POST)
	@ResponseBody
	public HallManagementDto fetchWordNameList( @RequestParam("hallType")Integer hallType) {
		return ipdservice.fetchWordNameList(hallType);

	}
	
	@RequestMapping(value = "/fetchNoOfBeds", method = RequestMethod.POST)
	@ResponseBody
	public HallManagementDto fetchNoOfBeds( @RequestParam("hallId")Integer hallId) {
		return ipdservice.fetchNoOfBeds(hallId);

	}
	
	@RequestMapping(value = "/allocateBedToPatient", method = RequestMethod.POST)
	@ResponseBody
	public String allocateBedToPatient( TreatMentBeds obj, @RequestParam("BedAllocStatus") String BedAllocStatus, @RequestParam("DallocBedId") String DallocBedId, @RequestParam("billableBedType") String billableBedType, @RequestParam("patientType") String patientType) {
		return ipdservice.allocateBedToPatient(obj, BedAllocStatus, DallocBedId, billableBedType, patientType);

	}
	
	
}
