package com.hms.pharmacy.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.hms.dto.Order_comp_druges;
import com.hms.pharmacy.pojo.*;

public interface IndentDao {

	void saveIndent(IndentMaster inventoryMaterialRequestNoteItemInfoSlaveDTO);

	Order_comp_druges getOrderCompById(int indentOrderCompId);

	List<IndentMaster> getIndentDetailsByDate(Date date, Integer storeId);

	IndentMaster getIndentDataById(Integer indentId);

	IndentSale getPatientDataByTreatmentId(Integer treatmentId);
	
	IndentSale getSponserDataByTreatmentId(Integer treatmentId);

	ProductMaster getProductNameByProductId(Integer productId);

	Map<String, String> saveIndentSale(IndentSaleMaster indentSaleMaster, String storeId);

	void setIndentStatus(Integer indentId);

	IndentSaleMaster getIndentSaleById(Integer indentSaleId);

	List<IndentSaleMaster> getIndentList();

	IndentSaleMaster getIndentSaleByClientIndentId(Integer indentSaleId);

	List<IndentSaleMaster> getIndentSaleByPatientId(Integer indentSaleId);
	
	String getPatientDetailsByTreatmentId(Integer indentTreatmentId);
      
	Boolean deleteIndent(Integer indentId, String type,Integer userId,String ip);

	List<IndentMaster> getPendingIndentDetails();
	IndentSale getPatientDataByIndentId(Integer indentId);
	
	List<IndentSaleMaster> getAutoSuggestionIndentNames(Integer letter);

	/*List<String> autoSuggestionPatientName(String letter);*/
	
	int getTreatmentId(int indentNo);

	void setPendingBalance(int treatmentId, Double indentSaleAmountBalance);

	Double getPendingAmount(Integer indentNo);

	List<IndentSale> getAllPatientData();

	List<IndentSaleMaster> getAllIndentDataByTreatmentId(Integer treatmentId);

	String getPendingAmountByTreatmentId(Integer treatmentId, Integer spId);
	
	Double getTotalDiscountOnBillByTreatmentId(Integer treatmentId);

	boolean saveIndentPendingAmount(Integer treatmentId,
			Double amountReceive, Double discount, String narration,Double amountBalance,String listStr);

	FinalIndent getFinalBillDetails(Integer treatmentId);

	List<CreditNoteIndent> getAllIndentProductDataByTreatmentId(
			Integer treatmentId);

	void saveIpdBillDetails(IndentSaleMaster indentSaleMaster);

	List<CreditNoteIndent> getAllIndentReceiptDataByTreatmentId(
			Integer treatmentId);

	Double getReceiveAmountByTreatmentId(Integer treatmentId);

	boolean saveHospitalPayDetails(String amount, Integer treatmentId,String BalanceType);

	boolean saveHospitalTotalPayDetails(int treatmentId,float pharmabalance,float totalbill,float totalrecieved,float patientbalance,String narration, Integer userId);
	
	IndentSale getSponserByIndentId(Integer indentId);
	
	IndentSale getConsultantByIndentId(Integer indentId);
	
	List<settalBillIndent> getAllSettalBillByTreatmentId(Integer treatmentId);
	
    FinalIndent getFinalBillDetailsForSave(Integer treatmentId);
	
    List<settalBillIndent> getAllSettalBillPatientDataByTreatmentId(Integer patientId);

	String getPatientHallDetailsByTreatmentId(Integer indentTreatmentId);

	JSONArray getPreviousIndentData(Integer treatmentId);
	
	JSONArray getCancelIndentData(Integer treatmentId);

	JSONArray getTotalindetDataByTreatmentId(Integer treatmentId);

	List<IndentSaleMaster> getMultipleIndentSaleDataById(Integer indentSalelId);

	List<settalBillIndent> getHospitalPaymentDetailsTreatmentId(
			Integer treatmentId);

	FinalIndent printHospitalPaymentReceipt(Integer receiptId);
	
	Integer chkIndentReceived(Integer indentNo);
	
	Double getPreBalance(String treatmentId);
	
	List<IndentMasterResult> getPendingIndentDetailsForMaster();
	
	boolean saveIndentComment(Integer treatmentId,String narration,Integer userId,String ipaddress);
	
	JSONObject getSponserStatus(Integer treatmentId);
	
	String getMRPType(Integer treatmentId);

	List<IndentMaster> getIndentDetailsByPatient(int storeId);

	List<PatientPharmaDetails> fetchIndentDetailsByPatientName2(
			String findingName, Integer unitId, String storeId);

	List<PatientPharmaDetails> fetchIndentIds(int indenttreatementid,
			Integer unitId, String storeId);

	Double getReturnAmt(Integer treatmentId);
	
	List<IndentSaleSlave> getIndentSaleDataByTreatId(Integer treatmentId);

	List<IndentSaleMaster> autoSuggestionPatientName(String letter);
	
	String editPreIndentByIndentId(IndentMaster indentMaster);

	List<IndentMaster> searchIndentSalePatientDetails(String findtext);

	String getIndentPatientTypeDetailsByDate(String id);

}
