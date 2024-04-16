package com.hms.ivf.service;

import java.util.List;

import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.ivf.dto.IVFBmiMasterDTO;
import com.hms.ivf.dto.IVFDietDTO;

public interface IvfDietService {
	
	public int saveIVFDiet(IVFDietDTO obj,Integer patientId,Integer treatmentId,Integer ivftreatmentId);
	  
	  public IVFDietDTO editIVFDiet(Integer dietMasterId);
	  
	  public List<IVFDietDTO> getIVFDietListByTreatmentId(Integer treatmentId);
	  
	 public  int deleteIVFDiet(String  dietMasterIds,Integer userId);
	 
	 public List<IVFDietDTO>  getIVFietListByDietIds(String dietIds);
	 
	 public int saveIVFPatientBMI(IVFBmiMasterDTO obj,Integer patientId,Integer treatmentId,Integer ivftreatmentId);
	  
	  public List<IVFBmiMasterDTO> getIVFBMIListByTreatmentId(Integer treatmentId);
	  
	  public IVFBmiMasterDTO editIVFBMI(Integer opdBmiMasterId);

}
