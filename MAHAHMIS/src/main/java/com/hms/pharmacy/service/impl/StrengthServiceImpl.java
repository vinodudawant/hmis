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
public class StrengthServiceImpl implements StrengthService
{

	@Autowired
	StrengthDao strengthDao;

	@Override
	@Transactional
	public Boolean saveOrUpdateStrength(StrengthMaster strengthMaster) {
		strengthMaster.setStrengthDeleteFlag(0);
		strengthMaster.setStrengthAddDate(new Date(new java.util.Date()
					.getTime()));
		strengthMaster.setStrengthUpdateDate(new Date(new java.util.Date()
					.getTime()));
		
		if (strengthDao.saveOrUpdateStrength(strengthMaster)) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	@Transactional
	public List<StrengthMaster> getStrength() {
		// TODO Auto-generated method stub
		return strengthDao.getStrength();
	}
	
	@Override
	@Transactional
	public Boolean deleteStrength(Integer strengthId) {
		// TODO Auto-generated method stub
		
		return strengthDao.deleteStrength(strengthId);
	}
	
	@Override
	@Transactional
	public List<StrengthMaster> getAutoSuggestionStrengthNames(String letter) {
		// TODO Auto-generated method stub
		return strengthDao.getAutoSuggestionStrengthNames(letter);
	}
	
	@Override
	@Transactional
	public List<StrengthMaster> getStrengthById(Integer strengthId) {
		// TODO Auto-generated method stub
		return strengthDao.getStrengthById(strengthId);
	}

}
