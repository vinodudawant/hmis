package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabInformationDao;
import com.hms.ehat.dto.LabInformationDTO;
import com.hms.ehat.service.LabInformationService;

@Service
@Transactional
public class LabInformationServiceImpl implements LabInformationService {

	@Autowired
	LabInformationDao labInformationDao;
	

	@Override
	public String saveLabInfo(LabInformationDTO dto, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		dto.setUnitId(unitId);
		if(dto.getIdOwnLab() == 0)
			dto.setCreatedBy(userId);
		else
			dto.setUpdatedBy(userId);
		
		return labInformationDao.saveLabInfo(dto);
	}

	@Override
	public LabInformationDTO getLabInfo() {
		return labInformationDao.getLabInfo();
	}

}
