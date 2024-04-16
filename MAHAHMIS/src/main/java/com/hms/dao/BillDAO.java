package com.hms.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import com.hms.constants.PackageTable;
import com.hms.constants.TableName;
import com.hms.dto.AdminChargeDTO;
import com.hms.dto.CommonAdvanceDTO;
import com.hms.dto.DischargeSummery;
import com.hms.dto.Doctor;
import com.hms.dto.HallType;
import com.hms.dto.IPDDiscount;
import com.hms.dto.BillAdvAmt;
import com.hms.dto.BillComponentSample;
import com.hms.dto.BillMaster;
import com.hms.dto.IpdBillParticular;
import com.hms.dto.MLCDetail;
import com.hms.dto.MedClinicInvoice;
import com.hms.dto.OPDReceiptComponant;
import com.hms.dto.OPDReceiptMaster;
import com.hms.dto.OpdBillParticular;
import com.hms.dto.Operation;
import com.hms.dto.OperationChargehallwise;
import com.hms.dto.OperationTypeTbl;
import com.hms.dto.PackageManager;
import com.hms.dto.PaediatricDeptNICU;
import com.hms.dto.Patient;
import com.hms.dto.Treatment;
import com.hms.dto.TreatmentBeds;

@Transactional
public interface BillDAO {
	/********
	 * Function to fetch top 15 patient and patient by id or name
	 * 
	 * @param searchOn2
	 * @param billType
	 * @param to
	 * @param discountId
	 ***********/
	List fetchSearchpatTop(String searchBy, String strValue, String from,
			String to, String billType, String searchOn, String discountId);

	/********
	 * Function to fetch patient bill
	 * 
	 * @param ti
	 * @param pi
	 * @param specialDisc
	 * @param searchtype
	 *************/

	boolean fetchOperationBill(String tid, String todays_date,
			Operation objoperation, String totalBill, String user,
			String bstring, String txtRecNo);

	boolean SaveIPDPatientBill(String tid, String todays_date,
			BillComponentSample objbcs, String totalBill, String user,
			String bstring, String txtRecNo, BillAdvAmt objBillAdvAmt,
			String ipdAMDetailString);

	List fetchPatOPDBill(String pi, String ti);

	List SetSpecialDiscount();

	int saveOperationPay(String treatmentId, BillMaster objBillMaster,
			String billtype, Integer did, String billPrintType);

	List getDiscountIPD(String discdocId, String testId, String discId,
			String pi, String ti, String billtype);

	String closeTreatment(int treatmentID, String billFor,
			String convertToIPdFlag, String billPrintType, String remainAmount,
			String finalPayable, String finalAdvancePaid, String finaltotal, String finalDiscount, String pharmaAdvancePaid, String ipdBedCharges, int userid, String finalBillTotal, String narra, String finalAdminChrgs, String finalAdminChrgsType, String finalServiceTax, String finalBillCategoryDiscount);

	List<BillAdvAmt> fetchIPDAdvancedPayment(int treat_id);

	boolean deleteIPDAdvancedPayment(BillAdvAmt objBillAdvAmt);

	List GetIPDBillHeaders(String spDisId, String hallId, String treatId);

	List fetchHeaderIPDBill(String pi, String ti, String specialDisc,
			String searchtype);
	int physicalDischargeToPatient(DischargeSummery objds,
			PaediatricDeptNICU objpdn,String notes);

	boolean SaveIPDHeaderBill(BillComponentSample objbcs, String ipdBillId,
			BillAdvAmt objBillAdvAmt, String ipdAMDetailString,
			String specialDisc, String bltype, String tStartDate,
			String tEndDate);

	int SaveopdBillDetails(String tid, String billdate, String txtPayable,
			String txtTotal,String txtNarration, String txtDiscount,String txtPercentageDiscount, String opdBillId,
			String seltowards, BillComponentSample objbcs,
			OPDReceiptMaster objOPDrm, String callFrom, Double amount,
			String reason, int userid, String bltype, String remVal,
			int ReceiptNo, String commonAdvance_flag,String testlist,String totalbillAmount,String gpid,String testType, String ipAddress);

	int GetBillId();

	List<Patient> fetchPrevOPDBillPat(String type, String searchBy, String value);

	List<Treatment> fetchOPDBillPat(String type, String ID);

	List<Patient> fetchPrevTreatmentUtil(String type, String Pid ,String PName);

	List<Patient> fetchPatInfoUtil(String PID, String TID);

	List<Patient> fetchCloseTreatPatUtil(String PID);

	List fetchOPDbillByBillID(String billID, String billType);

	List<Patient> prevOPDBillPatSearch(String searchBy, String strValue,
			String type);

	List<BillComponentSample> featchCarpoAccBillofPat(String bmId);

	List<Patient> featchPrevIPDBillPat(String byName, String value,
			String billType, String billId);

	// husen
	List<BillComponentSample> fetchDoctorCharges(String byName, String value,
			String billType, String billId, String timeDR);

	List<Patient> featchIPDBillPat(String byName, String value,
			String billType, String billId);

	int saveAdvanceReceipt(BillAdvAmt objAdvAmt, OPDReceiptMaster objOPDrm,
			String queryType, String selected, int userid,
			Float remainingAmount, Float finalPayable, Float finalAdvancePaid, Float finaltotal, 
			Float finalDiscount, Float pharmaAdvancePaid, String commonAdvance_flag, 
			Float finalBillTotal, Float outstanding, String ipAddress);

	List<BillComponentSample> featchPreIPDBillofPat(String bmId, String tid);

	int getReceiptNoForOPD(String billType);

	List<OPDReceiptMaster> getOPDReceiptMaster(String byBillID,
			String callFrom, String type);

	List<OPDReceiptComponant> getOPDReceiptComponant(String billID,
			String receiptID, String callFrom, String billType);

	List<MedClinicInvoice> featchMedInvoiceforPat(String trid);

	boolean saveGrpCatWiseProCharge(MedClinicInvoice objMedClinicInvoice);

	boolean deleteMedBillRec(String allVals);

	List getIPDBillForCorporateAccount(String pi, String ti,
			String specialDisc, String searchtype);

	/**
	 * API to fetch OPD bill for Corporate Accounts
	 * 
	 * @param pi
	 * @param ti
	 * @param spdicID
	 * **/

	List getPatOPDBillForCorporateAccount(String pi, String ti, String spdicID);

	/**
	 * API to fetch Diagnosis Bill
	 * 
	 * @param pi
	 * @param ti
	 * **/

	List fetchPatOPDBillForDiagnosis(String pi, String ti);

	boolean deleteIpdBillingTests(String ipdBillslaveIds);

	boolean deleteIpdBillingPhysiotherapyTests(String ipdBillslaveIds);

	boolean deleteIpdBillingPathologyTests(String ipdBillslaveIds);

	boolean deleteIpdBillingConsumable(String ipdBillslaveIds);

	boolean deleteIpdBillingGasAndMonitor(String ipdBillslaveIds);

	boolean deleteIpdBillingBedSideProcedure(String ipdBillslaveIds);

	boolean deleteIpdBillingInstAndEquip(String ipdBillslaveIds);

	boolean deleteIpdBillingDoctorRound(String ipdBillslaveIds);

	boolean deleteIpdBillingPharmacyInvoice(String ipdBillslaveIds);

	List<OperationChargehallwise> featchIpdBillOperationCharges(String ti,
			String operationId);

	boolean deleteIpdBillingOperation(String ipdBillslaveIds);

	boolean deleteIpdBillingOperationTheater(String ipdBillslaveIds);

	boolean deleteIpdBillingSurgeryConsumable(String ipdBillslaveIds);

	int generateInvoiceNo(String treatmentId);

	boolean deleteIpdBillingSurgeryServices(String ipdBillslaveIds);

	boolean saveIpdBillParticular(IpdBillParticular objIpdBillParticular);

	boolean saveOpdBillParticular(OpdBillParticular objOpdBillParticular,
			String billType, String querytype);

	boolean UpdateConsumbaleOpdBillParticular(
			OpdBillParticular objOpdBillParticular, String billType,
			String querytype);

	/* List<OpdBillParticular> FetchOpdBillElements(); */

	boolean editIpdBillParticular(IpdBillParticular objIpdBillParticular);

	boolean deleteOpdBillParticular(String treatId, String itemId,
			String particularName, String testType, String billType,
			String test_opd_bill_id);

	boolean DeleteOpdBillConsumable(OpdBillParticular opdBillParticular);

	boolean saveEditIPDDiscount(IPDDiscount objIPDDiscount,double totalAmount,String ipAddress);

	boolean deleteIPDDiscount(IPDDiscount objIPDDiscount);

	boolean deleteReceipt(String idDeleteIPDReceipt, String deleteReceiptReason);

	boolean deletePerticular(BillComponentSample objBillComponentSample, int userid);

	List<OpdBillParticular> FetchOpdBillElements();

	List<OPDReceiptComponant> fetchReceiptComponent(String recId,
			String billType,String gid,String ttype);

	boolean updateOperationBillCharges(Operation objOperation,
			Integer ipdBillId, Integer ipdBillOpSlaveId);

	List<OPDReceiptMaster> getPrevAmt(String treatId, String callFrom);

	boolean saveRefundReceiptDetails(OPDReceiptMaster opdReceiptMaster,
			String treatId, String callfrom, int userid, String ipAddress);

	List<OPDReceiptMaster> fetchRefundReceiptDetails(String treatId,
			String callfrom);

	boolean deleteRefundReceiptDetails(String[] refundReceiptDetailsIDArray);

	List<OPDReceiptComponant> fetchReceiptComponentByOpdBillId(
			String opdBillId, String billType);

	boolean saveIPDDoctorDiscount(IPDDiscount objIPDDiscount,String ipAddress);

	// PackgeManager tab insert method
	public int insertPackageDetails(PackageManager objPackages);

	public Integer getNextId(PackageTable packageMaster);

	// Fecthing PackageMaster List
	List<PackageManager> fetchPackageMaster(String searhFlag, String searchText);

	// Deleting Package Master
	boolean deletePackageMaster(int packageId);

	List<PackageManager> searchPackage(String strValue);
	/*****************admin charges**@husenbadshah************************/
	boolean updateAdminCharges(String adminCharge,String ChrgType,String narrration,String patID,String tretID);
	List<AdminChargeDTO> getAdminCharges(String pid, String tid);
	/*****************update Discharge Date**@husenbadshah***********/
	boolean updateDischargeDate(String txtIddischargeDate,String discharge_Time, String narrration,String patID,String tretID);
	List<AdminChargeDTO> getPatientDischargeDate(String pid, String tid);

	List fetchPreviousBillingHistoryByPid(int pid);

	List getPackageForHallUtil(int hallTypeSelectID);

	void daemonProcessCloseTreatment();
	
	public List<MLCDetail> getMLCdetailsForPatient(int treatmentID);

	List fetchIPDSecurityDepositDetails(int treat_id);

	boolean refundSecurityDepositToPatient(String bill_id, String master_id,
			float refundamount, int userid);

	boolean convertSecurityDepositToAdvance(String bill_id, String master_id,
			String slave_id, int userid);

	boolean convertAdvanceInSecurityDeposit(String bill_id, String master_id,
			String slave_id, int userid);

	boolean saveCommonAdvanceAmount(CommonAdvanceDTO objCommonAdvanceDTO, String commonAd_querytype);

	CommonAdvanceDTO fetchCommonAdvanceDetails(
			CommonAdvanceDTO objCommonAdvanceDTO);

	CommonAdvanceDTO postCommonAdvanceDetails(int common_slave_id);

	int convertToGeneralBill(int trid, String finaltotal, String finalDiscount,
			String finalPayable, String finalAdvancePaid, String remainAmount);
	
	/*****************update Admission Date**@AmrutPatil***********/
	int updateAdmissionDate(String patID,String tretID,String admissnDate,String admisntime);


	int sendToLabFromOPDBill(String tid, String pid, String testlist,String totalbillAmount);

	String checkForLabBillBeforCloaseTreatment(String tid);

	boolean CheckPasswordOfAdmin(String password);

	int payPreviousPendingAmountAndPrintReceipt(
			OPDReceiptMaster objOPDReceiptMaster, int userid, String commonAdvanceFlag, String previousPendingType);

	OPDReceiptMaster getPendingAmountReceiptDetails(int treatid,
			String billtype, int receipt_Id);

	double checkPreviousRefundOnSameReceipt(OPDReceiptMaster opdReceiptMaster,
			String treatId, String callfrom);

	int saveBillMasterDetails(int treat_id, Float finalBillTotal, Float finaltotal,
			Float finalPayable, Float finalDiscount, Float finalAdvancePaid,
			Float pharmaAdvancePaid, Float refund, Float outstanding);

	CommonAdvanceDTO printCommonAdvanceRec(int common_slave_id);

	int saveBedEditDetailsFromBilling(TreatmentBeds objTreatmentBeds,
			String isolation, int userId);

	int GetBillCount(int bill_id);

	int SaveopdBillDetailsDiagnosis(String tid, String billdate,
			String txtPayable, String txtTotal, String txtNarration,
			String txtDiscount, String txtPercentageDiscount, String opdBillId,
			String seltowards, BillComponentSample objbcs,
			OPDReceiptMaster objOPDrm, String callFrom, Double amount,
			String reason, int userid, String billType, String remVal,
			int ReceiptNo, String commonAdvance_flag, String testlist,
			String totalbillAmount, String gpid, String testType, String ipAddress);
	
	List<HallType> FetchHallTypeForCostEstimation(Integer corporateId);
	
	List<HallType> FetchHallNameForCostEstimation(Integer corporateId);
	
	List<HallType> FetchOperationNameForCostEstimation(Integer corporateId);

	public List<String> fetchDoctorChargeForCostEstimation(int idHallType,int idHallName,
			int idParticulars ,String serviceHeadingType,int corporateId);
	
	public List<Operation>  fetchOperationChargeForCostEstimation(int idHallType,
			int idOpertionName ,int corporateId);

	public String AdminChargesForCostEstimation(String totalCostEstimation ,int corporateId);

	public String ServiceChargesForCostEstimation(String totalCostEstimation,int corporateId);

	public List<Patient> showHospitalDiscountApproval(String searchOn, String searchBy, String value);

	int ApprovedDiscountForIPD(String discountValue, String ipdBill_discount ,String onclickButton ,String discountNarration,String ipaddress ,int userId, String discountType);

	public List<Patient> showSurgeonDiscountApproval(String searchOn, String searchBy, String value);

	double checkTotalPreviousRefundOnSameReceipt(
			OPDReceiptMaster opdReceiptMaster, String treatId, String callfrom);

	float fetchTotalRefundOnReceipt(String receiptId, String billType);
}
