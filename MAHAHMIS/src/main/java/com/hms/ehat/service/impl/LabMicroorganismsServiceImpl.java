package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.LabMicroorganismsDao;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.ehat.service.LabMicroorganismsService;
import com.hms.pathology.dto.LabTestDTO;

@Service
@Transactional
public class LabMicroorganismsServiceImpl implements LabMicroorganismsService {

	@Autowired
	LabMicroorganismsDao labMicroorganismsDao;
	
	@Override
	public Integer saveMicroorganisms(LabMicroorganismsDto labMicroorganismsDto, HttpServletRequest request) {
		return labMicroorganismsDao.saveMicroorganisms(labMicroorganismsDto, request);
	}

	@Override
	public List<LabMicroorganismsDto> getAllMicroorganisms(Integer unitId) {
		return labMicroorganismsDao.getAllMicroorganisms(unitId);
	}

	@Override
	public LabMicroorganismsDto editMicroorganism(Integer id, HttpServletRequest request) {
		return labMicroorganismsDao.editMicroorganism(id, request);
	}

	@Override
	public boolean deleteMicroorganism(Integer id, HttpServletRequest request) {
		return labMicroorganismsDao.deleteMicroorganism(id, request);
	}

	@Override
	public List<LabMicroorganismsDto> searchMicroorganisms(String name, Integer unitId, HttpServletRequest request) {
		return labMicroorganismsDao.searchMicroorganisms(name, unitId, request);
	}

	@Override
	public List<LabTestDTO> getAllLabTests(Integer unitId) {
		return labMicroorganismsDao.getAllLabTests(unitId);
	}
}