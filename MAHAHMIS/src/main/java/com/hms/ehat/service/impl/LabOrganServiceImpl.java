package com.hms.ehat.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.LabOrganDao;
import com.hms.ehat.dto.LabOrgansDTO;
import com.hms.ehat.service.LabOrganService;


@Service
@Transactional
public class LabOrganServiceImpl implements LabOrganService {

	@Autowired
	LabOrganDao labOrganDao;
	
	
	@Override
	public String saveLabOrgan(LabOrgansDTO dto, HttpServletRequest request){
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		dto.setUnitId(unitId);
		dto.setCreatedBy(userId);
	
		return labOrganDao.saveLabOrgan(dto);
	}

	@Override
	public LabOrgansDTO getLabOrgans(String searchText, String type) {
		return labOrganDao.fetchLabOrgans(searchText, type);
	}

	@Override
	public LabOrgansDTO getLabOrganById(int labOrganId) {
		return labOrganDao.getLabOrganById(labOrganId);
	}

	@Override
	public boolean deleteLabOrgan(int labOrganId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		return labOrganDao.deleteLabOrgan(labOrganId, userId);
	}

}
