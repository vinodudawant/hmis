package com.hms.ehat.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.dto.Doctor;
import com.hms.dto.Patient;
import com.hms.dto.Users;
import com.hms.ehat.service.BillingService;

@RestController
@RequestMapping(value = "/admindata")
public class BillingController {

	@Autowired
	BillingService adminInterface;
	
	@RequestMapping(value = "/fetchAuthorisedBy", method = RequestMethod.POST)
	@ResponseBody
	public Doctor fetchAuthorisedBy(String callFrom, HttpServletRequest request) {
		Doctor obj=new Doctor();
		List<Doctor> list=adminInterface.fetchAuthorisedBy();
		obj.setDoctorList(list);
		return obj;
	}
	
	@RequestMapping(value = "/fetchAvaStatus", method = RequestMethod.POST)
	@ResponseBody
	public Users fetchAvaStatus(HttpServletRequest request) {
		List<Users> arrUsers = adminInterface.fetchAvaStatus();
		Users objUsers = new Users();
		objUsers.setUsersList(arrUsers);
		return objUsers;
	}
	
	@RequestMapping(value = "/ShowTopBill", method = RequestMethod.POST)
	@ResponseBody
	public String fetchShowTopBill(HttpServletRequest request,
			String searchBy, String strValue, String from,
			String to, String billType, String searchOn, String discountId) {
		String abc="abc";
		return abc;
	}
	
	@RequestMapping(value = "/showDiscountApproval", method = RequestMethod.POST)
	@ResponseBody
	public String showDiscountApproval(HttpServletRequest request,
			String searchOn, String searchBy, String discountType,
			String value) {
		String abc="abc";
		if(discountType.equalsIgnoreCase("Hospital")){
			List<Patient> arrPatientDB =adminInterface.showDiscountApproval(searchOn ,searchBy ,value);
		}else {
			List<Patient> arrPatientDB =adminInterface.showSurgeonDiscountApproval(searchOn ,searchBy ,value);
		}
		
		return abc;
	}
}
