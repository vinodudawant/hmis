package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Doctor;
import com.hms.pharmacy.dao.DoctorDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.service.DoctorSevice;

@Service
public class DoctorServiceImpl implements DoctorSevice {

	@Autowired
	DoctorDao doctorDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateDoctor(DoctorMaster doctorMaster) 
	{

		if(doctorMaster.getDoctorId()==null)
		{
			doctorMaster.setDoctorDeleteFlag(0);
			doctorMaster.setDoctorAddDate(new Date(new java.util.Date()
					.getTime()));
			doctorMaster.setDoctorUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			DoctorMaster companyMaster2= doctorDao.getDoctorByIdForDate(doctorMaster.getDoctorId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			doctorMaster.setDoctorAddDate(companyMaster2.getDoctorAddDate());
			doctorMaster.setDoctorDeleteFlag(0);
			doctorMaster.setDoctorUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
				
		
		if (doctorDao.saveOrUpdateDoctor(doctorMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<DoctorMaster> getDoctors() {
		// TODO Auto-generated method stub
		return doctorDao.getDoctors();
	}
	
	@Override
	@Transactional
	public Boolean deleteDoctor(Integer doctorId) {
		// TODO Auto-generated method stub
		
		return doctorDao.deleteDoctor(doctorId);
	}
	
	@Override
	@Transactional
	public List<DoctorMaster> getAutoSuggestionDoctorNames(String letter) {
		// TODO Auto-generated method stub
		return doctorDao.getAutoSuggestionDoctorNames(letter);
	}
	
	@Override
	@Transactional
	public List<DoctorMaster> getDoctorById(Integer doctorId) {
		// TODO Auto-generated method stub
		return doctorDao.getDoctorById(doctorId);
	}

	@Override
	@Transactional
	public List<Doctor> fetchAutoListForDoctorName(String letter, String autoSuggest) {
		// TODO Auto-generated method stub
		return doctorDao.fetchAutoListForDoctorName(letter, autoSuggest);
	}
}
