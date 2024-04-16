package com.hms.ehat.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.GroupMasterDTO;

public interface GroupMasterDao {
	public String saveGroupmasterRecord(GroupMasterDTO dto);

	public GroupMasterDTO fetchAllGroupMaster(String searchText, String type);

	public GroupMasterDTO editGroupMasterrecord(int groupMasterId);

	public boolean deleteGroupMasterRecord(int groupMasterId, int userId);

	public GroupMasterDTO getAllHeadingList(HttpServletRequest request);

}
