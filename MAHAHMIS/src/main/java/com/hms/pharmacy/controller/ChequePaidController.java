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

import com.hms.pharmacy.pojo.CashPaidMaster;
import com.hms.pharmacy.pojo.CashReceiptMaster;
import com.hms.pharmacy.pojo.CashReceiptSaleMaster;
import com.hms.pharmacy.pojo.ChequePaidMaster;
import com.hms.pharmacy.pojo.ChequePaidSlave;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.ChequePaidEntryService;
import com.hms.pharmacy.service.CommonService;


@Controller
@RequestMapping(value = "/chequePaidEntry")
public class ChequePaidController 
{
	@Autowired
	ChequePaidEntryService chequePaidEntryService;
	
	@Autowired
	CommonService commonService;
	
	@RequestMapping(value = "/view-frm", method = RequestMethod.GET)
	public ModelAndView getChequePaidView(HttpServletRequest request,HttpServletResponse response) 
	{
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			modelAndView.addObject("chequePaidEntry", new ChequePaidMaster());
			modelAndView.setViewName("Pharma_Cheque_Paid_Entry");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getChequePaidEntryLIst(HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String url=request.getRequestURI();
		boolean result=commonService.getUserAccess(request, url);
		
		if(result)
		{
			List<ChequePaidMaster> chequePaidMasters = chequePaidEntryService.getChequePaidEntryLIst();
			modelAndView.addObject("chequePaidMasters", chequePaidMasters);
			modelAndView.setViewName("Pharma_Cheque_Paid_Entry_List");
		}
		else
		{
			modelAndView.setViewName("redirect:../pharmacy/error-page");
		}
		return modelAndView;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateChequePaidEntry(
			@ModelAttribute("chequePaidEntry") ChequePaidMaster chequePaidMaster,BindingResult r,HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String[] results = request.getParameterValues("selectedValues");
		
		List<ChequePaidSlave> chequePaidSlaves=chequePaidMaster.getChequePaidSlaves();
		List<ChequePaidSlave> newChequePaidSlaves= new ArrayList<ChequePaidSlave>();
		
		for(ChequePaidSlave chequePaidSlave:chequePaidSlaves)
		{
			int found=0;
			for(int i=0;i<results.length && found<=0;i++)
			{
				if(chequePaidSlave.getPurchaseMaster().getPurId().toString().equals(results[i]))
				{	
					found=1;
					newChequePaidSlaves.add(chequePaidSlave);
				}	
			}
			
				
		}
		chequePaidMaster.setChequePaidSlaves(newChequePaidSlaves);

		if (chequePaidEntryService.saveOrUpdateChequePaidEntry(chequePaidMaster)) {
			if (chequePaidMaster.getChequePaidId() != null) {
			/*	modelAndView.addObject("success",
						"Record saved successfully..!");*/
			} else {
				/*modelAndView.addObject("success",
						"Record updated successfully..!");*/
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		/*ChequePaidMaster billMaster = new ChequePaidMaster();
		if (chequePaidMaster.getChequePaidId() != null) {
			try {
				billMaster = chequePaidEntryService
						.getChequeReceiptDataById(chequePaidMaster
								.getChequePaidId());
			} catch (Exception e) {
				e.printStackTrace();
			}

			List<ChequePaidMaster> saleBillMasters = new ArrayList<ChequePaidMaster>();
			saleBillMasters.add(billMaster);

			modelAndView.addObject("chequePaidData", saleBillMasters);
			modelAndView.setViewName("Pharma_Cheque_Paid_Bill");
		}*/
				
		modelAndView.setViewName("redirect:view");
		return modelAndView;
	}
	
	
	@RequestMapping(value = "/printView", method = RequestMethod.GET)
	public ModelAndView printPo(
			@RequestParam("chequePaidId") Integer chequePaidId) {
		ModelAndView modelAndView = new ModelAndView();
		ChequePaidMaster billMaster = new ChequePaidMaster();
		ChequePaidMaster billMaster1 = new ChequePaidMaster();
		try {
 			billMaster = chequePaidEntryService
					.getChequeReceiptDataById(chequePaidId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
 			billMaster1 = chequePaidEntryService
					.getBankDataById(chequePaidId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		List<ChequePaidMaster> saleBillMasters = new ArrayList<ChequePaidMaster>();
		saleBillMasters.add(billMaster);
		
		modelAndView.addObject("bankName", billMaster1.getBankMaster().getBankName());
		modelAndView.addObject("chequePaidData", saleBillMasters);
		modelAndView.setViewName("Pharma_Cheque_Paid_Bill");
		return modelAndView;

	}
		
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteChequePaidEntry(@RequestParam("chequePaidId") Integer chequePaidId) {
		Boolean flag = false;
		if (chequePaidEntryService.deleteChequePaidEntry(chequePaidId)) {
			flag = true;
		}
		return flag;
	}
	
	@RequestMapping(value = "/getChequePaidById", method = RequestMethod.GET)
	public @ResponseBody
	List<ChequePaidMaster> getChequePaidbyVendorId(
			@RequestParam("vendorId") Integer vendorId) {
		List<ChequePaidMaster> ltChequePaidMaster = new ArrayList<ChequePaidMaster>();
		ltChequePaidMaster = chequePaidEntryService.getChequePaidbyVendorId(vendorId);
		return ltChequePaidMaster;
	}
	
}
