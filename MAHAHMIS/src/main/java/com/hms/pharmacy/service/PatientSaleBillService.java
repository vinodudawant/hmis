package com.hms.pharmacy.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.PatientSale;
import com.hms.pharmacy.pojo.PatientSaleBill;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.PrescriptionMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.pojo.settalBillIndent;


public interface PatientSaleBillService
{
	Map<String, String> saveOrUpdatePatientSaleBill(PatientSaleBillMaster patientSaleBillMaster, String storeId);
	public String getProductDetails(Integer productId);
	List<PatientSaleBillMaster> getPatientSales();
	List<PatientSaleBillMaster> getPatientBillId(Integer patientId);
	
	Boolean deletePatientSaleBill(Integer patientId);
	PatientSaleBillMaster getPatientSaleBillId(Integer patientId);
	PatientSaleBillMaster getPatientSalesBillById(Integer patientSaleId);
	public String getDoctorDetailsByPatientId(Integer patientId,String typeOfPatient);
	public String getSponserDetailsDetails(Integer patientId);
	List<PrescriptionMaster> getPrescription(Integer patientId);
	List<PrescriptionMaster> getPrescriptionOpd(Integer patientId);
	List<PrescriptionMaster> getPrescriptionByEntireDB(Integer patientId);
	
	List<PendingBill> getCreditBills(Integer patientId);
	public String getPatientDetailsDetails(Integer patientId,String typeOfPatient);
	public String getPatientTreatmentDetails(Integer patientId,String typeOfPatient);
	PatientSale getSponserByPatientId(Integer indentId);
	
	List<CreditNotePatient> getAllPatientSaleBillData(Integer patientId);
	
	PatientSaleBillMaster getPatientSlaveByPatientId(Integer patientBillId);
	
	List<CreditNotePatient> getAllPatientReceiptDataByTreatmentId(
			Integer treatmentId);
	
	Double getPendingAmount(Integer treatmentId);
	
	List<PatientSaleBillMaster> getAllPatientDataByTreatmentId(Integer treatmentId);

	Double getPendingAmountByTreatmentId(Integer treatmentId, Integer spId);
	
	JSONObject getSponserStatus(Integer treatmentId);
	
	String getMRPType(Integer treatmentId);
	
	boolean savePatientPendingAmount(Integer treatmentId, Double amountReceive,
			Double discount, String narration,Double amountBalance,String listStr);
	
	FinalIndent getFinalBillDetailsForPatientSave(Integer treatmentId);
	
	FinalIndent getFinalBillDetails(Integer treatmentId);
	
	PatientSaleBill getPatientDataByTreatmentId(
			Integer treatmentId);
	
	List<settalBillIndent> getAllSettalBillByTreatmentId(Integer treatmentId);
	
	List<settalBillIndent> getAllSettalBillHistoryByTreatmentId(Integer patientId);
	
	List<PatientSaleBillMaster> searchPatientSaleByPatientId(Integer patientId);
	
	List<PatientSaleBillMaster> searchPatientSaleByInvoiceId(Integer patientId);
	
	PatientSaleBillMaster getPatientSaleBillIdForView(Integer patientId);
		
	Double getPreBalance(String pId);
	
	PatientSale getPatientSaleTransType(Integer indentId);
	
	void savePatientSaleBill(List<PurchaseMaster> purchaseMasterList, int patientId, int treatmentId);
	
	List<RegTreBillDto> fetchPharmaPatientNameAutoSuggest(String patientName,String typeOfpatient,String isEdit);
	
	List<DoctorDto> fetchDoctorList(String doctorType);
	
	String getPendingAmountByTreatmentIdPatientSale(Integer treatmentId, Integer spId);
	
	List<RegTreBillDto> fetchPharmaPatientNameAutoSuggestNew(String patientName,String typeOfpatient,String isEdit,String callFrom);

	
}
