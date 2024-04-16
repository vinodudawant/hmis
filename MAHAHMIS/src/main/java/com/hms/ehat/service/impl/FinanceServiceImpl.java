package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Doctor;
import com.hms.ehat.dao.FinanceDao;
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
import com.hms.ehat.service.FinanceService;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.IpdBillRefundMasterDTO;
@Service
public class FinanceServiceImpl implements FinanceService {

	@Autowired
	FinanceDao financeDao;
	
	@Override
	@Transactional
	public DashboardDto getGraphData(DashboardDto obj) {
		
		return financeDao.getGraphData(obj);			
	}
	
	@Override
	@Transactional
	public BillReceiptMasterDTO getReceiptFinance(BillReceiptMasterDTO obj, String callFrom,String fromDate,String toDate){
		
		return financeDao.getReceiptFinance(obj,callFrom,fromDate,toDate);			
	}
	
	@Override
	@Transactional
	public BillRefundMasterDTO getRefundFinance(BillRefundMasterDTO obj, String callFrom,String fromDate,String toDate){
		
		return financeDao.getRefundFinance(obj,callFrom,fromDate,toDate);			
	}

	@Override
	@Transactional
	public Integer saveFinaceBankDetails(String callFrom, FinanceBankMaster obj) {
		
		return financeDao.saveFinaceBankDetails(callFrom,obj);		
	}

	@Override
	@Transactional
	public FinanceBankMaster fetchFinanceBankDetails() {
		
		return financeDao.fetchFinanceBankDetails();	
	}

	@Override
	@Transactional
	public List<RegTreBillDto> fetchPatientsRecords(int unitId,int userId,String fDate,String tDate,Integer deptId,Integer chargesSlaveId) {
		
		return financeDao.fetchPatientsRecords(unitId,userId,fDate,tDate,deptId,chargesSlaveId);	
	}

	@Override
	@Transactional
	public List<RegTreBillDto> fetchIpdPatientsRecords(int unitId, int userId,
			String fDate, String tDate,String callFrom) {
	
		return financeDao.fetchIpdPatientsRecords(unitId,userId,fDate,tDate,callFrom);	
	}

	@Override
	@Transactional
	public NotificationDTO fetchNotifications() {
		
		return financeDao.fetchNotifications();	
	}

	@Override
	@Transactional
	public NotificationDTO fetchFinalIpdBills() {
		
		return financeDao.fetchFinalIpdBills();	
	}

	@Override
	@Transactional
	public List<OpdDiagnoReportDTO> fetchOpdDiagnoPatients(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.fetchOpdDiagnoPatients(unitId,userId,fDate,tDate);	
	}

	@Override
	@Transactional
	public List<OpdDiagnoRecReportDTO> fetchOpdDiagnoRec(int unitId,
			int userId, String fDate, String tDate,int payMode, String callFrom) {
		
		return financeDao.fetchOpdDiagnoRec(unitId,userId,fDate,tDate,payMode,callFrom);	
	}
	
	@Override
	@Transactional
	public List<BillRegReportDTO> getBillRegisterReport(int unitId,
			int userId, String fDate, String tDate,int filterBy,int specialityId,int docId,int reasonId) {
		
		return financeDao.getBillRegisterReport(unitId,userId,fDate,tDate,filterBy,specialityId,docId,reasonId);	
	}
	
	@Override
	@Transactional
	public List<BillRegReportDTO> getOutstandingReport(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getOutstandingReport(unitId,userId,fDate,tDate);	
	}

	@Override
	@Transactional
	public List<RegTreBillDto2> getIpdBillStatus(int unitId, int userId,
			String fDate, String tDate) {
		
		return financeDao.getIpdBillStatus(unitId,userId,fDate,tDate);	
	}
	
	@Override
	@Transactional
	public List<RegTreBillDto> getIpdWaitingBill(int unitId, int userId,
			String fDate, String tDate) {
		
		return financeDao.getIpdWaitingBill(unitId,userId,fDate,tDate);	
	}
	
	@Override
	@Transactional
	public List<EhatBillReports> getHeadwiseReport(int unitId, int userId,
			String fDate, String tDate,int servId) {
		
		return financeDao.getHeadwiseReport(unitId,userId,fDate,tDate,servId);	
	}

	@Override
	@Transactional
	public List<BillRegReportDTO> getPatientTypeWiseIpdBill(int unitId,
			int userId, String fDate, String tDate,int source,int sponsorId,int sponsorF,int sponsorL) {
		
		return financeDao.getPatientTypeWiseIpdBill(unitId,userId,fDate,tDate,source,sponsorId,sponsorF,sponsorL);	
	}
	
	@Override
	@Transactional
	public List<BillRegReportDTO> getIpdBillDiscountRegister(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getIpdBillDiscountRegister(unitId,userId,fDate,tDate);	
	}

	@Override
	@Transactional
	public List<BillRegReportDTO> getBillEstimateReport(int unitId, int userId,
			String fDate, String tDate) {
		
		return financeDao.getBillEstimateReport(unitId,userId,fDate,tDate);
	}

	@Override
	@Transactional
	public List<GroupwiseProfeesDto> getGroupwiseProfees(int unitId, int userId,
			String fDate, String tDate,int groupId) {
		
		return financeDao.getGroupwiseProfees(unitId,userId,fDate,tDate,groupId);
	}
	
	@Override
	@Transactional
	public List<BillRegReportDTO> getPerformanceReport(int unitId, int userId,
			String fDate, String tDate) {
		
		return financeDao.getPerformanceReport(unitId,userId,fDate,tDate);
	}

	@Override
	@Transactional
	public double getPharmaReturn(Integer treatId) {
		return financeDao.getPharmaReturn(treatId);
	}

	@Override
	@Transactional
	public List<IpdBreakupReportDTO> getIpdBreakupReport(int unitId,
			int userId, String fDate, String tDate, String callFrom) {
		
		return financeDao.getIpdBreakupReport(unitId,userId,fDate,tDate,callFrom);
	}

	@Override
	@Transactional
	public List<OpdDiagnoReportBilllWiseDTO> fetchOpdDiagnoPatientsbillwise(
			int unitId, int userId, String fDate, String tDate) {
		// TODO Auto-generated method stub
		return financeDao.fetchOpdDiagnoPatientsbillwise(
				 unitId,  userId,  fDate,  tDate);
	}

	@Override
	@Transactional
	public List<BillHistoryDTO> getBillHistory(int unitId, int userId,
			String fDate, String tDate,int patId,int sponsorId) {
		// TODO Auto-generated method stub
		return financeDao.getBillHistory(unitId,userId,fDate,tDate,patId,sponsorId);
	}

	@Override
	@Transactional
	public List<TreatmentDto> getAllTreatments(int unitId,int userId,int patId,int sponsorIdd) {
		// TODO Auto-generated method stub
		return financeDao.getAllTreatments(unitId,userId,patId,sponsorIdd);
	}

	@Override
	@Transactional
	public List<TreatmentServiceDetails> getServDetails(int patId,int chargesSlaveId) {
		// TODO Auto-generated method stub
		return financeDao.getServDetails(patId,chargesSlaveId);
	}
	
	@Override
	@Transactional
	public Integer generateBillIdTreats(BillMasterAllTreat obj) {
		// TODO Auto-generated method stub
		return financeDao.generateBillIdTreats(obj);
	}

	@Override
	@Transactional
	public List<BillHistoryDTO> getGeneratedBillHistory(int unitId, int userId,
			String fDate, String tDate,int patId,int sponsorId) {
		// TODO Auto-generated method stub
		return financeDao.getGeneratedBillHistory(unitId,userId,fDate,tDate,patId,sponsorId);
	}
	
	@Override
	@Transactional
	public List<TreatmentDto> getBuildTreatments(int unitId,int userId,int patId,int sponsorIdd) {
		// TODO Auto-generated method stub
		return financeDao.getBuildTreatments(unitId,userId,patId,sponsorIdd);
	}

	//irfan khan 11-sep-2018 fetch servicewise report
	@Override
	@Transactional
	public List<BillDetailsDto> fetchServiceWiseReport(Date fromDate,
			Date toDate, int deptId, int serviceId, int subServiceId, int sponsorId,int unitId) {
		// TODO Auto-generated method stub
		return financeDao.fetchServiceWiseReport(fromDate,toDate,deptId,serviceId,subServiceId,sponsorId,unitId);
	}

	//irfan khan 14-sep-2018 fetch subServices
	@Override
	@Transactional
	public List<SubServiceDto> fetchSubServices(int serviceId) {
		return financeDao.fetchSubServices(serviceId);
	}

	//irfan khan 14-sep-2018 fetch subServices
	@Override
	@Transactional
	public List<SubServiceDto> fetchSubServices(String serviceId) {
		return financeDao.fetchSubServices(serviceId);
	}	
	
	@Override
	@Transactional
	public List<EhatViewPatientServiceDetailIpdDto> getIpdPatientServiceListFromView(
			BillReceiptMasterDTO obj) {
		
		return financeDao.getIpdPatientServiceListFromView(obj);		
	}
	
	@Override
	@Transactional
	public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBill(
			BillReceiptMasterDTO obj) {
		
		return financeDao.getPatientServiceBill(obj);		
	}

	@Override
	@Transactional
	public List<EhatViewPatientBedDetailsIpdDto> getPatientBedBill(
			BillReceiptMasterDTO obj) {
		
		return financeDao.getPatientBedBill(obj);		
	}

	@Override
	@Transactional
	public List<PharmacyDetailsOnBillingPrintDto> getPharmacyDetailsONBillingPrint(
			BillReceiptMasterDTO obj) {
		
		return financeDao.getPharmacyDetailsONBillingPrint(obj);		
	}

	@Override
	@Transactional
	public List<CommonadvDto> getCommonadv(BillReceiptMasterDTO obj) {
		
		return financeDao.getCommonadv(obj);		
	}

	@Override
	@Transactional
	public double getPharmaReturn(BillReceiptMasterDTO obj) {
		
		return financeDao.getPharmaReturn(obj);		
	}
	
	@Override
	@Transactional
	public BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj) {
		
		return financeDao.fetchAllReceiptTotals(obj);		
	}

	@Override
	@Transactional
	public List<EhatViewPatientSubServiceDetailsIpdDto> getPatientServiceBillPharmacyInvoice(
			BillReceiptMasterDTO obj) {
		
		return financeDao.getPatientServiceBillPharmacyInvoice(obj);		
	}

	@Override
	@Transactional
	public BillMasterAllTreat getBilledBillNo(BillReceiptMasterDTO obj) {
		
		return financeDao.getBilledBillNo(obj);		
	}
	
	@Override
	@Transactional
	public List<OpdDiagnoReportDTO> getOpdDeletedServiceBills(int unitId,
			int userId, String fDate, String tDate,Integer departmentId) {
		
		return financeDao.getOpdDeletedServiceBills(unitId,userId,fDate,tDate,departmentId);	
	}
	
	@Override
	@Transactional
	public List<OpdDiagnoReportDTO> getOpdRefundReport(int unitId,
			int userId, String fDate, String tDate, int departmentId) {
		
		return financeDao.getOpdRefundReport(unitId,userId,fDate,tDate,departmentId);	
	}
	
	@Override
	@Transactional
	public List<OpdDiagnoReportDTO> getOpdDiscountReport(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getOpdDiscountReport(unitId,userId,fDate,tDate);	
	}
	
	@Override
	@Transactional
	public DailyCollectionReportDto getDailyCollectionReport(BillReceiptMasterDTO obj,String callFrom,String fDate,String tDate) {
		
		return financeDao.getDailyCollectionReport(obj,callFrom,fDate,tDate);	
	}

	
	/*
	 * @Override
	 * 
	 * @Transactional public List<IpdBreakupReportDTO> getOTReport(int unitId, int
	 * userId, String fDate, String tDate, String callFrom,String opId,String
	 * opCat,String opSpecility,int searchBy) {
	 * 
	 * return financeDao.getOTReport(unitId,userId,fDate,tDate,callFrom,opId,opCat,
	 * opSpecility,searchBy); }
	 */

	@Override
	@Transactional
	public List<OpdReceiptReportDto> opdReceiptReport(Integer unitId, Integer userId, String fDate, String tDate, Integer payMode,
			String callFrom) {
		// TODO Auto-generated method stub
		return financeDao.opdReceiptReport(unitId, userId, fDate, tDate, payMode, callFrom);
	}

	@Override
	@Transactional
	public DailyCollectionReportDto getDailyCollectionReportForMeesha(BillReceiptMasterDTO obj, String callFrom,
			String fDate, String tDate) {
		// TODO Auto-generated method stub
		return financeDao.getDailyCollectionReportForMeesha(obj, callFrom, fDate, tDate);
	}

	@Override
	@Transactional
	public List<OpdAppSchedReportDto> fetchOpdAppSchePatient(String fromDate,
			String toDate, String appt_type_id) {
		
		return financeDao.fetchOpdAppSchePatient(fromDate,toDate,appt_type_id);
	}
	
	@Override
	@Transactional
	public List<IpdBillRefundReportDto> getIpdRefundReport(IpdBillRefundReportDto obj, String fromDate, String toDate) {
		
		return financeDao.getIpdRefundReport(obj,fromDate,toDate);
	}
	
	@Override
	@Transactional
	public List<IpdDeletedReportDto> fetchIpdRec(Integer unitId, Integer userId, String fromDate, String toDate,
			Integer payMode, String callFrom) {
		
		return financeDao.fetchIpdRec(unitId,userId,fromDate,toDate,payMode,callFrom);
	}

	@Override
	@Transactional
	public DischargeDeathPatientDto searchDischargeDeathPatientList(String type, String fromdate, String todate) {
		
		return financeDao.searchDischargeDeathPatientList(type, fromdate, todate);
	}
	@Override
	@Transactional
	public DailyCollectionReportDto getDailyCollectionReportNew(BillReceiptMasterDTO obj,String callFrom,String fDate,String tDate) {
		
		return financeDao.getDailyCollectionReportNew(obj,callFrom,fDate,tDate);	
	}
	
	
	@Override
	@Transactional
	public String getBusinessReport(int unitId, int userId,
			String fDate, String tDate) {
		
		return financeDao.getBusinessReport(unitId,userId,fDate,tDate);	
	}

	@Override
	public List<ServiceWiseReportDTO> fetchServiceWiseHeadReport(Date fromDate, Date toDate, Integer unitId,
			String serviceId,String deptId,String checkType,String subServiceId,String mutlischemeIds,String multiSchemeChild,String isPackage) {
		// TODO Auto-generated method stub
		return financeDao.fetchServiceWiseHeadReport(fromDate, toDate, unitId, serviceId, deptId, checkType, subServiceId,mutlischemeIds,multiSchemeChild,isPackage);
	}
	
	@Override
	public List<ServiceWiseBusinessReportDTO> fetchServiceWiseHeadReport2(Date fromDate, Date toDate, Integer unitId,
			String serviceId,String deptId,String checkType,String subserviceId,String mutlischemeIds,String multiSchemeChild
			,String type,String isPackage) {
		// TODO Auto-generated method stub
		return financeDao.fetchServiceWiseHeadReport2(fromDate, toDate, unitId, serviceId, deptId, checkType,subserviceId,
				mutlischemeIds,multiSchemeChild,type,isPackage);
	}

	@Override
	@Transactional
	public List<IpdBillRefundMasterDTO> getIpdDeletedRefundData(Integer unitId, Integer userId, String fromDate,
			String toDate,Integer paymode, String callFrom) {
		// TODO Auto-generated method stub
		return financeDao.getIpdDeletedRefundData(unitId,userId,fromDate,toDate,paymode,callFrom);
	}

	@Override
	public List<OPDMonthlyReportDTO> getMonthlyOPDReport(String fromYear, String fromMonth) {
		// TODO Auto-generated method stub
		return financeDao.getMonthlyOPDReport(fromYear, fromMonth);
	}

	@Override
	@Transactional
	public List<SubServiceDto> fetchMultipleSubservices(String serviceId) {
		// TODO Auto-generated method stub
		return financeDao.fetchMultipleSubservices(serviceId);
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> getChragesSlaveList(String masterId, String name,Integer selfId) {
		// TODO Auto-generated method stub
		return financeDao.getChragesSlaveList(masterId, name,selfId);
	}

	@Override
	public List<LabBusinessReportDTO> fetchLabBusinessReport(String fromDate, String toDate, String organizationIds,
			String duesType, Integer unitId,String labType,String custType) {
		// TODO Auto-generated method stub
		return financeDao.fetchLabBusinessReport(fromDate, toDate, organizationIds, duesType, unitId,labType,custType);
	}
	
	
	@Override
	@Transactional
	public List<OtFinanceReportDTO> getOTReport(Integer unitId, Integer userId, String fromDate, String toDate,
			String callFrom, String opId, int opCat, String opSpecility, Integer searchBy, int doctorId,
			int theaterId, int anesthetistId) {
		return financeDao.getOTReport(unitId,userId,fromDate,toDate,callFrom,opId,opCat,opSpecility,searchBy,doctorId,theaterId,anesthetistId);
	}
	
	@Override
	@Transactional
	public List<Doctor> getAnesthetistList() {
		return financeDao.getAnesthetistList();
	}

	@Override
	@Transactional
	public FinanceBankMaster editBankMaster(Integer Id) {
				
		return financeDao.editBankMaster(Id);
	}

	@Override
	@Transactional
	public boolean deleteBankMaster(Integer Id) {
		
		return financeDao.deleteBankMaster(Id);
	}

}
