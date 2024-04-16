package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.ChequeReceiptMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.ChequeReceiptEntryService;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.PurchaseService;

@Controller
@RequestMapping(value = "/chequeReceiptEntry")
public class ChequeReceiptController {
	@Autowired
	PurchaseService purchaseSevice;

	@Autowired
	ChequeReceiptEntryService chequeReceiptEntryService;
	
	@Autowired
	CommonService commonService; 

	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getChequeView(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("chequeReceiptEntry", new ChequeReceiptMaster());
			List<ChequeReceiptMaster> ltChequeMasters = new ArrayList<ChequeReceiptMaster>();
			ltChequeMasters = chequeReceiptEntryService.getCheques();
			modelAndView.addObject("ltChequeMasters", ltChequeMasters);
			modelAndView.setViewName("Pharma_Cheque_Receipt_Entry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateChequeReceiptEntry(
			@ModelAttribute("ChequeReceiptMasterForm") ChequeReceiptMaster chequeReceiptMaster) {
		ModelAndView modelAndView = new ModelAndView();

		if (chequeReceiptEntryService
				.saveOrUpdateChequeReceiptEntry(chequeReceiptMaster)) {
			if (chequeReceiptMaster.getChequeReceiptId() != null) {
			/*	modelAndView.addObject("success",
						"Record saved successfully..!");*/
			} else {
				/*modelAndView.addObject("success",
						"Record updated successfully..!");
*/			}
		} else {
		/*	modelAndView.addObject("error", "Oops! Something went wrong..!");*/
		}
		
		ChequeReceiptMaster billMaster = new ChequeReceiptMaster();
		if (chequeReceiptMaster.getChequeReceiptId() != null) {
			try {
				billMaster = chequeReceiptEntryService
						.getChequeReceiptDataSaleById(chequeReceiptMaster
								.getChequeReceiptId());
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<ChequeReceiptMaster> saleBillMasters = new ArrayList<ChequeReceiptMaster>();
			saleBillMasters.add(billMaster);

			modelAndView.addObject("chequeReceiptData", saleBillMasters);
			modelAndView.setViewName("Pharma_Cheque_Receipt_Bill");
		}
				
		/*modelAndView.setViewName("redirect:/pharmacy/chequeReceiptEntry/view");*/
		return modelAndView;
	}

	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("chequeId") Integer cheueReceiptId) {
		ModelAndView modelAndView = new ModelAndView();
		ChequeReceiptMaster billMaster = new ChequeReceiptMaster();

		try {
			billMaster = chequeReceiptEntryService
					.getChequeReceiptDataSaleById(cheueReceiptId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<ChequeReceiptMaster> saleBillMasters = new ArrayList<ChequeReceiptMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("chequeReceiptData", saleBillMasters);
		modelAndView.setViewName("Pharma_Cheque_Receipt_Bill");
		return modelAndView;

	}
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public @ResponseBody Boolean deleteChequeReceipt(
			@RequestParam("chequeReceiptId") Integer chequeId) {
		Boolean flag = false;
		if (chequeReceiptEntryService.deleteCheque(chequeId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/chequeReceiptList", method = RequestMethod.GET)
	public @ResponseBody List<ChequeReceiptMaster> getChequeList() {
		List<ChequeReceiptMaster> ltChequeMasters = new ArrayList<ChequeReceiptMaster>();
		ltChequeMasters = chequeReceiptEntryService.getCheques();
		return ltChequeMasters;
	}

	@RequestMapping(value = "/getChequeById", method = RequestMethod.GET)
	public @ResponseBody List<ChequeReceiptMaster> getChequeById(
			@RequestParam("chequeReceiptId") Integer chequeReceiptId) {
		List<ChequeReceiptMaster> ltChequeMasters = new ArrayList<ChequeReceiptMaster>();
		ltChequeMasters = chequeReceiptEntryService.getChequeById(chequeReceiptId);
		return ltChequeMasters;
	}

	@RequestMapping(value = "/getChequebyVendorId", method = RequestMethod.GET)
	public @ResponseBody List<ChequeReceiptMaster> getChequebyVendorId(
			@RequestParam("vendorId") Integer vendorId) {
		List<ChequeReceiptMaster> ltChequeMaster = new ArrayList<ChequeReceiptMaster>();
		ltChequeMaster = chequeReceiptEntryService.getChequebyVendorId(vendorId);
		return ltChequeMaster;
	}
////get autosuggetion only those product whos bill num is same
	@RequestMapping(value = "/autoSuggestionByBranch", method = RequestMethod.GET)
	public @ResponseBody
	List<BankMaster> autoSuggestionBranch(
			@RequestParam("letter") String letter, @RequestParam("bankName") String bankName) {

		List<BankMaster> productMasters = chequeReceiptEntryService
				.getAutoSuggestionBranch(letter,bankName);
		return productMasters;
	}
}
