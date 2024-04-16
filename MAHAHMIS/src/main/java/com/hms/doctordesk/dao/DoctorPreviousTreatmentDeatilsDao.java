package com.hms.doctordesk.dao;

import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.ehat.dto.RegTreBillDto;

public interface DoctorPreviousTreatmentDeatilsDao {

	Doctordeskopderdto previousPatientHeaderListTreatmentWise(Integer treatmentId);

}
