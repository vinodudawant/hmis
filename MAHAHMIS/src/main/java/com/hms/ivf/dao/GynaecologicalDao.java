package com.hms.ivf.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ivf.dto.GynHistoryDto;

public interface GynaecologicalDao {
	
	GynHistoryDto getAllGynaecologicalList();
	
	public int  saveGynHistory11(GynHistoryDto objDto,HttpServletRequest request);
	
	public List<GynHistoryDto> fetchGynHisData(int patientId,int treatmentId);

}
