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

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;

import com.hms.ehat.service.ChargesSlaveService;
import com.hms.pharmacy.upload.FilePath;
/**
 * @author Bilal
 * @date 25_May_2017
 * @code For sub service
 ***/
@Controller
@RequestMapping(value = "/chargesSlave")
public class ChargesSlaveController {

	@Autowired
	ChargesSlaveService chargesSlaveService;

	/**
	 * @author Bilal
	 * @date 25_May_2017
	 * @code For saving or updating records of sub service
	 ***/
	@RequestMapping(value = "/saveChragesSlave", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateChargesMaster(
			ChargesMasterSlave chargesMasterSlave, HttpServletRequest request,
			ChargesMasterDto chargesMaster, @RequestParam Integer slaveId, @RequestParam Integer selfId) {

		// @RequestParam("chargesId") Integer chargesId
		int response = chargesSlaveService.saveOrUpdateChargesSlave(
				chargesMasterSlave, request, chargesMaster, slaveId,selfId);// To get
																		// the
		// response from
		// service

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Name Allready exist"
						: "Network Error!!!"));
	}

	/**
	 * @author Bilal
	 * @date 25_May_2017
	 * @code For deleting records of sub service with id
	 ***/
	@RequestMapping(value = "/deleteChragesSlave", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChragesSlave(@RequestParam("slaveId") Integer slaveId,
			HttpServletRequest request) {

		boolean response = chargesSlaveService.deleteChragesSlave(slaveId,
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
	 * @author Bilal
	 * @date 25_May_2017
	 * @code For fetching List of sub service
	 ***/
	@RequestMapping(value = "/chragesSlaveList", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave getChragesSlaveList() {
		List<ChargesMasterSlave> ltchragesSlave = new ArrayList<ChargesMasterSlave>();
		ltchragesSlave = chargesSlaveService.getChragesSlave();
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltchragesSlave);
		return obj;
	}

	/**
	 * @author Bilal
	 * @date 25_May_2017
	 * @code For fetching all List of sub charges
	 ***/
	@RequestMapping(value = "/allChargesSlaveList", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave getAllChragesSlaveList() {
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		ltChargesSlave = chargesSlaveService.getAllChargesSlave();
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltChargesSlave);
		return obj;
	}

	/**
	 * @author Bilal
	 * @date 25_May_2017
	 * @code For auto suggestions names
	 ***/
	@RequestMapping(value = "/autoSuggestionChargesSlaveNames", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave getAutoSuggestionChragesSlaveNames(
			@RequestParam String letter) {
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		ltChargesSlave = chargesSlaveService
				.getAutoSuggestionChargesSlave(letter);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltChargesSlave);
		return obj;

	}

	/**
	 * @author Bilal
	 * @date 25_May_2017
	 * @code For fetching List of sub charges with master id and with self id
	 ***/
	@RequestMapping(value = "/getChragesSlaveById", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave getChragesSlaveById(
			@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {
	
		List<ChargesMasterSlave> ltChragesSlave = new ArrayList<ChargesMasterSlave>();
		ltChragesSlave = chargesSlaveService.getChargesSlaveById(masterId,
				selfId);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltChragesSlave);
		return obj;
	}
	
	/********
	 * @author Bilal
	 * @base Fetching super master of service based on there id
	 * @since 1st-June-2017
	 ********/
	@RequestMapping(value = "/fetchSuperCatogoires", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchSuperCatogoires(
			@RequestParam("chargesMasterDto") Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		ltSubCharges = chargesSlaveService
				.fetchSuperCatogoires(chargesMasterDto);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltSubCharges);
		return obj;
	}

	/**
	 * @author Bilal
	 * @date 25_May_2017
	 * @code For auto suggestions names
	 ***/
	@RequestMapping(value = "/autoSuggestionChargesMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave autoSuggestionsubCharges(@RequestParam String letter) {
		
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		ltChargesSlave = chargesSlaveService.getAutoSuggestionChargesSlave(letter);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltChargesSlave);
		return obj;


	}
	
	/**
	 * @author Bilal
	 * @date 10-July-2017
	 * @code for sub charges count***/
	@RequestMapping(value = "/getSubChargesCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getSubServiceCount() {
		
		Long totaleCount = chargesSlaveService.getSubChargesCount();	
		return totaleCount;
	}
	
	/**
	 * @author     :BILAL
	 * @date       :09-10-2017
	 * @code       :For fetching charges information on load of chargesinfo.jsp
	 ***/
	@RequestMapping(value = "/fetchargesinfo", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchargesinfo() {
		List<ChargesMasterSlave> ltchragesSlave = new ArrayList<ChargesMasterSlave>();
		ltchragesSlave = chargesSlaveService.fetchargesinfo();
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltchragesSlave);
		return obj;
	}
	
	/**
	 * @author     :BILAL
	 * @date       :09-10-2017
	 * @code       :For fetching charges information on load of chargesinfo.jsp
	 ***/
	@RequestMapping(value = "/fetchargesinfomaster", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchargesinfomaster(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {

		List<ChargesMasterSlave> ltc = new ArrayList<ChargesMasterSlave>();
		ltc = chargesSlaveService.fetchargesinfomaster(masterId, selfId);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltc);
		return obj;
	}
	
	/**
	 * @author     :BILAL
	 * @date       :09-10-2017
	 * @code       :For auto suggestion charges information on load of chargesinfo.jsp
	 ***/
	@RequestMapping(value = "/setChargesInfoData", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave setChargesInfoData(
			@RequestParam String letter) {
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		ltChargesSlave = chargesSlaveService
				.setChargesInfoData(letter);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltChargesSlave);
		return obj;

	}
	
	/**
	 * @author     :BILAL
	 * @date       :09-10-2017
	 * @code       :For fetching charges information on load of chargesinfo.jsp
	 ***/
	@RequestMapping(value = "/fetcatY", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetcatY(@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {

		List<ChargesMasterSlave> ltc = new ArrayList<ChargesMasterSlave>();
		ltc = chargesSlaveService.fetcatY(masterId, selfId);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltc);
		return obj;
	}
	
	/**
	 * @author     :BILAL
	 * @date       :09-10-2017
	 * @code       :For fetching under sponsor list
	 ***/
	@RequestMapping(value = "/getSponsorList", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave getSponsorList() {

		List<ChargesMasterSlave> ltc = new ArrayList<ChargesMasterSlave>();
		ltc = chargesSlaveService.getSponsorList();
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltc);
		return obj;
	}
	
	/*******
	 * @author      :BILAL
	 * @Date        :02-02-2018
	 * @Code        :For import of sub charges master  
	 * ********/
	@RequestMapping(value="/importSubcharges",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String importSubcharges(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
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
			 response =	chargesSlaveService.importSubcharges(UPLOAD_DIRECTORY + fileName);
		}
		
		
		return ((response == 1) ? " File Imported Successfully"
				
						: "Network Error!!!");
	}
	
	/******
	 * @author    :BILAL
	 * @date      :13-03-2018
	 * @Code      :For charges configuration for super categories 
	 * *******/
	@RequestMapping(value = "/fetchsup", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchsup(
			@RequestParam("chargesMasterDto") Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		ltSubCharges = chargesSlaveService
				.fetchsup(chargesMasterDto);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltSubCharges);
		return obj;
	}
	
	@RequestMapping(value = "/getChragesSlaveByIddr", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave getChragesSlaveByIddr(
			@RequestParam("masterId") Integer masterId,
			@RequestParam("selfId") Integer selfId) {
	
		List<ChargesMasterSlave> ltChragesSlave = new ArrayList<ChargesMasterSlave>();
		ltChragesSlave = chargesSlaveService.getChragesSlaveByIddr(masterId,
				selfId);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltChragesSlave);
		return obj;
	}
	
	@RequestMapping(value = "/fetchSuperCatogoiresSlaveReg", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterSlave fetchSuperCatogoiresSlaveReg(
			@RequestParam("chargesMasterDto") Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		ltSubCharges = chargesSlaveService
				.fetchSuperCatogoiresSlaveReg(chargesMasterDto);
		ChargesMasterSlave obj = new ChargesMasterSlave();
		obj.setLstChargesSlave(ltSubCharges);
		return obj;
	}
}