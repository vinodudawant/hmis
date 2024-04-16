package com.hms.administrator.dao;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.DoctorSpecility;
public interface AdminDoctorSpecilityDao {

	public int saveDoctorSpeciality(DoctorSpecility cobj);

	public List<DoctorSpecility> defaultViewDoctorSpeciality(Integer unitId);

	public DoctorSpecility editDoctorSpeciality(Integer splId);

	public boolean deleteDoctorSpecility(DoctorSpecility cobj);
	
	public List<DoctorSpecility>   doctorSpecilityAutoSuggestion(String splName,Integer unitId);

}
