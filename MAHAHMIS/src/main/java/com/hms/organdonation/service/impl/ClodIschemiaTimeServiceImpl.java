package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.organdonation.dao.ClodIschemiaTimeDao;
import com.hms.organdonation.dto.ClodIschemiaTimeDto;
import com.hms.organdonation.service.ClodIschemiaTimeService;

@Service
@Transactional
public class ClodIschemiaTimeServiceImpl implements ClodIschemiaTimeService{

	@Autowired
	ClodIschemiaTimeDao clodIschemiaTimedao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveClodIschemiaTime(ClodIschemiaTimeDto obj, HttpServletRequest request) {

		return clodIschemiaTimedao.saveClodIschemiaTime(obj,request);
	}

	@Override
	public List<ClodIschemiaTimeDto> getAllClodIschemiaTime(HttpServletRequest request) {

		return clodIschemiaTimedao.getAllClodIschemiaTime(request);
	}

	@Override
	public ClodIschemiaTimeDto editClodIschemiaTime(Integer clodIschemiaTimeId) {

		return clodIschemiaTimedao.editClodIschemiaTime(clodIschemiaTimeId);
	}

	@Override
	public boolean deleteClodIschemiaTime(Integer clodIschemiaTimeId, HttpServletRequest request) {

		return clodIschemiaTimedao.deleteClodIschemiaTime(clodIschemiaTimeId, request);
	}

	@Override
	public List<ClodIschemiaTimeDto> clodIschemiaTimeAutoSuggestion(String clodIschemiaTimeName) {

		return clodIschemiaTimedao.clodIschemiaTimeAutoSuggestion(clodIschemiaTimeName);
	}

	

}
