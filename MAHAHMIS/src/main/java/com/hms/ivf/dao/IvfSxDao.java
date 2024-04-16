package com.hms.ivf.dao;

import java.util.List;

import com.hms.ivf.dto.IVFCareAdviceDTO;
import com.hms.ivf.dto.IVFSxAdvicedDTO;

public interface IvfSxDao {
public int saveIVFSxAdvice(IVFSxAdvicedDTO obj);
	
	public List<IVFSxAdvicedDTO> getIVFSxAdviceListByTreatmentId(Integer treatmentId,Integer unitId);
	
	public IVFSxAdvicedDTO editIVFSxAdvice(Integer id);
	
	public int deleteIVFSxAdvice(Integer id,Integer userId);
	
public int saveIVFCareAdvice(IVFCareAdviceDTO obj);
	
	public IVFCareAdviceDTO editOPDCareAdvice(Integer id);

}
