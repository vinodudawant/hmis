package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.service.BedMasterService;

@Controller
@RequestMapping(value = "/bedmaster")
public class BedMasterController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	private @Autowired
	BedMasterService bedMasterService;
	
	@ResponseBody
	@RequestMapping(value = "/saveBedMaster", method = RequestMethod.POST)
	public int saveOrUpdateBedMaster(@RequestBody ChargesMasterSlave chargesMasterSlave) {

		LOGGER.info("BedMasterController method saveOrUpdateBedMaster called");
		int response = bedMasterService.saveOrUpdateBedMaster(chargesMasterSlave);
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/getBedMasterList", method = RequestMethod.POST)
	public ChargesMasterSlave getBedMasterList() {
		
		LOGGER.info("BedMasterController method getBedMasterList called");
		List<ChargesMasterSlave> ltchragesSlave = new ArrayList<ChargesMasterSlave>();
		ltchragesSlave = bedMasterService.getBedMasterList();
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltchragesSlave);
		return obj;
	}
	
	@ResponseBody
	@RequestMapping(value = "/deleteHallById", method = RequestMethod.POST)
	public int deleteHallById(@RequestParam("hallId") int hallId, HttpServletRequest request) {

		LOGGER.info("BedMasterController method deleteHallById called");
		int response = bedMasterService.deleteHallById(hallId,request);
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/viewBedsOfHall", method = RequestMethod.POST)
	public ChargesMasterSlave viewBedsOfHall(@RequestParam("hallId") int hallId) {
		
		LOGGER.info("BedMasterController method viewBedsOfHall called");
		return bedMasterService.viewBedsOfHall(hallId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/deleteBedById", method = RequestMethod.POST)
	public int deleteBedById(@RequestParam("hallId") int hallId, @RequestParam("bedId") int bedId, HttpServletRequest request) {

		LOGGER.info("BedMasterController method deleteBedById called");
		int response = bedMasterService.deleteBedById(hallId,bedId,request);
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/autoSuggestionChargesMasterNames", method = RequestMethod.POST)
	public ChargesMasterSlave autoSuggestionsubCharges(@RequestParam String letter) {
		
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		ltChargesSlave = bedMasterService.autoSuggestionsubCharges(letter);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltChargesSlave);
		return obj;
	}
}
