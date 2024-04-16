package com.hms.pharmacy.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.AutoSuggestionBranch;
import com.hms.pharmacy.pojo.BankMaster;
import com.hms.pharmacy.pojo.BranchMaster;
import com.hms.pharmacy.service.BankService;
import com.hms.pharmacy.service.BranchService;

@Controller
@RequestMapping(value = "/branch")
public class BranchController {
	@Autowired
	BranchService branchService;

	@Autowired
	BankService bankService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getBranchView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("branch", new BranchMaster());

		List<BranchMaster> branchMasters = new ArrayList<BranchMaster>();

		List<BankMaster> bankMasters = bankService.getBanks();

		branchMasters = branchService.getBranch();
		modelAndView.addObject("branchMasters", branchMasters);
		modelAndView.addObject("banks", bankMasters);

		modelAndView.setViewName("Pharma_Branch_Master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateBranch(
			@ModelAttribute("branch") BranchMaster branchMaster,
			BindingResult errors,
			@RequestParam("bankMasters") Set<Integer> ltBankMasters) {
		ModelAndView modelAndView = new ModelAndView();

		List<BankMaster> bankMasters = new ArrayList<BankMaster>();
		for (Integer bankId : ltBankMasters) {
			BankMaster bankMaster = new BankMaster();
			bankMaster.setBankId(bankId);
			bankMasters.add(bankMaster);
		}
		branchMaster.setBankMasters(bankMasters);
		/*
		 * HttpServletRequest request = null; HttpSession
		 * session=request.getSession(true); Integer userId=(Integer)
		 * session.getAttribute("userId1"); Integer unitId =(Integer)
		 * session.getAttribute("uId");
		 */
		/*
		 * branchMaster.setUserId(userId); branchMaster.setUserId(unitId);
		 */
		if (branchService.saveOrUpdateBranch(branchMaster)) {
			if (branchMaster.getBranchId() != null) {
				/*modelAndView.addObject("msg",
						"Record saved successfully..!");*/
			} else {
			/*	modelAndView.addObject("msg",
						"Record updated successfully..!");*/
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView.setViewName("redirect:/pharmacy/branch/view");
		return modelAndView;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteBranch(@RequestParam("branchId") Integer branchId) {
		Boolean flag = false;
		if (branchService.deleteBranch(branchId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/autoSuggestionBranchNames", method = RequestMethod.POST)
	public @ResponseBody List<BranchMaster> getAutoSuggestionBranchNames(@RequestParam("letter")String letter) 
	{
		List<BranchMaster> branchMasters = new ArrayList<BranchMaster>();
		branchMasters = branchService.getAutoSuggestionBranchNames(letter);
		return branchMasters;
	}

	@RequestMapping(value = "/getBranchById", method = RequestMethod.GET)
	public @ResponseBody
	List<AutoSuggestionBranch> getBranchById(@RequestParam("branchId") Integer branchId) {
		List<BranchMaster> branchMasters = new ArrayList<BranchMaster>();
		branchMasters = branchService.getBranchById(branchId);
		
		List<AutoSuggestionBranch> autoSuggestionBranchs=new ArrayList<AutoSuggestionBranch>();
		for(int i=0;i<branchMasters.size();i++)
		{
			BranchMaster branchMaster=branchMasters.get(i);
			AutoSuggestionBranch autoSuggestionBranch=new AutoSuggestionBranch();
			autoSuggestionBranch.setBranchId(branchMaster.getBranchId());
			autoSuggestionBranch.setBranchName(branchMaster.getBranchName());
			autoSuggestionBranch.setBranchAddress(branchMaster.getBranchAddress());
			autoSuggestionBranch.setBranchPhone(branchMaster.getBranchPhone());
			autoSuggestionBranch.setBranchMobileNum(branchMaster.getBranchMobileNum());
			autoSuggestionBranch.setBranchEmailId(branchMaster.getBranchEmailId());
			autoSuggestionBranch.setBankMasters(branchMaster.getBankMasters());
			autoSuggestionBranchs.add(i, autoSuggestionBranch);
			
		}
		return autoSuggestionBranchs;
	}
}