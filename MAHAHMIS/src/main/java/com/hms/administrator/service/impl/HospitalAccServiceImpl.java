
package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.HospitalAccessDao;
import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.administrator.service.HospitalAccService;

@Service
@Transactional
public class HospitalAccServiceImpl implements HospitalAccService{

	@Autowired
	HospitalAccessDao hospitalAccessDao;
	
	@Override
	public String SaveHospitalAccessDetails(HospitalAccDetails hospitalAccDetails,String listEhatBillPrefix,HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int userId=(int)session.getAttribute("userId1");
		int unitId=(int)session.getAttribute("uId");
		hospitalAccDetails.setUnitId(unitId);
		hospitalAccDetails.setUserId(userId);
		if(hospitalAccDetails.getIdhospitalAccInfo()==0){
			
			hospitalAccDetails.setCreatedBy(userId);
		}
		else{
			hospitalAccDetails.setUpdatedBy(userId);
		}
		return hospitalAccessDao.SaveHospitalAccessDetails(hospitalAccDetails,listEhatBillPrefix);
	}
	
	@Override
	public List<HospitalAccDetails> fetchHospitalAccDetails(String corporateId) {
		// TODO Auto-generated method stub
		return hospitalAccessDao.fetchHospitalAccDetails(corporateId);
	}

}
