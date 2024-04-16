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
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.ChequeReceiptMaster;
import com.hms.pharmacy.pojo.ChequeReceiptSaleMaster;
import com.hms.pharmacy.service.ChequeReceiptSaleService;
import com.hms.pharmacy.service.CommonService;

@Controller
@RequestMapping(value = "/chequeReceiptPatientSale")
public class ChequeReceiptSaleController {
	
	@Autowired
	ChequeReceiptSaleService chequeReceiptSaleService;
	
	@Autowired
	CommonService commonService; 

	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getChequeView(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("chequeReceiptPatientSale", new ChequeReceiptSaleMaster());
			List<ChequeReceiptSaleMaster> ltChequeReceiptSaleMasters = new ArrayList<ChequeReceiptSaleMaster>();
			ltChequeReceiptSaleMasters = chequeReceiptSaleService.getCheques();
			modelAndView.addObject("ltChequeReceiptSaleMasters", ltChequeReceiptSaleMasters);
			modelAndView.setViewName("Pharma_Cheque_Receipt_Sale_Entry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}

				
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateChequeReceiptEntry(
			@ModelAttribute("ChequeReceiptSaleMasterForm") ChequeReceiptSaleMaster chequeReceiptSaleMaster) {
		ModelAndView modelAndView = new ModelAndView();

		if (chequeReceiptSaleService
				.saveOrUpdateChequeReceiptEntry(chequeReceiptSaleMaster)) {
			if (chequeReceiptSaleMaster.getChequeReceiptSaleId()!= null) {
			/*	modelAndView.addObject("success",
						"Record saved successfully..!");*/
			} else {
				/*modelAndView.addObject("success",
						"Record updated successfully..!");
*/			}
		} else {
			/*modelAndView.addObject("error", "Oops! Something went wrong..!");*/
		}
		ChequeReceiptSaleMaster billMaster = new ChequeReceiptSaleMaster();
		if (chequeReceiptSaleMaster.getChequeReceiptSaleId() != null) {
			try {
				billMaster = chequeReceiptSaleService
						.getChequeReceiptDataSaleById(chequeReceiptSaleMaster
								.getChequeReceiptSaleId());
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<ChequeReceiptSaleMaster> saleBillMasters = new ArrayList<ChequeReceiptSaleMaster>();
			saleBillMasters.add(billMaster);

			modelAndView.addObject("chequeReceiptDataSale", saleBillMasters);
			modelAndView.setViewName("Pharma_Cheque_Receipt_Sale_Bill");
		}
		
		/*modelAndView.setViewName("redirect:/pharmacy/chequeReceiptPatientSale/view");*/
		return modelAndView;
	}

	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("chequeReceiptSaleId") Integer chequeReceiptSaleId) {
		ModelAndView modelAndView = new ModelAndView();
		ChequeReceiptSaleMaster billMaster = new ChequeReceiptSaleMaster();

		try {
			billMaster = chequeReceiptSaleService
					.getChequeReceiptDataSaleById(chequeReceiptSaleId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<ChequeReceiptSaleMaster> saleBillMasters = new ArrayList<ChequeReceiptSaleMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("chequeReceiptDataSale", saleBillMasters);
		modelAndView.setViewName("Pharma_Cheque_Receipt_Sale_Bill");
		return modelAndView;

	}
		
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public @ResponseBody Boolean deleteChequeReceipt(
			@RequestParam("chequeReceiptSaleId") Integer chequeId) {
		Boolean flag = false;
		if (chequeReceiptSaleService.deleteCheque(chequeId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/chequeReceiptList", method = RequestMethod.GET)
	public @ResponseBody List<ChequeReceiptSaleMaster> getChequeList() {
		List<ChequeReceiptSaleMaster> ltChequeMasters = new ArrayList<ChequeReceiptSaleMaster>();
		ltChequeMasters = chequeReceiptSaleService.getCheques();
		return ltChequeMasters;
	}

	@RequestMapping(value = "/getChequeById", method = RequestMethod.GET)
	public @ResponseBody List<ChequeReceiptSaleMaster> getChequeById(
			@RequestParam("chequeReceiptSaleId") Integer chequeReceiptId) {
		List<ChequeReceiptSaleMaster> ltChequeMasters = new ArrayList<ChequeReceiptSaleMaster>();
		ltChequeMasters = chequeReceiptSaleService.getChequeById(chequeReceiptId);
		return ltChequeMasters;
	}

	@RequestMapping(value = "/getChequebyPatientId", method = RequestMethod.GET)
	public @ResponseBody List<ChequeReceiptSaleMaster> getChequebyVendorId(
			@RequestParam("patientId") Integer vendorId) {
		List<ChequeReceiptSaleMaster> ltChequeMaster = new ArrayList<ChequeReceiptSaleMaster>();
		ltChequeMaster = chequeReceiptSaleService.getChequebyPatientId(vendorId);
		return ltChequeMaster;
	}
////get autosuggetion only those product whos bill num is same
	@RequestMapping(value = "/autoSuggestionByBranch", method = RequestMethod.GET)
	public @ResponseBody
	List<BankMaster> autoSuggestionBranch(
			@RequestParam("letter") String letter, @RequestParam("bankName") String bankName) {

		List<BankMaster> productMasters = chequeReceiptSaleService
				.getAutoSuggestionBranch(letter,bankName);
		return productMasters;
	}
}
