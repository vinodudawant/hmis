package com.hms.accessmanagement.service.impl;

import javax.transaction.Transactional;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.accessmanagement.dao.UserAccessDao;
import com.hms.accessmanagement.service.UserAccessService;

@Service
public class UserAccessServiceImpl implements UserAccessService{
	
	@Autowired
	UserAccessDao userAccessDao;

	@Override
	@Transactional
	public String saveModule(JSONObject jsonObject) {
		return userAccessDao.saveModule(jsonObject);
	}
	
	@Override
	@Transactional
	public JSONArray getAllModule() {
		return userAccessDao.getAllModule();
	}

	@Override
	@Transactional
	public JSONArray getAllSubModule() {
		return userAccessDao.getAllSubModule();
	}

	@Override
	@Transactional
	public String updateModule(JSONObject jsonObject) {
		return userAccessDao.updateModule(jsonObject);
	}

	@Override
	@Transactional
	public String deleteModule(JSONObject jsonObject) {
		return userAccessDao.deleteModule(jsonObject);
	}

	@Override
	@Transactional
	public JSONObject getModuleByModuleId(Integer moduleId) {
		return userAccessDao.getModuleByModuleId(moduleId);
	}

	@Override
	@Transactional
	public String saveSubModule(JSONObject jsonObject) {
		return userAccessDao.saveSubModule(jsonObject);
	}

	@Override
	@Transactional
	public JSONArray getAllSubModuleByModuleId(Integer moduleId) {
		return userAccessDao.getAllSubModuleByModuleId(moduleId);
	}

	@Override
	@Transactional
	public String updateSubModule(JSONObject jsonObject) {
		return userAccessDao.updateSubModule(jsonObject);
	}

	@Override
	@Transactional
	public String deleteSubModule(JSONObject jsonObject) {
		return userAccessDao.deleteSubModule(jsonObject);
	}

	@Override
	@Transactional
	public JSONObject getSubModuleBySubModuleId(Integer subModuleId) {
		return userAccessDao.getSubModuleBySubModuleId(subModuleId);
	}

	@Override
	@Transactional
	public JSONArray userAccessAutoSuggestion(String search,Integer startIndex) {
		return userAccessDao.userAccessAutoSuggestion(search,startIndex);
	}

	@Override
	@Transactional
	public String saveProfile(JSONObject jsonObject) {
		return userAccessDao.saveProfile(jsonObject);
	}

	@Override
	@Transactional
	public JSONArray getAllProfile() {
		return userAccessDao.getAllProfile();
	}

	@Override
	@Transactional
	public JSONObject getProfileByProfileId(String profileId) {
		return userAccessDao.getProfileByProfileId(profileId);
	}

	@Override
	@Transactional
	public String deleteProfile(JSONObject jsonObject) {
		return userAccessDao.deleteProfile(jsonObject);
	}

	@Override
	@Transactional
	public String updateProfile(JSONObject jsonObject) {
		return userAccessDao.updateProfile(jsonObject);
	}

	@Override
	@Transactional
	public String saveRole(JSONObject jsonObject) {
		return userAccessDao.saveRole(jsonObject);
	}

	@Override
	@Transactional
	public String updateRole(JSONObject jsonObject) {
		return userAccessDao.updateRole(jsonObject);
	}

	@Override
	@Transactional
	public String deleteRole(JSONObject jsonObject) {
		return userAccessDao.deleteRole(jsonObject);
	}

	@Override
	@Transactional
	public JSONObject getRoleByRoleId(Integer roleId) {
		return userAccessDao.getRoleByRoleId(roleId);
	}

	@Override
	@Transactional
	public JSONArray getAllRole() {
		return userAccessDao.getAllRole();
	}

	@Override
	@Transactional
	public JSONArray getProfileAccessByProfile(String profileId) {
		return userAccessDao.getProfileAccessByProfile(profileId);
	}

	@Override
	@Transactional
	public JSONArray getRoleAccessByRole(String roleId) {
		return userAccessDao.getRoleAccessByRole(roleId);
	}

	@Override
	@Transactional
	public String saveUserAccess(JSONObject jsonObject) {
		return userAccessDao.saveUserAccess(jsonObject);
	}

	@Override
	@Transactional
	public Integer countUserAccess() {
		return userAccessDao.countUserAccess();
	}

	@Override
	@Transactional
	public JSONObject getUser(String userId) {
		return userAccessDao.getUser(userId);
	}

	@Override
	@Transactional
	public String savePrint(JSONObject jsonObject) {
		return userAccessDao.savePrint(jsonObject);
	}

	@Override
	@Transactional
	public String updatePrint(JSONObject jsonObject) {
		return userAccessDao.updatePrint(jsonObject);
	}

	@Override
	@Transactional
	public JSONArray getAllPrint() {
		return userAccessDao.getAllPrint();
	}

	@Override
	@Transactional
	public JSONObject getPrintByPrintId(String printId) {
		return userAccessDao.getPrintByPrintId(printId);
	}

	@Override
	@Transactional
	public String deletePrint(JSONObject jsonObject) {
		return userAccessDao.deletePrint(jsonObject);
	}

	@Override
	@Transactional
	public String savePrintAccess(JSONArray printAccessArray) {
		return userAccessDao.savePrintAccess(printAccessArray);
	}

	@Override
	@Transactional
	public JSONArray getAllPrintAccess() {
		return userAccessDao.getAllPrintAccess();
	}

	@Override
	@Transactional
	public JSONObject showAccess(String subModuleId) {
		return userAccessDao.showAccess(subModuleId);
	}

	@Override
	@Transactional
	public Integer getNextUserId() {
		return userAccessDao.getNextUserId();
	}

	@Override
	@Transactional
	public JSONArray getAllUser() {
		return userAccessDao.getAllUser();
	}

	@Override
	@Transactional
	public Integer getLoginHistoryCount(String userId) {
		return userAccessDao.getLoginHistoryCount(userId);
	}

	@Override
	@Transactional
	public JSONArray getLoginHistory(String userId, Integer startIndex) {
		return userAccessDao.getLoginHistory(userId, startIndex);
	}

	@Override
	@Transactional
	public String saveLoginHistory(JSONObject jsonObject) {
		return userAccessDao.saveLoginHistory(jsonObject);
	}

	@Override
	@Transactional
	public String saveLogOutHistory(JSONObject jsonObject) {
		return userAccessDao.saveLogOutHistory(jsonObject);
	}

	@Override
	@Transactional
	public JSONArray getUsersLoginOrNew(String type) {
		return userAccessDao.getUsersLoginOrNew(type);
	}
	
	@Override
	@Transactional
	public Integer getLoginHistoryDateWiseCount(String inputDate) {
		return userAccessDao.getLoginHistoryDateWiseCount(inputDate);
	}

	@Override
	@Transactional
	public JSONArray getLoginHistoryDateWise(String inputDate,
			Integer startIndex) {
		return userAccessDao.getLoginHistoryDateWise(inputDate, startIndex);
		}


}
