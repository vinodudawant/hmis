package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PurchaseReturnMasterDto;

public interface PurchaseReturnService {
	public int savePurchaseReturnMaster(PurchaseReturnMasterDto purchaseObj,String itemInfoDtoDetails, 
			String partyMasterContactInfoDtoDetails, 
			String parytyMasterAddressInfoDtoDetails,
			HttpServletRequest request,Integer partyMasterId);

	public List<PurchaseReturnMasterDto> getAllPurchaseReturnMaster(HttpServletRequest request,Integer unitId,String call);

	public PurchaseReturnMasterDto editPurchaseReturnMaster(Integer pRId);
	
	public int updatePurchaseReturnContactMaster(PartyMasterContactInfoDto cobj,HttpServletRequest request);

	
	
	public List<PartyMasterContactInfoDto> getAllPReturnContactInfo(HttpServletRequest request,Integer unitId,Integer purchaseQtMasterId);

	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto cobj,HttpServletRequest request);
	
	public List<PartyMasterAddressInfoDto> getAllPReturnAddressInfo(HttpServletRequest request,Integer unitId,Integer purchaseQtMasterId);
	public boolean deletePurchaseReturnSlaveInfo(Integer purchaseSlaveId,Integer purchaseMasterId, String callFrom, HttpServletRequest request);

	public boolean deletePurchaseReturnMaster(Integer pQId, HttpServletRequest request);

	public List<PurchaseReturnMasterDto> getPurchaseReturnMaster(String vendorName);
	public PurchaseReturnMasterDto getPurchaseReturnMasterDetailsById(Integer pRId,Integer unitId);
	
	
	GoodReceiptNoteDto editGoodReceiptNote2(Integer goodReceiptNoteId,String call,HttpServletRequest request);


	//public boolean deletePurchaseQuotationSlaveInfo(Integer purchaseSlaveId,Integer purchaseMasterId, String callFrom, HttpServletRequest request);

	
	//public boolean deletePurchaseQuotationMaster(Integer pQId, HttpServletRequest request);
	
	//public List<PartyMasterDto> inventoryPartyMasterAutoSuggestion(String partyName);
	
	

	//public List<PurchaseQuotationMasterDto> getQuatationMaster(String vendorName);
	
	//public PurchaseQuotationMasterDto getPurchaseQuotationMasterDetailsById(Integer pQId,Integer unitId);


}
