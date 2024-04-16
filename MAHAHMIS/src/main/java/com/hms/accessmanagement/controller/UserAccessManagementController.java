package com.hms.accessmanagement.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.accessmanagement.service.UserAccessService;
import com.hms.pharmacy.dao.EhatEnterpriseUtil;
import com.hms.utility.ApplicationContextUtils;
import com.hms.utility.EhatUserAccessControl;

@Controller
@RequestMapping(value = "/")
public class UserAccessManagementController {

	@Autowired
	UserAccessService userAccessService;


	@RequestMapping(value = "/saveModule", method = RequestMethod.POST)
	//public @ResponseBody String saveModule(@RequestParam("moduleName") String moduleName,HttpServletRequest request) {
 	public @ResponseBody String saveModule(@RequestParam("moduleName") String moduleName,
 			@RequestParam("landPage") String landPage,@RequestParam("ModSequence") String ModSequence,@RequestParam("checkModule") String checkModule,HttpServletRequest request) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		//Integer uId = (Integer) session.getAttribute("uId");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("moduleName", moduleName);
		jsonObject.put("addedBy", userId);
		//jsonObject.put("addedUnit", uId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		jsonObject.put("landPage", landPage);
		jsonObject.put("ModSequence", ModSequence);
		jsonObject.put("checkModule", checkModule);
		String response =userAccessService.saveModule(jsonObject);
		return response;
	}

	@RequestMapping(value = "/updateModule", method = RequestMethod.POST)
 	public @ResponseBody String updateModule(HttpServletRequest request,@RequestParam("moduleName") String moduleName,
 			@RequestParam("moduleId") Integer moduleId,@RequestParam("landPage") String landPage,@RequestParam("ModSequence") String ModSequence,@RequestParam("checkModule") String checkModule) {
		//for current time & date and current login user id and ip address
				Calendar calendar = Calendar.getInstance();
				SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
				String todaysDate = formatter.format(calendar.getTime());
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("moduleId", moduleId);
		jsonObject.put("moduleName", moduleName);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		jsonObject.put("landPage", landPage);
		jsonObject.put("ModSequence", ModSequence);
		jsonObject.put("checkModule", checkModule);
		String response = userAccessService.updateModule(jsonObject);
		return response;
	}

	@RequestMapping(value = "/deleteModule", method = RequestMethod.POST)
 	public @ResponseBody String deleteModule(HttpServletRequest request,@RequestParam("moduleId") Integer moduleId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("moduleId", moduleId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response = userAccessService.deleteModule(jsonObject);
		return response;
	}

	@RequestMapping(value = "/getModuleByModuleId", method = RequestMethod.POST)
 	public @ResponseBody JSONObject getModuleByModuleId(@RequestParam("moduleId") Integer moduleId) {
		JSONObject jsonObject = userAccessService.getModuleByModuleId(moduleId);
		return jsonObject;
	}

	@RequestMapping(value = "/getAllModules", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllModules() {
		JSONArray moduleList=userAccessService.getAllModule();
		return moduleList;
	}

	@RequestMapping(value = "/getAllSubModules", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllSubModules() {
		JSONArray subModuleList=userAccessService.getAllSubModule();
		return subModuleList;
	}

	@RequestMapping(value = "/getAllSubModuleByModuleId", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllSubModuleByModuleId(@RequestParam("moduleId") Integer moduleId) {
		JSONArray subModuleList=userAccessService.getAllSubModuleByModuleId(moduleId);
		return subModuleList;
	}


	@RequestMapping(value = "/saveSubModule", method = RequestMethod.POST)
 	public @ResponseBody String saveSubModule(@RequestParam("subModuleName") String subModuleName,@RequestParam("subModuleType") String subModuleType,
 			@RequestParam("moduleId") Integer moduleId,@RequestParam("subModId") String subModId,HttpServletRequest request,@RequestParam("jspPageName") String jspPageName,@RequestParam("subSequence") String subSequence,@RequestParam("checksub") String checksub) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("subModuleName", subModuleName);
		jsonObject.put("moduleId", moduleId);
		jsonObject.put("subModId", subModId);
		jsonObject.put("subModuleType", subModuleType);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		jsonObject.put("jspPageName", jspPageName);
		jsonObject.put("subSequence", subSequence);
		jsonObject.put("checksub", checksub);
		
		System.out.println("......."+checksub);
		
		String response =userAccessService.saveSubModule(jsonObject);
		return response;
	}

	@RequestMapping(value = "/updateSubModule", method = RequestMethod.POST)
 	public @ResponseBody String updateSubModule(HttpServletRequest request,@RequestParam("subModuleName") String subModuleName,@RequestParam("subModuleType") String subModuleType,
 		@RequestParam("moduleId") Integer moduleId,@RequestParam("subModId") String subModId,@RequestParam("subModuleId") Integer subModuleId,HttpServletRequest request1,@RequestParam("jspPageName") String jspPageName,@RequestParam("subSequence") String subSequence,@RequestParam("checksub") String checksub) {
		//for current time & date and current login user id and ip address
				Calendar calendar = Calendar.getInstance();
				SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
				String todaysDate = formatter.format(calendar.getTime());
				HttpSession session = request1.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				String remoteAddress = request1.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("subModuleId", subModuleId);
		jsonObject.put("subModuleName", subModuleName);
		jsonObject.put("subModuleType", subModuleType);
		jsonObject.put("moduleId", moduleId);
		jsonObject.put("subModId", subModId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		jsonObject.put("jspPageName", jspPageName);
		jsonObject.put("subSequence", subSequence);
		jsonObject.put("checksub", checksub);
		

		String response = userAccessService.updateSubModule(jsonObject);
		return response;
	}

	@RequestMapping(value = "/deleteSubModule", method = RequestMethod.POST)
 	public @ResponseBody String deleteSubModule(HttpServletRequest request,@RequestParam("subModuleId") Integer subModuleId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("subModuleId", subModuleId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response = userAccessService.deleteSubModule(jsonObject);
		return response;
	}

	@RequestMapping(value = "/getSubModuleBySubModuleId", method = RequestMethod.POST)
 	public @ResponseBody JSONObject getSubModuleBySubModuleId(@RequestParam("subModuleId") Integer subModuleId) {
		JSONObject jsonObject = userAccessService.getSubModuleBySubModuleId(subModuleId);
		return jsonObject;
	}

	@RequestMapping(value = "/saveProfile", method = RequestMethod.POST)
 	public @ResponseBody String saveProfile(HttpServletRequest request,@RequestParam("profileName") String profileName
 			,@RequestParam("userModuleAccessView") String userModuleAccessView,@RequestParam("userModuleAccessEdit") String userModuleAccessEdit
 			,@RequestParam("userModuleAccessDelete") String userModuleAccessDelete,@RequestParam("userSubModuleAccessView") String userSubModuleAccessView
 			,@RequestParam("userSubModuleAccessEdit") String userSubModuleAccessEdit,@RequestParam("userSubModuleAccessDelete") String userSubModuleAccessDelete
 			,@RequestParam("userSubModuleOnOff") String userSubModuleOnOff) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("profileName", profileName);
		jsonObject.put("userModuleAccessView", userModuleAccessView);
		jsonObject.put("userModuleAccessEdit", userModuleAccessEdit);
		jsonObject.put("userModuleAccessDelete", userModuleAccessDelete);
		jsonObject.put("userSubModuleAccessView", userSubModuleAccessView);
		jsonObject.put("userSubModuleAccessEdit", userSubModuleAccessEdit);
		jsonObject.put("userSubModuleAccessDelete", userSubModuleAccessDelete);
		jsonObject.put("userSubModuleOnOff", userSubModuleOnOff);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response =userAccessService.saveProfile(jsonObject);
		return response;
	}

	@RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
 	public @ResponseBody String updateProfile(HttpServletRequest request,@RequestParam("profileId") String profileId,@RequestParam("profileName") String profileName
 			,@RequestParam("userModuleAccessView") String userModuleAccessView,@RequestParam("userModuleAccessEdit") String userModuleAccessEdit
 			,@RequestParam("userModuleAccessDelete") String userModuleAccessDelete,@RequestParam("userSubModuleAccessView") String userSubModuleAccessView
 			,@RequestParam("userSubModuleAccessEdit") String userSubModuleAccessEdit,@RequestParam("userSubModuleAccessDelete") String userSubModuleAccessDelete
 			,@RequestParam("userSubModuleOnOff") String userSubModuleOnOff) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("profileId", profileId);
		jsonObject.put("profileName", profileName);
		jsonObject.put("userModuleAccessView", userModuleAccessView);
		jsonObject.put("userModuleAccessEdit", userModuleAccessEdit);
		jsonObject.put("userModuleAccessDelete", userModuleAccessDelete);
		jsonObject.put("userSubModuleAccessView", userSubModuleAccessView);
		jsonObject.put("userSubModuleAccessEdit", userSubModuleAccessEdit);
		jsonObject.put("userSubModuleAccessDelete", userSubModuleAccessDelete);
		jsonObject.put("userSubModuleOnOff", userSubModuleOnOff);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response =userAccessService.updateProfile(jsonObject);
		return response;
	}

	@RequestMapping(value = "/deleteProfile", method = RequestMethod.POST)
 	public @ResponseBody String deleteProfile(HttpServletRequest request,@RequestParam("profileId") String profileId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("profileId", profileId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response = userAccessService.deleteProfile(jsonObject);
		return response;
	}

	@RequestMapping(value = "/getProfileByProfileId", method = RequestMethod.POST)
 	public @ResponseBody JSONObject getProfileByProfileId(@RequestParam("profileId") String profileId) {
		JSONObject jsonObject = userAccessService.getProfileByProfileId(profileId);
		return jsonObject;
	}

	@RequestMapping(value = "/getAllProfile", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllProfile() {
		JSONArray profileArray=userAccessService.getAllProfile();
		return profileArray;
	}

	@RequestMapping(value = "/saveRole", method = RequestMethod.POST)
 	public @ResponseBody String saveRole(HttpServletRequest request,@RequestParam("roleName") String roleName,@RequestParam("profileId") String profileId
 			,@RequestParam("userModuleAccessView") String userModuleAccessView,@RequestParam("userModuleAccessEdit") String userModuleAccessEdit
 			,@RequestParam("userModuleAccessDelete") String userModuleAccessDelete,@RequestParam("userSubModuleAccessView") String userSubModuleAccessView
 			,@RequestParam("userSubModuleAccessEdit") String userSubModuleAccessEdit,@RequestParam("userSubModuleAccessDelete") String userSubModuleAccessDelete
 			,@RequestParam("userSubModuleOnOff") String userSubModuleOnOff,@RequestParam("privilegesType") String privilegesType) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("roleName", roleName);
		jsonObject.put("privilegesType", privilegesType);
		if(privilegesType.equals("1")){
			jsonObject.put("profileId", profileId);
			jsonObject.put("userModuleAccessView", "");
			jsonObject.put("userModuleAccessEdit", "");
			jsonObject.put("userModuleAccessDelete", "");
			jsonObject.put("userSubModuleAccessView", "");
			jsonObject.put("userSubModuleAccessEdit", "");
			jsonObject.put("userSubModuleAccessDelete", "");
			jsonObject.put("userSubModuleOnOff", "");
		}
		else{
			jsonObject.put("profileId", "");
			jsonObject.put("userModuleAccessView", userModuleAccessView);
			jsonObject.put("userModuleAccessEdit", userModuleAccessEdit);
			jsonObject.put("userModuleAccessDelete", userModuleAccessDelete);
			jsonObject.put("userSubModuleAccessView", userSubModuleAccessView);
			jsonObject.put("userSubModuleAccessEdit", userSubModuleAccessEdit);
			jsonObject.put("userSubModuleAccessDelete", userSubModuleAccessDelete);
			jsonObject.put("userSubModuleOnOff", userSubModuleOnOff);
		}
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response = userAccessService.saveRole(jsonObject);
		return response;
	}

	@RequestMapping(value = "/updateRole", method = RequestMethod.POST)
 	public @ResponseBody String updateRole(HttpServletRequest request,@RequestParam("roleName") String roleName,@RequestParam("profileId") String profileId
 			,@RequestParam("userModuleAccessView") String userModuleAccessView,@RequestParam("userModuleAccessEdit") String userModuleAccessEdit
 			,@RequestParam("userModuleAccessDelete") String userModuleAccessDelete,@RequestParam("userSubModuleAccessView") String userSubModuleAccessView
 			,@RequestParam("userSubModuleAccessEdit") String userSubModuleAccessEdit,@RequestParam("userSubModuleAccessDelete") String userSubModuleAccessDelete
 			,@RequestParam("userSubModuleOnOff") String userSubModuleOnOff,@RequestParam("privilegesType") String privilegesType,@RequestParam("roleId") Integer roleId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("roleId", roleId);
		jsonObject.put("roleName", roleName);
		jsonObject.put("privilegesType", privilegesType);
		if(privilegesType.equals("1")){
			jsonObject.put("profileId", profileId);
			jsonObject.put("userModuleAccessView", "");
			jsonObject.put("userModuleAccessEdit", "");
			jsonObject.put("userModuleAccessDelete", "");
			jsonObject.put("userSubModuleAccessView", "");
			jsonObject.put("userSubModuleAccessEdit", "");
			jsonObject.put("userSubModuleAccessDelete", "");
			jsonObject.put("userSubModuleOnOff", "");
		}
		else{
			jsonObject.put("profileId", "");
			jsonObject.put("userModuleAccessView", userModuleAccessView);
			jsonObject.put("userModuleAccessEdit", userModuleAccessEdit);
			jsonObject.put("userModuleAccessDelete", userModuleAccessDelete);
			jsonObject.put("userSubModuleAccessView", userSubModuleAccessView);
			jsonObject.put("userSubModuleAccessEdit", userSubModuleAccessEdit);
			jsonObject.put("userSubModuleAccessDelete", userSubModuleAccessDelete);
			jsonObject.put("userSubModuleOnOff", userSubModuleOnOff);
		}
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response = userAccessService.updateRole(jsonObject);
		return response;
	}

	@RequestMapping(value = "/deleteRole", method = RequestMethod.POST)
 	public @ResponseBody String deleteRole(HttpServletRequest request,@RequestParam("roleId") String roleId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("roleId", roleId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response = userAccessService.deleteRole(jsonObject);
		return response;
	}

	@RequestMapping(value = "/getRoleByRoleId", method = RequestMethod.POST)
 	public @ResponseBody JSONObject getProfileByProfileId(@RequestParam("roleId") Integer roleId) {
		JSONObject jsonObject = userAccessService.getRoleByRoleId(roleId);
		return jsonObject;
	}

	@RequestMapping(value = "/getAllRole", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllRole() {
		JSONArray roleArray=userAccessService.getAllRole();
		return roleArray;
	}

	@RequestMapping(value = "/getProfileAccessByProfile", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getProfileAccessByProfile(@RequestParam("profileId") String profileId) {
		JSONArray profileAccessArray=userAccessService.getProfileAccessByProfile(profileId);
		return profileAccessArray;
	}

	@RequestMapping(value = "/getRoleAccessByRole", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getRoleAccessByRole(@RequestParam("roleId") String roleId) {
		JSONArray roleAccessArray=userAccessService.getRoleAccessByRole(roleId);
		return roleAccessArray;
	}

	@RequestMapping(value = "/saveUserAccess", method = RequestMethod.POST)
 	public @ResponseBody String saveUserAccess(HttpServletRequest request,@RequestParam("userId") String userId,@RequestParam("profileId") String profileId
 			,@RequestParam("userModuleAccessView") String userModuleAccessView,@RequestParam("userModuleAccessEdit") String userModuleAccessEdit
 			,@RequestParam("userModuleAccessDelete") String userModuleAccessDelete,@RequestParam("userSubModuleAccessView") String userSubModuleAccessView
 			,@RequestParam("userSubModuleAccessEdit") String userSubModuleAccessEdit,@RequestParam("userSubModuleAccessDelete") String userSubModuleAccessDelete
 			,@RequestParam("userSubModuleOnOff") String userSubModuleOnOff,@RequestParam("privilegesType") String privilegesType,@RequestParam("roleId") String roleId) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId1 = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("userId", userId);
		jsonObject.put("privilegesType", privilegesType);
		if(privilegesType.equals("3")){
			jsonObject.put("profileId", "");
			jsonObject.put("roleId", roleId);
			jsonObject.put("userModuleAccessView", "");
			jsonObject.put("userModuleAccessEdit", "");
			jsonObject.put("userModuleAccessDelete", "");
			jsonObject.put("userSubModuleAccessView", "");
			jsonObject.put("userSubModuleAccessEdit", "");
			jsonObject.put("userSubModuleAccessDelete", "");
			jsonObject.put("userSubModuleOnOff", "");
		}
		else if(privilegesType.equals("1")){
			jsonObject.put("profileId", profileId);
			jsonObject.put("roleId", "");
			jsonObject.put("userModuleAccessView", "");
			jsonObject.put("userModuleAccessEdit", "");
			jsonObject.put("userModuleAccessDelete", "");
			jsonObject.put("userSubModuleAccessView", "");
			jsonObject.put("userSubModuleAccessEdit", "");
			jsonObject.put("userSubModuleAccessDelete", "");
			jsonObject.put("userSubModuleOnOff", "");
		}
		else if(privilegesType.equals("2")){
			jsonObject.put("profileId", "");
			jsonObject.put("roleId", "");
			jsonObject.put("userModuleAccessView", userModuleAccessView);
			jsonObject.put("userModuleAccessEdit", userModuleAccessEdit);
			jsonObject.put("userModuleAccessDelete", userModuleAccessDelete);
			jsonObject.put("userSubModuleAccessView", userSubModuleAccessView);
			jsonObject.put("userSubModuleAccessEdit", userSubModuleAccessEdit);
			jsonObject.put("userSubModuleAccessDelete", userSubModuleAccessDelete);
			jsonObject.put("userSubModuleOnOff", userSubModuleOnOff);
		}
		jsonObject.put("modifyBy", userId1);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response = userAccessService.saveUserAccess(jsonObject);
		return response;
	}

	@RequestMapping(value = "/userAccessAutoSuggestion", method = RequestMethod.POST)
 	public @ResponseBody Map<String, Object> userAccessAutoSuggestion(@RequestParam("search") String search,@RequestParam("startIndex") Integer startIndex) {
		Map<String,Object> model=new HashMap<String,Object>();
		Integer count = userAccessService.countUserAccess();
		JSONArray usersList=userAccessService.userAccessAutoSuggestion(search,startIndex);
		model.put("count", count);
		model.put("usersList",usersList);
		return model;
	}

	@RequestMapping(value = "/getUser", method = RequestMethod.POST)
 	public @ResponseBody JSONObject getUser(@RequestParam("userId") String userId,HttpServletRequest request) {
		JSONObject jsonObject = userAccessService.getUser(userId);
		HttpSession session = request.getSession();
		session.setAttribute("userJsonObject", jsonObject);
		return jsonObject;
	}

	//for print master
	@RequestMapping(value = "/savePrint", method = RequestMethod.POST)
 	public @ResponseBody String savePrint(@RequestParam("printName") String printName,
 			@RequestParam("moduleId") Integer moduleId,HttpServletRequest request) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("printName", printName);
		jsonObject.put("moduleId", moduleId);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response =userAccessService.savePrint(jsonObject);
		return response;
	}

	@RequestMapping(value = "/updatePrint", method = RequestMethod.POST)
 	public @ResponseBody String updatePrint(@RequestParam("printName") String printName,@RequestParam("printId") Integer printId,
 			@RequestParam("moduleId") Integer moduleId,HttpServletRequest request) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("printId", printId);
		jsonObject.put("printName", printName);
		jsonObject.put("moduleId", moduleId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response =userAccessService.updatePrint(jsonObject);
		return response;
	}

	@RequestMapping(value = "/deletePrint", method = RequestMethod.POST)
 	public @ResponseBody String deletePrint(@RequestParam("printId") Integer printId,HttpServletRequest request) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("printId", printId);
		jsonObject.put("modifyBy", userId);
		jsonObject.put("modifyOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		String response =userAccessService.deletePrint(jsonObject);
		return response;
	}

	@RequestMapping(value = "/getAllPrint", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllPrint() {
		JSONArray roleArray=userAccessService.getAllPrint();
		return roleArray;
	}

	@RequestMapping(value = "/getPrintByPrintId", method = RequestMethod.POST)
 	public @ResponseBody JSONObject getPrintByPrintId(@RequestParam("printId") String printId) {
		JSONObject printObject=userAccessService.getPrintByPrintId(printId);
		return printObject;
	}

	@RequestMapping(value = "/savePrintAccess", method = RequestMethod.POST)
 	public @ResponseBody String savePrintAccess(@RequestParam("printAccess[]") String[] printAccess,HttpServletRequest request) {
		//for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONArray printAccessArray = new JSONArray();
		for(int i=0;i<printAccess.length;i++){
				String printId = printAccess[i].split("_")[0];
				String printAccessValue = printAccess[i].split("_")[1];

				JSONObject jsonObject = new JSONObject();
				jsonObject.put("printId", printId);
				jsonObject.put("printAccessValue", printAccessValue);
				jsonObject.put("modifyBy", userId);
				jsonObject.put("modifyOn", todaysDate);
				jsonObject.put("remoteAddress", remoteAddress);
				printAccessArray.add(jsonObject);
		}
		String response =userAccessService.savePrintAccess(printAccessArray);
		return response;
	}

	@RequestMapping(value = "/getAllPrintAccess", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllPrintAccess() {
		JSONArray printAccessArray=userAccessService.getAllPrintAccess();
		return printAccessArray;
	}

	@RequestMapping(value = "/showAccess", method = RequestMethod.POST)
 	public @ResponseBody JSONObject showAccess(@RequestParam("subModuleId") String subModuleId) {
		JSONObject showAccessObject=userAccessService.showAccess(subModuleId);
		return showAccessObject;
	}

	@RequestMapping(value = "/getActiveUserCount", method = RequestMethod.POST)
 	public @ResponseBody String getActiveUserCount() {
		EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getActiveUserCount();
	}

	@RequestMapping(value = "/getSoftwareUserCount", method = RequestMethod.POST)
 	public @ResponseBody String getSoftwareUserCount() {
		EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getSoftwareUserCount();
	}

	@RequestMapping(value = "/getNewUserCount", method = RequestMethod.POST)
 	public @ResponseBody String getNewUserCount() {
		EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getNewUserCount();
	}

	@RequestMapping(value = "/setModuleId", method = RequestMethod.POST)
 	public @ResponseBody void setModuleId(@RequestParam("currentPageId") String currentPageId,
 			@RequestParam("moduleId") String moduleId,HttpSession session) {
		session.setAttribute("moduleId", moduleId);
		session.setAttribute("currentPageId", currentPageId);
	}

	@RequestMapping(value = "/setCurrentPageId", method = RequestMethod.POST)
 	public @ResponseBody void setCurrentPageId(@RequestParam("currentPageId") String currentPageId,HttpSession session) {
		session.setAttribute("currentPageId", currentPageId);
	}

	@RequestMapping(value = "/setUrl", method = RequestMethod.POST)
 	public @ResponseBody String setUrl(@RequestParam("url") String url,HttpSession session) {
		//System.err.println("**in setUrl controller url:"+url);
		if(url.contains("otandipdservices.jsp?pagename=bed") || url.contains("otandipdservices.jsp?pagename=gas")
		  || url.contains("otandipdservices.jsp?pagename=instrument") || url.contains("Sponsor_Type.jsp?pagename=company")
		  || url.contains("SponserorAgreement.jsp?pagename=company") || url.contains("Corporate_Account.jsp?pagename=company")
		  || url.contains("HallwisePolicyAC.jsp?pagename=company")
		){
			url = url.substring(url.lastIndexOf('/')+1,url.length());
		}
		else if(url.contains(".jsp")){
			if(url.lastIndexOf(".jsp")>url.lastIndexOf('/')){
				url = url.substring(url.lastIndexOf('/')+1,url.lastIndexOf(".jsp"));
			}
		}
		else{
			url = url.substring(url.lastIndexOf('/')+1,url.length());
		}
		String currentPageId = EhatUserAccessControl.getCurrentPageId(url,session);
		session.setAttribute("currentPageId", currentPageId);
		//System.err.println((String) session.getAttribute("currentPageId")+"*url:"+url);
		return currentPageId;
	}

	@RequestMapping(value = "/getNextUserId", method = RequestMethod.POST)
 	public @ResponseBody Integer getNextUserId() {
		return userAccessService.getNextUserId();
	}

	@RequestMapping(value = "/validateUsername", method = RequestMethod.POST)
 	public @ResponseBody String validateUsername(@RequestParam("username") String username, @RequestParam("employeeId") Integer employeeId) {
		EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.validateUsername(username,employeeId);
	}

	@RequestMapping(value = "/getAllUser", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getAllUser() {
		JSONArray usersList=userAccessService.getAllUser();
		return usersList;
	}

	@RequestMapping(value = "/saveLoginHistory", method = RequestMethod.POST)
 	public @ResponseBody String saveLoginHistory(@RequestParam("userId") String userId,HttpServletRequest request) {
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		String remoteAddress = request.getRemoteHost();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("userId", userId);
		jsonObject.put("unitId", 1);
		jsonObject.put("remoteAddress", remoteAddress);
		jsonObject.put("signInTime", todaysDate);
		String loginHistoryId = userAccessService.saveLoginHistory(jsonObject);
		return loginHistoryId;
	}

	@RequestMapping(value = "/saveLogOutHistory", method = RequestMethod.POST)
 	public @ResponseBody String saveLogOutHistory(@RequestParam("loginHistoryId") String loginHistoryId) {
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("loginHistoryId", loginHistoryId);
		jsonObject.put("signOutTime", todaysDate);
		return userAccessService.saveLogOutHistory(jsonObject);
	}

	@RequestMapping(value = "/getLoginHistory", method = RequestMethod.POST)
 	public @ResponseBody Map<String, Object> getLoginHistory(@RequestParam("userId") String userId,@RequestParam("startIndex") Integer startIndex) {
		Map<String,Object> model=new HashMap<String,Object>();
		Integer count = userAccessService.getLoginHistoryCount(userId);
		JSONArray loginHistory=userAccessService.getLoginHistory(userId,startIndex);
		model.put("count", count);
		model.put("loginHistory",loginHistory);
		return model;
	}

	@RequestMapping(value = "/getUsersLoginOrNew", method = RequestMethod.POST)
 	public @ResponseBody JSONArray getUsersLoginOrNew(@RequestParam("type") String type) {
		JSONArray usersList=userAccessService.getUsersLoginOrNew(type);
		return usersList;
	}

	// TNM Stage Master By Amol Saware
	@RequestMapping(value = "/getAllBodyPart", method = RequestMethod.GET)
	public @ResponseBody
	JSONArray getAllBodyPart() {
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getAllBodyPart();
	}

	@RequestMapping(value = "/saveTNMStageMaster", method = RequestMethod.POST)
	public @ResponseBody
	String saveTNMStageMaster(
			@RequestParam("bodyPartId") Integer bodyPartId,
			@RequestParam(required = false, value = "exTdescriptionArray[]") String[] exTdescriptionArray,
			@RequestParam(required = false, value = "exTstageArray[]") String[] exTstageArray,
			@RequestParam(required = false, value = "exTcheckRadioArray[]") String[] exTcheckRadioArray,
			@RequestParam(required = false, value = "exNdescriptionArray[]") String[] exNdescriptionArray,
			@RequestParam(required = false, value = "exNstageArray[]") String[] exNstageArray,
			@RequestParam(required = false, value = "exNcheckRadioArray[]") String[] exNcheckRadioArray,
			@RequestParam(required = false, value = "exMetadescriptionArray[]") String[] exMetadescriptionArray,
			@RequestParam(required = false, value = "exMetastageArray[]") String[] exMetastageArray,
			@RequestParam(required = false, value = "exMetacheckRadioArray[]") String[] exMetacheckRadioArray,
			@RequestParam(required = false, value = "newTdescriptionArray[]") String[] newTdescriptionArray,
			@RequestParam(required = false, value = "newTstageArray[]") String[] newTstageArray,
			@RequestParam(required = false, value = "newTcheckRadioArray[]") String[] newTcheckRadioArray,
			@RequestParam(required = false, value = "newNdescriptionArray[]") String[] newNdescriptionArray,
			@RequestParam(required = false, value = "newNstageArray[]") String[] newNstageArray,
			@RequestParam(required = false, value = "newNcheckRadioArray[]") String[] newNcheckRadioArray,
			@RequestParam(required = false, value = "newMetadescriptionArray[]") String[] newMetadescriptionArray,
			@RequestParam(required = false, value = "newMetastageArray[]") String[] newMetastageArray,
			@RequestParam(required = false, value = "newMetacheckRadioArray[]") String[] newMetacheckRadioArray,
			@RequestParam(required = false, value = "exTmasterIdArray[]") String[] exTmasterIdArray,
			@RequestParam(required = false, value = "exNmasterIdArray[]") String[] exNmasterIdArray,
			@RequestParam(required = false, value = "exMetamasterIdArray[]") String[] exMetamasterIdArray,
			HttpServletRequest request) {
		// for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("bodyPartId", bodyPartId);
		jsonObject.put("exTdescriptionArray", exTdescriptionArray);
		jsonObject.put("exTstageArray", exTstageArray);
		jsonObject.put("exTcheckRadioArray", exTcheckRadioArray);
		jsonObject.put("exNdescriptionArray", exNdescriptionArray);
		jsonObject.put("exNstageArray", exNstageArray);
		jsonObject.put("exNcheckRadioArray", exNcheckRadioArray);
		jsonObject.put("exMetadescriptionArray", exMetadescriptionArray);
		jsonObject.put("exMetastageArray", exMetastageArray);
		jsonObject.put("exMetacheckRadioArray", exMetacheckRadioArray);
		jsonObject.put("newTdescriptionArray", newTdescriptionArray);
		jsonObject.put("newTstageArray", newTstageArray);
		jsonObject.put("newTcheckRadioArray", newTcheckRadioArray);
		jsonObject.put("newNdescriptionArray", newNdescriptionArray);
		jsonObject.put("newNstageArray", newNstageArray);
		jsonObject.put("newNcheckRadioArray", newNcheckRadioArray);
		jsonObject.put("newMetadescriptionArray", newMetadescriptionArray);
		jsonObject.put("newMetastageArray", newMetastageArray);
		jsonObject.put("newMetacheckRadioArray", newMetacheckRadioArray);
		jsonObject.put("exTmasterIdArray", exTmasterIdArray);
		jsonObject.put("exNmasterIdArray", exNmasterIdArray);
		jsonObject.put("exMetamasterIdArray", exMetamasterIdArray);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.saveTNMStageMaster(jsonObject);
	}

	@RequestMapping(value = "/getTNMByBodyPartId", method = RequestMethod.POST)
	public @ResponseBody
	JSONArray getTNMByBodyPartId(@RequestParam("bodyPartId") Integer bodyPartId) {
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getTNMByBodyPartId(bodyPartId);
	}

	@RequestMapping(value = "/removeTNMBytnmMasterId", method = RequestMethod.POST)
	public @ResponseBody
	String removeTNMBytnmMasterId(
			@RequestParam(required = false, value = "tnmMasterIdArray[]") String[] tnmMasterIdArray,
			HttpServletRequest request) {
		// for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("tnmMasterIdArray", tnmMasterIdArray);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.removeTNMBytnmMasterId(jsonObject);
	}

	@RequestMapping(value = "/saveClinicalStage", method = RequestMethod.POST)
	public @ResponseBody
	String saveClinicalStage(@RequestParam("tnmStageId") Integer tnmStageId,
			@RequestParam("bodyPartId") Integer bodyPartId,
			@RequestParam("tnmStage") String tnmStage,
			@RequestParam("tnmGroupStage") String tnmGroupStage,
			@RequestParam("tnmDescription") String tnmDescription,
			@RequestParam("clinicalStageDate") String clinicalStageDate,
			@RequestParam("commentClinicalstate") String commentClinicalstate,
			@RequestParam("patientId") String patientId,
			@RequestParam("stageArray") String stageArray,
			HttpServletRequest request) {
		// for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();
		String tnmMasterIdArray = request.getParameter("tnmMasterIdArray");

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("tnmStageId", tnmStageId);
		jsonObject.put("stageArray", stageArray);
		jsonObject.put("patientId", patientId);
		jsonObject.put("bodyPartId", bodyPartId);
		jsonObject.put("tnmStage", tnmStage);
		jsonObject.put("tnmGroupStage", tnmGroupStage);
		jsonObject.put("tnmDescription", tnmDescription);
		jsonObject.put("clinicalStageDate", clinicalStageDate);
		jsonObject.put("commentClinicalstate", commentClinicalstate);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.saveClinicalStage(jsonObject);
	}

	@RequestMapping(value = "/getTNMStageByPatientId", method = RequestMethod.POST)
	public @ResponseBody
	JSONArray getTNMStageByPatientId(
			@RequestParam("patientId") Integer patientId) {
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getTNMStageByPatientId(patientId);
	}

	@RequestMapping(value = "/removeTNMStageById", method = RequestMethod.POST)
	public @ResponseBody
	String removeTNMStageById(
			@RequestParam(required = false, value = "tnmStageIdArray[]") String[] tnmStageIdArray,
			HttpServletRequest request) {
		// for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("tnmStageIdArray", tnmStageIdArray);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.removeTNMStageById(jsonObject);
	}

	@RequestMapping(value = "/saveTNMGroup", method = RequestMethod.POST)
	public @ResponseBody
	String removeTNMBytnmMasterId(
			@RequestParam("groupMasterId") String groupMasterId,
			@RequestParam("bodyPartId") String bodyPartId,
			@RequestParam("tnmGroupStage") String tnmGroupStage,
			@RequestParam("tnmGroupName") String tnmGroupName,
			@RequestParam("groupArray") String groupArray,
			HttpServletRequest request) {
		// for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("groupMasterId", groupMasterId);
		jsonObject.put("bodyPartId", bodyPartId);
		jsonObject.put("tnmGroupName", tnmGroupName);
		jsonObject.put("tnmGroupStage", tnmGroupStage);
		jsonObject.put("groupArray", groupArray);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.saveTNMGroup(jsonObject);
	}

	@RequestMapping(value = "/getAllGroup", method = RequestMethod.GET)
	public @ResponseBody
	JSONArray getAllGroup() {
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getAllGroup();
	}

	@RequestMapping(value = "/removeTNMGroupById", method = RequestMethod.POST)
	public @ResponseBody
	String removeTNMGroupById(@RequestParam("groupId") String groupId,
			HttpServletRequest request) {
		// for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("groupMasterId", groupId);
		jsonObject.put("addedBy", userId);
		jsonObject.put("addedOn", todaysDate);
		jsonObject.put("remoteAddress", remoteAddress);
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.removeTNMGroupById(jsonObject);
	}

	@RequestMapping(value = "/getGroupName", method = RequestMethod.POST)
	public @ResponseBody
	JSONArray getGroupName(@RequestParam("tnmStage") String tnmStage) {
		EhatEnterpriseUtil enterpriseUtil = (ApplicationContextUtils
				.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
		return enterpriseUtil.getGroupName(tnmStage);
	}

	//Added by Tarique Aalam
	@RequestMapping(value = "/getLoginHistoryDateWise", method = RequestMethod.POST)
 	public @ResponseBody Map<String, Object> getLoginHistoryDateWise(@RequestParam("inputDate") String inputDate,@RequestParam("startIndex") Integer startIndex) {
		Map<String,Object> model=new HashMap<String,Object>();
		Integer count = userAccessService.getLoginHistoryDateWiseCount(inputDate);
		JSONArray loginHistory=userAccessService.getLoginHistoryDateWise(inputDate,startIndex);
		model.put("count", count);
		model.put("loginHistory",loginHistory);
		return model;
	}

}
