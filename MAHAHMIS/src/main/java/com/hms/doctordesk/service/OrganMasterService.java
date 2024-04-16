package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dao.OrganMasterDao;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.ehat.dto.StateMasterDto;

public interface OrganMasterService {
	
	int saveOrganMaster(DdOrganMasterDTO organ, HttpServletRequest request);
	
	public List<DdOrganMasterDTO> getAllOrganMaster(HttpServletRequest request);

	boolean deleteOrganMaster(Integer organ_Id, HttpServletRequest request);
	
	public DdOrganMasterDTO editOrganMaster(Integer organ_Id);

	List<DdOrganMasterDTO> getAllOrganMasterAutosuggestion(String organName);
	
	

}
