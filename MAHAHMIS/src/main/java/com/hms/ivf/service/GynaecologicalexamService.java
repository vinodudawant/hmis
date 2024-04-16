package com.hms.ivf.service;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ivf.dto.GynoExamDto;

public interface GynaecologicalexamService {

public int saveGynExamHistory11(List<GynoExamDto> lstGynoExamDto,HttpServletRequest request);

public List<GynoExamDto> fetchGynExamHisPrvData(int patientId, int treatmentId);



public List<GynoExamDto> getlistGynExam(String patientId);

public String deleteRecordGynStudyBasicInfo(String ovampickupslaveids, int userId);

	

}
