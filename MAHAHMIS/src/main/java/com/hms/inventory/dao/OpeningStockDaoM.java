package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.OpeningStockDto;

public interface OpeningStockDaoM {

	public int saveOpeningStock(OpeningStockDto openingStockDto,String openingStockItemSlaveDetails,String batchStockSlaveDetails,
			String itemAssetMaintenanceOpeningInfoDtoDetails,String itemAssetMaintenanceInfoMasterDtoDetails,HttpServletRequest request);
	
	//opening stock get all records
	public List<OpeningStockDto> getAllOpeningStockRecords(HttpServletRequest request);
	
	//to get Opening Stock pagination
	public OpeningStockDto getOpeningStockPagination(Integer startIndex,HttpServletRequest request);
	
	//get page count opening stock
	public Integer getPageCountAllOpeningStock(HttpServletRequest request);
	
}
