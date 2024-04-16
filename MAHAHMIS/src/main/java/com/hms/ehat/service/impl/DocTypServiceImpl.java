package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.ehat.dao.DocTypeDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DocTypDto;
import com.hms.ehat.service.DocTypService;

@Service
public class DocTypServiceImpl implements DocTypService {

	@Autowired
	DocTypeDao docTypeDao;

	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:saveDoctorTypeMasterserviceimpl
	 ***********/
	@Override
	@Transactional
	public int saveDoctorTypeMaster(DocTypDto docTypDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		int a=0;
	//	System.err.println("id isssssssssssss==   "+ docTypDto.getDoctypeId());
		try {
			if(docTypDto.getDoctypeId()==null || docTypDto.getDoctypeId().equals("")){
				
				docTypDto.setDoctypeName((docTypDto.getDoctypeName()));
			
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				docTypDto.setCreatedBy(userId);
				// System.out.println("userid>>>>>" + userId);
				// HttpSession obj= chargesMaster.setCreatedBy();

				docTypDto.setCreatedBy(docTypDto.getCreatedBy());
				docTypDto.setDeleted("N");
				docTypDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));

			}else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				docTypDto.setUpdatedBy(userId);

				docTypDto.setUpdatedBy(docTypDto.getUpdatedBy());
				docTypDto.setDeleted("N");

				docTypDto.setUpdatedDate(new Date(new java.util.Date()
						.getTime()));
				
				}
			if(docTypeDao.saveDoctorTypeMaster(docTypDto)==1) {
				a= 1;
					}
		} catch (Exception e) {
			e.printStackTrace();
			
		}
	return a;
	}


	@Override
	@Transactional
	public List<DocTypDto> getDoctyp() {
		// TODO Auto-generated method stub
		return docTypeDao.getDoctyp();
	}


	@Override
	@Transactional
	public int deleteDoctypMaster(Integer dcId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		DocTypDto delDocTypDto = new DocTypDto();
		delDocTypDto.setDoctypeId(dcId);
		//System.err.println("userId=-=-=-=-=->" + userId);
		delDocTypDto.setDeletedBy(userId);
		
		return docTypeDao.deleteDoctypMaster(dcId,delDocTypDto);
	}


	@Override
	@Transactional
	public List<DocTypDto> getAutodetails(String findingName) {
		// TODO Auto-generated method stub
		return docTypeDao.getAutodetails( findingName);
	}

}
