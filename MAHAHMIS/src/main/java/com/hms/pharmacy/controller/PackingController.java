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

import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.service.DoctorSevice;
import com.hms.pharmacy.service.PackingService;

@Controller
@RequestMapping(value = "/packing")
public class PackingController {
	@Autowired
	PackingService packingService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getPackingView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("packing", new PackingMaster());
		List<PackingMaster> ltPackingMaster = new ArrayList<PackingMaster>();
		ltPackingMaster = packingService.getPacking();
		modelAndView.addObject("ltPackingMaster", ltPackingMaster);
		modelAndView.setViewName("Pharma_Packing_Master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdatePacking(
			@ModelAttribute("packing") PackingMaster packingMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (packingService.saveOrUpdatePacking(packingMaster)) {
			if (packingMaster.getPackId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Packing can not be save..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/packing/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePacking(@RequestParam("packId") Integer packId) {
		Boolean flag = false;
		if (packingService.deletePacking(packId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/packingList", method = RequestMethod.GET)
	public @ResponseBody List<PackingMaster> getPackingMastersList() {
		List<PackingMaster> ltPackingMaster = new ArrayList<PackingMaster>();
		ltPackingMaster = packingService.getPacking();
		return ltPackingMaster;
	}
	 @RequestMapping(value = "/autoSuggestionPackingNames", method = RequestMethod.GET)
	public @ResponseBody List<PackingMaster> getAutoSuggestionPackingNames(@RequestParam("letter")String letter) {
		List<PackingMaster> ltPackingMaster = new ArrayList<PackingMaster>();
		ltPackingMaster = packingService.getAutoSuggestionPackingNames(letter);
		return ltPackingMaster;
	}
	
	@RequestMapping(value = "/getPackingById", method = RequestMethod.GET)
	public @ResponseBody List<PackingMaster> getPackingById(@RequestParam("packId")Integer packId) {
		List<PackingMaster> ltPackingMaster = new ArrayList<PackingMaster>();
		ltPackingMaster = packingService.getPackingById(packId);
		return ltPackingMaster;
	}
}
