package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestParam;

import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;

public interface OPDHistoryService {

	  int saveOPDHistory(OPDHistoryMasterDTO obj,String historySlaveList,Integer patientId,Integer treatmentId);
	  
	  OPDHistoryMasterDTO getOPDHistory(Integer treatmentId);
	  
	  OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId);
	  
	  int deleteHistorySalve(String  historySlaveId,Integer userId);
	  
	  public int saveOPDiet(OPDDietMasterDTO obj,Integer patientId,Integer treatmentId);
	  
	  public OPDDietMasterDTO editOPDDiet(Integer dietMasterId);
	  
	  public List<OPDDietMasterDTO> getOPDDietListByTreatmentId(Integer treatmentId);
	  
	 public  int deleteOPDDiet(String  dietMasterIds,Integer userId);
	 
	 public List<OPDDietMasterDTO>  getOPDDietListByDietIds(String dietIds);
	 
	  public int saveOPDPatientBMI(OPDBmiMasterDTO obj,Integer patientId,Integer treatmentId);
	  
	  public List<OPDBmiMasterDTO> getOPDBMIListByTreatmentId(Integer treatmentId);
	  
	  public OPDBmiMasterDTO editOPDBMI(Integer opdBmiMasterId);
	  
	 public  int getPrefixIdByValue(String deptName,String value);
	 
	  //Added By Annapurna
	 public String getMrnno(Integer treatment_id, HttpServletRequest request);
	 
	 public OPDHistoryMasterDTO getPatientHistoryByTemplateId(Integer id,Integer treatmentId, HttpServletRequest request);
	 
	 public  String getConsultantName(Integer treatmentId, Integer userId, Integer dpid);
	
}
