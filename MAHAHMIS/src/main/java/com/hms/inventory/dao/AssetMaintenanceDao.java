package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Users;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.dto.DetailsAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemAssetMaintenanceDocUploadDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.LocationAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.MaintenanceContractMasterDto;
import com.hms.inventory.dto.PartyMasterDto;

public interface AssetMaintenanceDao {
	
//asset maintenance get all records
public List<ItemAssetMaintenanceMasterDto> getAllItemAssetMaintenance(Integer unitId);
//edit asset maintenance
public ItemAssetMaintenanceMasterDto editItemAssetMaintenanceMaster(Integer id);
//to get maintenance contract type details
public List<MaintenanceContractMasterDto> getMaintenanceContractType(Integer unitId);
//to save item asset maintenance details
public int saveItemAssetMaintenance(ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto,
		String itemAssetMaintenanceSlaveDetails,LocationAssetMaintenanceSlaveDto locationAssetMaintenanceSlaveDto,
		DetailsAssetMaintenanceSlaveDto detailsAssetMaintenanceSlaveDto,HttpServletRequest request);
//get location asset maintenance details by master id
public LocationAssetMaintenanceSlaveDto getLocationAssetMaintenanceDetailsByMasterId(Integer masterId);
//upload asset maintenance documents
int uploadAssetMaintenanceDocument(String document,HttpServletRequest request);
//to get the uploaded documents against asset maintenance master id
public ItemAssetMaintenanceDocUploadDto getUploadedDocuments(Integer assetMaintenanceMasterId);
//to get all pathology departments
public List<SubServiceDto> getPathologyDepartments(HttpServletRequest request);
//to get all reagent names from item master dto
public List<ItemMasterDto> getAllReagentNames(Integer unitId,HttpServletRequest request);
//get details tab asset maintenance details by master id
public DetailsAssetMaintenanceSlaveDto getAssetMaintenanceDetailsTabInfo(Integer masterId,Integer unitId,HttpServletRequest request);
//get list of lab equipment or asset items from item master
public List<ItemAssetMaintenanceMasterDto> getLabEquipmentOrAssetItems(String value, Integer type,Integer productCategoryId,Integer unitId,HttpServletRequest request);
//to do universal search operation on asset maintenance
public List<ItemAssetMaintenanceMasterDto> universalSearchAssetMaintenance(String productCategoryMaintenanceSearch, String assetNameMaintenanceSearch, String fromDateMaintenanceSearch, String toDateMaintenanceSearch, 
		String serialNoMaintenanceSearch,Integer locationDeptId,Integer locationHospitalDeptId,String searchBy, HttpServletRequest request);
//asset maintenance master delete records
public boolean deleteAssetMaintenanceDetails(ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto);

public Integer getPageCountAllAssetMaintenance(HttpServletRequest request);

public ItemAssetMaintenanceMasterDto getAssetMaintenancePagination(Integer startIndex,HttpServletRequest request);

//this is added by Vishnu
public boolean deleteUploadedDocument(Integer id,HttpServletRequest request);
public List<PartyMasterDto> getAllServiceProvider(Integer id,HttpServletRequest request); 
public Users getUserName(HttpServletRequest request,Integer userId);
public ItemAssetMaintenanceMasterDto getAssetDetailsByItemIdAndSerialNo(Integer itemId,String serialNo);
public List<ItemAssetMaintenanceMasterDto> getAllItemAssetMaintenanceReports(
		HttpServletRequest request, Integer unitId);
public List<ItemAssetMaintenanceMasterDto> universalSearchAssetMaintenanceReports(
		String productCategoryMaintenanceSearch,
		String assetNameMaintenanceSearch, String fromDateMaintenanceSearch,
		String toDateMaintenanceSearch, String serialNoMaintenanceSearch,
		Integer locationDeptId, Integer locationHospitalDeptId,
		String searchBy, HttpServletRequest request);

public List<ItemAssetMaintenanceMasterDto> getAllDeletedAssetMaintenanceReports(
		HttpServletRequest request, Integer unitId);
List<HospitalDepartmentDto> fetchHospitalDepartments();
}
