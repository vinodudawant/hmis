package com.hms.ehat.dao;

import com.hms.pathology.dto.LabUnitTypeDTO;

public interface LabUnitTypeDao {

	public String saveUnitType(LabUnitTypeDTO dto);
	public LabUnitTypeDTO fetchAllUnitTypes(String searchText, String type);
	public LabUnitTypeDTO getUnitTypeId(int unitTypeId);
	public boolean deleteUnitType(int unitTypeId, int userId);
	public LabUnitTypeDTO getAllUnitTypesList();

	
}
