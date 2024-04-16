package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Treatment;

public interface PreviousTreatmentService {

	int setPrevPresciptionToCurrent(Integer userId, Integer patId, Integer prev, Integer current, HttpServletRequest request);

	List<Treatment> fetchPreviousTreatmentsByTreatmentID(Integer treatmentId, HttpServletRequest request);
	
	int setPreviousDataToCurrentTreatment(Integer userId, Integer patId, Integer prev, Integer current, HttpServletRequest request);

}
