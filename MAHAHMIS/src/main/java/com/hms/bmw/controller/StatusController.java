package com.hms.bmw.controller;

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

import com.hms.bmw.dto.BmwStatusDto;
import com.hms.bmw.service.StatusService;
@RestController
@RequestMapping(value="/bmwStatus")

public class StatusController {
static Logger log=Logger.getLogger(StatusController.class.getName());
	
	@Autowired
	StatusService statusService;
	
	static {
		System.out.println("StatusController Loaded...!");
	}

	
	@RequestMapping(value = "/savebmwStatusMaster", method = RequestMethod.POST)
	public int savebmwStatusMaster(BmwStatusDto bmwStatusDto, HttpServletRequest request) {
		log.info("In StatusController savebmwStatusMaster()");
		int response = statusService.savebmwStatusMaster(bmwStatusDto, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getstatustypes", method = RequestMethod.GET)
	public @ResponseBody BmwStatusDto getstatustypes(HttpServletRequest request) {
		
		log.info("In StatusController getstatustypes()");
		List<BmwStatusDto> list = new ArrayList<BmwStatusDto>();
		list = statusService.getstatustypes(request);
		BmwStatusDto obj = new BmwStatusDto();
		obj.setBmwStatusDto(list);
		System.out.println("list :  " + list);
		return obj;
	}
	
	@RequestMapping(value = "/editBmwStatus", method = RequestMethod.GET)
	public @ResponseBody BmwStatusDto editBmwStatus(@RequestParam("statusID") Integer statusID) {
		
		log.info("In StatusController editBmwStatus()");
		BmwStatusDto obj = new BmwStatusDto();
		obj = statusService.editBmwStatus(statusID);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteBmwStatus", method = RequestMethod.POST)
	public @ResponseBody String deleteBmwStatus(@RequestParam("statusID") Integer statusID,
			HttpServletRequest request) {
		
		log.info("In StatusController deleteBmwStatus()");
		
		boolean response = statusService.deleteBmwStatus(statusID, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Network issue";
		}
		Log.debug("Response------>" + msg);
		return msg;
	}
	

}
