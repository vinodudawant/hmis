package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.FinanceDaoMeesha;
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
import com.hms.ehat.service.FinanceServiceMeesha;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;

@Service
public class FinanceServiceMeeshaImpl implements FinanceServiceMeesha {

	@Autowired
	FinanceDaoMeesha financeDao;
	
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
	public List<RegTreBillDto> fetchPatientsRecords(int unitId,int userId,String fDate,String tDate,Integer deptId) {
		
		return financeDao.fetchPatientsRecords(unitId,userId,fDate,tDate,deptId);	
	}

	@Override
	@Transactional
	public List<RegTreBillDto> fetchIpdPatientsRecords(int unitId, int userId,
			String fDate, String tDate) {
	
		return financeDao.fetchIpdPatientsRecords(unitId,userId,fDate,tDate);	
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
	public List<OpdDiagnoReportMeeshaDTO> fetchOpdDiagnoPatients(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.fetchOpdDiagnoPatients(unitId,userId,fDate,tDate);	
	}

	@Override
	@Transactional
	public List<OpdDiagnoRecReportMeeshaDTO> fetchOpdDiagnoRec(int unitId,
			int userId, String fDate, String tDate,int payMode, String callFrom) {
		
		return financeDao.fetchOpdDiagnoRec(unitId,userId,fDate,tDate,payMode,callFrom);	
	}
	
	@Override
	@Transactional
	public List<BillRegReportMeeshaDTO> getBillRegisterReport(int unitId,
			int userId, String fDate, String tDate,int source,int sponsorId,int sponsorF,int sponsorL) {
		
		return financeDao.getBillRegisterReport(unitId,userId,fDate,tDate,source,sponsorId,sponsorF,sponsorL);	
	}
	
	@Override
	@Transactional
	public List<BillRegReportMeeshaDTO> getOutstandingReport(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getOutstandingReport(unitId,userId,fDate,tDate);	
	}

	@Override
	@Transactional
	public List<RegTreBillDto> getIpdBillStatus(int unitId, int userId,
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
	public List<BillRegReportMeeshaDTO> getPatientTypeWiseIpdBill(int unitId,
			int userId, String fDate, String tDate,int source,int sponsorId,int sponsorF,int sponsorL) {
		
		return financeDao.getPatientTypeWiseIpdBill(unitId,userId,fDate,tDate,source,sponsorId,sponsorF,sponsorL);	
	}
	
	@Override
	@Transactional
	public List<BillRegReportMeeshaDTO> getIpdBillDiscountRegister(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getIpdBillDiscountRegister(unitId,userId,fDate,tDate);	
	}

	@Override
	@Transactional
	public List<BillRegReportMeeshaDTO> getBillEstimateReport(int unitId, int userId,
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
	public List<BillRegReportMeeshaDTO> getPerformanceReport(int unitId, int userId,
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
			int userId, String fDate, String tDate) {
		
		return financeDao.getIpdBreakupReport(unitId,userId,fDate,tDate);
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
			Date toDate, int deptId, int serviceId, int subServiceId, int sponsorId) {
		// TODO Auto-generated method stub
		return financeDao.fetchServiceWiseReport(fromDate,toDate,deptId,serviceId,subServiceId,sponsorId);
	}

	//irfan khan 14-sep-2018 fetch subServices
	@Override
	@Transactional
	public List<SubServiceDto> fetchSubServices(int serviceId) {
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
	public List<OpdDiagnoReportMeeshaDTO> getOpdDeletedServiceBills(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getOpdDeletedServiceBills(unitId,userId,fDate,tDate);	
	}
	
	@Override
	@Transactional
	public List<OpdDiagnoReportMeeshaDTO> getOpdRefundReport(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getOpdRefundReport(unitId,userId,fDate,tDate);	
	}
	
	@Override
	@Transactional
	public List<OpdDiagnoReportMeeshaDTO> getOpdDiscountReport(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getOpdDiscountReport(unitId,userId,fDate,tDate);	
	}
	
	@Override
	@Transactional
	public List<OpdDiagnoReportMeeshaDTO> getPackageReport(int unitId,
			int userId, String fDate, String tDate) {
		
		return financeDao.getPackageReport(unitId,userId,fDate,tDate);	
	}
}
