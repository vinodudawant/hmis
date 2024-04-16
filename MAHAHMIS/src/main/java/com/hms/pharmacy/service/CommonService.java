package com.hms.pharmacy.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;

import com.hms.pharmacy.pojo.StockMasterSlave;

public interface CommonService {
	
	String getDocumentNumber(Integer docType);

	JSONArray getHospitalPaymentDetails();

	JSONObject getHospitalPaymentDetailsById(Integer receiveId);
	
	boolean getUserAccess(HttpServletRequest request,String url);

	List<String> getDiscountSurchargeDetails(Integer saleId, String type);
	
	List<String> getDiscountSurchargeDetailsOfPurchase(Integer saleId);
	
	String saveCathLabProduct(String productArr,int patientId,int treatmentId);

	Object getPatientById(int patientId);

	String getHospitalState();
	
	void saveStockMasterSlave(StockMasterSlave stockMasterSlave);

	void updateStockMasterSlave(StockMasterSlave stockMasterSlave);
	
	StockMasterSlave getStockMasterSlave(int id);

	void setstockMasterSlave(Integer invoiceId, String type, int patientId, int treatmentId,
			Integer productId, Integer batchId, String batchCode, int storeId,
			Integer qty, int l, Double gst, Double igst,
			Double cess, Double disc, int unitId, Integer vendorId, Double mrp, Double rate);

	String getWardNameByTreatment(int patientSaleTreatmentId);
	
}
