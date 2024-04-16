package com.hms.bloodbank.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.BloodItemMaster;

public interface BloodItemMasterService {

	int saveBloodItemMaster(BloodItemMaster bloodItemDetails, HttpServletRequest request);

	List<BloodItemMaster> getAllBloodItemMaster(HttpServletRequest request);

	BloodItemMaster editBloodItemMaster(Integer bloodItemId);

	boolean deleteBloodItemMaster(Integer bloodItemId, HttpServletRequest request);

	List<BloodItemMaster> centerBloodItemAutoSuggestion(String bloodItemName);

}
