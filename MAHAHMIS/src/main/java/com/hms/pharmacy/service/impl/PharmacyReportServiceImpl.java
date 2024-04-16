package com.hms.pharmacy.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.pharmacy.dao.PharmacyReportDao;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ReportCreditNoteDetails;
import com.hms.pharmacy.pojo.ReportData;
import com.hms.pharmacy.pojo.ReportIndentSaleDetails;
import com.hms.pharmacy.pojo.ReportProductWiseBatchSale;
import com.hms.pharmacy.pojo.ReportPurchase;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.PharmacyReportService;

@Service
@Transactional
public class PharmacyReportServiceImpl implements PharmacyReportService {
	
	@Autowired
	PharmacyReportDao pharmacyReportDao;

	@Override
	public List<VendorMaster> getSupplierListReport(String fromDate, String toDate) {
		// TODO Auto-generated method stub
		return pharmacyReportDao.getSupplierListReport(fromDate,toDate);
	}

	@Override
	public List<ProductMaster> getproductData(String fromDate, String toDate, int categoryId, int companyId,
			int productId) {
		// TODO Auto-generated method stub
		return pharmacyReportDao.getproductData(fromDate,toDate,categoryId,companyId,productId);
	}

	@Override
	public List<ReportData> getpurchaseData(HttpServletRequest request, String fromDate, String toDate,
			int categoryId, int companyId, int productId, int vendortId, int unitId, String purtranstype) {
		// TODO Auto-generated method stub
		return pharmacyReportDao.getpurchaseData(request,fromDate,toDate,categoryId,companyId,productId,vendortId,unitId,purtranstype);
	}

	@Override
	public List<ReportData> getTotalPatientData(String from, String to) {
		
	      //  List<ReportProductWiseBatchSale> ltReportWiseBatchSale=pharmacyReportDao.getTotalPatientData(from, to);
					
			/*
			 * Collections.sort(ltReportWiseBatchSale, new
			 * Comparator<ReportProductWiseBatchSale>() { public int
			 * compare(ReportProductWiseBatchSale o1, ReportProductWiseBatchSale o2) {
			 * if(o1.getPatientSaleDate().compareTo(o2.getPatientSaleDate())>0) {
			 * 
			 * return 1; } else { return -1;
			 * 
			 * } } });
			 */
			
			return pharmacyReportDao.getTotalPatientData(from, to);
					
		}

	@Override
	public List<ReportData> getCancelIndentDetails(String from, String to) {
		// TODO Auto-generated method stub
		return pharmacyReportDao.getCancelIndentDetails(from,to);
	}

	@Override
	public List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPatients(String letter) {
		// TODO Auto-generated method stub
		return pharmacyReportDao.autoSuggestationGeneralBillPatients(letter);
	}

	@Override
	public List<ReportCreditNoteDetails> getPatientSaleDetailsByPatientId(Integer patientId,String from, String to) {
		List<ReportCreditNoteDetails> patientSales = new ArrayList<ReportCreditNoteDetails>();
		patientSales = pharmacyReportDao.getPatientSaleDetailsByPatientId(patientId,from,to);
				

		return patientSales;
	}

	@Override
	public List<ReportCreditNoteDetails> getSettleBillDetailsByPatientId(Integer patientId,String from, String to) {
		List<ReportCreditNoteDetails> patientSales = new ArrayList<ReportCreditNoteDetails>();
		patientSales = pharmacyReportDao.getSettleBillDetailsByPatientId(patientId,from,to);
				

		return patientSales;
	}

	@Override
	public List<ReportIndentSaleDetails> getIndentSaleDetailsByPatientId(Integer patientId,String from, String to) {
		List<ReportIndentSaleDetails> patientSales = new ArrayList<ReportIndentSaleDetails>();
		patientSales = pharmacyReportDao.getIndentSaleDetailsByPatientId(patientId,from,to);
				

		return patientSales;
	}

	@Override
	public List<ReportData> getProductWiseBatchList(Integer productId, String from, String to,
			String saleTye) {
		return pharmacyReportDao.getProductWiseBatchList(productId, from, to,
				saleTye);
	}
	

}
