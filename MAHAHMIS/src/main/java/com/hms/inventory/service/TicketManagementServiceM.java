package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.AssetComplaintMasterDto;

public interface TicketManagementServiceM {

	public AssetComplaintMasterDto editAssetTicketManagement(Integer id);
	public Integer saveAssetTicketManagement(String assetTicketManagementSlaveDetails,AssetComplaintMasterDto assetComplaintMasterDto,HttpServletRequest request);
	public List<AssetComplaintMasterDto> universalSearchAssetTicketManagement(String productCategoryTicket, String assetNameTicket, String fromDateTicket, String toDateTicket, Integer department, Integer hospitalDept, String searchBy,String callFrom, HttpServletRequest request);
	public List<AssetComplaintMasterDto> getAllBreakdownRecords(HttpServletRequest request);
	
}
