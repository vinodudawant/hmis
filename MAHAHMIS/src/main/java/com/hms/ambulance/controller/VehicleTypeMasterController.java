package com.hms.ambulance.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.jfree.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ambulance.dto.VehicleTypeMasterDto;
import com.hms.ambulance.service.VehicleTypeMasterService;

@RestController
@RequestMapping(value = "/vehicleTypeMaster")
public class VehicleTypeMasterController {
	
	@Autowired
	VehicleTypeMasterService vehicleTypeMasterService;

	static Logger log = Logger.getLogger(VehicleTypeMasterController.class.getName());

	
	@RequestMapping(value = "/saveVehicleType", method = RequestMethod.POST)
	public int saveVehicleTypeMaster(VehicleTypeMasterDto vehicle, HttpServletRequest request) {
		log.info("In VehicleTypeMasterController saveVehicleTypeMaster()");
		String msg = "";
		int response = vehicleTypeMasterService.saveVehicleTypeMaster(vehicle, request);
		log.debug("Reponse----> " + response);
		return response;
	}
	
	@RequestMapping(value = "/getAllVehicleTypeMaster", method = RequestMethod.GET)
	public @ResponseBody VehicleTypeMasterDto getAllVehicleTypeMaster(HttpServletRequest request) {
		log.info("In VehicleTypeMasterController getAllVehicleTypeMaster()");
		List<VehicleTypeMasterDto> listVehicleTypeMasterDto = new ArrayList<VehicleTypeMasterDto>();
		listVehicleTypeMasterDto = vehicleTypeMasterService.getAllVehicleTypeMaster(request);
		VehicleTypeMasterDto obj = new VehicleTypeMasterDto();
		obj.setListVehicleTypeMasterDto(listVehicleTypeMasterDto);
		System.out.println("list :  " + listVehicleTypeMasterDto);
		return obj;

	}
	
	@RequestMapping(value = "/deleteVehicleTypeMaster", method = RequestMethod.POST)
	public @ResponseBody String deleteVehicleTypeMaster(@RequestParam("vehicleType_Id") Integer vehicleTypeId,
			HttpServletRequest request) {
		log.info("In VehicleTypeMasterController deleteVehicleTypeMaster()");
		System.out.println("vehicle_Id :" + vehicleTypeId);
		boolean response = vehicleTypeMasterService.deleteVehicleTypeMaster(vehicleTypeId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Network issue";
		}
		Log.debug("Response------>" + msg);
		return msg;
	}
	
	@RequestMapping(value = "/editVehicleTypeMaster", method = RequestMethod.GET)
	public @ResponseBody VehicleTypeMasterDto editVehicleTypeMaster(@RequestParam("vehicleTypeId") Integer vehicleTypeId) {
		log.info("In VehicleTypeMasterController editVehicleTypeMaster()");
		VehicleTypeMasterDto obj = new VehicleTypeMasterDto();
		obj = vehicleTypeMasterService.editVehicleTypeMaster(vehicleTypeId);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
}
