package com.hms.ivf.dao;

import com.hms.ivf.dto.IvfHistoryTempMasterDto;

public interface IvfHistoryDao {

	int saveIVFHistory(IvfHistoryTempMasterDto obj);
	  
	IvfHistoryTempMasterDto getIVFHistory(Integer ivftreatmentId);
}
