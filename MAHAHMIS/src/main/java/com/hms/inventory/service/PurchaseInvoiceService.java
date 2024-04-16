package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PurchaseInvoiceDto;
public interface PurchaseInvoiceService {

	int savePurchaseInvoice(PurchaseInvoiceDto purchaseInvoiceDto,
			String lstPurchaseInvoiceItemDto,String batchStockDtoList,
			String purInvContactInfoDtoList,
			String purInvAddressInfoDtoList, Integer partyMasterId,
			HttpServletRequest request);

	List<PurchaseInvoiceDto> getAllPurchaseInvoice(
			HttpServletRequest request);

	PurchaseInvoiceDto editPurchaseInvoice(Integer purchaseInvoiceId);

	boolean deletePurchaseInvoice(Integer purchaseInvoiced,
			HttpServletRequest request);

	PurchaseInvoiceDto purchaseInvoiceAutoSuggestion(String purchaseInvoice);

	PurchaseInvoiceDto getPurchaseInvoiceById(Integer purchaseInvoiceId);
	
	Integer getNextIdNew(String tableName,HttpServletRequest request);

	List<GoodReceiptNoteDto> getPendingGoodsReceiptNote(
			HttpServletRequest request);
	public List<BatchMasterDto> checkBatchAvailability(String batchCode,
			Integer itemMasterId);

	public List<BatchStockDto> getBatchDetails(Integer itemId);

	public int saveBatchStockMaster(BatchStockDto batchStockDtoList,
			Integer masterId, String callFrom);

}
