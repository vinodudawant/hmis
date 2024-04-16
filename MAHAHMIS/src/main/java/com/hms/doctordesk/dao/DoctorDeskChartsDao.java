package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.ImmunizationPatientStatus;

public interface DoctorDeskChartsDao {

	List< ImmunizationConfigurationMaster> fetchImmunizationMaster();
	Integer saveImmunizationconPatient(String immpatient);
	List<ImmunizationPatientStatus> fetchMmmunizationconPatient(Integer treatmentId);
	List< ImmunizationConfigurationMaster> fetchimmunizationmasterOnDoctordesk(int patientId);
}
