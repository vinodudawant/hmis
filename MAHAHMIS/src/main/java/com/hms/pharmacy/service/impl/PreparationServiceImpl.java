package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.pharmacy.dao.*;
import com.hms.pharmacy.pojo.*;
import com.hms.pharmacy.service.*;

@Service
public class PreparationServiceImpl implements PreparationService
{

	@Autowired
	PreparationDao preparationDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateForm(PreparationMaster preparationMaster) {
			preparationMaster.setPreparationDeleteFlag(0);
			preparationMaster.setPreparationAddDate(new Date(new java.util.Date()
					.getTime()));
			preparationMaster.setPreparationUpdateDate(new Date(new java.util.Date()
					.getTime()));
		
		
		
		if (preparationDao.saveOrUpdatePreparation(preparationMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<PreparationMaster> getPreparation() {
		// TODO Auto-generated method stub
		return preparationDao.getPreparation();
	}
	
	@Override
	@Transactional
	public Boolean deletePreparation(Integer preparationId) {
		// TODO Auto-generated method stub
		
		return preparationDao.deletePreparation(preparationId);
	}
	
	@Override
	@Transactional
	public List<PreparationMaster> getAutoSuggestionPreparationNames(String letter) {
		// TODO Auto-generated method stub
		return preparationDao.getAutoSuggestionPreparationNames(letter);
	}
	
	@Override
	@Transactional
	public List<PreparationMaster> getPreparationById(Integer formId) {
		// TODO Auto-generated method stub
		return preparationDao.getPreparationById(formId);
	}

}
