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

import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.ShiftMaster;
import com.hms.pharmacy.service.ShiftService;

@Controller
@RequestMapping(value = "/shift")
public class ShiftController {

	@Autowired
	ShiftService  shiftService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getShelfView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("shift", new ShiftMaster());
		
		List<ShiftMaster> shiftMasters = new ArrayList<ShiftMaster>();
		shiftMasters = shiftService.getShiftDetails("limit");
		modelAndView.addObject("shiftMasters", shiftMasters);
		
		modelAndView.setViewName("pharma_shift_master");
		return modelAndView;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateShelf(
			@ModelAttribute("shift") ShiftMaster shiftMaster,HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		if (shiftService.saveOrUpdateShift(shiftMaster,request)) {
			if (shiftMaster.getShiftId() != null) {
			/*	modelAndView.addObject("msg",
						"Record saved successfully..!");*/
			} else {
				/*modelAndView.addObject("msg",
						"Record updated successfully..!");*/
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/shift/view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/autoSuggestionShiftTypes", method = RequestMethod.GET)
	public @ResponseBody List<ShiftMaster> getAutoSuggestionShiftNames(@RequestParam("letter")String letter) {
		List<ShiftMaster> ltBankMasters = new ArrayList<ShiftMaster>();
		ltBankMasters = shiftService.getAutoSuggestionShiftTypes(letter);
		return ltBankMasters;
	}
	
	@RequestMapping(value = "/getShiftById", method = RequestMethod.GET)
	public @ResponseBody List<ShiftMaster> getShiftById(@RequestParam("shiftId")Integer shiftId) {
		List<ShiftMaster> ltBankMasters = new ArrayList<ShiftMaster>();
		ltBankMasters = shiftService.getShiftById(shiftId);
		return ltBankMasters;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteShift(@RequestParam("shiftId") Integer shiftId) {
		Boolean flag = false;
		if (shiftService.deleteShift(shiftId)) {
			flag = true;
		}
		return flag;
	}
}
