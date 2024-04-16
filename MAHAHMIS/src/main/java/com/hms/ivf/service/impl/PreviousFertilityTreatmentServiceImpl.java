package com.hms.ivf.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ivf.dao.PreviousFertilityTreatmentDao;
import com.hms.ivf.dto.PreviousFertilityTreatment;
import com.hms.ivf.service.PreviousFertilityTreatmentService;



@Service
@Transactional
public class PreviousFertilityTreatmentServiceImpl implements PreviousFertilityTreatmentService {
	
	@Autowired
	PreviousFertilityTreatmentDao previousfertilitytreatmentDao;
	
	/*
	 * @Override public PreviousFertilityTreatment
	 * savePreviousFertilityTreatmentService(PreviousFertilityTreatment
	 * previousFertilityTreatment) { System.err.println(previousFertilityTreatment);
	 * return previousfertilitytreatmentDao.savePreviousFertilityTreatment(
	 * previousFertilityTreatment); }
	 * 
	 * @Override public PreviousFertilityTreatment
	 * getAllPreviousFertilityTreatmentList() {
	 * 
	 * 
	 * return previousfertilitytreatmentDao.getAllPreviousFertilityTreatmentList();
	 * }
	 */
	
	
	@Override
	public int saveallpreviousFertilityTreatment22(PreviousFertilityTreatment objDtoo,HttpServletRequest request) {
		
		
		System.out.println("in service");
		 return previousfertilitytreatmentDao.saveallpreviousFertilityTreatment22( objDtoo, request);
	}

	@Override
	public PreviousFertilityTreatment getAllPrevTreatGynecologicalList() {
		// TODO Auto-generated method stub
		return previousfertilitytreatmentDao.getAllPrevTreatGynecologicalList();
	}

	@Override
	public List<PreviousFertilityTreatment> fetchGynHisPrvData(int patientId, int treatmentId) {
		// TODO Auto-generated method stub
		return previousfertilitytreatmentDao.fetchGynHisPrvData(patientId, treatmentId);
	}
	
	
	

	

}
