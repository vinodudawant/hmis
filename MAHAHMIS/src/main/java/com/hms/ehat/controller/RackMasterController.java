package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.service.RackMasterService;
import com.hms.ehat.service.RoomMasterService;

@Controller 
@RequestMapping(value="/rackmsater")
public class RackMasterController {
	@Autowired
	RackMasterService rackmasterservie;
	@RequestMapping(value = "/saverackMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saverackMaster(RackMasterDto rackmaster,
			HttpServletRequest request) {
		int response = rackmasterservie.saveorUpdateRackMaster(rackmaster, request);
		
		return response;	
	}	
	
	@RequestMapping(value = "/getAllRackMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	RackMasterDto getAllRackMasterDoc(HttpServletRequest request) {
		List<RackMasterDto> lstrackMaster = new ArrayList<RackMasterDto>();
		lstrackMaster = rackmasterservie.getAllRackMaster(request);
		RackMasterDto obj = new RackMasterDto();
		obj.setLstrackMaster(lstrackMaster);
		return obj;
	}	
	
	@RequestMapping(value = "/editRackDoc", method = RequestMethod.GET)
	public @ResponseBody
	RackMasterDto editRackDoc(@RequestParam("rackId") Integer rackId) {
		RackMasterDto obj = new RackMasterDto();
		obj = rackmasterservie.editRackDoc(rackId);	
		return obj;
	}	
	
	@RequestMapping(value = "/deleteRackMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteRackMaster(@RequestParam("rackId") Integer rackId,HttpServletRequest request) {
		boolean response = rackmasterservie.deleteRackMaster(rackId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "You Can Not Delete Rack First Delete Releted Shelf first";
		}
		return msg;
	}	


}
