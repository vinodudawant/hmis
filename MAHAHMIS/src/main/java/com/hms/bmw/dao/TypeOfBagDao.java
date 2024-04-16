package com.hms.bmw.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bmw.dto.TypeOfBagDto;

public interface TypeOfBagDao {

	public int saveTypeOfBagMaster(TypeOfBagDto typeOfBagdto,HttpServletRequest request);

	List<TypeOfBagDto> getbagtypes(HttpServletRequest request);
	
	public TypeOfBagDto editTypeOfBagMaster(Integer bag_ID);

	public boolean deleteTypeOfBagMaster(Integer bag_ID, HttpServletRequest request);
	
}
