package com.hms.ambulance.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ambulance.controller.VehicleMasterController;
import com.hms.ambulance.dao.VehicleMasterDao;
import com.hms.ambulance.dto.VehicleMasterDto;
import com.hms.dto.Users;


@Repository
public class VehicleMasterDaoImpl implements VehicleMasterDao {

	@Autowired
	SessionFactory sessionFactory;

	static Logger Log = Logger.getLogger(VehicleMasterController.class.getName());

	@Override
	public int saveVehicleMaster(VehicleMasterDto vehicle, HttpServletRequest request) {
		
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(VehicleMasterDto.class);
			criteria.add(Restrictions.eq("vehicleName", vehicle.getVehicleName()));

			//if (criteria.uniqueResult() != null)
			//	return 3;

			if (vehicle.getVehicleId() == 0) {
				
				vehicle.setCreatedBy(userId);
				vehicle.setUnitId(unitId);
				
				sessionFactory.getCurrentSession().merge(vehicle);
				return 1;
			} else {
				vehicle.setUpdatedBy(userId);
				vehicle.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(vehicle);
				return 2;
			}

		} catch (Exception e) {
			Log.error("Exception--> ", e);
		}
		return 0;
	}

	@Override
	public List<VehicleMasterDto> getAllVehicleMaster(HttpServletRequest request) {
		List<VehicleMasterDto> vehicleMaster = new ArrayList<VehicleMasterDto>();

		try {

			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(VehicleMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isAvailable", "Y"));
			criteria.add(Restrictions.eq("unitId", unitId));
			vehicleMaster =criteria.list();
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return vehicleMaster;

	}

	@Override
	public boolean deleteVehicleMaster(Integer vehicleId, HttpServletRequest request) {

		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			VehicleMasterDto obj = (VehicleMasterDto) sessionFactory.getCurrentSession().get(VehicleMasterDto.class,
					vehicleId);
			
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
			obj.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return false;

	}

	@Override
	public VehicleMasterDto editVehicleMaster(Integer vehicleId) {
		VehicleMasterDto obj = new VehicleMasterDto();

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(VehicleMasterDto.class);
			criteria.add(Restrictions.eq("vehicleId", vehicleId));
			obj = (VehicleMasterDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return obj;

	}

	@Override
	public List<Users> getDriver(Integer user_ID) {
		
		List<Users> listuser=new ArrayList<>();
		 try{
			 Criteria c= sessionFactory.getCurrentSession().createCriteria(Users.class);
			 c.add(Restrictions.eq("user_Type", "driver"));
			 listuser=c.list();
			 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listuser;
	}

	@Override
	public List<VehicleMasterDto> getVehicleTypeById(Integer vehicleTypeId) {
		List<VehicleMasterDto> listVehicleMasterDto =new  ArrayList<>();
	 try{
		  
		  
		  Criteria c=
		  sessionFactory.getCurrentSession().createCriteria(VehicleMasterDto.class) ;
		  c.add(Restrictions.eq("vehicleTypeId", vehicleTypeId)); 
		 // c.add(Restrictions.eq("isAvailable", "Y")); 
		  listVehicleMasterDto=c.list();
		  
		  
		  }catch (Exception e) { 
			  
			  e.printStackTrace();
		  }
		  
		  return listVehicleMasterDto; 
	
	}

}
