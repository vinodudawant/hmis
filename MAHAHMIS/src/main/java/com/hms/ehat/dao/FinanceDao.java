package com.hms.ehat.dao;

import java.sql.Date;
import java.util.List;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillHistoryDTO;
import com.hms.ehat.dto.BillMasterAllTreat;
import com.hms.ehat.dto.BillRegReportDTO;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.CommonadvDto;
import com.hms.ehat.dto.DailyCollectionReportDto;
import com.hms.ehat.dto.DashboardDto;
import com.hms.ehat.dto.DischargeDeathPatientDto;
import com.hms.ehat.dto.EhatBillReports;
import com.hms.ehat.dto.EhatViewPatientBedDetailsIpdDto;
import com.hms.ehat.dto.EhatViewPatientServiceDetailIpdDto;
import com.hms.ehat.dto.EhatViewPatientSubServiceDetailsIpdDto;
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
import com.hms.ehat.dto.PharmacyDetailsOnBillingPrintDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegTreBillDto2;
import com.hms.ehat.dto.ServiceWiseBusinessReportDTO;
import com.hms.ehat.dto.ServiceWiseReportDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.TreatmentServiceDetails;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;

public interface FinanceDao {

	DashboardDto getGraphData(DashboardDto obj);
	BillReceiptMasterDTO getReceiptFinance(BillReceiptMasterDTO obj, String callFrom,String fromDate,String toDate);
	BillRefundMasterDTO getRefundFinance(BillRefundMasterDTO obj, String callFrom,String fromDate,String toDate);
	Integer saveFinaceBankDetails(String callFrom,FinanceBankMaster obj);
	FinanceBankMaster fetchFinanceBankDetails();
	List<RegTreBillDto> fetchPatientsRecords(int unitId,int userId,String fDate,String tDate, Integer deptId,Integer chargesSlaveId);
	List<RegTreBillDto> fetchIpdPatientsRecords(int unitId,int userId,String fDate,String tDate,String callFrom);
	
	NotificationDTO fetchNotifications();
	NotificationDTO fetchFinalIpdBills();
	
	List<OpdDiagnoReportDTO> fetchOpdDiagnoPatients(int unitId,int userId,String fDate,String tDate);
	List<OpdDiagnoRecReportDTO> fetchOpdDiagnoRec(int unitId,int userId,String fDate,String tDate,int payMode,String callFrom);
	List<BillRegReportDTO> getBillRegisterReport(int unitId,int userId,String fDate,String tDate,int filterBy,int specialityId,int docId,int reasonId);
	List<BillRegReportDTO> getOutstandingReport(int unitId,int userId,String fDate,String tDate);
	
	List<RegTreBillDto2> getIpdBillStatus(int unitId,int userId,String fDate,String tDate);
	List<RegTreBillDto> getIpdWaitingBill(int unitId,int userId,String fDate,String tDate);
	List<EhatBillReports> getHeadwiseReport(int unitId,int userId,String fDate,String tDate,int servId);
	List<BillRegReportDTO> getPatientTypeWiseIpdBill(int unitId,int userId,String fDate,String tDate,int source,int sponsorId,int sponsorF,int sponsorL);
	List<BillRegReportDTO> getIpdBillDiscountRegister(int unitId,int userId,String fDate,String tDate);	
	List<BillRegReportDTO> getBillEstimateReport(int unitId,int userId,String fDate,String tDate);
	
	List<GroupwiseProfeesDto> getGroupwiseProfees(int unitId,int userId,String fDate,String tDate,int groupId);
	
	List<BillRegReportDTO> getPerformanceReport(int unitId,int userId,String fDate,String tDate);
	double getPharmaReturn(Integer treatId);
	
	List<IpdBreakupReportDTO> getIpdBreakupReport(int unitId,int userId,String fDate,String tDate,String callFrom);
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
			int deptId, int serviceId, int subServiceId,int sponsorId,int unitId);
	
	//irfan khan 14-sep-2018 fetch subServices
	List<SubServiceDto> fetchSubServices(int serviceId);
	List<SubServiceDto> fetchSubServices(String serviceId);
	
	
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
	List<OpdDiagnoReportDTO> getOpdDeletedServiceBills(int unitId,int userId,String fDate,String tDate,Integer departmentId);	
	List<OpdDiagnoReportDTO> getOpdRefundReport(int unitId,int userId,String fDate,String tDate,int departmentId);	
	List<OpdDiagnoReportDTO> getOpdDiscountReport(int unitId,int userId,String fDate,String tDate);	
	
	DailyCollectionReportDto getDailyCollectionReport(BillReceiptMasterDTO obj,String callFrom,String fDate,String tDate);


	// List<IpdBreakupReportDTO> getOTReport(int unitId,int userId,String fDate,String tDate,String callFrom,String opId,String opCat,String opSpecility,int searchBy);
	
	List<OpdReceiptReportDto> opdReceiptReport(Integer unitId,Integer userId, String fDate, String tDate,
			Integer payMode, String callFrom);
	
	DailyCollectionReportDto getDailyCollectionReportForMeesha(BillReceiptMasterDTO obj,String callFrom,String fDate,String tDate);
	
	/*------------------- OpdAppointmentScheduler Report --------------------*/
	
	List<OpdAppSchedReportDto> fetchOpdAppSchePatient(String fromDate, String toDate,
			String appt_type_id);
	
	/*------------------- IPD Refund/collection Report --------------------*/
	
	List<IpdBillRefundReportDto> getIpdRefundReport(IpdBillRefundReportDto obj, String fromDate, String toDate);
	
	List<IpdDeletedReportDto> fetchIpdRec(Integer unitId, Integer userId, String fromDate, String toDate,
			Integer payMode, String callFrom);
	
	DischargeDeathPatientDto searchDischargeDeathPatientList(String type, String fromdate, String todate);

	DailyCollectionReportDto getDailyCollectionReportNew(BillReceiptMasterDTO obj,String callFrom,String fDate,String tDate);
	
	
	String getBusinessReport(int unitId,int userId,String fDate,String tDate);
	
	List<ServiceWiseReportDTO> fetchServiceWiseHeadReport(Date fromDate,Date toDate,Integer unitId,String serviceId,String deptId,String checkType,String subserviceId,String mutlischemeIds,String multiSchemeChild,String isPackage);
	
	List<ServiceWiseBusinessReportDTO> fetchServiceWiseHeadReport2(Date fromDate,Date toDate,Integer unitId,String serviceId,String deptId,String checkType,String subserviceId,String mutlischemeIds,String multiSchemeChild,String type,String isPackage);
	List<IpdBillRefundMasterDTO> getIpdDeletedRefundData(Integer unitId, Integer userId, String fromDate, String toDate,Integer paymode,String callFrom);
	
	List<OPDMonthlyReportDTO> getMonthlyOPDReport(String fromYear, String fromMonth);
	
	List<SubServiceDto> fetchMultipleSubservices(String serviceId);
	
	List<ChargesMasterSlave> getChragesSlaveList(String masterId, String name,Integer selfId);
	
	List<LabBusinessReportDTO> fetchLabBusinessReport(String fromDate,String toDate,String organizationIds,String duesType,Integer unitId,String labType,String custType);
	
	List<OtFinanceReportDTO> getOTReport(Integer unitId, Integer userId, String fromDate, String toDate,
			String callFrom, String opId, int opCat, String opSpecility, Integer searchBy, int doctorId,
			int theaterId, int anesthetistId);
	List<Doctor> getAnesthetistList();
	
	FinanceBankMaster editBankMaster(Integer Id);
	
	boolean deleteBankMaster(Integer Id);

}
