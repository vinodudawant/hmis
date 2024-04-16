package com.hms.ivf.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.service.IpdBillService;

@Controller
@RequestMapping(value = "/ivfbill")
public class IvfIpdBillController {

	@Autowired
	IpdBillService ipdBillService;
	
	/************
	* @author	: Vinod Udawant
	* @date		: 05-June-2017
	* @codeFor	: Get ipd bill patients 
	 ************/
	@RequestMapping(value = "/viewIpdbillPatients", method = RequestMethod.POST)
	public @ResponseBody IpdBillPatientsDTO getIpdbillPatients(
			@RequestParam("callform") String general,
			@RequestParam(value = "wardType") Integer wardType,	
			@RequestParam(value = "hallTypeSelectId") Integer hallTypeSelectId,	
			@RequestParam(value = "ward") String ward,			
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
		String userType = (String) session.getAttribute("userType");//get user Type which is login
		
		IpdBillPatientsDTO objIpdbill=new IpdBillPatientsDTO();
		List<IpdBillPatientsDTO> lstIpdbillPatients = new ArrayList<IpdBillPatientsDTO>();
		
		lstIpdbillPatients = ipdBillService.getIpdbillPatients(general,unitId,userId1,userType,wardType,hallTypeSelectId,ward);		
		objIpdbill.setLstIpdbillPatients(lstIpdbillPatients);
		return objIpdbill;
	}
}
