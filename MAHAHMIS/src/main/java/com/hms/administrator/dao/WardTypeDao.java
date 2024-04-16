package com.hms.administrator.dao;

import java.util.List;

import com.hms.administrator.dto.BedStatus;
import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.HallManagementDto;
import com.hms.administrator.dto.HallType;
import com.hms.dto.HallTypeCharges;
import com.hms.ehat.dto.ChargesMasterSlave;

public interface WardTypeDao {


	List<BedStatus> fetchipdbedstatus();

	List<ChargesMasterSlave> fetchWordTypeList(Integer id);

	String saveHallTypeCharges(HallType halltype, List<HallTypeCharges> list);

	List<HallType> fetchHallTypeCharges(String name);

	Integer deleteHallType(Integer id, Integer userid);

	HallType updateHallTypeId(Integer id);

	List<ChargesMasterSlave> fetchWardName();

	List<ChargesMasterSlave> fetchHallName();

	Integer saveHallInformation(HallManagementDto hall, List<Beds> list);

	List<HallManagementDto> fetchHallInfo();

	HallManagementDto editHallType(Integer hall_id);

	HallManagementDto addHallType(Integer id);

	Integer addBedHallType(List<Beds> beds, HallManagementDto hall);

	Integer deleteHallType(HallManagementDto hall);
	
	List<Beds> deleteHallbeds(Integer id);

	Integer deletebedhalladmin(Beds beds);
	
	int addbedInHall(Integer hallId,Integer numberOfBed,Integer numberofbed);
	
	int saveBedState(BedStatus obj);
	
	BedStatus editBedState(Integer idbedState);
	
	int deleteBedState(Integer idbedState);

}
