package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.doctordesk.dao.HistoryMasterDao;
import com.hms.doctordesk.dto.DdHistoryDto;
import com.hms.doctordesk.dto.HistoryMaster;
import com.hms.doctordesk.service.HistoryMasterService;

@Service
@Transactional
public class HistoryMasterServiceImpl implements HistoryMasterService{
	
	@Autowired
	HistoryMasterDao historyMasterDao;

	@Override
	public int saveHistory(HistoryMaster history, HttpServletRequest request) {
		HttpSession session=request.getSession();
		return historyMasterDao.saveHistory(history,request);
	}

	
	@Override
	
	public List<HistoryMaster> getAllHistoryMaster(HttpServletRequest request) {
		return historyMasterDao.getAllHistoryMaster(request);
	}

	@Override
	public HistoryMaster editHistoryMaster(Integer historyId) {
		return historyMasterDao.editHistoryMaster(historyId);
	}

	@Override
	public boolean deleteHistoryMaster(Integer historyId, HttpServletRequest request) {
		return historyMasterDao.deleteHistoryMaster(historyId,request);
	}

	@Override
	public List<HistoryMaster> centerHistoryAutoSuggestion(String historyName,String historyCode) {
		return historyMasterDao.centerHistoryAutoSuggestion(historyName,historyCode);
	}

	//DoctorDesk History
	
	  @Override
	
	  public int saveHistoryMaster(String historyDetails,HttpServletRequest request) {
		  return historyMasterDao.saveHistoryMaster(historyDetails,request);
		  }
	  

	@Override
	public List<DdHistoryDto> fetchHistory(int treatmentId) {
		return historyMasterDao.fetchHistory(treatmentId);
	}

	@Override
	public List<HistoryMaster> centerFamilyHistoryAutoSuggestion(
			String historyName, String historyCode) {
		// TODO Auto-generated method stub
		return historyMasterDao.centerFamilyHistoryAutoSuggestion(historyName,historyCode);
	}


	@Override
	public boolean deleteDDHistory(Integer his_Id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return historyMasterDao.deleteDDHistory(his_Id,request);
	}

	
	

}
