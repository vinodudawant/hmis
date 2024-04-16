package com.hms.pharmacy.pojo;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.ReportModelDao;
import com.hms.pharmacy.service.ReportModelService;

/************
 * @author : Vishant Pawar
 * @date : 18-Aug-2023
 * @code :get pharmacy report
 ***********/
@Service
public class ReportModel implements ReportModelService {

	@Autowired
	ReportModelDao reportDAO;

	@Override
	public String getProductIdWiseStockReport(List<ReportStock> reportStocks, HttpServletRequest request,
			String productName, String totalAmount,String totalStock) {

		String pdfFilePath = reportDAO.getProductIdWiseStockReport(reportStocks, request, productName, totalAmount, totalStock);

		return pdfFilePath;
	}

	@Override
	public String getProductWiseStockReport(List<ReportStock> reportStocks, HttpServletRequest request, String type,
			String totalAmount) {
		String pdfFilePath = reportDAO.getProductWiseStockReport(reportStocks, request, type, totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getCompanyWiseStockReport(List<ReportStock> reportStocks, HttpServletRequest request,
			String companyName, String totalAmount) {

		String pdfFilePath = reportDAO.getCompanyWiseStockReport(reportStocks, request, companyName, totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getShelfWiseStockReport(List<ReportStock> reportStocks, HttpServletRequest request, String shelfName,
			String totalAmount) {

		String pdfFilePath = reportDAO.getShelfWiseStockReport(reportStocks, request, shelfName, totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getCategoryWiseStockReport(List<ReportStock> reportStocks, HttpServletRequest request,
			String categoryName, String totalAmount) {

		String pdfFilePath = reportDAO.getCategoryWiseStockReport(reportStocks, request, categoryName, totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getProductWisePurchase(List<ReportPurchase> reportPurchases, String productName,
			HttpServletRequest request, String from, String to, String totalAmount) {

		String pdfFilePath = reportDAO.getProductWisePurchase(reportPurchases, productName, request, from, to,
				totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getBatchWisePurchase(List<ReportPurchase> reportPurchases, String productName,
			HttpServletRequest request, String from, String to, String batchCode, String totalAmount) {

		String pdfFilePath = reportDAO.getBatchWisePurchase(reportPurchases, productName, request, from, to, batchCode,
				totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getNewProductWisePurchase(List<ReportPurchase> reportPurchases, String productName,
			HttpServletRequest request, String from, String to, String totalAmount) {

		String pdfFilePath = reportDAO.getNewProductWisePurchase(reportPurchases, productName, request, from, to,
				totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getPartyWisePurchase(List<ReportPurchase> reportPurchases, String productName,
			HttpServletRequest request, String from, String to, String vendorName, String totalAmount) {

		String pdfFilePath = reportDAO.getPartyWisePurchase(reportPurchases, productName, request, from, to, vendorName,
				totalAmount);

		return pdfFilePath;
	}

	/*
	 * public String getPatientwiseBillAmt(HttpServletRequest request,String
	 * from,String to,List<ReportProductWiseBatchSale> reportPurchases) {
	 * 
	 * String pdfFilePath = reportDAO.getPatientwiseBillAmt(request,from,
	 * to,reportPurchases);
	 * 
	 * return pdfFilePath; }
	 */@Override
	public String getPartyWisePurchaseTotalReport(List<ReportPurchase> reportPurchases, HttpServletRequest request,
			String from, String to) {

		String pdfFilePath = reportDAO.getPartyWisePurchaseTotalReport(reportPurchases, request, from, to);

		return pdfFilePath;
	}

	@Override
	public String getStockWiseReport(List<ReportStock> reportStocks, HttpServletRequest request, String drugName,
			String totalAmount) {
		String pdfFilePath = reportDAO.getStockWiseReport(reportStocks, request, drugName, totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getStorewiseStockReport(List<ReportProductWiseBatchSale> productWiseBatchSales,
			HttpServletRequest request) {
		String pdfFilePath = reportDAO.getStorewiseStockReport(productWiseBatchSales, request);

		return pdfFilePath;
	}

	@Override
	public String getProductBelowMinLevelReport(List<ProductBelowMinLevel> productBelowMinLevels,
			HttpServletRequest request) {
		String pdfFilePath = reportDAO.getProductBelowMinLevelReport(productBelowMinLevels, request);

		return pdfFilePath;
	}

	@Override
	public String getDailySaleReport(List<ReportProductWiseBatchSale> productWiseBatchSales, String date,
			String totalAmount, HttpServletRequest request, String totalAmountReceive) {
		// TODO Auto-generated method stub
		return reportDAO.getDailySaleReport(productWiseBatchSales, date, totalAmount, request, totalAmountReceive);
	}

	@Override
	public String getDailySaleReportStorewise(List<ReportProductWiseBatchSale> productWiseBatchSales, String date,
			String totalAmount, HttpServletRequest request, String totalAmountReceive, String storeName) {
		// TODO Auto-generated method stub
		return reportDAO.getDailySaleReportStorewise(productWiseBatchSales, date, totalAmount, request, totalAmountReceive, storeName);
	}

	@Override
	public String getDailyBusinessReport(List<ReportMIS> reportMis,
			HttpServletRequest request, String from, String to,
			String totalSale, String totalPurchase) {
		String pdfFilePath = reportDAO.getDailyBusinessReport(reportMis,
				request, from, to, totalSale, totalPurchase);

		return pdfFilePath;
	}
	@Override
	public String getPatientSaleTotalBillDataReport(
			List<ReportProductWiseBatchSale> cateSales, String from, String to,
			 HttpServletRequest request,String vat55,String vat125,String vat0,String netAmt,String tax55,String tax12,String tax0) {
		String pdfFilePath = reportDAO.getPatientSaleTotalBillDataReport(cateSales,
				from, to,request,vat55,vat125,vat0,netAmt,tax55,tax12,tax0);

		return pdfFilePath;
	}
	
	public String getNearAllExpiryReport(List<ReportExpiry> reportExpiries,
			HttpServletRequest request, String from) {
		String pdfFilePath = reportDAO.getNearAllExpiryReport(reportExpiries,
				request, from);

		return pdfFilePath;
	}

	@Override
	public String getPartyNewWisePurchase(List<ReportPurchase> reportPurchases,
			String productName, HttpServletRequest request, String from,
			String to, String vendorName, String totalAmount) {
		
		String pdfFilePath = reportDAO.getPartyNewWisePurchase(reportPurchases,
				productName, request, from, to, vendorName, totalAmount);

		return pdfFilePath;
	}

	@Override
	public String getGRNReportDetails(List<ReportPurchase> reportPurchases, String from, String to, String totalAmount,
			HttpServletRequest request) {
		String pdfFilePath = reportDAO.getGRNReportDetails(
				reportPurchases, from, to, totalAmount, request);

		return pdfFilePath;
	}

	@Override
	public String getReportForPharmacyAllProduct(String from, String to, HttpServletRequest request,List<ReportList> list) {
		String pdfFilePath = reportDAO.getReportForPharmacyAllProduct(from, to,
				request,list);

		return pdfFilePath;
	}
	
	@Override
	public String patientwiseVouList(List<ReportProductWiseBatchSale> productWiseBatchSales,
			Integer patientId,String totalAmount,String from,String to,
				 HttpServletRequest request) {
		String pdfFilePath = reportDAO.patientwiseVouList(productWiseBatchSales,patientId,totalAmount,from,to,
				 request);

		return pdfFilePath;
	}

}
