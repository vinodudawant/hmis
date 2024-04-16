package com.hms.pharmacy.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.hms.dto.DistrictwisePatientCountDTO;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorList;
import com.hms.dto.Users;
import com.hms.ehat.dto.WardWiseDetaisDto;
import com.hms.pharmacy.pojo.CashReceiptReport;
import com.hms.pharmacy.pojo.ChequePaidReceiptReport;
import com.hms.pharmacy.pojo.ChequeReceiptReport;
import com.hms.pharmacy.pojo.CreditNoteDetailsReportDTO;
import com.hms.pharmacy.pojo.DebitNoteData;
import com.hms.pharmacy.pojo.MrnReportDetail;
import com.hms.pharmacy.pojo.PaidReceiptReport;
import com.hms.pharmacy.pojo.PartyWiseDbNoteReport;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportDebitNote;
import com.hms.pharmacy.pojo.ReportExpiry;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportList;
import com.hms.pharmacy.pojo.ReportMIS;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.ReportStock;
import com.hms.pharmacy.pojo.ReportStock2;
import com.hms.pharmacy.pojo.ReportVat;
import com.hms.pharmacy.pojo.VendorMaster;

public interface ReportService {

	List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(String from,String to, String type);
	
	List<ReportProductWiseBatchSale> getPartyWiseProductSaleListStorewise(String string, String type,String storeName);

	List<ReportProductWiseBatchSale> getTotalSaleData(String from,
			String to, String type);
	
	List<ReportProductWiseBatchSale> getTotalCounterSaleDataWithPurchaseRate(String from,
			String to, String type);

	List<ReportStock> getProductWiseStock(String type);

	List<ReportStock> getCompanyWiseStock();

	List<ReportStock> getCompanyWiseStockByCompanyId(Integer companyId);

	List<ReportStock> getShelfWiseStock();

	List<ReportStock> getShelfWiseStockByShelfId(Integer shelfId);

	List<ReportStock> getCategoryWiseStock();

	List<ReportStock> getCategoryWiseStockByCategoryId(Integer categoryId);

	List<ReportPurchase> getProductWisePurchase(String from, String to, String productId);

	List<ReportPurchase> getBatchWisePurchase(String from, String to,
			String productId);

	List<ReportPurchase> getBatchWisePurchaseByBatchId(String string,
			String string2, String batchId);

	List<ReportPurchase> getNewProductWisePurchase(String string, String string2);

	List<ReportPurchase> getNewProductByIdWisePurchase(String from,
			String to, String productId);

	List<ReportPurchase> getPartyWisePurchase(String from, String to,
			String productId);
	
	List<ReportPurchase> getPartyWisePurchaseTotalBill(String from, String to);


	List<ReportPurchase> getPartyWisePurchaseByPartyId(String from,
			String to, String vendorId, String productId);
	
	List<ReportPurchase> getPartyWisePurchaseTotalBillAmt(String from,
			String to);

	List<ReportPurchase> getCategoryWisePurchase(String from, String to,
			String productId);

	List<ReportPurchase> getCategoryWisePurchaseByCatId(String from,
			String to, String productId, String categoryId);

	List<ReportPurchase> getCompanyWisePurchase(String from, String to);

	List<ReportPurchase> getCompanyWisePurchaseByCompanyId(String from,
			String to, String companyId);

	List<PendingBill> getPendingBills(String from, String to);

	List<ReportPurchase> getPurchaseDiscount(String string, String string2);

	List<ReportMIS> getDailyBusinessReport(String string, String string2);

	List<ReportExpiry> getNearExpiryReport(String fromResult, String toResult,String callform,Integer compId,Integer shelfId);

	List<ReportProductWiseBatchSale> getFifthCounterDailySaleData(
			String from, String type);

	List<ReportProductWiseBatchSale> getTotalSaleDataForFifthCounter(
			String string, String string2, String string3);

	List<ReportPurchase> getDayWisePurchase(String from, String to,String callform);

	List<ReportProductWiseBatchSale> patientwiseProductList(Integer patientId,
			String from, String to, String type);

	List<ReportProductWiseBatchSale> getTotalSchH1CounterSaleData(
			String from, String to, String string3);

	List<ReportProductWiseBatchSale> getCategoryWiseSale(String from,
			String to);

	List<ReportProductWiseBatchSale> getCategoryWiseSaleData(String from,
			String to, String total, String catId);

	List<ReportStock> getProductWiseStockByProductId(Integer productId);

	List<ReportStock> getProductWiseStockByDrugId(Integer drugId);

	List<ReportStock> getStockOutData(String string, String string2, String string3);

	List<ReportPurchase> getDeletedPurchase();

	List<ReportExpiry> getNearCompanyWiseExpiryReport(String finalFromResult,
			String toResult, int companyId);

	List<ReportExpiry> getShelfWiseBatchExpData(String finalFromResult,
			String toResult, int shelfId);

	List<ReportVat> getMonthWiseVatPurchase(String string, String string2);

	List<ReportVat> getDateWiseVatPurchase(String from, String to);

	List<ReportVat> getPartyWiseVatPurchase(String from, String to);

	List<ReportVat> getVouWiseVatPurchase(String from, String to);

	List<ReportPurchase> getDeletedChequeReceiptReport();

	List<ChequeReceiptReport> getChequeReceiptReport(int unitId,String string, String string2);

	List<ReportPurchase> getDeletedChequePaidReport();

	List<ReportPurchase> getDeletedCashPaidReport();

	List<PaidReceiptReport> getCashPaidReport(int unitId,String string, String string2);

	List<ReportProductWiseBatchSale> patientSaleDoctorwise(Integer doctorId,
			String string, String string2);

	List<ReportProductWiseBatchSale> patientwiseVouList(Integer patientId,
			String string, String string2);

	List<ChequePaidReceiptReport> getChequePaidReport(int unitId,String string, String string2);

	List<CashReceiptReport> getCashReceiptReport(int unitId,String from, String to);

	List<ReportPurchase> getDeletedCashReceiptReport();

	List<ReportProductWiseBatchSale> getDebitNoteData(Integer vendorId,
			String string, String string2, String string3, String totalAmt);

	List<ReportProductWiseBatchSale> getTotalSaleDeletedData(String string
			);
	
	List<ReportProductWiseBatchSale> getCreditNoteData(
			String string, String string2);

	List<DebitNoteData> getDebitNoteData(int initId,String string,
			String string2);
	
	List<ReportProductWiseBatchSale> getPatientwiseBillAmt(String from,
			String to);
	
	List<ReportProductWiseBatchSale> getTotalPatientData(String from,
			String to);
	
	List<ProductMaster> getProducts();
	
	List<ReportProductWiseBatchSale> getDataOfPurchaseByProductId(Integer productId,
			String string, String string2);
	
	List<ReportProductWiseBatchSale> getDataOfCounterByProductId(Integer productId,
			String string, String string2);
	
	List<ReportProductWiseBatchSale> getDataOfPatientByProductId(Integer productId,
			String string, String string2);
	
	List<ReportProductWiseBatchSale> getDataOfIndentByProductId(Integer productId,
			String string, String string2);
	
	List<ReportProductWiseBatchSale> getDataOfCreditByProductId(Integer productId,
			String string, String string2);
	
	List<ReportProductWiseBatchSale> getDataOfDebitByProductId(Integer productId,
			String string, String string2);
	
	List<ReportProductWiseBatchSale> getDataOfAllItemLadgerProductId(Integer productId,
			String string, String string2,String type);

	List<ReportProductWiseBatchSale> getDailyUserWiseSaleData(String from,
			String type, String userId);

	List<ReportCreditNoteDetails> getCreditNoteDetailsByTreatId(
			Integer treatId, String from, String to);

	JSONArray getTreatmentDetailsByPatientId(Integer patientId);

	List<PendingBill> getPartywiseLedgerList(Integer vendorId, String string,
			String string2);
	
	List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(Integer patientId,
			String from, String to);
	
	List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(Integer patientId,
			String from, String to);
	
	List<ReportCreditNoteDetails> getSettleBillDetailsByPatientId(Integer patientId,
			String from, String to);
	
	List<ReportCreditNoteDetails> getIndentSettleBillByPatientId(Integer patientId,
			String from, String to);
	
	List<ReportIndentSaleDetails> getCreditNoteDetailsByPatientId(Integer patientId,
			String from, String to);
	
	List<PendingBill> getCashPaidForPartywiseLedgerList(Integer vendorId, String string,
			String string2);
	
	List<PendingBill> getChequePaidForPartywiseLedgerList(Integer vendorId, String string,
			String string2);
	
	List<PendingBill> getDebitNoteEntryList(Integer vendorId, String string,
			String string2);
	
	List<ReportProductWiseBatchSale> getDataOfOpeningStockByProductId(Integer productId,
			String string, String string2);
	

	List<ReportCreditNoteDetails> getAllCreditNoteDetails(String from,
			String to);
	
	List<ReportProductWiseBatchSale> getDataOfMrnByProductId(Integer productId,
			String string, String string2);
	
	Double getTotalOpeningStockByPatientId(Integer treatmentId,String string, String string2);
	
	JSONArray getStockDetails();

	List<ReportProductWiseBatchSale> getDailyStockWiseSaleData(String storeId);
	
	List<ReportProductWiseBatchSale> getTotalSchXCounterSaleData(
			String from, String to, String string3);
	
	List<ReportProductWiseBatchSale> getTotalSchNDPSCounterSaleData(
			String from, String to, String string3);
	
	List<ReportProductWiseBatchSale> getTotalSchNRXCounterSaleData(
			String from, String to, String string3);
	
	List<ReportProductWiseBatchSale> getCancelIndentDetails(String from,
			String to);

	List<ReportProductWiseBatchSale> getCategoryWiseReportPage(String from, String to);

	List<ReportCreditNoteDetails> getCreditNoteDetailsByCat(String from, String to);

	List<ReportPurchase> getProductWiseSale(String from, String to,
			String productId);

	List<ReportPurchase> getProductWiseCredit(String from, String to,
			String productId);

	List<ReportPurchase> getProductWisePurchaseReturn(String from, String to, String productId);

	List<ReportPurchase> getOpeningStock(String from, String productId);
	
	List<ReportVat> getHsnWiseGSTPurchase(String string, String string2);

	List<ReportStock> getStockBatchWise();

	List<ReportPurchase> getDayWiseDispatchGRN(String fromReult, String toReult,
			String dispatchFlag, int vendorId);

	List<ReportPurchase> getProductWisePurchaseandVendor(String string,
			String string2, String productId, String vendorId, String unitId);

	List<VendorMaster> getSupplierListReport(String fromDate, String toDate);

	List<ProductMaster> getproductData(String fromDate, String toDate, int categoryId, int companyId, int productId);

	List<ReportPurchase> getpurchaseData(HttpServletRequest request, String fromDate,
			String toDate, int categoryId, int companyId, int productId,
			int vendortId, int unitId, String purtranstype);

	List<ReportPurchase> getpurchaseOrderData(HttpServletRequest request,
			String fromDate, String toDate, int vendortId, int unitId);

	List<ReportProductWiseBatchSale> getAllSaleReportWithGST(HttpServletRequest request,
			String fromDate, String toDate, int ProductId, int unitId,
			String type, int patientId);

	List<ReportPurchase> getpurchaselistwithsaleval(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype);

	List<WardWiseDetaisDto> getWardwiseCollection(String from, String to);

	List<PatientSaleBillMaster> getPharmacyPatientWiseSaleReport(String from, String to);

	List<ReportStock> getitemwisemnfsalestockreport(
			HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int unitId, int productId);

	List<ReportPurchase> getpurchasetaxData(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype);

	List<ReportPurchase> getpurreg(HttpServletRequest request, String fromDate,
			String toDate, int categoryId, int companyId, int productId,
			int vendortId, int unitId, String purtranstype);

	List<ReportDebitNote> getpurreturn(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype);


	List<ReportProductWiseBatchSale> getsaletaxData(HttpServletRequest request,
			String fromDate, String toDate, int productId, int unitId,
			String type, int patientId);

	List<ReportProductWiseBatchSale> getAllSaleRegisterReport(
			HttpServletRequest request, String fromDate, String toDate,
			int productId, int unitId, String type, int patientId);

	List<ReportExpiry> getDateWiseStock(String fromDate, int productId);

	List<ReportPurchase> getpurchaseRetrunData(HttpServletRequest request,
			String fromDate, String toDate);

	List<ReportPurchase> getGRNReportdata(String from, String to);

	List<ReportPurchase> getPartyWisePurchaseByPartyIddetail(String string,
			String string2, String vendorId, String productId);
	
	/************
	 *@author	: Ajay Khandare
	 *@date		:  06-feb-2019
	 *@code		:get bill wise report
	 ***********/


	
	List<PatientSaleBillSlave> billwiseSaleReportList(Integer patientId,Integer userId,Integer doctorId,String saletype,String from,String to);
	

	List<PatientSaleBillSlave> billwiseSaleReportReturnList(Integer patientId,Integer userId,String saletype,String from,String to);
	
	
	List<Users> fetchuser(String patiename, String callfrom);
	
	List<DoctorList> fetchDoctor(String doctorname, String callfrom);
	
	//jitendra
	List<DistrictwisePatientCountDTO> fetchDistrictwisePatientCountReportList(String year, String month);

	List<ReportStock> geCurrentStockReport(String from, String from2, String callform, int userData,String storeName,HttpServletResponse response) throws IOException;

	List<ReportStock> getProductWiseStockOnPurRate(String type, Integer startIndex);

	List<ReportList> getAllCompanyList(String from, String to);

	List<ReportList> getProductListData(String from, String to,String callform, String userData);

	List<ReportList> getDrugListData(String from, String to);	
	
	public String getBatchWisePurchase2(List<ReportPurchase> reportPurchases,
			String productName, HttpServletRequest request, String from,
			String to, String batchCode, String totalAmount);
	
	
	String getPartyWisePurchaseTotalReport(List<ReportPurchase> reportPurchases,
			 HttpServletRequest request, String from,
			String to);
	
	List<ReportStock2> getProductWiseStockOnPurRate2(String type, Integer startIndex);
	
	MrnReportDetail getReceivedMRNReportData(HttpServletRequest request);

	MrnReportDetail getPendingMRNReportData(HttpServletRequest request);	

	
	List<CreditNoteDetailsReportDTO> getCreditNoteDetailsAll(
			String string, String string2);

	List<ReportIndentSaleDetails> getAllIndentSalePatientHeader(Integer patientId, String string, String string2);
	
}
