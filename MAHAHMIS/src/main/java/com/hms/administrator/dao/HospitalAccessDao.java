package com.hms.administrator.dao;

import java.util.List;

import com.hms.administrator.dto.HospitalAccDetails;

public interface HospitalAccessDao {

	String SaveHospitalAccessDetails(HospitalAccDetails hospitalAccDetails,String listEhatBillPrefix);	
	List<HospitalAccDetails> fetchHospitalAccDetails(String corporateId);
}
