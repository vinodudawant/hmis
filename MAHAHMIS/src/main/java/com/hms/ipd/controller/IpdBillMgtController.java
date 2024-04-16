package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipd.service.IpdBillMgtService;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.registration.dto.PatientConsultationChargesDto;

@Controller
@RequestMapping("/ipdbillmgt")
public class IpdBillMgtController {

	private static final Logger log = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	static {
		System.out.println("IpdBillMgtController is Loaded...!");
	}
	
	@Autowired
	IpdBillMgtService ipdBillService;
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To patient service details 
	================*/
	@ResponseBody
	@RequestMapping(value = "/fetchPatientBillAmount", method = RequestMethod.POST)
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {
		
		log.info("In IpdBillMgtController getPatientServiceDetails()");
		return ipdBillService.getPatientServiceDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get patient sub service details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPatientServiceBill", method = RequestMethod.POST)
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {
		
		log.info("In IpdBillMgtController getPatientSubServiceDetails()");
		return ipdBillService.getPatientSubServiceDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get patient package details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPackagedataforIpd", method = RequestMethod.POST)
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto) {
		
		log.info("In IpdBillMgtController getPatientPackageDetails()");
		return ipdBillService.getPatientPackageDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get bill amount details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getAllAmountDetails", method = RequestMethod.POST)
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {
		
		log.info("In IpdBillMgtController getAllAmountDetails()");
		return ipdBillService.getAllAmountDetails(objDto);
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get bill amount details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getDoctorConsultationChargesForIpd", method = RequestMethod.POST)
	public PatientConsultationChargesDto getDoctorConsultationChargesForIpd(PatientConsultationChargesDto objDto) {
		
		log.info("In IpdBillMgtController getDoctorConsultationChargesForIpd()");
		return ipdBillService.getDoctorConsultationChargesForIpd(objDto);
	}
}
