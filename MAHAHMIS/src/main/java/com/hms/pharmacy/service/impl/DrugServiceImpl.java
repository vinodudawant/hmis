package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.DrugDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.service.DrugService;

@Service
public class DrugServiceImpl implements DrugService {

	@Autowired
	DrugDao drugDao;

	@Override
	@Transactional
	public List<DrugMaster> getDrug() {
		return drugDao.getDrug();
	}

	@Override
	@Transactional
	public boolean saveDrug(DrugMaster drugMaster) {
		
		if(drugMaster.getDrugId()==null)
		{
			drugMaster.setDrugDeleteFlag(0);
			drugMaster.setDrugAddDate(new Date(new java.util.Date()
					.getTime()));
			drugMaster.setDrugUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
		DrugMaster companyMaster2= drugDao.getDrugByIdForDate(drugMaster.getDrugId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			drugMaster.setDrugAddDate(companyMaster2.getDrugAddDate());
			drugMaster.setDrugDeleteFlag(0);
			drugMaster.setDrugUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
			
		if (drugDao.saveDrug(drugMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteDrug(Integer drugId) {
		return drugDao.deleteDrug(drugId);
	}

	@Override
	@Transactional
	public List<DrugMaster> getAutoSuggestionDrugName(String letter) {
		return drugDao.getAutoSuggestionDrugName(letter);
	}

	@Override
	@Transactional
	public List<DrugMaster> getDrugById(Integer drugId) {
		return drugDao.getDrugById(drugId);
	}

	@Override
	@Transactional
	public List<DrugMaster> getAllDrugs() {
		return drugDao.getAllDrugs();
	}

}
