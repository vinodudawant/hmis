package com.hms.ipdbill.controller;

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
import com.hms.ipdbill.dto.AutosuggestionIpdQueueDto;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;
import com.hms.ipdbill.service.IpdGenAndFinalBillService;

@SuppressWarnings("unused")
@Controller
@RequestMapping(value = "/ipdGenFinalBill")
public class IpdGenAndFinalBillcontroller {


	@Autowired
	IpdGenAndFinalBillService ipdgfBillService;
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation General Bill Patients
	================*/

	@RequestMapping(value = "/autoSuggestationGeneralBillPatients", method = RequestMethod.POST)
	public @ResponseBody
	IpdGenFinalBillDTO autoSuggestationGeneralBillPatients(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "wardType") Integer wardType, @RequestParam("startIndex") Integer startIndex, @RequestParam(value = "wardName") Integer wardName)
		 {
		
		List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = new ArrayList<IpdGenFinalBillDTO>();
		ltIpdBillPatientsDTO = ipdgfBillService.autoSuggestationGeneralBillPatients(unit_id, callFrom, findText,wardType,wardName,startIndex);		
		IpdGenFinalBillDTO obj=new IpdGenFinalBillDTO();
		Integer genBillCount =  ipdgfBillService.getAllGenBillPatCount();
		obj.setGenBillCount(genBillCount);
		obj.setLstIpdbillPatients(ltIpdBillPatientsDTO);
		return obj;		
	}
	
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : AutoSuggestation for General Bill Physical Discharged Patients
	================*/

	@RequestMapping(value = "/autoSuggestationGeneralBillPhyDis", method = RequestMethod.POST)
	public @ResponseBody
	IpdGenFinalBillDTO autoSuggestationGeneralBillPhyDis(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "wardType") Integer wardType, @RequestParam("startIndex") Integer startIndex, @RequestParam(value = "wardName") Integer wardName)
		 {
		
		List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = new ArrayList<IpdGenFinalBillDTO>();
		ltIpdBillPatientsDTO = ipdgfBillService.autoSuggestationGeneralBillPhyDis(unit_id, callFrom, findText,wardType,wardName,startIndex);		
		IpdGenFinalBillDTO obj=new IpdGenFinalBillDTO();
		Integer genBillPhyDisCount =  ipdgfBillService.getAllGenPhyDisBillPatCount();
		obj.setGenBillPhyDisCount(genBillPhyDisCount);
		obj.setLstIpdbillPatients(ltIpdBillPatientsDTO);
		return obj;		
	}
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation Final Bill Patients
	================*/

	@RequestMapping(value = "/autoSuggestationFinalBillPatients", method = RequestMethod.POST)
	public @ResponseBody
	IpdGenFinalBillDTO autoSuggestationFinalBillPatients(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "wardType") Integer wardType, @RequestParam("startIndex") Integer startIndex, @RequestParam(value = "wardName") Integer wardName)
		    {
		
		List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = new ArrayList<IpdGenFinalBillDTO>();
		ltIpdBillPatientsDTO = ipdgfBillService.autoSuggestationFinalBillPatients(unit_id, callFrom, findText,wardType,wardName,startIndex);		
		IpdGenFinalBillDTO obj=new IpdGenFinalBillDTO();
		Integer finalBillCount= ipdgfBillService.getAllFinBillPatCount();
		obj.setFinalBillCount(finalBillCount);
		obj.setLstIpdbillPatients(ltIpdBillPatientsDTO);
		return obj;		
	}
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation Final Bill Patients
	================*/

	@RequestMapping(value = "/autoSuggestationFinalBillPhyDisPatients", method = RequestMethod.POST)
	public @ResponseBody
	IpdGenFinalBillDTO autoSuggestationFinalBillPhyDisPatients(@RequestParam(value = "unit_id") Integer unit_id,			
			@RequestParam(value = "findText") String findText,	@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "wardType") Integer wardType, @RequestParam("startIndex") Integer startIndex, @RequestParam(value = "wardName") Integer wardName)
		    {
		
		List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = new ArrayList<IpdGenFinalBillDTO>();
		ltIpdBillPatientsDTO = ipdgfBillService.autoSuggestationFinalBillPhyDisPatients(unit_id, callFrom, findText,wardType,wardName,startIndex);		
		IpdGenFinalBillDTO obj=new IpdGenFinalBillDTO();
		Integer finBillPhyDisCount= ipdgfBillService.getAllFinBillPhyDisPatCount();
		obj.setFinBillPhyDisCount(finBillPhyDisCount);
		obj.setLstIpdbillPatients(ltIpdBillPatientsDTO);
		return obj;		
	}
	
	@RequestMapping(value = "/getPhyDisFlag", method = RequestMethod.POST)
	public @ResponseBody
	String phyDisflagForOt(@RequestParam("trid") Integer TreatmentId) {
		String phyDisFlag = ipdgfBillService.phyDisflagForOt(TreatmentId);
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
		lstIpdActivePhyDisPat = ipdgfBillService.autoIPDActivePhyDisPat(letter,
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
		lstIpdBillPhyDisPat = ipdgfBillService.autoIPDBillPhyDisPat(letter, finalBill,
				usertype, request);
		objIpdBillPhyDis.setLstIpdbillPatients(lstIpdBillPhyDisPat);
		return objIpdBillPhyDis;
	}

}