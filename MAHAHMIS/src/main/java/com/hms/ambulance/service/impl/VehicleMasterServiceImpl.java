package com.hms.ambulance.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ambulance.dao.VehicleMasterDao;
import com.hms.ambulance.dto.VehicleMasterDto;
import com.hms.ambulance.service.VehicleMasterService;
import com.hms.dto.Users;


@Service
@Transactional
public class VehicleMasterServiceImpl implements VehicleMasterService {

	@Autowired
	VehicleMasterDao vehiclemasterdao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveVehicleMaster(VehicleMasterDto vehicle, HttpServletRequest request) {

		return vehiclemasterdao.saveVehicleMaster(vehicle, request);
	}

	@Override
	public List<VehicleMasterDto> getAllVehicleMaster(HttpServletRequest request) {

		return vehiclemasterdao.getAllVehicleMaster(request);
	}

	@Override
	public boolean deleteVehicleMaster(Integer vehicleId, HttpServletRequest request) {

		return vehiclemasterdao.deleteVehicleMaster(vehicleId,request);
	}

	@Override
	public VehicleMasterDto editVehicleMaster(Integer vehicleId) {

		return vehiclemasterdao.editVehicleMaster(vehicleId);
	}

	@Override
	public List<Users> getDriver(Integer user_ID) {

		return vehiclemasterdao.getDriver(user_ID);
	}

	@Override
	public List<VehicleMasterDto> getVehicleTypeById(Integer vehicleTypeId) {
		// TODO Auto-generated method stub
		return vehiclemasterdao.getVehicleTypeById(vehicleTypeId);
	}


}
