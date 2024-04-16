package com.hms.ehat.dao;

import com.hms.ehat.dto.LabOrgansDTO;

public interface LabOrganDao {
	
	public String saveLabOrgan(LabOrgansDTO dto);
	public LabOrgansDTO fetchLabOrgans(String searchText, String type); 
	public LabOrgansDTO getLabOrganById(int labOrganId);
	public boolean deleteLabOrgan(int labOrganId, int userId);
	

}
