package com.hms.bloodbank.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.Component;

public interface ComponentDao {

	int saveComponent(Component componentDetails, HttpServletRequest request);

	Component editComponentMaster(Integer componentId);

	boolean deleteComponentMaster(Integer componentId, Integer userId,HttpServletRequest request);

	List<Component> getAllComponentMaster(HttpServletRequest request);

	List<Component> centerComponentAutoSuggestion(String componentName);

}
