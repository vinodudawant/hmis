package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.OtherBillReceiptMasterDTO;
import com.hms.ehat.dto.OtherBillRefundMasterDTO;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.RegistrationOtherDto;
import com.hms.ehat.service.OtherBillingService;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "/otherBilling")
public class OtherBillingConroller {
	@Autowired
	OtherBillingService otherBillingService;
	
	// @author : Kishor @date: 9-Aug-2017 @reason : To Save, Update and
				// delete Services of Ipd package
				@RequestMapping(value = "/saveOtherBilling", method = RequestMethod.POST)
				@ResponseBody
				public int saveOtherBilling(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,
					@RequestParam("queryType") String queryType
					,@RequestParam("callfrom") String callfrom) {
					
					System.err.println("hi");
					int response=0;
					
					OtherBillingDto otherBillingDto = (OtherBillingDto) ConfigUIJSONUtility
							.getObjectFromJSON(serviceDetails, OtherBillingDto.class);
					
					response = otherBillingService.saveOtherBilling(otherBillingDto
							.getListBillDetailsOther().get(0), request, queryType);
					return response;
					
						
				}
			
/*******************************************************************************
 * @author Kishor Lokhande
 * @date 6_June_2017 
 * @Code Fetching patient data bye id.
 ******************************************************************************/
					
		@RequestMapping(value = "/fetchPatientBillAmountOther", method = RequestMethod.POST)
			public @ResponseBody
			OtherBillingDto fetchPatientBillAmountOther(
					@RequestParam("callform") Integer treatmentId,HttpServletRequest request) {
				List<OtherBillingDto> listBillDetails = new ArrayList<OtherBillingDto>();
				listBillDetails =  (List<OtherBillingDto>) otherBillingService.fetchPatientBillAmountOther(treatmentId,request);
				
				OtherBillingDto obj=new OtherBillingDto();
				obj.setListBillDetailsOther(listBillDetails);				
				return obj;			
			}			
		
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:fetchDoctypeMasterList
	 ***********/
	
	@RequestMapping(value = "/deleteservdetailsOther", method = RequestMethod.POST)
	public @ResponseBody
	String deleteservdetailsOther(@RequestParam("labservicelist") String labservicelist,@RequestParam("callform") String callform, HttpServletRequest request) {

		String msg = "";
		if (otherBillingService.deleteservdetailsOther(labservicelist, callform,request)==1) {
			msg = "Delete Sucessfully!";
		}else{
			
			msg="Network Issues!";	
			
		}
		return msg;
	}
			
	// @author : Sagar Kadam @date:12-july-2017 @reason : To Fetch all Record
	// for opdque1
	@RequestMapping(value = "/getAllRecordsForOPDque1ToOther", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationOtherDto getAllRecordsForOPDque1ToOther(@RequestParam("deptId") Integer deptId) {
		RegistrationOtherDto ltRegMasterDto = new RegistrationOtherDto();

		ltRegMasterDto = otherBillingService.getAllRecordsForOPDque1ToOther(deptId);

		return ltRegMasterDto;
	}
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 3_June_2017 
	 * @Code Fetching patient data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/getPatientDataByPatientIdOther", method = RequestMethod.POST)
		public @ResponseBody
		RegistrationOtherDto getPatientDataByPatientIdOther(
				@RequestParam("callform") Integer PatientId) {
			List<RegistrationOtherDto> ltRegMasterDto = new ArrayList<RegistrationOtherDto>();
			ltRegMasterDto = otherBillingService.getPatientDataByPatientIdOther(PatientId);
			
			RegistrationOtherDto obj=new RegistrationOtherDto();
			obj.setListReg(ltRegMasterDto);
				
			return obj;
			
		}
	
	// @author : Sagar Kadam @date: 27-Jun-2017 @reason : for autosuggestion
	// onload
	@RequestMapping(value = "/getOtherBillingRecordsAuto", method = RequestMethod.POST)
	@ResponseBody
	public RegistrationOtherDto getOtherBillingRecordsAuto(@RequestParam("deptId") Integer deptId,@RequestParam("letter") String letter,@RequestParam("usertype") String  usertype) {
		RegistrationOtherDto ltRegMasterDto = new  RegistrationOtherDto();
		ltRegMasterDto = otherBillingService.getOtherBillingRecordsAuto(deptId,letter,usertype);
		 
		return ltRegMasterDto;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveOtherBillDetails", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveOtherBillDetails(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "discount") Double discount,
				@RequestParam(value = "disAuth") Integer disAuth,
				@RequestParam(value = "disNarrtn") String disNarrtn,
				@RequestParam(value = "totalPaid") Double totalPaid,
				@RequestParam(value = "masterIdsChecked") String masterIdsChecked,
				@RequestParam(value = "servIdsChecked") String servIdsChecked,
				@RequestParam(value = "refDocId") Integer refDocId,
				@RequestParam(value = "payMode") Integer payMode,
				@RequestParam(value = "bNumber") String bNumber,
				@RequestParam(value = "bName") String bName,
				@RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "againstId") Integer againstId,
				@RequestParam(value = "sourceCatId") Integer sourceCatId,
				@RequestParam(value = "sponsorCatId") Integer sponsorCatId,
				@RequestParam(value = "multiPayDetails") String multiPayDetails,
				@RequestParam(value = "receiptOf") String receiptOf,
				@RequestParam(value = "payeeSprMainId") Integer payeeSprMainId,
				@RequestParam(value = "payeeSprlastId") Integer payeeSprlastId,
				@RequestParam(value = "payeeTypeId") Integer payeeTypeId,
				@RequestParam(value = "disRemark") String disRemark,
				@RequestParam(value = "patientId") Integer patientId) {
		
		OtherBillReceiptMasterDTO obj=new OtherBillReceiptMasterDTO();
		obj.setTreatmentId(0);
		obj.setPatientId(patientId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setDiscGivenBy(disAuth);
		obj.setDiscNarrtn(disNarrtn);
		obj.setTotalPaid(totalPaid);
		obj.setPayMode(payMode);
		obj.setbNumber(bNumber);
		obj.setbName(bName);		
		obj.setAgainstId(againstId);
		obj.setSourceTypeId(sourceCatId);
		obj.setSponsorCatId(sponsorCatId);
		obj.setReceiptOf(receiptOf);
		obj.setPayeeMainId(payeeSprMainId);
		obj.setPayeeLeafId(payeeSprlastId);
		obj.setPayeeTypeId(payeeTypeId);
		obj.setDiscRemark(disRemark);
		if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}
				
		return otherBillingService.saveOtherBillDetails(masterIdsChecked,servIdsChecked,refDocId,obj,multiPayDetails);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/fetchAllReceiptTotals", method = RequestMethod.POST)
	@ResponseBody
	public OtherBillReceiptMasterDTO fetchAllReceiptTotals(
		  
		   @RequestParam(value = "unitId") int unitId,
		   @RequestParam(value = "treatmentId") int treatmentId,
		   @RequestParam(value = "sponsorId") int sponsorId,
		   @RequestParam(value = "createdBy") int userId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "patientId") int patientId) {
		
		OtherBillReceiptMasterDTO obj=new OtherBillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTreatmentId(treatmentId);
		obj.setSponsorCatId(sponsorId);	
		obj.setPatientId(patientId);
		return otherBillingService.fetchAllReceiptTotals(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillReceiptDetails", method = RequestMethod.POST)
	@ResponseBody
	public OtherBillReceiptMasterDTO getBillReceiptDetails(
		   @RequestParam(value = "patientId") int patientId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId) {
			
		OtherBillReceiptMasterDTO obj=new OtherBillReceiptMasterDTO();
		obj.setBillId(billId);
		obj.setPatientId(patientId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		return otherBillingService.getBillReceiptDetails(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 26-July-2017
	* @codeFor	: Get total payable
	 ************/
	@RequestMapping(value = "/getTotalPayable", method = RequestMethod.POST)
	@ResponseBody
	public OtherBillingDto getTotalPayable(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "serviceId") int serviceId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "depId") int depId,
		   @RequestParam(value = "unitId") int unitId,
		   @RequestParam(value = "userId") int userId,
		   @RequestParam(value = "patientId") int patientId) {
			
		OtherBillingDto obj=new OtherBillingDto();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setServiceId(serviceId);
		obj.setDepartmentId(depId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setPatienttId(patientId);
		return otherBillingService.getTotalPayable(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveRefundBillDetails", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveRefundBillDetails(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "discount") Double discount,
				@RequestParam(value = "totalPaid") Double totalPaid,
				@RequestParam(value = "servIdsChecked") String servIdsChecked,
				@RequestParam(value = "refDocId") Integer refDocId,
				@RequestParam(value = "payMode") Integer payMode,
				@RequestParam(value = "bNumber") String bNumber,
				@RequestParam(value = "bName") String bName,
				@RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "againstId") Integer againstId,
				@RequestParam(value = "receiptOf") String receiptOf,
				@RequestParam(value = "payeeSprMainId") Integer payeeSprMainId,
				@RequestParam(value = "payeeSprlastId") Integer payeeSprlastId,
				@RequestParam(value = "payeeTypeId") Integer payeeTypeId,
				@RequestParam(value = "refPer") Integer refPer,
				@RequestParam(value = "patientId") Integer patientId) {
		
		OtherBillReceiptMasterDTO obj=new OtherBillReceiptMasterDTO();
		obj.setTreatmentId(treatmentId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setTotalPaid(totalPaid);
		obj.setPayMode(payMode);
		obj.setbNumber(bNumber);
		obj.setbName(bName);	
		obj.setAgainstId(againstId);
		obj.setReceiptOf(receiptOf);
		obj.setPayeeMainId(payeeSprMainId);
		obj.setPayeeLeafId(payeeSprlastId);
		obj.setPayeeTypeId(payeeTypeId);
		obj.setActualRefPer(refPer);
		obj.setPatientId(patientId);
		/*if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}*/
				
		return otherBillingService.saveRefundBillDetails(servIdsChecked,refDocId,obj);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 14-July-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillRefundDetails", method = RequestMethod.POST)
	@ResponseBody
	public OtherBillRefundMasterDTO getBillRefundDetails(
		   @RequestParam(value = "patientId") int patientId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId) {
			
		OtherBillRefundMasterDTO obj=new OtherBillRefundMasterDTO();
		obj.setBillId(billId);
		obj.setPatientId(patientId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		return otherBillingService.getBillRefundDetails(obj,callFrom);			
	}
	
}
