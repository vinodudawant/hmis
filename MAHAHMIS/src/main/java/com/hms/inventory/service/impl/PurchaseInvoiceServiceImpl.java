package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PurchaseInvoiceDao;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PurchaseInvoiceDto;
import com.hms.inventory.service.PurchaseInvoiceService;

@Service
@Transactional
public class PurchaseInvoiceServiceImpl implements PurchaseInvoiceService {

	@Autowired
	PurchaseInvoiceDao purchaseInvoiceDao;

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int savePurchaseInvoice(PurchaseInvoiceDto purchaseInvoiceDto,
			String lstPurchaseInvoiceItemDto, String batchStockDtoList,	/*String batchMasterDtoList,*/ String purInvContactInfoDtoList,
			String purInvAddressInfoDtoList, Integer partyMasterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.savePurchaseInvoice(purchaseInvoiceDto, lstPurchaseInvoiceItemDto, batchStockDtoList, /*batchMasterDtoList,*/ purInvContactInfoDtoList, purInvAddressInfoDtoList, partyMasterId, request);
	}

	@Override
	public List<PurchaseInvoiceDto> getAllPurchaseInvoice(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.getAllPurchaseInvoice(request);
	}

	@Override
	public PurchaseInvoiceDto editPurchaseInvoice(Integer purchaseInvoiceId) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.editPurchaseInvoice(purchaseInvoiceId);
	}

	@Override
	public boolean deletePurchaseInvoice(Integer purchaseInvoiced,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.deletePurchaseInvoice(purchaseInvoiced, request);
	}

	@Override
	
	public PurchaseInvoiceDto purchaseInvoiceAutoSuggestion(
			String purchaseInvoice) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.purchaseInvoiceAutoSuggestion(purchaseInvoice);
	}

	@Override
	public PurchaseInvoiceDto getPurchaseInvoiceById(Integer purchaseInvoiceId) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.getPurchaseInvoiceById(purchaseInvoiceId);
	}

	@Override
	public Integer getNextIdNew(String tableName, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.getNextIdNew(tableName, request);
	}

	@Override
	public List<GoodReceiptNoteDto> getPendingGoodsReceiptNote(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.getPendingGoodsReceiptNote(request);
	}

	@Override
	public List<BatchMasterDto> checkBatchAvailability(String batchCode,
			Integer itemMasterId) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.checkBatchAvailability(batchCode, itemMasterId);
	}

	@Override
	public List<BatchStockDto> getBatchDetails(Integer itemId) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.getBatchDetails(itemId);
	}

	@Override
	public int saveBatchStockMaster(BatchStockDto batchStockDtoList,
			Integer masterId, String callFrom) {
		// TODO Auto-generated method stub
		return purchaseInvoiceDao.saveBatchStockMaster(batchStockDtoList, masterId, callFrom);
	}

}
