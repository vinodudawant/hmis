package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Users;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.inventory.dao.AssetMaintenanceDao;
import com.hms.inventory.dto.DetailsAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemAssetMaintenanceDocUploadDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.LocationAssetMaintenanceSlaveDto;
import com.hms.inventory.dto.MaintenanceContractMasterDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.service.HospitalLicenseService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class AssetMaintenanceDaoImpl implements AssetMaintenanceDao{
	
	static Logger log=Logger.getLogger(AssetMaintenanceDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	HospitalLicenseService hospitalLicenseService;
	
	@Override
	public List<ItemAssetMaintenanceMasterDto> getAllItemAssetMaintenance(
			Integer unitId) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			criteria.setMaxResults(10);
			criteria.addOrder(Order.desc("id"));
			lstItemAssetMaintenanceMaster =	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllItemAssetMaintenance....",e);
		}
		return lstItemAssetMaintenanceMaster;
	}

	@Override
	public ItemAssetMaintenanceMasterDto editItemAssetMaintenanceMaster(
			Integer id) {
		ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
		List<ItemAssetMaintenanceDocUploadDto> list = new ArrayList<ItemAssetMaintenanceDocUploadDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			assetMaintenanceMasterDto = (ItemAssetMaintenanceMasterDto) criteria.uniqueResult();
			
			Criteria criteria1 = sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceDocUploadDto.class);
			criteria1.add(Restrictions.eq("assetMaintenenceMasterId",id));
			criteria1.add(Restrictions.eq("deleted", "N"));
			criteria1.addOrder(Order.desc("id"));
			list = criteria1.list();
			for (ItemAssetMaintenanceDocUploadDto itemAssetMaintenanceDocUploadDto : list) {
				assetMaintenanceMasterDto.setLstItemAssetMaintenanceDocUploadDto(list);
			}
			
			List<ItemAssetMaintenanceSlaveDto> slaveDtos = new ArrayList<ItemAssetMaintenanceSlaveDto>();
			for(ItemAssetMaintenanceSlaveDto assetMaintenanceSlaveDto : assetMaintenanceMasterDto.getItemAssetMaintenanceSlaveDtos()){
				if(assetMaintenanceSlaveDto.getDeleted().equalsIgnoreCase("N")){
					slaveDtos.add(assetMaintenanceSlaveDto);
				}
			}
			assetMaintenanceMasterDto.setItemAssetMaintenanceSlaveDtos(slaveDtos);
			
			return assetMaintenanceMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return assetMaintenanceMasterDto;
	}

	@Override
	public List<MaintenanceContractMasterDto> getMaintenanceContractType(Integer unitId) {
		List<MaintenanceContractMasterDto> listMaintenanceContractMaster = new ArrayList<MaintenanceContractMasterDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(MaintenanceContractMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			listMaintenanceContractMaster = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listMaintenanceContractMaster;
	}

	@Override
	public int saveItemAssetMaintenance(
			ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto,
			String itemAssetMaintenanceSlaveDetails,LocationAssetMaintenanceSlaveDto locationAssetMaintenanceSlaveDto,
			DetailsAssetMaintenanceSlaveDto detailsAssetMaintenanceSlaveDto,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			if(itemAssetMaintenanceMasterDto.getId() == 0){
				Integer id = (Integer) sessionFactory.getCurrentSession().save(itemAssetMaintenanceMasterDto);
				ItemAssetMaintenanceMasterDto maintenanceMasterDto = (ItemAssetMaintenanceMasterDto) sessionFactory.getCurrentSession().get(ItemAssetMaintenanceMasterDto.class, id);
				locationAssetMaintenanceSlaveDto.setObj(maintenanceMasterDto);
				detailsAssetMaintenanceSlaveDto.setObj(maintenanceMasterDto);
				ItemAssetMaintenanceSlaveDto itemAssetMaintenanceSlaveDto = (ItemAssetMaintenanceSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemAssetMaintenanceSlaveDetails, ItemAssetMaintenanceSlaveDto.class);
				List<ItemAssetMaintenanceSlaveDto> maintenanceSlaveDtos = itemAssetMaintenanceSlaveDto.getLstItemAssetMaintenanceSlaveDto();
				itemAssetMaintenanceMasterDto.setCreatedBy(userId);
				itemAssetMaintenanceMasterDto.setUserName(hospitalLicenseService.getUserName(itemAssetMaintenanceMasterDto.getUserId(),request));
				itemAssetMaintenanceMasterDto.setItemAssetMaintenanceSlaveDtos(maintenanceSlaveDtos);
				
				sessionFactory.getCurrentSession().merge(locationAssetMaintenanceSlaveDto);
				sessionFactory.getCurrentSession().merge(detailsAssetMaintenanceSlaveDto);
				sessionFactory.getCurrentSession().merge(itemAssetMaintenanceMasterDto);
				return 1;
			}
			else{
				ItemAssetMaintenanceMasterDto maintenanceMasterDto = (ItemAssetMaintenanceMasterDto) sessionFactory.openSession().get(ItemAssetMaintenanceMasterDto.class, itemAssetMaintenanceMasterDto.getId());
				
				
				if(locationAssetMaintenanceSlaveDto.getLocationId() == 0){
					locationAssetMaintenanceSlaveDto.setObj(itemAssetMaintenanceMasterDto);
					sessionFactory.getCurrentSession().merge(locationAssetMaintenanceSlaveDto);
				}
				//update location slave
				else if(locationAssetMaintenanceSlaveDto.getLocationId() != 0){
					locationAssetMaintenanceSlaveDto.setObj(itemAssetMaintenanceMasterDto);
					sessionFactory.getCurrentSession().update(locationAssetMaintenanceSlaveDto);
				}
				if(detailsAssetMaintenanceSlaveDto.getDetailsId() == 0){
					detailsAssetMaintenanceSlaveDto.setObj(itemAssetMaintenanceMasterDto);
					sessionFactory.getCurrentSession().merge(detailsAssetMaintenanceSlaveDto);
					
				}
				//update details slave
				else if(detailsAssetMaintenanceSlaveDto.getDetailsId() != 0){
					detailsAssetMaintenanceSlaveDto.setObj(itemAssetMaintenanceMasterDto);
					sessionFactory.getCurrentSession().update(detailsAssetMaintenanceSlaveDto);	
				}
				System.out.println("itemAssetMaintenanceSlaveDetails"+itemAssetMaintenanceSlaveDetails);
				ItemAssetMaintenanceSlaveDto itemAssetMaintenanceSlaveDto = (ItemAssetMaintenanceSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemAssetMaintenanceSlaveDetails, ItemAssetMaintenanceSlaveDto.class);
				itemAssetMaintenanceSlaveDto.setUnitId(unitId);
				itemAssetMaintenanceSlaveDto.setUserId(userId);
				List<ItemAssetMaintenanceSlaveDto> maintenanceSlaveDtos = itemAssetMaintenanceSlaveDto.getLstItemAssetMaintenanceSlaveDto();
				itemAssetMaintenanceMasterDto.setUpdatedBy(userId);
				itemAssetMaintenanceMasterDto.setUserName(hospitalLicenseService.getUserName(itemAssetMaintenanceMasterDto.getUserId(),request));
				itemAssetMaintenanceMasterDto.setItemAssetMaintenanceSlaveDtos(maintenanceSlaveDtos);
				
				//sessionFactory.getCurrentSession().merge(detailsAssetMaintenanceSlaveDto);
				sessionFactory.getCurrentSession().merge(itemAssetMaintenanceMasterDto);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public LocationAssetMaintenanceSlaveDto getLocationAssetMaintenanceDetailsByMasterId(
			Integer masterId) {
		LocationAssetMaintenanceSlaveDto obj = new LocationAssetMaintenanceSlaveDto();
		try {
			String sql = "select la.id as id,la.incharge_name as incharge_name,la.incharge_contact_no as incharge_contact_no,la.remark as remark,la.location_dept_id,la.location_dept_name,la.location_hospital_dept_id,la.location_hospital_dept_name from inv_location_asset_maintenance_slave as la where la.asset_maintenance_master_id = '"+masterId+"' and la.deleted='N'";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				//obj.setLocationName((String)row.get("location_name"));
				obj.setLocationDeptId((Integer)row.get("location_dept_id"));
				obj.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
				obj.setLocationDeptName((String)row.get("location_dept_name"));
				obj.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
				obj.setInchargeName((String)row.get("incharge_name"));
				obj.setInchargeContactNo((String)row.get("incharge_contact_no"));
				obj.setRemark((String)row.get("remark"));
				obj.setLocationId((Integer)row.get("id"));
			}
		} catch (Exception e) {
				e.printStackTrace();
				log.error("error for  getLocationAssetMaintenanceDetailsByMasterId....",e);
		}
		return obj;
	}

	@Override
	public int uploadAssetMaintenanceDocument(String document,
			HttpServletRequest request) {
		int res;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			ItemAssetMaintenanceDocUploadDto itemAssetMaintenanceDocUploadDto  = (ItemAssetMaintenanceDocUploadDto) ConfigUIJSONUtility.getObjectFromJSON(document, ItemAssetMaintenanceDocUploadDto.class);
			ItemAssetMaintenanceDocUploadDto itemAssetMaintenanceDocUploadDto2 = itemAssetMaintenanceDocUploadDto.getLstItemAssetMaintenanceDocUpload().get(0);

			if (itemAssetMaintenanceDocUploadDto2.getId() == 0) {
				itemAssetMaintenanceDocUploadDto2.setCreatedBy(userId);
				itemAssetMaintenanceDocUploadDto2.setDeleted("N");
				sessionFactory.getCurrentSession().merge(itemAssetMaintenanceDocUploadDto2);
				res = 1;
			} else {
				itemAssetMaintenanceDocUploadDto2.setUpdatedBy(userId);
				itemAssetMaintenanceDocUploadDto2.setDeleted("N");
				sessionFactory.getCurrentSession().merge(itemAssetMaintenanceDocUploadDto2);
				res = 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return res;
	}

	@Override
	public ItemAssetMaintenanceDocUploadDto getUploadedDocuments(
			Integer assetMaintenanceMasterId) {
		List<ItemAssetMaintenanceDocUploadDto> list = new ArrayList<ItemAssetMaintenanceDocUploadDto>();
		ItemAssetMaintenanceDocUploadDto itemAssetMaintenanceDocUploadDto = new ItemAssetMaintenanceDocUploadDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceDocUploadDto.class);
			criteria.add(Restrictions.eq("assetMaintenenceMasterId",assetMaintenanceMasterId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			list = criteria.list();
			if(list.size() >0){
				itemAssetMaintenanceDocUploadDto.setLstItemAssetMaintenanceDocUpload(list);	
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return itemAssetMaintenanceDocUploadDto;
	}

	@Override
	public List<SubServiceDto> getPathologyDepartments(
			HttpServletRequest request) {
		String sql = "";
		 List<SubServiceDto> lstSubServiceDto = new ArrayList<SubServiceDto>();
		 try{
				sql = "select ss.id as id,ss.category_name as category_name from ehat_subservice as ss where ss.service_id=11 and ss.isCategory='Y' and ss.deleted != 'Y' ";
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					SubServiceDto obj = new SubServiceDto();
					obj.setSubId((Integer) row.get("id"));
					obj.setCategoryName((String) row.get("category_name"));
					lstSubServiceDto.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
		return lstSubServiceDto;
	}

	@Override
	public List<ItemMasterDto> getAllReagentNames(Integer unitId,HttpServletRequest request) {
		String sql = "";
		 List<ItemMasterDto> lstItemMasterDto = new ArrayList<ItemMasterDto>();
		 try{
				sql = "select im.id as id,im.item_name as item_name from inv_item_master_new as im where im.deleted !='Y' and im.reagent_item_status=1 and im.unit_id="+unitId+" ";
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ItemMasterDto obj = new ItemMasterDto();
					obj.setId((Integer) row.get("id"));
					obj.setItemName((String) row.get("item_name"));
					lstItemMasterDto.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
		return lstItemMasterDto;
	}

	@Override
	public DetailsAssetMaintenanceSlaveDto getAssetMaintenanceDetailsTabInfo(
			Integer masterId,Integer unitId, HttpServletRequest request) {
		DetailsAssetMaintenanceSlaveDto obj = new DetailsAssetMaintenanceSlaveDto();
		try {
			//da.asset_maintenance_master_id as asset_maintenance_master_id
			String sql = "select da.id as id,da.asset_location_name as asset_location_name,da.department_id as department_id,da.department_name as department_name,da.machine_owner as machine_owner,da.machine_ownership_type as machine_ownership_type,da.reagent_name as reagent_name,da.reagent_name_id as reagent_name_id,da.test_count as test_count,da.used_for as used_for from inv_details_asset_maintenance_slave as da where da.asset_maintenance_master_id="+masterId+" and da.deleted !='Y' and da.unit_id="+unitId+" ";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				obj.setAssetLocationName((String)row.get("asset_location_name"));
				obj.setDepartmentName((String)row.get("department_name"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setMachineOwner((String)row.get("machine_owner"));
				obj.setMachineOwnershipType((String)row.get("machine_ownership_type"));
				obj.setReagentName((String)row.get("reagent_name"));
				obj.setReagentNameId((String)row.get("reagent_name_id"));
				obj.setUsedFor((String)row.get("used_for"));
				obj.setTestCount((Integer)row.get("test_count"));
				obj.setDetailsId((Integer)row.get("id"));
				//obj.setAsset_maintenance_master_id((Integer)row.get("asset_maintenance_master_id"));
			}
		} catch (Exception e) {
				e.printStackTrace();
				log.error("error for  getAssetMaintenanceDetailsTabInfo....",e);
		}
		return obj;
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getLabEquipmentOrAssetItems(String value,
			Integer type, Integer productCategoryId, Integer unitId,
			HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto> masterDtos = new ArrayList<ItemAssetMaintenanceMasterDto>();
		String sql = "";
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			if(value.equalsIgnoreCase("LABEQUIPMENT")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.asset_type='"+value+"' group by im.id order by im.id desc ";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
					
				}
				return masterDtos;
			}else if(value.equalsIgnoreCase("OTHER")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time, im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.asset_type='"+value+"' group by im.id order by im.id desc ";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return masterDtos;
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> universalSearchAssetMaintenance(
			String productCategoryMaintenanceSearch,
			String assetNameMaintenanceSearch,
			String fromDateMaintenanceSearch, String toDateMaintenanceSearch,
			String serialNoMaintenanceSearch,Integer locationDeptId,Integer locationHospitalDeptId, String searchBy,
			HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto> masterDtos = new ArrayList<ItemAssetMaintenanceMasterDto>();
		Session session = null;
		String sql="";
		try {
			session = sessionFactory.getCurrentSession();
			if(searchBy.equalsIgnoreCase("byProductCategory")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' group by im.id order by im.id desc ";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryDate")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) >= '"+fromDateMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) <= '"+toDateMaintenanceSearch+"' group by im.id order by im.id desc ";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetName")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date as purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetNameSerialNoDepartment")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" and im.serial_no='"+serialNoMaintenanceSearch+"' and im.location_dept_id="+locationDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetNameSerialNoHospitalDepartment")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" and im.serial_no='"+serialNoMaintenanceSearch+"' and im.location_hospital_dept_id="+locationHospitalDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byDate")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where SUBSTR(im.created_date_time, 1, 10) >= '"+fromDateMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) <= '"+toDateMaintenanceSearch+"' group by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byAll")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" and im.serial_no='"+serialNoMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) >= '"+fromDateMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) <= '"+toDateMaintenanceSearch+"' and im.location_dept_id="+locationDeptId+" and im.location_hospital_dept_id="+locationHospitalDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byDepartment")){
				sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.location_dept_id="+locationDeptId+" and im.location_hospital_dept_id="+locationHospitalDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list= query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else{
				
				
				if((productCategoryMaintenanceSearch !="" && productCategoryMaintenanceSearch !="") && (assetNameMaintenanceSearch !=null && assetNameMaintenanceSearch !="") && (serialNoMaintenanceSearch!=null && serialNoMaintenanceSearch !="")){
					sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" and im.serial_no='"+serialNoMaintenanceSearch+"'  group by im.id order by im.id desc";
					SQLQuery query = session.createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list){
						ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
						itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
						itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
						itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
						itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
						itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
						itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
						itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
						itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
						itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
						itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
						itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
						itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
						itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
						itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
						itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
						masterDtos.add(itemAssetMaintenanceMasterDto);
					}
					return masterDtos;
				}else{
					sql = "select im.id as id,im.asset_item_id,im.record_type as record_type,im.asset_type as asset_type,im.asset_item_name as asset_item_name,im.product_category as product_category,im.created_date_time,im.purchase_date,im.updated_date_time as updated_date_time,im.serial_no as serial_no,im.org_far_no,im.location_dept_id,im.location_dept_name,im.location_hospital_dept_id,im.location_hospital_dept_name from inv_item_asset_maintenance_master as im group by im.id order by im.id desc";
					SQLQuery query = session.createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list= query.list();
					for(Map<String, Object> row : list){
						ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
						itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
						itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
						itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
						itemAssetMaintenanceMasterDto.setPurchaseDate((String)row.get("purchase_date"));
						itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
						itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
						itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
						itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
						itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
						itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
						itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
						itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
						itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
						itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
						itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
						masterDtos.add(itemAssetMaintenanceMasterDto);
					}
					return masterDtos;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return masterDtos;
	}

	@Override
	public boolean deleteAssetMaintenanceDetails(ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto) {
		try{
			sessionFactory.getCurrentSession().merge(assetMaintenanceMasterDto);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override 
	public Integer getPageCountAllAssetMaintenance(HttpServletRequest request) {
		// TODO Auto-generated method stub
		Integer countNew = 0;
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql = "";
			sql = "SELECT count(*) FROM inv_item_asset_maintenance_master as am WHERE am.deleted != 'Y' and am.unit_id="
					+ unitId;
			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			countNew = ((Number) countQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public ItemAssetMaintenanceMasterDto getAssetMaintenancePagination(
			Integer startIndex, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		
		List<ItemAssetMaintenanceMasterDto> itemAssetMaintenanceMasterDtoList = new ArrayList<ItemAssetMaintenanceMasterDto>();
		ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			criteria.addOrder(Order.desc("id"));
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			itemAssetMaintenanceMasterDtoList =	criteria.list();
			itemAssetMaintenanceMasterDto.setLstItemAssetMaintenanceMasterDto(itemAssetMaintenanceMasterDtoList);
			return itemAssetMaintenanceMasterDto;
	}

	@Override
	public boolean deleteUploadedDocument(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			ItemAssetMaintenanceDocUploadDto itemAssetMaintenanceDocUploadDto = (ItemAssetMaintenanceDocUploadDto) sessionFactory.getCurrentSession().get(ItemAssetMaintenanceDocUploadDto.class, id);
			itemAssetMaintenanceDocUploadDto.setDeleted("Y");
			itemAssetMaintenanceDocUploadDto.setDeleted_by(userId);
			itemAssetMaintenanceDocUploadDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			 sessionFactory.getCurrentSession().update(itemAssetMaintenanceDocUploadDto);
			 return true;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<PartyMasterDto> getAllServiceProvider(Integer unitId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<PartyMasterDto> partyMasterDtoList = new ArrayList<PartyMasterDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartyMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			criteria.addOrder(Order.desc("id"));
			
			partyMasterDtoList = criteria.list();
			log.debug("this is for getAllServiceProvider "+partyMasterDtoList);
			return partyMasterDtoList;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  getAllServiceProvider....",e);
			return null;
		}
	}

	@Override
	public Users getUserName(HttpServletRequest request, Integer userId) {
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(Users.class);
			criteria.add(Restrictions.eq("user_ID", userId));
			Users  userDto = (Users) criteria
					.uniqueResult();
			log.debug("this is for getUserName "+userDto);
			return userDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  getUserName....",e);
			return null;
		}
	}
	
	@Override
	public ItemAssetMaintenanceMasterDto getAssetDetailsByItemIdAndSerialNo(Integer itemId,String serialNo) {
		ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
			criteria.add(Restrictions.eq("assetItemId",itemId));
			criteria.add(Restrictions.like("serialNo","%"+serialNo));
			assetMaintenanceMasterDto = (ItemAssetMaintenanceMasterDto) criteria.uniqueResult();
			List<ItemAssetMaintenanceSlaveDto> slaveDtos = new ArrayList<ItemAssetMaintenanceSlaveDto>();
			return assetMaintenanceMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return assetMaintenanceMasterDto;
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getAllItemAssetMaintenanceReports(
			HttpServletRequest request, Integer unitId) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			criteria.addOrder(Order.desc("id"));
			lstItemAssetMaintenanceMaster =	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllItemAssetMaintenance....",e);
		}
		return lstItemAssetMaintenanceMaster;
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> universalSearchAssetMaintenanceReports(
			String productCategoryMaintenanceSearch,
			String assetNameMaintenanceSearch,
			String fromDateMaintenanceSearch, String toDateMaintenanceSearch,
			String serialNoMaintenanceSearch, Integer locationDeptId,
			Integer locationHospitalDeptId, String searchBy,
			HttpServletRequest request) {
		List<ItemAssetMaintenanceMasterDto> masterDtos = new ArrayList<ItemAssetMaintenanceMasterDto>();
		Session session = null;
		String sql="";
		try {
			session = sessionFactory.getCurrentSession();
			if(searchBy.equalsIgnoreCase("byProductCategory")){
				sql = "select * from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' group by im.id order by im.id desc ";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryDate")){
				sql = "select * from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) >= '"+fromDateMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) <= '"+toDateMaintenanceSearch+"' group by im.id order by im.id desc ";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetName")){
				sql = "select * from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetNameSerialNoDepartment")){
				sql = "select * from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" and im.serial_no='"+serialNoMaintenanceSearch+"' and im.location_dept_id="+locationDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byProductCategoryAssetNameSerialNoHospitalDepartment")){
				sql = "select * from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" and im.serial_no='"+serialNoMaintenanceSearch+"' and im.location_hospital_dept_id="+locationHospitalDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byDate")){
				sql = "select * from inv_item_asset_maintenance_master as im where SUBSTR(im.created_date_time, 1, 10) >= '"+fromDateMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) <= '"+toDateMaintenanceSearch+"' group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byAll")){
				sql = "select * from inv_item_asset_maintenance_master as im where im.product_category='"+productCategoryMaintenanceSearch+"' and im.asset_item_id="+assetNameMaintenanceSearch+" and im.serial_no='"+serialNoMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) >= '"+fromDateMaintenanceSearch+"' and SUBSTR(im.created_date_time, 1, 10) <= '"+toDateMaintenanceSearch+"' and im.location_dept_id="+locationDeptId+" and im.location_hospital_dept_id="+locationHospitalDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else if(searchBy.equalsIgnoreCase("byDepartment")){
				sql = "select * from inv_item_asset_maintenance_master as im where im.location_dept_id="+locationDeptId+" and im.location_hospital_dept_id="+locationHospitalDeptId+" group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list= query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}else{
				
				sql = "select * from inv_item_asset_maintenance_master as im group by im.id order by im.id desc";
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list= query.list();
				for(Map<String, Object> row : list){
					ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto = new ItemAssetMaintenanceMasterDto();
					itemAssetMaintenanceMasterDto.setId((Integer)row.get("id"));
					itemAssetMaintenanceMasterDto.setAssetItemId((Integer)row.get("asset_item_id"));
					itemAssetMaintenanceMasterDto.setCreatedDateTime((Date)row.get("created_date_time"));
					itemAssetMaintenanceMasterDto.setAssetItemName((String)row.get("asset_item_name"));
					itemAssetMaintenanceMasterDto.setProductCategory((String)row.get("product_category"));
					itemAssetMaintenanceMasterDto.setSerialNo((String)row.get("serial_no"));
					itemAssetMaintenanceMasterDto.setRecordType((Integer)row.get("record_type"));
					itemAssetMaintenanceMasterDto.setAssetType((String)row.get("asset_type"));
					itemAssetMaintenanceMasterDto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					itemAssetMaintenanceMasterDto.setLocationDeptId((Integer)row.get("location_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptId((Integer)row.get("location_hospital_dept_id"));
					itemAssetMaintenanceMasterDto.setLocationDeptName((String)row.get("location_dept_name"));
					itemAssetMaintenanceMasterDto.setLocationHospitalDeptName((String)row.get("location_hospital_dept_name"));
					itemAssetMaintenanceMasterDto.setPartyName((String)row.get("party_name"));
					itemAssetMaintenanceMasterDto.setInstallationDate((String)row.get("installation_date"));
					itemAssetMaintenanceMasterDto.setWarrantyFromDate((String)row.get("warranty_from_date"));
					itemAssetMaintenanceMasterDto.setWarrantyToDate((String)row.get("warranty_to_date"));
					itemAssetMaintenanceMasterDto.setUserName((String)row.get("user_name"));
					itemAssetMaintenanceMasterDto.setOrgFarNo((String)row.get("org_far_no"));
					itemAssetMaintenanceMasterDto.setUnitPrice((Double)row.get("unit_price"));
					itemAssetMaintenanceMasterDto.setPurchaseRef((String)row.get("purchase_ref"));
					itemAssetMaintenanceMasterDto.setManufactureName((String)row.get("manufacture_name"));
					itemAssetMaintenanceMasterDto.setWarrantyStatus((String)row.get("warranty_status"));
					masterDtos.add(itemAssetMaintenanceMasterDto);
				}
				return masterDtos;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return masterDtos;
	}

	@Override
	public List<ItemAssetMaintenanceMasterDto> getAllDeletedAssetMaintenanceReports(
			HttpServletRequest request, Integer unitId) {
		List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMaster = new ArrayList<ItemAssetMaintenanceMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemAssetMaintenanceMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			criteria.addOrder(Order.desc("id"));
			lstItemAssetMaintenanceMaster =	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllItemAssetMaintenance....",e);
		}
		return lstItemAssetMaintenanceMaster;
	}
	
	@Override
	public List<HospitalDepartmentDto> fetchHospitalDepartments() {

		List<HospitalDepartmentDto> listHospitalDepartments = new ArrayList<HospitalDepartmentDto>();
		
		try{
			Criteria criteria=sessionFactory.openSession().createCriteria(HospitalDepartmentDto.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("departmentName"));
			listHospitalDepartments =	criteria.list();
			return listHospitalDepartments;
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  fetchHospitalDepartments....",e);
			return null;
		}
	}
}
