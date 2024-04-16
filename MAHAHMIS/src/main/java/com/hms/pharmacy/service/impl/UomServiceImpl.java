package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.UomDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.UomMaster;
import com.hms.pharmacy.service.UomService;

@Service
public class UomServiceImpl implements UomService{

	@Autowired
	UomDao uomDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateUom(UomMaster uomMaster) 
	{
		if(uomMaster.getUomId()==null)
		{
			uomMaster.setUomDeleteFlag(0);
			uomMaster.setUomAddDate(new Date(new java.util.Date()
					.getTime()));
			uomMaster.setUomUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			UomMaster uomMaster2= uomDao.getUomByIdForDate(uomMaster.getUomId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			uomMaster.setUomAddDate(uomMaster2.getUomAddDate());
			uomMaster.setUomDeleteFlag(0);
			uomMaster.setUomUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
	
		if (uomDao.saveOrUpdateUom(uomMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<UomMaster> getUoms() {
		// TODO Auto-generated method stub
		return uomDao.getUoms();
	}
	
	@Override
	@Transactional
	public Boolean deleteUom(Integer uomId) {
		// TODO Auto-generated method stub
		
		return uomDao.deleteUom(uomId);
	}
	
	@Override
	@Transactional
	public List<UomMaster> getAutoSuggestionUomNames(String letter) {
		// TODO Auto-generated method stub
		return uomDao.getAutoSuggestionUomNames(letter);
	}
	
	@Override
	@Transactional
	public List<UomMaster> getUomById(Integer uomId) {
		// TODO Auto-generated method stub
		return uomDao.getUomById(uomId);
	}
}
