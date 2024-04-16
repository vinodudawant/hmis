package com.hms.ipd.dao;

import com.hms.opdbill.dto.BillAmountDetailsDto;
import com.hms.opdbill.dto.PatientPackageDetailsDto;
import com.hms.opdbill.dto.PatientServiceDetailsDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.registration.dto.PatientConsultationChargesDto;

public interface IpdBillMgtDao {

	PatientServiceDetailsDto getPatientServiceDetails(PatientServiceDetailsDto objDto);
	PatientSubServiceDetailsDto getPatientSubServiceDetails(PatientSubServiceDetailsDto objDto);
	PatientPackageDetailsDto getPatientPackageDetails(PatientPackageDetailsDto objDto);
	BillAmountDetailsDto getAllAmountDetails(BillAmountDetailsDto objDto);
	PatientConsultationChargesDto getDoctorConsultationChargesForIpd(PatientConsultationChargesDto objDto);
}
