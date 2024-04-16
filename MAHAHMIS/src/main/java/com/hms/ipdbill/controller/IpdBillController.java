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
import com.hms.ehat.dto.BillNobleServicePackageipdDto;
import com.hms.ehat.dto.BillQuotationDto;
import com.hms.ehat.dto.CghsIpdDto;
import com.hms.ehat.dto.ConfigurationViewServiceDto2;
import com.hms.ehat.dto.DistributionPojo;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto2;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsForIpdPackage;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto2;
import com.hms.ehat.dto.GetPopUpDataForOTDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.NewBillQuotation;
import com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.EmrChargesDto;
import com.hms.ipdbill.dto.IpdBillDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdBillPatientsDTO2;
import com.hms.ipdbill.dto.IpdBillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
import com.hms.ipdbill.service.IpdBillService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller("old ipdbill")
@RequestMapping(value = "/ipdbill")
public class IpdBillController {
	
	@Autowired
	IpdBillService ipdBillService;

		//Fetching Ipd patient data bye id
		@RequestMapping(value = "/getIpdPatientServiceListFromView", method = RequestMethod.POST)
		public @ResponseBody
		EhatViewPatientServiceDetailIpdDto getIpdPatientServiceListFromView(@RequestParam("callform") Integer treatmentId,@RequestParam("treatcloseForIpd") String treatcloseForIpd,HttpServletRequest request) {
			List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto = new ArrayList<EhatViewPatientServiceDetailIpdDto>();
			listServiceIpdDto = ipdBillService
					.getIpdPatientServiceListFromView(treatmentId,treatcloseForIpd,request);
			EhatViewPatientServiceDetailIpdDto obj = new EhatViewPatientServiceDetailIpdDto();
			obj.setListServiceIpdDto(listServiceIpdDto);
			return obj;
	
		}
		
		//Fetching Ipd patient Estimate data bye  Service id
				@RequestMapping(value = "/getPatientBillAmountIpdForEstimation", method = RequestMethod.POST)
				public @ResponseBody
				EhatViewPatientServiceDetailIpdDto getPatientBillAmountIpdForEstimation(@RequestParam("callform") Integer treatmentId,
						@RequestParam("startDate") String startDate,@RequestParam("endDate") String endDate,
						@RequestParam("callFrom") String callFrom,HttpServletRequest request) {
					List<EhatViewPatientServiceDetailIpdDto> listServiceIpdDto = new ArrayList<EhatViewPatientServiceDetailIpdDto>();
					listServiceIpdDto = ipdBillService
							.getPatientBillAmountIpdForEstimation(treatmentId,startDate,endDate,callFrom,request);
					EhatViewPatientServiceDetailIpdDto obj = new EhatViewPatientServiceDetailIpdDto();
					obj.setListServiceIpdDto(listServiceIpdDto);
					return obj;
			
				}
		
		//Fetching patient Previous Ipd bill data bye id.
		@RequestMapping(value = "/getPatientPreviousBillAmountForGenIpd", method = RequestMethod.POST)
		public @ResponseBody
		EhatViewPatientServiceDetailIpdDto2 getPatientPreviousBillAmountForGenIpd(@RequestParam("callform") Integer treatmentId,HttpServletRequest request) {
			List<EhatViewPatientServiceDetailIpdDto2> listServiceIpdDto = new ArrayList<EhatViewPatientServiceDetailIpdDto2>();
			listServiceIpdDto = ipdBillService
					.getPatientPreviousBillAmountForGenIpd(treatmentId,request);
			EhatViewPatientServiceDetailIpdDto2 obj = new EhatViewPatientServiceDetailIpdDto2();
			obj.setListServiceIpdDto(listServiceIpdDto);
		System.err.println("PrvTreat>>>>>>>>++"+treatmentId);
			return obj;
	
		}
		
		
		
		
		@RequestMapping(value = "/getPatientBedBill", method = RequestMethod.POST)
		public @ResponseBody
		EhatViewPatientBedDetailsIpdDto getPatientBedBill(@RequestParam("callform") Integer treatmentId,@RequestParam("call") Integer serviceId) {
			List<EhatViewPatientBedDetailsIpdDto> listServiceIpdDto = new ArrayList<EhatViewPatientBedDetailsIpdDto>();
			listServiceIpdDto = ipdBillService
					.getPatientBedBill(treatmentId,serviceId);
			EhatViewPatientBedDetailsIpdDto obj = new EhatViewPatientBedDetailsIpdDto();
			obj.setListBedIpdDto(listServiceIpdDto);
			return obj;
	
		}
		
		
		@RequestMapping(value = "/getBedDetailsForEstimate", method = RequestMethod.POST)
		public @ResponseBody
		EhatViewPatientBedDetailsIpdDto getBedDetailsForEstimate(@RequestParam("callform") Integer treatmentId,@RequestParam("call") Integer serviceId,
				@RequestParam("startDate") String startDate,@RequestParam("endDate") String endDate) {
			List<EhatViewPatientBedDetailsIpdDto> listServiceIpdDto = new ArrayList<EhatViewPatientBedDetailsIpdDto>();
			listServiceIpdDto = ipdBillService
					.getBedDetailsForEstimate(treatmentId,serviceId,startDate,endDate);
			EhatViewPatientBedDetailsIpdDto obj = new EhatViewPatientBedDetailsIpdDto();
			obj.setListBedIpdDto(listServiceIpdDto);
			return obj;
	
		}
		
		
		@RequestMapping(value = "/getIpdPatientServiceBill2", method = RequestMethod.POST)
		@ResponseBody
		public EhatViewPatientSubServiceDetailsIpdDto getPatientServiceBill(@RequestParam("callform2") String treatmentId,@RequestParam("call2") String serviceId) {
			List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
			listSubServiceIpdDto = ipdBillService
					.getPatientServiceBill(Integer.parseInt(treatmentId.trim()),Integer.parseInt(serviceId.trim()));
			EhatViewPatientSubServiceDetailsIpdDto obj = new EhatViewPatientSubServiceDetailsIpdDto();
			obj.setListSubServiceIpdDto(listSubServiceIpdDto);
			return obj;
	
		}
		
		@RequestMapping(value = "/getIpdPatientServiceBillForNarco", method = RequestMethod.POST)
		@ResponseBody
		public EhatViewPatientSubServiceDetailsIpdDto getPatientServiceBillForNarco(@RequestParam("callform2") String treatmentId,@RequestParam("call2") String serviceId,@RequestParam("chargesSlaveId") String chargesSlaveId) {
			List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
			listSubServiceIpdDto = ipdBillService
					.getPatientServiceBillForNarco(Integer.parseInt(treatmentId.trim()),Integer.parseInt(serviceId.trim()),Integer.parseInt(chargesSlaveId.trim()));
			EhatViewPatientSubServiceDetailsIpdDto obj = new EhatViewPatientSubServiceDetailsIpdDto();
			obj.setListSubServiceIpdDto(listSubServiceIpdDto);
			return obj;
	
		}
		
		@RequestMapping(value = "/getIpdPatientServiceBill2ForEstimate", method = RequestMethod.POST)
		@ResponseBody
		public EhatViewPatientSubServiceDetailsIpdDto getIpdPatientServiceBill2ForEstimate(@RequestParam("callform2") String treatmentId,@RequestParam("call2") String serviceId,
				@RequestParam("startDate") String startDate,@RequestParam("endDate") String endDate) {
			List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
			listSubServiceIpdDto = ipdBillService
					.getIpdPatientServiceBill2ForEstimate(Integer.parseInt(treatmentId),Integer.parseInt(serviceId),startDate,endDate);
			EhatViewPatientSubServiceDetailsIpdDto obj = new EhatViewPatientSubServiceDetailsIpdDto();
			obj.setListSubServiceIpdDto(listSubServiceIpdDto);
			return obj;
	
		}
		
	
	
		/**
		 * @author Kishor Lokhande
		 * @date 3 july_2017
		 * @code For Sponsor wise billing**/	
		@RequestMapping(value = "/getPatientServiceBillSponsorForIpd", method = RequestMethod.POST)
			public @ResponseBody
			EhatViewPatientSubServiceDetailsIpdDto2 getPatientServiceBillSponsorForIpd(
				@RequestParam("callform") Integer treatmentId,
				@RequestParam("call") Integer serviceId,
				@RequestParam("chargesSlaveId") Integer chargesSlaveId) {
			List<EhatViewPatientSubServiceDetailsIpdDto2> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto2>();
			listSubServiceIpdDto =  (List<EhatViewPatientSubServiceDetailsIpdDto2>) ipdBillService.getPatientServiceBillSponsorForIpd(treatmentId,serviceId,chargesSlaveId);
				
				EhatViewPatientSubServiceDetailsIpdDto2 obj=new EhatViewPatientSubServiceDetailsIpdDto2();
				obj.setListSubServiceIpdDto(listSubServiceIpdDto);
					System.err.println("tretId=>"+treatmentId+"ServID=>"+serviceId);
				return obj;
				
			}		
	
	
	
	
	
	
	
	
	
	

	/************
	* @author	: Vinod Udawant
	* @date		: 05-June-2017
	* @codeFor	: Get patients in ipd queue 
	 ************/
	@RequestMapping(value = "/viewIpdQueue", method = RequestMethod.POST)
	public @ResponseBody IpdQueueDTO getIpdQueue(HttpServletRequest request) {
		
		IpdQueueDTO objIpdQueue=new IpdQueueDTO();
		List<IpdQueueDTO> lstIpdQueue = new ArrayList<IpdQueueDTO>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
		lstIpdQueue = ipdBillService.getIpdQueue(unitId);		
		objIpdQueue.setLstIpdQueue(lstIpdQueue);
		return objIpdQueue;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 05-June-2017
	* @codeFor	: Get patients in ipd queue 
	 ************/
	@RequestMapping(value = "/autoSuggestionIpdQueue", method = RequestMethod.POST)
	public @ResponseBody
	IpdQueueDTO getAutoSuggestionIpdQeue(@RequestParam String letter) {
		List<IpdQueueDTO> lstIpdQueuePatient = new ArrayList<IpdQueueDTO>();
		lstIpdQueuePatient = ipdBillService.getAutoSuggestionIpdQueue(letter);
		IpdQueueDTO objIpdBill = new IpdQueueDTO();
		objIpdBill.setLstIpdQueue(lstIpdQueuePatient);
		return objIpdBill;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 05-June-2017
	* @codeFor	: Get patients in ipd queue 
	 ************/
	@RequestMapping(value = "/saveIpdBillDetails", method = RequestMethod.POST)
	public @ResponseBody String saveIpdBillDetails(IpdBillDTO objDto) {
		
		String result = ipdBillService.saveIpdBillDetails(objDto);		
		return result;
	}
	
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
	
	/************
	* @author	: Vinod Udawant
	* @date		: 05-June-2017
	* @codeFor	: Get patients in ipd queue 
	 ************/
	/*@RequestMapping(value = "/getChargesMasterById", method = RequestMethod.GET)
	public @ResponseBody
	List<ChargesMasterDto> getChargesMasterById(
			@RequestParam("chargesId") Integer chargesId) {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = chargesMasterService.getChargesById(chargesId);
		return ltChargesMasters;
	}*/	
	/************
	* @author	: Vinod Udawant
	* @date		: 05-June-2017
	* @codeFor	: Get ipd bill details of patient 
	 ************/
	@RequestMapping(value = "/fetchbiilldetails", method = RequestMethod.POST)
	public @ResponseBody IpdBillDTO getBillDetails(@RequestParam("treatId") Integer treatId, HttpServletRequest request) {
		
		IpdBillDTO objIpdbill=new IpdBillDTO();
		List<IpdBillDTO> lstIpdbilldetails = new ArrayList<IpdBillDTO>();
		lstIpdbilldetails = ipdBillService.getBillDetails(treatId,request);		
		objIpdbill.setListBillDetails(lstIpdbilldetails);
		return objIpdbill;
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 05-June-2017
	* @codeFor	: Get ipd bill details of patient 
	 ************/
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getsubServiceDetails", method = RequestMethod.POST)
	@ResponseBody
	public SubServiceDto getsubServiceDetails(@RequestParam("className") String className,@RequestParam("autoId") Integer srvId) {
		
		Class c=SubServiceDto.class;		
		return (SubServiceDto) ipdBillService.getsubServiceDetails(c,srvId);		
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveBillDetailsIpd", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveIpdBillDetails(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "patientId") Integer patientId,	
				@RequestParam(value = "billNo") Integer billNo,	
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "discount") Double discount,
				@RequestParam(value = "totalPaid") Double totalPaid,
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
				@RequestParam(value = "billSettled") String billSettled,
				@RequestParam(value = "remark") String remark,
				@RequestParam(value = "paidByCashFlag") String paidByCashFlag,
				@RequestParam(value = "paidByCashServices") String paidByCashServices,
				@RequestParam(value = "doctorIds") String doctorIds) {
		
		IpdBillReceiptMasterDTO obj=new IpdBillReceiptMasterDTO();
		obj.setTreatmentId(treatmentId);
		obj.setUnitId(unitId);
		obj.setPatientId(patientId);
		obj.setBillId(billNo);
		obj.setDoctorIds(doctorIds);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setTotalPaid(totalPaid);
		obj.setPayMode(payMode);
		obj.setbNumber(bNumber);
		obj.setBatchNumber(batchNo);
		obj.setbName(bName);
		obj.setSourceTypeId(sourceCatId);
		obj.setSponsorCatId(sponsorCatId);
		obj.setReceiptOf(receiptOf);
		obj.setBillSettledFlag(billSettled);
		obj.setAccountStatusIpd("N");
		if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}
		
		obj.setRemark(remark);
		obj.setPaidByCashFlag(paidByCashFlag);
		obj.setPaidByCashServices(paidByCashServices);
		
		return ipdBillService.saveBillDetailsIpd(servIdsChecked,refDocId,obj,multiPayDetails);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveRefundBillDetailsIpd", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveRefundBillDetailsIpd(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "patientId") Integer patientId,	
				@RequestParam(value = "billNo") Integer billNo,
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,				
				@RequestParam(value = "totalPaid") Double totalPaid,
				@RequestParam(value = "servIdsChecked") String servIdsChecked,
				@RequestParam(value = "refDocId") Integer refDocId,
				@RequestParam(value = "payMode") Integer payMode,
				@RequestParam(value = "bNumber") String bNumber,
				@RequestParam(value = "batchNo") String batchNo,
				@RequestParam(value = "bName") String bName,
				@RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "againstId") Integer againstId,
				@RequestParam(value = "receiptOf") String receiptOf,
				@RequestParam(value = "multiPayDetails") String multiPayDetails,
				@RequestParam(value = "listMultiRefundSave") String listMultiRefundSave,
				@RequestParam(value = "refPer") Double refPer,
				@RequestParam(value = "extraRefFlag") String extraRefFlag,
				@RequestParam(value = "remark") String remark,
				@RequestParam(value = "sourceTypeId") Integer sourceTypeId,
				@RequestParam(value = "sponsorCatId") Integer sponsorCatId) {
		
		
		IpdBillRefundMasterDTO obj= new IpdBillRefundMasterDTO(billNo,treatmentId,patientId,unitId,totalAmt,
				totalPaid,receiptOf,payMode,bNumber,batchNo,bName,againstId,userId,refPer);
			obj.setExtraRefFlag(extraRefFlag);
			obj.setRemark(remark);
			obj.setSourceTypeId(sourceTypeId);
			obj.setSponsorCatId(sponsorCatId);
		/*obj.setTreatmentId(treatmentId);
		obj.setUnitId(unitId);
		obj.setPatientId(patientId);
		obj.setBillId(billNo);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setTotalPaid(totalPaid);
		obj.setPayMode(payMode);
		obj.setbNumber(bNumber);
		obj.setbName(bName);	
		obj.setAgainstId(againstId);
		obj.setReceiptOf(receiptOf);*/
			
		/*if(callFrom.equals("credit")){
			
			obj.setCreditFlag("Y");
			obj.setAgainstId(againstId);
		}else{
			
			obj.setCreditFlag("N");
			obj.setAgainstId(0);
		}*/
				
		return ipdBillService.saveRefundBillDetailsIpd(servIdsChecked,refDocId,obj,multiPayDetails,listMultiRefundSave);			
	}
	

	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillReceiptDetailsIpd", method = RequestMethod.POST)
	@ResponseBody
	public IpdBillReceiptMasterDTO getBillReceiptDetailsIpd(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId) {
			
		IpdBillReceiptMasterDTO obj=new IpdBillReceiptMasterDTO();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		return ipdBillService.getBillReceiptDetailsIpd(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 14-July-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getBillRefundDetailsIpd", method = RequestMethod.POST)
	@ResponseBody
	public IpdBillRefundMasterDTO getBillRefundDetails(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "receiptOf") String receiptOf,
		   @RequestParam(value = "userId") int userId) {
			
		IpdBillRefundMasterDTO obj=new IpdBillRefundMasterDTO();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setReceiptOf(receiptOf);
		obj.setCreatedBy(userId);
		return ipdBillService.getBillRefundDetailsIpd(obj,callFrom);			
	}
	
	// @author : Sagar Kadam @date: 1-July-2017 @reason : for autosuggestion in ipd
	// onload
	@RequestMapping(value = "/autosuggesstionviewIpdbillPatients", method = RequestMethod.POST)
	@ResponseBody
	public IpdBillPatientsDTO autosuggesstionviewIpdbillPatients(@RequestParam("letter") String letter,
			@RequestParam("finalBill") String finalBill,@RequestParam("usertype") String usertype,HttpServletRequest request) {
		//System.err.println("hellohel"+deptId);
		IpdBillPatientsDTO objIpdbill=new IpdBillPatientsDTO();
		List<IpdBillPatientsDTO> lstIpdbillPatients = new ArrayList<IpdBillPatientsDTO>();
		lstIpdbillPatients = ipdBillService.autosuggesstionviewIpdbillPatients(letter,finalBill,usertype,request);		
		objIpdbill.setLstIpdbillPatients(lstIpdbillPatients);
		return objIpdbill;
	}	
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 8_Aug_2017 
	 * @Code Fetching Ipd Package patient data bye id.
	 ******************************************************************************/
		
	@RequestMapping(value = "/getPackagedataforIpd", method = RequestMethod.POST)
		public @ResponseBody
		EhatViewPatientSubServiceDetailsForIpdPackage getPackagedataforIpd(
				@RequestParam("pSId") Integer pSId,@RequestParam("pSubSId") Integer pSubSId, 
				@RequestParam("sponsorId") Integer sponsorId,@RequestParam("chargesSlaveId") Integer chargesSlaveId,
				@RequestParam("treatmentId") Integer treatmentId,@RequestParam("patientId") Integer patientId,@RequestParam("billDetailsId") Integer billDetailsId) 
	{
			List<EhatViewPatientSubServiceDetailsForIpdPackage> listIpdPackageDto = new ArrayList<EhatViewPatientSubServiceDetailsForIpdPackage>();
			listIpdPackageDto = (List<EhatViewPatientSubServiceDetailsForIpdPackage>) ipdBillService.getPackagedataforIpd(pSId,pSubSId,sponsorId,chargesSlaveId,treatmentId,patientId,billDetailsId);
			
			EhatViewPatientSubServiceDetailsForIpdPackage obj=new EhatViewPatientSubServiceDetailsForIpdPackage();
			obj.setListIpdPackageDto(listIpdPackageDto);
				
			return obj;
			
		}
	
	// @author : Kishor @date: 9-Aug-2017 @reason : To Save, Update and
			// delete Services of Ipd package
			@RequestMapping(value = "/savePackageIpd", method = RequestMethod.POST)
			@ResponseBody
			public int savePackageIpd(@RequestParam("serviceDetails") String serviceDetails,HttpServletRequest request,
				@RequestParam("queryType") String queryType
				,@RequestParam("callfrom") String callfrom) {
				
				
				int response=0;
				
				EhatOtherBillDetailForIpdDto otherbillDetailsDto = (EhatOtherBillDetailForIpdDto) ConfigUIJSONUtility
						.getObjectFromJSON(serviceDetails, EhatOtherBillDetailForIpdDto.class);
				
				response = ipdBillService.savePackageIpd(otherbillDetailsDto
						.getListEhatOtherBillDetailForIpd().get(0), request, queryType);
				return response;
					
			}
			/*************************************************************************************
			 * @author Kishor Lokhande @date 10_Aug_2017 
			 * these methods are used to Delete package package services for Ipd
			 * *************************************************************************************/
				
			@RequestMapping(value = "/deleteOnClickForPackageIpd", method = RequestMethod.POST)
			public @ResponseBody
			String deleteOnClickForPackageIpd(@RequestParam("billDetailsId") Integer billDetailsId,
					@RequestParam("otherBillDetailsId") Integer otherbildetailidipd,HttpServletRequest request) {
						boolean response = ipdBillService.deleteOnClickForPackageIpd(billDetailsId,
								otherbildetailidipd,request);
				String msg = "";
				if (response == true) {
					msg = "Records Deleted Sucessfully";
				} else {
					msg = "Oops Some Problem Ocured";
				}
				return msg;
			}
			
			
	/************
	* @author	: Vinod Udawant
	* @date		: 21-June-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getAdminChargesIpd", method = RequestMethod.POST)
	@ResponseBody
	public Integer getAdminChargesIpd(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "callFrom") String callFrom) {
			
		BillDetailsIpdDto obj=new BillDetailsIpdDto();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		return ipdBillService.getAdminChargesIpd(obj,callFrom);			
	}
	
	/**@author   :Bilal
	 * @date     :21-Aug-2017
	 * @code     :for list of ipd package billing whose combination is Y**/
		
	@RequestMapping(value = "/getlistOfPackageipd", method = RequestMethod.POST)
		public @ResponseBody
		BillNobleServicePackageipdDto getlistOfPackageipd(
				@RequestParam("treatmentId") Integer treatmentId) {
			List<BillNobleServicePackageipdDto> listBillDetails = new ArrayList<BillNobleServicePackageipdDto>();
			listBillDetails =  (List<BillNobleServicePackageipdDto>) ipdBillService.getlistOfPackageipd(treatmentId);
			
			BillNobleServicePackageipdDto obj=new BillNobleServicePackageipdDto
					();
			obj.setListBillNobleServiceDto(listBillDetails);
				
			return obj;
			
		}
	
	/**
	 * @author   :Bilal
	 * @date     :21-Aug-2017
	 * @code     :For converting services to package
	 ***/
	@RequestMapping(value = "/convertServiceToPackage", method = RequestMethod.POST)
	@ResponseBody
	public String convertServiceToPackage(
			BillDetailsIpdDto billdetails,
			HttpServletRequest request,
			
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("servIdsChecked") String servIdsChecked,
			@RequestParam("billDetailsId") Integer billDetailsId,
			@RequestParam("subServiceId") Integer subServiceId,
			@RequestParam("serviceId") Integer serviceId
		) {
		
		
		int response = ipdBillService.convertServiceToPackage(
				billdetails, request, treatmentId, servIdsChecked, billDetailsId, subServiceId, serviceId);
		
		return ((response == 1) ? "Converted To Package Successfully"		
						: "Network Error!!!");
	}
	
	/**
	 * @author   :Bilal
	 * @date     :21-Aug-2017
	 * @code     :For Remaining Amount Included To Package
	 ***/
	@RequestMapping(value = "/includeInPackAmount", method = RequestMethod.POST)
	@ResponseBody
	public String includeInPackAmount(
			BillDetailsIpdDto billdetails,
			HttpServletRequest request,
			
			@RequestParam("pSubSId") Integer pSubserviceId,
			@RequestParam("pSId") Integer pservId,
			@RequestParam("billDetailsId") Integer billDetailsId,
			@RequestParam("amount") double packamount,
			@RequestParam("totalAmtPackage") double totalAmtPackage,
			@RequestParam("totalAmtRem") double totalAmtRem
		) {
		
		
		int response = ipdBillService.includeInPackAmount(billdetails, request, pSubserviceId, pservId, 
				billDetailsId, packamount, totalAmtPackage,totalAmtRem);
		
		return ((response == 1) ? "Remaining Amount Included To Package Successfully"
				: (response == 2) ? "Bill Allready Paid Can not Include."
						: "Network Error!!!");
	}
	

	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 22_Aug_2017 
	 * @Code Fetching OT Services patient data bye id.
	 ******************************************************************************/
	@RequestMapping(value = "/getPopUpDataForOT", method = RequestMethod.POST)
	public @ResponseBody
	GetPopUpDataForOTDto getPopUpDataForOT(
			@RequestParam("pSId") Integer pSId,@RequestParam("pSubSId") Integer pSubSId, 
			@RequestParam("sponsorId") Integer sponsorId,@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("treatmentId") Integer treatmentId,@RequestParam("patientId") Integer patientId,@RequestParam("billDetailsId") Integer billDetailsId) 
{
		List<GetPopUpDataForOTDto> listGetPopUpDataForOTDto = new ArrayList<GetPopUpDataForOTDto>();
		listGetPopUpDataForOTDto = (List<GetPopUpDataForOTDto>) ipdBillService.getPopUpDataForOT(pSId,pSubSId,sponsorId,chargesSlaveId,treatmentId,patientId,billDetailsId);
		
		GetPopUpDataForOTDto obj=new GetPopUpDataForOTDto();
		obj.setListGetPopUpDataForOTDto(listGetPopUpDataForOTDto);
			
		return obj;
		
	}
	
	
	
	
	/**
	 * @author   :Bilal
	 * @date     :21-Aug-2017
	 * @code     :For converting services to Billing ipd
	 ***/
	@RequestMapping(value = "/convertToBillingipd", method = RequestMethod.POST)
	@ResponseBody 
	public String convertToBillingipd(
			BillDetailsIpdDto billdetails,
			HttpServletRequest request,
			
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("otherBillDetailsIdOpd") String otherBillDetailsIdOpd
		) {
		
		
		int response = ipdBillService.convertToBillingipd(
				billdetails, request, treatmentId, otherBillDetailsIdOpd);
		
		return ((response == 1) ? "Converted To Billing Successfully"		
						: "Network Error!!!");
	}
	
	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 26-July-2017
	* @codeFor	: Get total payable
	 ************/
	@RequestMapping(value = "/getTotalPayableIpd", method = RequestMethod.POST)
	@ResponseBody
	public BillDetailsIpdDto getTotalPayable(
		   @RequestParam(value = "treatmentId") int treatId,
		   @RequestParam(value = "billId") int billId,
		   @RequestParam(value = "serviceId") int serviceId,
		   @RequestParam(value = "callFrom") String callFrom,
		   @RequestParam(value = "depId") int depId,
		   @RequestParam(value = "unitId") int unitId,
		   @RequestParam(value = "userId") int userId) {
			
		BillDetailsIpdDto obj=new BillDetailsIpdDto();
		obj.setBillId(billId);
		obj.setTreatmentId(treatId);
		obj.setServiceId(serviceId);
		obj.setDepartmentId(depId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		return ipdBillService.getTotalPayableIpd(obj,callFrom);			
	}
	
	//Irfan Khan @date: 7-Aug-2017 @reason : save voucher details
		@RequestMapping(value = "/saveIpdCghs", method = RequestMethod.POST)
		@ResponseBody
		public String saveIpdCghs(
				@RequestParam("cghsDetails") String cghsDetails,
				@RequestParam("cghsDetailsRemain") String cghsDetailsRemain,
				@RequestParam("queryType") String queryType,
				@RequestParam("treatmentId") String treatmentId,
				@RequestParam("departmentId") String departmentId,
				HttpServletRequest request) {

			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			//int unitId = 1 Integer.parseInt(request.getParameter("uid"));
			int unitId = (Integer) session.getAttribute("uId");

			int perValue = ipdBillService.saveIpdCghs(cghsDetailsRemain,queryType,userId,unitId,cghsDetails,
					Integer.parseInt(treatmentId),Integer.parseInt(departmentId));

			return (perValue == 1) ? "Records Inserted Successfully"
					: (perValue == 2) ? "Record Updated Successfully"									
											: "Network Error!!";
		}
		
		@RequestMapping(value = "/getIpdServiceDetailsForCghs", method = RequestMethod.POST)
		@ResponseBody
		public CghsIpdDto getIpdServiceDetailsForCghs(@RequestParam("callform2") String treatmentId,@RequestParam("call2") String deptId) {
			List<CghsIpdDto> listSubServiceIpdDto = new ArrayList<CghsIpdDto>();
			listSubServiceIpdDto = ipdBillService
					.getIpdServiceDetailsForCghs(Integer.parseInt(treatmentId),Integer.parseInt(deptId));
			CghsIpdDto obj = new CghsIpdDto();
			obj.setListCghs(listSubServiceIpdDto);
			return obj;
	
		}
		
		/*************************************************************************************
		 * @author Kishor Lokhande @date 10_Aug_2017 
		 * these methods are used to Delete Cghs  services for Ipd
		 * *************************************************************************************/
			
		@RequestMapping(value = "/deleteOnClickForCghsIpd", method = RequestMethod.POST)
		public @ResponseBody
		String deleteOnClickForCghsIpd(@RequestParam("cghsid") Integer cghsid,
				@RequestParam("depid") Integer depid,HttpServletRequest request) {
					boolean response = ipdBillService.deleteOnClickForCghsIpd(cghsid,
							depid,request);
			String msg = "";
			if (response == true) {
				msg = "Records Deleted Sucessfully";
			} else {
				msg = "Oops Some Problem Ocured";
			}
			return msg;
		}
				
	/************
	* @author	: Vinod Udawant
	* @date		: 16-Oct-2017
	* @codeFor	: Save ipdbill discount
	 ************/
	@RequestMapping(value = "/saveEditIPDDiscount", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveEditIPDDiscount(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "billId") Integer billId,
				@RequestParam(value = "patientId") Integer patientId,
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "totalDisc") Double discount,
				@RequestParam(value = "totalDiscInPer") Double totalDiscInPer,
				@RequestParam(value = "discNarrtn") String discNarrtn,				
				@RequestParam(value = "callFrom") String callFrom,				
				@RequestParam(value = "payFlag") String payFlag,
				@RequestParam(value = "remark") String remark,
				@RequestParam(value = "authBy") Integer authBy,
				@RequestParam(value = "sourceCatId") Integer sourceCatId,
				@RequestParam(value = "sponsorCatId") Integer sponsorCatId,
				@RequestParam(value = "centerPatientId") String centerPatientId,
				@RequestParam(value = "discountFrom") String discFrom) {
			
		IpdBillDiscount obj=new IpdBillDiscount();
		obj.setTreatmentId(treatmentId);
		obj.setBillId(billId);
		obj.setPatientId(patientId);
		obj.setDepartmentId(2);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setTotalDiscInPer(totalDiscInPer);
		obj.setDiscNarrtn(discNarrtn);
		obj.setPayFlag(payFlag);	
		obj.setDiscRemark(remark);
		obj.setDiscAuth(authBy);
		obj.setSourceTypeId(sourceCatId);
		obj.setSponsorCatId(sponsorCatId);
		obj.setCenterPatientId(centerPatientId);
		obj.setDiscountFrom(discFrom);
		System.err.println("obj........"+obj);
		return ipdBillService.saveEditIPDDiscount(obj);			
	}	
	
	
	/************
	 * @author	: Vinod Udawant
	 * @date	: 23-oct-2017
	 * @codeFor : Fetch Ipd bill discount
	 ***********/
	@RequestMapping(value = "/fetchIpdbilDiscount", method = RequestMethod.POST)
	public @ResponseBody IpdBillDiscount fetchIpdbilDiscount(
			@RequestParam(value = "treatmentId") Integer treatmentId,
			@RequestParam(value = "callFrom") String callFrom ,HttpServletRequest req) {
		
		IpdBillDiscount objIpdbill=new IpdBillDiscount();
		List<IpdBillDiscount> lstIpdBill = new ArrayList<IpdBillDiscount>();
		if(callFrom.equals("ipdBill")){
			
			lstIpdBill = ipdBillService.fetchIpdbillTreatDiscount(treatmentId);		
		}else{
			
			lstIpdBill = ipdBillService.fetchIpdbilDiscount(req);		
		}
		
		objIpdbill.setListIpdBillDiscount(lstIpdBill);
		return objIpdbill;
	}
	
	/************
	 * @author	: Vinod Udawant
	 * @date	: 23-oct-2017
	 * @codeFor : Fetch Ipd bill discount
	 ***********/
	@RequestMapping(value = "/saveApprovedDiscount", method = RequestMethod.POST)
	public @ResponseBody Integer saveApprovedDiscount(
			@RequestParam(value = "discId") int discId,	
			@RequestParam(value = "userId") int userId,				
			@RequestParam(value = "approvedAmt") double approveAmt,
			@RequestParam(value = "remark") String remark,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "approvedDiscRemark") String approvedDiscRemark) {
		
		IpdBillDiscount objIpdbill=new IpdBillDiscount();	
		objIpdbill.setBillDiscountId(discId);
		objIpdbill.setApprovedBy(userId);
		objIpdbill.setApprovedAmt(approveAmt);
		//objIpdbill.setDiscRemark(remark);
		objIpdbill.setApprovedRemark(approvedDiscRemark);
		
		int result = ipdBillService.saveApprovedDiscount(objIpdbill);		
		return result;
	}
	
	/************
	 * @author	: Vinod Udawant
	 * @date	: 26-oct-2017
	 * @codeFor : Generate Invoice
	 ***********/
	@RequestMapping(value = "/genarateInvoice", method = RequestMethod.POST)
	public @ResponseBody Integer genarateInvoice(
			@RequestParam(value = "treatId") int treatId,
			@RequestParam(value = "billTypeId") int billTypeId,
			@RequestParam(value = "userId") int userId) {
		
		int result = ipdBillService.genarateInvoice(treatId,billTypeId,userId);		
		return result;
	}
	
	/************
	 * @author	: Kishor Lokhande
	 * @date	: 09-Nov-2017
	 * @codeFor : List for Service Comparison
	 ***********/
	@RequestMapping(value = "/getIpdPatientServiceBillForComparison", method = RequestMethod.POST)
	@ResponseBody
	public EhatViewPatientSubServiceDetailsIpdDto getIpdPatientServiceBillForComparison(@RequestParam("treatmentId") String treatmentId) {
		List<EhatViewPatientSubServiceDetailsIpdDto> listSubServiceIpdDto = new ArrayList<EhatViewPatientSubServiceDetailsIpdDto>();
		listSubServiceIpdDto = ipdBillService
				.getIpdPatientServiceBillForComparison(Integer.parseInt(treatmentId));
		EhatViewPatientSubServiceDetailsIpdDto obj = new EhatViewPatientSubServiceDetailsIpdDto();
		obj.setListSubServiceIpdDto(listSubServiceIpdDto);
		return obj;

	}
	
	/************
	 *@author	:kishor Lokhande
	 *@date		:  11-Nov-2017
	 *@code		:Get Ipd Comparison Patients
	 ***********/

	@RequestMapping(value = "/getIpdComparisonPatients", method = RequestMethod.POST)
	@ResponseBody
	public ConfigurationViewServiceDto2 getIpdComparisonPatients(@RequestParam("servId") String servId,
			HttpServletRequest request ,
			@RequestParam("subServId") String subServId, 
			@RequestParam("chargesSponId") String chargesSponId, 
			@RequestParam("chargesSlaveId") String chargesSlaveId,			
			@RequestParam("tretId") String treatmentId,			
			@RequestParam("HallId") String HallId,			
			@RequestParam("HallSlaveId") String HallSlaveId,			
			@RequestParam("isComServId") String isComServId,			
			@RequestParam("isComServlastId") String isComServlastId){
		
		List<ConfigurationViewServiceDto2> lstServiceConfigurations = new ArrayList<ConfigurationViewServiceDto2>();
		lstServiceConfigurations = ipdBillService
				.getIpdComparisonPatients(Integer.parseInt(treatmentId),servId,subServId,
						chargesSponId,chargesSlaveId,HallId,HallSlaveId,isComServId,isComServlastId);
		ConfigurationViewServiceDto2 obj = new ConfigurationViewServiceDto2();
		obj.setLstServiceConfigurations(lstServiceConfigurations);
		return obj;

	}
	
	//Kishor Lokhande @date: 15-Nov-2017 @reason : save saveQuotations details
			@RequestMapping(value = "/saveQuotations", method = RequestMethod.POST)
			@ResponseBody
			public String saveQuotations(
					@RequestParam("billquotations") String billquotations,				
					@RequestParam("queryType") String queryType,
					@RequestParam("treatmentId") String treatmentId,
					@RequestParam("departmentId") String departmentId,
					HttpServletRequest request) {

				// current login user id
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				
				int unitId = (Integer) session.getAttribute("uId");

				int perValue = ipdBillService.saveQuotations(billquotations,queryType,userId,unitId,
						Integer.parseInt(treatmentId),Integer.parseInt(departmentId));

				return (perValue == 1) ? "1"
						: (perValue == 2) ? "2"									
												: "Network Error!!";
			}
			
			@RequestMapping(value = "/getBillQuotationsDetails", method = RequestMethod.POST)
			@ResponseBody
			public BillQuotationDto getBillQuotationsDetails(@RequestParam("callform2") String treatmentId,@RequestParam("call2") String deptId) {
				List<BillQuotationDto> listBillquotations = new ArrayList<BillQuotationDto>();
				listBillquotations = ipdBillService
						.getBillQuotationsDetails(Integer.parseInt(treatmentId),Integer.parseInt(deptId));
				BillQuotationDto obj = new BillQuotationDto();
				obj.setListBillquotations(listBillquotations);
				return obj;
		
			}
			
			@RequestMapping(value = "/getBillQuotationsDetailsRunT", method = RequestMethod.POST)
			@ResponseBody
			public BillQuotationDto getBillQuotationsDetailsRunT(@RequestParam("callform2") String treatmentId,@RequestParam("call2") String count) {
				List<BillQuotationDto> listBillquotations = new ArrayList<BillQuotationDto>();
				listBillquotations = ipdBillService
						.getBillQuotationsDetailsRunT(Integer.parseInt(treatmentId),Integer.parseInt(count));
				BillQuotationDto obj = new BillQuotationDto();
				obj.setListBillquotations(listBillquotations);
				return obj;
		
			}
			
			/************
			* @author	: Vinod Udawant
			* @date		: 29-Nov-2017
			* @codeFor	: Save ehat bill details
			 ************/
			@RequestMapping(value = "/fetchPrevPendingIpd", method = RequestMethod.POST)
			@ResponseBody
			public IpdBillReceiptMasterDTO fetchPrevPendingIpd(
				  
				   @RequestParam(value = "unitId") int unitId,
				   @RequestParam(value = "treatmentId") int treatmentId,
				   @RequestParam(value = "sponsorId") int sponsorId,
				   @RequestParam(value = "createdBy") int userId,
				   @RequestParam(value = "callFrom") String callFrom) {
				
				IpdBillReceiptMasterDTO obj=new IpdBillReceiptMasterDTO();
				obj.setUnitId(unitId);
				obj.setCreatedBy(userId);
				obj.setTreatmentId(treatmentId);
				obj.setSponsorCatId(sponsorId);		
				return ipdBillService.fetchPrevPendingIpd(obj,callFrom);			
			}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 06-Jan-2018
	* @codeFor	: Fetch Surgon List
	 ************/
	@RequestMapping(value = "/fetchSurgonList", method = RequestMethod.POST)
	@ResponseBody
	public IpdBillReceiptMasterDTO fetchPrevPending(
		  
		   @RequestParam(value = "unitId") int unitId,
		   @RequestParam(value = "treatmentId") int treatmentId,
		   @RequestParam(value = "sponsorId") int sponsorId,
		   @RequestParam(value = "createdBy") int userId,
		   @RequestParam(value = "callFrom") String callFrom) {
		
		IpdBillReceiptMasterDTO obj=new IpdBillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTreatmentId(treatmentId);
		obj.setSponsorCatId(sponsorId);		
		return ipdBillService.fetchSurgonList(obj,callFrom);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 16-Oct-2017
	* @codeFor	: Save ipdbill discount
	 ************/
	@RequestMapping(value = "/saveDoctorDiscount", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveDoctorDiscount(
				@RequestParam(value = "treatmentId") Integer treatmentId,	
				@RequestParam(value = "billId") Integer billId,
				@RequestParam(value = "patientId") Integer patientId,
				@RequestParam(value = "unitId") Integer unitId,	
				@RequestParam(value = "createdBy") Integer userId,	
				@RequestParam(value = "totalAmt") Double totalAmt,
				@RequestParam(value = "totalDisc") Double discount,
				@RequestParam(value = "totalDiscInPer") Double totalDiscInPer,
				@RequestParam(value = "discNarrtn") String discNarrtn,				
				@RequestParam(value = "callFrom") String callFrom,				
				@RequestParam(value = "payFlag") String payFlag,
				@RequestParam(value = "remark") String remark,
				@RequestParam(value = "authBy") Integer authBy,
				@RequestParam(value = "sourceCatId") Integer sourceCatId,
				@RequestParam(value = "sponsorCatId") Integer sponsorCatId) {
		
		IpdBillDiscount obj=new IpdBillDiscount();
		obj.setTreatmentId(treatmentId);
		obj.setBillId(billId);
		obj.setPatientId(patientId);
		obj.setDepartmentId(2);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setTotalAmt(totalAmt);
		obj.setTotalDisc(discount);
		obj.setTotalDiscInPer(totalDiscInPer);
		obj.setDiscNarrtn(discNarrtn);
		obj.setPayFlag(payFlag);	
		obj.setDiscRemark(remark);
		obj.setDiscAuth(authBy);
		obj.setSourceTypeId(sourceCatId);
		obj.setSponsorCatId(sponsorCatId);
		return ipdBillService.saveDoctorDiscount(obj);			
	}	
	
	
	//Kishor Lokhande @date: 31-jan-2018 @reason : save saveQuotationsNew details
	@RequestMapping(value = "/saveQuotationsNew", method = RequestMethod.POST)
	@ResponseBody
	public String saveQuotationsNew(
			@RequestParam("serviceDetails") String serviceDetails,				
			@RequestParam("queryType") String queryType,			
			@RequestParam("callfrom") String callfrom,
			@RequestParam("adminChargesPer") Double adminChargesPer,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		int unitId = (Integer) session.getAttribute("uId");

		int perValue = ipdBillService.saveQuotationsNew(serviceDetails,queryType,userId,unitId,
				callfrom,adminChargesPer);

		return (perValue == 1) ? "1"
				: (perValue == 2) ? "2"									
										: "Network Error!!";
	}
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 31_Jan_2018 
	 * @Code Fetching patient data bye Count for quotation.
	 ******************************************************************************/
		
	@RequestMapping(value = "/getServiceDetails", method = RequestMethod.POST)
		public @ResponseBody
		NewBillQuotation getServiceDetails(
				@RequestParam("count") Integer count,@RequestParam("callfrom") String callfrom,
				@RequestParam("patientId") Integer patientId,HttpServletRequest request) {
			List<NewBillQuotation> listBillDetailsQuotation = new ArrayList<NewBillQuotation>();
			listBillDetailsQuotation =  (List<NewBillQuotation>) ipdBillService.getServiceDetails(count,callfrom,patientId,request);
			
			NewBillQuotation obj=new NewBillQuotation();
			obj.setListBillDetailsQuotation(listBillDetailsQuotation);				
			return obj;			
		}
	
	@RequestMapping(value = "/getSubServiceDetailss", method = RequestMethod.POST)
	public @ResponseBody
	NewBillQuotation getSubServiceDetails(
			@RequestParam("count") Integer count,@RequestParam("serviceId") Integer serviceId,
			@RequestParam("patientId") Integer patientId,HttpServletRequest request) {
		List<NewBillQuotation> listBillDetailsQuotation = new ArrayList<NewBillQuotation>();
		listBillDetailsQuotation =  (List<NewBillQuotation>) ipdBillService.getSubServiceDetails(count,serviceId,patientId,request);
		
		NewBillQuotation obj=new NewBillQuotation();
		obj.setListBillDetailsQuotation(listBillDetailsQuotation);				
		return obj;			
	}
	
	//Kishor Lokhande @date: 31-jan-2018 @reason : save and delete QuotationsNew details
		@RequestMapping(value = "/saveAndDeleteQuotaion", method = RequestMethod.POST)
		@ResponseBody
		public String saveAndDeleteQuotaion(
				@RequestParam("quotationName") String quotationName,				
				@RequestParam("quotationId") String quotationId,	
				@RequestParam("callfrom") String callfrom,
				@RequestParam("patientId") Integer patientId,
				HttpServletRequest request) {

			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			int unitId = (Integer) session.getAttribute("uId");

			int perValue = ipdBillService.saveAndDeleteQuotaion(quotationName,quotationId,
					userId,unitId,callfrom,patientId);

			return (perValue == 1) ? "1"
					: (perValue == 2) ? "2"									
											: "Network Error!!";
		}
		
		//Kishor Lokhande @date: 30-March-2018 @reason : distribute Ppn Amount 
		@RequestMapping(value = "/distributePpnAmount", method = RequestMethod.POST)
		@ResponseBody
		public String distributePpnAmount(
				@RequestParam("patientId") Integer patientId,				
				@RequestParam("treatmentId") Integer treatmentId,	
				@RequestParam("departmentId") Integer departmentId,
				@RequestParam("billId") Integer billId,
				@RequestParam("distRate") Double distRate,
				@RequestParam("totalAmt") Double totalAmt,
				@RequestParam("chargesSlaveId") Integer chargesSlaveId,
				HttpServletRequest request) {

			DistributionPojo obj = new DistributionPojo();
			obj.setPatientId(patientId);
			obj.setTreatmentId(treatmentId);
			obj.setDepartmentId(departmentId);
			obj.setBillId(billId);
			obj.setDistRate(distRate);
			obj.setTotalAmt(totalAmt);
			obj.setChargesSlaveId(chargesSlaveId);
			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			int unitId = (Integer) session.getAttribute("uId");

			int perValue = ipdBillService.distributePpnAmount(obj,userId,unitId);

			return (perValue == 1) ? "1"
					: (perValue == 2) ? "2"									
											: "Network Error!!";
		}
		
		
		/************
		* @author	: Mohd Tarique Aalam
		* @date		: 8 jan 2018
		* @codeFor	: Get ipd bill patients using Filter ward type
		 ************/
		@RequestMapping(value = "/viewIpdbillPatientsByFilter", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsDTO2 getIpdbillPatientsFilter(@RequestParam("callform") String general,
				@RequestParam("wardType") Integer wardType,@RequestParam("hallTypeSelectId") Integer hallTypeSelectId,
				@RequestParam("ward") String ward,HttpServletRequest request) {
			
			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			String userType = (String) session.getAttribute("userType");//get user Type which is login
			
			IpdBillPatientsDTO2 objIpdbill=new IpdBillPatientsDTO2();
			objIpdbill = ipdBillService.getIpdbillPatientsFilter(general,wardType,hallTypeSelectId,ward,unitId,userId1,userType);		
			return objIpdbill;
		}	
		
		
	/**
	 * Name: tarique Aalam
	 * @date : 12-1-2018
	 * @code check emergency time
	 */
		@RequestMapping(value = "/getEmerChrTime", method = RequestMethod.GET)
		@ResponseBody
		public boolean chkTimeEmrgyOrNot(){
		
	       return ipdBillService.chkTimeEmrgyOrNot();
		}
		
		/************
		* @author	: tarique Aalam
		* @date		: 02-2-2018
		* @codeFor	: Get ipd bill patients blockwise
		 ************/
		@RequestMapping(value = "/viewIpdbillPatientsBeds", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsBedsDTO getIpdbillPatientsBeds(@RequestParam("callform") String general,HttpServletRequest request) {
			
			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			String userType = (String) session.getAttribute("userType");//get user Type which is login
			
			IpdBillPatientsBedsDTO objIpdbill=new IpdBillPatientsBedsDTO();
			//List<IpdBillPatientsDTO> lstIpdbillPatients = new ArrayList<IpdBillPatientsDTO>();
			
			
			objIpdbill = ipdBillService.getIpdbillPatientsBeds(general,unitId,userId1,userType);		
			//objIpdbill.setLstIpdbillPatients(lstIpdbillPatients);
			return objIpdbill;
		}	
		
		/************
		* @author	: Tarique Aalam
		* @date		: 02-2-2018
		* @codeFor	: Get ipd bill patients blockwise by Filter
		 ************/
		@RequestMapping(value = "/viewIpdbillPatientsBedsFilter", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsBedsDTO getIpdbillPatientsBedsByFilter(@RequestParam("hallTypeId") int hallTypeId,
				@RequestParam("hallId") int hallId,@RequestParam("filter") String filter) {
			IpdBillPatientsBedsDTO objIpdbill=new IpdBillPatientsBedsDTO();
			objIpdbill = ipdBillService.getIpdbillPatientsBedsByFilter(hallTypeId,hallId,filter);		
			return objIpdbill;
		}	
		
		/************
		* @author	: Tarique Aalam
		* @date		: 7-2-2018
		* @codeFor	: Get ipd bill patients blockwise by Filter
		 ************/
		@RequestMapping(value = "/autosuggesstionviewIpdbillPatientsBlockWise", method = RequestMethod.POST)
		@ResponseBody
		public IpdBillPatientsBedsDTO autosuggesstionviewIpdbillPatientsBlockWise(@RequestParam("letter") String letter,
				@RequestParam("finalBill") String finalBill,@RequestParam("usertype") String usertype,HttpServletRequest request) {
			//System.err.println("hellohel"+deptId);
			HttpSession session = request.getSession();
			IpdBillPatientsBedsDTO objIpdbillBed=new IpdBillPatientsBedsDTO();
			//List<IpdBillPatientsDTO> lstIpdbillPatients = new ArrayList<IpdBillPatientsDTO>();
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			objIpdbillBed = ipdBillService.autosuggesstionviewIpdbillPatientsBlockWise(letter,finalBill,usertype,unitId);		
			//objIpdbill.setLstIpdbillPatients(lstIpdbillPatients);
			return objIpdbillBed;
		}
		
		/************
		* @author	: Mohd Tarique Aalam
		* @date		: 16-02-2018
		* @codeFor	: Get ipd bill patients in IPD(IPD patients)
		 ************/
		@RequestMapping(value = "/viewIpdbillPatients2", method = RequestMethod.POST)
		public @ResponseBody IpdBillPatientsDTO2 getIpdbillPatients2(@RequestParam("callform") String general,HttpServletRequest request) {
			
			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			Integer userId1 = (Integer) session.getAttribute("userId1");//Get user id from session
			String userType = (String) session.getAttribute("userType");//get user Type which is login
			
			IpdBillPatientsDTO2 objIpdbill=new IpdBillPatientsDTO2();
			//List<IpdBillPatientsDTO> lstIpdbillPatients = new ArrayList<IpdBillPatientsDTO>();
			
			
			objIpdbill = ipdBillService.getIpdbillPatients2(general,unitId,userId1,userType);		
			//objIpdbill.setLstIpdbillPatients(lstIpdbillPatients);
			return objIpdbill;
		}	
		
		
		
		// @author : Sagar Kadam @date: 1-July-2017 @reason : for autosuggestion in ipd
		// onload
		@RequestMapping(value = "/autosuggesstionviewIpdbillPatients2", method = RequestMethod.POST)
		@ResponseBody
		public IpdBillPatientsDTO2 autosuggesstionviewIpdbillPatients2(@RequestParam("letter") String letter,
				@RequestParam("finalBill") String finalBill,@RequestParam("usertype") String usertype,HttpServletRequest request) {
			//System.err.println("hellohel"+deptId);
			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");//Get unit id from session
			IpdBillPatientsDTO2 objIpdbill=new IpdBillPatientsDTO2();
			//List<IpdBillPatientsDTO> lstIpdbillPatients = new ArrayList<IpdBillPatientsDTO>();
			objIpdbill = ipdBillService.autosuggesstionviewIpdbillPatients2(letter,finalBill,usertype,unitId);		
			//objIpdbill.setLstIpdbillPatients(lstIpdbillPatients);
			return objIpdbill;
		}
		
		
		/**
		 * 
		 * @author 	Sanjay Kr Shah
		 * @purpose cancell Admission 
		 * @return
		 */
		@RequestMapping(value = "/cancelAdmission", method = RequestMethod.POST)
		@ResponseBody
		public String cancelAdmission(@RequestParam("patientId") Integer patientId,
				@RequestParam("treatmentId") Integer treatmentId,@RequestParam("narration") String narration,HttpServletRequest request) {
			
			TreatmentDto treatmentDto = new TreatmentDto();
			treatmentDto.setPatientId(patientId);
			treatmentDto.setTreatmentId(treatmentId);
			treatmentDto.setCancelNarration(narration);
			int response = ipdBillService.cancelAdmission(treatmentDto,request);
			String msg = "";
			if (response == 1) {
				msg = "Admission cancelled Successfully";
			} else {
				msg = "Oops Some Problem Ocured";
			}
			return msg;	
		}
		
	/************
	 *@author	: Laxman Nikam
	 *@date		: 14-March-2018
	 *@code		:For when assign test that time test send to lab immediatly.
	 ***********/
	@RequestMapping(value = "/packageIpdSendToLab", method = RequestMethod.POST)
	@ResponseBody
	public int packageIpdSendToLab(@RequestParam("serviceDetails") String serviceDetails, 
			@RequestParam("queryType") String queryType, HttpServletRequest request ) {
		
		EhatOtherBillDetailForIpdDto otherbillDetailsDto = (EhatOtherBillDetailForIpdDto) ConfigUIJSONUtility
				.getObjectFromJSON(serviceDetails, EhatOtherBillDetailForIpdDto.class);

		return ipdBillService.packageIpdSendToLab(otherbillDetailsDto.getListEhatOtherBillDetailForIpd().get(0), request);
	}
	
	
	/************
	 * @author	: Vinod Udawant
	 * @date	: 26-oct-2017
	 * @codeFor : Generate Invoice
	 ***********/
	@RequestMapping(value = "/getColorCode", method = RequestMethod.POST)
	public @ResponseBody String getColorCode(
			@RequestParam(value = "treatmentId") int treatmentId) {
		
		String result = ipdBillService.getColorCode(treatmentId);		
		return result;
	}
	
	
	/**
	 * Name: tarique Aalam
	 * @date : 19-07-2018
	 * @code check emergency day(sunday)
	 */
		@RequestMapping(value = "/getEmerChrTimeSunday", method = RequestMethod.GET)
		@ResponseBody
		public boolean getEmerChrTimeSunday(){
		
	       return ipdBillService.getEmerChrTimeSunday();
		}
		
		
		
		@RequestMapping(value = "/getPharmacyDetailsONBillingPrint", method = RequestMethod.POST)
		@ResponseBody
		public PharmacyDetailsOnBillingPrintDto getPharmacyDetailsONBillingPrint(@RequestParam("treatmentId") String treatmentId,
				@RequestParam("patientId") String patientId) {
			List<PharmacyDetailsOnBillingPrintDto> listPharmacyDetailsOnBillingPrint = new ArrayList<PharmacyDetailsOnBillingPrintDto>();
			listPharmacyDetailsOnBillingPrint = ipdBillService
					.getPharmacyDetailsONBillingPrint(Integer.parseInt(treatmentId),Integer.parseInt(patientId));
			PharmacyDetailsOnBillingPrintDto obj = new PharmacyDetailsOnBillingPrintDto();
			obj.setListPharmacyDetailsOnBillingPrint(listPharmacyDetailsOnBillingPrint);
			return obj;
	
		}
		
		@RequestMapping(value = "/getSponcerDisc", method = RequestMethod.POST)
		@ResponseBody
		public Double getSponcerDisc(@RequestParam("chargesSlaveId") int chargesSlaveId) {
			return ipdBillService.getSponcerDisc(chargesSlaveId);
		}
		
		
		//
		//Fetching Ipd and Opd Sponsor Sanction amount
				@RequestMapping(value = "/getSponsorSanctionAmount", method = RequestMethod.POST)
				public @ResponseBody
				MultipleSponsorDto getSponsorSanctionAmount(
						@RequestParam("SponsorId") Integer sponsorId,
						@RequestParam("chargesSlaveId") Integer chargesSlaveId,
						@RequestParam("treatmentId") Integer treatmentId,
						@RequestParam("patientId") Integer patientId,
						@RequestParam("callfrom") String callfrom,
						HttpServletRequest request) {
					List<MultipleSponsorDto> listMultipleSponsor = new ArrayList<MultipleSponsorDto>();
					listMultipleSponsor = ipdBillService
							.getSponsorSanctionAmount(sponsorId,chargesSlaveId,treatmentId,patientId,callfrom,request);
					MultipleSponsorDto obj = new MultipleSponsorDto();
					obj.setListMultipleSponsor(listMultipleSponsor);
					return obj;
			
				}
				
	/************
	 * @author :kishor Lokhande
	 * @date : 28-sept-2018
	 * @code :This function use for set Sponsor Rate To Self Patient
	 ***********/
	@RequestMapping(value = "/setSponsorRateToSelfPatient", method = RequestMethod.POST)
	public @ResponseBody
	String setSponsorRateToSelfPatient(
			@RequestParam("labservicelist") String labservicelist,
			@RequestParam("servicelist") String servicelist,
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("patientId") Integer patientId,
			@RequestParam("sponsorId") Integer sponsorId,
			@RequestParam("chargesSlaveId") Integer sponsorSlaveId,
			@RequestParam("callFrom") String callFrom,
			HttpServletRequest request) {

		String msg = "";
		if (ipdBillService.setSponsorRateToSelfPatient(labservicelist,servicelist,treatmentId,patientId,sponsorId,sponsorSlaveId,callFrom,request) == 1) {
			msg = "Service Converted Sucessfully!";
		} else {

			msg = "Network Issues!";

		}
		return msg;
	}
	
	/************
	 * @author :kishor Lokhande
	 * @date : 28-sept-2018
	 * @code :This function use for set Sponsor Rate To Self Patient
	 ***********/
	@RequestMapping(value = "/setServiceForCash", method = RequestMethod.POST)
	public @ResponseBody
	BillDetailsIpdDto setServiceForCash(
			
			@RequestParam("treatmentId") Integer treatmentId,
			@RequestParam("unitId") Integer unitId,
			@RequestParam("userId") Integer userId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("depId") Integer depId,			
			@RequestParam("callFrom") String callFrom,
			@RequestParam("servIdsChecked") String servIdsChecked,
			HttpServletRequest request) {

		BillDetailsIpdDto obj=new BillDetailsIpdDto();
		obj.setTreatmentId(treatmentId);
		obj.setUnitId(unitId);
		obj.setCreatedBy(userId);
		obj.setChargesSlaveId(chargesSlaveId);
		obj.setDepartmentId(depId);		
		return ipdBillService.setServiceForCash(obj,callFrom,servIdsChecked);
		 
	}
	
	@RequestMapping(value = "/autoSuggestationIpdQueue", method = RequestMethod.POST)
	public @ResponseBody IpdQueueDTO autoSuggestationIpdQueue(@RequestParam("searchText") String searchText) {
		
		IpdQueueDTO objIpdQueue=new IpdQueueDTO();
		List<IpdQueueDTO> lstIpdQueue = new ArrayList<IpdQueueDTO>();
		lstIpdQueue = ipdBillService.autoSuggestationIpdQueue(searchText);		
		objIpdQueue.setLstIpdQueue(lstIpdQueue);
		return objIpdQueue;
	}
	
	@RequestMapping(value = "/getIpdQueuePatientByTreatmentId", method = RequestMethod.POST)
	public @ResponseBody IpdQueueDTO getIpdQueuePatientByTreatmentId(@RequestParam("treatId") Integer treatId) {
		
		IpdQueueDTO objIpdQueue=new IpdQueueDTO();
		
		objIpdQueue = ipdBillService.getIpdQueuePatientByTreatmentId(treatId);		
		
		return objIpdQueue;
	}
	
	
	@RequestMapping(value = "/updateIpdBillDetails", method = RequestMethod.POST)
	public @ResponseBody Integer updateIpdBillDetails(@RequestParam("treatId") Integer treatId) {
		
		return ipdBillService.updateIpdBillDetails(treatId);		
	}
	
	@RequestMapping(value = "/deleteRefundReceipt", method = RequestMethod.POST)
	public @ResponseBody Integer deleteRefundReceipt(@RequestParam("treatId") Integer treatId, 
			@RequestParam("recId") Integer recId,@RequestParam("remarkDeletedRefund") String remarkDeletedRefund,  HttpServletRequest request) {
		
		return ipdBillService.deleteRefundReceipt(treatId,recId,remarkDeletedRefund, request);		
	}
	
	//added by vishant
	@RequestMapping(value = "/setIpdBillDetailsDistribute", method = RequestMethod.POST)
	public @ResponseBody Integer setIpdBillDetailsDistribute(@RequestParam("treatmentId") Integer treatId, HttpServletRequest request) {
		
		return ipdBillService.setIpdBillDetailsDistribute(treatId,request);		
	}	
	
	@RequestMapping(value = "/getEmerChrTimeDR", method = RequestMethod.GET)
	@ResponseBody
	public EmrChargesDto getEmerChrTimeDR(EmrChargesDto emrChargesDto){
	
       return ipdBillService.getEmerChrTimeDR(emrChargesDto);
	}
		
}


