package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.ComplaintsDaoM;
import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.service.ComplaintsServiceM;

@Service
@Transactional
public class ComplaintsServiceImplM implements ComplaintsServiceM{

	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	private ComplaintsDaoM complaintsDaoM;
	
	
	@Override
	public List<ItemMasterDto> getAllAssetCategory(HttpServletRequest request) {
		return complaintsDaoM.getAllAssetCategory(request);
	}


	@Override
	public List<ItemMasterDto> getCategoryWiseAssetName(Integer categoryId) {
		return complaintsDaoM.getCategoryWiseAssetName(categoryId);
	}


	@Override
	public List<ItemAssetMaintenanceMasterDto> getAssetWiseSerialNumber(
			Integer assetId) {
		return complaintsDaoM.getAssetWiseSerialNumber(assetId);
	}


	@Override
	public Integer saveAssetComplaint(
			AssetComplaintMasterDto assetComplaintMasterDto,
			HttpServletRequest request) {
		return complaintsDaoM.saveAssetComplaint(assetComplaintMasterDto, request);
	}


	@Override
	public List<AssetComplaintMasterDto> getAllAssetComplaintsData(
			HttpServletRequest request) {
		return complaintsDaoM.getAllAssetComplaintsData(request);
	}


	@Override
	public AssetComplaintMasterDto editAssetComplaintsData(Integer id) {
		return complaintsDaoM.editAssetComplaintsData(id);
	}


	@Override
	public List<AssetComplaintMasterDto> getClosedComplaintsRecords(
			HttpServletRequest request) {
		return complaintsDaoM.getClosedComplaintsRecords(request);
	}


	@Override
	public ItemAssetMaintenanceMasterDto getProductWarrantyComplaint(String productCategoryName,
			Integer assetNameId, String serialNo) {
		return complaintsDaoM.getProductWarrantyComplaint(productCategoryName, assetNameId, serialNo);
	}


	@Override
	public Integer getPageCountAllAssetComplaints(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getPageCountAllAssetComplaints(request);
	}


	@Override
	public AssetComplaintMasterDto getAssetComplaintPagination(
			Integer startIndex, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getAssetComplaintPagination(startIndex, request);
	}


	@Override
	public Integer getPageCountAllAssetClosedComplaints(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getPageCountAllAssetClosedComplaints(request);
	}


	@Override
	public AssetComplaintMasterDto getAssetClosedComplaintPagination(
			Integer startIndex, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getAssetClosedComplaintPagination(startIndex, request);
	}


	@Override
	public List<ItemMasterDto> getAllItemInvAndSubInv(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getAllItemInvAndSubInv(request);
	}


	@Override
	public List<BatchStockDto> getAllBatchesInvAndSubInv(Integer itemId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getAllBatchesInvAndSubInv(itemId, request);
	}


	@Override
	public List<ItemMasterDto> getItemWiseCategory(Integer itemId) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getItemWiseCategory(itemId);
	}


	@Override
	public List<BatchMasterDto> getAllBatchNo(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return complaintsDaoM.getAllBatchNo(request);
	}


	@Override
	public List<ItemMasterDto> checkAssetItemOrNot(Integer itemId) {
		// TODO Auto-generated method stub
		return complaintsDaoM.checkAssetItemOrNot(itemId);
	}
	
	@Override
	public List<AssetComplaintMasterDto> getAllProcessedComplaintsDataReport(
			HttpServletRequest request) {
		return complaintsDaoM.getAllProcessedComplaintsDataReport(request);
	}
	
	@Override
	public List<AssetComplaintMasterDto> getClosedComplaintsReports(
			HttpServletRequest request) {
		return complaintsDaoM.getClosedComplaintsReports(request);
	}

}
