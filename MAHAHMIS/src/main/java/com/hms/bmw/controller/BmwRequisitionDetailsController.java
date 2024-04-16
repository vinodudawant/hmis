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

import com.hms.bmw.dto.BmwRequisitionCountDto;
import com.hms.bmw.dto.BmwRequisitionDetails;
import com.hms.bmw.service.BmwRequisitionDetailsService;
import com.hms.dto.Users;

@RestController
@RequestMapping(value="bmwRequisition")
public class BmwRequisitionDetailsController {

static Logger log=Logger.getLogger(BmwRequisitionDetailsController.class.getName());
	
	@Autowired
	BmwRequisitionDetailsService bmwRequisitionDetailsService;
	
	static {
		System.out.println("BmwRequisitionDetailsController Loaded...!");
	}

	
	@RequestMapping(value = "/saveBmwRequisitionDetailsMaster", method = RequestMethod.POST)
	public int saveBmwRequisitionDetailsMaster(BmwRequisitionDetails bmwRequisitionDetails, HttpServletRequest request) {
		log.info("In BmwRequisitionDetailsController saveBmwRequisitionDetailsMaster()");
		int response = bmwRequisitionDetailsService.saveBmwRequisitionDetailsMaster(bmwRequisitionDetails, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getBmwRequisitionDetailsMaster", method = RequestMethod.GET)
	public @ResponseBody
	BmwRequisitionDetails getBmwRequisitionDetailsMaster(@RequestParam("status") String status,HttpServletRequest request) {
		log.info("In BmwRequisitionDetailsController getBmwRequisitionDetailsMaster()");
		List<BmwRequisitionDetails> lstBmwRequisitionDetails = new ArrayList<BmwRequisitionDetails>();
		lstBmwRequisitionDetails = bmwRequisitionDetailsService.getBmwRequisitionDetailsMaster(status,request);
		BmwRequisitionDetails obj = new BmwRequisitionDetails();
		obj.setLstBmwRequisitionDetails(lstBmwRequisitionDetails);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/editBmwRequisitionDetailsMaster", method = RequestMethod.GET)
	public @ResponseBody
	BmwRequisitionDetails editBmwRequisitionDetailsMaster(@RequestParam("bmwUserId") Integer bmwUserId) {
		log.info("In BmwRequisitionDetailsController editBmwRequisitionDetailsMaster()");
		BmwRequisitionDetails obj = new BmwRequisitionDetails();
		
		obj = bmwRequisitionDetailsService.editBmwRequisitionDetailsMaster(bmwUserId);
		
		log.error("Response-----> "+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteBmwRequisitionDetailsMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteBmwRequisitionDetailsMaster(@RequestParam("id") Integer bmwUserId,HttpServletRequest request) {
		log.info("In BmwRequisitionDetailsController deleteBmwRequisitionDetailsMaster()");
		boolean response = bmwRequisitionDetailsService.deleteBmwRequisitionDetailsMaster(bmwUserId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	
	
	@RequestMapping(value = "/getNurse",method = RequestMethod.GET)
	public @ResponseBody Users getNurse(@RequestParam("id") Integer user_ID)
	{
		log.info("In BmwRequisitionDetailsController getNurse()");
		List<Users> user = new ArrayList<Users>();
		user = bmwRequisitionDetailsService.getNurse(user_ID);
		Users obj=new Users();
		obj.setUsersList(user);
		return obj;
	}
	
	@RequestMapping(value = "/getNextAutoIncrement", method = RequestMethod.GET)
	public @ResponseBody
	Integer getNextAutoIncrement() {
		log.info("In Pharmacy getNextAutoIncrement()");
		Integer id = bmwRequisitionDetailsService.getNextAutoIncrement();
		return id;
	}
	
	@RequestMapping(value = "/getfilterBmwRequisitionDetailsMaster" , method = RequestMethod.GET)
	public @ResponseBody
	BmwRequisitionDetails getfilterBmwRequisitionDetailsMaster(@RequestParam("fdate") String fdate, @RequestParam("tdate") String tdate,
			 @RequestParam("department") String department, @RequestParam("wardTypeSelect") String wardTypeSelect,
			 @RequestParam("typeOfBag") String typeOfBag, @RequestParam("bag_Status") String bag_Status) {
		
		List<BmwRequisitionDetails> list = new ArrayList<BmwRequisitionDetails>();
		//System.out.println("fdate"+fdate+", tdate"+tdate+", department"+department+", wardTypeSelect"+wardTypeSelect+", typeOfBag"+typeOfBag+"");
		
		list = bmwRequisitionDetailsService.getfilterBmwRequisitionDetailsMaster(fdate, tdate, department, wardTypeSelect, typeOfBag, bag_Status);
		BmwRequisitionDetails obj = new BmwRequisitionDetails();
		
		obj.setLstBmwRequisitionDetails(list);
		
		return obj;
	}
	
	@RequestMapping(value = "/approveBmwRequisition", method = RequestMethod.GET)
	public @ResponseBody int approveBmwRequisition(@RequestParam("id") String  id,@RequestParam("userId") Integer  userId)
	{
		log.info("In BmwRequisitionDetailsController approveBmwRequisition()");
		
		int res = bmwRequisitionDetailsService.approveBmwRequisition(id, userId);
		
		return res;
		
	}
	
	@RequestMapping(value = "/assignBmwRequisition", method = RequestMethod.GET)
	public @ResponseBody int assignBmwRequisition(@RequestParam("id") String  id,@RequestParam("userId") Integer  userId)
	{
		log.info("In BmwRequisitionDetailsController assignBmwRequisition()");
		
		int res = bmwRequisitionDetailsService.assignBmwRequisition(id, userId);
		
		return res;
		
	}
	
	@RequestMapping(value = "/completeBmwRequisition", method = RequestMethod.GET)
	public @ResponseBody int completeBmwRequisition(@RequestParam("id") String  id,@RequestParam("userId") Integer  userId)
	{
		log.info("In BmwRequisitionDetailsController completeBmwRequisition()");
		
		int res = bmwRequisitionDetailsService.completeBmwRequisition(id, userId);
		
		return res;
		
	}
	
	@RequestMapping(value = "/getBMWusers", method = RequestMethod.GET)
	public @ResponseBody Users getBMWusers()
	{
		List<Users> list = new ArrayList<Users>();
		
		list = bmwRequisitionDetailsService.getBMWusers();
		
		Users obj = new Users();
		
		obj.setUsersList(list);
		
		return obj;
		
	}
	
	@RequestMapping(value = "/getBmwRequisitionCount" , method = RequestMethod.GET)
	public @ResponseBody BmwRequisitionCountDto getBmwRequisitionCount(HttpServletRequest request) {
		log.info("In BmwRequisitionDetailsController getBmwRequisitionCount()");
		BmwRequisitionCountDto obj = new BmwRequisitionCountDto();
		obj = bmwRequisitionDetailsService.getBmwRequisitionCount(0,request);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/getBmwBagWiseCount" , method = RequestMethod.GET)
	public @ResponseBody BmwRequisitionDetails getBmwBagWiseCount(HttpServletRequest request) {
		log.info("In BmwRequisitionDetailsController getBmwBagWiseCount()");
		List<BmwRequisitionDetails> list = new ArrayList<BmwRequisitionDetails>();
		list = bmwRequisitionDetailsService.getBmwBagWiseCount(0,request);
		
		BmwRequisitionDetails obj = new BmwRequisitionDetails();
		obj.setLstBmwRequisitionDetails(list);
		
		Log.debug("Response----->" + obj);
		return obj;
	}

}

