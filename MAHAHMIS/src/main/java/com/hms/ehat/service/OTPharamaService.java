package com.hms.ehat.service;

import java.util.Map;

import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;

public interface OTPharamaService {

	Map<String, String> saveOrUpdatePatientSaleBill(
			pharmaConsumtionDTO patientSaleBillMaster, String storeId);

}
