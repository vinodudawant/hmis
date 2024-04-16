package com.hms.ivf.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ivf.dto.GynoExamDto;

public interface GynaecologicalexamDao {

	public int saveGynExamHistory11(List<GynoExamDto> lstGynoExamDto,HttpServletRequest request);
	public List<GynoExamDto> fetchGynExamHisPrvData(int patientId,int treatmentId);
	//GynoExamDto getAllGynecologicalStudyList();

	//GynoExamDto getlistGynExam(int gynoexamid);
	List<GynoExamDto> getlistGynExam(String  patientId);
	String deleteRecordGynStudyBasicInfo(String ovampickupslaveids, int userId);
	
}
