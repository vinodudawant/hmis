package com.hms.pharmacy.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.doctordesk.controller.DoctorDeskQueueController;
import com.hms.dto.DistrictwisePatientCountDTO;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorList;
import com.hms.dto.Users;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.dto.WardWiseDetaisDto;
import com.hms.ehat.service.UnitService;
import com.hms.pharmacy.pojo.CashReceiptReport;
//import com.hms.model.ReportModel;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.ChequePaidReceiptReport;
import com.hms.pharmacy.pojo.ChequeReceiptReport;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.CreditNoteDetailsReportDTO;
import com.hms.pharmacy.pojo.DebitNoteData;
import com.hms.pharmacy.pojo.MrnReportDetail;
import com.hms.pharmacy.pojo.PaidReceiptReport;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.ProductBelowMinLevel;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportDebitNote;
import com.hms.pharmacy.pojo.ReportExpiry;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportList;
import com.hms.pharmacy.pojo.ReportMIS;
import com.hms.pharmacy.pojo.ReportModel;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.ReportStock;
import com.hms.pharmacy.pojo.ReportStock2;
import com.hms.pharmacy.pojo.ReportVat;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.CategoryService;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.CompanyService;
import com.hms.pharmacy.service.ProductBelowMinLevelService;
import com.hms.pharmacy.service.PurchaseService;
import com.hms.pharmacy.service.ReportModelService;
import com.hms.pharmacy.service.ReportService;
import com.hms.pharmacy.service.ShelfService;
import com.hms.pharmacy.service.TaxService;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Controller
@RequestMapping(value = "/report")
public class ReportController {

	static Logger log=Logger.getLogger(ReportController.class.getName());
	
	@Autowired
	CompanyService companyService;

	@Autowired
	PurchaseService purchaseService;

	@Autowired
	ReportService reportService;

	@Autowired
	CategoryService categoryService;

	@Autowired
	ShelfService shelfService;

	@Autowired
	CommonService commonService;
	
	@Autowired
	ReportModelService objReportModel;

	@Autowired
	private ProductBelowMinLevelService belowMinLevelService;
	
	

	@RequestMapping(value = "/report", method = RequestMethod.GET)
	public ModelAndView reports(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();

		String url = request.getRequestURI();
		boolean result = commonService.getUserAccess(request, url);

		if (result) {
			modelAndView.setViewName("pharma_reports");
		} else {
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/getCompanyListReportPage", method = RequestMethod.GET)
	public ModelAndView companyListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_company_list");
		return modelAndView;
	}

	@RequestMapping(value = "/getPatientLedgerReportPage", method = RequestMethod.GET)
	public ModelAndView getPatientLedger(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_patient_ledger");
		return modelAndView;
	}

	@RequestMapping(value = "/getCancelIndentPage", method = RequestMethod.GET)
	public ModelAndView getCancelIndentPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_cancel_indent");
		return modelAndView;
	}

	@RequestMapping(value = "/getCategoriwiseReportPage", method = RequestMethod.GET)
	public ModelAndView getCategoriwiseReportPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_category_total");
		return modelAndView;
	}

	@RequestMapping(value = "/getSpecificCategoriwiseReportPage", method = RequestMethod.GET)
	public ModelAndView getSpecificCategoriwiseReportPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_category_wise");
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/", method = RequestMethod.GET) public
	 * 
	 * @ResponseBody List<ReportProductWiseBatchSale>
	 * getTotalSaleCount(HttpServletRequest request,HttpServletResponse response) {
	 * 
	 * 
	 * }
	 */

	@RequestMapping(value = "/getProductAllListReportPage", method = RequestMethod.GET)
	public ModelAndView allProductListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_product_list_all");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesProductBatchReportPage", method = RequestMethod.GET)
	public ModelAndView saleProductBatchwiseListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_product_batch");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesProductPartyReportPage", method = RequestMethod.GET)
	public ModelAndView saleProductPartywiseListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_product_partywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesPartyProductReportPage", method = RequestMethod.GET)
	public ModelAndView salePartyProductwiseListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_party_productwise");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesDailySalesReportPage", method = RequestMethod.GET)
	public ModelAndView saleDailySalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_daily_sale");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesDailySalesReportStorewisePage", method = RequestMethod.GET)
	public ModelAndView saleDailySaleStorewisePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_daily_storewise");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesUserWiseDailySalesReportPage", method = RequestMethod.GET)
	public ModelAndView saleUserWiseDailySalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_userwise_daily_sale");
		return modelAndView;
	}

	@RequestMapping(value = "/getStorewiseSaleReportPage", method = RequestMethod.GET)
	public ModelAndView getStoreReport(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_storewise_product_report");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesTotalSalesReportPage", method = RequestMethod.GET)
	public ModelAndView saleTotalSalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_total_sale");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesTotalSalesWithPurchaseRateReportPage", method = RequestMethod.GET)
	public ModelAndView saleTotalSaleWithPurchaseRatePage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_total_sale_purchaseRate");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesSchH1ReportPage", method = RequestMethod.GET)
	public ModelAndView saleScheduleH1SalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_schedule");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesSchXReportPage", method = RequestMethod.GET)
	public ModelAndView saleScheduleXSalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_scheduleX_page");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesSchNDPSReportPage", method = RequestMethod.GET)
	public ModelAndView saleScheduleNDPSSalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_scheduleNDPS_page");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesSchNRXReportPage", method = RequestMethod.GET)
	public ModelAndView saleScheduleNRXSalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_scheduleNRX_page");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesCategorReportPage", method = RequestMethod.GET)
	public ModelAndView getSalesCategorReportPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_categorywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getFifthCounterPage", method = RequestMethod.GET)
	public ModelAndView getFifthCounterPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();
		/* String userType= bundle.getObject("user").toString(); */

		HttpSession session = request.getSession();
		String sessionUserType = (String) session.getAttribute("userType");

		if (hospitalName.equals("apple") && sessionUserType.equals("admin")) {
			modelAndView.setViewName("pharma_report_sales_fifth_counter");
		} else {
			modelAndView.setViewName("404");
		}

		return modelAndView;
	}

	@RequestMapping(value = "/getFifthCounterTotalPage", method = RequestMethod.GET)
	public ModelAndView getFifthCounterTotalPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();
		/* String userType= bundle.getObject("user").toString(); */

		HttpSession session = request.getSession();
		String sessionUserType = (String) session.getAttribute("userType");

		if (hospitalName.equals("apple") && sessionUserType.equals("admin")) {
			modelAndView.setViewName("pharma_report_sales_fifth_Counter_total");
		} else {
			modelAndView.setViewName("404");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/getStockCurrentProductWisePage", method = RequestMethod.GET)
	public ModelAndView stockCurrentProductWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_current_productwise");
		return modelAndView;
	}

	@RequestMapping(value = "/getStockCurrentDrugWisePage", method = RequestMethod.GET)
	public ModelAndView getStockCurrentDrugWisePage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_current_drugwise");
		return modelAndView;
	}

	@RequestMapping(value = "/getStockCurrentBatchWisePage", method = RequestMethod.GET)
	public ModelAndView stockCurrentBatchWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_current_batchwise");
		return modelAndView;
	}

	@RequestMapping(value = "/getBatchWiseStockPage", method = RequestMethod.GET)
	public ModelAndView getBatchWiseStockPage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_batchwise_stock_report");
		return modelAndView;
	}

	@ResponseBody
	@RequestMapping(value = "/getBatchWiseStockReport", method = RequestMethod.GET)
	public List<ReportStock> getBatchWiseStockReport(HttpServletRequest request, HttpServletResponse response) {
		return reportService.getStockBatchWise();
	}

	@RequestMapping(value = "/getStockCurrentStoreWisePage", method = RequestMethod.GET)
	public ModelAndView stockCurrentStoreWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_current_storewise");
		return modelAndView;
	}

	@RequestMapping(value = "/getStockCurrentCompanyWisePage", method = RequestMethod.GET)
	public ModelAndView stockCurrentCompanyWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_current_companywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getStockCurrentShelfWisePage", method = RequestMethod.GET)
	public ModelAndView stockCurrentShelfWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_current_shelfwise");
		return modelAndView;
	}

	@RequestMapping(value = "/getStockCurrentCategoryWisePage", method = RequestMethod.GET)
	public ModelAndView stockCurrentCategoryWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_current_categorywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchaseProductWisePage", method = RequestMethod.GET)
	public ModelAndView purchaseProductWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_productwise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchaseBatchWisePage", method = RequestMethod.GET)
	public ModelAndView purchaseBatchWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_batchwise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchaseNewProductPage", method = RequestMethod.GET)
	public ModelAndView purchaseNewProduct(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_new_product");
		return modelAndView;
	}

	@RequestMapping(value = "/getDaywisePurchasePage", method = RequestMethod.GET)
	public ModelAndView daywisePurchase(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_daywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchasePartywisePage", method = RequestMethod.GET)
	public ModelAndView purchasePartywise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_partywise_report");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchasePatyWisePage", method = RequestMethod.GET)
	public ModelAndView purchasePartyWiseData(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_partywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchaseCategoryWisePage", method = RequestMethod.GET)
	public ModelAndView purchaseCategoryWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_categorywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchaseCompanyWisePage", method = RequestMethod.GET)
	public ModelAndView purchaseCompanyWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_companywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchasePendingBillPage", method = RequestMethod.GET)
	public ModelAndView purchasePendingBill(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_pending_bill_new");
		return modelAndView;
	}

	@RequestMapping(value = "/getPurchaseDiscountPage", method = RequestMethod.GET)
	public ModelAndView purchaseDiscount(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_discount");
		return modelAndView;
	}

	@RequestMapping(value = "/getMisDailyBusinessPage", method = RequestMethod.GET)
	public ModelAndView dailyBusiness(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_mis_daily_business");
		return modelAndView;
	}

	@RequestMapping(value = "/getMisStockOutPage", method = RequestMethod.GET)
	public ModelAndView stockOut(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_mis_stock_out");
		return modelAndView;
	}

	@RequestMapping(value = "/getDeletedPurchasePage", method = RequestMethod.GET)
	public ModelAndView deletedPurchase(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_mis_delete_purchase");
		return modelAndView;
	}

	// added by Akshata
	@RequestMapping(value = "/getExpiryAllPage", method = RequestMethod.GET)
	public ModelAndView expiryAll(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		 modelAndView.setViewName("pharma_report_expiry_all");
		//modelAndView.setViewName("pharma_report_expiry_all_new");
		return modelAndView;
	}

	// added by Akshata
	@RequestMapping(value = "/getExpiryCompanyWisePage", method = RequestMethod.GET)
	public ModelAndView expiryCompanyWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_expiry_companywise_new");
		return modelAndView;
	}

	@RequestMapping(value = "/getExpiryShelfWisePage", method = RequestMethod.GET)
	public ModelAndView expiryShelfWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_expiry_shelfwise_new");
		return modelAndView;
	}

	@RequestMapping(value = "/getProductCompanyListReportPage", method = RequestMethod.GET)
	public ModelAndView companyProductListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		List<CompanyMaster> companyMasters = companyService.getCompanies();
		modelAndView.addObject("companyMasters", companyMasters);

		modelAndView.setViewName("pharma_report_product_list_company");
		return modelAndView;
	}

	@RequestMapping(value = "/getMonthWiseVatPurchasePage", method = RequestMethod.GET)
	public ModelAndView getMonthWiseVatPurchasePage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_vat_monthwise_purchase");
		return modelAndView;
	}

	@RequestMapping(value = "/getDateWiseVatPurchasePage", method = RequestMethod.GET)
	public ModelAndView getDateWiseVatPurchasePage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_vat_datewise_purchase");
		return modelAndView;
	}

	@RequestMapping(value = "/getAllPartyWiseVatPurchasePage", method = RequestMethod.GET)
	public ModelAndView getAllPartyWiseVatPurchasePage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_vat_partywise_purchase");
		return modelAndView;
	}

	@RequestMapping(value = "/getHsnWiseGSTPurchasePage", method = RequestMethod.GET)
	public ModelAndView getHsnWiseGSTPurchasePage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_hsn_wise_gst_purchase");
		return modelAndView;
	}

	@RequestMapping(value = "/getVouWiseVatPurchasePage", method = RequestMethod.GET)
	public ModelAndView getVouWiseVatPurchasePage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_vat_vouwise_purchase");
		return modelAndView;
	}

	@RequestMapping(value = "/getAllSalesTotalPage", method = RequestMethod.GET)
	public ModelAndView purchasePartyWise(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_total_sales");
		return modelAndView;
	}

	@RequestMapping(value = "/getAllPatientSalesTotalPage", method = RequestMethod.GET)
	public ModelAndView getAllPatientSales(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_total_patient_sales");
		return modelAndView;
	}

	@RequestMapping(value = "/getProductCompanyList", method = RequestMethod.GET)
	public @ResponseBody String productCompanyList(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String companyId = request.getParameter("companyId");

		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		boolean isReportGet = false;

	//	

		/*
		 * String pdfFilePath =
		 * reportService.getReportForPharmacyCompanyProduct(fromReult.toString(),
		 * toReult.toString(), request, companyId);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getAllProductList", method = RequestMethod.GET)
	public @ResponseBody String allProductList(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		boolean isReportGet = false;

		String callform="onload";
		String userData="";
		List<ReportList> list = reportService.getProductListData(fromReult.toString(), toReult.toString(),callform,userData);

		String pdfFilePath = objReportModel.getReportForPharmacyAllProduct(fromReult.toString(), toReult.toString(),
				request,list);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}
		 
		return msg;
	}

	@RequestMapping(value = "/getCompanyList", method = RequestMethod.GET)
	public @ResponseBody String companyList(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		boolean isReportGet = false;

		//

		/*
		 * String pdfFilePath =
		 * objReportModel.getReportForPharmacyCompany(fromReult.toString(),
		 * toReult.toString(), request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPatientReport", method = RequestMethod.GET)
	public @ResponseBody String getPOLIst(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		boolean isReportGet = false;

	//	

		/*
		 * String pdfFilePath = objReportModel.getReportForPharmacyPatient(from, to,
		 * request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; } return msg;
		 */
		return msg;
	}

	@RequestMapping(value = "/getProductWiseBatchList", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> productWiseBatchList(
			@RequestParam("productId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getProductWiseBatchList(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getPatientwiseProductList", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> patientwiseProductList(
			@RequestParam("patientId") Integer patientId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String type = request.getParameter("type");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.patientwiseProductList(patientId,
				fromReult.toString(), toReult.toString(), type);

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getProductWisePartyList", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> productWisePartyList(
			@RequestParam("productId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getProductWisePartyList(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getBatchWiseSaleList", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getBatchWiseSaleList(@RequestParam("batchId") Integer batchId,
			HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getBatchWiseSaleList(batchId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getProductWiseBatchListForReport", method = RequestMethod.GET)
	public @ResponseBody String productWiseBatchList(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		String msg = "";

		Integer batchId = Integer.parseInt(request.getParameter("batchId"));
		String productName = request.getParameter("productName");
		String totalAmount = request.getParameter("totalAmount");

		boolean isReportGet = false;

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getBatchWiseSaleList(batchId,
				fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getProductWiseBatchList(productWiseBatchSales, productName,
		 * batchId, request, totalAmount, fromReult.toString(), toReult.toString());
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	// /////////////////////////////////////getProductSaleDataByBatchIdForReport

	@RequestMapping(value = "/getProductWisePartyListForReport", method = RequestMethod.GET)
	public @ResponseBody String productWisePartyListReport(@RequestParam("productId") Integer productId,
			HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("productName");
		String totalAmount = request.getParameter("totalAmount");
		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getProductWisePartyList(productId,
				fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getProductWisePartyList(productWiseBatchSales, productName,
		 * request, totalAmount, fromReult.toString(), toReult.toString());
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPartyList", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getPartyList(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getPartyList(fromReult.toString(),
				toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getPartyWiseProductSaleList", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(
			@RequestParam("vendorId") Integer vendorId, HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getPartyWiseProductSaleList(vendorId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getPartyWiseProductListForReport", method = RequestMethod.GET)
	public @ResponseBody String getPartyWiseProductListForReport(@RequestParam("vendorId") Integer vendorId,
			HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("vendorName");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = purchaseService.getPartyWiseProductSaleList(vendorId,
				fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getPartyWiseProductList(productWiseBatchSales, productName,
		 * request, fromReult.toString(), toReult.toString());
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getDailyCounterSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyCounterSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		/*
		 * String userId= request.getParameter("userId"); if(userId!=null) {
		 * 
		 * }
		 */

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDailyUserWiseSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyUserWiseSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String type = request.getParameter("type");

		String userId = "";
		if (request.getParameter("userId") != null) {
			userId = request.getParameter("userId");
		}

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getDailyUserWiseSaleData(fromReult.toString(), type, userId);

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getStorewiseStockData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyStockWiseSaleData(HttpServletRequest request,
			HttpServletResponse response) {
		String storeId = "";
		if (request.getParameter("storeName") != null) {
			storeId = request.getParameter("storeName");
		}

		HttpSession session = request.getSession();
		Integer userId1 = (Integer) session.getAttribute("userId1");

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDailyStockWiseSaleData(storeId);

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getStorewiseStockReport", method = RequestMethod.GET)
	public @ResponseBody String getStoreStockReport(HttpServletRequest request, HttpServletResponse response) {
		String storeId = "";
		if (request.getParameter("storeName") != null) {
			storeId = request.getParameter("storeName");
		}

		HttpSession session = request.getSession();
		Integer userId1 = (Integer) session.getAttribute("userId1");

		 String msg = "";

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDailyStockWiseSaleData(storeId);

		String pdfFilePath = objReportModel.getStorewiseStockReport(productWiseBatchSales, request);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {
			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}

		return msg;
	}

	@RequestMapping(value = "/getDailyPatientSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyPatientSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		if (to != null) {
			String toArray[] = to.split("/");

			toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		} else {
			toReult = fromReult;
		}

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getPartyWiseProductSaleList(fromReult.toString(), toReult.toString(), "patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getCategoryWiseReportPage", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getCategoryWiseReportPage(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		if (to != null) {
			String toArray[] = to.split("/");

			toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		} else {
			toReult = fromReult;
		}

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getCategoryWiseReportPage(fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDailyIndentSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyIndentSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(), "indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDailyHospitalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyHospitalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(), "hospitalSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDailyTotalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyTotalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
				"counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
				"indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
				"hospitalSale");

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
				"patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}
		for (ReportProductWiseBatchSale patient : patientSales) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDailyTotalSaleDataStorewise", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyTotalSaleDataStore(HttpServletRequest request,
			HttpServletResponse response) {
		String saleType = request.getParameter("saleType");
		String from = request.getParameter("from");
		String storeName = request.getParameter("storeName");

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"counterSale", storeName);
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"indentSale", storeName);
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"hospitalSale", storeName);
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"patientSale", storeName);
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "counterSale",
					storeName);

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "indentSale",
					storeName);

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "hospitalSale",
					storeName);

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "patientSale",
					storeName);

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}
			for (ReportProductWiseBatchSale patientSale : patientSales) {
				productWiseBatchSales.add(patientSale);
			}
		}

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDailySaleReportStorewise", method = RequestMethod.GET)
	public @ResponseBody String getDailySaleReportStorewise(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");
		String storeName = request.getParameter("storeName");
		String msg = "";

		String fromArray[] = from.split("/");
		String totalAmount = request.getParameter("totalAmount");
		String totalAmountReceive = request.getParameter("totalAmountRec");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"counterSale", storeName);
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"indentSale", storeName);
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"hospitalSale", storeName);
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(),
					"patientSale", storeName);
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "counterSale",
					storeName);

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "indentSale",
					storeName);

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "hospitalSale",
					storeName);

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getPartyWiseProductSaleListStorewise(fromReult.toString(), "patientSale",
					storeName);

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}
			for (ReportProductWiseBatchSale patientSale : patientSales) {
				productWiseBatchSales.add(patientSale);
			}
		}

		String pdfFilePath = objReportModel.getDailySaleReportStorewise(productWiseBatchSales, fromReult.toString(),
				totalAmount, request, totalAmountReceive, storeName);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}

		return msg;
	}

	@RequestMapping(value = "/getUserWiseDailyTotalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getUserWiseDailyTotalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String userId = "";
		if (request.getParameter("userId") != null) {
			userId = request.getParameter("userId");
		}

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "counterSale", userId);

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "indentSale", userId);

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "hospitalSale", userId);

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "patientSale", userId);

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}
		for (ReportProductWiseBatchSale patient : patientSales) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getItemLagderPage", method = RequestMethod.GET)
	public ModelAndView itemLadger(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_item_lagder");
		return modelAndView;
	}

	@RequestMapping(value = "/getDailyTotalSaleDataFifthCounter", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDailyTotalSaleDataFifthCounter(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String fromArray[] = from.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getFifthCounterDailySaleData(fromReult.toString(), "counterSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDailySaleReport", method = RequestMethod.GET)
	public @ResponseBody String getDailySaleReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String fromArray[] = from.split("/");
		String totalAmount = request.getParameter("totalAmount");
		String totalAmountReceive = request.getParameter("totalAmountRec");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		List<ReportProductWiseBatchSale> productWiseBatchSalesForReport = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleList(fromReult.toString(),
					fromReult.toString(), "counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleList(fromReult.toString(),
					fromReult.toString(), "indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleList(fromReult.toString(),
					fromReult.toString(), "hospitalSale");
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getPartyWiseProductSaleList(fromReult.toString(),
					fromReult.toString(), "patientSale");
			for (ReportProductWiseBatchSale patientSale : productWiseBatchSales) {
				/*
				 * if(patientSale.getTransType().equalsIgnoreCase("Credit")){
				 * patientSale.setAmtBalance("0"); patientSale.setAmtReceive("0");
				 * patientSale.setCurrentAmtBal("0"); patientSale.setOpeningStockqty("0");//for
				 * cash }
				 */

				productWiseBatchSalesForReport.add(patientSale);
			}
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
					"counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
					"indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
					"hospitalSale");

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getPartyWiseProductSaleList(fromReult.toString(), fromReult.toString(),
					"patientSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}
			for (ReportProductWiseBatchSale patientSale : patientSales) {
				productWiseBatchSales.add(patientSale);
				if (patientSale.getTransType().equalsIgnoreCase("Credit")) {
					patientSale.setAmtBalance("0");
					patientSale.setAmtReceive("0");
					patientSale.setCurrentAmtBal("0");
					patientSale.setOpeningStockqty("0");// for cash
				}
				if (patientSale.getTransType().equalsIgnoreCase("Cash")) {
					patientSale.setAmount("0");
					patientSale.setOpeningStockqty(patientSale.getAmount());
				}

				productWiseBatchSalesForReport.add(patientSale);
			}
		}

		String pdfFilePath = objReportModel.getDailySaleReport(productWiseBatchSalesForReport, fromReult.toString(),
				totalAmount, request, totalAmountReceive);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}
		return msg;
	}

	@RequestMapping(value = "/getFifthCounterDailySaleReport", method = RequestMethod.GET)
	public @ResponseBody String getFifthCounterDailySaleReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String fromArray[] = from.split("/");
		String totalAmount = request.getParameter("totalAmount");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getFifthCounterDailySaleData(fromReult.toString(), "counterSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getFifthCounterDailySaleData(fromReult.toString(), "counterSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getFifthCounterDailySaleReport(productWiseBatchSales,
		 * fromReult.toString(), totalAmount, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getTotalCounterSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalCounterSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(),
				toReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalCounterSaleDataWithPruchaseRate", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalCounterSaleDataWithPurchaseRate(
			HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(), toReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchH1CounterSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchH1CounterSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchXCounterSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchXCounterSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNDPSCounterSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNDPSCounterSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNRXCounterSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNRXCounterSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getFifthCounterTotalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getFifthCounterTotalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(),
				toReult.toString(), "counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalIndentSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalIndentSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(),
				toReult.toString(), "indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalIndentSaleDataForPurchase", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalIndentSaleDataForPurchase(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(), toReult.toString(), "indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchH1IndentSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchH1IndentSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(), "indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchXIndentSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchXIndentSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(), "indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNDPSIndentSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNDPSIndentSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(), "indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNRXIndentSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNRXIndentSaleData(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(), "indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalHospitalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalHospitalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(),
				toReult.toString(), "hospitalSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchH1HospitalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchH1HospitalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(), "hospitalSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchXHospitalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchXHospitalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(), "hospitalSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNDPSHospitalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNDPSHospitalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(), "hospitalSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNRXHospitalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNRXHospitalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(), "hospitalSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalPatientSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalPatientSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(),
				toReult.toString(), "patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalPatientSaleDataForPurchase", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalPatientSaleDataWithPurchaseRate(
			HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(), toReult.toString(), "patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchH1PatientSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchH1PatientSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(), "patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchXPatientSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchXPatientSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(), "patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNDPSPatientSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNDPSPatientSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(), "patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNRXPatientSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNRXPatientSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(), "patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "hospitalSale");

		List<ReportProductWiseBatchSale> patientSale = new ArrayList<ReportProductWiseBatchSale>();
		patientSale = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSale) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSaleDataWithPurchaseRate", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSaleDataWithPurchaseRate(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(), toReult.toString(),
				"counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(), toReult.toString(),
				"indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(), toReult.toString(),
				"hospitalSale");

		List<ReportProductWiseBatchSale> patientSale = new ArrayList<ReportProductWiseBatchSale>();
		patientSale = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(), toReult.toString(),
				"patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSale) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getCategoryWiseSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getCategoryWiseSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String catId = request.getParameter("catId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getCategoryWiseSaleData(fromReult.toString(), toReult.toString(), "counterSale",
				catId);

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getCategoryWiseSaleData(fromReult.toString(), toReult.toString(), "indentSale",
				catId);

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getCategoryWiseSaleData(fromReult.toString(), toReult.toString(), "hospitalSale",
				catId);

		List<ReportProductWiseBatchSale> patientSale = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getCategoryWiseSaleData(fromReult.toString(), toReult.toString(), "patientSale",
				catId);

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSale) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchH1SaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchH1SaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		/*
		 * List<ReportProductWiseBatchSale> counterSales = new
		 * ArrayList<ReportProductWiseBatchSale>(); counterSales =
		 * reportService.getTotalSchH1CounterSaleData( fromReult.toString(),
		 * toReult.toString(), "counterSale");
		 */

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
				"indentSale");

		/*
		 * List<ReportProductWiseBatchSale> hospitalSales = new
		 * ArrayList<ReportProductWiseBatchSale>(); hospitalSales =
		 * reportService.getTotalSchH1CounterSaleData( fromReult.toString(),
		 * toReult.toString(), "hospitalSale");
		 */
		List<ReportProductWiseBatchSale> patientSale = new ArrayList<ReportProductWiseBatchSale>();
		patientSale = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
				"patientSale");

		/*
		 * for (ReportProductWiseBatchSale counter : counterSales) {
		 * productWiseBatchSales.add(counter); }
		 */
		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		/*
		 * for (ReportProductWiseBatchSale hospital : hospitalSales) {
		 * productWiseBatchSales.add(hospital); }
		 */

		for (ReportProductWiseBatchSale patient : patientSale) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchXSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchXSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
				"counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(), "indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
				"hospitalSale");

		List<ReportProductWiseBatchSale> patientSale = new ArrayList<ReportProductWiseBatchSale>();
		patientSale = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
				"patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSale) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNDPSSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNDPSSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
				"counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
				"indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
				"hospitalSale");

		List<ReportProductWiseBatchSale> patientSale = new ArrayList<ReportProductWiseBatchSale>();
		patientSale = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
				"patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSale) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSchNRXSaleData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSchNRXSaleData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
				"counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
				"indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
				"hospitalSale");

		List<ReportProductWiseBatchSale> patientSale = new ArrayList<ReportProductWiseBatchSale>();
		patientSale = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
				"patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSale) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSaleDataForFifthCounter", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSaleDataForFifthCounter(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalSaleDataForFifthCounter(fromReult.toString(), toReult.toString(),
				"counterSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSaleReport", method = RequestMethod.GET)
	public @ResponseBody String getTotalSaleReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		String totalAmountReceive = request.getParameter("totalAmountReceive");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(),
					"counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(),
					"patientSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "hospitalSale");

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "patientSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}

			for (ReportProductWiseBatchSale patient : patientSales) {
				productWiseBatchSales.add(patient);
			}
		}

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getTotalSaleReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request,
		 * totalAmountReceive);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getCancelIndentReport", method = RequestMethod.GET)
	public @ResponseBody String getCancelIndentReport(HttpServletRequest request, HttpServletResponse response) {

		String msg = "";
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		productWiseBatchSales = reportService.getCancelIndentDetails(fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getCancelIndentReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else { msg = "pdf path->"
		 * + pdfFilePath + " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getTotalSaleReportWithPurchaseRate", method = RequestMethod.GET)
	public @ResponseBody String getTotalSaleReportWithPurchaseRate(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		String totalAmountReceive = request.getParameter("totalAmountReceive");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "hospitalSale");
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "patientSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "hospitalSale");

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getTotalCounterSaleDataWithPurchaseRate(fromReult.toString(),
					toReult.toString(), "patientSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}

			for (ReportProductWiseBatchSale patient : patientSales) {
				productWiseBatchSales.add(patient);
			}
		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getTotalSaleReportWithPurchaseRate(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request,
		 * totalAmountReceive);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getTotalScheduleSaleReport", method = RequestMethod.GET)
	public @ResponseBody String getTotalScheduleSaleReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"patientSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getTotalSchH1CounterSaleData(fromReult.toString(), toReult.toString(),
					"patientSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}

			for (ReportProductWiseBatchSale patient : patientSales) {
				productWiseBatchSales.add(patient);
			}
		}
		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getTotalScheduleSaleReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request, saleType);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getTotalScheduleXSaleReport", method = RequestMethod.GET)
	public @ResponseBody String getTotalScheduleXSaleReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");
		String totalAmount = request.getParameter("totalAmount");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"patientSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getTotalSchXCounterSaleData(fromReult.toString(), toReult.toString(),
					"patientSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}

			for (ReportProductWiseBatchSale patient : patientSales) {
				productWiseBatchSales.add(patient);
			}
		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getTotalScheduleXSaleReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request, saleType);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getTotalScheduleNDPSSaleReport", method = RequestMethod.GET)
	public @ResponseBody String getTotalScheduleNDPSSaleReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");
		String totalAmount = request.getParameter("totalAmount");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(),
					toReult.toString(), "counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(),
					toReult.toString(), "indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(),
					toReult.toString(), "hospitalSale");
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(),
					toReult.toString(), "patientSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
					"counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getTotalSchNDPSCounterSaleData(fromReult.toString(), toReult.toString(),
					"patientSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}

			for (ReportProductWiseBatchSale patient : patientSales) {
				productWiseBatchSales.add(patient);
			}
		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getTotalScheduleNDPSSaleReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request, saleType);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getTotalScheduleNRXSaleReport", method = RequestMethod.GET)
	public @ResponseBody String getTotalScheduleNRXSaleReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");
		String totalAmount = request.getParameter("totalAmount");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(),
					toReult.toString(), "counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(),
					toReult.toString(), "indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(),
					toReult.toString(), "hospitalSale");
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(),
					toReult.toString(), "patientSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
					"counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getTotalSchNRXCounterSaleData(fromReult.toString(), toReult.toString(),
					"patientSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}

			for (ReportProductWiseBatchSale patient : patientSales) {
				productWiseBatchSales.add(patient);
			}
		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getTotalScheduleNRXSaleReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request, saleType);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getFifthCounterTotalSaleReport", method = RequestMethod.GET)
	public @ResponseBody String getFifthCounterTotalSaleReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getTotalSaleDataForFifthCounter(fromReult.toString(),
					toReult.toString(), "counterSale");
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(),
					"indentSale");
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(),
					"hospitalSale");
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "counterSale");

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "indentSale");

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getTotalSaleData(fromReult.toString(), toReult.toString(), "hospitalSale");

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}
		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getFifthCounterTotalSaleReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	

	@RequestMapping(value = "/getProductWiseStockReport", method = RequestMethod.POST)
	public @ResponseBody String getProductWiseStockReport(HttpServletRequest request, HttpServletResponse response) {

		String type = request.getParameter("type");
		String totalAmount = request.getParameter("totalAmount");

		List<ReportStock> reportStocks = reportService.getProductWiseStock(type);
		String msg = "";
		
		  
		  
		 // String msg = "";
		  
		  String pdfFilePath = objReportModel.getProductWiseStockReport(reportStocks,
		  request, type, totalAmount);
		  
		  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		  
		  msg = "pdf path->" + pdfFilePath +
		  " Oops some problem occured while Generating Report"; }
		 
		return msg;
	}

	@RequestMapping(value = "/getCompanyWiseStock", method = RequestMethod.POST)
	public @ResponseBody List<CompanyMaster> getCompanyWiseStock(HttpServletRequest request,
			HttpServletResponse response) {

		List<CompanyMaster> reportStocks = companyService.getAllCompanieswithDeleted();

		return reportStocks;
	}

	@RequestMapping(value = "/getCompanyWiseStockByCompanyId", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> getCompanyWiseStockByCompanyId(@RequestParam("companyId") Integer companyId,
			HttpServletRequest request, HttpServletResponse response) {

		List<ReportStock> reportStocks = reportService.getCompanyWiseStockByCompanyId(companyId);

		return reportStocks;
	}

	@RequestMapping(value = "/getProductWiseStockByProductId", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> getProductWiseStockByProductId(@RequestParam("productId") Integer productId,
			HttpServletRequest request, HttpServletResponse response) {

		List<ReportStock> reportStocks = reportService.getProductWiseStockByProductId(productId);

		return reportStocks;
	}

	@RequestMapping(value = "/getDrugWiseStockByDrugId", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> getProductWiseStockByDrugId(@RequestParam("drugId") Integer drugId,
			HttpServletRequest request, HttpServletResponse response) {

		List<ReportStock> reportStocks = reportService.getProductWiseStockByDrugId(drugId);

		return reportStocks;
	}

	@RequestMapping(value = "/getCompanyWiseStockReport", method = RequestMethod.POST)
	public @ResponseBody String getCompanyWiseStockReport(@RequestParam("companyId") Integer companyId,
			HttpServletRequest request, HttpServletResponse response) {

		String companyName = request.getParameter("companyName");
		String totalAmount = request.getParameter("totalAmount");
		System.out.println("Company name is" + companyName);
		List<ReportStock> reportStocks = reportService.getCompanyWiseStockByCompanyId(companyId);
		String msg = "";

		//String msg = "";

		String pdfFilePath = objReportModel.getCompanyWiseStockReport(reportStocks, request, companyName, totalAmount);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}

		return msg;
	}

	@RequestMapping(value = "/getProductIdWiseStockReport", method = RequestMethod.POST)
	public @ResponseBody String getProductWiseStockReport(@RequestParam("productId") Integer productId,
			HttpServletRequest request, HttpServletResponse response) {

		String productName = request.getParameter("productName");
		String totalAmount = request.getParameter("totalAmount");

		List<ReportStock> reportStocks = reportService.getProductWiseStockByProductId(productId);
		String msg = "";
		/*
		 * 
		 * 
		 * String msg = "";
		 * 
		 * String pdfFilePath = objReportModel.getProductIdWiseStockReport(reportStocks,
		 * request, productName, totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getDrugWiseStockReport", method = RequestMethod.POST)
	public @ResponseBody String getDrugWiseStockReport(@RequestParam("drugId") Integer drugId,
			HttpServletRequest request, HttpServletResponse response) {

		String drugName = request.getParameter("drugName");
		String totalAmount = request.getParameter("totalAmount");

		List<ReportStock> reportStocks = reportService.getProductWiseStockByDrugId(drugId);
		String msg = "";
		
		  
		  
		  //String msg = "";
		  
		  String pdfFilePath = objReportModel.getStockWiseReport(reportStocks, request,
		  drugName, totalAmount);
		  
		  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		  
		  msg = "pdf path->" + pdfFilePath +
		  " Oops some problem occured while Generating Report"; }
		 
		return msg;
	}

	@RequestMapping(value = "/getShelfWiseStock", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> getShelfWiseStock(HttpServletRequest request, HttpServletResponse response) {

		List<ReportStock> reportStocks = reportService.getShelfWiseStock();
		return reportStocks;
	}

	@RequestMapping(value = "/getShelfWiseStockByShelfId", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> getShelfWiseStockByShelfId(@RequestParam("shelfId") Integer shelfId,
			HttpServletRequest request, HttpServletResponse response) {

		List<ReportStock> reportStocks = reportService.getShelfWiseStockByShelfId(shelfId);

		return reportStocks;
	}

	@RequestMapping(value = "/getShelfWiseStockReport", method = RequestMethod.POST)
	public @ResponseBody String getShelfWiseStockReport(@RequestParam("shelfId") Integer shelfId,
			HttpServletRequest request, HttpServletResponse response) {

		String shelfName = request.getParameter("shelfName");
		String totalAmount = request.getParameter("totalAmount");

		List<ReportStock> reportStocks = reportService.getShelfWiseStockByShelfId(shelfId);
		//String msg="";
		
		  
		  
		  String msg = "";
		  
		  String pdfFilePath = objReportModel.getShelfWiseStockReport(reportStocks,
		  request, shelfName, totalAmount);
		  
		  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		  
		  msg = "pdf path->" + pdfFilePath +
		  " Oops some problem occured while Generating Report"; }
		 
		return msg;
	}

	@RequestMapping(value = "/getCategoryWiseStock", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> getCategoryWiseStock(HttpServletRequest request,
			HttpServletResponse response) {
		List<ReportStock> reportStocks = reportService.getCategoryWiseStock();
		return reportStocks;
	}

	@RequestMapping(value = "/getCategoryWiseStockByCategoryId", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> getCategoryWiseStockByCategoryId(
			@RequestParam("categoryId") Integer categoryId, HttpServletRequest request, HttpServletResponse response) {

		List<ReportStock> reportStocks = reportService.getCategoryWiseStockByCategoryId(categoryId);

		return reportStocks;
	}

	@RequestMapping(value = "/getCategoryWiseStockReport", method = RequestMethod.POST)
	public @ResponseBody String getCategoryWiseStockReport(@RequestParam("categoryId") Integer categoryId,
			HttpServletRequest request, HttpServletResponse response) {

		String categoryName = request.getParameter("categoryName");
		String totalAmount = request.getParameter("totalAmount");

		List<ReportStock> reportStocks = reportService.getCategoryWiseStockByCategoryId(categoryId);
		String msg = "";
		
		  
		  
		  //String msg = "";
		  
		  String pdfFilePath = objReportModel.getCategoryWiseStockReport(reportStocks,
		  request, categoryName, totalAmount);
		  
		  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		  
		  msg = "pdf path->" + pdfFilePath +
		  " Oops some problem occured while Generating Report"; }
		 
		return msg;
	}

	@RequestMapping(value = "/getProductWisePurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getProductWisePurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getProductWisePurchase(fromReult.toString(),
				toReult.toString(), productId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getProductWisePurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getProductWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("productName");
		String totalAmount = request.getParameter("totalAmount");
		String productId = request.getParameter("productId");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getProductWisePurchase(fromReult.toString(),
				toReult.toString(), productId);

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getProductWisePurchase(reportPurchases,
		 * productName, request, fromReult.toString(), toReult.toString(), totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getBatchWisePurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getBatchWisePurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getBatchWisePurchase(fromReult.toString(),
				toReult.toString(), productId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getBatchWisePurchaseByBatchId", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getBatchWisePurchaseByBatchId(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String batchId = request.getParameter("batchId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getBatchWisePurchaseByBatchId(fromReult.toString(),
				toReult.toString(), batchId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getBatchWisePurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getBatchWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("productName");
		/* String totalAmount = request.getParameter("totalAmount"); */
		String batchId = request.getParameter("batchId");
		String batchCode = request.getParameter("batchCode");
		String totalAmount = request.getParameter("totalAmount");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getBatchWisePurchaseByBatchId(fromReult.toString(),
				toReult.toString(), batchId);

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getBatchWisePurchase(reportPurchases,
		 * productName, request, fromReult.toString(), toReult.toString(), batchCode,
		 * totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getNewProductWisePurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getNewProductWisePurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getNewProductWisePurchase(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getDayWisePurchase", method = RequestMethod.POST)
	public @ResponseBody ReportPurchase getDayWisePurchase(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String callform = request.getParameter("callform");
		/*
		 * String fromArray[] = from.split("/"); String toArray[] = to.split("/");
		 * StringBuffer fromReult = new StringBuffer(); fromReult =
		 * fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
		 * 
		 * StringBuffer toReult = new StringBuffer(); toReult =
		 * toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		 */

		List<ReportPurchase> reportPurchases = reportService.getDayWisePurchase(from, to, callform);
		ReportPurchase obj = new ReportPurchase();
		obj.setLstpurc(reportPurchases);
		return obj;
	}

	@RequestMapping(value = "/getNewProductByIdWisePurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getNewProductByIdWisePurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getNewProductByIdWisePurchase(fromReult.toString(),
				toReult.toString(), productId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getNewProductWisePurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getNewProductWisePurchaseReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("productName");
		/* String totalAmount = request.getParameter("totalAmount"); */
		String productId = request.getParameter("productId");
		String totalAmount = request.getParameter("totalAmount");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getNewProductByIdWisePurchase(fromReult.toString(),
				toReult.toString(), productId);

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getNewProductWisePurchase(reportPurchases, productName,
		 * request, fromReult.toString(), toReult.toString(), totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	/*
	 * @RequestMapping(value = "/getDayWisePurchaseReport", method =
	 * RequestMethod.GET) public @ResponseBody String
	 * getDayWisePurchaseReport(HttpServletRequest request, HttpServletResponse
	 * response) {
	 * 
	 * String from = request.getParameter("from"); String to =
	 * request.getParameter("to"); String patientName =
	 * request.getParameter("patientName");
	 * 
	 * String totalAmount = request.getParameter("totalAmount");
	 * 
	 * String msg = "";
	 * 
	 * String fromArray[] = from.split("/"); String toArray[] = to.split("/");
	 * StringBuffer fromReult = new StringBuffer(); fromReult =
	 * fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
	 * 
	 * StringBuffer toReult = new StringBuffer(); toReult =
	 * toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
	 * 
	 * List<ReportPurchase> reportPurchases = reportService
	 * .getDayWisePurchase(fromReult.toString(), toReult.toString());
	 * 
	 * 
	 * 
	 * String pdfFilePath = objReportModel.getDayWisePurchase(reportPurchases,
	 * request, fromReult.toString(), toReult.toString(), totalAmount);
	 * 
	 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
	 * 
	 * msg = "pdf path->" + pdfFilePath +
	 * " Oops some problem occured while Generating Report"; } return msg; }
	 */

	@RequestMapping(value = "/getPartyWisePurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getPartyWisePurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPartyWisePurchase(fromReult.toString(),
				toReult.toString(), productId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getPartyWisePurchaseVendorData", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getPartyWisePurchaseTotalBill(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPartyWisePurchaseTotalBill(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getPartyWisePurchaseByPartyId", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getPartyWisePurchaseByPartyId(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String vendorId = request.getParameter("vendorId");
		String productId = request.getParameter("productId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPartyWisePurchaseByPartyId(fromReult.toString(),
				toReult.toString(), vendorId, productId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getPartyWisePurchaseTotalBill", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getPartyWisePurchaseTotalBillAmt(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPartyWisePurchaseTotalBillAmt(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getPartyWisePurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getPartyWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("productName");
		/* String totalAmount = request.getParameter("totalAmount"); */
		String vendorId = request.getParameter("vendorId");
		String vendorName = request.getParameter("vendorName");
		String totalAmount = request.getParameter("totalAmount");
		String productId = request.getParameter("productId");

		System.out.println("vendor id is" + vendorId);

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPartyWisePurchaseByPartyId(fromReult.toString(),
				toReult.toString(), vendorId, productId);

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getPartyWisePurchase(reportPurchases,
		 * productName, request, fromReult.toString(), toReult.toString(), vendorName,
		 * totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPartyWisePurchaseTotalBillReport", method = RequestMethod.GET)
	public @ResponseBody String getPartyWisePurchaseTotalReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPartyWisePurchaseTotalBillAmt(fromReult.toString(),
				toReult.toString());
		
		String pdfFilePath = reportService.getPartyWisePurchaseTotalReport(
				reportPurchases, request, fromReult.toString(),
				toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getPartyWisePurchaseTotalReport(reportPurchases, request,
		 * fromReult.toString(), toReult.toString());
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return pdfFilePath;
	}

	@RequestMapping(value = "/getCategoryWisePurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getCategoryWisePurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCategoryWisePurchase(fromReult.toString(),
				toReult.toString(), productId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getCategoryWisePurchaseByCatId", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getCategoryWisePurchaseByCatId(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");
		String categoryId = request.getParameter("categoryId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCategoryWisePurchaseByCatId(fromReult.toString(),
				toReult.toString(), productId, categoryId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getCategoryWisePurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getCategoryWisePurchaseReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("productName");
		/* String totalAmount = request.getParameter("totalAmount"); */
		String categoryId = request.getParameter("categoryId");
		String categoryName = request.getParameter("categoryName");
		String totalAmount = request.getParameter("totalAmount");
		String productId = request.getParameter("productId");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCategoryWisePurchaseByCatId(fromReult.toString(),
				toReult.toString(), productId, categoryId);

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getCategoryWisePurchase(reportPurchases,
		 * productName, request, fromReult.toString(), toReult.toString(), categoryName,
		 * totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getCompanyWisePurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getCompanyWisePurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String productId = request.getParameter("productId"); */

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCompanyWisePurchase(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getCompanyWisePurchaseByCompanyId", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getCompanyWisePurchaseByCompanyId(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String companyId = request.getParameter("companyId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCompanyWisePurchaseByCompanyId(fromReult.toString(),
				toReult.toString(), companyId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getCompanyWisePurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getCompanyWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String companyId = request.getParameter("companyId");
		String companyName = request.getParameter("companyName");
		String totalAmount = request.getParameter("totalAmount");
		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCompanyWisePurchaseByCompanyId(fromReult.toString(),
				toReult.toString(), companyId);

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getCompanyWisePurchase(reportPurchases,
		 * request, fromReult.toString(), toReult.toString(), companyName, totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPendingBills", method = RequestMethod.POST)
	public @ResponseBody List<PendingBill> getPendingBills(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String productId = request.getParameter("productId"); */

		/*
		 * String fromArray[] = from.split("/"); String toArray[] = to.split("/");
		 * StringBuffer fromReult = new StringBuffer(); fromReult =
		 * fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
		 * 
		 * StringBuffer toReult = new StringBuffer(); toReult =
		 * toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		 */

		List<PendingBill> reportPurchases = reportService.getPendingBills(from, to);
		return reportPurchases;
	}

	@RequestMapping(value = "/getPendingBillReport", method = RequestMethod.GET)
	public @ResponseBody String getPendingBillReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String totalAmount = request.getParameter("totalAmount");
		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<PendingBill> pendingBills = reportService.getPendingBills(fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getPendingBills(pendingBills, request,
		 * fromReult.toString(), toReult.toString(), totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPurchaseDiscount", method = RequestMethod.POST)
	public @ResponseBody ReportPurchase getPurchaseDiscount(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String productId = request.getParameter("productId"); */

		/*
		 * String fromArray[] = from.split("/"); String toArray[] = to.split("/");
		 * StringBuffer fromReult = new StringBuffer(); fromReult =
		 * fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
		 * 
		 * StringBuffer toReult = new StringBuffer(); toReult =
		 * toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		 */

		List<ReportPurchase> reportPurchases = reportService.getPurchaseDiscount(from,
				to);
		ReportPurchase obj = new ReportPurchase();
		obj.setLstpurc(reportPurchases);
		return obj;
	}

	@RequestMapping(value = "/getPurchaseDiscountReport", method = RequestMethod.GET)
	public @ResponseBody String getPurchaseDiscountReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String totalNetAmount = request.getParameter("totalNetAmount");
		String totalSchmDisc = request.getParameter("totalSchmDisc");
		String totalItemDisc = request.getParameter("totalItemDisc");
		String totalSplDisc = request.getParameter("totalSplDisc");
		String totalDisc = request.getParameter("totalDisc");
		String totalCd = request.getParameter("totalCd");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPurchaseDiscount(fromReult.toString(),
				toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getPurchaseDiscountReport(reportPurchases, request,
		 * fromReult.toString(), toReult.toString(), totalNetAmount, totalSchmDisc,
		 * totalItemDisc, totalSplDisc, totalDisc, totalCd);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getDailyBusinessDetails", method = RequestMethod.POST)
	public @ResponseBody List<ReportMIS> getDailyBusinessReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String productId = request.getParameter("productId"); */

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportMIS> reportPurchases = reportService.getDailyBusinessReport(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getDailyBusinessReport", method = RequestMethod.GET)
	public @ResponseBody String getDailyBusinessMisReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String totalSale = request.getParameter("totalSale");
		String totalPurchase = request.getParameter("totalPurchase");
		/*
		 * String totalItemDisc = request.getParameter("totalItemDisc"); String
		 * totalSplDisc = request.getParameter("totalSplDisc"); String totalDisc =
		 * request.getParameter("totalDisc");
		 */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportMIS> reportMis = reportService.getDailyBusinessReport(fromReult.toString(), toReult.toString());

		String pdfFilePath = objReportModel.getDailyBusinessReport(reportMis, request, fromReult.toString(),
				toReult.toString(), totalSale, totalPurchase);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}

		return msg;
	}

	@RequestMapping(value = "/getNearExpiryReportForSales", method = RequestMethod.POST)
	public @ResponseBody List<ReportExpiry> getNearExpiryReportForSales(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String callform = request.getParameter("callform");
		Integer compid = Integer.parseInt(request.getParameter("compId").toString());
		Integer shelfId = Integer.parseInt(request.getParameter("shelfId"));
		String fromArray[] = from.split("/");
		/* String toArray[] = to.split("/"); */
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		/*
		 * StringBuffer toReult = new StringBuffer(); toReult =
		 * toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		 */

		String todaysDate = "";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Date date = new java.util.Date();
		todaysDate = simpleDateFormat.format(new java.util.Date());

		/* String splitDate[]=to.split("/"); */
		/*
		 * String month=splitDate[1]; String year=splitDate[2];
		 */
		/*
		 * char yearLastChar1=year.charAt(2); char yearLastChar2=year.charAt(3);
		 */
		/* StringBuilder year1=new StringBuilder(); */
		/*
		 * year1.append(yearLastChar1); year1.append(yearLastChar2);
		 */

		String fromSplitDate[] = from.split("/");
		String fromMonth = fromSplitDate[1];
		String fromYear = fromSplitDate[2];
		char yearLastChar11 = fromYear.charAt(2);
		char yearLastChar21 = fromYear.charAt(3);
		StringBuilder year11 = new StringBuilder();
		year11.append(yearLastChar11);
		year11.append(yearLastChar21);

		/* String finalToResult=month+"/"+year1; */
		String finalFromResult = fromMonth + "/" + year11;
		String toResult = "0";

		if (fromMonth.length() == 1) {
			toResult = "0" + fromMonth.charAt(0) + "/" + year11;
		} else {
			if (fromMonth.charAt(0) == '0') {
				toResult = fromMonth.charAt(1) + "/" + year11;
			} else {
				toResult = finalFromResult;
			}
		}

		List<ReportExpiry> reportExpiries = reportService.getNearExpiryReport(finalFromResult, toResult, callform,
				compid, shelfId);
		return reportExpiries;
	}

	@RequestMapping(value = "/getNearExpiryReport", method = RequestMethod.POST)
	public @ResponseBody List<ReportExpiry> getNearExpiryReport(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");
		String callform = request.getParameter("callform");
		Integer shelfId = 0;
		Integer compId = 0;
		if (callform == "companyWise") {
			compId = Integer.parseInt(request.getParameter("compId").toString());
		}

		if (callform == "shelfWise") {
			shelfId = Integer.parseInt(request.getParameter("shelfId"));
		}
		System.out.println("form>>>to" + from + "" + to);

		if (to == null)
			to = from;

		List<ReportExpiry> reportExpiries = reportService.getNearExpiryReport(from, from, callform, compId, shelfId);
		return reportExpiries;
	}

	@RequestMapping(value = "/getAllCategoryWiseSale", method = RequestMethod.POST)
	public @ResponseBody List<CategoryMaster> getAllCategoryWiseSale(HttpServletRequest request,
			HttpServletResponse response) {

		List<CategoryMaster> reportPurchases = categoryService.getAllCategoryList();
		return reportPurchases;
	}

	@RequestMapping(value = "/getCategoryWiseSale", method = RequestMethod.POST)
	public @ResponseBody List<ReportProductWiseBatchSale> getCategoryWiseSale(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String productId = request.getParameter("productId"); */

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> reportPurchases = reportService.getCategoryWiseSale(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getCategoryWiseSaleReport", method = RequestMethod.GET)
	public @ResponseBody String getCategoryWiseSaleReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String msg = "";

		String to = request.getParameter("to");
		String totalAmount = "";
		String categoryName = "";

		if (request.getParameter("totalAmount") != null)
			totalAmount = request.getParameter("totalAmount");

		if (request.getParameter("catName") != null)
			categoryName = request.getParameter("catName");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> cateSales = getCategoryWiseSaleData(request, response);

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getCategoryWiseSaleReport(cateSales,
		 * fromReult.toString(), toReult.toString(), totalAmount, request,
		 * categoryName);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getStockOutData", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> stockOutData(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String type = request.getParameter("type");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		// String typeArray[] = type.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		// StringBuffer typeReult = new StringBuffer();

		/*
		 * typeReult = typeReult.append(typeArray[2] + "-" + typeArray[1] + "-" +
		 * typeArray[0]);
		 */

		List<ReportStock> productWiseBatchSales = reportService.getStockOutData(fromReult.toString(),
				toReult.toString(), type);

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getStockOutReport", method = RequestMethod.GET)
	public @ResponseBody String getStockOutReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		String msg = "";

		String to = request.getParameter("to");
		String type = request.getParameter("type");
		String totalAmount = "";
		String categoryName = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		// String typeArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		/*
		 * StringBuffer typeReult = new StringBuffer(); typeReult =
		 * typeReult.append(typeArray[2] + "-" + typeArray[1] + "-" + typeArray[0]);
		 */

		List<ReportStock> reportStocks = reportService.getStockOutData(fromReult.toString(), toReult.toString(), type);

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getStockOutReport(fromReult.toString(),
		 * toReult.toString(), request, reportStocks, type);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getProductBelowMinLevelPage", method = RequestMethod.GET)
	public ModelAndView belowMinLevel(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_stock_item_below_new");
		return modelAndView;
	}

	@RequestMapping(value = "/getProductBelowMinLevelReport", method = RequestMethod.POST)
	public @ResponseBody String getProductBelowMinLevelReport(HttpServletRequest request,
			HttpServletResponse response) {

		String productName = request.getParameter("productName");
		String totalAmount = request.getParameter("totalAmount");

		List<ProductBelowMinLevel> productBelowMinLevels = belowMinLevelService.getMaxLevelProductList();
		//String msg = "";
		
		  
		  
		  String msg = "";
		  
		  String pdfFilePath =
		  objReportModel.getProductBelowMinLevelReport(productBelowMinLevels, request);
		  
		  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		  
		  msg = "pdf path->" + pdfFilePath +
		  " Oops some problem occured while Generating Report"; }
		 
		return msg;
	}

	@RequestMapping(value = "/getDeletedPurchase", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getDeletedPurchase(HttpServletRequest request,
			HttpServletResponse response) {

		List<ReportPurchase> reportPurchases = reportService.getDeletedPurchase();

		return reportPurchases;
	}

	@RequestMapping(value = "/getDeletedPurchaseReport", method = RequestMethod.POST)
	public @ResponseBody String getDeletedPurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		List<ReportPurchase> reportPurchases = reportService.getDeletedPurchase();
		String msg = "";
		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getDeletedPurchaseReport(request,
		 * reportPurchases);
		 * 
		 * String msg = ""; if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getNearAllExpiryReport", method = RequestMethod.POST)
	public @ResponseBody String getNearAllExpiryReport(HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");

		//String to = request.getParameter("to");
		String callform = request.getParameter("callform");
		Integer shelfId = 0;
		Integer compId = 0;
		if (callform == "companyWise") {
			compId = Integer.parseInt(request.getParameter("compId").toString());
		}

		if (callform == "shelfWise") {
			shelfId = Integer.parseInt(request.getParameter("shelfId"));
		}
		String fromArray[] = from.split("-");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-"
				+ fromArray[0]);

		String todaysDate = "";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Date date = new java.util.Date();
		todaysDate = simpleDateFormat.format(new java.util.Date());

		String fromSplitDate[] = from.split("-");
		String fromMonth = fromSplitDate[1];
		String fromYear = fromSplitDate[0];
		char yearLastChar11 = fromYear.charAt(2);
		char yearLastChar21 = fromYear.charAt(3);
		StringBuilder year11 = new StringBuilder();
		year11.append(yearLastChar11);
		year11.append(yearLastChar21);

		String finalFromResult = fromMonth + "/" + year11;
		String toResult = "0";

		if (fromMonth.charAt(0) == '0') {
			toResult = fromMonth.charAt(1) + "/" + year11;
		} else {
			toResult = finalFromResult;
		}

		List<ReportExpiry> reportExpiries = reportService.getNearExpiryReport(from, from, callform, compId, shelfId);
		
		String msg = "";

		String pdfFilePath = objReportModel.getNearAllExpiryReport(
				reportExpiries, request, finalFromResult);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath
					+ " Oops some problem occured while Generating Report";
		}
		return msg;
		
		//return reportExpiries;
	}

	@RequestMapping(value = "/getCompanyWiseBatchExpiry", method = RequestMethod.POST)
	public @ResponseBody List<CompanyMaster> getCompanyWiseBatchExpiry(HttpServletRequest request,
			HttpServletResponse response) {

		List<CompanyMaster> ltCompanyMasters = new ArrayList<CompanyMaster>();
		ltCompanyMasters = companyService.getAllCompanies();

		return ltCompanyMasters;
	}

	/*
	 * @RequestMapping(value = "/getCompanyWiseBatchExpData", method =
	 * RequestMethod.POST) public @ResponseBody List<ReportExpiry>
	 * getCompanyWiseBatchExpData(HttpServletRequest request, HttpServletResponse
	 * response) {
	 * 
	 * String from = request.getParameter("from");
	 * 
	 * int companyId = Integer.parseInt(request.getParameter("compId"));
	 * 
	 * String fromArray[] = from.split("/"); StringBuffer fromReult = new
	 * StringBuffer(); fromReult = fromReult.append(fromArray[2] + "-" +
	 * fromArray[1] + "-" + fromArray[0]);
	 * 
	 * String todaysDate = ""; SimpleDateFormat simpleDateFormat = new
	 * SimpleDateFormat("dd/MM/yyyy"); java.util.Date date = new java.util.Date();
	 * todaysDate = simpleDateFormat.format(new java.util.Date());
	 * 
	 * String fromSplitDate[] = from.split("/"); String fromMonth =
	 * fromSplitDate[1]; String fromYear = fromSplitDate[2]; char yearLastChar11 =
	 * fromYear.charAt(2); char yearLastChar21 = fromYear.charAt(3); StringBuilder
	 * year11 = new StringBuilder(); year11.append(yearLastChar11);
	 * year11.append(yearLastChar21);
	 * 
	 * String finalFromResult = fromMonth + "/" + year11; String toResult = "0";
	 * 
	 * if (fromMonth.charAt(0) == '0') { toResult = fromMonth.charAt(1) + "/" +
	 * year11; } else { toResult = finalFromResult; }
	 * 
	 * List<ReportExpiry> reportExpiries = reportService
	 * .getNearCompanyWiseExpiryReport(finalFromResult, toResult, companyId); return
	 * reportExpiries;
	 * 
	 * }
	 */

	@RequestMapping(value = "/getNearCompanyWiseExpiryReport", method = RequestMethod.POST)
	public @ResponseBody String getNearCompanyWiseExpiryReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		int companyId = Integer.parseInt(request.getParameter("compId"));
		Integer shelfId = Integer.parseInt(request.getParameter("shelfId"));
		String companyName = request.getParameter("companyName");

		String fromArray[] = from.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		String todaysDate = "";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Date date = new java.util.Date();
		todaysDate = simpleDateFormat.format(new java.util.Date());

		String fromSplitDate[] = from.split("/");
		String fromMonth = fromSplitDate[1];
		String fromYear = fromSplitDate[2];
		char yearLastChar11 = fromYear.charAt(2);
		char yearLastChar21 = fromYear.charAt(3);
		StringBuilder year11 = new StringBuilder();
		year11.append(yearLastChar11);
		year11.append(yearLastChar21);

		String finalFromResult = fromMonth + "/" + year11;
		String toResult = "0";

		if (fromMonth.charAt(0) == '0') {
			toResult = fromMonth.charAt(1) + "/" + year11;
		} else {
			toResult = finalFromResult;
		}

		List<ReportExpiry> reportExpiries = reportService.getNearCompanyWiseExpiryReport(finalFromResult, toResult,
				companyId);
		String msg = "";
		/*
		 * 
		 * 
		 * String msg = "";
		 * 
		 * String pdfFilePath =
		 * objReportModel.getNearCompanyWiseExpiryReport(reportExpiries, request,
		 * finalFromResult, companyName);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getShelfWiseBatchExpiry", method = RequestMethod.POST)
	public @ResponseBody List<ShelfMaster> getShelfWiseBatchExpiry(HttpServletRequest request,
			HttpServletResponse response) {

		List<ShelfMaster> ltShelfMasters = new ArrayList<ShelfMaster>();
		ltShelfMasters = shelfService.getShelfs("all");

		return ltShelfMasters;
	}

	/*
	 * @RequestMapping(value = "/getShelfWiseBatchExpData", method =
	 * RequestMethod.POST) public @ResponseBody List<ReportExpiry>
	 * getShelfWiseBatchExpData(HttpServletRequest request, HttpServletResponse
	 * response) {
	 * 
	 * String from = request.getParameter("from");
	 * 
	 * int shelfId = Integer.parseInt(request.getParameter("shelfId"));
	 * 
	 * String fromArray[] = from.split("/"); StringBuffer fromReult = new
	 * StringBuffer(); fromReult = fromReult.append(fromArray[2] + "-" +
	 * fromArray[1] + "-" + fromArray[0]);
	 * 
	 * String todaysDate = ""; SimpleDateFormat simpleDateFormat = new
	 * SimpleDateFormat("dd/MM/yyyy"); java.util.Date date = new java.util.Date();
	 * todaysDate = simpleDateFormat.format(new java.util.Date());
	 * 
	 * String fromSplitDate[] = from.split("/"); String fromMonth =
	 * fromSplitDate[1]; String fromYear = fromSplitDate[2]; char yearLastChar11 =
	 * fromYear.charAt(2); char yearLastChar21 = fromYear.charAt(3); StringBuilder
	 * year11 = new StringBuilder(); year11.append(yearLastChar11);
	 * year11.append(yearLastChar21);
	 * 
	 * String finalFromResult = fromMonth + "/" + year11; String toResult = "0";
	 * 
	 * if (fromMonth.charAt(0) == '0') { toResult = fromMonth.charAt(1) + "/" +
	 * year11; } else { toResult = finalFromResult; }
	 * 
	 * List<ReportExpiry> reportExpiries = reportService
	 * .getShelfWiseBatchExpData(finalFromResult, toResult, shelfId); return
	 * reportExpiries;
	 * 
	 * }
	 */
	@RequestMapping(value = "/getNearShelfWiseExpiryReport", method = RequestMethod.POST)
	public @ResponseBody String getNearShelfWiseExpiryReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		int shelfId = Integer.parseInt(request.getParameter("shelfId"));
		String shelfName = request.getParameter("shelfName");

		String fromArray[] = from.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		String todaysDate = "";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Date date = new java.util.Date();
		todaysDate = simpleDateFormat.format(new java.util.Date());

		String fromSplitDate[] = from.split("/");
		String fromMonth = fromSplitDate[1];
		String fromYear = fromSplitDate[2];
		char yearLastChar11 = fromYear.charAt(2);
		char yearLastChar21 = fromYear.charAt(3);
		StringBuilder year11 = new StringBuilder();
		year11.append(yearLastChar11);
		year11.append(yearLastChar21);

		String finalFromResult = fromMonth + "/" + year11;
		String toResult = "0";

		if (fromMonth.charAt(0) == '0') {
			toResult = fromMonth.charAt(1) + "/" + year11;
		} else {
			toResult = finalFromResult;
		}

		List<ReportExpiry> reportExpiries = reportService.getShelfWiseBatchExpData(finalFromResult, toResult, shelfId);
		String msg = "";
		/*
		 * 
		 * 
		 * String msg = "";
		 * 
		 * String pdfFilePath =
		 * objReportModel.getNearShelfWiseExpiryReport(reportExpiries, request,
		 * fromReult.toString(), shelfName);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getMonthWiseVatPurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportVat> getMonthWiseVatPurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getMonthWiseVatPurchase(fromReult.toString(), toReult.toString());
		return reportVats;
	}

	@RequestMapping(value = "/getHsnWiseGSTPurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportVat> getHsnWiseGSTPurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getHsnWiseGSTPurchase(fromReult.toString(), toReult.toString());
		return reportVats;
	}

	@RequestMapping(value = "/getMonthWiseVatPurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getMonthWiseVatPurchaseReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String totalAmount = request.getParameter("totalAmount");
		String amt5 = request.getParameter("amt5");
		String vat12 = request.getParameter("vat12");
		String vat5 = request.getParameter("vat5");
		String amt12 = request.getParameter("amt12");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getMonthWiseVatPurchase(fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getMonthWiseVatPurchaseReport(reportVats,
		 * request, fromReult.toString(), toReult.toString(), totalAmount, vat12, vat5,
		 * amt5, amt12);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getDateWiseVatPurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportVat> getDateWiseVatPurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getDateWiseVatPurchase(fromReult.toString(), toReult.toString());
		return reportVats;
	}

	@RequestMapping(value = "/getVouWiseVatPurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportVat> getVouWiseVatPurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getVouWiseVatPurchase(fromReult.toString(), toReult.toString());
		return reportVats;
	}

	@RequestMapping(value = "/getDateWiseVatPurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getDateWiseVatPurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String totalAmount = request.getParameter("totalAmount");
		String amt5 = request.getParameter("amt5");
		String vat12 = request.getParameter("vat12");
		String vat5 = request.getParameter("vat5");
		String amt12 = request.getParameter("amt12");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getDateWiseVatPurchase(fromReult.toString(), toReult.toString());
		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getDateWiseVatPurchaseReport(reportVats,
		 * request, fromReult.toString(), toReult.toString(), totalAmount, vat12, vat5,
		 * amt5, amt12);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPartyWiseVatPurchase", method = RequestMethod.POST)
	public @ResponseBody List<ReportVat> getPartyWiseVatPurchase(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getPartyWiseVatPurchase(fromReult.toString(), toReult.toString());
		return reportVats;
	}

	@RequestMapping(value = "/getPartyWiseVatPurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getPartyWiseVatPurchaseReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String totalAmount = request.getParameter("totalAmount");
		String amt5 = request.getParameter("amt5");
		String vat12 = request.getParameter("vat12");
		String vat5 = request.getParameter("vat5");
		String amt12 = request.getParameter("amt12");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getPartyWiseVatPurchase(fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getPartyWiseVatPurchaseReport(reportVats,
		 * request, fromReult.toString(), toReult.toString(), totalAmount, vat12, vat5,
		 * amt5, amt12);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getVouWiseVatPurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getVouWiseVatPurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String totalAmount = request.getParameter("totalAmount");
		String amt5 = request.getParameter("amt5");
		String vat12 = request.getParameter("vat12");
		String vat5 = request.getParameter("vat5");
		String amt12 = request.getParameter("amt12");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportVat> reportVats = reportService.getVouWiseVatPurchase(fromReult.toString(), toReult.toString());
		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getVouWiseVatPurchaseReport(reportVats,
		 * request, fromReult.toString(), toReult.toString(), totalAmount, vat12, vat5,
		 * amt5, amt12);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	

	@RequestMapping(value = "/getDebitListReportPage", method = RequestMethod.GET)
	public ModelAndView debitListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_debit_note_list");
		return modelAndView;
	}

	

	// Cash Receipt Entry
	@RequestMapping(value = "/getCashReceiptReportPage", method = RequestMethod.GET)
	public ModelAndView cashReceiptReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_cash_receipt_list");
		return modelAndView;
	}

	@RequestMapping(value = "/getCashReceiptDeletedReportPage", method = RequestMethod.GET)
	public ModelAndView cashReceiptDeletedReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_mis_deleted_cash_receipt_list");
		return modelAndView;
	}

	// Cash Paid
	@RequestMapping(value = "/getCashPaidReportPage", method = RequestMethod.GET)
	public ModelAndView cashPaidReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_cash_paid_list");
		return modelAndView;
	}

	@RequestMapping(value = "/getDeletedCashPaidReportPage", method = RequestMethod.GET)
	public ModelAndView deletedCashPaidReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_deleted_mis_cash_paid_list");
		return modelAndView;
	}

	// Cheque Paid
	@RequestMapping(value = "/getChequePaidReportPage", method = RequestMethod.GET)
	public ModelAndView chequePaidReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_cheque_paid_list");
		return modelAndView;
	}

	@RequestMapping(value = "/getDeletedChequePaidReportPage", method = RequestMethod.GET)
	public ModelAndView deletedChequePaidReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_deleted_mis_cheque_paid_list");
		return modelAndView;
	}

	// cheque Receipt entry
	@RequestMapping(value = "/getChequeReceiptReportPage", method = RequestMethod.GET)
	public ModelAndView chequeReceiptReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_cheque_receipt_list");
		return modelAndView;
	}

	@RequestMapping(value = "/getChequeReceiptDeletedReportPage", method = RequestMethod.GET)
	public ModelAndView deletedchequeReceiptReportListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_deleted_mis_cheque_receipt_list");
		return modelAndView;
	}

	// Partywise DebitNote/Credit Note
	@RequestMapping(value = "/getPartywiseDBNote", method = RequestMethod.GET)
	public ModelAndView getPartywiseDBCR(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_partywise_DBCR_rceipt_list");
		return modelAndView;
	}
//By Badrinath Wagh
	@RequestMapping(value = "/getDebitNoteList", method = RequestMethod.GET)
	public @ResponseBody List<DebitNoteData> debitNoteList(HttpServletRequest request, HttpServletResponse response) {
		
		Integer unitId = Integer.parseInt(request.getParameter("unitId"));
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		
		List<DebitNoteData> ltdebitNotes =  reportService.getDebitNoteData(unitId, from,to);
			//System.out.println("ltdebitNotes"+ltdebitNotes.toString());
		return ltdebitNotes;
	}

	@RequestMapping(value = "/getDebitNoteDataReport", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDebitNoteData(
			@RequestParam(value = "vendorId", required = false) Integer vendorId, HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String totalAmt = request.getParameter("totalAmount");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDebitNoteData(vendorId,
				fromReult.toString(), toReult.toString(), "debitNote", totalAmt);

		return productWiseBatchSales;
	}



	@RequestMapping(value = "/getTotalNoteReport", method = RequestMethod.GET)
	public @ResponseBody String getTotalNoteReport(@RequestParam("vendorId") Integer vendorId,
			HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");

		String msg = "";

		String to = request.getParameter("to");
		String totalAmount = request.getParameter("totalAmount");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> debitNotes = new ArrayList<ReportProductWiseBatchSale>();
		debitNotes = reportService.getDebitNoteData(vendorId, fromReult.toString(), toReult.toString(), "debitNote",
				totalAmount);

		for (ReportProductWiseBatchSale DebitNote : debitNotes) {
			productWiseBatchSales.add(DebitNote);
		}

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getTotalNoteReport(productWiseBatchSales,
		 * fromReult.toString(), toReult.toString(), request, totalAmount);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getDrugList", method = RequestMethod.GET)
	public @ResponseBody String drugList(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		boolean isReportGet = false;

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getReportForPharmacyDrug(fromReult.toString(),
		 * toReult.toString(), request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPatientwiseVouList", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> patientwiseVouList(
			@RequestParam("patientId") Integer patientId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.patientwiseVouList(patientId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getPatientSaleDoctorwise", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getPatientSaleDoctorwise(
			@RequestParam("doctorId") Integer doctorId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.patientSaleDoctorwise(doctorId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}
    // Added By Badrinath 
	//For Cash Receipt List Report 
	@RequestMapping(value = "/getCashReceiptList", method = RequestMethod.GET)
	public @ResponseBody List getCashReceiptReport(HttpServletRequest request, HttpServletResponse response) {
/*
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		/* String productName = request.getParameter("productName"); */
		
		/* String productId = request.getParameter("productId"); */
		/*
		String totalAmount = request.getParameter("totalAmount");
		String msg = "";
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCashReceiptReport(fromReult.toString(),
				toReult.toString());

		return msg;
		*/
		
		Integer unitId = Integer.parseInt(request.getParameter("unitId"));
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		
		List<CashReceiptReport> ltCashRcpt =  reportService.getCashReceiptReport(unitId, from,to);
			//System.out.println("ltdebitNotes"+ltdebitNotes.toString());
		return ltCashRcpt;
	
			
		
	}

	// Cash Receipt
	@RequestMapping(value = "/getDeletedCashReceiptList", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getDeletedCashReceiptData(HttpServletRequest request,
			HttpServletResponse response) {

		/* String patientName = request.getParameter("patientName"); */
		/* String productName = request.getParameter("productName"); */
		/* String totalAmount = request.getParameter("totalAmount"); */
		/* String productId = request.getParameter("productId"); */

		List<ReportPurchase> reportPurchases = reportService.getDeletedCashReceiptReport();

		return reportPurchases;
	}

	// Cash Receipt
	@RequestMapping(value = "/getDeletedCashReceiptListReport", method = RequestMethod.POST)
	public @ResponseBody String getDeletedCashReceiptReport(HttpServletRequest request, HttpServletResponse response) {

		/* String patientName = request.getParameter("patientName"); */
		/* String productName = request.getParameter("productName"); */
		/* String totalAmount = request.getParameter("totalAmount"); */
		/* String productId = request.getParameter("productId"); */

		String msg = "";

		List<ReportPurchase> reportPurchases = reportService.getDeletedCashReceiptReport();

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getDeletedCashReceiptReport(reportPurchases, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}
	
    //By Badrinath Wagh
	//For Cash Paid List Report 
	
	@RequestMapping(value = "/getCashPaidList", method = RequestMethod.GET)
	public @ResponseBody List getCashPaidReport(HttpServletRequest request, HttpServletResponse response) {
/*
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		
		String msg = "";
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getCashPaidReport(fromReult.toString(),
				toReult.toString());

		return msg;
		*/
		Integer unitId = Integer.parseInt(request.getParameter("unitId"));
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		
		List<PaidReceiptReport> ltPaidRcpt =  reportService.getCashPaidReport(unitId, from,to);
			
		return ltPaidRcpt;
	}

	@RequestMapping(value = "/getDeletedCashPaidList", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getDeletedCashPaidList(HttpServletRequest request,
			HttpServletResponse response) {

		/* String patientName = request.getParameter("patientName"); */
		/* String productName = request.getParameter("productName"); */
		/* String totalAmount = request.getParameter("totalAmount"); */
		/* String productId = request.getParameter("productId"); */

		List<ReportPurchase> reportPurchases = reportService.getDeletedCashPaidReport();

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getDeletedCashPaidReport(
		 * reportPurchases, request,fromReult.toString(),toReult.toString());
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return reportPurchases;
	}

	@RequestMapping(value = "/getDeletedCashPaidReport", method = RequestMethod.POST)
	public @ResponseBody String getDeletedCashPaidReport(HttpServletRequest request, HttpServletResponse response) {

		String msg = "";

		List<ReportPurchase> reportPurchases = reportService.getDeletedCashPaidReport();

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getDeletedCashPaidReport(reportPurchases,
		 * request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}
    //By Badrinath Wagh
	//For Cheque Paid List Report 
	
	@RequestMapping(value = "/getChequePaidList", method = RequestMethod.GET)
	public @ResponseBody List getChequePaidReport(HttpServletRequest request, HttpServletResponse response) {
/*
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getChequePaidReport(fromReult.toString(),
				toReult.toString());

		return msg;
		*/
		Integer unitId = Integer.parseInt(request.getParameter("unitId"));
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		
		List<ChequePaidReceiptReport> ltChequePaidRcpt =  reportService.getChequePaidReport(unitId, from,to);
			
		return ltChequePaidRcpt;
	}

	@RequestMapping(value = "/getDeletedChequePaidList", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getDeletedChequePaidList(HttpServletRequest request,
			HttpServletResponse response) {

		/* String patientName = request.getParameter("patientName"); */
		/* String productName = request.getParameter("productName"); */
		/* String totalAmount = request.getParameter("totalAmount"); */
		/* String productId = request.getParameter("productId"); */

		String msg = "";

		List<ReportPurchase> reportPurchases = reportService.getDeletedChequePaidReport();

		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getDeletedChequePaidReport(
		 * reportPurchases, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return reportPurchases;
	}

	@RequestMapping(value = "/getDeletedChequePaidReport", method = RequestMethod.POST)
	public @ResponseBody String getDeletedChequePaidReport(HttpServletRequest request, HttpServletResponse response) {

		/* String patientName = request.getParameter("patientName"); */
		/* String productName = request.getParameter("productName"); */
		/* String totalAmount = request.getParameter("totalAmount"); */
		/* String productId = request.getParameter("productId"); */

		String msg = "";

		List<ReportPurchase> reportPurchases = reportService.getDeletedChequePaidReport();

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getDeletedChequePaidReport(reportPurchases, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}
     //Added By Badrinath Wagh
	 //For Cheque Receipt List Report
	@RequestMapping(value = "/getChequeReceiptList", method = RequestMethod.GET)
	public @ResponseBody List getChequeReceiptReport(HttpServletRequest request, HttpServletResponse response) {
/*
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

				toReult.toString();

		
		return msg;
		*/
		Integer unitId = Integer.parseInt(request.getParameter("unitId"));
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		
		List<ChequeReceiptReport> ltChequeRcpt =  reportService.getChequeReceiptReport(unitId, from,to);
			
		return ltChequeRcpt;
	}
	

	@RequestMapping(value = "/getDeletedChequeReceiptList", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getDeletedChequeReceiptData(HttpServletRequest request,
			HttpServletResponse response) {

		List<ReportPurchase> reportPurchases = reportService.getDeletedChequeReceiptReport();

		return reportPurchases;
	}

	@RequestMapping(value = "/getDeletedChequeReceiptReport", method = RequestMethod.POST)
	public @ResponseBody String getDeletedChequeReceiptReport(HttpServletRequest request,
			HttpServletResponse response) {

		String msg = "";

		List<ReportPurchase> reportPurchases = reportService.getDeletedChequeReceiptReport();

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getDeletedChequeReceiptReport(reportPurchases, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getSalesPatientProductwise", method = RequestMethod.GET)
	public ModelAndView salePatientSaleProductwiseListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_patient_sale");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesPatientVouwise", method = RequestMethod.GET)
	public ModelAndView salePatientSaleVouwiseListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_patient_sale_vou");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesDoctorwises", method = RequestMethod.GET)
	public ModelAndView getSalesDoctorwise(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_Doctor_wise");
		return modelAndView;
	}

	@RequestMapping(value = "/getSalesTotalDeletedSalesReportPage", method = RequestMethod.GET)
	public ModelAndView saleTotalDelectedSalePage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_total_deleted_mis_sale");
		return modelAndView;
	}

	@RequestMapping(value = "/getPatientWiseProductListForReport", method = RequestMethod.GET)
	public @ResponseBody String patientWiseProductListForReport(@RequestParam("patientId") Integer patientId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		/* String patientId =request.getParameter("patientId").toString(); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.patientwiseProductList(patientId,
				fromReult.toString(), toReult.toString(), "all");

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.patientwiseProductList(productWiseBatchSales, patientId,
		 * totalAmount, fromReult.toString(), toReult.toString(), request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPatientWiseVouListForReport", method = RequestMethod.GET)
	public @ResponseBody String patientWiseVouListForReport(@RequestParam("patientId") Integer patientId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		/* String patientId =request.getParameter("patientId").toString(); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.patientwiseVouList(patientId,
				fromReult.toString(), toReult.toString());

		String pdfFilePath = objReportModel.patientwiseVouList(productWiseBatchSales, patientId, totalAmount,
				fromReult.toString(), toReult.toString(), request);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}
		 
		return msg;
	}

	@RequestMapping(value = "/getPatientSaleDoctorwiseForReport", method = RequestMethod.GET)
	public @ResponseBody String getPatientSaleDoctorwiseReport(@RequestParam("doctorId") Integer doctorId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		String doctorName = request.getParameter("doctorName");

		/* String patientId =request.getParameter("patientId").toString(); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.patientSaleDoctorwise(doctorId,
				fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.patientSaleDoctorwise(productWiseBatchSales, doctorId,
		 * totalAmount, fromReult.toString(), toReult.toString(), request, doctorName);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getTotalCounterSaleDeletedData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalCounterSaleDeletedData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleDeletedData("counterSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalIndentSaleDeletedData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalIndentSaleDeletedData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleDeletedData("indentSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalPatientSaleDeletedData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalPatientSaleDeletedData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleDeletedData("patientSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalHospitalSaleDeletedData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalHospitalSaleDeletedData(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getTotalSaleDeletedData("hospitalSale");

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSaleDeletedData", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalSaleDeletedData(HttpServletRequest request,
			HttpServletResponse response) {

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalSaleDeletedData("counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalSaleDeletedData("indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getTotalSaleDeletedData("hospitalSale");

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportService.getTotalSaleDeletedData("patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSales) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTotalSaleDeletedReport", method = RequestMethod.POST)
	public @ResponseBody String getTotalSaleDeletedReport(HttpServletRequest request, HttpServletResponse response) {
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";
		/* String totalAmount = request.getParameter("totalAmount"); */

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getTotalSaleDeletedData("counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getTotalSaleDeletedData("indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = reportService.getTotalSaleDeletedData("hospitalSale");

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportService.getTotalSaleDeletedData("patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSales) {
			productWiseBatchSales.add(patient);
		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getTotalSaleDeletedReport(productWiseBatchSales, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	// code for userwise daily sale
	@RequestMapping(value = "/getUserDailySaleReport", method = RequestMethod.GET)
	public @ResponseBody String getUserDailySaleReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		/* String patientName = request.getParameter("patientName"); */
		String saleType = request.getParameter("saleType");
		String userName = request.getParameter("userName");

		String userId = "";
		if (request.getParameter("userId") != null) {
			userId = request.getParameter("userId");
		}

		String msg = "";

		String fromArray[] = from.split("/");
		String totalAmount = request.getParameter("totalAmount");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();
		if (saleType.equals("counterSale")) {
			productWiseBatchSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "counterSale", userId);
		} else if (saleType.equals("indentSale")) {
			productWiseBatchSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "indentSale", userId);
		} else if (saleType.equals("hospitalSale")) {
			productWiseBatchSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "hospitalSale",
					userId);
		} else if (saleType.equals("patientSale")) {
			productWiseBatchSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "patientSale", userId);
		} else if (saleType.equals("totalSale")) {
			List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
			counterSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "counterSale", userId);

			List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
			indentSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "indentSale", userId);

			List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
			hospitalSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "hospitalSale", userId);

			List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
			patientSales = reportService.getDailyUserWiseSaleData(fromReult.toString(), "patientSale", userId);

			for (ReportProductWiseBatchSale counter : counterSales) {
				productWiseBatchSales.add(counter);
			}

			for (ReportProductWiseBatchSale indent : indentSales) {
				productWiseBatchSales.add(indent);
			}

			for (ReportProductWiseBatchSale hospital : hospitalSales) {
				productWiseBatchSales.add(hospital);
			}
			for (ReportProductWiseBatchSale patientSale : patientSales) {
				productWiseBatchSales.add(patientSale);
			}
		}

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.getUserDailySaleReport(productWiseBatchSales,
		 * fromReult.toString(), totalAmount, request, userName);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getProductItemLedgerReport", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<ReportPurchase>> getProductItemLedgerReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getProductWisePurchase(fromReult.toString(),
				toReult.toString(), productId);

		List<ReportPurchase> reportPurchasesReturn = reportService.getProductWisePurchaseReturn(fromReult.toString(),
				toReult.toString(), productId);

		List<ReportPurchase> reportSale = reportService.getProductWiseSale(fromReult.toString(), toReult.toString(),
				productId);

		List<ReportPurchase> reportCredit = reportService.getProductWiseCredit(fromReult.toString(), toReult.toString(),
				productId);

		List<ReportPurchase> stock = reportService.getOpeningStock(fromReult.toString(), productId);

		Map<String, List<ReportPurchase>> m = new HashMap<String, List<ReportPurchase>>();
		m.put("purchase", reportPurchases);
		m.put("sale", reportSale);
		m.put("credit", reportCredit);
		m.put("debit", reportPurchasesReturn);
		m.put("stock", stock);

		return m;
	}

	@RequestMapping(value = "/getItemLedgerReport", method = RequestMethod.GET)
	public ModelAndView printPo(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		Integer productId = Integer.parseInt(request.getParameter("productId"));

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> purchaseEntrys = new ArrayList<ReportProductWiseBatchSale>();
		purchaseEntrys = reportService.getDataOfPurchaseByProductId(productId, fromReult.toString(),
				toReult.toString());

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = reportService.getDataOfCounterByProductId(productId, fromReult.toString(), toReult.toString());

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = reportService.getDataOfIndentByProductId(productId, fromReult.toString(), toReult.toString());

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportService.getDataOfPatientByProductId(productId, fromReult.toString(), toReult.toString());

		List<ReportProductWiseBatchSale> creditNotes = new ArrayList<ReportProductWiseBatchSale>();
		creditNotes = reportService.getDataOfCreditByProductId(productId, fromReult.toString(), toReult.toString());

		List<ReportProductWiseBatchSale> debitNotes = new ArrayList<ReportProductWiseBatchSale>();
		debitNotes = reportService.getDataOfDebitByProductId(productId, fromReult.toString(), toReult.toString());

		List<ReportProductWiseBatchSale> mrnSlaves = reportService.getDataOfMrnByProductId(productId,
				fromReult.toString(), toReult.toString());

		List<ReportProductWiseBatchSale> openingStock = reportService.getDataOfOpeningStockByProductId(productId,
				fromReult.toString(), toReult.toString());

		modelAndView.addObject("purchaseData", purchaseEntrys);
		modelAndView.addObject("counterSales", counterSales);
		modelAndView.addObject("indentSales", indentSales);
		modelAndView.addObject("patientSales", patientSales);
		modelAndView.addObject("creditNotes", creditNotes);
		modelAndView.addObject("debitNotes", debitNotes);
		modelAndView.addObject("mrnSlaves", mrnSlaves);
		modelAndView.addObject("openingStock", openingStock);

		modelAndView.addObject("form", from);
		modelAndView.addObject("to", to);

		modelAndView.setViewName("Pharma_Item_ledger");
		return modelAndView;

	}

	@RequestMapping(value = "/getProductList", method = RequestMethod.POST)
	public @ResponseBody List<ProductMaster> getProductList(HttpServletRequest request, HttpServletResponse response) {

		List<ProductMaster> ltShelfMasters = new ArrayList<ProductMaster>();
		ltShelfMasters = reportService.getProducts();

		return ltShelfMasters;
	}

	@RequestMapping(value = "/getDataOfPurchaseByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfPurchaseByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDataOfPurchaseByProductId(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDataOfOpeningStockByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfOpeningStockByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getDataOfOpeningStockByProductId(productId, fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDataOfMrnByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfMrnByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDataOfMrnByProductId(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDataOfCounterByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfCounterByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDataOfCounterByProductId(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDataOfPatientByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfPatientByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDataOfPatientByProductId(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDataOfIndentByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfIndentByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDataOfIndentByProductId(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDataOfDebitByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfDebitByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDataOfDebitByProductId(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getDataOfCreditByProductId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getDataOfCreditByProductId(
			@RequestParam("ProductId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getDataOfCreditByProductId(productId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getPatientTotalBillReport", method = RequestMethod.GET)
	public @ResponseBody String getPatientWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");

		String msg = "";

		String to = request.getParameter("to");
		String totalAmount = "";
		String categoryName = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> cateSales = reportService.getPatientwiseBillAmt(fromReult.toString(),
				toReult.toString());
		
		/*
		 * 
		 * 
		 * String pdfFilePath = objReportModel.getPatientwiseBillAmt(cateSales,
		 * fromReult.toString(), toReult.toString(), request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getPatientSaleTotalBillReport", method = RequestMethod.GET)
	public @ResponseBody String getPatientSaleTotalBillDataReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");

		String msg = "";

		String to = request.getParameter("to");

		String vat55 = request.getParameter("vat55");
		String vat125 = request.getParameter("vat125");
		String vat0 = request.getParameter("vat0");
		String netAmt = request.getParameter("netAmt");

		String taxable55 = request.getParameter("taxable55");
		String taxable12 = request.getParameter("taxable12");
		String taxable0 = request.getParameter("taxable0");

		String totalAmount = "";
		String categoryName = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> cateSales = reportService.getTotalPatientData(fromReult.toString(),
				toReult.toString());

		String pdfFilePath = objReportModel.getPatientSaleTotalBillDataReport(cateSales, fromReult.toString(),
				toReult.toString(), request, vat55, vat125, vat0, netAmt, taxable55, taxable12, taxable0);

		if (!pdfFilePath.equals("")) {
			msg = pdfFilePath;
		} else {

			msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
		}

		return msg;
	}

	@RequestMapping(value = "/getPatientwiseTotalBill", method = RequestMethod.POST)
	public @ResponseBody List<ReportProductWiseBatchSale> getPatientwiseBillAmt(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> reportPurchases = reportService.getPatientwiseBillAmt(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getTotalPatientData", method = RequestMethod.POST)
	public @ResponseBody List<ReportProductWiseBatchSale> getTotalPatientData(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> reportPurchases = reportService.getTotalPatientData(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}

	// suraj changes for credit note
	@RequestMapping(value = "/getCreditNoteDetailsPage", method = RequestMethod.GET)
	public ModelAndView creditNoteDetailsPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_credit_note_details");
		return modelAndView;
	}

	@RequestMapping(value = "/getCreditNoteDetailsByTreatId", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getCreditNoteDetailsByTreatId(
			@RequestParam("treatId") Integer treatId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		/*
		 * String msg = "";
		 * 
		 * String fromArray[] = from.split("/"); String toArray[] = to.split("/");
		 * StringBuffer fromReult = new StringBuffer(); fromReult =
		 * fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
		 * 
		 * StringBuffer toReult = new StringBuffer(); toReult =
		 * toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		 */

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService.getCreditNoteData(from, to);

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getPatientSaleDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId, HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportCreditNoteDetails> productWiseBatchSales = reportService.getPatientSaleDetailsByPatientId(patientId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getIndentSaleDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId, HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportIndentSaleDetails> productWiseBatchSales = reportService.getIndentSaleDetailsByPatientId(patientId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getCreditNoteDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody List<ReportIndentSaleDetails> getCreditNoteDetailsByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId, HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportIndentSaleDetails> productWiseBatchSales = reportService.getCreditNoteDetailsByPatientId(patientId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getOpeningBalanceByPatientId", method = RequestMethod.GET)
	public @ResponseBody Double getopeningBalanceByPatientId(@RequestParam("hiddenPatientId") Integer patientId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String netAmount = request.getParameter("netAmt");

		String patientName = request.getParameter("patName");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";
		Double amount = 0.0;
		try {
			String fromArray[] = from.split("/");
			String toArray[] = to.split("/");
			StringBuffer fromReult = new StringBuffer();
			StringBuffer fromReults = new StringBuffer();
			fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

			fromReults = fromReults.append(fromArray[0] + "-" + fromArray[1] + "-" + fromArray[2]);

			StringBuffer toReult = new StringBuffer();
			toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

			StringBuffer toReults = new StringBuffer();
			toReults = toReults.append(toArray[0] + "-" + toArray[1] + "-" + toArray[2]);

			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			String newdate = "";
			Date startdate = new Date();
			startdate = df.parse(from);

			Calendar cal = Calendar.getInstance();
			cal.setTime(startdate);
			cal.add(Calendar.DATE, -1);
			startdate = cal.getTime();
			System.out.println("startdate before>>>" + startdate);
			newdate = df.format(startdate);
			System.out.println("newdate after>>>" + newdate);

			String fromArray1[] = newdate.split("/");
			StringBuffer newDate = new StringBuffer();
			newDate = newDate.append(fromArray1[2] + "-" + fromArray1[1] + "-" + fromArray1[0]);

			StringBuffer settleBilDate = new StringBuffer();
			settleBilDate = settleBilDate.append(fromArray1[0] + "-" + fromArray1[1] + "-" + fromArray1[2]);

			amount = reportService.getTotalOpeningStockByPatientId(patientId, newDate.toString(),
					settleBilDate.toString());

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return amount;
	}

	@RequestMapping(value = "/getSettleBillByPatientId", method = RequestMethod.GET)
	public @ResponseBody List<ReportCreditNoteDetails> getSettleBillDetailsByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId, HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[0] + "-" + fromArray[1] + "-" + fromArray[2]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[0] + "-" + toArray[1] + "-" + toArray[2]);

		List<ReportCreditNoteDetails> productWiseBatchSales = reportService.getSettleBillDetailsByPatientId(patientId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getIndentSettleBillByPatientId", method = RequestMethod.GET)
	public @ResponseBody List<ReportCreditNoteDetails> getIndentSettleBillByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId, HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[0] + "/" + fromArray[1] + "/" + fromArray[2]);

		StringBuffer toReult = new StringBuffer();
	 	toReult = toReult.append(toArray[0] + "/" + toArray[1] + "/" + toArray[2]);

		List<ReportCreditNoteDetails> productWiseBatchSales = reportService.getIndentSettleBillByPatientId(patientId,
				fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getTreatmentDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody String getTreatmentDetailsByPatientId(@RequestParam("patientId") Integer patientId) {
		JSONArray batchData = new JSONArray();
		batchData = reportService.getTreatmentDetailsByPatientId(patientId);
		return JSONValue.toJSONString(batchData);
	}

	@RequestMapping(value = "/fetchStockDetails", method = RequestMethod.POST)
	public @ResponseBody String getStockDetails() {
		JSONArray strings = new JSONArray();
		strings = reportService.getStockDetails();
		System.out.println("<<<<<<<<<<<<<<<<<<<" + strings);
		return JSONValue.toJSONString(strings);
	}

	@RequestMapping(value = "/getCreditNoteDetailsReport", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getCreditNoteDetailsReport(@RequestParam("treatId") Integer treatId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String netAmount = request.getParameter("netAmt");

		String patientName = request.getParameter("patName");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportCreditNoteDetails> productWiseBatchSales = reportService.getCreditNoteDetailsByTreatId(treatId,
				fromReult.toString(), toReult.toString());

		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("creditData", productWiseBatchSales);

		modelAndView.addObject("form", from);
		modelAndView.addObject("to", to);
		modelAndView.addObject("patientName", patientName);
		modelAndView.addObject("treatmentId", treatId);
		modelAndView.addObject("netAmount", netAmount);

		modelAndView.setViewName("pharma_report_credit_note_details_pdf");
		return modelAndView;
	}

	@RequestMapping(value = "/getPatientLedgerReport", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getPatientLedgerReport(@RequestParam("patientId") Integer patientId,
			HttpServletRequest request, HttpServletResponse response) throws ParseException {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String netAmount = request.getParameter("netAmt");

		String patientName = request.getParameter("patName");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";
		String address = " ";
		String mobile = " ";
		String category_name = " ";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		StringBuffer fromReults = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		fromReults = fromReults.append(fromArray[0] + "-" + fromArray[1] + "-" + fromArray[2]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		StringBuffer toReults = new StringBuffer();
		toReults = toReults.append(toArray[0] + "-" + toArray[1] + "-" + toArray[2]);

		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		String newdate = "";
		Date startdate = new Date();
		startdate = df.parse(from);

		Calendar cal = Calendar.getInstance();
		cal.setTime(startdate);
		cal.add(Calendar.DATE, -1);
		startdate = cal.getTime();
		System.out.println("startdate before>>>" + startdate);
		newdate = df.format(startdate);
		System.out.println("newdate after>>>" + newdate);

		String fromArray1[] = newdate.split("/");
		StringBuffer newDate = new StringBuffer();
		newDate = newDate.append(fromArray1[2] + "-" + fromArray1[1] + "-" + fromArray1[0]);

		StringBuffer settleBilDate = new StringBuffer();
		settleBilDate = settleBilDate.append(fromArray1[0] + "-" + fromArray1[1] + "-" + fromArray1[2]);

		System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + newDate);
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + settleBilDate);

		// Patient Sale
		List<ReportCreditNoteDetails> patientwisePatientBill = reportService.getPatientSaleDetailsByPatientId(patientId,
				fromReult.toString(), toReult.toString());

		// Patient Settle bill
		List<ReportCreditNoteDetails> patientwisePatientSettleBill = reportService
				.getSettleBillDetailsByPatientId(patientId, fromReults.toString(), toReults.toString());

		// Indent Sale
		List<ReportIndentSaleDetails> patientwiseIndentBill = reportService.getIndentSaleDetailsByPatientId(patientId,
				fromReult.toString(), toReult.toString());

		// Indent Sale settle bill
		List<ReportCreditNoteDetails> patientwiseIndentSettleBill = reportService
				.getIndentSettleBillByPatientId(patientId, fromReults.toString(), toReults.toString());

		// Credit Note
		List<ReportIndentSaleDetails> patientwiseCreditBill = reportService.getCreditNoteDetailsByPatientId(patientId,
				fromReult.toString(), toReult.toString());
		Double amount = reportService.getTotalOpeningStockByPatientId(patientId, newDate.toString(),
				settleBilDate.toString());

		System.out.println(amount);

		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("patientData", patientwisePatientBill);
		modelAndView.addObject("indentData", patientwiseIndentBill);
		modelAndView.addObject("patientSettleBill", patientwisePatientSettleBill);
		modelAndView.addObject("indentSettleBill", patientwiseIndentSettleBill);
		modelAndView.addObject("creditNote", patientwiseCreditBill);
		modelAndView.addObject("form", from);
		modelAndView.addObject("to", to);
		modelAndView.addObject("patientName", patientName);
		modelAndView.addObject("patientId", patientId);
		modelAndView.addObject("netAmount", amount);
		modelAndView.addObject("address", address);
		modelAndView.addObject("mobile", mobile);
		modelAndView.addObject("category_name", category_name);
		modelAndView.setViewName("pharma_report_patient_ledger_details_pdf");

		return modelAndView;
	}

	// total Pharmacy collection
	@RequestMapping(value = "/getPharmacyTotalDetailsReport", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getPharmacyTotalCollectionReport(HttpServletRequest request,
			HttpServletResponse response) {
		String fromDMY = request.getParameter("fromDMY");
		String toDMY = request.getParameter("toDMY");

		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("fromDMY", fromDMY);
		modelAndView.addObject("toDMY", toDMY);

		modelAndView.setViewName("pharma_report_pharmacy_total_collection_pdf");
		return modelAndView;
	}

	// suraj changes for party ledger
	@RequestMapping(value = "/getPartywiseLedgerPage", method = RequestMethod.GET)
	public ModelAndView getPartywiseLedgerPage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_ledger_partywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPartywiseLedgerList", method = RequestMethod.GET)
	public @ResponseBody List<PendingBill> getPartywiseLedgerList(@RequestParam("vendorId") Integer vendorId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		List<PendingBill> pendingBills = reportService.getPartywiseLedgerList(vendorId, fromReult.toString(),
				toReult.toString());
		return pendingBills;
	}

	/*
	 * select cash.cash_paid_id, cash.cash_paid_date, cash.cash_paid_doc_id,
	 * cash.cash_paid_amt from pharma_cash_paid_master cash where
	 * cash.cash_paid_date between '2015-04-15' and '2016-04-15' and
	 * cash.cash_paid_vendor_id =42 and cash.cash_paid_delete_flag = 0;
	 */
	@RequestMapping(value = "/getCashPaidEntryList", method = RequestMethod.GET)
	public @ResponseBody List<PendingBill> getCashPaidForPartywiseLedgerList(@RequestParam("vendorId") Integer vendorId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<PendingBill> pendingBills = reportService.getCashPaidForPartywiseLedgerList(vendorId, fromReult.toString(),
				toReult.toString());
		return pendingBills;
	}

	@RequestMapping(value = "/getChequePaidEntryList", method = RequestMethod.GET)
	public @ResponseBody List<PendingBill> getChequePaidForPartywiseLedgerList(
			@RequestParam("vendorId") Integer vendorId, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<PendingBill> pendingBills = reportService.getChequePaidForPartywiseLedgerList(vendorId,
				fromReult.toString(), toReult.toString());
		return pendingBills;
	}

	@RequestMapping(value = "/getDebitNoteEntryList", method = RequestMethod.GET)
	public @ResponseBody List<PendingBill> getDebitNoteEntryList(@RequestParam("vendorId") Integer vendorId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
		List<PendingBill> pendingBills = reportService.getDebitNoteEntryList(vendorId, fromReult.toString(),
				toReult.toString());
		return pendingBills;
	}

	@RequestMapping(value = "/getAllCreditNoteDetails", method = RequestMethod.GET)
	public @ResponseBody List<ReportCreditNoteDetails> getAllCreditNoteDetails(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportCreditNoteDetails> productWiseBatchSales = reportService
				.getAllCreditNoteDetails(fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getCreditNoteDetailsByCat", method = RequestMethod.GET)
	public @ResponseBody List<ReportCreditNoteDetails> getCreditNoteDetailsByCat(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportCreditNoteDetails> productWiseBatchSales = reportService
				.getCreditNoteDetailsByCat(fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	@RequestMapping(value = "/getCancelIndent", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getCancelIndentDetails(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportProductWiseBatchSale> productWiseBatchSales = reportService
				.getCancelIndentDetails(fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	// suraj changes for All credit note Report
	@RequestMapping(value = "/getAllCreditNoteDetailsPage", method = RequestMethod.GET)
	public ModelAndView getAllCreditNoteDetailsPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_credit_note_details_all");
		return modelAndView;
	}

	@RequestMapping(value = "/getPharmacyCollectionPage", method = RequestMethod.GET)
	public ModelAndView getPharmacyCollection(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_pharmacy_collection_details");
		return modelAndView;
	}

	@RequestMapping(value = "/getPharmacyDueCollectionPage", method = RequestMethod.GET)
	public ModelAndView getPharmacyDuCollection(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_pharmacy_Due_collection_details");
		return modelAndView;
	}

	// total Pharmacy collection
	@RequestMapping(value = "/getPharmacyDuesReport", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getPharmacyDueCollectionReport(HttpServletRequest request,
			HttpServletResponse response) {
		String fromDMY = request.getParameter("fromDMY");
		String toDMY = request.getParameter("toDMY");

		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("fromDMY", fromDMY);
		modelAndView.addObject("toDMY", toDMY);

		modelAndView.setViewName("pharma_report_pharmacy_due_collection_pdf");
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/getSpecificCategoriwiseReportPage", method =
	 * RequestMethod.GET) public ModelAndView
	 * getSpecificCategoriwiseReportPage(HttpServletRequest request,
	 * HttpServletResponse response) {
	 * 
	 * ModelAndView modelAndView = new ModelAndView();
	 * modelAndView.setViewName("pharma_report_category_wise"); return modelAndView;
	 * }
	 */
	// For sending to Dispatch GRn
	// Added By BILAL
	// 13-12-2017
	@RequestMapping(value = "/getDaywiseGRNPurchasePage", method = RequestMethod.GET)
	public ModelAndView daywiseGRNPurchase(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_dispatch_grn_purchase_daywise");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :22-12-2017
	 * @Code :For Dispatch GRN
	 *****/
	@RequestMapping(value = "/getDayWiseDispatchGRN", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getDayWiseDispatchGRN(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("dispatchFlag") String dispatchFlag,
			@RequestParam("vendorId") int vendorId) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getDayWiseDispatchGRN(fromReult.toString(),
				toReult.toString(), dispatchFlag, vendorId);
		return reportPurchases;
	}

	/****
	 * @author :BILAL
	 * @Date :22-01-2018
	 * @Code :For Product Wise Report with vendor
	 *****/
	@RequestMapping(value = "/getPurchaseProductWiseandven", method = RequestMethod.GET)
	public ModelAndView getPurchaseProductWiseandven(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_productwise_vendor");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :22-01-2018
	 * @Code :For Product Wise Report with vendor
	 *****/
	@RequestMapping(value = "/getProductWisePurchase2", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getProductWisePurchase2(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String productId = request.getParameter("productId");
		String vendorId = request.getParameter("vendorId");
		String unitId = request.getParameter("unitId");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getProductWisePurchaseandVendor(fromReult.toString(),
				toReult.toString(), productId, vendorId, unitId);
		return reportPurchases;
	}

	/*****
	 * @author :BILAL
	 * @Date :23-01-2018
	 * @Code :For unit List
	 *****/
	@Autowired
	UnitService unitService;

	@RequestMapping(value = "/fetchUnitList", method = RequestMethod.POST)
	public @ResponseBody UnitMasterDto getAllUnitList(HttpServletRequest request) {
		List<UnitMasterDto> ltUnitMasterDto = new ArrayList<UnitMasterDto>();
		ltUnitMasterDto = unitService.getAllUnit1(request);
		UnitMasterDto objUnit = new UnitMasterDto();
		objUnit.setLstUnit(ltUnitMasterDto);
		return objUnit;
	}

	/*****
	 * @author :BILAL
	 * @Date :29-01-2018
	 * @Code :For supplier List
	 *****/
	@RequestMapping(value = "/getSupplierListReportPage", method = RequestMethod.GET)
	public ModelAndView getSupplierListReportPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_supplier_list");
		return modelAndView;
	}

	/******
	 * @author :BILAL
	 * @Date :29-01-2018
	 * @Code :For getting list of vendor name
	 ******/
	@RequestMapping(value = "/getSupplierListReport", method = RequestMethod.GET)
	public @ResponseBody VendorMaster getSupplierListReport(@RequestParam("from") String fromDate,
			@RequestParam("to") String toDate) {

		List<VendorMaster> ltvendor = new ArrayList<VendorMaster>();
		ltvendor = reportService.getSupplierListReport(fromDate, toDate);
		VendorMaster obj = new VendorMaster();
		obj.setLstvendors(ltvendor);

		return obj;

	}

	/*****
	 * @author :BILAL
	 * @Date :05-02-2018
	 * @Code :For Drug master List
	 *****/
	@RequestMapping(value = "/getmasterListReportPage", method = RequestMethod.GET)
	public ModelAndView getmasterListReportPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_drugmaster_list");
		return modelAndView;
	}

	/******
	 * @author :BILAL
	 * @Date :29-01-2018
	 * @Code :For getting list of vendor name
	 ******/
	@RequestMapping(value = "/getproductData", method = RequestMethod.GET)
	public @ResponseBody ProductMaster getproductData(@RequestParam("from") String fromDate,
			@RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId) {

		List<ProductMaster> ltp = new ArrayList<ProductMaster>();
		ltp = reportService.getproductData(fromDate, toDate, categoryId, companyId, ProductId);
		ProductMaster obj = new ProductMaster();
		obj.setLstprod(ltp);

		return obj;

	}

	/****
	 * @author :BILAL
	 * @Date :12-02-2018
	 * @Code :For purchase details reports
	 *****/
	@RequestMapping(value = "/getpurchaseDetails", method = RequestMethod.GET)
	public ModelAndView getpurchaseDetails(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_details");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :12-02-2018
	 * @Code :For getting list of purchase details
	 *****/
	@RequestMapping(value = "/getpurchaseData", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getpurchaseData(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId, @RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId, @RequestParam("paytype") String purtranstype) {

		List<ReportPurchase> reportPurchases = reportService.getpurchaseData(request, fromDate, toDate, categoryId,
				companyId, ProductId, vendortId, unitId, purtranstype);
		return reportPurchases;
	}

	/****
	 * @author :BILAL
	 * @Date :26-02-2018
	 * @Code :For purchase order details reports
	 *****/
	@RequestMapping(value = "/getpurchaseOrderDetails", method = RequestMethod.GET)
	public ModelAndView getpurchaseOrderDetails(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_order_details");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :26-02-2018
	 * @Code :For purchase order details reports
	 *****/
	@RequestMapping(value = "/getpurchaseOrderData", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getpurchaseOrderData(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("from") String fromDate, @RequestParam("to") String toDate,
			@RequestParam("hiddenvendorId") int vendortId, @RequestParam("unitId") int unitId) {

		List<ReportPurchase> reportPurchases = reportService.getpurchaseOrderData(request, fromDate, toDate, vendortId,
				unitId);
		return reportPurchases;
	}

	/****
	 * @author :BILAL
	 * @Date :28-02-2018
	 * @Code :For purchase details reports with GST and IGST
	 *****/
	@RequestMapping(value = "/getpurchaseDetailswithgst", method = RequestMethod.GET)
	public ModelAndView getpurchaseDetailswithgst(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_details_gst");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :28-02-2018
	 * @Code :For sale Report with GST amount
	 *****/
	@RequestMapping(value = "/getSaleReportWithGSt", method = RequestMethod.GET)
	public ModelAndView getSaleReportWithGSt(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sale_details_with_gst");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :28-02-2018
	 * @Code :For getting list of sale report with gst
	 *****/
	@RequestMapping(value = "/getAllSaleReportWithGST", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getAllSaleReportWithGST(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddenProductId") int ProductId,

			@RequestParam("unitId") int unitId, @RequestParam("type") String type,
			@RequestParam("patientId") int patientId) {

		List<ReportProductWiseBatchSale> reportPurchases = reportService.getAllSaleReportWithGST(request, fromDate,
				toDate, ProductId, unitId, type, patientId);
		return reportPurchases;
	}

	/****
	 * @author :BILAL
	 * @Date :01-03-2018
	 * @Code :For
	 *****/
	@RequestMapping(value = "/purchaselistdetailswithsalevalue", method = RequestMethod.GET)
	public ModelAndView purchaselistdetailswithsalevalue(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchaselist_sale_value");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :01-03-2018
	 * @Code :For getting list of purchase details with sale vale and profit amount
	 *****/
	@RequestMapping(value = "/getpurchaselistwithsaleval", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getpurchaselistwithsaleval(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId, @RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId, @RequestParam("paytype") String purtranstype) {

		List<ReportPurchase> reportPurchases = reportService.getpurchaselistwithsaleval(request, fromDate, toDate,
				categoryId, companyId, ProductId, vendortId, unitId, purtranstype);
		return reportPurchases;
	}

	/****
	 * @author :BILAL
	 * @Date :02-03-2018
	 * @Code :For item wise and mfg wise sale stock
	 *****/
	@RequestMapping(value = "/itemwisemnfsalestockreport", method = RequestMethod.GET)
	public ModelAndView itemwisemnfsalestockreport(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_itemmnf_salestock");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :02-03-2018
	 * @Code :For item wise and mfg wise sale stock
	 *****/
	@RequestMapping(value = "/getitemwisemnfsalestockreport", method = RequestMethod.GET)
	public @ResponseBody List<ReportStock> getitemwisemnfsalestockreport(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int productId, @RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId, @RequestParam("paytype") String purtranstype) {

		List<ReportStock> reportStocks = reportService.getitemwisemnfsalestockreport(request, fromDate, toDate,
				categoryId, unitId, productId);

		return reportStocks;
	}

	/****
	 * @author :BILAL
	 * @Date :03-03-2018
	 * @Code :For getting bill comparison
	 *****/
	@RequestMapping(value = "/getBillComparision", method = RequestMethod.GET)
	public ModelAndView getBillComparision(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_billcomparison_purchase_details");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :03-03-2018
	 * @Code :For purchase tax Report
	 *****/
	@RequestMapping(value = "/getpurchasetaxreport", method = RequestMethod.GET)
	public ModelAndView getpurchasetaxreport(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_tax");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :12-02-2018
	 * @Code :For getting list of purchase details
	 *****/
	@Autowired
	TaxService taxService;

	@RequestMapping(value = "/getpurchasetaxData", method = RequestMethod.GET)
	public @ResponseBody ReportPurchase getpurchasetaxData(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId, @RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId, @RequestParam("paytype") String purtranstype) {

		List<ReportPurchase> reportPurchases = reportService.getpurchasetaxData(request, fromDate, toDate, categoryId,
				companyId, ProductId, vendortId, unitId, purtranstype);
		ReportPurchase obj = new ReportPurchase();
		obj.setLstpurc(reportPurchases);

		List<TaxMaster> lsttaxmaster = new ArrayList<TaxMaster>();
		lsttaxmaster = taxService.getgstList();

		TaxMaster cs0 = new TaxMaster();
		cs0.setTaxName("Sr No");
		cs0.setTaxId(-1);
		lsttaxmaster.add(0, cs0);

		TaxMaster cs1 = new TaxMaster();
		cs1.setTaxName("Bill NO");
		cs1.setTaxId(-1);
		lsttaxmaster.add(1, cs1);

		TaxMaster cs2 = new TaxMaster();
		cs2.setTaxName("Pur. Bill No.");
		cs2.setTaxId(-1);
		lsttaxmaster.add(2, cs2);

		TaxMaster cs3 = new TaxMaster();
		cs3.setTaxName("Bill Date");
		cs3.setTaxId(-1);
		lsttaxmaster.add(3, cs3);

		TaxMaster cs4 = new TaxMaster();
		cs4.setTaxName("Supplier Name");
		cs4.setTaxId(-1);
		lsttaxmaster.add(4, cs4);

		TaxMaster cs5 = new TaxMaster();
		cs5.setTaxName("GST No.");
		cs5.setTaxId(-1);
		lsttaxmaster.add(5, cs5);

		TaxMaster cs6 = new TaxMaster();
		cs6.setTaxName("Supply Location");
		cs6.setTaxId(-1);
		lsttaxmaster.add(6, cs6);

		TaxMaster cs7 = new TaxMaster();
		cs7.setTaxName("Invoice Type");
		cs7.setTaxId(-1);
		lsttaxmaster.add(7, cs7);

		TaxMaster cs8 = new TaxMaster();
		cs8.setTaxName("Sub Total");
		cs8.setTaxId(-1);
		lsttaxmaster.add(8, cs8);

		/*
		 * TaxMaster cs9 = new TaxMaster();
		 * cs9.setTaxName("Taxable Amt");cs9.setTaxId(-1); lsttaxmaster.add(9, cs9);
		 */

		TaxMaster cs9 = new TaxMaster();
		cs9.setTaxName("Discount");
		cs9.setTaxId(-1);
		lsttaxmaster.add(9, cs9);

		TaxMaster cs10 = new TaxMaster();
		cs10.setTaxName("Bill Adj.");
		cs10.setTaxId(-1);
		lsttaxmaster.add(10, cs10);

		TaxMaster cs11 = new TaxMaster();
		cs11.setTaxName("Total Bill Amt");
		cs11.setTaxId(-1);
		lsttaxmaster.add(11, cs11);
		obj.setLsttaxmaster(lsttaxmaster);

		return obj;
	}

	/****
	 * @author :BILAL
	 * @Date :05-03-2018
	 * @Code :For purchase register report
	 *****/
	@RequestMapping(value = "/getpurchaseRegisterDetails", method = RequestMethod.GET)
	public ModelAndView getpurchaseRegisterDetails(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_register");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :05-03-2018
	 * @Code :For purchase register report
	 *****/
	@RequestMapping(value = "/getpurreg", method = RequestMethod.GET)
	public @ResponseBody ReportPurchase getpurreg(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId, @RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId, @RequestParam("paytype") String purtranstype) {

		List<ReportPurchase> reportPurchases = reportService.getpurreg(request, fromDate, toDate, categoryId, companyId,
				ProductId, vendortId, unitId, purtranstype);
		ReportPurchase obj = new ReportPurchase();
		obj.setLstpurc(reportPurchases);
		return obj;
	}

	/****
	 * @author :BILAL
	 * @Date :06-03-2018
	 * @Code :For purchase return report
	 *****/
	@RequestMapping(value = "/getpurchasereturn", method = RequestMethod.GET)
	public ModelAndView getpurchasereturn(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_return");
		return modelAndView;
	}

	/****
	 * @author :BILAL
	 * @Date :06-03-2018
	 * @Code :For getting data of purchase return report
	 *****/
	@RequestMapping(value = "/getpurreturn", method = RequestMethod.GET)
	public @ResponseBody List<ReportDebitNote> getpurreturn(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId, @RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId, @RequestParam("paytype") String purtranstype) {

		List<ReportDebitNote> reportDabit = reportService.getpurreturn(request, fromDate, toDate, categoryId, companyId,
				ProductId, vendortId, unitId, purtranstype);

		return reportDabit;
	}

	/****
	 * @author :BILAL
	 * @Date :06-03-2018
	 * @Code :For sale tax Report
	 *****/
	@RequestMapping(value = "/getSaletaxreport", method = RequestMethod.GET)
	public ModelAndView getSaletaxreport(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sale_tax");
		return modelAndView;
	}

	@RequestMapping(value = "/getsaletaxData", method = RequestMethod.GET)
	public @ResponseBody ReportProductWiseBatchSale getsaletaxData(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddenProductId") int ProductId,

			@RequestParam("unitId") int unitId, @RequestParam("type") String type,
			@RequestParam("patientId") int patientId) {

		List<ReportProductWiseBatchSale> reportsaletax = reportService.getsaletaxData(request, fromDate, toDate,
				ProductId, unitId, type, patientId);
		ReportProductWiseBatchSale obj = new ReportProductWiseBatchSale();
		obj.setListsale(reportsaletax);

		List<TaxMaster> lsttaxmaster = new ArrayList<TaxMaster>();
		lsttaxmaster = taxService.getgstList();

		TaxMaster cs0 = new TaxMaster();
		cs0.setTaxName("Sr No");
		cs0.setTaxId(-1);
		lsttaxmaster.add(0, cs0);

		TaxMaster cs1 = new TaxMaster();
		cs1.setTaxName("Sale No");
		cs1.setTaxId(-1);
		lsttaxmaster.add(1, cs1);

		TaxMaster cs2 = new TaxMaster();
		cs2.setTaxName("Type");
		cs2.setTaxId(-1);
		lsttaxmaster.add(2, cs2);

		TaxMaster cs3 = new TaxMaster();
		cs3.setTaxName("Bill No");
		cs3.setTaxId(-1);
		lsttaxmaster.add(3, cs3);

		TaxMaster cs4 = new TaxMaster();
		cs4.setTaxName("Bill Date");
		cs4.setTaxId(-1);
		lsttaxmaster.add(4, cs4);

		TaxMaster cs5 = new TaxMaster();
		cs5.setTaxName("GST No.");
		cs5.setTaxId(-1);
		lsttaxmaster.add(5, cs5);

		TaxMaster cs6 = new TaxMaster();
		cs6.setTaxName("Place Of Delivery");
		cs6.setTaxId(-1);
		lsttaxmaster.add(6, cs6);

		TaxMaster cs7 = new TaxMaster();
		cs7.setTaxName("Customer Name");
		cs7.setTaxId(-1);
		lsttaxmaster.add(7, cs7);

		TaxMaster cs8 = new TaxMaster();
		cs8.setTaxName("OPD/IPD No");
		cs8.setTaxId(-1);
		lsttaxmaster.add(8, cs8);

		TaxMaster cs9 = new TaxMaster();
		cs9.setTaxName("IPD Effect");
		cs9.setTaxId(-1);
		lsttaxmaster.add(9, cs9);

		TaxMaster cs10 = new TaxMaster();
		cs10.setTaxName("Sub Total");
		cs10.setTaxId(-1);
		lsttaxmaster.add(10, cs10);

		TaxMaster cs11 = new TaxMaster();
		cs11.setTaxName("Discount");
		cs11.setTaxId(-1);
		lsttaxmaster.add(11, cs11);

		TaxMaster cs12 = new TaxMaster();
		cs12.setTaxName("Free Medicines");
		cs12.setTaxId(-1);
		lsttaxmaster.add(12, cs12);
		obj.setLsttaxmaster(lsttaxmaster);

		TaxMaster cs13 = new TaxMaster();
		cs13.setTaxName("Total Bill Amt");
		cs13.setTaxId(-1);
		lsttaxmaster.add(13, cs13);
		obj.setLsttaxmaster(lsttaxmaster);

		TaxMaster cs14 = new TaxMaster();
		cs14.setTaxName("ADJUST AMT.");
		cs14.setTaxId(-1);
		lsttaxmaster.add(14, cs14);
		obj.setLsttaxmaster(lsttaxmaster);

		return obj;
	}

	/****
	 * @author :BILAL
	 * @Date :07-03-2018
	 * @Code :For summary doc report
	 *****/
	@RequestMapping(value = "/getSummarydocreport", method = RequestMethod.GET)
	public ModelAndView getSummarydocreport(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_summary_doc");
		return modelAndView;
	}

	/****
	 * @author :Parikshit
	 * @Date :07-03-2018
	 * @Code :Ward_wise Collection Report
	 *****/
	@RequestMapping(value = "/getWardwiseCollection", method = RequestMethod.GET)
	public ModelAndView getWardwiseCollection(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_ward_wise_collection_report");
		return modelAndView;
	}

	@RequestMapping(value = "/getPatientwiseSaleReportPage", method = RequestMethod.GET)
	public ModelAndView getPatientwiseSaleReportPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_patient_wise_sale");
		return modelAndView;
	}

	@RequestMapping(value = "/getPharmacyPatientWiseSaleReport", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getPharmacyPatientWiseSaleReport(HttpServletRequest request,
			HttpServletResponse response) {
		String fromDMY = request.getParameter("fromDMY");
		String toDMY = request.getParameter("toDMY");

		String fromArray[] = fromDMY.split("/");
		String toArray[] = toDMY.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("fromDMY", fromDMY);
		modelAndView.addObject("toDMY", toDMY);
		modelAndView.addObject("patientSaleData",
				reportService.getPharmacyPatientWiseSaleReport(fromReult.toString(), toReult.toString()));

		modelAndView.setViewName("pharma_report_patientwise_sale_pdf");
		return modelAndView;
	}

	@RequestMapping(value = "/getSaleRegisterReport", method = RequestMethod.GET)
	public ModelAndView getSaleRegisterReport(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sale_register");
		return modelAndView;
	}

	/****
	 * @author :Parikshit
	 * @Date :08-03-2018
	 * @Code :For sale Register report
	 *****/
	@RequestMapping(value = "/getAllSaleRegisterReport", method = RequestMethod.GET)
	public @ResponseBody List<ReportProductWiseBatchSale> getAllSaleRegisterReport(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddenProductId") int ProductId,

			@RequestParam("unitId") int unitId, @RequestParam("type") String type,
			@RequestParam("patientId") int patientId) {

		List<ReportProductWiseBatchSale> reportPurchases = reportService.getAllSaleRegisterReport(request, fromDate,
				toDate, ProductId, unitId, type, patientId);
		return reportPurchases;
	}

	@RequestMapping(value = "/getWardwiseCollectionReport", method = RequestMethod.GET)
	public @ResponseBody List<WardWiseDetaisDto> getWardwiseCollectionReport(HttpServletRequest request,
			HttpServletResponse response) {
		String fromDMY = request.getParameter("fromDMY");
		String toDMY = request.getParameter("toDMY");

		return reportService.getWardwiseCollection(fromDMY, toDMY);
	}

	/****
	 * @author :BILAL
	 * @Date :28-02-2018
	 * @Code :For sale Report with GST amount
	 *****/
	@RequestMapping(value = "/getSaleReportWithGStwhole", method = RequestMethod.GET)
	public ModelAndView getSaleReportWithGStwhole(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_whole_sale_details_with_gst");
		return modelAndView;
	}

	/****
	 * @author :Parikshit
	 * @Date :27-04-2018
	 * @Code :For Stock report Date_wise
	 *****/
	@RequestMapping(value = "/getDateWiseStockReport", method = RequestMethod.GET)
	public ModelAndView getDateWiseStockReport(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_date_wise_stock_report");
		return modelAndView;
	}

	@RequestMapping(value = "/getDateWiseStock", method = RequestMethod.GET)
	public @ResponseBody List<ReportExpiry> getDateWiseStock(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("from") String fromDate, @RequestParam(value = "productId", required = false) int ProductId) {

		List<ReportExpiry> reportStock = reportService.getDateWiseStock(fromDate, ProductId);
		return reportStock;
	}

	/****
	 * @author :Parikshit
	 * @Date :08-08-2018
	 * @Code :Purchase return with gst
	 *****/
	@RequestMapping(value = "/getPurchaseRetrunDetailsWithGst", method = RequestMethod.GET)
	public ModelAndView getPurchaseRetrunDetailsWithGst(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_debit_note_with_gst");
		return modelAndView;
	}

	@RequestMapping(value = "/getpurchaseRetrunData", method = RequestMethod.GET)
	public @ResponseBody List<ReportPurchase> getpurchaseRetrunData(HttpServletRequest request,
			HttpServletResponse response, @RequestParam("from") String fromDate, @RequestParam("to") String toDate

	/*
	 * @RequestParam("hiddencategoryId") int categoryId,
	 * 
	 * @RequestParam("hiddencompanyId") int companyId,
	 * 
	 * @RequestParam("hiddenProductId") int ProductId,
	 * 
	 * @RequestParam("hiddenvendorId") int vendortId,
	 * 
	 * @RequestParam("unitId") int unitId,
	 * 
	 * @RequestParam("paytype") String purtranstype
	 */) {

		List<ReportPurchase> reportPurchases = reportService.getpurchaseRetrunData(request, fromDate,
				toDate/* , categoryId,companyId,ProductId,vendortId,unitId,purtranstype */);
		return reportPurchases;
	}

	/****
	 * @author :Manisha
	 * @Date :17-01-2019
	 * @Code :GRN Report
	 *****/

	@RequestMapping(value = "/getGRNreportPage", method = RequestMethod.GET)
	public ModelAndView getGRNreport(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_GRN_report");
		return modelAndView;
	}

	@RequestMapping(value = "/getGRNdata", method = RequestMethod.POST)
	public @ResponseBody List<ReportPurchase> getGRNReportdata(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getGRNReportdata(fromReult.toString(), toReult.toString());
		return reportPurchases;
	}

	@RequestMapping(value = "/getGRNdataReport", method = RequestMethod.GET)
	public @ResponseBody String getGRNdataReport(HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */

		String totalAmount = request.getParameter("totalAmount");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getGRNReportdata(fromReult.toString(), toReult.toString());

		
		  
		
		  String pdfFilePath = objReportModel.getGRNReportDetails(reportPurchases,
		  totalAmount, fromReult.toString(), toReult.toString(), request);
		  
		  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		  
		  msg = "pdf path->" + pdfFilePath +
		  " Oops some problem occured while Generating Report"; }
		 
		return msg;
	}

	@RequestMapping(value = "/getPurchasNewePatyWisePage", method = RequestMethod.GET)
	public ModelAndView purchasenewPartyWiseData(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_reprt_purhase_newpartywise");
		return modelAndView;
	}

	@RequestMapping(value = "/getPartyNewWisePurchaseReport", method = RequestMethod.GET)
	public @ResponseBody String getPartyNewWisePurchaseReport(HttpServletRequest request,
			HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		/* String patientName = request.getParameter("patientName"); */
		String productName = request.getParameter("productName");
		/* String totalAmount = request.getParameter("totalAmount"); */
		String vendorId = request.getParameter("productId");
		String vendorName = request.getParameter("vendorName");
		String totalAmount = request.getParameter("totalAmount");
		String productId = request.getParameter("productId");

		System.out.println("vendor id is" + vendorId);

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportPurchase> reportPurchases = reportService.getPartyWisePurchaseByPartyIddetail(fromReult.toString(),
				toReult.toString(), vendorId, productId);

		
		  
		  
		  String pdfFilePath = objReportModel.getPartyNewWisePurchase(reportPurchases,
		  productName, request, fromReult.toString(), toReult.toString(), vendorName,
		  totalAmount);
		  
		  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		  
		  msg = "pdf path->" + pdfFilePath +
		  " Oops some problem occured while Generating Report"; }
		 
		return msg;
	}

	/************
	 * @author : Ajay Khandare
	 * @date : 06-feb-2019
	 * @code :set page
	 ********/

	@RequestMapping(value = "/getBillWiseSale", method = RequestMethod.GET)
	public ModelAndView getBillSaleWiseReport(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("Pharma_Bill_Wise_Sale_Report");
		return modelAndView;
	}

	@RequestMapping(value = "/getBillWiseSalereturn", method = RequestMethod.GET)
	public ModelAndView getBillSaleWiseReportReturn(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_Bill_Wise_Sale_Report_Return");
		return modelAndView;
	}

	/************
	 * @author : Ajay Khandare
	 * @date : 09-feb-2019
	 * @code :get bill wise Sale report and return
	 ********/
	//By Badrinath 
	@RequestMapping(value = "/getBillwiseSaleReport", method = RequestMethod.GET)
	public @ResponseBody List<PatientSaleBillSlave> billwisesalereport(@RequestParam("patientId") Integer patientId,
			@RequestParam("userId") Integer userId, @RequestParam("doctorId") Integer doctorId,
			@RequestParam("saletype") String saletype, HttpServletRequest request, HttpServletResponse response) {
	
	

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		// String patientName = request.getParameter("patientName");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<PatientSaleBillSlave> billWiseSales = reportService.billwiseSaleReportList(patientId, userId, doctorId,
				saletype, fromReult.toString(), toReult.toString());

		return billWiseSales;
		}

		/*

		String from = request.getParameter("from");

		String to = request.getParameter("to");
		String callform = request.getParameter("callform");
		//Integer patientId = 0;
	//	Integer compId = 0;
		if (callform == "patientWise") {
			patientId = Integer.parseInt(request.getParameter("patientId").toString());
		}

		if (callform == "userWise") {
			userId = Integer.parseInt(request.getParameter("userId"));
		}
		if (callform == "doctorWise") {
			doctorId = Integer.parseInt(request.getParameter("doctorId"));
		}
		System.out.println("form>>>to" + from + "" + to);

		if (to == null)
			to = from;

		List<PatientSaleBillSlave> billWiseSales = reportService.billwiseSaleReportList(from, to, callform, patientId, userId,doctorId);
		return billWiseSales;
	
		
	}
*/
	@RequestMapping(value = "/getBillwiseSaleReportReturn", method = RequestMethod.GET)
	public @ResponseBody List<PatientSaleBillSlave> BillwisesaleReportReturn(
			@RequestParam("patientId") Integer patientId, @RequestParam("userId") Integer userId,
			@RequestParam("doctorId") Integer doctorId, @RequestParam("saletype") String saletype,
			HttpServletRequest request, HttpServletResponse response) {

		String from = request.getParameter("from");
		String to = request.getParameter("to");
		// String patientName = request.getParameter("patientName");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");

		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<PatientSaleBillSlave> billWiseSalesreturn = reportService.billwiseSaleReportReturnList(patientId, userId,
				saletype, fromReult.toString(), toReult.toString());

		return billWiseSalesreturn;
	}

	/************
	 * @author : Ajay Khandare
	 * @date : 09-feb-2019
	 * @code :get bill wise Sale List return
	 ********/

	@RequestMapping(value = "/getBillWiseSaleListReport", method = RequestMethod.GET)
	public @ResponseBody String billWiseSaleListReport(@RequestParam("patientId") Integer patientId,
			@RequestParam("userId") Integer userId, @RequestParam("doctorId") Integer doctorId,
			@RequestParam("saletype") String saletype, HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		/* String patientId =request.getParameter("patientId").toString(); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<PatientSaleBillSlave> billWiseBatchSalerReport = reportService.billwiseSaleReportList(patientId, userId,
				doctorId, saletype, fromReult.toString(), toReult.toString());

		/*
		 * 
		 * 
		 * System.err.println("billWiseBatchSalerReport=====" + totalAmount);
		 * 
		 * String pdfFilePath =
		 * objReportModel.billwiseSaleReport(billWiseBatchSalerReport, patientId,
		 * userId, doctorId, saletype, fromReult.toString(), toReult.toString(),
		 * totalAmount, request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	@RequestMapping(value = "/getBillWiseSaleListReportReturn", method = RequestMethod.GET)
	public @ResponseBody String billWiseSaleListReportReturn(@RequestParam("patientId") Integer patientId,
			@RequestParam("userId") Integer userId, @RequestParam("saletype") String saletype,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");

		String totalAmount = request.getParameter("totalAmount");

		/* String patientId =request.getParameter("patientId").toString(); */

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<PatientSaleBillSlave> billWiseBatchSalerReport = reportService.billwiseSaleReportReturnList(patientId,
				userId, saletype, from, to);

		/*
		 * 
		 * 
		 * String pdfFilePath =
		 * objReportModel.billwiseSaleReturn(billWiseBatchSalerReport, patientId,
		 * userId, saletype, fromReult.toString(), toReult.toString(), totalAmount,
		 * request);
		 * 
		 * if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
		 * 
		 * msg = "pdf path->" + pdfFilePath +
		 * " Oops some problem occured while Generating Report"; }
		 */
		return msg;
	}

	// @codeBy : Ajay @codeDate : 08-feb-2019 @codeFor : Fetching Operation User
	// List

	@RequestMapping(value = "/fetchuser", method = RequestMethod.GET)
	public @ResponseBody Users fetchuser(@RequestParam("patiename") String patiename,
			@RequestParam("callfrom") String callfrom, HttpServletResponse response) {

		List<Users> ltUsersDTOs = new ArrayList<Users>();

		ltUsersDTOs = reportService.fetchuser(patiename, callfrom);

		Users objUsersDTO = new Users();

		objUsersDTO.setUsersList(ltUsersDTOs);
		return objUsersDTO;
	}

	// @codeBy : Ajay @codeDate : 08-feb-2019 @codeFor : Fetching Operation Doctor
	// List

	@RequestMapping(value = "/fetchDoctor", method = RequestMethod.GET)
	public @ResponseBody DoctorList fetchDoctor(@RequestParam("doctorname") String doctorname,
			@RequestParam("callfrom") String callfrom, HttpServletResponse response) {

		List<DoctorList> ltDoctorDTOs = new ArrayList<DoctorList>();

		ltDoctorDTOs = reportService.fetchDoctor(doctorname, callfrom);

		DoctorList objDoctorDTO = new DoctorList();

		objDoctorDTO.setListDoctor(ltDoctorDTOs);
		return objDoctorDTO;
	}

	// jitendra 4July2019
	@RequestMapping(value = "/fetchDistrictwisePatientCountReportList", method = RequestMethod.GET)
	public @ResponseBody DistrictwisePatientCountDTO fetchDistrictwisePatientCountReportList(
			@RequestParam("year") String year, @RequestParam("month") String month, HttpServletResponse response) {
		List<DistrictwisePatientCountDTO> lDistrictwisePatientCountDTOs = new ArrayList<DistrictwisePatientCountDTO>();
		lDistrictwisePatientCountDTOs = reportService.fetchDistrictwisePatientCountReportList(year, month);
		DistrictwisePatientCountDTO districtwisePatientCountDTO = new DistrictwisePatientCountDTO();
		districtwisePatientCountDTO.setlDistrictwisePatientCountDTOs(lDistrictwisePatientCountDTOs);
		return districtwisePatientCountDTO;
	}
	//added by akshata For Get Expired Products
	@RequestMapping(value = "/getExpiredProductReport", method = RequestMethod.GET)
	public ModelAndView getExpiredProductReport(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getExpiredProductReport()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_expired_products");
		return modelAndView;
	}

	// addded by akshata 24-12-2021
	@RequestMapping(value = "/getStockCurrentWisePage", method = RequestMethod.GET)
	public ModelAndView getStockCurrentWisePage(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getStockCurrentWisePage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_current_stock_report");
		return modelAndView;
	}
	// added by Akshata for get Current Stock

	@RequestMapping(value = "/geCurrentStockReport", method = RequestMethod.POST)
	public @ResponseBody List<ReportStock> geCurrentStockReport(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		log.info("In Pharmacy geCurrentStockReport()");
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String callform = request.getParameter("callform");
		String storeName = "";
		int userData = 0;
		if (callform.equals("StoreWise")) {
			storeName = request.getParameter("userData").toString();
		} else {
			userData = Integer.parseInt(request.getParameter("userData").toString());
		}

		if (to == null)
			to = from;
		response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());
         
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=current_stock_" + currentDateTime + ".xlsx";
		List<ReportStock> reportExpiries = reportService.geCurrentStockReport(from, from, callform, userData,
				storeName,response);
	    
	    response.setHeader(headerKey, headerValue);
	 
		return reportExpiries;
	}
	//added by akshata
	//for Get Purchase Day Book Data 
	@RequestMapping(value = "/getPurchaseDayBookReportPage", method = RequestMethod.GET)
	public ModelAndView getPurchaseDayBookReportPage(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getPurchaseDayBookReportPage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_day_book_new");
		return modelAndView;
	}
	//added by akshata
		//for Get Product Batch-wise Data on Purchase Rate
	@RequestMapping(value = "/getProductWiseStockOnPurRate", method = RequestMethod.POST)
	public @ResponseBody ReportStock getProductWiseStockOnPurRate(@RequestParam("type") String type,@RequestParam("startIndex") Integer startIndex,
			HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getProductWiseStockOnPurRate()");
		List<ReportStock> reportStocks = reportService.getProductWiseStockOnPurRate(type,startIndex);
		ReportStock obj = new ReportStock();
		obj.setLstReportStock(reportStocks);
		return obj;
	}
	
	//added by Akshata For get Discount Report
	
	@RequestMapping(value = "/getPurchaseDiscountPageNew", method = RequestMethod.GET)
	public ModelAndView getPurchaseDiscountPageNew(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_discount_new");
		return modelAndView;
	}
	//added by Akshata
	@RequestMapping(value = "/getCategoriwiseReportPageNew", method = RequestMethod.GET)
	public ModelAndView getCategoriwiseReportPageNew(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_category_wies_report_new");
		return modelAndView;
	}
	//added by Akshata
	@RequestMapping(value = "/getCategoriwisedailysalereportPageNew", method = RequestMethod.GET)
	public ModelAndView getCategoriwisedailysalereportPageNew(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_daily_sales_report_store_wise_new");
		return modelAndView;
	}
	 
	//added by Akshata
	
	@RequestMapping(value = "/getCompanyListReportPageNew", method = RequestMethod.GET)
	public ModelAndView companyListPageNew(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_company_list_new");
		return modelAndView;
	}

	//Added by Akshata
	
	@RequestMapping(value = "/getAllCompanyList", method = RequestMethod.POST)
	public @ResponseBody List<ReportList> getAllCompanyList(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");
		
		from= from + " " + "00:00:00";
		to = to + " " + "00:00:00";
		System.out.println("form>>>to" + from + "" + to);

		if (to == null)
			to = from;

		List<ReportList> list = reportService.getAllCompanyList(from, to);
		return list;
	}
	
	//Added by Akshata
	@RequestMapping(value = "/getProductAllListReportPageNew", method = RequestMethod.GET)
	public ModelAndView getProductAllListReportPageNew(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_product_All_list_new");
		return modelAndView;
	}
	//Added by Akshata
	@RequestMapping(value = "/getProductListData", method = RequestMethod.POST)
	public @ResponseBody List<ReportList> getProductListData(HttpServletRequest request,
			HttpServletResponse response) {
		String from = request.getParameter("from");

		String to = request.getParameter("to");
		
		String callform = request.getParameter("callform");
		
		String userData = request.getParameter("userData");
		
		//from= from + " " + "00:00:00";
		//to = to + " " + "00:00:00";
		System.out.println("form>>>to" + from + "" + to);

		if (to == null)
			to = from;

		List<ReportList> list = reportService.getProductListData(from, to,callform,userData);
		return list;
	}
	//Added by Akshata
	@RequestMapping(value = "/getDrugListReportPage", method = RequestMethod.GET)
	public ModelAndView drugListPage(HttpServletRequest request, HttpServletResponse response) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_drug_list_new");
		return modelAndView;
	}
	
	//Added by Akshata
		@RequestMapping(value = "/getDrugListData", method = RequestMethod.POST)
		public @ResponseBody List<ReportList> getDrugListData(HttpServletRequest request,
				HttpServletResponse response) {
			String from = request.getParameter("from");

			String to = request.getParameter("to");
			
			//from= from + " " + "00:00:00";
			//to = to + " " + "00:00:00";
			System.out.println("form>>>to" + from + "" + to);

			if (to == null)
				to = from;

			List<ReportList> list = reportService.getDrugListData(from, to);
			return list;
		}
		//Added by Akshata
		@RequestMapping(value = "/getCreditListReportPage", method = RequestMethod.GET)
		public ModelAndView creditListPage(HttpServletRequest request, HttpServletResponse response) {

			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("pharma_report_credit_note_list_new");
			return modelAndView;
		}
		
		// debit note list
		//Added by Akshata
		@RequestMapping(value = "/getCreditNoteList", method = RequestMethod.POST)
		public @ResponseBody List<ReportProductWiseBatchSale> getCreditNoteList(HttpServletRequest request,
				HttpServletResponse response) {
			
			String from = request.getParameter("from");
			String to = request.getParameter("to");

			List<ReportProductWiseBatchSale> ltcreditNotes = reportService.getCreditNoteData(from, to);
			return ltcreditNotes;
		}
		
		//Added by Badrinath Wagh
		@RequestMapping(value = "/getDebitListReportPageNew", method = RequestMethod.GET)
		public ModelAndView debitListPageNew(HttpServletRequest request, HttpServletResponse response) {

			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("pharma_report_debit_note_list_new");
			return modelAndView;
		}
		
		//Added by Badrinath Wagh 
		@RequestMapping(value = "/getPartywiseDBNoteNew", method = RequestMethod.GET)
		public ModelAndView prtyWisePageNew(HttpServletRequest request, HttpServletResponse response) {

			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("pharma_partywise_note_list_report_new");
			return modelAndView;
		}
		
		//Added by Badrinath Wagh
		@RequestMapping(value = "/getCashReceiptReportPageNew", method = RequestMethod.GET)
		public ModelAndView cashRcptPageNew(HttpServletRequest request, HttpServletResponse response) {

			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("pharma_cash_receipt_report_page_new");
			return modelAndView;
		}
		
		//Added by Badrinath Wagh
		@RequestMapping(value = "/getCashPaidReportPageNew", method = RequestMethod.GET)
		public ModelAndView cashPaidPageNew(HttpServletRequest request, HttpServletResponse response) {

			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("pharma_cash_paid_report_page_new");
			return modelAndView;
		}	
		//Added by Badrinath Wagh
				@RequestMapping(value = "/getChequeReceiptReportPageNew", method = RequestMethod.GET)
				public ModelAndView chequeReceiptPageNew(HttpServletRequest request, HttpServletResponse response) {

					ModelAndView modelAndView = new ModelAndView();
					modelAndView.setViewName("pharma_cheque_receipt_report_page_new");
					return modelAndView;
		}	
		//Added by Badrinath Wagh
				@RequestMapping(value = "/getChequePaidReportPageNew", method = RequestMethod.GET)
				public ModelAndView chequePaidPageNew(HttpServletRequest request, HttpServletResponse response) {

					ModelAndView modelAndView = new ModelAndView();
					modelAndView.setViewName("pharma_cheque_paid_report_page_new");
					return modelAndView;
		}
				
				
		//added by vishant get report		
		@RequestMapping(value = "/getBatchWisePurchaseReport2", method = RequestMethod.GET)
		public @ResponseBody String getBatchWisePurchaseReport2(HttpServletRequest request, HttpServletResponse response) {

					String from = request.getParameter("from");
					String to = request.getParameter("to");
					/* String patientName = request.getParameter("patientName"); */
					String productName = request.getParameter("productName");
					/* String totalAmount = request.getParameter("totalAmount"); */
					String batchId = request.getParameter("batchId");
					String batchCode = request.getParameter("batchCode");
					String totalAmount = request.getParameter("totalAmount");

					String msg = "";

					String fromArray[] = from.split("/");
					String toArray[] = to.split("/");
					StringBuffer fromReult = new StringBuffer();
					fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

					StringBuffer toReult = new StringBuffer();
					toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

					List<ReportPurchase> reportPurchases = reportService.getBatchWisePurchaseByBatchId(fromReult.toString(),
							toReult.toString(), batchId);
					
					
					String pdfFilePath = reportService.getBatchWisePurchase2(
							reportPurchases, productName, request, fromReult.toString(),
							toReult.toString(), batchCode, totalAmount);
					//reportService.getBatchWisePurchaseReport2();

					
					return pdfFilePath;
				}
		
		//added by vishant
				//for Get Product Batch-wise Data on Purchase Rate
			@RequestMapping(value = "/getProductWiseStockOnPurRate2", method = RequestMethod.POST)
			public @ResponseBody ReportStock2 getProductWiseStockOnPurRate2(@RequestParam("type") String type,@RequestParam("startIndex") Integer startIndex,
					HttpServletRequest request, HttpServletResponse response) {
				log.info("In Pharmacy getProductWiseStockOnPurRate()");
				List<ReportStock2> reportStocks = reportService.getProductWiseStockOnPurRate2(type,startIndex);
				ReportStock2 obj = new ReportStock2();
				obj.setLstReportStock(reportStocks);
				return obj;
			}
			
			@RequestMapping(value = "/getProductIdWiseStockReport2", method = RequestMethod.POST)
			public @ResponseBody String getProductWiseStockReport2(@RequestParam("productId") Integer productId,
					HttpServletRequest request, HttpServletResponse response) {

				String productName = request.getParameter("productName");
				String totalAmount = request.getParameter("totalAmount");
				String totalStock = request.getParameter("totalStock");
				

				List<ReportStock> reportStocks = reportService.getProductWiseStockByProductId(productId);
				//String msg = "";

				

				String msg = "";

				String pdfFilePath = objReportModel.getProductIdWiseStockReport(reportStocks, request, productName,
						totalAmount,totalStock);

				if (!pdfFilePath.equals("")) {
					msg = pdfFilePath;
				} else {

					msg = "pdf path->" + pdfFilePath + " Oops some problem occured while Generating Report";
				}

				return msg;
			}
			//added by vishant
			@RequestMapping(value = "/getCompanyWiseStockReport2", method = RequestMethod.POST)
			public @ResponseBody String getCompanyWiseStockReport2(@RequestParam("companyId") Integer companyId,
					HttpServletRequest request, HttpServletResponse response) {

				String companyName = request.getParameter("companyName");
				String totalAmount = request.getParameter("totalAmount");
				System.out.println("Company name is" + companyName);
				List<ReportStock> reportStocks = reportService.getCompanyWiseStockByCompanyId(companyId);
				//String msg = "";
				
				  
				  
				  String msg = "";
				  
				  String pdfFilePath = objReportModel.getCompanyWiseStockReport(reportStocks,
				  request, companyName, totalAmount);
				  
				  if (!pdfFilePath.equals("")) { msg = pdfFilePath; } else {
				  
				  msg = "pdf path->" + pdfFilePath +
				  " Oops some problem occured while Generating Report"; }
				 
				return msg;
			}
			
			@RequestMapping(value = "/getProductWiseStock", method = RequestMethod.POST)
			public @ResponseBody
			List<ReportStock> getProductWiseStock(@RequestParam("type") String type,
					HttpServletRequest request, HttpServletResponse response) {

				List<ReportStock> reportStocks = reportService
						.getProductWiseStock(type);
				return reportStocks;
			}
			
			//addded by vishant
			@RequestMapping(value = "/getReceivedMRNReport", method = RequestMethod.GET)
			public ModelAndView getReceivedMRNReport(HttpServletRequest request,
					HttpServletResponse response) {

				ModelAndView modelAndView = new ModelAndView();
				modelAndView.setViewName("pharma_received_mrn_report");
				return modelAndView;
			}
			
			//addded by vishant
			@RequestMapping(value = "/getPendingMRNReport", method = RequestMethod.GET)
			public ModelAndView getPendingMRNReport(HttpServletRequest request,
					HttpServletResponse response) {

				ModelAndView modelAndView = new ModelAndView();
				modelAndView.setViewName("pharma_pending_mrn_report");
				return modelAndView;
			}
			
			//addded by vishant
			@RequestMapping(value = "/getReceivedMRNReportData", method = RequestMethod.GET)
			public @ResponseBody MrnReportDetail getReceivedMRNReportData(HttpServletRequest request) {
				
				MrnReportDetail mrnReportDetail =  reportService.getReceivedMRNReportData(request);

				return mrnReportDetail;
			}
			
			//addded by vishant
			@RequestMapping(value = "/getPendingMRNReportData", method = RequestMethod.GET)
			public @ResponseBody MrnReportDetail getPendingMRNReportData(HttpServletRequest request) {

				MrnReportDetail mrnReportDetail =  reportService.getPendingMRNReportData(request);
				return mrnReportDetail;
			}
			
			//added by vishant
			@RequestMapping(value = "/getCreditNoteDetailsAll", method = RequestMethod.GET)
			public @ResponseBody List<CreditNoteDetailsReportDTO> getCreditNoteDetailsAll(
					HttpServletRequest request, HttpServletResponse response) {
				String from = request.getParameter("from");
				String to = request.getParameter("to");
				/* String patientName = request.getParameter("patientName"); */

				/*
				 * String msg = "";
				 * 
				 * String fromArray[] = from.split("/"); String toArray[] = to.split("/");
				 * StringBuffer fromReult = new StringBuffer(); fromReult =
				 * fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);
				 * 
				 * StringBuffer toReult = new StringBuffer(); toReult =
				 * toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
				 */

				List<CreditNoteDetailsReportDTO> productWiseBatchSales = reportService.getCreditNoteDetailsAll(from, to);

				return productWiseBatchSales;
			}
			
			@RequestMapping(value = "/getAllIndentSalePatientHeader", method = RequestMethod.GET)
			public @ResponseBody List<ReportIndentSaleDetails> getAllIndentSalePatientHeader(
					@RequestParam("hiddenPatientId") Integer patientId, HttpServletRequest request,
					HttpServletResponse response) {
				String from = request.getParameter("from");
				String to = request.getParameter("to");

				String msg = "";

				String fromArray[] = from.split("/");
				String toArray[] = to.split("/");
				StringBuffer fromReult = new StringBuffer();
				fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

				StringBuffer toReult = new StringBuffer();
				toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

				List<ReportIndentSaleDetails> productWiseBatchSales = reportService.getAllIndentSalePatientHeader(patientId,
						fromReult.toString(), toReult.toString());

				return productWiseBatchSales;
			}
				
}     

