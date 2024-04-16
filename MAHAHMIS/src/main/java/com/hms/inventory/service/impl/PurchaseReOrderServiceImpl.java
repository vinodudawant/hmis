package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PurchaseReOrderDao;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PurchaseReOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseReOrderDto;
import com.hms.inventory.service.PurchaseReOrderService;

@Service
@Transactional
public class PurchaseReOrderServiceImpl implements PurchaseReOrderService{

	@Autowired
	private PurchaseReOrderDao purchaseReOrderDao;

	@Override
	public int uploadPurchaseReOrderDocument(String document,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseReOrderDao.uploadPurchaseReOrderDocument(document, request);
	}

	@Override
	public PurchaseReOrderDocUploadDto getUploadedDocuments(
			Integer proMasterId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseReOrderDao.getUploadedDocuments(proMasterId, request);
	}

	@Override
	public boolean deletePurchaseReOrderItemInfoSlave(Integer itemSlaveId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseReOrderDao.deletePurchaseReOrder(itemSlaveId, request);
	}

	@Override
	public boolean deletePurchaseReOrder(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.deletePurchaseReOrder(id, request);
	}

	@Override
	public PurchaseReOrderDto autoFillSearchPurchaseReOrder(String supplierName) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.autoFillSearchPurchaseReOrder(supplierName);
	}

	@Override
	public PurchaseReOrderDto editPurchaseReOrder(Integer id) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.editPurchaseReOrder(id);
	}

	@Override
	public List<PurchaseReOrderDto> getAllPurchaseReOrderRecords(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.getAllPurchaseReOrderRecords(request);
	}

	@Override
	public int updatePartyAddressPRODetails(
			PartyMasterAddressInfoDto partyMasterAddressInfoDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.updatePartyAddressPRODetails(partyMasterAddressInfoDto, request);
	}

	@Override
	public int updatePartyContactPRODetails(
			PartyMasterContactInfoDto partyMasterContactInfoDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.updatePartyContactPRODetails(partyMasterContactInfoDto, request);
	}

	@Override
	public PartyMasterAddressInfoDto editPartyAddressPROSlave(Integer id) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.editPartyAddressPROSlave(id);
	}

	@Override
	public PartyMasterContactInfoDto editPartyContactPROSlave(Integer id) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.editPartyContactPROSlave(id);
	}

	@Override
	public int[] savePurchaseReOrder(PurchaseReOrderDto purchaseReOrderDto,
			String purchaseReOrderItemSlaveDetails,
			String purchaseReOrderPartyContactDetails, Integer partyMasterId,
			String purchaseReOrderPartyAddressDetails,
			String partyMasterTermsAndConditionInfoDtoDetails,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.savePurchaseReOrder(purchaseReOrderDto, purchaseReOrderItemSlaveDetails, purchaseReOrderPartyContactDetails, partyMasterId, purchaseReOrderPartyAddressDetails, partyMasterTermsAndConditionInfoDtoDetails, request);
	}

	@Override
	public ItemMasterDto searchByItemMasterId(Integer id,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.searchByItemMasterId(id, request);
	}

	@Override
	public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(
			Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return  purchaseReOrderDao.getMaintenanceDetailsByItemMasterId(id, request);
	}

	@Override
	public List<ItemMasterDto> getAllItemStockBelowMinimunLevel(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseReOrderDao.getAllItemStockBelowMinimunLevel(request);
	}
	
	

}
