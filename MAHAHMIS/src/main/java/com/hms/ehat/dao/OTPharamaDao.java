package com.hms.ehat.dao;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.hms.ehat.dao.impl.OTPharamaDaoImpl;
import com.hms.ehat.dto.pharmaConsumtionDTO;
import com.hms.pharmacy.pojo.PatientSaleBillMaster;

public interface OTPharamaDao {


	Map<String, String> saveOrUpdatePatientSaleBill(
			pharmaConsumtionDTO patientSaleBillMaster, String storeId);
}
