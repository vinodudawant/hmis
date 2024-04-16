package com.hms.ehat.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.dto.GroupMasterDTO;
import com.hms.ehat.service.GroupMasterService;

@RestController
@RequestMapping(value = "/groupmastermethod")
public class GroupMasterController {

	@Autowired
	 GroupMasterService groupMasterService;
	
	@RequestMapping(value = "/savegroupmasterrecord", method = RequestMethod.POST)
	public String saveGroupmasterRecord(GroupMasterDTO dto, HttpServletRequest request){
		return groupMasterService.saveGroupmasterRecord(dto, request);
	}
	
	@RequestMapping(value = "/getallgroupmaster", method = RequestMethod.GET)
	public GroupMasterDTO getAllGrooupmMaster(@RequestParam("searchText") String searchText, @RequestParam("callFrom") String type){
		return groupMasterService.getAllGrooupMaster(searchText, type);
	}
	
	@RequestMapping(value = "/editgroupmasterrecord/{id}", method = RequestMethod.GET)
	public GroupMasterDTO editGroupMasterrecord(@PathVariable("id") int groupMasterId){
		return groupMasterService.editGroupMasterrecord(groupMasterId);
	}
	@RequestMapping(value = "/deletegroupmasterrecord/{id}", method = RequestMethod.DELETE)
	public boolean deleteGroupMasterRecord(@PathVariable("id") int groupMasterId, HttpServletRequest request){
		return groupMasterService.deleteGroupMasterRecord(groupMasterId, request);
	}
	@RequestMapping(value = "/getAllHeadingList", method = RequestMethod.POST)
	public GroupMasterDTO getAllHeadingList( HttpServletRequest request){
		//log.info("In LabTestController getAllHeadingList()..");
		return groupMasterService.getAllHeadingList( request);
	}

	
}
