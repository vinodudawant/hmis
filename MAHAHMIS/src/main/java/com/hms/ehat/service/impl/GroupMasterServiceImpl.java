package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.dto.GroupMasterDTO;
import com.hms.ehat.dao.GroupMasterDao;
import com.hms.ehat.service.GroupMasterService;

@Service
@Transactional
public class GroupMasterServiceImpl implements GroupMasterService{
	@Autowired
	GroupMasterDao groupMasterDao;

	@Override
	public String saveGroupmasterRecord(GroupMasterDTO dto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
				dto.setUnitId(unitId);
				dto.setCreatedBy(userId);
		return groupMasterDao.saveGroupmasterRecord(dto);
	}

	@Override
	public GroupMasterDTO getAllGrooupMaster(String searchText, String type) {
		
			return groupMasterDao.fetchAllGroupMaster(searchText, type);
		}

	@Override
	public GroupMasterDTO editGroupMasterrecord(int groupMasterId) {
		return groupMasterDao.editGroupMasterrecord(groupMasterId);
	}

	@Override
	public boolean deleteGroupMasterRecord(int groupMasterId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		return groupMasterDao.deleteGroupMasterRecord(groupMasterId,userId);
	}

	@Override
	public GroupMasterDTO getAllHeadingList(HttpServletRequest request) {
		
		return groupMasterDao.getAllHeadingList(request);
	}
	}
	


