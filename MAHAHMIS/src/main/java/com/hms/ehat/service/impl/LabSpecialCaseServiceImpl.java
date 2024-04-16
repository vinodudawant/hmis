package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.LabSpecialCaseDao;
import com.hms.ehat.dto.LabSpecialCasesDTO;
import com.hms.ehat.service.LabSpecialCaseService;

@Service
@Transactional
public class LabSpecialCaseServiceImpl implements LabSpecialCaseService {
	
	@Autowired
	LabSpecialCaseDao labSpecialCaseDao;

	@Override
	public int savespecialcase(LabSpecialCasesDTO labSpecialCasesDTO,
			HttpServletRequest request) {
		return labSpecialCaseDao.savespecialcase(labSpecialCasesDTO, request);
	}

	@Override
	public List<LabSpecialCasesDTO> getAllSpecialCase() {
		return labSpecialCaseDao.getAllSpecialCase();
	}

	@Override
	public LabSpecialCasesDTO editSpecialCaseById(int id,
			HttpServletRequest request) {
		return labSpecialCaseDao.editSpecialCaseById(id, request);
	}

	@Override
	public boolean deleteSpecialCaseById(int id, HttpServletRequest request) {
		return labSpecialCaseDao.deleteSpecialCaseById(id, request);
	}

	@Override
	public List<LabSpecialCasesDTO> searchSpecialCaseByName(String name,
			HttpServletRequest request) {
		return labSpecialCaseDao.searchSpecialCaseByName(name, request);
	}

}
