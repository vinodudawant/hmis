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

import com.hms.dto.Doctor;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillHistoryDTO;
import com.hms.ehat.dto.BillMasterAllTreat;
import com.hms.ehat.dto.BillRegReportDTO;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DailyCollectionReportDto;
import com.hms.ehat.dto.DashboardDto;
import com.hms.ehat.dto.DischargeDeathPatientDto;
import com.hms.ehat.dto.EhatBillReports;
import com.hms.ehat.dto.FinanceBankMaster;
import com.hms.ehat.dto.GroupwiseProfeesDto;
import com.hms.ehat.dto.IpdBillRefundReportDto;
import com.hms.ehat.dto.IpdBreakupReportDTO;
import com.hms.ehat.dto.IpdDeletedReportDto;
import com.hms.ehat.dto.LabBusinessReportDTO;
import com.hms.ehat.dto.NotificationDTO;
import com.hms.ehat.dto.OPDMonthlyReportDTO;
import com.hms.ehat.dto.OpdAppSchedReportDto;
import com.hms.ehat.dto.OpdDiagnoRecReportDTO;
import com.hms.ehat.dto.OpdDiagnoReportBilllWiseDTO;
import com.hms.ehat.dto.OpdDiagnoReportDTO;
import com.hms.ehat.dto.OpdReceiptReportDto;
import com.hms.ehat.dto.OtFinanceReportDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegTreBillDto2;
import com.hms.ehat.dto.ServiceWiseBusinessReportDTO;
import com.hms.ehat.dto.ServiceWiseReportDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.FinanceService;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;

@Controller
@RequestMapping(value = "/finance")
public class FinanceController {

	@Autowired
	FinanceService financeService;
	
	/************
	* @author	: Vinod Udawant
	* @date		: 21-Nov-2017
	* @codeFor	: Save ehat bill details
	 ************/
	@RequestMapping(value = "/getGraphData", method = RequestMethod.POST)
	@ResponseBody
	public DashboardDto getGraphData(
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
			
		DashboardDto obj=new DashboardDto();
		obj.setFromDate(fromDate);
		obj.setToDate(toDate);
		obj.setUnitId(unitId);
		obj.setUserId(userId);
		return financeService.getGraphData(obj);			
	}
		
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
			@RequestParam(value = "deptId") Integer deptId,
		    @RequestParam(value ="chargesSlaveId") Integer chargesSlaveId ) {
		List<RegTreBillDto> ltRegMasterDto = new ArrayList<RegTreBillDto>();		
		ltRegMasterDto = financeService.fetchPatientsRecords(unitId,userId,fromDate,toDate,deptId,chargesSlaveId);		
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
		ltRegMasterDto = financeService.fetchIpdPatientsRecords(unitId,userId,fromDate,toDate,callFrom);		
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
	OpdDiagnoReportDTO fetchOpdDiagnoPatients(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportDTO>();
		ltopdDiagnoDto = financeService.fetchOpdDiagnoPatients(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportDTO obj=new OpdDiagnoReportDTO();
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
	OpdDiagnoRecReportDTO fetchOpdDiagnoRec(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "payMode") Integer payMode) {
		
		List<OpdDiagnoRecReportDTO> ltopdDiagnoRec = new ArrayList<OpdDiagnoRecReportDTO>();
		ltopdDiagnoRec = financeService.fetchOpdDiagnoRec(unitId,userId,fromDate,toDate,payMode,callFrom);		
		OpdDiagnoRecReportDTO obj=new OpdDiagnoRecReportDTO();
		obj.setLstOpdDiagnoRec(ltopdDiagnoRec);	
		return obj;		
	}	
	
	@RequestMapping(value = "/getBillRegisterReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportDTO getBillRegisterReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "filterBy") Integer filterBy,
			@RequestParam(value = "specialityId") Integer specialityId,
			@RequestParam(value = "docId") Integer docId,
			@RequestParam(value = "reasonId") Integer reasonId) {
		
		List<BillRegReportDTO> ltopdDiagnoDto = new ArrayList<BillRegReportDTO>();
		ltopdDiagnoDto = financeService.getBillRegisterReport(unitId,userId,fromDate,toDate,filterBy,specialityId,docId,reasonId);		
		BillRegReportDTO obj=new BillRegReportDTO();
		obj.setLstBillReg(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/getOutstandingReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportDTO getOutstandingReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportDTO> ltopdDiagnoRec = new ArrayList<BillRegReportDTO>();
		ltopdDiagnoRec = financeService.getOutstandingReport(unitId,userId,fromDate,toDate);		
		BillRegReportDTO obj=new BillRegReportDTO();
		obj.setLstBillReg(ltopdDiagnoRec);	
		return obj;		
	}
	
	@RequestMapping(value = "/getIpdBillStatus", method = RequestMethod.POST)
	public @ResponseBody
	RegTreBillDto2 getIpdBillStatus(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<RegTreBillDto2> ltRegMasterDto = new ArrayList<RegTreBillDto2>();
		ltRegMasterDto = financeService.getIpdBillStatus(unitId,userId,fromDate,toDate);		
		RegTreBillDto2 obj=new RegTreBillDto2();
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
	BillRegReportDTO getPatientTypeWiseIpdBill(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "source") Integer source,
			@RequestParam(value = "sponsorId") Integer sponsorId,
			@RequestParam(value = "sponsorF") Integer sponsorF,
			@RequestParam(value = "sponsorL") Integer sponsorL) {
		
		List<BillRegReportDTO> ltRegMasterDto = new ArrayList<BillRegReportDTO>();
		ltRegMasterDto = financeService.getPatientTypeWiseIpdBill(unitId,userId,fromDate,toDate,source,sponsorId,sponsorF,sponsorL);		
		BillRegReportDTO obj=new BillRegReportDTO();
		obj.setLstBillReg(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getIpdBillDiscountRegister", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportDTO getIpdBillDiscountRegister(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportDTO> ltRegMasterDto = new ArrayList<BillRegReportDTO>();
		ltRegMasterDto = financeService.getIpdBillDiscountRegister(unitId,userId,fromDate,toDate);		
		BillRegReportDTO obj=new BillRegReportDTO();
		obj.setLstBillReg(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getBillEstimateReport", method = RequestMethod.POST)
	public @ResponseBody
	BillRegReportDTO getBillEstimateReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportDTO> ltRegMasterDto = new ArrayList<BillRegReportDTO>();
		ltRegMasterDto = financeService.getBillEstimateReport(unitId,userId,fromDate,toDate);		
		BillRegReportDTO obj=new BillRegReportDTO();
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
	BillRegReportDTO getPerformanceReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<BillRegReportDTO> ltRegMasterDto = new ArrayList<BillRegReportDTO>();
		ltRegMasterDto = financeService.getPerformanceReport(unitId,userId,fromDate,toDate);		
		BillRegReportDTO obj=new BillRegReportDTO();
		obj.setLstBillReg(ltRegMasterDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/getPharmaReturn", method = RequestMethod.POST)
	public @ResponseBody
	Double getPharmaReturn(
			@RequestParam(value = "treatId") Integer treatId		
			) {
		
		/*List<BillRegReportDTO> ltRegMasterDto = new ArrayList<BillRegReportDTO>();*/
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
		ltIpdBreakDto = financeService.getIpdBreakupReport(unitId,userId,fromDate,toDate,callFrom);		
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
			@RequestParam("unitId") int unitId,
			@RequestParam("sponsorId") int sponsorId,
			@RequestParam("deptId") int deptId,
			@RequestParam("serviceId") int serviceId,
			@RequestParam("subServiceId") int subServiceId) {
		
		List<BillDetailsDto> lstBillDetails = new ArrayList<BillDetailsDto>();
		lstBillDetails = financeService.fetchServiceWiseReport(fromDate,toDate,deptId,serviceId,subServiceId,sponsorId,unitId);		
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
	OpdDiagnoReportDTO getOpdDeletedServiceBills(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "departmentId") Integer departmentId) {
		
		List<OpdDiagnoReportDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportDTO>();
		ltopdDiagnoDto = financeService.getOpdDeletedServiceBills(unitId,userId,fromDate,toDate,departmentId);		
		OpdDiagnoReportDTO obj=new OpdDiagnoReportDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/getOpdRefundReport", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportDTO getOpdRefundReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "deptId") int departmentId) {
		
		List<OpdDiagnoReportDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportDTO>();
		ltopdDiagnoDto = financeService.getOpdRefundReport(unitId,userId,fromDate,toDate,departmentId);		
		OpdDiagnoReportDTO obj=new OpdDiagnoReportDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	
	@RequestMapping(value = "/getOpdDiscountReport", method = RequestMethod.POST)
	public @ResponseBody
	OpdDiagnoReportDTO getOpdDiscountReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
		
		List<OpdDiagnoReportDTO> ltopdDiagnoDto = new ArrayList<OpdDiagnoReportDTO>();
		ltopdDiagnoDto = financeService.getOpdDiscountReport(unitId,userId,fromDate,toDate);		
		OpdDiagnoReportDTO obj=new OpdDiagnoReportDTO();
		obj.setLstOpdDiagno(ltopdDiagnoDto);	
		return obj;		
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 15-May-2019
	* @codeFor	: Get Daily Collection Report
	 ************/
	@RequestMapping(value = "/getDailyCollectionReport", method = RequestMethod.POST)
	@ResponseBody
	public DailyCollectionReportDto getDailyCollectionReport(
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "payModeId") Integer payModeId,
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
			
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setDepartmentId(deptId);
		obj.setCreatedBy(userId);	
		obj.setPayMode(payModeId);
		return financeService.getDailyCollectionReport(obj,callFrom,fromDate,toDate);			
	}
	

	
	
	@RequestMapping(value = "/getOTReport", method = RequestMethod.POST)
	public @ResponseBody
	OtFinanceReportDTO getOTReport(
			@RequestParam(value = "unitId") Integer unitId,			
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate,
			@RequestParam(value = "opId") String opId,
			@RequestParam(value = "opCat") int opCat,
			@RequestParam(value = "opSpecility") String opSpecility,
			@RequestParam(value = "doctorId") int doctorId,
			@RequestParam(value = "theaterId") int theaterId,
			@RequestParam(value = "searchBy") Integer searchBy,@RequestParam(value = "anesthetistId") int anesthetistId) {
		
		List<OtFinanceReportDTO> ltIpdBreakDto = new ArrayList<OtFinanceReportDTO>();
		ltIpdBreakDto = financeService.getOTReport(unitId,userId,fromDate,toDate,callFrom,opId,opCat,opSpecility,searchBy,doctorId,theaterId,anesthetistId);		
		OtFinanceReportDTO obj=new OtFinanceReportDTO();
		obj.setLstIpdBreakup(ltIpdBreakDto);			
		return obj;		
	}
	
	@RequestMapping(value = "/opdReceiptReport", method = RequestMethod.POST)
	public @ResponseBody
	OpdReceiptReportDto opdReceiptReport(
			@RequestParam(value = "unitId") Integer unitId,	
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fDate,
			@RequestParam(value = "toDate") String tDate,
			@RequestParam(value = "payMode") Integer payMode,
			@RequestParam(value = "userId") Integer userId		) {
		
		List<OpdReceiptReportDto> ltopdDiagnoRec = new ArrayList<OpdReceiptReportDto>();
		ltopdDiagnoRec = financeService.opdReceiptReport(unitId,userId,fDate,tDate,payMode,callFrom);		
		OpdReceiptReportDto obj=new OpdReceiptReportDto();
		obj.setListOpdReceiptReportDto(ltopdDiagnoRec);	
		return obj;		
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 15-May-2019
	* @codeFor	: Get Daily Collection Report
	 ************/
	@RequestMapping(value = "/getDailyCollectionReportForMeesha", method = RequestMethod.POST)
	@ResponseBody
	public DailyCollectionReportDto getDailyCollectionReportForMeesha(
			@RequestParam(value = "unitId") Integer unitId,
			@RequestParam(value = "deptId") Integer deptId,
			@RequestParam(value = "payModeId") Integer payModeId,
			@RequestParam(value = "userId") Integer userId,
			@RequestParam(value = "callFrom") String callFrom,
			@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate) {
			
		BillReceiptMasterDTO obj=new BillReceiptMasterDTO();
		obj.setUnitId(unitId);
		obj.setDepartmentId(deptId);
		obj.setCreatedBy(userId);	
		obj.setPayMode(payModeId);
		return financeService.getDailyCollectionReportForMeesha(obj,callFrom,fromDate,toDate);			
	}
	
	/************
	* @author	: Sandip Shinde
	* @date		: 21-Apr-2023
	* @codeFor	: Get OPD Appointment Scheduler Report
	 ************/
	@RequestMapping(value = "/fetchOpdAppSchePatient", method = RequestMethod.POST)
	public @ResponseBody
	List<OpdAppSchedReportDto> fetchOpdAppSchePatient(@RequestParam(value = "fromDate") String fromDate,
			@RequestParam(value = "toDate") String toDate, @RequestParam(value = "AppType") String appt_type_id) {
		
		List<OpdAppSchedReportDto> lstOpdAppSchedReportDto = new ArrayList<OpdAppSchedReportDto>();
		lstOpdAppSchedReportDto = financeService.fetchOpdAppSchePatient(fromDate,toDate,appt_type_id);		
		return lstOpdAppSchedReportDto;		
	}
		
		/************
		* @author	: Sandip Shinde
		* @date		: 17-March-2023
		* @codeFor	: IPD Refund Report
		 ************/
		@RequestMapping(value = "/getIpdRefundReport", method = RequestMethod.POST)
		@ResponseBody
		public List<IpdBillRefundReportDto> getIpdRefundReport(
				@RequestParam(value = "unitId") Integer unitId,
				@RequestParam(value = "userId") Integer userId,
				@RequestParam(value = "fromDate") String fromDate,
				@RequestParam(value = "toDate") String toDate) {
				
			IpdBillRefundReportDto obj=new IpdBillRefundReportDto();
			obj.setUnit_id(unitId);
			obj.setCreated_by(userId);
			return financeService.getIpdRefundReport(obj,fromDate,toDate);			
		}
		
		//modify by Sandip:16-03-2023 added for IPD report 
		@RequestMapping(value = "/fetchIpdRec", method = RequestMethod.POST)
		public @ResponseBody
		IpdDeletedReportDto fetchIpdRec(
				@RequestParam(value = "unitId") Integer unitId,			
				@RequestParam(value = "userId") Integer userId,
				@RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "fromDate") String fromDate,
				@RequestParam(value = "toDate") String toDate,
				@RequestParam(value = "payMode") Integer payMode) {
			
			List<IpdDeletedReportDto> ltIpdRec = new ArrayList<IpdDeletedReportDto>();
			ltIpdRec = financeService.fetchIpdRec(unitId,userId,fromDate,toDate,payMode,callFrom);	
			IpdDeletedReportDto obj=new IpdDeletedReportDto();
			
			obj.setLstIpdRec(ltIpdRec);	
			return obj;		
		}
		
		
		/************
		* @author	: Sandip Shinde
		* @date		: 09-AUG-2023
		* @codeFor	: IPD Refund Report
		 ************/
		@RequestMapping(value = "/searchDischargeDeathPatientList", method = RequestMethod.POST)
		@ResponseBody
		public DischargeDeathPatientDto searchDischargeDeathPatientList(@RequestParam("type")String type,@RequestParam("fromdate")String fromdate,
				@RequestParam("todate")String todate){
			DischargeDeathPatientDto response = financeService.searchDischargeDeathPatientList(type, fromdate, todate);
			return response;
		}
		//Added By Annapurna code for dailyCollection ReportNew
		@RequestMapping(value = "/getDailyCollectionReportNew", method = RequestMethod.POST)
		@ResponseBody
		public DailyCollectionReportDto getDailyCollectionReportNew(@RequestParam(value = "unitId") Integer unitId,
				@RequestParam(value = "deptId") Integer deptId, @RequestParam(value = "payModeId") Integer payModeId,
				@RequestParam(value = "userId") Integer userId, @RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "fromDate") String fromDate, @RequestParam(value = "toDate") String toDate) {

			BillReceiptMasterDTO obj = new BillReceiptMasterDTO();
			obj.setUnitId(unitId);
			obj.setDepartmentId(deptId);
			obj.setCreatedBy(userId);
			obj.setPayMode(payModeId);
			return financeService.getDailyCollectionReportNew(obj, callFrom, fromDate, toDate);
		}
		
		
		@RequestMapping(value = "/getBusinessReport", method = RequestMethod.POST)
		public @ResponseBody
		String getBusinessReport(
				@RequestParam(value = "unitId") Integer unitId,			
				@RequestParam(value = "userId") Integer userId,
				@RequestParam(value = "callFrom") String callFrom,
				@RequestParam(value = "fromDate") String fromDate,
				@RequestParam(value = "toDate") String toDate) {
			String  result  = financeService.getBusinessReport(unitId,userId,fromDate,toDate);		
			return result;
		}
		
		// @author :Vishant Pawar@Date :24-01-2024@Code :To fetch fetch Service Wise
		// Head Report
		@RequestMapping(value = "/fetchServiceWiseHeadReport", method = RequestMethod.POST)
		public @ResponseBody ServiceWiseReportDTO fetchServiceWiseHeadReport(
				@RequestParam("fromDate") Date fromDate, @RequestParam("toDate") Date toDate,
				@RequestParam("unitId") Integer unitId, @RequestParam("serviceId") String serviceId,
				@RequestParam("checkType") String checkType, @RequestParam("deptId") String deptId,
				@RequestParam("subServiceId") String subServiceId,@RequestParam("multiSchemeParent") String multiSchemeParent,
				@RequestParam("multiSchemeChild")String multiSchemeChild,@RequestParam("isPackage") String isPackage) {

			List<ServiceWiseReportDTO> serviceWiseReportDTOs = new ArrayList<ServiceWiseReportDTO>();
			ServiceWiseReportDTO obj = new ServiceWiseReportDTO();

			serviceWiseReportDTOs = financeService.fetchServiceWiseHeadReport(fromDate, toDate, unitId, 
					serviceId,deptId,checkType,subServiceId,multiSchemeParent,multiSchemeChild,isPackage);
			obj.setServiceWiseReportList(serviceWiseReportDTOs);

			return obj;

		}
		
		// @author :Vishant Pawar@Date :29-01-2024@Code :To fetch Service Wise
		// Head Report 2
		@RequestMapping(value = "/fetchServiceWiseHeadReport2", method = RequestMethod.POST)
		public @ResponseBody ServiceWiseBusinessReportDTO fetchServiceWiseHeadReport2(
				@RequestParam("fromDate") Date fromDate, @RequestParam("toDate") Date toDate,
				@RequestParam("unitId") Integer unitId, @RequestParam("serviceId") String serviceId,
				@RequestParam("checkType") String checkType, @RequestParam("deptId") String deptId,
				@RequestParam("subServiceId") String subServiceId,@RequestParam("multiSchemeParent") String multiSchemeParent,
				@RequestParam("multiSchemeChild")String multiSchemeChild ,@RequestParam("type")String type,
				@RequestParam("isPackage") String isPackage
				) {

			List<ServiceWiseBusinessReportDTO> serviceWiseReportDTOs = new ArrayList<ServiceWiseBusinessReportDTO>();
			ServiceWiseBusinessReportDTO obj = new ServiceWiseBusinessReportDTO();

			serviceWiseReportDTOs = financeService.fetchServiceWiseHeadReport2(fromDate, toDate, unitId, serviceId,
					deptId, checkType,subServiceId, multiSchemeParent,multiSchemeChild,type,isPackage);
			obj.setList(serviceWiseReportDTOs);

			return obj;

		}
		// @author :Annapurna jamnor @Date :30-01-2024@Code :To fetch DeletedRefunded
		// data

		@RequestMapping(value = "/getIpdDeletedRefundData", method = RequestMethod.POST)
		public @ResponseBody IpdBillRefundMasterDTO getIpdDeletedRefundData(
				@RequestParam(value = "unitId") Integer unitId, @RequestParam(value = "userId") Integer userId,
				@RequestParam(value = "callFrom") String callFrom, @RequestParam(value = "fromDate") String fromDate,
				@RequestParam(value = "toDate") String toDate, @RequestParam(value = "paymode") Integer paymode) {

			List<IpdBillRefundMasterDTO> ltIpdRec = new ArrayList<IpdBillRefundMasterDTO>();
			ltIpdRec = financeService.getIpdDeletedRefundData(unitId, userId, fromDate, toDate, paymode, callFrom);
			IpdBillRefundMasterDTO obj = new IpdBillRefundMasterDTO();

			obj.setListBillRefundMaster(ltIpdRec);
			return obj;
		}
		
		
		// Vishant Pawar @date: 07-02-2024 @reason : Fetch monthy OPD report
		@RequestMapping(value = "/getMonthyHospitalReport", method = RequestMethod.POST)
		public @ResponseBody List<OPDMonthlyReportDTO> getMonthlyOPDReport(@RequestParam("fromYear") String fromYear,
				@RequestParam("fromMonth") String fromMonth) {

			List<OPDMonthlyReportDTO> opdMonthlyReportDTO = financeService.getMonthlyOPDReport(fromYear, fromMonth);

			return opdMonthlyReportDTO;

		}
		
		// Vishant Pawar @date: 07-02-2024
		@RequestMapping(value="/fetchMultipleServices",method=RequestMethod.POST)
		@ResponseBody
		public List<SubServiceDto> fetchMultipleSubservices(@RequestParam("serviceId") String serviceId){
			 List<SubServiceDto> response = financeService.fetchMultipleSubservices(serviceId);
			return response;
		}
		
		/**
		 * @author Vishant Pawar
		 * @date 12-02-2024
		 * @code For fetching List of sub charges with master id and with self id
		 ***/
		// Vishant Pawar @date: 07-02-2024 @reason : Fetch monthy OPD report
		@RequestMapping(value = "/getChragesSlaveList", method = RequestMethod.POST)
		public @ResponseBody
		ChargesMasterSlave getChragesSlaveList(
				@RequestParam("masterId") String masterId,
				@RequestParam("name") String name,
				@RequestParam("selfId") Integer selfId) {
		
			List<ChargesMasterSlave> ltChragesSlave = new ArrayList<ChargesMasterSlave>();
			ltChragesSlave = financeService.getChragesSlaveList(masterId,name,selfId);
			ChargesMasterSlave obj = new ChargesMasterSlave();
			obj.setLstChargesSlave(ltChragesSlave);
			return obj;
		}
		
		/**
		 * @author Vishant Pawar
		 * @date 12-02-2024
		 * @code For fetching List fetchLabBusinessReport
		 ***/
		@RequestMapping(value = "/fetchLabBusinessReport", method = RequestMethod.POST)
		public @ResponseBody
		List<LabBusinessReportDTO> fetchLabBusinessReport(
				@RequestParam("fromDate") String fromDate,
				@RequestParam("toDate") String toDate,@RequestParam("organizationIds") String organizationIds,
				@RequestParam("unitId") Integer unitId,@RequestParam("duesType")String duesType,
				@RequestParam("labType") String labType,@RequestParam("custType")String custType) {
		
			
			List<LabBusinessReportDTO> businessReportDTOs = financeService.fetchLabBusinessReport(fromDate,toDate,organizationIds, duesType,unitId,labType,custType);
//			LabBusinessReportDTO obj = new LabBusinessReportDTO();
//			obj.setLstChargesSlave(ltChragesSlave);
			return businessReportDTOs;
		}
		
		
		//irfan khan 14-sep-2018 fetch subServices
		@RequestMapping(value = "/fetchSubServicesnew", method = RequestMethod.POST)
		public @ResponseBody
		SubServiceDto fetchSubServices(
				@RequestParam("serviceId") String serviceId
				) {

			List<SubServiceDto> lstSubService = new ArrayList<SubServiceDto>();
			lstSubService = financeService.fetchSubServices(serviceId);
			SubServiceDto obj = new SubServiceDto();
			obj.setLstSubService(lstSubService);
			return obj;
		}
		
		@RequestMapping(value = "/getAnesthetistList", method = RequestMethod.GET)
		@ResponseBody
		public List<Doctor> getAnesthetistList() {
			List<Doctor> response = financeService.getAnesthetistList();
			return response;
		}
		
		@RequestMapping(value = "/editBankMaster", method = RequestMethod.GET)
		@ResponseBody
		public FinanceBankMaster editBankMaster(@RequestParam("id") Integer Id) {
			
			FinanceBankMaster obj = new FinanceBankMaster();
			
			obj=financeService.editBankMaster(Id);
			
			return obj;
			
		}
		
		@RequestMapping(value = "/deleteBankMaster", method = RequestMethod.POST)
		@ResponseBody
		public String deleteBankMaster(@RequestParam("id") Integer Id) {
			
			boolean response = financeService.deleteBankMaster(Id);
			 
			String msg = "";
			if (response == true) {
				msg = "Records Deleted Sucessfully";
			} else {
				msg = "Network issue";
			}
			return msg;
			
		}

}
