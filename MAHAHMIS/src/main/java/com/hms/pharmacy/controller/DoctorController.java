package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.OTbilldetaildto;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.service.DoctorSevice;

@Controller
@RequestMapping(value = "/doctor")
public class DoctorController {
	@Autowired
	DoctorSevice doctorSevice;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getDoctorView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("doctor", new DoctorMaster());
		List<DoctorMaster> ltDoctorMaster = new ArrayList<DoctorMaster>();
		ltDoctorMaster = doctorSevice.getDoctors();
		modelAndView.addObject("ltDoctorMaster", ltDoctorMaster);
		modelAndView.setViewName("Pharma_Doctor_Master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("doctor") DoctorMaster doctorMaster) {
		ModelAndView modelAndView = new ModelAndView();
		if (doctorSevice.saveOrUpdateDoctor(doctorMaster)) {
			if (doctorMaster.getDoctorId() != null) {
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
				.setViewName("redirect:/pharmacy/doctor/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDoctor(@RequestParam("doctorId") Integer doctorId) {
		Boolean flag = false;
		if (doctorSevice.deleteDoctor(doctorId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/doctorsList", method = RequestMethod.GET)
	public @ResponseBody List<DoctorMaster> getDoctorsList() {
		List<DoctorMaster> ltDoctorMaster = new ArrayList<DoctorMaster>();
		ltDoctorMaster = doctorSevice.getDoctors();
		return ltDoctorMaster;
	}
	
	@RequestMapping(value = "/autoSuggestionDoctorNames", method = RequestMethod.GET)
	public @ResponseBody List<DoctorMaster> getAutoSuggestionDoctorNames(@RequestParam("letter")String letter) {
		List<DoctorMaster> ltDoctorMaster = new ArrayList<DoctorMaster>();
		ltDoctorMaster = doctorSevice.getAutoSuggestionDoctorNames(letter);
		return ltDoctorMaster;
	}
	
	@RequestMapping(value = "/getDoctorById", method = RequestMethod.GET)
	public @ResponseBody List<DoctorMaster> getDoctorById(@RequestParam("doctorId")Integer doctorId)
	{
		List<DoctorMaster> ltDoctorMaster = new ArrayList<DoctorMaster>();
		ltDoctorMaster = doctorSevice.getDoctorById(doctorId);
		return ltDoctorMaster;
	}
	
	@RequestMapping(value = "/fetchAutoListForDoctorName", method = RequestMethod.POST)
	public @ResponseBody Doctor fetchAutoListForDoctorName(String letter, String autoSuggest)
	{
		List<Doctor> autoList = new ArrayList<>();
		
	     autoList = doctorSevice.fetchAutoListForDoctorName(
				letter, autoSuggest);
	     
	     Doctor doctor = new Doctor();
	     doctor.setListDoctor(autoList);
		
		return doctor;
		
	}
	
}
