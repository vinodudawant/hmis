package com.hms.doctordesk.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;

import com.hms.doctordesk.service.GroupInstService;

@Controller
@RequestMapping(value = "/ddgroupInst")
public class GroupInstController {

	@Autowired
	GroupInstService groupInstService;

	@RequestMapping(value = "/saveGroupDetails", method = RequestMethod.POST)
	@ResponseBody
	public String saveInstrDetails(GroupInstructionMaster groupInstructionMaster, HttpServletRequest request) {
		String response = groupInstService.saveGroupInstrutionDetails(groupInstructionMaster, request);
		return response;

	}

	@RequestMapping(value = "/getGroupDetails", method = RequestMethod.GET)
	@ResponseBody
	public List<GroupInstructionMaster> getAllGroupDetails(HttpServletRequest request,@RequestParam("callFrom") String callFrom) {
		List<GroupInstructionMaster> response = groupInstService.getAllGroupDetails(request,callFrom);
		return response;

	}

	@RequestMapping(value = "/getGroupDetailsById", method = RequestMethod.POST)
	@ResponseBody
	public List<GroupInstructionMaster> getAllGroupDetailsNById(@RequestParam("id") int id) {
		List<GroupInstructionMaster> response = groupInstService.getAllGroupDetailsById(id);
		return response;

	}

	@RequestMapping(value = "/getGroupDetailsByName", method = RequestMethod.POST)
	@ResponseBody
	public List<GroupInstructionMaster> getAllGroupDetailsNByName(@RequestParam("instname") String searchText,HttpServletRequest request) {
		List<GroupInstructionMaster> response = groupInstService.getAllGroupDetailByName(searchText, request);
		return response;
	}

	@RequestMapping(value = "/saveTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String saveTemplate(GroupTemplateMaster groupTemplateMaster, HttpServletRequest request) {
		String response = groupInstService.saveTemplate(groupTemplateMaster, request);
		return response;

	}

	@RequestMapping(value = "/getTemplates", method = RequestMethod.GET)
	@ResponseBody
	public List<GroupTemplateMaster> getAllTemplates(HttpServletRequest request) {
		List<GroupTemplateMaster> response = groupInstService.getTemplateList(request);
		return response;
	}

	@RequestMapping(value = "/getTemplatesById", method = RequestMethod.POST)
	@ResponseBody
	public List<GroupTemplateMaster> getTemplateById(@RequestParam("tempIds") int id) {
		List<GroupTemplateMaster> response = groupInstService.getInstListByTempId(id);
		return response;
	}

	@RequestMapping(value = "/deleteInstruction", method = RequestMethod.POST)
	@ResponseBody
	public String deleteInstruction(@RequestParam("delId") int id, HttpServletRequest request) {
		String response = groupInstService.deleteGroupscript(id, request);
		return response;
	}

	@RequestMapping(value = "/deleteTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String deleteTemplate(@RequestParam("delTempId") int id, HttpServletRequest request) {
		String response = groupInstService.deleteTemplate(id, request);
		return response;
	}
	
	//added by vishant @code for save multiple instruction
	@RequestMapping(value = "/saveMultipleGroupDetails", method = RequestMethod.POST)
	@ResponseBody
	public String saveMultipleGroupDetails(@RequestBody GroupInstructionMaster groupInstructionMaster, HttpServletRequest request) {
		String response = groupInstService.saveMultipleGroupDetails(groupInstructionMaster, request);
		return response;

	}
}
