package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.doctordesk.dto.ClinicalEvaluationBMIDto;
import com.hms.doctordesk.dto.OPDAllergyAlertsDto;
import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;


public interface OPDClinicalEvaluationService {

	int saveBMIForClinicalEvaluation(ClinicalEvaluationBMIDto obj, Integer treatmentId, HttpServletRequest request);

	int saveOPDAllergyAlerts(OPDAllergyAlertsDto obj, Integer patientId, Integer treatmentId,
			HttpServletRequest request);

	List<OPDAllergyAlertsDto> fetchAllAllergyAlerts(Integer treatmentId, HttpServletRequest request);

	OPDAllergyAlertsDto getAllergyAlertsById(Integer allergyAlertsId);

	boolean deleteOPDAllergyAlerts(Integer allergyAlertsId, HttpServletRequest request);

	List<CustomizeTemplate> fetchCustomTemplatesBySpecializationId(String doctorSpecialization);

	CustomizeTemplate getCustomTemplateData(Integer idCustomizeTemplate);

	int saveOPDClinicalEvaluation(OPDClinicalEvaluationDto obj, Integer treatmentId, HttpServletRequest request);

	OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(Integer treatmentId, HttpServletRequest request);

	  
	  
	
}
