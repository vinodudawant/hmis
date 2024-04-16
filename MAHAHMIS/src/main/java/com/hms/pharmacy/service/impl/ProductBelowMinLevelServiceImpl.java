package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.ProductBelowMinLevelDao;
import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.CounterSaleSlave;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.PartywisePoInvoiceMaster;
import com.hms.pharmacy.pojo.PoMaster;
import com.hms.pharmacy.pojo.PoSlave;
import com.hms.pharmacy.pojo.ProductBelowMinLevel;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.ProductBelowMinLevelService;

@Service
public class ProductBelowMinLevelServiceImpl implements ProductBelowMinLevelService {

	@Autowired
	ProductBelowMinLevelDao belowMinLevelDao;

	@Autowired
	DocumentNumberingService docNumberingService;

	@Autowired
	CommonService commonService;

	/*
	 * @Override
	 * 
	 * @Transactional(readOnly = true) public List<ProductBelowMinLevel>
	 * getMinLevelProductList() {
	 * 
	 * int productCounter = 0; int productBelowMinLevelCounter = 0;
	 * List<ProductMaster> result = belowMinLevelDao.getMinLevelProductList();
	 * List<ProductBelowMinLevel> productBelowMinLevels = new
	 * ArrayList<ProductBelowMinLevel>();
	 * 
	 * for (ProductMaster productMaster : result) { ProductBelowMinLevel
	 * belowMinLevel = new ProductBelowMinLevel(); if
	 * (productMaster.getProductMinLevel() != null) {
	 * belowMinLevel.setProductId(productMaster.getProductId() .toString());
	 * belowMinLevel.setProductName(productMaster.getProductName());
	 * belowMinLevel.setPacking(productMaster.getPackingMaster() .getPackType());
	 * 
	 * if (productMaster.getProductMinLevel() != null)
	 * belowMinLevel.setMinLevel(productMaster .getProductMinLevel().toString());
	 * 
	 * if (productMaster.getProductMaxLevel() != null)
	 * belowMinLevel.setMaxLevel(productMaster .getProductMaxLevel().toString());
	 * 
	 * Integer totalStock=0; for(StockMaster
	 * stockMaster:productMaster.getStockMasters()) { totalStock=(int)
	 * (totalStock+stockMaster.getStockQtyInHand()); }
	 * 
	 * belowMinLevel.setTotalStock(productMaster.getProductDesc());
	 * 
	 * 
	 * Integer diff=Integer.parseInt(belowMinLevel.getTotalStock())-Integer
	 * .parseInt(belowMinLevel.getMinLevel());
	 * belowMinLevel.setDifferenceOfStock(diff);
	 * 
	 * productBelowMinLevels.add(belowMinLevel); } }
	 * 
	 * 
	 * return productBelowMinLevels;
	 * 
	 * }
	 */

	@Override
	@Transactional(readOnly = true)
	public List<ProductBelowMinLevel> getMinLevelProductListData() {

		int productCounter = 0;
		int productBelowMinLevelCounter = 0;
		List<ProductMaster> result = belowMinLevelDao.getMinLevelProductListData();
		List<ProductBelowMinLevel> productBelowMinLevels = new ArrayList<ProductBelowMinLevel>();
		/* List<ProductMaster> result=new ArrayList<ProductMaster>(); */

		/*
		 * for(ProductMaster productMaster:productMasters) { int totalStock=0;
		 * for(StockMaster stockMaster:productMaster.getStockMasters()) {
		 * if(stockMaster.getStockQtyInHand()!=null) totalStock=(int)
		 * (totalStock+stockMaster.getStockQtyInHand()); } try {
		 * if(productMaster.getProductMinLevel()!=null) { if(totalStock <
		 * productMaster.getProductMinLevel()) { if(
		 * productMaster.getStockMasters().size() >0) { result.add(productMaster); } } }
		 * } catch(Exception e) { e.printStackTrace(); }
		 * 
		 * 
		 * productCounter++; }
		 */
		for (ProductMaster productMaster : result) {
			ProductBelowMinLevel belowMinLevel = new ProductBelowMinLevel();
			if (productMaster.getProductMinLevel() != null) {
				belowMinLevel.setProductId(productMaster.getProductId().toString());
				belowMinLevel.setProductName(productMaster.getProductName());
				belowMinLevel.setPacking(productMaster.getPackingMaster().getPackType());

				if (productMaster.getProductMinLevel() != null)
					belowMinLevel.setMinLevel(productMaster.getProductMinLevel().toString());

				if (productMaster.getProductMaxLevel() != null)
					belowMinLevel.setMaxLevel(productMaster.getProductMaxLevel().toString());

				belowMinLevel.setTotalStock(productMaster.getProductDesc());

				/* belowMinLevel.setTotalStock(productMaster.getProductDesc()); */

				belowMinLevel.setVat(productMaster.getProductFixDiscount());

				belowMinLevel.setUnit(productMaster.getProductUnit());

				productBelowMinLevels.add(belowMinLevel);
			}
		}

		return productBelowMinLevels;

	}

	/*
	 * @Override
	 * 
	 * @Transactional public Boolean saveOrUpdatePO(PoMaster poMaster) { // TODO
	 * Auto-generated method stub poMaster.setPoDeleteFlag(0);
	 * poMaster.setPoUpdateDate(new Date(new java.util.Date().getTime())); if
	 * (poMaster.getPoId() == null) {
	 * poMaster.getLtPOslave().remove(poMaster.getLtPOslave().size() - 1); } if
	 * (poMaster.getLtPOslave().get(poMaster.getLtPOslave().size() - 1)
	 * .getProductMaster().getProductId() == null) {
	 * poMaster.getLtPOslave().remove(poMaster.getLtPOslave().size() - 1); }
	 * 
	 * if (poMaster.getPoId() == null) { PartywisePoInvoiceMaster
	 * partywisePoInvoiceMaster = new PartywisePoInvoiceMaster();
	 * partywisePoInvoiceMaster.setPoMaster(poMaster);
	 * poMaster.setPartywisePoInvoiceMaster(partywisePoInvoiceMaster); }
	 * 
	 * //delete Row List<PoSlave> newPoSlaves = new ArrayList<PoSlave>();
	 * List<PoSlave> newPoSlaves1=poMaster.getLtPOslave(); for(PoSlave
	 * poSlave:newPoSlaves1) { if (poSlave.getProductMaster().getProductId() !=
	 * null) { newPoSlaves.add(poSlave); } }
	 * 
	 * poMaster.setLtPOslave(newPoSlaves);
	 * 
	 * 
	 * // add sr. no Integer cnt = 0; List<PoSlave> ltPOSlaves = new
	 * ArrayList<PoSlave>(); for (PoSlave poSlave : poMaster.getLtPOslave()) {
	 * cnt++; poSlave.setPoSlaveSr(cnt); ltPOSlaves.add(poSlave); }
	 * 
	 * // update document numbering if (poMaster.getPoId() == null) {
	 * poMaster.setPodocId(commonService.getDocumentNumber(2));
	 * 
	 * DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
	 * DocumentMaster documentMaster = new DocumentMaster();
	 * documentMaster.setDocId(2);
	 * docNumberingMaster.setDocumentMaster(documentMaster);
	 * docNumberingService.updateDocumentNumbering(docNumberingMaster);
	 * 
	 * 
	 * } else { // poMaster.setPodocId(); } Boolean flag = false; try { flag =
	 * belowMinLevelDao.saveOrUpdatePO(poMaster); } catch (Exception e) {
	 * System.out.println(e.getMessage()); }
	 * 
	 * return flag; }
	 */

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

		if (belowMinLevelDao.saveOrUpdatePO(poMaster)) {
			return true;
		} else {
			return false;
		}

	}

	@Override
	@Transactional
	public PoMaster getPOByIdForPrint(Integer poId) {
		return belowMinLevelDao.getPOByIdForPrint(poId);
	}

	@Override
	@Transactional
	public List<PoMaster> getPOList() {
		// TODO Auto-generated method stub
		return belowMinLevelDao.getPOList();
	}

	@Override
	@Transactional
	public List<PoMaster> getPObyVendorId(Integer vendorId) {
		// TODO Auto-generated method stub
		return belowMinLevelDao.getPObyVendorId(vendorId);
	}

	@Override
	@Transactional
	public List<ProductBelowMinLevel> getMinLevelProductListnew() {

		return belowMinLevelDao.getMinLevelProductListnew();
	}

	@Override
	@Transactional
	public List<ProductBelowMinLevel> getMaxLevelProductList() {
		/*
		 * int productCounter = 0; int productBelowMinLevelCounter = 0;
		 * List<ProductMaster> result = belowMinLevelDao.getMaxLevelProductList();
		 * List<ProductBelowMinLevel> productBelowMinLevels = new
		 * ArrayList<ProductBelowMinLevel>();
		 * 
		 * for (ProductMaster productMaster : result) { ProductBelowMinLevel
		 * belowMinLevel = new ProductBelowMinLevel(); if
		 * (productMaster.getProductMinLevel() != null) {
		 * belowMinLevel.setProductId(productMaster.getProductId() .toString());
		 * belowMinLevel.setProductName(productMaster.getProductName());
		 * belowMinLevel.setPacking(productMaster.getPackingMaster() .getPackType());
		 * 
		 * if (productMaster.getProductMinLevel() != null)
		 * belowMinLevel.setMinLevel(productMaster .getProductMinLevel().toString());
		 * 
		 * if (productMaster.getProductMaxLevel() != null)
		 * belowMinLevel.setMaxLevel(productMaster .getProductMaxLevel().toString());
		 * 
		 * belowMinLevel.setTotalStock(productMaster.getProductDesc());
		 * 
		 * 
		 * productBelowMinLevels.add(belowMinLevel); } }
		 */

		return belowMinLevelDao.getMaxLevelProductList();

	}

}
