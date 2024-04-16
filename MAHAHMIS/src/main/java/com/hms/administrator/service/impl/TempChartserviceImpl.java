package com.hms.administrator.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.TempChartDao;
import com.hms.administrator.dto.ChartSlave;
import com.hms.administrator.service.TempChartService;

@Service
public class TempChartserviceImpl implements TempChartService {
	
	@Autowired
	TempChartDao tempchartdao;
	
	@Transactional
	@Override
	public List<ChartSlave> fetchdefaultChartView(Integer ctype) {

		return tempchartdao.fetchdefaultChartView(ctype);

	}

	@Transactional
	@Override
	public String deleteChartSlave(String chartslaveid) {
		return tempchartdao.deleteChartSlave(chartslaveid);
	}

	@Transactional
	@Override
	public Integer saveChartSlaveName(String objcharslave) {
		return tempchartdao.saveChartSlaveName(objcharslave);
	}

}
