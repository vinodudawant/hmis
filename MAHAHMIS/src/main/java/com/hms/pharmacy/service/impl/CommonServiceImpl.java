package com.hms.pharmacy.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.CommonDao;
import com.hms.pharmacy.dao.DocumentNumberingDao;
import com.hms.pharmacy.dao.ProductDao;
import com.hms.pharmacy.dao.PurchaseDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.StockMasterSlave;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.CommonService;

@Service
public class CommonServiceImpl implements CommonService {

	@Autowired
	DocumentNumberingDao documentNumberingDao;
	
	@Autowired
	CommonDao commonDao;
	
	@Autowired
	ProductDao productDao;
	
	@Autowired
	PurchaseDao purchaseDao;

	@Override
	@Transactional
	public String getDocumentNumber(Integer docId) {
		String temp = "";

		List<DocumentNumberingMaster> ltDocNumberingMaster = documentNumberingDao
				.getDocumentNumberingById(docId);

		// prefix-year-series-docnum-autosuggestion-suffix
		for (DocumentNumberingMaster documentNumberingMaster : ltDocNumberingMaster) {

			if (documentNumberingMaster.getDocPrefix() != "") {
				temp = temp + documentNumberingMaster.getDocPrefix();
			}
			if (documentNumberingMaster.getYearMaster() != null) {
				temp=temp+documentNumberingMaster.getYearMaster().getYearFinancial().charAt(2);
				temp=temp+documentNumberingMaster.getYearMaster().getYearFinancial().charAt(3);
				temp=temp+documentNumberingMaster.getYearMaster().getYearFinancial().charAt(7);
				temp=temp+documentNumberingMaster.getYearMaster().getYearFinancial().charAt(8);
			}
			if (documentNumberingMaster.getDocSeries() != "") {
				temp = temp + documentNumberingMaster.getDocSeries();
			}
			if (documentNumberingMaster.getDocNo() != null) {
				temp = temp + (documentNumberingMaster.getDocNo() + 1);
			}
			if (documentNumberingMaster.getDocSuffix() != "") {
				temp = temp + documentNumberingMaster.getDocSuffix();
			}
		}
		return temp;
	}

	@Override
	@Transactional
	public JSONArray getHospitalPaymentDetails() {
		return commonDao.getHospitalPaymentDetails();
	}

	@Override
	@Transactional
	public JSONObject getHospitalPaymentDetailsById(Integer receiveId) {
		return commonDao.getHospitalPaymentDetailsById(receiveId);
	}

	@Override
	@Transactional
	public boolean getUserAccess(HttpServletRequest request,String url) {
		HttpSession httpSession=request.getSession();
		String pharmacyAccess=(String)httpSession.getAttribute("pharmacyAccess");
		boolean isFound=false;
		try
		{
			JSONArray newJArray = new JSONArray(pharmacyAccess);
			List<String> lists=new ArrayList<String>();
			
			for(int i=0;i<newJArray.length();i++)
			{
				JSONObject jsonObject=newJArray.getJSONObject(i);
				lists.add((String)jsonObject.get("moduleName"));
			}
			
			
			for(int i=0;i<newJArray.length();i++)
			{
				JSONObject jsonObject=newJArray.getJSONObject(i);
				String result=((String)jsonObject.get("moduleName"));
				if(url.contains(result))
					isFound=true;
			}
		}
		catch(Exception e)
		{
			
		}
		return isFound;
	}

	@Override
	@Transactional
	public List<String> getDiscountSurchargeDetails(Integer saleId, String type) {
		return commonDao.getDiscountSurchargeDetails(saleId,type);
	}
	
	@Override
	@Transactional
	public List<String> getDiscountSurchargeDetailsOfPurchase(Integer saleId) {
		return commonDao.getDiscountSurchargeDetailsOfPurchase(saleId);
	}

	@Override
	@Transactional
	public String saveCathLabProduct(String productMasters,
			int patientId, int treatmentId) {
		Map<Integer,List<ProductMaster>> map=new LinkedHashMap<Integer,List<ProductMaster>>();
		List<VendorMaster> vendorMasters=new ArrayList<VendorMaster>();
		VendorAddress vendorAddresses=new VendorAddress();
		vendorAddresses.setVendorAddressId(1);
		String arr[]=productMasters.split(",");
		for(String i : arr){
			
			ProductMaster productMaster=new ProductMaster();
			
			PurchaseSlave purchaseSlave=purchaseDao.getCathProductInfo(Integer.parseInt(i),1.0);

			if(purchaseSlave!=null){
		
				productMaster.setProductId(Integer.parseInt(i));
				productMaster.setProductLastMRP(purchaseSlave.getPurSlaveMrp());
				productMaster.setProductLastPurRate(purchaseSlave.getPurSlaveBillRate());
				productMaster.setHsn(purchaseSlave.getPurHsn()+"");
				productMaster.setIgst(purchaseSlave.getPurIgst()+"");
				productMaster.setCess(purchaseSlave.getPurCess()+"");
				productMaster.setCgst((purchaseSlave.getPurVat()/2)+"");
				productMaster.setSgst((purchaseSlave.getPurVat()/2)+"");
				productMaster.setProductFixDiscount(purchaseSlave.getPurDisc());
				productMaster.setVendorMasters(purchaseSlave.getProductMaster().getVendorMasters());
				List<BatchMaster> batchMasters=new ArrayList<BatchMaster>();
				batchMasters.add(purchaseSlave.getBatchMaster());
				productMaster.setBatchMaster(batchMasters);
				productMaster.setProductUnit(1.0);
				
				//below fields are for updation purpose at last
				productMaster.setProductX(purchaseSlave.getPurSlaveId());
				
				if(map.containsKey(productMaster.getVendorMasters().get(0).getVendorId())){
					map.get(productMaster.getVendorMasters().get(0).getVendorId()).add(productMaster);
				} 
				else{
					List<ProductMaster> productMasters1=new ArrayList<ProductMaster>();
					productMasters1.add(productMaster);
					vendorMasters.add(productMaster.getVendorMasters().get(0));
					map.put(productMaster.getVendorMasters().get(0).getVendorId(), productMasters1);
				}
			}
		}
		int key=0;
		for (Iterator<Map.Entry<Integer,List<ProductMaster>>> entries = map.entrySet().iterator(); entries.hasNext(); ) {
		    Map.Entry<Integer,List<ProductMaster>> entry = entries.next();
		    List<VendorAddress> addresses=new ArrayList<VendorAddress>();
		    addresses.add(vendorAddresses);
		    vendorMasters.get(key).setVendorAddresses(addresses);
		    vendorMasters.get(key++).setProductMasters(entry.getValue());
		   // i += entry.getKey() + entry.getValue();
		}
		
		return commonDao.saveCathLabProduct(vendorMasters,patientId,treatmentId);
	}

	@Override
	@Transactional
	public Object getPatientById(int patientId) {
		return commonDao.getPatientById(patientId);
	}

	@Override
	@Transactional
	public String getHospitalState() {
		return commonDao.getHospitalState();
	}

	@Override
	@Transactional
	public void saveStockMasterSlave(StockMasterSlave stockMasterSlave) {
		commonDao.saveStockMasterSlave(stockMasterSlave);
	}
	
	@Override
	@Transactional
	public void updateStockMasterSlave(StockMasterSlave stockMasterSlave) {
		commonDao.updateStockMasterSlave(stockMasterSlave);
	}

	@Override
	@Transactional
	public StockMasterSlave getStockMasterSlave(int id) {
		return commonDao.getStockMasterSlave(id);
	}

	@Override
	@Transactional
	public void setstockMasterSlave(Integer invoiceId, String type,
			int patientId, int treatmentId, Integer productId, Integer batchId,
			String batchCode, int storeId, Integer stockInQty, int stockOutQty, Double gst,
			Double igst, Double cess, Double disc, int unitId, Integer vendorId,Double mrp, Double rate) {
		
		StockMasterSlave slave=new StockMasterSlave();
		
		slave.setInvoiceId(invoiceId);
		slave.setTransType(type);
		slave.setPatientId(patientId);
		slave.setTretmentId(treatmentId);
		slave.setProductId(productId);
		slave.setBatchId(batchId);
		slave.setBatchCode(batchCode);
		slave.setStoreId(storeId);
		slave.setStockInQty(stockInQty);
		slave.setStockOutQty(stockOutQty);
		slave.setGst(gst);
		slave.setIgst(igst);
		slave.setCess(cess);
		slave.setDisc(disc);
		slave.setUnitId(unitId);
		slave.setVendorId(vendorId);
		slave.setDeleteFlag(0);
		slave.setOpDate(new Date());
		slave.setMRP(mrp);
		slave.setPurRate(rate);
		
		commonDao.saveStockMasterSlave(slave);
		
	}

	@Override
	@Transactional
	public String getWardNameByTreatment(int treatmentId) {
		return commonDao.getWardNameByTreatment(treatmentId);
	}
}
