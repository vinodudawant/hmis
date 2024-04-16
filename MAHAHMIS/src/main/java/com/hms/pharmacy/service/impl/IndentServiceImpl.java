package com.hms.pharmacy.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.IndentDao;
import com.hms.pharmacy.pojo.CreditNoteIndent;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.FinalIndent;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.pharmacy.pojo.IndentMasterResult;
import com.hms.pharmacy.pojo.IndentSale;
import com.hms.pharmacy.pojo.IndentSaleMaster;
import com.hms.pharmacy.pojo.IndentSaleSlave;
import com.hms.pharmacy.pojo.PatientPharmaDetails;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.settalBillIndent;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.IndentService;

@Service
public class IndentServiceImpl implements IndentService{

	@Autowired
	IndentDao indentDao;
	
	@Autowired
	DocumentNumberingService docNumberingService;
	
	@Override
	@Transactional
	public void saveIndent(IndentMaster indentMaster) {
		indentMaster.setIndentDeleteFlag(0);
		indentMaster.setIndentGenerateDate(new Date());
		indentMaster.setIndentStatus("pending");

		//List<IndentSlave> newIndentSlaves1 = indentMaster.getLtIndentSlave();
		try {
			/*for (Iterator<IndentSlave> itr = newIndentSlaves1.iterator(); itr
					.hasNext();) {
				IndentSlave indentSlave=itr.next();
				if (indentSlave.getIndentProductId() == null) {
					itr.remove();
				}
				else
					indentSlave.setIndentSlavePendingQty(0);
			}

			indentMaster.setLtIndentSlave(newIndentSlaves1);*/

			indentDao.saveIndent(indentMaster);

			/*
			 * for(IndentSlave indentSlave:indentMaster.getLtIndentSlave()) {
			 * int number=indentSlave.getIndentOrderCompId(); Order_comp_druges
			 * druges=indentDao.getOrderCompById(number); }
			 */
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	@Transactional
	public JSONArray getIndentDetailsByDate(String date,Integer storeId) {
		
		String fromArray[] = date.split("/");
		
		String fromReult = new String();
		fromReult = fromArray[2] + "-" + fromArray[1] + "-"
				+ fromArray[0]+" "+"00:00:00";
	String	date2 = fromArray[2] + "-" + fromArray[1] + "-"+ fromArray[0];
		
		System.out.println("fromReult---"+fromReult);
	
		JSONArray jsonArray=new JSONArray();
		SimpleDateFormat dateFormat=new SimpleDateFormat("dd/MM/yyyy");
		Date parseDate=null;
		try
		{
			parseDate=dateFormat.parse(date);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		List<IndentMaster> indentMasters= indentDao.getIndentDetailsByDate(parseDate,storeId);
				
		List<String> list=new ArrayList<String>();
		for(IndentMaster indentMaster:indentMasters)
		{
			try
			{
				JSONObject jsonObject=new JSONObject();
				String id=indentMaster.getIndentId().toString();
				
				String patientName=indentDao.getPatientDetailsByTreatmentId(indentMaster.getIndentTreatmentId());
				
				String hallName=indentDao.getPatientHallDetailsByTreatmentId(indentMaster.getIndentTreatmentId());
				
				String patientType=indentDao.getIndentPatientTypeDetailsByDate(id);	
				
				jsonObject.put("IndentId", id);
				jsonObject.put("patientName", patientName);
				jsonObject.put("receivedFrom", indentMaster.getIndentReceivedFrom().toString());
				jsonObject.put("storeName", indentMaster.getIndentStoreName());
				jsonObject.put("wardName", hallName);
				jsonObject.put("categoryName", patientType);
				
				jsonArray.put(jsonObject);
				list.add(id);
				
				/*id=id+"-"+patientName+"-"+indentMaster.getIndentReceivedFrom().toString()+"-"+indentMaster.getIndentStoreName();*/
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			
		}
		return jsonArray;
	}

	@Override
	@Transactional
	public IndentMaster getIndentDataById(Integer indentId) {
		return indentDao.getIndentDataById(indentId);
	}

	@Override
	@Transactional
	public IndentSale getPatientDataByTreatmentId(Integer treatmentId) {
		IndentSale indentSale=new IndentSale();
		indentSale=indentDao.getPatientDataByTreatmentId(treatmentId);
		return indentSale;
	}
	
	@Override
	@Transactional
	public IndentSale getSponserDataByTreatmentId(Integer treatmentId) {
		IndentSale indentSale=new IndentSale();
		indentSale=indentDao.getSponserDataByTreatmentId(treatmentId);
		return indentSale;
	}

	@Override
	@Transactional
	public String getProductNameByProductId(Integer productId) {
		ProductMaster productMaster=new ProductMaster();
		
		productMaster=indentDao.getProductNameByProductId(productId);
		String productName=productMaster.getProductName();
		return productName;
	}

	@Override
	@Transactional
	public Map<String, String> saveIndentSale(IndentSaleMaster indentSaleMaster,String storeId) {
		indentSaleMaster.setIndentSaleDeleteFlag(0);
		indentSaleMaster.setIndentSaleUpdateDate(new Date(
				new java.util.Date().getTime()));

		/*if (indentSaleMaster
				.getIndentSaleSlaves()
				.get(indentSaleMaster.getIndentSaleSlaves().size() - 1)
				.getProductMaster().getProductId() == null) {
			indentSaleMaster
			.getIndentSaleSlaves()
					.remove(indentSaleMaster.getIndentSaleSlaves()
							.size() - 1);
		}*/
		
		
		//List<IndentSaleSlave> newIndentSlaves = new ArrayList<IndentSaleSlave>();
		
		List<IndentSaleSlave> newIndentSlaves1=indentSaleMaster.getIndentSaleSlaves();
		
		for(Iterator<IndentSaleSlave> itr=newIndentSlaves1.iterator();itr.hasNext();)
		{	
			IndentSaleSlave indentSaleSlave=itr.next();
			if (indentSaleSlave.getProductMaster().getProductId() == null) {
				itr.remove();
			}
			else if(indentSaleSlave.getProductMaster().getBatchMaster().get(0).getBatchId()!=null){
				indentSaleSlave.setIndentSaleSlaveBatchId(indentSaleSlave.getProductMaster().getBatchMaster().get(0).getBatchId());
			}
		}
		
		indentSaleMaster.setIndentSaleSlaves(newIndentSlaves1);
		
		/*
		List<IndentSaleSlave> indentSaleSlaves=new ArrayList<IndentSaleSlave>();
		
		List<IndentSaleSlave> indentSaleSlaves2=indentSaleMaster.getIndentSaleSlaves();
		for(IndentSaleSlave indentSaleSlave:indentSaleSlaves2)
		{
			if(indentSaleSlave.getProductMaster().getBatchMaster().get(0).getBatchId()!=null)
			{
				indentSaleSlave.setIndentSaleSlaveBatchId(indentSaleSlave.getProductMaster().getBatchMaster().get(0).getBatchId());
			}
			indentSaleSlaves.add(indentSaleSlave);
		}
		
		indentSaleMaster.setIndentSaleSlaves(indentSaleSlaves);*/
		
		Map<String, String> result= new HashMap<String, String>();

		result=indentDao.saveIndentSale(indentSaleMaster,storeId);
		String str=result.get("result");
		if (str.equals("Record Save Succesfully")) {
			
			try
			{
				// update document numbering

				DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
				DocumentMaster documentMaster = new DocumentMaster();
				documentMaster.setDocId(2);
				docNumberingMaster.setDocumentMaster(documentMaster);
				docNumberingService.updateDocumentNumbering(docNumberingMaster);
				if(indentSaleMaster.getIndentTaxVat0().intValue()==0)
					indentDao.setIndentStatus(indentSaleMaster.getIndentMaster().getIndentId());
				
				int treatmentId=indentDao.getTreatmentId(indentSaleMaster.getIndentMaster().getIndentId());
				indentDao.setPendingBalance(treatmentId,indentSaleMaster.getIndentSaleAmountBalance());
				
				saveIpdBillDetails(indentSaleMaster);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		} 
		
		return result;
	}
	
	public void saveIpdBillDetails(IndentSaleMaster indentSaleMaster)
	{
		indentDao.saveIpdBillDetails(indentSaleMaster);
	}

	@Override
	@Transactional
	public IndentSaleMaster getIndentSaleById(Integer indentSaleId) {
		return indentDao.getIndentSaleById(indentSaleId);
	}

	@Override
	@Transactional
	public List<IndentSaleMaster> getIndentList() {
		return indentDao.getIndentList();
	}

	@Override
	@Transactional
	public IndentSaleMaster getIndentSaleByClientIndentId(Integer indentSaleId) {
		return indentDao.getIndentSaleByClientIndentId(indentSaleId);
	}

	@Override
	@Transactional
	public List<IndentSaleMaster> getIndentSaleByPatientId(Integer indentSaleId) {
		return indentDao.getIndentSaleByPatientId(indentSaleId);
	}

	
	@Override
	@Transactional
	public Boolean deleteIndent(Integer indentSaleId,String type,Integer userId,String ip) {
		return indentDao.deleteIndent(indentSaleId,type,userId,ip);
	}

	@Override
	@Transactional
	public List<IndentMaster> getPendingIndentDetails() {
		return indentDao.getPendingIndentDetails();
	}

	@Override
	@Transactional
	public List<IndentMasterResult> getPendingIndentDetailsForMaster() {
		return indentDao.getPendingIndentDetailsForMaster();
	}

	
	@Override
	@Transactional
	public IndentSale getPatientDataByIndentId(Integer indentId) {
		IndentSale indentSale=new IndentSale();
		indentSale=indentDao.getPatientDataByIndentId(indentId);
		return indentSale;
	}
	
	@Override
	@Transactional
	public IndentSale getSponserByIndentId(Integer indentId) {
		IndentSale indentSale=new IndentSale();
		indentSale=indentDao.getSponserByIndentId(indentId);
		return indentSale;
	}
	
	@Override
	@Transactional
	public IndentSale getConsultantByIndentId(Integer indentId) {
		IndentSale indentSale=new IndentSale();
		indentSale=indentDao.getConsultantByIndentId(indentId);
		return indentSale;
	}
	
	
	@Override
	@Transactional
	public List<IndentSaleMaster> getAutoSuggestionIndentNames(
			Integer letter) {
		return indentDao.getAutoSuggestionIndentNames(letter);

	}
	
	/*@Override
	@Transactional
	public List<Patient> autoSuggestionPatientName(String letter) 
	{
		
		List<Patient> p=new ArrayList<Patient>();
		List<String> str=indentDao.autoSuggestionPatientName(letter);	
		System.out.println(str.get(0));
		return p;
		
	}
*/
	@Override
	@Transactional
	public Double getPendingAmount(Integer indentNo) {
		return indentDao.getPendingAmount(indentNo);
	}

	@Override
	@Transactional
	public List<IndentSale> getAllPatientData() {
		return indentDao.getAllPatientData();
	}

	@Override
	@Transactional
	public List<IndentSaleMaster> getAllIndentDataByTreatmentId(
			Integer treatmentId) {
		return indentDao.getAllIndentDataByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public String getPendingAmountByTreatmentId(Integer treatmentId, Integer spId) {
		return indentDao.getPendingAmountByTreatmentId(treatmentId,spId);
	}
	
	@Override
	@Transactional
	public Double getTotalDiscountOnBillByTreatmentId(Integer treatmentId) {
		return indentDao.getTotalDiscountOnBillByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public boolean saveIndentPendingAmount(Integer treatmentId,
			Double amountReceive, Double discount, String narration,Double amountBalance,String listStr)
	{
		return indentDao.saveIndentPendingAmount(treatmentId,amountReceive,discount,narration,amountBalance,listStr);
	}

	@Override
	@Transactional
	public boolean saveIndentComment(Integer treatmentId,String narration,Integer user,String ipaddress)
	{
		return indentDao.saveIndentComment(treatmentId,narration,user,ipaddress);
	}
	
	@Override
	@Transactional
	public FinalIndent getFinalBillDetails(Integer treatmentId) {
		return indentDao.getFinalBillDetails(treatmentId);
	}

	@Override
	@Transactional
	public List<CreditNoteIndent> getAllIndentProductDataByTreatmentId(
			Integer treatmentId) {
		return indentDao.getAllIndentProductDataByTreatmentId(treatmentId);
	}
	
	@Override
	@Transactional
	public List<CreditNoteIndent> getAllIndentReceiptDataByTreatmentId(
			Integer treatmentId) {
		return indentDao.getAllIndentReceiptDataByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public List<settalBillIndent> getAllSettalBillByTreatmentId(
			Integer treatmentId) {
		return indentDao.getAllSettalBillByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public Double getReceiveAmountByTreatmentId(Integer treatmentId) {
		return indentDao.getReceiveAmountByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public boolean saveHospitalPayDetails(String amount, Integer treatmentId,String BalanceType) {
		return indentDao.saveHospitalPayDetails(amount,treatmentId,BalanceType);
	}

	@Override
	@Transactional
	public boolean saveHospitalTotalPayDetails(int treatmentId, float pharmabalance,float totalbill,float totalrecieved,float patientbalance,String narration, Integer userId) {
		return indentDao.saveHospitalTotalPayDetails(treatmentId,pharmabalance,totalbill,totalrecieved,patientbalance,narration,userId);
		
	}
	
	@Override
	@Transactional
	public FinalIndent getFinalBillDetailsForSave(Integer treatmentId) {
		return indentDao.getFinalBillDetailsForSave(treatmentId);
	}
	
	@Override
	@Transactional
	public List<settalBillIndent> getAllSettalBillPatientDataByTreatmentId(Integer patientId)
	{
		return indentDao.getAllSettalBillPatientDataByTreatmentId(patientId);
	}

	@Override
	@Transactional
	public JSONArray getPreviousIndentData(Integer treatmentId) {
		return indentDao.getPreviousIndentData(treatmentId);
	}

	@Override
	@Transactional
	public JSONArray getCancelIndentData(Integer treatmentId) {
		return indentDao.getCancelIndentData(treatmentId);
	}
	
	@Override
	@Transactional
	public JSONArray getTotalindetDataByTreatmentId(Integer treatmentId) {
		return indentDao.getTotalindetDataByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public List<IndentSaleMaster> getMultipleIndentSaleDataById(
			Integer indentSalelId) {
		return indentDao.getMultipleIndentSaleDataById(indentSalelId);
	}

	@Override
	@Transactional
	public List<settalBillIndent> getHospitalPaymentDetailsTreatmentId(
			Integer treatmentId) {
		return indentDao.getHospitalPaymentDetailsTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public FinalIndent printHospitalPaymentReceipt(Integer receiptId) {
		return indentDao.printHospitalPaymentReceipt(receiptId);
	}
	
	@Override
	@Transactional
	public Integer chkIndentReceived(Integer indentNo) 
	{
			return indentDao.chkIndentReceived(indentNo);
	}
	
	@Override
	@Transactional
	public Double getPreBalance(String treatmentId) 
	{
			return indentDao.getPreBalance(treatmentId);
	}
	
	@Override
	@Transactional
	public JSONObject getSponserStatus(Integer treatmentId) {
		return indentDao.getSponserStatus(treatmentId);
	}
	
	@Override
	@Transactional
	public String getMRPType(Integer treatmentId) {
		return indentDao.getMRPType(treatmentId);
	}

	/******
	 * @author  :BILAL
	 * @Date    :11-12-2017
	 * @Code    :For getting patient by name 
	 * ********/
	@Override
	@Transactional
	public JSONArray getIndentDetailsByPatient(String findingName, int storeId) {
		
		JSONArray jsonArray=new JSONArray();
		/*SimpleDateFormat dateFormat=new SimpleDateFormat("dd/MM/yyyy");
		Date parseDate=null;
		try
		{
			parseDate=dateFormat.parse(date);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}*/
		
		List<IndentMaster> indentMasters= indentDao.getIndentDetailsByPatient(storeId);
		
		List<String> list=new ArrayList<String>();
		for(IndentMaster indentMaster:indentMasters)
		{
			try
			{
				JSONObject jsonObject=new JSONObject();
				String id=indentMaster.getIndentId().toString();
				
				String patientName=indentDao.getPatientDetailsByTreatmentId(indentMaster.getIndentTreatmentId());
				
				String hallName=indentDao.getPatientHallDetailsByTreatmentId(indentMaster.getIndentTreatmentId());
				
				
				jsonObject.put("IndentId", id);
				jsonObject.put("patientName", patientName);
				jsonObject.put("receivedFrom", indentMaster.getIndentReceivedFrom().toString());
				jsonObject.put("storeName", indentMaster.getIndentStoreName());
				jsonObject.put("wardName", hallName);
				
				jsonArray.put(jsonObject);
				list.add(id);
			}
			catch(Exception e)
			{
				
			}
			
		}
		return jsonArray;
	}

	@Override
	@Transactional
	public List<PatientPharmaDetails> fetchIndentDetailsByPatientName2(
			String findingName, Integer unitId, String storeId) {
		
		return indentDao.fetchIndentDetailsByPatientName2(findingName, unitId, storeId);
	}

	@Override
	@Transactional
	public List<PatientPharmaDetails> fetchIndentIds(int indenttreatementid,
			Integer unitId, String storeId) {
		
		return indentDao.fetchIndentIds(indenttreatementid, unitId, storeId);
	}

	@Override
	@Transactional
	public Double getReturnAmt(Integer treatmentId) {
		return indentDao.getReturnAmt(treatmentId);
	}
	
	@Override
	@Transactional
	public List<IndentSaleSlave> getIndentSaleDataByTreatId(Integer treatmentId) {
		return indentDao.getIndentSaleDataByTreatId(treatmentId);
	}

	@Override
	@Transactional
	public List<IndentSaleMaster> autoSuggestionPatientName(String letter) {
		// TODO Auto-generated method stub
		return indentDao.autoSuggestionPatientName(letter);
	}
	
	@Override
	@Transactional
	public String editPreIndentByIndentId(IndentMaster indentMaster) {
		return indentDao.editPreIndentByIndentId(indentMaster);		
	}
	
	@Override
	@Transactional
	public List<IndentMaster> searchIndentSalePatientDetails(String findtext) {
		// TODO Auto-generated method stub
		return indentDao.searchIndentSalePatientDetails(findtext);
	}

}
