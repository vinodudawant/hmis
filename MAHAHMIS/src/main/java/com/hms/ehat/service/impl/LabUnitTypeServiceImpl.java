package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabUnitTypeDao;
import com.hms.ehat.service.LabUnitTypeService;
import com.hms.pathology.dto.LabUnitTypeDTO;


@Service
@Transactional
public class LabUnitTypeServiceImpl implements LabUnitTypeService {
	
	@Autowired
	LabUnitTypeDao labUnitTypeDao;

	@Override
	public String saveUnitType(LabUnitTypeDTO dto, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
				dto.setUnitId(unitId);
				dto.setCreatedBy(userId);
		return labUnitTypeDao.saveUnitType(dto);
	}

	@Override
	public LabUnitTypeDTO getAllUnitTypes(String searchText, String type) {
		return labUnitTypeDao.fetchAllUnitTypes(searchText, type);
	}

	@Override
	public LabUnitTypeDTO getUnitTypeById(int unitTypeId) {
		return labUnitTypeDao.getUnitTypeId(unitTypeId);
	}

	@Override
	public boolean deleteUnitType(int unitTypeId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		
		return labUnitTypeDao.deleteUnitType(unitTypeId, userId);
	}

	@Override
	public LabUnitTypeDTO getallunittypeslist() {
		return labUnitTypeDao.getAllUnitTypesList();
	}

}
