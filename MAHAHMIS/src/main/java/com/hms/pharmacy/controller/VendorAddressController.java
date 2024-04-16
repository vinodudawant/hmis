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

import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.service.VendorAddressService;

@Controller
@RequestMapping(value = "/vendoraddress")
public class VendorAddressController 
{
	@Autowired
	VendorAddressService vendorAddressSevice;

	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView getvendorAddressView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("vendorAddress", new VendorAddress());

		List<VendorAddress> ltVendorAddresss = new ArrayList<VendorAddress>();
		ltVendorAddresss = vendorAddressSevice.getAllVendorAddress();
		modelAndView.addObject("ltVendorAddresss", ltVendorAddresss);
	   	modelAndView.setViewName("Pharma_vendorAddress_master");
		return modelAndView;
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateDoctor(
			@ModelAttribute("vendorAddress") VendorAddress vendorAddressMaster) {
		ModelAndView modelAndView = new ModelAndView();
	
		
		if (vendorAddressSevice.saveOrUpdateVendorAddress(vendorAddressMaster)==null) 
		{
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView
				.setViewName("redirect:/pharmacy/vendorAddress/view");
		return modelAndView;
	}
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteDoctor(@RequestParam("vendorAddressId") Integer vendorAddressId) {
		Boolean flag = false;
		if (vendorAddressSevice.deleteVendorAddress(vendorAddressId)) {
			flag = true;
		}
		return flag;
	}

	
	@RequestMapping(value = "/allvendorAddressList", method = RequestMethod.GET)
	public @ResponseBody
	List<VendorAddress> allvendorAddressList() {
		return vendorAddressSevice.getAllVendorAddress();
	}
	
	@RequestMapping(value = "/getAllAddressOfVendor", method = RequestMethod.GET)
	public @ResponseBody
	List<VendorAddress> getAllAddressOfVendor(@RequestParam int vendorId) {		
		List<VendorAddress> lstvendadd= vendorAddressSevice.getAllAddressOfVendor(vendorId);
		return lstvendadd;
	}
	
	@RequestMapping(value = "/changeVendorAdd", method = RequestMethod.GET)
	public @ResponseBody
	VendorAddress getAllAddressOfVendorByState(@RequestParam int stateid) {		
		//return vendorAddressSevice.getAllAddressOfVendorByState(stateid);
		
		List<VendorAddress> lts = new ArrayList<VendorAddress>();
		lts =  vendorAddressSevice.getAllAddressOfVendorByState(stateid);
		VendorAddress obj = new VendorAddress();
		obj.setLstvendadd(lts);
		
		return obj;
	}

}
