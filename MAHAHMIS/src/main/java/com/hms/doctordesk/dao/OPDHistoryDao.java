package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;

public interface OPDHistoryDao {
	int saveOPDHistory(OPDHistoryMasterDTO obj);
	  
	  OPDHistoryMasterDTO getOPDHistory(Integer treatmentId);
	  
	  OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId);
	  
  public int saveOPDiet(OPDDietMasterDTO obj);
	  
	  public OPDDietMasterDTO editOPDDiet(Integer dietMasterId);
	  
	  public List<OPDDietMasterDTO> getOPDDietListByTreatmentId(Integer treatmentId);
	  
	 public  int deleteOPDDiet(String  dietMasterIds,Integer userId);
	 
	 public List<OPDDietMasterDTO>  getOPDDietListByDietIds(String dietIds);
	 
	 public int saveOPDPatientBMI(OPDBmiMasterDTO obj);
	  
	  public List<OPDBmiMasterDTO> getOPDBMIListByTreatmentId(Integer treatmentId);
	  
	  public OPDBmiMasterDTO editOPDBMI(Integer opdBmiMasterId);
	  
	  public int getPrefixIdByValue(String deptName,String value);
	  
}
