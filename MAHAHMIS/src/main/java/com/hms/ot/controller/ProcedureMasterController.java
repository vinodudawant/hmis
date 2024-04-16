package com.hms.ot.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ot.dto.ProcedureMasterDto;
import com.hms.ot.service.ProcedureMasterService;


@Controller
@RequestMapping("/procedureMaster")
public class ProcedureMasterController {

	@Autowired
	ProcedureMasterService procedureMasterService;
	
	@RequestMapping(value="/saveprocedureMaster",method=RequestMethod.POST)
	@ResponseBody
	public String savePro( ProcedureMasterDto procedureMasterDto,HttpServletRequest request){
		String response = procedureMasterService.saveProcedureMaster(procedureMasterDto, request);
		return response;
	}
	@RequestMapping(value="/getprocedure",method=RequestMethod.POST)
	@ResponseBody
	public List<ProcedureMasterDto> getProGrp(@RequestParam("callfrom") String callfrom){
		List<ProcedureMasterDto> list = procedureMasterService.getProcedureMasterList(callfrom);
		return list;
	}
	@RequestMapping(value="/getprocedureGrpById",method=RequestMethod.POST)
	@ResponseBody
	public List<ProcedureMasterDto> getProById(@RequestParam("id")int id){
		List<ProcedureMasterDto> list = procedureMasterService.getProcedureMasterById(id);
		return list;
	}
	@RequestMapping(value="/deleteprocedure",method=RequestMethod.POST)
	@ResponseBody
	public String deleteprocedure(@RequestParam("id")int id,HttpServletRequest request){
		String response = procedureMasterService.deleteProcedureMaster(id, request);
		return response;
	}
}
