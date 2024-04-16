package com.hms.inventory.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Users;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.inventory.dao.AssetMaintenanceDao;
import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.dto.DetailsAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.FinancialYearDto;
import com.hms.inventory.dto.ItemAssetMaintenanceDocUploadDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.LocationAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.MaintenanceContractMasterDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.service.AssetMaintenanceService;

@Service
@Transactional
public class AssetMaintenanceServiceImpl implements AssetMaintenanceService{
	
	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	private AssetMaintenanceDao assetMaintenanceDao;

	@Override
	public List<ItemAssetMaintenanceMasterDto> getAllItemAssetMaintenance(
			HttpServletRequest request, Integer unitId) {
		return assetMaintenanceDao.getAllItemAssetMaintenance(unitId);
	}

	@Override
	public ItemAssetMaintenanceMasterDto editItemAssetMaintenanceMaster(
			Integer id) {
		return assetMaintenanceDao.editItemAssetMaintenanceMaster(id);
	}

	@Override
	public List<MaintenanceContractMasterDto> getMaintenanceContractType(
			Integer unitId) {
		return assetMaintenanceDao.getMaintenanceContractType(unitId);
	}

	@Override
	public int saveItemAssetMaintenance(
			ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto,
			String itemAssetMaintenanceSlaveDetails,LocationAssetMaintenanceSlaveDto locationAssetMaintenanceSlaveDto, 
			DetailsAssetMaintenanceSlaveDto detailsAssetMaintenanceSlaveDto,HttpServletRequest request) {
		return assetMaintenanceDao.saveItemAssetMaintenance(assetMaintenanceMasterDto, itemAssetMaintenanceSlaveDetails,
				locationAssetMaintenanceSlaveDto,detailsAssetMaintenanceSlaveDto,request);
	}

	@Override
	public LocationAssetMaintenanceSlaveDto getLocationAssetMaintenanceDetailsByMasterId(
			Integer masterId, HttpServletRequest request) {
		return assetMaintenanceDao.getLocationAssetMaintenanceDetailsByMasterId(masterId);
	}

	@Override
	public int uploadAssetMaintenanceDocument(String document,
			HttpServletRequest request) {
		return assetMaintenanceDao.uploadAssetMaintenanceDocument(document, request);
	}

	@Override
	public ItemAssetMaintenanceDocUploadDto getUploadedDocuments(
			Integer assetMaintenanceMasterId) {
		return assetMaintenanceDao.getUploadedDocuments(assetMaintenanceMasterId);
	}

	@Override
	public List<SubServiceDto> getPathologyDepartments(
			HttpServletRequest request) {
		return assetMaintenanceDao.getPathologyDepartments(request);
	}

	@Override
	public List<ItemMasterDto> getAllReagentNames(Integer unitId,
			HttpServletRequest request) {
		return assetMaintenanceDao.getAllReagentNames(unitId, request);
	}

	@Override
	public DetailsAssetMaintenanceSlaveDto getAssetMaintenanceDetailsTabInfo(
			Integer masterId, Integer unitId,HttpServletRequest request) {
		return assetMaintenanceDao.getAssetMaintenanceDetailsTabInfo(masterId, unitId, request);
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getLabEquipmentOrAssetItems(String value,
			Integer type, Integer productCategoryId, Integer unitId,
			HttpServletRequest request) {
		return assetMaintenanceDao.getLabEquipmentOrAssetItems(value, type, productCategoryId, unitId, request);
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> universalSearchAssetMaintenance(
			String productCategoryMaintenanceSearch,
			String assetNameMaintenanceSearch,
			String fromDateMaintenanceSearch, String toDateMaintenanceSearch,
			String serialNoMaintenanceSearch,Integer locationDeptId,Integer locationHospitalDeptId, String searchBy,
			HttpServletRequest request) {
		return assetMaintenanceDao.universalSearchAssetMaintenance(productCategoryMaintenanceSearch, assetNameMaintenanceSearch, fromDateMaintenanceSearch, 
				toDateMaintenanceSearch, serialNoMaintenanceSearch,locationDeptId,locationHospitalDeptId, searchBy, request);
	}

	@Override
	public boolean deleteAssetMaintenanceDetails(Integer id,
			String assetDeletionReason, HttpServletRequest request) {
		String sql="SELECT count(*) FROM inv_item_asset_maintenance_master WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{
			
			ItemAssetMaintenanceMasterDto obj=	(ItemAssetMaintenanceMasterDto)sessionFactory.getCurrentSession().get(ItemAssetMaintenanceMasterDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeleteReason(assetDeletionReason);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted_by(userId);
		
			return assetMaintenanceDao.deleteAssetMaintenanceDetails(obj);
		}
	}

	@Override
	public Integer getPageCountAllAssetMaintenance(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.getPageCountAllAssetMaintenance(request);
	}

	@Override
	public ItemAssetMaintenanceMasterDto getAssetMaintenancePagination(
			Integer startIndex, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.getAssetMaintenancePagination(startIndex, request);
	}

	@Override
	public boolean deleteUploadedDocument(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.deleteUploadedDocument(id, request);
	}

	@Override
	public List<PartyMasterDto> getAllServiceProvider(Integer id,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.getAllServiceProvider(id, request);
	}

	@Override
	public Users getUserName(HttpServletRequest request, Integer userId) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.getUserName(request, userId);
	}

	@Override
	public ItemAssetMaintenanceMasterDto getAssetDetailsByItemIdAndSerialNo(
			Integer itemId, String serialNo) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.getAssetDetailsByItemIdAndSerialNo(itemId, serialNo);
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getAllItemAssetMaintenanceReports(
			HttpServletRequest request, Integer unitId) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.getAllItemAssetMaintenanceReports(request,unitId);
	}
	
	@Override
	public List<ItemAssetMaintenanceMasterDto> universalSearchAssetMaintenanceReports(
			String productCategoryMaintenanceSearch,
			String assetNameMaintenanceSearch,
			String fromDateMaintenanceSearch, String toDateMaintenanceSearch,
			String serialNoMaintenanceSearch,Integer locationDeptId,Integer locationHospitalDeptId, String searchBy,
			HttpServletRequest request) {
		return assetMaintenanceDao.universalSearchAssetMaintenanceReports(productCategoryMaintenanceSearch, assetNameMaintenanceSearch, fromDateMaintenanceSearch, 
				toDateMaintenanceSearch, serialNoMaintenanceSearch,locationDeptId,locationHospitalDeptId, searchBy, request);
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getAllDeletedAssetMaintenanceReports(
			HttpServletRequest request, Integer unitId) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.getAllDeletedAssetMaintenanceReports(request, unitId);
	}

	@Override
	public List<HospitalDepartmentDto> fetchHospitalDepartments(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return assetMaintenanceDao.fetchHospitalDepartments();
	}

}
