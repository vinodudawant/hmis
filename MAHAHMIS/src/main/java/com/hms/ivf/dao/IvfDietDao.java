package com.hms.ivf.dao;

import java.util.List;

import com.hms.ivf.dto.IVFBmiMasterDTO;
import com.hms.ivf.dto.IVFDietDTO;

public interface IvfDietDao {
	public int saveIVFDiet(IVFDietDTO obj);
	  
	  public IVFDietDTO editIVFDiet(Integer dietMasterId);
	  
	  public List<IVFDietDTO> getIVFDietListByTreatmentId(Integer treatmentId);
	  
	 public  int deleteIVFDiet(String  dietMasterIds,Integer userId);
	 
	 public List<IVFDietDTO>  getIVFietListByDietIds(String dietIds);
	 
	 public int saveIVFPatientBMI(IVFBmiMasterDTO obj);
	  
	  public List<IVFBmiMasterDTO> getIVFBMIListByTreatmentId(Integer treatmentId);
	  
	  public IVFBmiMasterDTO editIVFBMI(Integer opdBmiMasterId);

}
