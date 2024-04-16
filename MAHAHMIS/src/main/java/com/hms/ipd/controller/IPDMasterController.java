package com.hms.ipd.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;

import javax.ws.rs.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.NursingNotesDTO;
import com.hms.dto.PrescriptionInstruction;
import com.hms.ipd.dto.BedStateSettingDTO;
import com.hms.ipd.dto.DoctorRoundTempDTO;
import com.hms.ipd.service.IPDMasterService;

@Controller
@RequestMapping(value = "/ipdmaster")
public class IPDMasterController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	private @Autowired IPDMasterService ipdMasterService;

	@ResponseBody
	@RequestMapping(value="/saveNursingNotes", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public String saveNursingNotes( NursingNotesDTO nursingNotes) {
		LOGGER.info("IPDMasterController method saveNursingNotes called");
		return ipdMasterService.saveNursingNotes(nursingNotes);
	}
	
	@ResponseBody
	@RequestMapping(value="/fetchNursingNotes", method = RequestMethod.GET)
	public List<NursingNotesDTO> fetchNursingNotes() {
		LOGGER.info("IPDMasterController method fetchNursingNotes all called");
		return ipdMasterService.fetchNursingNotes();
	}

	@ResponseBody
	@RequestMapping(value="/fetchNursingNotes/{id}", method = RequestMethod.GET)
	public NursingNotesDTO fetchNursingNotes(@PathVariable("id") Integer id) {
		LOGGER.info("IPDMasterController method fetchNursingNotes by ID called");
		return ipdMasterService.fetchNursingNotes(id);
	}
	
	@ResponseBody
	@RequestMapping(value="/deletehNursingNotes/{id}", method = RequestMethod.DELETE)
	public String deletehNursingNotes(@PathVariable("id") Integer id) {
		LOGGER.info("IPDMasterController method deletehNursingNotes by ID called");
		return ipdMasterService.deletehNursingNotes(id);
	}
	
	@ResponseBody
	@RequestMapping(value="/savePrescriptionInstruction", method = RequestMethod.POST)
	public String savePrescriptionInstruction( PrescriptionInstruction prescriptionInstruction) {
		LOGGER.info("IPDMasterController method savePrescriptionInstruction called");
		return ipdMasterService.savePrescriptionInstruction(prescriptionInstruction);
	}
	
	@ResponseBody
	@RequestMapping(value="/fetchPrescriptionInstructionSearch", method = RequestMethod.GET)
	public PrescriptionInstruction  fetchPrescriptionInstructionSearch(@RequestParam ("search") String search) {
		LOGGER.info("IPDMasterController method fetchPrescriptionInstructionSearch called");
		List<PrescriptionInstruction> list=ipdMasterService.fetchPrescriptionInstructionSearch(search);
		PrescriptionInstruction prescriptionInstruction = new PrescriptionInstruction();
		prescriptionInstruction.setPrescriptionInstructionList(list);
		return prescriptionInstruction;
	}
	
	@ResponseBody
	@RequestMapping(value="/deletePrescriptionInstruction/{id}", method = RequestMethod.DELETE)
	public String deletePrescriptionInstruction(@PathVariable("id") String id) {
		LOGGER.info("IPDMasterController method deletehPrescriptionInstruction by ID called");
		return ipdMasterService.deletePrescriptionInstruction(id);
	}

	@ResponseBody
	@RequestMapping(value = "/saveDoctorRoundTemplate", method = RequestMethod.POST)
	public String saveDoctorRoundTemplate(DoctorRoundTempDTO doctorRoundTemp) {
		return ipdMasterService.saveDoctorRoundTemplate(doctorRoundTemp);
	}
	
	@ResponseBody
	@RequestMapping(value = "/deleteDoctorRoundTemplate/{id}", method = RequestMethod.DELETE)
	public String deleteDoctorRoundTemplate(@PathVariable("id") Integer id) {
		return ipdMasterService.deleteDoctorRoundTemplate(id);
	}
	
	@ResponseBody
	@RequestMapping(value="/searchNursingNotes", method = RequestMethod.GET)
	public List<NursingNotesDTO> searchNursingNotes(@RequestParam ("search") String search) {
		LOGGER.info("IPDMasterController method fetchNursingNotes by ID called");
		return ipdMasterService.searchNursingNotes(search);
	}
	
	@ResponseBody
	@RequestMapping(value="/saveUpdateBedStateSetting", method = RequestMethod.POST, consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public String saveUpdateBedStateSetting( BedStateSettingDTO bedStateSetting) {
		LOGGER.info("IPDMasterController method saveNursingNotes called");
		return ipdMasterService.saveUpdateBedStateSetting(bedStateSetting);
	}
	
	
	@ResponseBody
	@RequestMapping(value="/fetchBedStateSettingList", method = RequestMethod.GET)
	public List<BedStateSettingDTO> fetchBedStateSettingList() {
		LOGGER.info("IPDMasterController method fetchBedStateSettingList all called");
		return ipdMasterService.fetchBedStateSettingList();
	}
	
	@ResponseBody
	@RequestMapping(value = "/getNotesbyHeadnoteId", method = RequestMethod.POST)
	public String getNotesbyHeadnoteId(@RequestParam ("noteId") Integer noteId) {
		
		LOGGER.info("In IPDMasterController getNotesbyHeadnoteId()");
		return	 ipdMasterService.getNotesbyHeadnoteId(noteId);

	}
}
