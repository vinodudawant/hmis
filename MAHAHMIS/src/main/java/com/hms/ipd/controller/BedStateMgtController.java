package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.Beds;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.service.BedStateMgtService;

@Controller
@RequestMapping(value = "/bedstatemgt")
public class BedStateMgtController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	private @Autowired
	BedStateMgtService bedStateMgtService;
	
	@ResponseBody
	@RequestMapping(value = "/getHallMasterList", method = RequestMethod.POST)
	public ChargesMasterSlave getHallMasterList() {
		
		LOGGER.info("BedStateMgtController method getHallMasterList called");
		List<ChargesMasterSlave> ltchragesSlave = new ArrayList<ChargesMasterSlave>();
		ltchragesSlave = bedStateMgtService.getHallMasterList();
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltchragesSlave);
		return obj;
	}
	
	@ResponseBody
	@RequestMapping(value = "/viewBedsOfHall", method = RequestMethod.POST)
	public Beds viewBedsOfHall(@RequestParam("hallId") int hallId) {
		
		LOGGER.info("BedStateMgtController method viewBedsOfHall called");
		return bedStateMgtService.viewBedsOfHall(hallId);
	}
	
	@ResponseBody
	@RequestMapping(value = "/deallocateCleanedBeds", method = RequestMethod.POST)
	public int deallocateCleanedBeds(@RequestParam("bedList") String bedIds, @RequestParam("userId") int userId) {

		LOGGER.info("BedStateMgtController method deallocateCleanedBeds called");
		int response = bedStateMgtService.deallocateCleanedBeds(bedIds,userId);
		return response;
	}
}
