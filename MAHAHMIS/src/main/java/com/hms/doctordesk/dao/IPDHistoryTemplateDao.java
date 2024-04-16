package com.hms.doctordesk.dao;

import com.hms.doctordesk.dto.IPDHistoryTemplateMasterDTO;

public interface IPDHistoryTemplateDao {
	int saveIPDHistorytemplate(IPDHistoryTemplateMasterDTO obj);
	  
	IPDHistoryTemplateMasterDTO getIPDHistorytemplateById(Integer id);
	  
	IPDHistoryTemplateMasterDTO getIPDHistoryTemplateList(Integer unitId);
	  
	  int deleteIPDHistorytemplateSalve(String  historySlaveId,Integer userId);
}
