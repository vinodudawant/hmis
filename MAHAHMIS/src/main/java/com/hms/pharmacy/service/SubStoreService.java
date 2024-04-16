package com.hms.pharmacy.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.pharmacy.pojo.SubStoreMaster;

public interface SubStoreService {

	List<SubStoreMaster> getStoreDetails(String string);

	boolean saveOrUpdateStore(SubStoreMaster subStoreMaster,
			HttpServletRequest request);

	List<SubStoreMaster> getAutoSuggestionStoreNames(String letter);

	List<SubStoreMaster> getStoreById(Integer storeId);

	boolean deleteStore(Integer storeId);

	boolean editStoreAuthentication(Integer storeId, String users);

	List<SubStoreMaster> getSubStoreList();

}
