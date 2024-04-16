package com.hms.pharmacy.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pharmacy.pojo.ProductBelowMinLevel;
import com.hms.pharmacy.pojo.ReportExpiry;
import com.hms.pharmacy.pojo.ReportList;
import com.hms.pharmacy.pojo.ReportMIS;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.ReportStock;
/************
 *@author	: Vishant Pawar
 *@date		:  18-Aug-2023
 *@code		:get pharmacy report
 ***********/
public interface ReportModelDao {

	
	String getProductIdWiseStockReport(List<ReportStock> reportStocks,
			HttpServletRequest request, String productName, String totalAmount,String totalStock);
	
	String getProductWiseStockReport(List<ReportStock> reportStocks,
			HttpServletRequest request, String type, String totalAmount);
	
	String getCompanyWiseStockReport(List<ReportStock> reportStocks,
			HttpServletRequest request, String companyName, String totalAmount);

	String getShelfWiseStockReport(List<ReportStock> reportStocks,
			HttpServletRequest request, String shelfName, String totalAmount);

	String getCategoryWiseStockReport(List<ReportStock> reportStocks,
			HttpServletRequest request, String categoryName, String totalAmount);

	String getProductWisePurchase(List<ReportPurchase> reportPurchases,
			String productName, HttpServletRequest request, String from,
			String to, String totalAmount);

	String getBatchWisePurchase(List<ReportPurchase> reportPurchases,
			String productName, HttpServletRequest request, String from,
			String to, String batchCode, String totalAmount);

	String getNewProductWisePurchase(List<ReportPurchase> reportPurchases,
			String productName, HttpServletRequest request, String from,
			String to, String totalAmount);

	String getPartyWisePurchase(List<ReportPurchase> reportPurchases,
			String productName, HttpServletRequest request, String from,
			String to, String vendorName, String totalAmount);
	
	/*String getPatientwiseBillAmt(HttpServletRequest request,String from,String to,List<ReportProductWiseBatchSale> reportPurchases);*/
	
	String getPartyWisePurchaseTotalReport(List<ReportPurchase> reportPurchases,
			 HttpServletRequest request, String from,
			String to);
	
	String getStockWiseReport(List<ReportStock> reportStocks,
			HttpServletRequest request, String drugName, String totalAmount);
	
	String getStorewiseStockReport(List<ReportProductWiseBatchSale> productWiseBatchSales,HttpServletRequest request);

	String getProductBelowMinLevelReport(
			List<ProductBelowMinLevel> productBelowMinLevels,
			HttpServletRequest request);
	
	String getDailyBusinessReport(List<ReportMIS> reportMis,
			HttpServletRequest request, String from, String to, String totalSale, String totalPurchase);
	
	String getDailySaleReport(
			List<ReportProductWiseBatchSale> productWiseBatchSales,
			String date,String totalAmount, HttpServletRequest request,String totalAmountReceive);

	String getDailySaleReportStorewise(
			List<ReportProductWiseBatchSale> productWiseBatchSales,
			String date,String totalAmount, HttpServletRequest request,String totalAmountReceive,String storeName);
	
	String getPatientSaleTotalBillDataReport(List<ReportProductWiseBatchSale> cateSales, String from, String to,
			 HttpServletRequest request,String Vat55,String Vat125,String Vat0,String net,String tax55,String tax12,String tax0);

	String getNearAllExpiryReport(List<ReportExpiry> reportExpiries,
			HttpServletRequest request, String from);
	
	String getGRNReportDetails(List<ReportPurchase> reportPurchases,
			String from, String to, String totalAmount,
			HttpServletRequest request);
	
	String getPartyNewWisePurchase(List<ReportPurchase> reportPurchases,
			String productName, HttpServletRequest request, String from,
			String to, String vendorName, String totalAmount);
	
	String getReportForPharmacyAllProduct(String from, String to,
			HttpServletRequest request,List<ReportList> list);
	
	String patientwiseVouList(List<ReportProductWiseBatchSale> productWiseBatchSales,
			Integer patientId,String totalAmount,String from, String to,
			HttpServletRequest request);




}