package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

 
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.UnitMasterDto;

 

public interface MasterConfigService {

	/** @Sagar 26_May_2017 
	 * declared Methods for Config Master 
	 * ***/
	int saveOrUpdateConfigMaster(String[] configList,HttpServletRequest request, MasterConfigDto configMaster);
	
	List<MasterConfigDto> getConfigMasterListByUnitId(String[] configList,HttpServletRequest request, int i);
 
	List<MasterConfigDto> getConfigMasterListByCount(int count);
	
 	List<MasterConfigDto> getConfigMasterCount();
	
	boolean deleteConfigMaster(int cnfId,HttpServletRequest request);
	  
	
}
