package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.BodyTypeDto;

public interface BodyTypeDao {

	int saveBodyType(BodyTypeDto obj, HttpServletRequest request);
	
	List<BodyTypeDto> getAllBodyType(HttpServletRequest request);

	BodyTypeDto editBodyType(Integer bodyTypeId);

	boolean deleteBodyType(Integer bodyTypeId, HttpServletRequest request);

	List<BodyTypeDto> bodyTypeAutoSuggestion(String bodyTypeName);

}
