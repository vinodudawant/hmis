package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.dto.ReqMasterDto;
import com.hms.ehat.dao.DeptDao;
import com.hms.ehat.dao.ServiceDao;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.service.ServService;

@Service
public class ServServiceImpl implements ServService {

	@Autowired
	ServiceDao servicedao;
	
	//@author : Sagar Kadam @date: 12-july-2017 @reason : properties file for user access flow 
	
		DeptDao deptDao;
		ResourceBundle resourceBundleEhat = ResourceBundle
				.getBundle("EhatEnterpriseConfigurationFile");
		String userAccessFlow = resourceBundleEhat.getObject(
				"userAccessFlow").toString();

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update Services
	@Override
	@Transactional
	public int saveOrUpdateService(ServiceMasterDto serviceMaster,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");//current login user id
		String s1=request.getParameter("iscombination"); 		//added by sagar
		int sid=serviceMaster.getServiceId();					//added by sagar
		if (serviceMaster.getServiceId() == 0) { // To Insert Record
			
			serviceMaster.setServiceName(serviceMaster.getServiceName());
			serviceMaster.setServiceCode(serviceMaster.getServiceCode());

			serviceMaster.setCreatedBy(userId);
			serviceMaster.setCreatedBy(serviceMaster.getCreatedBy());

			serviceMaster.setDeleted("N");
			serviceMaster.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			serviceMaster.setIscombination(s1);
			
			
		} else {// To Update Record

			serviceMaster.setUpdatedBy(userId);
			serviceMaster.setUpdatedBy(serviceMaster.getUpdatedBy());

			serviceMaster.setDeleted("N");
			serviceMaster.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		int a = servicedao.saveOrUpdateService(serviceMaster,s1,sid);//call to function in DAO
		int val=0;
		if (a==3) {
			val=3;
		} else {
			 val=((a == 1) ? (serviceMaster.getServiceId() == 0 ? 1 : 2) : 0);
		}
		
		//Set value accordinly insert =1 and update =2
		return val;
	}

	//@author: Irfan Khan @date: 17-May-2017 @reason : Delete By serviceId
	@Override
	@Transactional
	public Boolean deleteService(Integer serviceId, HttpServletRequest request) {

		HttpSession session = request.getSession();//To get session
		Integer userId = (Integer) session.getAttribute("userId1");//To get current userid
		
		return servicedao.deleteService(serviceId, userId);
	}

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Service List /EhatEnterprise/WebContent/images/Advertisement
	@Override
	@Transactional
	public ServiceMasterDto getAllService(HttpServletRequest request) {
		
		//@author : Sagar Kadam @date: 12-july-2017 @reason : To Fetch Service List for user access flow
		if(userAccessFlow.equalsIgnoreCase("on")){
 			HttpSession session = request.getSession();
			int userId = (Integer) session.getAttribute("userId1");
			return servicedao.getAllServiceByUserAccess(userId);
		}
		else{
			
			return servicedao.getAllService();
		}
	 
	}

	//@author: Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search
	@Override
	@Transactional
	public List<ServiceMasterDto> getAutoSuggestionServiceNames(String letter) {

		return servicedao.getAutoSuggestionServiceNames(letter);
	}
	
	/**
	 * @author: Kishor Lokhabde
	 *  @date 22_May_2017 this Methods is used to call dao methods
	 * ***/
	
	@Transactional
	public Long getServiceCount() {
		// TODO Auto-generated method stub
		return servicedao.getServiceCount();
	}

	/**
	 * @author Bilal
	 * @date   31-july-2017
	 * @code   for service list of is combination**/
	@Override
	@Transactional
	public ServiceMasterDto fetchServiceListCom(HttpServletRequest request) {
		
		/*if(userAccessFlow.equalsIgnoreCase("off")){
 			HttpSession session = request.getSession();
			int userId = (Integer) session.getAttribute("userId1");
			return servicedao.getAllServiceByUserAccess(userId);
		}
		else{*/
			
			return servicedao.fetchServiceListCom();
		/*}*/
	}
	/*-------------------------*/
	
	//@author :  Kishor Lokhande @date: 12-Sept-2017 @reason : To Save and Update Services
		@Override
		@Transactional
		public int saveOrUpdateReq(ReqMasterDto reqMasterDto,
				HttpServletRequest request) {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");//current login user id
			//String s1=request.getParameter("iscombination"); 		//added by sagar
			int reqId=reqMasterDto.getReqId();					//added by sagar
			if (reqMasterDto.getReqId() == 0) { // To Insert Record
				
				
				reqMasterDto.setCreatedBy(userId);
				reqMasterDto.setCreatedBy(reqMasterDto.getCreatedBy());

				reqMasterDto.setDeleted("N");
				reqMasterDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				//reqMasterDto.setIscombination(s1);
				
				
			} else {// To Update Record

				reqMasterDto.setUpdatedBy(userId);
				reqMasterDto.setUpdatedBy(reqMasterDto.getUpdatedBy());

				reqMasterDto.setDeleted("N");
				reqMasterDto.setUpdatedDate(new Date(new java.util.Date()
						.getTime()));
			}

			int a = servicedao.saveOrUpdateReq(reqMasterDto,reqId);//call to function in DAO

			//Set value accordinly insert =1 and update =2
			return ((a == 1) ? (reqMasterDto.getReqId() == 0 ? 1 : 2) : 0);
		}

		
	
	
		//@author :  Kishor Lokhande @date: 12-Sept-2017 : To Fetch Service List
		@Override
		@Transactional
		public ReqMasterDto fetchReqList(HttpServletRequest request) {
			
			//@author :  Kishor Lokhande @date: 12-Sept-2017 @reason : To Fetch Service List for user access flow
			/*if(userAccessFlow.equalsIgnoreCase("on")){
	 			HttpSession session = request.getSession();
				int userId = (Integer) session.getAttribute("userId1");
				return servicedao.getAllReqByUserAccess(userId);
			}
			else{
				
				return servicedao.fetchReqList();
			}*/
			return servicedao.fetchReqList();
		}

		
		//@author: Kishor Lokhande @date: 12-Sept-2017 : Delete By serviceId
		@Override
		@Transactional
		public boolean deleteReqMaster(Integer reqId, HttpServletRequest request) {

			HttpSession session = request.getSession();//To get session
			Integer userId = (Integer) session.getAttribute("userId1");//To get current userid
			
			return servicedao.deleteReqMaster(reqId, userId);
		}

		
		
		@Override
		@Transactional
		public List<ReqMasterDto> autoSuggestionReqMasterNames(String letter) {

			return servicedao.autoSuggestionReqMasterNames(letter);
		}

		@Override
		@Transactional
		public Long getreqCount() {
			// TODO Auto-generated method stub
			return servicedao.getreqCount();
		}

		@Override
		@Transactional
		public ServiceMasterDto getAllServiceList2(HttpServletRequest request) {
			
			return servicedao.getAllService();
		}

		@Override
		@Transactional
		public List<CustomizeTemplate> getTemplateListByType(
				HttpServletRequest request, String value) {
			
			return servicedao.getTemplateListByType(request,value);
		}
		
}
