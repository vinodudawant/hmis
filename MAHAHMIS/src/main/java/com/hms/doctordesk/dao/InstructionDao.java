package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.OPDReportInstructionDTO;
import com.hms.doctordesk.dto.TreatmentInstruction;

public interface InstructionDao {

	
	
	
	
	public boolean saveIndividualTreatmentInstruction(String treatmentId,
			String[] individualTreatmentInstructionCheckboxIDArray);

	public boolean savePCAdminInstruction(String treatmentId, Integer pCTreatmentInstructionNameID);

	public List<GroupTemplateMaster> getAutoSuggestionProduct(String letter);

	public List<TreatmentInstruction> fetchPCTreatmentInstruction(Integer treatmentId, HttpServletRequest request);

	public boolean deletePCTreatmentInstruction(String treatmentId, Integer pCTreatmentInstructionNameID);

	public List<OPDReportInstructionDTO> fetchIndividualTreatmentInstruction(Integer treatmentId);

	public List<String> fetchPCTreatmentInstruction(Integer treatmentId);
	
	public List<String> fetchPCTreatmentInstructionForPrint(Integer treatmentId);
}
