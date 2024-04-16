package com.hms.administrator.dao;

import com.hms.administrator.dto.district_taluka_city;

public interface ReasonOfVisitDao {

	public String saveReasonOfVisit(district_taluka_city dto, Integer moduleId);
	public district_taluka_city getAllReasons(String searchText, String callFrom);
	public district_taluka_city editReasons(Integer reasonId);
	public boolean deleteReasons(Integer reasonId, Integer userId);
}
