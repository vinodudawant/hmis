package com.hms.ehat.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dto.LabTestDTO;

public interface LabProfileDao {

	public LabProfileDTO getLabProfiles(String searchText, String type,Integer startIndex);
	public LabTestDTO fetchTestUnderHeading(Integer headingId);
	public String saveLabProfiles(LabProfileDTO dto, String testList, String outLabDetails, String reagentDetails);
	public boolean deleteLabProfile(Integer profileId, Integer userId);
	public LabProfileDTO getProfileById(Integer profileId);
	public LabTestDTO filterTestsUnderHeading(Integer headingId, Integer sampleId);
	public boolean deleteOutlabById(String idOutLab,HttpServletRequest request);
	public boolean deleteLabProfileReagentById(Integer id,HttpServletRequest request);
	public SubServiceDto getAllPathologyServices(String searchText);
	public String validateLabProfile(Integer profileId, String profileName, Integer subServiceId);
	public Integer updateSequence(Integer profileId, String list);
	public LabTestDTO searchTestInDragFromTable(String searchName, Integer headingId, Integer sampleId, HttpServletRequest request);
}