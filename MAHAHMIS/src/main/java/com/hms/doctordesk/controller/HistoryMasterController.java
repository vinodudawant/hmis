package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.hms.doctordesk.dto.DdHistoryDto;
import com.hms.doctordesk.dto.HistoryMaster;
import com.hms.doctordesk.service.HistoryMasterService;

@RestController
@RequestMapping(value = "/history_master")
public class HistoryMasterController {
	static Logger log=Logger.getLogger(HistoryMasterController.class.getName());
	
	@Autowired
	HistoryMasterService historyMasterService;
	
	static {
		System.out.println("HistoryMasterController Loaded...!");
	}
	
	@RequestMapping(value = "/saveHistory", method = RequestMethod.POST)
	public int saveHistory(HistoryMaster history, HttpServletRequest request) {
		log.info("In HistoryMasterController saveHistory()");
		int response = historyMasterService.saveHistory(history, request);
		log.debug("Response--------> "+response);
		return response;
	}
	
	@RequestMapping(value = "/getAllHistoryMaster", method = RequestMethod.GET)
	public @ResponseBody
	HistoryMaster getAllHistoryMaster(HttpServletRequest request) {
		log.info("In HistoryMasterController getAllHistoryMaster()");
		List<HistoryMaster> lstHistoryMaster = new ArrayList<HistoryMaster>();
		lstHistoryMaster = historyMasterService.getAllHistoryMaster(request);
		HistoryMaster obj = new HistoryMaster();
		obj.setLstHistoryMaster(lstHistoryMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	@RequestMapping(value = "/editHistoryMaster", method = RequestMethod.GET)
	public @ResponseBody
	HistoryMaster editComplaintMaster(@RequestParam("historyId") Integer historyId) {
		log.info("In HistoryMasterController editHistoryMaster()");
		HistoryMaster obj = new HistoryMaster();
		obj = historyMasterService.editHistoryMaster(historyId);
		log.error("Response-----> "+obj);
		return obj;
	}	
	@RequestMapping(value = "/deleteHistoryMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteHistoryMaster(@RequestParam("historyId") Integer historyId,HttpServletRequest request) {
		log.info("In HistoryMasterController deleteHistoryMaster()");
		System.out.println("historyId :"+historyId);
		boolean response = historyMasterService.deleteHistoryMaster(historyId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		log.debug("Response---> "+msg);
		return msg;
	}	
	@RequestMapping(value = "/centerHistoryAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	HistoryMaster centerHistoryAutoSuggestion(@RequestParam("historyName")String historyName,@RequestParam("historyCode")String historyCode) {
		log.info("In HistoryMasterController centerHistoryAutoSuggestion()");
		List<HistoryMaster> lstHistoryMaster = new ArrayList<HistoryMaster>();
		lstHistoryMaster = historyMasterService.centerHistoryAutoSuggestion(historyName,historyCode);
		HistoryMaster obj = new HistoryMaster();
		obj.setLstHistoryMaster(lstHistoryMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	
	@RequestMapping(value = "/centerFamilyHistoryAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	HistoryMaster centerFamilyHistoryAutoSuggestion(@RequestParam("historyName")String historyName,@RequestParam("historyCode")String historyCode) {
		log.info("In HistoryMasterController centerFamilyHistoryAutoSuggestion()");
		List<HistoryMaster> lstHistoryMaster = new ArrayList<HistoryMaster>();
		lstHistoryMaster = historyMasterService.centerFamilyHistoryAutoSuggestion(historyName,historyCode);
		HistoryMaster obj = new HistoryMaster();
		obj.setLstHistoryMaster(lstHistoryMaster);
		log.debug("Response----> "+obj);
		return obj;
	}
	
	
	
	//DoctorDesk Histroy
	//Doctor Desk Current Episode save history
	  @RequestMapping(value = "/saveHistoryMaster", method = RequestMethod.POST)
	  @ResponseBody public int saveHistoryMaster(@RequestParam("historyDetails") String historyDetails,HttpServletRequest request)
	  {
		  int response = historyMasterService.saveHistoryMaster(historyDetails, request);
		  System.out.println("AAA:"+response);
		  return response; 
		  }
	  
	//Doctor Desk Current Episode fetch history
	@RequestMapping(value = "/fetchHistory", method = RequestMethod.GET)
	public @ResponseBody
	DdHistoryDto fetchHistory(@RequestParam("tid") int treatmentId,HttpServletRequest request) {
		log.info("In HistoryMasterController fetchComplaint()");
		List<DdHistoryDto> lstHistoryMaster = new ArrayList<DdHistoryDto>();
		lstHistoryMaster = historyMasterService.fetchHistory(treatmentId);
		DdHistoryDto obj = new DdHistoryDto();
		obj.setLstddHistoryList(lstHistoryMaster);
		log.debug("Response----> "+obj);
		return obj;
	}	
	
	//Doctor Desk Current Episode delete history
	@RequestMapping(value = "/deleteDDHistory", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDDHistory(@RequestParam("his_Id") Integer his_Id,HttpServletRequest request) {
		log.info("In historyMasterService deleteDDHistory()");
		System.out.println("his_Id :"+his_Id);
		boolean response = historyMasterService.deleteDDHistory(his_Id, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} /*else {
			msg = "Network issue";
		}*/
		log.debug("Response---> "+msg);
		return msg;
	}	
}
