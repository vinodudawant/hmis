package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.NursingStationDao;
import com.hms.ehat.dao.NursingTransactionDaoNEW;
import com.hms.ehat.dto.PrePostChecklistDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ehat.dto.nursingAsmentTwoDataDTO;
import com.hms.ehat.service.NursingTransactionServiceNEW;

@Service
public class NursingTransactionServiceImplNEW implements NursingTransactionServiceNEW
{

	@Autowired
	NursingTransactionDaoNEW NursingTransactionDao;
	
	@Override
	@Transactional
	public int savePrePostData(PrePostChecklistDTO objDto,HttpServletRequest request) {

		return NursingTransactionDao.savePrePostData(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<PrePostChecklistDTO> fetchprepostData(int patientId,int treatmentId){
		
		return NursingTransactionDao.fetchprepostData(patientId, treatmentId);
		
	}
	
	@Override
	@Transactional
	public int saveNursingAssessmentData01(nursingAsmentDataDTO objDto,HttpServletRequest request) {

		return NursingTransactionDao.saveNursingAssessmentData01(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<nursingAsmentDataDTO> fetchNursingAs(int patientId,int treatmentId){
		
		return NursingTransactionDao.fetchNursingAs(patientId, treatmentId);
		
	}

	@Override
	@Transactional
	public int saveNursingAssessmentData02(nursingAsmentTwoDataDTO objDto, HttpServletRequest request) {
		
		return NursingTransactionDao.saveNursingAssessmentData02(objDto,request);
	}

	@Override
	@Transactional
	public List<nursingAsmentTwoDataDTO> fetchNursingAs02(int patientId, int treatmentId) {

		return NursingTransactionDao.fetchNursingAs02(patientId, treatmentId);
	}
	
}
