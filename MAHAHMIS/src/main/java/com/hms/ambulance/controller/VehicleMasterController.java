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

import com.hms.ambulance.dto.VehicleMasterDto;
import com.hms.ambulance.service.VehicleMasterService;
import com.hms.dto.Users;


@RestController
@RequestMapping(value = "/vehicleMaster")
public class VehicleMasterController {

	@Autowired
	VehicleMasterService vehicleMasterService;

	static Logger log = Logger.getLogger(VehicleMasterController.class.getName());

	@RequestMapping(value = "/saveVehicle", method = RequestMethod.POST)
	public int saveVehicleMaster(VehicleMasterDto vehicle, HttpServletRequest request) {
		log.info("In VehicleMasterController saveVehicleMaster()");
		String msg = "";
		int response = vehicleMasterService.saveVehicleMaster(vehicle, request);
		log.debug("Reponse----> " + response);
		return response;
	}

	@RequestMapping(value = "/getAllVehicleMaster", method = RequestMethod.GET)
	public @ResponseBody VehicleMasterDto getAllVehicleMaster(HttpServletRequest request) {
		log.info("In VehicleMasterController getAllVehicleMaster()");
		List<VehicleMasterDto> listVehicleMasterDto = new ArrayList<VehicleMasterDto>();
		listVehicleMasterDto = vehicleMasterService.getAllVehicleMaster(request);
		VehicleMasterDto obj = new VehicleMasterDto();
		obj.setListVehicleMasterDto(listVehicleMasterDto);
		System.out.println("list :  " + listVehicleMasterDto);
		return obj;

	}

	@RequestMapping(value = "/deleteVehicleMaster", method = RequestMethod.POST)
	public @ResponseBody String deleteVehicleMaster(@RequestParam("vehicle_Id") Integer vehicleId,
			HttpServletRequest request) {
		log.info("In VehicleMasterController deleteVehicleMaster()");
	
		boolean response = vehicleMasterService.deleteVehicleMaster(vehicleId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Network issue";
		}
		Log.debug("Response------>" + msg);
		return msg;
	}

	@RequestMapping(value = "/editVehicleMaster", method = RequestMethod.GET)
	public @ResponseBody VehicleMasterDto editVehicleMaster(@RequestParam("vehicleId") Integer vehicleId) {
		log.info("In VehicleMasterController editVehicleMaster()");
		VehicleMasterDto obj = new VehicleMasterDto();
		obj = vehicleMasterService.editVehicleMaster(vehicleId);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/getDriver",method = RequestMethod.GET)
	public @ResponseBody Users getNurse(@RequestParam("id") Integer user_ID)
	{
		log.info("In VehicleMasterController getDriver()");
		List<Users> user = new ArrayList<Users>();
		user = vehicleMasterService.getDriver(user_ID);
		Users obj=new Users();
		obj.setUsersList(user);
		return obj;
	}
	
	@RequestMapping(value = "/getVehicleTypeById", method = RequestMethod.GET)
	public @ResponseBody List<VehicleMasterDto> getVehicleTypeById(@RequestParam("vehicleTypeId") Integer vehicleTypeId) {
		log.info("In VehicleMasterController getVehicleTypeById()");
		List<VehicleMasterDto> listVehicleMasterDto = new ArrayList<VehicleMasterDto>();
		listVehicleMasterDto = vehicleMasterService.getVehicleTypeById(vehicleTypeId);
		
		return listVehicleMasterDto;

	}
}
