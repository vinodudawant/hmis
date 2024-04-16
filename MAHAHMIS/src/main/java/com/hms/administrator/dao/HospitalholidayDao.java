package com.hms.administrator.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalHolidaysDto;

public interface HospitalholidayDao {
	
	 int saveHospitalHoliday(String date,String reason, int idHospitalHoliday,HttpServletRequest request);
	 HospitalHolidaysDto getListHospitalHoliday(String selYear);
	 HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHoliday,HttpServletRequest request);
	 boolean deleteHospitalHoliday(Integer idHospitalHoliday);
	 
}
