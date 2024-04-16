package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.dto.Treatment;

public interface PreviousTreatmentDao {
	
	List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId);

	int setPrevPresciptionToCurrent(Integer userId, Integer patId, Integer prev, Integer current, HttpServletRequest request);

	List<Treatment> fetchPreviousTreatmentsByTreatmentID(Integer treatmentId, HttpServletRequest request);
	
	int setPreviousDataToCurrentTreatment(Integer userId, Integer patId, Integer prev, Integer current, HttpServletRequest request);

}
