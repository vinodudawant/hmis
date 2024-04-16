package com.hms.accessmanagement.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public interface UserAccessService {
	
	String saveModule(JSONObject jsonObject);

	JSONArray getAllModule();

	JSONArray getAllSubModule();
	
	String updateModule(JSONObject jsonObject);

	String deleteModule(JSONObject jsonObject);

	JSONObject getModuleByModuleId(Integer moduleId);

	String saveSubModule(JSONObject jsonObject);

	JSONArray getAllSubModuleByModuleId(Integer moduleId);

	String updateSubModule(JSONObject jsonObject);

	String deleteSubModule(JSONObject jsonObject);

	JSONObject getSubModuleBySubModuleId(Integer subModuleId);

	JSONArray userAccessAutoSuggestion(String search,Integer startIndex);

	String saveProfile(JSONObject jsonObject);

	JSONArray getAllProfile();

	JSONObject getProfileByProfileId(String profileId);

	String deleteProfile(JSONObject jsonObject);

	String updateProfile(JSONObject jsonObject);

	String saveRole(JSONObject jsonObject);

	String updateRole(JSONObject jsonObject);

	String deleteRole(JSONObject jsonObject);

	JSONObject getRoleByRoleId(Integer roleId);

	JSONArray getAllRole();

	JSONArray getProfileAccessByProfile(String profileId);

	JSONArray getRoleAccessByRole(String roleId);

	String saveUserAccess(JSONObject jsonObject);
	
	Integer countUserAccess();

	JSONObject getUser(String userId);

	//for print master
	String savePrint(JSONObject jsonObject);

	String updatePrint(JSONObject jsonObject);

	JSONArray getAllPrint();

	JSONObject getPrintByPrintId(String printId);

	String deletePrint(JSONObject jsonObject);

	String savePrintAccess(JSONArray printAccessArray);
	
	JSONArray getAllPrintAccess();

	JSONObject showAccess(String subModuleId);
	
	Integer getNextUserId();
	
	//For login history
	JSONArray getAllUser();

	Integer getLoginHistoryCount(String userId);

	JSONArray getLoginHistory(String userId, Integer startIndex);

	String saveLoginHistory(JSONObject jsonObject);

	String saveLogOutHistory(JSONObject jsonObject);
	
	JSONArray getUsersLoginOrNew(String type);

	Integer getLoginHistoryDateWiseCount(String inputDate);

	JSONArray getLoginHistoryDateWise(String inputDate, Integer startIndex);
	
}
