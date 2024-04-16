package com.hms.adminstrator.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.dto.AdminTalukaDTO;
import com.hms.administrator.dto.BusinessCustMasterDto;

public interface BusinessCustMasterDao {
	
	List<AdminStateDTO> getAllState();
	List<AdminDistrictDTO> getAllDistrict();
	List<AdminTalukaDTO> getAllTaluka();
	List<AdminCityDTO> getAllTown();
	
	int saveBusinessCustMaster(BusinessCustMasterDto businessMasterDto, String businessMasterGeneralInfoDtoList,
			String businessMasterContactInfoDtoList, String businessMasterAddressInfoDtoList,
			String businessMasterPaymentInfoDtoList, String businessMasterTermsAndConditionInfoDtoList,String businessMasterContractInfoDtoList,
			String businessMasterUploadDocInfoDtoList,String businessMasterMarketingInfoDtoList, HttpServletRequest request);

	List<BusinessCustMasterDto> getAllBusinessLabMaster(HttpServletRequest request);

	BusinessCustMasterDto editBusinessMaster(Integer businessMasterId);

	BusinessCustMasterDto businessMasterAutoSuggestion(String businessMasterName, Integer type, String flag,
			Integer unitId);

	BusinessCustMasterDto getBusinessMasterById(Integer businessMasterId, String flag, Integer unitId);
	
	boolean deleteBusinessMasterSlave(Integer businessMasterId,String Callfrom, HttpServletRequest request);

	List<BusinessCustMasterDto> getCustomersFromType(Integer type);
	
	List<BusinessCustMasterDto> getCustomersFromTypeByIds(String type);

	List<BusinessCustMasterDto> getCustomerNameByUnitId(Integer unitId);
}
