package com.hms.ot.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ot.dto.ProcedureGroupMasterDto;
import com.hms.ot.service.ProcedureGrpService;

@Controller
@RequestMapping(value="/procedureGrp")
public class ProcedureGrpController {

	@Autowired
	ProcedureGrpService procedureGrpService;
	
	@RequestMapping(value="/saveprocedureGrp",method=RequestMethod.POST)
	@ResponseBody
	public String saveProgrp( ProcedureGroupMasterDto procedureGroupMasterDto,HttpServletRequest request){
		String response = procedureGrpService.saveProcedureGrp(procedureGroupMasterDto, request);
		return response;
	}
	@RequestMapping(value="/getproceduregrp",method=RequestMethod.POST)
	@ResponseBody
	public List<ProcedureGroupMasterDto> getProGrp(@RequestParam("callfrom") String callfrom){
		List<ProcedureGroupMasterDto> list = procedureGrpService.getProcedureGrpList(callfrom);
		return list;
	}
	@RequestMapping(value="/getprocedureGrpById",method=RequestMethod.POST)
	@ResponseBody
	public List<ProcedureGroupMasterDto> getProGrpById(@RequestParam("id")int id){
		List<ProcedureGroupMasterDto> list = procedureGrpService.getProcedureGrpById(id);
		return list;
	}
	@RequestMapping(value="/deleteprocedureType",method=RequestMethod.POST)
	@ResponseBody
	public String deleteprocedureGrp(@RequestParam("id")int id,HttpServletRequest request){
		String response = procedureGrpService.deleteProcedureGrp(id, request);
		return response;
	}
}