package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.doctordesk.dao.OPDClinicalEvaluationDao;
import com.hms.doctordesk.dao.OPDHistoryDao;
import com.hms.doctordesk.dto.ClinicalEvaluationBMIDto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.dto.OPDAllergyAlertsDto;
import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.doctordesk.service.OPDClinicalEvaluationService;
import com.hms.doctordesk.service.OPDHistoryService;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class OPDClinicalEvaluationServiceImpl implements OPDClinicalEvaluationService {

	@Autowired
	private OPDClinicalEvaluationDao opdClinicalEvalDao;
	

	@Override
	public int saveBMIForClinicalEvaluation(ClinicalEvaluationBMIDto obj, Integer treatmentId, HttpServletRequest request) {
		return opdClinicalEvalDao.saveBMIForClinicalEvaluation(obj, treatmentId, request);
	}


	@Override
	public int saveOPDAllergyAlerts(OPDAllergyAlertsDto obj, Integer patientId, Integer treatmentId,
			HttpServletRequest request) {
		
		return opdClinicalEvalDao.saveOPDAllergyAlerts(obj, patientId, treatmentId, request);
	}


	@Override
	public List<OPDAllergyAlertsDto> fetchAllAllergyAlerts(Integer treatmentId, HttpServletRequest request) {
		return opdClinicalEvalDao.fetchAllAllergyAlerts(treatmentId, request);
	}


	@Override
	public OPDAllergyAlertsDto getAllergyAlertsById(Integer allergyAlertsId) {
		
		return opdClinicalEvalDao.getAllergyAlertsById(allergyAlertsId);
	}


	@Override
	public boolean deleteOPDAllergyAlerts(Integer allergyAlertsId, HttpServletRequest request) {
		
		return opdClinicalEvalDao.deleteOPDAllergyAlerts(allergyAlertsId, request);
	}


	@Override
	public List<CustomizeTemplate> fetchCustomTemplatesBySpecializationId(String doctorSpecialization) {
		return opdClinicalEvalDao.fetchCustomTemplatesBySpecializationId(doctorSpecialization);
	}


	@Override
	public CustomizeTemplate getCustomTemplateData(Integer idCustomizeTemplate) {
		return opdClinicalEvalDao.getCustomTemplateData(idCustomizeTemplate);
	}


	@Override
	public int saveOPDClinicalEvaluation(OPDClinicalEvaluationDto obj, Integer treatmentId, HttpServletRequest request) {
		return opdClinicalEvalDao.saveOPDClinicalEvaluation(obj, treatmentId, request);
	}


	@Override
	public OPDClinicalEvaluationDto fetchClinicalEvalTempDataByTreatmentId(Integer treatmentId,
			HttpServletRequest request) {
		return opdClinicalEvalDao.fetchClinicalEvalTempDataByTreatmentId(treatmentId, request);
	}
	
	

}
