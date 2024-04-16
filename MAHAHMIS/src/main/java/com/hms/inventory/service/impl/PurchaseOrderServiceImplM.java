package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PurchaseOrderDaoM;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PurchaseOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseOrderDto;
import com.hms.inventory.service.PurchaseOrderServiceM;

@Service
@Transactional
public class PurchaseOrderServiceImplM implements PurchaseOrderServiceM{

	@Autowired
	private PurchaseOrderDaoM purchaseOrderDaoM;
	
	@Override
	public ItemMasterDto searchByItemMasterId(Integer id,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseOrderDaoM.searchByItemMasterId(id, request);
	}

	@Override
	public int[] savePurchaseOrder(PurchaseOrderDto purchaseOrderDto,
			String purchaseOrderItemSlaveDetails,
			String purchaseOrderPartyContactDetails,Integer partyMasterId,
			String purchaseOrderPartyAddressDetails,String partyMasterTermsAndConditionInfoDtoDetails, HttpServletRequest request) {
		int response[] = purchaseOrderDaoM.savePurchaseOrder(purchaseOrderDto,
				purchaseOrderItemSlaveDetails,purchaseOrderPartyContactDetails,
				partyMasterId,purchaseOrderPartyAddressDetails,partyMasterTermsAndConditionInfoDtoDetails, request);
		return response;
	}

	@Override
	public PartyMasterContactInfoDto editPartyContactPOSlave(Integer id) {
		// TODO Auto-generated method stub
		return purchaseOrderDaoM.editPartyContactPOSlave(id);
	}

	@Override
	public int updatePartyContactPODetails(
			PartyMasterContactInfoDto partyMasterContactInfoDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = purchaseOrderDaoM.updatePartyContactPODetails(partyMasterContactInfoDto);
		return response;
	}
	
	@Override
	public PartyMasterAddressInfoDto editPartyAddressPOSlave(Integer id) {
		// TODO Auto-generated method stub
		return purchaseOrderDaoM.editPartyAddressPOSlave(id);
	}

	@Override
	public int updatePartyAddressPODetails(
			PartyMasterAddressInfoDto partyMasterAddressInfoDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = purchaseOrderDaoM.updatePartyAddressPODetails(partyMasterAddressInfoDto);
		return response;
	}

	@Override
	public List<PurchaseOrderDto> getAllPurchaseOrderRecords(
			HttpServletRequest request) {
		return purchaseOrderDaoM.getAllPurchaseOrderRecords();
	}

	@Override
	public PurchaseOrderDto editPurchaseOrder(Integer id) {
		return purchaseOrderDaoM.editPurchaseOrder(id);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 02-12-2019
	 * @comment This method is created for to get auto fill search on purchase order by passing supplier name as parameter
	 * @param supplierName
	 * @return
	 */
	@Override
	public PurchaseOrderDto autoFillSearchPurchaseOrder(String supplierName) {
		return purchaseOrderDaoM.autoFillSearchPurchaseOrder(supplierName);
	}

	@Override
	public boolean deletePurchaseOrder(Integer id, HttpServletRequest request) {
		return purchaseOrderDaoM.deletePurchaseOrder(id, request);
	}

	@Override
	public boolean deletePurchaseOrderItemInfoSlave(String itemSlaveId,
			HttpServletRequest request) {
		return purchaseOrderDaoM.deletePurchaseOrderItemInfoSlave(itemSlaveId, request);
	}
	
	@Override
	public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(
			Integer masterId, HttpServletRequest request) {
		return purchaseOrderDaoM.getMaintenanceDetailsByItemMasterId(masterId, request);
	}

	@Override
	public int uploadPurchaseOrderDocument(String document,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseOrderDaoM.uploadPurchaseOrderDocument(document, request);
	}

	@Override
	public PurchaseOrderDocUploadDto getUploadedDocuments(Integer poMasterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseOrderDaoM.getUploadedDocuments(poMasterId, request);
	}

}
