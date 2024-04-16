package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodsIssueMrnItemSlaveDto;
import com.hms.inventory.dto.InvReportDto;
import com.hms.inventory.dto.SubInventoryMasterDto;

public interface InvReportDao {

	List <InvReportDto> getAllItemStockBelowMinimunLevelReport(HttpServletRequest request);
	List<InvReportDto> getAllItemExpirayDateReport(String fromuserDate,String touserDate,HttpServletRequest request);
	List<InvReportDto> getAllItemOpeningStockReport(HttpServletRequest request);
	List<InvReportDto> getItemDetailsByCategoryWise(Integer categoryType,Integer categoryId,HttpServletRequest request);
	List<InvReportDto> getGoodReceiptNoteReports(HttpServletRequest request);
	List<InvReportDto> getMrnIssueReports(HttpServletRequest request);
	List<InvReportDto> getStockReturnReports(HttpServletRequest request);
	List<BatchStockDto> getInventoryStockReport(HttpServletRequest request);
	BatchStockDto getInventoryStockAutoSuggestion(String itemName,String callFrom,HttpServletRequest request);
	List<BatchStockDto> searchItemById(int id,HttpServletRequest request);
	SubInventoryMasterDto subInventorySearchResult(String subInventoryName,String callFrom,HttpServletRequest request);
	List<BatchStockDto> getSubInDataById(int id,HttpServletRequest request);
	List<GoodsIssueMrnItemSlaveDto> getAllSubInvStock(HttpServletRequest request);

}
