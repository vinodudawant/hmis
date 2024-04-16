package com.hms.ehat.service.impl;


import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.PatientCareAdvicesDto;
import com.hms.dto.PatientChemoDto;
import com.hms.ehat.dao.PatientChemoDao;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.PatientChemoOrderSheetDto;
import com.hms.ehat.service.PatientChemoService;

@Service
public class PatientChemoServiceImpl implements PatientChemoService {
	
	@Autowired
	PatientChemoDao patChemoDao;
	@Transactional
	public int saveOrUpdatePatChemo(PatientChemoDto patChemoDto, HttpServletRequest request) {
		if(patChemoDto.getpChemoId() == 0 || patChemoDto.getpChemoId() == null){
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			patChemoDto.setCreatedBy(userId);
			patChemoDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			patChemoDto.setStatus("Y");
			patChemoDto.setpChemoId(null);
			int response = patChemoDao.saveOrUpdatePatChemo(patChemoDto);
			return response;
		}else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			patChemoDto.setUpdatedBy(userId);
			patChemoDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			patChemoDto.setStatus("Y");
			int response = patChemoDao.saveOrUpdatePatChemo(patChemoDto);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
	}
	@Override
	@Transactional
	public List<PatientChemoDto> getPatientChemo(String callFrom,PatientChemoDto patientChemoDto,HttpServletRequest request) {
		
		return patChemoDao.getPatientChemo(callFrom,patientChemoDto.getChemoDt(),patientChemoDto.getPatId(),patientChemoDto.getTreatId());
	}
	
	@Override
	@Transactional
	public int saveOrUpdatePatAdvice(PatientCareAdvicesDto patCareAdvDto,
			HttpServletRequest request) {
		if(patCareAdvDto.getCareAdviceId() == 0 || patCareAdvDto.getCareAdviceId() == null){
			System.err.println("helloINServiceIMPl");
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			patCareAdvDto.setCreatedBy(userId);
			patCareAdvDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			patCareAdvDto.setStatus("Y");
			patCareAdvDto.setCareAdviceId(null);
			int response = patChemoDao.saveOrUpdatePatAdvice(patCareAdvDto);
			return response;
		}else{
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			patCareAdvDto.setUpdatedBy(userId);
			patCareAdvDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			patCareAdvDto.setStatus("Y");
			int response = patChemoDao.saveOrUpdatePatAdvice(patCareAdvDto);
			if (response == 1) {
				response = 2;
			}
			return response;
		}
	}
	
	@Override
	@Transactional
	public List<PatientCareAdvicesDto> getPatCareAdvices(PatientCareAdvicesDto careAdvicesDto, HttpServletRequest request) {
	return patChemoDao.getPatCareAdvices(careAdvicesDto.getTreatId());
	}
	
	
	@Override
	@Transactional
	public ChemoTheropyMaterDto getChemoProtocol(String letter) {
		return patChemoDao.getChemoProtocol(letter);
	}
	
	@Override
	@Transactional
	public int saveOrderSheet(PatientChemoOrderSheetDto patientChemoOrderSheetDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		patientChemoOrderSheetDto.setCreatedBy(userId);
		patientChemoOrderSheetDto.setCreatedDate(new Date(new java.util.Date().getTime()));
		patientChemoOrderSheetDto.setStatus("Y");
		patientChemoOrderSheetDto.setPatOrderId(null);
		int response = patChemoDao.saveOrderSheet(patientChemoOrderSheetDto);
		return response;
	}
	
	@Override
	@Transactional
	public List<PatientChemoOrderSheetDto> getPatientChemoOrderSheet(String callFrom,PatientChemoOrderSheetDto patOrderSheetDto,
			HttpServletRequest request) {
		return patChemoDao.getPatientChemoOrderSheet(callFrom,patOrderSheetDto.getChemoDt(),patOrderSheetDto.getTreatId());
	}
	
	@Override
	@Transactional
	public int updateOrderSheet(Timestamp fromTimestamp,int userId,int tid, String orderString, String date,HttpServletRequest request) {
		 return patChemoDao.updateOrderSheet(fromTimestamp,userId,tid,orderString,date,request);
		
	}
	
	@Override
	@Transactional
	public List<PatientCareAdvicesDto> getPatCareAdvices2( int treat) {
	return patChemoDao.getPatCareAdvices(treat);
	}


	@Override
	@Transactional
	public List<PatientChemoDto> getPatientChemoAll(int treatmentId,String callFrom, String date) {
		
		return patChemoDao.getPatientChemoAll(treatmentId,callFrom, date);
	}
	
	@Override
	@Transactional
	public List<PatientChemoOrderSheetDto> getOrderSheetAll(int treatmentId) {
		
		return patChemoDao.getOrderSheetAll(treatmentId);
	}
}
