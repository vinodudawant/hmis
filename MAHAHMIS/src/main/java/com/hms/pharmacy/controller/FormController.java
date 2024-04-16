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
import com.hms.pharmacy.pojo.FormMaster;
import com.hms.pharmacy.service.DoctorSevice;
import com.hms.pharmacy.service.FormService;

@Controller
@RequestMapping(value = "/form")
public class FormController {
	@Autowired
	FormService formService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getFormView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("form", new FormMaster());
		List<FormMaster> ltFormMaster = new ArrayList<FormMaster>();
		ltFormMaster = formService.getForm();
		modelAndView.addObject("ltFormMaster", ltFormMaster);
		modelAndView.setViewName("Pharma_Form_Master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateForm(
			@ModelAttribute("form") FormMaster formMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (formService.saveOrUpdateForm(formMaster)) {
			if (formMaster.getFormId() != null) {
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
				.setViewName("redirect:view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteForm(@RequestParam("formId") Integer formId) {
		Boolean flag = false;
		if (formService.deleteForm(formId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/formList", method = RequestMethod.GET)
	public @ResponseBody List<FormMaster> getFormList() {
		List<FormMaster> ltFormMaster = new ArrayList<FormMaster>();
		ltFormMaster = formService.getForm();
		return ltFormMaster;
	}
	
	@RequestMapping(value = "/autoSuggestionFormNames", method = RequestMethod.GET)
	public @ResponseBody List<FormMaster> getAutoSuggestionFormNames(@RequestParam("letter")String letter) {
		List<FormMaster> ltFormMaster = new ArrayList<FormMaster>();
		ltFormMaster = formService.getAutoSuggestionFormNames(letter);
		return ltFormMaster;
	}
	
	@RequestMapping(value = "/getFormById", method = RequestMethod.GET)
	public @ResponseBody List<FormMaster> getFormById(@RequestParam("formId")Integer formId) {
		List<FormMaster> ltFormMaster = new ArrayList<FormMaster>();
		ltFormMaster = formService.getFormById(formId);
		return ltFormMaster;
	}
	
}
