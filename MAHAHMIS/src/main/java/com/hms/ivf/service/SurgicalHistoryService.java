package com.hms.ivf.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ivf.dto.SurgicalHistoryDto;



public interface SurgicalHistoryService {
	
	public int  saveSurgicalHistory(List<SurgicalHistoryDto> objDto,HttpServletRequest request);
	
	public List<SurgicalHistoryDto> fetchSurgicalHistoryData(int patientId, int treatmentId,String callform);
	
	public String deleteRecordSurgicalHistoryInfo(String ovampickupslaveids, int userId);
	
	public List<SurgicalHistoryDto> getListForSurgicalHistory(String patientId);
	
}
