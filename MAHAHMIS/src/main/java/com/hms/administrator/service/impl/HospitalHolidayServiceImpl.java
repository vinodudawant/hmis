package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.HospitalholidayDao;
import com.hms.administrator.dto.HospitalHolidaysDto;
import com.hms.administrator.service.HospitalHolidayAdminService;

@Service
@Transactional
public class HospitalHolidayServiceImpl implements HospitalHolidayAdminService {

	@Autowired
	HospitalholidayDao HospitalholidayDao;
		
/*****************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: SaveHospitalHolidayMaster
********************************************/
	@Override
	public int saveHospitalHoliday(String date, String reason,int idHospitalHolidays,
			HttpServletRequest request) {
	
		return HospitalholidayDao.saveHospitalHoliday(date, reason,idHospitalHolidays, request);
	}

	@Override
	public HospitalHolidaysDto getListHospitalHoliday(String selYear) {
		
		return HospitalholidayDao.getListHospitalHoliday(selYear);
	}

	@Override
	public HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHolidays,
			HttpServletRequest request) {
		
		return HospitalholidayDao.editHospitalHoliday(idHospitalHolidays , request);
	}

	@Override
	public boolean deleteHospitalHoliday(Integer idHospitalHolidays,HttpServletRequest request) {
		
		return HospitalholidayDao.deleteHospitalHoliday(idHospitalHolidays);
	}
	

	
	
	
}
