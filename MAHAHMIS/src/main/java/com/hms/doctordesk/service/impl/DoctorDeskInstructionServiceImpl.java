package com.hms.doctordesk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.DoctorDeskInstructionDao;
import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.OPDReportInstructionDTO;
import com.hms.doctordesk.service.DoctorDeskInstructionService;

@Service
@Transactional
public class DoctorDeskInstructionServiceImpl implements DoctorDeskInstructionService{

	@Autowired
	DoctorDeskInstructionDao doctordeskinstructiondao;

	@Override
	public List<GroupInstructionMaster> fetchGroupInstructionMaster(String value) {
		return doctordeskinstructiondao.fetchGroupInstructionMaster(value);
	}

	@Override
	public List<GroupTemplateMaster> fetchGroupTemplateInstructionMaster(String value) {
		return  doctordeskinstructiondao.fetchGroupTemplateInstructionMaster(value);
	}

	@Override
	public GroupTemplateMaster fetchtamplategroup(String value) {
		return doctordeskinstructiondao.fetchtamplategroup(value);
	}

	@Override
	public Integer saveInstructionDd(String obj) {
		return doctordeskinstructiondao. saveInstructionDd(obj);
	}

	@Override
	public List<DoctorDeskInstructionDto> fetchInstruction(Integer tid) {
		return doctordeskinstructiondao.fetchInstruction(tid);
	}

	@Override
	public Doctordeskopderdto coverShitInformationPatient(Integer t_id, Integer d_id) {
		return doctordeskinstructiondao.coverShitInformationPatient(t_id, d_id);
	}
	
	@Override
	public int saveIndivisualInstruction(OPDReportInstructionDTO obj) {
		
		return doctordeskinstructiondao.saveIndivisualInstruction(obj);
	}

	@Override
	public List<OPDReportInstructionDTO> getListOfIndivisualInstruction() {
		// TODO Auto-generated method stub
		return doctordeskinstructiondao.getListOfIndivisualInstruction();
	}

	@Override
	public int deleteIndivisualInstruction(String instructionId, Integer userId) {
		// TODO Auto-generated method stub
		return doctordeskinstructiondao.deleteIndivisualInstruction(instructionId, userId);
	}

	@Override
	public OPDReportInstructionDTO editIndivisualInstruction(Integer instructionId) {
		// TODO Auto-generated method stub
		return doctordeskinstructiondao.editIndivisualInstruction(instructionId);
	}

	@Override
	public List<OPDReportInstructionDTO> getIndivisualInstructions(Integer unitId, Integer treatmentId) {
		// TODO Auto-generated method stub
		return doctordeskinstructiondao.getIndivisualInstructions(unitId, treatmentId);
	}
}
