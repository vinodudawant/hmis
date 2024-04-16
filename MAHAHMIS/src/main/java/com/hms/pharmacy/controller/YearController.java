package com.hms.pharmacy.controller;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.FinancialYearMaster;
import com.hms.pharmacy.service.YearService;

@Controller
@RequestMapping(value = "/year")
public class YearController {
	@Autowired
	YearService yearService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getYearView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("year", new FinancialYearMaster());

		List<FinancialYearMaster> ltYearMaster = new ArrayList<FinancialYearMaster>();
		ltYearMaster = yearService.getYear();
		modelAndView.addObject("ltYearMaster", ltYearMaster);
		
		modelAndView.setViewName("Pharma_financial_year_master");
		return modelAndView;
	}
	@InitBinder
	protected void initBinder(HttpServletRequest request,
			ServletRequestDataBinder binder) {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
			binder.registerCustomEditor(Date.class, editor);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateYear(HttpServletRequest request,
			@ModelAttribute("year") FinancialYearMaster financialYearMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (yearService.saveOrUpdateYear(financialYearMaster)) {
			if (financialYearMaster.getYearId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Year can not be save..!");
		}
		modelAndView.setViewName("redirect:/pharmacy/year/view");
		return modelAndView;
	}
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteYear(@RequestParam("yearId") Integer yearId) {
		Boolean flag = false;
		if (yearService.deleteYear(yearId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/yearsList", method = RequestMethod.GET)
	public @ResponseBody List<FinancialYearMaster> getDoctorsList() {
		List<FinancialYearMaster> ltYearMaster = new ArrayList<FinancialYearMaster>();
		ltYearMaster = yearService.getYear();
		return ltYearMaster;
	}
	@RequestMapping(value = "/autoSuggestionYear", method = RequestMethod.GET)
	public @ResponseBody List<FinancialYearMaster> getAutoSuggestionYear(@RequestParam("letter")String letter) {
		List<FinancialYearMaster> ltYearMaster = new ArrayList<FinancialYearMaster>();
		ltYearMaster = yearService.getAutoSuggestionYear(letter);
		return ltYearMaster;
	}
		
	@RequestMapping(value = "/getYearById", method = RequestMethod.GET)
	public @ResponseBody List<FinancialYearMaster> getYearById(@RequestParam("yearId")Integer yearId) {
		List<FinancialYearMaster> ltYearMasters = new ArrayList<FinancialYearMaster>();
		ltYearMasters = yearService.getYearById(yearId);
		return ltYearMasters;
	}
	
}
