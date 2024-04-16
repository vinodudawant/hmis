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

import com.hms.pharmacy.pojo.UomMaster;
import com.hms.pharmacy.service.UomService;

@Controller
@RequestMapping(value = "/uom")
public class UomController {
	@Autowired
	UomService  uomService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getUomView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("uom", new UomMaster());
		
		List<UomMaster> ltUomMasters = new ArrayList<UomMaster>();
		ltUomMasters = uomService.getUoms();
		modelAndView.addObject("ltUomMasters", ltUomMasters);
		
		modelAndView.setViewName("Pharma_Uom_Master");
		return modelAndView;
	}
	

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateUom(
			@ModelAttribute("uom") UomMaster uomMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (uomService.saveOrUpdateUom(uomMaster)) {
			if (uomMaster.getUomId() != null) {
			modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate UOM can not be save !");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/uom/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteUom(@RequestParam("companyId") Integer uomId) {
		Boolean flag = false;
		if (uomService.deleteUom(uomId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/uomList", method = RequestMethod.GET)
	public @ResponseBody List<UomMaster> getUomsList() {
		List<UomMaster> ltUomMasters = new ArrayList<UomMaster>();
		ltUomMasters = uomService.getUoms();
		return ltUomMasters;
	}
	@RequestMapping(value = "/autoSuggestionUomNames", method = RequestMethod.GET)
	public @ResponseBody List<UomMaster> getAutoSuggestionUomNames(@RequestParam("letter")String letter) {
		List<UomMaster> ltUomMasters = new ArrayList<UomMaster>();
		ltUomMasters = uomService.getAutoSuggestionUomNames(letter);
		return ltUomMasters;
	}
	
	@RequestMapping(value = "/getUomById", method = RequestMethod.GET)
	public @ResponseBody List<UomMaster> getUomById(@RequestParam("uomId")Integer uomId) {
		List<UomMaster> ltUomMasters = new ArrayList<UomMaster>();
		ltUomMasters = uomService.getUomById(uomId);
		return ltUomMasters;
	}
	
}
