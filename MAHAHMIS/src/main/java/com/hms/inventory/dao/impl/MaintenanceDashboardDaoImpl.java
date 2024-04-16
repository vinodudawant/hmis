package com.hms.inventory.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.MaintenanceDashboardDao;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.service.HospitalLicenseService;

@Repository
public class MaintenanceDashboardDaoImpl implements MaintenanceDashboardDao{
	
	private static final Date Date = null;

	static Logger log=Logger.getLogger(MaintenanceDashboardDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	HospitalLicenseService hospitalLicenseService;

	@Override
	public List<ItemAssetMaintenanceMasterDto> getWarrantyActionAlert(
			HttpServletRequest request) {
			List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
			try{
				Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
				criteria.setFetchMode("itemAssetMaintenanceSlaveDtos", FetchMode.JOIN);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date date = new Date();
				String currentDate = sdf.format(date);
				criteria.add(Restrictions.sqlRestriction("Date_Format(CURRENT_DATE(),'%Y-%m-%d') >= DATE_FORMAT(alert_date,'%Y-%m-%d') and DATEDIFF(DATE_FORMAT(asset_maintenance_to_date, '%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) >= 0"));
				//criteria.add(Restrictions.sqlRestriction("Date_Format(CURRENT_DATE(),'%Y-%m-%d') >= ?","DATE_FORMAT(alert_date, '%Y-%m-%d')", StringType.INSTANCE));
				//criteria.add(Restrictions.sqlRestriction("status =?","Active", StringType.INSTANCE));
				//criteria.add(Restrictions.sqlRestriction("DATEDIFF(DATE_FORMAT(asset_maintenance_to_date, '%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) >= ?", 0, IntegerType.INSTANCE));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.addOrder(Order.desc("id"));
				lstItemAssetMaintenanceMaster =	criteria.list();
			}catch(Exception e){
				e.printStackTrace();
				log.error("error for  getWarrantyActionAlert....",e);
			}
			return lstItemAssetMaintenanceMaster;
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getExpiredWarranty(
			HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
			//criteria.createAlias("itemAssetMaintenanceSlaveDtos", "slave");
			criteria.setFetchMode("itemAssetMaintenanceSlaveDtos", FetchMode.JOIN);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date date = new Date();
			String currentDate = sdf.format(date);
			//criteria.add(Restrictions.sqlRestriction("DATE_FORMAT(alert_date, '%Y-%m-%d') <= ?", currentDate, StringType.INSTANCE));
			//criteria.add(Restrictions.sqlRestriction("is_active != ?", 1, IntegerType.INSTANCE));
			//criteria.add(Restrictions.sqlRestriction("status =?","Expired", StringType.INSTANCE));
			//criteria.add(Restrictions.sqlRestriction("DATEDIFF(DATE_FORMAT(alert_date, '%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) <= ?", 0, IntegerType.INSTANCE));
			criteria.add(Restrictions.sqlRestriction("DATEDIFF(DATE_FORMAT(asset_maintenance_to_date, '%Y-%m-%d'),Date_Format(CURRENT_DATE(),'%Y-%m-%d')) < 0 "));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			lstItemAssetMaintenanceMaster =	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getExpiredWarranty....",e);
		}
		return lstItemAssetMaintenanceMaster;
	}
}
