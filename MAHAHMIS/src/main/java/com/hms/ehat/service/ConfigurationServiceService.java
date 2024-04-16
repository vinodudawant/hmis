package com.hms.ehat.service;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.ConfigCombinationDto;
import com.hms.ehat.dto.ConfigHallWiseDto;
import com.hms.ehat.dto.ConfigSponsorDto;
import com.hms.ehat.dto.ConfigurByChargesandByHallDto;
import com.hms.ehat.dto.ConfigurRegistrationServicesDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.ConfigurationChargesViewDto;
import com.hms.ehat.dto.ConfigurationRegistrationChargesViewDto;
import com.hms.ehat.dto.ConfigurationYearView;
import com.hms.ehat.dto.YearWiseConfigureDto;


import com.hms.ehat.dto.ConfigurationViewServiceDto2;



public interface ConfigurationServiceService {

	/**
	 * @author Bilal
	 * @date 30_May_2017
	 * @code Methods declared for sub services
	 ***/


	List<ConfigurServicesDto> getAutoSuggestionConfigService(String letter);

	int saveOrUpdateConfigService(ConfigurServicesDto configurServicesDto,
			HttpServletRequest request, String configurationlist,
			Integer configId, String queryType,
			Integer chargesId, Integer chargesSlaveId, Integer masterId,
			Integer HallId, Integer HallSlaveId,  double hallCharges, double medicalCharges, double isoHallCharges, double isoMedicalCharges, Integer isComServId, Integer isComServlastId);

	List<ConfigurationChargesViewDto> getConfigurationListFromView(Integer startIndex); 
	
	
	List<ConfigurServicesDto> fetchAllListForUpdate(Integer hallId,Integer hallSlaveId,Integer chargesId,Integer chargesSlaveId); 
	
	List<ConfigurByChargesandByHallDto> fetchAllListByHallIdAndByChargesId();
	
	List<ConfigurationViewServiceDto2> getConfigurationListFromViewForSub(Integer chargesId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId);
	
	boolean deleteConfigurationList(Integer idConfiguration, Integer chargesId,
			Integer chargesSlaveId, HttpServletRequest request, Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId);
	//fetching id of hall type from old software 
	int fetchehatHallTypeId(int hallTypeId);
	
	//fetching id of hall name from old software  fetchSponsorwiseandHallWise
	int fetchehatHallNmaeId(int hallId);

	List<ConfigurServicesDto> getConfigurationListFromView2();

	List<ConfigCombinationDto> getConfigurationdata(String callfrom,Integer startIndex);

	List<ConfigSponsorDto> getConfigdataSponsor(Integer startIndex);

	List<ConfigHallWiseDto> getConfigdataHallWise();

	boolean newdelete(Integer id, HttpServletRequest request);

	List<ConfigurationChargesViewDto> searchall(String letter,Integer startIndex);

	List<ConfigCombinationDto> searchcombination(String letter,Integer startIndex);

	List<ConfigSponsorDto> searchsponsor(String letter,Integer startIndex);

	List<ConfigHallWiseDto> searchhallwise(String letter);

	int saveOrUpdateConfigService2(ConfigurServicesDto configurServicesDto,
			HttpServletRequest request, String configurationlist, String queryType, String hallandhallslave,
			Integer masterId, Integer serviceLastId);

	List<ConfigurServicesDto> fetchhallwiseservices(
			String hallandhallslave);

	List<ConfigurServicesDto> fetchMedicalTeamCharges(int chargesId,
			int chargesSlaveId, int hallId, int hallSlaveId, int isComServId,
			int isComServlastId);

	List<YearWiseConfigureDto> saveandupdateYearWise(
			HttpServletRequest request, String configurationlist,
			YearWiseConfigureDto yearWiseConfigureDto, String queryType, Date fromDate, Date toDate);

	int overrideYearWise(String configurationlist, HttpServletRequest request);

	List<YearWiseConfigureDto> getYearWisedata();

	List<ConfigurationYearView> editYearWise(int countDate);

	boolean deleteYearWise(int countDate, HttpServletRequest request);

	List<ConfigurationYearView> getDataWithDate(Date fromDate, Date toDate);

	int importSponsor(String string, HttpServletRequest request);

	int importhall(String string, HttpServletRequest request);
	
	int importConfiguration(String string,HttpServletRequest request);

	int saveOrUpdateRegistrationConfigCharges(ConfigurRegistrationServicesDto configurServicesDto, HttpServletRequest request,
			Integer configId, String queryType, Integer chargesId, Integer chargesSlaveId, Integer masterId,
			Integer hallId, Integer hallSlaveId, double hallCharges, double medicalCharges, Integer isComServId,
			Integer isComServlastId, double opdCharges, double ipdCharges, double diagCharges);	
	
	List<ConfigurationRegistrationChargesViewDto> getConfigurationRegistrationChargeList();

	List<ConfigurRegistrationServicesDto> getupdateConfigurationRegCharge(Integer chargesId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId);
	
	Integer getAllChargesCount();

	Integer getCombinationCount();

	Integer getSponsorCount();

	Integer getSponCntSearch(String letter,Integer startIndex);

	Integer getComCntSearch(String letter);
}
