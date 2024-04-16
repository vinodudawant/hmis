package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.InstructionDao;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.OPDReportInstructionDTO;
import com.hms.doctordesk.dto.TreatmentInstruction;
import com.hms.doctordesk.service.InstructionService;

@Service
@Transactional
public class InstructionServiceImpl implements InstructionService{
	
	
	
	@Autowired
	InstructionDao instructionDao;

	@Override
	public boolean saveIndividualTreatmentInstruction(String treatmentId,
			String[] individualTreatmentInstructionCheckboxIDArray) {
		return instructionDao.saveIndividualTreatmentInstruction(treatmentId,individualTreatmentInstructionCheckboxIDArray);
	}

	@Override
	public boolean savePCAdminInstruction(String treatmentId, Integer pCTreatmentInstructionNameID) {
		// TODO Auto-generated method stub
		return instructionDao.savePCAdminInstruction(treatmentId,pCTreatmentInstructionNameID);
	}

	@Override
	public List<GroupTemplateMaster> getAutoSuggestionProduct(String letter) {
		// TODO Auto-generated method stub
		return instructionDao.getAutoSuggestionProduct(letter);
	}

	@Override
	public List<TreatmentInstruction> fetchPCTreatmentInstruction(Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return instructionDao.fetchPCTreatmentInstruction(treatmentId,request);
	}

	@Override
	public boolean deletePCTreatmentInstruction(String treatmentId, Integer pCTreatmentInstructionNameID) {
		// TODO Auto-generated method stub
		return instructionDao.deletePCTreatmentInstruction(treatmentId,pCTreatmentInstructionNameID);
	}

	@Override
	public List<OPDReportInstructionDTO> fetchIndividualTreatmentInstruction(Integer treatmentId) {
		// TODO Auto-generated method stub
		return instructionDao.fetchIndividualTreatmentInstruction(treatmentId);
	}

	@Override
	public List<String> fetchPCTreatmentInstruction(Integer treatmentId) {
		// TODO Auto-generated method stub
		return instructionDao.fetchPCTreatmentInstruction(treatmentId);
	}
	
	@Override
	public List<String> fetchPCTreatmentInstructionForPrint(Integer treatmentId) {
		// TODO Auto-generated method stub
		return instructionDao.fetchPCTreatmentInstructionForPrint(treatmentId);
	}

}
