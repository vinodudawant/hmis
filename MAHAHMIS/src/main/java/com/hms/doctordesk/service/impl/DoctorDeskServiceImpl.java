package com.hms.doctordesk.service.impl;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.doctordesk.dao.DoctorDeskDaoInterface;
import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.dto.VitalMaster;
import com.hms.doctordesk.service.DoctorDeskServiceInterface;
import com.hms.ehat.dto.DoctorDto;
import com.hms.pharmacy.pojo.PreparationMaster;

@Service
@Transactional
public class DoctorDeskServiceImpl implements DoctorDeskServiceInterface {
	
	@Autowired
	DoctorDeskDaoInterface doctordeskdaointerface;

	@Override
	public List<PreparationMaster> fetchPreparationMaster() {
		return doctordeskdaointerface.fetchPreparationMaster();
	}

	@Override
	public Integer saveRouteMaster(RouteMaster routemaster) {
		return doctordeskdaointerface.saveRouteMaster(routemaster);
	}

	@Override
	public List<RouteMaster> fetchRouteMaster(String routename) {
		return doctordeskdaointerface.fetchRouteMaster(routename);
	}

	@Override
	public RouteMaster editRouteMaster(Integer id) {
		return doctordeskdaointerface.editRouteMaster(id);
	}

	@Override
	public Integer deleteRouteMaster(RouteMaster routeMaster) {
		return doctordeskdaointerface.deleteRouteMaster(routeMaster);
	}

	@Override
	public Integer saveImmunizationConfiguration(ImmunizationConfigurationMaster obj) {
		return doctordeskdaointerface.saveImmunizationConfiguration(obj);
	}

	@Override
	public List<ImmunizationConfigurationMaster> fetchImmunizationConfig(String obj) {
		return doctordeskdaointerface.fetchImmunizationConfig(obj);
	}

	@Override
	public ImmunizationConfigurationMaster editImmunizationConfig(Integer Id) {
		return doctordeskdaointerface.editImmunizationConfig(Id);
	}

	@Override
	public Integer saveVital(VitalMaster Vitalmaster) {
		
		return doctordeskdaointerface.saveVital(Vitalmaster);
	}

	@Override
	public List<VitalMaster> fetchVital(String str) {
		
		return doctordeskdaointerface.fetchVital(str);
	}

	@Override
	public VitalMaster editVital(Integer id) {
		return doctordeskdaointerface.editVital(id);
	}

	@Override
	public Integer deleteVital(VitalMaster vital) {
		return doctordeskdaointerface.deleteVital(vital);
	}
}
