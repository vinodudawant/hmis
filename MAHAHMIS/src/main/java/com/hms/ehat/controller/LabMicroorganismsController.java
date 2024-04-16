package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.ehat.service.LabMicroorganismsService;
import com.hms.pathology.dto.LabTestDTO;

@RestController
@RequestMapping(value = "/microorganisms")
public class LabMicroorganismsController {

	@Autowired
	LabMicroorganismsService labMicroorganismsService;

	/***************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to save lab micro-organisms
	 **************************************************************************/
	@RequestMapping(value = "/saveMicroorganisms", method = RequestMethod.POST)
	public Integer saveMicroorganisms(LabMicroorganismsDto labMicroorganismsDto, HttpServletRequest request) {
		int response = labMicroorganismsService.saveMicroorganisms(labMicroorganismsDto, request);
		return response;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to get all micro-organisms
	 ************************************************************************/
	@RequestMapping(value = "/getAllMicroorganisms", method = RequestMethod.GET)
	public LabMicroorganismsDto getAllMicroorganisms(@RequestParam("unitId") Integer unitId) {
		List<LabMicroorganismsDto> microorganismsList = new ArrayList<LabMicroorganismsDto>();
		microorganismsList = labMicroorganismsService.getAllMicroorganisms(unitId);
		LabMicroorganismsDto labMicroorganismsDto = new LabMicroorganismsDto();
		labMicroorganismsDto.setMicroorganismsList(microorganismsList);
		return labMicroorganismsDto;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to get micro-organism By Id
	 * @param request id
	 ************************************************************************/
	@RequestMapping(value = "/editMicroorganism", method = RequestMethod.POST)
	public LabMicroorganismsDto editMicroorganism(@RequestParam("id") Integer id, HttpServletRequest request) {
		LabMicroorganismsDto labMicroorganismsDto = new LabMicroorganismsDto();
		labMicroorganismsDto = labMicroorganismsService.editMicroorganism(id, request);
		return labMicroorganismsDto;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to delete micro-organism By Id
	 * @param request id
	 ************************************************************************/
	@RequestMapping(value = "/deleteMicroorganism", method = RequestMethod.POST)
	public boolean deleteMicroorganism(@RequestParam("id") Integer id, HttpServletRequest request) {
		boolean flag;
		flag = labMicroorganismsService.deleteMicroorganism(id, request);
		return flag;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to search micro-organisms By name
	 ************************************************************************/
	@RequestMapping(value = "/searchMicroorganisms", method = RequestMethod.POST)
	public LabMicroorganismsDto searchMicroorganisms(@RequestParam("searchName") String name, @RequestParam("unitId") Integer unitId,
			HttpServletRequest request) {
		List<LabMicroorganismsDto> microorganismsList = new ArrayList<LabMicroorganismsDto>();
		microorganismsList = labMicroorganismsService.searchMicroorganisms(name, unitId, request);
		LabMicroorganismsDto labMicroorganismsDto = new LabMicroorganismsDto();
		labMicroorganismsDto.setMicroorganismsList(microorganismsList);
		return labMicroorganismsDto;
	}
	
	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to search micro-organisms By name
	 ************************************************************************/
	@RequestMapping(value = "/getAllLabTests", method = RequestMethod.GET)
	public LabTestDTO getAllLabTests(@RequestParam("unitId") Integer unitId) {
		List<LabTestDTO> labTestDtoList = new ArrayList<LabTestDTO>();
		labTestDtoList = labMicroorganismsService.getAllLabTests(unitId);
		LabTestDTO labTestDTO = new LabTestDTO();
		labTestDTO.setLabTestList(labTestDtoList);
		return labTestDTO;
	}
}