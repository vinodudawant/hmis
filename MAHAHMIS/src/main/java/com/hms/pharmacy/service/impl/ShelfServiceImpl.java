package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.ShelfDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.service.ShelfService;

@Service
public class ShelfServiceImpl implements ShelfService{

	@Autowired
	ShelfDao shelfDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateShelf(ShelfMaster shelfMaster) {

		
		if(shelfMaster.getShelfId()==null)
		{
			shelfMaster.setShelfDeleteFlag(0);
			shelfMaster.setShelfAddDate(new Date(new java.util.Date()
					.getTime()));
			shelfMaster.setShelfUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			ShelfMaster shelfMaster2= shelfDao.getShelfByIdForDate(shelfMaster.getShelfId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			shelfMaster.setShelfAddDate(shelfMaster2.getShelfAddDate());
			shelfMaster.setShelfDeleteFlag(0);
			shelfMaster.setShelfUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
				
		if (shelfDao.saveOrUpdateShelf(shelfMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<ShelfMaster> getShelfs(String type) {
		// TODO Auto-generated method stub
		return shelfDao.getShelfs(type);
	}
	
	@Override
	@Transactional
	public Boolean deleteShelf(Integer shelfId) {
		// TODO Auto-generated method stub
		
		return shelfDao.deleteShelf(shelfId);
	}
	
	@Override
	@Transactional
	public List<ShelfMaster> getAutoSuggestionShelfNames(String letter) {
		// TODO Auto-generated method stub
		return shelfDao.getAutoSuggestionShelfNames(letter);
	}
	
	@Override
	@Transactional
	public List<ShelfMaster> getShelfById(Integer shelfId) {
		// TODO Auto-generated method stub
		return shelfDao.getShelfById(shelfId);
	}
}
