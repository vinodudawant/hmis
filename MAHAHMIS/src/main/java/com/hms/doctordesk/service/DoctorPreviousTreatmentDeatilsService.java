package com.hms.doctordesk.service;

import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.ehat.dto.RegTreBillDto;

public interface DoctorPreviousTreatmentDeatilsService {

	Doctordeskopderdto previousPatientHeaderListTreatmentWise(Integer treatmentId);

}
