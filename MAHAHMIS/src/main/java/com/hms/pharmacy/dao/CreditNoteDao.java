package com.hms.pharmacy.dao;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.*;

public interface CreditNoteDao 
{
	/*boolean saveOrUpdateCreditNote(CreditNoteMaster creditNoteMaster,String storeId);*/
	
	Map<String, String> saveOrUpdateCreditNote(CreditNoteMaster creditNoteMaster,String storeId);

	List<CreditNoteMaster> getCreditNoteList();

	List<CreditNoteMaster> getCreditNotebyPatientId(Integer patientId);

	CreditNoteMaster getCreditNotebyCreditId(Integer creditNoteId);
	
	boolean deleteCreditNote(Integer creditNoteId);
	
	public ProductMaster getProductDetails(Integer productId);
	
	List<PatientSaleBillMaster> getAutoSuggestionProduct(String letter,String BillNum);

	List<ProductByBatch> autoSuggestionProductByBatch(Integer productId);
	
	List<CreditNoteMaster> autoSuggestionPatient(String letter);

	CreditNoteMaster getCreditNotebyCreditIdForPrint(Integer creditNoteId);

	void updateIndentBillDetails(CreditNoteMaster creditNoteMaster);

	void savePendingIndentAmount(CreditNoteMaster creditNoteMaster, String type);
	
	void savePendingPatientAmount(CreditNoteMaster creditNoteMaster, String type);
	
	/*public PatientSaleBillMaster getPatientSaleDetails(String  BillNum);*/
	
	void changePatientSaletatus(Integer poId);
	
	void changeCounterSaletatus(Integer poId);

	void changeIndentSaleIssueQty(Integer creditNoteSlaveIndentId,Integer Qty,Integer BatchId);
	
	void changePatientSaleIssueQty(Integer creditNoteSlaveIndentId,Integer Qty);
	
	void changeCounterSaleIssueQty(Integer creditNoteSlaveIndentId,Integer Qty);

	Double getPendingAmounttByTreatId(Integer treatmentId);

	Double getTotalPaybleByTreatId(Integer treatmentId);

	JSONArray getCreditNoteDetailsBySaleId(Integer saleId, String saleType);

	List<CreditNoteMaster> searchCreditNoteByPatientId(Integer patientId);
	
	void updatePharmcyAmountInBilling(CreditNoteMaster creditNoteMaster, String string);
	
}
