package com.hms.pharmacy.dao;
import java.util.List;

import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
public interface ShelfDao 
{
	Boolean saveOrUpdateShelf(ShelfMaster shelfMaster);

	List<ShelfMaster> getShelfs(String type);

	Boolean deleteShelf(Integer shelfId);

	List<ShelfMaster> getAutoSuggestionShelfNames(String letter);

	List<ShelfMaster> getShelfById(Integer shelfId);
	
	ShelfMaster getShelfByIdForDate(Integer shelfId);

}
