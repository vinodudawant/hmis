package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.LabGradingsDao;
import com.hms.ehat.dto.LabGradingsDto;
import com.hms.ehat.service.LabGradingsService;
import com.hms.pathology.dto.LabTestDTO;

@Service
@Transactional
public class LabGradingsServiceImpl implements LabGradingsService {

	@Autowired
	LabGradingsDao labGradingsDao;
	
	@Override
	public Integer saveLabGrading(LabGradingsDto labGradingsDto, HttpServletRequest request) {
		return labGradingsDao.saveLabGrading(labGradingsDto, request);
	}

	@Override
	public List<LabGradingsDto> getAllGradings(Integer unitId) {
		return labGradingsDao.getAllGradings(unitId);
	}

	@Override
	public LabGradingsDto editLabGrading(Integer id, HttpServletRequest request) {
		return labGradingsDao.editLabGrading(id, request);
	}

	@Override
	public boolean deleteLabGrading(Integer id, HttpServletRequest request) {
		return labGradingsDao.deleteLabGrading(id, request);
	}

	@Override
	public List<LabGradingsDto> searchGradings(String name, Integer unitId, HttpServletRequest request) {
		return labGradingsDao.searchGradings(name, unitId, request);
	}

	@Override
	public List<LabTestDTO> getAllLabTests(Integer unitId) {
		return labGradingsDao.getAllLabTests(unitId);
	}
}