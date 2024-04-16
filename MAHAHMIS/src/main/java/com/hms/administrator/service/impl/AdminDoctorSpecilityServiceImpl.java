package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dao.AdminDoctorSpecilityDao;
import com.hms.administrator.service.AdminDoctorSpecilityService;
import com.hms.dto.DoctorSpecility;
import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
public class AdminDoctorSpecilityServiceImpl implements AdminDoctorSpecilityService {

	@Autowired
	AdminDoctorSpecilityDao doctordao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int saveDoctorSpeciality(DoctorSpecility cobj,HttpServletRequest request) {
			if (cobj.getIdDoctorSpecilities() == 0) {
	
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				cobj.setCreatedBy(userId);
				cobj.setStatus("Y");
				cobj.setCreatedDate(new Date(new java.util.Date().getTime()));
	
				int response = doctordao.saveDoctorSpeciality(cobj);
				return response;
	
			} else {
	
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				cobj.setUpdatedBy(userId);
				cobj.setUpdatedBy(userId);
				cobj.setStatus("Y");
				cobj.setUpdatedDate(new Date(new java.util.Date().getTime()));
				int response = doctordao.saveDoctorSpeciality(cobj);
				return response;
	
			}
	}

	@Override
	public List<DoctorSpecility> defaultViewDoctorSpeciality(Integer unitId,HttpServletRequest request) {
	
		return doctordao.defaultViewDoctorSpeciality(unitId);
	}

	@Override
	public DoctorSpecility editDoctorSpeciality(Integer splId) {
		
		return doctordao.editDoctorSpeciality(splId);
	}

	@Override
	public boolean deleteDoctorSpecility(Integer splId,	HttpServletRequest request) {
		DoctorSpecility obj=	(DoctorSpecility)sessionFactory.getCurrentSession().get(DoctorSpecility.class, splId);
		obj.setDeleted("Y");
		obj.setStatus("N");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		return doctordao.deleteDoctorSpecility(obj);
	}

	@Override
	public List<DoctorSpecility> doctorSpecilityAutoSuggestion(String splName,	Integer unitId) {
		
		return doctordao.doctorSpecilityAutoSuggestion(splName, unitId);
	}

}
