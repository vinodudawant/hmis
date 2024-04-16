package com.hms.doctordesk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.DoctorDeskQueueDao;
import com.hms.doctordesk.dto.DoctorDeskCountDto;
import com.hms.doctordesk.dto.Doctordeskipddto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.service.DoctorDeskQueueService;

@Service
@Transactional
public class DoctorDeskQueueServiceImpl implements DoctorDeskQueueService {

	@Autowired
	DoctorDeskQueueDao doctordeskqueuedao;

	@Override
	public List<Doctordeskopderdto> fetchDoctorDeskDeshboard(Integer depid,Integer unitId,Integer userId1, String userType,Integer startIndex) {
		return doctordeskqueuedao.fetchDoctorDeskDeshboard(depid, unitId, userId1, userType,startIndex);
	}

	@Override
	public List<Doctordeskipddto> fetchIpdDoctorDeskDeshboard(Integer depid, Integer unitId, Integer userId1,
			String userType,Integer startIndex) {
		return doctordeskqueuedao.fetchIpdDoctorDeskDeshboard(depid, unitId, userId1, userType,startIndex);
	}

	@Override
	public List<Doctordeskopderdto> serachDoctorDeskDeshboard(Integer depid, Integer unitId, Integer userId1,
			String userType, Integer selectsearchby, String value) {
		
		return doctordeskqueuedao.serachDoctorDeskDeshboard(depid, unitId, userId1, userType, selectsearchby, value);
	}

	@Override
	public List<Doctordeskipddto> serachDoctorDeskDeshboardIpd(Integer depid, Integer unitId, Integer userId1,
			String userType, Integer selectsearchby, String value) {
		// TODO Auto-generated method stub
		return doctordeskqueuedao.serachDoctorDeskDeshboardIpd(depid, unitId, userId1, userType, selectsearchby, value);
	}

	@Override
	public List<Doctordeskopderdto> serachDateWiseQuque(Integer depid, Integer unitId, Integer userId1, String userType,
			String fdate,String tdate) {
			
		return doctordeskqueuedao.serachDateWiseQuque(depid, unitId, userId1, userType, fdate,tdate);
	}

	@Override
	public List<Doctordeskipddto> serachDateWiseQuqueIpd(Integer depid, Integer unitId, Integer userId1, String userType,
			String fdate,String tdate) {
		// TODO Auto-generated method stub
		return doctordeskqueuedao.serachDateWiseQuqueIpd(depid, unitId, userId1, userType, fdate,tdate);
	}

	@Override
	public DoctorDeskCountDto doctorDeskPatientCount(Integer unitid) {
		// TODO Auto-generated method stub
		return doctordeskqueuedao.doctorDeskPatientCount(unitid);
	}

	
}
