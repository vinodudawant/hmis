package com.hms.doctordesk.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.TnmGroupMaster;
import com.hms.doctordesk.dto.TnmMasterDto;
import com.hms.doctordesk.service.TnmMasterService;

@Controller
@RequestMapping(value="/tnmMaster")
public class TnmMasterController {

	@Autowired
	TnmMasterService tnmMasterService;
	
	@RequestMapping(value="/savetnmMaster",method=RequestMethod.POST)
	@ResponseBody
	public String saveTnmMaster(@RequestParam("tabletnmData") String tnmMaster , @RequestParam("tabletnmNmData") String tabletnmNmData,
			@RequestParam("tabletnmMetaData") String tabletnmMetaData,HttpServletRequest request){
		String response = tnmMasterService.saveOnTnmMaster(tnmMaster, request,tabletnmNmData,tabletnmMetaData);
		return response;
		
	}
	@RequestMapping(value="/getTnmDetails",method=RequestMethod.POST)
	@ResponseBody
	public List<TnmMasterDto> getTnmDetails(@RequestParam("bodyPartId")int bodyPartId,HttpServletRequest request){
		List<TnmMasterDto> response = tnmMasterService.getTnmDetails(bodyPartId,request);
		return response;
		
	}
	@RequestMapping(value="/saveTnmGroups",method=RequestMethod.POST)
	@ResponseBody
	public String saveTnmGroupMaster(TnmGroupMaster tnmGroupMaster,HttpServletRequest request){
		String response = tnmMasterService.saveTnmGroupMaster(tnmGroupMaster, request);
		return response;
		
	}
	@RequestMapping(value="/deleteTnmGroups",method=RequestMethod.POST)
	@ResponseBody
	public String deleteTnmGroupMaster(TnmGroupMaster tnmGroupMaster,@RequestParam("id")int id){
		String response = tnmMasterService.deleteTnmGroupMaster(id);
		return response;
	}
	
	@RequestMapping(value="/getTnmGroupsById",method=RequestMethod.POST)
	@ResponseBody
	public List<TnmGroupMaster> getTnmGroupMasterById(TnmGroupMaster tnmGroupMaster,@RequestParam("id")int id){
		 List<TnmGroupMaster>  response = tnmMasterService.getTmnListById(id);
		return response;
	}
	@RequestMapping(value="/getTnmGroups",method=RequestMethod.GET)
	@ResponseBody
	public List<TnmGroupMaster> getTnmGroupMaster(HttpServletRequest request){
		 List<TnmGroupMaster>  response = tnmMasterService.getTnmGroupList(request);
		return response;
	}
	
	@RequestMapping(value="/getGroupNameByTnmStage",method=RequestMethod.GET)
	@ResponseBody
	public String  getGroupNameByTnmStage(@RequestParam("groupStage")String groupStage,HttpServletRequest request){
		String msg="";
		msg = tnmMasterService.getGroupNameByTnmStage(groupStage);
		return msg;
	}
}