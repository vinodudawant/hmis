package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pathology.dto.SampleContainerDTO;

public interface SampleContainerDao {
	
	int saveSampleContainer(SampleContainerDTO sampleContainer,	HttpServletRequest request);
	
	public List<SampleContainerDTO> getAllSampleContainer();
	
	public SampleContainerDTO editSampleContainerById(int sampleContainerId,HttpServletRequest request);
	
	public boolean deleteSampleContainerById(int sampleContainerId,HttpServletRequest request);
	
	public List<SampleContainerDTO> searchSampleContainerByName(String name,HttpServletRequest request);
}
