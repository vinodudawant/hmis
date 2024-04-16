package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.dto.ReqMasterDto;
import com.hms.ehat.dto.ServiceMasterDto;

public interface ServiceDao {

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update Services
	int saveOrUpdateService(ServiceMasterDto serviceMaster,String comb,int sid);

	//@author: Irfan Khan @date: 17-May-2017 @reason : Delete By serviceId
	Boolean deleteService(Integer serviceId, Integer userId);

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Service List
	ServiceMasterDto getAllService();
	
	//@author : SAgar Kadam @date: 11-july-2017 @reason : To Fetch Service List For user access flow
	ServiceMasterDto getAllServiceByUserAccess(int userId);
	 
	//@author: Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search
	List<ServiceMasterDto> getAutoSuggestionServiceNames(String letter);
	
	Long getServiceCount();

	ServiceMasterDto fetchServiceListCom();

	int saveOrUpdateReq(ReqMasterDto reqMasterDto, int reqId);

	ReqMasterDto getAllReqByUserAccess(int userId);

	ReqMasterDto fetchReqList();

	boolean deleteReqMaster(Integer reqId, Integer userId);

	List<ReqMasterDto> autoSuggestionReqMasterNames(String letter);

	Long getreqCount();
	
	List<CustomizeTemplate> getTemplateListByType(HttpServletRequest request,String value);

	

}
