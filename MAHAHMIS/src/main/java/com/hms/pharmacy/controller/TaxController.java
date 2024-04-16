package com.hms.pharmacy.controller;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.service.TaxService;

@Controller
@RequestMapping(value="/tax")
public class TaxController 
{
	@Autowired
	TaxService taxService;
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView loadTaxPage() 
	{
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.addObject("tax", new TaxMaster());
			modelAndView.setViewName("Pharma_Tax_Master");
			List<TaxMaster> taxMasters=taxService.getTax();
			modelAndView.addObject("taxMasters",taxMasters);
			return modelAndView;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView addTax(@ModelAttribute("tax") TaxMaster taxMaster) 
	{
		ModelAndView modelAndView = new ModelAndView();
		if (taxService.saveTax(taxMaster)) 
		{
			if (taxMaster.getTaxId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Tax can not be save !");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/tax/view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteTax(@RequestParam("taxId") Integer taxId) {
		Boolean flag = false;
		if (taxService.deleteTax(taxId)) {
			flag = true;
		}
		return flag;
	}
	
	
	@RequestMapping(value = "/autoSuggestionTax", method = RequestMethod.GET)
	public @ResponseBody List<TaxMaster> autoSuggestionTax(@RequestParam("letter")String letter) {
		 
		List<TaxMaster> taxMasters = taxService.getAutoSuggestionTaxName(letter);
		return taxMasters;
	}
	
	@RequestMapping(value = "/getTaxById", method = RequestMethod.GET)
	public @ResponseBody List<TaxMaster> getTaxById(@RequestParam("taxId")Integer taxId) {
		List<TaxMaster> taxMasters = taxService.getTaxById(taxId);
		return taxMasters;
	}
	
	@RequestMapping(value = "/getgstList", method = RequestMethod.GET)
	public @ResponseBody
	TaxMaster getgstList() {
		List<TaxMaster> lttax = new ArrayList<TaxMaster>();
		lttax = taxService.getgstList();
		TaxMaster obj = new TaxMaster();
		obj.setLsttaxmaster(lttax);
		return obj;
	}
}

