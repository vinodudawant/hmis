package com.hms.ambulance.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ambulance.dto.VehicleTypeMasterDto;

public interface VehicleTypeMasterService {

	int saveVehicleTypeMaster(VehicleTypeMasterDto vehicle, HttpServletRequest request);

	List<VehicleTypeMasterDto> getAllVehicleTypeMaster(HttpServletRequest request);

	boolean deleteVehicleTypeMaster(Integer vehicleTypeId, HttpServletRequest request);

	VehicleTypeMasterDto editVehicleTypeMaster(Integer vehicleTypeId);

	/* String getVehicleTypeById(Integer vehicleTypeId); */

}
