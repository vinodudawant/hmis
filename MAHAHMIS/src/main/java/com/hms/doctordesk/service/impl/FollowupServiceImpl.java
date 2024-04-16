package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.FollowupDao;
import com.hms.doctordesk.dto.FollowupDto;

import com.hms.doctordesk.service.FollowupService;

@Service
@Transactional
public class FollowupServiceImpl implements FollowupService {
	@Autowired
	FollowupDao followupDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveFollowup(FollowupDto follow, HttpServletRequest request) {
		return followupDao.saveFollowup(follow,request);
	}

	@Override
	public List<FollowupDto> getFollowup(int treatmentId) {
		return followupDao.getFollowup(treatmentId);
	}

}
