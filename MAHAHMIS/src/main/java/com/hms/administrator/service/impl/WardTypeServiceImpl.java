package com.hms.administrator.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.WardTypeDao;
import com.hms.administrator.dto.BedStatus;
import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.HallManagementDto;
import com.hms.administrator.dto.HallType;
import com.hms.administrator.service.WardTypeService;
import com.hms.dto.HallTypeCharges;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class WardTypeServiceImpl implements WardTypeService {
	@Autowired
	WardTypeDao wardtypedao;
	
	@Transactional
	@Override
	public List<BedStatus> fetchipdbedstatus() {

		return wardtypedao.fetchipdbedstatus();
	}

	@Transactional
	@Override
	public List<ChargesMasterSlave> fetchWordTypeList(Integer id) {
		return wardtypedao.fetchWordTypeList(id);
	}

	@Transactional
	@Override
	public String saveHallTypeCharges(HallType halltype, List<HallTypeCharges> list) {

		return wardtypedao.saveHallTypeCharges(halltype, list);
	}

	@Transactional
	@Override
	public List<HallType> fetchHallTypeCharges(String name) {

		return wardtypedao.fetchHallTypeCharges(name);
	}

	@Transactional
	@Override
	public Integer deleteHallType(Integer id, Integer userid) {
		return wardtypedao.deleteHallType(id, userid);
	}

	@Transactional
	@Override
	public HallType updateHallTypeId(Integer id) {
		return wardtypedao.updateHallTypeId(id);
	}

	@Transactional
	@Override
	public List<ChargesMasterSlave> fetchWardName() {
		return wardtypedao.fetchWardName();
	}

	@Transactional
	@Override
	public List<ChargesMasterSlave> fetchHallName() {
		return wardtypedao.fetchHallName();
	}

	@Transactional
	@Override
	public Integer saveHallInformation(String hall) {

		HallManagementDto h = (HallManagementDto) ConfigUIJSONUtility.getObjectFromJSON(hall, HallManagementDto.class);
		int count = Integer.parseInt(h.getNumberOfBed());
		List<Beds> list = new ArrayList<Beds>();
		for (int i = 1; i <= count; i++) {
			Beds bed = new Beds();
			bed.setHall_ID(h.getHall());
			bed.setCreatedDate(new Date());
			bed.setCreatedBy(h.getCreatedBy());
			String bedname = Integer.toString(i);
			bed.setBed_name(bedname);
			bed.setStatus("Y");
			bed.setAvailability("Y");
			bed.setBedstate("4");
			list.add(bed);
		}

		return wardtypedao.saveHallInformation(h, list);
	}

	@Transactional
	@Override
	public List<HallManagementDto> fetchHallInfo() {

		return wardtypedao.fetchHallInfo();
	}

	@Transactional
	@Override
	public HallManagementDto editHallType(Integer hall_id) {
		return wardtypedao.editHallType(hall_id);
	}

	@Transactional
	@Override
	public HallManagementDto addHallType(Integer id) {
		return wardtypedao.addHallType(id);
	}

	@Transactional
	@Override
	public Integer addBedHallType(HallManagementDto hall, Integer numberofbed) {
		int count = Integer.parseInt(hall.getNumberOfBed());
		Integer total = count + numberofbed;
		String totalbed = Integer.toString(total);
		hall.setNumberOfBed(totalbed);
		Integer hall_id = hall.getHall();
		List<Beds> list = new ArrayList<Beds>();
		for (int i = 1; i <= total; i++) {
			Beds bed = new Beds();
			bed.setHall_ID(hall.getHall());
			bed.setCreatedDate(new Date());
			bed.setCreatedBy(hall.getCreatedBy());
			bed.setUpdatedDate(new Date());
			bed.setUpdatedBy(hall.getCreatedBy());
			String bedname = Integer.toString(i);
			bed.setBed_name(bedname);
			bed.setStatus("Y");
			bed.setAvailability("Y");
			bed.setBedstate("4");
			list.add(bed);
		}
		return wardtypedao.addBedHallType(list, hall);
	}

	@Transactional
	@Override
	public Integer deleteHallType(HallManagementDto hall) {
		return wardtypedao.deleteHallType(hall);
	}

	@Transactional
	@Override
	public List<Beds> deleteHallbeds(Integer id) {
		return wardtypedao.deleteHallbeds(id);
	}

	@Transactional
	@Override
	public Integer deletebedhalladmin(Beds beds) {
		return wardtypedao.deletebedhalladmin(beds);
	}

	@Override
	@Transactional
	public int addbedInHall(Integer hallId, Integer numberOfBed, Integer numberofbed) {
	
		return wardtypedao.addbedInHall(hallId, numberOfBed, numberofbed);
	}

	@Override
	@Transactional
	public int saveBedState(BedStatus obj) {
		
		return wardtypedao.saveBedState(obj);
	}

	@Override
	@Transactional
	public BedStatus editBedState(Integer idbedState) {
		
		return wardtypedao.editBedState(idbedState);
	}

	@Override
	@Transactional
	public int deleteBedState(Integer idbedState) {
				return wardtypedao.deleteBedState(idbedState);
	}


}
