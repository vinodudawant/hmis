package com.hms.doctordesk.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.doctordesk.dao.DoctorPreviousTreatmentDeatilsDao;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.service.DoctorPreviousTreatmentDeatilsService;
import com.hms.ehat.dto.RegTreBillDto;

@Service
@Transactional
public class DoctorPreviousTreatmentDeatilsServiceImpl implements DoctorPreviousTreatmentDeatilsService {
	@Autowired
	DoctorPreviousTreatmentDeatilsDao doctorPreviousTreatmentDeatilsDao;

	@Override
	public Doctordeskopderdto previousPatientHeaderListTreatmentWise(Integer treatmentId) {
		return doctorPreviousTreatmentDeatilsDao.previousPatientHeaderListTreatmentWise(treatmentId);
	}

}
