package com.hms.pharmacy.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.pharmacy.pojo.UserModule;
import com.hms.pharmacy.service.AccessMgmtService;


@SuppressWarnings("serial")
@Controller
@RequestMapping(value = "/access")
public class AccessMgmtController implements Serializable{

	@Autowired
	AccessMgmtService accessMgmtService;
	
	static Logger log=Logger.getLogger(AccessMgmtController.class.getName());
	

	/**
	 *
	 * @Code :This method for access mngt view
	 * @return
	 **/
	
	@RequestMapping(value = "/view.htm", method = RequestMethod.GET)
	public ModelAndView getPurchaseLIst(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy getPurchaseLIst()");
		ModelAndView modelAndView = new ModelAndView();
		
		HttpSession session=request.getSession();
		String userType=(String)session.getAttribute("userType");
		
		if(userType!=null)
		{	
			if(userType.equalsIgnoreCase("admin"))
			{
				modelAndView.setViewName("pharma_access_mgmt");
			}
			else
			{
				modelAndView.setViewName("redirect:/pharmacy/access/view.htm");
			}
		}	
		else
		{
			modelAndView.setViewName("redirect:/pharmacy/access/view.htm");
		}	
		
		
		
		return modelAndView;
	}
	
	/**
	 *
	 * @Code :This method for user module view
	 * @return
	 **/
	@RequestMapping(value = "/module.htm", method = RequestMethod.GET)
	public ModelAndView modulePage() {
		log.info("In Pharmacy modulePage()");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("userModule", new UserModule());
		List<UserModule> userModules = new ArrayList<UserModule>();
		userModules = accessMgmtService.getUserModules("all");
		modelAndView.addObject("userModules", userModules);
		modelAndView.setViewName("pharma_user_module");
		return modelAndView;
	}
	
	/**
	 *
	 * @Code :This method save
	 * @return
	 **/
	@RequestMapping(value = "/saveModule", method = RequestMethod.POST)
	public ModelAndView saveOrUpdateUserModule(
			@ModelAttribute("userModule") UserModule userModule,HttpServletRequest request) {
		log.info("In Pharmacy saveOrUpdateUserModule()");
		HttpSession session=request.getSession();
		Integer userId=(Integer)session.getAttribute("userId1");
		
		userModule.setModuleAddBy(userId.toString());
		userModule.setModuleModBy(userId.toString());
		
		ModelAndView modelAndView = new ModelAndView();
		if (accessMgmtService.saveOrUpdateUserModule(userModule)) {
			if (userModule.getModuleId() != null) {
				modelAndView.addObject("msg",
						"Record saved successfully..!");
			} else {
				modelAndView.addObject("msg",
						"Record updated successfully..!");
			}
		} else {
			modelAndView.addObject("error", "Oops! Something went wrong..!");
		}
		modelAndView
				.setViewName("redirect:module.htm");
		return modelAndView;
	}
	
	/**
	 *
	 * @Code :This method for get user modules
	 * @return
	 **/
	@RequestMapping(value = "/getUserModules", method = RequestMethod.GET)
 	public @ResponseBody List<UserModule> getUserModules() {
		log.info("In Pharmacy getUserModules()");
		List<UserModule> userModules = new ArrayList<UserModule>();
		userModules = accessMgmtService.getUserModules("all");
		return userModules;
	}
	
	/**
	 *
	 * @Code :This method for save modules
	 * @return
	 **/
	@RequestMapping(value = "/saveModules", method = RequestMethod.POST)
 	public @ResponseBody boolean saveModules(HttpServletRequest request,HttpServletResponse response) {
		boolean result=false;
		log.info("In Pharmacy saveModules()");
		String userId=request.getParameter("userId");
		String userModules=request.getParameter("userModules");
		
		String[] users=userModules.split(",");
		
		List<String> accessList=new ArrayList<String>();
		for(int i=0;i<users.length;i++)
		{
			accessList.add(users[i]);
		}
		result = accessMgmtService.saveModules(userId,accessList);
		return result;
	}
	
	/**
	 *
	 * @Code :This method for get access module list
	 * @return
	 **/
	@RequestMapping(value = "/getUserAccessModuleList", method = RequestMethod.GET)
 	public @ResponseBody String getUserAccessModuleList() {
		log.info("In Pharmacy getUserAccessModuleList()");
		JSONArray userAccessData=new JSONArray();
		userAccessData = accessMgmtService.getUserAccessModuleList();
		return JSONValue.toJSONString(userAccessData);
	}
	
	/**
	 *
	 * @Code :This method for get user access details by id
	 * @return
	 **/
	@RequestMapping(value = "/getUserAccessDetailsById", method = RequestMethod.GET)
 	public @ResponseBody String getUserAccessDetailsById(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy getUserAccessDetailsById()");
		String userId=request.getParameter("userId");
		JSONArray userAccessData=new JSONArray();
		userAccessData = accessMgmtService.getUserAccessDetailsById(userId);
		return JSONValue.toJSONString(userAccessData);
	}
	
	/**
	 *
	 * @Code :This method for set authentication
	 * @return
	 **/
	@RequestMapping(value = "/setUserAccessSession", method = RequestMethod.GET)
 	public @ResponseBody void setUserAccessSession(HttpServletRequest request,HttpServletResponse response) {
		log.info("In Pharmacy setUserAccessSession()");
		HttpSession session=request.getSession();
		Integer userId=(Integer) session.getAttribute("userId1");
		JSONArray userAccessData=new JSONArray();
		userAccessData = accessMgmtService.getUserAccessDetailsById(userId.toString());
		session.setAttribute("pharmacyAccess", JSONValue.toJSONString(userAccessData));
	}
	
	/**
	 *
	 * @Code :This method for autosuggestion
	 * @return
	 **/
	@RequestMapping(value = "/autoSuggestionModuleNames", method = RequestMethod.GET)
	public @ResponseBody
	List<UserModule> getAutoSuggestionModuleNames(
			@RequestParam("letter") String letter) {
		log.info("In Pharmacy getAutoSuggestionModuleNames()");
		List<UserModule> ltCompanyMasters = new ArrayList<UserModule>();
		ltCompanyMasters = accessMgmtService.getAutoSuggestionModuleNames(letter);
		return ltCompanyMasters;
	}
	
	/**
	 *
	 * @Code :This method for get module by id
	 * @return
	 **/
	@RequestMapping(value = "/getModuleById", method = RequestMethod.GET)
	public @ResponseBody
	List<UserModule> getModuleById(@RequestParam("moduleId") Integer moduleId) 
	{
		log.info("In Pharmacy getModuleById()");
		List<UserModule> ltModuleMasters = new ArrayList<UserModule>();
		ltModuleMasters = accessMgmtService.getModuleById(moduleId);
		return ltModuleMasters;
	}
	
	/**
	 *
	 * @Code :This method for delete
	 * @return
	 **/
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteModule(@RequestParam("moduleId") Integer moduleId) {
		log.info("In Pharmacy deleteModule()");
		Boolean flag = false;
		if (accessMgmtService.deleteModule(moduleId)) {
			flag = true;
		}
		return flag;
	}
	
	/**
	 *
	 * @Code :This method for get user list
	 * @return
	 **/
	@RequestMapping(value = "/getUserList", method = RequestMethod.GET)
 	public @ResponseBody List<UserModule> getUserList() {
		log.info("In Pharmacy getUserList()");
		List<UserModule> userModules = new ArrayList<UserModule>();
		userModules = accessMgmtService.getUserList("all");
		return userModules;
	}
}
