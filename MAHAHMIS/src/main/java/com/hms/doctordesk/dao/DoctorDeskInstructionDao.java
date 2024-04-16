package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.OPDReportInstructionDTO;

public interface DoctorDeskInstructionDao {

	List<GroupInstructionMaster>  fetchGroupInstructionMaster(String value);
	List<GroupTemplateMaster> fetchGroupTemplateInstructionMaster(String value);
	GroupTemplateMaster fetchtamplategroup(String value);
	Integer  saveInstructionDd(String obj);
	List<DoctorDeskInstructionDto>  fetchInstruction(Integer tid);
	Doctordeskopderdto coverShitInformationPatient(Integer t_id,Integer d_id);
	
	public int  saveIndivisualInstruction(OPDReportInstructionDTO obj);
	   
	   public List<OPDReportInstructionDTO> getListOfIndivisualInstruction();
	   
	   public int deleteIndivisualInstruction(String instructionId,Integer userId);
	   
	   public OPDReportInstructionDTO editIndivisualInstruction(Integer instructionId);
	   
	   public List<OPDReportInstructionDTO>  getIndivisualInstructions(Integer unitId, Integer treatmentId);
}
