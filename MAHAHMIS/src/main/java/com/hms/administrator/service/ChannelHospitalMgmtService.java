package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalDetailsDTO;

public interface ChannelHospitalMgmtService {
	public int saveHospitaldetails(HospitalDetailsDTO hobj,HttpServletRequest request);

	public List<HospitalDetailsDTO> setExistingHospitalTemp(Integer unitId,HttpServletRequest request);

	public HospitalDetailsDTO editChannelHospitalMgmt(Integer hosId);

	public boolean deleteChannelHospitalMgmt(Integer hosId, HttpServletRequest request);
	
	public List<HospitalDetailsDTO>   channelHospitalAutoSuggestion(String hospitalName,Integer unitId);

}
