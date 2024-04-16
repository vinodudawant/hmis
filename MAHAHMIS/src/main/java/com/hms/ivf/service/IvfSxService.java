package com.hms.ivf.service;

import java.util.List;


import com.hms.ivf.dto.IVFCareAdviceDTO;
import com.hms.ivf.dto.IVFSxAdvicedDTO;

public interface IvfSxService {
	
public int saveIVFSxAdvice(IVFSxAdvicedDTO obj,Integer patientId,Integer treatmentId,Integer ivfTreatmentId);
	
	public List<IVFSxAdvicedDTO> getIVFSxAdviceListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public IVFSxAdvicedDTO editIVFSxAdvice(Integer id);
	
	public int deleteIVFSxAdvice(Integer id,Integer userId);
	
public int saveIVFCareAdvice(IVFCareAdviceDTO obj,Integer patientId,Integer treatmentId,Integer ivfTreatmentId);
	
	public IVFCareAdviceDTO editIVFCareAdvice(Integer id);

}
