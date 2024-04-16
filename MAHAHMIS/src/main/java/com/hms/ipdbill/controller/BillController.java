package com.hms.ipdbill.controller;

import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.BulkSettlementMasterDTO;
import com.hms.ipdbill.dto.BulkSettlementMultiSpsrViewDTO;
import com.hms.ipdbill.dto.BulkSettlementViewDTO;
import com.hms.ipdbill.service.BillService;
import com.hms.pharmacy.pojo.BankMaster;

@Controller
@RequestMapping(value = "/bill")
public class BillController {

	@Autowired
	BillService billService;
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveBillDetails", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveBillDetails(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "discount") Double discount,
				@RequestParam(value = "discountAmt") Double discountAmt,				
				@RequestParam(value = "disAuth") Integer disAuth,
				@RequestParam(value = "disNarrtn") String disNarrtn,
				@RequestParam(value = "totalPaid") Double totalPaid,
				@RequestParam(value = "masterIdsChecked") String masterIdsChecked,
				@RequestParam(value = "servIdsChecked") String servIdsChecked,
				@RequestParam(value = "refDocId") Integer refDocId,
				@RequestParam(value = "payMode") Integer payMode,
				@RequestParam(value = "bNumber") String bNumber,
				@RequestParam(value = "batchNo") String batchNo,
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
				@RequestParam(value = "regBillDetId") Integer regBillDetId,
				@RequestParam(value = "paidByCashFlag") String paidByCashFlag,
				@RequestParam(value = "paidByCashServices") String paidByCashServices,
				@RequestParam(value = "discountFrom") String discountFrom,
				@RequestParam(value = "discountStatus") String discountStatus) {
		
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setTreatmentId(treatmentId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setFirstDisc(discountAmt);
		obj.setDiscGivenBy(disAuth);
		obj.setDiscNarrtn(disNarrtn);
		obj.setTotalPaid(totalPaid);
		obj.setPayMode(payMode);
		obj.setbNumber(bNumber);
		obj.setBatchNumber(batchNo);
		obj.setbName(bName);		
		obj.setAgainstId(againstId);
		obj.setSourceTypeId(sourceCatId);
		obj.setSponsorCatId(sponsorCatId);
		obj.setReceiptOf(receiptOf);
		obj.setPayeeMainId(payeeSprMainId);
		obj.setPayeeLeafId(payeeSprlastId);
		obj.setPayeeTypeId(payeeTypeId);
		obj.setDiscRemark(disRemark);
		obj.setAccountStatusOpdDiagno("N");
		obj.setBulkMstId(regBillDetId);
		
		obj.setDiscountFrom(discountFrom);
		obj.setDiscountStatus(discountStatus);
		if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}
		
		obj.setPaidByCashFlag(paidByCashFlag);
		obj.setPaidByCashServices(paidByCashServices);
		
		return billService.saveBillDetails(masterIdsChecked,servIdsChecked,refDocId,obj,multiPayDetails);			
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
				@RequestParam(value = "refAuth") Integer refAuth,
				@RequestParam(value = "refRemark") String refRemark,
				@RequestParam(value = "servIdsChecked") String servIdsChecked,
				@RequestParam(value = "refDocId") Integer refDocId,
				@RequestParam(value = "payMode") Integer payMode,
				@RequestParam(value = "bNumber") String bNumber,
				@RequestParam(value = "batchNo") String batchNo,
				@RequestParam(value = "bName") String bName,
				@RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "againstId") Integer againstId,
				@RequestParam(value = "receiptOf") String receiptOf,
				@RequestParam(value = "payeeSprMainId") Integer payeeSprMainId,
				@RequestParam(value = "payeeSprlastId") Integer payeeSprlastId,
				@RequestParam(value = "payeeTypeId") Integer payeeTypeId,
				@RequestParam(value = "refPer") Double refPer) {
		
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setTreatmentId(treatmentId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setTotalPaid(totalPaid);		
		obj.setRefGivenBy(refAuth);
		obj.setRefRemark(refRemark);		
		obj.setPayMode(payMode);
		obj.setbNumber(bNumber);
		obj.setBatchNumber(batchNo);
		obj.setbName(bName);	
		obj.setAgainstId(againstId);
		obj.setReceiptOf(receiptOf);
		obj.setPayeeMainId(payeeSprMainId);
		obj.setPayeeLeafId(payeeSprlastId);
		obj.setPayeeTypeId(payeeTypeId);
		obj.setActualRefPer(refPer);
		/*if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}*/
				
		return billService.saveRefundBillDetails(servIdsChecked,refDocId,obj);			
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillReceiptDetails", method = RequestMethod.POST)
	@ResponseBody
	public BillReceiptMasterDTO getBillReceiptDetails(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId,
		   @RequestParam(value = "chargesSlaveId") int chargesSlaveId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		obj.setUnitId(unitId);
		//obj.setSponsorCatId(chargesSlaveId);
		return billService.getBillReceiptDetails(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 14-July-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillRefundDetails", method = RequestMethod.POST)
	@ResponseBody
	public BillRefundMasterDTO getBillRefundDetails(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId,
		   @RequestParam(value = "chargesSlaveId") int chargesSlaveId,
		   HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			
		BillRefundMasterDTO obj=new BillRefundMasterDTO();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		obj.setUnitId(unitId);
		//obj.setSponsorCatId(chargesSlaveId);
		return billService.getBillRefundDetails(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 26-July-2017
	* @codeFor	: Get total payable
	 ************/
	@RequestMapping(value = "/getTotalPayable", method = RequestMethod.POST)
	@ResponseBody
	public BillDetailsDto getTotalPayable(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "serviceId") int serviceId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "depId") int depId,
		   @RequestParam(value = "unitId") int unitId,
		   @RequestParam(value = "chargesSlaveId") int chargesSlaveId,
		   @RequestParam(value = "userId") int userId) {
			
		BillDetailsDto obj=new BillDetailsDto();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setServiceId(serviceId);
		obj.setDepartmentId(depId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setChargesSlaveId(chargesSlaveId);
		return billService.getTotalPayable(obj,callFrom);			
	}
	
	//@author : Sagar kadam @date: 10-Aug-2017 @reason : To fetch Bank Master List
 	@RequestMapping(value = "/getBankMasterList", method = RequestMethod.POST)
	@ResponseBody
	public BankMaster getBankMasterList() {
		
		return billService.getBankMasterList();			
	}	
		
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBulkReceiptDetails", method = RequestMethod.POST)
	@ResponseBody
	public BulkSettlementViewDTO getBulkReceiptDetails(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom) {
			
		BulkSettlementMasterDTO obj=new BulkSettlementMasterDTO();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		return billService.getBulkReceiptDetails(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveBulkDetails", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveBulkDetails(				
				@RequestParam(value = "fromDate") String fromDate,				
				@RequestParam(value = "lastDate") String lastDate,	
				@RequestParam(value = "unitId") Integer unitId,
				@RequestParam(value = "depId") Integer depId,
				@RequestParam(value = "createdBy") Integer userId,
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "totTDS") Double totTDS,				
				@RequestParam(value = "totConcn") Double totConcn,
				@RequestParam(value = "totalPaid") Double totalPaid,
				@RequestParam(value = "totalRemain") Double totalRemain,
				@RequestParam(value = "payMode") Integer payMode,
				@RequestParam(value = "payeeTypeId") Integer payeeTypeId,
				@RequestParam(value = "payeeSprMainId") Integer payeeSprMainId,
				@RequestParam(value = "payeeSprlastId") Integer payeeSprlastId,
				@RequestParam(value = "bNumber") String bNumber,
				@RequestParam(value = "bName") String bName,
				@RequestParam(value = "chqNo") String chqNo,
				@RequestParam(value = "servIdsChecked") String servIdsChecked,
				@RequestParam(value = "multiPayDetails") String multiPayDetails,
				@RequestParam(value = "bulkSlaveDetails") String bulkSlaveDetails) {
		
		BulkSettlementMasterDTO obj=new BulkSettlementMasterDTO();
		
		obj.setFromDate(fromDate);
		obj.setToDate(lastDate);
		obj.setUnitId(unitId);
		obj.setDepartmentId(depId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalTds(totTDS);
		obj.setTotalConsn(totConcn);
		obj.setTotalPaid(totalPaid);
		obj.setTotalRemain(totalRemain);
		obj.setPayMode(payMode);
		obj.setPayeeMainId(payeeSprMainId);
		obj.setPayeeLeafId(payeeSprlastId);
		obj.setbNumber(bNumber);
		obj.setbName(bName);
		obj.setChequeNo(chqNo);
		return billService.saveBulkDetails(obj,multiPayDetails,bulkSlaveDetails);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBulkSearchData", method = RequestMethod.POST)
	@ResponseBody
	public BulkSettlementMultiSpsrViewDTO getBulkSearchData(			
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "sponId") Integer sponId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "sponsorF") Integer sponsorF,
			@RequestParam(value = "sponsorL") Integer sponsorL,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "lastDate") String lastDate,
			@RequestParam(value = "letter") String letter) {
			
		//BulkSettlementMasterDTO obj=new BulkSettlementMasterDTO();		
		return billService.getBulkSearchData(callFrom,unitId,deptId,sponId,sponsorF,sponsorL,fromDate,lastDate,letter);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getDailyCash", method = RequestMethod.POST)
	@ResponseBody
	public BillReceiptMasterDTO searchDailyCashReport(			
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {		
		
		   SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-mm-dd");
		   	   
		   System.err.println("from Date :"+fromDate);
		   System.err.println("to Date :"+toDate);
		   
		   /*java.util.Date fDate = null;
		   java.util.Date tDate = null;
		   try {
				fDate = sdf1.parse(fromDate);
				tDate = sdf1.parse(toDate);
		   } catch (ParseException e) {
			
			   e.printStackTrace();
		   }
		   java.sql.Date sqlToDate = new Date(tDate.getTime()); 
		   java.sql.Date sqlFromDate = new Date(fDate.getTime()); */
		
		//BulkSettlementMasterDTO obj=new BulkSettlementMasterDTO();		
		return billService.searchDailyCashReport(callFrom,unitId,deptId,userId,fromDate,toDate);			
	}
	/************
	* @author	: BILAL
	* @date		: 31-10-2017
	* @codeFor	: For getting Receipt ID for OPD Package 
	 ************/
	@RequestMapping(value = "/receiptId", method = RequestMethod.POST)
	public @ResponseBody
	int fetchreceiptId(@RequestParam("treatmentId") int treatmentId,
			           @RequestParam("billDetailsId") int billDetailsId) {
		int a = billService
				.fetchreceiptId(treatmentId,billDetailsId);
		
		return a;
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/fetchAllReceiptTotals", method = RequestMethod.POST)
	@ResponseBody
	public BillReceiptMasterDTO fetchAllReceiptTotals(
		  
		   @RequestParam(value = "unitId") int unitId,
		   @RequestParam(value = "treatmentId") int treatmentId,
		   @RequestParam(value = "sponsorId") int sponsorId,
		   @RequestParam(value = "createdBy") int userId,
		   @RequestParam(value = "callFrom") String callFrom) {
		
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTreatmentId(treatmentId);
		obj.setSponsorCatId(sponsorId);		
		return billService.fetchAllReceiptTotals(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 29-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/fetchPrevPending", method = RequestMethod.POST)
	@ResponseBody
	public BillReceiptMasterDTO fetchPrevPending(
		  
		   @RequestParam(value = "unitId") int unitId,
		   @RequestParam(value = "treatmentId") int treatmentId,
		   @RequestParam(value = "sponsorId") int sponsorId,
		   @RequestParam(value = "createdBy") int userId,
		   @RequestParam(value = "callFrom") String callFrom) {
		
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTreatmentId(treatmentId);
		obj.setSponsorCatId(sponsorId);		
		return billService.fetchPrevPending(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 29-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillPrefix", method = RequestMethod.POST)
	@ResponseBody
	public EhatBillPrefix getBillPrefix(
			@RequestParam(value = "depId") int depId,		  
			@RequestParam(value = "callFrom") String callFrom) {
		
		EhatBillPrefix obj=new EhatBillPrefix();
		obj.setDepId(depId);
		
		return billService.getBillPrefix(obj,callFrom);			
	}
	
	/************
	* @author	: Tariq Aalam
	* @date		: 29-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getEmergancyCharges", method = RequestMethod.GET)
	public @ResponseBody
	double getEmergancyCharges() {
		double a = billService.getEmergancyCharges();
		return a;
	}
	
	/************
	* @author	: Laxman Nikam
	* @date		: 07-March-2018
	* @codeFor	: After Paid,Test Sent To Lab for OPD and Diagno only.
	 ************/
	@RequestMapping(value = "/paidTestSendToLab", method = RequestMethod.POST)
	@ResponseBody
	public Integer paidTestSendToLab(
			@RequestParam(value = "treatmentId") Integer treatmentId,		  
			HttpServletRequest request) {
		
		return billService.paidTestSendToLab(treatmentId,request);			
	}

	/* @author	: sanjay shah
	* @date		: 
	* @codeFor	: opd/digno After pay bill send to ris.
	 ************/
	@RequestMapping(value = "/paidTestSendToRis", method = RequestMethod.POST)
	@ResponseBody
	public Integer paidTestSendToRis(
			@RequestParam(value = "subservIdsChecked") String subservIdsChecked,	
			@RequestParam(value = "treatmentId") Integer treatmentId,
			HttpServletRequest request) {
		
		return billService.paidTestSendToRis(subservIdsChecked,treatmentId,request);			
	}
	
	@RequestMapping(value = "/paidTestSendToRadiation", method = RequestMethod.POST)
	@ResponseBody
	public Integer paidTestSendToRadiation(
			@RequestParam(value = "subservIdsChecked") String subservIdsChecked,	
			@RequestParam(value = "treatmentId") Integer treatmentId,
			HttpServletRequest request) {
		
		return billService.paidTestSendToRadiation(subservIdsChecked,treatmentId,request);			
	}
	
	
	
	
	/************
	* @author	: Mohd Tarique Aalam
	* @date		: 03-07-2018
	* @codeFor	: daily collection report
	 ************/
	@RequestMapping(value = "/getDailyCollection", method = RequestMethod.POST)
	@ResponseBody
	public BillReceiptMasterDTO getDailyCollectionReport(			
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {		
		
		   SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-mm-dd");
		   	   
		   System.err.println("from Date :"+fromDate);
		   System.err.println("to Date :"+toDate);
		   
		   /*java.util.Date fDate = null;
		   java.util.Date tDate = null;
		   try {
				fDate = sdf1.parse(fromDate);
				tDate = sdf1.parse(toDate);
		   } catch (ParseException e) {
			
			   e.printStackTrace();
		   }
		   java.sql.Date sqlToDate = new Date(tDate.getTime()); 
		   java.sql.Date sqlFromDate = new Date(fDate.getTime()); */
		
		//BulkSettlementMasterDTO obj=new BulkSettlementMasterDTO();		
		return billService.searchDailyCollectionReport(callFrom,unitId,deptId,userId,fromDate,toDate);			
	}
	
	
	@RequestMapping(value = "/fetchbulsetlmentskdetails", method = RequestMethod.POST)
	@ResponseBody
	public BulkSettlementMasterDTO fetchbulsetlmentskdetails(
		   @RequestParam(value = "bulk_master_id") int bulk_master_id) {

		return billService.fetchbulsetlmentskdetails(bulk_master_id);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getPharmacyInBillOrNot", method = RequestMethod.POST)
	@ResponseBody
	public Integer getPharmacyInBillOrNot(
			@RequestParam(value = "treatmentId") Integer treatmentId,	
			@RequestParam(value = "unitId") Integer unitId,	
			@RequestParam(value = "userId") Integer userId,	
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "chargesSlaveId") Integer chargesSlaveId,
			@RequestParam(value = "callFrom") String callFrom) {		
		
			return billService.getPharmacyInBillOrNot(treatmentId,unitId,userId,deptId,chargesSlaveId);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getSettledBills", method = RequestMethod.POST)
	@ResponseBody
	public BulkSettlementMasterDTO getSettledBills(			
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "sponId") Integer sponId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "sponsorF") Integer sponsorF,
			@RequestParam(value = "sponsorL") Integer sponsorL,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "lastDate") String lastDate,
			@RequestParam(value = "letter") String letter,
	        @RequestParam ("startIndex")Integer startIndex){
			
		BulkSettlementMasterDTO obj=new BulkSettlementMasterDTO();
		obj.setUnitId(unitId);
		obj.setDepartmentId(deptId);
		obj.setSponsorCatId(sponId);
		//obj.setFromDate(fromDate);
		//obj.setToDate(lastDate);
		obj.setPayeeMainId(sponsorF);
		obj.setPayeeLeafId(sponsorL);
		
		return billService.getSettledBills(obj,callFrom,letter,fromDate,lastDate,startIndex);			
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/setOpdBillMaster", method = RequestMethod.POST)
	@ResponseBody
	public int setOpdBillMaster(			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "treatmentId") Integer treatmentId,
			@RequestParam(value = "callFrom") String callFrom) {
			
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTreatmentId(treatmentId);
		
		return billService.setOpdBillMaster(obj,callFrom);			
	}
	@RequestMapping(value = "/checkUserNameandPasswordByRefundApproved", method = RequestMethod.POST)
	@ResponseBody
	public String checkUserNameandPasswordByRefundApproved(@RequestParam(value = "userId") Integer userId,@RequestParam(value = "userName") String username,@RequestParam(value = "userPassword")String password) {
	
		return billService.checkUserNameandPasswordByRefundApproved(userId,username,password);			

}
	@RequestMapping(value = "/updateBillMasterTotalForOPD", method = RequestMethod.POST)
	@ResponseBody
	public int updateBillMasterTotalForOPD(@RequestParam(value = "treatId")int treatId) {
	
		return billService.updateBillMasterTotalForOPD(treatId);			

    }
	
	@RequestMapping(value = "/saveOutStandingRemark", method = RequestMethod.POST)
	@ResponseBody
	public int saveOutStandingRemark(@RequestParam("treatmentId")int treatId,@RequestParam("outStandingRemark")String outStandingRemark,
			@RequestParam("outStandingReson")String outStandingReson) {
	
		return billService.saveOutStandingRemark(treatId,outStandingRemark,outStandingReson);			

    }
	
	@RequestMapping(value = "/setOpdBillDetailsDistribute", method = RequestMethod.POST)
	public @ResponseBody Integer setOpdBillDetailsDistribute(@RequestParam("treatmentId") Integer treatId, HttpServletRequest request) {
		
		return billService.setOpdBillDetailsDistribute(treatId,request);		
	}	
	
	@RequestMapping(value = "/setBulkSettleDistributeOnload", method = RequestMethod.POST)
	public @ResponseBody Integer setBulkSettleDistributeOnload(@RequestParam("treatmentId") Integer treatId, HttpServletRequest request) {
		
		return billService.setBulkSettleDistributeOnload(treatId,request);		
	}
	
	/************
	* @author	: Vishant Pawar
	* @date		: 1-april-2024
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveRefundBillDetailsNew", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveRefundBillDetailsNew(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "discount") Double discount,
				@RequestParam(value = "totalPaid") Double totalPaid,
				@RequestParam(value = "refAuth") Integer refAuth,
				@RequestParam(value = "refRemark") String refRemark,
				@RequestParam(value = "servIdsChecked") String servIdsChecked,
				@RequestParam(value = "refDocId") Integer refDocId,
				@RequestParam(value = "payMode") Integer payMode,
				@RequestParam(value = "bNumber") String bNumber,
				@RequestParam(value = "batchNo") String batchNo,
				@RequestParam(value = "bName") String bName,
				@RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "againstId") Integer againstId,
				@RequestParam(value = "receiptOf") String receiptOf,
				@RequestParam(value = "payeeSprMainId") Integer payeeSprMainId,
				@RequestParam(value = "payeeSprlastId") Integer payeeSprlastId,
				@RequestParam(value = "payeeTypeId") Integer payeeTypeId,
				@RequestParam(value = "refPer") Double refPer) {
		
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setTreatmentId(treatmentId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setTotalPaid(totalPaid);		
		obj.setRefGivenBy(refAuth);
		obj.setRefRemark(refRemark);		
		obj.setPayMode(payMode);
		obj.setbNumber(bNumber);
		obj.setBatchNumber(batchNo);
		obj.setbName(bName);	
		obj.setAgainstId(againstId);
		obj.setReceiptOf(receiptOf);
		obj.setPayeeMainId(payeeSprMainId);
		obj.setPayeeLeafId(payeeSprlastId);
		obj.setPayeeTypeId(payeeTypeId);
		obj.setActualRefPer(refPer);
		/*if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}*/
				
		return billService.saveRefundBillDetailsNew(servIdsChecked,refDocId,obj);			
	}
	
	
}
