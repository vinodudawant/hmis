package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DeptMasterDto;

public interface EhatDao {

	/**
	 * @Bilal 16_May_2017 declared Methods for Charges Master
	 * ***/
	/*Boolean saveOrUpdateCharges(ChargesMasterDto chargesMaster);

	List<ChargesMasterDto> getCharges();

	Boolean deleteCharges(Integer ChargesId );

	List<ChargesMasterDto> getAutoSuggestionChargesNames(String letter);

	List<ChargesMasterDto> getChargesById(Integer chargesId);

	List<ChargesMasterDto> getAllCharges();

	List<ChargesMasterDto> getAllChargeswithDeleted();*/
	
	
	/**
	 * @sagar 16_May_2017 declared Methods for Department Master
	 * ***/
	Boolean saveOrUpdateDept(DeptMasterDto deptMaster);

	List<DeptMasterDto> getDept();

	Boolean deleteDept(Integer unitId);

	List<DeptMasterDto> getAutoSuggestionDeptNames(String letter);

	List<DeptMasterDto> getDeptById(Integer unitId);

	List<DeptMasterDto> getAllDept();

	List<DeptMasterDto> getAllDeptwithDeleted();

}
