package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.StockTransferMasterDTO;

public interface StockTransferService {
	
	public int savestockTransperMaster(StockTransferMasterDTO sobj,String itemInfoDtoDetails,HttpServletRequest request);
	public StockTransferMasterDTO editstockTransperMaster(Integer stockId,Integer unitId);
	public MrnMasterDTO reviewPurchaseRequestMasterForSTO(Integer mrnId,Integer unitId);
	public MrnMasterDTO reviewPurchaseRequestMasterForPO(Integer mrnId,Integer unitId);
	public List<StockTransferMasterDTO> getAllStockId(Integer subInvId);
	public BatchStockDto getBatchIdInfoForSto(Integer batchId);
	
	public int acceptStockTransperItemMaster(Integer itemInfoId,Integer  receiveQty,Integer subInvId,Integer stockId,HttpServletRequest request);
	public List<StockTransferMasterDTO> getAllStockMasterForView(Integer unitId);
	public StockTransferMasterDTO viewstockTransperMaster(Integer stockId,Integer unitId);

}
