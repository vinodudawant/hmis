package com.hms.bloodbank.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.BloodGroupMaster;

public interface BloodGroupMasterService {

	int saveBloodGroup(BloodGroupMaster bloodGroupDetails, HttpServletRequest request);

	List<BloodGroupMaster> getAllBloodGroupMaster(HttpServletRequest request);

	BloodGroupMaster editBloodGrouptMaster(Integer bloodGroupId);

	boolean deleteBloodGroupMaster(Integer bloodGroupId, HttpServletRequest request);

	List<BloodGroupMaster> centerBloodGroupAutoSuggestion(String bloodGroupName);

}
