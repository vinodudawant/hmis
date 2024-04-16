package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.doctordesk.dao.ComplaintMasterDao;
import com.hms.doctordesk.dto.ComplaintMasterDto;
import com.hms.doctordesk.service.ComplaintMasterService;

@Service
@Transactional
public class ComplaintMasterServiceImpl implements ComplaintMasterService{
	
	@Autowired
	ComplaintMasterDao complaintMasterDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveComplaintMaster(ComplaintMasterDto complaint, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintMasterDao.saveComplaintMaster(complaint,request);
	}

	@Override
	public List<ComplaintMasterDto> getAllComplaintMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintMasterDao.getAllComplaintMaster(request);
	}
	
	@Override
	@Transactional
	public ComplaintMasterDto editComplaintMaster(Integer complaintId) {		
		return complaintMasterDao.editComplaintMaster(complaintId);
	}
	
	@Override
	public boolean deleteComplaintMaster(Integer complaintId, HttpServletRequest request) {
	
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			return complaintMasterDao.deleteComplaintMaster(complaintId, userId);
		}

	@Override
	public List<ComplaintMasterDto> centerComplaintAutoSuggestion(String complaintName,String complaintCode) {
		
		return complaintMasterDao.centerComplaintAutoSuggestion(complaintName,complaintCode);
	}

	
}