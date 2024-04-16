package com.hms.ivf.dao;

import java.util.List;

import com.hms.doctordesk.dto.CoversheetVitalInfo;
import com.hms.ivf.dto.IvfCoverSheetVitalDTO;

public interface IvfCoversheetVitalDao {
	public List<IvfCoverSheetVitalDTO> getCoversheetTreatmentListByTreatmentId(Integer treatmentId,Integer unitId,String CallFrom,String userDate);
	 public List<CoversheetVitalInfo>	lstCoversheetVitalInfo(Integer patientId);

}
