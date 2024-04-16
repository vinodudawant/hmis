package com.hms.ipdbill.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipdbill.dto.AutosuggestionIpdQueueDto;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
import com.hms.ipdbill.service.IpdQueueService;
@Controller
@RequestMapping(value = "/ipdQueue")
public class IpdQueueController {
	
	@Autowired
	IpdQueueService ipdQueueService;

	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestationIpdQueue
	================*/
	
	@RequestMapping(value = "/autoSuggestationIpdQueue", method = RequestMethod.POST)
	public @ResponseBody
	AutosuggestionIpdQueueDto autoSuggestationIpdQueue(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom
			
		) {
		
		List<AutosuggestionIpdQueueDto> ltIpdQueueDTO = new ArrayList<AutosuggestionIpdQueueDto>();
		ltIpdQueueDTO = ipdQueueService.autoSuggestationIpdQueue(unit_id, callFrom, findText);		
		AutosuggestionIpdQueueDto obj=new AutosuggestionIpdQueueDto();
		obj.setLstIpdQueue(ltIpdQueueDTO);
		return obj;		
	}

	/* =============
	  Code By  : Badrinath Wagh
	  Code For : Get patients in ipd queue
	================*/
	
@RequestMapping(value = "/viewIpdQueue", method = RequestMethod.POST)
public @ResponseBody IpdQueueDTO getIpdQueue(@RequestParam("callFrom") String callFrom,@RequestParam ("startIndex")Integer startIndex,HttpServletRequest request) {
	
	IpdQueueDTO objIpdQueue=new IpdQueueDTO();
	List<IpdQueueDTO> lstIpdQueue = new ArrayList<IpdQueueDTO>();
	HttpSession session = request.getSession();
	Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
	lstIpdQueue = ipdQueueService.getIpdQueue(unitId,startIndex,callFrom);		
	objIpdQueue.setLstIpdQueue(lstIpdQueue);
	Integer ipdPatCount=ipdQueueService.getIpdPatientCount();
	objIpdQueue.setIpdPatCount(ipdPatCount);
	return objIpdQueue;
}

@RequestMapping(value = "/getIpdQueuePatientByTreatmentId", method = RequestMethod.POST)
public @ResponseBody IpdQueueDTO getIpdQueuePatientByTreatmentId(@RequestParam("treatId") Integer treatId) {
	
	IpdQueueDTO objIpdQueue=new IpdQueueDTO();
	
	objIpdQueue = ipdQueueService.getIpdQueuePatientByTreatmentId(treatId);		
	
	return objIpdQueue;
   }

@RequestMapping(value = "/autosuggesstionviewIpdbillPatients", method = RequestMethod.POST)
@ResponseBody
public IpdBillPatientsDTO autosuggesstionviewIpdbillPatients(@RequestParam("letter") String letter,
		@RequestParam("finalBill") String finalBill,@RequestParam("usertype") String usertype,HttpServletRequest request) {
	//System.err.println("hellohel"+deptId);
	IpdBillPatientsDTO objIpdbill=new IpdBillPatientsDTO();
	List<IpdBillPatientsDTO> lstIpdbillPatients = new ArrayList<IpdBillPatientsDTO>();
	lstIpdbillPatients = ipdQueueService.autosuggesstionviewIpdbillPatients(letter,finalBill,usertype,request);		
	objIpdbill.setLstIpdbillPatients(lstIpdbillPatients);
	return objIpdbill;
}	



}
