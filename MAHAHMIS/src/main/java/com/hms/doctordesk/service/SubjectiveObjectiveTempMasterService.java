package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.dto.FindingMaster;
import com.hms.doctordesk.dto.SubjectiveObjectiveDto;
import com.hms.doctordesk.dto.SubjectiveObjectiveTempMasterDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;

public interface SubjectiveObjectiveTempMasterService {

	int saveSubjectiveObj(SubjectiveObjectiveTempMasterDto subjectiveObjectiveTempDto , HttpServletRequest request);

	List<SubjectiveObjectiveTempMasterDto> getAllSubObjective(HttpServletRequest request);

	SubjectiveObjectiveTempMasterDto editSubObjMaster(Integer subObjTempId);

	boolean deleteSubObjMaster(Integer subObjTempId, HttpServletRequest request);

	List<SubjectiveObjectiveTempMasterDto> subjectiveObjAutoSuggestion(String subTempName);

	List<SubjectiveObjectiveDto> fetchSubjectiveTypeMaster();

	int saveFindingMaster(FindingMaster findingMaster, HttpServletRequest request);

	List<FindingMaster> getAllFindingMasters(HttpServletRequest request);

	FindingMaster editFindingMaster(Integer findingMasterId);

	boolean deletFindingMaster(Integer findingMasterId, HttpServletRequest request);

	List<FindingMaster> FindingMasterAutoSuggestion(String findingName);

	List<DdOrganMasterDTO> getBodyParts(HttpServletRequest request);

	List<HospitalSpecialisationDto> getAllSpeciality(HttpServletRequest request);
	
}
