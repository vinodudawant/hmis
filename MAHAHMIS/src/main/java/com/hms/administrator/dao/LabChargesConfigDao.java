package com.hms.administrator.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.LabChargesConfigurationDto;
import com.hms.administrator.dto.LabChargesConfigurationViewDto;
import com.hms.administrator.dto.LabConfigureServicesViewDto;
import com.hms.ehat.dto.ConfigCombinationDto;
import com.hms.ehat.dto.ConfigHallWiseDto;
import com.hms.ehat.dto.ConfigSponsorDto;
import com.hms.ehat.dto.ConfigurByChargesandByHallDto;
import com.hms.ehat.dto.ConfigurServicesDto;

public interface LabChargesConfigDao {

	List<LabChargesConfigurationViewDto> getConfigurationListFromView(String letter,String callfrom); 

	boolean deleteConfigurationList(Integer idConfiguration, Integer chargesId,
			Integer chargesSlaveId, HttpServletRequest request, Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId);

	List<LabConfigureServicesViewDto> getConfigurationListFromViewForSub(Integer chargesId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId, Integer customerType , Integer customerName);

	int saveOrUpdateConfigServiceUnitWise(LabChargesConfigurationDto configurServicesDto, HttpServletRequest request,
			String configurationlist, Integer configId, String queryType, Integer chargesId, Integer chargesSlaveId,
			Integer masterId, Integer hallId, Integer hallSlaveId, double hallCharges, double medicalCharges,
			Integer isComServId, Integer isComServlastId, Integer unitId);
}
