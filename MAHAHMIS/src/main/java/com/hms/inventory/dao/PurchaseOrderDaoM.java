package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PurchaseOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseOrderDto;

public interface PurchaseOrderDaoM {

	//item master search by ID
	public ItemMasterDto searchByItemMasterId(Integer id,HttpServletRequest request);
	
	//save purchase order and slave related to it
	public int[] savePurchaseOrder(PurchaseOrderDto purchaseOrderDto,
			String purchaseOrderItemSlaveDetails,String purchaseOrderPartyContactDetails,
			Integer partyMasterId,String purchaseOrderPartyAddressDetails,String partyMasterTermsAndConditionInfoDtoDetails,HttpServletRequest request);
	//edit party contact slave
	public PartyMasterContactInfoDto editPartyContactPOSlave(Integer id);
	//update party contact slave details on PO
	public int updatePartyContactPODetails(PartyMasterContactInfoDto partyMasterContactInfoDto);
	//edit party address slave
	public PartyMasterAddressInfoDto editPartyAddressPOSlave(Integer id);
	//update party address slave details on PO
	public int updatePartyAddressPODetails(PartyMasterAddressInfoDto partyMasterAddressInfoDto);
	//purchase order get all records
	public List<PurchaseOrderDto> getAllPurchaseOrderRecords();
	//edit purchase order
	public PurchaseOrderDto editPurchaseOrder(Integer id);
	//purchase order auto fill search
	public PurchaseOrderDto autoFillSearchPurchaseOrder(String supplierName);
	//purchase order delete records
	public boolean deletePurchaseOrder(Integer id, HttpServletRequest request);
	//get item maintenance details by master id
	public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(Integer masterId,HttpServletRequest request);
	//to delete purchase order item info slave with respect to item slave id
	public boolean deletePurchaseOrderItemInfoSlave(String itemSlaveId, HttpServletRequest request);
	
	// this is for upload document in purchase order by Vishnu
	public int uploadPurchaseOrderDocument(String document,HttpServletRequest request );
	public PurchaseOrderDocUploadDto getUploadedDocuments(Integer poMasterId,HttpServletRequest request);
	

}
