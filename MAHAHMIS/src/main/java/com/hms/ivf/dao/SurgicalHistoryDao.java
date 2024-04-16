package com.hms.ivf.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ivf.dto.SurgicalHistoryDto;

public interface SurgicalHistoryDao {
	
	public int  saveSurgicalHistory(List<SurgicalHistoryDto> objDto,HttpServletRequest request);
	public List<SurgicalHistoryDto> fetchSurgicalHistoryData(int patientId,int treatmentId,String callform);
	
	String deleteRecordSurgicalHistoryInfo(String ovampickupslaveids, int userId);
	
	List<SurgicalHistoryDto> getListForSurgicalHistory(String  patientId);

}
