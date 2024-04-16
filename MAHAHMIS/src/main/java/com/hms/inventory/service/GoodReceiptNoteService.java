package com.hms.inventory.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.DocMasterDocNumFinancialYearDto;
import com.hms.inventory.dto.GoodReceiptNoteDocUploadDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.PurchaseOrderDto;
import com.hms.inventory.dto.PurchaseReOrderDto;

public interface GoodReceiptNoteService {

	public int[] saveGoodReceiptNote(GoodReceiptNoteDto goodReceiptNoteDto,
			String lstGoodReceiptNoteItemDto, String grnContactInfoDtoList, String grnAddressInfoDtoList,
			/*MultipartFile[]  uploadfiles,*/String itemAssetMaintenanceDtoList, String itemAssetMaintenanceMasterDtoList, Integer partyMasterId,String callFrom, HttpServletRequest request);

	public List<GoodReceiptNoteDto> getAllGoodReceiptNote(
			HttpServletRequest request,String call);

	public GoodReceiptNoteDto editGoodReceiptNote(Integer goodReceiptNoteId,String call, HttpServletRequest request);

	public boolean deleteGoodReceiptNote(Integer goodReceiptNoteId,
			HttpServletRequest request);

	public GoodReceiptNoteDto goodReceiptNoteAutoSuggestion(
			String goodReceiptNote,String call,HttpServletRequest request);

	public GoodReceiptNoteDto getGoodReceiptNoteById(Integer goodReceiptNoteId,String callFrom,HttpServletRequest request);

	public DocMasterDocNumFinancialYearDto getGoodReceiptNoteSeries(
			String isEdit,HttpServletRequest request);

	int getNextIdNew(String tableName, HttpServletRequest request);

	public String getChallanAndPurchaseInvoiceId(String grnid,
			HttpServletRequest request);

	public List<PurchaseOrderDto> getPendingPurchaseOrder(
			HttpServletRequest request);

	public List<InventoryTaxSetUpMDTO> getAllInvTaxMasterAutosuggestion(
			String taxName,HttpServletRequest request);

	public List<BatchMasterDto> checkBatchAvailability(String batchCode,
			Integer itemMasterId,HttpServletRequest request);

	public List<BatchStockDto> getBatchDetails(Integer itemId,HttpServletRequest request);

	public int saveBatchStockMaster(Integer masterId,String callFrom,HttpServletRequest request);
	
	public Integer getPageCountAllGRNMaster(HttpServletRequest request);

	public GoodReceiptNoteDto getGrnMasterPagination(Integer startIndex, String callFrom, HttpServletRequest request);
	
	public int uploadGoodReceiptNoteDocument(String document, HttpServletRequest request);
	
	public GoodReceiptNoteDocUploadDto getUploadedDocuments(Integer grnMasterId,HttpServletRequest request);
	
	public boolean checkBatchInBatchMaster(String batchCode, Integer itemMasterId, Date itemBatchExpDate, HttpServletRequest request);
	public BatchMasterDto getBatchMaster(String batchCode,Integer itemMasterId, Date itemBatchExpDate,HttpServletRequest request);

	public boolean deleteGoodReceiptNoteItem(Integer itemSlaveId,
			HttpServletRequest request);

	public GoodReceiptNoteDto getGoodReceiptNoteByVendorName(String vendorName,String callFrom,
			HttpServletRequest request);

	public List<PurchaseReOrderDto> getPendingPurchaseReOrder(
			HttpServletRequest request);

	public List<BatchStockDto> getGoodReceiptNoteItemBatchDetails(
			Integer itemMasterId, HttpServletRequest request);
	
	public boolean updateGoodReceiptNoteItemDto(Integer grnItemSlaveId,
			HttpServletRequest request);

	public boolean deleteUploadedDocument(Integer id, HttpServletRequest request);
	
}
