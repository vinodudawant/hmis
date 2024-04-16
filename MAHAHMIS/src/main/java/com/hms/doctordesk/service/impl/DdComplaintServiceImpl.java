package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.doctordesk.service.DdComplaintService;
import com.hms.doctordesk.dao.DdComplaintDao;
import com.hms.doctordesk.dto.DdComplaintDto;
import com.hms.doctordesk.dto.DiagonosisMasterDto;


@Service
@Transactional
public class DdComplaintServiceImpl implements DdComplaintService {
	@Autowired
	DdComplaintDao ddComplaintDao;
	

	@Override
	public int saveComplaint(String complaintDetails, HttpServletRequest request) {
		HttpSession session = request.getSession();
		return ddComplaintDao.saveComplaint(complaintDetails,request);
	}

	@Override
	public List<DdComplaintDto> fetchComplaint(int treatmentId,String callfrom) {
		// TODO Auto-generated method stub
		return ddComplaintDao.fetchComplaint(treatmentId,callfrom);
	}
	/*@Override
	public List<DdComplaintDto> fetchComplaint() {
		return ddComplaintDao.fetchComplaint();
	}*/

	@Override
	public boolean deleteDDComplaints(Integer complaintId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return ddComplaintDao.deleteComplaintMaster(complaintId, userId);
	}

}
