package com.hms.pharmacy.controller;

import java.math.BigDecimal;
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
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.StockOutEntry;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VoucherNumberPhysicalStock;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PhysicalStockAdjustService;
import com.hms.pharmacy.service.PhysicalStockUpdateService;
import com.hms.pharmacy.service.StockOutEntryService;

@Controller
@RequestMapping(value = "/physicalStockUpdate")
public class PhysicalStockUpdateController {

	/*
	 * @Autowired StockOutEntryService stockOutEntryEervice;
	 */

	@Autowired
	PhysicalStockUpdateService physicalStockUpdate;

	@Autowired
	PhysicalStockAdjustService physicalStockAdjustService;

	@Autowired
	CommonService commonService;

	static Logger log = Logger.getLogger(PhysicalStockUpdateController.class.getName());

	/**
	 *
	 * @Code :This method for view
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCompanyView(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy view()");
		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("physicalStockUpdate", new StockOutEntry());
		modelAndView.setViewName("Pharma_Phy_Stock_Update");

		return modelAndView;
	}

	/**
	 *
	 * @Code :This method for save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> saveOrUpdatePhyStock(HttpServletRequest request) {
		log.info("In Pharmacy saveOrUpdatePhyStock()");
		StockOutEntry stockOut = new StockOutEntry();

		stockOut.setStockBatchId(Integer.parseInt(request.getParameter("BatchId")));
		stockOut.setProductId(Integer.parseInt(request.getParameter("ProductId")));
		stockOut.setStockOutDeleteFlag(0);
		stockOut.setStockId(Integer.parseInt(request.getParameter("StockId")));
		stockOut.setQty(0);
		BigInteger stock = new BigInteger(request.getParameter("txtPhyQty"));
		stockOut.setPhysicalStock(stock);
		stockOut.setStockEntryType(2);
		// stockOut.setStockOutClosingStock(Integer.parseInt(request.getParameter("ClosingStock")));
		Double closingStock= Double.valueOf(request.getParameter("ClosingStock"));
		BigInteger closeStock=BigDecimal.valueOf(closingStock).toBigInteger();
		stockOut.setStockOutCurrentStock(closeStock);
		stockOut.setVoucher_no(request.getParameter("txtVoucher") + "");

		Map<String, String> result = new HashMap<String, String>();

		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		String date1 = simpleDateFormat.format(new Date());

		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		String time = dateFormat1.format(cal.getTime());
		stockOut.setTime(time);

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		result = physicalStockUpdate.saveOrUpdatePhyStock(stockOut);

		return result;

	}

	/**
	 * @author: Akshata Desai
	 * @Code :This method for get data
	 * @return
	 **/
	@RequestMapping(value = "/getPhyStockUpdateDetails", method = RequestMethod.POST)
	public @ResponseBody StockOutEntry getPhyStockUpdateDetails() {
		log.info("In Pharmacy getPhyStockUpdateDetails()");
		List<StockOutEntry> list = physicalStockUpdate.getPhyStockUpdateDetails();
		StockOutEntry obj = new StockOutEntry();
		obj.setLstStockOutEnrty(list);
		return obj;
	}

	/**
	 * @author : Akshata Desai
	 * @Code :This method for fetch voucher number
	 * @return
	 **//*
		 * @RequestMapping(value = "/fetchProductByVoucherNumber", method =
		 * RequestMethod.POST) public @ResponseBody String
		 * getStockEntryDetailByVoucherNumber(@RequestParam("voucher_no") String
		 * voucher_no) { log.info("In Pharmacy getStockEntryDetailByVoucherNumber()");
		 * Map<String,org.json.simple.JSONArray> voucherData=new HashMap<String,
		 * org.json.simple.JSONArray>(); voucherData =
		 * physicalStockAdjustService.getStockEntryDetailByVoucherNo(voucher_no);
		 * 
		 * //System.err.println("voucher_no"); return
		 * JSONValue.toJSONString(voucherData); }
		 */
	/**
	 * @author: Akshata Desai
	 * @Code :This method for get stock details by voucher_no
	 * @return
	 **/
	@RequestMapping(value = "/fetchProductByVoucherNumber", method = RequestMethod.POST)
	public @ResponseBody StockOutEntry getStockEntryDetailByVoucherNo(@RequestParam("voucher_no") String voucher_no) {
		log.info("In Pharmacy getStockEntryDetailByVoucherNo()");
		List<StockOutEntry> list = physicalStockAdjustService.getStockEntryDetailByVoucherNo(voucher_no);
		StockOutEntry obj = new StockOutEntry();
		obj.setLstStockOutEnrty(list);
		return obj;
	}

	/**
	 * @author : Akshata Desai
	 * @Code :This method for save voucher number
	 * @return
	 **/
	@RequestMapping(value = "/saveVoucherNumber", method = RequestMethod.GET)
	public @ResponseBody String saveVoucherNumber(@RequestParam("voucherno") Integer voucherno) {
		log.info("In Pharmacy saveVoucherNumber()");
		physicalStockUpdate.saveVoucherNumber(voucherno);

		return "success";
	}

	// Created By Parikshit to fetch voucher number at 29 June 2017
	@RequestMapping(value = "/fetchVoucherNumber", method = RequestMethod.GET)
	public @ResponseBody List<Object> fetchVoucherNumber() {
		log.info("In Pharmacy fetchVoucherNumber()");
		List<Object> voucherNoList = physicalStockUpdate.getVoucherNumbers();
		return voucherNoList;
	}

	/*****
	 * @Code :For getting list of voucher number
	 ******/
	@RequestMapping(value = "/fetchVoucherNumber2", method = RequestMethod.GET)
	public @ResponseBody VoucherNumberPhysicalStock getVoucherNumbersList() {
		log.info("In Pharmacy getVoucherNumbersList()");
		List<VoucherNumberPhysicalStock> ltvoucher = new ArrayList<VoucherNumberPhysicalStock>();
		ltvoucher = physicalStockUpdate.getVoucherNumbersList();
		VoucherNumberPhysicalStock obj = new VoucherNumberPhysicalStock();
		obj.setLstvocher(ltvoucher);
		return obj;
	}
}
