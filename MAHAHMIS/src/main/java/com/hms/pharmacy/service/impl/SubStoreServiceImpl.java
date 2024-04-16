package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.SubStoreDao;
import com.hms.pharmacy.pojo.SubStoreMaster;
import com.hms.pharmacy.service.SubStoreService;

@Service
public class SubStoreServiceImpl implements SubStoreService{

	@Autowired
	SubStoreDao subStoreDao;
	
	@Override
	@Transactional
	public List<SubStoreMaster> getStoreDetails(String type) {
		return subStoreDao.getStoreDetails(type);
	}

	@Override
	@Transactional
	public boolean saveOrUpdateStore(SubStoreMaster subStoreMaster,
			HttpServletRequest request) {
		if(subStoreMaster.getStoreId()==null)
		{
			subStoreMaster.setStoreDeleteFlag(0);
			subStoreMaster.setStoreAddDate(new Date(new java.util.Date()
					.getTime()));
			subStoreMaster.setStoreUpdateDate(new Date(new java.util.Date()
					.getTime()));
			
			HttpSession session = request.getSession(true);
			Integer userId=(Integer)session.getAttribute("userId1");
			if(userId==null) {
				userId=1;
			}
			subStoreMaster.setStoreAddedBy(userId.toString());
			subStoreMaster.setStoreModBy(userId.toString());
			
		}
		else
		{
			SubStoreMaster subStoreMaster2= subStoreDao.getSubStoreDate(subStoreMaster.getStoreId());
			subStoreMaster.setStoreAddDate(subStoreMaster2.getStoreAddDate());
			subStoreMaster.setStoreDeleteFlag(0);
			subStoreMaster.setStoreUpdateDate(new Date(new java.util.Date()
					.getTime()));
			
			HttpSession session = request.getSession(true);
			Integer userId=(Integer)session.getAttribute("userId1");
			if(userId==null) {
				userId=1;
			}
			subStoreMaster.setStoreAddedBy(subStoreMaster2.getStoreAddedBy());
			subStoreMaster.setStoreModBy(userId.toString());
		}
		
		if (subStoreDao.saveOrUpdateStore(subStoreMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public List<SubStoreMaster> getAutoSuggestionStoreNames(String letter) {
		return subStoreDao.getAutoSuggestionStoreNames(letter);
	}

	@Override
	@Transactional
	public List<SubStoreMaster> getStoreById(Integer storeId) {
		return subStoreDao.getStoreById(storeId);
	}

	@Override
	@Transactional
	public boolean deleteStore(Integer storeId) {
		return subStoreDao.deleteStore(storeId);
	}

	@Override
	@Transactional
	public boolean editStoreAuthentication(Integer storeId, String users) {
		return subStoreDao.editStoreAuthentication(storeId,users,new Date(new java.util.Date()
		.getTime()));
	}

	@Override
	@Transactional
	public List<SubStoreMaster> getSubStoreList() {
		
		return subStoreDao.getSubStoreList();
	}
	

}
