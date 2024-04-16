package com.hms.pharmacy.service.impl;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import com.hms.pharmacy.dao.PartywisePoDao;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.PartywisePoInvoiceMaster;
import com.hms.pharmacy.pojo.PartywisePoMaster;
import com.hms.pharmacy.pojo.PartywisePoSlave;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.PartywisePoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PartywisePoServiceImpl implements PartywisePoService
{
	@Autowired
	PartywisePoDao partywisePoDao;

	@Autowired
	DocumentNumberingService docNumberingService;

	@Override
	@Transactional
	public Boolean saveOrUpdatePO(PartywisePoMaster poMaster) {
		// TODO Auto-generated method stub
		poMaster.setPoDeleteFlag(0);
		poMaster.setPoUpdateDate(new Date(new java.util.Date().getTime()));
		/*if (poMaster.getPoId() == null) {
			poMaster.getLtPOslave().remove(poMaster.getLtPOslave().size() - 1);
		}*/
		if (poMaster.getLtPOslave().get(poMaster.getLtPOslave().size() - 1)
				.getProductMaster().getProductId() == null) {
			poMaster.getLtPOslave().remove(poMaster.getLtPOslave().size() - 1);
		}

		if (poMaster.getPoId() == null) {
			PartywisePoInvoiceMaster partywisePoInvoiceMaster = new PartywisePoInvoiceMaster();
			partywisePoInvoiceMaster.setPartywisePoMaster(poMaster);
			poMaster.setPartywisePoInvoiceMaster(partywisePoInvoiceMaster);
			}
		
		// add sr. no
				Integer cnt = 0;
				List<PartywisePoSlave> ltPOSlaves = new ArrayList<PartywisePoSlave>();
				for (PartywisePoSlave poSlave : poMaster.getLtPOslave()) {
					cnt++;
					poSlave.setPoSlaveSr(cnt);
					ltPOSlaves.add(poSlave);
				}
				
				

		// update document numbering
		if (poMaster.getPoId() == null) {
			DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
			DocumentMaster documentMaster = new DocumentMaster();
			documentMaster.setDocId(2);
			docNumberingMaster.setDocumentMaster(documentMaster);
			docNumberingService.updateDocumentNumbering(docNumberingMaster);
		} else {
			// poMaster.setPodocId();
		}
		Boolean flag = false;
		try {
			flag = partywisePoDao.saveOrUpdatePO(poMaster);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return flag;
	}

	@Override
	@Transactional
	public Boolean deletePO(Integer poId) {
		// TODO Auto-generated method stub
		return partywisePoDao.deletePO(poId);
	}

	@Override
	@Transactional
	public List<PartywisePoMaster> getPOList() {
		// TODO Auto-generated method stub
		return partywisePoDao.getPOList();
	}

	@Override
	@Transactional
	public List<PartywisePoMaster> getPObyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		return partywisePoDao.getPObyVendorId(vendorId);
	}

	@Override
	@Transactional
	public PartywisePoMaster getPOById(Integer poId) {
		// TODO Auto-generated method stub
		return partywisePoDao.getPOById(poId);
	}

	@Override
	@Transactional
	public PartywisePoMaster getPOByIdEdit(Integer poId) {
		// TODO Auto-generated method stub
		return partywisePoDao.getPOByIdEdit(poId);
	}

	
	@Override
	@Transactional
	public List<String> getLastPurchaseVendor(Integer productId) {
		List<PurchaseMaster> ltPurchaseMaster = partywisePoDao
				.getLastPurchaseVendor(productId);

		List<String> ltLastPurchasedDetails = new ArrayList<String>();
		int i=0;
		if (ltPurchaseMaster != null) {
			for (PurchaseMaster purchaseMaster : ltPurchaseMaster) {
				// vendor_name vendor_id
				// ltPurSlave-- qty,,,, scheme,,, mrp,, total_amt,,, pur_rate
				
				String temp = purchaseMaster.getVendorMaster().getVendorName()+"_"+purchaseMaster.getLtPurSlave().get(0).getPurSlaveQty()+"_"+purchaseMaster.getLtPurSlave().get(0).getPurSlaveMrp()+"_"+purchaseMaster.getLtPurSlave().get(0).getPurslaverate();
				ltLastPurchasedDetails.add(temp);
				i++;
			}
		}
		return ltLastPurchasedDetails;
	}

}
