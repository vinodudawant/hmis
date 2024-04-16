package com.hms.ivf.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.hms.ivf.dto.PreviousFertilityTreatment;



@Service
public interface PreviousFertilityTreatmentService {

	/*
	 * public PreviousFertilityTreatment
	 * savePreviousFertilityTreatmentService(PreviousFertilityTreatment
	 * previousFertilityTreatment);
	 * 
	 * 
	 * 
	 PreviousFertilityTreatment getAllPreviousFertilityTreatmentList();
	 * 
	 * 
	 * 
	 * public int saveallpreviousFertilityTreatment22(PreviousFertilityTreatment
	 * previousFertilityTreatment, HttpServletRequest request);
	 */
	
	public int saveallpreviousFertilityTreatment22(PreviousFertilityTreatment objDtoo,HttpServletRequest request);
	//PreviousFertilityTreatment getAllPreviousFertilityTreatmentList();

	public PreviousFertilityTreatment getAllPrevTreatGynecologicalList();

	public List<PreviousFertilityTreatment> fetchGynHisPrvData(int patientId, int treatmentId);
	
	
}
