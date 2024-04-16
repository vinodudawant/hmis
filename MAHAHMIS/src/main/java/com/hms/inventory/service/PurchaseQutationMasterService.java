package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseQuotationDocUploadDto;
import com.hms.inventory.dto.PurchaseQuotationMasterDto;
import com.hms.inventory.dto.PurchaseQuotationTermAndConditionDto;

public interface PurchaseQutationMasterService {
	public int[] savePurchaseQuotationMaster(PurchaseQuotationMasterDto ourchaseObj,String itemInfoDtoDetails, 
			String purchasequotationContactInfoDtoDetails, 
			String purchaeQuotationAddressInfoDtoDetails,String purchaeQuotationTermAndConditionInfoDtoDetails,
			HttpServletRequest request,Integer partyMasterId);

	public List<PurchaseQuotationMasterDto> getAllPurchaseQuotationMaster(HttpServletRequest request,Integer unitId,String call);

	public PurchaseQuotationMasterDto editPurchaseQuotationMaster(Integer pQId);
	
	//public int updatePuContactQuotationMaster(PurchaseQuotationContactInfoDto cobj,HttpServletRequest request);
	public int updatePuContactQuotationMaster(PartyMasterContactInfoDto cobj,HttpServletRequest request);

	
	//public List<PurchaseQuotationContactInfoDto> getAllPQuationContactInfo(HttpServletRequest request,Integer unitId,Integer purchaseQtMasterId);
	
	public List<PartyMasterContactInfoDto> getAllPQuationContactInfo(HttpServletRequest request,Integer unitId,Integer purchaseQtMasterId);

	//public int updatePurchaseAddressInfo(PurchaseQuotationAddressInfoDto cobj,HttpServletRequest request);

	//public List<PurchaseQuotationAddressInfoDto> getAllPQuationAddressInfo(HttpServletRequest request,Integer unitId,Integer purchaseQtMasterId);
	public List<PartyMasterAddressInfoDto> getAllPQuationAddressInfo(HttpServletRequest request,Integer unitId,Integer purchaseQtMasterId);

	
	public int updatePurchaseTermInfo(PurchaseQuotationTermAndConditionDto tobj,HttpServletRequest request);

	public List<PurchaseQuotationTermAndConditionDto> getAllPQuationTermAndConditionInfo(HttpServletRequest request,Integer unitId,Integer purchaseQtMasterId);

	public boolean deletePurchaseQuotationSlaveInfo(Integer purchaseSlaveId,Integer purchaseMasterId, String callFrom, HttpServletRequest request);

	
	public boolean deletePurchaseQuotationMaster(Integer pQId, HttpServletRequest request);
	
	public List<PartyMasterDto> inventoryPartyMasterAutoSuggestion(String partyName);
	
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto cobj,HttpServletRequest request);

	public List<PurchaseQuotationMasterDto> getQuatationMaster(String vendorName,String call);
	
	public PurchaseQuotationMasterDto getPurchaseQuotationMasterDetailsById(Integer pQId,Integer unitId,String call);

	public boolean deletePurchaseQuotationItemInfoSlave(String itemId, HttpServletRequest request);
	
	public int uploadPurchaseQuotationDocument(String document,HttpServletRequest request );
	
	public PurchaseQuotationDocUploadDto getUploadedDocuments(Integer pqMasterId,HttpServletRequest request);

	public List<PurchaseQuotationMasterDto> checkUserNameandPassword(String userName,
			String userPassword, HttpServletRequest request);

	public int approvePurchaseQuotation(String userName, Integer approvedById,
			String isApproved, Integer purchaseQutationId,
			HttpServletRequest request);
}
