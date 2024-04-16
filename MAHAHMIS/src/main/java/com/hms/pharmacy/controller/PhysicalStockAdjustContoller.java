package com.hms.pharmacy.controller;

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
@RequestMapping(value = "/physicalStockOutEntry")
public class PhysicalStockAdjustContoller
{
	
	@Autowired
	PhysicalStockAdjustService physicalStockAdjustService;
	
	@Autowired
	CommonService commonService;
	
	static Logger log=Logger.getLogger(PhysicalStockAdjustContoller.class.getName());
	
	/**
	 *@author: Akshata Desai
	 * @Code :This method for view
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCompanyView(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
	
			//modelAndView.addObject("stockOutEntry", new PhysicalStockAdj());
		modelAndView.addObject("physicalStockOutEntry", new StockOutEntry());
		modelAndView.setViewName("pharma_Stock_adj");
		
		return modelAndView;
	}
	
	/**
	 *@author: Akshata Desai
	 * @Code :This method for get stock details for adjust
	 * @return
	 **/
	@RequestMapping(value = "/getStockEntryDetailsForAdj", method = RequestMethod.POST)
	public @ResponseBody
	StockOutEntry getStockEntryDetailsForAdj() {
		log.info("In Pharmacy getStockEntryDetailsForAdj()");
		List<StockOutEntry>list =  physicalStockAdjustService.getStockEntryDetailsForAdj();
		StockOutEntry obj= new StockOutEntry();
		obj.setLstStockOutEnrty(list);
		return obj;
	}
	
	/**
	 *@author: Akshata Desai
	 * @Code :This method for get stock details for adjust
	 * @return
	 **/
	@RequestMapping(value = "/getStockEntryDetailsByProductId", method = RequestMethod.GET)
	public @ResponseBody
	StockOutEntry getStockEntryDetailByProductId(@RequestParam("productId") Integer productId) {
		log.info("In Pharmacy getStockEntryDetailByProductId()");
		List<StockOutEntry>list =  physicalStockAdjustService.getStockEntryDetailByProductId(productId);
		StockOutEntry obj= new StockOutEntry();
		obj.setLstStockOutEnrty(list);
		return obj;
	}
	/**
	 *@author: Akshata Desai
	 * @Code :This method for save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public  @ResponseBody String savePhysicalStockOutEntry(@RequestParam String jsonString)
	{
		
		physicalStockAdjustService.savePhysicalStockOutEntry(jsonString);
		return "Success";
		
	}
	
	
	/**
	 *@author: Akshata Desai
	 * @Code :This method for get stock details by batch id
	 * @return
	 **/
	@RequestMapping(value = "/fetchProductNameByBarcode", method = RequestMethod.POST)
	public @ResponseBody
	StockOutEntry getStockEntryDetailByBatchId(@RequestParam("BatchId") Integer BatchId) {
		log.info("In Pharmacy getStockEntryDetailByBatchId()");
		List<StockOutEntry>list =  physicalStockAdjustService.getStockEntryDetailByBatchId(BatchId);
		StockOutEntry obj= new StockOutEntry();
		obj.setLstStockOutEnrty(list);
		return obj;
	}
}
