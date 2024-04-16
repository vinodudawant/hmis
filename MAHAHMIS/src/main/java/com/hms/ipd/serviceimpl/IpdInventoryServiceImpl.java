package com.hms.ipd.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.ipd.dao.IpdInventoryDao;
import com.hms.ipd.service.IpdInventoryService;

@Service
@Transactional
public class IpdInventoryServiceImpl implements IpdInventoryService {
	
	 @Autowired 
	 private IpdInventoryDao ipdInventoryDao;
	
	@Override
	public Integer getMaterailRequestNoteNextId() {
		
		return ipdInventoryDao.getMaterailRequestNoteNextId();
	}

	@Override
	public List<ItemMasterDto> fetchItemNamesOnlyAutoSuggestForCssdItems(String letter) {
		// TODO Auto-generated method stub
		return ipdInventoryDao.fetchItemNamesOnlyAutoSuggestForCssdItems(letter);
	}

	@Override
	public Integer getAvalQuantityCsd(String itemName, String deptName, int itemCode) {
		// TODO Auto-generated method stub
		return ipdInventoryDao.getAvalQuantityCsd(itemName,deptName,itemCode);
	}

}
