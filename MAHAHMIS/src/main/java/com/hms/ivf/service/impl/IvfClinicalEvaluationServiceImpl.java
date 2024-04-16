package com.hms.ivf.service.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.ivf.dao.IvfClinicalEvaluationDao;
import com.hms.ivf.dto.IVFClinicalEvalNewDTO;
import com.hms.ivf.service.IvfClinicalEvaluationService;


@Service
@Transactional
public class IvfClinicalEvaluationServiceImpl implements IvfClinicalEvaluationService {
	
	@Autowired
	IvfClinicalEvaluationDao ivfClinicalEvaluationDao;

	@Override
	public int saveIVFClinicalEvaluation(IVFClinicalEvalNewDTO obj, Integer ivfTreatId, HttpServletRequest request) {
		
		return ivfClinicalEvaluationDao.saveIVFClinicalEvaluation(obj, ivfTreatId, request);
	}

	@Override
	public OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(Integer treatmentId,
			HttpServletRequest request) {
		
		return  ivfClinicalEvaluationDao.fetchClinicalEvalTempDataByTreatmentId(treatmentId, request);
	}

}
