package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PurchaseReturnMasterDto;

public interface PurchaseReturnDao {
	public int savePurchaseReturnMaster(PurchaseReturnMasterDto purchaseObj);

	public List<PurchaseReturnMasterDto> getAllPurchaseReturnMaster(Integer unitId,String call);

	public PurchaseReturnMasterDto editPurchaseReturnMaster(Integer pRId);
	
	public int updatePReturnContactQuotationMaster(PartyMasterContactInfoDto cobj);

	
	public List<PartyMasterContactInfoDto> getAllPReturnContactInfo(Integer unitId,Integer purchaseQtMasterId);

	
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto aobj);
	public List<PartyMasterAddressInfoDto> getAllPReturnAddressInfo(Integer unitId,Integer purchaseQtMasterId);
	
	public List<PurchaseReturnMasterDto> getPurchaseReturnMaster(String vendorName);
	
	GoodReceiptNoteDto editGoodReceiptNote2(Integer goodReceiptNoteId,String call,HttpServletRequest request);

	


	//public boolean deletePurchaseQuotationMaster(PurchaseQuotationMasterDto pobj);
	
	//public List<PartyMasterDto> inventoryPartyMasterAutoSuggestion(String partyName);
	
	//public int savePartyMaster(PartyMasterDto pobj);
	
	//public List<PurchaseQuotationMasterDto> getQuatationMaster(String vendorName);


}
