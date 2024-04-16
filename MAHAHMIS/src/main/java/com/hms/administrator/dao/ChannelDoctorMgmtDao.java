package com.hms.administrator.dao;

import java.util.List;

import com.hms.administrator.dto.Chanelling_doctor;

public interface ChannelDoctorMgmtDao {
	public int saveReferToDoc(Chanelling_doctor cobj);

	public List<Chanelling_doctor> setExistingDoctorTemp(Integer unitId);
	
	public List<Chanelling_doctor> setExistingDoctorTemp1();
	
	public Integer setnewDocTemp();

	public Chanelling_doctor editChannelDoctorMgmt(Integer doctorId);

	public boolean deleteChannelDoctorMgmt(Chanelling_doctor cobj);
	
	public List<Chanelling_doctor>   channelDoctorAutoSuggestion(String doctorName,Integer unitId);

}
