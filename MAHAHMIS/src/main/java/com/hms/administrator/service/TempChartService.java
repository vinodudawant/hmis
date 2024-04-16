package com.hms.administrator.service;

import java.util.List;

import com.hms.administrator.dto.ChartSlave;

public interface TempChartService {

List<ChartSlave> fetchdefaultChartView(Integer ctype);

String deleteChartSlave(String chartslaveid);

Integer saveChartSlaveName(String objcharslave);
}
