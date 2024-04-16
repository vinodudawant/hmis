package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipd.dto.IPDMisReportDTO;
import com.hms.ipd.dto.OPDMisReportDTO;
import com.hms.ipd.service.IPDMisService;

//added by vishant pawar @26-102023
@Controller
@RequestMapping(value = "/mis")
public class IPDMisReportController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());

	private @Autowired IPDMisService ipdMisService;

	@ResponseBody
	@RequestMapping(value = "/fetchIPDMisReport", method = RequestMethod.POST)
	public IPDMisReportDTO fetchIPDMisReport(@RequestParam("searchByMisReport") Integer searchBy,
			@RequestParam("toDate") String toDate, @RequestParam("fromDate") String fromDate) {
		LOGGER.info("IPDMISController method fetchIPDMisReport called");
		List<IPDMisReportDTO> list = ipdMisService.fetchIPDMisReport(fromDate, toDate, searchBy);
		IPDMisReportDTO misReportDTO = new IPDMisReportDTO();
		misReportDTO.setList(list);
		return misReportDTO;
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchOPDMisReport", method = RequestMethod.POST)
	public OPDMisReportDTO fetchOPDMisReport(@RequestParam("searchByMisReport") String searchBy,
			@RequestParam("toDate") String toDate, @RequestParam("fromDate") String fromDate,
			@RequestParam("specialityId") Integer specialityId,@RequestParam("doctorId") Integer doctorId) {
		LOGGER.info("IPDMISController method fetchIPDMisReport called");
		List<OPDMisReportDTO> list = ipdMisService.fetchOPDMisReport(fromDate, toDate, searchBy,specialityId,doctorId);
		OPDMisReportDTO misReportDTO = new OPDMisReportDTO();
		misReportDTO.setList(list);
		return misReportDTO;
	}

}
