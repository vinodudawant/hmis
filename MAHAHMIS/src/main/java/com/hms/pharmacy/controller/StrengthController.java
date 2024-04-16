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
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;

@Controller
@RequestMapping(value = "/strength")
public class StrengthController 
{
	@Autowired
	StrengthService strengthService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getStrengthView() 
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("strength", new StrengthMaster());
		List<StrengthMaster> ltStrengthMaster = new ArrayList<StrengthMaster>();
		ltStrengthMaster = strengthService.getStrength();
		modelAndView.addObject("ltStrengthMaster", ltStrengthMaster);
		modelAndView.setViewName("pharma_strength_master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateStrength(
			@ModelAttribute("strength") StrengthMaster strengthMaster) 
	{
		ModelAndView modelAndView = new ModelAndView();
		if (strengthService.saveOrUpdateStrength(strengthMaster)) {
			if (strengthMaster.getStrengthId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Strength can not be save!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/strength/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePreparation(@RequestParam("strengthId") Integer strengthId) 
	{
		Boolean flag = false;
		if (strengthService.deleteStrength(strengthId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/strengthList", method = RequestMethod.GET)
	public @ResponseBody List<StrengthMaster> getPreparationList() 
	{
		List<StrengthMaster> ltStrengthMaster = new ArrayList<StrengthMaster>();
		ltStrengthMaster = strengthService.getStrength();
		return ltStrengthMaster;
	}
	
	@RequestMapping(value = "/autoSuggestionStrengthNames", method = RequestMethod.GET)
	public @ResponseBody List<StrengthMaster> getAutoSuggestionStrengthNames(@RequestParam("letter")String letter) 
	{
		List<StrengthMaster> ltStrengthMaster = new ArrayList<StrengthMaster>();
		ltStrengthMaster = strengthService.getAutoSuggestionStrengthNames(letter);
		return ltStrengthMaster;
	}
	
	@RequestMapping(value = "/getStrengthById", method = RequestMethod.GET)
	public @ResponseBody List<StrengthMaster> getPreparationById(@RequestParam("strengthId")Integer strengthId) 
	{
		List<StrengthMaster> ltStrengthMaster = new ArrayList<StrengthMaster>();
		ltStrengthMaster = strengthService.getStrengthById(strengthId);
		return ltStrengthMaster;
	}
	
	
}