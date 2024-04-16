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

import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.service.DocChecklistService;
import com.hms.ehat.service.FolderDocService;

@Controller 
@RequestMapping(value="/doccheklist")
public class DocChecklistController {
	@Autowired
	DocChecklistService docchecklistservice;
	@RequestMapping(value = "/saveDocCheckList", method = RequestMethod.POST)
	@ResponseBody
	public int saveDocCheckList(DocChecklistDto docobj,
			HttpServletRequest request) {
		int response = docchecklistservice.saveorUpdateDocChecklist(docobj, request);
		
		return response;	
	}	
	
	@RequestMapping(value = "/getAllDocChecklist", method = RequestMethod.POST)
	public @ResponseBody
	DocChecklistDto getAllDocChecklist(HttpServletRequest request) {
		List<DocChecklistDto> lstDocchecklist = new ArrayList<DocChecklistDto>();
		lstDocchecklist = docchecklistservice.getAllDocChecklist(request);
		DocChecklistDto obj = new DocChecklistDto();
		obj.setLstChecklistDoc(lstDocchecklist);
		return obj;
	}	
	
	@RequestMapping(value = "/editDocChecklist", method = RequestMethod.GET)
	public @ResponseBody
	DocChecklistDto editDocChecklist(@RequestParam("docId") Integer docId) {
		DocChecklistDto obj = new DocChecklistDto();
		obj = docchecklistservice.editDocChecklist(docId);		
		return obj;
	}	
	
	@RequestMapping(value = "/deleteDocCheckList", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDocCheckList(@RequestParam("docId") Integer docId,HttpServletRequest request) {
		boolean response = docchecklistservice.deletefDocChecklist(docId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

}
