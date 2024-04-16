package com.hms.bloodbank.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.Component;

public interface ComponentService {

	int saveComponent(Component componentDetails, HttpServletRequest request);

	List<Component> getAllComponentMaster(HttpServletRequest request);

	boolean deleteComponentMaster(Integer componentId, HttpServletRequest request);

	Component editComponentMaster(Integer componentId);

	List<Component> centerComponentAutoSuggestion(String componentName);

}
