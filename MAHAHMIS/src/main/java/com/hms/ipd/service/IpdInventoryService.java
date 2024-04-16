package com.hms.ipd.service;

import java.util.List;

import com.hms.inventory.dto.ItemMasterDto;

public interface IpdInventoryService {

	Integer getMaterailRequestNoteNextId();

	List<ItemMasterDto> fetchItemNamesOnlyAutoSuggestForCssdItems(String letter);

	Integer getAvalQuantityCsd(String itemName, String deptName, int itemCode);

}
