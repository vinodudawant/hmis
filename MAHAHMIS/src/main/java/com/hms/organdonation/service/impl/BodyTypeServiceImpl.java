package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.organdonation.dao.BodyTypeDao;
import com.hms.organdonation.dto.BodyTypeDto;
import com.hms.organdonation.service.BodyTypeService;

@Service
@Transactional
public class BodyTypeServiceImpl implements BodyTypeService{

	@Autowired
	BodyTypeDao bodytypedao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int saveBodyType(BodyTypeDto obj, HttpServletRequest request) {

		return bodytypedao.saveBodyType(obj,request);
	}


	@Override
	public List<BodyTypeDto> getAllBodyType(HttpServletRequest request) {

		return bodytypedao.getAllBodyType(request);
	}


	@Override
	public BodyTypeDto editBodyType(Integer bodyTypeId) {

		return bodytypedao.editBodyType(bodyTypeId);
	}


	@Override
	public boolean deleteBodyType(Integer bodyTypeId, HttpServletRequest request) {

		return bodytypedao.deleteBodyType(bodyTypeId,request);
	}


	@Override
	public List<BodyTypeDto> bodyTypeAutoSuggestion(String bodyTypeName) {

		return bodytypedao.bodyTypeAutoSuggestion(bodyTypeName);
	}

}
