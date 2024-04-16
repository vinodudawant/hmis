package com.hms.ehat.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.AutosuggestionConfDto;
import com.hms.ehat.dto.AutosugConfigDto;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.DemographicPatientDto;

import com.hms.ehat.dto.ChargesMasterSlave;

import com.hms.ehat.service.AutosuggestionService;

@Controller  
@RequestMapping(value = "/autoallservicestest")
public class AutosuggestionController {
	@Autowired
	AutosuggestionService AutosuggestionService;
	
	
	/*@RequestMapping(value = "/getallservices", method = RequestMethod.POST)
	 @ResponseBody
	 public	AutosugeestionDto fetchsubserviceMasterList(@RequestParam("auto") String auto,@RequestParam("findingName") String  findingName	,HttpServletRequest request) {
		AutosugeestionDto obj = new AutosugeestionDto();

		if(auto.equalsIgnoreCase("allservices")){
		List<SubServiceDto> lstSubService = new ArrayList<SubServiceDto>();
		lstSubService = AutosuggestionService.getlistSubService(findingName,request);
	    obj.setLstSubService(lstSubService);
		}
		return obj;
	}*/
	
	@RequestMapping(value = "/getallservices", method = RequestMethod.POST)
	 @ResponseBody
	 public	AutosugeestionDto fetchServicesMasterList(@RequestParam("unit") Integer unit,
			 @RequestParam("depdocdeskid") Integer depdocdeskid,@RequestParam("findingName") String  findingName	,
			 @RequestParam("unitlist") String unitlist,@RequestParam("querytype") String querytype,
			 @RequestParam("serviceid") Integer serviceid,HttpServletRequest request
			 ) {
		AutosugeestionDto obj = new AutosugeestionDto();

	
		List<AutosugeestionDto> alllstService = new ArrayList<AutosugeestionDto>();
		alllstService = AutosuggestionService.getlistService(findingName,unit,unitlist,depdocdeskid,querytype,serviceid,request);
		
		//ADDED BY BILAL FOR HALL WISE FLOW  @RequestParam("treatId") int treatId
		/*int sponsorId =0; 
			
		int chargesSlaveId=0;
		int hallId=0;
		int hallSlaveId=0;
		int serviceids= alllstService.get(0).getCategoryid();
		double configchages =0.0;
		if (depdocdeskid == 2) {
			hallId=2;

			configchages= getchargessponsor(sponsorId,chargesSlaveId,
					hallId,hallSlaveId,serviceids,
					treatId) ;
			if (configchages > 0) {
				alllstService.get(0).setConfigCharges(configchages);
			}else{
				alllstService.get(0).setConfigCharges(alllstService.get(0).getCategorycharges());
			}
		}*/
		
	    obj.setLstService(alllstService);
		
		return obj;
	}
	
	/**
	 * @author Bilal
	 * @Date 22-JUN-2017
	 * @code For auto suggestion from configuration charges  AutosugConfigDto
	 * ***/
	@RequestMapping(value = "/getallchargesConfig", method = RequestMethod.POST)
	@ResponseBody
	public AutosugConfigDto getallchargesConfig(
			
			@RequestParam("findingName") String findingName,
						HttpServletRequest request, @RequestParam("sponsorId") int sponsorId
						, @RequestParam("chargesSlaveId") int chargesSlaveId,
						@RequestParam("sponsortabcall") String sponsortabcall,
						@RequestParam("hallId") int hallId,
						@RequestParam("hallSlaveId") int hallSlaveId,
						@RequestParam("treatId") int treatId
						) {
		AutosugConfigDto obj = new AutosugConfigDto();

		List<AutosugConfigDto> alllstService = new ArrayList<AutosugConfigDto>();
		alllstService = AutosuggestionService.getallchargesConfig(findingName,
				request, sponsorId, chargesSlaveId, sponsortabcall, hallId, hallSlaveId, treatId);
		obj.setLstchargesConfig(alllstService);

		return obj;
	}
	
	
	/**
	 * @author Bilal
	 * @Date 28-JUN-2017
	 * @code For auto suggestion from configuration charges for IPD 
	 * ***/
	@RequestMapping(value = "/getallchargesConfigForIPD", method = RequestMethod.POST)
	@ResponseBody
	public AutosugConfigDto getallchargesConfigForIPD(

	@RequestParam("findingName") String findingName,
			HttpServletRequest request,
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("chargesSlaveId") int chargesSlaveId,
			@RequestParam("hallId") int hallId,
			@RequestParam("hallSlaveId") int hallSlaveId) {
		AutosugConfigDto obj = new AutosugConfigDto();

		List<AutosugConfigDto> alllstService = new ArrayList<AutosugConfigDto>();
		alllstService = AutosuggestionService.getallchargesConfigForIPD(findingName,
				request, sponsorId, chargesSlaveId, hallId, hallSlaveId);
		obj.setLstchargesConfig(alllstService);

		return obj;
	}
	
	/***********
	 * @author    :BILAL
	 * @date      :27-JULY-2017
	 * @code      :for auto-suggestion of sponsor tab
	 * *********/
	@RequestMapping(value = "/getallservicesConf", method = RequestMethod.POST)
	@ResponseBody
	public AutosuggestionConfDto getallservicesConf(
			@RequestParam("unit") Integer unit,
			@RequestParam("depdocdeskid") Integer depdocdeskid,
			@RequestParam("findingName") String findingName,
			@RequestParam("unitlist") String unitlist,
			@RequestParam("querytype") String querytype,
			@RequestParam("serviceid") Integer serviceid,
			HttpServletRequest request,
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("chargesSlaveId") int chargesSlaveId,
			@RequestParam("hallId") int hallId,
			@RequestParam("hallSlaveId") int hallSlaveId,
			@RequestParam("treatId") int treatId) {
		AutosuggestionConfDto obj = new AutosuggestionConfDto();

		List<AutosuggestionConfDto> alllstService = new ArrayList<AutosuggestionConfDto>();
		alllstService = AutosuggestionService.getallservicesConf(findingName,
				unit, unitlist, depdocdeskid, querytype, serviceid, request,sponsorId,chargesSlaveId, hallId, hallSlaveId);
		if(hallId > 0){
			sponsorId =0;
			chargesSlaveId=0;
		}
		
		for (int i = 0; i < alllstService.size(); i++) {
			//GETTING SUB SERVICE ID @RequestParam("treatId") int treatId
			int serviceids= alllstService.get(i).getCategoryid();
			double configchages =0.0;
			
			//CALLING METHOD TO GET SPONSOR CHARGES 
		    configchages= getchargessponsor(sponsorId,chargesSlaveId,
						hallId,hallSlaveId,serviceids,
						treatId) ;
			
			if (configchages > 0) {
				alllstService.get(i).setConfigcharges(configchages);
			}else{
				double yearwisecharges= getyearwisecharges(serviceids);	
				if (yearwisecharges > 0) {
					alllstService.get(i).setConfigcharges(yearwisecharges);
				}else{
					alllstService.get(i).setConfigcharges(alllstService.get(i).getCategorycharges());
				}
				
			}
			
		}
		
		//FINALLY SETTING LIST OF SERVICE 
		obj.setLstService(alllstService);
		return obj;
	}	
	@RequestMapping(value = "/fetchpharmaproduct", method = RequestMethod.POST)
	 @ResponseBody
	 public	AutosugeestionDto fetchpharmaproductlist( @RequestParam("findingName")  String findingName,  @RequestParam("callform")  String callform ,HttpServletRequest request) {
		AutosugeestionDto obj = new AutosugeestionDto();

	
		List<AutosugeestionDto> alllstService = new ArrayList<AutosugeestionDto>();
		String validStore = request.getParameter("validStore");
		HttpSession session = request.getSession();
		String storeId = (String) session.getAttribute("pharmacyStoreId");
		//System.err.println("storeId from Controller=====>"+storeId);
		if (validStore != null) {
			if (session != null) {
				alllstService = AutosuggestionService.getlistpharmadetails(request,storeId,findingName,callform);
				}
			}else{
				alllstService = AutosuggestionService.getlistpharmadetails(request,"",findingName,callform);
			}
				
		
	    obj.setLstService(alllstService);
		
		return obj;
	}
	
	/**
	 * @author :Bilal
	 * @date   :27-july-2017
	 * @code   : for getCharges  **/
	
	@RequestMapping(value = "/getCharges", method = RequestMethod.POST)
	public @ResponseBody
	double getcharges(
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("chargesSlaveId") int chargesSlaveId,
			@RequestParam("hallId") int hallId,
			@RequestParam("hallSlaveId") int hallSlaveId,
			@RequestParam("serviceid") int serviceid,
			@RequestParam("treatId") int treatId,
			@RequestParam("toDate") String toDate) {

		        double a = AutosuggestionService.getcharges(sponsorId,
		        		chargesSlaveId,hallId,hallSlaveId,serviceid, treatId,toDate);

		return a;
	}
	
	/**
	 * @author :Bilal
	 * @date   :27-july-2017
	 * @code   : for getCharges for sponsor tab **/
	
	@RequestMapping(value = "/getchargessponsorForQuotation", method = RequestMethod.POST)
	public @ResponseBody
	double getchargessponsorForQuotation(
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("chargesSlaveId") int chargesSlaveId,
			@RequestParam("hallId") int hallId,
			@RequestParam("hallSlaveId") int hallSlaveId,
			@RequestParam("serviceid") int serviceid,
			@RequestParam("isComServId") int isComServId,
			@RequestParam("isComServlastId") int isComServlastId) {

		
		        double a = AutosuggestionService.getchargessponsorForQuotation(sponsorId,
		        		chargesSlaveId,hallId,hallSlaveId,serviceid,isComServId,isComServlastId );

		return a;
	}
	
	/**
	 * @author :Bilal
	 * @date   :27-july-2017
	 * @code   : for getCharges for sponsor tab **/
	
	@RequestMapping(value = "/getchargessponsor", method = RequestMethod.POST)
	public @ResponseBody
	double getchargessponsor(
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("chargesSlaveId") int chargesSlaveId,
			@RequestParam("hallId") int hallId,
			@RequestParam("hallSlaveId") int hallSlaveId,
			@RequestParam("serviceid") int serviceid,
			@RequestParam("treatId") int treatId) {

		        double a = AutosuggestionService.getchargessponsor(sponsorId,
		        		chargesSlaveId,hallId,hallSlaveId,serviceid, treatId);

		return a;
	}
	
	/***@author   :BILAL
	 * @Code      :For Fetching name of sponsor***/
	@RequestMapping(value = "/fetchSuperCatofchargesSlave", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchSuperCatofchargesSlave(@RequestParam("chargesSlaveId") Integer chargesSlaveId) {
		List<ChargesMasterSlave> ltSubcharges = new ArrayList<ChargesMasterSlave>();
		ltSubcharges = AutosuggestionService.fetchSuperCatofchargesSlave(chargesSlaveId);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltSubcharges);
		return obj;
	}
	/******
	 * @author     :BILAL
	 * @Date       :07-02-2018
	 * @Code       :For getting year wise charges of any service 
	 * ********/
	@RequestMapping(value = "/getyearwisecharges", method = RequestMethod.GET)
	public @ResponseBody
	double getyearwisecharges(
			@RequestParam("subserviceid") int subserviceid) {

		        double a = AutosuggestionService.getyearwisecharges(subserviceid);

		return a;
	}
	
	/******
	 * @author     :Laxman Nikam
	 * @Date       :31-May-2018
	 * @Code       :For getting Demographics patient Name.
	 * ********/
	@RequestMapping(value = "/fetchDemoPatientName", method = RequestMethod.POST)
	@ResponseBody
	public DemographicPatientDto fetchDemoPatientNm(@RequestParam("letter") String letter,
			@RequestParam("call") String call) {
		 
		DemographicPatientDto ltRegistrationViewDto = new  DemographicPatientDto();
		ltRegistrationViewDto = AutosuggestionService.fetchDemoPatientName(letter,call);	
		return ltRegistrationViewDto;
	}

	
	@RequestMapping(value = "/fetchOtSubInventoryProduct", method = RequestMethod.POST)
	 @ResponseBody
	 public	AutosugeestionDto fetchOtSubInventoryProduct(@RequestParam("findingName")  String findingName,  @RequestParam("callform")  String callform ,HttpServletRequest request) {
		AutosugeestionDto obj = new AutosugeestionDto();

		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String subInventory_Id = (String)resourceBundleEhat.getString("otSubInventoryId").trim();    
		Integer subInventoryId = Integer.parseInt(subInventory_Id);
		List<AutosugeestionDto> alllstService = new ArrayList<AutosugeestionDto>();
		String validStore = request.getParameter("validStore");
		HttpSession session = request.getSession();
		String storeId = (String) session.getAttribute("pharmacyStoreId");
		System.out.println(validStore+"storeId from Controller=====>"+storeId);
		alllstService = AutosuggestionService.fetchOtSubInventoryProduct(request,subInventoryId,findingName);
		
	    obj.setLstService(alllstService);
		
		return obj;
	}
	
	@RequestMapping(value = "/getBatchDetailsOnSelect", method = RequestMethod.POST)
	 @ResponseBody
	 public	AutosugeestionDto getBatchDetailsOnSelect(@RequestParam("itemId")  Integer itemId,HttpServletRequest request) {
		AutosugeestionDto obj = new AutosugeestionDto();

		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
		String subInventory_Id = (String)resourceBundleEhat.getString("otSubInventoryId").trim();    
		Integer subInventoryId = Integer.parseInt(subInventory_Id);
		
		List<AutosugeestionDto> alllstService = new ArrayList<AutosugeestionDto>();
		String validStore = request.getParameter("validStore");
		HttpSession session = request.getSession();
		String storeId = (String) session.getAttribute("pharmacyStoreId");
		System.out.println(validStore+"storeId from Controller=====>"+storeId);
		alllstService = AutosuggestionService.getBatchDetailsOnSelect(request,subInventoryId,itemId);
		
	    obj.setLstService(alllstService);
		
		return obj;
	}
	
	@RequestMapping(value = "/fetchPackageCharges", method = RequestMethod.GET)
	 @ResponseBody
	 public String fetchPackageCharges(@RequestParam("packageId") String packageId) {
		
		String fetchPackageCharges = AutosuggestionService.fetchPackageCharges(packageId);
		
		return fetchPackageCharges;
		
		
		
	}
}
