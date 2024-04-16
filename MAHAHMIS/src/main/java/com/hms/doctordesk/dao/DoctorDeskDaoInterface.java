package com.hms.doctordesk.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.doctordesk.dto.OpdDocumentUploadDto;
import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.dto.VitalMaster;
import com.hms.ehat.dto.DoctorDto;
import com.hms.pharmacy.pojo.PreparationMaster;

public interface DoctorDeskDaoInterface {

	List<PreparationMaster> fetchPreparationMaster();

	Integer saveRouteMaster(RouteMaster routemaster);

	List<RouteMaster> fetchRouteMaster(String routename);

	RouteMaster editRouteMaster(Integer id);

	Integer deleteRouteMaster(RouteMaster routeMaster);

	Integer saveImmunizationConfiguration(ImmunizationConfigurationMaster obj);

	List<ImmunizationConfigurationMaster> fetchImmunizationConfig(String obj);

	ImmunizationConfigurationMaster editImmunizationConfig(Integer Id);

	Integer saveVital(VitalMaster vitalmaster);

	List<VitalMaster> fetchVital(String str);

	VitalMaster editVital(Integer id);

	Integer deleteVital(VitalMaster vital);
}
