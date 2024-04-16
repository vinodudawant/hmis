package com.hms.bmw.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.bmw.dao.TypeOfBagDao;
import com.hms.bmw.dto.TypeOfBagDto;
import com.hms.bmw.service.TypeOfBagService;

@Service
@Transactional
public class TypeOfBagServiceImpl implements TypeOfBagService {
	
	@Autowired 
	TypeOfBagDao typeOfBagDao;
	@Override
	public int saveTypeOfBagMaster(TypeOfBagDto typeOfBagdto, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return typeOfBagDao.saveTypeOfBagMaster(typeOfBagdto, request);
	}
	
	@Override
	public List<TypeOfBagDto> getbagtypes(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return typeOfBagDao.getbagtypes(request);
	}

	@Override
	public TypeOfBagDto editTypeOfBagMaster(Integer bag_ID) {
		// TODO Auto-generated method stub
		return typeOfBagDao.editTypeOfBagMaster(bag_ID);
	}

	@Override
	public boolean deleteTypeOfBagMaster(Integer bag_ID, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return typeOfBagDao.deleteTypeOfBagMaster(bag_ID,request);
	}

	

	
}
