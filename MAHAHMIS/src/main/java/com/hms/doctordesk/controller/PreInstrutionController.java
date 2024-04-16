package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.service.PrescriptionInstructionService;

@Controller
@RequestMapping(value="/doctorDesk")
public class PreInstrutionController {

	@Autowired
	PrescriptionInstructionService prescriptionInstructionService;
	
	@RequestMapping(value="/savePreDetails",method=RequestMethod.POST)
	@ResponseBody
	public String saveInstrDetails(PrescriptionInstructionDto prescriptionInstructionDto,HttpServletRequest request){
		String response = prescriptionInstructionService.savePreInstrutionDetals(prescriptionInstructionDto, request);
		return response;
		
	}
	@RequestMapping(value="/getPreDetails",method=RequestMethod.GET)
	@ResponseBody
	public List<PrescriptionInstructionDto> getAllPreDetails(HttpServletRequest request){
		 List<PrescriptionInstructionDto> response = prescriptionInstructionService.getAllPreDetails(request);
		return response;
		
	}
	@RequestMapping(value="/getPreDetailsById",method=RequestMethod.POST)
	@ResponseBody
	public List<PrescriptionInstructionDto> getAllPreDetailsNById(@RequestParam("id") int id){
		 List<PrescriptionInstructionDto> response = prescriptionInstructionService.getAllPreDetailsById(id);
		return response;
		
	}
	@RequestMapping(value="/getPreDetailsByName",method=RequestMethod.POST)
	@ResponseBody
	public List<PrescriptionInstructionDto> getAllPreDetailsNByName(@RequestParam("instname") String searchText,HttpServletRequest request){
		 List<PrescriptionInstructionDto> response = prescriptionInstructionService.getAllPreDetailByName(searchText,request);
		return response;
	}
	
	@RequestMapping(value="/saveTemplate",method=RequestMethod.POST)
	@ResponseBody
	public String saveTemplate(PresTemplateMaster presTemplateMaster,HttpServletRequest request){
		String response = prescriptionInstructionService.saveTemplate(presTemplateMaster,request);
		return response;
		
	}
	@RequestMapping(value="/getTemplates",method=RequestMethod.GET)
	@ResponseBody
	public List<PresTemplateMaster> getAllTemplates(HttpServletRequest request){
		List<PresTemplateMaster> response = prescriptionInstructionService.getTemplateList(request);
		return response;
	}
	@RequestMapping(value="/getTemplatesById",method=RequestMethod.POST)
	@ResponseBody
	public List<PresTemplateMaster> getTemplateById(@RequestParam("tempIds") int id){
		List<PresTemplateMaster> response = prescriptionInstructionService.getInstListByTempId(id);
		return response;
	}
	
	@RequestMapping(value="/deleteInstruction",method=RequestMethod.POST)
	@ResponseBody
	public String deleteInstruction(@RequestParam("delId") int id,HttpServletRequest request){
		String response = prescriptionInstructionService.deletePrescript(id,request);
		return response;
	}
	@RequestMapping(value="/deleteTemplate",method=RequestMethod.POST)
	@ResponseBody
	public String deleteTemplate(@RequestParam("delTempId") int id,HttpServletRequest request){
		String response = prescriptionInstructionService.deleteTemplate(id, request);
		return response;
	}
	
	@RequestMapping(value="/getIntsructionsForPrescriptions",method=RequestMethod.GET)
	@ResponseBody
	public PrescriptionInstructionDto getIntsructionsForPrescriptions(HttpServletRequest request){
		
		 PrescriptionInstructionDto obj = new PrescriptionInstructionDto();
		 List<PrescriptionInstructionDto> response = prescriptionInstructionService.getAllPreDetails(request);
		 obj.setListPrescriptionInstructionDto(response);
		 
		return obj;
		
	}
}