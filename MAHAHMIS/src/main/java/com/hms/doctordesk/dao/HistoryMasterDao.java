package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.DdHistoryDto;
import com.hms.doctordesk.dto.HistoryMaster;

public interface HistoryMasterDao {

	int saveHistory(HistoryMaster history, HttpServletRequest request);

	List<HistoryMaster> getAllHistoryMaster(HttpServletRequest request);

	HistoryMaster editHistoryMaster(Integer historyId);

	boolean deleteHistoryMaster(Integer historyId, HttpServletRequest request);

	List<HistoryMaster> centerHistoryAutoSuggestion(String historyName,String historyCode);
	
	//DoctorDesk History

	int saveHistoryMaster(String historyDetails, HttpServletRequest request);

	List<DdHistoryDto> fetchHistory(int treatmentId);

	List<HistoryMaster> centerFamilyHistoryAutoSuggestion(String historyName,
			String historyCode);

	boolean deleteDDHistory(Integer his_Id, HttpServletRequest request);

}
