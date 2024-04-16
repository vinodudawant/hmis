package com.hms.bloodbank.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.BloodTypeMaster;

public interface BloodTypeMasterDao {

	int saveTypeGroup(BloodTypeMaster bloodBagDetails, HttpServletRequest request);

	List<BloodTypeMaster> getAllBloodTypeMaster(HttpServletRequest request);

	BloodTypeMaster editBloodTypeMaster(Integer bloodTypeId);

	boolean deleteBloodTypeMaster(Integer bloodTypeId, HttpServletRequest request);

	List<BloodTypeMaster> centerBloodTypeAutoSuggestion(String bloodTypeName);

}
