package com.hms.administrator.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.PatientManagementDao;
import com.hms.administrator.service.PatientManagementService;
import com.hms.dto.PatientTitle;
import com.hms.dto.SymptomsDetailsComp;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class PatientManagementServiceImpl implements PatientManagementService{

	@Autowired
	private PatientManagementDao patientManagementDao;
	
	public PatientManagementServiceImpl() {
	
	}

	@Override
	public String savePatientTitle(PatientTitle patientTitle, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		patientTitle.setCreatedBy(userId);
		patientTitle.setUnitId(unitId);
		return patientManagementDao.insertPatientTitle(patientTitle);
	}

	@Override
	public PatientTitle getAllPatientTitles() {
		return patientManagementDao.fetchAllPatientTitles();
	}

	@Override
	public PatientTitle getTitleById(Integer titleId) {
		return patientManagementDao.getTitleById(titleId);
	}
	
	@Override
	public boolean deletePatientTitle(int patientTitleId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		return patientManagementDao.deletePatientTitle(patientTitleId, userId);
	}
	
	@Override
	public String saveSymptomDetails(int specializationId, String symptomDetailsString, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		SymptomsDetailsComp symptomsDetailsDto = new SymptomsDetailsComp();
		symptomsDetailsDto = (SymptomsDetailsComp) ConfigUIJSONUtility.getObjectFromJSON(symptomDetailsString,SymptomsDetailsComp.class);
			
		List<SymptomsDetailsComp> symptomsDetailsList = new ArrayList<SymptomsDetailsComp>();
		for(SymptomsDetailsComp dto : symptomsDetailsDto.getSymptomsMasterList()){
			dto.setCreatedBy(userId);
			dto.setUnitId(unitId);
			
			symptomsDetailsList.add(dto);
		}
		
		return patientManagementDao.saveSymptomDetails(specializationId, symptomsDetailsList);
	}

	@Override
	public List<SymptomsDetailsComp> getSymptomDetails(int specializationId) {
		return patientManagementDao.fetchSymptomDetails(specializationId);
	}

	@Override
	public boolean removeSymptomDetails(int[] symptomDetailIds, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		return patientManagementDao.deleteSymptomDetails(symptomDetailIds, userId);
	}
}