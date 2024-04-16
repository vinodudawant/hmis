package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.dto.ReqMasterDto;
import com.hms.ehat.dto.ServiceMasterDto;

public interface ServService {

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update Services
	int saveOrUpdateService(ServiceMasterDto serviceMaster,HttpServletRequest request);

	// @author : Irfan Khan @date: 17-May-2017 @reason : Delete By serviceId
	Boolean deleteService(Integer serviceId, HttpServletRequest request);

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Service List
	ServiceMasterDto getAllService(HttpServletRequest request);
	
	//@author: Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search
	List<ServiceMasterDto> getAutoSuggestionServiceNames(String letter);
	
	Long getServiceCount();

	ServiceMasterDto fetchServiceListCom(HttpServletRequest request);

	int saveOrUpdateReq(ReqMasterDto reqMasterDto, HttpServletRequest request);

	ReqMasterDto fetchReqList(HttpServletRequest request);

	boolean deleteReqMaster(Integer reqId, HttpServletRequest request);

	List<ReqMasterDto> autoSuggestionReqMasterNames(String letter);

	Long getreqCount();

	ServiceMasterDto getAllServiceList2(HttpServletRequest request);
	
	List<CustomizeTemplate> getTemplateListByType(HttpServletRequest request,String value);

	
}
