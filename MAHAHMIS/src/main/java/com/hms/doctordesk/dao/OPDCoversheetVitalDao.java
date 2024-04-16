package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.doctordesk.dto.OPDCoverSheetVitalDTO;

public interface OPDCoversheetVitalDao {
	public List<OPDCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId,Integer unitId,String CallFrom,String userDate);
	 public List<CoversheetVitalInfo>	lstCoversheetVitalInfo(Integer patientId);
}
