package com.hms.ot.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ot.service.ProcedureTypeService;
import com.hms.ot.dto.*;

@Controller
@RequestMapping(value="/newOt")
public class ProcedureTypeController {


	@Autowired
	ProcedureTypeService procedureTypeService;
	
	@RequestMapping(value="/saveprocedureType",method=RequestMethod.POST)
	@ResponseBody
	public String saveProType( ProcedureTypeMasterDto procedureTypeMasterDto,HttpServletRequest request){
		String response = procedureTypeService.saveProcedureType(procedureTypeMasterDto, request);
		return response;
	}
	@RequestMapping(value="/getprocedureType",method=RequestMethod.POST)
	@ResponseBody
	public List<ProcedureTypeMasterDto> getProTypes(@RequestParam("callfrom") String callfrom){
		List<ProcedureTypeMasterDto> list = procedureTypeService.getProcedureTypeList(callfrom);
		return list;
	}
	@RequestMapping(value="/getprocedureTypeById",method=RequestMethod.POST)
	@ResponseBody
	public List<ProcedureTypeMasterDto> getProTypeById(@RequestParam("id")int id){
		List<ProcedureTypeMasterDto> list = procedureTypeService.getProcedureTypeById(id);
		return list;
	}
	@RequestMapping(value="/deleteprocedureType",method=RequestMethod.POST)
	@ResponseBody
	public String deleteprocedureType(@RequestParam("id")int id,HttpServletRequest request){
		String response = procedureTypeService.deleteProcedureType(id, request);
		return response;
	}
	
}
