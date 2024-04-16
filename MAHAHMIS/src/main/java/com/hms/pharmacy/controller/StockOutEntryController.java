package com.hms.pharmacy.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;
import com.hms.utility.ApplicationContextUtils;

@Controller
@RequestMapping(value = "/stockOutEntry")
public class StockOutEntryController {
	
	@Autowired
	StockOutEntryService stockOutEntryEervice;
	
	@Autowired
	CommonService commonService;
	static Logger log=Logger.getLogger(StockOutEntryController.class.getName());
	/**
	 *
	 * @Code :This method for view 
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCompanyView(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy getCompanyView()");
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("stockOutEntry", new StockOutEntry());
			modelAndView.setViewName("Pharma_StockOutEntry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		
		return modelAndView;
	}

	/**
	 *
	 * @Code :This method for save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveOrUpdateDoctor(HttpServletRequest request) 
	{
		log.info("In Pharmacy saveOrUpdateDoctor()");
		StockOutEntry stockOut=new StockOutEntry();
			
		stockOut.setStockBatchId(Integer.parseInt(request.getParameter("BatchId")));
		stockOut.setProductId(Integer.parseInt(request.getParameter("ProductId")));
		stockOut.setStockOutDeleteFlag(0);
		stockOut.setStockId(Integer.parseInt(request.getParameter("StockId")));
		stockOut.setQty(Integer.parseInt(request.getParameter("Qty")));
		BigInteger closeStock = new BigInteger(request.getParameter("stockOutClosingStock"));
		System.out.println("closing stoc--------------"+closeStock);
		stockOut.setStockOutCurrentStock(closeStock);
		stockOut.setStockEntryType(Integer.parseInt(request.getParameter("stockEntryType")));
	
				
		Map<String, String> result=new HashMap<String, String>();
			
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
				"dd/MM/yyyy");
		String date1 = simpleDateFormat.format(new Date());
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time=dateFormat1.format(cal.getTime());
		stockOut.setTime(time);
				
		result=stockOutEntryEervice
				.saveOrUpdateStockOutEntry(stockOut);
			
		return result;
	
	}
	/**
	 *
	 * @Code :This method for get stock entry details
	 * @return
	 **/
	@RequestMapping(value = "/getStockEntryDetails", method = RequestMethod.POST)
	public @ResponseBody
	String getTDSSlabMaster(@RequestParam("StockEntry") Integer StockEntry) 
	{
		log.info("In Pharmacy getStockEntryDetails()");
		Map<String,org.json.simple.JSONArray> batchData=new HashMap<String, org.json.simple.JSONArray>();
			
		//EhatEnterpriseUtil ehatEnterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		batchData= stockOutEntryEervice.getStockEntryDetails(StockEntry);
		
		return JSONValue.toJSONString(batchData);
	}
}
