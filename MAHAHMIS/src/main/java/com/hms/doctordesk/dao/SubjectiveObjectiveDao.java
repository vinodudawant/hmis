package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.SubjectiveObjectiveDto;

public interface SubjectiveObjectiveDao {
	int saveSubjectiveMaster(SubjectiveObjectiveDto subjective,
			HttpServletRequest request);
	
	public List<SubjectiveObjectiveDto> getAllSubjectiveMaster(
			HttpServletRequest request);
	
	  public SubjectiveObjectiveDto editSubjectiveMaster(Integer subId);
      
     // public int deleteSubjectiveDTO(Integer subId);

	boolean deleteSubjectiveDTO(Integer subId, Integer userdId);
	
	List<SubjectiveObjectiveDto> getAllSubjectiveMasterAutosuggestion(
			String subjectiveObjectivetempType);

}
