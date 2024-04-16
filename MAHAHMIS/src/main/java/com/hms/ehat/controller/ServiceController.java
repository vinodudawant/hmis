package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.dto.ReqMasterDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.service.ServService;

@Controller
@RequestMapping(value = "/serv")
public class ServiceController {
	@Autowired
	ServService servService;

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Service List onload
	@RequestMapping(value = "/fetchServiceList", method = RequestMethod.POST)
	public @ResponseBody
	ServiceMasterDto getAllServiceList(HttpServletRequest request) {     //httpservlet request added by sagar
		ServiceMasterDto ltServiceMasterDto = new ServiceMasterDto();
		ltServiceMasterDto = servService.getAllService(request);

		return ltServiceMasterDto;
	}

	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update Services
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public @ResponseBody
	String saveModule(ServiceMasterDto serviceMasterDto,
			HttpServletRequest request) {
		
		int response = servService.saveOrUpdateService(serviceMasterDto,
				request);//To get the response from service

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Name Allready exist"
						: "Network Error!!!")); //To return msg by turnary operator
	}

	// @author : Irfan Khan @date: 17-May-2017 @reason : Delete By serviceId
	@RequestMapping(value = "/deleteServiceMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteServiceMaster(@RequestParam("serviceId") Integer serviceId,
			HttpServletRequest request) {

		return servService.deleteService(serviceId, request) ? "Record deleted succesfully!!"
				: "Oops Not Deleted!!!";//To return msg by turnary operator
	}

	//@author: Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search
	@RequestMapping(value = "/autoSuggestionServiceMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	ServiceMasterDto getAutoSuggestionServiceMasterNames(@RequestParam("letter") String letter
			) {
		List<ServiceMasterDto> ltServiceMasters = new ArrayList<ServiceMasterDto>();
		ltServiceMasters = servService.getAutoSuggestionServiceNames(letter);
		
		ServiceMasterDto obj = new ServiceMasterDto();
		obj.setListService(ltServiceMasters);
		return obj;
	}
	
	/************************************************************************************
	 * @author Kishor Lokhande @date 22_May_2017 these methods are used to map request
	 * with services with Unit master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/getServiceCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getServiceCount() {
		
		Long totaleCount = servService.getServiceCount();	
		return totaleCount;
	}	
	
	//@author : Bilal @date: 31-July-2017 @reason : To Fetch Service List onload
		@RequestMapping(value = "/fetchServiceListCom", method = RequestMethod.POST)
		public @ResponseBody
		ServiceMasterDto fetchServiceListCom(HttpServletRequest request) {     //httpservlet request added by sagar
			ServiceMasterDto ltServiceMasterDto = new ServiceMasterDto();
			ltServiceMasterDto = servService.fetchServiceListCom(request);

			return ltServiceMasterDto;
		}
		
		/*--------------------Req General Form------------------------*/
		
		//@author :  Kishor Lokhande @date: 12-Sept-2017 : To Save and Update Services
		@RequestMapping(value = "/saveReq", method = RequestMethod.POST)
		public @ResponseBody
		String saveReq(ReqMasterDto ReqMasterDto,
				HttpServletRequest request) {
			
			int response = servService.saveOrUpdateReq(ReqMasterDto,
					request);//To get the response from service

			return ((response == 1) ? "Saved Successfully"
					: ((response == 2) ? "Updated Successfully"
							: "Network Error!!!")); //To return msg by turnary operator
		}
		
		
		//@author : Kishor Lokhande @date: 12-Sept-2017 : To Fetch Service List onload
		@RequestMapping(value = "/fetchReqList", method = RequestMethod.POST)
		public @ResponseBody
		ReqMasterDto fetchReqList(HttpServletRequest request) {     //httpservlet request added by sagar
			ReqMasterDto ltReqMasterDto = new ReqMasterDto();
			ltReqMasterDto = servService.fetchReqList(request);
			

			return ltReqMasterDto;
		}
		
		
		// @author :  Kishor Lokhande @date: 12-Sept-2017 : Delete By serviceId
		@RequestMapping(value = "/deleteReqMaster", method = RequestMethod.POST)
		public @ResponseBody
		String deleteReqMaster(@RequestParam("reqId") Integer reqId,
				HttpServletRequest request) {

			return servService.deleteReqMaster(reqId, request) ? "Record deleted succesfully!!"
					: "Oops Not Deleted!!!";//To return msg by turnary operator
		}
		
		
		//@author: Irfan Khan @date: 17-May-2017 @reason : Autosuggestion and search
		@RequestMapping(value = "/autoSuggestionReqMasterNames", method = RequestMethod.POST)
		public @ResponseBody
		ReqMasterDto autoSuggestionReqMasterNames(@RequestParam("letter") String letter
				) {
			List<ReqMasterDto> ltReqMasters = new ArrayList<ReqMasterDto>();
			ltReqMasters = servService.autoSuggestionReqMasterNames(letter);
			
			ReqMasterDto obj = new ReqMasterDto();
			obj.setListReq(ltReqMasters);
			return obj;
		}
		
		/************************************************************************************
		 * @author Kishor Lokhande @date 22_May_2017 these methods are used to map request
		 * with services with Unit master controller methods
		 * ***********************************************************************************/
		@RequestMapping(value = "/getreqCount", method = RequestMethod.POST)
		public @ResponseBody
		Long getreqCount() {
			
			Long totaleCount = servService.getreqCount();	
			return totaleCount;
		}	
		
		//@author : Bilal @date: 14-Sep-2017 @reason : To Fetch Service List onload
		@RequestMapping(value = "/fetchServiceList2", method = RequestMethod.POST)
		public @ResponseBody
		ServiceMasterDto getAllServiceList2(HttpServletRequest request) {     //httpservlet request added by sagar
			ServiceMasterDto ltServiceMasterDto = new ServiceMasterDto();
			ltServiceMasterDto = servService.getAllServiceList2(request);

			return ltServiceMasterDto;
		}
		
		@RequestMapping(value = "/getTemplateListByType", method = RequestMethod.GET)
		public @ResponseBody
		CustomizeTemplate getOTTemplateDataById(HttpServletRequest request,@RequestParam("value") String value) {
			List<CustomizeTemplate> ltOTTemplates = new ArrayList<CustomizeTemplate>();
			ltOTTemplates = servService.getTemplateListByType(request,value);
			CustomizeTemplate obj = new CustomizeTemplate();
			obj.setCustomizeTemplateList(ltOTTemplates);
			return obj;
		}
		
}
