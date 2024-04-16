package com.hms.ivf.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.ivf.dto.IVFClinicalEvalNewDTO;

public interface IvfClinicalEvaluationService {

	int saveIVFClinicalEvaluation(IVFClinicalEvalNewDTO obj, Integer treatmentId, HttpServletRequest request);

	OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(Integer treatmentId, HttpServletRequest request);

}
