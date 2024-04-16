package com.hms.bloodbank.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.BloodBagMaster;

public interface BloodBagMasterService {

	int saveBloodBagMaster(BloodBagMaster bloodBagDetails, HttpServletRequest request);

	List<BloodBagMaster> getAllBloodBagMaster(HttpServletRequest request);

	BloodBagMaster editBloodBagtMaster(Integer bloodBagId);

	boolean deleteBloodBagMaster(Integer bloodBagId, HttpServletRequest request);

	List<BloodBagMaster> centerBloodBagAutoSuggestion(String bloodBagName);

	int saveBloodBagMaster1(BloodBagMaster bloodBagDetails, HttpServletRequest request);

}
