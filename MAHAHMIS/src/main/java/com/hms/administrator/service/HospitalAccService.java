package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalAccDetails;

public interface HospitalAccService {

	String SaveHospitalAccessDetails(HospitalAccDetails hospitalAccDetails,String  listEhatBillPrefix,HttpServletRequest request);
	List<HospitalAccDetails> fetchHospitalAccDetails(String corporateId);
}
