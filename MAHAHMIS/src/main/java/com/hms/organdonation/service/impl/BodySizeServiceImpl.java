package com.hms.organdonation.service.impl;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.organdonation.dao.BodySizeDao;
import com.hms.organdonation.dto.BodySizeDto;
import com.hms.organdonation.service.BodySizeService;

@Service
@Transactional
public class BodySizeServiceImpl implements BodySizeService{

	@Autowired
	BodySizeDao bodysizedao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveBodySize(BodySizeDto obj, HttpServletRequest request) {

		return bodysizedao.saveBodySize(obj,request);
	}

	@Override
	public List<BodySizeDto> getAllBodySize(HttpServletRequest request) {

		return bodysizedao.getAllBodySize(request);
	}

	@Override
	public BodySizeDto editBodySize(Integer bodySizeId) {

		return bodysizedao.editBodySize(bodySizeId);
	}

	@Override
	public boolean deleteBodySize(Integer bodySizeId, HttpServletRequest request) {

		return bodysizedao.deleteBodySize(bodySizeId,request);
	}

	@Override
	public List<BodySizeDto> bodySizeAutoSuggestion(String bodySizeName) {

		return bodysizedao.bodySizeAutoSuggestion(bodySizeName);
	}





}
