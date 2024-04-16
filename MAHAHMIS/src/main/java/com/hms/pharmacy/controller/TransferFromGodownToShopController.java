package com.hms.pharmacy.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.BankMaster;


@Controller
@RequestMapping(value = "/transferFromGodownToShop")
public class TransferFromGodownToShopController
{
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getBankView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("transferFromGodownToShop", new BankMaster());
		
	/*	List<BankMaster> ltBankMasters = new ArrayList<BankMaster>();
		ltBankMasters = bankSevice.getBanks();
		modelAndView.addObject("ltBankMasters", ltBankMasters);*/
		
		modelAndView.setViewName("Pharma_Transfer_From_Godowm_To_Shop");
		return modelAndView;
	}
}
