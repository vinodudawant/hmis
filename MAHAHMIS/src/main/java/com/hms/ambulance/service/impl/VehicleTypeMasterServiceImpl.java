package com.hms.ambulance.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ambulance.dao.VehicleTypeMasterDao;
import com.hms.ambulance.dto.VehicleTypeMasterDto;
import com.hms.ambulance.service.VehicleTypeMasterService;

@Service
@Transactional
public class VehicleTypeMasterServiceImpl implements VehicleTypeMasterService{

	
	@Autowired
	VehicleTypeMasterDao vehicletypemasterdao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveVehicleTypeMaster(VehicleTypeMasterDto vehicle, HttpServletRequest request) {
		
		return vehicletypemasterdao.saveVehicleTypeMaster(vehicle,request);
	}

	@Override
	public List<VehicleTypeMasterDto> getAllVehicleTypeMaster(HttpServletRequest request) {

		return vehicletypemasterdao.getAllVehicleTypeMaster(request);
	}

	@Override
	public boolean deleteVehicleTypeMaster(Integer vehicleTypeId, HttpServletRequest request) {

		return vehicletypemasterdao.deleteVehicleTypeMaster(vehicleTypeId, request);
	}

	@Override
	public VehicleTypeMasterDto editVehicleTypeMaster(Integer vehicleTypeId) {

		return vehicletypemasterdao.editVehicleTypeMaster(vehicleTypeId);
	}

	/*
	 * @Override public String getVehicleTypeById(Integer vehicleTypeId) { // TODO
	 * Auto-generated method stub return
	 * vehicletypemasterdao.getVehicleTypeById(vehicleTypeId); }
	 */

}
