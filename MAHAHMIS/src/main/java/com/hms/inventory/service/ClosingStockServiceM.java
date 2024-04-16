package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.ClosingStockDto;

public interface ClosingStockServiceM {

	//to get the total count items from batch stock pojo
	public int itemQuantityFromBatchStock(String itemName,HttpServletRequest request);
	//save closing stock
	public int saveClosingStock(ClosingStockDto closingStockDto,String itemInfoDtoDetails, HttpServletRequest request);
	// to get all closing stock records details
    public List<ClosingStockDto> getAllClosingStockRecordsDetails(HttpServletRequest request,Integer unitId);
    //get page count closing stock
  	public Integer getPageCountAllClosingStock(HttpServletRequest request);
    //to get Opening Stock pagination
  	public ClosingStockDto getClosingStockPagination(Integer startIndex,HttpServletRequest request);
}
