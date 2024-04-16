package com.hms.ehat.dao;

import java.sql.Date;
import java.util.List;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillHistoryDTO;
import com.hms.ehat.dto.BillMasterAllTreat;
import com.hms.ehat.dto.BillRegReportMeeshaDTO;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.EhatBillReports;
import com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto;
import com.hms.ehat.dto.FinanceBankMaster;
import com.hms.ehat.dto.GroupwiseProfeesDto;
import com.hms.ehat.dto.IpdBreakupReportDTO;
import com.hms.ehat.dto.NotificationDTO;
import com.hms.ehat.dto.OpdDiagnoRecReportMeeshaDTO;
import com.hms.ehat.dto.OpdDiagnoReportBilllWiseDTO;
import com.hms.ehat.dto.OpdDiagnoReportMeeshaDTO;
import com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.TreatmentServiceDetails;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;

public interface FinanceDaoMeesha
{

	BillReceiptMasterDTO getReceiptFinance(BillReceiptMasterDTO obj, String callFrom,String fromDate,String toDate);
	BillRefundMasterDTO getRefundFinance(BillRefundMasterDTO obj, String callFrom,String fromDate,String toDate);
	Integer saveFinaceBankDetails(String callFrom,FinanceBankMaster obj);
	FinanceBankMaster fetchFinanceBankDetails();
	List<RegTreBillDto> fetchPatientsRecords(int unitId,int userId,String fDate,String tDate, Integer deptId);
	List<RegTreBillDto> fetchIpdPatientsRecords(int unitId,int userId,String fDate,String tDate);
	
	NotificationDTO fetchNotifications();
	NotificationDTO fetchFinalIpdBills();
	
	List<OpdDiagnoReportMeeshaDTO> fetchOpdDiagnoPatients(int unitId,int userId,String fDate,String tDate);
	List<OpdDiagnoRecReportMeeshaDTO> fetchOpdDiagnoRec(int unitId,int userId,String fDate,String tDate,int payMode,String callFrom);
	List<BillRegReportMeeshaDTO> getBillRegisterReport(int unitId,int userId,String fDate,String tDate,int source,int sponsorId,int sponsorF,int sponsorL);
	List<BillRegReportMeeshaDTO> getOutstandingReport(int unitId,int userId,String fDate,String tDate);
	
	List<RegTreBillDto> getIpdBillStatus(int unitId,int userId,String fDate,String tDate);
	List<RegTreBillDto> getIpdWaitingBill(int unitId,int userId,String fDate,String tDate);
	List<EhatBillReports> getHeadwiseReport(int unitId,int userId,String fDate,String tDate,int servId);
	List<BillRegReportMeeshaDTO> getPatientTypeWiseIpdBill(int unitId,int userId,String fDate,String tDate,int source,int sponsorId,int sponsorF,int sponsorL);
	List<BillRegReportMeeshaDTO> getIpdBillDiscountRegister(int unitId,int userId,String fDate,String tDate);	
	List<BillRegReportMeeshaDTO> getBillEstimateReport(int unitId,int userId,String fDate,String tDate);
	
	List<GroupwiseProfeesDto> getGroupwiseProfees(int unitId,int userId,String fDate,String tDate,int groupId);
	
	List<BillRegReportMeeshaDTO> getPerformanceReport(int unitId,int userId,String fDate,String tDate);
	double getPharmaReturn(Integer treatId);
	
	List<IpdBreakupReportDTO> getIpdBreakupReport(int unitId,int userId,String fDate,String tDate);
	List<OpdDiagnoReportBilllWiseDTO> fetchOpdDiagnoPatientsbillwise(
			int unitId, int userId, String fDate, String tDate);
	
	NotificationDTO fetchMaintainaceExpireItems();
	
	List<BillHistoryDTO> getBillHistory(int unitId,int userId,String fDate,String tDate,int patId,int sponsorId);
	
	List<TreatmentDto> getAllTreatments(int unitId,int userId,int patId,int sponsorIdd);
	
	List<TreatmentServiceDetails> getServDetails(int treatId,int chargesSlaveId);
	
	Integer generateBillIdTreats(BillMasterAllTreat obj);
	
	List<BillHistoryDTO> getGeneratedBillHistory(int unitId,int userId,String fDate,String tDate,int patId,int sponsorId);
	
	List<TreatmentDto> getBuildTreatments(int unitId,int userId,int patId,int sponsorIdd);
	
	//irfan khan 11-sep-2018 fetch servicewise report
	List<BillDetailsDto> fetchServiceWiseReport(Date fromDate, Date toDate,
			int deptId, int serviceId, int subServiceId,int sponsorId);
	
	//irfan khan 14-sep-2018 fetch subServices
	List<SubServiceDto> fetchSubServices(int serviceId);
	
	
	/*-------------------  IpdBillService --------------------*/
	List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(BillReceiptMasterDTO obj);
	List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(BillReceiptMasterDTO obj);
	List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBillPharmacyInvoice(BillReceiptMasterDTO obj);
	List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(BillReceiptMasterDTO obj);
	List<PharmacyDetailsOnBillingPrintDto> getPharmacyDetailsONBillingPrint(BillReceiptMasterDTO obj);
	/*-------------------  IpdBillService --------------------*/
	
	List<CommonadvDto> getCommonadv(BillReceiptMasterDTO obj); //CommonadvService
	double getPharmaReturn(BillReceiptMasterDTO obj); // FinanceService
	BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj); // BillService
	BillMasterAllTreat getBilledBillNo(BillReceiptMasterDTO obj);
	List<OpdDiagnoReportMeeshaDTO> getOpdDeletedServiceBills(int unitId,int userId,String fDate,String tDate);	
	List<OpdDiagnoReportMeeshaDTO> getOpdRefundReport(int unitId,int userId,String fDate,String tDate);	
	List<OpdDiagnoReportMeeshaDTO> getOpdDiscountReport(int unitId,int userId,String fDate,String tDate);	
	
	List<OpdDiagnoReportMeeshaDTO> getPackageReport(int unitId,int userId,String fDate,String tDate);
}
