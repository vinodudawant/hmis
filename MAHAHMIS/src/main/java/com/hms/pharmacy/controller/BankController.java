package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.service.BankService;

@Controller
@RequestMapping(value = "/bank")
public class BankController {
	@Autowired
	BankService  bankSevice;
	static Logger log=Logger.getLogger(BankController.class.getName());
	/**
	 *
	 * @Code :This method for bank view
	 * @return
	 **/
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getBankView() {
		log.info("In Pharmacy getBankView()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("bank", new BankMaster());
		
		List<BankMaster> ltBankMasters = new ArrayList<BankMaster>();
		ltBankMasters = bankSevice.getBanks();
		modelAndView.addObject("ltBankMasters", ltBankMasters);
		
		modelAndView.setViewName("Pharma_Bank_Master");
		return modelAndView;
	}
	
	/**
	 *
	 * @Code :This method for save
	 * @return
	 **/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("bank") BankMaster bankMaster) {
		log.info("In Pharmacy saveOrUpdateDoctor()");
		ModelAndView modelAndView = new ModelAndView();
		HttpServletRequest request = null;
		/*
		 * HttpSession session=request.getSession(); Integer userId=(Integer)
		 * session.getAttribute("userId1"); Integer unitId =(Integer)
		 * session.getAttribute("uId"); bankMaster.setUserId(userId);
		 * bankMaster.setUserId(unitId);
		 */
		if (bankSevice.saveOrUpdateBank(bankMaster)) {
			if (bankMaster.getBankId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("duplicate", "! Duplicate bank can not be save !");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/bank/view");
		return modelAndView;
	}
	/**
	 *
	 * @Code :This method for delete
	 * @return
	 **/
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteBank(@RequestParam("bankId") Integer bankId) {
		log.info("In Pharmacy deleteBank()");
		Boolean flag = false;
		if (bankSevice.deleteBank(bankId)) {
			flag = true;
		}
		return flag;
	}
	/**
	 *
	 * @Code :This method for get bank list
	 * @return
	 **/
	@RequestMapping(value = "/bankList", method = RequestMethod.GET)
	public @ResponseBody List<BankMaster> getCompaniesList() {
		log.info("In Pharmacy getCompaniesList()");
		List<BankMaster> ltBankMasters = new ArrayList<BankMaster>();
		ltBankMasters = bankSevice.getBanks();
		return ltBankMasters;
	}
	
	/**
	 *
	 * @Code :This method for autosuggestion
	 * @return
	 **/
	@RequestMapping(value = "/autoSuggestionBankNames", method = RequestMethod.GET)
	public @ResponseBody List<BankMaster> getAutoSuggestionBankNames(@RequestParam("letter")String letter) {
		log.info("In Pharmacy getAutoSuggestionBankNames()");
		List<BankMaster> ltBankMasters = new ArrayList<BankMaster>();
		ltBankMasters = bankSevice.getAutoSuggestionBankNames(letter);
		return ltBankMasters;
	}
	/**
	 *
	 * @Code :This method for get bank by id
	 * @return
	 **/
	@RequestMapping(value = "/getBankById", method = RequestMethod.GET)
	public @ResponseBody List<BankMaster> getBankById(@RequestParam("bankId")Integer bankId) {
		log.info("In Pharmacy getBankById()");
		List<BankMaster> ltBankMasters = new ArrayList<BankMaster>();
		ltBankMasters = bankSevice.getBankById(bankId);
		return ltBankMasters;
	}
	
	@RequestMapping(value = "/autoSuggestionBankNames1", method = RequestMethod.GET)
	public @ResponseBody List<BankMaster> getAutoSuggestionBankNames1(@RequestParam("letter")String letter) {
		log.info("In Pharmacy getAutoSuggestionBankNames1()");
		List<BankMaster> ltBankMasters = new ArrayList<BankMaster>();
		ltBankMasters = bankSevice.getAutoSuggestionBankNames1(letter);
		return ltBankMasters;
	}
}