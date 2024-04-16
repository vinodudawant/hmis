package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.doctordesk.dao.RadiationMasterDao;
import com.hms.doctordesk.dto.RadiationDto;
import com.hms.doctordesk.service.RadiationMasterService;
@Service
@Transactional
public class RadiationMasterServiceImpl implements RadiationMasterService {
	
	@Autowired
	RadiationMasterDao radiationDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveRadiationMaster(RadiationDto radio, HttpServletRequest request) {
		return radiationDao.saveRadiationMaster(radio,request);
	}

	@Override
	public List<RadiationDto> getAllRadiationMaster() {
		return radiationDao.getAllRadiationMaster();
	}

	@Override
	public RadiationDto editRadiationMaster(Integer radiationId) {
		return radiationDao.editRadiationMaster(radiationId);
	}
	
	@Override
	public boolean deleteRadiationMaster(Integer radiationId, HttpServletRequest request) {
	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			return radiationDao.deleteRadiationMaster(radiationId, userId);
		}

	@Override
	public List<RadiationDto> getAllRadiationMasterAutosuggestion(String radiationName) {
		// TODO Auto-generated method stub
		return radiationDao.getAllRadiationMasterAutosuggestion(radiationName);
	}

	@Override
	public String getNextRadiationMasterID() {
		return radiationDao.getNextRadiationMasterID();
	}

}
