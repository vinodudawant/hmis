package com.hms.pharmacy.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.VendorMaster;

public interface PharmacyReportService {

	List<VendorMaster> getSupplierListReport(String fromDate, String toDate);

	List<ProductMaster> getproductData(String fromDate, String toDate, int categoryId, int companyId, int productId);

	List<ReportData> getpurchaseData(HttpServletRequest request, String fromDate, String toDate, int categoryId,
			int companyId, int productId, int vendortId, int unitId, String purtranstype);

	List<ReportData> getTotalPatientData(String string, String string2);

	List<ReportData> getCancelIndentDetails(String string, String string2);

	List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPatients(String letter);

	List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(Integer patientId, String string, String string2);

	List<ReportCreditNoteDetails> getSettleBillDetailsByPatientId(Integer patientId, String string, String string2);

	List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(Integer patientId, String string, String string2);

	List<ReportData> getProductWiseBatchList(Integer productId, String string, String string2,
			String saleTye);

}
