package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabProfileDao;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.LabProfileService;
import com.hms.pathology.dto.LabTestDTO;

@Service
@Transactional
public class LabProfileServiceImpl implements LabProfileService {

	@Autowired
	LabProfileDao labProfileDao;
	
	
	@Override
	public LabProfileDTO getLabProfiles(String searchText, String type,Integer startIndex) {
		return labProfileDao.getLabProfiles(searchText, type,startIndex);
	}

	@Override
	public LabTestDTO getTestUnderHeading(Integer headingId) {
		return labProfileDao.fetchTestUnderHeading(headingId);
	}

	@Override
	public String saveLabProfiles(LabProfileDTO dto, String testList, String outLabDetails, String reagentDetails) {
		return labProfileDao.saveLabProfiles(dto, testList, outLabDetails, reagentDetails);
	}

	@Override
	public boolean deleteLabProfile(Integer profileId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		
		return labProfileDao.deleteLabProfile(profileId, userId);
	}

	@Override
	public LabProfileDTO getProfileById(Integer profileId) {
		return labProfileDao.getProfileById(profileId);
	}

	@Override
	public LabTestDTO filterTestsUnderHeading(Integer headingId, Integer sampleId) {
		return labProfileDao.filterTestsUnderHeading(headingId, sampleId);
	}
	
	@Override
	public boolean deleteOutlabById(String idOutLab, HttpServletRequest request) {
		return labProfileDao.deleteOutlabById(idOutLab, request);
	}

	@Override
	public boolean deleteLabProfileReagentById(Integer id, HttpServletRequest request) {
		return labProfileDao.deleteLabProfileReagentById(id, request);
	}

	@Override
	public SubServiceDto getAllPathologyServices(String searchText) {
		return labProfileDao.getAllPathologyServices(searchText);
	}

	@Override
	public String validateLabProfile(Integer profileId, String profileName, Integer subServiceId) {
		return labProfileDao.validateLabProfile(profileId, profileName, subServiceId);
	}

	@Override
	public Integer updateSequence(Integer profileId, String list) {
		return labProfileDao.updateSequence(profileId, list);
	}

	@Override
	public LabTestDTO searchTestInDragFromTable(String searchName, Integer headingId, Integer sampleId,
			HttpServletRequest request) {
		System.out.println("Service - searchTestInDragFromTable");
		return labProfileDao.searchTestInDragFromTable(searchName, headingId, sampleId, request);
	}
}