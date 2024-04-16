package com.hms.ivf.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ivf.dao.IVFCalenderDao;
import com.hms.ivf.dao.IVFPrescriptionDao;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.IVFPrescriptionDtoSP;
import com.hms.ivf.dto.IVFPrescriptionFolloUpDto;
import com.hms.ivf.dto.IvfPrescriptionsDto;
import com.hms.ivf.service.IVFCalenderService;
import com.hms.ivf.service.IVFPrescriptionService;

@Service
@Transactional
public class IVFPrescriptionServiceImpl implements IVFPrescriptionService {

	@Autowired
	IVFPrescriptionDao iVFPrescriptionDao;

	@Override
	public int savefollowUpForIVFPatient(IVFPrescriptionFolloUpDto opdFolloUp, Integer treatmentId, Integer ivfTreatId, HttpServletRequest request) {
		
		return iVFPrescriptionDao.savefollowUpForIVFPatient(opdFolloUp, treatmentId, ivfTreatId, request);
	}

	@Override
	public IVFPrescriptionFolloUpDto getfollowUpForIVFDoctorDesk(Integer unitId, Integer treatmentId, Integer ivfTreatId) {
		
		return iVFPrescriptionDao.getfollowUpForIVFDoctorDesk(unitId, treatmentId, ivfTreatId);
	}

	@Override
	public int saveIVFPrescription(IvfPrescriptionsDto obj, HttpServletRequest request, Integer productId) {
		return iVFPrescriptionDao.saveIVFPrescription(obj, request, productId);
	}

	@Override
	public List<IVFPrescriptionDtoSP> getAllIVFPrescriptions(Integer treatmentId, Integer unitId, Integer ivfTreatId) {
		return iVFPrescriptionDao.getAllIVFPrescriptions(treatmentId, unitId, ivfTreatId);
	}

	@Override
	public IVFPrescriptionDtoSP getIVFPrescriptionById(Integer unitId, Integer ivfPrescriptionId) {
		return iVFPrescriptionDao.getIVFPrescriptionById(unitId, ivfPrescriptionId);
	}

	@Override
	public boolean deleteIVFPrescription(Integer unitId, String ivfPrescriptionId, HttpServletRequest request) {
		return iVFPrescriptionDao.deleteIVFPrescription(unitId, ivfPrescriptionId, request);
	}
	
	

}
