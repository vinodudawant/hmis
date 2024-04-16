package com.hms.inventory.dao;


import java.util.List;

import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.StockTransferItemInfoDTO;
import com.hms.inventory.dto.StockTransferMasterDTO;

public interface StockTransferDao {
	public int savestockTransperMaster(StockTransferMasterDTO sobj);
	public StockTransferMasterDTO editstockTransperMaster(Integer stockId,Integer unitId);
	public MrnMasterDTO reviewPurchaseRequestMasterForSTO(Integer mrnId,Integer unitId);
	public MrnMasterDTO reviewPurchaseRequestMasterForPO(Integer mrnId,Integer unitId);
	public List<StockTransferMasterDTO> getAllStockId(Integer subInvId);
	public int savePurchaseRequestMaster(MrnMasterDTO mrnobj);
	public int savestockTransperItemSlave(StockTransferItemInfoDTO sobj);
	public int savesBatchStockInfo(BatchStockDto bobj);
	public List<StockTransferMasterDTO> getAllStockMasterForView(Integer unitId);
	public StockTransferMasterDTO viewstockTransperMaster(Integer stockId,Integer unitId);




}
