package com.hms.ehat.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabInformationDTO;

public interface LabInformationService {
	
	public String saveLabInfo(LabInformationDTO dto, HttpServletRequest request);
	public LabInformationDTO getLabInfo();

}
