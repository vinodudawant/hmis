package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.CashReceiptEntryService;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PurchaseService;

@Controller
@RequestMapping(value = "/cashReceiptEntry")
public class CashReceiptController {
	@Autowired
	PurchaseService purchaseSevice;

	@Autowired
	CashReceiptEntryService cashReceiptEntryService;
	
	@Autowired
	CommonService commonService;

	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getPurchaseLIst(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			List<PurchaseMaster> ltPurchaseMasters = purchaseSevice.getPurchases();
			modelAndView.addObject("ltPurchaseMasters", ltPurchaseMasters);
			modelAndView.setViewName("Pharma_Cash_Receipt_Entry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCashView(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("cashReceiptEntry", new CashReceiptMaster());
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			List<CashReceiptMaster> ltCashMasters = new ArrayList<CashReceiptMaster>();
			ltCashMasters = cashReceiptEntryService.getCashs();
			modelAndView.addObject("ltCashMasters", ltCashMasters);

			modelAndView.setViewName("Pharma_Cash_Receipt_Entry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}

		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateCashReceiptEntry(
			@ModelAttribute("CashReceiptMasterForm") CashReceiptMaster cashReceiptMaster) {
		ModelAndView modelAndView = new ModelAndView();

		if (cashReceiptEntryService
				.saveOrUpdateCashReceiptEntry(cashReceiptMaster)) {
			if (cashReceiptMaster.getCashReceiptId() != null) {
				/*modelAndView.addObject("success",
						"Record saved successfully..!");*/
			} else {
			/*	modelAndView.addObject("success",
						"Record updated successfully..!");*/
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
	CashReceiptMaster billMaster = new CashReceiptMaster();
		if (cashReceiptMaster.getCashReceiptId() != null) {
			try {
				billMaster = cashReceiptEntryService
						.getCashReceiptDataById(cashReceiptMaster
								.getCashReceiptId());
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<CashReceiptMaster> saleBillMasters = new ArrayList<CashReceiptMaster>();
			saleBillMasters.add(billMaster);

			modelAndView.addObject("cashReceiptData", saleBillMasters);
			modelAndView.setViewName("Pharma_Cash_Receipt_Bill");
		}
	/*	modelAndView.setViewName("redirect:/pharmacy/cashReceiptEntry/view");*/
		return modelAndView;
	}

	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("cashId") Integer cashReceiptId) {
		ModelAndView modelAndView = new ModelAndView();
		CashReceiptMaster billMaster = new CashReceiptMaster();

		try {
			billMaster = cashReceiptEntryService
					.getCashReceiptDataById(cashReceiptId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<CashReceiptMaster> saleBillMasters = new ArrayList<CashReceiptMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("cashReceiptData", saleBillMasters);
		modelAndView.setViewName("Pharma_Cash_Receipt_Bill");
		return modelAndView;

	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public @ResponseBody Boolean deleteCashReceipt(
			@RequestParam("cashReceiptId") Integer cashId) {
		Boolean flag = false;
		if (cashReceiptEntryService.deleteCash(cashId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/cashReceiptList", method = RequestMethod.GET)
	public @ResponseBody List<CashReceiptMaster> getCashList() {
		List<CashReceiptMaster> ltCashMasters = new ArrayList<CashReceiptMaster>();
		ltCashMasters = cashReceiptEntryService.getCashs();
		return ltCashMasters;
	}

	@RequestMapping(value = "/getCashById", method = RequestMethod.GET)
	public @ResponseBody List<CashReceiptMaster> getCashById(
			@RequestParam("cashReceiptId") Integer cashReceiptId) {
		List<CashReceiptMaster> ltCashMasters = new ArrayList<CashReceiptMaster>();
		ltCashMasters = cashReceiptEntryService.getCashById(cashReceiptId);
		return ltCashMasters;
	}

	@RequestMapping(value = "/getCashbyVendorId", method = RequestMethod.GET)
	public @ResponseBody List<CashReceiptMaster> getCashbyVendorId(
			@RequestParam("vendorId") Integer vendorId,@RequestParam("vendorAddId") Integer vendorAddId) {
		List<CashReceiptMaster> ltCashMaster = new ArrayList<CashReceiptMaster>();
		ltCashMaster = cashReceiptEntryService.getCashbyVendorId(vendorId,vendorAddId);
		return ltCashMaster;
	}

}
