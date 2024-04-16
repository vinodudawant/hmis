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
import com.hms.pharmacy.pojo.CashPaidSlave;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.ChequePaidMaster;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.CashPaidEntryService;
import com.hms.pharmacy.service.CommonService;

@Controller
@RequestMapping(value = "/cashPaidEntry")
public class CashPaidEntryController {
	@Autowired
	CashPaidEntryService cashPaidEntryService;
	
	@Autowired
	CommonService commonService; 

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCashPaidEntryLIst(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			List<CashPaidMaster> cashPaidMasters = cashPaidEntryService
					.getCashPaidEntryLIst();
			modelAndView.addObject("cashPaidMasters", cashPaidMasters);
			modelAndView.setViewName("Pharma_Cash_Paid_Entry_List");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/edit-view", method = RequestMethod.GET)
	public ModelAndView editForm(@RequestParam("cashPaidId") Integer cashPaidId) {
		ModelAndView modelAndView = new ModelAndView();
		CashPaidMaster cashPaidMaster = new CashPaidMaster();

		cashPaidMaster = cashPaidEntryService.getCashPaidEntryById(cashPaidId);
		System.out.println(cashPaidMaster.getCashPaidSlaves().get(0)
				.getCashPaidAmt());
		System.out.println(cashPaidMaster.getCashPaidSlaves().get(0)
				.getCashPaidDiscount());
		modelAndView.addObject("cashPaidEntry", cashPaidMaster);

		modelAndView.setViewName("Pharma_Cash_Paid_Entry");
		return modelAndView;
	}

	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getCashPaidView(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("cashPaidEntry", new CashPaidMaster());
			modelAndView.setViewName("Pharma_Cash_Paid_Entry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateCashPaidEntry(
			@ModelAttribute("cashPaidEntry") CashPaidMaster cashPaidMaster,HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		List<CashPaidSlave> cashPaidSlaves=cashPaidMaster.getCashPaidSlaves();
		List<CashPaidSlave> newCashPaidSlaves= new ArrayList<CashPaidSlave>();
		
		String[] results = request.getParameterValues("selectedValues");
				
		for(CashPaidSlave cashPaidSlave:cashPaidSlaves)
		{
			int found=0;
			for(int i=0;i<results.length && found<=0;i++)
			{
				if(cashPaidSlave.getPurchaseMaster().getPurId().toString().equals(results[i]))
				{	
					found=1;
					newCashPaidSlaves.add(cashPaidSlave);
				}	
			}
			
				
		}
		cashPaidMaster.setCashPaidSlaves(newCashPaidSlaves);

		if (cashPaidEntryService.saveOrUpdateCashPaidEntry(cashPaidMaster)) {
			if (cashPaidMaster.getCashPaidId() != null) {
			/*	modelAndView.addObject("success",
						"Record saved successfully..!");*/
			} else {
				/*modelAndView.addObject("success",
						"Record updated successfully..!");*/
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		/*CashPaidMaster billMaster = new CashPaidMaster();
		if (cashPaidMaster.getCashPaidId() != null) {
			try {
				billMaster = cashPaidEntryService
						.getCashPaidDataSaleById(cashPaidMaster
								.getCashPaidId());
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<CashPaidMaster> saleBillMasters = new ArrayList<CashPaidMaster>();
			saleBillMasters.add(billMaster);

			modelAndView.addObject("cashPaidData", saleBillMasters);
			modelAndView.setViewName("Pharma_Cash_Paid_Bill");
		}
			*/		
		modelAndView.setViewName("redirect:view");
		return modelAndView;
	}

	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("cashPaidId") Integer cashPaidId) {
		ModelAndView modelAndView = new ModelAndView();
		CashPaidMaster billMaster = new CashPaidMaster();

		try {
			billMaster = cashPaidEntryService
					.getCashPaidDataSaleById(cashPaidId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		List<CashPaidMaster> saleBillMasters = new ArrayList<CashPaidMaster>();
		saleBillMasters.add(billMaster);

		modelAndView.addObject("cashPaidData", saleBillMasters);
		modelAndView.setViewName("Pharma_Cash_Paid_Bill");
		return modelAndView;

	}
	
		
	/*
	 * @InitBinder protected void initBinder(HttpServletRequest request,
	 * ServletRequestDataBinder binder) { try { SimpleDateFormat dateFormat =
	 * new SimpleDateFormat("dd/MM/yyyy"); CustomDateEditor editor = new
	 * CustomDateEditor(dateFormat, true);
	 * binder.registerCustomEditor(Date.class, editor); } catch (Exception e) {
	 * e.printStackTrace(); } }
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteCashPaidEntry(@RequestParam("cashPaidId") Integer cashPaidId) {
		Boolean flag = false;
		if (cashPaidEntryService.deleteCashPaidEntry(cashPaidId)) {
			flag = true;
		}
		return flag;
	}
	
	
	@RequestMapping(value = "/getPendingBills", method = RequestMethod.GET)
	public @ResponseBody
	List<PendingBill> getPendingBills(@RequestParam("vendorId") Integer vendorId) {
		
		List<PendingBill> pendingBills=cashPaidEntryService.getPendingBills(vendorId);
		return pendingBills;
		
	}
	
	@RequestMapping(value = "/getCashPaidById", method = RequestMethod.GET)
	public @ResponseBody
	List<CashPaidMaster> getChequePaidbyVendorId(
			@RequestParam("vendorId") Integer vendorId) {
		List<CashPaidMaster> ltCashPaidMaster = new ArrayList<CashPaidMaster>();
		ltCashPaidMaster = cashPaidEntryService.getCashPaidbyVendorId(vendorId);
		return ltCashPaidMaster;
	}
	
	@RequestMapping(value = "/getAllCashPaidDataByVendorId", method = RequestMethod.GET)
	public @ResponseBody
	List<CashPaidMaster> getAllCashPaidDataByVendorId(
			@RequestParam("vendorId") Integer vendorId) {
		List<CashPaidMaster> ltCashPaidMaster = new ArrayList<CashPaidMaster>();
		ltCashPaidMaster = cashPaidEntryService.getAllCashPaidDataByVendorId(vendorId);
		return ltCashPaidMaster;
	}
}
