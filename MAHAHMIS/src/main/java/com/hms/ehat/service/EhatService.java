package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DeptMasterDto;

public interface EhatService {

	/** @Bilal 16_May_2017 
	 * declared Methods for Charges Master 
	 * ***/
	
	/*Boolean saveOrUpdateCharges(ChargesMasterDto chargesMaster,HttpServletRequest request);

	List<ChargesMasterDto> getCharges();

	Boolean deleteCharges(Integer ChargesId, HttpServletRequest request);

	List<ChargesMasterDto> getAutoSuggestionChargesNames(String letter);

	List<ChargesMasterDto> getChargesById(Integer chargesId);

	List<ChargesMasterDto> getAllCharges();

	List<ChargesMasterDto> getAllChargeswithDeleted();*/
	
	
	/** @Sagar 16_May_2017 
	 * declared Methods for Department Master 
	 * ***/
	
	Boolean saveOrUpdateDept(DeptMasterDto deptMaster);

	List<DeptMasterDto> getDept();

	Boolean deleteDept(Integer unitId);

	List<DeptMasterDto> getAutoSuggestionDeptNames(String letter);

	List<DeptMasterDto> getDeptById(Integer unitId);

	List<DeptMasterDto> getAllDept();

	List<DeptMasterDto> getAllDeptwithDeleted();

}
