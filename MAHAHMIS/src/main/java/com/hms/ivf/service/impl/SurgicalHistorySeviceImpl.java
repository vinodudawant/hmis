package com.hms.ivf.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ivf.dao.SurgicalHistoryDao;
import com.hms.ivf.dto.SurgicalHistoryDto;
import com.hms.ivf.service.SurgicalHistoryService;




@Service
@Transactional
public class SurgicalHistorySeviceImpl implements SurgicalHistoryService {

	@Autowired
	SurgicalHistoryDao surgicalDao;
	
	@Override
	public int saveSurgicalHistory(List<SurgicalHistoryDto> objDto, HttpServletRequest request) {
		
		return surgicalDao.saveSurgicalHistory(objDto, request);  
	}

	@Override
	public List<SurgicalHistoryDto> fetchSurgicalHistoryData(int patientId, int treatmentId,String callform) {
		
		return surgicalDao.fetchSurgicalHistoryData(patientId, treatmentId,callform);
		
	}

	@Override
	public String deleteRecordSurgicalHistoryInfo(String ovampickupslaveids, int userId) {
		
		return surgicalDao.deleteRecordSurgicalHistoryInfo(ovampickupslaveids, userId);
	}

	@Override
	public List<SurgicalHistoryDto> getListForSurgicalHistory(String patientId) {
		
		return surgicalDao.getListForSurgicalHistory(patientId); 
	}

}
