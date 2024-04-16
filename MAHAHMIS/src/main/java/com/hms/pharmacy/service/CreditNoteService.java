package com.hms.pharmacy.service;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.CreditNoteSlave;
import com.hms.pharmacy.pojo.PatientMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.ProductMaster;

public interface CreditNoteService
{
	/*boolean saveOrUpdateCreditNote(CreditNoteMaster creditNoteMaster, String storeId);*/
	
	Map<String, String> saveOrUpdateCreditNote(CreditNoteMaster creditNoteMaster, String storeId);

	List<CreditNoteMaster> getCreditNoteList();

	List<CreditNoteMaster> getCreditNotebyPatientId(Integer patientId);

	CreditNoteMaster getCreditNotebyCreditId(Integer creditNoteId);

	boolean deleteCreditNote(Integer creditNoteId);
	
	List<PatientSaleBillMaster> getAutoSuggestionProduct(String letter,String BillNum);
	
	public String getProductDetails(Integer productId);
	/*public String getPatientSaleDetails(String  BillNum);*/

	List<String> autoSuggestionProductByBatch(Integer productId, String storeId);
	
	List<CreditNoteMaster> autoSuggestionPatient(String letter);

	CreditNoteMaster getCreditNotebyCreditIdForPrint(Integer creditNoteId);

	Double getPendingAmounttByTreatId(Integer treatmentId);

	Double getTotalPaybleByTreatId(Integer treatmentId);

	JSONArray getCreditNoteDetailsBySaleId(Integer saleId, String saleType);
	
	List<CreditNoteMaster> searchCreditNoteByPatientId(Integer patientId);
}
