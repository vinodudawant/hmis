package com.hms.ehat.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabOrgansDTO;

public interface LabOrganService {
	
	public String saveLabOrgan(LabOrgansDTO dto, HttpServletRequest request);
	public LabOrgansDTO getLabOrgans(String searchText, String type);
	public LabOrgansDTO getLabOrganById(int labOrganId);
	public boolean deleteLabOrgan(int labOrganId, HttpServletRequest request);


}
