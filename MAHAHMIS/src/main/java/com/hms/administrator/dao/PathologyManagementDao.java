package com.hms.administrator.dao;

import com.hms.dto.LabMainlab;
import com.hms.dto.LabUnitType;
import com.hms.dto.Laborgans;

public interface PathologyManagementDao {

	public String saveLabOrgan(Laborgans dto);
	public Laborgans fetchLabOrgans(String searchText, String type); 
	public Laborgans getLabOrganById(int labOrganId);
	public boolean deleteLabOrgan(int labOrganId, int userId);
	
	public String saveLabInfo(LabMainlab dto);
	public LabMainlab getLabInfo();
	
	public String saveUnitType(LabUnitType dto);
	public LabUnitType fetchAllUnitTypes(String searchText, String type);
	public LabUnitType getUnitTypeId(int unitTypeId);
	public boolean deleteUnitType(int unitTypeId, int userId);
}
