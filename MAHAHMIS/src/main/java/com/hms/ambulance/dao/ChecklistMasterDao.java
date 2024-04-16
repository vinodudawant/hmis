package com.hms.ambulance.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ambulance.dto.ChecklistMasterDto;

public interface ChecklistMasterDao {

	int saveChecklist(ChecklistMasterDto checklistDto, HttpServletRequest request);

	List<ChecklistMasterDto> getAllChecklistMaster(HttpServletRequest request);

	ChecklistMasterDto editChecklistMaster(Integer checklistId);

	boolean deleteChecklistMaster(Integer checklistId, HttpServletRequest request);

}

