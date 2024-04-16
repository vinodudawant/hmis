package com.hms.opdbill.service.impl;

import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.opdbill.dao.OpdBillDao;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.opdbill.service.OpdBillService;
import com.hms.registration.dto.PatientConsultationChargesDto;

@Service
@Transactional
public class OpdBillServiceImpl implements OpdBillService {
	
	@Autowired
	OpdBillDao opdBillDao;
	
	@Override
	public PatientHeaderInfoDto getPatientInfoByTreatmentId(PatientHeaderInfoDto objDto) {	
		
		return opdBillDao.getPatientInfoByTreatmentId(objDto);
	}
	
	@Override
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {
		
		return opdBillDao.getPatientServiceDetails(objDto);
	}

	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {
		
		return opdBillDao.getPatientSubServiceDetails(objDto);
	}

	@Override
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto) {
		
		return opdBillDao.getPatientPackageDetails(objDto);
	}

	@Override
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {
		
		return opdBillDao.getAllAmountDetails(objDto);
	}

	@Override
	public PatientConsultationChargesDto getDoctorConsultationCharges(PatientConsultationChargesDto objDto) {

		return opdBillDao.getDoctorConsultationCharges(objDto);
	}

	@Override
	public String getSampleCollectionDateandTime(int masterId) {
		// TODO Auto-generated method stub
		return opdBillDao.getSampleCollectionDateandTime(masterId);
	}

	@Override
	public List<BillReceiptMasterDTO> fetchOpdbillTreatDiscount(int treatmentId) {
		// TODO Auto-generated method stub
		return opdBillDao.fetchOpdbillTreatDiscount(treatmentId);
	}

	@Override
	public List<BillReceiptMasterDTO> fetchOpdbillDiscount(HttpServletRequest httpServlet,String callFrom) {
		// TODO Auto-generated method stub
		return opdBillDao.fetchOpdbilllDiscount(httpServlet,callFrom);
	}

	@Override
	public Integer saveApprovedDiscountOPD(BillReceiptMasterDTO billReceiptMasterDTO) {
		// TODO Auto-generated method stub
		return opdBillDao.saveApprovedDiscountOPD(billReceiptMasterDTO);
	}

	@Override
	public List<BillReceiptMasterDTO> autosuggesstionDiscApprovelOPD(String letter, String usertype, Integer unitId,
			HttpServletRequest req,String callfrom) {
		// TODO Auto-generated method stub
		return opdBillDao.autosuggesstionDiscApprovelOPD(letter, usertype, unitId, req,callfrom);
	}

	
}
