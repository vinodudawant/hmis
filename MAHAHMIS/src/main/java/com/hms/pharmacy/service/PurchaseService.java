package com.hms.pharmacy.service;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CorrectionRate;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseCorrection;
import com.hms.pharmacy.pojo.PurchaseHistory;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseRateHistory;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.VendorMaster;

public interface PurchaseService {
	
	
	Boolean saveOrUpdatePurchase(PurchaseMaster purchaseMaster, PurchaseMaster purchaseMaster2,Integer unitId);

	List<PurchaseMaster> getPurchases();

	Boolean deletePurchase(Integer purchaseId);

	Boolean DublicateBillNum(String billNo, Integer vendorId);

	List<PurchaseMaster> getPurbyVendorId(Integer vendorId);

	List<PurchaseMaster> getPurListbyVendorId(Integer vendorId,Integer unitId);
	
	List<PurchaseMaster> getAutoSuggestionPurchaseNames(String letter);

	PurchaseMaster getPurchaseById(Integer purchaseId);
	public String getLowestPurchaseDetail(Integer productId);
	/*public String getLastPurchaseSlave(Integer productId);*/

	List<BatchMaster> getBatchByBatchCode(String batchCode);

	Map<String,JSONArray>  getBatchDetails(Integer productId,String storeId);
	
	Map<String,JSONArray>  getProductNameByBarcode(Integer productId,String storeId);
	
	//Map<String,JSONArray>  getBatchDetailsInFIFO(Integer productId,String storeId);

	List<PurchaseMaster> getLastPurchaseDetails(Integer productId);

	boolean updateCorrectionRate(CorrectionRate correctionRate, PurchaseCorrection purchaseCorrection);

	List<PurchaseMaster> getPendingPurbyVendorId(Integer vendorId);
	
	PurchaseMaster getPurchaseDataById(Integer purchaseId, Integer unitId);

	List<ReportProductWiseBatchSale> getProductWiseBatchList(Integer productId, String string, String string2);

	List<ReportProductWiseBatchSale> getBatchWiseSaleList(Integer batchId, String from, String to);

	List<ReportData> getTotalSaleCount(String string);

	List<ReportProductWiseBatchSale> getProductWisePartyList(Integer productId,
			String string, String string2);

	List<ReportProductWiseBatchSale> getPartyList(String string, String string2);

	List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(
			Integer vendorId, String from, String to);

	List<PurchaseMaster> getLimitPurchases(Integer unitId);
	
	Integer getNextAutoIncrement();
	
	List<PurchaseMaster> getPurchaseData(Integer unitId);
	
	PurchaseMaster getPurchaseEntryByPurchaseId(Integer poId);
	
	PurchaseMaster getPurchaseEntrySlaveForDebitNoteByPurId(Integer poId);

	List<PurchaseMaster> getPurListbyPurchaseEntryNo(Integer vendorId,Integer unitId);
	
	public String getTotalStock(Integer productId);

	PurchaseMaster getPurchaseByIdForEdit(Integer purchaseId);

	String getDelChalanNumber(int purchaseMasterId);

	Map<String, JSONArray> getProductByBarcode(Integer batchId, String storeId);

	PurchaseMaster savePurchaseMaster(VendorMaster master,HttpServletRequest request);

	int SendToGRNForFinance(HttpServletRequest request, String grnId);
	public List<ReportProductWiseBatchSale> getTotalHospitalSaleCount(String fromReult);
	
	List<PurchaseSlave> getBatchDetailsForPrint(Integer masterId);
	
	Map<String,JSONArray> getBatchDetailsWithoutExpiry(Integer productId,
			String storeId);
	
	public String getTotalStockWithoutExpiry(Integer productId);
	
	public Integer getProductPrescriptionId(Integer productId);
	
    public List<PurchaseRateHistory> getCorrectionRateBackToList(Integer unitId,HttpServletRequest request);

    public  PurchaseRateHistory getDataById(Integer unitId,Integer productId, HttpServletRequest request);

	List<PurchaseRateHistory> autoSuggestionProduct(String letter, Integer unitId);

	List<PurchaseRateHistory> getCorrectionRateDetail(Integer productId, Integer unitId);

	
}
