package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.CollectionCenterMasterDto;
import com.hms.ehat.dto.UnitMasterDto;

public interface CollectionCenterDao {

	//
	public List<UnitMasterDto> getAllUnitMaster();
	
	//collection center master save or update
    public int saveorUpdateCollectionCenterMaster(CollectionCenterMasterDto collectionCenterMasterDto);
    
    //collection center master get all records
  	public List<CollectionCenterMasterDto> getAllCollectionCenterMasterRecords();
  	
	//collection center master edit records
	public CollectionCenterMasterDto editCollectionCenterMaster(Integer id);
	
	//collection center master delete records
    public boolean deleteCollectionCenterMaster(CollectionCenterMasterDto collectionCenterMasterDto);
    
    public List<CollectionCenterMasterDto> getAllCollectionCenterAutosuggestion(String centerName);
}
