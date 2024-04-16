package com.hms.pathology.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pathology.dto.PathologyTestReasonDto;

public interface TestReasonDao {

	public int saveTestReason(PathologyTestReasonDto labTestReasonDTO,	Integer sampleTypeId, HttpServletRequest request);
		
	public List<PathologyTestReasonDto> getAllTestReason();
		
	public PathologyTestReasonDto editTestReasonById(int id,HttpServletRequest request);
		
	public boolean deleteTestReasonById(int id,HttpServletRequest request);
		
	public List<PathologyTestReasonDto> searchTestReasonByName(String name,HttpServletRequest request);
}