package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.dto.TreatmentInstruction;
import com.hms.doctordesk.service.InstructionService;
import com.hms.pharmacy.pojo.ProductMaster;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value="/instructionController")
@Slf4j
public class InstructionController {

	@Autowired
	InstructionService instructionService;
	
	
	
	private static final org.slf4j.Logger logger =  LoggerFactory.getLogger(InstructionController.class);
	
	@RequestMapping(value="/saveIndividualTreatmentInstruction",method=RequestMethod.POST)
	@ResponseBody
	public boolean saveIndividualTreatmentInstruction(String treatmentId,
			String[] individualTreatmentInstructionCheckboxIDArray) {
		boolean status= instructionService.saveIndividualTreatmentInstruction(treatmentId,individualTreatmentInstructionCheckboxIDArray);
		return status;
	}
	
	@RequestMapping(value="/savePCAdminInstruction",method=RequestMethod.POST)
	@ResponseBody
	public boolean saveIndividualTreatmentInstruction(@RequestParam("treatmentId")String treatmentId,
			@RequestParam("PCTreatmentInstructionNameID") Integer pCTreatmentInstructionNameID) {
		boolean status= instructionService.savePCAdminInstruction(treatmentId,pCTreatmentInstructionNameID);
		return status;
	}
	
	@RequestMapping(value = "/autoSuggetionInstruction", method = RequestMethod.POST)
	public @ResponseBody
	List<GroupTemplateMaster> autoSuggestionProduct(@RequestParam("auto") String auto, @RequestParam("data") String data,
			@RequestParam("q") String letter) {
		List<GroupTemplateMaster> groupTemplateMaster1 = new ArrayList<GroupTemplateMaster>();
		try {
			groupTemplateMaster1 = instructionService.getAutoSuggestionProduct(letter);
		} catch (Exception e) {
			e.printStackTrace();
		
			return null;
		
	}
		return groupTemplateMaster1;

	}
	
	@RequestMapping(value = "/fetchPCTreatmentInstruction", method = RequestMethod.POST)
	@ResponseBody
	public TreatmentInstruction fetchPCTreatmentInstruction(@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
		
		logger.info("In InstructionController : fetchPCTreatmentInstruction()");
		
		List<TreatmentInstruction> listMaster = new ArrayList<TreatmentInstruction>();
		TreatmentInstruction obj = new TreatmentInstruction();
		listMaster = instructionService.fetchPCTreatmentInstruction(treatmentId, request);
		
		System.out.println("list :  " + listMaster);
		
		obj.setListTreatmentInstruction(listMaster);
		logger.debug("Response----> " + obj);
		return obj;
	}
	
	@RequestMapping(value="/deletePCTreatmentInstruction",method=RequestMethod.POST)
	@ResponseBody
	public boolean deletePCTreatmentInstruction(@RequestParam("treatmentId")String treatmentId,
			@RequestParam("PCTreatmentInstructionID") Integer pCTreatmentInstructionNameID) {
		boolean status= instructionService.deletePCTreatmentInstruction(treatmentId,pCTreatmentInstructionNameID);
		return status;
	}
	
	@RequestMapping(value = "/fetchGroupReportInstruction", method = RequestMethod.POST)
	public @ResponseBody
	List<String> fetchGroupReportInstruction(@RequestParam("treatmentId") Integer treatmentId) {
		List<String> groupTemplateMaster1 = new ArrayList<String>();
		try {
			List<String> groupTemplateMaster = instructionService.fetchPCTreatmentInstruction(treatmentId);
			groupTemplateMaster1.addAll(groupTemplateMaster);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		
			return null;
		
	}
		return groupTemplateMaster1;

	}
	
}
