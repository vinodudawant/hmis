package com.hms.doctordesk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.doctordesk.service.GrowthChartService;
import com.hms.dto.StandardAndPatientBMIDetailsDTO;

@RestController
@RequestMapping(value="/growthchart")
public class GrowthChartController {

	@Autowired
	GrowthChartService growthChartService;
	
	@RequestMapping("/getgrowthchartdetails")
	public StandardAndPatientBMIDetailsDTO getGrowthChartDetails(@RequestParam("perform") String perform, @RequestParam("pid") String patientId){
		StandardAndPatientBMIDetailsDTO dto = new StandardAndPatientBMIDetailsDTO();
		List<StandardAndPatientBMIDetailsDTO> list = growthChartService.getGrowthChartDetails(perform, patientId);
		dto.setStandardAndPatientBMIDetailsDTOList(list);
		
		return dto;
	}
}