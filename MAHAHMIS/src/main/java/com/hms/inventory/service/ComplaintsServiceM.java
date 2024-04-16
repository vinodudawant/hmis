package com.hms.inventory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemMasterDto;

public interface ComplaintsServiceM {

	public List<ItemMasterDto> getAllAssetCategory(HttpServletRequest request);
	public List<ItemMasterDto> getCategoryWiseAssetName(Integer categoryId);
	public List<ItemAssetMaintenanceMasterDto> getAssetWiseSerialNumber(Integer assetId);
	public Integer saveAssetComplaint(AssetComplaintMasterDto assetComplaintMasterDto,HttpServletRequest request);
	public List<AssetComplaintMasterDto> getAllAssetComplaintsData(HttpServletRequest request);
	public AssetComplaintMasterDto editAssetComplaintsData(Integer id);
	public List<AssetComplaintMasterDto> getClosedComplaintsRecords(HttpServletRequest request);
	public ItemAssetMaintenanceMasterDto getProductWarrantyComplaint(String productCategoryName,Integer assetNameId,String serialNo);
	
	public Integer getPageCountAllAssetComplaints(HttpServletRequest request);

	public AssetComplaintMasterDto getAssetComplaintPagination(Integer startIndex,HttpServletRequest request);
	
	public Integer getPageCountAllAssetClosedComplaints(HttpServletRequest request);

	public AssetComplaintMasterDto getAssetClosedComplaintPagination(Integer startIndex,HttpServletRequest request);
	public List<ItemMasterDto> getAllItemInvAndSubInv(HttpServletRequest request);
	public List<BatchStockDto> getAllBatchesInvAndSubInv(Integer itemId,HttpServletRequest request);
	public List<ItemMasterDto> getItemWiseCategory(Integer itemId);
	public List<BatchMasterDto> getAllBatchNo(HttpServletRequest request);
	public List<ItemMasterDto>  checkAssetItemOrNot(Integer itemId);
	List<AssetComplaintMasterDto> getAllProcessedComplaintsDataReport(
			HttpServletRequest request);
	List<AssetComplaintMasterDto> getClosedComplaintsReports(
			HttpServletRequest request);
}
