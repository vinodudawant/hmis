package com.hms.doctordesk.service;

import com.hms.doctordesk.dto.IPDHistoryTemplateMasterDTO;

public interface IPDHistoryTemplateService {
	int saveIPDHistorytemplate(IPDHistoryTemplateMasterDTO obj,String historySlaveList);
	  
	IPDHistoryTemplateMasterDTO getIPDHistorytemplateById(Integer id);
	  
	IPDHistoryTemplateMasterDTO getIPDHistoryTemplateList(Integer unitId);
	  
	  int deleteIPDHistorytemplateSalve(String  historySlaveId,Integer userId);
	
}
