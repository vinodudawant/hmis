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

import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.dto.ShelfDocDto;
import com.hms.ehat.service.RoomMasterService;
import com.hms.ehat.service.ShelfDocService;

@Controller 
@RequestMapping(value="/roommsater")
public class RoomMasterController {
	@Autowired
	RoomMasterService roommasterservice;
	@RequestMapping(value = "/saveroomMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveroomMaster(RoomMasterDto roommaster,
			HttpServletRequest request) {
		int response = roommasterservice.saveorUpdateRoomMaster(roommaster, request);
		
		return response;	
	}	
	
	@RequestMapping(value = "/getAllRoomMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	RoomMasterDto getAllRoomMasterDoc(HttpServletRequest request) {
		List<RoomMasterDto> lstroomMaster = new ArrayList<RoomMasterDto>();
		lstroomMaster = roommasterservice.getAllRoomMaster(request);
		RoomMasterDto obj = new RoomMasterDto();
		obj.setLstroomMaster(lstroomMaster);
		return obj;
	}	
	
	@RequestMapping(value = "/editRoomDoc", method = RequestMethod.GET)
	public @ResponseBody
	RoomMasterDto editRoomDoc(@RequestParam("roomId") Integer roomId) {
		RoomMasterDto obj = new RoomMasterDto();
		obj = roommasterservice.editRoomDoc(roomId);	
		return obj;
	}	
	
	@RequestMapping(value = "/deleteRoomMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteRoomMaster(@RequestParam("roomId") Integer roomId,HttpServletRequest request) {
		boolean response = roommasterservice.deleteRoomMaster(roomId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "You Can Not Delete Room First Delete Releted Rack first";
		}
		return msg;
	}	

}
