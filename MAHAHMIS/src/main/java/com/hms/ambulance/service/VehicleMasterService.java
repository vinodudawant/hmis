package com.hms.ambulance.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ambulance.dto.VehicleMasterDto;
import com.hms.dto.Users;


public interface VehicleMasterService {

	int saveVehicleMaster(VehicleMasterDto vehicle, HttpServletRequest request);

	List<VehicleMasterDto> getAllVehicleMaster(HttpServletRequest request);

	boolean deleteVehicleMaster(Integer vehicleId, HttpServletRequest request);

	VehicleMasterDto editVehicleMaster(Integer vehicleId);

	List<Users> getDriver(Integer user_ID);

	List<VehicleMasterDto> getVehicleTypeById(Integer vehicleTypeId);

}
