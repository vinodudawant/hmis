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

import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CashReceiptSaleMaster;
import com.hms.pharmacy.service.CashReceiptSaleService;
import com.hms.pharmacy.service.CommonService;

@Controller
@RequestMapping(value = "/cashReceiptPatientSale")
public class CashReceiptSaleController 
{
	@Autowired
	CashReceiptSaleService cashReceiptEntrySaleService;
	
	@Autowired
	CommonService commonService;

	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCashView(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("cashReceiptPatientSale", new CashReceiptSaleMaster());
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			List<CashReceiptSaleMaster> ltCashReceiptSaleMasters = new ArrayList<CashReceiptSaleMaster>();
			ltCashReceiptSaleMasters = cashReceiptEntrySaleService.getCashs();
			modelAndView.addObject("ltCashReceiptSaleMasters", ltCashReceiptSaleMasters);
			modelAndView.setViewName("Pharma_Cash_Receipt_Sale");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}

		
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateCashReceiptEntry(
			@ModelAttribute("CashReceiptSaleMasterForm") CashReceiptSaleMaster cashReceiptSaleMaster) {
		ModelAndView modelAndView = new ModelAndView();

		if (cashReceiptEntrySaleService
				.saveOrUpdateCashReceiptEntry(cashReceiptSaleMaster)) {
			if (cashReceiptSaleMaster.getCashReceiptSaleId() != null) {
				/*modelAndView.addObject("success",
						"Record saved successfully..!");*/
			} else {
				/*modelAndView.addObject("success",
						"Record updated successfully..!");
*/			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		CashReceiptSaleMaster billMaster = new CashReceiptSaleMaster();
		if (cashReceiptSaleMaster.getCashReceiptSaleId() != null) {
			try {
				billMaster = cashReceiptEntrySaleService
						.getCashReceiptDataSaleById(cashReceiptSaleMaster
								.getCashReceiptSaleId());
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<CashReceiptSaleMaster> saleBillMasters = new ArrayList<CashReceiptSaleMaster>();
			saleBillMasters.add(billMaster);

			modelAndView.addObject("cashReceiptDataSale", saleBillMasters);
			modelAndView.setViewName("Pharma_Cash_Receipt_Sale_Bill");
		}
		/*	modelAndView.setViewName("redirect:/pharmacy/cashReceiptPatientSale/view");*/
		return modelAndView;
	}

	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("cashSaleId") Integer cashReceiptId) {
		ModelAndView modelAndView = new ModelAndView();
		CashReceiptSaleMaster billMaster = new CashReceiptSaleMaster();

		try {
			billMaster = cashReceiptEntrySaleService
					.getCashReceiptDataSaleById(cashReceiptId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<CashReceiptSaleMaster> saleBillMasters = new ArrayList<CashReceiptSaleMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("cashReceiptDataSale", saleBillMasters);
		modelAndView.setViewName("Pharma_Cash_Receipt_Sale_Bill");
		return modelAndView;

	}
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	public @ResponseBody Boolean deleteCashReceipt(
			@RequestParam("cashReceiptSaleId") Integer cashId) {
		Boolean flag = false;
		if (cashReceiptEntrySaleService.deleteCash(cashId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/cashReceiptList", method = RequestMethod.GET)
	public @ResponseBody List<CashReceiptSaleMaster> getCashList() {
		List<CashReceiptSaleMaster> ltCashMasters = new ArrayList<CashReceiptSaleMaster>();
		ltCashMasters = cashReceiptEntrySaleService.getCashs();
		return ltCashMasters;
	}

	@RequestMapping(value = "/getCashById", method = RequestMethod.GET)
	public @ResponseBody List<CashReceiptSaleMaster> getCashById(
			@RequestParam("cashReceiptId") Integer cashReceiptId) {
		List<CashReceiptSaleMaster> ltCashMasters = new ArrayList<CashReceiptSaleMaster>();
		ltCashMasters = cashReceiptEntrySaleService.getCashById(cashReceiptId);
		return ltCashMasters;
	}

    @RequestMapping(value = "/getCashbyPatientId", method = RequestMethod.GET)
	public @ResponseBody List<CashReceiptSaleMaster> getCashbyPatientId(
			@RequestParam("patientId") Integer patientId) {
		List<CashReceiptSaleMaster> ltCashMaster = new ArrayList<CashReceiptSaleMaster>();
		ltCashMaster = cashReceiptEntrySaleService.getCashbyPatientId(patientId);
		return ltCashMaster;
}

}

