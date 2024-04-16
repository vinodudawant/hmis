package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.hms.doctordesk.dao.SubjectiveObjectiveDao;
import com.hms.doctordesk.dto.SubjectiveObjectiveDto;
import com.hms.doctordesk.service.SubjectiveObjectiveService;

@Service
@Transactional
public class SubjectiveObjectiveServiceImpl implements SubjectiveObjectiveService{

	@Autowired
	SubjectiveObjectiveDao subjectiveObjectiveDao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveSubjectiveMaster(SubjectiveObjectiveDto subjective,
			HttpServletRequest request) {
		return subjectiveObjectiveDao.saveSubjectiveMaster(subjective, request);
	}

	@Override
	@Transactional
	public List<SubjectiveObjectiveDto> getAllSubjectiveMaster(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return subjectiveObjectiveDao.getAllSubjectiveMaster(request);
	}

	@Override
	@Transactional
	public SubjectiveObjectiveDto editSubjectiveMaster(Integer subId) {
		// TODO Auto-generated method stub
		return subjectiveObjectiveDao.editSubjectiveMaster(subId);
	}

//	@Override
//	@Transactional
//	public int deleteSubjectiveDTO(Integer subId) {
//		// TODO Auto-generated method stub
//		return subjectiveObjectiveDao.deleteSubjectiveDTO(subId);
//	}

	@Override
	@Transactional
	public boolean deleteSubjectiveDTO(Integer subId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return subjectiveObjectiveDao.deleteSubjectiveDTO(subId,userId);
	}

	@Override
	public List<SubjectiveObjectiveDto> getAllSubjectiveMasterAutosuggestion(
			String subjectiveObjectivetempType) {
		// TODO Auto-generated method stub
		return subjectiveObjectiveDao.getAllSubjectiveMasterAutosuggestion(subjectiveObjectivetempType);
	}

}
