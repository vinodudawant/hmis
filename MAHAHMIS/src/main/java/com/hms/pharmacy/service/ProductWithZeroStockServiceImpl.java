package com.hms.pharmacy.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;

@Service
public class ProductWithZeroStockServiceImpl implements ProductWithZeroStockService
{
	@Autowired
	ProductWithZeroStockDao productWithZeroStock;
	
	@Autowired
	CommonService commonService;
	
	@Autowired
	DocumentNumberingService docNumberingService;
	
	@Override
	@Transactional(readOnly=true)
	public List<ProductwithZeroStock> getZeroStockProductList()
	{
		List<ProductMaster> result = productWithZeroStock.getZeroStockProductList();
		List<ProductwithZeroStock> productBelowMinLevels = new ArrayList<ProductwithZeroStock>();
		for (ProductMaster productMaster : result) 
		{
			
			if(productMaster.getProductDesc().equals("0.0"))
			{
			ProductwithZeroStock belowMinLevel = new ProductwithZeroStock();
			if (productMaster.getProductMinLevel() != null) {
				belowMinLevel.setProductId(productMaster.getProductId()
						.toString());
				belowMinLevel.setProductName(productMaster.getProductName());
				belowMinLevel.setPacking(productMaster.getPackingMaster()
						.getPackType());

				if (productMaster.getProductMinLevel() != null)
					belowMinLevel.setMinLevel(productMaster
							.getProductMinLevel().toString());

				if (productMaster.getProductMaxLevel() != null)
					belowMinLevel.setMaxLevel(productMaster
							.getProductMaxLevel().toString());

				belowMinLevel.setTotalStock(productMaster.getProductDesc());

				/* belowMinLevel.setTotalStock(productMaster.getProductDesc()); */

				belowMinLevel.setVat(productMaster.getProductFixDiscount());

				belowMinLevel.setUnit(productMaster.getProductUnit());

				productBelowMinLevels.add(belowMinLevel);
			}
			
		}
		}
		
		return productBelowMinLevels;
	}
	
	@Override
	@Transactional
	public Boolean saveOrUpdatePO(PoMaster poMaster) {
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

		// add sr. no
		Integer cnt = 0;
		List<PoSlave> ltPOSlaves = new ArrayList<PoSlave>();
		for (PoSlave poSlave : poMaster.getLtPOslave()) {
			cnt++;
			poSlave.setPoSlaveSr(cnt);
			ltPOSlaves.add(poSlave);
		}
		poMaster.setLtPOslave(ltPOSlaves);
		
		if (poMaster.getPoId() == null) {
			PartywisePoInvoiceMaster partywisePoInvoiceMaster = new PartywisePoInvoiceMaster();
			partywisePoInvoiceMaster.setPoMaster(poMaster);
			poMaster.setPartywisePoInvoiceMaster(partywisePoInvoiceMaster);
			}

		poMaster.setPoDeleteFlag(0);
		poMaster.setPoUpdateDate(new Date(new java.util.Date().getTime()));

		List<PoSlave> counterSaleSlaves = poMaster.getLtPOslave();

		if (productWithZeroStock.saveOrUpdatePO(poMaster)) {
			return true;
		} else {
			return false;
		}

	}
	
	@Override
	@Transactional
	public PoMaster getPOByIdForPrint(Integer poId) {
		return productWithZeroStock.getPOByIdForPrint(poId);
	}
	
	@Override
	@Transactional
	public List<PoMaster> getPOList() {
		// TODO Auto-generated method stub
		return productWithZeroStock.getPOList();
	}
	
	@Override
	@Transactional
	public List<PoMaster> getPObyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		return productWithZeroStock.getPObyVendorId(vendorId);
	}


}
