package com.hms.ehat.dao;

import com.hms.ehat.dto.LabInformationDTO;

public interface LabInformationDao {

	public String saveLabInfo(LabInformationDTO dto);
	public LabInformationDTO getLabInfo();
	
	
}
