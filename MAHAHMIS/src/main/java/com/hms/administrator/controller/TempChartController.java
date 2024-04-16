package com.hms.administrator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.ChartSlave;
import com.hms.administrator.service.TempChartService;

@Controller
@RequestMapping(value="/tempchartcontroller")
public class TempChartController {

	@Autowired
	TempChartService tempchartservice; 
	/**
	 * @author :Navnath Erande
	 * @Date :07-01-2020
	 * @Code : Add Temp Chart
	 **/

	@RequestMapping(value = "/administratortempletchartslave", method = RequestMethod.POST)
	@ResponseBody
	public ChartSlave administratorTempletChartSlave(Integer cType) {
		ChartSlave chartslave = new ChartSlave();
		List<ChartSlave> list = tempchartservice.fetchdefaultChartView(cType);
		chartslave.setListChartType(list);
		return chartslave;
	}

	/**
	 * @author :Navnath Erande
	 * @Date :08-01-2020
	 * @Code : Delete Temp Chart
	 **/

	@RequestMapping(value = "/deletechartslave", method = RequestMethod.POST)
	@ResponseBody
	public String deleteChartSlave(@RequestParam("chartslaveid") String chartslaveid) {
		String msg = tempchartservice.deleteChartSlave(chartslaveid);
		System.out.println("sms:" + msg);
		return msg;

	}

	/**
	 * @author :Navnath Erande
	 * @Date :08-01-2020
	 * @Code : Save Temp ChartSlave
	 **/
	@RequestMapping(value = "/savechartslavename", method = RequestMethod.POST)
	@ResponseBody
	public String saveChartSlaveName(@RequestParam("objSKC") String objSkc) {
		if (objSkc != null) {
			Integer response = tempchartservice.saveChartSlaveName(objSkc);
			if (response == 1) {
				return "Data inserted Successfully.";
			} else {
				return "Oops some error occurred.";
			}
		} else {
			return "Please insert data.";
		}
	}

}
