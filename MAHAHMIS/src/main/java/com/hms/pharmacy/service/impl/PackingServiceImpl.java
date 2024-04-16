package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.DoctorDao;
import com.hms.pharmacy.dao.PackingDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DoctorMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.service.DoctorSevice;
import com.hms.pharmacy.service.PackingService;

@Service
public class PackingServiceImpl implements PackingService {

	@Autowired
	PackingDao packingDao;

	@Override
	@Transactional
	public Boolean saveOrUpdatePacking(PackingMaster packingMaster) {

		
		if(packingMaster.getPackId()==null)
		{
			packingMaster.setPackDeleteFlag(0);
			packingMaster.setPakAddDate(new Date(new java.util.Date()
					.getTime()));
			packingMaster.setPackUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			PackingMaster packingMaster2= packingDao.getPackingByIdForDate(packingMaster.getPackId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			packingMaster.setPakAddDate(packingMaster2.getPakAddDate());
			packingMaster.setPackDeleteFlag(0);
			packingMaster.setPackUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		
			
		if (packingDao.saveOrUpdatePacking(packingMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<PackingMaster> getPacking() {
		// TODO Auto-generated method stub
		return packingDao.getPacking();
	}
	
	@Override
	@Transactional
	public Boolean deletePacking(Integer packId) {
		// TODO Auto-generated method stub
		
		return packingDao.deletePacking(packId);
	}
	
	@Override
	@Transactional
	public List<PackingMaster> getAutoSuggestionPackingNames(String letter) {
		// TODO Auto-generated method stub
		return packingDao.getAutoSuggestionPackingNames(letter);
	}
	
	@Override
	@Transactional
	public List<PackingMaster> getPackingById(Integer packId) {
		// TODO Auto-generated method stub
		return packingDao.getPackingById(packId);
	}
}
