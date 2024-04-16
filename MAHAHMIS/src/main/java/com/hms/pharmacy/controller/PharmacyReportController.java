package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.PharmacyReportService;

@Controller
@RequestMapping(value = "/pharmacyReport")
public class PharmacyReportController {
	
	@Autowired
	PharmacyReportService pharmacyReportService;
	
	static Logger log=Logger.getLogger(PharmacyReportController.class.getName());
	
	
	/*****
	 * @author :Akshata Desai
	 * @Code :For supplier List
	 *****/
	@RequestMapping(value = "/getSupplierListReportPage", method = RequestMethod.GET)
	public ModelAndView getSupplierListReportPage(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getSupplierListReportPage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_supplier_list");
		return modelAndView;
	}
	
	
	/******
	 * @author :Akshata Desai
	 * @Code :For getting list of vendor name
	 ******/
	@RequestMapping(value = "/getSupplierListReport", method = RequestMethod.GET)
	public @ResponseBody VendorMaster getSupplierListReport(@RequestParam("from") String fromDate,
			@RequestParam("to") String toDate) {
		log.info("In Pharmacy getSupplierListReport()");
		List<VendorMaster> ltvendor = new ArrayList<VendorMaster>();
		ltvendor = pharmacyReportService.getSupplierListReport(fromDate, toDate);
		VendorMaster obj = new VendorMaster();
		obj.setLstvendors(ltvendor);

		return obj;

	}
	
	/*****
	 * @author :Akshata Desai
	 * @Code :For Drug master List
	 *****/
	@RequestMapping(value = "/getmasterListReportPage", method = RequestMethod.GET)
	public ModelAndView getmasterListReportPage(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getmasterListReportPage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_drugmaster_list");
		return modelAndView;
	}
	
	
	/******
	 * @author :Akshata Desai
	 * @Code :For getting list of vendor name
	 ******/
	@RequestMapping(value = "/getproductData", method = RequestMethod.GET)
	public @ResponseBody ProductMaster getproductData(@RequestParam("from") String fromDate,
			@RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId) {
		log.info("In Pharmacy getproductData()");
		List<ProductMaster> ltp = new ArrayList<ProductMaster>();
		ltp = pharmacyReportService.getproductData(fromDate, toDate, categoryId, companyId, ProductId);
		ProductMaster obj = new ProductMaster();
		obj.setLstprod(ltp);

		return obj;

	}
	
	
	/****
	 * @author :Akshata
	 * @Code :For purchase details reports
	 *****/
	@RequestMapping(value = "/getpurchaseDetails", method = RequestMethod.GET)
	public ModelAndView getpurchaseDetails(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getpurchaseDetails()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_purchase_details");
		return modelAndView;
	}

	/****
	 * @author :Akshata Desai
	 * @Code :For getting list of purchase details
	 *****/
	@RequestMapping(value = "/getpurchaseData", method = RequestMethod.GET)
	public @ResponseBody List<ReportData> getpurchaseData(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("from") String fromDate, @RequestParam("to") String toDate,

			@RequestParam("hiddencategoryId") int categoryId, @RequestParam("hiddencompanyId") int companyId,
			@RequestParam("hiddenProductId") int ProductId, @RequestParam("hiddenvendorId") int vendortId,
			@RequestParam("unitId") int unitId, @RequestParam("paytype") String purtranstype) {
		log.info("In Pharmacy getpurchaseData()");
		List<ReportData> reportPurchases = pharmacyReportService.getpurchaseData(request, fromDate, toDate, categoryId,
				companyId, ProductId, vendortId, unitId, purtranstype);
		return reportPurchases;
	}

	
	/*****
	 * @author :Akshata Desai
	 * @Code :For supplier List
	 *****/
	@RequestMapping(value = "/getAllPatientSalesTotalPage", method = RequestMethod.GET)
	public ModelAndView getAllPatientSalesTotalPage(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getAllPatientSalesTotalPage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_get_all_patient_sales_total_list");
		return modelAndView;
	}
	
	/*****
	 * @author :Akshata Desai
	 * @Code :For supplier List
	 *****/
	@RequestMapping(value = "/getTotalPatientData", method = RequestMethod.POST)
	public @ResponseBody List<ReportData> getTotalPatientData(HttpServletRequest request,
			HttpServletResponse response) {
		log.info("In Pharmacy getTotalPatientData()");
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportData> reportPurchases = pharmacyReportService.getTotalPatientData(fromReult.toString(),
				toReult.toString());
		return reportPurchases;
	}
	
	/*****
	 * @author :Akshata Desai
	 * @Code :For Cancel indent List
	 *****/
	@RequestMapping(value = "/getCancelIndentPage", method = RequestMethod.GET)
	public ModelAndView getCancelIndentPage(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getCancelIndentPage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_cancel_indent_new");
		return modelAndView;
	}
	
	/*****
	 * @author :Akshata Desai
	 * @Code :For Cancel indent List
	 *****/
	@RequestMapping(value = "/getCancelIndentList", method = RequestMethod.POST)
	public @ResponseBody List<ReportData> getCancelIndentDetails(HttpServletRequest request,
			HttpServletResponse response) {
		log.info("In Pharmacy getCancelIndentPage()");
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);

		List<ReportData> productWiseBatchSales = pharmacyReportService
				.getCancelIndentDetails(fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}

	/*****
	 * @author :Akshata Desai
	 * @Code :For Cancel indent List
	 *****/
	@RequestMapping(value = "/getPatientLedgerReportPage", method = RequestMethod.GET)
	public ModelAndView getPatientLedger(HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getPatientLedgerReportPage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_patient_ledger_new");
		return modelAndView;
	}
	
	/*****
	 * @author :Akshata Desai
	 * @Code :For patient List
	 *****/
	@RequestMapping(value = "/autoSuggestionPatientlist", method = RequestMethod.GET)
	public @ResponseBody
	IpdGenFinalBillDTO autoSuggestationGeneralBillPatients(@RequestParam("letter") String letter)
		 {
		
		List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = new ArrayList<IpdGenFinalBillDTO>();
		ltIpdBillPatientsDTO = pharmacyReportService.autoSuggestationGeneralBillPatients(letter);		
		IpdGenFinalBillDTO obj=new IpdGenFinalBillDTO();
		obj.setLstIpdbillPatients(ltIpdBillPatientsDTO);
		return obj;		
	}
	
	@RequestMapping(value = "/getPatientSaleDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId,
			HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getPatientSaleDetailsByPatientId()");
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-"
				+ fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-"
				+ toArray[0]);

		List<ReportCreditNoteDetails> productWiseBatchSales = pharmacyReportService
				.getPatientSaleDetailsByPatientId(patientId,
						fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}
	
	
	@RequestMapping(value = "/getSettleBillByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<ReportCreditNoteDetails> getSettleBillDetailsByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId,
			HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getSettleBillByPatientId()");
		String from = request.getParameter("from");
		String to = request.getParameter("to");

		String msg = "";

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[0] + "-" + fromArray[1] + "-"
				+ fromArray[2]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[0] + "-" + toArray[1] + "-"
				+ toArray[2]);

		List<ReportCreditNoteDetails> productWiseBatchSales = pharmacyReportService
				.getSettleBillDetailsByPatientId(patientId,
						fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}
	
	@RequestMapping(value = "/getIndentSaleDetailsByPatientId", method = RequestMethod.GET)
	public @ResponseBody
	List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(
			@RequestParam("hiddenPatientId") Integer patientId,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-"
				+ fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-"
				+ toArray[0]);

		List<ReportIndentSaleDetails> productWiseBatchSales = pharmacyReportService
				.getIndentSaleDetailsByPatientId(patientId,
						fromReult.toString(), toReult.toString());

		return productWiseBatchSales;
	}
	
	@RequestMapping(value = "/getSalesProductBatchReportPage", method = RequestMethod.GET)
	public ModelAndView saleProductBatchwiseListPage(
			HttpServletRequest request, HttpServletResponse response) {
		log.info("In Pharmacy getSalesProductBatchReportPage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("pharma_report_sales_product_batch_new");
		return modelAndView;
	}
	
	@RequestMapping(value = "/getProductWiseBatchList", method = RequestMethod.GET)
	public @ResponseBody
	List<ReportData> productWiseBatchList(
			@RequestParam("productId") Integer productId,@RequestParam("saleTye") String saleTye,
			HttpServletRequest request, HttpServletResponse response) {
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		

		String fromArray[] = from.split("/");
		String toArray[] = to.split("/");
		StringBuffer fromReult = new StringBuffer();
		fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-"
				+ fromArray[0]);

		StringBuffer toReult = new StringBuffer();
		toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-"
				+ toArray[0]);

		List<ReportData> productWiseBatchSales = pharmacyReportService
				.getProductWiseBatchList(productId, fromReult.toString(),
						toReult.toString(),saleTye);

		return productWiseBatchSales;
	}
	
}
