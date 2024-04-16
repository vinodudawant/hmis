package com.hms.administrator.service;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.DoctorSpecility;
public interface AdminDoctorSpecilityService {
	public int saveDoctorSpeciality(DoctorSpecility cobj,HttpServletRequest request);

	public List<DoctorSpecility> defaultViewDoctorSpeciality(Integer unitId,HttpServletRequest request);

	public DoctorSpecility editDoctorSpeciality(Integer splId);

	public boolean deleteDoctorSpecility(Integer splId, HttpServletRequest request);
	
	public List<DoctorSpecility>   doctorSpecilityAutoSuggestion(String splName,Integer unitId);

}