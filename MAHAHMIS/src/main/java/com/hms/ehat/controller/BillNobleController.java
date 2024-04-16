package com.hms.ehat.controller;

import java.sql.Date;
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

import com.hms.dto.BillNobleDtoForOpdSponsor;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillNobleDto;
import com.hms.ehat.dto.BillNobleServiceDto;
import com.hms.ehat.dto.BillNobleServiceDto2;
import com.hms.ehat.dto.BillNobleServiceDtoForOpdSponsor;
import com.hms.ehat.dto.BillNobleServicePackageDto;
import com.hms.ehat.dto.PatientServiceDetail2;
import com.hms.ehat.dto.PatientSubServiceDetailsForOpdPackage;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.BillNobleService;
import com.hms.ipdbill.dto.IpdBillDiscount;


@Controller
@RequestMapping(value = "/billNoble")
public class BillNobleController {
	@Autowired
	BillNobleService billNobleService;
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/fetchPatientsBillById", method = RequestMethod.POST)
		public @ResponseBody
		BillDetailsDto getPatientsBillById(
				@RequestParam("callform") Integer treatmentId) {
			List<BillDetailsDto> listBillDetails = new ArrayList<BillDetailsDto>();
			listBillDetails =  (List<BillDetailsDto>) billNobleService.getPatientsBillById(treatmentId);
			
			BillDetailsDto obj=new BillDetailsDto();
			obj.setListBillDetails(listBillDetails);
				
			return obj;
			
		}

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 6_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/fetchPatientBillAmount", method = RequestMethod.POST)
		public @ResponseBody
		BillNobleDto getPatientBillAmount(
				@RequestParam("callform") Integer treatmentId,HttpServletRequest request) {
			List<BillNobleDto> listBillDetails = new ArrayList<BillNobleDto>();
			listBillDetails =  (List<BillNobleDto>) billNobleService.getPatientBillAmount(treatmentId,request);
			
			BillNobleDto obj=new BillNobleDto();
			obj.setListBillNobleDto(listBillDetails);				
			return obj;			
		}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 25_July_2017 
	 * @Code Fetching patient data bye id For Opd Sponsor.
	 ******************************************************************************/
		
	@RequestMapping(value = "/fetchPatientBillAmountForOpdSponsor", method = RequestMethod.POST)
		public @ResponseBody
		BillNobleDtoForOpdSponsor fetchPatientBillAmountForOpdSponsor(
				@RequestParam("callform") Integer treatmentId,HttpServletRequest request) {
			List<BillNobleDtoForOpdSponsor> listBillNobleDtoForOpdSponsor = new ArrayList<BillNobleDtoForOpdSponsor>();
			listBillNobleDtoForOpdSponsor =  (List<BillNobleDtoForOpdSponsor>) billNobleService.fetchPatientBillAmountForOpdSponsor(treatmentId,request);
			
			BillNobleDtoForOpdSponsor obj=new BillNobleDtoForOpdSponsor();
			obj.setListBillNobleDtoForOpdSponsor(listBillNobleDtoForOpdSponsor);				
			return obj;			
		}
	
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 4_July_2017 
	 * @Code Fetching patient Previous bill data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/fetchPatientPreviousBillAmount", method = RequestMethod.POST)
		public @ResponseBody
		PatientServiceDetail2 fetchPatientPreviousBillAmount(
				@RequestParam("callform") Integer treatmentId,HttpServletRequest request) {
			List<PatientServiceDetail2> listBillDetails = new ArrayList<PatientServiceDetail2>();
			listBillDetails =  (List<PatientServiceDetail2>) billNobleService.fetchPatientPreviousBillAmount(treatmentId,request);
			
			PatientServiceDetail2 obj=new PatientServiceDetail2();
			obj.setListBillNobleDto(listBillDetails);				
			return obj;			
		}
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 7_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/getPatientServiceBill", method = RequestMethod.POST)
		public @ResponseBody
		BillNobleServiceDto getPatientServiceBill(
				@RequestParam("callform") Integer treatmentId,@RequestParam("call") Integer serviceId ) {
			List<BillNobleServiceDto> listBillDetails = new ArrayList<BillNobleServiceDto>();
			listBillDetails =  (List<BillNobleServiceDto>) billNobleService.getPatientServiceBill(treatmentId,serviceId);
			
			BillNobleServiceDto obj=new BillNobleServiceDto();
			obj.setListBillNobleServiceDto(listBillDetails);
				
			return obj;
			
		}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 26_July_2017 
	 * @Code Fetching patient get Patient Service Bill For Opd Sponsor.
	 ******************************************************************************/
		
	@RequestMapping(value = "/getPatientServiceBillForOpdSponsor", method = RequestMethod.POST)
		public @ResponseBody
		BillNobleServiceDtoForOpdSponsor getPatientServiceBillForOpdSponsor(
				@RequestParam("callform") Integer treatmentId,@RequestParam("call") Integer serviceId ) {
			List<BillNobleServiceDtoForOpdSponsor> listBillNobleServiceDtoForOpdSponsor = new ArrayList<BillNobleServiceDtoForOpdSponsor>();
			listBillNobleServiceDtoForOpdSponsor =  (List<BillNobleServiceDtoForOpdSponsor>) billNobleService.getPatientServiceBillForOpdSponsor(treatmentId,serviceId);
			
			BillNobleServiceDtoForOpdSponsor obj=new BillNobleServiceDtoForOpdSponsor();
			obj.setListBillNobleServiceDtoForOpdSponsor(listBillNobleServiceDtoForOpdSponsor);
				
			return obj;
			
		}
	
	
	

	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 25_June_2017 
	 * @Code closing treatment 
	 ******************************************************************************/
		
	@RequestMapping(value = "/closetreatment", method = RequestMethod.POST)
		public @ResponseBody
		String closePatientTreatment(@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {

		boolean response = billNobleService.closePatientTreatment(treatmentId,request);
			 
		String msg = "";
		if (response == true) {
			msg = "Treatment Closed  Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	/**
	 * @author Sagar @date 27_Jun_2017 these methods are used to map request
	 *         with services   method
	 * **/
	@RequestMapping(value = "/getPreviousTreatmentPatient ", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationViewDto2 getMarkVisitList(HttpServletRequest request,@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype,@RequestParam("deptId") int deptId, @RequestParam("startIndex") Integer startIndex) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
		
		ltRegistrationViewDto = billNobleService.getPreviousTreatmentPatient(letter,usertype,deptId,unitId,startIndex);
	
		RegistrationViewDto2 obj=new RegistrationViewDto2();
		Integer prevOpdCount =  billNobleService.getprevOpdQueuePatientCount();
		obj.setPrevOpdCount(prevOpdCount);
		obj.setLstRegviewDto(ltRegistrationViewDto);
			 
		return obj;
	}
	
	
	@RequestMapping(value = "/getPreviousTreatmentPatientDateWiseSearch ", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationViewDto2 getPreviousTreatmentPatientDateWiseSearch(@RequestParam("inputFromDate") Date inputFromDate,
			@RequestParam("inputToDate") Date inputToDate,@RequestParam("deptId") Integer deptId) {
		
		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
		
		ltRegistrationViewDto = billNobleService.getPreviousTreatmentPatientDateWiseSearch(inputFromDate,inputToDate,deptId);
	
		RegistrationViewDto2 obj=new RegistrationViewDto2();
		
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
			 
		return obj;
	}
	
	
	/**
	 * @author Kishor @date 06_Jan_2018 this methods are used to search Discount approval
	 * **/
	@RequestMapping(value = "/autosuggesstionDiscApprovel ", method = RequestMethod.POST)
	public @ResponseBody
	IpdBillDiscount autosuggesstionDiscApprovel(HttpServletRequest request,@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype,HttpServletRequest req) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<IpdBillDiscount> ltRegistrationViewDto = new ArrayList<IpdBillDiscount>();
		
		ltRegistrationViewDto = billNobleService.autosuggesstionDiscApprovel(letter,usertype,unitId,req);
	
		IpdBillDiscount obj=new IpdBillDiscount();
		
		obj.setListIpdBillDiscount(ltRegistrationViewDto);
		//System.err.println("c.count>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+obj.getConfigCount());
		
		
		 
		return obj;
	}
	
	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 25_June_2017 
	 * @Code  treatment details of patients
	 ******************************************************************************/
		
	@RequestMapping(value = "/closetreatmentdetails", method = RequestMethod.POST)
		public @ResponseBody
		TreatmentDto closeTreatmentDetailsOfPatient(@RequestParam("patientId") Integer patientId,HttpServletRequest request) {

		List<TreatmentDto> listBillDetails = new ArrayList<TreatmentDto>();
		listBillDetails =  (List<TreatmentDto>) billNobleService.closeTreatmentDetailsOfPatient(patientId);
		
		TreatmentDto obj=new TreatmentDto();
		obj.setListTreatment(listBillDetails);
		 
		
		//obj.setListBillNobleDto(listBillDetails);				
		return obj;			
	}
	
	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 25_June_2017 
	 * @Code  treatment details of patients
	 ******************************************************************************/
		
	@RequestMapping(value = "/getPrevPatdetails", method = RequestMethod.POST)
		public @ResponseBody
		TreatmentDto getPrevPatdetails(@RequestParam("patientId") Integer patientId,
				@RequestParam("deptId") Integer deptId,HttpServletRequest request) {

		List<TreatmentDto> listBillDetails = new ArrayList<TreatmentDto>();
		listBillDetails =  (List<TreatmentDto>) billNobleService.getPrevPatdetails(patientId,deptId);
		
		TreatmentDto obj=new TreatmentDto();
		obj.setListTreatment(listBillDetails);
		 
		
		//obj.setListBillNobleDto(listBillDetails);				
		return obj;			
	}
	/*
	@RequestMapping(value = "/autoSuggestionForprevioustreatment", method = RequestMethod.POST)
	 @ResponseBody
	public RegistrationViewDto autoSuggestionMarkVisit(@RequestParam("letter") String letter) {
		 
		RegistrationViewDto ltRegistrationViewDto = new  RegistrationViewDto();
		ltRegistrationViewDto = billNobleService.autoSuggestionForprevioustreatment(letter);	
		return ltRegistrationViewDto;
	}
	*/
	
	
	// @author : Sagar Kadam @date: 27-Jun-2017 @reason : for Previ opd details
	// onload
	@RequestMapping(value = "/getAllPatientRecordsForPrevOPD", method = RequestMethod.POST)
	@ResponseBody
	public RegTreBillDto getAllRecordsDeptwiseWithAuto(@RequestParam("deptId") Integer deptId,
			@RequestParam("letter") String letter,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = billNobleService.getAllPatientRecordsForPrevOPD(deptId,letter,unitId);
		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);
			
		return obj;
}
	

	/*******************************************************************************
	 * @author Sagar Kadam
	 * @date 25_June_2017 
	 * @Code closing treatment 
	 ******************************************************************************/
		
	@RequestMapping(value = "/closetreatmentforipd", method = RequestMethod.POST)
		public @ResponseBody
		String closePatientTreatmentForIPD(@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {

		boolean response = billNobleService.closePatientTreatmentForIPD(treatmentId,request);
		String msg = "Treatment Closed  Sucessfully...";
		String msg1 = "please close discharge summary first!!!";
		if (response == true) {
			return msg;
		}else {
			return msg1;
		} 
	}

	
	/**
	 * @author Bilal
	 * @date 30 JUN_2017
	 * @code For Sponsor wise billing**/	
	@RequestMapping(value = "/getPatientServiceBillSponsor", method = RequestMethod.POST)
		public @ResponseBody
		BillNobleServiceDto2 getPatientServiceBillSponsor(
			@RequestParam("callform") Integer treatmentId,
			@RequestParam("call") Integer serviceId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId) {
		List<BillNobleServiceDto2> listBillDetails = new ArrayList<BillNobleServiceDto2>();
			listBillDetails =  (List<BillNobleServiceDto2>) billNobleService.getPatientServiceBillSponsor(treatmentId,serviceId,chargesSlaveId);
			
			BillNobleServiceDto2 obj=new BillNobleServiceDto2();
			obj.setListBillNobleServiceDto(listBillDetails);
				
			return obj;
			
		}		
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 5_Aug_2017 
	 * @Code Fetching Package patient data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/getPackagedataforOpd", method = RequestMethod.POST)
		public @ResponseBody
		PatientSubServiceDetailsForOpdPackage getPackagedataforOpd(
				@RequestParam("pSId") Integer pSId,@RequestParam("pSubSId") Integer pSubSId, 
				@RequestParam("sponsorId") Integer sponsorId,@RequestParam("chargesSlaveId") Integer chargesSlaveId,
				@RequestParam("treatmentId") Integer treatmentId,@RequestParam("patientId") Integer patientId,@RequestParam("billDetailsId") Integer billDetailsId) 
	{
			List<PatientSubServiceDetailsForOpdPackage> listOpdPackageDto = new ArrayList<PatientSubServiceDetailsForOpdPackage>();
			listOpdPackageDto = (List<PatientSubServiceDetailsForOpdPackage>) billNobleService.getPackagedataforOpd(pSId,pSubSId,sponsorId,chargesSlaveId,treatmentId,patientId,billDetailsId);
			
			PatientSubServiceDetailsForOpdPackage obj=new PatientSubServiceDetailsForOpdPackage();
			obj.setListOpdPackageDto(listOpdPackageDto);
				
			return obj;
			
		}
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 10_Aug_2017 
	 * these methods are used to Delete package package services for Opd
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deleteOnClickForPackageOpd", method = RequestMethod.POST)
	public @ResponseBody
	String deleteOnClickForPackageOpd(@RequestParam("billDetailsId") Integer billDetailsId,
			@RequestParam("otherBillDetailsId") Integer otherBillDetailsId,HttpServletRequest request) {
				boolean response = billNobleService.deleteOnClickForPackageOpd(billDetailsId,
						otherBillDetailsId,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/**@author   :Bilal
	 * @date     :17-Aug-2017
	 * @code     :for list of package billing whose combination is Y**/
		
	@RequestMapping(value = "/getlistOfPackageOpd", method = RequestMethod.POST)
		public @ResponseBody
		BillNobleServicePackageDto getlistOfPackageOpd(
				@RequestParam("treatmentId") Integer treatmentId) {
			List<BillNobleServicePackageDto> listBillDetails = new ArrayList<BillNobleServicePackageDto>();
			listBillDetails =  (List<BillNobleServicePackageDto>) billNobleService.getlistOfPackageOpd(treatmentId);
			
			BillNobleServicePackageDto obj=new BillNobleServicePackageDto();
			obj.setListBillNobleServiceDto(listBillDetails);
				
			return obj;
			
		}
	
	/**
	 * @author   :Bilal
	 * @date     :18-Aug-2017
	 * @code     :For converting services to package
	 ***/
	@RequestMapping(value = "/convertServiceToPackage", method = RequestMethod.POST)
	@ResponseBody
	public String convertServiceToPackage(
			BillDetailsDto billdetails,
			HttpServletRequest request,
			
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("servIdsChecked") String servIdsChecked,
			@RequestParam("billDetailsId") Integer billDetailsId,
			@RequestParam("subServiceId") Integer subServiceId,
			@RequestParam("serviceId") Integer serviceId
		) {
		
		
		int response = billNobleService.convertServiceToPackage(
				billdetails, request, treatmentId, servIdsChecked, billDetailsId, subServiceId, serviceId);
		
		return ((response == 1) ? "Converted To Package Successfully"		
						: "Network Error!!!");
	}
	
	/**
	 * @author   :Bilal
	 * @date     :18-Aug-2017
	 * @code     :For Remaining Amount Included To Package
	 ***/
	@RequestMapping(value = "/includeInPackAmount", method = RequestMethod.POST)
	@ResponseBody
	public String includeInPackAmount(
			BillDetailsDto billdetails,
			HttpServletRequest request,
			
			@RequestParam("pSubSId") Integer pSubserviceId,
			@RequestParam("pSId") Integer pservId,
			@RequestParam("billDetailsId") Integer billDetailsId,
			@RequestParam("amount") double packamount,
			@RequestParam("totalAmtPackage") double totalAmtPackage,
			@RequestParam("totalRem") double totalRem,
			@RequestParam("receiptOf") String receiptOf
		) {
		
		
		int response = billNobleService.includeInPackAmount(billdetails, request, pSubserviceId, pservId, 
				billDetailsId, packamount, totalAmtPackage,totalRem,receiptOf);
		
		return ((response == 1) ? "Remaining Amount Included To Package Successfully"		
				: (response == 2) ? "Bill Allready Paid Can not Include."
						: "Network Error!!!");
	}
	
	/**
	 * @author   :Bilal
	 * @date     :21-Aug-2017
	 * @code     :For converting services to Billing
	 ***/
	@RequestMapping(value = "/convertToBillingOPD", method = RequestMethod.POST)
	@ResponseBody
	public String convertToBillingOPD(
			BillDetailsDto billdetails,
			HttpServletRequest request,
			
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("otherBillDetailsIdOpd") String otherBillDetailsIdOpd,
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("chargesSlaveId") int chargesSlaveId
		) {
		
		
		int response = billNobleService.convertToBillingOPD(
				billdetails, request, treatmentId, otherBillDetailsIdOpd, sponsorId, chargesSlaveId);
		
		return ((response == 1) ? "Converted To Billing Successfully"		
						: "Network Error!!!");
	}
	
	/**
	 * @author   :Parikshit
	 * @date     :16-Jan-2018
	 * @code     :give discount to patient from billing
	 ***/
	@RequestMapping(value = "/giveDiscountInBilling", method = RequestMethod.POST)
	@ResponseBody
	public String giveDiscountInBilling(
			HttpServletRequest request,
			
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("billId") Integer billId,
			@RequestParam("disc") double disc,
			@RequestParam("discBy") String discBy,
			@RequestParam("indentFlag") int indentFlag,
			@RequestParam("patientFlag") int patientFlag,
			@RequestParam("otFlag") int otFlag,
			@RequestParam("narration") String narration
		) {
		
		
		int response = billNobleService.giveDiscountInBilling(
				request, treatmentId,billId, disc, discBy, indentFlag,patientFlag,otFlag,narration);
		
		return ((response == 1) ? "Discount is added...!"		
						: "Network Error!!!");
	}
	
	@RequestMapping(value = "/getPrevPatdetailsOPD", method = RequestMethod.POST)
	public @ResponseBody
	TreatmentDto getPrevPatdetailsOPD(@RequestParam("patientId") Integer patientId,
			@RequestParam("deptId") Integer deptId,HttpServletRequest request) {

	List<TreatmentDto> listBillDetails = new ArrayList<TreatmentDto>();
	listBillDetails =  (List<TreatmentDto>) billNobleService.getPrevPatdetails(patientId,deptId);
	
	TreatmentDto obj=new TreatmentDto();
	obj.setListTreatment(listBillDetails);
	 
	
	//obj.setListBillNobleDto(listBillDetails);				
	return obj;			
}
	
	@RequestMapping(value = "/setSearchedPatientPrevDiagnosticTempByMobile ", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationViewDto2 setSearchedPatientPrevDiagnosticTempByMobile(HttpServletRequest request,@RequestParam("letter") String letter,
			@RequestParam("usertype") String usertype,@RequestParam("deptId") int deptId) {
		
		//String count=request.getParameter("configCount");
		//int i=Integer.valueOf(count);
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		List<RegistrationViewDto2> ltRegistrationViewDto = new ArrayList<RegistrationViewDto2>();
		
		ltRegistrationViewDto = billNobleService.setSearchedPatientPrevDiagnosticTempByMobile(letter,usertype,deptId,unitId);
	
		RegistrationViewDto2 obj=new RegistrationViewDto2();
		
		
		obj.setLstRegviewDto(ltRegistrationViewDto);
			 
		return obj;
	}
}
