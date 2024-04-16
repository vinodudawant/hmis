package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Users;
import com.hms.inventory.dto.ConsumptionDto;
import com.hms.inventory.dto.ConsumptionItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.GoodsIssueMrnMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.StockReturnDto;
public interface SubInventoryDaoM {
	
	//to get item master slave details and current sub inv stock
	public ItemMasterDto getItemMasterSlaveDetailsAndCurrentSubInvStock(Integer itemMasterId,Integer subInvId,HttpServletRequest request);
	
	//save generate MRN request DTO
	public int saveGenerateMRNRequest(MrnMasterDTO mrnMasterDTO,String generateMRNItemSlaveDetails,HttpServletRequest request);
	
	//generated mrn In-Process Status data
	public List<MrnMasterDTO> getInProcessStatusGeneratedMRNRequest(String subInventoryName,HttpServletRequest request);
	
	//edit generated mrn data
	public MrnMasterDTO editGeneratedMRNData(Integer id,HttpServletRequest request);
	
	//to update batch stock
	public int updateBatchStock(String batchStockDetails,HttpServletRequest request);
	
	//generated mrn all data
	public List<MrnMasterDTO> getAllGeneratedMRNRequest(String subInventoryName,HttpServletRequest request);
	
	//to update sub inventory batch stock quantity
  	public int updateSubInventoryItemStockQuantity(Integer itemSlaveId,Integer mrnId,Integer currentSubInvStock,
  			Integer itemMasterId,String itemBatchCode,Integer goodsIssueMrnId,String mrnStatus,HttpServletRequest request,Integer goodsIssueSlaveId,String itemBatchExpDate,Integer subInventoryIdInsideModalOnApproval);
  	
	//generated mrn all data for indent tab
  	public List<GoodsIssueMrnItemSlaveDto> getAllGeneratedMRNRequestDataForIndentTab(Integer subInventoryId,HttpServletRequest request);
    
  	//This js function is created for to update the MRN status after receiving full quantity of product
  	public int updateFullyReceivedMrnStatus(Integer mrnId,HttpServletRequest request);
  	
	//This function is created for to get the current sub inventory batch wise stock for consumption
  	public List<GoodsIssueMrnItemSlaveDto> getCurrentSubStockBatchWise(Integer itemMasteId,Integer subInvId,HttpServletRequest request);
  	
    //save Consumption request
  	public int saveConsumptionDetails(ConsumptionDto consumptionDto,String consumptionItemSlaveDetails,HttpServletRequest request);
		
  	//to update batch stock after consumption request
  	public int updateBatchStockAfterConsumotionRequest(String batchStockDetails,String goodsIssueMrnItemSlaveDetails,HttpServletRequest request);
  	
  	//generated mrn In-Process Status data
  	public List<ConsumptionDto> getConsumptionList(String subInventoryName,Integer subInventoryId, HttpServletRequest request);
  	
  	//edit generated consumption data
  	public ConsumptionDto editGeneratedConsumptionDetails(Integer id,HttpServletRequest request);
  	
    //get generated consumption list by id
  	public List<ConsumptionDto> getConsumptionListById(Integer subInvId,HttpServletRequest request);
  	
  	//save stock return dto
  	public int saveStockReturnDetails(StockReturnDto stockReturnDto,String stockReturnItemSlaveDetails,HttpServletRequest request);
  	
  	//to update batch stock after stock return request
  	public int updateBatchStockAfterStockReturnRequest(StockReturnDto sobj,  String stockReturnItemSlaveDetails,String goodsIssueMrnItemSlaveDetails,String batchStockDetails,HttpServletRequest request);
  	
  	//get all mrn received data
  	public List<GoodsIssueMrnMasterDto> getReceivedMrnData(Integer subInventoryId,HttpServletRequest request);
  	
  	// get all stock return data 
    public List getAllStockRetrun(Integer subInventoryId, HttpServletRequest request);
    
	public List<StockReturnDto> getAllStockReturnRecordsDetails(HttpServletRequest request,Integer unitId, String subinventoryName, Integer subInventoryId);
	
	public StockReturnDto editStockReturn(Integer stockId,HttpServletRequest request);
	
	public boolean deleteStockReturn(StockReturnDto sobj,HttpServletRequest request);
	
	public List<StockReturnDto> getStockReturnDetailsBySubInventory(Integer subInvId,HttpServletRequest request);
	
	public MrnMasterDTO getMRNPagination(Integer startIndex,String subInventoryName,HttpServletRequest request);
	
	public Integer getPageCountAllMRN(String subInventoryName,HttpServletRequest request);
	
	public List<GoodsIssueMrnMasterDto> getReceivedMRNPagination(Integer startIndex,Integer subInventoryId,HttpServletRequest request);
	
	public Integer  getPageCountAllReceivedMRN(Integer subInventoryId,HttpServletRequest request);
	
	public ConsumptionDto getConsumptionPagination(Integer startIndex,String subInventoryName,HttpServletRequest request);
	
	public Integer getPageCountAllConsumption(String subInventoryName,HttpServletRequest request);
	
	public StockReturnDto getPaginationStockReturn(Integer startIndex,String subInventoryName,HttpServletRequest request);
	
	public Integer getPageCountAllStockReturn(String subInventoryName,HttpServletRequest request);
	
	//auto suggestion on users table for consumption dispenser list
    public Users getAutoSuggestionListDispenser(String userName);
    
    public  List<ConsumptionDto> getAllConsumptionList(HttpServletRequest request);
  	
    public GoodsIssueMrnMasterDto viewReceivedGeneratedMRNData(Integer goodsIssueMasterId);
    
    //view generated mrn data
  	public MrnMasterDTO viewGeneratedMRNData(Integer id,HttpServletRequest request);
  	
    //added this function to get current inventory stock w.r.t item id
  	public Integer getCurrentInventoryStock(int itemMasterId,HttpServletRequest httpRequest);
  	
  	public List<GoodsIssueMrnMasterDto>  searchReceivedMRN(int mrnMasterId,String subInventoryName,
			HttpServletRequest request);

	public  List<MrnMasterDTO> searchMRN(int mrnMasterId, String subInventoryName, HttpServletRequest request);
	
	public List<ConsumptionDto> getAutoItemNameOnConsumption(
			String subInventoryName, String itemName, HttpServletRequest request);
	
	public List<ConsumptionDto> getConsumptionListByDate(
			String subInventoryName, String fromDate, String toDate,
			HttpServletRequest request);
	
	public List<ConsumptionItemSlaveDto> getConsumptionItemSlaveDtoList(
			Integer consumptionSlaveId, HttpServletRequest request);
	
	public List<ConsumptionDto> searchItemNameOnConsumption(
			String subInventoryName, String itemName, Integer itemId , HttpServletRequest request);

	public List<ConsumptionDto> getConsumptionTypeListForConsumtionReport(
			Integer subInvId, String consumptionType, HttpServletRequest request);

	List<ConsumptionItemSlaveDto> getConsumptionItemSlaveDtoList(Integer consumptionSlaveId, String itemName,
			HttpServletRequest request);
}
