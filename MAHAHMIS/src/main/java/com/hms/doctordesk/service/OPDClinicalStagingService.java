package com.hms.doctordesk.service;

import java.util.List;

import com.hms.doctordesk.dto.OPDClinicalStagingDTO;

public interface OPDClinicalStagingService {

	public int saveOPDCinicalStaging(OPDClinicalStagingDTO obj,Integer patientId,Integer treatmentId);
	
	public List<OPDClinicalStagingDTO> getOPDClinicalStagingList(Integer treatmentId,Integer unitId);
	
	public OPDClinicalStagingDTO editOPDClinicalStaging(Integer id);
	
	public int deleteOPDClinicalStaging(String id,Integer userId);
	
}
