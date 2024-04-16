package com.hms.ipd.serviceimpl;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.NursingNotesDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.ipd.dao.IPDMasterDao;
import com.hms.ipd.dto.BedStateSettingDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;
import com.hms.ipd.service.IPDMasterService;

@Service
@Transactional
public class IPDMasterServiceImpl implements IPDMasterService{


	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	private @Autowired  IPDMasterDao ipdMasterDao;
	
	@Override
	public String saveNursingNotes(NursingNotesDTO nursingNotes) {
		LOGGER.info("IPDMasterServiceImpl method saveNursingNotes called");
		return ipdMasterDao.saveNursingNotes(nursingNotes);
	}

	@Override
	public List<NursingNotesDTO> fetchNursingNotes() {
		LOGGER.info("IPDMasterServiceImpl method fetchNursingNotes called");
		return ipdMasterDao.fetchNursingNotes();
	}

	@Override
	public NursingNotesDTO fetchNursingNotes(Integer id) {
		LOGGER.info("IPDMasterServiceImpl method fetchNursingNotes called");
		return ipdMasterDao.fetchNursingNotes(id);
	}

	@Override
	public String deletehNursingNotes(Integer id) {
		LOGGER.info("IPDMasterServiceImpl method deletehNursingNotes called");
		return ipdMasterDao.deletehNursingNotes(id);
	}

	@Override
	public String savePrescriptionInstruction(PrescriptionInstruction prescriptionInstruction) {
		LOGGER.info("IPDMasterServiceImpl method savePrescriptionInstruction called");
		return ipdMasterDao.savePrescriptionInstruction(prescriptionInstruction);
	}

	@Override
	public List<PrescriptionInstruction>  fetchPrescriptionInstructionSearch(String search) {
		LOGGER.info("IPDMasterServiceImpl method fetchPrescriptionInstructionSearch called");
		return ipdMasterDao.fetchPrescriptionInstructionSearch(search);
	}

	@Override
	public String deletePrescriptionInstruction(String id) {
		LOGGER.info("IPDMasterServiceImpl method deletehPrescriptionInstruction called");
		return ipdMasterDao.deletePrescriptionInstruction(id);
	}

	@Override
	public String saveDoctorRoundTemplate(DoctorRoundTempDTO doctorRoundTemp) {
		LOGGER.info("IPDMasterServiceImpl method saveDoctorRoundTemplate called");
		return ipdMasterDao.saveDoctorRoundTemplate(doctorRoundTemp);
	}

	@Override
	public String deleteDoctorRoundTemplate(Integer id) {
		LOGGER.info("IPDMasterServiceImpl method deleteDoctorRoundTemplate called");
		return ipdMasterDao.deleteDoctorRoundTemplate(id);
	}

	@Override
	public List<NursingNotesDTO> searchNursingNotes(String search) {
		LOGGER.info("IPDMasterServiceImpl method searchNursingNotes called");
		return ipdMasterDao.searchNursingNotes(search);
	}

	@Override
	public String saveUpdateBedStateSetting(BedStateSettingDTO bedStateSetting) {
		LOGGER.info("IPDMasterServiceImpl method saveUpdateBedStateSetting called");
		return ipdMasterDao.saveUpdateBedStateSetting(bedStateSetting);
	}

	@Override
	public List<BedStateSettingDTO> fetchBedStateSettingList() {
		LOGGER.info("IPDMasterServiceImpl method fetchBedStateSettingList called");
		return ipdMasterDao.fetchBedStateSettingList();
	}

	@Override
	public String getNotesbyHeadnoteId(Integer noteId) {
		LOGGER.info("IPDMasterServiceImpl method getNotesbyHeadnoteId called");
		return ipdMasterDao.getNotesbyHeadnoteId(noteId);
	}

}
