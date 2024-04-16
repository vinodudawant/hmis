package com.hms.ehat.controller;




import java.sql.Date;
import java.util.ArrayList;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.service.ReportDashboardService;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;

@Controller
@RequestMapping(value = "/reportdashboard")
public class ReportDashboardController {

	@Autowired
	ReportDashboardService reportDashboardService;

	/**
	 * @author :Bilal
	 * @date :22-Aug-2017
	 * @code :for fetching list of opd amount from bill receipt master
	 **/

	@RequestMapping(value = "/getlistOfReceipt", method = RequestMethod.POST)
	public @ResponseBody
	BillReceiptMasterDTO getlistOfPackageOpd() {
		List<BillReceiptMasterDTO> listopdAmount = new ArrayList<BillReceiptMasterDTO>();
		listopdAmount = (List<BillReceiptMasterDTO>) reportDashboardService
				.getlistOfPackageOpd();

		BillReceiptMasterDTO obj = new BillReceiptMasterDTO();
		obj.setListBillReceiptMaster(listopdAmount);

		return obj;

	}
	
	/**
	 * @author   :Bilal 
	 * @date     :22_JUN_2017 
	 * @code     :for getting total amount of paid from billreceipt masters opd 
	 * 23/08/2017
	 * @RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate,
	 * **/
	@RequestMapping(value = "/getTotalAmountOfOPD", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalAmountOfOPD(@RequestParam("callfrom") String callfrom,
                @RequestParam("datecallfrom") String datecallfrom) {

		        double a = reportDashboardService.getTotalAmountOfOPD(callfrom,
				           datecallfrom);

		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :22_JUN_2017 
	 * @code     :for getting total amount of paid from billreceipt masters ipd 
	 * 
	 * **/
	@RequestMapping(value = "/getTotalAmountOfIPD", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalAmountOfIPD(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom) {
		double a = reportDashboardService
				.getTotalAmountOfIPD(callfrom,datecallfrom);
		
		return a;
	}
	

	/**
	 * @author   :Bilal 
	 * @date     :23_JUN_2017 
	 * @code     :for getting Refund amount of opd 
	 * 
	 * **/
	@RequestMapping(value = "/getTotalRefundAmountOfOPD", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalRefundAmountOfOPD(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom) {
		double a = reportDashboardService
				.getTotalRefundAmountOfOPD(callfrom,datecallfrom);
		
		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :22_JUN_2017 
	 * @code     :for getting Refund amount of ipd 
	 * 
	 * **/
	@RequestMapping(value = "/getTotalRefundAmountOfIPD", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalRefundAmountOfIPD(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom) {
		double a = reportDashboardService
				.getTotalRefundAmountOfIPD(callfrom,datecallfrom);
		
		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :23_JUN_2017 
	 * @code     :for getting Total amount based on from date and to date opd
	 * **/
	@RequestMapping(value = "/getTotalAmountDateWise", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalAmountDateWiseOPD(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		double a = reportDashboardService
				.getTotalAmountDateWiseOPD(callfrom,datecallfrom,fromDate,toDate);
		
		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :23_JUN_2017 
	 * @code     :for getting Total amount based on from date and to date ipd
	 * **/
	@RequestMapping(value = "/getTotalAmountDateWiseIPD", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalAmountDateWiseIPD(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		double a = reportDashboardService
				.getTotalAmountDateWiseIPD(callfrom,datecallfrom,fromDate,toDate);
		
		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :23_JUN_2017 
	 * @code     :for OPD Refund From Date to Todate
	 * **/
	@RequestMapping(value = "/getTotalRefundAmtDateWise", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalRefundAmtDateWise(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		double a = reportDashboardService
				.getTotalRefundAmtDateWise(callfrom,datecallfrom,fromDate,toDate);
		
		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :23_JUN_2017 
	 * @code     :for IPD Refund From Date to Todate
	 * **/
	@RequestMapping(value = "/getTotalRefundAmtDateWiseIPD", method = RequestMethod.POST)
	public @ResponseBody
	double getTotalRefundAmtDateWiseIPD(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		double a = reportDashboardService
				.getTotalRefundAmtDateWiseIPD(callfrom,datecallfrom,fromDate,toDate);
		
		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :24_JUN_2017 
	 * @code     :for getting total opd patients 
	 * **/
	@RequestMapping(value = "/getTotalPatientOPD", method = RequestMethod.POST)
	public @ResponseBody
	Long getTotalPatientOPD(@RequestParam("callfrom") String callfrom,
                @RequestParam("datecallfrom") String datecallfrom) {

		Long a = reportDashboardService.getTotalPatientOPD(callfrom,
				           datecallfrom);

		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :24_JUN_2017 
	 * @code     :for getting total ipd patients 
	 * **/
	@RequestMapping(value = "/getTotalPatientIPD", method = RequestMethod.POST)
	public @ResponseBody
	Long getTotalPatientIPD(@RequestParam("callfrom") String callfrom,
                @RequestParam("datecallfrom") String datecallfrom) {

		Long a = reportDashboardService.getTotalPatientIPD(callfrom,
				           datecallfrom);

		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :24_JUN_2017 
	 * @code     :for getting total Diagnostics patients 
	 * **/
	@RequestMapping(value = "/getTotalPatientDiagnostics", method = RequestMethod.POST)
	public @ResponseBody
	Long getTotalPatientDiagnostics(@RequestParam("callfrom") String callfrom,
                @RequestParam("datecallfrom") String datecallfrom) {

		Long a = reportDashboardService.getTotalPatientDiagnostics(callfrom,
				           datecallfrom);

		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :25_JUN_2017 
	 * @code     :for oPD total patient from date to date
	 * **/
	@RequestMapping(value = "/getTotalPatientOPDDatewise", method = RequestMethod.POST)
	public @ResponseBody
	Long getTotalPatientOPDDatewise(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		Long a = reportDashboardService
				.getTotalPatientOPDDatewise(callfrom,datecallfrom,fromDate,toDate);
		
		return a;
	}
	
	/**
	 * @author   :Bilal 
	 * @date     :25_JUN_2017 
	 * @code     :for IPD total patient from date to date
	 * **/
	@RequestMapping(value = "/getTotalPatientIPDDatewise", method = RequestMethod.POST)
	public @ResponseBody
	Long getTotalPatientIPDDatewise(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		Long a = reportDashboardService
				.getTotalPatientIPDDatewise(callfrom,datecallfrom,fromDate,toDate);
		
		return a;
	}
	/**
	 * @author   :Bilal 
	 * @date     :28_JUN_2017 
	 * @code     :for Diagnostics total patient from date to date
	 * **/
	@RequestMapping(value = "/getTotalPatientDiagnosticsDatewise", method = RequestMethod.POST)
	public @ResponseBody
	Long getTotalPatientDiagnosticsDatewise(@RequestParam("callfrom") String callfrom,
			@RequestParam("datecallfrom") String datecallfrom,
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate) {
		Long a = reportDashboardService
				.getTotalPatientDiagnosticsDatewise(callfrom,datecallfrom,fromDate,toDate);
		
		return a;
	}
	
}
