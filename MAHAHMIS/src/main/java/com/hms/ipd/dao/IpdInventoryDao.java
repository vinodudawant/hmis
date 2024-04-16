package com.hms.ipd.dao;

import java.util.List;

import com.hms.inventory.dto.ItemMasterDto;

public interface IpdInventoryDao {

	Integer getMaterailRequestNoteNextId();

	List<ItemMasterDto> fetchItemNamesOnlyAutoSuggestForCssdItems(String letter);

	Integer getAvalQuantityCsd(String itemName, String deptName, int itemCode);

}
