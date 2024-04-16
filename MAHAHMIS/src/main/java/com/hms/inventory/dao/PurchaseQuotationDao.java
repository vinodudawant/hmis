package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseQuotationDocUploadDto;
import com.hms.inventory.dto.PurchaseQuotationMasterDto;
import com.hms.inventory.dto.PurchaseQuotationTermAndConditionDto;

public interface PurchaseQuotationDao {
	public int[] savePurchaseQuotationMaster(PurchaseQuotationMasterDto purchaseObj);

	public List<PurchaseQuotationMasterDto> getAllPurchaseQuotationMaster(Integer unitId,String call);

	public PurchaseQuotationMasterDto editPurchaseQuotationMaster(Integer pQId);
	
	//public int updatePuContactQuotationMaster(PurchaseQuotationContactInfoDto cobj);
	public int updatePuContactQuotationMaster(PartyMasterContactInfoDto cobj);


	//public List<PurchaseQuotationContactInfoDto> getAllPQuationContactInfo(Integer unitId,Integer purchaseQtMasterId);
	
	public List<PartyMasterContactInfoDto> getAllPQuationContactInfo(Integer unitId,Integer purchaseQtMasterId);

	
	//public int updatePurchaseAddressInfo(PurchaseQuotationAddressInfoDto aobj);
	//public int updatePurchaseAddressInfo(PurchaseQuotationAddressInfoDto aobj);

	public List<PartyMasterAddressInfoDto> getAllPQuationAddressInfo(Integer unitId,Integer purchaseQtMasterId);
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto aobj);

	
	public int updatePurchaseTermInfo(PurchaseQuotationTermAndConditionDto tobj);

	public List<PurchaseQuotationTermAndConditionDto> getAllPQuationTermAndConditionInfo(Integer unitId,Integer purchaseQtMasterId);

	public boolean deletePurchaseQuotationMaster(PurchaseQuotationMasterDto pobj);
	
	public List<PartyMasterDto> inventoryPartyMasterAutoSuggestion(String partyName);
	
	public int savePartyMaster(PartyMasterDto pobj);
	
	public List<PurchaseQuotationMasterDto> getQuatationMaster(String vendorName,String call);
	
	public int uploadPurchaseQuotationDocument(String document,HttpServletRequest request );
	
	public PurchaseQuotationDocUploadDto getUploadedDocuments(Integer pqMasterId,HttpServletRequest request);

	List<PurchaseQuotationMasterDto> checkUserNameandPassword(String userName,
			String userPassword, HttpServletRequest request);

	public int approvePurchaseQuotation(String userName, Integer approvedById,
			String isApproved, Integer purchaseQutationId,
			HttpServletRequest request);


}
