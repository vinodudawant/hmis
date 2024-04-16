package com.hms.pharmacy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.HsnDao;
import com.hms.pharmacy.pojo.HsnMaster;
import com.hms.pharmacy.service.HsnService;

@Service
public class HsnServiceImpl implements HsnService{

	@Autowired
	HsnDao hsnDao;

	@Override
	@Transactional
	public int saveOrUpdateHsn(HsnMaster hsnMaster) {
		
			return hsnDao.saveOrUpdateHsn(hsnMaster);
		
		/*if (hsnDao.saveOrUpdateHsn(hsnMaster)) {
			return true;
		} else {
			return false;
		}*/
	}
	
	
	@Override
	@Transactional
	public Boolean deleteHsn(Integer hsnId) {
		// TODO Auto-generated method stub
		
		return hsnDao.deleteHsn(hsnId);
	}
	

	@Override
	@Transactional
	public List<HsnMaster> getAllHsn() {
		return hsnDao.getAllHsns();
	}	
}
