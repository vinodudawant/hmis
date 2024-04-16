package com.hms.inventory.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.InvDashboardDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.service.InvDashboardService;

@Controller
@RequestMapping(value = "/invDashboard")
public class InvDashboardController {

	static Logger log=Logger.getLogger(InvDashboardController.class.getName());
	@Autowired
	private InvDashboardService dashboardService;
	
	@Autowired
	private InvDashboardDto dashboardDto;
	
	@Autowired
	private MrnMasterDTO mrnMasterDTO;
	
	/**
	 * @since 28-9-2020
	 * @author Vishnu Thorat
	 * @codeFor below method is created for get all Item Stock Below Minimum In Qty details
	 */
	@RequestMapping(value = "/getItemStockBelowMinimumInQty", method = RequestMethod.GET)
	@ResponseBody
	public InvDashboardDto getItemStockBelowMinimumInQty(HttpServletRequest request) {
		
		log.info("in class DashboardController this is method getItemStockBelowMinimumInQty....");
		List<InvDashboardDto> dashboardDtoList = new ArrayList<InvDashboardDto>();
		dashboardDtoList = dashboardService.getItemStockBelowMinimumInQty(request);
		dashboardDto.setLstDashboardDto(dashboardDtoList);
		log.debug("this is list dashboardDtoList...."+dashboardDtoList);
		return dashboardDto;
	}
	
	
	@RequestMapping(value = "/getProductExpired", method = RequestMethod.GET)
	@ResponseBody
	public InvDashboardDto getProductExpired(HttpServletRequest request) {
		
		log.info("in class DashboardController this is method getProductExpired....");
		List<InvDashboardDto> dashboardDtoList = new ArrayList<InvDashboardDto>();
		dashboardDtoList = dashboardService.getProductExpired(request);
		dashboardDto.setLstDashboardDto(dashboardDtoList);
		log.debug("this is list getProductExpired...."+dashboardDtoList);
		return dashboardDto;
	}
	
	@RequestMapping(value = "/getProductNearExpiry", method = RequestMethod.GET)
	@ResponseBody
	public InvDashboardDto getProductNearExpiry(HttpServletRequest request) {
		
		log.info("in class DashboardController this is method getProductNearExpiry....");
		List<InvDashboardDto> dashboardDtoList = new ArrayList<InvDashboardDto>();
		dashboardDtoList = dashboardService.getProductNearExpiry(request);
		dashboardDto.setLstDashboardDto(dashboardDtoList);
		log.debug("this is list getProductNearExpiry...."+dashboardDtoList);
		return dashboardDto;
	}
	
	
	@RequestMapping(value = "/getTodayIndent", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO getTodayIndent(HttpServletRequest request) {
		
		log.info("in class DashboardController this is method getTodayIndent....");
		List<MrnMasterDTO> mrnMasterDTOList = new ArrayList<MrnMasterDTO>();
		mrnMasterDTOList = dashboardService.getTodayIndent(request);
		mrnMasterDTO.setLstmrnmaster(mrnMasterDTOList);
		log.debug("this is list getTodayIndent...."+mrnMasterDTOList);
		return mrnMasterDTO;
	}
	
	@RequestMapping(value = "/getInProgressIndent", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO getInProgressIndent(HttpServletRequest request) {
		
		log.info("in class DashboardController this is method getInProgressIndent....");
		List<MrnMasterDTO> mrnMasterDTOList = new ArrayList<MrnMasterDTO>();
		mrnMasterDTOList = dashboardService.getInProgressIndent(request);
		mrnMasterDTO.setLstmrnmaster(mrnMasterDTOList);
		log.debug("this is list getInProgressIndent...."+mrnMasterDTOList);
		return mrnMasterDTO;
	}
	
	@RequestMapping(value = "/getPendingIndent", method = RequestMethod.GET)
	@ResponseBody
	public MrnMasterDTO getPendingIndent(HttpServletRequest request) {
		
		log.info("in class DashboardController this is method getPendingIndent....");
		List<MrnMasterDTO> mrnMasterDTOList = new ArrayList<MrnMasterDTO>();
		mrnMasterDTOList = dashboardService.getPendingIndent(request);
		mrnMasterDTO.setLstmrnmaster(mrnMasterDTOList);
		log.debug("this is list getPendingIndent...."+mrnMasterDTOList);
		return mrnMasterDTO;
	}
	
}
