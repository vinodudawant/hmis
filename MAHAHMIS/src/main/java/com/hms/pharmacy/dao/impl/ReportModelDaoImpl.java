package com.hms.pharmacy.dao.impl;

import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.pharmacy.dao.ReportModelDao;
import com.hms.pharmacy.pojo.ProductBelowMinLevel;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportExpiry;
import com.hms.pharmacy.pojo.ReportList;
import com.hms.pharmacy.pojo.ReportMIS;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.ReportStock;

import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
/************
 *@author	: Vishant Pawar
 *@date		:  18-Aug-2023
 *@code		:get pharmacy report
 ***********/
@Repository
public class ReportModelDaoImpl implements ReportModelDao {

	@Autowired
	SessionFactory sessionFactory;
	
	String pdfPath = null;

	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_hh.mm.ss");
	java.util.Calendar currentDate = null;
	String todays_date = null;

	private void initializeDate() {
		currentDate = java.util.Calendar.getInstance();
		todays_date = dateFormat.format(currentDate.getTime());
	}
	
	@Override
	public String getProductIdWiseStockReport(List<ReportStock> reportStocks, HttpServletRequest request,
			String productName, String totalAmount,String totalStock) {

		// initialize date
		initializeDate();

		try {
			HashMap jasperParameter = new HashMap();

			jasperParameter.put("ReportTitle", "ProductWise Stock Report");
			jasperParameter.put("totalAmount", totalAmount);
			jasperParameter.put("totalStock", totalStock);
			jasperParameter.put("productName", productName);

			/* jasperParameter.put("batchId", batchId); */
			/*
			 * jasperParameter.put("ts2", to); jasperParameter.put("companyId",
			 * companyId);
			 */

			String pdfXmlPath = request
					.getRealPath("/Report-xml/pharmacy/stock_current_productwise_report.jrxml");
			String xlsXmlPath = request
					.getRealPath("/Report-xml/pharmacy/stock_current_productwise_report_xls.jrxml");

			pdfPath = request
					.getRealPath("/ehat_Reports/Pharmacy/Stock/productwise/")
					+ "//"
					+ todays_date
					+ "_stock_current_productwise_report.pdf";

			String exlPath = request
					.getRealPath("/ehat_Reports/Pharmacy/Stock/productwise/")
					+ "//"
					+ todays_date
					+ "_stock_current_productwise_report.xls";

			getStockReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
					xlsXmlPath, pdfPath, exlPath, reportStocks);
		} catch (Exception e) {
			e.printStackTrace();
		}

		String srPath = "/Pharmacy/Stock/productwise/" + todays_date
				+ "_stock_current_productwise_report.pdf" + "$"
				+ "/Pharmacy/Stock/productwise/" + todays_date
				+ "_stock_current_productwise_report.xls";

		return srPath;
	}
	
	// Suraj Pharmacy Code for Stock Report
		public void getStockReportFunctionForPharmacy(HashMap jasperParameter,
				String pdfXmlPath, String xlsXmlPath, String pdfPath,
				String exlPath, List<ReportStock> reportStocks) {

			// initialize date
			initializeDate();

			try {
				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from

				/* Connection connection = establishConnection(); */

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						reportStocks);

				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, new JRBeanCollectionDataSource(
								reportStocks));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

			} catch (Exception e) {

				e.printStackTrace();
			}
		}
		
		@Override
		public String getCompanyWiseStockReport(List<ReportStock> reportStocks,
				HttpServletRequest request, String companyName, String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "CompanyWise Stock Report");
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("companyName", companyName);

				/* jasperParameter.put("batchId", batchId); */
				/*
				 * jasperParameter.put("ts2", to); jasperParameter.put("companyId",
				 * companyId);
				 */

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_companywise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_companywise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/companywise/")
						+ "//"
						+ todays_date
						+ "_stock_current_companywise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/companywise/")
						+ "//"
						+ todays_date
						+ "_stock_current_companywise_report.xls";

				getStockReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportStocks);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Stock/companywise/" + todays_date
					+ "_stock_current_companywise_report.pdf" + "$"
					+ "/Pharmacy/Stock/companywise/" + todays_date
					+ "_stock_current_companywise_report.xls";

			return srPath;
		}

		@Override
		public String getShelfWiseStockReport(List<ReportStock> reportStocks,
				HttpServletRequest request, String shelfName, String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "ShelfWise Stock Report");
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("shelfName", shelfName);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_shelfwise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_shelfwise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/shelfwise/")
						+ "//"
						+ todays_date
						+ "_stock_current_shelfwise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/shelfwise/")
						+ "//"
						+ todays_date
						+ "_stock_current_shelfwise_report.xls";

				getStockReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportStocks);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Stock/shelfwise/" + todays_date
					+ "_stock_current_shelfwise_report.pdf" + "$"
					+ "/Pharmacy/Stock/shelfwise/" + todays_date
					+ "_stock_current_shelfwise_report.xls";

			return srPath;
		}

		@Override
		public String getCategoryWiseStockReport(List<ReportStock> reportStocks,
				HttpServletRequest request, String categoryName, String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "CategoryWise Stock Report");
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("categoryName", categoryName);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_categorywise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_categorywise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/categorywise/")
						+ "//"
						+ todays_date
						+ "_stock_current_categorywise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/categorywise/")
						+ "//"
						+ todays_date
						+ "_stock_current_categorywise_report.xls";

				getStockReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportStocks);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Stock/categorywise/" + todays_date
					+ "_stock_current_categorywise_report.pdf" + "$"
					+ "/Pharmacy/Stock/categorywise/" + todays_date
					+ "_stock_current_categorywise_report.xls";

			return srPath;
		}

		@Override
		public String getProductWisePurchase(List<ReportPurchase> reportPurchases,
				String productName, HttpServletRequest request, String from,
				String to, String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "ProductWise Purchase Report");
				jasperParameter.put("productName", productName);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("from", from);
				jasperParameter.put("to", to);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_productwise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_productwise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/productwise/")
						+ "//" + todays_date + "_purchase_productwise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/productwise/")
						+ "//"
						+ todays_date
						+ "_purchase_productwise_report_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/productwise/" + todays_date
					+ "_purchase_productwise_report.pdf" + "$"
					+ "/Pharmacy/purchase/productwise/" + todays_date
					+ "_purchase_productwise_report_report.xls";

			return srPath;
		}

		@Override
		public String getBatchWisePurchase(List<ReportPurchase> reportPurchases,
				String productName, HttpServletRequest request, String from,
				String to, String batchCode, String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "BatchWise Purchase Report");
				jasperParameter.put("productName", productName);
				jasperParameter.put("batchCode", batchCode);
				jasperParameter.put("from", from);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("to", to);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_batchwise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_batchwise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/batchwise/")
						+ "//" + todays_date + "_purchase_batchwise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/batchwise/")
						+ "//" + todays_date + "_purchase_batchwise_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/batchwise/" + todays_date
					+ "_purchase_batchwise_report.pdf" + "$"
					+ "/Pharmacy/purchase/batchwise/" + todays_date
					+ "_purchase_batchwise_report.xls";

			return srPath;
		}

		@Override
		public String getNewProductWisePurchase(
				List<ReportPurchase> reportPurchases, String productName,
				HttpServletRequest request, String from, String to,
				String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle",
						"New Product Wise Purchase Report");
				jasperParameter.put("productName", productName);
				jasperParameter.put("from", from);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("to", to);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_new_product_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_new_product_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/newproduct/")
						+ "//" + todays_date + "_purchase_new_product_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/newproduct/")
						+ "//"
						+ todays_date
						+ "_purchase_new_product_report_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/newproduct/" + todays_date
					+ "_purchase_new_product_report.pdf" + "$"
					+ "/Pharmacy/purchase/newproduct/" + todays_date
					+ "_purchase_new_product_report_report.xls";

			return srPath;
		}

		@Override
		public String getPartyWisePurchase(List<ReportPurchase> reportPurchases,
				String productName, HttpServletRequest request, String from,
				String to, String vendorName, String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Party Wise Purchase Report");
				jasperParameter.put("productName", productName);
				jasperParameter.put("from", from);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("vendorName", vendorName);
				jasperParameter.put("to", to);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_partywise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_partywise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywise/")
						+ "//" + todays_date + "_purchase_partywise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywise/")
						+ "//" + todays_date + "_purchase_partywise_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/partywise/" + todays_date
					+ "_purchase_partywise_report.pdf" + "$"
					+ "/Pharmacy/purchase/partywise/" + todays_date
					+ "_purchase_partywise_report.xls";

			return srPath;
		}

		/*
		 * @Override public String getPatientwiseBillAmt(HttpServletRequest
		 * request,String from,String to,List<ReportProductWiseBatchSale>
		 * reportPurchases) {
		 * 
		 * try { HashMap jasperParameter = new HashMap();
		 * 
		 * jasperParameter.put("ReportTitle", "Total Sale Report");
		 * jasperParameter.put("from", from); jasperParameter.put("to", to);
		 * 
		 * String pdfXmlPath = request
		 * .getRealPath("/Report-xml/pharmacy/total_sales_report.jrxml");
		 * String xlsXmlPath = request
		 * .getRealPath("/Report-xml/pharmacy/total_sales_report_xls.jrxml"
		 * );
		 * 
		 * pdfPath = request
		 * .getRealPath("/ehat_Reports/Pharmacy/purchase/partywise/") + "//" +
		 * todays_date + "_total_sales_report.pdf";
		 * 
		 * String exlPath = request
		 * .getRealPath("/ehat_Reports/Pharmacy/purchase/partywise/") + "//" +
		 * todays_date + "_total_sales_report.xls";
		 * 
		 * getReportFunctionForPharmacy(jasperParameter, pdfXmlPath, xlsXmlPath,
		 * pdfPath, exlPath, reportPurchases); } catch (Exception e) {
		 * e.printStackTrace(); }
		 * 
		 * String srPath = "/Pharmacy/purchase/partywise/" + todays_date +
		 * "_total_sales_report.pdf" + "$" + "/Pharmacy/purchase/partywise/" +
		 * todays_date + "_total_sales_report.xls";
		 * 
		 * return srPath; }
		 */

		public void getPurchaseReportFunctionForPharmacy(HashMap jasperParameter,
				String pdfXmlPath, String xlsXmlPath, String pdfPath,
				String exlPath, List<ReportPurchase> reportPurchases) {

			// initialize date
			initializeDate();

			try {
				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from

				/* Connection connection = establishConnection(); */

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						reportPurchases);

				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, new JRBeanCollectionDataSource(
								reportPurchases));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

			} catch (Exception e) {

				e.printStackTrace();
			}
		}

		@Override
		public String getPartyWisePurchaseTotalReport(List<ReportPurchase> reportPurchases, HttpServletRequest request,
				String from, String to) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Party Wise Purchase Report");
				jasperParameter.put("from", from);
				jasperParameter.put("to", to);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/partywise_total_purchase_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/partywise_total_purchase_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywiseTotalPo/")
						+ "//"
						+ todays_date
						+ "_partywise_total_purchase_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywiseTotalPo/")
						+ "//"
						+ todays_date
						+ "_partywise_total_purchase_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/partywiseTotalPo/" + todays_date
					+ "_partywise_total_purchase_report.pdf" + "$"
					+ "/Pharmacy/purchase/partywiseTotalPo/" + todays_date
					+ "_partywise_total_purchase_report.xls";

			return srPath;
		}

		@Override
		public String getProductWiseStockReport(List<ReportStock> reportStocks, HttpServletRequest request, String type,
				String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle",
						"ProductWise Stock Report(BatchWise) Report");
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("type", type);

				/* jasperParameter.put("batchId", batchId); */
				/*
				 * jasperParameter.put("ts2", to); jasperParameter.put("companyId",
				 * companyId);
				 */

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_batchwise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_batchwise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/batchwise/")
						+ "//"
						+ todays_date
						+ "_stock_current_batchwise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/batchwise/")
						+ "//"
						+ todays_date
						+ "_stock_current_batchwise_report.xls";

				getStockReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportStocks);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Stock/batchwise/" + todays_date
					+ "_stock_current_batchwise_report.pdf" + "$"
					+ "/Pharmacy/Stock/batchwise/" + todays_date
					+ "_stock_current_batchwise_report.xls";

			return srPath;
		}

		@Override
		public String getStockWiseReport(List<ReportStock> reportStocks, HttpServletRequest request, String drugName,
				String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "DrugWise Stock Report");
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("drugName", drugName);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_drugwise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_current_drugwise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/drugwise/")
						+ "//" + todays_date + "_stock_current_drugwise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/drugwise/")
						+ "//" + todays_date + "_stock_current_drugwise_report.xls";

				getStockReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportStocks);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Stock/drugwise/" + todays_date
					+ "_stock_current_drugwise_report.pdf" + "$"
					+ "/Pharmacy/Stock/drugwise/" + todays_date
					+ "_stock_current_drugwise_report.xls";

			return srPath;
		}

		@Override
		public String getStorewiseStockReport(List<ReportProductWiseBatchSale> productWiseBatchSales,
				HttpServletRequest request) {
			initializeDate();
			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Store wise Stock Report");
				
				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/store_wise_stock_report_pdf.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/store_wise_stock_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/storewiseStock/")
						+ "//" + todays_date +"_store_wise_stock_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/storewiseStock/")
						+ "//" + todays_date +"_store_wise_stock_report.xls";

				getReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, productWiseBatchSales);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Sales/storewiseStock/" + todays_date
					+ "_store_wise_stock_report.pdf" + "$"
					+ "/Pharmacy/Sales/storewiseStock/" + todays_date
					+ "_store_wise_stock_report.xls";

			return srPath;
		}
		
		public void getReportFunctionForPharmacy(HashMap jasperParameter,
				String pdfXmlPath, String xlsXmlPath, String pdfPath,
				String exlPath,
				List<ReportProductWiseBatchSale> productWiseBatchSales) {

			// initialize date
			initializeDate();

			try {
				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from

				/* Connection connection = establishConnection(); */

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						productWiseBatchSales);

				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, new JRBeanCollectionDataSource(
								productWiseBatchSales));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

			} catch (Exception e) {

				e.printStackTrace();
			}
		}

		@Override
		public String getProductBelowMinLevelReport(List<ProductBelowMinLevel> productBelowMinLevels,
				HttpServletRequest request) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Item Below Min Level Report");

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_below_min_level_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/stock_below_min_level_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/minlevel/")
						+ "//"
						+ todays_date
						+ "_stock_item_below_min_level_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Stock/minlevel/")
						+ "//"
						+ todays_date
						+ "_stock_item_below_min_level_report.xls";

				getBelowItemStockReportFunctionForPharmacy(jasperParameter,
						pdfXmlPath, xlsXmlPath, pdfPath, exlPath,
						productBelowMinLevels);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Stock/minlevel/" + todays_date
					+ "_stock_item_below_min_level_report.pdf" + "$"
					+ "/Pharmacy/Stock/minlevel/" + todays_date
					+ "_stock_item_below_min_level_report.xls";

			return srPath;
		}
		
		
		public void getBelowItemStockReportFunctionForPharmacy(
				HashMap jasperParameter, String pdfXmlPath, String xlsXmlPath,
				String pdfPath, String exlPath,
				List<ProductBelowMinLevel> reportStocks) {

			// initialize date
			initializeDate();

			try {
				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from

				/* Connection connection = establishConnection(); */

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						reportStocks);

				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, new JRBeanCollectionDataSource(
								reportStocks));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

			} catch (Exception e) {

				e.printStackTrace();
			}
		}
		
		@Override
		public String getDailyBusinessReport(List<ReportMIS> reportMis, HttpServletRequest request, String from,
				String to, String totalSale, String totalPurchase) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Business At Glance");
				jasperParameter.put("from", from);
				jasperParameter.put("to", to);
				jasperParameter.put("totalSale", totalSale);
				jasperParameter.put("totalPurchase", totalPurchase);
				/*
				 * jasperParameter.put("totalItemDisc", totalItemDisc);
				 * jasperParameter.put("totalSplDisc", totalSplDisc);
				 * jasperParameter.put("totalDisc", totalDisc);
				 */

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/mis_daily_business_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/mis_daily_business_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/mis/dailybusiness/")
						+ "//" + todays_date + "_mis_daily_business_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/mis/dailybusiness/")
						+ "//" + todays_date + "_mis_daily_business_report.xls";

				getMisReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportMis);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/mis/dailybusiness/" + todays_date
					+ "_mis_daily_business_report.pdf" + "$"
					+ "/Pharmacy/mis/dailybusiness/" + todays_date
					+ "_mis_daily_business_report.xls";

			return srPath;
		}
		
		public void getMisReportFunctionForPharmacy(HashMap jasperParameter,
				String pdfXmlPath, String xlsXmlPath, String pdfPath,
				String exlPath, List<ReportMIS> reportMISs) {

			// initialize date
			initializeDate();

			try {
				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from

				/* Connection connection = establishConnection(); */

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						reportMISs);

				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager
						.fillReport(jasperReport, jasperParameter,
								new JRBeanCollectionDataSource(reportMISs));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

			} catch (Exception e) {

				e.printStackTrace();
			}
		}
		
		@Override
		public String getDailySaleReport(
				List<ReportProductWiseBatchSale> productWiseBatchSales,
				String date, String totalAmount, HttpServletRequest request,String totalAmountReceive) 
		{

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Daily Sale Report");
				jasperParameter.put("date", date);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("totalAmountReceive", totalAmountReceive);
				/* jasperParameter.put("batchId", batchId); */
				/*
				 * jasperParameter.put("ts2", to); jasperParameter.put("companyId",
				 * companyId);
				 */

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/sales_daily_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/sales_daily_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/dailysale/")
						+ "//" + todays_date + "_sales_daily_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/dailysale/")
						+ "//" + todays_date + "_sales_daily_report.xls";

				getReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, productWiseBatchSales);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Sales/dailysale/" + todays_date
					+ "_sales_daily_report.pdf" + "$"
					+ "/Pharmacy/Sales/dailysale/" + todays_date
					+ "_sales_daily_report.xls";

			return srPath;
		}
		
		

		@Override
		public String getDailySaleReportStorewise(List<ReportProductWiseBatchSale> productWiseBatchSales, String date,
				String totalAmount, HttpServletRequest request, String totalAmountReceive, String storeName) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Daily Sale Report Storewise");
				jasperParameter.put("date", date);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("totalAmountReceive", totalAmountReceive);
				jasperParameter.put("storeName", storeName);
				/* jasperParameter.put("batchId", batchId); */
				/*
				 * jasperParameter.put("ts2", to); jasperParameter.put("companyId",
				 * companyId);
				 */

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/sales_daily_report_storeWise.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/sales_daily_report_xls_storeWise.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/dailysale/")
						+ "//" + todays_date + "_sales_daily_report_storeWise.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/dailysale/")
						+ "//" + todays_date + "_sales_daily_report_storeWise.xls";

				getReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, productWiseBatchSales);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Sales/dailysale/" + todays_date
					+ "_sales_daily_report_storeWise.pdf" + "$"
					+ "/Pharmacy/Sales/dailysale/" + todays_date
					+ "_sales_daily_report_storeWise.xls";

			return srPath;
		}

		@Override
		public String getPatientSaleTotalBillDataReport(List<ReportProductWiseBatchSale> cateSales, String from, String to,HttpServletRequest request,String vat55,String vat125,String vat0,
				String netAmt,String tax55,String tax12,String tax0) 
		{

			initializeDate();
			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Total Sales Report");
				jasperParameter.put("from", from);
				jasperParameter.put("to", to);
				
				jasperParameter.put("vat55", vat55);
				jasperParameter.put("vat125", vat125);
				jasperParameter.put("vat0", vat0);
				jasperParameter.put("net", netAmt);
				
				jasperParameter.put("tax55", tax55);
				jasperParameter.put("tax12", tax12);
				jasperParameter.put("tax0", tax0);
				

				String pdfXmlPath = request
						.getRealPath("/WEB-INF/Report-xml/pharmacy/total_patientwise_sales_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/WEB-INF/Report-xml/pharmacy/total_patientwise_sales_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/J2/")
						+ "//" + todays_date + "_total_Sales_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/J2/")
						+ "//" + todays_date + "_total_Sales_report.xls";

				getReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, cateSales);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Sales/J2/" + todays_date
					+ "_total_Sales_report.pdf" + "$"
					+ "/Pharmacy/Sales/J2/" + todays_date
					+ "_total_Sales_report.xls";

			return srPath;
		}

		@Override
		public String getNearAllExpiryReport(List<ReportExpiry> reportExpiries,
				HttpServletRequest request, String from) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();
				jasperParameter.put("from", from);

				jasperParameter.put("ReportTitle", "Near All Expiry Report");

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/expiry_all_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/expiry_all_report_xls.jrxml");

				pdfPath = request.getRealPath("/ehat_Reports/Pharmacy/expiry/all/")
						+ "//" + todays_date + "_expiry_all_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/expiry/all/")
						+ "//"
						+ todays_date + "_expiry_all_report.xls";

				getExpiryReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportExpiries);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/expiry/all/" + todays_date
					+ "_expiry_all_report.pdf" + "$" + "/Pharmacy/expiry/all/"
					+ todays_date + "_expiry_all_report.xls";

			return srPath;
		}
		
		public void getExpiryReportFunctionForPharmacy(HashMap jasperParameter,
				String pdfXmlPath, String xlsXmlPath, String pdfPath,
				String exlPath, List<ReportExpiry> reportExpiries) {

			// initialize date
			initializeDate();

			try {
				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from

				/* Connection connection = establishConnection(); */

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						reportExpiries);

				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter, new JRBeanCollectionDataSource(
								reportExpiries));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

			} catch (Exception e) {

				e.printStackTrace();
			}
		}
		
		@Override
		public String getGRNReportDetails(
				List<ReportPurchase> reportPurchases, String from, String to,
				String totalAmount, HttpServletRequest request) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "GRN(Goods Receipt Note) Report");
				jasperParameter.put("from", from);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("to", to);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/GRNReport.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/GRNReport.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/daywise/")
						+ "//" + todays_date + "_GRN_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/daywise/")
						+ "//" + todays_date + "_GRN_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/daywise/" + todays_date
					+ "_GRN_report.pdf" + "$"
					+ "/Pharmacy/purchase/daywise/" + todays_date
					+ "_GRN_report.xls";

			return srPath;
		}

		@Override
		public String getPartyNewWisePurchase(List<ReportPurchase> reportPurchases, String productName,
				HttpServletRequest request, String from, String to, String vendorName, String totalAmount) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Party Wise Purchase Report");
				jasperParameter.put("productName", productName);
				jasperParameter.put("from", from);
				jasperParameter.put("totalAmount", totalAmount);
				jasperParameter.put("vendorName", vendorName);
				jasperParameter.put("to", to);
				jasperParameter.put("REPORT_COUNT", 0);

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_newpartywise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/purchase_newpartywise_report.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywise/")
						+ "//" + todays_date + "_purchase_newpartywise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/purchase/partywise/")
						+ "//" + todays_date + "_purchase_newpartywise_report.xls";

				getPurchaseReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, reportPurchases);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/purchase/partywise/" + todays_date
					+ "_purchase_newpartywise_report.pdf" + "$"
					+ "/Pharmacy/purchase/partywise/" + todays_date
					+ "_purchase_newpartywise_report.xls";

			return srPath;
		}

		@Override
		public String getReportForPharmacyAllProduct(String from, String to, HttpServletRequest request,List<ReportList> list) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ts1", from);
				jasperParameter.put("ts2", to);
				//jasperParameter.put("RowNumber", 0);
				jasperParameter.put("ReportTitle", "All Product List");

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/product_all_report_new_pdf.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/product_all_report_xls.xml");

				pdfPath = request.getRealPath("/ehat_Reports/Pharmacy/Product/")
						+ "//" + todays_date + "_product_all_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Product/")
						+ "//"
						+ todays_date + "_product_all_report.xls";

				getReportFunctionNew(jasperParameter, pdfXmlPath, xlsXmlPath,
						pdfPath, exlPath,list);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Product/" + todays_date
					+ "_product_all_report.pdf" + "$" + "/Pharmacy/Product/"
					+ todays_date + "_product_all_report.xls";

			return srPath;
		}
		
		
		
		public void getReportFunctionNew(HashMap jasperParameter,
				String pdfXmlPath, String xlsXmlPath, String pdfPath, String exlPath,List<ReportList> list) {

			//Connection connection = null;

			try {

				// JasperReport is the object that holds our compiled jrxml file
				JasperReport jasperReport;
				// JasperPrint is the object contains report after result filling
				// process
				JasperPrint jasperPrint;
				// connection is the data source we used to fetch the data from
				//connection = establishConnection();

				JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(
						list);
				
				jasperReport = JasperCompileManager.compileReport(pdfXmlPath);
				// filling report with data from data source
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter,beanColDataSource);

				JasperExportManager.exportReportToPdfFile(jasperPrint, pdfPath);

				jasperReport = JasperCompileManager.compileReport(xlsXmlPath);
				// filling report with data from data source
				jasperParameter.put(JRParameter.IS_IGNORE_PAGINATION, Boolean.TRUE);
				jasperPrint = JasperFillManager.fillReport(jasperReport,
						jasperParameter,new JRBeanCollectionDataSource(
								list));

				JRXlsExporter exporterXls = new JRXlsExporter();
				exporterXls.setParameter(JRExporterParameter.JASPER_PRINT,
						jasperPrint);
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.remove.empty.space.between.rows",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.white.page.background",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.create.custom.palette",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.one.page.per.sheet",
						"false");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.graphics", "true");
				jasperPrint
						.setProperty(
								"net.sf.jasperreports.export.xls.collapse.row.span",
								"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.border",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.ignore.cell.background",
						"true");
				jasperPrint.setProperty(
						"net.sf.jasperreports.export.xls.wrap.text", "true");

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				exporterXls
						.setParameter(
								JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_COLUMNS,
								Boolean.TRUE);

				exporterXls.setParameter(
						JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
						Boolean.FALSE);
				exporterXls.setParameter(
						JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,
						Boolean.TRUE);
				// String exlPath = request.getRealPath("./ehat_Reports/Patient/")
				// + "//" + todays_date + "_opd_all_report.xls";
				exporterXls.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
						exlPath);
				exporterXls.exportReport();

				//connection.close();

			} catch (Exception e) {
				e.printStackTrace();
			} 
		}
		
		
		// Patient Sale vou wise
		//Modified By Vishant
		//Date   26-09-2023
		@Override
		public String patientwiseVouList(
				List<ReportProductWiseBatchSale> patientwiseProductSales,
				Integer patientId, String totalAmount, String from, String to,
				HttpServletRequest request) {

			// initialize date
			initializeDate();

			try {
				HashMap jasperParameter = new HashMap();

				jasperParameter.put("ReportTitle", "Patient Wise Vou List");
				jasperParameter.put("from", from);
				jasperParameter.put("to", to);
				jasperParameter.put("patientId", patientId);
				jasperParameter.put("totalAmount", totalAmount);

				/* jasperParameter.put("batchId", batchId); */
				/*
				 * jasperParameter.put("ts2", to); jasperParameter.put("companyId",
				 * companyId);
				 */

				String pdfXmlPath = request
						.getRealPath("/Report-xml/pharmacy/sales_patient_vouwise_report.jrxml");
				String xlsXmlPath = request
						.getRealPath("/Report-xml/pharmacy/sales_patient_vouwise_report_xls.jrxml");

				pdfPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/patientSaleVouwise/")
						+ "//" + todays_date + "_sales_patient_vouwise_report.pdf";

				String exlPath = request
						.getRealPath("/ehat_Reports/Pharmacy/Sales/patientSaleVouwise/")
						+ "//" + todays_date + "_sales_patient_vouwise_report.xls";

				getReportFunctionForPharmacy(jasperParameter, pdfXmlPath,
						xlsXmlPath, pdfPath, exlPath, patientwiseProductSales);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String srPath = "/Pharmacy/Sales/patientSaleVouwise/" + todays_date
					+ "_sales_patient_vouwise_report.pdf" + "$"
					+ "/Pharmacy/Sales/patientSaleVouwise/" + todays_date
					+ "_sales_patient_vouwise_report.xls";

			return srPath;
		}
}
