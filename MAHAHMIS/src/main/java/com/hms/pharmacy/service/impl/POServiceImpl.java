package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.PODao;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.PartywisePoInvoiceMaster;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.PoSlave;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.POService;

@Service
public class POServiceImpl implements POService {

	@Autowired
	PODao poDao;

	@Autowired
	DocumentNumberingService docNumberingService;

	@Autowired
	CommonService commonService;

	@Override
	@Transactional
	public Integer saveOrUpdatePO(PoMaster poMaster) {
		// TODO Auto-generated method stub
		poMaster.setPoDeleteFlag(0);
		poMaster.setPoType("0");
		poMaster.setPoUpdateDate(new Date(new java.util.Date().getTime()));
		
		if (poMaster.getPoId() == null) {
			poMaster.getLtPOslave().remove(poMaster.getLtPOslave().size() - 1);
		}
		
		if (poMaster.getLtPOslave().get(poMaster.getLtPOslave().size() - 1)
				.getProductMaster().getProductId() == null) {
			poMaster.getLtPOslave().remove(poMaster.getLtPOslave().size() - 1);
		}

		if (poMaster.getPoId() == null) {
			PartywisePoInvoiceMaster partywisePoInvoiceMaster = new PartywisePoInvoiceMaster();
			partywisePoInvoiceMaster.setPoMaster(poMaster);
			poMaster.setPartywisePoInvoiceMaster(partywisePoInvoiceMaster);
		}

		// delete Row
		List<PoSlave> newPoSlaves = new ArrayList<PoSlave>();
		List<PoSlave> newPoSlaves1 = poMaster.getLtPOslave();
		for (PoSlave poSlave : newPoSlaves1) {
			if (poSlave.getProductMaster().getProductId() != null) {
				newPoSlaves.add(poSlave);
			}
		}

		poMaster.setLtPOslave(newPoSlaves);

		// add sr. no
		Integer cnt = 0;
		List<PoSlave> ltPOSlaves = new ArrayList<PoSlave>();
		for (PoSlave poSlave : poMaster.getLtPOslave()) {
			cnt++;
			poSlave.setPoSlaveSr(cnt);
			ltPOSlaves.add(poSlave);
		}

		// update document numbering
		if (poMaster.getPoId() == null) {
			poMaster.setPodocId(commonService.getDocumentNumber(2));

			DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
			DocumentMaster documentMaster = new DocumentMaster();
			documentMaster.setDocId(2);
			docNumberingMaster.setDocumentMaster(documentMaster);
			docNumberingService.updateDocumentNumbering(docNumberingMaster);

		} else {
			// poMaster.setPodocId();
		}
		//Boolean flag = false;
		int p=0;
		try {
			p = poDao.saveOrUpdatePO(poMaster);
			/*
			 * if(p>0) flag=true;
			 */
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return p;
	}

	@Override
	@Transactional
	public Boolean deletePO(Integer poId) {
		// TODO Auto-generated method stub
		return poDao.deletePO(poId);
	}

	@Override
	@Transactional
	public List<PoMaster> getPOList(Integer unitId) {
		// TODO Auto-generated method stub
		return poDao.getPOList(unitId);
	}

	@Override
	@Transactional
	public List<PoMaster> getPObyVendorId(Integer vendorId,Integer unitId) {
		// TODO Auto-generated method stub
		return poDao.getPObyVendorId(vendorId,unitId);
	}

	@Override
	@Transactional
	public PoMaster getPOById(Integer poId) {
		// TODO Auto-generated method stub
		return poDao.getPOById(poId);
	}

	@Override
	@Transactional
	public List<String> getLastPurchaseVendor(Integer productId) {
		List<PurchaseMaster> ltPurchaseMaster = poDao
				.getLastPurchaseVendor(productId);

		List<String> ltLastPurchasedDetails = new ArrayList<String>();
		int i = 0;
		if (ltPurchaseMaster != null) {
			for (PurchaseMaster purchaseMaster : ltPurchaseMaster) {
				// vendor_name vendor_id
				// ltPurSlave-- qty,,,, scheme,,, mrp,, total_amt,,, pur_rate

				String temp = purchaseMaster.getVendorMaster().getVendorName()
						+ "_"
						+ purchaseMaster.getLtPurSlave().get(0)
								.getPurSlaveQty()
						+ "_"
						+ purchaseMaster.getLtPurSlave().get(0)
								.getPurSlaveMrp()
						+ "_"
						+ purchaseMaster.getLtPurSlave().get(0)
								.getPurslaverate()
								+ "_"
						+ purchaseMaster.getLtPurSlave().get(0)
								.getPurVat()
								+ "_"
						+ purchaseMaster.getLtPurSlave().get(0)
								.getPurIgst()
								+ "_"
						+ purchaseMaster.getLtPurSlave().get(0)
								.getPurCess()
								+"_"
						+ purchaseMaster.getLtPurSlave().get(0)
								.getPurSlaveBillRate();
				
				ltLastPurchasedDetails.add(temp);
				i++;
			}
		}
		return ltLastPurchasedDetails;
	}

	@Override
	@Transactional
	public PoMaster getPurchaseOrderByPurchaseId(Integer poId) {
		return poDao.getPurchaseOrderByPurchaseId(poId);
	}

	@Override
	@Transactional
	public PoMaster getPOByIdForPrint(Integer poId) {
		return poDao.getPOByIdForPrint(poId);
	}

	@Override
	@Transactional
	public Integer getNextAutoIncrement() {
		// TODO Auto-generated method stub
		return poDao.getNextAutoIncrement();
	}

	@Override
	@Transactional
	public List<PoMaster> getPendingPO() {
		return poDao.getPendingPO();
	}

	@Override
	@Transactional
	public Map<String, String> saveOrUpdatePOInSale(PoMaster poMaster) {
		Map<String, String> result = new HashMap<String, String>();
		if (poMaster.getPoId() == null) {
			PartywisePoInvoiceMaster partywisePoInvoiceMaster = new PartywisePoInvoiceMaster();
			partywisePoInvoiceMaster.setPoMaster(poMaster);
			poMaster.setPartywisePoInvoiceMaster(partywisePoInvoiceMaster);
			}
		
		result = poDao.saveOrUpdatePOInSale(poMaster);

		return result;
	}

	@Override
	@Transactional
	public Integer savePO(PoMaster poMaster) {
		poMaster.setPoDeleteFlag(0);
		poMaster.setPoType("0");
		poMaster.setPoUpdateDate(new Date(new java.util.Date().getTime()));
		
		/*PartywisePoInvoiceMaster partywisePoInvoiceMaster = new PartywisePoInvoiceMaster();
		partywisePoInvoiceMaster.setPoMaster(poMaster);
		poMaster.setPartywisePoInvoiceMaster(partywisePoInvoiceMaster);
*/
		// update document numbering
		poMaster.setPodocId("Doc"+Math.random());//commonService.getDocumentNumber(2)

		/*DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
		DocumentMaster documentMaster = new DocumentMaster();
		documentMaster.setDocId(2);
		docNumberingMaster.setDocumentMaster(documentMaster);
		docNumberingService.updateDocumentNumbering(docNumberingMaster);*/

		Integer id=0;
		try {
			id=poDao.saveOrUpdatePO(poMaster);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return id;
	}

}
