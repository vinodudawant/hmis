package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.PathologyManagementDao;
import com.hms.administrator.service.PathologyManagementService;
import com.hms.dto.LabMainlab;
import com.hms.dto.LabUnitType;
import com.hms.dto.Laborgans;

@Service
@Transactional
public class PathologyManagementServiceImpl implements PathologyManagementService {

	@Autowired
	PathologyManagementDao pathologyDao;
	
	
	@Override
	public String saveLabOrgan(Laborgans dto, HttpServletRequest request){
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		//dto.setUnitId(unitId);
		//dto.setCreatedBy(userId);
	
		return pathologyDao.saveLabOrgan(dto);
	}

	@Override
	public Laborgans getLabOrgans(String searchText, String type) {
		return pathologyDao.fetchLabOrgans(searchText, type);
	}

	@Override
	public Laborgans getLabOrganById(int labOrganId) {
		return pathologyDao.getLabOrganById(labOrganId);
	}

	@Override
	public boolean deleteLabOrgan(int labOrganId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		return pathologyDao.deleteLabOrgan(labOrganId, userId);
	}

	@Override
	public String saveLabInfo(LabMainlab dto, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
		/*dto.setUnitId(unitId);
		if(dto.getIdownlab() == 0)
			dto.setCreatedBy(userId);
		else
			dto.setUpdatedBy(userId);*/
		
		return pathologyDao.saveLabInfo(dto);
	}

	@Override
	public LabMainlab getLabInfo() {
		return pathologyDao.getLabInfo();
	}

	@Override
	public String saveUnitType(LabUnitType dto, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		
				//dto.setUnitId(unitId);
				//dto.setCreatedBy(userId);
		return pathologyDao.saveUnitType(dto);
	}

	@Override
	public LabUnitType getAllUnitTypes(String searchText, String type) {
		return pathologyDao.fetchAllUnitTypes(searchText, type);
	}

	@Override
	public LabUnitType getUnitTypeById(int unitTypeId) {
		return pathologyDao.getUnitTypeId(unitTypeId);
	}

	@Override
	public boolean deleteUnitType(int unitTypeId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		
		return pathologyDao.deleteUnitType(unitTypeId, userId);
	}
}
