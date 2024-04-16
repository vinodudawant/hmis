package com.hms.ehat.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.LabResultDTO;
import com.hms.ehat.service.LabResultService;

@Controller
@RequestMapping(value = "/labresult")
public class LabResultController {
	
	@Autowired
	LabResultService labResultService;
	
	@RequestMapping(value="/getResult",method = RequestMethod.POST)
	@ResponseBody
	public List<LabResultDTO> getResult(@RequestParam("reqNo") String reqNo){
		System.err.println("reqNoCont==>"+reqNo);
		List<LabResultDTO> labReqId  = labResultService.getResult(reqNo);
		
		return labReqId;
	}
	
	
	@RequestMapping(value="/getReqNoByTid",method = RequestMethod.POST)
	@ResponseBody
	public List<Integer> getReqNoByTid(@RequestParam("tid") Integer tid){
		System.err.println("tid==>"+tid);
		List<Integer> noLabReqId  = labResultService.getReqNoByTid(tid);
		
		return noLabReqId;
	}

}
