package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.dto.AdminTalukaDTO;
import com.hms.administrator.dto.BusinessCustMasterDto;
import com.hms.adminstrator.service.BusinessCustMasterService;
import com.hms.common.dto.TmCmLookupDet;
import com.hms.common.service.CommonCodeVar;
import com.hms.common.service.TmLookupService;

@RestController
@RequestMapping(value = "/businessCustMaster")
public class BusinessCustMasterController {
	
	static Logger log=Logger.getLogger(BusinessCustMasterController.class.getName());

	@Autowired
	private TmLookupService tmLookupService;
	
	@Autowired
	BusinessCustMasterService businesscustmasterservice;
	
	@RequestMapping(value = "/getalltype", method = RequestMethod.GET)
	public BusinessCustMasterDto getAllType(HttpServletRequest request) {
		 BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
		 Integer lookupId = tmLookupService.getLookupIdByCode(CommonCodeVar.LABTYPELOOKUP);
			List<TmCmLookupDet>  lookupDec =tmLookupService.getLookupDecById(lookupId);
			businessMasterDto.setTmCmLookupDetLookupList(lookupDec);
		return businessMasterDto;
	}
	
	@RequestMapping(value = "/getAllState", method = RequestMethod.POST)
	public AdminStateDTO getAllState(HttpServletRequest request) {
		AdminStateDTO obj = new AdminStateDTO();
			List<AdminStateDTO>  list = businesscustmasterservice.getAllState();
			obj.setStateList(list);
		return obj;
	}
	
	@RequestMapping(value = "/getAllDistrict", method = RequestMethod.POST)
	public AdminDistrictDTO getAllDistrict(HttpServletRequest request) {
		AdminDistrictDTO obj = new AdminDistrictDTO();
			List<AdminDistrictDTO>  list = businesscustmasterservice.getAllDistrict();
			obj.setDistrictList(list);
		return obj;
	}
	
	@RequestMapping(value = "/getAllTaluka", method = RequestMethod.POST)
	public AdminTalukaDTO getAllTaluka(HttpServletRequest request) {
		AdminTalukaDTO obj = new AdminTalukaDTO();
			List<AdminTalukaDTO>  list = businesscustmasterservice.getAllTaluka();
			obj.setTalukaList(list);
		return obj;
	}
	
	@RequestMapping(value = "/getAllTown", method = RequestMethod.POST)
	public AdminCityDTO getAllTown(HttpServletRequest request) {
			AdminCityDTO obj = new AdminCityDTO();
			List<AdminCityDTO>  list = businesscustmasterservice.getAllTown();
			obj.setCityList(list);
		return obj;
	}

	@RequestMapping(value = "/saveBusinessCustMaster", method = RequestMethod.POST)
	public int savePartyMaster(
			BusinessCustMasterDto businessMasterDto,@RequestParam("businessMasterGeneralInfoDtoList") String businessMasterGeneralInfoDtoList,
			@RequestParam("businessMasterContactInfoDtoList") String businessMasterContactInfoDtoList,
			@RequestParam("businessMasterAddressInfoDtoList") String businessMasterAddressInfoDtoList, 
			@RequestParam("businessMasterPaymentInfoDtoList") String businessMasterPaymentInfoDtoList, 
			@RequestParam("businessMasterTermsAndConditionInfoDtoList") String businessMasterTermsAndConditionInfoDtoList, 
			@RequestParam("businessMasterContractInfoDtoList") String businessMasterContractInfoDtoList,
			@RequestParam("businessMasterUploadDocInfoDtoList") String businessMasterUploadDocInfoDtoList,@RequestParam("businessMasterMarketingInfoDtoList") String businessMasterMarketingInfoDtoList,HttpServletRequest request) {
		log.info("saveBusinessCustMaster..");

		try {
		int status = businesscustmasterservice.saveBusinessCustMaster(businessMasterDto,
				businessMasterGeneralInfoDtoList, businessMasterContactInfoDtoList,
				businessMasterAddressInfoDtoList, businessMasterPaymentInfoDtoList, businessMasterTermsAndConditionInfoDtoList,
				businessMasterContractInfoDtoList, businessMasterUploadDocInfoDtoList,businessMasterMarketingInfoDtoList, request);
		 log.debug("reponse  saveBusinessCustMaster....."+status);
		 return status;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	@RequestMapping(value = "/getAllBusinessLabMaster", method = RequestMethod.GET)
	public BusinessCustMasterDto getAllBusinessLabMaster(HttpServletRequest request) {
		List<BusinessCustMasterDto> businessLabMasterDtoDtoList = new ArrayList<BusinessCustMasterDto>();
		
		log.info("getAllBusinessLabMaster..");
		businessLabMasterDtoDtoList = businesscustmasterservice.getAllBusinessLabMaster(request);
		log.debug("reponse  getAllBusinessLabMaster....."+businessLabMasterDtoDtoList);
		
		String rowCount = "0";
		
		 BusinessCustMasterDto businessLabMasterDto = new BusinessCustMasterDto();
		 businessLabMasterDto.setBusinessMasterDto(businessLabMasterDtoDtoList);
		 businessLabMasterDto.setRowCount(rowCount);
		 
		return businessLabMasterDto;
	}

	@RequestMapping(value = "/editBusinessMaster", method = RequestMethod.GET)
	public BusinessCustMasterDto editBusinessMaster(
			@RequestParam("id") Integer businessMasterId) {
		BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
		log.info("editBusinessMaster..");
		businessMasterDto = businesscustmasterservice.editBusinessMaster(businessMasterId);
		 log.debug("reponse  editPartyMaster....."+businessMasterDto);
		return businessMasterDto;
	}

	@RequestMapping(value = "/businessMasterAutoSuggestion", method = RequestMethod.POST)
	public BusinessCustMasterDto businessMasterAutoSuggestion(
			@RequestParam("name") String businessMasterName,@RequestParam("type") Integer type,@RequestParam("flag") String flag,@RequestParam("unitId") Integer unitId) {
	
		return businesscustmasterservice.businessMasterAutoSuggestion(businessMasterName, type, flag, unitId);

	}

	@RequestMapping(value = "/getBusinessMasterById", method = RequestMethod.GET)
	public BusinessCustMasterDto getBusinessMasterById(
			@RequestParam("id") Integer businessMasterId,@RequestParam("flag") String flag,@RequestParam("unitId") Integer unitId) {
		BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
		log.info("getPartyMasterById..");
		businessMasterDto = businesscustmasterservice.getBusinessMasterById(businessMasterId,flag,unitId);
		 log.debug("reponse  getPartyMasterById....."+businessMasterDto);
		return businessMasterDto;
	}	
	
	@RequestMapping(value = "/deleteBusinessMasterSlave", method = RequestMethod.POST)
	public String deleteBusinessMasterSlave(
			@RequestParam("id") Integer slavId,@RequestParam("Callfrom") String callfrom,
			HttpServletRequest request) {
		log.info("deleteBusinessMaster..");
		boolean status = businesscustmasterservice.deleteBusinessMasterSlave(slavId, callfrom, request);
				
		 log.debug("reponse  deleteBusinessMaster....."+status);
		String message = "";
		if (status == true) {
			message = "Records Deleted Sucessfully";
		} else {
			message = "Something went wrong...";
		}
		return message;
	}

	@RequestMapping(value = "/getCustomersFromType", method = RequestMethod.POST)
	public BusinessCustMasterDto getCustomersFromType(@RequestParam("type") Integer type) {
		BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
		List<BusinessCustMasterDto> list = businesscustmasterservice.getCustomersFromType(type);
		businessMasterDto.setBusinessMasterDto(list);
		return businessMasterDto;
	}
	
	@RequestMapping(value = "/getCustomersFromTypeByIds", method = RequestMethod.POST)
	//@ResponseBody
	public BusinessCustMasterDto getCustomersFromTypeByIds(@RequestParam("type") String type) {
		BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
		List<BusinessCustMasterDto> list = businesscustmasterservice.getCustomersFromTypeByIds(type);
		businessMasterDto.setBusinessMasterDto(list);
		return businessMasterDto;
	}
	
	@RequestMapping(value = "/getCustomerNameByUnitId", method = RequestMethod.POST)
	public BusinessCustMasterDto getCustomerNameByUnitId(@RequestParam("unitId") Integer unitId) {
		BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
		List<BusinessCustMasterDto> list = businesscustmasterservice.getCustomerNameByUnitId(unitId);
		businessMasterDto.setBusinessMasterDto(list);
		return businessMasterDto;
	}	

}
