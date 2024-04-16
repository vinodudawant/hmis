package com.hms.ivf.service;


import com.hms.ivf.dto.IvfHistoryTempMasterDto;

public interface IvfHistoryService {
	
	int saveIVFHistory(IvfHistoryTempMasterDto obj,String historySlaveList,Integer patientId,Integer treatmentId,Integer ivftreatmentId);
	  
	IvfHistoryTempMasterDto getIVFHistory(Integer ivftreatmentId);
	  
	  int deleteHistorySalve(String  historySlaveId,Integer userId);

}
