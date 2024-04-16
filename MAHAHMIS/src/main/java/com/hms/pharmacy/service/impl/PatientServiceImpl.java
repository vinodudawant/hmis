package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.PatientDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PatientMaster;
import com.hms.pharmacy.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService
{
	@Autowired
	PatientDao patientDao;
	
	@Override
	@Transactional
	public List<PatientMaster> getPatient() {
		return patientDao.getPatient();
	}

	@Override
	@Transactional
	public boolean savePatient(PatientMaster patientMaster) {
		
		if(patientMaster.getPatId()==null)
		{
			patientMaster.setPatDeleteFlag(0);
			patientMaster.setPatAddDate(new Date(new java.util.Date()
					.getTime()));
			patientMaster.setPatUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			PatientMaster patientMaster2= patientDao.getPatientByIdForDate(patientMaster.getPatId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			patientMaster.setPatAddDate(patientMaster2.getPatAddDate());
			patientMaster.setPatDeleteFlag(0);
			patientMaster.setPatUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
				
		if (patientDao.savePatient(patientMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deletePatient(Integer patId) {
		return patientDao.deletePatient(patId);
	}

	@Override
	@Transactional
	public List<PatientMaster> autoSuggestionPatient(String letter) 
	{
		return patientDao.autoSuggestionPatient(letter);
	}

	@Override
	@Transactional
	public List<PatientMaster> getPatientById(Integer patId) {
		return patientDao.getPatientById(patId);
	}
	

}
