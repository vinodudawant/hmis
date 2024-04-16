package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PurchaseReOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseReOrderDto;

public interface PurchaseReOrderDao {

	int uploadPurchaseReOrderDocument(String document,
			HttpServletRequest request);

	PurchaseReOrderDocUploadDto getUploadedDocuments(Integer proMasterId,
			HttpServletRequest request);

	boolean deletePurchaseReOrderItemInfoSlave(String itemSlaveId,
			HttpServletRequest request);

	boolean deletePurchaseReOrder(Integer id, HttpServletRequest request);

	PurchaseReOrderDto autoFillSearchPurchaseReOrder(String supplierName);

	PurchaseReOrderDto editPurchaseReOrder(Integer id);

	List<PurchaseReOrderDto> getAllPurchaseReOrderRecords(
			HttpServletRequest request);

	int updatePartyAddressPRODetails(
			PartyMasterAddressInfoDto partyMasterAddressInfoDto,
			HttpServletRequest request);

	int updatePartyContactPRODetails(
			PartyMasterContactInfoDto partyMasterContactInfoDto,
			HttpServletRequest request);

	PartyMasterAddressInfoDto editPartyAddressPROSlave(Integer id);

	PartyMasterContactInfoDto editPartyContactPROSlave(Integer id);

	int[] savePurchaseReOrder(PurchaseReOrderDto purchaseReOrderDto,
			String purchaseReOrderItemSlaveDetails,
			String purchaseReOrderPartyContactDetails, Integer partyMasterId,
			String purchaseReOrderPartyAddressDetails,
			String partyMasterTermsAndConditionInfoDtoDetails,
			HttpServletRequest request);

	ItemMasterDto searchByItemMasterId(Integer id, HttpServletRequest request);

	ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(Integer id,
			HttpServletRequest request);

	List<ItemMasterDto> getAllItemStockBelowMinimunLevel(
			HttpServletRequest request);

}
