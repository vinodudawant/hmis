package com.hms.organdonation.service.impl;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dao.OrganCrossMatchDao;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganRequestDto;
import com.hms.organdonation.service.OrganCrossMatchService;

@Service
@Transactional
public class OrganCrossMatchServiceImpl implements OrganCrossMatchService {
	
	@Autowired
	OrganCrossMatchDao organCrossMatchDao;

	@Override
	public int saveOrganCrossMatch(OrganCrossMatchDto obj, Integer patientId,
			Integer treatmentId,Integer organId,Integer stockDiscardId,Integer rquestId, MultipartFile[]  testResultDocument,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organCrossMatchDao.saveOrganCrossMatch(obj, patientId, treatmentId,organId,stockDiscardId,rquestId,testResultDocument, request);
	}

	@Override
	public OrganCrossMatchDto editOrganCrossMatch(Integer organCrossMatchId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organCrossMatchDao.editOrganCrossMatch(organCrossMatchId, request);
	}

	@Override
	public boolean deleteOrganCrossMatch(Integer organCrossMatchId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organCrossMatchDao.deleteOrganCrossMatch(organCrossMatchId, request);
	}

	@Override
	public List<OrganCrossMatchDto> crossMatchAutoSuggestion(
			Integer organCrossMatchId, String callFrom) {
		// TODO Auto-generated method stub
		return organCrossMatchDao.crossMatchAutoSuggestion(organCrossMatchId, callFrom);
	}

	@Override
	public List<OrganCrossMatchDto> getAllOrganCrossMatchList(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		return organCrossMatchDao.getAllOrganCrossMatchList(request, fromDate, lastDate);
	}

}
