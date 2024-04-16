package com.hms.ivf.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.ivf.dto.IVFClinicalEvalNewDTO;

public interface IvfClinicalEvaluationDao {

	int saveIVFClinicalEvaluation(IVFClinicalEvalNewDTO obj, Integer ivfTreatId, HttpServletRequest request);

	OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(Integer treatmentId, HttpServletRequest request);

}
