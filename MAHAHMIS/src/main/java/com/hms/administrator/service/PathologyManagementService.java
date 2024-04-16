package com.hms.administrator.service;

import javax.servlet.http.HttpServletRequest;
import com.hms.dto.LabMainlab;
import com.hms.dto.LabUnitType;
import com.hms.dto.Laborgans;

public interface PathologyManagementService {

	public String saveLabOrgan(Laborgans dto, HttpServletRequest request);
	public Laborgans getLabOrgans(String searchText, String type);
	public Laborgans getLabOrganById(int labOrganId);
	public boolean deleteLabOrgan(int labOrganId, HttpServletRequest request);
	
	public String saveLabInfo(LabMainlab dto, HttpServletRequest request);
	public LabMainlab getLabInfo();
	
	public String saveUnitType(LabUnitType dto, HttpServletRequest request);
	public LabUnitType getAllUnitTypes(String searchText, String type);
	public LabUnitType getUnitTypeById(int unitTypeId);
	public boolean deleteUnitType(int unitTypeId, HttpServletRequest request);
}
