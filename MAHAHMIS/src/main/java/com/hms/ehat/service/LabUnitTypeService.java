package com.hms.ehat.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.pathology.dto.LabUnitTypeDTO;

public interface LabUnitTypeService {
	
	public String saveUnitType(LabUnitTypeDTO dto, HttpServletRequest request);
	public LabUnitTypeDTO getAllUnitTypes(String searchText, String type);
	public LabUnitTypeDTO getUnitTypeById(int unitTypeId);
	public boolean deleteUnitType(int unitTypeId, HttpServletRequest request);
	public LabUnitTypeDTO getallunittypeslist();
	


}
