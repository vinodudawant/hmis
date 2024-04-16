package com.hms.inventory.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.GoodReceiptNoteDao;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.DocMasterDocNumFinancialYearDto;
import com.hms.inventory.dto.GoodReceiptNoteDocUploadDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.PurchaseOrderDto;
import com.hms.inventory.dto.PurchaseReOrderDto;
import com.hms.inventory.service.GoodReceiptNoteService;

@Service
public class GoodReceiptNoteServiceImpl implements GoodReceiptNoteService {

	@Autowired
	GoodReceiptNoteDao goodReceiptNoteDao;

	@Autowired
	SessionFactory sessionFactory;
  
	@Override
	@Transactional
	public int[] saveGoodReceiptNote(GoodReceiptNoteDto goodReceiptNoteDto,
			String lstGoodReceiptNoteItemDto, String grnContactInfoDtoList,String grnAddressInfoDtoList, /*MultipartFile[] uploadfiles,*/String itemAssetMaintenanceDtoList, String itemAssetMaintenanceMasterDtoList, Integer partyMasterId,String callFrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.saveGoodReceiptNote(goodReceiptNoteDto, lstGoodReceiptNoteItemDto, grnContactInfoDtoList, grnAddressInfoDtoList, /*uploadfiles,*/itemAssetMaintenanceDtoList,itemAssetMaintenanceMasterDtoList, partyMasterId,callFrom, request);
	}

	@Override
	@Transactional
	public List<GoodReceiptNoteDto> getAllGoodReceiptNote(
			HttpServletRequest request,String call) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getAllGoodReceiptNote(request,call);
	}

	@Override
	@Transactional
	public GoodReceiptNoteDto editGoodReceiptNote(Integer goodReceiptNoteId,String call,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.editGoodReceiptNote(goodReceiptNoteId,call,request);
	}

	@Override
	@Transactional
	public boolean deleteGoodReceiptNote(Integer goodReceiptNoteId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.deleteGoodReceiptNote(goodReceiptNoteId, request);
	}

	@Override
	@Transactional
	public GoodReceiptNoteDto goodReceiptNoteAutoSuggestion(
			String goodReceiptNote,String call,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.goodReceiptNoteAutoSuggestion(goodReceiptNote,call,request);
	}

	@Override
	@Transactional
	public GoodReceiptNoteDto getGoodReceiptNoteById(Integer goodReceiptNoteId,String callFrom,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getGoodReceiptNoteById(goodReceiptNoteId,callFrom,request);
	}

	@Override
	@Transactional
	public DocMasterDocNumFinancialYearDto getGoodReceiptNoteSeries(String isEdit,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getGoodReceiptNoteSeries(isEdit,request);
	}
	
	@Override
	@Transactional
	public int getNextIdNew(String tableName,
			HttpServletRequest request) {
		return goodReceiptNoteDao.getNextIdNew(tableName, request);
	}

	@Override
	@Transactional
	public String getChallanAndPurchaseInvoiceId(String grnid,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getChallanAndPurchaseInvoiceId(grnid,request);
	}

	@Override
	@Transactional
	public List<PurchaseOrderDto> getPendingPurchaseOrder(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getPendingPurchaseOrder(request);
	}
	
	@Override
	@Transactional
	public List<PurchaseReOrderDto> getPendingPurchaseReOrder(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getPendingPurchaseReOrder(request);
	}

	@Override
	@Transactional
	public List<InventoryTaxSetUpMDTO> getAllInvTaxMasterAutosuggestion(
			String taxName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getAllInvTaxMasterAutosuggestion(taxName,request);
	}

	@Override
	@Transactional
	public List<BatchMasterDto> checkBatchAvailability(String batchCode, Integer itemMasterId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.checkBatchAvailability(batchCode,itemMasterId,request);
	}

	@Override
	@Transactional
	public List<BatchStockDto> getBatchDetails(Integer itemId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getBatchDetails(itemId,request);
	}
	
	@Transactional
	@Override
	public int saveBatchStockMaster(Integer masterId,String callFrom,HttpServletRequest request) {
		return goodReceiptNoteDao.saveBatchStockMaster(masterId,callFrom,request);
	}

	@Override
	@Transactional
	public Integer getPageCountAllGRNMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getPageCountAllGRNMaster(request);
	}

	@Override
	@Transactional
	public GoodReceiptNoteDto getGrnMasterPagination(Integer startIndex,String callFrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getGrnMasterPagination(startIndex,callFrom,request);
	}

	@Override
	@Transactional
	public int uploadGoodReceiptNoteDocument(String document,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.uploadGoodReceiptNoteDocument(document, request);
	}

	@Override
	@Transactional
	public GoodReceiptNoteDocUploadDto getUploadedDocuments(Integer grnMasterId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getUploadedDocuments(grnMasterId,request);
	}

	@Override
	@Transactional
	public boolean checkBatchInBatchMaster(String batchCode, Integer itemMasterId, Date itemBatchExpDate,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.checkBatchInBatchMaster(batchCode,itemMasterId,itemBatchExpDate,request);
	}

	@Override
	@Transactional
	public BatchMasterDto getBatchMaster(String batchCode,
			Integer itemMasterId, Date itemBatchExpDate,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getBatchMaster(batchCode, itemMasterId, itemBatchExpDate, request);
	}

	@Override
	@Transactional
	public boolean deleteGoodReceiptNoteItem(Integer itemSlaveId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.deleteGoodReceiptNoteItem(itemSlaveId,request);
	}

	@Override
	@Transactional
	public GoodReceiptNoteDto getGoodReceiptNoteByVendorName(String vendorName,String callFrom,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getGoodReceiptNoteByVendorName(vendorName,callFrom,request);
	}

	@Override
	@Transactional
	public List<BatchStockDto> getGoodReceiptNoteItemBatchDetails(
			Integer itemMasterId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.getGoodReceiptNoteItemBatchDetails(itemMasterId,request);
	}

	@Override
	@Transactional
	public boolean updateGoodReceiptNoteItemDto(Integer grnItemSlaveId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.updateGoodReceiptNoteItemDto(grnItemSlaveId, request);
	}

	@Override
	@Transactional
	public boolean deleteUploadedDocument(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return goodReceiptNoteDao.deleteUploadedDocument(id, request);
	}
	
}
