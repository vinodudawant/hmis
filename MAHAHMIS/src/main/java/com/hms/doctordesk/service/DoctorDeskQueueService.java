package com.hms.doctordesk.service;

import java.util.List;

import com.hms.doctordesk.dto.DoctorDeskCountDto;
import com.hms.doctordesk.dto.Doctordeskipddto;
import com.hms.doctordesk.dto.Doctordeskopderdto;

public interface DoctorDeskQueueService {
	
	List<Doctordeskopderdto> fetchDoctorDeskDeshboard(Integer depid,Integer unitId,Integer userId1, String userType,Integer startIndex);
	List<Doctordeskipddto> fetchIpdDoctorDeskDeshboard(Integer depid,Integer unitId,Integer userId1,String userType,Integer startIndex);
	List<Doctordeskopderdto> serachDoctorDeskDeshboard(Integer depid,Integer unitId,Integer userId1,String userType,Integer selectsearchby,String value);
	List<Doctordeskipddto> serachDoctorDeskDeshboardIpd(Integer depid,Integer unitId,Integer userId1,String userType,Integer selectsearchby,String value);
	List<Doctordeskopderdto> serachDateWiseQuque(Integer depid,Integer unitId,Integer userId1,String userType,String fdate,String tdate);
	List<Doctordeskipddto> serachDateWiseQuqueIpd(Integer depid,Integer unitId,Integer userId1,String userType,String fdate,String tdate);
	DoctorDeskCountDto doctorDeskPatientCount(Integer unitid);

	
}
