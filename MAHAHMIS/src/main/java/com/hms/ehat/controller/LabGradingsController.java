package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hms.ehat.dto.LabGradingsDto;
import com.hms.ehat.service.LabGradingsService;
import com.hms.pathology.dto.LabTestDTO;

@RestController
@RequestMapping(value = "/gradings")
public class LabGradingsController {

	@Autowired
	LabGradingsService labGradingsService;

	/***************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to save lab micro-organisms
	 **************************************************************************/
	@RequestMapping(value = "/saveLabGrading", method = RequestMethod.POST)
	public Integer saveLabGrading(LabGradingsDto labGradingsDto, HttpServletRequest request) {
		int response = labGradingsService.saveLabGrading(labGradingsDto, request);
		return response;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to get all micro-organisms
	 ************************************************************************/
	@RequestMapping(value = "/getAllGradings", method = RequestMethod.GET)
	public LabGradingsDto getAllGradings(@RequestParam("unitId") Integer unitId) {
		List<LabGradingsDto> labGradingsList = new ArrayList<LabGradingsDto>();
		labGradingsList = labGradingsService.getAllGradings(unitId);
		LabGradingsDto labGradingsDto = new LabGradingsDto();
		labGradingsDto.setGradingsList(labGradingsList);
		return labGradingsDto;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to get micro-organism By Id
	 * @param request id
	 ************************************************************************/
	@RequestMapping(value = "/editLabGrading", method = RequestMethod.POST)
	public LabGradingsDto editLabGrading(@RequestParam("id") Integer id, HttpServletRequest request) {
		LabGradingsDto labGradingsDto = new LabGradingsDto();
		labGradingsDto = labGradingsService.editLabGrading(id, request);
		return labGradingsDto;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to delete micro-organism By Id
	 * @param request id
	 ************************************************************************/
	@RequestMapping(value = "/deleteLabGrading", method = RequestMethod.POST)
	public boolean deleteLabGrading(@RequestParam("id") Integer id, HttpServletRequest request) {
		boolean flag;
		flag = labGradingsService.deleteLabGrading(id, request);
		return flag;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to search micro-organisms By name
	 ************************************************************************/
	@RequestMapping(value = "/searchGradings", method = RequestMethod.POST)
	public LabGradingsDto searchGradings(@RequestParam("searchName") String name,
			@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
		List<LabGradingsDto> labGradingsList = new ArrayList<LabGradingsDto>();
		labGradingsList = labGradingsService.searchGradings(name, unitId, request);
		LabGradingsDto labGradingsDto = new LabGradingsDto();
		labGradingsDto.setGradingsList(labGradingsList);
		return labGradingsDto;
	}

	/*************************************************************************
	 * @author Akshay Mache
	 * @since 17/09/2020
	 * @comment This method is to search micro-organisms By name
	 ************************************************************************/
	@RequestMapping(value = "/getAllLabTests", method = RequestMethod.GET)
	public LabTestDTO getAllLabTests(@RequestParam("unitId") Integer unitId) {
		List<LabTestDTO> labTestDtoList = new ArrayList<LabTestDTO>();
		labTestDtoList = labGradingsService.getAllLabTests(unitId);
		LabTestDTO labTestDTO = new LabTestDTO();
		labTestDTO.setLabTestList(labTestDtoList);
		return labTestDTO;
	}
}