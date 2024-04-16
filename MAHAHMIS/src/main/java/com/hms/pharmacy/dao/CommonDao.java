package com.hms.pharmacy.dao;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.hms.pharmacy.pojo.StockMasterSlave;
import com.hms.pharmacy.pojo.VendorMaster;


public interface CommonDao {

	JSONArray getHospitalPaymentDetails();

	JSONObject getHospitalPaymentDetailsById(Integer receiveId);

	List<String> getDiscountSurchargeDetails(Integer saleId, String type);
	
	List<String> getDiscountSurchargeDetailsOfPurchase(Integer saleId);

	String saveCathLabProduct(List<VendorMaster> vendorMasters, int patientId,
			int treatmentId);

	Object getPatientById(int patientId);

	String getHospitalState();

	void saveStockMasterSlave(StockMasterSlave stockMasterSlave);

	void updateStockMasterSlave(StockMasterSlave stockMasterSlave);

	StockMasterSlave getStockMasterSlave(int id);

	String getWardNameByTreatment(int treatmentId);
	
}
