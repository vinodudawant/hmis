package com.hms.ipd.nurshing.serviceimpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.ipd.nurshing.dao.TreatmentDischargeDao;
import com.hms.ipd.nurshing.dto.TreatmentDischargeDto;
import com.hms.ipd.nurshing.service.TreatmentDischargeService;

@Service
@Transactional
public class TreatmentDischargeServiceImpl implements TreatmentDischargeService{
	
	@Autowired
	TreatmentDischargeDao TDDao;

	@Override
	public int savetreatmentDischarge(TreatmentDischargeDto obj, HttpServletRequest request, Integer productId) {
		return TDDao.savetreatmentDischarge(obj, request, productId);
	}

	@Override
	public List<TreatmentDischargeDto> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId) {
		
		return TDDao.getAllPrescriptionsByTreatmentId(treatmentId, unitId);
	}

	@Override
	public boolean usePrescriptionTemp(Integer treatmentId, Integer patientId, Integer templateId,
			HttpServletRequest request) {
		return TDDao.usePrescriptionTemp(treatmentId, patientId,templateId,request);
	}

	@Override
	public TreatmentDischargeDto editIPDTreatmentAtDicharge(Integer prescriptionId, HttpServletRequest request) {
		
		return TDDao.editIPDTreatmentAtDicharge(prescriptionId, request);
	}

	@Override
	public boolean deleteIPDTreatmentAtDicharge(Integer unitId, String prescriptionId, HttpServletRequest request) {
		return TDDao.deleteIPDTreatmentAtDicharge(unitId, prescriptionId, request);
	}

	

}
