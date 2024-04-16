package com.hms.administrator.dao;

import java.util.List;

import com.hms.administrator.dto.ChartSlave;

public interface TempChartDao {


	List<ChartSlave> fetchdefaultChartView(Integer ctype);

	String deleteChartSlave(String chartslaveid);

	Integer saveChartSlaveName(String objcharslave);
}
