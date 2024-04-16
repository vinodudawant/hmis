package com.hms.organdonation.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dao.OrganRequestDao;
import com.hms.organdonation.dto.OrganRequestDto;
import com.hms.organdonation.service.OrganRequestService;

@Service
@Transactional
public class OrganRequestServiceImpl implements OrganRequestService {
	
	@Autowired
	OrganRequestDao organRequestDao;

	@Override
	public int saveOrganRequest(OrganRequestDto obj, Integer patientId,
			Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organRequestDao.saveOrganRequest(obj, patientId, treatmentId, request);
	}

	@Override
	public OrganRequestDto editOrganRequest(Integer organRequestId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organRequestDao.editOrganRequest(organRequestId, request);
	}

	@Override
	public boolean deleteOrganRequest(Integer organRequestId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organRequestDao.deleteOrganRequest(organRequestId, request);
	}

	@Override
	public List<OrganRequestDto> requestAutoSuggestion(Integer organRequestId,
			String callFrom) {
		// TODO Auto-generated method stub
		return organRequestDao.requestAutoSuggestion(organRequestId, callFrom);
	}

	@Override
	public List<OrganRequestDto> getAllOrganRequestList(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		return organRequestDao.getAllOrganRequestList(request, fromDate, lastDate);
	}

	@Override
	public RegistrationDto getPatientDetailsWithMaxTreatmentId(
			Integer patientId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organRequestDao.getPatientDetailsWithMaxTreatmentId(patientId, request);
	}

	

}
