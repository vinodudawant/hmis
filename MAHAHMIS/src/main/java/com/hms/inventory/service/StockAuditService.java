
package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.SubInventoryMasterDto;

public interface StockAuditService {
	List<BatchStockDto> getStockAuditData(HttpServletRequest request);
	BatchStockDto stockAuditAutoSuggestion(String itemName,String callFrom,HttpServletRequest request);
	List<BatchStockDto> itemSearchResultById(int id,HttpServletRequest request);
	SubInventoryMasterDto subinventorySearchResult(String subInventoryName,String callFrom,HttpServletRequest request);
	SubInventoryMasterDto getSubInventoryData(HttpServletRequest request);
	/*List<BatchStockDto> getSubInDataById(int id,HttpServletRequest request);*/
	List<GoodsIssueMrnItemSlaveDto> getSubInDataById(int id,HttpServletRequest request);
	
	Integer getPageCountAllStockAudit(HttpServletRequest request);
	public List<BatchStockDto> getStockAuditPagination(Integer startIndex,HttpServletRequest request);
	
	Integer getPageCountAllStockAuditItem(int id,HttpServletRequest request);
	public List<BatchStockDto> getStockAuditItemPagination(Integer startIndex,Integer id,HttpServletRequest request);
	
}
