package com.hms.bloodbank.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.BloodItemMaster;

public interface BloodItemMasterDao {

	int saveBloodItemMaster(BloodItemMaster bloodItemDetails, HttpServletRequest request);

	List<BloodItemMaster> getAllBloodItemMaster(HttpServletRequest request);

	BloodItemMaster editBloodItemMaster(Integer bloodItemId);

	boolean deleteBloodItemMaster(Integer bloodItemId, Integer userId, HttpServletRequest request);

	List<BloodItemMaster> centerBloodItemAutoSuggestion(String bloodItemName);

}
