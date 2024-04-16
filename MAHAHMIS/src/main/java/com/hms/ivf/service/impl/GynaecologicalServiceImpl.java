package com.hms.ivf.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ivf.dao.GynaecologicalDao;
import com.hms.ivf.dto.GynHistoryDto;
import com.hms.ivf.service.GynaecologicalService;



@Service
@Transactional
public class GynaecologicalServiceImpl implements GynaecologicalService {
	
	@Autowired
	GynaecologicalDao gynDao;
	
	@Override
	public int saveGynHistory11(GynHistoryDto objDto,HttpServletRequest request) {
		
		return gynDao.saveGynHistory11(objDto,request);	
	}

	@Override
	public GynHistoryDto getAllGynaecologicalList() {
			
		return gynDao.getAllGynaecologicalList();
	}

	@Override
	public List<GynHistoryDto> fetchGynHisData(int patientId, int treatmentId) {
		
		return gynDao.fetchGynHisData(patientId, treatmentId);
	}
	
	

}
