package com.hms.ehat.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.GroupMasterDTO;
import com.hms.ehat.dto.SubServiceDto;



public interface GroupMasterService {

	public String saveGroupmasterRecord(GroupMasterDTO dto, HttpServletRequest request);

	public GroupMasterDTO getAllGrooupMaster(String searchText, String type);

	public GroupMasterDTO editGroupMasterrecord(int groupMasterId);

	public boolean deleteGroupMasterRecord(int groupMasterId, HttpServletRequest request);

	public GroupMasterDTO getAllHeadingList(HttpServletRequest request);

	

}
