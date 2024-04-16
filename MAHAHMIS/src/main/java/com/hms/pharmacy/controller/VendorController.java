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

import com.hms.administrator.dto.district_taluka_city;
import com.hms.dto.Users;
import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.pharmacy.pojo.PharmaVendorView;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.VendorAddressService;
import com.hms.pharmacy.service.VendorService;

@Controller
@RequestMapping(value="/vendor")
public class VendorController 
{
	@Autowired
	VendorService vendorService;
	
	@Autowired
	VendorAddressService vendorAddressSevice;
	
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public ModelAndView loadVendorPage() 
	{
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.addObject("vendor", new VendorMaster());
			modelAndView.setViewName("Pharma_Vendor_Master");
			List<VendorMaster> vendorMasters=vendorService.getVendors();
			modelAndView.addObject("vendorMasters",vendorMasters);
			return modelAndView;
	}
	
	
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView addVendor(
			@ModelAttribute("vendor") VendorMaster vendorMaster) {
		List<VendorAddress> list=new ArrayList<VendorAddress>();
		
		  for(int i=0; i<vendorMaster.getVendorAddresses().size();i++){
		  list.add(vendorMaster.getVendorAddresses().get(i)); }
		 
		if(vendorMaster.getVendorId().equals(null)) {
			vendorMaster.setVendorId(0);
		}
		vendorMaster.setVendorAddresses(list);
		ModelAndView modelAndView = new ModelAndView();
		vendorService.saveVendor(vendorMaster);
		
		modelAndView
				.setViewName("redirect:/pharmacy/vendor/view");
		return modelAndView;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteVendor(@RequestParam("vendorId") Integer vendorId) {
		Boolean flag = false;
		if (vendorService.deleteVendor(vendorId)) {
			flag = true;
		}
		return flag;
	}
	
	@RequestMapping(value = "/autoSuggestionVendor", method = RequestMethod.GET)
	public @ResponseBody List<VendorMaster> autoSuggestionVendor(@RequestParam("letter")String letter,@RequestParam(value="vmi",required = false) Integer vmi) {
		List<VendorMaster> vendorMasters = vendorService.getAutoSuggestionVendorNames(letter,vmi);
		return vendorMasters;
	}
	
	@RequestMapping(value = "/autoSuggestionVendorWithDeleteVendor", method = RequestMethod.GET)
	public @ResponseBody List<VendorMaster> autoSuggestionVendorWithDelete(@RequestParam("letter")String letter) {
		 
		List<VendorMaster> vendorMasters = vendorService.autoSuggestionVendorWithDelete(letter);
		return vendorMasters;
	}
	
	
	@RequestMapping(value = "/getVendorById", method = RequestMethod.GET)
	public @ResponseBody List<VendorMaster> getVendorById(@RequestParam("vendorId")Integer vendorId) {
		List<VendorMaster> vendorMasters = vendorService.getVendorById(vendorId);
		return vendorMasters;
	}
	
	/******
	 * @author     :BILAL 
	 * @Date       :21-12-2017
	 * @Code       :For getting list of vendor name for dispatch bill 
	 * ******/
	@RequestMapping(value = "/getVendorList", method = RequestMethod.GET)
	public @ResponseBody
	VendorMaster getVendorList() {
		List<VendorMaster> ltvendor = new ArrayList<VendorMaster>();
		ltvendor = vendorService.getVendorList();
		VendorMaster obj = new VendorMaster();
		obj.setLstvendors(ltvendor);
		
		return obj;
	}
	
	/******
	 * @author     :BILAL 
	 * @Date       :21-12-2017
	 * @Code       :For getting list of vendor name and vendor address from view to show on GRN  
	 * ******/
	@RequestMapping(value = "/fetchVendorListwithmultipleAdd", method = RequestMethod.GET)
	public @ResponseBody
	PharmaVendorView fetchVendorListwithmultipleAdd(@RequestParam("findingName") String  findingName) {
		List<PharmaVendorView> lstview = new ArrayList<PharmaVendorView>();
		lstview = vendorService.fetchVendorListwithmultipleAdd(findingName);
		PharmaVendorView obj = new PharmaVendorView();
		obj.setLstvendorDetails(lstview);

		return obj;
	}
	/******
	 * @author     :BILAL 
	 * @Date       :21-12-2017
	 * @Code       :For getting list of vendor name auto Suggestion   
	 * ******/
	@RequestMapping(value = "/autoSuggestionv", method = RequestMethod.GET)
	public @ResponseBody
	VendorMaster getAutoSuggestionSubServiceNames(@RequestParam("findingName") String letter
			) {
		List<VendorMaster> ltvendor = new ArrayList<VendorMaster>();
		ltvendor = vendorService.getVendorListauto(letter);
		VendorMaster obj = new VendorMaster();
		obj.setLstvendors(ltvendor);
		
		return obj;

	}
	
	/******
	 * @author     :BILAL 
	 * @Date       :21-12-2017
	 * @Code       :For getting list of vendor name auto Suggestion   
	 * ******/
	@RequestMapping(value = "/getlistVenAdd", method = RequestMethod.GET)
	public @ResponseBody
	VendorMaster getlistVenAdd(
			) {
		List<VendorMaster> ltvendor = new ArrayList<VendorMaster>();
		ltvendor = vendorService.getlistVenAdd();
		VendorMaster obj = new VendorMaster();
		obj.setLstvendors(ltvendor);
		
		return obj;

	}
	/******
	 * @author     :BILAL 
	 * @Date       :21-12-2017
	 * @Code       :For getting list of vendor name auto Suggestion   
	 * ******/
	@RequestMapping(value = "/getlistVenAddById", method = RequestMethod.GET)
	public @ResponseBody
	VendorMaster getlistVenAddById(@RequestParam("vendorId") int vendorId
			) {
		List<VendorMaster> ltvendor = new ArrayList<VendorMaster>();
		ltvendor = vendorService.getlistVenAddById(vendorId);
		VendorMaster obj = new VendorMaster();
		obj.setLstvendors(ltvendor);
		
		return obj;

	}
	
	//added by Akshata
	@RequestMapping(value = "/fetchStateListForReg", method = RequestMethod.POST)
	public @ResponseBody
	StateMasterDto fetchStateListForReg(@RequestParam("StateType") String StateType) {
		List<StateMasterDto> lstStateMaster = new ArrayList<StateMasterDto>();
		lstStateMaster = vendorService.fetchStateListForReg();
		StateMasterDto obj = new StateMasterDto();
		obj.setLstStateMaster(lstStateMaster);
		return obj;
	}

	
	
	//added by Akshata
		@RequestMapping(value = "/fetchDistrictListForReg", method = RequestMethod.POST)
		public @ResponseBody
		DistrictMasterDto fetchDistrictListForReg(@RequestParam("TalukaType") String TalukaType) {
			List<DistrictMasterDto> lstDistrictMaster = new ArrayList<DistrictMasterDto>();
			lstDistrictMaster = vendorService.fetchDistrictListForReg();
			DistrictMasterDto obj = new DistrictMasterDto();
			obj.setLstDistrictMaster(lstDistrictMaster);
			
			return obj;
		}
		//added by Akshata
		
		@RequestMapping(value = "/fetchTalukaListForReg", method = RequestMethod.POST)
		public @ResponseBody
		district_taluka_city fetchTalukaListForReg(@RequestParam("TalukaType") String TalukaType) {
			List<district_taluka_city> cityList = new ArrayList<district_taluka_city>();
			cityList = vendorService.fetchTalukaListForReg();
			district_taluka_city obj = new district_taluka_city();
			obj.setcityList(cityList);
			
			return obj;
		}
		@RequestMapping(value = "/autoSuggestionvendorNew", method = RequestMethod.GET)
		public @ResponseBody
		VendorMaster autoSuggestionvendorNew(@RequestParam("findingName") String letter
				) {
			List<VendorMaster> ltvendor = new ArrayList<VendorMaster>();
			ltvendor = vendorService.autoSuggestionvendorNew(letter);
			VendorMaster obj = new VendorMaster();
			obj.setLstvendors(ltvendor);
			
			return obj;

		}
		
		@RequestMapping(value = "/getlistVenAddressById", method = RequestMethod.GET)
		public @ResponseBody
		List<VendorAddress> getlistVenAddressById(
				@RequestParam("vendorId") Integer vendorId) {
			List<VendorAddress> ltvendor = new ArrayList<VendorAddress>();
			ltvendor = vendorService.getlistVenAddressById(vendorId);
			return ltvendor;
		}
		
}
