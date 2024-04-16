package com.hms.doctordesk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.DoctorDeskChartsDao;
import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.ImmunizationPatientStatus;
import com.hms.doctordesk.service.DoctorDeskChartsService;
@Service
@Transactional
public class DoctorDeskChartServicesImpl implements DoctorDeskChartsService {
	@Autowired
	DoctorDeskChartsDao DoctorDeskChartsDao;

	@Override
	public List<ImmunizationConfigurationMaster> fetchImmunizationMaster() {
		return DoctorDeskChartsDao.fetchImmunizationMaster();
	}

	@Override
	@Transactional
	public Integer saveImmunizationconPatient(String immpatient) {
		return DoctorDeskChartsDao.saveImmunizationconPatient(immpatient);
	}

	@Override
	public List<ImmunizationPatientStatus> fetchMmmunizationconPatient(Integer treatmentId) {
		return DoctorDeskChartsDao.fetchMmmunizationconPatient(treatmentId);
	}

	@Override
	public List<ImmunizationConfigurationMaster> fetchimmunizationmasterOnDoctordesk(int patientId) {
		// TODO Auto-generated method stub
		return DoctorDeskChartsDao.fetchimmunizationmasterOnDoctordesk(patientId);
	} 
}
