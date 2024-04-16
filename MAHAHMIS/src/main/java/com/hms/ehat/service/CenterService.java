package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.dto.CenterMasterDTO;
import com.hms.dto.HospitalMasterDTO;
import com.hms.dto.OpdTokenLimitDto;
import com.hms.dto.TypeMasterDTO;
import com.hms.dto.YearMasterDTO;

public interface CenterService {

	public int saveorUpdateStateMaster(StateMasterDto stateMaster,HttpServletRequest request);	
	public List<StateMasterDto> getAllStateMaster();
	public StateMasterDto editStateMaster(Integer stateId);
	public boolean deleteStateMaster(Integer stateId, HttpServletRequest request);
	
	public int saveDistrictMaster(DistrictMasterDto districtMaster,HttpServletRequest request);	
	public List<DistrictMasterDto> getAllDistrictMaster();
	public DistrictMasterDto editDistrictMaster(Integer districtId);
	public boolean deleteDistrictMaster(Integer districtId, HttpServletRequest request);	
	
	public int saveTypeMaster(TypeMasterDTO tObj,HttpServletRequest request);
	public List<TypeMasterDTO> getAllTypeMaster();
	public TypeMasterDTO editTypeMaster(Integer typeId);
	public boolean deleteTypeMaster(Integer typeId, HttpServletRequest request);
	public List<TypeMasterDTO> getAllITypeMasterAutosuggestion(String typeName);
	
	public int saveHospitalMaster(HospitalMasterDTO hObj,HttpServletRequest request);
	public List<HospitalMasterDTO> getAllHospitalMaster();
	public HospitalMasterDTO editHospitalMaster(Integer hospitalId);
	public boolean deleteHospitalMaster(Integer hospitalId, HttpServletRequest request);
	public List<HospitalMasterDTO> getAllHospitalMasterAutosuggestion(String hospitalCode);
	
	public int saveYearMaster(YearMasterDTO yObj,HttpServletRequest request);
	public List<YearMasterDTO> getAllYearMaster();
	public YearMasterDTO editYearMaster(Integer yearId);
	public boolean deleteYearMaster(Integer yearId, HttpServletRequest request);
	public List<YearMasterDTO> getAllYearMasterAutosuggestion(String year);
	
	public List<DistrictMasterDto> getAllDistrictBystateId(Integer stateId);
	
	public int saveCenterMaster(CenterMasterDTO cObj,HttpServletRequest request);
	public List<CenterMasterDTO> getAllCenterMaster();
	public CenterMasterDTO editCenterMaster(Integer centerId);
	public boolean deleteCenterMaster(Integer centerId, HttpServletRequest request);
	public List<CenterMasterDTO> getAllCenetrMasterAutosuggestion(String centerName);
	
	public List<StateMasterDto> getAllStateMasterAutosuggestion(String stateName);
	
	public List<DistrictMasterDto> getAllDistrictMasterAutosuggestion(String districtName);
	
	
	public int saveTokenLimitMaster(OpdTokenLimitDto TokenMaster,HttpServletRequest request);	
	public List<OpdTokenLimitDto> getAllSpecialityMaster();
	public OpdTokenLimitDto editSpecialityMaster(Integer tokenid);
	public boolean deleteSpecialityMaster(Integer tokenid, HttpServletRequest request);	
	
	
	public List<OpdTokenLimitDto> getAllSpecialityMasterAutosuggestion(String specializationName);

}
