package com.hms.pharmacy.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.DistrictwisePatientCountDTO;
import com.hms.dto.Doctor;
import com.hms.dto.DoctorList;
import com.hms.dto.Users;
import com.hms.ehat.dto.WardWiseDetaisDto;
import com.hms.pharmacy.dao.ReportDao;
import com.hms.pharmacy.pojo.CashReceiptReport;
import com.hms.pharmacy.pojo.ChequePaidReceiptReport;
import com.hms.pharmacy.pojo.ChequeReceiptReport;
import com.hms.pharmacy.pojo.CreditNoteDetailsReportDTO;
import com.hms.pharmacy.pojo.DebitNoteData;
import com.hms.pharmacy.pojo.MrnReportDetail;
import com.hms.pharmacy.pojo.PaidReceiptReport;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.PatientSaleBillSlave;
import com.hms.pharmacy.pojo.PendingBill;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportDebitNote;
import com.hms.pharmacy.pojo.ReportExpiry;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportList;
import com.hms.pharmacy.pojo.ReportMIS;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.ReportStock;
import com.hms.pharmacy.pojo.ReportStock2;
import com.hms.pharmacy.pojo.ReportVat;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	ReportDao reportDao;

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getPartyWiseProductSaleList(
			String forDate,String toDate, String type) {
		return reportDao.getPartyWiseProductSaleList(forDate, toDate,type);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getPartyWiseProductSaleListStorewise(
			String forDate, String type,String storeName) {
		return reportDao.getPartyWiseProductSaleListStorewise(forDate, type,storeName);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalSaleData(String from,
			String to, String type) 
	{		
		return reportDao.getTotalSaleData(from, to, type);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalCounterSaleDataWithPurchaseRate(String from,
			String to, String type) 
	{		
		return reportDao.getTotalCounterSaleDataWithPurchaseRate(from, to, type);
	}
	
	@Override
	@Transactional
	public List<ReportStock> getProductWiseStock(String type) 
	{

		List<ReportStock> reportStocks = reportDao.getProductWiseStock(type,
				"purchase");
		List<ReportStock> reportOpeningStock = reportDao.getProductWiseStock(
				type, "opening");
		List<ReportStock> finalResult = new ArrayList<ReportStock>();
		for (ReportStock result : reportStocks) {
			finalResult.add(result);
		}

		for (ReportStock result : reportOpeningStock) {
			finalResult.add(result);
		}
		
		Collections.sort(finalResult, new Comparator<ReportStock>() {
			  public int compare(ReportStock o1, ReportStock o2) 
			  {
				  if(o1.getProductName().compareTo(o2.getProductName())>0)
					  { 
					  return 1;
				      }
				 else 
				 {  
					 return -1;
				}
			  }
			});
		
		return finalResult;

	}

	@Override
	@Transactional
	public List<ReportStock> getCompanyWiseStock() {
		List<ReportStock> stocks = new ArrayList<ReportStock>();

		List<ReportStock> reportStocks = reportDao.getCompanyWiseStock();
		if (reportStocks != null && reportStocks.size() > 0) {
			for (ReportStock reportStock : reportStocks) {
				Double amount = 0.0;
				int count = 0;
				for (ReportStock stock : stocks) {
					if (reportStock.getPurRate().length() > 0
							&& reportStock.getPurRate().equals("")) {
						amount = amount
								+ Double.parseDouble(reportStock.getPurRate());
					}
					if (stock.getCompanyId().equals(reportStock.getCompanyId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					reportStock.setAmount(amount.toString());
					stocks.add(reportStock);
				}

			}
		}

		for (ReportStock reportStock : reportStocks) {
			Double amount = 0.0;
			for (ReportStock stock : stocks) {
				if (stock.getCompanyId().equals(reportStock.getCompanyId())) {
					if (reportStock.getPurRate().length() > 0
							&& reportStock.getPurRate().equals("")) {
						amount = amount
								+ Double.parseDouble(reportStock.getPurRate());
					}
					stock.setAmount(amount.toString());
				}
			}
		}
		return stocks;
	}

	@Override
	@Transactional
	public List<ReportStock> getCompanyWiseStockByCompanyId(Integer companyId) {

		List<ReportStock> reportStocks = reportDao
				.getCompanyWiseStockByCompanyId(companyId, "purchase");
		List<ReportStock> reportOpeningStock = reportDao
				.getCompanyWiseStockByCompanyId(companyId, "opening");
		List<ReportStock> finalResult = new ArrayList<ReportStock>();
	
		for (ReportStock result : reportStocks) {
			finalResult.add(result);
		}

		for (ReportStock result : reportOpeningStock) {
			finalResult.add(result);
		}
	
		
		Collections.sort(finalResult, new Comparator<ReportStock>() {
			  public int compare(ReportStock o1, ReportStock o2) 
			  {
				  if(o1.getProductName().compareTo(o2.getProductName())>0)
					  { 
					  
					  return 1;
				      }
				 else 
				 {  
					 return -1;
					 
				}
			  }
			});
		
		return finalResult;
		/* return reportDao.getCompanyWiseStockByCompanyId(companyId); */
	}

	@Override
	@Transactional
	public List<ReportStock> getShelfWiseStock() {
		List<ReportStock> stocks = new ArrayList<ReportStock>();

		List<ReportStock> reportStocks = reportDao.getShelfWiseStock();
		if (reportStocks != null && reportStocks.size() > 0) {
			for (ReportStock reportStock : reportStocks) {

				int count = 0;
				for (ReportStock stock : stocks) {
					if (stock.getShelfId().equals(reportStock.getShelfId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					stocks.add(reportStock);
				}

			}
		}
		return stocks;
	}

	@Override
	@Transactional
	public List<ReportStock> getShelfWiseStockByShelfId(Integer shelfId) {

		List<ReportStock> reportStocks = reportDao.getShelfWiseStockByShelfId(
				shelfId, "purchase");
		List<ReportStock> reportOpeningStock = reportDao
				.getShelfWiseStockByShelfId(shelfId, "opening");
		List<ReportStock> finalResult = new ArrayList<ReportStock>();
		for (ReportStock result : reportStocks) {
			finalResult.add(result);
		}

		for (ReportStock result : reportOpeningStock) {
			finalResult.add(result);
		}
		return finalResult;
	}

	@Override
	@Transactional
	public List<ReportStock> getCategoryWiseStock() {
		List<ReportStock> stocks = new ArrayList<ReportStock>();

		List<ReportStock> reportStocks = reportDao.getCategoryWiseStock();
		if (reportStocks != null && reportStocks.size() > 0) {
			for (ReportStock reportStock : reportStocks) {

				int count = 0;
				for (ReportStock stock : stocks) {
					if (stock.getCategoryId().equals(
							reportStock.getCategoryId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					stocks.add(reportStock);
				}

			}
		}
		return stocks;
	}

	@Override
	@Transactional
	public List<ReportStock> getCategoryWiseStockByCategoryId(Integer categoryId) {
		List<ReportStock> reportStocks = reportDao
				.getCategoryWiseStockByCategoryId(categoryId, "purchase");
		List<ReportStock> reportOpeningStock = reportDao
				.getCategoryWiseStockByCategoryId(categoryId, "opening");
		List<ReportStock> finalResult = new ArrayList<ReportStock>();
		for (ReportStock result : reportStocks) {
			finalResult.add(result);
		}

		for (ReportStock result : reportOpeningStock) {
			finalResult.add(result);
		}
		
		Collections.sort(finalResult, new Comparator<ReportStock>() {
			  public int compare(ReportStock o1, ReportStock o2) 
			  {
				  if(o1.getProductName().compareTo(o2.getProductName())>0)
					  { 
					  return 1;
				      }
				 else 
				 {  
					 return -1;
				}
			  }
			});
		
		return finalResult;
	}

	@Override
	@Transactional
	public List<ReportPurchase> getProductWisePurchase(String from, String to,
			String productId) {
		return reportDao.getProductWisePurchase(from, to, productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getBatchWisePurchase(String from, String to,
			String productId) {
		return reportDao.getBatchWisePurchase(from, to, productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getBatchWisePurchaseByBatchId(String from,
			String to, String batchId) {
		return reportDao.getBatchWisePurchaseByBatchId(from, to, batchId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getNewProductWisePurchase(String from, String to) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();

		List<ReportPurchase> result = reportDao.getNewProductWisePurchase(from,
				to);
		if (result != null && result.size() > 0) {
			for (ReportPurchase reportStock : result) {

				int count = 0;
				for (ReportPurchase stock : reportPurchases) {
					if (stock.getProductId().equals(reportStock.getProductId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					reportPurchases.add(reportStock);
				}

			}
		}

		return reportPurchases;
	}

	@Override
	@Transactional
	public List<ReportPurchase> getNewProductByIdWisePurchase(String from,
			String to, String productId) {
		return reportDao.getNewProductByIdWisePurchase(from, to, productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getPartyWisePurchase(String from, String to,
			String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();

		List<ReportPurchase> result = reportDao.getPartyWisePurchase(from, to,
				productId);
		if (result != null && result.size() > 0) {
			for (ReportPurchase reportStock : result) {

				int count = 0;
				for (ReportPurchase stock : reportPurchases) {
					if (stock.getVendorId().equals(reportStock.getVendorId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					reportPurchases.add(reportStock);
				}

			}
		}

		return reportPurchases;
	}

	@Override
	@Transactional
	public List<ReportPurchase> getPartyWisePurchaseTotalBill(String from, String to) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();

		List<ReportPurchase> result = reportDao.getPartyWisePurchaseTotalBill(from, to);
		if (result != null && result.size() > 0) {
			for (ReportPurchase reportStock : result) {

				int count = 0;
				for (ReportPurchase stock : reportPurchases) {
					if (stock.getVendorId().equals(reportStock.getVendorId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					reportPurchases.add(reportStock);
				}

			}
		}

		return reportPurchases;
	}

	
	
	@Override
	@Transactional
	public List<ReportPurchase> getPartyWisePurchaseByPartyId(String from,
			String to, String vendorId, String productId) {
		return reportDao.getPartyWisePurchaseByPartyId(from, to, vendorId,
				productId);

	}
	
	@Override
	@Transactional
	public List<ReportPurchase> getPartyWisePurchaseTotalBillAmt(String from,String to)
			 {
		return reportDao.getPartyWisePurchaseTotalBillAmt(from, to);

	}
	
	@Override
	@Transactional
	public List<ReportPurchase> getCategoryWisePurchase(String from, String to,
			String productId) {
		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();

		List<ReportPurchase> result = reportDao.getCategoryWisePurchase(from,
				to, productId);
		if (result != null && result.size() > 0) {
			for (ReportPurchase reportStock : result) {

				int count = 0;
				for (ReportPurchase stock : reportPurchases) {
					if (stock.getCategoryId().equals(
							reportStock.getCategoryId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					reportPurchases.add(reportStock);
				}

			}
		}
		return reportPurchases;
	}

	@Override
	@Transactional
	public List<ReportPurchase> getCategoryWisePurchaseByCatId(String from,
			String to, String productId, String categoryId) {
		return reportDao.getCategoryWisePurchaseByCatId(from, to, productId,
				categoryId);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> patientwiseProductList(
			Integer patientId, String from, String to, String type) {
		return reportDao.patientwiseProductList(patientId, from, to,type);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getCompanyWisePurchase(String from, String to) {

		List<ReportPurchase> reportPurchases = new ArrayList<ReportPurchase>();

		List<ReportPurchase> result = reportDao
				.getCompanyWisePurchase(from, to);
		if (result != null && result.size() > 0) {
			for (ReportPurchase reportStock : result) {

				int count = 0;
				for (ReportPurchase stock : reportPurchases) {
					if (stock.getCompanyId().equals(reportStock.getCompanyId())
							&& count == 0) {
						count = 1;
					}
				}
				if (count == 0) {
					reportPurchases.add(reportStock);
				}

			}
		}
		return reportPurchases;
	}

	@Override
	@Transactional
	public List<ReportPurchase> getCompanyWisePurchaseByCompanyId(String from,
			String to, String companyId) {
		return reportDao.getCompanyWisePurchaseByCompanyId(from, to, companyId);
	}

	@Override
	@Transactional
	public List<PendingBill> getPendingBills(String from, String to) {
		return reportDao.getPendingBills(from, to);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getPurchaseDiscount(String from, String to) {
		return reportDao.getPurchaseDiscount(from, to);
	}

	@Override
	@Transactional
	public List<ReportMIS> getDailyBusinessReport(String from, String to) {
		return reportDao.getDailyBusinessReport(from, to);
	}

	@Override
	@Transactional
	public List<ReportExpiry> getNearExpiryReport(String from, String to,String callform,Integer compId,Integer shelfId) {
		return reportDao.getNearExpiryReport(from, to, callform,compId,shelfId);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getFifthCounterDailySaleData(
			String from, String type) {
		return reportDao.getFifthCounterDailySaleData(from, type);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalSaleDataForFifthCounter(
			String from, String to, String type) {
		return reportDao.getTotalSaleDataForFifthCounter(from, to, type);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getDayWisePurchase(String from, String to, String callform) {
		return reportDao.getDayWisePurchase(from, to,callform);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalSchH1CounterSaleData(
			String from, String to, String type) {
		return reportDao.getTotalSchH1CounterSaleData(from, to, type);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalSchXCounterSaleData(
			String from, String to, String type) {
		return reportDao.getTotalSchXCounterSaleData(from, to, type);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalSchNDPSCounterSaleData(
			String from, String to, String type) {
		return reportDao.getTotalSchNDPSCounterSaleData(from, to, type);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalSchNRXCounterSaleData(
			String from, String to, String type) {
		return reportDao.getTotalSchNRXCounterSaleData(from, to, type);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getCategoryWiseSale(String from,
			String to) {
		return null;
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getCategoryWiseSaleData(
			String from, String to, String type, String catId) {
		return reportDao.getCategoryWiseSaleData(from, to, type, catId);
	}

	@Override
	@Transactional
	public List<ReportStock> getProductWiseStockByProductId(Integer productId) {
		List<ReportStock> reportStocks = reportDao
				.getProductWiseStockByProductId(productId, "purchase");
		List<ReportStock> reportOpeningStock = reportDao
				.getProductWiseStockByProductId(productId, "opening");
		List<ReportStock> finalResult = new ArrayList<ReportStock>();
		for (ReportStock result : reportStocks) {
			finalResult.add(result);
		}

		for (ReportStock result : reportOpeningStock) {
			finalResult.add(result);
		}
		return finalResult;
	}

	@Override
	@Transactional
	public List<ReportStock> getProductWiseStockByDrugId(Integer drugId) {
		List<ReportStock> reportStocks = reportDao.getProductWiseStockByDrugId(
				drugId, "purchase");
		List<ReportStock> reportOpeningStock = reportDao
				.getProductWiseStockByDrugId(drugId, "opening");
		List<ReportStock> finalResult = new ArrayList<ReportStock>();
		for (ReportStock result : reportStocks) {
			finalResult.add(result);
		}

		for (ReportStock result : reportOpeningStock) {
			finalResult.add(result);
		}
		
		
		Collections.sort(finalResult, new Comparator<ReportStock>() {
			  public int compare(ReportStock o1, ReportStock o2) 
			  {
				  if(o1.getProductName().compareTo(o2.getProductName())>0)
					  { 
					  return 1;
				      }
				 else 
				 {  
					 return -1;
				}
			  }
			});
		return finalResult;
	}

	@Override
	@Transactional
	public List<ReportStock> getStockOutData(String from, String to, String type) {
		return reportDao.getStockOutData(from, to, type);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getDeletedPurchase() {
		return reportDao.getDeletedPurchase();
	}

	@Override
	@Transactional
	public List<ReportExpiry> getNearCompanyWiseExpiryReport(
			String finalFromResult, String toResult, int companyId) {
		return reportDao.getNearCompanyWiseExpiryReport(finalFromResult,
				toResult, companyId);
	}

	@Override
	@Transactional
	public List<ReportExpiry> getShelfWiseBatchExpData(String finalFromResult,
			String toResult, int shelfId) {
		return reportDao.getShelfWiseBatchExpData(finalFromResult, toResult,
				shelfId);
	}

	@Override
	@Transactional
	public List<ReportVat> getMonthWiseVatPurchase(String from, String to) {
		
		List<ReportVat> reportVats = reportDao
				.getMonthWiseVatPurchase(from, to);
		
		/*List<ReportVat> newReportVatList = new ArrayList<ReportVat>();
		for (ReportVat reportStock : reportVats) {

			if (newReportVatList.size() > 0) {
				int count=0;
				if (newReportVatList.contains(reportStock)==true) {
					count=1;
				}
				if(count==1)
				{
					for (int i = 0; i < newReportVatList.size(); i++) {
						
						if(reportStock.getBillDate().equals(newReportVatList.get(i).getBillDate()))
						{
							ReportVat newReportVat = newReportVatList.get(i);
							Double totalVat5 = 0.0;
							Double totalVat12 = 0.0;
							Double netAmount = 0.0;
							
							if (reportStock.getVat5() != null) {
								if (reportStock.getVat5().isEmpty() == false) {
									totalVat5 = Double.parseDouble(reportStock
											.getVat5())
											+ Double.parseDouble(newReportVat
													.getVat5().toString());
								} else {
									if (newReportVat.getVat5().isEmpty() == true) {
										
									} else {
										totalVat5= 0 + Double
												.parseDouble(newReportVat
														.getVat5().toString());
									}
								}
							}

							if (reportStock.getVat12() != null) {
								if (reportStock.getVat12().isEmpty() == false) {
									totalVat12 = Double.parseDouble(reportStock
											.getVat12())
											+ Double.parseDouble(newReportVat
													.getVat12().toString());
								} else {
									if (newReportVat.getVat12().isEmpty() == true) {
										
									} else {
										totalVat12 = 0 + Double
												.parseDouble(newReportVat
														.getVat12().toString());
									}
								}
							}
							
							if (reportStock.getNetAmount() != null) {
								if (reportStock.getNetAmount().isEmpty() == false) {
									netAmount = Double.parseDouble(reportStock
											.getNetAmount())
											+ Double.parseDouble(newReportVat
													.getNetAmount().toString());
								} else {
									if (newReportVat.getNetAmount().isEmpty() == true) {
										
									} else {
										netAmount = 0 + Double
												.parseDouble(newReportVat
														.getNetAmount().toString());
									}
								}
							}

							newReportVat.setVat5(totalVat5.toString());
							newReportVat.setVat12(totalVat12.toString());
							newReportVat.setNetAmount(netAmount.toString());
							
							newReportVatList.set(i, newReportVat);
						}
					}
				}
				else
				{
					if (reportStock.getVat5().isEmpty() == true) {
						reportStock.setVat5("0");
					}
					if (reportStock.getVat12().isEmpty() == true) {
						reportStock.setVat12("0");
					}
					newReportVatList.add(reportStock);
				}
					
				
			} else {
				if (reportStock.getVat5().isEmpty() == true) {
					reportStock.setVat5("0");
				}
				if (reportStock.getVat12().isEmpty() == true) {
					reportStock.setVat12("0");
				}
				newReportVatList.add(reportStock);
			}

		}
		
		List<ReportVat> totalAmountCalcList = newReportVatList;
		for(int i=0;i<totalAmountCalcList.size();i++){
			Double vat5=0.0;
			Double vat12=0.0;
			Double amt5=0.0;
			Double amt12=0.0;
			
			if(Double.parseDouble(totalAmountCalcList.get(i).getVat5())>0)
				vat5=Double.parseDouble(totalAmountCalcList.get(i).getVat5());
			
			if(Double.parseDouble(totalAmountCalcList.get(i).getVat12())>0)
				vat12=Double.parseDouble(totalAmountCalcList.get(i).getVat12());
			
			Double netAmount=Double.parseDouble(totalAmountCalcList.get(i).getNetAmount());
			
			if(vat5!=0)
			{
				amt5=(netAmount-vat5);
			}
			if(vat12!=0)
			{
				amt12=(netAmount-vat12);
			}
			totalAmountCalcList.get(i).setAmt5(amt5.toString());
			totalAmountCalcList.get(i).setAmt12(amt12.toString());
		}
		*/

		return reportVats;
	}
	
	@Override
	@Transactional
	public List<ReportVat> getDateWiseVatPurchase(String from, String to) {
		List<ReportVat> reportVats = reportDao
				.getDateWiseVatPurchase(from, to);
		
		return reportVats;
	}

	@Override
	@Transactional
	public List<ReportVat> getPartyWiseVatPurchase(String from, String to) {
		List<ReportVat> reportVats = reportDao
				.getPartyWiseVatPurchase(from, to);
		
		/*List<ReportVat> newReportVatList = new ArrayList<ReportVat>();
		for (ReportVat reportStock : reportVats) {

			if (newReportVatList.size() > 0) {
				int count=0;
				if (newReportVatList.contains(reportStock)==true) {
					count=1;
				}
				if(count==1)
				{
					for (int i = 0; i < newReportVatList.size(); i++) {
						
						if(reportStock.getVendorId().equals(newReportVatList.get(i).getVendorId()))
						{
							ReportVat newReportVat = newReportVatList.get(i);
							Double totalVat5 = 0.0;
							Double totalVat12 = 0.0;
							Double netAmount = 0.0;
							
							if (reportStock.getVat5() != null) {
								if (reportStock.getVat5().isEmpty() == false) {
									totalVat5 = Double.parseDouble(reportStock
											.getVat5())
											+ Double.parseDouble(newReportVat
													.getVat5().toString());
								} else {
									if (newReportVat.getVat5().isEmpty() == true) {
										
									} else {
										totalVat5= 0 + Double
												.parseDouble(newReportVat
														.getVat5().toString());
									}
								}
							}

							if (reportStock.getVat12() != null) {
								if (reportStock.getVat12().isEmpty() == false) {
									totalVat12 = Double.parseDouble(reportStock
											.getVat12())
											+ Double.parseDouble(newReportVat
													.getVat12().toString());
								} else {
									if (newReportVat.getVat12().isEmpty() == true) {
										
									} else {
										totalVat12 = 0 + Double
												.parseDouble(newReportVat
														.getVat12().toString());
									}
								}
							}
							
							if (reportStock.getNetAmount() != null) {
								if (reportStock.getNetAmount().isEmpty() == false) {
									netAmount = Double.parseDouble(reportStock
											.getNetAmount())
											+ Double.parseDouble(newReportVat
													.getNetAmount().toString());
								} else {
									if (newReportVat.getNetAmount().isEmpty() == true) {
										
									} else {
										netAmount = 0 + Double
												.parseDouble(newReportVat
														.getNetAmount().toString());
									}
								}
							}

							newReportVat.setVat5(totalVat5.toString());
							newReportVat.setVat12(totalVat12.toString());
							newReportVat.setNetAmount(netAmount.toString());
							
							newReportVatList.set(i, newReportVat);
						}
					}
				}
				else
				{
					if (reportStock.getVat5().isEmpty() == true) {
						reportStock.setVat5("0");
					}
					if (reportStock.getVat12().isEmpty() == true) {
						reportStock.setVat12("0");
					}
					newReportVatList.add(reportStock);
				}
					
				
			} else {
				if (reportStock.getVat5().isEmpty() == true) {
					reportStock.setVat5("0");
				}
				if (reportStock.getVat12().isEmpty() == true) {
					reportStock.setVat12("0");
				}
				newReportVatList.add(reportStock);
			}

		}
		
		List<ReportVat> totalAmountCalcList = newReportVatList;
		for(int i=0;i<totalAmountCalcList.size();i++){
			Double vat5=0.0;
			Double vat12=0.0;
			Double amt5=0.0;
			Double amt12=0.0;
			
			if(Double.parseDouble(totalAmountCalcList.get(i).getVat5())>0)
				vat5=Double.parseDouble(totalAmountCalcList.get(i).getVat5());
			
			if(Double.parseDouble(totalAmountCalcList.get(i).getVat12())>0)
				vat12=Double.parseDouble(totalAmountCalcList.get(i).getVat12());
			
			Double netAmount=Double.parseDouble(totalAmountCalcList.get(i).getNetAmount());
			
			if(vat5!=0)
			{
				amt5=(netAmount-vat5);
			}
			if(vat12!=0)
			{
				amt12=(netAmount-vat12);
			}
			totalAmountCalcList.get(i).setAmt5(amt5.toString());
			totalAmountCalcList.get(i).setAmt12(amt12.toString());
		}
		*/

		return reportVats;
	}

	@Override
	@Transactional
	public List<ReportVat> getVouWiseVatPurchase(String from, String to) {
		List<ReportVat> reportVats = reportDao
				.getVouWiseVatPurchase(from, to);
		
		return reportVats;
	}
	@Override
	@Transactional
	public List<CashReceiptReport> getCashReceiptReport(int unitId,String from, String to) {
		return  reportDao.getCashReceiptReport(unitId,from,to);
	}
	
	@Override
	@Transactional
	public List<ReportPurchase> getDeletedCashReceiptReport() {
		return  reportDao.getDeletedCashReceiptReport();
	}
	
	
	@Override
	@Transactional
	public List<PaidReceiptReport> getCashPaidReport(int unitId,String from, String to) {
		return  reportDao.getCashPaidReport(unitId,from,to);
	}
	
	@Override
	@Transactional
	public List<ReportPurchase> getDeletedCashPaidReport() {
		return  reportDao.getDeletedCashPaidReport();
	}
	
	@Override
	@Transactional
	public List<ChequePaidReceiptReport> getChequePaidReport(int unitId,String from, String to) {
		return  reportDao.getChequePaidReport(unitId,from,to);
	}
	
	@Override
	@Transactional
	public List<ReportPurchase> getDeletedChequePaidReport() {
		return  reportDao.getDeletedChequePaidReport();
	}
	
	
	@Override
	@Transactional
	public List<ChequeReceiptReport> getChequeReceiptReport(int unitId,String from, String to) {
		return  reportDao.getChequeReceiptReport(unitId,from,to);
	}
	
	@Override
	@Transactional
	public List<ReportPurchase> getDeletedChequeReceiptReport() {
		return  reportDao.getDeletedChequeReceiptReport();
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> patientSaleDoctorwise(Integer doctorId,String from,
			String to) {
		return reportDao.patientSaleDoctorwise(doctorId,from, to);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> patientwiseVouList(Integer patientId,String from,
			String to) {
		return reportDao.patientwiseVouList(patientId,from, to);
	}
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDebitNoteData(Integer vendorId,String from,
			String to, String type,String totalAmt)
			{
		return reportDao.getDebitNoteData(vendorId,from, to, type,totalAmt);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getCreditNoteData(String from,
			String to)
			{
		return reportDao.getCreditNoteData(from, to);
	}
	
	@Override
	@Transactional
	public List<DebitNoteData> getDebitNoteData(int unitId,String from,
			String to)
			{
		return reportDao.getDebitNoteData(unitId,from, to);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalSaleDeletedData(
			String type) {
		return reportDao.getTotalSaleDeletedData(type);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getPatientwiseBillAmt(String from,String to)
			 {
		return reportDao.getPatientwiseBillAmt(from, to);

	}
	
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getTotalPatientData(String from,String to)
	{
        List<ReportProductWiseBatchSale> ltReportWiseBatchSale=reportDao.getTotalPatientData(from, to);
				
		Collections.sort(ltReportWiseBatchSale, new Comparator<ReportProductWiseBatchSale>() {
			  public int compare(ReportProductWiseBatchSale o1, ReportProductWiseBatchSale o2) 
			  {
				  if(o1.getPatientSaleDate().compareTo(o2.getPatientSaleDate())>0)
					  { 
					  
					  return 1;
				      }
				 else 
				 {  
					 return -1;
					 
				}
			  }
			});
		
		return ltReportWiseBatchSale;
				
	}
	
	
	@Override
	@Transactional
	public List<ProductMaster> getProducts()
			 {
		return reportDao.getProducts();

	}
	
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfPurchaseByProductId(
			Integer productId, String from, String to) 
	{
		
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfPurchaseByProductId(productId, from,to);
		return patientSales;
	}
	
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfOpeningStockByProductId(Integer productId, String from, String to) 
	{
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfOpeningStockByProductId(productId, from,to);

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfMrnByProductId(Integer productId, String from, String to) 
	{
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfMrnByProductId(productId, from,to);

		return patientSales;
	}
	

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfCounterByProductId(
			Integer productId, String from, String to) 
	{
		
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfCounterByProductId(productId, from,to);
				

		return patientSales;
	}

	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfPatientByProductId(
			Integer productId, String from, String to) 
	{
		
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfPatientByProductId(productId, from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfIndentByProductId(
			Integer productId, String from, String to) 
	{
		
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfIndentByProductId(productId, from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfCreditByProductId(
			Integer productId, String from, String to) 
	{
		
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfCreditByProductId(productId, from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfDebitByProductId(
			Integer productId, String from, String to) 
	{
		
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfDebitByProductId(productId, from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDailyUserWiseSaleData(
			String from, String type,String userId) {
		return reportDao.getDailyUserWiseSaleData(from,type,userId);
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDailyStockWiseSaleData(String storeId) 
	{
		return reportDao.getDailyStockWiseSaleData(storeId);
	}
	
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getDataOfAllItemLadgerProductId(
			Integer productId, String from, String to,String type) 
	{
		
		List<ReportProductWiseBatchSale> patientSales = new ArrayList<ReportProductWiseBatchSale>();
		patientSales = reportDao.getDataOfAllItemLadgerProductId(productId, from,to,type);
				

		return patientSales;
	}

	@Override
	@Transactional
	public List<ReportCreditNoteDetails> getCreditNoteDetailsByTreatId(
			Integer treatId, String from, String to) {
		List<ReportCreditNoteDetails> patientSales = new ArrayList<ReportCreditNoteDetails>();
		patientSales = reportDao.getCreditNoteDetailsByTreatId(treatId, from,to);
				

		return patientSales;
	}

	@Override
	@Transactional
	public List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(Integer patientId,String from, String to) {
		List<ReportCreditNoteDetails> patientSales = new ArrayList<ReportCreditNoteDetails>();
		patientSales = reportDao.getPatientSaleDetailsByPatientId(patientId,from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportCreditNoteDetails> getSettleBillDetailsByPatientId(Integer patientId,String from, String to) {
		List<ReportCreditNoteDetails> patientSales = new ArrayList<ReportCreditNoteDetails>();
		patientSales = reportDao.getSettleBillDetailsByPatientId(patientId,from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(Integer patientId,String from, String to) {
		List<ReportIndentSaleDetails> patientSales = new ArrayList<ReportIndentSaleDetails>();
		patientSales = reportDao.getIndentSaleDetailsByPatientId(patientId,from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public List<ReportIndentSaleDetails> getCreditNoteDetailsByPatientId(Integer patientId,String from, String to) {
		List<ReportIndentSaleDetails> patientSales = new ArrayList<ReportIndentSaleDetails>();
		patientSales = reportDao.getCreditNoteDetailsByPatientId(patientId,from,to);
				

		return patientSales;
	}
	
	@Override
	@Transactional
	public JSONArray getTreatmentDetailsByPatientId(Integer patientId) {
		return reportDao.getTreatmentDetailsByPatientId(patientId);
	}

	@Override
	@Transactional
	public List<PendingBill> getPartywiseLedgerList(Integer vendorId,
			String from, String to) {
		return reportDao.getPartywiseLedgerList(vendorId,from,to);
	}
	
	@Override
	@Transactional
	public List<ReportCreditNoteDetails> getIndentSettleBillByPatientId(Integer patientId,String from, String to) {
		List<ReportCreditNoteDetails> patientSales = new ArrayList<ReportCreditNoteDetails>();
		patientSales = reportDao.getIndentSettleBillByPatientId(patientId,from,to);
		return patientSales;
	}
	
	@Override
	@Transactional
	public List<PendingBill> getCashPaidForPartywiseLedgerList(Integer vendorId,
			String from, String to) {
		return reportDao.getCashPaidForPartywiseLedgerList(vendorId,from,to);
	}
	
	@Override
	@Transactional
	public List<PendingBill> getChequePaidForPartywiseLedgerList(Integer vendorId,
			String from, String to) {
		return reportDao.getChequePaidForPartywiseLedgerList(vendorId,from,to);
	}
	
	@Override
	@Transactional
	public List<PendingBill> getDebitNoteEntryList(Integer vendorId,
			String from, String to) {
		return reportDao.getDebitNoteEntryList(vendorId,from,to);
	}
	

	@Override
	@Transactional
	public List<ReportCreditNoteDetails> getAllCreditNoteDetails(String from,
			String to) {
		List<ReportCreditNoteDetails> reportCreditNoteDetails = new ArrayList<ReportCreditNoteDetails>();
		reportCreditNoteDetails = reportDao.getAllCreditNoteDetails(from,to);
		return reportCreditNoteDetails;
	}
	
	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getCancelIndentDetails(String from,
			String to) {
		List<ReportProductWiseBatchSale> reportCreditNoteDetails = new ArrayList<ReportProductWiseBatchSale>();
		reportCreditNoteDetails = reportDao.getCancelIndentDetails(from,to);
		return reportCreditNoteDetails;
	}
	
	@Override
	@Transactional
	public Double getTotalOpeningStockByPatientId(Integer treatmentId,String from,
			String to) {
		return reportDao.getTotalOpeningStockByPatientId(treatmentId,from,
				to);
	}
	
	
	@Override
	@Transactional
	public JSONArray getStockDetails() 
	{
		return reportDao.getStockDetails();
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getCategoryWiseReportPage(
			String date,String to) {
		return reportDao.getCategoryWiseReportPage(date,to);
	}

	@Override
	@Transactional
	public List<ReportCreditNoteDetails> getCreditNoteDetailsByCat(String from,
			String to) {
		return reportDao.getCreditNoteDetailsByCat(from,to);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getProductWiseSale(String from, String to,
			String productId) {
		return reportDao.getProductWiseSale(from,to,productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getProductWiseCredit(String from, String to,
			String productId) {
		return reportDao.getProductWiseCredit(from,to,productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getProductWisePurchaseReturn(String from,
			String to, String productId) {
		return reportDao.getProductWisePurchaseReturn(from,to,productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getOpeningStock(String from, String productId) {
		return reportDao.getOpeningStock(from,productId);
	}
	
	@Override
	@Transactional
	public List<ReportVat> getHsnWiseGSTPurchase(String from, String to) {
		
		return reportDao.getHsnWiseGSTPurchase(from, to);
	}

	@Override
	@Transactional
	public List<ReportStock> getStockBatchWise() {
		return reportDao.getStockBatchWise();
	}

	@Override
	@Transactional
	public List<ReportPurchase> getDayWiseDispatchGRN(String fromReult, String toReult
			, String dispatchFlag, int vendorId) {
		
		return reportDao.getDayWiseDispatchGRN(fromReult, toReult,
				 dispatchFlag, vendorId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getProductWisePurchaseandVendor(String from,
			String to, String productId, String vendorId, String unitId) {
		return reportDao.getProductWisePurchaseandVendor(from, to, productId,vendorId,unitId);
		}

	@Override
	@Transactional
	public List<VendorMaster> getSupplierListReport(String fromDate, String toDate) {
		
		return reportDao.getSupplierListReport(fromDate,toDate);
	}

	@Override
	@Transactional
	public List<ProductMaster> getproductData(String fromDate, String toDate, int categoryId, int companyId, int productId) {
		
		return reportDao.getproductData(fromDate,toDate,  categoryId,  companyId,  productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getpurchaseData(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype) {
		
		return reportDao.getpurchaseData(request,fromDate,toDate,  categoryId,  companyId,  productId,vendortId,unitId,purtranstype);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getpurchaseOrderData(
			HttpServletRequest request, String fromDate, String toDate,
			int vendortId, int unitId) {
		
		return reportDao.getpurchaseOrderData(request,fromDate,toDate,vendortId,unitId);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getAllSaleReportWithGST(HttpServletRequest request,
			String fromDate, String toDate, int productId, int unitId,
			String type, int patientId) {
		
		return reportDao.getAllSaleReportWithGST(request,fromDate,toDate,productId,unitId,type,patientId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getpurchaselistwithsaleval(
			HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int companyId, int productId, int vendortId,
			int unitId, String purtranstype) {
		
		return reportDao.getpurchaselistwithsaleval(request,fromDate,toDate,  categoryId,  companyId,  productId,vendortId,unitId,purtranstype);
	}

	@Override
	@Transactional
	public List<WardWiseDetaisDto> getWardwiseCollection(String from, String to) {
		return reportDao.getWardwiseCollection(from,to);
	}

	@Override
	@Transactional
	public List<PatientSaleBillMaster> getPharmacyPatientWiseSaleReport(
			String from, String to) {
		return reportDao.getPharmacyPatientWiseSaleReport(from,to);
	}

	@Override
	@Transactional
	public List<ReportStock> getitemwisemnfsalestockreport(
			HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int unitId, int productId) {

		return reportDao.getitemwisemnfsalestockreport(request, fromDate, toDate,
				categoryId, unitId, productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getpurchasetaxData(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype) {
		
		return reportDao.getpurchasetaxData(request,fromDate,toDate,  categoryId,  companyId,  productId,vendortId,unitId,purtranstype);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getpurreg(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype) {
		
		return reportDao.getpurreg(request,fromDate,toDate,  categoryId,  companyId,  productId,vendortId,unitId,purtranstype);
	}

	@Override
	@Transactional
	public List<ReportDebitNote> getpurreturn(HttpServletRequest request,
			String fromDate, String toDate, int categoryId, int companyId,
			int productId, int vendortId, int unitId, String purtranstype) {
		
		return reportDao.getpurreturn(request,fromDate,toDate,  categoryId,  companyId,  productId,vendortId,unitId,purtranstype);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getsaletaxData(HttpServletRequest request,
			String fromDate, String toDate, int productId, int unitId,
			String type, int patientId) {
		
		return reportDao.getsaletaxData(request,fromDate,
				toDate, productId,unitId,type,patientId);
	}

	@Override
	@Transactional
	public List<ReportProductWiseBatchSale> getAllSaleRegisterReport(
			HttpServletRequest request, String fromDate, String toDate,
			int productId, int unitId, String type, int patientId) {
		
		return reportDao.getAllSaleRegisterReport(request,fromDate,toDate,productId,unitId,type,patientId);
	}

	@Override
	@Transactional
	public List<ReportExpiry> getDateWiseStock(String fromDate, int productId) {
		return reportDao.getDateWiseStock(fromDate,productId);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getpurchaseRetrunData(
			HttpServletRequest request, String fromDate, String toDate) {
		return reportDao.getDateWiseStock(request,fromDate,toDate);
	}

	@Override
	@Transactional
	public List<ReportPurchase> getGRNReportdata(String from, String to) {
		return reportDao.getGRNReportdata(from, to);
	}
	@Override
	@Transactional
	public List<ReportPurchase> getPartyWisePurchaseByPartyIddetail(String from,
			String to, String vendorId, String productId) {
		return reportDao.getPartyWisePurchaseByPartyIddetail(from, to, vendorId,
				productId);

	}
	
	/************
	 *@author	: Ajay Khandare
	 *@date		:  06-feb-2019
	 *@code		:get patient wise Sale report list
	 ***********/

	
	@Override
	@Transactional
	public List<PatientSaleBillSlave> billwiseSaleReportList(Integer patientId,Integer userId,Integer doctorId,String saletype,String from,String to) {

		return reportDao.billwiseSaleReportList(patientId, userId, doctorId, saletype, from, to);
	}

	@Override
	@Transactional
	public List<PatientSaleBillSlave> billwiseSaleReportReturnList(
			Integer patientId, Integer userId, 
			String saletype, String from, String to) {
		
		return reportDao.billwiseSaleReportReturnList(patientId, userId,saletype, from, to);
	}
	
	
	@Override
	@Transactional
	public List<Users> fetchuser(String patiename, String callfrom) {

		return reportDao.fetchuser(patiename,callfrom);
	}

	@Override
	@Transactional
	public List<DoctorList> fetchDoctor(String doctorname, String callfrom) {
		return reportDao.fetchDoctor(doctorname,callfrom);
	}
	
	@Override
	@Transactional
	public List<DistrictwisePatientCountDTO> fetchDistrictwisePatientCountReportList(String year, String month) {
		return reportDao.fetchDistrictwisePatientCountReportList(year,month);
	}

	@Override
	@Transactional
	public List<ReportStock> geCurrentStockReport(String from, String to, String callform, int userData,String storeName,HttpServletResponse response) throws IOException {
		// TODO Auto-generated method stub
		return  reportDao.geCurrentStockReport(from,to,callform,userData,storeName,response);
	}

	@Override
	@Transactional
	public List<ReportStock> getProductWiseStockOnPurRate(String type, Integer startIndex) {
		// TODO Auto-generated method stub
		return reportDao.getProductWiseStockOnPurRate(type,startIndex);
	}

	@Override
	@Transactional
	public List<ReportList> getAllCompanyList(String from, String to) {
		// TODO Auto-generated method stub
		return reportDao.getAllCompanyList(from,to);
	}

	@Override
	@Transactional
	public List<ReportList> getProductListData(String from, String to, String callform,String userData) {
		// TODO Auto-generated method stub
		return reportDao.getProductListData(from,to,callform, userData);
	}

	@Override
	public List<ReportList> getDrugListData(String from, String to) {
		// TODO Auto-generated method stub
		return reportDao.getDrugListData(from,to);
	}

	@Override
	public String getBatchWisePurchase2(List<ReportPurchase> reportPurchases, String productName,
			HttpServletRequest request, String from, String to, String batchCode, String totalAmount) {
		// TODO Auto-generated method stub
		return reportDao.getBatchWisePurchase2(reportPurchases, productName, request, from, to, batchCode, totalAmount);
	}

	@Override
	public String getPartyWisePurchaseTotalReport(List<ReportPurchase> reportPurchases, HttpServletRequest request,
			String from, String to) {
		// TODO Auto-generated method stub
		return reportDao.getPartyWisePurchaseTotalReport(reportPurchases, request, from, to);
	}

	@Override
	public List<ReportStock2> getProductWiseStockOnPurRate2(String type, Integer startIndex) {
		// TODO Auto-generated method stub
		return reportDao.getProductWiseStockOnPurRate2(type,startIndex);
	}
	
	@Override
	@Transactional
	public MrnReportDetail getReceivedMRNReportData(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return reportDao.getReceivedMRNReportData(request);
	}

	@Override
	@Transactional
	public MrnReportDetail getPendingMRNReportData(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return reportDao.getPendingMRNReportData(request);
	}

	@Override
	@Transactional
	public List<CreditNoteDetailsReportDTO> getCreditNoteDetailsAll(String from, String to) {
		// TODO Auto-generated method stub
		return reportDao.getCreditNoteDetailsAll(from, to);
	}
	
	@Override
	@Transactional
	public List<ReportIndentSaleDetails> getAllIndentSalePatientHeader(Integer patientId,String from, String to) {
		List<ReportIndentSaleDetails> patientSales = new ArrayList<ReportIndentSaleDetails>();
		patientSales = reportDao.getAllIndentSalePatientHeader(patientId,from,to);
				

		return patientSales;
	}

}

