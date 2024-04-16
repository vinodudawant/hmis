package com.hms.pharmacy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.service.DrugService;

@Controller
@RequestMapping(value="/drug")
public class DrugController 
{
	@Autowired
	DrugService drugService;
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView loadDrugPage() 
	{
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.addObject("drug", new DrugMaster());
			modelAndView.setViewName("Pharma_Drug_Master");
			List<DrugMaster> drugMasters=drugService.getDrug();
			modelAndView.addObject("drugMasters",drugMasters);
			return modelAndView;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView addDrug(@ModelAttribute("drug") DrugMaster drugMaster) 
	{
		ModelAndView modelAndView = new ModelAndView();
		if (drugService.saveDrug(drugMaster)) 
		{
			if (drugMaster.getDrugId() != null) {
			/*	modelAndView.addObject("msg",
						"Record saved successfully..!");*/
			} else {
			/*	modelAndView.addObject("msg",
						"Record updated successfully..!");*/
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/drug/view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDrug(@RequestParam("drugId") Integer drugId) {
		Boolean flag = false;
		if (drugService.deleteDrug(drugId)) {
			flag = true;
		}
		return flag;
	}
	
	@RequestMapping(value = "/autoSuggestionDrug", method = RequestMethod.GET)
	public @ResponseBody List<DrugMaster> getAutoSuggestionDrug(@RequestParam("letter")String letter) {
		 
		List<DrugMaster> drugMasters = drugService.getAutoSuggestionDrugName(letter);
		return drugMasters;
	}
	
	@RequestMapping(value = "/getAllDrugs", method = RequestMethod.POST)
	public @ResponseBody List<DrugMaster> getAllDrugs() {
		 
		List<DrugMaster> drugMasters = drugService.getAllDrugs();
		return drugMasters;
	}
	
	@RequestMapping(value = "/getDrugById", method = RequestMethod.GET)
	public @ResponseBody List<DrugMaster> getDrugById(@RequestParam("drugId")Integer drugId) {
		List<DrugMaster> drugMasters = drugService.getDrugById(drugId);
		return drugMasters;
	}
}
