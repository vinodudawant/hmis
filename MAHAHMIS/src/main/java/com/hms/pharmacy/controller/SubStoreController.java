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

import com.hms.pharmacy.pojo.SubStoreMaster;
import com.hms.pharmacy.service.SubStoreService;

@Controller
@RequestMapping(value = "/store")
public class SubStoreController {
	
	@Autowired
	SubStoreService subStoreService;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getStoreView() 
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("store", new SubStoreMaster());
		List<SubStoreMaster> subStoreMasters = new ArrayList<SubStoreMaster>();
		subStoreMasters = subStoreService.getStoreDetails("limit");
		modelAndView.addObject("subStoreMasters", subStoreMasters);
		modelAndView.setViewName("pharma_store_master");
		return modelAndView;
	}
	
	
	@RequestMapping(value = "/getAllStore", method = RequestMethod.GET)
	public @ResponseBody List<SubStoreMaster> getAllStore() {
		List<SubStoreMaster> subStoreMasters = new ArrayList<SubStoreMaster>();
		subStoreMasters = subStoreService.getStoreDetails("");
		return subStoreMasters;
	}
	
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateStore(
			@ModelAttribute("store") SubStoreMaster subStoreMaster,HttpServletRequest request,HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView();
		
		String result=	subStoreMaster.getStoreName().trim();
		String finalResult=result.replaceAll("\\s","_");
		subStoreMaster.setStoreName(finalResult.toLowerCase());
		
		if (subStoreService.saveOrUpdateStore(subStoreMaster,request)) {
			
		
			if (subStoreMaster.getStoreId() != null) {
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
				.setViewName("redirect:/pharmacy/store/view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/autoSuggestionStore", method = RequestMethod.GET)
	public @ResponseBody List<SubStoreMaster> getAutoSuggestionStoreNames(@RequestParam("letter")String letter) {
		List<SubStoreMaster> subStoreMasters = new ArrayList<SubStoreMaster>();
		subStoreMasters = subStoreService.getAutoSuggestionStoreNames(letter);
		return subStoreMasters;
	}
	
	@RequestMapping(value = "/getStoreById", method = RequestMethod.GET)
	public @ResponseBody List<SubStoreMaster> getStoreById(@RequestParam("storeId")Integer storeId) {
		List<SubStoreMaster> subStoreMasters = new ArrayList<SubStoreMaster>();
		subStoreMasters = subStoreService.getStoreById(storeId);
		return subStoreMasters;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteStore(@RequestParam("storeId") Integer storeId) {
		Boolean flag = false;
		if (subStoreService.deleteStore(storeId)) {
			flag = true;
		}
		return flag;
	}
	
	@RequestMapping(value = "/editStoreAuthentication", method = RequestMethod.GET)
	public @ResponseBody boolean editStoreAuthentication(@RequestParam("storeId")Integer storeId,@RequestParam("users")String users) {
		if(users!=null)
		{
			users="0";
		}
		boolean result =false;
		result= subStoreService.editStoreAuthentication(storeId,users);
		return result;
	}
	
	@RequestMapping(value = "/SubStoreList", method = RequestMethod.GET)
	public @ResponseBody
	SubStoreMaster getSubStoreList() {
		List<SubStoreMaster> lts = new ArrayList<SubStoreMaster>();
		lts = subStoreService.getSubStoreList();
		SubStoreMaster obj = new SubStoreMaster();
		obj.setLstSubStore(lts);
		return obj;
	}

	
}
