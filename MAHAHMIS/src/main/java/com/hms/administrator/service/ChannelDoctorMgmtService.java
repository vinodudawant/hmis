package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.Chanelling_doctor;

public interface ChannelDoctorMgmtService {
	public int saveReferToDoc(Chanelling_doctor cobj,HttpServletRequest request);

	public List<Chanelling_doctor> setExistingDoctorTemp(Integer unitId,HttpServletRequest request);

	public Chanelling_doctor editChannelDoctorMgmt(Integer doctorId);

	public boolean deleteChannelDoctorMgmt(Integer doctorId, HttpServletRequest request);
	
	public List<Chanelling_doctor>   channelDoctorAutoSuggestion(String doctorName,Integer unitId);
	
	public Integer setnewDocTemp(String action,HttpServletRequest request);
	
	public List<Chanelling_doctor> setExistingDoctorTemp1(HttpServletRequest request);

}
