package com.hms.pharmacy.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.service.BillComparService;
@Controller
@RequestMapping(value = "/billcomparison")
public class BillComparisonController {
	
	@Autowired
	BillComparService billComparService;
	/*******
	 * @author    :BILAL
	 * @Date      :12-03-2018
	 * @Code      :For Bill Comparison 
	 * *******/
	@RequestMapping(value = "/getpurchaseData", method = RequestMethod.GET)
	public @ResponseBody
	List<ReportPurchase> getpurchaseData(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("from") String fromDate,
			@RequestParam("to") String toDate,
			
			@RequestParam("hiddencategoryId") int categoryId,
			@RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId,
			@RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId,
			@RequestParam("paytype") String purtranstype) {


		List<ReportPurchase> reportPurchases = billComparService
				.getpurchaseData(request,fromDate,
						toDate, categoryId,companyId,ProductId,vendortId,unitId,purtranstype);
		return reportPurchases;
	}
}
