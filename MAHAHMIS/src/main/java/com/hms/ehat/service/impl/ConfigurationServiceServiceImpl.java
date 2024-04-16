package com.hms.ehat.service.impl;


import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.ConfigureServiceDao;
import com.hms.ehat.dto.ConfigCombinationDto;
import com.hms.ehat.dto.ConfigHallWiseDto;
import com.hms.ehat.dto.ConfigSponsorDto;
import com.hms.ehat.dto.ConfigurByChargesandByHallDto;
import com.hms.ehat.dto.ConfigurRegistrationServicesDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.ConfigurationChargesViewDto;
import com.hms.ehat.dto.ConfigurationRegistrationChargesViewDto;
import com.hms.ehat.dto.ConfigurationViewServiceDto2;
import com.hms.ehat.dto.ConfigurationYearView;
import com.hms.ehat.dto.YearWiseConfigureDto;


import com.hms.ehat.service.ConfigurationServiceService;


@Service
public class ConfigurationServiceServiceImpl implements
		ConfigurationServiceService {
	@Autowired
	ConfigureServiceDao configureServiceDao;

	/**
	 * @author Bilal
	 * @date 30_May_2017
	 * @code For save or update records
	 ***/
	@Override
	@Transactional
	public int saveOrUpdateConfigService(
			ConfigurServicesDto configurServicesDto,
			HttpServletRequest request, String configurationlist,
			Integer configId, String queryType,
			Integer chargesId, Integer chargesSlaveId, Integer masterId,
			Integer HallId, Integer HallSlaveId,  double hallCharges, double medicalCharges, double isoHallCharges, double isoMedicalCharges, Integer isComServId, Integer isComServlastId) {
		
		int a = configureServiceDao.saveOrUpdateConfigService(
				configurServicesDto, request, configurationlist, configId,
				queryType, chargesId, chargesSlaveId, masterId,
				HallId, HallSlaveId, hallCharges, medicalCharges, isoHallCharges, isoMedicalCharges, isComServId, isComServlastId);

		// Set value accordingly insert =1 and update =2
		return (a == 1) ? queryType.equalsIgnoreCase("insert") ? 1 : queryType
				.equalsIgnoreCase("update") ? 2 : queryType
				.equalsIgnoreCase("delete") ? 3 : 0 : 0;
		//return ((a == 1) ? (configurServicesDto.getConfigId() == 0 ? 1 : 2) : 0);
		
	}



	/**@author Bilal
	 * @date 13-JUN-2017
	 * @code Fro autoSuggestions of sub service
	 * ***/
	@Override
	@Transactional
	public List<ConfigurServicesDto> getAutoSuggestionConfigService(String letter) {
		return configureServiceDao.getAutoSuggestionConfigService(letter);
	}


	/**@author Bilal
	 * @date 14-JUN-2017
	 * @code Fro getting list of configuration fron charges and sub charges
	 * ***/
	@Override
	@Transactional
	public List<ConfigurationChargesViewDto> getConfigurationListFromView(Integer startIndex) {
		return configureServiceDao.getConfigurationListFromView(startIndex);
	}

	/**@author Bilal
	 * @date 15-JUN-2017
	 * @code Fro getting configuration list from view
	 * ***/
	@Override
	@Transactional
	public List<ConfigurationViewServiceDto2> getConfigurationListFromViewForSub(
			Integer chargesId, Integer chargesSlaveId,
			 Integer hallId, Integer hallSlaveId, Integer isComServId, Integer isComServlastId) {
		return configureServiceDao.getConfigurationListFromViewForSub(chargesId, chargesSlaveId,
				hallId,hallSlaveId,isComServId,isComServlastId);
	}

	/**@author Bilal
	 * @date 15-JUN-2017
	 * @code Fro deleting list of items from configurations
	 * ***/
	@Override
	@Transactional
	public boolean deleteConfigurationList(Integer idConfiguration,
			Integer chargesId, Integer chargesSlaveId,
			HttpServletRequest request,Integer hallId, 
			Integer hallSlaveId, Integer isComServId, Integer isComServlastId) {
		return configureServiceDao.deleteConfigurationList(idConfiguration,
				chargesId, chargesSlaveId, request,hallId,hallSlaveId,isComServId,isComServlastId);
	}

	/**@author Bilal
	 * @date 15-JUN-2017
	 * @code Fro Fetching list of data for update
	 * ***/
	@Override
	@Transactional
	public List<ConfigurServicesDto> fetchAllListForUpdate(Integer hallId,Integer hallSlaveId,Integer chargesId,Integer chargesSlaveId) {
		return configureServiceDao.fetchAllListForUpdate(hallId,hallSlaveId,chargesId,chargesSlaveId);
	}



	/**@author Bilal
	 * @date 19-JUN-2017
	 * @code For Fetching list of data for update
	 * ***/
	@Override
	@Transactional
	public List<ConfigurByChargesandByHallDto> fetchAllListByHallIdAndByChargesId() {
		
		return configureServiceDao.fetchAllListByHallIdAndByChargesId();
	}


	/**@author Bilal
	 * @date 19-JUN-2017
	 * @code For Fetching list of hall type id from old software
	 * ***/
	@Override
	@Transactional
	public int fetchehatHallTypeId(int hallTypeId) {
		
		return configureServiceDao.fetchehatHallTypeId(hallTypeId);
	}


	/**@author Bilal
	 * @date 19-JUN-2017
	 * @code For Fetching list of hall id from old software
	 * ***/
	@Override
	@Transactional
	public int fetchehatHallNmaeId(int hallId) {
		
		return configureServiceDao.fetchehatHallNmaeId(hallId);
	}


	/**@author Bilal
	 * @date 1-Aug-2017
	 * @code For Fetching list configuration
	 * ***/
	@Override
	@Transactional
	public List<ConfigurServicesDto> getConfigurationListFromView2() {
		
		return configureServiceDao.getConfigurationListFromView2();
	}



	@Override
	@Transactional
	public List<ConfigCombinationDto> getConfigurationdata(String callfrom,Integer startIndex) {
		
		return configureServiceDao.getConfigurationdata(callfrom,startIndex);
	}



	@Override
	@Transactional
	public List<ConfigSponsorDto> getConfigdataSponsor(Integer startIndex) {
		return configureServiceDao.getConfigdataSponsor(startIndex);
	}



	@Override
	@Transactional
	public List<ConfigHallWiseDto> getConfigdataHallWise() {
		return configureServiceDao.getConfigdataHallWise();

	}



	@Override
	@Transactional
	public boolean newdelete(Integer id, HttpServletRequest request) {
		
		return configureServiceDao.newdelete(id, request);
	}


	/**@Author    :BILAL
	 * @Date      :04-10-2017
	 * @COde      :For getting List of sponsor hall and package****/
	@Override
	@Transactional
	public List<ConfigurationChargesViewDto> searchall(String letter,Integer startIndex) {
		
		return configureServiceDao.searchall(letter,startIndex);
	}

	/**@Author    :BILAL
	 * @Date      :04-10-2017
	 * @COde      :For getting List of Combination or Package****/
	@Override
	@Transactional
	public List<ConfigCombinationDto> searchcombination(String letter,Integer startIndex) {
		
		return configureServiceDao.searchcombination(letter,startIndex);
	}

	/**@Author    :BILAL
	 * @Date      :04-10-2017
	 * @COde      :For getting List of Sponsor for auto suggestion****/
	@Override
	@Transactional
	public List<ConfigSponsorDto> searchsponsor(String letter,Integer startIndex) {
		
		return configureServiceDao.searchsponsor(letter,startIndex);
	}

	/**@Author    :BILAL
	 * @Date      :04-10-2017
	 * @COde      :For getting List of hall for auto suggestion****/
	@Override
	@Transactional
	public List<ConfigHallWiseDto> searchhallwise(String letter) {
		
		return configureServiceDao.searchhallwise(letter);
	}

	/**@Author    :BILAL
	 * @Date      :23-10-2017
	 * @COde      :For saving hall wise charges****/
	@Override
	@Transactional
	public int saveOrUpdateConfigService2(
			ConfigurServicesDto configurServicesDto,
			HttpServletRequest request, String configurationlist, String queryType,String hallandhallslave,
			Integer masterId, Integer serviceLastId) {
		
		int a = configureServiceDao.saveOrUpdateConfigService2(
				configurServicesDto, request, configurationlist,queryType,hallandhallslave,
				masterId,serviceLastId);

		// Set value accordingly insert =1 and update =2
		return (a == 1) ? queryType.equalsIgnoreCase("insert") ? 1 : queryType
				.equalsIgnoreCase("update") ? 2 : queryType
				.equalsIgnoreCase("delete") ? 3 : 0 : 0;
		
	}

	/**@Author    :BILAL
	 * @Date      :23-10-2017
	 * @COde      :For fetching list of configuration hall wise****/
	@Override
	@Transactional
	public List<ConfigurServicesDto> fetchhallwiseservices(
			String hallandhallslave) {
		
		return configureServiceDao.fetchhallwiseservices(hallandhallslave);
	}

	/**
	 * @author  : BILAL
	 * @date    : 09-01-2018
	 * @code    : For medical team charges and hall charges 
	 ***/
	@Override
	@Transactional
	public List<ConfigurServicesDto> fetchMedicalTeamCharges(int chargesId,
			int chargesSlaveId, int hallId, int hallSlaveId, int isComServId,
			int isComServlastId) {
		
		return configureServiceDao.fetchMedicalTeamCharges( chargesId,
				 chargesSlaveId,  hallId,  hallSlaveId,  isComServId,
				 isComServlastId);
	}

	/*********
	 * @author     :BILAL
	 * @Date       :24-01-2018
	 * @Code       :For save year wise configuration 
	 * ***********/
	@Override
	@Transactional
	public List<YearWiseConfigureDto> saveandupdateYearWise(
			HttpServletRequest request, String configurationlist,
			YearWiseConfigureDto yearWiseConfigureDto, String queryType,
			Date fromDate, Date toDate) {
		
		return configureServiceDao.saveandupdateYearWise(
				request, configurationlist, yearWiseConfigureDto,
				queryType,fromDate,toDate);
	}
	
	/********
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For Save or override  Year wise configuration 
	 * *********/
	@Override
	@Transactional
	public int overrideYearWise(String configurationlist, HttpServletRequest request) {
		
		int a = configureServiceDao.overrideYearWise(
				configurationlist,request);

		return a;
		
	}

	/********
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For getting list of year wise data
	 * *********/
	@Override
	@Transactional
	public List<YearWiseConfigureDto> getYearWisedata() {
		
		return configureServiceDao.getYearWisedata();
	}
	
	/********
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For getting list of year wise data
	 * *********/
	@Override
	@Transactional
	public List<ConfigurationYearView> editYearWise(int countDate) {
		
		return configureServiceDao.editYearWise(countDate);
	}

	/********
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For delete data year wise 
	 * *********/
	@Override
	@Transactional
	public boolean deleteYearWise(int countDate, HttpServletRequest request) {
		
		return configureServiceDao.deleteYearWise(countDate,request);
	}


	/********
	 * @author     :BILAL
	 * @Date       :31-01-2018
	 * @Code       :For getting data date wise 
	 * *********/
	@Override
	@Transactional
	public List<ConfigurationYearView> getDataWithDate(Date fromDate,
			Date toDate) {
		
		return configureServiceDao.getDataWithDate(fromDate,toDate);
	}


	/********
	 * @author     :BILAL
	 * @Date       :12-03-2018
	 * @Code       :For importing configuration data 
	 * *********/
	@Override
	@Transactional
	public int importSponsor(String file, HttpServletRequest request) {
		
		return configureServiceDao.importSponsor(file,request);
	}



	/********
	 * @author     :BILAL
	 * @Date       :12-03-2018
	 * @Code       :For importing configuration data of hall
	 * *********/
	@Override
	@Transactional
	public int importhall(String file, HttpServletRequest request) {
		
		return configureServiceDao.importhall(file,request);
	}

	/***********
	 * @author	: Vinod Udawant
	 * @date	: 08-05-2019
	 * @base	: For Import Configuration excel dynamically 
	 ***********/
	@Override
	@Transactional
	public int importConfiguration(String file,HttpServletRequest request) {
		
		return configureServiceDao.importConfiguration(file,request);
	}



	@Override
	@Transactional
	public int saveOrUpdateRegistrationConfigCharges(ConfigurRegistrationServicesDto configurServicesDto, HttpServletRequest request,
			Integer configId, String queryType, Integer chargesId, Integer chargesSlaveId, Integer masterId,
			Integer hallId, Integer hallSlaveId, double hallCharges, double medicalCharges, Integer isComServId,
			Integer isComServlastId, double opdCharges, double ipdCharges, double diagCharges) {
		// TODO Auto-generated method stub
		return configureServiceDao.saveOrUpdateRegistrationConfigCharges(configurServicesDto, request, configId,
				queryType, chargesId, chargesSlaveId, masterId,
				hallId, hallSlaveId, hallCharges, medicalCharges, isComServId,isComServlastId,opdCharges,ipdCharges,diagCharges);
	}
	
	
	@Override
	@Transactional
	public List<ConfigurationRegistrationChargesViewDto> getConfigurationRegistrationChargeList() {
		return configureServiceDao.getConfigurationRegistrationChargeList();
	}



	@Override
	@Transactional
	public List<ConfigurRegistrationServicesDto> getupdateConfigurationRegCharge(Integer chargesId,
			Integer chargesSlaveId, Integer hallId, Integer hallSlaveId) {
		// TODO Auto-generated method stub
		return configureServiceDao.getupdateConfigurationRegCharge( chargesId,chargesSlaveId,  hallId,  hallSlaveId);
	}



	@Override
	@Transactional
	public Integer getAllChargesCount() {
		// TODO Auto-generated method stub
		return configureServiceDao.getAllChargesCount();
	}



	@Override
	@Transactional
	public Integer getCombinationCount() {
		// TODO Auto-generated method stub
		return configureServiceDao.getCombinationCount();
	}



	@Override
	@Transactional
	public Integer getSponsorCount() {
		// TODO Auto-generated method stub
		return configureServiceDao.getSponsorCount();
	}



	@Override
	@Transactional
	public Integer getSponCntSearch(String letter,Integer startIndex) {
		// TODO Auto-generated method stub
		return configureServiceDao.getSponCntSearch(letter,startIndex);
	}



	@Override
	@Transactional
	public Integer getComCntSearch(String letter) {
		// TODO Auto-generated method stub
		return configureServiceDao.getComCntSearch(letter);
	}
}
