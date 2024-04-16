package com.hms.bmw.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bmw.dto.BmwRequisitionCountDto;
import com.hms.bmw.dto.BmwRequisitionDetails;
import com.hms.dto.Users;

public interface BmwRequisitionDetailsService {

	int saveBmwRequisitionDetailsMaster(BmwRequisitionDetails bmwRequisitionDetails, HttpServletRequest request);

	List<BmwRequisitionDetails> getBmwRequisitionDetailsMaster(String status,HttpServletRequest request);

	BmwRequisitionDetails editBmwRequisitionDetailsMaster(Integer bmwUserId);

	boolean deleteBmwRequisitionDetailsMaster(Integer bmwUserId, HttpServletRequest request);
	
	List<Users> getNurse(Integer user_ID);

	Integer getNextAutoIncrement();
	
	List<BmwRequisitionDetails> getfilterBmwRequisitionDetailsMaster(String fdate, String tdate, String department, String wardTypeSelect, String typeOfBag, String bag_Status);

	int approveBmwRequisition(String id, Integer userId);
	
	List<Users> getBMWusers();

	int assignBmwRequisition(String id, Integer userId);

	int completeBmwRequisition(String id, Integer userId);

	BmwRequisitionCountDto getBmwRequisitionCount(int id, HttpServletRequest request);

	List<BmwRequisitionDetails> getBmwBagWiseCount(int id, HttpServletRequest request);
}
