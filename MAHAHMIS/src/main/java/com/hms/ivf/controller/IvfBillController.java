package com.hms.ivf.controller;

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

import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dto.EhatViewPatientBedDetailsIvfDto;
import com.hms.ivf.dto.IvfBillDetailsDto;
import com.hms.ivf.dto.IvfBillReceiptMasterDTO;
import com.hms.ivf.dto.IvfBillRefundMasterDTO;
import com.hms.ivf.dto.PreviousTreatmentBillDto;
import com.hms.ivf.service.IvfBillService;
import com.hms.opdbill.dao.impl.OpdQueueDaoImpl;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.OpdQueueDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "/ivfbill")
public class IvfBillController {

	@Autowired
	IvfBillService ivfService;
	
	static Logger log=Logger.getLogger(OpdQueueDaoImpl.class.getName());
	static {
		System.out.println("IvfBillController is Loaded...!");
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get opd queue patient details 
	================*/
	@ResponseBody
	@RequestMapping(value = "/getAllIvfQueuePatient", method = RequestMethod.POST)
	public OpdQueueDto getAllIvfQueuePatient(OpdQueueDto objDto) {
		
		log.info("In IvfBillController getAllIvfQueuePatient()");
		OpdQueueDto ltRegMasterDto = new OpdQueueDto();
		ltRegMasterDto = ivfService.getAllIvfQueuePatient(objDto);
		return ltRegMasterDto;
	}
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get billing header patient details info 
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPatientInfoByTreatmentId", method = RequestMethod.POST)
	public PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto) {
		
		log.info("In IvfBillController getPatientInfoByTreatmentId()");
		return ivfService.getPatientInfoByTreatmentId(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To patient service details 
	================*/
	@ResponseBody
	@RequestMapping(value = "/fetchPatientBillAmount", method = RequestMethod.POST)
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {
		
		log.info("In IvfBillController getPatientServiceDetails()");
		return ivfService.getPatientServiceDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get patient sub service details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPatientServiceBill", method = RequestMethod.POST)
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {
		
		log.info("In IvfBillController getPatientSubServiceDetails()");
		return ivfService.getPatientSubServiceDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get patient package details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPackagedataforOpd", method = RequestMethod.POST)
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto) {
		
		log.info("In IvfBillController getPatientPackageDetails()");
		return ivfService.getPatientPackageDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get bill amount details
	================*/
	@ResponseBody
	@RequestMapping(value = "/getAllAmountDetails", method = RequestMethod.POST)
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {
		
		log.info("In IvfBillController getAllAmountDetails()");
		return ivfService.getAllAmountDetails(objDto);
	}
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To get previous IVF patient list
	================*/
	@ResponseBody
	@RequestMapping(value = "/getPreviousTreatmentPatient ", method = RequestMethod.POST)
	public PreviousTreatmentBillDto getPreviousTreatmentPatient(PreviousTreatmentBillDto objDto) {
		
		log.info("In IvfBillController getPreviousTreatmentPatient()");
		return ivfService.getPreviousTreatmentPatient(objDto);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPrevPatdetails", method = RequestMethod.POST)
	public TreatmentDto getPrevPatdetails(@RequestParam("patientId") Integer patientId) {
	
		log.info("In IvfBillController getPrevPatdetails()");
		return ivfService.getPrevPatdetails(patientId);		
	}
	
	//Modify by Vinod Udawant on 31-march-2021 for IVF OPDQueue Patients and Queue Management.
	@RequestMapping(value = "/getAllOpdRecordsDeptwiseWithAuto", method = RequestMethod.POST)
	@ResponseBody
	public OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(@RequestParam("deptId") Integer deptId,
			@RequestParam("letter") String letter,@RequestParam("usertype") String  usertype,HttpServletRequest request) {
		OpdQueManagmentViewDto ltRegMasterDto = new  OpdQueManagmentViewDto();
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		ltRegMasterDto = ivfService.getAllOpdRecordsDeptwiseWithAuto(deptId,letter,usertype,unitId);
		 
		return ltRegMasterDto;
	}
	
	@RequestMapping(value = "/saveCpoe", method = RequestMethod.POST)
	@ResponseBody
	public int saveModule(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,@RequestParam("queryType") String queryType,
			@RequestParam("module") String module,@RequestParam("callfrom") String callfrom) {
		
		int response=0;
		IvfBillDetailsDto billDetailsDto = (IvfBillDetailsDto) ConfigUIJSONUtility.getObjectFromJSON(serviceDetails, IvfBillDetailsDto.class);
		response = ivfService.savecpoe(billDetailsDto.getListBillDetails().get(0), request, queryType);
		return response;
	}
	
	/*@RequestMapping(value = "/fetchPatientBillAmount", method = RequestMethod.POST)
	public @ResponseBody
	IvfBillNobleDto getPatientBillAmount(@RequestParam("callform") Integer treatmentId,HttpServletRequest request) {
		
		List<IvfBillNobleDto> listBillDetails = new ArrayList<IvfBillNobleDto>();
		listBillDetails =  (List<IvfBillNobleDto>) ivfService.getPatientBillAmount(treatmentId,request);
		
		IvfBillNobleDto obj=new IvfBillNobleDto();
		obj.setListBillNobleDto(listBillDetails);				
		return obj;
	}
	
	@RequestMapping(value = "/getPatientServiceBill", method = RequestMethod.POST)
	public @ResponseBody
	IvfBillNobleServiceDto getPatientServiceBill(@RequestParam("callform") Integer treatmentId,@RequestParam("call") Integer serviceId ) {
		
		List<IvfBillNobleServiceDto> listBillDetails = new ArrayList<IvfBillNobleServiceDto>();
		listBillDetails =  (List<IvfBillNobleServiceDto>) ivfService.getPatientServiceBill(treatmentId,serviceId);
		
		IvfBillNobleServiceDto obj=new IvfBillNobleServiceDto();
		obj.setListBillNobleServiceDto(listBillDetails);
			
		return obj;		
	}
	
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
		return ivfService.getTotalPayable(obj,callFrom);			
	}
	
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
		return ivfService.fetchAllReceiptTotals(obj,callFrom);			
	}*/
	
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
				@RequestParam(value = "paidByCashServices") String paidByCashServices) {
		
		IvfBillReceiptMasterDTO obj=new IvfBillReceiptMasterDTO();
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
		if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}
		
		obj.setPaidByCashFlag(paidByCashFlag);
		obj.setPaidByCashServices(paidByCashServices);
		
		return ivfService.saveBillDetails(masterIdsChecked,servIdsChecked,refDocId,obj,multiPayDetails);			
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
		
		IvfBillReceiptMasterDTO obj=new IvfBillReceiptMasterDTO();
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
				
		return ivfService.saveRefundBillDetails(servIdsChecked,refDocId,obj);			
	}
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillReceiptDetails", method = RequestMethod.POST)
	@ResponseBody
	public IvfBillReceiptMasterDTO getBillReceiptDetails(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId,
		   @RequestParam(value = "chargesSlaveId") int chargesSlaveId) {
			
		IvfBillReceiptMasterDTO obj=new IvfBillReceiptMasterDTO();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		//obj.setSponsorCatId(chargesSlaveId);
		return ivfService.getBillReceiptDetails(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 14-July-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillRefundDetails", method = RequestMethod.POST)
	@ResponseBody
	public IvfBillRefundMasterDTO getBillRefundDetails(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId,
		   @RequestParam(value = "chargesSlaveId") int chargesSlaveId) {
			
		IvfBillRefundMasterDTO obj=new IvfBillRefundMasterDTO();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		//obj.setSponsorCatId(chargesSlaveId);
		return ivfService.getBillRefundDetails(obj,callFrom);			
	}
	
	@RequestMapping(value = "/deleteMasterReceiptOPD", method = RequestMethod.POST)
	public @ResponseBody
	String deleteMasterReceiptOPD(
			@RequestParam("recId") Integer recId,	
			HttpServletRequest request) {

		String msg = "";
		if (ivfService.deleteMasterReceiptOPD(recId, request) == 1) {
			msg = "Delete Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}
	
	@RequestMapping(value = "/getIvfPatientBedBill", method = RequestMethod.POST)
	public @ResponseBody
	EhatViewPatientBedDetailsIvfDto getIvfPatientBedBill(@RequestParam("callform") Integer treatmentId,@RequestParam("call") Integer serviceId) {
		List<EhatViewPatientBedDetailsIvfDto> listServiceIvfDto = new ArrayList<EhatViewPatientBedDetailsIvfDto>();
		listServiceIvfDto = ivfService
				.getIvfPatientBedBill(treatmentId,serviceId);
		EhatViewPatientBedDetailsIvfDto obj = new EhatViewPatientBedDetailsIvfDto();
		obj.setListBedIvfDto(listServiceIvfDto);
		return obj;

	}
	
	@RequestMapping(value = "/closeIVFPatientTreatment", method = RequestMethod.POST)
	@ResponseBody
	public int closeIVFPatientTreatment(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("ivfTreatId") Integer ivfTreatId,@RequestParam("patientId") Integer patientId,HttpServletRequest request) {
		
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");//Get unit id from session
		int res = ivfService.closeIVFPatientTreatment(treatmentId, userId, ivfTreatId, patientId);
		 
		return res;
	}
	
	@RequestMapping(value = "/getIvfTreatIdByNormalTreatmentId", method = RequestMethod.POST)
	@ResponseBody
	public int getIvfTreatIdByNormalTreatmentId(@RequestParam("treatmentId") Integer treatmentId,HttpServletRequest request) {
		
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");//Get unit id from session
		int res = ivfService.getIvfTreatIdByNormalTreatmentId(treatmentId);
		 
		return res;
	}
	
}
