package com.hms.ehat.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;


import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.EhatSubChargesView;
import com.hms.ehat.dto.EhatSubServiceview;

import com.hms.ehat.dto.SubServiceDto;

import com.hms.ehat.service.ChargesSlaveService;
import com.hms.ehat.service.DeptService;
import com.hms.ehat.service.SubServiceService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;

/**
 * @author Bilal
 * @date 26_May_2017
 * @code For sub service
 ***/
@Controller
@RequestMapping(value = "/subservice")
public class SubServiceController {

	@Autowired
	SubServiceService subServiceService;

	@Autowired
	ChargesSlaveService chargesSlaveService;
	
	@Autowired
	DeptService deptService;
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For saving or updating records of sub service
	 ***/
	@RequestMapping(value = "/saveSubService", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateSubService(
			HttpServletRequest request,
			
			@RequestParam("subservicelist") String subservicelist,@RequestParam("hospitalUnitId") Integer hospitalUnitId) {
	//	@RequestParam("subservicelist") String subservicelist) {

		/**
		 * SubServiceDto subServiceDto,
		 * , ServiceMasterDto serviceMasterDto,
		 * @RequestParam Integer subId, @RequestParam Integer selfId,
		 * ***/
		SubServiceDto subServiceDto2 = (SubServiceDto) ConfigUIJSONUtility
				.getObjectFromJSON(subservicelist, SubServiceDto.class);
		
		// To get the response from service
		int response = subServiceService.saveOrUpdateSubService(subServiceDto2.getLstSubService().get(0),hospitalUnitId,request);
// 		int response = subServiceService.saveOrUpdateSubService(subServiceDto2.getLstSubService().get(0),request);

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Name Allready exist"
						: "Network Error!!!"));
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For deleting records of sub service with id
	 ***/
	@RequestMapping(value = "/deleteSubService", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChragesSlave(@RequestParam("subId") Integer subId,
			HttpServletRequest request) {

		boolean response = subServiceService.deleteSubService(subId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			//msg = "Oops Some Problem Ocured";
			msg = "You Can Not Delete Service";
		}
		return msg;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching List of sub service
	 ***/
	@RequestMapping(value = "/SubServiceList", method = RequestMethod.POST)
	public @ResponseBody
		SubServiceDto getSubServiceList() {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubService();
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}

	/**
	 * @author Bilal
	 * @date 31_May_2017
	 * @code For fetching List of sub service with flag n
	 ***/
	@RequestMapping(value = "/SubServiceCategoryList", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceCategoryList() {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceCategory();
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		
		
		
		return obj;
	}
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching all List of sub service
	 ***/
	@RequestMapping(value = "/allSubServiceList", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getAllSubServicesList() {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getAllSubService();
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For auto suggestions names
	 * ,
			@RequestParam("masterId") Integer masterId,
			
	 ***/
	@RequestMapping(value = "/autoSuggestionSubServiceNames", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getAutoSuggestionSubServiceNames(@RequestParam String letter,
			@RequestParam("serviceId") Integer masterId, @RequestParam("selfId") Integer selfId) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getAutoSuggestionSubService(letter,
				masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;

	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching List of sub service with master id and with self id
	 ***/
	@RequestMapping(value = "/getSubServiceById", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceById(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceById(masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	/******
	 * @author    :Rahul Patil
	 * @Code      :For getting multiple SubserviceList 
	 * ******/
	@RequestMapping(value = "/getmultipleSubservice", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getmultipleSubservice(@RequestParam("masterId") String masterId,
			@RequestParam("selfId") Integer selfId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getmultipleSubservice(masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	/**
	 * @author Bilal
	 * @date 30_May_2017
	 * @code For fetching List of sub service with master id and with self id hows flag is N
	 ***/
	@RequestMapping(value = "/getSubServiceIsCat", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceIsCat(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceIsCat(masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	/********
	 * @author	Touheed
	 * @base 	Fetching super master of service based on there id
	 * @since	1st-June-2017 
	 ********/
	@RequestMapping(value = "/fetchSuperCatogoires", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto fetchSuperCatogoires(@RequestParam("serviceId") Integer serviceId) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.fetchSuperCatogoires(serviceId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}

	/**
	 * @author Bilal
	 * @date 7_Jun_2017
	 * @code For fetching List of sub service
	 ***/
	@RequestMapping(value = "/SubServiceListCatY", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceListCatY() {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceCatY();
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	/**
	 * @author Bilal
	 * @date 7_Jun_2017
	 * @code For fetching List of sub service whose category is N
	 ***/
	@RequestMapping(value = "/SubServiceListCatN", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceListCatN() {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceCatN();
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		
		//setting charges list
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		
		ltChargesSlave = chargesSlaveService.getAllChargesforhall();
	
		ChargesMasterSlave cs = new ChargesMasterSlave();
		cs.setCategoryName("#");cs.setSlaveId(-1);
		ltChargesSlave.add(0, cs);
		
		ChargesMasterSlave cs2 = new ChargesMasterSlave();
		cs2.setCategoryName("Service Name");cs2.setSlaveId(-1);
		ltChargesSlave.add(1, cs2);
		
		
		ChargesMasterSlave cs3 = new ChargesMasterSlave();
		cs3.setCategoryName("Defaut Charges");cs3.setSlaveId(-1);
		ltChargesSlave.add(2, cs3);
		
		
		obj.setLstsubcharges(ltChargesSlave);
		return obj;
	}
	
	/**
	 * @author Bilal
	 * @date 7_JUN_2017
	 * @code For fetching List of sub service with master id and with self id hows flag is Y
	 ***/
	@RequestMapping(value = "/getSubServiceIsCatY", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceIsCatY(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceIsCatY(masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For auto suggestions names
	 	
	 ***/
	@RequestMapping(value = "/getSubServiceIsCatForSearch", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceIsCatForSearch(@RequestParam String letter,
			@RequestParam("serviceId") Integer masterId, @RequestParam("selfId") Integer selfId) {
		
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceIsCatForSearch(masterId, selfId,letter);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;

	}
	
	
	
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For auto suggestions names
	 
	 ***/
	@RequestMapping(value = "/getAutoSuggestionSubServiceMaster", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getAutoSuggestionSubServiceMaster(@RequestParam String letter) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getAutoSuggestionSubServiceMaster(letter);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;

	}
	
	/**
	 * @author Bilal
	 * @date 06-July-2017
	 * @code for sub service count***/
	@RequestMapping(value = "/getSubServiceCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getSubServiceCount() {
		
		Long totaleCount = subServiceService.getSubServiceCount();	
		return totaleCount;
	}	
	
	/**
	 * @author Bilal
	 * @date   31-july_2017
	 * @code   For fetching List of sub service with master id and with self id is combination
	 ***/
	@RequestMapping(value = "/getSubServiceByIdcom", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceByIdcom(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceByIdcom(masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	/**
	 * @author Bilal
	 * @date   14-Aug-2017
	 * @code   For fetching List of sub service with 
	 ***/
	@RequestMapping(value = "/getAmountofService", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getAmountofService(@RequestParam("isComServlastId") Integer isComServlastId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getAmountofService(isComServlastId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	@RequestMapping(value = "/getAmountofConfiguredPkg", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getAmountofConfiguredPkg(@RequestParam("configureId") Integer configureId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getAmountofConfiguredPkg(configureId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	
	/***@Author    :BILAL
	 *@Date        :23-10-2017
	 *@Code        :For getting sub services and halls***/
	@RequestMapping(value = "/getSubServicewithhall", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServicewithhall(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceIsCat(masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		
		//setting charges list
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
				
		ltChargesSlave = chargesSlaveService.getAllChargesforhall();
			
		ChargesMasterSlave cs = new ChargesMasterSlave();
		cs.setCategoryName("#");cs.setSlaveId(-1);
		ltChargesSlave.add(0, cs);
				
		ChargesMasterSlave cs2 = new ChargesMasterSlave();
		cs2.setCategoryName("Service Name");cs2.setSlaveId(-1);
		ltChargesSlave.add(1, cs2);
				
				
		ChargesMasterSlave cs3 = new ChargesMasterSlave();
		cs3.setCategoryName("Defaut Charges");cs3.setSlaveId(-1);
		ltChargesSlave.add(2, cs3);
				
				
		obj.setLstsubcharges(ltChargesSlave);
				
		return obj;
	}
	
	/***@Author    :BILAL
	 *@Date        :23-10-2017
	 *@Code        :For getting sub services and halls***/
	@RequestMapping(value = "/setdatahallandser", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto setdatahallandser(@RequestParam String letter) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getAutoSuggestionSubServiceMaster(letter);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		
		//setting charges list
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
						
		ltChargesSlave = chargesSlaveService.getAllChargesforhall();
					
		ChargesMasterSlave cs = new ChargesMasterSlave();
		cs.setCategoryName("#");cs.setSlaveId(-1);
		
		ltChargesSlave.add(0, cs);
						
		ChargesMasterSlave cs2 = new ChargesMasterSlave();
		cs2.setCategoryName("Service Name");cs2.setSlaveId(-1);
		ltChargesSlave.add(1, cs2);
						
						
		ChargesMasterSlave cs3 = new ChargesMasterSlave();
		cs3.setCategoryName("Defaut Charges");cs3.setSlaveId(-1);
		ltChargesSlave.add(2, cs3);
						
						
		obj.setLstsubcharges(ltChargesSlave);
		return obj;

	}
	
	
	/***@author    :BILAL
	 * @Date       :03-11-2017
	 * @Code       :For getting name and id of state district using district id****/
	/*public String getStringValOfObject(@RequestParam("masterId") Integer masterId) {
		String code = genericDao.getStringValOfObject(tableName, columnName, pkId, pkColumn);
		
		return code;
	}*/
	
	/*@RequestMapping(value = "/getSponsorList", method = RequestMethod.POST)
	public @ResponseBody
	int fetchreceiptId() {
		
		//setting charges list
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		ltChargesSlave = chargesSlaveService.getAllChargesforhall();
		
		
	}*/
	/*******
	 * @author      :BILAL
	 * @Date        :18-01-2018
	 * @Code        :For services and leaf services for profess percentage master 
	 * ********/
	@RequestMapping(value = "/getSubServicesFoprofees", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServicesFoprofees(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId,HttpServletRequest request) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServicesFoprofees(masterId, selfId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		
		List<DeptMasterDto> ltDeptMasters = new ArrayList<DeptMasterDto>();
		ltDeptMasters = deptService.getDeptMasterListAll(request);
					
		obj.setLstDepts(ltDeptMasters);
		return obj;
	}
	/*******
	 * @author      :BILAL
	 * @Date        :02-02-2018
	 * @Code        :For import of services master  
	 * ********/
	@RequestMapping(value="/importservices",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String importservices(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
	{
		int response =0;
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			 response =	subServiceService.importservices(UPLOAD_DIRECTORY + fileName);
		}
		
		
		return ((response == 1) ? "Service Master File Imported Successfully"
				
						: "Network Error!!!");
	}
	
	/*******
	 * @author      :BILAL
	 * @Date        :02-02-2018
	 * @Code        :For import of sub services master  
	 * ********/
	@RequestMapping(value="/importSubservices",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String importSubservices(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
	{
		int response =0;
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			 response =	subServiceService.importSubservices(UPLOAD_DIRECTORY + fileName);
		}
		
		
		return ((response == 1) ? "Master of Master File Imported Successfully"
				
						: "Network Error!!!");
	}
	/******
	 * @author    :BILAL
	 * @Date      :13-02-2018
	 * @Code      :For getting list of sub service from view 
	 * ******/
	@RequestMapping(value = "/subservicelistfromview", method = RequestMethod.GET)
	public @ResponseBody
	EhatSubServiceview subservicelistfromview() {
		List<EhatSubServiceview> lstsubser = new ArrayList<EhatSubServiceview>();
		lstsubser = subServiceService.subservicelistfromview();
		EhatSubServiceview obj = new EhatSubServiceview();
		obj.setLstsubser(lstsubser);

		return obj;
	}
	/******
	 * @author    :BILAL
	 * @Date      :13-02-2018
	 * @Code      :For getting list of sub service for report
	 * ******/
	@RequestMapping(value = "/getpServiceDetailsDatareport", method = RequestMethod.POST)
	public @ResponseBody
	EhatSubServiceview getpServiceDetailsDatareport(@RequestParam("masterId") int masterId,
			@RequestParam("selfId") int selfId) {

		List<EhatSubServiceview> ltSubService = new ArrayList<EhatSubServiceview>();
		ltSubService = subServiceService.getpServiceDetailsDatareport(masterId,
				selfId);
		EhatSubServiceview obj = new EhatSubServiceview();
		obj.setLstsubser(ltSubService);

		
		return obj;
	}
	/******
	 * @author    :BILAL
	 * @Date      :13-02-2018
	 * @Code      :For getting list of sub service for report
	 * ******/
	@RequestMapping(value = "/getpChargesDetailsDatareport", method = RequestMethod.POST)
	public @ResponseBody
	EhatSubChargesView getpChargesDetailsDatareport(@RequestParam("masterId") int masterId,
			@RequestParam("selfId") int selfId) {

		List<EhatSubChargesView> ltSubService = new ArrayList<EhatSubChargesView>();
		ltSubService = subServiceService.getpChargesDetailsDatareport(masterId,
				selfId);
		EhatSubChargesView obj = new EhatSubChargesView();
		obj.setLstsubser(ltSubService);

		
		return obj;
	}
	/******
	 * @author    :BILAL
	 * @Date      :13-02-2018
	 * @Code      :For getting super list for configuration 
	 * ******/
	@RequestMapping(value = "/fetchsup", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto fetchsup(@RequestParam("serviceId") Integer serviceId) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.fetchsup(serviceId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
	
	
	/******
	 * @author    :BILAL
	 * @Date      :23-03-2018
	 * @Code      :For getting canteen services 
	 * ******/
	@RequestMapping(value = "/getcateenservices", method = RequestMethod.GET)
	public @ResponseBody
	SubServiceDto getcateenservices(@RequestParam("findingName") String letter) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getcateenservices(letter);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;

	}
	/******
	 * @author    :BILAL
	 * @Date      :23-03-2018
	 * @Code      :For getting canteen services  by code 
	 * ******/
	@RequestMapping(value = "/getcateenservicesbycode", method = RequestMethod.GET)
	public @ResponseBody
	SubServiceDto getcateenservicesbycode(@RequestParam("findingName") String letter) {
		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getcateenservicesbycode(letter);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;

	}
	
	//ADDED BY JAGRUTI 
	@RequestMapping(value = "/getSubServiceByUnitId", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto getSubServiceById(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId , @RequestParam("unitId") Integer unitId) {

		List<SubServiceDto> ltSubService = new ArrayList<SubServiceDto>();
		ltSubService = subServiceService.getSubServiceByUnitId(masterId, selfId ,unitId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(ltSubService);
		return obj;
	}
}

