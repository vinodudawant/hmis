package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.PreviousTreatmentDao;
import com.hms.doctordesk.service.PreviousTreatmentService;
import com.hms.dto.Treatment;

@Service
@Transactional
public class PreviousTreatmentServiceImpl implements PreviousTreatmentService {
	
	@Autowired
	PreviousTreatmentDao previousTreatmentDao;
	
	@Override
	public int setPrevPresciptionToCurrent(Integer userId, Integer patId, Integer prev, Integer current, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return previousTreatmentDao.setPrevPresciptionToCurrent(userId, patId, prev, current, request);
	}

	@Override
	public List<Treatment> fetchPreviousTreatmentsByTreatmentID(Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return previousTreatmentDao.fetchPreviousTreatmentsByTreatmentID(treatmentId, request );
	}

	@Override
	public int setPreviousDataToCurrentTreatment(Integer userId, Integer patId, Integer prev, Integer current,	HttpServletRequest request) {
	
		return previousTreatmentDao.setPreviousDataToCurrentTreatment(userId, patId, prev, current, request);
	}

}
