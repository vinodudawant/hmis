package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import com.hms.ehat.dto.RegTreBillDto;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.InventoryFetchPateintNameDTO;
import com.hms.ehat.dto.DoctorDto;

import com.hms.pharmacy.dao.PatientSaleBillDao;
import com.hms.pharmacy.pojo.CreditNotePatient;
import com.hms.pharmacy.pojo.DoctorDetails;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.PatientDetails;
import com.hms.pharmacy.pojo.PatientSale;
import com.hms.pharmacy.pojo.PatientSaleBill;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.PrescriptionMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.PatientSaleBillService;

@Service
public class PatientSaleServiceImpl implements PatientSaleBillService
{

	@Autowired
	PatientSaleBillDao patientSaleBillDao;
	
	@Autowired
	DocumentNumberingService docNumberingService;
	
	@Autowired
	CommonService commonService;
	
	@Override
	@Transactional
	public Map<String, String> saveOrUpdatePatientSaleBill(PatientSaleBillMaster patientSaleBillMaster,String storeId) 
    {

		patientSaleBillMaster.setPatientSalesBillDeleteFlag(0);
		patientSaleBillMaster.setPatientSalesBillUpdateDate(new Date(
				new java.util.Date().getTime()));

		// delete Row
		for (Iterator<PatientSaleBillSlave> itr = patientSaleBillMaster
				.getLtPatientSaleBill().iterator(); itr.hasNext();) {
			PatientSaleBillSlave patientSaleSlave = itr.next();
			if (patientSaleSlave.getProductMaster().getBatchMaster().get(0)
					.getBatchId() == null
					|| patientSaleSlave.getProductMaster().getBatchMaster() == null) {
				itr.remove();
			}
		}

		if (patientSaleBillMaster.getPatientSalesBillId() == null) {
			patientSaleBillMaster.setPatientSalesBillDocNo(commonService
					.getDocumentNumber(2));

			Map<String, String> result = new HashMap<String, String>();

			String patientType = patientSaleBillMaster.getPatientType();

			if (patientSaleBillMaster.getPatientType().equals("all")) {
				patientType = patientSaleBillDao
						.getPatientTypeByTreatmentId(patientSaleBillMaster
								.getPatientSaleTreatmentId());
			}

			// Add amount receive in prescription
			for (PatientSaleBillSlave patientSaleBillSlave : patientSaleBillMaster
					.getLtPatientSaleBill()) {
				if (!(patientSaleBillSlave.getPatientSlaveipdopdId() == 0)
						&& patientType.equals("ipd")) {
					patientSaleBillDao.setAmountReceiveInOrderForm(
							patientSaleBillSlave.getPatientSlaveipdopdId(),
							patientSaleBillSlave.getPatientSlaveQty());
				}
				if (!(patientSaleBillSlave.getPatientSlaveipdopdId() == 0)
						&& patientType.equals("opd")) {
					patientSaleBillDao.setAmountReceiveInPrescription(
							patientSaleBillSlave.getPatientSlaveipdopdId(),
							patientSaleBillSlave.getPatientSlaveQty());
				}
			}

			result = patientSaleBillDao.saveOrUpdatePatientSaleBill(
					patientSaleBillMaster, storeId);

			String str = result.get("result");
			if (str.equals("Record Save Succesfully")) {
				// update document numbering

				patientSaleBillDao.setPendingBalancePatientSale(
						patientSaleBillMaster.getPatientSaleTreatmentId(),
						patientSaleBillMaster
								.getPatientSalesBillAmountBalance());

				DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
				DocumentMaster documentMaster = new DocumentMaster();
				documentMaster.setDocId(2);
				docNumberingMaster.setDocumentMaster(documentMaster);
				docNumberingService.updateDocumentNumbering(docNumberingMaster);
			}
			return result;
		} else {

			patientSaleBillMaster.setPatientSalesBillDocNo(commonService
					.getDocumentNumber(2));

			Map<String, String> result = new HashMap<String, String>();

			/*String patientType = patientSaleBillMaster.getPatientType();

			if (patientSaleBillMaster.getPatientType().equals("all")) {
				patientType = patientSaleBillDao
						.getPatientTypeByTreatmentId(patientSaleBillMaster
								.getPatientSaleTreatmentId());
			}
			
			// Add amount receive in prescription
			for (PatientSaleBillSlave patientSaleBillSlave : patientSaleBillMaster
					.getLtPatientSaleBill()) {
				if (!(patientSaleBillSlave.getPatientSlaveipdopdId() == 0)
						&& patientType.equals("ipd")) {
					patientSaleBillDao.setAmountReceiveInOrderForm(
							patientSaleBillSlave.getPatientSlaveipdopdId(),
							patientSaleBillSlave.getPatientSlaveQty());
				}
				if (!(patientSaleBillSlave.getPatientSlaveipdopdId() == 0)
						&& patientType.equals("opd")) {
					patientSaleBillDao.setAmountReceiveInPrescription(
							patientSaleBillSlave.getPatientSlaveipdopdId(),
							patientSaleBillSlave.getPatientSlaveQty());
				}
			}*/

			boolean updateBal = patientSaleBillDao.updateBalFlag(
					patientSaleBillMaster.getPatientSalesBillId(),
					patientSaleBillMaster.getPatientSalesBillAmountBalance());


			result = patientSaleBillDao.saveOrUpdatePatientSaleBill(
					patientSaleBillMaster, storeId);

			String str = result.get("result");
			if (str.equals("Record Save Succesfully")) {
				// update document numbering
				if (updateBal == false)
					patientSaleBillDao.setEditablePendingBalancePatientSale(
							patientSaleBillMaster.getPatientSaleTreatmentId(),
							patientSaleBillMaster.getPatientSalesBillId(),
							patientSaleBillMaster
									.getPatientSalesBillAmountBalance());

				DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
				DocumentMaster documentMaster = new DocumentMaster();
				documentMaster.setDocId(2);
				docNumberingMaster.setDocumentMaster(documentMaster);
				docNumberingService.updateDocumentNumbering(docNumberingMaster);

			}
			return result;

		}

	}
	@Override
	@Transactional
	public List<PatientSaleBillMaster> getPatientSales() {
		
		return patientSaleBillDao.getPatientSales();
	}
	
	@Override
	@Transactional
	public List<PatientSaleBillMaster> getPatientBillId(Integer patientId) {
		
		return patientSaleBillDao.getPatientBillId(patientId);
	}
			
	@Override
	@Transactional
	public List<PrescriptionMaster> getPrescription(Integer patientId) {
		
		return patientSaleBillDao.getPrescription(patientId);
	}
	
	@Override
	@Transactional
	public List<PrescriptionMaster> getPrescriptionOpd(Integer patientId) {
		
		return patientSaleBillDao.getPrescriptionOpd(patientId);
	}
	
	@Override
	@Transactional
	public List<PrescriptionMaster> getPrescriptionByEntireDB(Integer patientId) {
		
		return patientSaleBillDao.getPrescriptionByEntireDB(patientId);
	}
	
	@Override
	@Transactional
	public Boolean deletePatientSaleBill(Integer patientId) {
		

		return patientSaleBillDao.deletePatientSaleBill(patientId);
	}
	
	@Override
	@Transactional
	public PatientSaleBillMaster getPatientSaleBillId(Integer patientId) {
		
		return patientSaleBillDao.getPatientSaleBillId(patientId);
	}
	
	
	
	@Override
	@Transactional
	public String getProductDetails(Integer productId) {
		
		String str = "";
		ProductMaster productMaster = patientSaleBillDao
				.getProductDetails(productId);
		if (productMaster != null) {
			if(productMaster.getBatchMaster().size()!=0)
			{
			str = 	productMaster.getBatchMaster().get(0).getBatchCode()
					+ "#"
					+productMaster.getBatchMaster().get(0).getBatchExpDate()+"#"
					+productMaster.getBatchMaster().get(0).getProductMaster().getStockMasters().get(0).getStockQtyInHand();
				}
			
	
		}
		return str;
	}
	
	@Override
	@Transactional
	public String getDoctorDetailsByPatientId(Integer patientId,String typeOfPatient) {
		
		String str = "";
		DoctorDetails doctorDetails = patientSaleBillDao.getDoctorDetailsByPatientId(patientId,typeOfPatient);
				
		if (doctorDetails != null) {
			
			str = 	doctorDetails.getPatientName()
					+ "#"
					+doctorDetails.getPatientAddress()
					+"#"
					+doctorDetails.getDoctorId()
					+"#"
					+doctorDetails.getDoctorName()
					+"#"
					+doctorDetails.getDoctorAddress();
				}
			
				return str;
	}
	
	@Override
	@Transactional
	public String getPatientDetailsDetails(Integer patientId,String typeOfPatient) {
		
		String str = "";
		PatientDetails patientDetails = patientSaleBillDao.getPatientDetailsDetails(patientId,typeOfPatient);
				
		if (patientDetails != null) {
			
			str = 	patientDetails.getPatientId()
					+ "#"
					+patientDetails.getPatientAdd()
					+ "#"
					+patientDetails.getPatientName();
					;
				}
			
				return str;
	}
	
	@Override
	@Transactional
	public String getPatientTreatmentDetails(Integer patientId,String typeOfPatient) {
		
		String str = "";
		PatientDetails patientDetails = patientSaleBillDao.getPatientTreatmentDetails(patientId,typeOfPatient);
				
		if (patientDetails != null) {
			
			str = 	patientDetails.getPatientId()
					+ "#"
					+patientDetails.getTreatmentId();
				}
			
				return str;
	}
	
	
	@Override
	@Transactional
	public String getSponserDetailsDetails(Integer patientId) {
		
		String str = "";
		DoctorDetails doctorDetails = patientSaleBillDao.getSponserDetailsDetails(patientId);
				
		if (doctorDetails != null) {
			
			str = 	doctorDetails.getSponsorId()
					+ "#"
					+doctorDetails.getSponsorName()
					+ "#"
					+doctorDetails.getDoctorId();
				
				}
			
				return str;
	}
	
	@Override
	@Transactional
	public PatientSaleBillMaster getPatientSalesBillById(Integer patientSaleId) {
		return patientSaleBillDao.getPatientSalesBillById(patientSaleId);
	}
	
	@Override
	@Transactional
	public List<PendingBill> getCreditBills(Integer patientId) {
		List<PendingBill> pendingBills = patientSaleBillDao
				.getCreditBills(patientId);
		return pendingBills;
	}
	
	@Override
	@Transactional
	public PatientSale getSponserByPatientId(Integer indentId) {
		PatientSale patientSale=new PatientSale();
		patientSale=patientSaleBillDao.getSponserByPatientId(indentId);
		return patientSale;
	}
		
	@Override
	@Transactional
	public List<CreditNotePatient> getAllPatientSaleBillData(Integer patientId) {
		return patientSaleBillDao.getAllPatientSaleBillData(patientId);
	}

	@Override
	@Transactional
	public PatientSaleBillMaster getPatientSlaveByPatientId(Integer patientId) {
		return patientSaleBillDao.getPatientSlaveByPatientId(patientId);
	}
	
	@Override
	@Transactional
	public List<CreditNotePatient> getAllPatientReceiptDataByTreatmentId(
			Integer treatmentId) {
		return patientSaleBillDao.getAllPatientReceiptDataByTreatmentId(treatmentId);
	}
	
	@Override
	@Transactional
	public Double getPendingAmount(Integer treatmentId) {
		return patientSaleBillDao.getPendingAmount(treatmentId);
	}

	@Override
	@Transactional
	public List<PatientSaleBillMaster> getAllPatientDataByTreatmentId(
			Integer treatmentId) {
		return patientSaleBillDao.getAllPatientDataByTreatmentId(treatmentId);
	}
	
	@Override
	@Transactional
	public Double getPendingAmountByTreatmentId(Integer treatmentId, Integer spId) {
		return patientSaleBillDao.getPendingAmountByTreatmentId(treatmentId,spId);
	}
	
	@Override
	@Transactional
	public boolean savePatientPendingAmount(Integer treatmentId,Double amountReceive, Double discount, String narration,Double balance,String listStr) 
	{
		return patientSaleBillDao.savePatientPendingAmount(treatmentId,amountReceive,discount,narration,balance,listStr);
	}
	
	@Override
	@Transactional
	public FinalIndent getFinalBillDetailsForPatientSave(Integer treatmentId) {
		return patientSaleBillDao.getFinalBillDetailsForPatientSave(treatmentId);
	}
	
	@Override
	@Transactional
	public PatientSaleBill getPatientDataByTreatmentId(Integer treatmentId) 
	{
		PatientSaleBill indentSale=new PatientSaleBill();
		indentSale=patientSaleBillDao.getPatientDataByTreatmentId(treatmentId);
		return indentSale;
	}
	
	@Override
	@Transactional
	public List<settalBillIndent> getAllSettalBillByTreatmentId(
			Integer treatmentId) {
		return patientSaleBillDao.getAllSettalBillByTreatmentId(treatmentId);
	}
	
	@Override
	@Transactional
	public List<settalBillIndent> getAllSettalBillHistoryByTreatmentId(
			Integer patientId) {
		return patientSaleBillDao.getAllSettalBillHistoryByTreatmentId(patientId);
	}
	
	
	@Override
	@Transactional
	public FinalIndent getFinalBillDetails(Integer treatmentId) {
		return patientSaleBillDao.getFinalBillDetails(treatmentId);
	}
	
	@Override
	@Transactional
	public List<PatientSaleBillMaster> searchPatientSaleByPatientId(Integer patientId) {
		
		return patientSaleBillDao.getPatientBillId(patientId);
	}
	
	@Override
	@Transactional
	public List<PatientSaleBillMaster> searchPatientSaleByInvoiceId(Integer invoiceId) {
		
		return patientSaleBillDao.searchPatientSaleByInvoiceId(invoiceId);
	}
	
	@Override
	@Transactional
	public PatientSaleBillMaster getPatientSaleBillIdForView(Integer patientId) {
		
		return patientSaleBillDao.getPatientSaleBillIdForView(patientId);
	}
	
	@Override
	@Transactional
	public Double getPreBalance(String treatmentId) 
	{
		return patientSaleBillDao.getPreBalance(treatmentId);
	}
	
	
	@Override
	@Transactional
	public JSONObject getSponserStatus(Integer treatmentId) {
		return patientSaleBillDao.getSponserStatus(treatmentId);
	}
	
	@Override
	@Transactional
	public String getMRPType(Integer treatmentId) {
		return patientSaleBillDao.getMRPType(treatmentId);
	}
	
	@Override
	@Transactional
	public PatientSale getPatientSaleTransType(Integer indentId) {
		PatientSale patientSale=new PatientSale();
		patientSale=patientSaleBillDao.getPatientSaleTransType(indentId);
		return patientSale;
	}
	
	@Override
	@Transactional
	public void savePatientSaleBill(List<PurchaseMaster> purchaseMasterList, int patientId,
			int treatmentId) {
		
		//Object patientMaster=commonService.getPatientById(patientId);
		List<PatientSaleBillSlave> patientSaleBillSlaves = new ArrayList<PatientSaleBillSlave>();
		
		double totalAmt=0.0;
		double totalVat=0.0;
		
		for(PurchaseMaster purchaseMaster : purchaseMasterList){
		for(PurchaseSlave purchaseSlave : purchaseMaster.getLtPurSlave()){
			
			PatientSaleBillSlave patientSaleBillSlave=new PatientSaleBillSlave();
			
				patientSaleBillSlave.setPatientSlaveBatchId(purchaseSlave
								.getProductMaster().getBatchMaster().get(0)
								.getBatchId());
				patientSaleBillSlave.setPatientSaleBatchExpiry(purchaseSlave
								.getProductMaster().getBatchMaster().get(0).getBatchExpDate());
				patientSaleBillSlave.setPatientSaleSlaveIssueQty(purchaseSlave.getPurSlaveQty()+0.0);
				patientSaleBillSlave.setPatientSlaveAmt(purchaseSlave.getPurSlaveAmt());
				patientSaleBillSlave.setPatientSlaveBatchCode(purchaseSlave
								.getProductMaster().getBatchMaster().get(0).getBatchCode());
				patientSaleBillSlave.setPatientSlaveipdopdId(0);
				patientSaleBillSlave.setPatientSlaveMrp(purchaseSlave.getPurSlaveMrp());
				patientSaleBillSlave.setPatientSlavePrescriptionId(1);
				patientSaleBillSlave.setPatientSlavePurchaseRate(purchaseSlave.getPurSlavePurchaseRate());
				patientSaleBillSlave.setPatientSlaveQty(purchaseSlave.getPurSlaveQty());
				patientSaleBillSlave.setPatientSlaveRate(purchaseSlave.getPurslaverate());
				patientSaleBillSlave.setProductMaster(purchaseSlave.getProductMaster());
				patientSaleBillSlave.setPatientSlaveVat(purchaseSlave.getPurCess()+purchaseSlave.getPurIgst()+purchaseSlave.getPurVat());
				patientSaleBillSlave.setPatientSlaveVatAmt(purchaseSlave.getPurslaverate()*purchaseSlave.getPurVat()/100);
				patientSaleBillSlave.setPatientSlaveRatePerUnit(purchaseSlave.getPurslaverate()/purchaseSlave.getPurSlaveQty());
				patientSaleBillSlave.setPatientSlaveDisc(0.0);
		
				totalAmt+=(patientSaleBillSlave.getPatientSlaveRate()*purchaseSlave.getPurSlaveQty());
				totalVat+=patientSaleBillSlave.getPatientSlaveVatAmt();
			patientSaleBillSlaves.add(patientSaleBillSlave);
		}
		}
		
		PatientSaleBillMaster patientSaleBillMaster = new PatientSaleBillMaster();
		patientSaleBillMaster.setPatientSalesBillDeleteFlag(0);
		patientSaleBillMaster.setPatientSalesBillUpdateDate(new Date(new java.util.Date().getTime()));

		patientSaleBillMaster.setLtPatientSaleBill(patientSaleBillSlaves);
			
			patientSaleBillMaster.setPatientSalesBillDocNo("Doc"+Math.random());//commonService.getDocumentNumber(2)
			patientSaleBillMaster.setPatientId(patientId);
			patientSaleBillMaster.setDoctorId(1);
			patientSaleBillMaster.setPatientBillMode(0+"");
			patientSaleBillMaster.setPatientBillDate(new java.util.Date());
			patientSaleBillMaster.setPatientBillAmt(totalAmt);
			patientSaleBillMaster.setPatientSalePreviousBalance(0.0);
			patientSaleBillMaster.setPatientSaleBillCatId(1);
			patientSaleBillMaster.setPatientSalesBillAmountReceived(totalAmt);
			patientSaleBillMaster.setPatientSalesBillGrossAmt(totalAmt);
			patientSaleBillMaster.setPatientSalesBillNetAmt(totalAmt+totalVat);
			patientSaleBillMaster.setPatientSalesBillUpdateDate(new java.util.Date());
			patientSaleBillMaster.setPatientType(0+"");
			patientSaleBillMaster.setDoctorName("");
			patientSaleBillMaster.setPatientSaleTreatmentId(treatmentId);
			patientSaleBillMaster.setPatientSalesBillLess("0");
			patientSaleBillMaster.setPatientSalesBillSurcharge("0");
			patientSaleBillMaster.setPatientTaxVat5(0.0);
			
			//unwanted
			patientSaleBillMaster.setPatientSalesBillAdd(0+"");
			patientSaleBillMaster.setPatientTaxVat0(0.0);
			patientSaleBillMaster.setPatientTaxVat12(0.0);
			patientSaleBillMaster.setPatientTaxVat135(0.0);
			patientSaleBillMaster.setPatientTaxVat6(0.0);
			patientSaleBillMaster.setPatientTaxVat55(0.0);
			patientSaleBillMaster.setPatientSalesBillCD(""+0);
			
			Map<String, String> result= new HashMap<String, String>();
			
			/*String patientType=patientSaleBillMaster.getPatientType();
			
			//Add amount receive in prescription
			for (PatientSaleBillSlave patientSaleBillSlave : patientSaleBillMaster.getLtPatientSaleBill()) 
			{
			if(!(patientSaleBillSlave.getPatientSlaveipdopdId()==0) && patientType.equals("ipd"))
			{
				patientSaleBillDao.setAmountReceiveInOrderForm(patientSaleBillSlave.getPatientSlaveipdopdId(),patientSaleBillSlave.getPatientSlaveQty());
			}
			if(!(patientSaleBillSlave.getPatientSlaveipdopdId()==0) && patientType.equals("opd"))
			{
				patientSaleBillDao.setAmountReceiveInPrescription(patientSaleBillSlave.getPatientSlaveipdopdId(),patientSaleBillSlave.getPatientSlaveQty());
			}
			}	*/
			
			result=patientSaleBillDao.saveOrUpdatePatientSaleBill(patientSaleBillMaster,"");
			
			String str=result.get("result");
			if (str.equals("Record Save Succesfully")) {
			// update document numbering
				patientSaleBillMaster.setPatientSalesBillAmountBalance(0.0);
				patientSaleBillDao.setPendingBalancePatientSale(patientSaleBillMaster.getPatientSaleTreatmentId(),patientSaleBillMaster.getPatientSalesBillAmountBalance());

			DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
			DocumentMaster documentMaster = new DocumentMaster();
			documentMaster.setDocId(2);
			docNumberingMaster.setDocumentMaster(documentMaster);
			docNumberingService.updateDocumentNumbering(docNumberingMaster);
		} 
		
	}
	
	@Override
	@Transactional
	public List<DoctorDto> fetchDoctorList(String doctorType) {
		// TODO Auto-generated method stub
		return patientSaleBillDao.fetchDoctorList(doctorType);
	}
	
	@Override
	@Transactional
	public List<RegTreBillDto> fetchPharmaPatientNameAutoSuggest(String patientName,String typeOfpatient,String isEdit) {
		// TODO Auto-generated method stub
		return patientSaleBillDao.fetchPharmaPatientNameAutoSuggest(patientName,typeOfpatient,isEdit );
	}
	@Override
	public String getPendingAmountByTreatmentIdPatientSale(Integer treatmentId, Integer spId) {
		// TODO Auto-generated method stub
		return patientSaleBillDao.getPendingAmountByTreatmentIdPatientSale(treatmentId,spId);
	}
		
	@Override
	@Transactional
	public List<RegTreBillDto> fetchPharmaPatientNameAutoSuggestNew(String patientName,String typeOfpatient,String isEdit,String callFrom) {
		// TODO Auto-generated method stub
		return patientSaleBillDao.fetchPharmaPatientNameAutoSuggestNew(patientName,typeOfpatient,isEdit ,callFrom);
	}
	
}