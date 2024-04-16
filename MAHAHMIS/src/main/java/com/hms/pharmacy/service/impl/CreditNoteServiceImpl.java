package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.CreditNoteDao;
import com.hms.pharmacy.dao.ProductDao;
import com.hms.pharmacy.pojo.CreditNoteMaster;
import com.hms.pharmacy.pojo.CreditNoteSlave;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.ProductByBatch;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.CreditNoteService;
import com.hms.pharmacy.service.DocumentNumberingService;

@Service
public class CreditNoteServiceImpl implements CreditNoteService
{
	@Autowired
	CreditNoteDao creditNoteDao;
	
	@Autowired
	ProductDao productDao;
	
	@Autowired
	DocumentNumberingService docNumberingService;
	
	@Autowired
	CommonService commonService;
		
	@Override
	@Transactional
	public Map<String, String> saveOrUpdateCreditNote(CreditNoteMaster creditNoteMaster,String storeId) {
		
		creditNoteMaster.setCreditNoteDeleteFlag(0);
		creditNoteMaster.setCreditNoteUpdateDate(new Date(new java.util.Date()
				.getTime()));
		
		//delete Row	
			
			for(Iterator<CreditNoteSlave> itr= creditNoteMaster.getCreditNoteSlaves().iterator();itr.hasNext();)
			{	
				CreditNoteSlave creditSaleSlave=itr.next();
				if (creditSaleSlave.getProductMaster().getProductId() != null && creditSaleSlave.getProductMaster().getBatchMaster().get(0).getBatchId()!=null)
					creditSaleSlave.setCreditNoteSlaveBatchId(creditSaleSlave.getProductMaster().getBatchMaster().get(0).getBatchId());
				
				else
					itr.remove();
			}
	
		Map<String, String> result= new HashMap<String, String>();
		
		if(creditNoteMaster.getCreditNotePatientSaleId()>0)
		{
			creditNoteDao.changePatientSaletatus(creditNoteMaster.getCreditNotePatientSaleId());
		}
			
		if(creditNoteMaster.getCreditNoteCounterSaleId()>0)
		{
			creditNoteDao.changeCounterSaletatus(creditNoteMaster.getCreditNoteCounterSaleId());
		}
		for(CreditNoteSlave creditNoteSlave:creditNoteMaster.getCreditNoteSlaves())
		{
			if(creditNoteSlave.getCreditNoteSlaveIndentId()!=0)
			{
				creditNoteDao.changeIndentSaleIssueQty(creditNoteSlave.getCreditNoteSlaveIndentId(),creditNoteSlave.getCreditSlaveQty(),creditNoteSlave.getCreditNoteSlaveBatchId());
			}
			
		}
		for(CreditNoteSlave creditNoteSlave:creditNoteMaster.getCreditNoteSlaves())
		{
			
			if(creditNoteSlave.getCreditNoteSlavePatientId()!=0)
			{
				creditNoteDao.changePatientSaleIssueQty(creditNoteSlave.getCreditNoteSlavePatientId(),creditNoteSlave.getCreditSlaveQty());
				
			}
			
		}
		
		for(CreditNoteSlave creditNoteSlave:creditNoteMaster.getCreditNoteSlaves())
		{
			
			if(creditNoteSlave.getCreditNoteSlaveCounterId()!=0)
			{
				creditNoteDao.changeCounterSaleIssueQty(creditNoteSlave.getCreditNoteSlaveCounterId(),creditNoteSlave.getCreditSlaveQty());
			}
			
		}
		try
		{
			result= creditNoteDao.saveOrUpdateCreditNote(creditNoteMaster,storeId);
			
			if(creditNoteMaster.getCreditNoteTreatmentId()>0 && creditNoteMaster.getCreditNoteType().equals("indentSale"))
			{	
				updateIndentBillDetails(creditNoteMaster);
				
				if(creditNoteMaster.getCreditNoteTransactionType().equals("1"))
				{	
					savePendingIndentAmount(creditNoteMaster,"credit");
				}//suraj code for cash return	
				else
				{
					/*savePendingIndentAmount(creditNoteMaster,"cash");*/
				}
			}
			
			if(creditNoteMaster.getCreditNoteTreatmentId()>0 && creditNoteMaster.getCreditNoteType().equals("patientSale"))
			{	
				if(creditNoteMaster.getCreditNoteTransactionType().equals("1"))
				{	
					savePendingPatientAmount(creditNoteMaster,"credit");
				}//suraj code for cash return	
				else
				{
					savePendingPatientAmount(creditNoteMaster,"cash");
				}
			}
			
			//added by vishant check for update amount in billing
		if(creditNoteMaster.getCreditNoteType().equals("indentSale")|| creditNoteMaster.getCreditNoteType().equals("patientSale")) {
			updatePharmcyAmountInBilling(creditNoteMaster,"credit");
		}
			
			
			String str=result.get("result");
			if (Integer.parseInt(str)>0) 
			{
				for(int i=0;i<creditNoteMaster.getCreditNoteSlaves().size();i++){
					CreditNoteSlave slave=creditNoteMaster.getCreditNoteSlaves().get(i);
					commonService.setstockMasterSlave(Integer.parseInt(str), "CreditNote", creditNoteMaster.getCreditPatientId(), creditNoteMaster.getCreditNoteTreatmentId(), slave.getProductMaster().getProductId(), slave.getCreditNoteSlaveBatchId(), slave.getCreditNoteSlaveBatchCode(), creditNoteMaster.getCreditNoteStoreId(), slave.getCreditSlaveQty(), 0, slave.getCreditSlaveVat(), 0.0, 0.0, slave.getCreditNoteSlaveDiscAmt(), creditNoteMaster.getUnitId(), 0, slave.getCreditNoteSlaveMrp(), slave.getCreditNoteSlaveRate());
				}
				
				DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
				DocumentMaster documentMaster = new DocumentMaster();
				documentMaster.setDocId(2);
				docNumberingMaster.setDocumentMaster(documentMaster);
				docNumberingService.updateDocumentNumbering(docNumberingMaster);
				
				result.put("result","Record Save Successfully...!");
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return result;
	}

	private void updatePharmcyAmountInBilling(CreditNoteMaster creditNoteMaster, String string) {
		// TODO Auto-generated method stub
		creditNoteDao.updatePharmcyAmountInBilling(creditNoteMaster,string);
	}

	public void savePendingIndentAmount(CreditNoteMaster creditNoteMaster,String type)
	{
		creditNoteDao.savePendingIndentAmount(creditNoteMaster,type);
	}
	
	public void savePendingPatientAmount(CreditNoteMaster creditNoteMaster,String type)
	{
		creditNoteDao.savePendingPatientAmount(creditNoteMaster,type);
	}
	
	public void updateIndentBillDetails(CreditNoteMaster creditNoteMaster)
	{
		creditNoteDao.updateIndentBillDetails(creditNoteMaster);
	}
	
	@Override
	@Transactional
	public List<PatientSaleBillMaster> getAutoSuggestionProduct(String letter,String BillNum) {
		return creditNoteDao.getAutoSuggestionProduct(letter,BillNum);
	}
	
	
	
	@Override
	@Transactional
	public List<CreditNoteMaster> getCreditNoteList() {
		return creditNoteDao.getCreditNoteList();
	}

	@Override
	@Transactional
	public List<CreditNoteMaster> getCreditNotebyPatientId(Integer patientId) {
		return creditNoteDao.getCreditNotebyPatientId(patientId);
	}

	@Override
	@Transactional
	public CreditNoteMaster getCreditNotebyCreditId(Integer creditNoteId) {
		return creditNoteDao.getCreditNotebyCreditId(creditNoteId);
	}

	@Override
	@Transactional
	public List<CreditNoteMaster> autoSuggestionPatient(String letter) 
	{
		return creditNoteDao.autoSuggestionPatient(letter);
	}
	
	@Override
	@Transactional
	public boolean deleteCreditNote(Integer creditNoteId) {
		return creditNoteDao.deleteCreditNote(creditNoteId);
	}
	@Override
	@Transactional
	public String getProductDetails(Integer productId) {
		String str = "";
		ProductMaster productMaster = creditNoteDao
				.getProductDetails(productId);
		if (productMaster != null) {
			str = productMaster.getBatchMaster().get(0).getBatchCode()
					+ "#"
					+productMaster.getBatchMaster().get(0).getBatchExpDate()+"#"
					+productMaster.getBatchMaster().get(0).getProductMaster().getStockMasters().get(0).getStockQtyInHand();
			
			
	
		}
		return str;
	}
	/*@Override
	@Transactional
	public String getPatientSaleDetails(String  BillNum) {
		String str = "";
		PatientSaleBillMaster patientSaleBillMaster = creditNoteDao
				.getPatientSaleDetails(BillNum);
		if (patientSaleBillMaster != null) {
			str =patientSaleBillMaster.getLtPatientSaleBill().get(0).getProductMaster().getProductName()+
					" "+patientSaleBillMaster.getLtPatientSaleBill().get(0).getProductMaster().getProductUnit()+
					" "+patientSaleBillMaster.getLtPatientSaleBill().get(0).getProductMaster().getPackingMaster().getPackType()+
					" "+patientSaleBillMaster.getLtPatientSaleBill().get(0).getProductMaster().getCompanyMaster().getCompName()+
					" "+patientSaleBillMaster.getLtPatientSaleBill().get(0).getProductMaster().getShelfMaster().getShelfName();
					
				
							
		}
		return str;
	}
			*/

	@Override
	@Transactional
	public List<String> autoSuggestionProductByBatch(Integer productId,String storeId) {
		List<ProductByBatch> batchMasters= creditNoteDao.autoSuggestionProductByBatch(productId);
		
		List<ProductByBatch> openingStockDetails= productDao.autoSuggestionForOpeningStock(productId,storeId);
			
		List<ProductByBatch> batchMasters1=productDao.autoSuggestionProductByBatch(productId,storeId);			
		
		
		List<ProductByBatch> productByBatchs=new ArrayList<ProductByBatch>();
		
		for(ProductByBatch productByBatch:batchMasters)
		{
			productByBatchs.add(productByBatch);
		}
		
		for(ProductByBatch productByBatch:openingStockDetails)
		{
			productByBatchs.add(productByBatch);
		}
		
		
		for(ProductByBatch productByBatch:batchMasters1)
		{
			productByBatchs.add(productByBatch);
		}
		
		List<String> results=new ArrayList<String>();
		for(ProductByBatch bm:productByBatchs)
		{
			results.add(bm.getBatchCode()+"#"+bm.getBatchExpDate()+"#"+bm.getMRP()+"#"+bm.getRate()+"#"+bm.getClearStock()+"#"+bm.getBatchId()+"#"+bm.getStockId()+"#"+bm.getPurchaseRate()+"#"+bm.getVat()+"#"+bm.getPurchaseSlaveId());
		}
		return results;
	}

	@Override
	@Transactional
	public CreditNoteMaster getCreditNotebyCreditIdForPrint(Integer creditNoteId) {
		return creditNoteDao.getCreditNotebyCreditIdForPrint(creditNoteId);
	}

	@Override
	@Transactional
	public Double getPendingAmounttByTreatId(Integer treatmentId) {
		return creditNoteDao.getPendingAmounttByTreatId(treatmentId);
	}

	@Override
	@Transactional
	public Double getTotalPaybleByTreatId(Integer treatmentId) {
		return creditNoteDao.getTotalPaybleByTreatId(treatmentId);
	}

	@Override
	@Transactional
	public JSONArray getCreditNoteDetailsBySaleId(Integer saleId,String saleType) {
		return creditNoteDao.getCreditNoteDetailsBySaleId(saleId,saleType);
	}

	@Override
	@Transactional
	public List<CreditNoteMaster> searchCreditNoteByPatientId(Integer patientId) {
		
		return creditNoteDao.searchCreditNoteByPatientId(patientId);
	}
}
