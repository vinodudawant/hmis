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

import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.ShelfDocDto;
import com.hms.ehat.service.ShelfDocService;

@Controller 
@RequestMapping(value="/shelfdoc")
public class ShelfDocController 
{
	@Autowired
	ShelfDocService shelfdocservice;
	@RequestMapping(value = "/saveSelfMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveSelfMaster(ShelfDocDto shelfDocMaster,
			HttpServletRequest request) {
		int response = shelfdocservice.saveorUpdateShelDoc(shelfDocMaster, request);
	  return response;
	}	
	
	@RequestMapping(value = "/getAllShelfDoc", method = RequestMethod.GET)
	public @ResponseBody
	ShelfDocDto getAllShelfDoc(HttpServletRequest request) {
		List<ShelfDocDto> ltDeptMasters = new ArrayList<ShelfDocDto>();
		ltDeptMasters = shelfdocservice.getAllShelDoc(request);
		ShelfDocDto obj = new ShelfDocDto();
		obj.setLstShelfDoc(ltDeptMasters);
		return obj;
	}	
	
	@RequestMapping(value = "/editShelfDoc", method = RequestMethod.GET)
	public @ResponseBody
	ShelfDocDto editShelfDoc(@RequestParam("selfDocId") Integer selfDocId) {
		ShelfDocDto obj = new ShelfDocDto();
		obj = shelfdocservice.editShelfDoc(selfDocId);	
		return obj;
	}	
	
	@RequestMapping(value = "/deleteShelfDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteShelfDoc(@RequestParam("selfDocId") Integer selfDocId,HttpServletRequest request) {
		boolean response = shelfdocservice.deleteShelfDoc(selfDocId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "You Can Not Delete Shelf";
		}
		return msg;
	}	
	
	@RequestMapping(value = "/getAllRackByRoomId", method = RequestMethod.GET)
	public @ResponseBody
	RackMasterDto getAllRackByRoomId(HttpServletRequest request,@RequestParam("roomID") Integer roomID) {
		List<RackMasterDto> lstrackMaster = new ArrayList<RackMasterDto>();
		lstrackMaster = shelfdocservice.getAllRackByRoomId(roomID);
		RackMasterDto obj = new RackMasterDto();
		obj.setLstrackMaster(lstrackMaster);
		return obj;
	}
	
	
	@RequestMapping(value = "/getAllShelfByRackId", method = RequestMethod.GET)
	public @ResponseBody
	ShelfDocDto getAllShelfByRackId(HttpServletRequest request,@RequestParam("rackId") Integer rackId) {
		List<ShelfDocDto> ltDeptMasters = new ArrayList<ShelfDocDto>();
		ltDeptMasters = shelfdocservice.getAllShelfByRackId(rackId);
		ShelfDocDto obj = new ShelfDocDto();
		obj.setLstShelfDoc(ltDeptMasters);
		return obj;
	}	
	
}
