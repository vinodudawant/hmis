package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.doctordesk.dto.OPDClinicalStagingDTO;

public interface OPDClinicalStagingDao {
	
public int saveOPDCinicalStaging(OPDClinicalStagingDTO obj);
	
	public List<OPDClinicalStagingDTO> getOPDClinicalStagingList(Integer treatmentId,Integer unitId);
	
	public OPDClinicalStagingDTO editOPDClinicalStaging(Integer id);
	
	public int deleteOPDClinicalStaging(String id,Integer userId);

}
