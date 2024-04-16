package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.web.bind.annotation.RequestParam;

import com.hms.doctordesk.dto.AllergyddDto;
import com.hms.doctordesk.dto.CopyFromLastTreatment;
import com.hms.doctordesk.dto.CurrentEpisodeTemplate;
import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.DoctorDeskPatientDetails;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;

public interface CoverSheetDao {
	
	List<DoctorDeskPatientDetails> getAllTreatmentByPatId(int patientId);
	
	String saveTalergyOnPopup(AllergyddDto allergyddDto,HttpServletRequest request);
	
	List<AllergyddDto> getAllergyddDto(int patientId);
	
	List<AllergyddDto> getAllergyddDtoById(int id);
	
	String deleteAllergy(String id,HttpServletRequest request);
	
	String updateFlagFordd(int flag,int patientId);
	
	List<DoctorDeskPatientDetails> getseroFlag(int patientId);
	
	String updateFlagForEmrHighRisk(int flag,int treatmentId);
	
	List<DoctorDeskPatientDetails> getEmrFlag(int treatmentId);
	
	List<FolderDocDto> getFolderInfo(int folderId);
	
	List<DocUploadDto> getUplodedDocument(int patientId,int folderId);
	
	 String  deleteDocs(String id,HttpServletRequest request);
	 
	 List<DoctorDeskInstructionDto> fetchpatientVise(int patientId);
	 
	 String copyfromLastTreatment(CopyFromLastTreatment copyFromLastTreatment,HttpServletRequest request,String callfrom);
	 
	 String saveAsTemplate(CurrentEpisodeTemplate currentEpisodeTemplate,HttpServletRequest request);
	 
	 List<CurrentEpisodeTemplate> getTemplateList(HttpServletRequest request);
	 
	 List<CurrentEpisodeTemplate> getTemplateListById(int id);
	 
	 String deleteTemplate(int id,HttpServletRequest request);
	 
	 List<HospitalSpecialisationDto> getSpcialization(HttpServletRequest request,String callfrom);

	List<CurrentEpisodeTemplate> accessTemplateAutoSuggestion(
			String searchText,String spcName,String orgName, int type, HttpServletRequest request);

	List<CurrentEpisodeTemplate> getoverallAccessTemplateList(
			String spcName,String orgName, int type,HttpServletRequest request);

	List<CurrentEpisodeTemplate> getAccessFavTemplate(String searchText,String spcName,String orgName,
			int type, HttpServletRequest request);

	String rightShift(int id, HttpServletRequest request);

	String leftShift(int id, HttpServletRequest request);

	List<CurrentEpisodeTemplate> getAccessTemplateById(int id);


	List<CurrentEpisodeTemplate> getTreatmentType(int id);
}
