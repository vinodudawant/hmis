package com.hms.pharmacy.service;

import java.util.List;

import org.json.JSONArray;

import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.UserModule;

public interface AccessMgmtService {

	List<UserModule> getUserModules(String string);

	boolean saveOrUpdateUserModule(UserModule userModule);

	boolean saveModules(String userId, List<String> accessList);

	JSONArray getUserAccessModuleList();

	JSONArray getUserAccessDetailsById(String userId);
	
    List<UserModule> getAutoSuggestionModuleNames(String letter);
	
	List<UserModule> getModuleById(Integer catId);
			
	Boolean deleteModule(Integer catId);

	List<UserModule> getUserList(String string);

}
