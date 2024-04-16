package com.hms.administrator.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.district_taluka_city;

public interface ReasonOfVisitService {

	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId, HttpServletRequest request);
	public district_taluka_city getAllReasons(String searchText, String callFrom);
	public district_taluka_city editReason(Integer reasonId);
	public boolean deleteReason(Integer reasonId, HttpServletRequest request);
}
