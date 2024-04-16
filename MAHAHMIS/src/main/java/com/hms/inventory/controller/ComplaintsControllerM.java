package com.hms.inventory.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.service.ComplaintsServiceM;

@Controller
@RequestMapping(value="/complaintsM")
public class ComplaintsControllerM {
	
	@Autowired
	private ComplaintsServiceM complaintsServiceM;
	@Autowired
	private ItemMasterDto itemMasterDto;
	@Autowired
	private BatchStockDto batchStockDto;
	@Autowired
	private BatchMasterDto batchMasterDto;
	@Autowired
	private ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto;
	@Autowired
	private AssetComplaintMasterDto assetComplaintMasterDto;
	
	@RequestMapping(value = "/getAllAssetCategory", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto getAllAssetCategory(HttpServletRequest request) {
		List<ItemMasterDto> lstAssetCategory = new ArrayList<ItemMasterDto>();
		lstAssetCategory = complaintsServiceM.getAllAssetCategory(request);
		itemMasterDto.setLstItemMaster(lstAssetCategory);
		return itemMasterDto;
	}

	@RequestMapping(value = "/getCategoryWiseAssetName", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto getCategoryWiseAssetName(@RequestParam("categoryId") Integer categoryId,HttpServletRequest request) {
		List<ItemMasterDto> lstAssetName = new ArrayList<ItemMasterDto>();
		lstAssetName = complaintsServiceM.getCategoryWiseAssetName(categoryId);
		itemMasterDto.setLstItemMaster(lstAssetName);
		return itemMasterDto;
	}
	
	@RequestMapping(value = "/getAssetWiseSerialNumber", method = RequestMethod.GET)
	public @ResponseBody
	ItemAssetMaintenanceMasterDto getAssetWiseSerialNumber(@RequestParam("assetId") Integer assetId,HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto> lstSerialNumbers = new ArrayList<ItemAssetMaintenanceMasterDto>();
		lstSerialNumbers = complaintsServiceM.getAssetWiseSerialNumber(assetId);
		itemAssetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(lstSerialNumbers);
		return itemAssetMaintenanceMasterDto;
	}
	
	@RequestMapping(value="/saveAssetComplaint",method = RequestMethod.POST)
	@ResponseBody	
	public int  saveAssetComplaint(AssetComplaintMasterDto assetComplaintMasterDto,HttpServletRequest request){
	    int response= complaintsServiceM.saveAssetComplaint(assetComplaintMasterDto,request);
		return response;
   }
	
	@RequestMapping(value = "/getAllAssetComplaintsData", method = RequestMethod.POST)
	public @ResponseBody
	AssetComplaintMasterDto getAllAssetComplaintsData(HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData = new ArrayList<AssetComplaintMasterDto>();
		
		
		Integer count = complaintsServiceM.getPageCountAllAssetComplaints(request);
		lstGetAllAssetComplaintsData = complaintsServiceM.getAllAssetComplaintsData(request);
		assetComplaintMasterDto.setLstAssetComplaintMasterDto(lstGetAllAssetComplaintsData);
		assetComplaintMasterDto.setNoOfPages(count);
		return assetComplaintMasterDto;
	}
	
	@RequestMapping(value = "/editAssetComplaintsData", method = RequestMethod.GET)
	public @ResponseBody
	AssetComplaintMasterDto editAssetComplaintsData(@RequestParam("id") Integer id) {
		assetComplaintMasterDto = complaintsServiceM.editAssetComplaintsData(id);	
		return assetComplaintMasterDto;
	}
	
	@RequestMapping(value = "/getClosedComplaintsRecords", method = RequestMethod.POST)
	public @ResponseBody
	AssetComplaintMasterDto getClosedComplaintsRecords(HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData = new ArrayList<AssetComplaintMasterDto>();
		Integer count = complaintsServiceM.getPageCountAllAssetClosedComplaints(request);
		lstGetAllAssetComplaintsData = complaintsServiceM.getClosedComplaintsRecords(request);
		assetComplaintMasterDto.setLstAssetComplaintMasterDto(lstGetAllAssetComplaintsData);
		assetComplaintMasterDto.setNoOfPages(count);
		return assetComplaintMasterDto;
	}
	
	@RequestMapping(value = "/getProductWarrantyComplaint", method = RequestMethod.GET)
	public @ResponseBody
	ItemAssetMaintenanceMasterDto getProductWarrantyComplaint(@RequestParam("productCategoryName") String productCategoryName,@RequestParam("assetNameId") Integer assetNameId,
			@RequestParam("serialNo") String serialNo) {
		itemAssetMaintenanceMasterDto = complaintsServiceM.getProductWarrantyComplaint(productCategoryName,assetNameId,serialNo);	
		return itemAssetMaintenanceMasterDto;
	}
	
	@RequestMapping(value = "/getAssetComplaintPagination", method = RequestMethod.POST)
	public @ResponseBody AssetComplaintMasterDto getAssetComplaintPagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		return complaintsServiceM.getAssetComplaintPagination(startIndex,request);
	}
	
	@RequestMapping(value = "/getAssetClosedComplaintPagination", method = RequestMethod.POST)
	public @ResponseBody AssetComplaintMasterDto getAssetClosedComplaintPagination(@RequestParam("startIndex") Integer startIndex,HttpServletRequest request) {
		return complaintsServiceM.getAssetClosedComplaintPagination(startIndex,request);
	}
	
	@RequestMapping(value = "/getAllItemInvAndSubInv", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto getAllItemInvAndSubInv(HttpServletRequest request) {
		List<ItemMasterDto> lstAssetName = new ArrayList<ItemMasterDto>();
		lstAssetName = complaintsServiceM.getAllItemInvAndSubInv(request);
		itemMasterDto.setLstItemMaster(lstAssetName);
		return itemMasterDto;
	}
	
	@RequestMapping(value = "/getAllBatchNOInvAndSubInv", method = RequestMethod.GET)
	public @ResponseBody
	BatchStockDto getAllBatchesInvAndSubInv(@RequestParam("itemId") Integer itemId,HttpServletRequest request) {
		List<BatchStockDto> lstAssetName = new ArrayList<BatchStockDto>();
		lstAssetName = complaintsServiceM.getAllBatchesInvAndSubInv(itemId,request);
		batchStockDto.setLstBatchStockDto(lstAssetName);
		return batchStockDto;
	}
	@RequestMapping(value = "/getItemWiseCategory", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto getItemWiseCategory(@RequestParam("itemId") Integer itemId,HttpServletRequest request) {
		List<ItemMasterDto> lstAssetName = new ArrayList<ItemMasterDto>();
		lstAssetName = complaintsServiceM.getItemWiseCategory(itemId);
		itemMasterDto.setLstItemMaster(lstAssetName);
		return itemMasterDto;
	}
	
	@RequestMapping(value = "/getAllBatchNo", method = RequestMethod.GET)
	public @ResponseBody
	BatchMasterDto getAllBatchNo(HttpServletRequest request) {
		List<BatchMasterDto> lstBatchMasterDto = new ArrayList<BatchMasterDto>();
		lstBatchMasterDto = complaintsServiceM.getAllBatchNo(request);
		batchMasterDto.setLstBatchMasterDto(lstBatchMasterDto);
		return batchMasterDto;
	}
	
	@RequestMapping(value = "/checkAssetItemOrNot", method = RequestMethod.GET)
	public @ResponseBody
	ItemMasterDto checkAssetItemOrNot(@RequestParam("itemId") Integer itemId,HttpServletRequest request) {
		List<ItemMasterDto> lstAssetName = new ArrayList<ItemMasterDto>();
		lstAssetName = complaintsServiceM.checkAssetItemOrNot(itemId);
		itemMasterDto.setLstItemMaster(lstAssetName);
		return itemMasterDto;
	}
	
	@RequestMapping(value = "/getAllProcessedComplaintsDataReport", method = RequestMethod.POST)
	public @ResponseBody
	AssetComplaintMasterDto getAllProcessedComplaintsDataReport(HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData = new ArrayList<AssetComplaintMasterDto>();
		lstGetAllAssetComplaintsData = complaintsServiceM.getAllProcessedComplaintsDataReport(request);
		assetComplaintMasterDto.setLstAssetComplaintMasterDto(lstGetAllAssetComplaintsData);
		return assetComplaintMasterDto;
	}
	
	@RequestMapping(value = "/getClosedComplaintsReports", method = RequestMethod.POST)
	public @ResponseBody
	AssetComplaintMasterDto getClosedComplaintsReports(HttpServletRequest request) {
		List<AssetComplaintMasterDto> lstGetAllAssetComplaintsData = new ArrayList<AssetComplaintMasterDto>();
		lstGetAllAssetComplaintsData = complaintsServiceM.getClosedComplaintsReports(request);
		assetComplaintMasterDto.setLstAssetComplaintMasterDto(lstGetAllAssetComplaintsData);
		return assetComplaintMasterDto;
	}
	
}
