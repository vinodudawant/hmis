package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.SubjectiveObjectiveDto;

public interface SubjectiveObjectiveService {

	int saveSubjectiveMaster(SubjectiveObjectiveDto subjective,
			HttpServletRequest request);

	public List<SubjectiveObjectiveDto> getAllSubjectiveMaster(
			HttpServletRequest request);
	
	       public SubjectiveObjectiveDto editSubjectiveMaster(Integer subId);
	       
	      //public int deleteSubjectiveDTO(Integer subId);

		boolean deleteSubjectiveDTO(Integer subId, HttpServletRequest request);

		List<SubjectiveObjectiveDto> getAllSubjectiveMasterAutosuggestion(
				String subjectiveObjectivetempType);

	

}
