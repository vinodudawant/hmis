package com.hms.ipd.service;

import java.util.List;

import com.hms.dto.NursingNotesDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.ipd.dto.BedStateSettingDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;

public interface IPDMasterService {

	String saveNursingNotes(NursingNotesDTO nursingNotes);

	List<NursingNotesDTO> fetchNursingNotes();

	NursingNotesDTO fetchNursingNotes(Integer id);

	String deletehNursingNotes(Integer id);

	String savePrescriptionInstruction(PrescriptionInstruction prescriptionInstruction);

	List<PrescriptionInstruction>  fetchPrescriptionInstructionSearch(String search);

	String deletePrescriptionInstruction(String id);

	String saveDoctorRoundTemplate(DoctorRoundTempDTO doctorRoundTemp);

	String deleteDoctorRoundTemplate(Integer id);

	List<NursingNotesDTO> searchNursingNotes(String search);

	String saveUpdateBedStateSetting(BedStateSettingDTO bedStateSetting);

	List<BedStateSettingDTO> fetchBedStateSettingList();

	String getNotesbyHeadnoteId(Integer noteId);


}
