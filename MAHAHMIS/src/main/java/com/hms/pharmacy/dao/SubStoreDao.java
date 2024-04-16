package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.SubStoreMaster;

public interface SubStoreDao {

	List<SubStoreMaster> getStoreDetails(String type);

	boolean saveOrUpdateStore(SubStoreMaster subStoreMaster);

	List<SubStoreMaster> getAutoSuggestionStoreNames(String letter);

	List<SubStoreMaster> getStoreById(Integer storeId);

	boolean deleteStore(Integer storeId);

	SubStoreMaster getSubStoreDate(Integer storeId);

	boolean editStoreAuthentication(Integer storeId, String users,
			java.util.Date date);

	List<SubStoreMaster> getSubStoreList();

}
