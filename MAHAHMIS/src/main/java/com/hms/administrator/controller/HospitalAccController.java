package com.hms.administrator.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.administrator.service.HospitalAccService;

@Controller
@RequestMapping(value="/adminForHosacc")
public class HospitalAccController {

	@Autowired
	HospitalAccService hospitalAccService;
	
	@RequestMapping(value="/hosAccDetails",method=RequestMethod.POST)
	@ResponseBody	
	public String saveHospitalAccessDetails(HospitalAccDetails hospitalAccDetails,@RequestParam("prefixDetails") String listEhatBillPrefix,HttpServletRequest request){
		String response = hospitalAccService.SaveHospitalAccessDetails(hospitalAccDetails,listEhatBillPrefix,request);
		return response;
		
	}

	@RequestMapping(value="/fetchhospital",method=RequestMethod.POST)
	@ResponseBody	
	public HospitalAccDetails  fetchHospitalAccessDetails(@RequestParam("corporateId") String corporateId){
		HospitalAccDetails obj = new HospitalAccDetails();
		List<HospitalAccDetails> response = hospitalAccService.fetchHospitalAccDetails(corporateId);
		obj.setArrHospitalAccDetails(response);
		return obj;
		
	}

}
