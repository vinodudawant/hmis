package com.hms.ipd.serviceimpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ipd.dao.IpdBillMgtDao;
import com.hms.ipd.service.IpdBillMgtService;
import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.registration.dto.PatientConsultationChargesDto;

@Service
@Transactional
public class IpdBillMgtServiceImpl implements IpdBillMgtService {
	
	@Autowired
	IpdBillMgtDao ipdBillDao;
	
	@Override
	public PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto) {
		
		return ipdBillDao.getPatientServiceDetails(objDto);
	}

	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto) {
		
		return ipdBillDao.getPatientSubServiceDetails(objDto);
	}

	@Override
	public PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto) {
		
		return ipdBillDao.getPatientPackageDetails(objDto);
	}

	@Override
	public BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto) {
		
		return ipdBillDao.getAllAmountDetails(objDto);
	}

	@Override
	public PatientConsultationChargesDto getDoctorConsultationChargesForIpd(PatientConsultationChargesDto objDto) {

		return ipdBillDao.getDoctorConsultationChargesForIpd(objDto);
	}
}
