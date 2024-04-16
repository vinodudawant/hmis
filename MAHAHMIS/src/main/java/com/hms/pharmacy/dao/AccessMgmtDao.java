package com.hms.pharmacy.dao;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.UserModule;

public interface AccessMgmtDao {

	List<UserModule> getUserModules(String type);

	boolean saveOrUpdateUserModule(UserModule userModule);

	JSONArray getUserAccessByUserId(String userId);

	void saveUserAccessDetails(String userId, List<String> accessList, String type);

	JSONArray getUserAccessModuleList();

	JSONArray getUserAccessDetailsById(String userId);

	String getDataByUserAccessId(String userId, String accessId);

	void updateUserAccessDetails(String userId, List<String> innerAccessList, String type);
	
	List<UserModule> getAutoSuggestionModuleNames(String letter);
	
	List<UserModule> getModuleById(Integer catId);
	
	Boolean deleteModule(Integer catId);

	List<UserModule> getUserList(String string);
}
