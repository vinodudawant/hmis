package com.hms.pharmacy.service.impl;

import java.io.FileOutputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;
import com.hms.pharmacy.upload.FilePath;
import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.PdfWriter;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

@Service
public class OpeningStockServiceImpl implements OpeningStockService {
	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	OpeningStockDao openingStockDao;

	@Autowired
	PurchaseDao purchaseDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateOpeningStock(OpeningStock openingStock,
			int productunit, int purchaseSlaveId) {
		
		int batchId=0;
		if (openingStock.getOpeningStockId() == null) {
			openingStock.setOpeningStockAddDate(new java.util.Date());
			openingStock.setOpeningStockUpdateDate(new java.util.Date());
			PurchaseRateHistory purchaseRateHistory = new PurchaseRateHistory();

			if (openingStock.getBatchId() == 0) {
				BatchMaster batchMaster = new BatchMaster();

				ProductMaster productMaster = new ProductMaster();
				productMaster.setProductId(openingStock.getProductId());

				batchMaster.setProductMaster(productMaster);
				batchMaster.setBatchDeleteFlag(0);
				batchMaster.setBatchUpdateDate(new Date(new java.util.Date()
						.getTime()));
				
				
				
				batchMaster.setBatchExpDate(openingStock.getBatchExpiry());
				batchMaster.setBatchCode(openingStock.getBatchCode());

				StockMaster stockMaster = new StockMaster();
				stockMaster.setStockDeleteFlag(0);
				stockMaster.setStockUpdateDate(new Date(new java.util.Date()
						.getTime()));

				Integer quantity = openingStock.getQuantity();
				Integer unit = productunit;
				Integer total = quantity * unit;

				stockMaster.setStockQtyInHand(Double.parseDouble(total
						.toString()));
				stockMaster.setStockProductMaster(productMaster);
				stockMaster.setBatchMaster(batchMaster);

				stockMaster.setStockQtyOnOrder(0);
				batchMaster.setStockMaster(stockMaster);
				
				try {
					String batchExpiryDate =  openingStock.getBatchExpiry();
					String date2 []= batchExpiryDate.split("/");
					String date = "20"+date2[1] +"-"+date2[0]+"-"+ "01"+" "+"00:00:00";
					System.out.println("date1>>>"+date);
	            	batchMaster.setBatchExpDatetimestamp(date);
					}
					catch (Exception e) {
						e.printStackTrace();
					}

				try {
					openingStockDao.saveBatchDetails(batchMaster);
				} catch (Exception e) {
					e.printStackTrace();
				}

				openingStock.setBatchId(batchMaster.getBatchId());
				PurchaseRateHistory purchaseRateHistory1 = new PurchaseRateHistory();
				purchaseRateHistory1.setMrp(openingStock.getMrp());
				purchaseRateHistory1.setBatchId(batchMaster.getBatchId());
				purchaseRateHistory1.setPurRate(openingStock.getPurRate());
				purchaseRateHistory1.setRate(openingStock.getRate());
				purchaseRateHistory1.setUpdateDate(new java.util.Date());
				purchaseRateHistory1.setBillRate(openingStock.getRate());
				try {
					purchaseDao.savePurchaseRateDetails(purchaseRateHistory1);
				} catch (Exception e) {
					e.printStackTrace();
				}

			} else {

				PurchaseRateHistory purchaseRateHistory2 = new PurchaseRateHistory();

				if(purchaseSlaveId >0)
				{
					purchaseRateHistory2.setPurSlaveId(purchaseSlaveId);
				}
				else
				{	
					purchaseRateHistory2.setPurSlaveId(0);
				}	

				purchaseRateHistory2.setBatchId(openingStock.getBatchId());

				try {
					purchaseRateHistory2 = purchaseDao
							.getPurchaseRateDetails1(purchaseRateHistory2);
				} catch (Exception e) {
					e.printStackTrace();
				}

				//if block when pur rate is same as existing batch
				if (purchaseRateHistory2.getPurRate().equals(
						openingStock.getPurRate())) {
					/*
					 * double purRate= purchaseRateHistory2.getPurRate();
					 * if(purchaseRateHistory2.getPurRate().equals(null) ||
					 * purchaseRateHistory2.getPurRate().equals("null")) { purRate
					 * =purchaseRateHistory2.getMrp();
					 * 
					 * }
					 */

					purchaseRateHistory.setPurRateId(purchaseRateHistory2
							.getPurRateId());
					if(purchaseSlaveId >0)
					{
						purchaseRateHistory.setPurSlaveId(purchaseSlaveId);
					}
					else
					{
						purchaseRateHistory.setPurSlaveId(0);
					}
					purchaseRateHistory.setMrp(openingStock.getMrp());
					purchaseRateHistory.setBatchId(openingStock.getBatchId());
					purchaseRateHistory.setPurRate(openingStock.getPurRate());
					purchaseRateHistory.setRate(openingStock.getMrp());
					purchaseRateHistory.setUpdateDate(new java.util.Date());
					purchaseRateHistory.setBillRate(purchaseRateHistory2.getBillRate());

					try {
						purchaseDao
								.updatePurchaseRateDetails(purchaseRateHistory);
					} catch (Exception e) {
						e.printStackTrace();
					}

					Integer quantity = openingStock.getQuantity();
					Integer unit = productunit;
					Integer total = quantity * unit;

					try {
						purchaseDao.increaseStock(openingStock.getBatchId(),
								total);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}//else block for add new batch when pur rate not equals
				else
				{
					BatchMaster batchMaster = new BatchMaster();

					ProductMaster productMaster = new ProductMaster();
					productMaster.setProductId(openingStock.getProductId());

					batchMaster.setProductMaster(productMaster);
					batchMaster.setBatchDeleteFlag(0);
					batchMaster.setBatchUpdateDate(new Date(new java.util.Date()
							.getTime()));
					batchMaster.setBatchExpDate(openingStock.getBatchExpiry());
					batchMaster.setBatchCode(openingStock.getBatchCode());

					StockMaster stockMaster = new StockMaster();
					stockMaster.setStockDeleteFlag(0);
					stockMaster.setStockUpdateDate(new Date(new java.util.Date()
							.getTime()));

					Integer quantity = openingStock.getQuantity();
					Integer unit = productunit;
					Integer total = quantity * unit;

					stockMaster.setStockQtyInHand(Double.parseDouble(total
							.toString()));
					stockMaster.setStockProductMaster(productMaster);
					stockMaster.setBatchMaster(batchMaster);

					stockMaster.setStockQtyOnOrder(0);
					batchMaster.setStockMaster(stockMaster);
					
					try {
						String batchExpiryDate =  openingStock.getBatchExpiry();
						String date2 []= batchExpiryDate.split("/");
						String date = "20"+date2[1] +"-"+date2[0]+"-"+ "01"+" "+"00:00:00";
						System.out.println("date1>>>"+date);
		            	batchMaster.setBatchExpDatetimestamp(date);
						}
						catch (Exception e) {
							e.printStackTrace();
						}

					try {
						openingStockDao.saveBatchDetails(batchMaster);
					} catch (Exception e) {
						e.printStackTrace();
					}
					openingStock.setBatchId(batchMaster.getBatchId());
					PurchaseRateHistory purchaseRateHistory1 = new PurchaseRateHistory();
					purchaseRateHistory1.setMrp(openingStock.getMrp());
					purchaseRateHistory1.setBatchId(batchMaster.getBatchId());
					purchaseRateHistory1.setPurRate(openingStock.getPurRate());
					purchaseRateHistory1.setRate(openingStock.getRate());
					purchaseRateHistory1.setUpdateDate(new java.util.Date());
					purchaseRateHistory1.setBillRate(openingStock.getRate());
					try {
						purchaseDao.savePurchaseRateDetails(purchaseRateHistory1);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}//end of else block
			}
		}
		
		/*if(batchId!=0)
		{
			openingStock.setBatchId(batchId);
		}*/
	
		
		
		if (openingStockDao.saveOrUpdateOpeningStock(openingStock)) {
			try
			{
				Document document = new Document(new Rectangle(PageSize.A4));
				PdfWriter writer;
				writer = PdfWriter.getInstance(document, new FileOutputStream(FilePath.getPHARMACYBARCODE()+"openingStock-"+openingStock.getOpeningStockId()+".pdf"));
				document.open();
							
					for(int i=0;i<openingStock.getQuantity();i++)
					{
					/*document.add(new Paragraph("Product Name :" + openingStock.getBatchCode()));*/
					document.add(new Paragraph("Batch Code :" + openingStock.getBatchCode()));
					Barcode128 code128 = new Barcode128();
					code128.setCode(openingStock.getBatchId()+"-"+openingStock.getProductId());
					/*code128.setAltText(purchaseSlave.getBatchCode());
					code128.setGenerateChecksum(true);*/
					document.add(code128.createImageWithBarcode(
							writer.getDirectContent(), null, null));
					
				
					}
				
				document.close();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			
			return true;
		} else {
			return false;
		}

	}

	@Override
	@Transactional
	public List<BatchMaster> getBatchByBatchCode(String batchCode) {
		return openingStockDao.getBatchByBatchCode(batchCode);
	}

	@Override
	@Transactional
	public List<OpeningStockResult> getOpeningStockList() {
		return openingStockDao.getOpeningStockList();
	}

	@Override
	@Transactional
	public List<OpeningStockResult> getOpeningStockByShlef(Integer shelfId) {
		return openingStockDao.getOpeningStockByShlef(shelfId);
	}
	

	@Override
	@Transactional
	public Boolean deleteOpeningStock(Integer compId) {
		// TODO Auto-generated method stub
		
		return openingStockDao.deleteOpeningStock(compId);
	}
	
	@Override
	@Transactional
	public OpeningStock getOpeningStockById(Integer purchaseId) {
		return openingStockDao.getOpeningStockById(purchaseId);
	}
	
	
	@Override
	@Transactional
	public ProductMaster getProductMasterDetails(Integer productId) {
		ProductMaster productMaster=new ProductMaster();
		productMaster= openingStockDao.getProductMasterDetails(productId);
		return productMaster;
	}
	
	
	@Override
	@Transactional
	public List<OpeningStockResult> getOpeningStockByProduct(Integer productId) {
		return openingStockDao.getOpeningStockByProduct(productId);
	}

	@Override
	@Transactional
	public double getGSTamount(int taxtId) {
		
		return openingStockDao.getGSTamount(taxtId);
	}
	
}
