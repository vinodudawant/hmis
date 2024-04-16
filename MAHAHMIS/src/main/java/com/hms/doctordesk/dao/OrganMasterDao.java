package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.ehat.dto.StateMasterDto;


public interface OrganMasterDao {
	
	

	int saveOrganMaster(DdOrganMasterDTO organ, HttpServletRequest request);
	
	public List<DdOrganMasterDTO> getAllOrganMaster(HttpServletRequest request);
	
	boolean deleteOrganMaster(Integer organid, Integer userdId);
	
	public DdOrganMasterDTO editOrganMaster(Integer organ_Id);

	List<DdOrganMasterDTO> getAllOrganMasterAutosuggestion(String organName);
	
	

}
