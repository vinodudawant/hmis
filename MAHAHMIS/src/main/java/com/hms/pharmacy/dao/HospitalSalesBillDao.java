package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.HospitalSale;
import com.hms.pharmacy.pojo.HospitalSaleBillMaster;
import com.hms.pharmacy.pojo.HospitalSaleBillPrint;
import com.hms.pharmacy.pojo.InwardResult;
import com.hms.pharmacy.pojo.PatientMaster;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.VendorMaster;

public interface HospitalSalesBillDao {

	boolean saveHospitalSalesBill(HospitalSaleBillMaster hospitalSaleBillMaster);

	List<InwardResult> getDetailsByInward(Integer inwardNo);

	List<ProductMaster> getProductById(Integer[] arr);

	HospitalSaleBillPrint getHospitalSaleDoctorPatient(
			String hospitalBillInwardNo);

	HospitalSaleBillMaster getHospitalSalesDetails(Integer hospitalBillId);
	List<HospitalSaleBillMaster> getHospitalSales();
	Boolean deleteHospitalSaleBill(Integer hospitalId);
	
	List<HospitalSaleBillMaster> getHospitalBillId(String patientId);
	
	List<HospitalSaleBillMaster> getAutoSuggestionInwardNames(String letter);
	
	HospitalSale getPatientDataByHospitalId(Integer indentId);
	
	HospitalSale getSponserByHospitalId(Integer indentId);
	
	HospitalSale getConsultantByHospitalId(Integer indentId);
}
