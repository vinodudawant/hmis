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

import com.hms.ambulance.controller.VehicleTypeMasterController;
import com.hms.ambulance.dao.VehicleTypeMasterDao;
import com.hms.ambulance.dto.VehicleTypeMasterDto;

@Repository
public class VehicleTypeMasterDaoImpl implements VehicleTypeMasterDao {

	@Autowired
	SessionFactory sessionFactory;

	static Logger Log = Logger.getLogger(VehicleTypeMasterController.class.getName());

	@Override
	public int saveVehicleTypeMaster(VehicleTypeMasterDto vehicle, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(VehicleTypeMasterDto.class);
			criteria.add(Restrictions.eq("vehicleType", vehicle.getVehicleType()));
			if (criteria.uniqueResult() != null)
				return 3;

			if (vehicle.getVehicleType() == null) {

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
	public List<VehicleTypeMasterDto> getAllVehicleTypeMaster(HttpServletRequest request) {
		List<VehicleTypeMasterDto> vehicleTypeMaster = new ArrayList<VehicleTypeMasterDto>();

		try {

			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(VehicleTypeMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			vehicleTypeMaster = criteria.list();
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return vehicleTypeMaster;
	}

	@Override
	public boolean deleteVehicleTypeMaster(Integer vehicleTypeId, HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			VehicleTypeMasterDto obj = (VehicleTypeMasterDto) sessionFactory.getCurrentSession()
					.get(VehicleTypeMasterDto.class, vehicleTypeId);

			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));

			sessionFactory.getCurrentSession().merge(obj);
			return true;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return false;
	}

	@Override
	public VehicleTypeMasterDto editVehicleTypeMaster(Integer vehicleTypeId) {

		VehicleTypeMasterDto obj = new VehicleTypeMasterDto();

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(VehicleTypeMasterDto.class);
			criteria.add(Restrictions.eq("vehicleTypeId", vehicleTypeId));
			obj = (VehicleTypeMasterDto) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			Log.error("Exception-->", e);
		}
		return obj;
	}

	/*
	 * @Override public List<VehicleMasterDto> getVehicleTypeById(Integer
	 * vehicleTypeId) {
	 * 
	 * List<VehicleMasterDto> list =new ArrayList<>(); VehicleTypeMasterDto
	 * vehicleNumber =new VehicleTypeMasterDto(); try{
	 * 
	 * 
	 * Criteria c=
	 * sessionFactory.getCurrentSession().createCriteria(VehicleMasterDto.class) ;
	 * c.add(Restrictions.eq("vehicleTypeId", vehicleTypeId));
	 * List<VehicleMasterDto> listVehicleMasterDto=c.list();
	 * 
	 * 
	 * }catch (Exception e) { e.printStackTrace(); }
	 * 
	 * return listVehicleMasterDto; }
	 * 
	 * }
	 */
}
