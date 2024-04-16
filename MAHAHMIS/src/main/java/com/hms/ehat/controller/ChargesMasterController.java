package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.ehat.dto.ChargesMasterDto;

import com.hms.ehat.service.ChargesMasterService;

@Controller
@RequestMapping(value = "/charges")
public class ChargesMasterController {

	@Autowired
	ChargesMasterService chargesMasterService;

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **/
	@RequestMapping(value = "/viewChragesMaster", method = RequestMethod.GET)
	public ModelAndView getChargesMasterView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("charges", new ChargesMasterDto());

		List<ChargesMasterDto> ltChargesMasterDto = new ArrayList<ChargesMasterDto>();
		ltChargesMasterDto = chargesMasterService.getCharges();
		modelAndView.addObject("ltChargesMasterDto", ltChargesMasterDto);

		modelAndView.setViewName("charges_master");
		return modelAndView;
	}

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **/
	@RequestMapping(value = "/saveChragesMaster", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateChargesMaster(ChargesMasterDto chargesMaster,
			HttpServletRequest request) {

		int response = chargesMasterService.saveOrUpdateCharges(chargesMaster,
				request);// To get the response from service

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Name Allready exist"
						: "Network Error!!!"));
	}

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **/
	@RequestMapping(value = "/deleteChragesMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChargesMaster(@RequestParam("chargesId") Integer chargesId,
			HttpServletRequest request) {
		/*
		 * Boolean flag = false; if
		 * (chargesMasterService.deleteCharges(chargesId, request)) { flag =
		 * true; } return flag;
		 */

		boolean response = chargesMasterService.deleteCharges(chargesId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **/
	@RequestMapping(value = "/chargesMasterList", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterDto getChargesMasterList() {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = chargesMasterService.getAllCharges();
		ChargesMasterDto obj = new ChargesMasterDto();
		obj.setLstCharges(ltChargesMasters);

		return obj;

	}

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **/
	@RequestMapping(value = "/allChargesMasterList", method = RequestMethod.GET)
	public @ResponseBody
	List<ChargesMasterDto> getAllChargesMasterList() {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = chargesMasterService.getAllCharges();
		return ltChargesMasters;
	}

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **/
	@RequestMapping(value = "/autoSuggestionChargesMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterDto getAutoSuggestionChargesMasterNames(
			@RequestParam String letter) {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = chargesMasterService
				.getAutoSuggestionChargesNames(letter);
		ChargesMasterDto obj = new ChargesMasterDto();
		obj.setLstCharges(ltChargesMasters);
		return obj;

	}

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **/
	@RequestMapping(value = "/getChargesMasterById", method = RequestMethod.GET)
	public @ResponseBody
	List<ChargesMasterDto> getChargesMasterById(
			@RequestParam("chargesId") Integer chargesId) {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = chargesMasterService.getChargesById(chargesId);
		return ltChargesMasters;
	}
	/**
	 * End of Charges master controller methods
	 * **/
	/**
	 * @author Bilal
	 * @date 06-July-2017
	 * @code for charges count***/
	@RequestMapping(value = "/getChargesMasterCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getChargesMasterCount() {
		
		Long totaleCount = chargesMasterService.getChargesMasterCount();	
		return totaleCount;
	}	
	/*****
	 * @author    :BILAL
	 * @Date      :22-01-2018
	 * @Code      :For sponsor and hall based on call from 
	 * ******/
	@RequestMapping(value = "/sponsorandhallList", method = RequestMethod.GET)
	public @ResponseBody
	ChargesMasterDto sponsorandhallList(@RequestParam("callfrom") String callfrom) {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = chargesMasterService.sponsorandhallList(callfrom);
		ChargesMasterDto obj = new ChargesMasterDto();
		obj.setLstCharges(ltChargesMasters);

		return obj;

	}
}
