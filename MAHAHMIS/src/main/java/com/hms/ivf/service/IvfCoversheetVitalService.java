package com.hms.ivf.service;

import java.util.List;

import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.ivf.dto.IvfCoverSheetVitalDTO;

public interface IvfCoversheetVitalService {

	public int saveCoversheetVital(String coversheetDetails,Integer patientId,Integer treatmentId,Integer ivftreatmentId);
	
	public List<IvfCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId,Integer unitId,String CallFrom,String userDate);
		
    public List<CoversheetVitalInfo>	lstCoversheetVitalInfo(Integer patientId);
	
}
