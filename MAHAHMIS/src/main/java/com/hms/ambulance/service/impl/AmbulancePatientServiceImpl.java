package com.hms.ambulance.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ambulance.dao.AmbulancePatientDao;
import com.hms.ambulance.dto.AmbulancePatientCountDto;
import com.hms.ambulance.dto.AmbulancePatientDto;
import com.hms.ambulance.service.AmbulancePatientService;
import com.hms.dto.Users;
import com.hms.ehat.dto.RegistrationDto;

@Service
@Transactional
public class AmbulancePatientServiceImpl implements AmbulancePatientService{
	
	@Autowired
	AmbulancePatientDao ambulancePatientdao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveAmbulancePatient(AmbulancePatientDto ambulancePatient, HttpServletRequest request) {

		return ambulancePatientdao.saveAmbulancePatient(ambulancePatient,request);
	}

	@Override
	public List<AmbulancePatientDto> getAllAmbulancePatient(String status,HttpServletRequest request) {

		return ambulancePatientdao.getAllAmbulancePatient(status,request);
	}

	@Override
	public AmbulancePatientDto editAmbulancePatient(Integer id) {

		return ambulancePatientdao.editAmbulancePatient(id);
	}

	@Override
	public boolean deleteAmbulancePatient(Integer patientId, HttpServletRequest request) {

		return ambulancePatientdao.deleteAmbulancePatient(patientId,request);
	}

	@Override
	public List<RegistrationDto> getAmbulanceDetailsById(Integer patientId) {

		return ambulancePatientdao.getAmbulanceDetailsById(patientId);
	}

	@Override
	public String getDoctorName(Integer patientId) {
		
		return ambulancePatientdao.getDoctorName(patientId);
	}

	@Override
	public List<Users> getDoctors(Integer user_ID) {

		return ambulancePatientdao.getDoctors(user_ID);
	}

	@Override
	public List<Users> getNurse(Integer user_ID) {

		return ambulancePatientdao.getNurse(user_ID);
	}

	@Override
	public List<AmbulancePatientDto> autoSuggestion(int callFrom, String text) {

		return ambulancePatientdao.autoSuggestion(callFrom,text);
	}

	@Override
	public List<AmbulancePatientDto> getAmbulancePatientById(Integer patientId) {
		// TODO Auto-generated method stub
		return ambulancePatientdao.getAmbulancePatientById(patientId);
	}

	@Override
	public int approveAmbulancePatient(String id, Integer userId) {

		return ambulancePatientdao.approveAmbulancePatient(id,userId);
	}

	@Override
	public int assignAmbulancePatient(Integer id, Integer userId) {

		return ambulancePatientdao.assignAmbulancePatient(id, userId);
	}
	
	@Override
	public int completeAmbulancePatient(Integer id, Integer userId) {
		// TODO Auto-generated method stub
		return ambulancePatientdao.completeAmbulancePatient(id, userId);
	}

	@Override
	public AmbulancePatientCountDto getAmbulancePatientCount(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return ambulancePatientdao.getAmbulancePatientCount(id, request);
	}
	
	@Override
	public int updateAmbulancePatient(AmbulancePatientDto ambulancePatient, HttpServletRequest request) {

		return ambulancePatientdao.updateAmbulancePatient(ambulancePatient,request);
	}

	@Override
	public int updateAmbulancePatientDetails(AmbulancePatientDto obj, HttpServletRequest request) {

		return ambulancePatientdao.updateAmbulancePatientDetails(obj, request);
	}
	
	@Override
	public List<AmbulancePatientDto> autoSuggestionforRID(int callFrom, Integer id) {
		// TODO Auto-generated method stub
		return ambulancePatientdao.autoSuggestionforRID(callFrom, id);
	}

	@Override
	public List<AmbulancePatientDto> getfilterAmbulancePatientMasterWithDate(String status, String department,
			String requisitionDate, String toDate, String wardTypeSelect) {
		// TODO Auto-generated method stub
		return ambulancePatientdao.getfilterAmbulancePatientMasterWithDate(status,department,requisitionDate,toDate,wardTypeSelect);
	}
	
}
