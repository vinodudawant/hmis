package com.hms.ehat.controller;

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

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.PhysicalDischargeService;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;

@SuppressWarnings("unused")
@Controller
@RequestMapping(value = "/physicalDischarge")
public class physicalDischargeController {
	@Autowired
	PhysicalDischargeService pdService;

	@RequestMapping(value = "/physicalDischargeIpd", method = RequestMethod.POST)
	@ResponseBody
	public int updatePhysicalDischarge(
			@RequestParam("treatmentId") Integer tID, TreatmentDto teatDtoObj,
			BillDetailsIpdDto billDtoObj, HttpServletRequest request) {
		int response = 0;
		response = pdService.updatePhysicalDischarge(tID, teatDtoObj,
				billDtoObj, request);
		return response;
	}

	@RequestMapping(value = "/viewIpdDischargedPatients", method = RequestMethod.POST)
	public @ResponseBody
	IpdPhysicalDischargedPatientsDTO getIpdDischargedPatients(
			@RequestParam("callform") String general,
			@RequestParam(value = "wardType") Integer wardType,
			@RequestParam(value = "hallTypeSelectId") Integer hallTypeSelectId,
			@RequestParam(value = "ward") String ward,
			@RequestParam(value = "letter") String letter,
			HttpServletRequest request) {

		HttpSession session = request.getSession();

		Integer unitId = (Integer) session.getAttribute("uId");
		Integer userId1 = (Integer) session.getAttribute("userId1");
		String userType = (String) session.getAttribute("userType");
		IpdPhysicalDischargedPatientsDTO objIpddischarge = new IpdPhysicalDischargedPatientsDTO();
		//List<IpdPhysicalDischargedPatientsDTO> lstIpdDischargePatients = new ArrayList<IpdPhysicalDischargedPatientsDTO>();

		objIpddischarge = pdService.getIpdDischargedPatients(general,
				unitId, userId1, userType, wardType, hallTypeSelectId, ward, letter);
		//objIpddischarge.setLstIpdbillPatients(lstIpdDischargePatients);
		return objIpddischarge;
	}

	@RequestMapping(value = "/viewIpdBillingDischargedPatients", method = RequestMethod.POST)
	public @ResponseBody
	IpdPhysicalDischargedPatientsDTO getIpdDischargedBillPatients(
			@RequestParam("callform") String general,
			@RequestParam(value = "wardType") Integer wardType,
			@RequestParam(value = "hallTypeSelectId") Integer hallTypeSelectId,
			@RequestParam(value = "ward") String ward,
			HttpServletRequest request) {

		HttpSession session = request.getSession();

		Integer unitId = (Integer) session.getAttribute("uId");
		Integer userId1 = (Integer) session.getAttribute("userId1");
		String userType = (String) session.getAttribute("userType");
		IpdPhysicalDischargedPatientsDTO objIpddischarge = new IpdPhysicalDischargedPatientsDTO();
		List<IpdPhysicalDischargedPatientsDTO> lstIpdDischargePatients = new ArrayList<IpdPhysicalDischargedPatientsDTO>();

		lstIpdDischargePatients = pdService.getIpdDischargedBillPatients(
				general, unitId, userId1, userType, wardType, hallTypeSelectId,
				ward);
		objIpddischarge.setLstIpdbillPatients(lstIpdDischargePatients);
		return objIpddischarge;
	}

	@RequestMapping(value = "/getPhyDisFlag", method = RequestMethod.POST)
	public @ResponseBody
	String phyDisflagForOt(@RequestParam("trid") Integer TreatmentId) {
		String phyDisFlag = pdService.phyDisflagForOt(TreatmentId);
		return phyDisFlag;
	}

	@RequestMapping(value = "/autoPhyDisPatients", method = RequestMethod.POST)
	@ResponseBody
	public IpdPhysicalDischargedPatientsDTO autoForIpdActivePatients(
			@RequestParam("letter") String letter,
			@RequestParam("finalBill") String finalBill,
			@RequestParam("usertype") String usertype,
			HttpServletRequest request) {
		IpdPhysicalDischargedPatientsDTO objIpdActivePhyDis = new IpdPhysicalDischargedPatientsDTO();
		List<IpdPhysicalDischargedPatientsDTO> lstIpdActivePhyDisPat = new ArrayList<IpdPhysicalDischargedPatientsDTO>();
		lstIpdActivePhyDisPat = pdService.autoIPDActivePhyDisPat(letter,
				finalBill, usertype, request);
		objIpdActivePhyDis.setLstIpdbillPatients(lstIpdActivePhyDisPat);
		return objIpdActivePhyDis;
	}

	@RequestMapping(value = "/autoPhyDisIPDBillPatients", method = RequestMethod.POST)
	@ResponseBody
	public IpdPhysicalDischargedPatientsDTO autoForIpdDischargedBillPatients(
			@RequestParam("letter") String letter,
			@RequestParam("finalBill") String finalBill,
			@RequestParam("usertype") String usertype,
			HttpServletRequest request) {
		IpdPhysicalDischargedPatientsDTO objIpdBillPhyDis = new IpdPhysicalDischargedPatientsDTO();
		List<IpdPhysicalDischargedPatientsDTO> lstIpdBillPhyDisPat = new ArrayList<IpdPhysicalDischargedPatientsDTO>();
		lstIpdBillPhyDisPat = pdService.autoIPDBillPhyDisPat(letter, finalBill,
				usertype, request);
		objIpdBillPhyDis.setLstIpdbillPatients(lstIpdBillPhyDisPat);
		return objIpdBillPhyDis;
	}

}
