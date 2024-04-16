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

import com.hms.bmw.dto.TypeOfBagDto;
import com.hms.bmw.service.TypeOfBagService;


@RestController
@RequestMapping(value="/typeOfBag")
public class TypeOfBagController {

static Logger log=Logger.getLogger(TypeOfBagController.class.getName());
	
	@Autowired
	TypeOfBagService typeOfBagService;
	
	static {
		System.out.println("TypeOfBagController Loaded...!");
	}

	
	@RequestMapping(value = "/saveTypeOfBagMaster", method = RequestMethod.POST)
	public int saveTypeOfBagMaster(TypeOfBagDto typeOfBagdto, HttpServletRequest request) {
		log.info("In TypeOfBagController saveTypeOfBagMaster()");
		int response = typeOfBagService.saveTypeOfBagMaster(typeOfBagdto, request);
		log.debug("Response--------> "+response);
		return response;
	}

	
	@RequestMapping(value = "/getbagtypes", method = RequestMethod.GET)
	public @ResponseBody TypeOfBagDto getbagtypes(HttpServletRequest request) {
		
		List<TypeOfBagDto> list = new ArrayList<TypeOfBagDto>();
		list = typeOfBagService.getbagtypes(request);
		
		TypeOfBagDto obj = new TypeOfBagDto();
		obj.setTypeOfbagdto(list);
		
		return obj;
	}
	
	@RequestMapping(value = "/editTypeOfBagMaster", method = RequestMethod.GET)
	public @ResponseBody TypeOfBagDto editBmwStatus(@RequestParam("bag_ID") Integer bag_ID) {
		
		log.info("In StatusController editTypeOfBagMaster()");
		TypeOfBagDto obj = new TypeOfBagDto();
		obj = typeOfBagService.editTypeOfBagMaster(bag_ID);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteTypeOfBagMaster", method = RequestMethod.POST)
	public @ResponseBody String deleteTypeOfBagMaster(@RequestParam("bag_ID") Integer bag_ID,
			HttpServletRequest request) {
		
		log.info("In StatusController deleteTypeOfBagMaster()");
		
		boolean response = typeOfBagService.deleteTypeOfBagMaster(bag_ID, request);

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
