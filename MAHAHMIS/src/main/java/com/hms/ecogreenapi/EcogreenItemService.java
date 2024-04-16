package com.hms.ecogreenapi;

import org.springframework.http.ResponseEntity;

public interface EcogreenItemService {
  
	int saveEcoreenItemDetails(EcogreenItemMasterDto obj); 
	
	EcogreenItemMasterDto getItemList(int masterId);
	
	String saveItemMaterNew(); 
	
	String saveProductMasterNew();
	
	String addNewProducts(ItemMstGenericResponse[] genericRequest);
	
PharamIndentResponseDTO getIndentDetails(String fromDate,String toDate);
	
	int updateIndentStatus(PharmaUpdateIndentPayload obj);
	
	PharmaSaleOrderMasterDTO getStockDetails();
	
	ResponseEntity<Object> fechStock();
	
	ResponseEntity<PharmaIndentErrorDTO> sendPrescptionToEcogreen(String prescrptionIds);
	
	  
}
