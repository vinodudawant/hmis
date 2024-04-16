package com.hms.administrator.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalHolidaysDto;

public interface HospitalHolidayAdminService {
	int saveHospitalHoliday(String date,String reason,int idHospitalHoliday,HttpServletRequest request);
	HospitalHolidaysDto getListHospitalHoliday(String selYear);
	boolean deleteHospitalHoliday(Integer idHospitalHoliday,HttpServletRequest request);
	HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHoliday,HttpServletRequest request);
	

}
