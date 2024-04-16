package com.hms.doctordesk.service;

import java.util.List;

import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.doctordesk.dto.OPDCoverSheetVitalDTO;
import com.hms.ehat.dto.BillDetailsDto;


public interface OPDCoversheetVitalService {

	public int saveCoversheetVital(String coversheetDetails,Integer patientId,Integer treatmentId);
	
	public List<OPDCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId,Integer unitId,String CallFrom,String userDate);
		
    public List<CoversheetVitalInfo>	lstCoversheetVitalInfo(Integer patientId);
	
}
