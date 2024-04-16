package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.UnitMasterDto;

 

public interface MasterConfigDao {
	
	/**
	 * @Sagar 26_May_2017 declared Methods for Config Master
	 * ***/
	int saveOrUpdateConfigMaster(String[] configList ,MasterConfigDto configMaster,String setCount);
 	List<MasterConfigDto> getConfigMasterListByCount(int count);
 	List<MasterConfigDto> getConfigMasterCount();
	List<MasterConfigDto> getConfigMasterListByUnitId(String[] configList ,int i);
 	boolean deleteConfigMaster(int deptId,Integer userId);
	
	

}
