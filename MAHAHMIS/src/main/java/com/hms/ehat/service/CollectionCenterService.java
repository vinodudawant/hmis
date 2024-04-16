package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.CollectionCenterMasterDto;
import com.hms.ehat.dto.UnitMasterDto;

public interface CollectionCenterService {

	//
	public List<UnitMasterDto> getAllUnitMaster();
	
	//collection center master save or update
	public int saveorUpdateCollectionCenterMaster(CollectionCenterMasterDto collectionCenterMasterDto,HttpServletRequest request);
	
	//collection center master get all records
	public List<CollectionCenterMasterDto> getAllCollectionCenterMasterRecords(HttpServletRequest request);
	
	//collection center master edit records
    public CollectionCenterMasterDto editCollectionCenterMaster(Integer id);
    
    //collection center master delete records
  	public boolean deleteCollectionCenterMaster(Integer id, HttpServletRequest request);
  	
  	//
  	public List<CollectionCenterMasterDto> getAllCollectionCenterAutosuggestion(String centerName);
}
