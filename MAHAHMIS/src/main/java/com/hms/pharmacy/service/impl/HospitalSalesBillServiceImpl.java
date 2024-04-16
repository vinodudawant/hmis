package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.HospitalSalesBillDao;
import com.hms.pharmacy.pojo.DocumentMaster;
import com.hms.pharmacy.pojo.DocumentNumberingMaster;
import com.hms.pharmacy.pojo.HospitalSaleBillMaster;
import com.hms.pharmacy.pojo.HospitalSaleBillPrint;
import com.hms.pharmacy.pojo.HospitalSaleBillSlave;
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.pojo.IndentSaleSlave;
import com.hms.pharmacy.pojo.InwardResult;
import com.hms.pharmacy.pojo.PatientMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.DocumentNumberingService;
import com.hms.pharmacy.service.HospitalSalesBillService;

@Service
public class HospitalSalesBillServiceImpl implements HospitalSalesBillService {
	@Autowired
	HospitalSalesBillDao hospitalSalesBillDao;

	@Autowired
	DocumentNumberingService docNumberingService;

	@Override
	@Transactional
	public boolean saveHospitalSalesBill(
			HospitalSaleBillMaster hospitalSaleBillMaster) {
		hospitalSaleBillMaster.setHospitalBillDeleteFlag(0);
		hospitalSaleBillMaster.setHospitalBillUpdateDate(new Date(
				new java.util.Date().getTime()));

		if (hospitalSaleBillMaster
				.getHospitalSaleBillSlaves()
				.get(hospitalSaleBillMaster.getHospitalSaleBillSlaves().size() - 1)
				.getProductMaster().getProductId() == null) {
			hospitalSaleBillMaster.getHospitalSaleBillSlaves()
					.remove(hospitalSaleBillMaster.getHospitalSaleBillSlaves()
							.size() - 1);
		}

		
	//delete Row	
       List<HospitalSaleBillSlave> newHospitalSlaves = new ArrayList<HospitalSaleBillSlave>();
		
		List<HospitalSaleBillSlave> newHospitalSlaves1=hospitalSaleBillMaster.getHospitalSaleBillSlaves();
		
		for(HospitalSaleBillSlave hospitalSaleSlave:newHospitalSlaves1)
		{	
			if (hospitalSaleSlave.getProductMaster().getProductId() != null) {
				newHospitalSlaves.add(hospitalSaleSlave);
			}
		}
		
		hospitalSaleBillMaster.setHospitalSaleBillSlaves(newHospitalSlaves);
		
					
		
		List<HospitalSaleBillSlave> newHospitalSaleBillSlave = new ArrayList<HospitalSaleBillSlave>();

		List<HospitalSaleBillSlave> hospitalSaleBillSlave = hospitalSaleBillMaster
				.getHospitalSaleBillSlaves();
		for (HospitalSaleBillSlave hospitalSaleBillSlave2 : hospitalSaleBillSlave) {
			if (hospitalSaleBillSlave2.getProductMaster().getBatchMaster()
					.get(0).getBatchId() != null) {
				hospitalSaleBillSlave2
						.setHospitalSlaveBatchId(hospitalSaleBillSlave2
								.getProductMaster().getBatchMaster().get(0)
								.getBatchId());
			}
			newHospitalSaleBillSlave.add(hospitalSaleBillSlave2);
		}

		hospitalSaleBillMaster
				.setHospitalSaleBillSlaves(newHospitalSaleBillSlave);

		if (hospitalSalesBillDao.saveHospitalSalesBill(hospitalSaleBillMaster)) {
			DocumentNumberingMaster docNumberingMaster = new DocumentNumberingMaster();
			DocumentMaster documentMaster = new DocumentMaster();
			documentMaster.setDocId(2);
			docNumberingMaster.setDocumentMaster(documentMaster);
			docNumberingService.updateDocumentNumbering(docNumberingMaster);
			return true;
		} else {
			return false;
		}

	}

	@Override
	@Transactional
	public List<InwardResult> getDetailsByInward(Integer inwardNo) {
		return hospitalSalesBillDao.getDetailsByInward(inwardNo);
	}

	@Override
	@Transactional
	public List<ProductMaster> getProductById(Integer[] arr) {
		return hospitalSalesBillDao.getProductById(arr);
	}

	@Override
	@Transactional
	public HospitalSaleBillPrint getHospitalSaleDoctorPatient(
			String hospitalBillInwardNo) {
		return hospitalSalesBillDao
				.getHospitalSaleDoctorPatient(hospitalBillInwardNo);
	}

	@Override
	@Transactional
	public HospitalSaleBillMaster getHospitalSalesDetails(Integer hospitalBillId) {
		return hospitalSalesBillDao.getHospitalSalesDetails(hospitalBillId);
	}

	@Override
	@Transactional
	public List<HospitalSaleBillMaster> getHospitalSales() {
		// TODO Auto-generated method stub
		return hospitalSalesBillDao.getHospitalSales();
	}

	@Override
	@Transactional
	public Boolean deleteHospitalSaleBill(Integer hospitalId) {
		// TODO Auto-generated method stub

		return hospitalSalesBillDao.deleteHospitalSaleBill(hospitalId);
	}

	@Override
	@Transactional
	public List<HospitalSaleBillMaster> getHospitalBillId(String InwardNo) {
		// TODO Auto-generated method stub
		return hospitalSalesBillDao.getHospitalBillId(InwardNo);
	}

	@Override
	@Transactional
	public List<HospitalSaleBillMaster> getAutoSuggestionInwardNames(
			String letter) {
		return hospitalSalesBillDao.getAutoSuggestionInwardNames(letter);

	}
	
	@Override
	@Transactional
	public HospitalSale getPatientDataByHospitalId(Integer indentId) {
		HospitalSale hospitalSales=new HospitalSale();
		hospitalSales=hospitalSalesBillDao.getPatientDataByHospitalId(indentId);
		return hospitalSales;
	}
	
	@Override
	@Transactional
	public HospitalSale getSponserByHospitalId(Integer indentId) {
		HospitalSale hospitalSales=new HospitalSale();
		hospitalSales=hospitalSalesBillDao.getSponserByHospitalId(indentId);
		return hospitalSales;
	}
	
	@Override
	@Transactional
	public HospitalSale getConsultantByHospitalId(Integer indentId) {
		HospitalSale hospitalSales=new HospitalSale();
		hospitalSales=hospitalSalesBillDao.getConsultantByHospitalId(indentId);
		return hospitalSales;
	}
	
}
