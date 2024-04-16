package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.MaintenanceDashboardDao;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.service.MaintenanceDashboardService;

@Service
@Transactional
public class MaintenanceDashboardServiceImpl implements MaintenanceDashboardService{
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private MaintenanceDashboardDao maintenanceDashboardDao;
	
	@Override
	public List<ItemAssetMaintenanceMasterDto> getWarrantyActionAlert(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return maintenanceDashboardDao.getWarrantyActionAlert(request);
	}
	@Override
	public List<ItemAssetMaintenanceMasterDto> getExpiredWarranty(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return maintenanceDashboardDao.getExpiredWarranty(request);
	}

}
