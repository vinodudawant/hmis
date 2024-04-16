package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.CoverSheetDao;
import com.hms.doctordesk.dto.AllergyddDto;
import com.hms.doctordesk.dto.CopyFromLastTreatment;
import com.hms.doctordesk.dto.CurrentEpisodeTemplate;
import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.DoctorDeskPatientDetails;
import com.hms.doctordesk.service.CoverSheetService;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;

@Service
@Transactional
public class CoverSheetServiceImpl implements CoverSheetService{

	@Autowired
	CoverSheetDao coverSheetDao;

	@Override
	public List<DoctorDeskPatientDetails> getAllTreatmentByPatId(int patientId) {
		// TODO Auto-generated method stub
		return coverSheetDao.getAllTreatmentByPatId(patientId);
	}

	@Override
	public String saveTalergyOnPopup(AllergyddDto allergyddDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.saveTalergyOnPopup(allergyddDto, request);
	}

	@Override
	public List<AllergyddDto> getAllergyddDto(int patientId) {
		// TODO Auto-generated method stub
		return coverSheetDao.getAllergyddDto(patientId);
	}

	@Override
	public List<AllergyddDto> getAllergyddDtoById(int id) {
		// TODO Auto-generated method stub
		return coverSheetDao.getAllergyddDtoById(id);
	}

	@Override
	public String deleteAllergy(String id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.deleteAllergy(id, request);
	}

	@Override
	public String updateFlagFordd(int flag, int patientId) {
		// TODO Auto-generated method stub
		return coverSheetDao.updateFlagFordd(flag, patientId);
	}

	@Override
	public List<DoctorDeskPatientDetails> getseroFlag(int patientId) {
		// TODO Auto-generated method stub
		return coverSheetDao.getseroFlag(patientId);
	}

	@Override
	public String updateFlagForEmrHighRisk(int flag, int treatmentId) {
		// TODO Auto-generated method stub
		return coverSheetDao.updateFlagForEmrHighRisk(flag, treatmentId);
	}

	@Override
	public List<DoctorDeskPatientDetails> getEmrFlag(int treatmentId) {
		// TODO Auto-generated method stub
		return coverSheetDao.getEmrFlag(treatmentId);
	}

	@Override
	public List<FolderDocDto> getFolderInfo(int folderId) {
		// TODO Auto-generated method stub
		return coverSheetDao.getFolderInfo(folderId);
	}

	

	@Override
	public List<DocUploadDto> getUplodedDocument(int patientId, int folderId) {
		// TODO Auto-generated method stub
		return coverSheetDao.getUplodedDocument(patientId, folderId);
	}

	@Override
	public String deleteDocs(String id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.deleteDocs(id, request);
	}

	
	@Override
	public String copyfromLastTreatment(
			CopyFromLastTreatment copyFromLastTreatment,HttpServletRequest request,String callfrom) {
		// TODO Auto-generated method stub
		return coverSheetDao.copyfromLastTreatment(copyFromLastTreatment,request,callfrom);
	}

	@Override
	public List<DoctorDeskInstructionDto> fetchpatientVise(int patientId) {
		// TODO Auto-generated method stub
		return coverSheetDao.fetchpatientVise(patientId);
	}

	@Override
	public String saveAsTemplate(CurrentEpisodeTemplate currentEpisodeTemplate,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.saveAsTemplate(currentEpisodeTemplate, request);
	}

	@Override
	public List<CurrentEpisodeTemplate> getTemplateList(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.getTemplateList(request);
	}

	@Override
	public List<CurrentEpisodeTemplate> getTemplateListById(int id) {
		// TODO Auto-generated method stub
		return coverSheetDao.getTemplateListById(id);
	}

	@Override
	public String deleteTemplate(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.deleteTemplate(id, request);
	}

	@Override
	public List<HospitalSpecialisationDto> getSpcialization(
			HttpServletRequest request, String callfrom) {
		// TODO Auto-generated method stub
		return coverSheetDao.getSpcialization(request, callfrom);
	}

	@Override
	public List<CurrentEpisodeTemplate> accessTemplateAutoSuggestion(
			String searchText,String spcName,String orgName, int type, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.accessTemplateAutoSuggestion(searchText,spcName,orgName,type,request);
	}

	@Override
	public List<CurrentEpisodeTemplate> getoverallAccessTemplateList(
			String spcName,String orgName, int type,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.getoverallAccessTemplateList(spcName,orgName,type,request);
	}

	@Override
	public List<CurrentEpisodeTemplate> getAccessFavTemplate(String searchText,String spcName,String orgName,
			int type, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.getAccessFavTemplate(searchText,spcName,orgName,type,request);
	}

	@Override
	public String rightShift(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.rightShift(id,request);
	}

	@Override
	public String leftShift(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return coverSheetDao.leftShift(id,request);
	}

	@Override
	public List<CurrentEpisodeTemplate> getAccessTemplateById(int id) {
		// TODO Auto-generated method stub
		return coverSheetDao.getAccessTemplateById(id);
	}

	

	@Override
	public List<CurrentEpisodeTemplate> getTreatmentType(int id) {
		// TODO Auto-generated method stub
		return coverSheetDao.getTreatmentType(id);
	}

	
}
