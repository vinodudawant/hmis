package com.hms.ehat.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillHistoryDTO;
import com.hms.ehat.dto.BillMasterAllTreat;
import com.hms.ehat.dto.BillRegReportMeeshaDTO;
import com.hms.ehat.dto.EhatBillReports;
import com.hms.ehat.dto.FinanceBankMaster;
import com.hms.ehat.dto.GroupwiseProfeesDto;
import com.hms.ehat.dto.IpdBreakupReportDTO;
import com.hms.ehat.dto.NotificationDTO;
import com.hms.ehat.dto.OpdDiagnoRecReportMeeshaDTO;
import com.hms.ehat.dto.OpdDiagnoReportBilllWiseDTO;
import com.hms.ehat.dto.OpdDiagnoReportMeeshaDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.FinanceServiceMeesha;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;

@Controller
@RequestMapping(value = "/financeMeesha")
public class FinanceControllerMeesha {

	@Autowired
	FinanceServiceMeesha financeService;
		
	/************
	* @author	: Vinod Udawant
	* @date		: 21-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getReceiptFinance", method = RequestMethod.POST)
	@ResponseBody
	public BillReceiptMasterDTO getReceiptFinance(
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "payMode") Integer payMode,
			@RequestParam(value = "billType") Integer billType) {
			
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setDepartmentId(deptId);
		obj.setCreatedBy(userId);
		obj.setPayMode(payMode);
		obj.setAgainstId(billType);
		return financeService.getReceiptFinance(obj,callFrom,fromDate,toDate);			
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getRefundFinance", method = RequestMethod.POST)
	@ResponseBody
	public BillRefundMasterDTO getRefundFinance(
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "payMode") Integer payMode,
			@RequestParam(value = "billType") Integer billType) {
			
		BillRefundMasterDTO obj=new BillRefundMasterDTO();
		obj.setUnitId(unitId);
		obj.setDepartmentId(deptId);
		obj.setCreatedBy(userId);
		obj.setPayMode(payMode);
		obj.setAgainstId(billType);
		return financeService.getRefundFinance(obj,callFrom,fromDate,toDate);			
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/saveFinaceBankDetails", method = RequestMethod.POST)
	@ResponseBody
	public Integer saveFinaceBankDetails(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,		
			@RequestParam(value = "bankID") Integer bankID,
			@RequestParam(value = "accNo") Long accNo,
			@RequestParam(value = "accType") Integer accType) {			
		
		FinanceBankMaster obj=new FinanceBankMaster(bankID,accNo,accType,unitId, "N",userId);			
		
		return financeService.saveFinaceBankDetails(callFrom,obj);			
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getFinBankMasterList", method = RequestMethod.POST)
	@ResponseBody
	public FinanceBankMaster fetchFinanceBankDetails() {
		
		return financeService.fetchFinanceBankDetails();			
	}	
	
	@RequestMapping(value = "/fetchPatientsRecords", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto fetchPatientsRecordByTreatmentId(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "deptId") Integer deptId) {
		
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = financeService.fetchPatientsRecords(unitId,userId,fromDate,toDate,deptId);		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/fetchIpdPatientsRecords", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto fetchIpdPatientsRecords(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = financeService.fetchIpdPatientsRecords(unitId,userId,fromDate,toDate);		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);			
		return obj;		
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 29-Jan-2018
	* @codeFor	: Fetch software notifications
	 ************/
	@RequestMapping(value = "/fetchNotifications", method = RequestMethod.POST)
	@ResponseBody
	public NotificationDTO fetchNotifications(@RequestParam(value = "callform") String callFrom) {
		
		return financeService.fetchNotifications();			
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 29-Jan-2018
	* @codeFor	: Fetch software notifications
	 ************/
	@RequestMapping(value = "/fetchFinalIpdBills", method = RequestMethod.POST)
	@ResponseBody
	public NotificationDTO fetchFinalIpdBills(@RequestParam(value = "callform") String callFrom) {
		
		return financeService.fetchFinalIpdBills();					
	}	
	
	@RequestMapping(value = "/fetchOpdDiagnoPatients", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportMeeshaDTO fetchOpdDiagnoPatients(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		ltopdDiagnoDto = financeService.fetchOpdDiagnoPatients(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportMeeshaDTO obj=new OpdDiagnoReportMeeshaDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	@RequestMapping(value = "/fetchOpdDiagnoPatientsBillwise", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportBilllWiseDTO fetchOpdDiagnoPatientsBillwise(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportBilllWiseDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportBilllWiseDTO>();
		ltopdDiagnoDto = financeService.fetchOpdDiagnoPatientsbillwise(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportBilllWiseDTO obj=new OpdDiagnoReportBilllWiseDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/fetchOpdDiagnoRec", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoRecReportMeeshaDTO fetchOpdDiagnoRec(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "payMode") Integer payMode) {
		
		List<OpdDiagnoRecReportMeeshaDTO> ltopdDiagnoRec = new ArrayList<OpdDiagnoRecReportMeeshaDTO>();
		ltopdDiagnoRec = financeService.fetchOpdDiagnoRec(unitId,userId,fromDate,toDate,payMode,callFrom);		
		OpdDiagnoRecReportMeeshaDTO obj=new OpdDiagnoRecReportMeeshaDTO();
		obj.setLstOpdDiagnoRec(ltopdDiagnoRec);	
		return obj;		
	}	
	
	@RequestMapping(value = "/getBillRegisterReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportMeeshaDTO getBillRegisterReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "source") Integer source,
			@RequestParam(value = "sponsorId") Integer sponsorId,
			@RequestParam(value = "sponsorF") Integer sponsorF,
			@RequestParam(value = "sponsorL") Integer sponsorL) {
		
		List<BillRegReportMeeshaDTO> ltopdDiagnoDto = new ArrayList<BillRegReportMeeshaDTO>();
		ltopdDiagnoDto = financeService.getBillRegisterReport(unitId,userId,fromDate,toDate,source,sponsorId,sponsorF,sponsorL);		
		BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
		obj.setLstBillReg(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/getOutstandingReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportMeeshaDTO getOutstandingReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportMeeshaDTO> ltopdDiagnoRec = new ArrayList<BillRegReportMeeshaDTO>();
		ltopdDiagnoRec = financeService.getOutstandingReport(unitId,userId,fromDate,toDate);		
		BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
		obj.setLstBillReg(ltopdDiagnoRec);	
		return obj;		
	}
	
	@RequestMapping(value = "/getIpdBillStatus", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto getIpdBillStatus(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = financeService.getIpdBillStatus(unitId,userId,fromDate,toDate);		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getIpdWaitingBill", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto getIpdWaitingBill(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();
		ltRegMasterDto = financeService.getIpdWaitingBill(unitId,userId,fromDate,toDate);		
		RegTreBillDto obj=new RegTreBillDto();
		obj.setListRegTreBillDto(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getHeadwiseReport", method = RequestMethod.POST)
	public @ResponseBody
	EhatBillReports getHeadwiseReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "servId") Integer servId) {
		
		List<EhatBillReports> ltRegMasterDto = new ArrayList<EhatBillReports>();
		ltRegMasterDto = financeService.getHeadwiseReport(unitId,userId,fromDate,toDate,servId);		
		EhatBillReports obj=new EhatBillReports();
		obj.setLstBillrpt(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getPatientTypeWiseIpdBill", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportMeeshaDTO getPatientTypeWiseIpdBill(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "source") Integer source,
			@RequestParam(value = "sponsorId") Integer sponsorId,
			@RequestParam(value = "sponsorF") Integer sponsorF,
			@RequestParam(value = "sponsorL") Integer sponsorL) {
		
		List<BillRegReportMeeshaDTO> ltRegMasterDto = new ArrayList<BillRegReportMeeshaDTO>();
		ltRegMasterDto = financeService.getPatientTypeWiseIpdBill(unitId,userId,fromDate,toDate,source,sponsorId,sponsorF,sponsorL);		
		BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
		obj.setLstBillReg(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getIpdBillDiscountRegister", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportMeeshaDTO getIpdBillDiscountRegister(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportMeeshaDTO> ltRegMasterDto = new ArrayList<BillRegReportMeeshaDTO>();
		ltRegMasterDto = financeService.getIpdBillDiscountRegister(unitId,userId,fromDate,toDate);		
		BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
		obj.setLstBillReg(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getBillEstimateReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportMeeshaDTO getBillEstimateReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportMeeshaDTO> ltRegMasterDto = new ArrayList<BillRegReportMeeshaDTO>();
		ltRegMasterDto = financeService.getBillEstimateReport(unitId,userId,fromDate,toDate);		
		BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
		obj.setLstBillReg(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getGroupwiseProfees", method = RequestMethod.POST)
	public @ResponseBody
	GroupwiseProfeesDto getGroupwiseProfees(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "groupId") Integer groupId) {
		
		List<GroupwiseProfeesDto> ltRegMasterDto = new ArrayList<GroupwiseProfeesDto>();
		ltRegMasterDto = financeService.getGroupwiseProfees(unitId,userId,fromDate,toDate,groupId);		
		GroupwiseProfeesDto obj=new GroupwiseProfeesDto();
		obj.setLstGroupProfess(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getPerformanceReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportMeeshaDTO getPerformanceReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportMeeshaDTO> ltRegMasterDto = new ArrayList<BillRegReportMeeshaDTO>();
		ltRegMasterDto = financeService.getPerformanceReport(unitId,userId,fromDate,toDate);		
		BillRegReportMeeshaDTO obj=new BillRegReportMeeshaDTO();
		obj.setLstBillReg(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getPharmaReturn", method = RequestMethod.POST)
	public @ResponseBody
	Double getPharmaReturn(
			@RequestParam(value = "treatId") Integer treatId		
			) {
		
		/*List<BillRegReportMeeshaDTO> ltRegMasterDto = new ArrayList<BillRegReportMeeshaDTO>();*/
		double phChrg = financeService.getPharmaReturn(treatId);		
					
		return phChrg;		
	}
	
	@RequestMapping(value = "/getIpdBreakupReport", method = RequestMethod.POST)
	public @ResponseBody
	IpdBreakupReportDTO getIpdBreakupReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<IpdBreakupReportDTO> ltIpdBreakDto = new ArrayList<IpdBreakupReportDTO>();
		ltIpdBreakDto = financeService.getIpdBreakupReport(unitId,userId,fromDate,toDate);		
		IpdBreakupReportDTO obj=new IpdBreakupReportDTO();
		obj.setLstIpdBreakup(ltIpdBreakDto);			
		return obj;		
	}

	@RequestMapping(value = "/getAllTreatments", method = RequestMethod.POST)
	public @ResponseBody
	TreatmentDto getAllTreatments(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,			
			@RequestParam(value = "patId") Integer patId,
			@RequestParam(value = "sponsorId") Integer sponsorIdd) {
		
		List<TreatmentDto> lstBillHistory = new ArrayList<TreatmentDto>();
		lstBillHistory = financeService.getAllTreatments(unitId,userId,patId,sponsorIdd);		
		TreatmentDto obj=new TreatmentDto();
		obj.setListTreatment(lstBillHistory);			
		return obj;		
	}

	@RequestMapping(value = "/getBillHistory", method = RequestMethod.POST)
	public @ResponseBody
	BillHistoryDTO getBillHistory(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "patId") Integer patId,
			@RequestParam(value = "sponsorId") Integer sponsorId) {
		
		List<BillHistoryDTO> lstBillHistory = new ArrayList<BillHistoryDTO>();
		lstBillHistory = financeService.getBillHistory(unitId,userId,fromDate,toDate,patId,sponsorId);		
		BillHistoryDTO obj=new BillHistoryDTO();
		obj.setLstBillHistory(lstBillHistory);			
		return obj;		
	}
	
	@RequestMapping(value = "/generateBillIdTreats", method = RequestMethod.POST)
	public @ResponseBody
	Integer generateBillIdTreats(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,			
			@RequestParam(value = "patId") Integer patId,
			@RequestParam(value = "treatIds") String treatIds) {
					
		BillMasterAllTreat obj=new BillMasterAllTreat();
		obj.setPatientId(patId);
		obj.setTreatIds(treatIds);
		obj.setCreatedBy(userId);
		obj.setUnitId(unitId);
		Integer result = financeService.generateBillIdTreats(obj);	
		return result;		
	}
	
	@RequestMapping(value = "/getGeneratedBillHistory", method = RequestMethod.POST)
	public @ResponseBody
	BillHistoryDTO getGeneratedBillHistory(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "patId") Integer patId,
			@RequestParam(value = "sponsorId") Integer sponsorId) {
		
		List<BillHistoryDTO> lstBillHistory = new ArrayList<BillHistoryDTO>();
		lstBillHistory = financeService.getGeneratedBillHistory(unitId,userId,fromDate,toDate,patId,sponsorId);		
		BillHistoryDTO obj=new BillHistoryDTO();
		obj.setLstBillHistory(lstBillHistory);			
		return obj;		
	}
	
	@RequestMapping(value = "/getBuildTreatments", method = RequestMethod.POST)
	public @ResponseBody
	TreatmentDto getBuildTreatments(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,			
			@RequestParam(value = "patId") Integer patId,
			@RequestParam(value = "sponsorId") Integer sponsorIdd) {
		
		List<TreatmentDto> lstBillHistory = new ArrayList<TreatmentDto>();
		lstBillHistory = financeService.getBuildTreatments(unitId,userId,patId,sponsorIdd);		
		TreatmentDto obj=new TreatmentDto();
		obj.setListTreatment(lstBillHistory);			
		return obj;		
	}
	
	//irfan khan 11-sep-2018 fetch servicewise report
	@RequestMapping(value = "/fetchServiceWiseReport", method = RequestMethod.POST)
	public @ResponseBody
	BillDetailsDto fetchServiceWiseReport(
			@RequestParam("fromDate") Date fromDate,
			@RequestParam("toDate") Date toDate,
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("subServiceId") int subServiceId) {
		
		List<BillDetailsDto> lstBillDetails = new ArrayList<BillDetailsDto>();
		lstBillDetails = financeService.fetchServiceWiseReport(fromDate,toDate,deptId,serviceId,subServiceId,sponsorId);		
		BillDetailsDto obj=new BillDetailsDto();
		obj.setListBillDetails(lstBillDetails);			
		return obj;		
	}
	
	//irfan khan 14-sep-2018 fetch subServices
	@RequestMapping(value = "/fetchSubServices", method = RequestMethod.POST)
	public @ResponseBody
	SubServiceDto fetchSubServices(
			@RequestParam("serviceId") int serviceId
			) {

		List<SubServiceDto> lstSubService = new ArrayList<SubServiceDto>();
		lstSubService = financeService.fetchSubServices(serviceId);
		SubServiceDto obj = new SubServiceDto();
		obj.setLstSubService(lstSubService);
		return obj;
	}
	
	@RequestMapping(value = "/getOpdDeletedServiceBills", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportMeeshaDTO getOpdDeletedServiceBills(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		ltopdDiagnoDto = financeService.getOpdDeletedServiceBills(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportMeeshaDTO obj=new OpdDiagnoReportMeeshaDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/getOpdRefundReport", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportMeeshaDTO getOpdRefundReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		ltopdDiagnoDto = financeService.getOpdRefundReport(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportMeeshaDTO obj=new OpdDiagnoReportMeeshaDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/getOpdDiscountReport", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportMeeshaDTO getOpdDiscountReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		ltopdDiagnoDto = financeService.getOpdDiscountReport(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportMeeshaDTO obj=new OpdDiagnoReportMeeshaDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/getPackageReport", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportMeeshaDTO getPackageReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportMeeshaDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportMeeshaDTO>();
		ltopdDiagnoDto = financeService.getPackageReport(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportMeeshaDTO obj=new OpdDiagnoReportMeeshaDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
}
