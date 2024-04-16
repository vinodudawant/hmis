package com.hms.pharmacy.service.impl;

import java.io.FileOutputStream;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.PurchaseDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.CorrectionRate;
import com.hms.pharmacy.pojo.CounterSaleMaster;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseCorrection;
import com.hms.pharmacy.pojo.PurchaseHistory;
import com.hms.pharmacy.pojo.PurchaseHistory2;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseRateHistory;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.StockMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.CommonService;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.PurchaseService;
import com.hms.pharmacy.upload.FilePath;
import com.itextpdf.text.Document;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	PurchaseDao purchaseDao;

	@Autowired
	DocumentNumberingService docNumberingService;

	@Autowired
	CommonService commonService;

	@Override
	@Transactional
	public Boolean saveOrUpdatePurchase(PurchaseMaster purchaseMaster, PurchaseMaster oldPurchaseMaster,Integer unitId) {

		for (Iterator<PurchaseSlave> itr = purchaseMaster.getLtPurSlave().iterator(); itr.hasNext();) {
			if (itr.next().getProductMaster().getProductId() == null) {
				itr.remove();
			}
		}

		if (purchaseMaster.getPurId() == null) {
			purchaseMaster.setPurDeleteFlag(0);
			purchaseMaster.setDispatchflag("N");
			purchaseMaster.setDispatchunitId(1);
			purchaseMaster.setPurUpdateDate(new Date(new java.util.Date().getTime()));
			purchaseMaster.setPurchase_date_time(new Date(new java.util.Date().getTime()));

			// add sr. no
			Integer cnt = 0;
			List<PurchaseSlave> ltPurchaseSlaves = new ArrayList<PurchaseSlave>();

			for (PurchaseSlave purchaseSlave : purchaseMaster.getLtPurSlave()) {
				cnt++;
				purchaseSlave.setPurSlaveSr(cnt);

				// add batch details
				List<BatchMaster> ltBatchMasters = purchaseSlave.getProductMaster().getBatchMaster();
				List<BatchMaster> newBatchMasters = new ArrayList<BatchMaster>();

				for (BatchMaster batchMaster : ltBatchMasters) {
					if (batchMaster.getBatchId() == null) {
						batchMaster.setProductMaster(purchaseSlave.getProductMaster());
						newBatchMasters.add(batchMaster);
						batchMaster.setBatchDeleteFlag(0);
						batchMaster.setBatchUpdateDate(new Date(new java.util.Date().getTime()));
						batchMaster.setUnitId(unitId);

						StockMaster stockMaster = new StockMaster();
						stockMaster.setStockDeleteFlag(0);
						stockMaster.setStockUpdateDate(new Date(new java.util.Date().getTime()));
						stockMaster.setUnitId(unitId);

						Integer purchaseSlaveQty = 0;
						Double purSlaveScheme = 0.0;
						Double productUnit = 0.0;

						if (purchaseSlave.getPurSlaveQty() != null) {
							purchaseSlaveQty = purchaseSlave.getPurSlaveQty();
						}

						if (purchaseSlave.getPurSlaveScheme() != null) {
							purSlaveScheme = purchaseSlave.getPurSlaveScheme();
						}

						if (purchaseSlave.getProductMaster().getProductUnit() != null) {
							productUnit = purchaseSlave.getProductMaster().getProductUnit();
						}

						if (purchaseMaster.getVmi() == 0) {
							stockMaster.setStockQtyInHand((purchaseSlaveQty + purSlaveScheme) * (productUnit));
						} else
							stockMaster.setStockQtyInHand(0.0);
						stockMaster.setStockProductMaster(purchaseSlave.getProductMaster());
						stockMaster.setBatchMaster(batchMaster);

						stockMaster.setStockQtyOnOrder(0);
						purchaseSlave.setBatchMaster(batchMaster);
						batchMaster.setStockMaster(stockMaster);

						purchaseSlave.setBatchMaster(batchMaster);
						purchaseSlave.setBatchCode(batchMaster.getBatchCode());

					} else {

						PurchaseSlave purchaseSlave2 = purchaseDao.getPurchaseSlaveByBatchId(batchMaster.getBatchId());
						if (purchaseSlave2.getPurSlavePurchaseRate() != null && purchaseSlave2.getPurSlavePurchaseRate()
								.equals(purchaseSlave.getPurSlavePurchaseRate())) {
							BatchMaster batchMaster1 = new BatchMaster();
							batchMaster1.setProductMaster(purchaseSlave.getProductMaster());
							newBatchMasters.add(batchMaster1);
							batchMaster1.setBatchDeleteFlag(0);
							batchMaster1.setBatchUpdateDate(new Date(new java.util.Date().getTime()));
							batchMaster1.setUnitId(unitId);

							batchMaster1.setBatchCode(
									purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchCode());

							purchaseSlave.setBatchCode(
									purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchCode());

							batchMaster1.setBatchExpDate(
									purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchExpDate());

							StockMaster stockMaster = new StockMaster();
							stockMaster.setStockDeleteFlag(0);
							stockMaster.setStockUpdateDate(new Date(new java.util.Date().getTime()));
							stockMaster.setUnitId(unitId);
							
							Integer purchaseSlaveQty = 0;
							Double purSlaveScheme = 0.0;
							Double productUnit = 0.0;

							if (purchaseSlave.getPurSlaveQty() != null) {
								purchaseSlaveQty = purchaseSlave.getPurSlaveQty();
							}

							if (purchaseSlave.getPurSlaveScheme() != null) {
								purSlaveScheme = purchaseSlave.getPurSlaveScheme();
							}

							if (purchaseSlave.getProductMaster().getProductUnit() != null) {
								productUnit = purchaseSlave.getProductMaster().getProductUnit();
							}

							if (purchaseMaster.getVmi() == 0) {
								stockMaster.setStockQtyInHand((purchaseSlaveQty + purSlaveScheme) * (productUnit));
							} else
								stockMaster.setStockQtyInHand(0.0);
							stockMaster.setStockProductMaster(purchaseSlave.getProductMaster());
							stockMaster.setBatchMaster(batchMaster1);

							stockMaster.setStockQtyOnOrder(0);
							batchMaster1.setStockMaster(stockMaster);

							purchaseSlave.setBatchMaster(batchMaster1);
							batchMaster1.setStockMaster(stockMaster);
						} else {
							BatchMaster batchMaster1 = new BatchMaster();
							batchMaster1.setProductMaster(purchaseSlave.getProductMaster());
							newBatchMasters.add(batchMaster1);
							batchMaster1.setBatchDeleteFlag(0);
							batchMaster1.setBatchUpdateDate(new Date(new java.util.Date().getTime()));
							batchMaster1.setUnitId(unitId);
							batchMaster1.setBatchCode(
									purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchCode());

							batchMaster1.setBatchExpDate(
									purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchExpDate());

							purchaseSlave.setBatchCode(
									purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchExpDate());

							StockMaster stockMaster = new StockMaster();
							stockMaster.setStockDeleteFlag(0);
							stockMaster.setStockUpdateDate(new Date(new java.util.Date().getTime()));
							stockMaster.setUnitId(unitId);

							Integer purchaseSlaveQty = 0;
							Double purSlaveScheme = 0.0;
							Double productUnit = 0.0;

							if (purchaseSlave.getPurSlaveQty() != null) {
								purchaseSlaveQty = purchaseSlave.getPurSlaveQty();
							}

							if (purchaseSlave.getPurSlaveScheme() != null) {
								purSlaveScheme = purchaseSlave.getPurSlaveScheme();
							}

							if (purchaseSlave.getProductMaster().getProductUnit() != null) {
								productUnit = purchaseSlave.getProductMaster().getProductUnit();
							}

							stockMaster.setStockQtyInHand((purchaseSlaveQty + purSlaveScheme) * (productUnit));
							stockMaster.setStockProductMaster(purchaseSlave.getProductMaster());
							stockMaster.setBatchMaster(batchMaster1);

							stockMaster.setStockQtyOnOrder(0);
							purchaseSlave.setBatchMaster(batchMaster1);
							batchMaster1.setStockMaster(stockMaster);
						}
					}
				}

				// Added BY BILAL For GST and IGST amount as slave
				double gstper = purchaseSlave.getPurVat();
				double igstper = purchaseSlave.getPurIgst();
				double pdic = purchaseSlave.getPurDisc();
				double amount = purchaseSlave.getPurSlaveAmt();
				int qyt = purchaseSlave.getPurSlaveQty();
				purchaseSlave.setPurchaseEntrySlaveIssueQty(qyt);
				if (gstper > 0) {

					double peramt = (amount * pdic) / 100;
					double tamount = (amount - peramt);
					purchaseSlave.setPurdescountamt(peramt);

					double gstamt = (tamount * gstper) / 100;
					purchaseSlave.setPurgstamt(gstamt);
					int id = getidTaxmaster(gstper);
					if (id == 0) {
						id = insertGStPer(gstper);
					}
					purchaseSlave.setPurgstId(id);
				} else {
					double peramt = (amount * pdic) / 100;
					double tamount = (amount - peramt);
					purchaseSlave.setPurdescountamt(peramt);

					double igstamt = (tamount * igstper) / 100;
					purchaseSlave.setPurigstamt(igstamt);

					int id = getidTaxmaster(igstper);
					if (id == 0) {
						id = insertGStPer(gstper);
					}
					purchaseSlave.setPurgstId(id);
				}

				ltPurchaseSlaves.add(purchaseSlave);
				purchaseMaster.getLtPurSlave().get((cnt - 1)).getProductMaster().setBatchMaster(newBatchMasters);
			}

			purchaseMaster.setLtPurSlave(ltPurchaseSlaves);

			// update document numbering
			purchaseMaster.setPurDocId(commonService.getDocumentNumber(2));
			DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
			DocumentMaster documentMaster = new DocumentMaster();
			documentMaster.setDocId(2);

			docNumberingMaster.setDocumentMaster(documentMaster);
			docNumberingService.updateDocumentNumbering(docNumberingMaster);

			if (purchaseMaster.getPurTransType().equals("0")) {
				purchaseMaster.setPurchaseStatus("y");
			} else {
				purchaseMaster.setPurchaseStatus("n");
			}

			if (purchaseMaster.getPoId() > 0) {
				purchaseDao.changePOStatus(purchaseMaster.getPoId());
			}

			PurchaseMaster master = purchaseDao.saveOrUpdatePurchase(purchaseMaster,unitId);

			if (master != null) {

				try {
					for (int i = 0; i < purchaseMaster.getLtPurSlave().size(); i++) {
						PurchaseRateHistory purchaseRateHistory = new PurchaseRateHistory();
						PurchaseSlave purchaseSlave = purchaseMaster.getLtPurSlave().get(i);
						purchaseRateHistory.setMrp(purchaseSlave.getPurSlaveMrp());
						purchaseRateHistory.setBatchId(purchaseSlave.getBatchMaster().getBatchId());
						purchaseRateHistory.setPurRate(purchaseSlave.getPurSlavePurchaseRate());

						purchaseRateHistory.setPurSlaveId(purchaseSlave.getPurSlaveId());
						purchaseRateHistory.setRate(purchaseSlave.getPurslaverate());
						purchaseRateHistory.setUpdateDate(new java.util.Date());
						purchaseRateHistory.setBillRate(purchaseSlave.getPurSlaveBillRate());
						purchaseRateHistory.setUnitId(unitId);
						purchaseDao.savePurchaseRateDetails(purchaseRateHistory);

						int qyt = purchaseSlave.getPurSlaveQty();
						Double unit = purchaseSlave.getProductMaster().getProductUnit() * qyt;
						commonService.setstockMasterSlave(purchaseMaster.getPurId(), "GRN", 0, 0,
								purchaseSlave.getProductMaster().getProductId(),
								purchaseSlave.getBatchMaster().getBatchId(),
								purchaseSlave.getBatchMaster().getBatchCode(), 0, unit.intValue(), 0,
								purchaseSlave.getPurVat(), purchaseSlave.getPurIgst(), purchaseSlave.getPurCess(),
								purchaseSlave.getPurDisc(), purchaseMaster.getUnitId(),
								purchaseMaster.getVendorMaster().getVendorId(), purchaseSlave.getPurSlaveMrp(),
								purchaseSlave.getPurSlavePurchaseRate());

					}
				} catch (Exception e) {
					System.out.println(e);
				}
				List<PurchaseSlave> listForBatchCode = purchaseMaster.getLtPurSlave();
				try {
					Document document = new Document(new Rectangle(PageSize.A4));
					document.setMargins(20, 20, 40, 30);
					PdfWriter writer;
					//writer = PdfWriter.getInstance(document, new FileOutputStream(
					//		FilePath.getPHARMACYBARCODE() + "purchase-" + purchaseMaster.getPurId() + ".pdf"));

					document.open();

					PdfPTable HeaderTable10 = new PdfPTable(1);
					int[] headerwidth10 = { 30 };
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.setWidthPercentage(100f);
					HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					for (PurchaseSlave purchaseSlave : listForBatchCode) {

						for (int i = 0; i < purchaseSlave.getPurSlaveQty(); i++) {

							Barcode128 code128 = new Barcode128();

							code128.setBaseline(-1);
							code128.setGenerateChecksum(true);
							code128.setCodeType(Barcode128.CODE128);
							//code128.setCode(purchaseSlave.getBatchMaster().getBatchId().toString() + "   ");
							code128.setBarHeight(70);
						//	HeaderTable10
						//			.addCell(code128.createImageWithBarcode(writer.getDirectContent(), null, null));
							HeaderTable10.addCell(
									new Paragraph("Batch Code :" + purchaseSlave.getBatchMaster().getBatchCode(),
											FontFactory.getFont(FontFactory.COURIER_BOLD, 50)));
							HeaderTable10.addCell(
									new Paragraph("Product Name :" + purchaseSlave.getProductMaster().getProductName(),
											FontFactory.getFont(FontFactory.COURIER_BOLD, 50)));
							HeaderTable10.addCell(new Phrase(""));
							HeaderTable10.addCell(new Phrase(""));

						}
					}
					document.add(HeaderTable10);
					HeaderTable10.flushContent();
					document.close();
				} catch (Exception e) {
					e.printStackTrace();
				}

				return true;
			} else {
				return false;
			}
		} else {

			purchaseMaster.setPurDeleteFlag(0);
			purchaseMaster.setDispatchflag("N");
			purchaseMaster.setDispatchunitId(1);
			purchaseMaster.setPurUpdateDate(new Date(new java.util.Date().getTime()));

			Integer cnt = 0;
			List<PurchaseSlave> ltPurchaseSlaves = new ArrayList<PurchaseSlave>();

			if (purchaseMaster.getPurTransType().equals("0")) {
				purchaseMaster.setPurchaseStatus("y");
			} else {
				purchaseMaster.setPurchaseStatus("n");
			}

			for (PurchaseSlave purchaseSlave : purchaseMaster.getLtPurSlave()) {
				cnt++;
				purchaseSlave.setPurSlaveSr(cnt);

				// add batch details
				List<BatchMaster> ltBatchMasters = purchaseSlave.getProductMaster().getBatchMaster();
				List<BatchMaster> newBatchMasters = new ArrayList<BatchMaster>();

				for (BatchMaster batchMaster : ltBatchMasters) {
					/*
					 * if (batchMaster.getBatchId() == null) {
					 * batchMaster.setProductMaster(purchaseSlave .getProductMaster());
					 * newBatchMasters.add(batchMaster); batchMaster.setBatchDeleteFlag(0);
					 * batchMaster.setBatchUpdateDate(new Date( new java.util.Date().getTime()));
					 * 
					 * StockMaster stockMaster = new StockMaster();
					 * stockMaster.setStockDeleteFlag(0); stockMaster.setStockUpdateDate(new Date(
					 * new java.util.Date().getTime()));
					 * 
					 * Double purchaseSlaveQty = 0.0; Double purSlaveScheme = 0.0; Double
					 * productUnit = 0.0;
					 * 
					 * if (purchaseSlave.getPurSlaveQty() != null) { purchaseSlaveQty =
					 * purchaseSlave.getPurSlaveQty(); }
					 * 
					 * if (purchaseSlave.getPurSlaveScheme() != null) { purSlaveScheme =
					 * purchaseSlave.getPurSlaveScheme(); }
					 * 
					 * if (purchaseSlave.getProductMaster().getProductUnit() != null) { productUnit
					 * = purchaseSlave.getProductMaster() .getProductUnit(); }
					 * 
					 * stockMaster .setStockQtyInHand((purchaseSlaveQty + purSlaveScheme)
					 * (productUnit)); stockMaster.setStockProductMaster(purchaseSlave
					 * .getProductMaster()); stockMaster.setBatchMaster(batchMaster);
					 * 
					 * stockMaster.setStockQtyOnOrder(0); purchaseSlave.setBatchMaster(batchMaster);
					 * batchMaster.setStockMaster(stockMaster); } else {
					 */

					if (purchaseSlave.getPurSlaveId() != null) {
						newBatchMasters.add(batchMaster);
						System.out.println("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<" + batchMaster.getBatchCode());
						purchaseSlave.setBatchCode(batchMaster.getBatchCode());

					} else {
						BatchMaster batchMaster1 = new BatchMaster();
						batchMaster1.setProductMaster(purchaseSlave.getProductMaster());
						newBatchMasters.add(batchMaster1);
						batchMaster1.setBatchDeleteFlag(0);
						batchMaster1.setBatchUpdateDate(new Date(new java.util.Date().getTime()));
						batchMaster1
								.setBatchCode(purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchCode());
						purchaseSlave
								.setBatchCode(purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchCode());

						batchMaster1.setBatchExpDate(
								purchaseSlave.getProductMaster().getBatchMaster().get(0).getBatchExpDate());
						batchMaster1.setUnitId(unitId);

						StockMaster stockMaster = new StockMaster();
						stockMaster.setStockDeleteFlag(0);
						stockMaster.setStockUpdateDate(new Date(new java.util.Date().getTime()));
						stockMaster.setUnitId(unitId);

						Integer purchaseSlaveQty = 0;
						Double purSlaveScheme = 0.0;
						Double productUnit = 0.0;

						if (purchaseSlave.getPurSlaveQty() != null) {
							purchaseSlaveQty = purchaseSlave.getPurSlaveQty();
						}

						if (purchaseSlave.getPurSlaveScheme() != null) {
							purSlaveScheme = purchaseSlave.getPurSlaveScheme();
						}

						if (purchaseSlave.getProductMaster().getProductUnit() != null) {
							productUnit = purchaseSlave.getProductMaster().getProductUnit();
						}

						stockMaster.setStockQtyInHand((purchaseSlaveQty + purSlaveScheme) * (productUnit));
						stockMaster.setStockProductMaster(purchaseSlave.getProductMaster());
						stockMaster.setBatchMaster(batchMaster1);

						stockMaster.setStockQtyOnOrder(0);
						purchaseSlave.setBatchMaster(batchMaster1);
						batchMaster1.setStockMaster(stockMaster);
					}
					/* } */
				}
				// Added BY BILAL For GST and IGST amount as slave
				double gstper = purchaseSlave.getPurVat();
				double igstper = purchaseSlave.getPurIgst();
				double pdic = purchaseSlave.getPurDisc();
				double amount = purchaseSlave.getPurSlaveAmt();
				int qyt = purchaseSlave.getPurSlaveQty();
				purchaseSlave.setPurchaseEntrySlaveIssueQty(qyt);
				if (gstper > 0) {

					double peramt = (amount * pdic) / 100;
					double tamount = (amount - peramt);
					purchaseSlave.setPurdescountamt(peramt);

					double gstamt = (tamount * gstper) / 100;
					purchaseSlave.setPurgstamt(gstamt);
					int id = getidTaxmaster(gstper);
					if (id == 0) {
						id = insertGStPer(gstper);
					}
					purchaseSlave.setPurgstId(id);

				} else {
					double peramt = (amount * pdic) / 100;
					double tamount = (amount - peramt);
					purchaseSlave.setPurdescountamt(peramt);

					double igstamt = (tamount * igstper) / 100;
					purchaseSlave.setPurigstamt(igstamt);
					int id = getidTaxmaster(igstper);
					if (id == 0) {
						id = insertGStPer(gstper);
					}
					purchaseSlave.setPurgstId(id);
				}
				ltPurchaseSlaves.add(purchaseSlave);
				purchaseMaster.getLtPurSlave().get((cnt - 1)).getProductMaster().setBatchMaster(newBatchMasters);
			}

			purchaseMaster.setLtPurSlave(ltPurchaseSlaves);
			PurchaseMaster master = purchaseDao.saveOrUpdatePurchase(purchaseMaster,unitId);

			if (master != null) {
				for (int i = 0; i < purchaseMaster.getLtPurSlave().size(); i++) {
					PurchaseSlave purchaseSlave = purchaseMaster.getLtPurSlave().get(i);
					int qyt = purchaseSlave.getPurSlaveQty();
					Double unit = purchaseSlave.getProductMaster().getProductUnit() * qyt;
					commonService.setstockMasterSlave(purchaseMaster.getPurId(), "GRN", 0, 0,
							purchaseSlave.getProductMaster().getProductId(),
							purchaseSlave.getBatchMaster().getBatchId(), purchaseSlave.getBatchMaster().getBatchCode(),
							0, unit.intValue(), 0, purchaseSlave.getPurVat(), purchaseSlave.getPurIgst(),
							purchaseSlave.getPurCess(), purchaseSlave.getPurDisc(), purchaseMaster.getUnitId(),
							purchaseMaster.getVendorMaster().getVendorId(), purchaseSlave.getPurSlaveMrp(),
							purchaseSlave.getPurSlavePurchaseRate());

					if (oldPurchaseMaster.getLtPurSlave().get(i).getBatchMaster() != null
							&& purchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId()
									.equals(oldPurchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId())
							&& oldPurchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId() != null) {
						PurchaseRateHistory purchaseRateHistory = new PurchaseRateHistory();

						PurchaseRateHistory purchaseRateHistory2 = new PurchaseRateHistory();
						purchaseRateHistory2.setPurSlaveId(purchaseMaster.getLtPurSlave().get(i).getPurSlaveId());

						purchaseRateHistory2
								.setBatchId(purchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId());
						purchaseRateHistory2 = purchaseDao.getPurchaseRateDetails1(purchaseRateHistory2);

						if (purchaseRateHistory2 == null) {

						} else {
							purchaseRateHistory.setPurRateId(purchaseRateHistory2.getPurRateId());
							purchaseRateHistory.setPurSlaveId(purchaseMaster.getLtPurSlave().get(i).getPurSlaveId());
							purchaseRateHistory.setMrp(purchaseMaster.getLtPurSlave().get(i).getPurSlaveMrp());
							purchaseRateHistory
									.setBatchId(purchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId());
							purchaseRateHistory
									.setPurRate(purchaseMaster.getLtPurSlave().get(i).getPurSlavePurchaseRate());
							purchaseRateHistory.setRate(purchaseMaster.getLtPurSlave().get(i).getPurslaverate());
							purchaseRateHistory.setUpdateDate(new java.util.Date());
							purchaseRateHistory.setUnitId(unitId);
							purchaseRateHistory
									.setBillRate(purchaseMaster.getLtPurSlave().get(i).getPurSlaveBillRate());
							purchaseDao.updatePurchaseRateDetails(purchaseRateHistory);
						}
					} else {
						PurchaseRateHistory purchaseRateHistory = new PurchaseRateHistory();

						PurchaseRateHistory purchaseRateHistory2 = new PurchaseRateHistory();
						purchaseRateHistory2.setPurSlaveId(purchaseMaster.getLtPurSlave().get(i).getPurSlaveId());

						purchaseRateHistory2
								.setBatchId(purchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId());
						purchaseRateHistory2 = purchaseDao.getPurchaseRateDetails1(purchaseRateHistory2);

						if (purchaseRateHistory2 == null) {
							purchaseRateHistory.setPurSlaveId(purchaseMaster.getLtPurSlave().get(i).getPurSlaveId());

							purchaseRateHistory.setMrp(purchaseMaster.getLtPurSlave().get(i).getPurSlaveMrp());
							purchaseRateHistory
									.setBatchId(purchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId());
							purchaseRateHistory
									.setPurRate(purchaseMaster.getLtPurSlave().get(i).getPurSlavePurchaseRate());

							purchaseRateHistory.setRate(purchaseMaster.getLtPurSlave().get(i).getPurslaverate());
							purchaseRateHistory.setUpdateDate(new java.util.Date());
							purchaseRateHistory.setUnitId(unitId);
							purchaseRateHistory
									.setBillRate(purchaseMaster.getLtPurSlave().get(i).getPurSlaveBillRate());
							purchaseDao.savePurchaseRateDetails(purchaseRateHistory);

							/*
							 * purchaseDao .updateBatchDetailsForPurchaseEdit(oldPurchaseMaster
							 * .getLtPurSlave().get(i) .getBatchMaster().getBatchId());
							 */
						}
					}
				}

				List<PurchaseSlave> listForBatchCode = purchaseMaster.getLtPurSlave();
				try {
					Document document = new Document(new Rectangle(PageSize.A4));
					document.setMargins(20, 20, 40, 30);
					PdfWriter writer;
					writer = PdfWriter.getInstance(document, new FileOutputStream(
							FilePath.getPHARMACYBARCODE() + "purchase-" + purchaseMaster.getPurId() + ".pdf"));

					document.open();

					PdfPTable HeaderTable10 = new PdfPTable(1);
					int[] headerwidth10 = { 30 };
					HeaderTable10.setWidths(headerwidth10);
					HeaderTable10.setWidthPercentage(100f);
					HeaderTable10.getDefaultCell().setBorder(Rectangle.NO_BORDER);

					for (PurchaseSlave purchaseSlave : listForBatchCode) {

						for (int i = 0; i < purchaseSlave.getPurSlaveQty(); i++) {

							Barcode128 code128 = new Barcode128();

							code128.setBaseline(-1);
							code128.setGenerateChecksum(true);
							code128.setCodeType(Barcode128.CODE128);
							code128.setCode(purchaseSlave.getBatchMaster().getBatchId().toString() + "   ");
							code128.setBarHeight(70);
							HeaderTable10
									.addCell(code128.createImageWithBarcode(writer.getDirectContent(), null, null));
							HeaderTable10.addCell(new Paragraph("Batch Code :" + purchaseSlave.getBatchCode(),
									FontFactory.getFont(FontFactory.COURIER_BOLD, 50)));
							HeaderTable10.addCell(
									new Paragraph("Product Name :" + purchaseSlave.getProductMaster().getProductName(),
											FontFactory.getFont(FontFactory.COURIER_BOLD, 50)));
							HeaderTable10.addCell(new Phrase(""));
							HeaderTable10.addCell(new Phrase(""));

						}
					}
					document.add(HeaderTable10);
					HeaderTable10.flushContent();
					document.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return true;
			} else {
				return false;
			}
		} // end of else block

	}

	@Transactional
	private int insertGStPer(double gstper) {
		return purchaseDao.insertGStPer(gstper);
	}

	@Transactional
	private int getidTaxmaster(double gstper) {

		return purchaseDao.getidTaxmaster(gstper);
	}

	@Override
	@Transactional
	public Boolean DublicateBillNum(String billNo, Integer vendorId) {
		return purchaseDao.DublicateBillNum(billNo, vendorId);
	}

	@Override
	@Transactional
	public String getLowestPurchaseDetail(Integer productId) {

		String str = "";
		PurchaseSlave purchaseSlave = purchaseDao.getLowestPurchaseDetail(productId);
		if (purchaseSlave != null && purchaseSlave.getPurchaseMaster() != null) {
			str = purchaseSlave.getPurSlaveMrp() + "-" + purchaseSlave.getPurslaverate() + "-"
					+ purchaseSlave.getPurchaseMaster().getVendorMaster().getVendorName();
		}
		return str;
	}

	@Override
	@Transactional
	public String getTotalStock(Integer productId) {
		String total = purchaseDao.getTotalStock(productId);

		return total;
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getPurchases() {

		return purchaseDao.getPurchases();
	}

	@Override
	@Transactional
	public Boolean deletePurchase(Integer purchaseId) {

		return purchaseDao.deletePurchase(purchaseId);
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getAutoSuggestionPurchaseNames(String letter) {

		return purchaseDao.getAutoSuggestionPurchaseNames(letter);
	}

	@Override
	@Transactional
	public PurchaseMaster getPurchaseById(Integer purchaseId) {

		return purchaseDao.getPurchaseById(purchaseId);
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getPurbyVendorId(Integer vendorId) {

		return purchaseDao.getPurbyVendorId(vendorId);
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getPurListbyVendorId(Integer vendorId,Integer unitId) {

		return purchaseDao.getPurListbyVendorId(vendorId,unitId);
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getPurListbyPurchaseEntryNo(Integer vendorId,Integer unitId) {

		return purchaseDao.getPurListbyPurchaseEntryNo(vendorId,unitId);
	}

	@Override
	@Transactional
	public List<BatchMaster> getBatchByBatchCode(String batchCode) {
		return purchaseDao.getBatchByBatchCode(batchCode);
	}

	@Override
	@Transactional
	public Map<String, JSONArray> getBatchDetails(Integer productId, String storeId ) {

		List<PurchaseHistory> purchaseHistories = purchaseDao.getBatchDetails(productId, storeId);

		List<PurchaseHistory> openingStock = purchaseDao.getBatchDetailsForOpeningStock(productId, storeId);

		purchaseHistories.addAll(openingStock);

		JSONArray list = new JSONArray();
		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();

		for (PurchaseHistory bm : purchaseHistories) {

			try {
				JSONObject obj1 = new JSONObject();
//				obj1.put("batchCode", bm.getBatch_code());
//				obj1.put("batchExpDate", bm.getBatch_exp_date());
//				obj1.put("mrp", bm.getMrp());
//				obj1.put("saleRate", bm.getRate());
//				obj1.put("clearStock", bm.getStock_qty_in_hand());
//				obj1.put("batchId", bm.getBatch_id());
//				obj1.put("stockId", bm.getStock_id());
//				obj1.put("billRate", bm.getBill_rate());
//				obj1.put("lastPurchaseFrom", bm.getVendor_name());
//				obj1.put("billNo", bm.getPur_bill_no());
//				obj1.put("billDate", bm.getPur_bill_date());
//				obj1.put("purchaseRate", bm.getPur_rate());
//				obj1.put("vat", bm.getGst());
//				obj1.put("purchaseId", bm.getPur_id());
//				obj1.put("purchaseSlaveId", bm.getPur_slave_id());
				// obj1.put("hsn", bm.get);
				
				String salerat = Double.toString(bm.getRate());
				String mrp = Double.toString(bm.getMrp());
				String clearStock = Double.toString(bm.getStock_qty_in_hand());
				String batchId = Integer.toString(bm.getBatch_id());
				String stockId = Integer.toString(bm.getStock_id());
				String billRate = Double.toString(bm.getBill_rate());
				
				//String billDate = Double.toString(bm.getPur_bill_date());
				DateFormat df = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
				String billDate1 = df.format(bm.getPur_bill_date());
				
				String purchaseRate = Double.toString(bm.getPur_rate());
				String vat = Double.toString(bm.getGst());
				String purchaseId ="";
				if(bm.getPur_id()==null) {
					purchaseId="0";
				}else {
					purchaseId= Integer.toString(bm.getPur_id());
				}
				String purchaseSlaveId="";
				if(bm.getPur_slave_id()==null) {
					purchaseSlaveId="0";
				}else {
					purchaseSlaveId = Integer.toString(bm.getPur_slave_id());
				}
				obj1.put("batchCode", bm.getBatch_code());
				obj1.put("batchExpDate", bm.getBatch_exp_date());
				obj1.put("mrp", mrp);
				obj1.put("saleRate", salerat );
				obj1.put("clearStock", clearStock);
				obj1.put("batchId", batchId);
				obj1.put("stockId", stockId);
				obj1.put("billRate", billRate);
				obj1.put("lastPurchaseFrom", bm.getVendor_name());
				obj1.put("billNo", bm.getPur_bill_no());
				obj1.put("billDate", billDate1);
				obj1.put("purchaseRate", purchaseRate);
				obj1.put("vat", vat);
				obj1.put("purchaseId", purchaseId);
				obj1.put("purchaseSlaveId", purchaseSlaveId);

				list.put(obj1);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		batchData.put("result", list);
		return batchData;
	}

	@Override
	@Transactional
	public Map<String, JSONArray> getProductNameByBarcode(Integer productId, String storeId) {

		List<PurchaseHistory> purchaseHistories = purchaseDao.getProductNameByBarcode(productId, storeId);

		List<PurchaseHistory> openingStock = purchaseDao.getProductNameByBarcodeForOpeningStock(productId, storeId);

		purchaseHistories.addAll(openingStock);

		JSONArray list = new JSONArray();
		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();

		for (Iterator<PurchaseHistory> itr = purchaseHistories.iterator(); itr.hasNext();) {
			PurchaseHistory bm = itr.next();
			if (bm.getStock_qty_in_hand()==0.0) {
				itr.remove();
			} else {
				try {
					JSONObject obj1 = new JSONObject();
					
					String clearStock=Double.toString(bm.getStock_qty_in_hand());
					String batchId=Integer.toString(bm.getBatch_id());
					String mrp=Double.toString(bm.getMrp());
					String rate=Double.toString(bm.getRate());
					String stockId=Integer.toString(bm.getStock_id());
					String billRate=Double.toString(bm.getBill_rate());
					String purchaseRate=Double.toString(bm.getPur_rate());
					String vat=Double.toString( bm.getGst());
					String purchaseId="0";
					if(bm.getPur_id()==null) {
						purchaseId="0";
					}else {
						purchaseId=Integer.toString(bm.getPur_id());
					}
					String purchaseSlaveId="0";
					if(bm.getPur_slave_id()==null) {
						purchaseSlaveId="0";
					}else {
						purchaseSlaveId=Integer.toString(bm.getPur_slave_id());
					}
					String unit=""; 
						unit =	Double.toString(bm.getProduct_uom_unit());
						if(unit.equals("")||unit.equals(null))  {
						unit="0.0";
							}
					String productId1=Integer.toString( bm.getProduct_id());
					String currentStock= Double.toString(bm.getStock_qty_in_hand());
					String categoryId = Integer.toString(bm.getCat_id());
					String billDate1="";
					DateFormat df = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
					if(bm.getPur_bill_date()==null) {
						LocalDate date=  LocalDate.now();
						DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
						billDate1=date.format(formatter);
					}else {
					billDate1 = df.format(bm.getPur_bill_date());
					}
					
					obj1.put("batchCode", bm.getBatch_code());
					obj1.put("batchExpDate", bm.getBatch_exp_date());
					obj1.put("mrp", mrp);
					obj1.put("rate",rate );
					obj1.put("clearStock", clearStock);
					obj1.put("batchId", batchId);
					obj1.put("stockId", stockId);
					obj1.put("billRate", billRate);
					obj1.put("lastPurchaseFrom", bm.getVendor_name());
					obj1.put("billNo", billDate1);
					obj1.put("billDate", bm.getBillDate());
					obj1.put("purchaseRate",purchaseRate );
					obj1.put("vat",vat);
					obj1.put("purchaseId", purchaseId);
					obj1.put("purchaseSlaveId", purchaseSlaveId);
					obj1.put("productName", bm.getProduct_name());
					obj1.put("unit", unit);
					obj1.put("pack", bm.getPack_type());
					obj1.put("comp", bm.getComp_name());
					obj1.put("productId", productId1);
					obj1.put("currentStock",currentStock);
					obj1.put("shelfName", bm.getShelf_name());
					obj1.put("drugName", bm.getDrug_name());
					obj1.put("presciption", bm.getProductPrescription());
					obj1.put("categoryId", categoryId);
					obj1.put("pre", bm.getPreparation_name());

					list.put(obj1);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		batchData.put("result", list);
		return batchData;
	}

	/*
	 * @Override
	 * 
	 * @Transactional public Map<String, JSONArray> getBatchDetailsInFIFO(Integer
	 * productId, String storeId) { List<PurchaseHistory> finalList = new
	 * ArrayList<PurchaseHistory>();
	 * 
	 * PurchaseHistory purchaseHistories = purchaseDao.getBatchDetailsInFIFO(
	 * productId, storeId);
	 * 
	 * int count = 0; PurchaseHistory openingStock = purchaseDao
	 * .getBatchDetailsForOpeningStockInFIFO(productId, storeId); int purExp = 0;
	 * int expOS = 0; if (purchaseHistories.getBatchExpDate() != null) { String
	 * str[] = purchaseHistories.getBatchExpDate().split("/"); purExp =
	 * Integer.parseInt(str[0] + "" + str[1]); }
	 * 
	 * if (openingStock.getBatchExpDate() != null) { String str1[] =
	 * openingStock.getBatchExpDate().split("/"); expOS = Integer.parseInt(str1[0] +
	 * "" + str1[1]); }
	 * 
	 * 
	 * 
	 * if (purchaseHistories.getBatchExpDate() != null &&
	 * openingStock.getBatchExpDate() != null) { if (purExp > expOS) {
	 * finalList.add(openingStock); } else if (purExp < expOS) {
	 * finalList.add(purchaseHistories); } else if
	 * (Float.parseFloat(purchaseHistories.getClearStock()) > Float
	 * .parseFloat(openingStock.getClearStock())) {
	 * finalList.add(purchaseHistories); } else { finalList.add(openingStock); } }
	 * 
	 * if (purchaseHistories.getBatchExpDate() != null && finalList.size() == 0) {
	 * finalList.add(purchaseHistories);
	 * 
	 * } else if (openingStock.getBatchExpDate() != null && finalList.size() == 0) {
	 * finalList.add(openingStock); }
	 * 
	 * 
	 * Collections.sort(finalList, new Comparator<PurchaseHistory>() { public int
	 * compare(PurchaseHistory o1, PurchaseHistory o2) {
	 * if(o1.getBatchId().compareTo(o2.getBatchId())>0) {
	 * 
	 * return 1; } else { return -1;
	 * 
	 * } } });
	 * 
	 * 
	 * JSONArray list = new JSONArray(); Map<String, JSONArray> batchData = new
	 * HashMap<String, JSONArray>(); for (PurchaseHistory bm : finalList) { try { if
	 * (count == 0) { JSONObject obj1 = new JSONObject(); obj1.put("batchCode",
	 * bm.getBatchCode()); obj1.put("batchExpDate", bm.getBatchExpDate());
	 * obj1.put("mrp", bm.getMRP()); obj1.put("saleRate", bm.getSaleRate());
	 * obj1.put("clearStock", bm.getClearStock()); obj1.put("batchId",
	 * bm.getBatchId()); obj1.put("stockId", bm.getStockId()); obj1.put("billRate",
	 * bm.getBill_rate()); obj1.put("lastPurchaseFrom", bm.getLastPurchaseFrom());
	 * obj1.put("billNo", bm.getBillNo()); obj1.put("billDate", bm.getBillDate());
	 * obj1.put("purchaseRate", bm.getPurchaseRate()); obj1.put("vat", bm.getVat());
	 * obj1.put("purchaseId", bm.getPurchaseId()); obj1.put("purchaseSlaveId",
	 * bm.getPurchaseSlaveId()); obj1.put("productPrescription",
	 * bm.getProductPrescription()); list.put(obj1); count = 1; } } catch (Exception
	 * e) { e.printStackTrace(); } } batchData.put("result", list); return
	 * batchData; }
	 */

	@Override
	@Transactional
	public List<PurchaseMaster> getLastPurchaseDetails(Integer productId) {
		List<PurchaseMaster> purchaseMasters = purchaseDao.getLastPurchaseDetails(productId);

		return purchaseMasters;
	}

	@Override
	@Transactional
	public boolean updateCorrectionRate(CorrectionRate correctionRate, PurchaseCorrection purchaseCorrection) {
		try {
			/* purchaseDao.updateCorrectionRate(correctionRate); */
			purchaseDao.savePurchaseHistory(purchaseCorrection);

			PurchaseRateHistory purchaseRateHistory2 = new PurchaseRateHistory();

			if (purchaseCorrection.getPurchaseSlave() != null) {
				purchaseRateHistory2.setPurSlaveId(purchaseCorrection.getPurchaseSlave());
			} else {
				purchaseRateHistory2.setPurSlaveId(0);
			}

			purchaseRateHistory2.setBatchId(purchaseCorrection.getPurCorBatchId());
			purchaseRateHistory2 = purchaseDao.getPurchaseRateDetails1(purchaseRateHistory2);

			PurchaseRateHistory purchaseRateHistory = new PurchaseRateHistory();

			if (purchaseRateHistory2 != null) {
				if (correctionRate.getBatchId() == 0) {
					BatchMaster batchMaster = new BatchMaster();

					ProductMaster productMaster = new ProductMaster();
					productMaster.setProductId(correctionRate.getPurchaseMaster().getLtPurSlave().get(0)
							.getProductMaster().getProductId());

					batchMaster.setProductMaster(productMaster);
					batchMaster.setBatchDeleteFlag(0);
					batchMaster.setBatchUpdateDate(new Date(new java.util.Date().getTime()));
					batchMaster.setBatchExpDate(correctionRate.getExpiry());
					batchMaster.setBatchCode(correctionRate.getBatchCode());

					StockMaster stockMaster = new StockMaster();
					stockMaster.setStockDeleteFlag(0);
					stockMaster.setStockUpdateDate(new Date(new java.util.Date().getTime()));
					stockMaster.setStockQtyInHand(correctionRate.getClosingStock());
					stockMaster.setStockProductMaster(productMaster);
					stockMaster.setBatchMaster(batchMaster);

					stockMaster.setStockQtyOnOrder(0);
					batchMaster.setStockMaster(stockMaster);

					purchaseDao.saveBatchDetails(batchMaster, purchaseCorrection);

					PurchaseRateHistory purchaseRateHistory1 = new PurchaseRateHistory();
					purchaseRateHistory1.setMrp(correctionRate.getMrp());
					purchaseRateHistory1.setBatchId(batchMaster.getBatchId());
					purchaseRateHistory1.setPurRate(correctionRate.getPurRate());

					if (correctionRate.getPurchaseMaster().getLtPurSlave().get(0).getPurSlaveId() != null) {
						purchaseRateHistory1.setPurSlaveId(
								correctionRate.getPurchaseMaster().getLtPurSlave().get(0).getPurSlaveId());
					} else {
						purchaseRateHistory1.setPurSlaveId(0);
					}
					purchaseRateHistory1.setRate(correctionRate.getMrp());
					purchaseRateHistory1.setUpdateDate(new java.util.Date());
					purchaseRateHistory1.setBillRate(correctionRate.gettRate());
					purchaseDao.savePurchaseRateDetails(purchaseRateHistory1);

				} else {
					
					//ADDED BY VISHANT for set batch expiry date yyyy-mm-dd format 
					String setBatchExpDatetimestamp="";
					try {
						//String batchExpiryDate =  expiry.getBatchExpiry();
						String date2 []= correctionRate.getExpiry().split("/");
						setBatchExpDatetimestamp = "20"+date2[1] +"-"+date2[0]+"-"+ "01"+" "+"00:00:00";
						System.out.println("date1>>>"+date2);
		            	//batchMaster.setBatchExpDatetimestamp(date);
						}
						catch (Exception e) {
							e.printStackTrace();
					}
					
					Query hql=sessionFactory.getCurrentSession().createQuery("Update BatchMaster set batchCode=:batchCode, batchExpDate=:batchExpDate ,batchExpDatetimestamp=:batchExpDatetimestamp where batchId=:batchId");
					hql.setParameter("batchCode", correctionRate.getBatchCode());
					hql.setParameter("batchExpDate", correctionRate.getExpiry());
					hql.setParameter("batchId",correctionRate.getBatchId());
					hql.setParameter("batchExpDatetimestamp",setBatchExpDatetimestamp);
					hql.executeUpdate();
					
					purchaseRateHistory.setPurRateId(purchaseRateHistory2.getPurRateId());
					purchaseRateHistory.setPurSlaveId(purchaseCorrection.getPurchaseSlave());
					purchaseRateHistory.setMrp(correctionRate.getMrp());
					purchaseRateHistory.setBatchId(purchaseCorrection.getPurCorBatchId());
					purchaseRateHistory.setPurRate(correctionRate.getPurRate());
					purchaseRateHistory.setRate(correctionRate.getMrp());
					purchaseRateHistory.setUpdateDate(new java.util.Date());
					purchaseRateHistory.setBillRate(correctionRate.gettRate());
					purchaseDao.updatePurchaseRateDetails(purchaseRateHistory);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getPendingPurbyVendorId(Integer vendorId) {
		List<PurchaseMaster> purchaseMasters = purchaseDao.getPendingPurbyVendorId(vendorId);
		return purchaseMasters;
	}

	@Override
	@Transactional
	public PurchaseMaster getPurchaseDataById(Integer purchaseId,Integer unitId) {
		return purchaseDao.getPurchaseDataById(purchaseId,unitId);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getProductWiseBatchList(Integer productId, String from, String to) {
		return purchaseDao.getProductWiseBatchList(productId, from, to, "patientSale");
		/*
		 * 
		 * List<ReportProductWiseBatchSale> productWiseBatchSales = new
		 * ArrayList<ReportProductWiseBatchSale>();
		 * 
		 * List<ReportProductWiseBatchSale> counterSales = new
		 * ArrayList<ReportProductWiseBatchSale>();
		 * 
		 * 
		 * ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess"); String
		 * hospitalName=bundle.getObject("hospitalname").toString();
		 * 
		 * if(hospitalName.equals("apple")) { counterSales =
		 * purchaseDao.getProductWiseBatchList(productId, from, to,
		 * "counterSale4Counter"); } else {
		 * 
		 * counterSales = purchaseDao.getProductWiseBatchList(productId, from, to,
		 * "counterSale"); } List<ReportProductWiseBatchSale> patientSales = new
		 * ArrayList<ReportProductWiseBatchSale>(); patientSales =
		 * purchaseDao.getProductWiseBatchList(productId, from, to, "patientSale");
		 * 
		 * List<ReportProductWiseBatchSale> indentSales = new
		 * ArrayList<ReportProductWiseBatchSale>(); indentSales =
		 * purchaseDao.getProductWiseBatchList(productId, from, to, "indentSale");
		 * 
		 * List<ReportProductWiseBatchSale> hospitalSales = new
		 * ArrayList<ReportProductWiseBatchSale>(); hospitalSales =
		 * purchaseDao.getProductWiseBatchList(productId, from, to, "hospitalSale");
		 * 
		 * for (ReportProductWiseBatchSale counter : counterSales) {
		 * productWiseBatchSales.add(counter); }
		 * 
		 * for (ReportProductWiseBatchSale patientSale : patientSales) {
		 * 
		 * int count = 0; for (ReportProductWiseBatchSale batchSale :
		 * productWiseBatchSales) { if
		 * (batchSale.getBatchId().equals(patientSale.getBatchId()) && count == 0) {
		 * count = 1; } } if (count == 0) { productWiseBatchSales.add(patientSale); }
		 * 
		 * }
		 * 
		 * for (ReportProductWiseBatchSale indent : indentSales) {
		 * 
		 * int count = 0; for (ReportProductWiseBatchSale batchSale :
		 * productWiseBatchSales) { if
		 * (batchSale.getBatchId().equals(indent.getBatchId()) && count == 0) { count =
		 * 1; } } if (count == 0) { productWiseBatchSales.add(indent); } }
		 * 
		 * for (ReportProductWiseBatchSale hospital : hospitalSales) {
		 * 
		 * int count = 0; for (ReportProductWiseBatchSale batchSale :
		 * productWiseBatchSales) { if
		 * (batchSale.getBatchId().equals(hospital.getBatchId()) && count == 0) { count
		 * = 1; } } if (count == 0) { productWiseBatchSales.add(hospital); }
		 * 
		 * }
		 * 
		 * return productWiseBatchSales;
		 */}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getBatchWiseSaleList(Integer batchId, String from, String to) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();

		if (hospitalName.equals("apple"))
			counterSales = purchaseDao.getBatchWiseSaleList(batchId, "counterSale4Counter", from, to);
		else
			counterSales = purchaseDao.getBatchWiseSaleList(batchId, "counterSaleAll", from, to);

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = purchaseDao.getBatchWiseSaleList(batchId, "indentSale", from, to);

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = purchaseDao.getBatchWiseSaleList(batchId, "hospitalSale", from, to);

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = purchaseDao.getBatchWiseSaleList(batchId, "patientSale", from, to);

		/*
		 * List<ReportProductWiseBatchSale> counterSales=new
		 * ArrayList<ReportProductWiseBatchSale>(); counterSales=
		 * purchaseDao.getBatchWiseSaleList(batchId);
		 */

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale counter : indentSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale counter : hospitalSales) {
			productWiseBatchSales.add(counter);
		}
		for (ReportProductWiseBatchSale patient : patientSales) {
			productWiseBatchSales.add(patient);
		}

		return productWiseBatchSales;
	}

	@Override
	@Transactional
	public List<ReportData> getTotalSaleCount(String fromReult) {
		List<ReportData> totalSale = new ArrayList<ReportData>();

		String counterSaleAmount = purchaseDao.getCounterSaleTodayCount(fromReult);
		ReportData countersale = new ReportData();
		countersale.setType("Counter sale");
		countersale.setAmount(counterSaleAmount);

		String indentSaleAmount = purchaseDao.getIndentSaleTodayCount(fromReult);
		ReportData indentsale = new ReportData();
		indentsale.setType("Indent sale");
		indentsale.setAmount(indentSaleAmount);

		/*
		 * String hospitalSaleAmount = purchaseDao.getHospitalSaleTodayCount(fromReult);
		 * ReportProductWiseBatchSale hospitalsale = new ReportProductWiseBatchSale();
		 * hospitalsale.setType("Hospital sale");
		 * hospitalsale.setAmount(hospitalSaleAmount);
		 */

		String PatientSaleAmount = purchaseDao.getPatientSaleTodayCount(fromReult);
		ReportData patientsale = new ReportData();
		patientsale.setType("Patient sale");
		patientsale.setAmount(PatientSaleAmount);

		totalSale.add(countersale);
		totalSale.add(indentsale);
		//totalSale.add(hospitalsale);
		totalSale.add(patientsale);

		return totalSale;
	}

	/*****************************************************/
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalHospitalSaleCount(String fromReult) {

		List<ReportProductWiseBatchSale> totalSale = new ArrayList<ReportProductWiseBatchSale>();
		String hospitalSaleAmount = purchaseDao.getHospitalSaleTodayCount(fromReult);
		ReportProductWiseBatchSale hospitalsale = new ReportProductWiseBatchSale();
		hospitalsale.setType("Hospital sale");
		hospitalsale.setAmount(hospitalSaleAmount);
		totalSale.add(hospitalsale);

		return totalSale;
	}

	/*****************************************************/

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getProductWisePartyList(Integer productId, String from, String to) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = purchaseDao.getProductWisePartyList(productId, from, to, "counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = purchaseDao.getProductWisePartyList(productId, from, to, "indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = purchaseDao.getProductWisePartyList(productId, from, to, "hospitalSale");

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = purchaseDao.getProductWisePartyList(productId, from, to, "patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSales) {
			productWiseBatchSales.add(patient);
		}

		return productWiseBatchSales;
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getPartyList(String from, String to) {

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = purchaseDao.getPartyList(from, to, "counterSale");

		Set<ReportProductWiseBatchSale> set = new HashSet<ReportProductWiseBatchSale>(counterSales);

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = purchaseDao.getPartyList(from, to, "indentSale");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = purchaseDao.getPartyList(from, to, "hospitalSale");

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = purchaseDao.getPartyList(from, to, "patientSale");

		set.addAll(indentSales);
		set.addAll(hospitalSales);
		set.addAll(patientSales);

		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>(set);

		return productWiseBatchSales;
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(Integer vendorId, String from, String to) {
		List<ReportProductWiseBatchSale> productWiseBatchSales = new ArrayList<ReportProductWiseBatchSale>();

		List<ReportProductWiseBatchSale> counterSales = new ArrayList<ReportProductWiseBatchSale>();
		counterSales = purchaseDao.getPartyWiseProductSaleList(vendorId, from, to, "counterSale");

		List<ReportProductWiseBatchSale> indentSales = new ArrayList<ReportProductWiseBatchSale>();
		indentSales = purchaseDao.getPartyWiseProductSaleList(vendorId, from, to, "indentSales");

		List<ReportProductWiseBatchSale> hospitalSales = new ArrayList<ReportProductWiseBatchSale>();
		hospitalSales = purchaseDao.getPartyWiseProductSaleList(vendorId, from, to, "hospitalSale");

		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = purchaseDao.getPartyWiseProductSaleList(vendorId, from, to, "patientSale");

		for (ReportProductWiseBatchSale counter : counterSales) {
			productWiseBatchSales.add(counter);
		}

		for (ReportProductWiseBatchSale indent : indentSales) {
			productWiseBatchSales.add(indent);
		}

		for (ReportProductWiseBatchSale hospital : hospitalSales) {
			productWiseBatchSales.add(hospital);
		}

		for (ReportProductWiseBatchSale patient : patientSales) {
			productWiseBatchSales.add(patient);
		}
		return productWiseBatchSales;
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getLimitPurchases(Integer unitId) {
		return purchaseDao.getLimitPurchases(unitId);
	}

	@Override
	@Transactional
	public Integer getNextAutoIncrement() {

		return purchaseDao.getNextAutoIncrement();
	}

	@Override
	@Transactional
	public List<PurchaseMaster> getPurchaseData(Integer unitId) {
		return purchaseDao.getPurchaseData(unitId);
	}

	@Override
	@Transactional
	public PurchaseMaster getPurchaseEntryByPurchaseId(Integer poId) {
		return purchaseDao.getPurchaseEntryByPurchaseId(poId);
	}

	@Override
	@Transactional
	public PurchaseMaster getPurchaseEntrySlaveForDebitNoteByPurId(Integer poId) {
		return purchaseDao.getPurchaseEntrySlaveForDebitNoteByPurId(poId);
	}

	@Override
	@Transactional
	public PurchaseMaster getPurchaseByIdForEdit(Integer purchaseId) {

		return purchaseDao.getPurchaseByIdForEdit(purchaseId);
	}

	@Override
	@Transactional
	public String getDelChalanNumber(int purchaseMasterId) {

		return purchaseDao.getDelChalanNumber(purchaseMasterId);
	}

	@Override
	@Transactional
	public Map<String, JSONArray> getProductByBarcode(Integer batchId, String storeId) {
		List<PurchaseHistory> purchaseHistories = purchaseDao.getProductByBarcode(batchId, storeId);

		purchaseHistories.addAll(purchaseDao.getProductByBarcodeForOpeningStock(batchId, storeId));

		JSONArray list = new JSONArray();
		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();

		for (PurchaseHistory bm : purchaseHistories) {
			try {
				JSONObject obj1 = new JSONObject();
				obj1.put("batchCode", bm.getBatchCode());
				obj1.put("batchExpDate", bm.getBatchExpDate());
				obj1.put("mrp", bm.getMRP());
				obj1.put("rate", bm.getSaleRate());
				obj1.put("clearstock", bm.getClearStock());
				obj1.put("batchId", bm.getBatchId());
				obj1.put("stockId", bm.getStockId());
				obj1.put("billRate", bm.getBill_rate());
				obj1.put("lastPurchaseFrom", bm.getLastPurchaseFrom());
				obj1.put("billNo", bm.getBillNo());
				obj1.put("billDate", bm.getBillDate());
				obj1.put("purchaseRate", bm.getPurchaseRate());
				obj1.put("vat", bm.getVat());
				obj1.put("purchaseId", bm.getPurchaseId());
				obj1.put("purchaseSlaveId", bm.getPurchaseSlaveId());
				obj1.put("productName", bm.getProductName());
				obj1.put("unit", bm.getProductUnit());
				obj1.put("pack", bm.getProductPack());
				obj1.put("comp", bm.getProductComp());
				obj1.put("productId", bm.getProductid());
				obj1.put("currentStock", bm.getCurrentStock());
				obj1.put("shelfName", bm.getShelfName());
				obj1.put("drugName", bm.getDrugName());
				obj1.put("presciption", bm.getProductPrescription());
				obj1.put("categoryId", bm.getProductCategoryId());
				obj1.put("igst", bm.getStockDetails());
				obj1.put("cess", bm.getNetRate());

				list.put(obj1);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		batchData.put("result", list);
		return batchData;
	}

	@Override
	@Transactional
	public PurchaseMaster savePurchaseMaster(VendorMaster vendorMaster,HttpServletRequest request ) {

		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		//Unit ID From session 
		Integer unitId =(Integer) session.getAttribute("uId");
		
		PurchaseMaster purchaseMaster = new PurchaseMaster();

		purchaseMaster.setPurDeleteFlag(0);
		purchaseMaster.setPurUpdateDate(new Date(new java.util.Date().getTime()));
		purchaseMaster.setPurDocId("doc" + Math.random());
		purchaseMaster.setPurchaseStatus("y");
		purchaseMaster.setPurBillDate(new Date(new java.util.Date().getTime()));
		purchaseMaster.setPurEntryDate(new Date(new java.util.Date().getTime()));
		purchaseMaster.setPurDueDate(new Date(new java.util.Date().getTime()));
		purchaseMaster.setPurBillNo("cath-" + "".hashCode());
		purchaseMaster.setPurLess(0.0);
		purchaseMaster.setPurAdd(0.0);
		purchaseMaster.setPurTransType(0 + "");
		purchaseMaster.setVmi(0);
		purchaseMaster.setVendorAddress(vendorMaster.getVendorAddresses().get(0));

		Integer cnt = 0;
		double totalAmt = 0.0;
		double totalVat = 0.0;
		List<PurchaseSlave> ltPurchaseSlaves = new ArrayList<PurchaseSlave>();
		for (ProductMaster productMaster : vendorMaster.getProductMasters()) {

			PurchaseSlave purchaseSlave = new PurchaseSlave();
			cnt++;
			purchaseSlave.setPurSlaveSr(cnt);

			List<BatchMaster> newBatchMasters = new ArrayList<BatchMaster>();

			BatchMaster batchMaster = productMaster.getBatchMaster().get(0);
			batchMaster.setProductMaster(productMaster);
			batchMaster.setBatchDeleteFlag(0);
			batchMaster.setBatchUpdateDate(new Date(new java.util.Date().getTime()));
			// batchMaster.setBatchCode("cathBatch"+productMaster.getProductId());
			batchMaster.setBatchExpDate("12/25");
			batchMaster.setUnitId(unitId);

			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockDeleteFlag(0);
			stockMaster.setStockUpdateDate(new Date(new java.util.Date().getTime()));
			stockMaster.setStockQtyInHand(0.0);
			stockMaster.setStockProductMaster(productMaster);
			stockMaster.setBatchMaster(batchMaster);
			stockMaster.setStockQtyOnOrder(0);
			stockMaster.setUnitId(unitId);

			batchMaster.setStockMaster(stockMaster);
			purchaseSlave.setBatchMaster(batchMaster);
			newBatchMasters.add(batchMaster);

			if (!(productMaster.getCess() == null || productMaster.getCess().equals("null")
					|| productMaster.getCess().equals("")))
				purchaseSlave.setPurCess(Double.parseDouble(productMaster.getCess()));
			else
				purchaseSlave.setPurCess(0.0);
			if (!(productMaster.getIgst() == null || productMaster.getIgst().equals("null")
					|| productMaster.getIgst().equals("")))
				purchaseSlave.setPurIgst(Double.parseDouble(productMaster.getIgst()));
			else
				purchaseSlave.setPurIgst(0.0);
			if ((productMaster.getSgst() == null || productMaster.getSgst().equals("null")
					|| productMaster.getSgst().equals("")))
				productMaster.setSgst(0.0 + "");
			if ((productMaster.getCgst() == null || productMaster.getCgst().equals("null")
					|| productMaster.getCgst().equals("")))
				productMaster.setCgst(0.0 + "");

			purchaseSlave.setBatchCode(batchMaster.getBatchCode());
			purchaseSlave.setProductMaster(productMaster);
			purchaseSlave.setPurHsn(productMaster.getHsn());
			purchaseSlave.setPurVat(
					Double.parseDouble(productMaster.getCgst()) + Double.parseDouble(productMaster.getSgst()));
			purchaseSlave.setPurSlaveQty((int) Double.parseDouble(productMaster.getProductUnit() + ""));
			purchaseSlave.setPurSlaveAmt(productMaster.getProductLastPurRate() * purchaseSlave.getPurSlaveQty());
			purchaseSlave.setPurSlaveBillRate(productMaster.getProductLastPurRate());
			purchaseSlave.setPurSlaveMrp(productMaster.getProductLastMRP());
			purchaseSlave.setPurSlaveSr(1);
			purchaseSlave.setPurslaverate(productMaster.getProductLastMRP());
			purchaseSlave.setPurSlavePurchaseRate(productMaster.getProductLastPurRate()
					+ (productMaster.getProductLastPurRate() * (Double.parseDouble(productMaster.getCess())
							+ Double.parseDouble(productMaster.getIgst()) + Double.parseDouble(productMaster.getCgst())
							+ Double.parseDouble(productMaster.getSgst()))));

			ltPurchaseSlaves.add(purchaseSlave);
			productMaster.setBatchMaster(newBatchMasters);

			totalAmt += purchaseSlave.getPurSlaveAmt();
			totalVat += (productMaster.getProductLastPurRate() * purchaseSlave.getPurSlaveQty())
					* (Double.parseDouble(productMaster.getCess()) + Double.parseDouble(productMaster.getIgst())
							+ Double.parseDouble(productMaster.getCgst()) + Double.parseDouble(productMaster.getSgst()))
					/ 100;

		}

		purchaseMaster.setLtPurSlave(ltPurchaseSlaves);
		purchaseMaster.setPurGrossAmt(totalAmt);
		purchaseMaster.setPurNetAmt(totalAmt + totalVat);
		purchaseMaster.setPurTotalVat(totalVat);
		purchaseMaster.setPurVat(totalVat);
		purchaseMaster.setVendorMaster(vendorMaster);
		purchaseMaster.setPurLess(0.0);
		purchaseMaster.setPurSurcharge(0.0);
		purchaseMaster.setPurTaxVat5(0.0);
		purchaseMaster.setUnitId(unitId);

		purchaseMaster = purchaseDao.saveOrUpdatePurchase(purchaseMaster,unitId);
		if (purchaseMaster != null) {

			try {
				for (int i = 0; i < purchaseMaster.getLtPurSlave().size(); i++) {
					PurchaseRateHistory purchaseRateHistory = new PurchaseRateHistory();
					purchaseRateHistory.setMrp(purchaseMaster.getLtPurSlave().get(i).getPurSlaveMrp());
					purchaseRateHistory.setBatchId(purchaseMaster.getLtPurSlave().get(i).getBatchMaster().getBatchId());
					purchaseRateHistory.setPurRate(purchaseMaster.getLtPurSlave().get(i).getPurSlavePurchaseRate());
					purchaseRateHistory.setPurSlaveId(purchaseMaster.getLtPurSlave().get(i).getPurSlaveId());
					purchaseRateHistory.setRate(purchaseMaster.getLtPurSlave().get(i).getPurslaverate());
					purchaseRateHistory.setUpdateDate(new java.util.Date());
					purchaseRateHistory.setBillRate(purchaseMaster.getLtPurSlave().get(i).getPurSlaveBillRate());
					purchaseDao.savePurchaseRateDetails(purchaseRateHistory);

				}
			} catch (Exception e) {
				System.out.println(e);
			}
		}
		return purchaseMaster;
	}

	/****
	 * @author :BILAL
	 * @Date :13-12-2017
	 * @code :For Sending to finance
	 *       *
	 ****/
	@Override
	@Transactional
	public int SendToGRNForFinance(HttpServletRequest request, String grnId) {

		return purchaseDao.SendToGRNForFinance(request, grnId);
	}

	@Override
	public List<PurchaseSlave> getBatchDetailsForPrint(Integer masterId) {
		// TODO Auto-generated method stub
		return purchaseDao.getBatchDetailsForPrint(masterId);
	}
	
	
	@Override
	@Transactional
	public Map<String, JSONArray> getBatchDetailsWithoutExpiry(Integer productId, String storeId ) {

		List<PurchaseHistory2> purchaseHistories = purchaseDao.getBatchDetailsWithoutExpiry(productId, storeId);

		List<PurchaseHistory2> openingStock = purchaseDao.getBatchDetailsForOpeningStockWithoutExpiry(productId, storeId);

		purchaseHistories.addAll(openingStock);

		JSONArray list = new JSONArray();
		Map<String, JSONArray> batchData = new HashMap<String, JSONArray>();

		for (PurchaseHistory2 bm : purchaseHistories) {

			try {
				JSONObject obj1 = new JSONObject();
//				obj1.put("batchCode", bm.getBatch_code());
//				obj1.put("batchExpDate", bm.getBatch_exp_date());
//				obj1.put("mrp", bm.getMrp());
//				obj1.put("saleRate", bm.getRate());
//				obj1.put("clearStock", bm.getStock_qty_in_hand());
//				obj1.put("batchId", bm.getBatch_id());
//				obj1.put("stockId", bm.getStock_id());
//				obj1.put("billRate", bm.getBill_rate());
//				obj1.put("lastPurchaseFrom", bm.getVendor_name());
//				obj1.put("billNo", bm.getPur_bill_no());
//				obj1.put("billDate", bm.getPur_bill_date());
//				obj1.put("purchaseRate", bm.getPur_rate());
//				obj1.put("vat", bm.getGst());
//				obj1.put("purchaseId", bm.getPur_id());
//				obj1.put("purchaseSlaveId", bm.getPur_slave_id());
				// obj1.put("hsn", bm.get);
				
				String salerat = Double.toString(bm.getRate());
				String mrp = Double.toString(bm.getMrp());
				String clearStock = Double.toString(bm.getStock_qty_in_hand());
				String batchId = Integer.toString(bm.getBatch_id());
				String stockId = Integer.toString(bm.getStock_id());
				String billRate = Double.toString(bm.getBill_rate());
				try {
				String prescriptionId = Integer.toString(bm.getProduct_prescription());
				}catch (Exception e) {
					e.printStackTrace();
				}
				
				//String billDate = Double.toString(bm.getPur_bill_date());
				DateFormat df = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
				String billDate1 = df.format(bm.getPur_bill_date());
				
				String purchaseRate = Double.toString(bm.getPur_rate());
				String vat = Double.toString(bm.getGst());
				String purchaseId ="";
				if(bm.getPur_id()==null) {
					purchaseId="0";
				}else {
					purchaseId= Integer.toString(bm.getPur_id());
				}
				String purchaseSlaveId="";
				if(bm.getPur_slave_id()==null) {
					purchaseSlaveId="0";
				}else {
					purchaseSlaveId = Integer.toString(bm.getPur_slave_id());
				}
				obj1.put("batchCode", bm.getBatch_code());
				obj1.put("batchExpDate", bm.getBatch_exp_date());
				obj1.put("mrp", mrp);
				obj1.put("saleRate", salerat );
				obj1.put("clearStock", clearStock);
				obj1.put("batchId", batchId);
				obj1.put("stockId", stockId);
				obj1.put("billRate", billRate);
				obj1.put("lastPurchaseFrom", bm.getVendor_name());
				obj1.put("billNo", bm.getPur_bill_no());
				obj1.put("billDate", billDate1);
				obj1.put("purchaseRate", purchaseRate);
				obj1.put("vat", vat);
				obj1.put("purchaseId", purchaseId);
				obj1.put("purchaseSlaveId", purchaseSlaveId);
				obj1.put("difference", bm.getDifference());
				obj1.put("difference", bm.getDifference());
				obj1.put("prescriptionId", bm.getProduct_prescription());

				list.put(obj1);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		batchData.put("result", list);
		return batchData;
	}
	
	@Override
	@Transactional
	public String getTotalStockWithoutExpiry(Integer productId) {
		String total = purchaseDao.getTotalStockWithoutExpiry(productId);

		return total;
	}

	@Override
	@Transactional
	public Integer getProductPrescriptionId(Integer productId) {
		// TODO Auto-generated method stub
		return purchaseDao.getProductPrescriptionId(productId);
	}
	@Override
	@Transactional
	public List<PurchaseRateHistory> getCorrectionRateBackToList( Integer unitId ,HttpServletRequest request) {
		return purchaseDao.getCorrectionRateBackToList(unitId,request);
	}

	@Override
	@Transactional
	public PurchaseRateHistory getDataById(Integer unitId,Integer productId , HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseDao.getDataById(unitId,productId,request);
	}
	@Override
	@Transactional
	public List<PurchaseRateHistory> autoSuggestionProduct(String letter,Integer unitId) {
		return purchaseDao.autoSuggestionProduct(letter,unitId);
	}
	@Override
	@Transactional
	public List<PurchaseRateHistory> getCorrectionRateDetail(Integer productId,Integer unitId)
	{
		// TODO Auto-generated method stub
		return purchaseDao.getCorrectionRateDetail(productId,unitId);
	}	
}
