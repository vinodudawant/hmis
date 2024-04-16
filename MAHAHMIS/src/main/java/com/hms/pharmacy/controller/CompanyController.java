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

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.service.CompanyService;

@Controller
@RequestMapping(value = "/company")
public class CompanyController 
{
	@Autowired
	CompanyService companySevice;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getCompanyView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("company", new CompanyMaster());

		List<CompanyMaster> ltCompanyMasters = new ArrayList<CompanyMaster>();
		ltCompanyMasters = companySevice.getCompanies();
		modelAndView.addObject("ltCompanyMasters", ltCompanyMasters);
	   	modelAndView.setViewName("Pharma_company_master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("company") CompanyMaster companyMaster) {
		ModelAndView modelAndView = new ModelAndView();
	
		
		if (companySevice.saveOrUpdateCompany(companyMaster)) 
		{
			if (companyMaster.getCompId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
			
			modelAndView
			.setViewName("redirect:/pharmacy/company/view");
		} else {
			modelAndView.addObject("duplicate", "! Duplicate Company can not save..!");
			/*
			 * modelAndView .setViewName("redirect:/pharmacy/company/duplicate");
			 */
		}

		modelAndView .setViewName("redirect:/pharmacy/company/view");
		return modelAndView;
	}
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDoctor(@RequestParam("companyId") Integer companyId) {
		Boolean flag = false;
		if (companySevice.deleteCompany(companyId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/companyList", method = RequestMethod.GET)
	public @ResponseBody
	List<CompanyMaster> getCompaniesList() {
		List<CompanyMaster> ltCompanyMasters = new ArrayList<CompanyMaster>();
		ltCompanyMasters = companySevice.getCompanies();
		return ltCompanyMasters;
	}
	
	@RequestMapping(value = "/allCompanyList", method = RequestMethod.GET)
	public @ResponseBody
	List<CompanyMaster> getAllCompaniesList() {
		List<CompanyMaster> ltCompanyMasters = new ArrayList<CompanyMaster>();
		ltCompanyMasters = companySevice.getAllCompanies();
		return ltCompanyMasters;
	}

	@RequestMapping(value = "/autoSuggestionCompanyNames", method = RequestMethod.GET)
	public @ResponseBody
	List<CompanyMaster> getAutoSuggestionCompanyNames(
			@RequestParam("letter") String letter) {
		List<CompanyMaster> ltCompanyMasters = new ArrayList<CompanyMaster>();
		ltCompanyMasters = companySevice.getAutoSuggestionCompanyNames(letter);
		return ltCompanyMasters;
	}

	@RequestMapping(value = "/getCompanyById", method = RequestMethod.GET)
	public @ResponseBody
	List<CompanyMaster> getCompanyById(
			@RequestParam("companyId") Integer companyId) {
		List<CompanyMaster> ltCompanyMasters = new ArrayList<CompanyMaster>();
		ltCompanyMasters = companySevice.getCompanyById(companyId);
		return ltCompanyMasters;
	}

	
	@RequestMapping(value = "/duplicate", method = RequestMethod.GET)
	public ModelAndView getCompanyduplicateView() {
		ModelAndView modelAndView = new ModelAndView();
	   	modelAndView.setViewName("Pharma_alert_master");
		return modelAndView;
	}
}
