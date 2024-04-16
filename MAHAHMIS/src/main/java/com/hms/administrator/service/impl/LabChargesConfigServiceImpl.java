package com.hms.administrator.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.LabChargesConfigDao;
import com.hms.administrator.dto.LabChargesConfigurationDto;
import com.hms.administrator.dto.LabChargesConfigurationViewDto;
import com.hms.administrator.dto.LabConfigureServicesViewDto;
import com.hms.administrator.service.LabChargesConfigService;
import com.hms.ehat.dto.ConfigCombinationDto;
import com.hms.ehat.dto.ConfigHallWiseDto;
import com.hms.ehat.dto.ConfigSponsorDto;
import com.hms.ehat.dto.ConfigurByChargesandByHallDto;
import com.hms.ehat.dto.ConfigurServicesDto;

@Service
@Transactional
public class LabChargesConfigServiceImpl implements LabChargesConfigService  {
	
	@Autowired
	LabChargesConfigDao configureServiceDao;

	@Override
	public List<LabChargesConfigurationViewDto> getConfigurationListFromView(String letter, String callfrom) {
		return configureServiceDao.getConfigurationListFromView(letter,callfrom);
	}

	@Override
	public boolean deleteConfigurationList(Integer idConfiguration, Integer chargesId, Integer chargesSlaveId,
			HttpServletRequest request, Integer hallId, Integer hallSlaveId, Integer isComServId,
			Integer isComServlastId) {
		return configureServiceDao.deleteConfigurationList(idConfiguration,
				chargesId, chargesSlaveId, request,hallId,hallSlaveId,isComServId,isComServlastId);
	}

	@Override
	public List<LabConfigureServicesViewDto> getConfigurationListFromViewForSub(Integer chargesId,
			Integer chargesSlaveId, Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId,
			Integer customerType, Integer customerName) {
		return configureServiceDao.getConfigurationListFromViewForSub(chargesId, chargesSlaveId,
				hallId, hallSlaveId, isComServId, isComServlastId, customerType , customerName);
	}
	
	@Override
	public int saveOrUpdateConfigServiceUnitWise(
			LabChargesConfigurationDto configurServicesDto,
			HttpServletRequest request, String configurationlist,
			Integer configId, String queryType,
			Integer chargesId, Integer chargesSlaveId, Integer masterId,
			Integer HallId, Integer HallSlaveId,  double hallCharges, double medicalCharges, Integer isComServId, Integer isComServlastId, Integer unitId) {
		
		int a = configureServiceDao.saveOrUpdateConfigServiceUnitWise(
				configurServicesDto, request, configurationlist, configId,
				queryType, chargesId, chargesSlaveId, masterId,
				HallId, HallSlaveId, hallCharges, medicalCharges, isComServId, isComServlastId, unitId);

		// Set value accordingly insert =1 and update =2
		return (a == 1) ? queryType.equalsIgnoreCase("insert") ? 1 : queryType
				.equalsIgnoreCase("update") ? 2 : queryType
				.equalsIgnoreCase("delete") ? 3 : 0 : 0;
		//return ((a == 1) ? (configurServicesDto.getConfigId() == 0 ? 1 : 2) : 0);
		
	}

}
