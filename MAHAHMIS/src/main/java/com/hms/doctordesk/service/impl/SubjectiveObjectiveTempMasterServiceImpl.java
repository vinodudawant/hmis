package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.SubjectiveObjectiveTempMasterDao;
import com.hms.doctordesk.dto.DdOrganMasterDTO;
import com.hms.doctordesk.dto.FindingMaster;
import com.hms.doctordesk.dto.SubjectiveObjectiveDto;
import com.hms.doctordesk.dto.SubjectiveObjectiveTempMasterDto;
import com.hms.doctordesk.service.SubjectiveObjectiveTempMasterService;
import com.hms.ehat.dto.HospitalSpecialisationDto;

@Service
@Transactional
public class SubjectiveObjectiveTempMasterServiceImpl implements SubjectiveObjectiveTempMasterService{

	@Autowired
	SubjectiveObjectiveTempMasterDao subjObjectiveTempDao;
	
	
	@Override
	public int saveSubjectiveObj(SubjectiveObjectiveTempMasterDto subjectiveObjectiveTempDto, HttpServletRequest request) {
		
		return subjObjectiveTempDao.saveSubjectiveObj(subjectiveObjectiveTempDto, request);
	}


	@Override
	public List<SubjectiveObjectiveTempMasterDto> getAllSubObjective(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.getAllSubObjective(request);
	}


	@Override
	public SubjectiveObjectiveTempMasterDto editSubObjMaster(Integer subObjTempId) {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.editSubObjMaster(subObjTempId);
	}


	@Override
	public boolean deleteSubObjMaster(Integer subObjTempId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1"); 
		
		return subjObjectiveTempDao.deleteSubObjMaster(subObjTempId , userId);
	}


	@Override
	public List<SubjectiveObjectiveTempMasterDto> subjectiveObjAutoSuggestion(String subTempName) {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.subjectiveObjAutoSuggestion(subTempName);
	}


	@Override
	public List<SubjectiveObjectiveDto> fetchSubjectiveTypeMaster() {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.fetchSubjectiveTypeMaster();
	}


	@Override
	public int saveFindingMaster(FindingMaster findingMaster, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.saveFindingMaster(findingMaster , request);
	}


	@Override
	public List<FindingMaster> getAllFindingMasters(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.getAllFindingMasters( request );
	}


	@Override
	public FindingMaster editFindingMaster(Integer findingMasterId) {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.editFindingMaster( findingMasterId );
	}


	@Override
	public boolean deletFindingMaster(Integer findingMasterId, HttpServletRequest request) {
		// TODO Auto-generated method deletFindingMasterstub
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1"); 
		
		return subjObjectiveTempDao.deletFindingMaster( findingMasterId , userId);
	}


	@Override
	public List<FindingMaster> FindingMasterAutoSuggestion(String findingName) {
		// TODO Auto-generated method stub
		return subjObjectiveTempDao.FindingMasterAutoSuggestion( findingName);
	}


	@Override
	public List<DdOrganMasterDTO> getBodyParts(HttpServletRequest request) {
		return subjObjectiveTempDao.getBodyParts(request);
	}


	@Override
	public List<HospitalSpecialisationDto> getAllSpeciality(HttpServletRequest request) {
		return subjObjectiveTempDao.getAllSpeciality(request);
	}


	

	
}
