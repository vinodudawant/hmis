package com.hms.pharmacy.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.pharmacy.pojo.*;
public interface PatientSaleBillDao
{
	Map<String, String> saveOrUpdatePatientSaleBill(PatientSaleBillMaster patientSaleBillMaster, String storeId);
	public ProductMaster getProductDetails(Integer productId);
	List<PatientSaleBillMaster> getPatientSales();
	List<PatientSaleBillMaster> getPatientBillId(Integer patientId);
		
	Boolean deletePatientSaleBill(Integer patientId);
	PatientSaleBillMaster getPatientSaleBillId(Integer patientId);
	PatientSaleBillMaster getPatientSalesBillById(Integer patientSaleId);
	
	public DoctorDetails getDoctorDetailsByPatientId(Integer patientId,String typeOfpatient);
	
	public PatientDetails getPatientDetailsDetails(Integer patientId,String typeOfpatient);
	public PatientDetails getPatientTreatmentDetails(Integer patientId,String typeOfpatient);
	public DoctorDetails getSponserDetailsDetails(Integer patientId);
	
	List<PrescriptionMaster> getPrescription(Integer patientId);
	
	List<PrescriptionMaster> getPrescriptionOpd(Integer patientId);
	
	List<PrescriptionMaster> getPrescriptionByEntireDB(Integer patientId);
	
	List<PendingBill> getCreditBills(Integer patientId);
	
	PatientSale getSponserByPatientId(Integer indentId);
	
	List<CreditNotePatient> getAllPatientSaleBillData(Integer patientId);
	
	PatientSaleBillMaster getPatientSlaveByPatientId(Integer patientBillId);
	
	List<CreditNotePatient> getAllPatientReceiptDataByTreatmentId(
			Integer treatmentId);

	Double getPendingAmount(Integer treatmentId);
	
	void setPendingBalancePatientSale(int treatmentId, Double indentSaleAmountBalance);
	
	void setEditablePendingBalancePatientSale(int treatmentId, int patientSaleId,Double bal);
	
	List<PatientSaleBillMaster> getAllPatientDataByTreatmentId(Integer treatmentId);
	
	Double getPendingAmountByTreatmentId(Integer treatmentId, Integer spId);
	
	boolean savePatientPendingAmount(Integer treatmentId, Double amountReceive,
			Double discount, String narration,Double amountBalance,String listStr);
	
	FinalIndent getFinalBillDetailsForPatientSave(Integer treatmentId);
	
	PatientSaleBill getPatientDataByTreatmentId(
			Integer treatmentId);
	
	List<settalBillIndent> getAllSettalBillByTreatmentId(Integer treatmentId);
	
List<settalBillIndent> getAllSettalBillHistoryByTreatmentId(Integer treatmentId);
	
	FinalIndent getFinalBillDetails(Integer treatmentId);
	
	List<PatientSaleBillMaster> searchPatientSaleByInvoiceId(Integer invoiceId);
	
	PatientSaleBillMaster getPatientSaleBillIdForView(Integer patientBillId);
	
	Double getPreBalance(String pId);
	
	void setAmountReceiveInOrderForm(int orderId, Integer qty);
	
	void setAmountReceiveInPrescription(int prescrptionId, Integer qty);
	
	String getPatientTypeByTreatmentId(Integer treatmentId);
	
	JSONObject getSponserStatus(Integer treatmentId);
	
	String getMRPType(Integer treatmentId);
	
	PatientSale getPatientSaleTransType(Integer indentId);
	
	boolean updateBalFlag(int id, Double bal);
	
	List<RegTreBillDto> fetchPharmaPatientNameAutoSuggest(String patientName,String typeOfpatient,String isEdit);
	
	List<DoctorDto> fetchDoctorList(String doctorType);
	
	String getPendingAmountByTreatmentIdPatientSale(Integer treatmentId, Integer spId);
	
	List<RegTreBillDto> fetchPharmaPatientNameAutoSuggestNew(String patientName,String typeOfpatient,String isEdit,String callFrom);

	
}
