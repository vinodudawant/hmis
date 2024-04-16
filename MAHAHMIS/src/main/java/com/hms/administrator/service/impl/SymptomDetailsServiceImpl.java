package com.hms.administrator.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.SymptomDetailsDao;
import com.hms.administrator.dto.SymptomsDetailsDto;
import com.hms.administrator.service.SymptomDetailsService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class SymptomDetailsServiceImpl implements SymptomDetailsService {

	@Autowired
	SymptomDetailsDao symptomDetailsDao;
	
	
	@Transactional
	@Override
	public String saveSymptomDetails(int specializationId, String symptomDetailsString, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		SymptomsDetailsDto symptomsDetailsDto = new SymptomsDetailsDto();
		symptomsDetailsDto = (SymptomsDetailsDto) ConfigUIJSONUtility.getObjectFromJSON(symptomDetailsString,SymptomsDetailsDto.class);
			
		List<SymptomsDetailsDto> symptomsDetailsList = new ArrayList<SymptomsDetailsDto>();
		for(SymptomsDetailsDto dto : symptomsDetailsDto.getSymptomDetailsList())
		{
			dto.setCreatedBy(userId);
			dto.setUnitId(unitId);
			
			symptomsDetailsList.add(dto);
		}
		
		return symptomDetailsDao.saveSymptomDetails(specializationId, symptomsDetailsList);
	}

	@Transactional
	@Override
	public List<SymptomsDetailsDto> getSymptomDetails(int specializationId) {
		return symptomDetailsDao.fetchSymptomDetails(specializationId);
	}

	@Transactional
	@Override
	public boolean removeSymptomDetails(int[] symptomDetailIds, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		return symptomDetailsDao.deleteSymptomDetails(symptomDetailIds, userId);
	}
}
