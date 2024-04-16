package com.hms.administrator.dao;

import java.util.List;

import com.hms.administrator.dto.HospitalDetailsDTO;

public interface ChannelHospitalMgmtDao {
	public int saveHospitaldetails(HospitalDetailsDTO hobj);

	public List<HospitalDetailsDTO> setExistingHospitalTemp(Integer unitId);

	public HospitalDetailsDTO editChannelHospitalMgmt(Integer hosId);

	public boolean deleteChannelHospitalMgmt(HospitalDetailsDTO obj);
	
	public List<HospitalDetailsDTO>   channelHospitalAutoSuggestion(String hospitalName,Integer unitId);

}
