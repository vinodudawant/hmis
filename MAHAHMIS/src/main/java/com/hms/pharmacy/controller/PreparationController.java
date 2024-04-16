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
@RequestMapping(value = "/preparation")
public class PreparationController {
	@Autowired
	PreparationService preparationService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPreparationView() 
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("preparation", new PreparationMaster());
		List<PreparationMaster> ltPreparationMaster = new ArrayList<PreparationMaster>();
		ltPreparationMaster = preparationService.getPreparation();
		modelAndView.addObject("ltPreparationMaster", ltPreparationMaster);
		modelAndView.setViewName("pharma_preparation_master");
		return modelAndView;
	}

	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdatePreparation(
			@ModelAttribute("preparation") PreparationMaster preparationMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (preparationService.saveOrUpdateForm(preparationMaster)) {
			if (preparationMaster.getPreparationId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
			modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Preparation can not be save..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/preparation/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePreparation(@RequestParam("preparationId") Integer preparationId) {
		Boolean flag = false;
		if (preparationService.deletePreparation(preparationId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/preparationList", method = RequestMethod.GET)
	public @ResponseBody List<PreparationMaster> getPreparationList() {
		List<PreparationMaster> ltPreparationMaster = new ArrayList<PreparationMaster>();
		ltPreparationMaster = preparationService.getPreparation();
		return ltPreparationMaster;
	}
	
	@RequestMapping(value = "/autoSuggestionPreparationNames", method = RequestMethod.GET)
	public @ResponseBody List<PreparationMaster> getAutoSuggestionPreparationNames(@RequestParam("letter")String letter) {
		List<PreparationMaster> ltPreparationMaster = new ArrayList<PreparationMaster>();
		ltPreparationMaster = preparationService.getAutoSuggestionPreparationNames(letter);
		return ltPreparationMaster;
	}
	
	@RequestMapping(value = "/getPreparationById", method = RequestMethod.GET)
	public @ResponseBody List<PreparationMaster> getPreparationById(@RequestParam("preparationId")Integer preparationId) {
		List<PreparationMaster> ltPreparationMaster = new ArrayList<PreparationMaster>();
		ltPreparationMaster = preparationService.getPreparationById(preparationId);
		return ltPreparationMaster;
	}
	
	
}
