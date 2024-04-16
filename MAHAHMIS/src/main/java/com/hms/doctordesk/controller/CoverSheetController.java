package com.hms.doctordesk.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.AllergyddDto;
import com.hms.doctordesk.dto.CopyFromLastTreatment;
import com.hms.doctordesk.dto.CurrentEpisodeTemplate;
import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.DoctorDeskPatientDetails;
import com.hms.doctordesk.service.CoverSheetService;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;

@Controller
@RequestMapping(value="/coversheet")
public class CoverSheetController {
	
	@Autowired
	CoverSheetService coverSheetService;
	
	@RequestMapping(value = "/getTreatments", method = RequestMethod.POST)
	@ResponseBody
	public List<DoctorDeskPatientDetails> getTreatments(@RequestParam("patientId")int patientId) {
		List<DoctorDeskPatientDetails> response = coverSheetService.getAllTreatmentByPatId(patientId);
		return response;

	}

	@RequestMapping(value = "/saveAllergyonopoup", method = RequestMethod.POST)
	@ResponseBody
	public String saveallergyonpopup(@RequestBody AllergyddDto allergyddDto,HttpServletRequest request){
		String response = coverSheetService.saveTalergyOnPopup(allergyddDto, request);
		return response;
	}
	
	@RequestMapping(value = "/getAllergyonopoup", method = RequestMethod.POST)
	@ResponseBody
	public List<AllergyddDto> getallergyonpopup(@RequestParam("patId")int patId,HttpServletRequest request){
		List<AllergyddDto> response = coverSheetService.getAllergyddDto(patId);
		return response;
	}
	
	@RequestMapping(value = "/getAllergyonopoupbyid", method = RequestMethod.POST)
	@ResponseBody
	public List<AllergyddDto> getallergyonpopupById(@RequestParam("id")int id,HttpServletRequest request){
		List<AllergyddDto> response = coverSheetService.getAllergyddDtoById(id);
		return response;
	}
	
	
	@RequestMapping(value = "/deleteAllergypopupdata", method = RequestMethod.POST)
	@ResponseBody
	public String deleteallergyonpopup(@RequestParam("id")String id,HttpServletRequest request){
		String response = coverSheetService.deleteAllergy(id, request);
		return response;
	}
	
	@RequestMapping(value = "/makeseropositive", method = RequestMethod.POST)
	@ResponseBody
	public String saveSeropostive(@RequestParam("patid")int id,@RequestParam("flag")int flag){
		String response = coverSheetService.updateFlagFordd(flag, id);
		return response;
	}
	@RequestMapping(value = "/makeemrhighrisk", method = RequestMethod.POST)
	@ResponseBody
	public String saveEmrHighRisk(@RequestParam("treatmentId")int id,@RequestParam("flag")int flag){
		String response = coverSheetService.updateFlagForEmrHighRisk(flag, id);
		return response;
	}
	
	
	
	@RequestMapping(value = "/getSeroflag", method = RequestMethod.POST)
	@ResponseBody
	public List<DoctorDeskPatientDetails> getSeroflg(@RequestParam("patientId")int patientId) {
		List<DoctorDeskPatientDetails> response = coverSheetService.getseroFlag(patientId);
		return response;

	}

	@RequestMapping(value = "/getemrHighriskflag", method = RequestMethod.POST)
	@ResponseBody
	public List<DoctorDeskPatientDetails> getemrHighriskflag(@RequestParam("treatmentId")int treatmentId) {
		List<DoctorDeskPatientDetails> response = coverSheetService.getEmrFlag(treatmentId);
		return response;

	}
	
	@RequestMapping(value = "/getFolderInfo", method = RequestMethod.POST)
	@ResponseBody
	public List<FolderDocDto> folderinfo(@RequestParam("folderId")int folderid) {
		List<FolderDocDto> response = coverSheetService.getFolderInfo(folderid);
		return response;

	}
	@RequestMapping(value = "/getDocs", method = RequestMethod.POST)
	@ResponseBody
	public List<DocUploadDto> getDocs(@RequestParam("patientId")int patientId,@RequestParam("folderId")int folderId) {
		List<DocUploadDto> response = coverSheetService.getUplodedDocument(patientId,folderId);
		return response;
	}
	@RequestMapping(value = "/deletedocs", method = RequestMethod.POST)
	@ResponseBody
	public String deleteDocs(@RequestParam("id")String id,HttpServletRequest request){
		String response = coverSheetService.deleteDocs(id, request);
		return response;
	}
	@RequestMapping(value = "/copyfromlast", method = RequestMethod.POST)
	@ResponseBody
	public String savecopy(CopyFromLastTreatment copyFromLastTreatment,HttpServletRequest request,@RequestParam("callfrom")String callfrom){
		String response = coverSheetService.copyfromLastTreatment(copyFromLastTreatment,request,callfrom);
		return response;
	}
	
	@RequestMapping(value = "/fetchinstpatwise", method = RequestMethod.POST)
	@ResponseBody
	public List<DoctorDeskInstructionDto> savecopy(@RequestParam("patientId")int patientid){
		List<DoctorDeskInstructionDto> response = coverSheetService.fetchpatientVise(patientid);
		return response;
	}
	
	
	@RequestMapping(value = "/savetemplate", method = RequestMethod.POST)
	@ResponseBody
	public String saveTemplate(@RequestBody CurrentEpisodeTemplate currentEpisodeTemplate,HttpServletRequest request){
		String response = coverSheetService.saveAsTemplate(currentEpisodeTemplate, request);
		return response;
	}
	
	@RequestMapping(value = "/getcpTemps", method = RequestMethod.POST)
	@ResponseBody
	public List<CurrentEpisodeTemplate> templatelist(HttpServletRequest request) {
		List<CurrentEpisodeTemplate> response = coverSheetService.getTemplateList(request);
		return response;
	}
	
	@RequestMapping(value = "/getcpTempsById", method = RequestMethod.POST)
	@ResponseBody
	public List<CurrentEpisodeTemplate> templatelistById(@RequestParam("id") int id) {
		List<CurrentEpisodeTemplate> response = coverSheetService.getTemplateListById(id);
		return response;
	}
	
	
	@RequestMapping(value = "/deleteTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String deleteTemplate(@RequestParam("id") int id,HttpServletRequest request){
		String response = coverSheetService.deleteTemplate(id, request);
		return response;
	}
	@RequestMapping(value = "/hospcialization", method = RequestMethod.POST)
	@ResponseBody
	public List<HospitalSpecialisationDto> getHosSpc(HttpServletRequest request,@RequestParam("callfrom") String callfrom){
		List<HospitalSpecialisationDto> response = coverSheetService.getSpcialization(request, callfrom);
		return response;
		
	}
	@RequestMapping(value = "/accessTemplateAutoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public List<CurrentEpisodeTemplate> accessTemplateAutoSuggestion(@RequestParam("templateName") String searchText,@RequestParam("spcName")String spcName,@RequestParam("orgName")String orgName, @RequestParam("type") int type,HttpServletRequest request) {
		//System.out.println("calform" + callform);
		List<CurrentEpisodeTemplate> response = coverSheetService.accessTemplateAutoSuggestion(searchText,spcName,orgName, type,request);
		return response;
	}
	@RequestMapping(value = "/getAccessFavTemplate", method = RequestMethod.POST)
	@ResponseBody
	public List<CurrentEpisodeTemplate> getAccessFavTemplate(@RequestParam("templateName") String searchText,@RequestParam("spcName")String spcName,@RequestParam("orgName")String orgName, @RequestParam("type") int type,HttpServletRequest request) {
		List<CurrentEpisodeTemplate> response = coverSheetService.getAccessFavTemplate(searchText,spcName,orgName, type,request);
		return response;
	}
	

	@RequestMapping(value = "/getoverallAccessTemplateList", method = RequestMethod.POST)
	@ResponseBody
	public List<CurrentEpisodeTemplate> getoverallAccessTemplateList(@RequestParam("spcName") String spcName,@RequestParam("orgName")String orgName,@RequestParam("type") int type,  HttpServletRequest request) {
		List<CurrentEpisodeTemplate> response = coverSheetService.getoverallAccessTemplateList(spcName,orgName,type,request);
		return response;
	}
	@RequestMapping(value = "/rightShift", method = RequestMethod.POST)
	@ResponseBody
	public String rightShift(@RequestParam("id") int id,HttpServletRequest request){
		String response = coverSheetService.rightShift(id, request);
		return response;
	}
	@RequestMapping(value = "/leftShift", method = RequestMethod.POST)
	@ResponseBody
	public String leftShift(@RequestParam("id") int id,HttpServletRequest request){
		String response = coverSheetService.leftShift(id, request);
		return response;
	}
	@RequestMapping(value = "/getAccessTemplateById", method = RequestMethod.POST)
	@ResponseBody
	public List<CurrentEpisodeTemplate> getAccessTemplateById(@RequestParam("id") int id) {
		List<CurrentEpisodeTemplate> response = coverSheetService.getAccessTemplateById(id);
		return response;
	}
	@RequestMapping(value="/getTreatmentType",method = RequestMethod.POST)
	@ResponseBody
	public List<CurrentEpisodeTemplate> getTreatmentType(@RequestParam("id") int id) {
		List<CurrentEpisodeTemplate> response = coverSheetService.getTreatmentType(id);
		return response;
	
	}
}
