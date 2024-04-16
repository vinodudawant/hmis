package com.hms.opdbill.service;

import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillDiscount;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.registration.dto.PatientConsultationChargesDto;

public interface OpdBillService {

	PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto);
	PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto);
	PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto);
	PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto);
	BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto);
	PatientConsultationChargesDto getDoctorConsultationCharges(PatientConsultationChargesDto objDto);
	String getSampleCollectionDateandTime(int masterId);
	
	List<BillReceiptMasterDTO> fetchOpdbillTreatDiscount(int treatmentId);
	
	List<BillReceiptMasterDTO> fetchOpdbillDiscount(HttpServletRequest httpServlet, String callFrom);
	
	Integer saveApprovedDiscountOPD(BillReceiptMasterDTO billReceiptMasterDTO);
	
	List<BillReceiptMasterDTO> autosuggesstionDiscApprovelOPD(String letter,
			String usertype, Integer unitId,HttpServletRequest req,String callfrom);
	
	
}
