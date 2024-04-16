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
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.OpeningStockDaoM;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.ItemAssetMaintenanceOpeningSlaveDto;
import com.hms.inventory.dto.OpeningStockDto;
import com.hms.inventory.dto.OpeningStockItemSlaveDto;
import com.hms.inventory.service.GoodReceiptNoteService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class OpeningStockDaoImplM implements OpeningStockDaoM{

	static Logger log=Logger.getLogger(OpeningStockDaoImplM.class.getName());

	@Autowired
	SessionFactory sessionFactory;
	 
	@Autowired
	GoodReceiptNoteService  gs;
	
	@Override
	public int saveOpeningStock(OpeningStockDto openingStockDto,
			String openingStockItemSlaveDetails,String batchStockSlaveDetails,String itemAssetMaintenanceOpeningInfoDtoDetails,String itemAssetMaintenanceInfoMasterDtoDetails,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer userId = (Integer) session.getAttribute("userId1");
			openingStockDto.setUnitId(unitId);
			if(openingStockDto.getId() == 0)
			{
				OpeningStockItemSlaveDto openingStockItemSlaveDto = (OpeningStockItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(openingStockItemSlaveDetails, OpeningStockItemSlaveDto.class);
				List<OpeningStockItemSlaveDto> openingStockItemSlaveDtos = openingStockItemSlaveDto.getLstOpeningStockItemSlaveDto();
				
				BatchStockDto batchStockDto= (BatchStockDto) ConfigUIJSONUtility
						.getObjectFromJSON(batchStockSlaveDetails, BatchStockDto.class);
				List<BatchStockDto> batchStockDtos = batchStockDto.getLstBatchStockDto();
				batchStockDto.setLstBatchStockDto(batchStockDtos);
				
				openingStockDto.setLstOpeningStockItemSlaveDto(openingStockItemSlaveDtos);
				
				List<OpeningStockItemSlaveDto> listopeningStockItemDtoNew = new ArrayList<OpeningStockItemSlaveDto>();
				
				/*for(OpeningStockItemSlaveDto dto : openingStockItemSlaveDtos) {
					BatchMasterDto batchDto = new BatchMasterDto();
					batchDto.setItemBatchCode(dto.getBatchNo());
					batchDto.setItemBatchExpDate(dto.getExpiryDate());
					batchDto.setItemMasterId(dto.getItem_master_id());
					batchDto.setUnitId(unitId);
					dto.setBatchMasterDto(batchDto);
					listopeningStockItemDtoNew.add(dto);
				}
				
				openingStockDto.setLstOpeningStockItemSlaveDto(listopeningStockItemDtoNew);*/

				for (OpeningStockItemSlaveDto dto : openingStockItemSlaveDtos) {
					
					System.out.println("this is exp Datw"+dto.getExpiryDate());
					if (dto.getBatchMasterDto() == null
							&& dto.getBatchId() == 0) {
						boolean isExist = gs.checkBatchInBatchMaster(dto.getBatchNo(), dto.getItem_master_id(), dto.getExpiryDate(), request);
						
						if(isExist == true){
							BatchMasterDto batchDto = new BatchMasterDto();
							BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getBatchNo(), dto.getItem_master_id(), dto.getExpiryDate(), request);;
							for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
								batchDto.setId(obj.getId());
								batchDto.setItemBatchCode(obj.getItemBatchCode());
								batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
								batchDto.setItemMasterId(obj.getItemMasterId());
								batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
								batchDto.setUpdatedBy(obj.getUpdatedBy());
								batchDto.setUnitId(unitId);
							}
							dto.setBatchMasterDto(batchDto);
						}else{
							BatchMasterDto batchDto = new BatchMasterDto();
							batchDto.setId(0);
							batchDto.setItemBatchCode(dto.getBatchNo());
							batchDto.setItemBatchExpDate(dto.getExpiryDate());
							batchDto.setItemMasterId(dto.getItem_master_id());
							batchDto.setUnitId(unitId);
							batchDto.setCreatedBy(userId);
							dto.setBatchMasterDto(batchDto);	
						}
					} else if (dto.getBatchMasterDto() == null
							&& dto.getBatchId() != 0) {
						boolean isExist = gs.checkBatchInBatchMaster(dto.getBatchNo(), dto.getItem_master_id(), dto.getExpiryDate(), request);
						
						if(isExist == true){
							BatchMasterDto batchDto = new BatchMasterDto();
							BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getBatchNo(), dto.getItem_master_id(), dto.getExpiryDate(), request);;
							for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
								batchDto.setId(obj.getId());
								batchDto.setItemBatchCode(obj.getItemBatchCode());
								batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
								batchDto.setItemMasterId(obj.getItemMasterId());
								batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
								batchDto.setUpdatedBy(obj.getUpdatedBy());
								batchDto.setUnitId(unitId);
							}
							dto.setBatchMasterDto(batchDto);	
						}else{
							BatchMasterDto batchDto = new BatchMasterDto();
							batchDto.setId(0);
							batchDto.setItemBatchCode(dto.getBatchNo());
							batchDto.setItemBatchExpDate(dto.getExpiryDate());
							batchDto.setItemMasterId(dto.getItem_master_id());
							batchDto.setUnitId(unitId);
							batchDto.setCreatedBy(userId);
							dto.setBatchMasterDto(batchDto);	
						}
						
					}
					listopeningStockItemDtoNew.add(dto);
				}

				openingStockDto.setLstOpeningStockItemSlaveDto(listopeningStockItemDtoNew);
				
				//to save opening stock asset maintenance details
				ItemAssetMaintenanceOpeningSlaveDto assetMaintenanceOpeningSlaveDto = (ItemAssetMaintenanceOpeningSlaveDto) ConfigUIJSONUtility.
						getObjectFromJSON(itemAssetMaintenanceOpeningInfoDtoDetails,ItemAssetMaintenanceOpeningSlaveDto.class);
				List<ItemAssetMaintenanceOpeningSlaveDto> listItemAssetMaintenanceOpeningSlaveDto = assetMaintenanceOpeningSlaveDto.getLstItemAssetMaintenanceOpeningSlaveDto();
				openingStockDto.setLstItemAssetMaintenanceOpeningSlaveDto(listItemAssetMaintenanceOpeningSlaveDto);

				//to save asset maintenance master details
				ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto = (ItemAssetMaintenanceMasterDto)ConfigUIJSONUtility
						.getObjectFromJSON(itemAssetMaintenanceInfoMasterDtoDetails,
								ItemAssetMaintenanceMasterDto.class);
				
				List<ItemAssetMaintenanceMasterDto> listItemAssetMaintenanceMasterDto = assetMaintenanceMasterDto.getLstItemAssetMaintenanceMasterDto();
				
				List<ItemAssetMaintenanceMasterDto> list = new ArrayList<ItemAssetMaintenanceMasterDto> ();
				for (ItemAssetMaintenanceMasterDto itemAssetMaintenanceMasterDto : listItemAssetMaintenanceMasterDto) {
					ItemAssetMaintenanceMasterDto obj = new ItemAssetMaintenanceMasterDto();
					obj.setAssetItemId(itemAssetMaintenanceMasterDto.getAssetItemId());
					obj.setAssetItemName(itemAssetMaintenanceMasterDto.getAssetItemName());
					obj.setAssetType(itemAssetMaintenanceMasterDto.getAssetType());
					obj.setAssetUnitPrice(itemAssetMaintenanceMasterDto.getAssetUnitPrice());
					obj.setCreatedBy(userId);
					obj.setId(itemAssetMaintenanceMasterDto.getId());
					obj.setManufactureName(itemAssetMaintenanceMasterDto.getManufactureName());
					obj.setPartyMasterId(itemAssetMaintenanceMasterDto.getPartyMasterId());
					obj.setPartyName(itemAssetMaintenanceMasterDto.getPartyName());
					obj.setProductCategory(itemAssetMaintenanceMasterDto.getProductCategory());
					obj.setProductWarrantyDuration(itemAssetMaintenanceMasterDto.getProductWarrantyDuration());
					obj.setProductWarrantyTimePeriod(itemAssetMaintenanceMasterDto.getProductWarrantyTimePeriod());
					obj.setRecordType(itemAssetMaintenanceMasterDto.getRecordType());
					obj.setSerialNo(itemAssetMaintenanceMasterDto.getSerialNo());
					obj.setUnitId(unitId);
					obj.setUnitPrice(itemAssetMaintenanceMasterDto.getAssetUnitPrice());
					obj.setUserId(userId);
					list.add(obj);
				}
				openingStockDto.setLstItemAssetMaintenanceMasterDto(list);	
				
				OpeningStockDto dto =(OpeningStockDto) sessionFactory.getCurrentSession().merge(openingStockDto);
				Integer  masterId = dto.getId();
				
				gs.saveBatchStockMaster(masterId, "OPENINGSTOCK",request);
				log.debug("reponse saveOpeningStock....."+dto);
				return 1;
				
			}
			else{
				
				return 2;
				
			}
		} catch (Exception e) {
			log.error("error for saveOpeningStock...." + e.getMessage());
			e.printStackTrace();
			return 0;
		}
		
	}

	@Override
	public List<OpeningStockDto> getAllOpeningStockRecords(HttpServletRequest request) {
		List<OpeningStockDto> openingStockDtos=new ArrayList<OpeningStockDto>();
		String sql = "";
		try{
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			sql = "select os.id,os.created_date_time,os.user_name,osi.item_name,osi.batch_no,osi.expiry_date,osi.item_quantity from inv_opening_stock_new as os,inv_opening_stock_item_slave as osi where os.id = osi.opening_stock_master_id and os.deleted !='Y' and osi.unit_id="+unitId+" order by  os.id desc";
			if(sql != null) {
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 		 query.setMaxResults(10);
		 		List<Map<String, Object>> list=query.list();
		 		for(Map<String, Object> row : list){
		 			OpeningStockDto obj=new OpeningStockDto();
		 			obj.setId((Integer)row.get("id"));
					obj.setCreatedDateTime((Date)row.get("created_date_time"));
					obj.setUserName((String)row.get("user_name"));
					obj.setItemName((String)row.get("item_name"));
					obj.setBatchNumber((String)row.get("batch_no"));
					obj.setBatchExpDate((Date)row.get("expiry_date"));
					obj.setItemQuantity((Integer)row.get("item_quantity"));
					openingStockDtos.add(obj);
				}
		 		
			}
			log.debug("reponse getAllOpeningStockRecords....."+openingStockDtos);
		}catch(Exception e){
			log.error("error for getAllOpeningStockRecords...." + e.getMessage());
			e.printStackTrace();
		}
		return openingStockDtos;
	}

	@Override
	public OpeningStockDto getOpeningStockPagination(Integer startIndex,HttpServletRequest request) {
		OpeningStockDto openingStockDto = new OpeningStockDto();
		List<OpeningStockDto> lstOpeningStock=new ArrayList<OpeningStockDto>();
		String sql = "";
		try {
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			sql = "select os.id,os.created_date_time,os.user_name,osi.item_name,osi.batch_no,osi.expiry_date,osi.item_quantity from inv_opening_stock_new as os,inv_opening_stock_item_slave as osi where os.id = osi.opening_stock_master_id and os.deleted !='Y' and osi.unit_id="+unitId+" order by  os.id desc";
			if(sql != null) {
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		 		 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 		 query.setFirstResult(startIndex);
		 		 query.setMaxResults(10);
		 		List<Map<String, Object>> list=query.list();
		 		for(Map<String, Object> row : list){
		 			OpeningStockDto obj=new OpeningStockDto();
		 			obj.setId((Integer)row.get("id"));
					obj.setCreatedDateTime((Date)row.get("created_date_time"));
					obj.setUserName((String)row.get("user_name"));
					obj.setItemName((String)row.get("item_name"));
					obj.setBatchNumber((String)row.get("batch_no"));
					obj.setBatchExpDate((Date)row.get("expiry_date"));
					obj.setItemQuantity((Integer)row.get("item_quantity"));
					lstOpeningStock.add(obj);
				}
		 		
			}
			log.debug("reponse getOpeningStockPagination....."+openingStockDto);
		} catch (Exception e) {
			log.error("error for getOpeningStockPagination...." + e.getMessage());
			e.printStackTrace();
		}
		openingStockDto.setOpeningStockDtos(lstOpeningStock);
		return openingStockDto;
	}

	@Override
	public Integer getPageCountAllOpeningStock(HttpServletRequest request) {
		Integer countNew = 0;
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			String sql="";
			sql = "SELECT count(*) FROM inv_opening_stock_new as os WHERE deleted != 'Y' and unit_id="+unitId;
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			countNew = ((Number)countQuery.uniqueResult()).intValue();
			log.debug("reponse getPageCountAllOpeningStock....."+countNew);
		} catch (Exception e) {
			log.error("error for getPageCountAllOpeningStock...." + e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}

}
