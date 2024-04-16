package com.hms.doctordesk.service.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OPDClinicalStagingDao;
import com.hms.doctordesk.dto.OPDClinicalStagingDTO;
import com.hms.doctordesk.service.OPDClinicalStagingService;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Service
@Transactional
public class OPDClinicalStagingServiceImpl implements OPDClinicalStagingService {

	@Autowired
	OPDClinicalStagingDao  opddao;
	
	@Autowired
	SessionFactory sf;
	
	
	@Override
	public int saveOPDCinicalStaging(OPDClinicalStagingDTO obj, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		return opddao.saveOPDCinicalStaging(obj);
	}

	@Override
	public List<OPDClinicalStagingDTO> getOPDClinicalStagingList(Integer treatmentId, Integer unitId) {
		
		return opddao.getOPDClinicalStagingList(treatmentId, unitId);
	}

	@Override
	public OPDClinicalStagingDTO editOPDClinicalStaging(Integer id) {
	
		return opddao.editOPDClinicalStaging(id);
	}

	@Override
	public int deleteOPDClinicalStaging(String id, Integer userId) {
		
		return opddao.deleteOPDClinicalStaging(id, userId);
	}

}
