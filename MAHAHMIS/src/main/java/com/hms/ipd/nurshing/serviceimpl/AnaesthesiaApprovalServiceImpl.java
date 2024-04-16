package com.hms.ipd.nurshing.serviceimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.VitalSing;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipd.nurshing.dao.AnaesthesiaApprovalDao;
import com.hms.ipd.nurshing.dto.AnaesthesiaApprovalDto;
import com.hms.ipd.nurshing.dto.IntraOpNotesDto;
import com.hms.ipd.nurshing.dto.PreopDto;
import com.hms.ipd.nurshing.service.AnaesthesiaApprovalService;
import com.hms.ot.dto.ConductAnaesthesia;

@Service
public class AnaesthesiaApprovalServiceImpl implements AnaesthesiaApprovalService{

	@Autowired
	AnaesthesiaApprovalDao ANDao;
	@Autowired
	SessionFactory sf;

	@Override
	@Transactional
	public int saveAnaesthesiaApproval(AnaesthesiaApprovalDto obj, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		return ANDao.saveAnaesthesiaApproval(obj);
	}

	@Override
	@Transactional
	public int saveAnaesthesiaPreOp(PreopDto obj, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		return ANDao.saveAnaesthesiaPreOp(obj);
	}
	
	@Override
	@Transactional
	public PreopDto getAnaesthesiaPreOp(Integer patientId,Integer treatmentId)
	{
		return ANDao.getAnaesthesiaPreOp(patientId,treatmentId);
		
	}

	@Override
	@Transactional
	public int saveIntraOperation(IntraOpNotesDto obj, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		return ANDao.saveIntraOperation(obj);
	}

	@Override
	@Transactional
	public IntraOpNotesDto getIntraOperation(Integer patientId, Integer treatmentId) {
		
		return ANDao.getIntraOperation(patientId, treatmentId);
	}

	@Override
	@Transactional
	public AnaesthesiaApprovalDto fetchAnaesthesiaApproval(Integer patientId, Integer treatmentId) {
		
		return ANDao.fetchAnaesthesiaApproval(patientId,treatmentId);
	}
	
	@Override
	@Transactional
	public int saveConductAnaesthesia(ConductAnaesthesia objConductAnaesthesia,
			VitalSing objVitalSing, String queryType) {

		int isInserted = ANDao.saveConductAnaesthesia(
				objConductAnaesthesia, objVitalSing, queryType);
		return isInserted;
	}
	
}
