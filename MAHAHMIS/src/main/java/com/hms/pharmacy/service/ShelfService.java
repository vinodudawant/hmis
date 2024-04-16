package com.hms.pharmacy.service;
import java.util.List;
import com.hms.pharmacy.pojo.ShelfMaster;
public interface ShelfService 
{
	Boolean saveOrUpdateShelf(ShelfMaster shelfMaster);

	List<ShelfMaster> getShelfs(String type);

	Boolean deleteShelf(Integer shelfId);

	List<ShelfMaster> getAutoSuggestionShelfNames(String letter);

	List<ShelfMaster> getShelfById(Integer shelfId);

}
