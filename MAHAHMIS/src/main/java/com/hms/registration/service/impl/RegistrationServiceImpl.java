package com.hms.registration.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.registration.dao.RegistrationDao;
import com.hms.registration.dto.MarkvisitPatientDetailsDto;
import com.hms.registration.dto.PatientDetailsDto;
import com.hms.registration.dto.RegistrationDataDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;
import com.hms.registration.service.RegistrationService;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

	@Autowired
	RegistrationDao regDao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	
	@Override
	public RegistrationDataDto getRegistrationData(RegistrationDataDto regDto) {
		
		regDto.setLstPrefix(regDao.getPrefixList(regDto));
		return regDto;
	}
	
	@Override
	public SpecializationDto getSpecialization(SpecializationDto regDto) {
		
		regDto.setLstSpecialization(regDao.getSpecialization(regDto));
		return regDto;
	}
	
	@Override
	public SpecialityWiseDoctorDto getDoctorBySpecialization(SpecialityWiseDoctorDto regDto) {
		
		regDto.setLstDoctorBySpecialization(regDao.getDoctorBySpecialization(regDto));
		return regDto;
	}
	
	@Override
	public int savePatientDetails(@RequestBody RegistrationDto regDto) {
		
		Integer patientId = 0;
		try {
			
	        if(regDto.getQueryType().equalsIgnoreCase("delete")){
		        //Code for delete
	        	regDto = (RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class, regDto.getPatientId());
	        	regDto.setDeleted("Y");
	        	regDto.setDeletedBy(regDto.getCreatedBy());
	        	regDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
		        
		    }else {
		    	//Code for save/markvisit patient
		    	patientId = regDao.savePatientDetails(regDto);
		    }
		}catch(Exception e) {
			
			e.printStackTrace();
			patientId = 0;
		}
		return patientId;
	}
	
	@Override
	public int savePatientDemographicDetails(@RequestBody RegistrationDto regDto) {
		
		Integer patientId = 0;
		try {
			
	        if(regDto.getQueryType().equalsIgnoreCase("delete")){
		        //Code for delete
	        	regDto = (RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class, regDto.getPatientId());
	        	regDto.setDeleted("Y");
	        	regDto.setDeletedBy(regDto.getCreatedBy());
	        	regDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
		        
		    }else {
		    	//Code for save/markvisit patient
		    	patientId = regDao.savePatientDemographicDetails(regDto);
		    }
		}catch(Exception e) {
			
			e.printStackTrace();
			patientId = 0;
		}
		return patientId;
	}
	
	@Override
	public List<PatientDetailsDto> getMarkVisitList(int unitId,Integer startIndex) {

		return regDao.getMarkVisitList(unitId,startIndex);
	}
	
	@Override
	public List<MarkvisitPatientDetailsDto> getMarkvisitPatientDetails(MarkvisitPatientDetailsDto obj) {

		return regDao.getMarkvisitPatientDetails(obj);
	}
	
	@Override
	public List<PatientDetailsDto> autoSuggestionMarkVisit(int patientId,String mobileNo,String addharNo, HttpServletRequest request) {
		
		return regDao.autoSuggestionMarkVisit(patientId,mobileNo,addharNo, request);
	}

	@Override
	public int savePatientDetails1(RegistrationDto regDto) {
		
		Integer patientId = 0;
		try {
			
	        if(regDto.getQueryType().equalsIgnoreCase("delete")){
		        //Code for delete
	        	regDto = (RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class, regDto.getPatientId());
	        	regDto.setDeleted("Y");
	        	regDto.setDeletedBy(regDto.getCreatedBy());
	        	regDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
		        
		    }else {
		    	//Code for save/markvisit patient
		    	patientId = regDao.savePatientDetails1(regDto);
		    }
		}catch(Exception e) {
			
			e.printStackTrace();
			patientId = 0;
		}
		return patientId;
	}
	
	@Transactional
	@Override
	public Integer getAllGetPatCount() {
		// TODO Auto-generated method stub
		return regDao.getAllGetPatCount();
	}

	@Transactional
	@Override
	public int followUpCount(int patientId, int sponsorId) {
		int followupCount=0;
		try {

			String sqlCount=" select count(*) from ehat_treatment where patient_id="+patientId+" and charges_slave_id="+sponsorId+" and department_id="+2+" ";
			SQLQuery CountQuery=sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
		      int count=((Number) CountQuery.uniqueResult()).intValue();
		      if(count > 0) {
		       	String sqlF=" select ifnull(free_follow_up_count,0) as followup_count from ehat_treatment where patient_id="+patientId+" and deleted='N' and charges_slave_id="+sponsorId+" and department_id='2' order by treatment_id desc  limit 1 ";
		         SQLQuery sQuery=sessionFactory.getCurrentSession().createSQLQuery(sqlF);
		         followupCount=((Number) sQuery.uniqueResult()).intValue();
		      }
		}catch (Exception e) {
			e.printStackTrace();
		}
		return followupCount;
	}
}
