package com.hms.ivf.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ivf.dao.impl.GynaecologicalExamDao;
import com.hms.ivf.dto.GynoExamDto;
import com.hms.ivf.service.GynaecologicalexamService;
@Service
@Transactional
public class GynaecologicalExamServiceImpl implements GynaecologicalexamService {
	

	@Autowired
	GynaecologicalExamDao gynexamDao;

	@Override
	public int saveGynExamHistory11(List<GynoExamDto> objDto,HttpServletRequest request) {
		
		 return gynexamDao.saveGynExamHistory11( objDto, request);
	}

	@Override
	public List<GynoExamDto> fetchGynExamHisPrvData(int patientId, int treatmentId) {
		// TODO Auto-generated method stub
		return gynexamDao.fetchGynExamHisPrvData(patientId, treatmentId);
	}

	/*
	 * @Override public GynoExamDto getAllGynecologicalStudyList() { // TODO
	 * Auto-generated method stub return gynexamDao.getAllGynecologicalStudyList();
	 * }
	 */
	
	
	  @Override
	  
	  @Transactional 
	  public List<GynoExamDto> getlistGynExam(String patientId) 
	  {
	  
	  return gynexamDao.getlistGynExam(patientId); 
	  }
	  
	  

		@Override
		@Transactional
		public String deleteRecordGynStudyBasicInfo(String ovampickupslaveids, int userId) {
			// TODO Auto-generated method stub
			return gynexamDao.deleteRecordGynStudyBasicInfo(ovampickupslaveids, userId);
		}

	 
}

	
	

