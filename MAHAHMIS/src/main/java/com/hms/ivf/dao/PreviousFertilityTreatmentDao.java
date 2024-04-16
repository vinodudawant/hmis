package com.hms.ivf.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.hms.ivf.dto.PreviousFertilityTreatment;



@Service
public interface PreviousFertilityTreatmentDao
{

	/*
	 * public PreviousFertilityTreatment
	 * savePreviousFertilityTreatment(PreviousFertilityTreatment
	 * previousFertilityTreatment);
	 * 
	 * public PreviousFertilityTreatment getAllPreviousFertilityTreatmentList();
	 */
	
	int saveallpreviousFertilityTreatment22(PreviousFertilityTreatment objDtoo,HttpServletRequest request);

	public List<PreviousFertilityTreatment> fetchGynHisPrvData(int patientId,int treatmentId);

	PreviousFertilityTreatment getAllPrevTreatGynecologicalList();


}
