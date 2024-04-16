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

import com.hms.pharmacy.pojo.PatientMaster;
import com.hms.pharmacy.service.PatientService;

@Controller
@RequestMapping(value="/patient")
public class PatientController 
{
	@Autowired
	PatientService patientService;
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView loadPatientPage() 
	{
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.addObject("patient", new PatientMaster());
			modelAndView.setViewName("Pharma_Patient_Master");
			List<PatientMaster> patientMasters=patientService.getPatient();
			modelAndView.addObject("patientMasters",patientMasters);
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
	public ModelAndView addPatient(@ModelAttribute("patient") PatientMaster patientMaster) 
	{
		ModelAndView modelAndView = new ModelAndView();
		if (patientService.savePatient(patientMaster)) 
		{
			if (patientMaster.getPatId() != null) {
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
		.setViewName("redirect:/pharmacy/patient/view");
return modelAndView;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deletePatient(@RequestParam("patId") Integer patId) {
		Boolean flag = false;
		if (patientService.deletePatient(patId)) {
			flag = true;
		}
		return flag;
	}
	
	@RequestMapping(value = "/autoSuggestionPatient", method = RequestMethod.GET)
	public @ResponseBody List<PatientMaster> autoSuggestionPatient(@RequestParam("letter")String letter) {
		 
		List<PatientMaster> patientMasters = patientService.autoSuggestionPatient(letter);
		return patientMasters;
	}
	
	@RequestMapping(value = "/getPatientById", method = RequestMethod.GET)
	public @ResponseBody List<PatientMaster> getPatientById(@RequestParam("patId")Integer patId) {
		List<PatientMaster> patientMasters = patientService.getPatientById(patId);
		return patientMasters;
	}
	
	
	
}
