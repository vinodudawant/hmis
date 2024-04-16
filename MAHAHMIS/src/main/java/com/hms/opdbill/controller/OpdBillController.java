package com.hms.opdbill.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.opdbill.service.OpdBillService;
import com.hms.registration.dto.PatientConsultationChargesDto;

@Controller
@RequestMapping(value = "/opdbill")
public class OpdBillController {

	static Logger log=Logger.getLogger(OpdBillController.class.getName());
	static {
		System.out.println("OpdBillController is Loaded...!");
	}
	
	@Autowired
	OpdBillService opdBillService;
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get billing header patient details info 
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPatientInfoByTreatmentId", method = RequestMethod.POST)
	public PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto) {
		
		log.info("In OpdBillController getPatientInfoByTreatmentId()");
		
		//HttpSession session = request.getSession();
		//Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		//objDto.setUnitId(unitId);
		
		return opdBillService.getPatientInfoByTreatmentId(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To patient service details 
	================*/
	@ResponseBody
	@RequestMapping(value = "/fetchPatientBillAmount", method = RequestMethod.POST)
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {
		
		log.info("In OpdBillController getPatientServiceDetails()");
		
		//HttpSession session = request.getSession();
		//Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		//objDto.setUnitId(unitId);
		
		return opdBillService.getPatientServiceDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get patient sub service details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPatientServiceBill", method = RequestMethod.POST)
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {
		
		log.info("In OpdBillController getPatientSubServiceDetails()");
		
		//HttpSession session = request.getSession();
		//Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		//objDto.setUnitId(unitId);
		
		return opdBillService.getPatientSubServiceDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get patient package details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPackagedataforOpd", method = RequestMethod.POST)
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto, HttpServletRequest request) {
		
		log.info("In OpdBillController getPatientPackageDetails()");
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		objDto.setUnitId(unitId);
		
		return opdBillService.getPatientPackageDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get bill amount details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getAllAmountDetails", method = RequestMethod.POST)
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {
		
		log.info("In OpdBillController getAllAmountDetails()");
		
		//HttpSession session = request.getSession();
		//Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		//objDto.setUnitId(unitId);
		
		return opdBillService.getAllAmountDetails(objDto);
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get bill amount details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getDoctorConsultationCharges", method = RequestMethod.POST)
	public PatientConsultationChargesDto getDoctorConsultationCharges(PatientConsultationChargesDto objDto) {
		
		log.info("In OpdBillController getDoctorConsultationCharges()");
		
		//HttpSession session = request.getSession();
		//Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		//objDto.setUnitId(unitId);
		
		return opdBillService.getDoctorConsultationCharges(objDto);
	}
	
	/************
	 * @author	: Vishant Pawar
	 * @date	: 10-April-2024
	 * @codeFor : Fetch OPD bill discount
	 ***********/
	@RequestMapping(value = "/fetchOpdbilDiscount", method = RequestMethod.POST)
	public @ResponseBody BillReceiptMasterDTO fetchOpdbilDiscount(
			@RequestParam(value = "treatmentId") Integer treatmentId,
			@RequestParam(value = "callFrom") String callFrom ,HttpServletRequest req) {
		
		BillReceiptMasterDTO objIpdbill=new BillReceiptMasterDTO();
		List<BillReceiptMasterDTO> lstOpdBill = new ArrayList<BillReceiptMasterDTO>();
		if(callFrom.equals("opdBill")){
			
			lstOpdBill = opdBillService.fetchOpdbillTreatDiscount(treatmentId);		
		}else{
			
			lstOpdBill = opdBillService.fetchOpdbillDiscount(req,callFrom);		
		}
		
		objIpdbill.setListBillReceiptMaster(lstOpdBill);
		return objIpdbill;
	}
	
	/************
	  * @author	: Vishant Pawar
	 * @date	: 10-April-2024
	 * @codeFor : Save Ipd bill discount
	 ***********/
	@RequestMapping(value = "/saveApprovedDiscountOPD", method = RequestMethod.POST)
	public @ResponseBody Integer saveApprovedDiscount(
			@RequestParam(value = "discId") int discId,	
			@RequestParam(value = "userId") int userId,				
			@RequestParam(value = "approvedAmt") double approveAmt,
			@RequestParam(value = "remark") String remark,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "discRemark") String discRemark) {
		
		BillReceiptMasterDTO objIpdbill=new BillReceiptMasterDTO();	
		objIpdbill.setBillReceiptId(discId);
		objIpdbill.setApprovedBy(userId);
		objIpdbill.setDiscountApprovedAmt(approveAmt);
		objIpdbill.setDiscRemark(remark);
		objIpdbill.setApprovedRemark(discRemark);
		
		int result = opdBillService.saveApprovedDiscountOPD(objIpdbill);		
		return result;
	}
	
	/**
	 * @author Vishant @date 12April2024 this methods are used to search Discount approval opd
	 * **/
	@RequestMapping(value = "/autosuggesstionDiscApprovelOPD", method = RequestMethod.POST)
	public @ResponseBody
	BillReceiptMasterDTO autosuggesstionDiscApprovelOPD(HttpServletRequest request,@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype,@RequestParam("callfrom") String callfrom,HttpServletRequest req) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<BillReceiptMasterDTO> ltRegistrationViewDto = new ArrayList<BillReceiptMasterDTO>();
		
		ltRegistrationViewDto = opdBillService.autosuggesstionDiscApprovelOPD(letter,usertype,unitId,req,callfrom);
	
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		
		obj.setListBillReceiptMaster(ltRegistrationViewDto);
		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		
		
		 
		return obj;
	}
}
