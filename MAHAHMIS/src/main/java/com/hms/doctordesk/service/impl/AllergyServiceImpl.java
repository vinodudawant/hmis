package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.AllergyTypeDao;
import com.hms.doctordesk.dto.AllergyReaction;
import com.hms.doctordesk.dto.AllergyTypeDto;
import com.hms.doctordesk.service.AllergyService;

@Service
@Transactional
public class AllergyServiceImpl implements AllergyService{

	@Autowired
	AllergyTypeDao allergyTypeDao;
	
	@Override
	public String saveAllergyType(AllergyTypeDto allergyTypeDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		return allergyTypeDao.saveAllergyType(allergyTypeDto, request);
	}

	@Override
	public List<AllergyTypeDto> getAllergyTypes(HttpServletRequest request,String searchText) {
		// TODO Auto-generated method stub
		return allergyTypeDao.getAllergyTypes(request,searchText);
	}

	@Override
	public List<AllergyTypeDto> getAllergyById(int id) {
		// TODO Auto-generated method stub
		return allergyTypeDao.getAllergyById(id);
	}

	@Override
	public String deletAllergyType(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return allergyTypeDao.deletAllergyType(id, request);
	}

	@Override
	public String saveAllergyRecation(AllergyReaction allergyReaction,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return allergyTypeDao.saveAllergyRecation(allergyReaction, request);
	}

	@Override
	public List<AllergyReaction> getallergyReaction(HttpServletRequest request,String searchText) {
		// TODO Auto-generated method stub
		return allergyTypeDao.getallergyReaction(request,searchText);
	}

	@Override
	public List<AllergyReaction> getallergyReactionById(int id) {
		// TODO Auto-generated method stub
		return allergyTypeDao.getallergyReactionById(id);
	}

	@Override
	public String deletallergyReaction(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return allergyTypeDao.deletallergyReaction(id, request);
	}

}
