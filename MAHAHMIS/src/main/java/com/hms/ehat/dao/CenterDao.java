package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.dto.CenterMasterDTO;
import com.hms.dto.HospitalMasterDTO;
import com.hms.dto.OpdTokenLimitDto;
import com.hms.dto.TypeMasterDTO;
import com.hms.dto.YearMasterDTO;

public interface CenterDao {

	public int saveorUpdateStateMaster(StateMasterDto roommsater);	
	public List<StateMasterDto> getAllStateMaster();
	public StateMasterDto editStateMaster(Integer stateId);
	public boolean deleteStateMaster(StateMasterDto stateMaster);
	
	public int saveDistrictMaster(DistrictMasterDto districtMaster);	
	public List<DistrictMasterDto> getAllDistrictMaster();
	public DistrictMasterDto editDistrictMaster(Integer districtId);
	public boolean deleteDistrictMaster(DistrictMasterDto districtMaster);
	
	public int saveTypeMaster(TypeMasterDTO tObj);
	public List<TypeMasterDTO> getAllTypeMaster();
	public TypeMasterDTO editTypeMaster(Integer typeId);
	public boolean deleteTypeMaster(TypeMasterDTO tObj);
	public List<TypeMasterDTO> getAllITypeMasterAutosuggestion(String typeName);
	
	public int saveHospitalMaster(HospitalMasterDTO hObj);
	public List<HospitalMasterDTO> getAllHospitalMaster();
	public HospitalMasterDTO editHospitalMaster(Integer hospitalId);
	public boolean deleteHospitalMaster(HospitalMasterDTO hObj);
	public List<HospitalMasterDTO> getAllHospitalMasterAutosuggestion(String hospitalCode);
	
	public int saveYearMaster(YearMasterDTO yObj);
	public List<YearMasterDTO> getAllYearMaster();
	public YearMasterDTO editYearMaster(Integer yearId);
	public boolean deleteYearMaster(YearMasterDTO yObj);
	public List<YearMasterDTO> getAllYearMasterAutosuggestion(String year);
	
	public List<DistrictMasterDto> getAllDistrictBystateId(Integer stateId);
	
	public int saveCenterMaster(CenterMasterDTO cObj);
	public List<CenterMasterDTO> getAllCenterMaster();
	public CenterMasterDTO editCenterMaster(Integer centerId);
	public boolean deleteCenterMaster(CenterMasterDTO cObj);
	public List<CenterMasterDTO> getAllCenetrMasterAutosuggestion(String centerName);
	
	public List<StateMasterDto> getAllStateMasterAutosuggestion(String stateName);
	
	public List<DistrictMasterDto> getAllDistrictMasterAutosuggestion(String districtName);
	
	
	public int saveTokenLimitMaster(OpdTokenLimitDto TokenMaster);	
	public List<OpdTokenLimitDto> getAllSpecialityMaster();
	public OpdTokenLimitDto editSpecialityMaster(Integer tokenid);
	public boolean deleteSpecialityMaster(OpdTokenLimitDto TokenMaster);	

	
	public List<OpdTokenLimitDto> getAllSpecialityMasterAutosuggestion(String specializationName);

}
