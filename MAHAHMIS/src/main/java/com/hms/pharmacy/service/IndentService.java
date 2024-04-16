package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.hms.pharmacy.pojo.CreditNoteIndent;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.pharmacy.pojo.IndentMasterResult;
import com.hms.pharmacy.pojo.IndentSale;
import com.hms.pharmacy.pojo.IndentSaleMaster;
import com.hms.pharmacy.pojo.IndentSaleSlave;
import com.hms.pharmacy.pojo.PatientPharmaDetails;
import com.hms.pharmacy.pojo.settalBillIndent;

public interface IndentService {

	void saveIndent(IndentMaster inventoryMaterialRequestNoteItemInfoSlaveDTO);

	JSONArray getIndentDetailsByDate(String date,Integer storeId);

	IndentMaster getIndentDataById(Integer indentId);

	IndentSale getPatientDataByTreatmentId(
			Integer treatmentId);

	String getProductNameByProductId(Integer productId);

	Map<String, String> saveIndentSale(IndentSaleMaster indentSaleMaster, String storeId);

	IndentSaleMaster getIndentSaleById(Integer indentSalelId);

	List<IndentSaleMaster> getIndentList();

	IndentSaleMaster getIndentSaleByClientIndentId(Integer indentSaleId);
	
	List<IndentSaleMaster> getIndentSaleByPatientId(Integer indentSaleId);
	
	Boolean deleteIndent(Integer indentId, String type,Integer userId,String ip);

	List<IndentMaster> getPendingIndentDetails();
	
	List<IndentMasterResult> getPendingIndentDetailsForMaster();
	
	IndentSale getPatientDataByIndentId(Integer indentId);

	List<IndentSaleMaster> getAutoSuggestionIndentNames(Integer letter);

	/*List<Patient> autoSuggestionPatientName(String letter);*/
	
	Double getPendingAmount(Integer indentNo);

	List<com.hms.pharmacy.pojo.IndentSale> getAllPatientData();

	List<IndentSaleMaster> getAllIndentDataByTreatmentId(Integer treatmentId);

	String getPendingAmountByTreatmentId(Integer treatmentId, Integer spId);
	
	Double getTotalDiscountOnBillByTreatmentId(Integer treatmentId);

	boolean saveIndentPendingAmount(Integer treatmentId, Double amountReceive,
			Double discount, String narration,Double amountBalance,String listStr);
	
	boolean saveIndentComment(Integer treatmentId,String narration,Integer userId,String ipaddress);

	FinalIndent getFinalBillDetails(Integer treatmentId);

	List<CreditNoteIndent> getAllIndentProductDataByTreatmentId(Integer treatmentId);

	List<CreditNoteIndent> getAllIndentReceiptDataByTreatmentId(
			Integer treatmentId);

	Double getReceiveAmountByTreatmentId(Integer treatmentId);

	boolean saveHospitalPayDetails(String amount, Integer treatmentId,String BalanceType);

	boolean saveHospitalTotalPayDetails(int treatmentId, float pharmabalance,float totalbill,float totalrecieved,float patientbalance,String narration, Integer userId);
	
	IndentSale getSponserByIndentId(Integer indentId);
	
	IndentSale getConsultantByIndentId(Integer indentId);
	
	List<settalBillIndent> getAllSettalBillByTreatmentId(Integer treatmentId);
	
	List<settalBillIndent> getAllSettalBillPatientDataByTreatmentId(Integer patientId);
	
	FinalIndent getFinalBillDetailsForSave(Integer treatmentId);

	JSONArray getPreviousIndentData(Integer treatmentId);
	
	JSONArray getCancelIndentData(Integer treatmentId);

	JSONArray getTotalindetDataByTreatmentId(Integer treatmentId);

	List<IndentSaleMaster> getMultipleIndentSaleDataById(Integer indentSalelId);
	
	
	IndentSale getSponserDataByTreatmentId(
			Integer treatmentId);

	List<settalBillIndent> getHospitalPaymentDetailsTreatmentId(
			Integer treatmentId);

	FinalIndent printHospitalPaymentReceipt(Integer receiptId);
	
	Integer chkIndentReceived(Integer indentNo);

	Double getPreBalance(String parameter);
	
	JSONObject getSponserStatus(Integer treatmentId);
	
	String getMRPType(Integer treatmentId);

	JSONArray getIndentDetailsByPatient(String findingName, int storeId);

	List<PatientPharmaDetails> fetchIndentDetailsByPatientName2(
			String findingName, Integer unitId, String storeId);

	List<PatientPharmaDetails> fetchIndentIds(int indenttreatementid,
			Integer unitId, String storeId);

	Double getReturnAmt(Integer treatmentId);
	
	List<IndentSaleSlave> getIndentSaleDataByTreatId(Integer treatmentId);

	List<IndentSaleMaster> autoSuggestionPatientName(String letter);
	
	String editPreIndentByIndentId(IndentMaster indentMaster);

	List<IndentMaster> searchIndentSalePatientDetails(String findtext);
}
