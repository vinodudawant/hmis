package com.hms.ehat.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;


import com.hms.ehat.dto.ConfigurByChargesandByHallDto;
import com.hms.ehat.dto.ConfigurRegistrationServicesDto;
import com.hms.ehat.dto.ConfigCombinationDto;
import com.hms.ehat.dto.ConfigHallWiseDto;
import com.hms.ehat.dto.ConfigSponsorDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.ConfigurationChargesViewDto;
import com.hms.ehat.dto.ConfigurationRegistrationChargesViewDto;
import com.hms.ehat.dto.ConfigurationYearView;
import com.hms.ehat.dto.YearWiseConfigureDto;


import com.hms.ehat.dto.ConfigurationViewServiceDto2;

import com.hms.ehat.service.ConfigurationServiceService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;


@Controller
@RequestMapping(value = "/configurationservice")
public class ConfigurationServiceController {

	@Autowired
	ConfigurationServiceService configServiceService;

	/**
	 * @author  : BILAL
	 * @date    : 30_May_2017
	 * @code    : For saving or updating records of sub service
	 ***/
	@RequestMapping(value = "/saveConfiguration", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateConfigService(
			ConfigurServicesDto configurServicesDto,
			HttpServletRequest request,
			@RequestParam(value = "configurationDetails") String configurationlist,
			@RequestParam Integer configId,
			@RequestParam("queryType") String queryType,
			
			@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("masterId") Integer masterId,
			@RequestParam("HallId") Integer HallId,
			@RequestParam("HallSlaveId") Integer HallSlaveId,
			@RequestParam("hallCharges") double hallCharges,
			@RequestParam("medicalCharges") double medicalCharges,
			@RequestParam("isoHallCharges") double isoHallCharges,
			@RequestParam("isoMedicalCharges") double isoMedicalCharges,
			@RequestParam("isComServId") Integer isComServId,
			@RequestParam("isComServlastId") Integer isComServlastId) {
		
		
		int response = configServiceService.saveOrUpdateConfigService(
				configurServicesDto, request, configurationlist, configId,
				queryType, chargesId, chargesSlaveId, masterId,
				HallId, HallSlaveId, hallCharges, medicalCharges, isoHallCharges, isoMedicalCharges, isComServId,isComServlastId);
		
		return ((response == 1) ? "Saved Successfully"
				: ((response == 2) ? "Updated Successfully"
						: "Network Error!!!"));
	}

	
	/**
	 * @author  : BILAL
	 * @date    : 12_JUN_2017
	 * @code    : For used to auto suggestions for configuration
	 ***/
	@RequestMapping(value = "/autoSuggestionChargesMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurServicesDto getAutoSuggestionConfiguration(
			@RequestParam String letter) {
		List<ConfigurServicesDto> ltConfiguration = new ArrayList<ConfigurServicesDto>();
		ltConfiguration = configServiceService
				.getAutoSuggestionConfigService(letter);
		ConfigurServicesDto obj = new ConfigurServicesDto();
		obj.setLstConfigurService(ltConfiguration);
		return obj;

	}
	
	
	/**
	 * @author  : BILAL
	 * @date    : 14_JUN_2017
	 * @code    : For used to display configuration list
	 ***/
	@RequestMapping(value = "/getConfigurationListFromView", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurationChargesViewDto getConfigurationListFromView(@RequestParam ("startIndex")Integer startIndex) {
		List<ConfigurationChargesViewDto> ltConfigurationFromView = new ArrayList<ConfigurationChargesViewDto>();
		ltConfigurationFromView = configServiceService
				.getConfigurationListFromView(startIndex);
		ConfigurationChargesViewDto obj = new ConfigurationChargesViewDto();
		
		Integer cnt = configServiceService.getAllChargesCount();
	    
	    obj.setAllChargesCount(cnt);
		
		obj.setLstConfigurations(ltConfigurationFromView);
		return obj;
	}
	
	
	/**
	 * @author Bilal 
	 * @date 14_JUN_2017 
	 * @code these methods are used to display configuration list 
	 *  
	 * **/
	@RequestMapping(value = "/getConfigurationListFromViewForSub", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurationViewServiceDto2 getConfigurationListFromViewForSub(@RequestParam("chargesId") Integer chargesId, 
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("hallId") Integer hallId, 
			@RequestParam("hallSlaveId") Integer hallSlaveId,
			@RequestParam("isComServId") Integer isComServId, 
			@RequestParam("isComServlastId") Integer isComServlastId) {
		List<ConfigurationViewServiceDto2> ltConfigurationFromViews = new ArrayList<ConfigurationViewServiceDto2>();
		ltConfigurationFromViews = configServiceService.getConfigurationListFromViewForSub(chargesId , chargesSlaveId,
				hallId,hallSlaveId,isComServId,isComServlastId);
		ConfigurationViewServiceDto2 obj = new ConfigurationViewServiceDto2();
		obj.setLstServiceConfigurations(ltConfigurationFromViews);
		return obj;
	}
	
	
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For deleting records of sub service with id
	 ***/
	@RequestMapping(value = "/deleteConfigurationList", method = RequestMethod.POST)
	public @ResponseBody
	String deleteConfigurationList(
			@RequestParam("idConfiguration") Integer idConfiguration,
			@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			HttpServletRequest request,
			@RequestParam("hallId") Integer hallId, 
			@RequestParam("hallSlaveId") Integer hallSlaveId,
			@RequestParam("isComServId") Integer isComServId, 
			@RequestParam("isComServlastId") Integer isComServlastId) {

		boolean response = configServiceService.deleteConfigurationList(
				idConfiguration, chargesId, chargesSlaveId, request, hallId, hallSlaveId, isComServId, isComServlastId);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	
	/**
	 * @author Bilal @date 14_JUN_2017 these methods are used to display configuration list 
	 * fetchAllListForUpdate fetchAllListByHallIdAndByChargesId 
	 * ,
			@RequestParam("findingName") String findingName
	 * **/
	@RequestMapping(value = "/fetchAllListForUpdate", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurServicesDto fetchAllListForUpdate(
			@RequestParam("hallId") Integer hallId,
			@RequestParam("hallSlaveId") Integer hallSlaveId,
			@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId) {
		List<ConfigurServicesDto> ltConfiguration = new ArrayList<ConfigurServicesDto>();
		ltConfiguration = configServiceService
				.fetchAllListForUpdate(hallId,hallSlaveId,chargesId,chargesSlaveId);
		ConfigurServicesDto obj = new ConfigurServicesDto();
		obj.setLstConfigurService(ltConfiguration);
		return obj;
	}
	

	/**
	 * @author Bilal @date 14_JUN_2017 these methods are used to display configuration list 
	 * fetchehatHallTypeId fetchSponsorwiseandHallWise
	 * **/
	@RequestMapping(value = "/fetchAllListByHallIdAndByChargesId", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurByChargesandByHallDto fetchAllListByHallIdAndByChargesId() {
		List<ConfigurByChargesandByHallDto> ltConfigurationByHallIdandCharges = new ArrayList<ConfigurByChargesandByHallDto>();
		ltConfigurationByHallIdandCharges = configServiceService
				.fetchAllListByHallIdAndByChargesId();
		ConfigurByChargesandByHallDto obj = new ConfigurByChargesandByHallDto();
		obj.setLstConfigurByHallIdandChargesId(ltConfigurationByHallIdandCharges);
		return obj;
	}
	
	
	/**
	 * @author Bilal 
	 * @date 21_JUN_2017 
	 * @code these methods are used to display hallTypeId 
	 * 
	 * **/
	@RequestMapping(value = "/fetchehatHallTypeId", method = RequestMethod.POST)
	public @ResponseBody
	int fetchehatHallTypeId(@RequestParam("hallTypeId") int hallTypeId) {
		int a = configServiceService
				.fetchehatHallTypeId(hallTypeId);
		
		return a;
	}
	
	
	/**
	 * @author Bilal 
	 * @date 21_JUN_2017 
	 * @code these methods are used to display hallNameId 
	 * 
	 * **/
	@RequestMapping(value = "/fetchehatHallNmaeId", method = RequestMethod.POST)
	public @ResponseBody
	int fetchehatHallNmaeId(@RequestParam("hallId") int hallId) {
		int a = configServiceService
				.fetchehatHallNmaeId(hallId);
		
		return a;
	}
	
	/**
	 * @author Bilal @date 14_JUN_2017 these methods are used to display configuration list 
	 *  
	 * **/
	/*@RequestMapping(value = "/fetchSponsorwiseandHallWise", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurServicesDto fetchSponsorwiseandHallWise() {
		List<ConfigurServicesDto> ltConfiguration = new ArrayList<ConfigurServicesDto>();
		ltConfiguration = configServiceService
				.fetchSponsorwiseandHallWise();
		ConfigurServicesDto obj = new ConfigurServicesDto();
		obj.setLstConfigurService(ltConfiguration);
		return obj;
	}*/
	
	/**
	 * @author Bilal @date 14_JUN_2017 these methods are used to display configuration list 
	 * 
	 * **/
	@RequestMapping(value = "/getConfigurationListFromView2", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurServicesDto getConfigurationListFromView2() {
		List<ConfigurServicesDto> objlis = new ArrayList<ConfigurServicesDto>();
		objlis = configServiceService
				.getConfigurationListFromView2();
		ConfigurServicesDto obj = new ConfigurServicesDto();
		obj.setLstConfigurService(objlis);
		return obj;
	}
	
	
	/**
	 * @author  :Bilal 
	 * @date    :3_AUG_2017 
	 * @code    :This code to show records on combination tab 
	 * 
	 * **/
	@RequestMapping(value = "/getConfigurationdata", method = RequestMethod.POST)
	public @ResponseBody
	ConfigCombinationDto getConfigurationdata(@RequestParam("callfrom") String callfrom,@RequestParam ("startIndex")Integer startIndex) {
		List<ConfigCombinationDto> ltConfigurationFromView = new ArrayList<ConfigCombinationDto>();
		ltConfigurationFromView = configServiceService
				.getConfigurationdata(callfrom,startIndex);
		ConfigCombinationDto obj = new ConfigCombinationDto();
		
        Integer combinationCount = configServiceService.getCombinationCount();
	    
        obj.setCombinationCount(combinationCount);
		obj.setLstConfigurations(ltConfigurationFromView);
		return obj;
	}
	
	/**
	 * @author  :Bilal 
	 * @date    :3_AUG_2017 
	 * @code    :This code to show records on sponsor tab 
	 * 
	 * **/
	@RequestMapping(value = "/getConfigdataSponsor", method = RequestMethod.POST)
	public @ResponseBody
	ConfigSponsorDto getConfigdataSponsor(@RequestParam ("startIndex")Integer startIndex) {
		List<ConfigSponsorDto> ltConfigurationFromView = new ArrayList<ConfigSponsorDto>();
		ltConfigurationFromView = configServiceService
				.getConfigdataSponsor(startIndex);
		ConfigSponsorDto obj = new ConfigSponsorDto();
		Integer sponsorWiseCount=configServiceService.getSponsorCount();
		obj.setSponsorWiseCount(sponsorWiseCount);
		obj.setLstConfigurations(ltConfigurationFromView);
		return obj;
	}
	
	/**
	 * @author  :Bilal 
	 * @date    :3_AUG_2017 
	 * @code    :This code to show records on sponsor tab 
	 * 
	 * **/
	@RequestMapping(value = "/getConfigdataHallWise", method = RequestMethod.POST)
	public @ResponseBody
	ConfigHallWiseDto getConfigdataHallWise() {
		List<ConfigHallWiseDto> ltConfigurationFromView = new ArrayList<ConfigHallWiseDto>();
		ltConfigurationFromView = configServiceService
				.getConfigdataHallWise();
		ConfigHallWiseDto obj = new ConfigHallWiseDto();
		obj.setLstConfigurations(ltConfigurationFromView);
		return obj;
	}
	
	/**
	 * @author    :Bilal
	 * @date      :28_08_2017
	 * @code      :For deleting records of configuration with id
	 ***/
	@RequestMapping(value = "/newdelete", method = RequestMethod.POST)
	public @ResponseBody
	String newdelete(@RequestParam("id") Integer id,
			HttpServletRequest request) {

		boolean response = configServiceService.newdelete(id, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/**@Author    :BILAL
	 * @Date      :04-10-2017
	 * @Code      :For getting auto suggestion of sponsor hall and combination***/
	@RequestMapping(value = "/searchall", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurationChargesViewDto searchall(@RequestParam String letter,@RequestParam ("startIndex")Integer startIndex) {
		List<ConfigurationChargesViewDto> lstConfigurations = new ArrayList<ConfigurationChargesViewDto>();
		lstConfigurations = configServiceService.searchall(letter,startIndex);
		ConfigurationChargesViewDto obj = new ConfigurationChargesViewDto();
		obj.setLstConfigurations(lstConfigurations);
		return obj;

	}
	
	/**@Author    :BILAL
	 * @Date      :05-10-2017
	 * @Code      :For getting auto suggestion of  combination***/
	@RequestMapping(value = "/searchcombination", method = RequestMethod.POST)
	public @ResponseBody
	ConfigCombinationDto searchcombination(@RequestParam String letter,Integer startIndex) {
		List<ConfigCombinationDto> ltConfigurationFromView = new ArrayList<ConfigCombinationDto>();
		ltConfigurationFromView = configServiceService
				.searchcombination(letter,startIndex);
		ConfigCombinationDto obj = new ConfigCombinationDto();
		
		Integer combinationCntSearch=configServiceService.getComCntSearch(letter);
		obj.setCombinationCntSearch(combinationCntSearch);
		obj.setLstConfigurations(ltConfigurationFromView);
		return obj;
	}
	
	/**@Author    :BILAL
	 * @Date      :05-10-2017
	 * @Code      :For getting auto suggestion of  Sponsor***/
	@RequestMapping(value = "/searchsponsor", method = RequestMethod.POST)
	public @ResponseBody
	ConfigSponsorDto searchsponsor(@RequestParam String letter,Integer startIndex) {
		List<ConfigSponsorDto> ltsponsor = new ArrayList<ConfigSponsorDto>();
		ltsponsor = configServiceService
				.searchsponsor(letter,startIndex);
		ConfigSponsorDto obj = new ConfigSponsorDto();
		Integer sponCountSearch=configServiceService.getSponCntSearch(letter,startIndex);
		obj.setSponCountSearch(sponCountSearch);
		
		obj.setLstConfigurations(ltsponsor);
		return obj;
	}
	
	/**@Author    :BILAL
	 * @Date      :05-10-2017
	 * @Code      :For getting auto suggestion of  Hall wise***/
	@RequestMapping(value = "/searchhallwise", method = RequestMethod.POST)
	public @ResponseBody
	ConfigHallWiseDto searchhallwise(@RequestParam String letter) {
		List<ConfigHallWiseDto> lthall = new ArrayList<ConfigHallWiseDto>();
		lthall = configServiceService
				.searchhallwise(letter);
		ConfigHallWiseDto obj = new ConfigHallWiseDto();
		obj.setLstConfigurations(lthall);
		return obj;
	}
	
	/**@Author    :BILAL
	 * @Date      :23-10-2017
	 * @Code      :For getting auto suggestion of  Hall wise***/
	@RequestMapping(value = "/saveConfiguration2", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateConfigService2(
			ConfigurServicesDto configurServicesDto,
			HttpServletRequest request,
			@RequestParam(value = "configurationDetails") String configurationlist,
			@RequestParam("queryType") String queryType,
			@RequestParam(value = "hallandhallslave") String hallandhallslave,
			@RequestParam("masterId") Integer masterId,
			@RequestParam("serviceLastId") Integer serviceLastId) {
		
		
		int response = configServiceService.saveOrUpdateConfigService2(
				configurServicesDto, request, configurationlist,queryType,hallandhallslave,
				masterId,serviceLastId);
		
		return ((response == 1) ? "Saved Successfully"
				: ((response == 2) ? "Updated Successfully"
						: "Network Error!!!"));
	}
	
	/**
	 * @author  : BILAL
	 * @date    : 24-10-2017
	 * @code    : For fetching list of records hall wise
	 ***/
	@RequestMapping(value = "/fetchhallwiseservices", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurServicesDto fetchhallwiseservices(@RequestParam(value = "hallandhallslave") String hallandhallslave) {
		List<ConfigurServicesDto> lts = new ArrayList<ConfigurServicesDto>();
		lts = configServiceService
				.fetchhallwiseservices(hallandhallslave);
		ConfigurServicesDto obj = new ConfigurServicesDto();
		obj.setLstConfigurService(lts);
		return obj;
	}
	
	/**
	 * @author  : BILAL
	 * @date    : 09-01-2018
	 * @code    : For medical team charges and hall charges 
	 ***/
	@RequestMapping(value = "/fetchMedicalTeamCharges", method = RequestMethod.GET)
	public @ResponseBody
	ConfigurServicesDto fetchMedicalTeamCharges(@RequestParam("chargesId") int chargesId,
			@RequestParam("chargesSlaveId") int chargesSlaveId,
			@RequestParam("hallId") int hallId,
			@RequestParam("hallSlaveId") int hallSlaveId,
			@RequestParam("isComServId") int isComServId,
			@RequestParam("isComServlastId") int isComServlastId) {
		List<ConfigurServicesDto> lts = new ArrayList<ConfigurServicesDto>();
		lts = configServiceService
				.fetchMedicalTeamCharges(chargesId,chargesSlaveId,hallId,hallSlaveId,isComServId,isComServlastId);
		
		ConfigurServicesDto obj = new ConfigurServicesDto();
		obj.setLstConfigurService(lts);
		return obj;
	}
	
	/******
	 * @author     :BILAL
	 * @Date       :24-01-2018
	 * @Code       :For Save Year wise configuration 
	 * *********/
	@RequestMapping(value = "/saveYearWise", method = RequestMethod.POST)
	@ResponseBody
	public YearWiseConfigureDto saveandupdateYearWise(
			YearWiseConfigureDto yearWiseConfigureDto,
			HttpServletRequest request,
			@RequestParam(value = "configurationDetails") String configurationlist,
			@RequestParam(value = "configurationDetailsyear") String configurationDetailsyear,
			@RequestParam(value = "queryType") String queryType,
			@RequestParam(value = "from") Date fromDate,
			@RequestParam(value = "to") Date toDate) {
		
		YearWiseConfigureDto yearWiseConfigureDtolist = (YearWiseConfigureDto) ConfigUIJSONUtility
				.getObjectFromJSON(configurationDetailsyear,
						YearWiseConfigureDto.class);
		
		List<YearWiseConfigureDto> ltyear = new ArrayList<YearWiseConfigureDto>();
		ltyear = configServiceService.saveandupdateYearWise(
				 request, configurationlist, yearWiseConfigureDtolist.getLstyearwise().get(0),
				queryType,fromDate,toDate);
		
		YearWiseConfigureDto obj = new YearWiseConfigureDto();
		obj.setLstyearwise(ltyear);
		return obj;
		
	}
	
	/******
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For Save or override  Year wise configuration 
	 * *********/
	@RequestMapping(value = "/overrideYearWise", method = RequestMethod.POST)
	@ResponseBody
	public String overrideYearWise(
			
			@RequestParam(value = "configurationDetails") String configurationlist,
			HttpServletRequest request
			) {
		
		
		int response = configServiceService.overrideYearWise(
				configurationlist,request);
		
		return ((response == 1) ? "Override Successfully"
				: ((response == 2) ? "Updated Successfully"
						: "Network Error!!!"));
	}
	
	/******
	 * @author     :BILAL
	 * @Date       :25-01-2018
	 * @Code       :For getting list of year data 
	 * *********/
	@RequestMapping(value = "/getYearWisedata", method = RequestMethod.GET)
	public @ResponseBody
	YearWiseConfigureDto getSubServiceCategoryList() {
		List<YearWiseConfigureDto> ltyear = new ArrayList<YearWiseConfigureDto>();
		ltyear = configServiceService.getYearWisedata();
		YearWiseConfigureDto obj = new YearWiseConfigureDto();
		obj.setLstyearwise(ltyear);
		
		return obj;
	}
	
	/******
	 * @author     :BILAL
	 * @Date       :29-01-2018
	 * @Code       :For getting list of year data for edit
	 * *********/
	@RequestMapping(value = "/editYearWise", method = RequestMethod.GET)
	public @ResponseBody
	ConfigurationYearView editYearWise(@RequestParam("countDate") int countDate) {
		
		List<ConfigurationYearView> ltConfigyearFromViews = new ArrayList<ConfigurationYearView>();
		ltConfigyearFromViews = configServiceService.editYearWise(countDate);
		ConfigurationYearView obj = new ConfigurationYearView();
		obj.setLstyearview(ltConfigyearFromViews);
		return obj;
	}
	
	/******
	 * @author     :BILAL
	 * @Date       :29-01-2018
	 * @Code       :For delete data of year wise 
	 * *********/
	@RequestMapping(value = "/deleteYearWise", method = RequestMethod.POST)
	public @ResponseBody
	String deleteYearWise(
			@RequestParam("countDate") int countDate,HttpServletRequest request) {

		boolean response = configServiceService.deleteYearWise(
				countDate,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/******
	 * @author     :BILAL
	 * @Date       :31-01-2018
	 * @Code       :For getting list of year data for edit
	 * *********/
	@RequestMapping(value = "/getDataWithDate", method = RequestMethod.GET)
	public @ResponseBody
	ConfigurationYearView getDataWithDate(@RequestParam(value = "from") Date fromDate,
			@RequestParam(value = "to") Date toDate) {
		
		List<ConfigurationYearView> ltConfigyearFromViews = new ArrayList<ConfigurationYearView>();
		ltConfigyearFromViews = configServiceService.getDataWithDate(fromDate,toDate);
		ConfigurationYearView obj = new ConfigurationYearView();
		obj.setLstyearview(ltConfigyearFromViews);
		return obj;
	}
	/*******
	 * @author      :BILAL
	 * @Date        :12-03-2018
	 * @Code        :For import of sponsor records and hall records 
	 * ********/
	@RequestMapping(value="/importSponsor",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String importSponsor(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
	{
		int response =0;
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			 response =	configServiceService.importSponsor(UPLOAD_DIRECTORY + fileName,request);
		}
		
		
		return ((response == 1) ? "Sponsor File Imported Successfully"
				
						: "Network Error!!!");
	}
	/*******
	 * @author      :BILAL
	 * @Date        :12-03-2018
	 * @Code        :For import of hall records  
	 * ********/
	@RequestMapping(value="/importhall",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String importhall(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
	{
		int response =0;
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			 response =	configServiceService.importhall(UPLOAD_DIRECTORY + fileName,request);
		}
		
		
		return ((response == 1) ? "Hall Wise File Imported Successfully"
				
						: "Network Error!!!");
	}
	
	/***********
	 * @author	: Vinod Udawant
	 * @date	: 08-05-2019
	 * @base	: For Import Configuration excel dynamically 
	 ***********/
	@RequestMapping(value="/importConfiguration",method = { org.springframework.web.bind.annotation.RequestMethod.POST })
	public @ResponseBody String importConfiguration(HttpServletRequest request,@RequestParam("file") MultipartFile file) 
	{
		int response =0;
		String UPLOAD_DIRECTORY = FilePath.getBasePath1();
		String fileName=file.getOriginalFilename();
		File serverLocation=new File(UPLOAD_DIRECTORY);
		if(!serverLocation.exists()){
			serverLocation.mkdir();
		}
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				File serverFile = new File(UPLOAD_DIRECTORY + File.separator + fileName);
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			 response =	configServiceService.importConfiguration(UPLOAD_DIRECTORY + fileName,request);
		}		
		
		return ((response == 1) ? "Confuguration Master File Imported Successfully" : "Network Error!!!");
	}
	
	
	/**
	 * @author  : Rohini Ambhore
	 * @date    : 17_Jan_2024
	 * @code    : For saving or updating records of sub service
	 ***/
	@RequestMapping(value = "/saveOrUpdateRegistrationConfigCharges", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateRegistrationConfigCharges(
			ConfigurRegistrationServicesDto configurServicesDto,
			HttpServletRequest request,
			/* @RequestParam(value = "configurationDetails") String configurationlist, */
			@RequestParam Integer configId,
			@RequestParam("queryType") String queryType,
			
			@RequestParam("chargesId") Integer chargesId,
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("masterId") Integer masterId,
			@RequestParam("HallId") Integer HallId,
			@RequestParam("HallSlaveId") Integer HallSlaveId,
			@RequestParam("hallCharges") double hallCharges,
			@RequestParam("medicalCharges") double medicalCharges,
			@RequestParam("isComServId") Integer isComServId,
			@RequestParam("isComServlastId") Integer isComServlastId,
			@RequestParam("opdCharges") double opdCharges,
			@RequestParam("ipdCharges") double ipdCharges,
			@RequestParam("diagCharges") double diagCharges) {
		
		
		int response = configServiceService.saveOrUpdateRegistrationConfigCharges(configurServicesDto, request, configId,
				queryType, chargesId, chargesSlaveId, masterId,
				HallId, HallSlaveId, hallCharges, medicalCharges, isComServId,isComServlastId,opdCharges,ipdCharges,diagCharges);

		return ((response == 1) ? "Saved Successfully"
				: ((response == 2) ? "Updated Successfully"
						: "Network Error!!!"));
	}
	
	/**
	 * @author  : Rohini AMbhore
	 * @date    : 19_Jan_2024
	 * @code    : For used to display configuration list
	 ***/
	@RequestMapping(value = "/getConfigurationRegistrationChargeList", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurationRegistrationChargesViewDto getConfigurationRegistrationChargeList() {
		List<ConfigurationRegistrationChargesViewDto> ltConfigurationFromView = new ArrayList<ConfigurationRegistrationChargesViewDto>();
		ltConfigurationFromView = configServiceService.getConfigurationRegistrationChargeList();
		ConfigurationRegistrationChargesViewDto obj = new ConfigurationRegistrationChargesViewDto();
		obj.setLstConfigurations(ltConfigurationFromView);
	
		return obj;
	}
	
	
	@RequestMapping(value = "/getupdateConfigurationRegCharge", method = RequestMethod.POST)
	public @ResponseBody
	ConfigurRegistrationServicesDto getupdateConfigurationRegCharge(@RequestParam("chargesId") Integer chargesId, 
			@RequestParam("chargesSlaveId") Integer chargesSlaveId,
			@RequestParam("hallId") Integer hallId, 
			@RequestParam("hallSlaveId") Integer hallSlaveId) {
		List<ConfigurRegistrationServicesDto> ltConfigurationFromViews = new ArrayList<ConfigurRegistrationServicesDto>();
		ltConfigurationFromViews = configServiceService.getupdateConfigurationRegCharge(chargesId , chargesSlaveId,
				hallId,hallSlaveId);
		ConfigurRegistrationServicesDto obj = new ConfigurRegistrationServicesDto();
		obj.setLstConfigurService(ltConfigurationFromViews);
		return obj;
	}
}
