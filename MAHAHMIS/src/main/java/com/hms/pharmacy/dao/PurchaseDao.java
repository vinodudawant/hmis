package com.hms.pharmacy.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CorrectionRate;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseCorrection;
import com.hms.pharmacy.pojo.PurchaseHistory;
import com.hms.pharmacy.pojo.PurchaseHistory2;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseRateHistory;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.VendorMaster;

public interface PurchaseDao {
	PurchaseMaster saveOrUpdatePurchase(PurchaseMaster purchaseMaster,Integer unitId);

	List<PurchaseMaster> getPurchases();

	Boolean deletePurchase(Integer purchaseId);

	Boolean DublicateBillNum(String billNo, Integer vendorId);

	List<PurchaseMaster> getAutoSuggestionPurchaseNames(String letter);

	PurchaseMaster getPurchaseById(Integer purchaseId);

	List<PurchaseMaster> getPurbyVendorId(Integer vendorId);
	
	List<PurchaseMaster> getPurListbyVendorId(Integer vendorId,Integer unitId);

	public PurchaseSlave getLowestPurchaseDetail(Integer productId);
	/*public Integer getLastPurchaseSlave(Integer productId);*/

	List<BatchMaster> getBatchByBatchCode(String batchCode);

	List<PurchaseHistory> getBatchDetails(Integer productId,String storeIds);
	
	List<PurchaseHistory> getProductNameByBarcode(Integer batchId,String storeIds);
	
   //PurchaseHistory getBatchDetailsInFIFO(Integer productId,String storeIds);

	BatchMaster getStockDetails(Integer batchId);

	List<PurchaseMaster> getLastPurchaseDetails(Integer productId);

	boolean updateCorrectionRate(CorrectionRate correctionRate);

	List<PurchaseMaster> getPendingPurbyVendorId(Integer vendorId);

	PurchaseSlave getPurchaseSlaveByBatchId(Integer batchId);

	void savePurchaseHistory(PurchaseCorrection purchaseCorrection);

	void savePurchaseRateDetails(PurchaseRateHistory purchaseRateHistory);

	PurchaseRateHistory getPurchaseRateDetails(PurchaseRateHistory purchaseRateHistory);

	void updatePurchaseRateDetails(PurchaseRateHistory purchaseRateHistory);
	
	PurchaseMaster getPurchaseDataById(Integer purchaseId,Integer unitId);

	void saveBatchDetails(BatchMaster batchMaster, PurchaseCorrection purchaseCorrection);

	List<ReportProductWiseBatchSale> getProductWiseBatchList(Integer productId, String from, String to, String string);

	List<ReportProductWiseBatchSale> getBatchWiseSaleList(Integer batchId, String string, String from, String to);

	void updateBatchDetailsForCreditNote(Integer BatchId);

	PurchaseRateHistory getPurchaseRateDetails1(
			PurchaseRateHistory purchaseRateHistory2);

	void updateBatchDetailsForPurchaseEdit(Integer BatchId);

	String getCounterSaleTodayCount(String fromReult);

	String getIndentSaleTodayCount(String fromReult);

	String getHospitalSaleTodayCount(String fromReult);
	
	String getPatientSaleTodayCount(String fromReult);

	List<ReportProductWiseBatchSale> getProductWisePartyList(Integer productId,
			String from, String to, String type);

	List<ReportProductWiseBatchSale> getPartyList(String from, String to, String type);

	List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(Integer vendorId, String from,
			String to, String string);

	List<PurchaseMaster> getLimitPurchases(Integer unitId);

	List<PurchaseHistory> getBatchDetailsForOpeningStock(Integer productId,String storeId);
	
	List<PurchaseHistory> getProductNameByBarcodeForOpeningStock(Integer productId,String storeId);
	
  // PurchaseHistory getBatchDetailsForOpeningStockInFIFO(Integer productId,String storeId);

	void increaseStock(Integer batchId, Integer total);
	
	/*void saveBatchDetailsOpeningStock(BatchMaster batchMaster, PurchaseOpeningStock purchaseCorrection);
	
	void savePurchaseOpeningStock(PurchaseOpeningStock purchaseOpeningStock);
	
	void updateBatchDetailsOpeningStock(BatchMaster batchMaster,PurchaseOpeningStock purchaseOpeningStock);*/
	
	void decreaseStock(Integer batchId, Integer Qty);
	/*void saveBatchDetailsOfOpeningStock(BatchMaster batchMaster, PurchaseOpeningStock OpeningStock);*/
	
	
	Integer getNextAutoIncrement();

	void changePOStatus(Integer poId);
	
	List<PurchaseMaster> getPurchaseData(Integer unitId);
	
	PurchaseMaster getPurchaseEntryByPurchaseId(Integer poId);
	
	PurchaseMaster getPurchaseEntrySlaveForDebitNoteByPurId(Integer poId);
	
	List<PurchaseMaster> getPurListbyPurchaseEntryNo(Integer vendorId,Integer unitId);
	
	public String getTotalStock(Integer productId);
	
	PurchaseMaster getPurchaseByIdForEdit(Integer purchaseId);

	String getDelChalanNumber(int purchaseMasterId);

	List<PurchaseHistory> getProductByBarcode(Integer batchId, String storeId);

	List<PurchaseHistory> getProductByBarcodeForOpeningStock(Integer batchId,
			String storeId);
			
	PurchaseSlave getCathProductInfo(Integer vendorId, Double qty);

	int SendToGRNForFinance(HttpServletRequest request, String grnId);

	int getidTaxmaster(double gstper);

	int insertGStPer(double gstper);

	List<PurchaseSlave> getBatchDetailsForPrint(Integer masterId);
	
	List<PurchaseHistory2> getBatchDetailsWithoutExpiry(Integer productId,String storeIds);
	
	public List<PurchaseHistory2> getBatchDetailsForOpeningStockWithoutExpiry(
			Integer productId, String storeId);
	
	public String getTotalStockWithoutExpiry(Integer productId);
	
	public Integer getProductPrescriptionId(Integer productId);
	
    public List<PurchaseRateHistory> getCorrectionRateBackToList(Integer unitId,HttpServletRequest request);

	public PurchaseRateHistory  getDataById(Integer unitId, Integer productId, HttpServletRequest request);

	List<PurchaseRateHistory> autoSuggestionProduct(String letter, Integer unitId);

	List<PurchaseRateHistory> getCorrectionRateDetail(Integer productId, Integer unitId);


}
