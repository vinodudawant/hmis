package com.hms.inventory.dao.impl;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.HMSConstants;
import com.hms.inventory.dao.GoodReceiptNoteDao;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.DocMasterDocNumFinancialYearDto;
import com.hms.inventory.dto.GoodReceiptNoteDocUploadDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.GoodReceiptNoteItemDto;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.ItemAssetMaintenanceDto;
import com.hms.inventory.dto.ItemAssetMaintenanceMasterDto;
import com.hms.inventory.dto.OpeningStockDto;
import com.hms.inventory.dto.OpeningStockItemSlaveDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseOrderDto;
import com.hms.inventory.dto.PurchaseReOrderDto;
import com.hms.inventory.service.GoodReceiptNoteService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class GoodReceiptNoteDaoImpl implements GoodReceiptNoteDao {

	static Logger log = Logger
			.getLogger(GoodReceiptNoteDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	GoodReceiptNoteDto goodReceiptNoteDto;

	@Autowired
	BatchMasterDto batchMasterDto;

	@Autowired
	BatchStockDto batchStockDto;

	@Autowired
	DocMasterDocNumFinancialYearDto docMasterDocNumFinancialYearDto;

	@Autowired
	GoodReceiptNoteService gs;

	@Override
	public int[] saveGoodReceiptNote(GoodReceiptNoteDto goodReceiptNoteDto,
			String lstGoodReceiptNoteItemDto, String grnContactInfoDtoList,
			String grnAddressInfoDtoList, /* MultipartFile[] uploadfiles, */
			String itemAssetMaintenanceDtoList,
			String itemAssetMaintenanceMasterDtoList, Integer partyMasterId,String callFrom,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		int[] status = new int[2];
		String call = goodReceiptNoteDto.getIsDraft();

		if (call.equalsIgnoreCase("DRAFT")) {

			try {
				if (goodReceiptNoteDto.getId() == 0) {
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					Integer unitId = (Integer) session.getAttribute("uId");
					goodReceiptNoteDto.setCreatedBy(userId);
					goodReceiptNoteDto.setUnitId(unitId);

					if (goodReceiptNoteDto.getTotalItemPendingQty() > 0) {
						goodReceiptNoteDto.setIsPending("Y");
					}

					if (Integer.parseInt(goodReceiptNoteDto
							.getPurchaseOrderNumber()) == 0) {
						goodReceiptNoteDto.setIsWithoutPoGrn("Y");
					} else {
						goodReceiptNoteDto.setIsWithoutPoGrn("N");
					}
					PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory
							.getCurrentSession().get(PartyMasterDto.class,
									partyMasterId);

					GoodReceiptNoteItemDto goodReceiptNoteItemDto = (GoodReceiptNoteItemDto) ConfigUIJSONUtility
							.getObjectFromJSON(lstGoodReceiptNoteItemDto,
									GoodReceiptNoteItemDto.class);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDto = goodReceiptNoteItemDto
							.getLstGoodReceiptNoteItemDto();

					goodReceiptNoteDto
							.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDto);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDtoNew = new ArrayList<GoodReceiptNoteItemDto>();

					for (GoodReceiptNoteItemDto dto : listGoodReceiptNoteItemDto) {
						if (dto.getBatchMasterDto() == null) {
							BatchMasterDto batchDto = new BatchMasterDto();
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							if(isExist == true){
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
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
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setItemMasterId(dto.getItemId());
								batchDto.setUnitId(unitId);
								dto.setBatchMasterDto(batchDto);
							}
							
						} else if (dto.getBatchMasterDto() != null) {
							
							BatchMasterDto batchDto = new BatchMasterDto();
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							if(isExist == true){
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
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
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setItemMasterId(dto.getItemId());
								batchDto.setUnitId(unitId);
								dto.setBatchMasterDto(batchDto);
							}
							
						}
						listGoodReceiptNoteItemDtoNew.add(dto);
					}

					goodReceiptNoteDto.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDtoNew);
					
					//here we save the details of item asset maintenance to grn slave
					ItemAssetMaintenanceDto itemAssetMaintenanceDto = (ItemAssetMaintenanceDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceDtoList,ItemAssetMaintenanceDto.class);

					List<ItemAssetMaintenanceDto> listItemAssetMaintenanceDto = itemAssetMaintenanceDto.getLstItemAssetMaintenanceDto();

					goodReceiptNoteDto.setLstItemAssetMaintenanceDto(listItemAssetMaintenanceDto);

					// added by rohit 15-07-2020
					// below line of code to save the asset related details in
					// inv_item_asset_maintenance_master table as well while
					// saving the GRN form
					ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto = (ItemAssetMaintenanceMasterDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceMasterDtoList,ItemAssetMaintenanceMasterDto.class);

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
					goodReceiptNoteDto.setLstItemAssetMaintenanceMasterDto(list);	

					// this is for set contact info
					PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnContactInfoDtoList,
									PartyMasterContactInfoDto.class);

					List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
							.getPartyMasterContactInfoDto();
					partyMasterDto
							.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);

					// this is for set address info
					PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnAddressInfoDtoList,
									PartyMasterAddressInfoDto.class);

					List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto
							.getPartyMasterAddressInfoDto();
					partyMasterDto
							.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);

					goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);

					Integer purchaseOrderId = 0;
					if(callFrom.equalsIgnoreCase("PO")){
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseOrderDto purchaseOrderDto = (PurchaseOrderDto) sessionFactory
									.getCurrentSession()
									.get(PurchaseOrderDto.class, purchaseOrderId);
							purchaseOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseOrderDto);
						}
					}else if(callFrom.equalsIgnoreCase("PR")){
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseReOrderDto purchaseReOrderDto = (PurchaseReOrderDto) sessionFactory
									.getCurrentSession()
									.get(PurchaseReOrderDto.class, purchaseOrderId);
							purchaseReOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseReOrderDto);
						}
					}
					GoodReceiptNoteDto dto = (GoodReceiptNoteDto) sessionFactory
							.getCurrentSession().merge(goodReceiptNoteDto);
					Integer masterId = dto.getId();
					status[0] = 1;
					status[1] = masterId;
				} else {

					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					Integer unitId = (Integer) session.getAttribute("uId");
					goodReceiptNoteDto.setCreatedBy(userId);
					goodReceiptNoteDto.setUnitId(unitId);

					if (goodReceiptNoteDto.getTotalItemPendingQty() > 0) {
						goodReceiptNoteDto.setIsPending("Y");
					}

					if (Integer.parseInt(goodReceiptNoteDto
							.getPurchaseOrderNumber()) == 0) {
						goodReceiptNoteDto.setIsWithoutPoGrn("Y");
					} else {
						goodReceiptNoteDto.setIsWithoutPoGrn("N");
					}

					PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory
							.getCurrentSession().get(PartyMasterDto.class,
									partyMasterId);
					GoodReceiptNoteItemDto goodReceiptNoteItemDto = (GoodReceiptNoteItemDto) ConfigUIJSONUtility
							.getObjectFromJSON(lstGoodReceiptNoteItemDto,
									GoodReceiptNoteItemDto.class);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDto = goodReceiptNoteItemDto
							.getLstGoodReceiptNoteItemDto();

					goodReceiptNoteDto
							.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDto);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDtoNew = new ArrayList<GoodReceiptNoteItemDto>();

					for (GoodReceiptNoteItemDto dto : listGoodReceiptNoteItemDto) {
						if (dto.getBatchMasterDto() == null) {
							BatchMasterDto batchDto = new BatchMasterDto();
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							if(isExist == true){
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
								for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
									batchDto.setId(obj.getId());
									batchDto.setItemBatchCode(obj.getItemBatchCode());
									batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
									batchDto.setItemMasterId(obj.getItemMasterId());
									batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
									batchDto.setUpdatedBy(obj.getUpdatedBy());
									batchDto.setUnitId(unitId);
								}
								if(dto.getIsItemSlaveUsed().equalsIgnoreCase("N")){
									dto.setBatchMasterDto(batchDto);
								}
								
							}else{
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setItemMasterId(dto.getItemId());
								batchDto.setUnitId(unitId);
								dto.setBatchMasterDto(batchDto);
							}
							
						} else if (dto.getBatchMasterDto() != null) {
							BatchMasterDto batchDto = new BatchMasterDto();
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							if(isExist == true){
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
								for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
									batchDto.setId(obj.getId());
									batchDto.setItemBatchCode(obj.getItemBatchCode());
									batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
									batchDto.setItemMasterId(obj.getItemMasterId());
									batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
									batchDto.setUpdatedBy(obj.getUpdatedBy());
									batchDto.setUnitId(unitId);
								}
								if(dto.getIsItemSlaveUsed().equalsIgnoreCase("N")){
									dto.setBatchMasterDto(batchDto);
								}
							}else{
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setUnitId(unitId);
								batchDto.setItemMasterId(dto.getItemId());
								dto.setBatchMasterDto(batchDto);	
							}
							
						}
						listGoodReceiptNoteItemDtoNew.add(dto);
					}

					goodReceiptNoteDto
							.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDtoNew);
					
					//here we save the details of item asset maintenance to grn slave
					ItemAssetMaintenanceDto itemAssetMaintenanceDto = (ItemAssetMaintenanceDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceDtoList,ItemAssetMaintenanceDto.class);

					List<ItemAssetMaintenanceDto> listItemAssetMaintenanceDto = itemAssetMaintenanceDto.getLstItemAssetMaintenanceDto();

					goodReceiptNoteDto.setLstItemAssetMaintenanceDto(listItemAssetMaintenanceDto);

					// added by rohit 15-07-2020
					// below line of code to save the asset related details in
					// inv_item_asset_maintenance_master table as well while
					// saving the GRN form
					ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto = (ItemAssetMaintenanceMasterDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceMasterDtoList,ItemAssetMaintenanceMasterDto.class);

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
					goodReceiptNoteDto.setLstItemAssetMaintenanceMasterDto(list);	
					
					
					// this is for set contact info
					PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnContactInfoDtoList,
									PartyMasterContactInfoDto.class);

					List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
							.getPartyMasterContactInfoDto();
					partyMasterDto
							.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);

					// this is for set address info
					PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnAddressInfoDtoList,
									PartyMasterAddressInfoDto.class);

					List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto
							.getPartyMasterAddressInfoDto();
					partyMasterDto
							.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);

					goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);

					Integer purchaseOrderId = 0;
					
					if(callFrom.equalsIgnoreCase("PO")){
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseOrderDto purchaseOrderDto = (PurchaseOrderDto) sessionFactory
									.getCurrentSession()
									.get(PurchaseOrderDto.class, purchaseOrderId);
							purchaseOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseOrderDto);
						}
					}else if(callFrom.equalsIgnoreCase("PR")){
						
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseReOrderDto purchaseReOrderDto = (PurchaseReOrderDto) sessionFactory
									.getCurrentSession()
									.get(PurchaseReOrderDto.class, purchaseOrderId);
							purchaseReOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseReOrderDto);
						}
					}
					
					
					GoodReceiptNoteDto dto = (GoodReceiptNoteDto) sessionFactory
							.getCurrentSession().merge(goodReceiptNoteDto);

					Integer masterId = dto.getId();
					status[0] = 2;
					status[1] = masterId;
				}
			} catch (Exception e) {
				log.error("error for saveGoodReceiptNote...." + e.getMessage());
				status[0] = 0;
				status[1] = 0;
				return status;
			}
		} else {
			try {
				if (goodReceiptNoteDto.getId() == 0) {
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					Integer unitId = (Integer) session.getAttribute("uId");
					goodReceiptNoteDto.setCreatedBy(userId);
					goodReceiptNoteDto.setUnitId(unitId);

					if (goodReceiptNoteDto.getTotalItemPendingQty() > 0) {
						goodReceiptNoteDto.setIsPending("Y");
					}

					if (Integer.parseInt(goodReceiptNoteDto
							.getPurchaseOrderNumber()) == 0) {
						goodReceiptNoteDto.setIsWithoutPoGrn("Y");
					} else {
						goodReceiptNoteDto.setIsWithoutPoGrn("N");
					}

					PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory
							.getCurrentSession().get(PartyMasterDto.class,
									partyMasterId);

					GoodReceiptNoteItemDto goodReceiptNoteItemDto = (GoodReceiptNoteItemDto) ConfigUIJSONUtility
							.getObjectFromJSON(lstGoodReceiptNoteItemDto,
									GoodReceiptNoteItemDto.class);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDto = goodReceiptNoteItemDto
							.getLstGoodReceiptNoteItemDto();

					//goodReceiptNoteDto.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDto);
					
					//here we save the details of item asset maintenance to grn slave
					ItemAssetMaintenanceDto itemAssetMaintenanceDto = (ItemAssetMaintenanceDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceDtoList,ItemAssetMaintenanceDto.class);

					List<ItemAssetMaintenanceDto> listItemAssetMaintenanceDto = itemAssetMaintenanceDto.getLstItemAssetMaintenanceDto();

					goodReceiptNoteDto.setLstItemAssetMaintenanceDto(listItemAssetMaintenanceDto);

					// added by rohit 15-07-2020
					// below line of code to save the asset related details in
					// inv_item_asset_maintenance_master table as well while
					// saving the GRN form
					ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto = (ItemAssetMaintenanceMasterDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceMasterDtoList,ItemAssetMaintenanceMasterDto.class);

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
					goodReceiptNoteDto.setLstItemAssetMaintenanceMasterDto(list);		
							
					// this is for set contact info
					PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnContactInfoDtoList,
									PartyMasterContactInfoDto.class);

					List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
							.getPartyMasterContactInfoDto();
					partyMasterDto
							.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);

					// this is for set address info
					PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnAddressInfoDtoList,
									PartyMasterAddressInfoDto.class);

					List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto
							.getPartyMasterAddressInfoDto();
					partyMasterDto
							.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);

					goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDtoNew = new ArrayList<GoodReceiptNoteItemDto>();

					for (GoodReceiptNoteItemDto dto : listGoodReceiptNoteItemDto) {
						System.out.println("this is exp Datw"+dto.getItemExpireDate());
						if (dto.getBatchMasterDto() == null
								&& dto.getBatchId() == 0) {
							BatchMasterDto batchDto = new BatchMasterDto();
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							if(isExist == true){
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
								for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
									batchDto.setId(obj.getId());
									batchDto.setItemBatchCode(obj.getItemBatchCode());
									batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
									batchDto.setItemMasterId(obj.getItemMasterId());
									batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
									batchDto.setUpdatedBy(obj.getUpdatedBy());
									batchDto.setUnitId(unitId);
								}
								if(dto.getIsItemSlaveUsed().equalsIgnoreCase("N")){
									dto.setBatchMasterDto(batchDto);
								}
								
							}else{
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setItemMasterId(dto.getItemId());
								batchDto.setUnitId(unitId);
								batchDto.setCreatedBy(userId);
								dto.setBatchMasterDto(batchDto);
							}
							
						} else if (dto.getBatchMasterDto() == null
								&& dto.getBatchId() != 0) {
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							
							if(isExist == true){
								BatchMasterDto batchDto = new BatchMasterDto();
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
								for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
									batchDto.setId(obj.getId());
									batchDto.setItemBatchCode(obj.getItemBatchCode());
									batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
									batchDto.setItemMasterId(obj.getItemMasterId());
									batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
									batchDto.setUpdatedBy(obj.getUpdatedBy());
									batchDto.setUnitId(unitId);
								}
								if(dto.getIsItemSlaveUsed().equalsIgnoreCase("N")){
									dto.setBatchMasterDto(batchDto);
								}
							}else{
								BatchMasterDto batchDto = new BatchMasterDto();
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setItemMasterId(dto.getItemId());
								batchDto.setUnitId(unitId);
								batchDto.setCreatedBy(userId);
								dto.setBatchMasterDto(batchDto);	
							}
						}
						listGoodReceiptNoteItemDtoNew.add(dto);
					}

					goodReceiptNoteDto
							.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDtoNew);

					System.out.println("this is all  item slave "+listGoodReceiptNoteItemDtoNew);
					
					Integer purchaseOrderId = 0;
					if(callFrom.equalsIgnoreCase("PO")){
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseOrderDto purchaseOrderDto = (PurchaseOrderDto) sessionFactory
									.getCurrentSession()
									.get(PurchaseOrderDto.class, purchaseOrderId);
							purchaseOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseOrderDto);
						}
					}else if(callFrom.equalsIgnoreCase("PR")){
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseReOrderDto purchaseReOrderDto = (PurchaseReOrderDto) sessionFactory
									.getCurrentSession()
									.get(PurchaseReOrderDto.class, purchaseOrderId);
							purchaseReOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseReOrderDto);
						}
					}
					GoodReceiptNoteDto dto = (GoodReceiptNoteDto) sessionFactory
							.getCurrentSession().merge(goodReceiptNoteDto);

					Integer masterId = dto.getId();
					gs.saveBatchStockMaster(masterId, "GRN", request);

					status[0] = 1;
					status[1] = masterId;
				} else {

					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					Integer unitId = (Integer) session.getAttribute("uId");
					goodReceiptNoteDto.setCreatedBy(userId);
					goodReceiptNoteDto.setUnitId(unitId);

					if (goodReceiptNoteDto.getTotalItemPendingQty() > 0) {
						goodReceiptNoteDto.setIsPending("Y");
					}

					if (Integer.parseInt(goodReceiptNoteDto
							.getPurchaseOrderNumber()) == 0) {
						goodReceiptNoteDto.setIsWithoutPoGrn("Y");
					} else {
						goodReceiptNoteDto.setIsWithoutPoGrn("N");
					}

					PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory
							.getCurrentSession().get(PartyMasterDto.class,
									partyMasterId);
					GoodReceiptNoteItemDto goodReceiptNoteItemDto = (GoodReceiptNoteItemDto) ConfigUIJSONUtility
							.getObjectFromJSON(lstGoodReceiptNoteItemDto,
									GoodReceiptNoteItemDto.class);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDto = goodReceiptNoteItemDto
							.getLstGoodReceiptNoteItemDto();

					//goodReceiptNoteDto
					//		.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDto);

					// this is for set contact info
					PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnContactInfoDtoList,
									PartyMasterContactInfoDto.class);

					List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
							.getPartyMasterContactInfoDto();
					partyMasterDto
							.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);
					
					//here we save the details of item asset maintenance to grn slave
					ItemAssetMaintenanceDto itemAssetMaintenanceDto = (ItemAssetMaintenanceDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceDtoList,ItemAssetMaintenanceDto.class);

					List<ItemAssetMaintenanceDto> listItemAssetMaintenanceDto = itemAssetMaintenanceDto.getLstItemAssetMaintenanceDto();

					goodReceiptNoteDto.setLstItemAssetMaintenanceDto(listItemAssetMaintenanceDto);

					// added by rohit 15-07-2020
					// below line of code to save the asset related details in
					// inv_item_asset_maintenance_master table as well while
					// saving the GRN form
					ItemAssetMaintenanceMasterDto assetMaintenanceMasterDto = (ItemAssetMaintenanceMasterDto) ConfigUIJSONUtility.getObjectFromJSON(itemAssetMaintenanceMasterDtoList,ItemAssetMaintenanceMasterDto.class);

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
					goodReceiptNoteDto.setLstItemAssetMaintenanceMasterDto(list);	
					
					// this is for set address info
					PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
							.getObjectFromJSON(grnAddressInfoDtoList,
									PartyMasterAddressInfoDto.class);

					List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto
							.getPartyMasterAddressInfoDto();
					partyMasterDto
							.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);

					goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);

					List<GoodReceiptNoteItemDto> listGoodReceiptNoteItemDtoNew = new ArrayList<GoodReceiptNoteItemDto>();

					for (GoodReceiptNoteItemDto dto : goodReceiptNoteItemDto.getLstGoodReceiptNoteItemDto()) {
						System.out.println("this is exp date "+dto.getItemExpireDate());
						if (dto.getBatchId() == 0) {
							BatchMasterDto batchDto = new BatchMasterDto();
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							if(isExist == true){
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
								for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
									batchDto.setId(obj.getId());
									batchDto.setItemBatchCode(obj.getItemBatchCode());
									batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
									batchDto.setItemMasterId(obj.getItemMasterId());
									batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
									batchDto.setUpdatedBy(obj.getUpdatedBy());
									batchDto.setUnitId(unitId);
								}
								
								if(dto.getIsItemSlaveUsed().equalsIgnoreCase("N")){
									dto.setBatchMasterDto(batchDto);
								}
							}else{
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setItemMasterId(dto.getItemId());
								batchDto.setUnitId(unitId);
								batchDto.setCreatedBy(userId);
								dto.setBatchMasterDto(batchDto);
							}
						} else if (dto.getBatchMasterDto() != null
								&& dto.getBatchId() != null
								|| dto.getBatchId() != 0) {
							BatchMasterDto batchDto = new BatchMasterDto();
							boolean isExist = gs.checkBatchInBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
							if(isExist == true){
								BatchMasterDto  batchMasterDto = gs.getBatchMaster(dto.getItemBatchNo(), dto.getItemId(), dto.getItemExpireDate(), request);
								for (BatchMasterDto obj : batchMasterDto.getLstBatchMasterDto()) {
									batchDto.setId(obj.getId());
									batchDto.setItemBatchCode(obj.getItemBatchCode());
									batchDto.setItemBatchExpDate(obj.getItemBatchExpDate());
									batchDto.setItemMasterId(obj.getItemMasterId());
									batchDto.setUpdatedDateTime(obj.getUpdatedDateTime());
									batchDto.setUpdatedBy(obj.getUpdatedBy());
									batchDto.setUnitId(unitId);
								}
								if(dto.getIsItemSlaveUsed().equalsIgnoreCase("N")){
									dto.setBatchMasterDto(batchDto);
								}
							}else{
								batchDto.setId(0);
								batchDto.setItemBatchCode(dto.getItemBatchNo());
								batchDto.setItemBatchExpDate(dto
										.getItemExpireDate());
								batchDto.setItemMasterId(dto.getItemId());
								batchDto.setUnitId(unitId);
								batchDto.setCreatedBy(userId);
								dto.setBatchMasterDto(batchDto);
							}
							
						}
						listGoodReceiptNoteItemDtoNew.add(dto);
					}
					
					System.out.println("this is list for object " +listGoodReceiptNoteItemDtoNew);

					goodReceiptNoteDto
							.setLstGoodReceiptNoteItemDto(listGoodReceiptNoteItemDtoNew);

					Integer purchaseOrderId = 0;
					if(callFrom.equalsIgnoreCase("PO")){
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseOrderDto purchaseOrderDto = (PurchaseOrderDto) sessionFactory
									.openSession()
									.get(PurchaseOrderDto.class, purchaseOrderId);
							purchaseOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseOrderDto);
						}
					}else if(callFrom.equalsIgnoreCase("PR")){
						if (goodReceiptNoteDto.getPurchaseOrderNumber() != null
								&& goodReceiptNoteDto.getPurchaseOrderNumber() != ""
								&& Integer.parseInt(goodReceiptNoteDto
										.getPurchaseOrderNumber()) != 0) {
							purchaseOrderId = Integer.parseInt(goodReceiptNoteDto
									.getPurchaseOrderNumber());
							PurchaseReOrderDto purchaseReOrderDto = (PurchaseReOrderDto) sessionFactory
									.openSession()
									.get(PurchaseReOrderDto.class, purchaseOrderId);
							purchaseReOrderDto.setIsPoUsed("Y");
							sessionFactory.getCurrentSession().merge(
									purchaseReOrderDto);
						}
					}

					GoodReceiptNoteDto dto = (GoodReceiptNoteDto) sessionFactory
							.getCurrentSession().merge(goodReceiptNoteDto);

					Integer masterId = dto.getId();

					gs.saveBatchStockMaster(masterId, "GRN", request);

					status[0] = 2;
					status[1] = masterId;
				}
			} catch (Exception e) {
				log.error("error for saveGoodReceiptNote...." + e.getMessage());
				System.out.println(e.getMessage());
				status[0] = 0;
				status[1] = 0;
				return status;
			}

		}
		return status;
	}

	@Override
	public List<GoodReceiptNoteDto> getAllGoodReceiptNote(
			HttpServletRequest request, String call) {
		// TODO Auto-generated method stub

		List<GoodReceiptNoteDto> goodReceiptNoteDtoList = new ArrayList<GoodReceiptNoteDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			if (call.equalsIgnoreCase("DRAFT")) {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isDraft", "DRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
				criteria.setMaxResults(10);
				goodReceiptNoteDtoList = criteria.list();
			} else if (call.equalsIgnoreCase("PENDING")) {

				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isPending", "Y"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
				criteria.setMaxResults(10);
				goodReceiptNoteDtoList = criteria.list();

			} else {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("isPending", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
				criteria.setMaxResults(10);
				goodReceiptNoteDtoList = criteria.list();
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getAllGoodReceiptNote...." + e.getMessage());
			return null;
		}
		return goodReceiptNoteDtoList;
	}

	@Override
	public GoodReceiptNoteDto editGoodReceiptNote(Integer goodReceiptNoteId,
			String call, HttpServletRequest request) {
		// TODO Auto-generated method stub

		PartyMasterDto partyMasterDto = new PartyMasterDto();
		List<PartyMasterContactInfoDto> partyMsterContact = new ArrayList<PartyMasterContactInfoDto>();
		List<PartyMasterAddressInfoDto> partyMsterAddress = new ArrayList<PartyMasterAddressInfoDto>();

		List<GoodReceiptNoteItemDto> lstGoodReceiptNoteItemDto = new ArrayList<GoodReceiptNoteItemDto>();

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");

		if (call.equalsIgnoreCase("draft")) {
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("id", goodReceiptNoteId));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isDraft", "DRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				goodReceiptNoteDto = (GoodReceiptNoteDto) criteria
						.uniqueResult();
				partyMasterDto = (PartyMasterDto) goodReceiptNoteDto
						.getPartyMasterDto();

				for (PartyMasterContactInfoDto c : partyMasterDto
						.getPartyMasterContactInfoDto()) {
					if (c.getDeleted().equalsIgnoreCase("N")) {
						partyMsterContact.add(c);
					}
				}

				for (GoodReceiptNoteItemDto g : goodReceiptNoteDto
						.getLstGoodReceiptNoteItemDto()) {
					if (g.getDeleted().equalsIgnoreCase("N")) {
						if(g.getBatchMasterDto() !=null){
							g.setBatchId(g.getBatchMasterDto().getId());
						}else{
							List<BatchMasterDto>  lstBatchMasterDto = checkBatchAvailability(g.getItemBatchNo().trim(),g.getItemId(),request);
							g.setBatchId(lstBatchMasterDto.get(0).getId());
						}
						lstGoodReceiptNoteItemDto.add(g);
					}
				}

				for (PartyMasterAddressInfoDto a : partyMasterDto
						.getPartyMasterAddressInfoDto()) {
					if (a.getDeleted().equalsIgnoreCase("N")) {
						partyMsterAddress.add(a);
					}
				}

				partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
				goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);
				goodReceiptNoteDto
						.setLstGoodReceiptNoteItemDto(lstGoodReceiptNoteItemDto);

				return goodReceiptNoteDto;
			} catch (Exception e) {
				log.error("error for editGoodReceiptNote...." + e.getMessage());
				return null;
			}
		} else  if(call.equalsIgnoreCase("PENDING")){
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("id", goodReceiptNoteId));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isPending", "Y"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				goodReceiptNoteDto = (GoodReceiptNoteDto) criteria
						.uniqueResult();
				partyMasterDto = (PartyMasterDto) goodReceiptNoteDto
						.getPartyMasterDto();

				for (PartyMasterContactInfoDto c : partyMasterDto
						.getPartyMasterContactInfoDto()) {
					if (c.getDeleted().equalsIgnoreCase("N")) {
						partyMsterContact.add(c);
					}
				}

				for (PartyMasterAddressInfoDto a : partyMasterDto
						.getPartyMasterAddressInfoDto()) {
					if (a.getDeleted().equalsIgnoreCase("N")) {
						partyMsterAddress.add(a);
					}
				}
				
				for (GoodReceiptNoteItemDto g : goodReceiptNoteDto
						.getLstGoodReceiptNoteItemDto()) {
					if (g.getDeleted().equalsIgnoreCase("N")) {
						if(g.getBatchMasterDto() !=null){
							g.setBatchId(g.getBatchMasterDto().getId());
						}else{
							List<BatchMasterDto>  lstBatchMasterDto = checkBatchAvailability(g.getItemBatchNo().trim(),g.getItemId(),request);
							g.setBatchId(lstBatchMasterDto.get(0).getId());
						}
						lstGoodReceiptNoteItemDto.add(g);
					}
				}

				partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
				goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);
				goodReceiptNoteDto
				.setLstGoodReceiptNoteItemDto(lstGoodReceiptNoteItemDto);


				return goodReceiptNoteDto;
			} catch (Exception e) {
				log.error("error for editGoodReceiptNote...." + e.getMessage());
				return null;
			}
		}else{
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("id", goodReceiptNoteId));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isPending", "N"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				goodReceiptNoteDto = (GoodReceiptNoteDto) criteria
						.uniqueResult();
				partyMasterDto = (PartyMasterDto) goodReceiptNoteDto
						.getPartyMasterDto();

				for (PartyMasterContactInfoDto c : partyMasterDto
						.getPartyMasterContactInfoDto()) {
					if (c.getDeleted().equalsIgnoreCase("N")) {
						partyMsterContact.add(c);
					}
				}

				for (PartyMasterAddressInfoDto a : partyMasterDto
						.getPartyMasterAddressInfoDto()) {
					if (a.getDeleted().equalsIgnoreCase("N")) {
						partyMsterAddress.add(a);
					}
				}
				
				for (GoodReceiptNoteItemDto g : goodReceiptNoteDto
						.getLstGoodReceiptNoteItemDto()) {
					if (g.getDeleted().equalsIgnoreCase("N")) {
						
						if(g.getBatchMasterDto() !=null){
							g.setBatchId(g.getBatchMasterDto().getId());
						}else{
							List<BatchMasterDto>  lstBatchMasterDto = checkBatchAvailability(g.getItemBatchNo().trim(),g.getItemId(),request);
							g.setBatchId(lstBatchMasterDto.get(0).getId());
						}
						lstGoodReceiptNoteItemDto.add(g);
					}
				}

				partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
				goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);
				goodReceiptNoteDto
				.setLstGoodReceiptNoteItemDto(lstGoodReceiptNoteItemDto);


				return goodReceiptNoteDto;
			} catch (Exception e) {
				log.error("error for editGoodReceiptNote...." + e.getMessage());
				return null;
			}
		}

	}

	@Override
	public boolean deleteGoodReceiptNote(Integer goodReceiptNoteId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public GoodReceiptNoteDto goodReceiptNoteAutoSuggestion(
			String goodReceiptNote, String call, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<GoodReceiptNoteDto> goodReceiptNoteDtoList = new ArrayList<GoodReceiptNoteDto>();
		try {

			String sql = "";
			if (call.equalsIgnoreCase("all")) {
				sql = "SELECT p.id, p.grn_supplier_name as name  FROM inv_good_receipt_note p where p.grn_supplier_name like '"
						+ goodReceiptNote + "%' and p.deleted='N' and p.is_draft !='DRAFT'";
			} else if (call.equalsIgnoreCase("draft")) {
				sql = "SELECT p.id, p.grn_supplier_name as name  FROM inv_good_receipt_note p where p.grn_supplier_name like '"
						+ goodReceiptNote
						+ "%' and p.is_draft='DRAFT' and p.deleted='N'";
			} else if (call.equalsIgnoreCase("PENDING")) {
				sql = "SELECT p.id, p.grn_supplier_name as name  FROM inv_good_receipt_note p where p.grn_supplier_name like '"
						+ goodReceiptNote
						+ "%' and p.is_pending='Y' and p.deleted='N'";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();

			for (Map<String, Object> row : masterRow) {
				GoodReceiptNoteDto goodReceiptNoteDto1 = new GoodReceiptNoteDto();
				goodReceiptNoteDto1
						.setGrnSupplierName((String) row.get("name"));
				goodReceiptNoteDto1.setId((Integer) row.get("id"));
				goodReceiptNoteDtoList.add(goodReceiptNoteDto1);
				goodReceiptNoteDto1 = null;
			}
			goodReceiptNoteDto.setLstGoodReceiptNoteDto(goodReceiptNoteDtoList);

		} catch (Exception e) {
			log.error("error for goodReceiptNoteAutoSuggestion...."
					+ e.getMessage());
			return null;
		}
		return goodReceiptNoteDto;
	}

	@Override
	public GoodReceiptNoteDto getGoodReceiptNoteById(Integer goodReceiptNoteId,String callFrom,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				GoodReceiptNoteDto.class);
		criteria.add(Restrictions.eq("id", goodReceiptNoteId));
		criteria.add(Restrictions.eq("deleted", "N"));
		
		if(callFrom.equalsIgnoreCase( "DRAFT")){
			criteria.add(Restrictions.eq("isDraft", "DRAFT"));
		}else if(callFrom.equalsIgnoreCase("all")){
			criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
			criteria.add(Restrictions.eq("isPending", "N"));
		}else if(callFrom.equalsIgnoreCase("PENDING")){
			criteria.add(Restrictions.eq("isPending", "Y"));
			criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
		}
		goodReceiptNoteDto = (GoodReceiptNoteDto) criteria.uniqueResult();
		return goodReceiptNoteDto;
	}
	
	@Override
	public GoodReceiptNoteDto getGoodReceiptNoteByVendorName(String vendorName,String callFrom,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<GoodReceiptNoteDto> goodReceiptNoteDtoList = new ArrayList<GoodReceiptNoteDto>();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				GoodReceiptNoteDto.class);
		criteria.add(Restrictions.like("grnSupplierName",vendorName+ "%"));
		criteria.add(Restrictions.eq("deleted", "N"));
		if(callFrom.equalsIgnoreCase( "DRAFT")){
			criteria.add(Restrictions.eq("isDraft", "DRAFT"));
		}else if(callFrom.equalsIgnoreCase("all")){
			criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
			criteria.add(Restrictions.eq("isPending", "N"));
		}else if(callFrom.equalsIgnoreCase("PENDING")){
			criteria.add(Restrictions.eq("isPending", "Y"));
			criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
		}
		goodReceiptNoteDtoList = criteria.list();
		goodReceiptNoteDto.setLstGoodReceiptNoteDto(goodReceiptNoteDtoList);
		
		return goodReceiptNoteDto;
	}

	@Override
	public DocMasterDocNumFinancialYearDto getGoodReceiptNoteSeries(
			String isEdit, HttpServletRequest request) {
		String sql = "";
		List<DocMasterDocNumFinancialYearDto> lstDocMasterDocNumFinancialYearDto = new ArrayList<DocMasterDocNumFinancialYearDto>();
		try {

			if (isEdit.equalsIgnoreCase("no")) {

				sql = "SELECT "
						+ "dm.doc_id,"
						+ "fy.id,"
						+ "dm.doc_name,"
						+ "dnm.financial_year, "
						+ "dnm.document_numbering_id,"
						+ "dm.deleted,"
						+ "dnm.document_name,"
						+ "dnm.document_prefix,"
						+ "dnm.document_series,"
						+ "dnm.document_suffix,"
						+ "dnm.document_number "
						+ "FROM ehat_inv_document_master dm "
						+ "INNER JOIN ehat_inventory_number_doc dnm ON dnm.document_id=dm.doc_id "
						+ "INNER JOIN inv_financial_year_new fy ON dnm.doc_financial_year_id=fy.id where dm.deleted='N' order by document_numbering_id desc; ";
				SQLQuery getMaster = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					DocMasterDocNumFinancialYearDto docObj = new DocMasterDocNumFinancialYearDto();
					docObj.setDocName((String) row.get("doc_name"));
					docObj.setDocNumberingId((Integer) row
							.get("document_numbering_id"));
					docObj.setYear((String) row.get("financial_year"));
					docObj.setDocFinancialYearId((Integer) row.get("id"));
					docObj.setDeleted((String) row.get("deleted"));
					docObj.setDocNumber((String) row.get("document_number"));
					docObj.setDocSuffix((String) row.get("document_suffix"));
					docObj.setDocSeries((String) row.get("document_series"));
					docObj.setDocPrefix((String) row.get("document_prefix"));
					docObj.setDocName((String) row.get("document_name"));
					docObj.setDocId((Integer) row.get("doc_id"));

					lstDocMasterDocNumFinancialYearDto.add(docObj);
					docObj = null;
				}
				docMasterDocNumFinancialYearDto
						.setLstdocMasterDocNumFinancialYearDto(lstDocMasterDocNumFinancialYearDto);

			}

		} catch (Exception e) {
			// TODO: handle exception
			log.error("error for getGoodReceiptNoteSeries...." + e.getMessage());
			return null;
		}
		return docMasterDocNumFinancialYearDto;

	}

	@Override
	public int getNextIdNew(String tableName, HttpServletRequest request) {
		Integer id = 0;
		String sql = null;
		sql = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = '"
				+ tableName.toString()
				+ "' AND table_schema = '"
				+ HMSConstants.DATABASENAME + "' ";
		try {
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, BigInteger>> masterRow = getMaster.list();
			for (Map<String, BigInteger> row : masterRow) {
				id = ((BigInteger) row.get("AUTO_INCREMENT")).intValue();
			}
			return id;
		} catch (Exception e) {
			log.error("error for getNextIdNew...." + e.getMessage());
		}
		return id;
	}

	@Override
	public String getChallanAndPurchaseInvoiceId(String grntid,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		String id = "no";

		try {

			String sql = "SELECT MAX(grn_delivery_challan_number),MAX(grn_purchase_inv_no) FROM  inv_good_receipt_note";

			SQLQuery query13 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			query13.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list1 = query13.list();
			for (Map<String, Object> rs : list1) {
				// String taxid =(String) rs.get("tax_id");
				String challlno = (String) rs
						.get("MAX(grn_delivery_challan_number)");
				String invoiceno = (String) rs.get("MAX(grn_purchase_inv_no)");
				if (invoiceno != null || challlno != null) {
					id = challlno + "@" + invoiceno;
				}
			}
		} catch (Exception e) {
			log.error("error for getChallanAndPurchaseInvoiceId...."
					+ e.getMessage());
			return id;
		}
		return id;
	}

	@Override
	public List<PurchaseOrderDto> getPendingPurchaseOrder(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<PurchaseOrderDto> purchaseOrderDtos = new ArrayList<PurchaseOrderDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseOrderDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isPoUsed", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("id"));
			purchaseOrderDtos = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getPenndingPurchaseOrder...." + e.getMessage());

		}
		return purchaseOrderDtos;

	}
	
	@Override
	public List<PurchaseReOrderDto> getPendingPurchaseReOrder(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<PurchaseReOrderDto> purchaseReOrderDtos = new ArrayList<PurchaseReOrderDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseReOrderDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isPoUsed", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("id"));
			purchaseReOrderDtos = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getPenndingPurchaseReOrder...." + e.getMessage());

		}
		return purchaseReOrderDtos;

	}

	@Override
	public List<InventoryTaxSetUpMDTO> getAllInvTaxMasterAutosuggestion(
			String taxName, HttpServletRequest request) {
		String sql = "";
		List<InventoryTaxSetUpMDTO> lsttaxMaster = new ArrayList<InventoryTaxSetUpMDTO>();

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
			sql = "SELECT c.tax_id, c.tax_code , c.tax_rate FROM ehat_inventory_tax_setup  c  where c.tax_code like '"
					+ taxName
					+ "%' and c.deleted='N' and unit_id="
					+ unitId
					+ " limit 20 ";

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				InventoryTaxSetUpMDTO obj = new InventoryTaxSetUpMDTO();
				obj.setTax_code((String) row.get("tax_code") + "_"
						+ (Double) row.get("tax_rate"));
				obj.setTax_id((Integer) row.get("tax_id"));
				obj.setTax_rate((Double) row.get("tax_rate"));
				lsttaxMaster.add(obj);
				obj = null;
			}

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getAllInvTaxMasterAutosuggestion...."
					+ e.getMessage());
		}
		return lsttaxMaster;
	}

	@Override
	public List<BatchMasterDto> checkBatchAvailability(String batchCode,
			Integer itemMasterId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<BatchMasterDto> batchMasters = new ArrayList<BatchMasterDto>();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BatchMasterDto.class);
			criteria.add(Restrictions.eq("unitId", unitId));
			if (batchCode != null) {
				criteria.add(Restrictions.eq("itemBatchCode", batchCode));
			}
			if (itemMasterId != null) {
				criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
			}
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("id"));

			proList.add(Projections.property("itemBatchCode"));
			proList.add(Projections.property("itemBatchExpDate"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();
			for (Object row[] : result) {
				BatchMasterDto batchMaster = new BatchMasterDto();
				if (row[0] != null) {
					batchMaster.setId(Integer.parseInt(row[0].toString()));
				} else {
					batchMaster.setId(0);
				}
				if (row[1] != null) {
					batchMaster.setItemBatchCode(row[1].toString());
				} else {
					batchMaster.setItemBatchCode("-");
				}
				if (row[2] != null) {
					batchMaster.setItemBatchExpDate((Date) row[2]);
				} else {
					batchMaster.setItemBatchExpDate(null);
				}
				batchMasters.add(batchMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for checkBatchAvailability...." + e.getMessage());
			return batchMasters;
		}
		return batchMasters;

	}

	@Override
	public List<BatchStockDto> getBatchDetails(Integer itemId,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		// TODO Auto-generated method stub
		String sql = "";
		List<BatchStockDto> batchMasters = new ArrayList<BatchStockDto>();
		sql = " SELECT batchMaster.id, batchStock.item_batch_code,batchStock.item_batch_exp_date,"
				+ "batchStock.item_master_id, batchStock.item_name, batchStock.issue_quantity,"
				+ "batchStock.item_quantity FROM inv_batch_stock_new batchStock "
				+ "INNER JOIN inv_batch_master batchMaster "
				+ "ON batchStock.item_master_id=batchMaster.item_master_id and "
				+ "batchStock.batch_master_id=batchMaster.id"
				+ " where batchStock.deleted='N' and batchMaster.item_master_id="
				+ itemId
				+ ""
				+ " and batchMaster.deleted='N' and batchStock.unit_id="
				+ unitId + " and batchMaster.unit_id=" + unitId;
		// and batchStock.item_batch_code != 0
		SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(
				sql);
		List<Object[]> list = getMaster.list();
		for (Object[] arr : list) {
			BatchStockDto batchStock = new BatchStockDto();
			if (arr[0] != null) {
				batchStock.setId(Integer.parseInt(arr[0].toString()));
			} else {
				batchStock.setId(0);
			}
			if (arr[1] != null) {
				batchStock.setItemBatchCode(arr[1].toString());
			} else {
				batchStock.setItemBatchCode("-");
			}
			if (arr[2] != null) {
				batchStock.setItemBatchExpDate((Date) arr[2]);
			} else {
				batchStock.setItemBatchExpDate(null);
			}
			if (arr[3] != null) {
				batchStock.setItemMasterId(Integer.parseInt(arr[3].toString()));
			} else {
				batchStock.setItemMasterId(0);
			}
			if (arr[4] != null) {
				batchStock.setItemName(arr[4].toString());
			} else {
				batchStock.setItemName("");
			}
			if (arr[5] != null) {
				batchStock
						.setIssueQuantity(Integer.parseInt(arr[5].toString()));
			} else {
				batchStock.setIssueQuantity(0);
			}
			if (arr[6] != null) {
				batchStock.setItemQuantity(Integer.parseInt(arr[6].toString()));
			} else {
				batchStock.setItemQuantity(0);
			}

			batchMasters.add(batchStock);
		}
		return batchMasters;
	}

	@Override
	public int saveBatchStockMaster(Integer masterId, String callFrom,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		int status = 0;
		try {
			if (callFrom == "GRN") {

				HttpSession session = request.getSession();
				Integer unitId = (Integer) session.getAttribute("uId");
				Integer userId = (Integer)session.getAttribute("userId1");
				GoodReceiptNoteDto goodReceiptNoteDto = (GoodReceiptNoteDto) sessionFactory
						.getCurrentSession().get(GoodReceiptNoteDto.class,
								masterId);
				String sql = "";
				for (GoodReceiptNoteItemDto obj : goodReceiptNoteDto
						.getLstGoodReceiptNoteItemDto()) {
						if(obj.getIsItemSlaveUsed().equalsIgnoreCase("N")){
							List<BatchStockDto> batchStockDtos = null;
							if (obj != null && obj.getDeleted().equalsIgnoreCase("N")) {
								Date d1 = null;
								String batchCode1 = "";
								if (obj.getBatchMasterDto() != null) {
									d1 = obj.getBatchMasterDto().getItemBatchExpDate();
									batchCode1 = obj.getBatchMasterDto()
											.getItemBatchCode();
								} else {
									d1 = obj.getItemExpireDate();
									batchCode1 = obj.getItemBatchNo();
								}
		
								DateFormat dateFormat = new SimpleDateFormat(
										"yyyy-MM-dd");
								String strGRNGoodIssueItemSlave = dateFormat.format(d1);
								sql = "SELECT * FROM inv_batch_stock_new as ibs where  ibs.item_master_id="
										+ obj.getItemId()
										+ " and ibs.item_batch_code='"
										+ batchCode1
										+ "' and (Date_Format(ibs.item_batch_exp_date,'%Y-%m-%d'))='"
										+ strGRNGoodIssueItemSlave
										+ "' and ibs.deleted='N' order by  ibs.id desc";
								SQLQuery getMaster = sessionFactory.getCurrentSession()
										.createSQLQuery(sql);
								getMaster
										.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
								batchStockDtos = getMaster.list();
								Integer total = 0;
								if (batchStockDtos.size() > 0) {
									for (int i = 0; i < batchStockDtos.size(); i++) {
										Map map = new HashMap();
										map = (Map) batchStockDtos.get(i);
										String batchCode = (String) map
												.get("item_batch_code");
										Date batchExpDate = (Date) map
												.get("item_batch_exp_date");
										DateFormat dateFormatBatchStock = new SimpleDateFormat(
												"yyyy-MM-dd");
										String strGRNBatchStock = dateFormatBatchStock
												.format(batchExpDate);
										Integer itemMasterId = (Integer) map
												.get("item_master_id");
										Integer batchStockId = (Integer) map.get("id");
										// for (BatchStockDto batchStockDto :
										// batchStockDtos) {
										if (batchCode.equalsIgnoreCase(obj
												.getBatchMasterDto().getItemBatchCode()
												.trim())
												&& strGRNBatchStock
														.equalsIgnoreCase(strGRNGoodIssueItemSlave
																.trim())) {
											Criteria criteria = sessionFactory
													.getCurrentSession()
													.createCriteria(BatchStockDto.class);
											criteria.add(Restrictions.eq(
													"itemBatchCode", batchCode));
											criteria.add(Restrictions.eq(
													"itemBatchExpDate", batchExpDate));
											criteria.add(Restrictions.eq(
													"itemMasterId", itemMasterId));
		
											BatchStockDto bobj = (BatchStockDto) criteria
													.uniqueResult();
											if (obj.getItemPendingQty() != 0) {
												Integer cuurentBatchStock = bobj
														.getItemQuantity();
												/*
												 * total = cuurentBatchStock +
												 * obj.getItemReceivedQty();
												 */
												total = cuurentBatchStock
														+ obj.getCurrentItemQty();
												bobj.setItemQuantity(total);
											} else {
												if (!obj.getCurrentItemQty().equals(
														obj.getItemReceivedQty())) {
													Integer cuurentBatchStock = bobj
															.getItemQuantity();
													total = cuurentBatchStock
															+ obj.getCurrentItemQty();
													bobj.setItemQuantity(total);
												} else if (obj.getCurrentItemQty()
														.equals(obj
																.getItemReceivedQty())
														&& obj.getItemPendingQty() == 0) {
													Integer cuurentBatchStock = bobj
															.getItemQuantity();
													total = cuurentBatchStock
															+ obj.getCurrentItemQty();
													bobj.setItemQuantity(total);
												}
											}
											bobj.setUnitId(unitId);
											//userId
											bobj.setCreatedBy(userId);
											bobj.setItemUOMName(obj.getItemUnitName());
											bobj.setGrnStockStatus(1);
											sessionFactory.getCurrentSession().merge(
													bobj);
										} else {
											BatchStockDto batchStockDtoObj = new BatchStockDto();
											batchStockDtoObj.setBatchMasterId(obj
													.getBatchMasterDto().getId());
											batchStockDtoObj.setItemBatchCode(obj
													.getBatchMasterDto()
													.getItemBatchCode());
											batchStockDtoObj
													.setCurrentSubInventoryStock(0);
											batchStockDtoObj.setItemBatchExpDate(obj
													.getBatchMasterDto()
													.getItemBatchExpDate());
											batchStockDtoObj.setIssueQuantity(0);
											batchStockDtoObj.setItemName(obj
													.getItemName());
											batchStockDtoObj.setItemQuantity(obj
													.getItemReceivedQty());
											batchStockDtoObj.setStockFrom("GRN");
											batchStockDtoObj.setGrnStockStatus(1);
											batchStockDtoObj
													.setTotalQuantity(goodReceiptNoteDto
															.getTotalItemQuantity());
											batchStockDtoObj.setMasterId(masterId);
											batchStockDtoObj.setItemMasterId(obj
													.getItemId());
											batchStockDtoObj.setUnitId(unitId);
											batchStockDtoObj.setCreatedBy(userId);
											batchStockDtoObj.setItemUOMName(obj.getItemUnitName());
											//setting this value to zero '0' to know against this perticular batch is used under any subinventory or not 
											batchStockDtoObj.setUpdatedBy(0);
											sessionFactory.getCurrentSession().merge(
													batchStockDtoObj);
										}
									}
								} else {
									BatchStockDto batchStockDtoObj = new BatchStockDto();
									batchStockDtoObj.setBatchMasterId(obj
											.getBatchMasterDto().getId());
									batchStockDtoObj.setItemBatchCode(obj
											.getBatchMasterDto().getItemBatchCode());
									batchStockDtoObj.setCurrentSubInventoryStock(0);
									batchStockDtoObj.setItemBatchExpDate(obj
											.getBatchMasterDto().getItemBatchExpDate());
									batchStockDtoObj.setIssueQuantity(0);
									batchStockDtoObj.setItemName(obj.getItemName());
									batchStockDtoObj.setItemQuantity(obj
											.getItemReceivedQty());
									batchStockDtoObj.setStockFrom("GRN");
									batchStockDtoObj.setGrnStockStatus(1);
									batchStockDtoObj
											.setTotalQuantity(goodReceiptNoteDto
													.getTotalItemQuantity());
									batchStockDtoObj.setMasterId(masterId);
									batchStockDtoObj.setItemMasterId(obj.getItemId());
									batchStockDtoObj.setUnitId(unitId);
									batchStockDtoObj.setCreatedBy(userId);
									batchStockDtoObj.setItemUOMName(obj.getItemUnitName());
									//setting this value to zero '0' to know against this perticular batch is used under any subinventory or not 
									batchStockDtoObj.setUpdatedBy(0);
									sessionFactory.getCurrentSession().merge(
											batchStockDtoObj);
								}
							}
							updateGoodReceiptNoteItemDto(obj.getId(),request);
						}
				}
				status = 1;
			} else if (callFrom == "OPENINGSTOCK") {
				
				HttpSession session = request.getSession();
				Integer unitId = (Integer) session.getAttribute("uId");
				Integer userId = (Integer)session.getAttribute("userId1");
				OpeningStockDto openingStockDto = (OpeningStockDto) sessionFactory
						.getCurrentSession().get(OpeningStockDto.class,
								masterId);
				String sql = "";
				for (OpeningStockItemSlaveDto obj : openingStockDto
						.getLstOpeningStockItemSlaveDto()) {
					List<BatchStockDto> batchStockDtos = null;
					if (obj != null && obj.getDeleted().equalsIgnoreCase("N")) {
						Date d2 = obj.getBatchMasterDto().getItemBatchExpDate();
						DateFormat dateFormat = new SimpleDateFormat(
								"yyyy-MM-dd");
						String strOpeningItemSlave = dateFormat.format(d2);
						sql = "SELECT * FROM inv_batch_stock_new as ibs where  ibs.item_master_id="
								+ obj.getItem_master_id()
								+ " and ibs.item_batch_code='"
								+ obj.getBatchMasterDto().getItemBatchCode()
								+ "' and (Date_Format(ibs.item_batch_exp_date,'%Y-%m-%d'))='"
								+ strOpeningItemSlave
								+ "' and ibs.deleted='N' order by  ibs.id desc";
						SQLQuery getMaster = sessionFactory.getCurrentSession()
								.createSQLQuery(sql);
						getMaster
								.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						batchStockDtos = getMaster.list();
						Integer total = 0;
						if (batchStockDtos.size() > 0) {
							for (int i = 0; i < batchStockDtos.size(); i++) {
								Map map = new HashMap();
								map = (Map) batchStockDtos.get(i);
								String batchCode = (String) map
										.get("item_batch_code");
								Date batchExpDate = (Date) map
										.get("item_batch_exp_date");
								DateFormat dateFormatBatchStock = new SimpleDateFormat(
										"yyyy-MM-dd");
								String strOpeningBatchStock = dateFormatBatchStock
										.format(batchExpDate);
								Integer itemMasterId = (Integer) map
										.get("item_master_id");
								Integer batchStockId = (Integer) map.get("id");
								if (batchCode
										.equalsIgnoreCase(obj.getBatchNo())
										&& strOpeningBatchStock
												.equalsIgnoreCase(strOpeningItemSlave)) {
									Criteria criteria = sessionFactory
											.getCurrentSession()
											.createCriteria(BatchStockDto.class);
									criteria.add(Restrictions.eq(
											"itemBatchCode", batchCode));
									criteria.add(Restrictions.eq(
											"itemBatchExpDate", batchExpDate));
									criteria.add(Restrictions.eq(
											"itemMasterId", itemMasterId));

									BatchStockDto bobj = (BatchStockDto) criteria
											.uniqueResult();
									Integer cuurentBatchStock = bobj
											.getItemQuantity();
									total = cuurentBatchStock
											+ obj.getItemQuantity();
									bobj.setItemQuantity(total);
									bobj.setCreatedBy(userId);
									bobj.setUnitId(unitId);
									bobj.setItemUOMName(obj.getUomUnitLatestFactorName());
									bobj.setOsStockStatus(1);
									sessionFactory.getCurrentSession().merge(
											bobj);
								} else {
									BatchStockDto batchStockDtoObj = new BatchStockDto();
									batchStockDtoObj.setBatchMasterId(obj
											.getBatchMasterDto().getId());
									batchStockDtoObj.setItemBatchCode(obj
											.getBatchMasterDto()
											.getItemBatchCode());
									batchStockDtoObj
											.setCurrentSubInventoryStock(0);
									batchStockDtoObj.setItemBatchExpDate(obj
											.getBatchMasterDto()
											.getItemBatchExpDate());
									batchStockDtoObj.setIssueQuantity(0);
									batchStockDtoObj.setItemName(obj
											.getItemName());
									batchStockDtoObj.setItemQuantity(obj
											.getItemQuantity());
									batchStockDtoObj
											.setStockFrom("OPENINGSTOCK");
									//batchStockDtoObj.setOsStockStatus(1);
									batchStockDtoObj
											.setTotalQuantity(goodReceiptNoteDto
													.getTotalItemQuantity());
									batchStockDtoObj.setMasterId(masterId);
									batchStockDtoObj.setItemMasterId(obj
											.getItem_master_id());
									batchStockDtoObj.setUnitId(unitId);
									batchStockDtoObj.setCreatedBy(userId);
									batchStockDtoObj.setItemUOMName(obj.getUomUnitLatestFactorName());
									//setting this value to zero '0' to know against this perticuler batch is used under any subinventory or not 
									batchStockDtoObj.setUpdatedBy(0);
									batchStockDtoObj.setOsStockStatus(1);
									sessionFactory.getCurrentSession().merge(
											batchStockDtoObj);
								}
							}
						} else {
							BatchStockDto batchStockDtoObj = new BatchStockDto();
							batchStockDtoObj.setBatchMasterId(obj
									.getBatchMasterDto().getId());
							batchStockDtoObj.setItemBatchCode(obj
									.getBatchMasterDto().getItemBatchCode());
							batchStockDtoObj.setCurrentSubInventoryStock(0);
							batchStockDtoObj.setItemBatchExpDate(obj
									.getBatchMasterDto().getItemBatchExpDate());
							batchStockDtoObj.setIssueQuantity(0);
							batchStockDtoObj.setItemName(obj.getItemName());
							batchStockDtoObj.setItemQuantity(obj
									.getItemQuantity());
							batchStockDtoObj.setStockFrom("OPENINGSTOCK");
							batchStockDtoObj.setOsStockStatus(1);
							batchStockDtoObj
									.setTotalQuantity(goodReceiptNoteDto
											.getTotalItemQuantity());
							batchStockDtoObj.setMasterId(masterId);
							batchStockDtoObj.setItemMasterId(obj
									.getItem_master_id());
							batchStockDtoObj.setUnitId(unitId);
							batchStockDtoObj.setCreatedBy(userId);
							batchStockDtoObj.setItemUOMName(obj.getUomUnitLatestFactorName());
							//setting this value to zero '0' to know against this perticular batch is used under any subinventory or not 
							batchStockDtoObj.setUpdatedBy(0);
							sessionFactory.getCurrentSession().merge(
									batchStockDtoObj);
						}
					}
				}
				status = 1;

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			log.error("error for saveBatchStockMaster...." + e.getMessage());
			return 0;
		}
		return status;
	}

	@Override
	public Integer getPageCountAllGRNMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		Integer countNew = 0;
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql = "";
			sql = "SELECT count(*) FROM inv_good_receipt_note as grn WHERE deleted != 'Y' and unit_id="
					+ unitId;
			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			countNew = ((Number) countQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			log.error("error for getPageCountAllGRNMaster...." + e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}

	@Override
	public GoodReceiptNoteDto getGrnMasterPagination(Integer startIndex,String callFrom,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<GoodReceiptNoteDto> goodReceiptNoteDtoList = new ArrayList<GoodReceiptNoteDto>();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(GoodReceiptNoteDto.class);
			if(callFrom.equalsIgnoreCase("all")){
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("isPending", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
			}else if(callFrom.equalsIgnoreCase("DRAFT") ){
				
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isDraft", "DRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
			}else if(callFrom.equalsIgnoreCase("PENDING")){
				
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isPending", "Y"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
			}
			
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			goodReceiptNoteDtoList = criteria.list();
			goodReceiptNoteDto.setLstGoodReceiptNoteDto(goodReceiptNoteDtoList);

		} catch (Exception e) {
			log.error("error for getGrnMasterPagination...." + e.getMessage());
			e.printStackTrace();
		}
		return goodReceiptNoteDto;
	}

	@Override
	public int uploadGoodReceiptNoteDocument(String document,
			HttpServletRequest request) {
		int res = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			GoodReceiptNoteDocUploadDto goodReceiptNoteDocUploadDto = (GoodReceiptNoteDocUploadDto) ConfigUIJSONUtility
					.getObjectFromJSON(document,
							GoodReceiptNoteDocUploadDto.class);
			GoodReceiptNoteDocUploadDto lstGoodReceiptNoteDocUploadDto = goodReceiptNoteDocUploadDto
					.getLstGoodReceiptNoteDocUploadDto().get(0);

			if (lstGoodReceiptNoteDocUploadDto.getId() == 0) {
				lstGoodReceiptNoteDocUploadDto.setCreatedBy(userId);
				lstGoodReceiptNoteDocUploadDto.setUnitId(unitId);
				lstGoodReceiptNoteDocUploadDto.setDeleted("N");
				sessionFactory.getCurrentSession().merge(
						lstGoodReceiptNoteDocUploadDto);
				res = 1;
			} else {
				lstGoodReceiptNoteDocUploadDto.setUpdatedBy(userId);
				lstGoodReceiptNoteDocUploadDto.setDeleted("N");
				lstGoodReceiptNoteDocUploadDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(
						lstGoodReceiptNoteDocUploadDto);
				res = 2;
			}
		} catch (Exception e) {
			log.error("error for uploadGoodReceiptNoteDocument...." + e.getMessage());
			e.printStackTrace();
			return res;
		}
		return res;
	}

	@Override
	public GoodReceiptNoteDocUploadDto getUploadedDocuments(
			Integer grnMasterId, HttpServletRequest request) {

		List<GoodReceiptNoteDocUploadDto> list = new ArrayList<GoodReceiptNoteDocUploadDto>();
		GoodReceiptNoteDocUploadDto goodReceiptNoteDocUploadDto = new GoodReceiptNoteDocUploadDto();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(GoodReceiptNoteDocUploadDto.class);
			criteria.add(Restrictions.eq("grnMasterId", grnMasterId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));

			criteria.addOrder(Order.desc("id"));
			list = criteria.list();
			if (list.size() > 0) {
				goodReceiptNoteDocUploadDto
						.setLstGoodReceiptNoteDocUploadDto(list);
			}
		} catch (Exception e) {
			log.error("error for getUploadedDocuments...." + e.getMessage());
			e.printStackTrace();
		}
		return goodReceiptNoteDocUploadDto;

	}

	@Override
	public boolean checkBatchInBatchMaster(String batchCode,
			Integer itemMasterId, Date itemBatchExpDate,
			HttpServletRequest request) {
			Integer countNew = 0;
			boolean isExist = false;
			try {
				HttpSession session = request.getSession();
				Integer unitId = (Integer) session.getAttribute("uId");
				Date d1 = itemBatchExpDate;
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String strGRNGoodIssueItemSlave = dateFormat.format(d1);
				String sql = "";
				sql = "SELECT count(*) FROM inv_batch_master WHERE (Date_Format(item_batch_exp_date,'%Y-%m-%d')) = '"+strGRNGoodIssueItemSlave+"' AND item_batch_code = '"+batchCode+"' AND item_master_id = "+itemMasterId+" AND deleted = 'N' and unit_id="
						+ unitId;
				SessionFactory f =  sessionFactory.getCurrentSession().getSessionFactory();
				
				Session newSession = f.openSession(); 
				Query countQuery = newSession.createSQLQuery(sql);
				System.out.println(strGRNGoodIssueItemSlave+"this is batch exist or not "+sql);
				countNew = ((Number) countQuery.uniqueResult()).intValue();
				newSession.clear();
				newSession.close();
				if(countNew > 0){
					isExist = true;
				}else{
					isExist = false;
				}
			} catch (Exception e) {
				log.error("error for checkBatchInBatchMaster...." + e.getMessage());
				e.printStackTrace();
			}
			return isExist;
		}

	@Override
	public BatchMasterDto getBatchMaster(String batchCode,
			Integer itemMasterId, Date itemBatchExpDate,
			HttpServletRequest request) {
		try {
			
			List<BatchMasterDto> batchMasterDtos = new ArrayList<BatchMasterDto>();
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Date d1 = itemBatchExpDate;
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String strGRNGoodIssueItemSlave = dateFormat.format(d1);
			String sql = "";
			sql = "SELECT * FROM inv_batch_master WHERE (Date_Format(item_batch_exp_date,'%Y-%m-%d')) = '"+strGRNGoodIssueItemSlave+"' AND item_batch_code = '"+batchCode+"' AND item_master_id = "+itemMasterId+" AND deleted = 'N' and unit_id="
					+ unitId;
			SessionFactory f =  sessionFactory.getCurrentSession().getSessionFactory();
			
			Session newSession = f.openSession(); 
			Query countQuery = newSession.createSQLQuery(sql);
			System.out.println(strGRNGoodIssueItemSlave+"this is batch exist or not "+sql);
			countQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> batchMasterDtoList = countQuery.list();
			for(Map<String, Object> row : batchMasterDtoList){
					BatchMasterDto dto = new BatchMasterDto();
					dto.setId((Integer) row.get("id"));
					dto.setItemBatchCode((String)row.get("item_batch_code"));
					dto.setItemBatchExpDate((Date)row.get("item_batch_exp_date"));
					dto.setItemMasterId((Integer) row.get("item_master_id"));
					dto.setUpdatedDateTime((Date)row.get("updated_date_time"));
					dto.setUpdatedBy((Integer) row.get("updated_by"));
					dto.setUnitId(unitId);
					batchMasterDtos.add(dto);
					dto = null;
				}
				batchMasterDto.setLstBatchMasterDto(batchMasterDtos);
			newSession.clear();
			newSession.close();
			
		} catch (Exception e) {
			log.error("error for getBatchMaster...." + e.getMessage());
			e.printStackTrace();
		}
		return batchMasterDto;
	}

	@Override
	public boolean deleteGoodReceiptNoteItem(Integer itemSlaveId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			GoodReceiptNoteItemDto obj=	(GoodReceiptNoteItemDto)sessionFactory.getCurrentSession().get(GoodReceiptNoteItemDto.class, itemSlaveId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
	}

	@Override
	public List<BatchStockDto> getGoodReceiptNoteItemBatchDetails(
			Integer itemMasterId, HttpServletRequest request) {
		List<BatchStockDto> batchStockDtos = new ArrayList<BatchStockDto>();
		String sql = "";
		try {
				sql = "SELECT bs.batch_master_id as id,bs.item_master_id as item_master_id, bs.item_name,bs.item_batch_code,bs.item_batch_exp_date,bs.item_quantity AS current_inv_stock FROM inv_batch_stock_new AS bs WHERE bs.item_master_id = "+itemMasterId+" GROUP BY bs.id";
				Query masterJoinQuery = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
				System.out.println("sql::"+sql);
				masterJoinQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listSubInvStockBatchWise = masterJoinQuery.list();
				for (Map<String, Object> row : listSubInvStockBatchWise) {
					BatchStockDto stockDto = new BatchStockDto();
					stockDto.setId((Integer) row.get("id"));
					stockDto.setItemMasterId((Integer) row.get("item_master_id"));
					stockDto.setItemName((String) row.get("item_name"));
					stockDto.setItemBatchCode((String) row.get("item_batch_code"));
					stockDto.setItemBatchExpDate((Date) row
							.get("item_batch_exp_date"));
					stockDto.setItemQuantity((Integer) row.get("current_inv_stock"));
					batchStockDtos.add(stockDto);
					stockDto = null;
				}
			
			
			log.debug("reponse getGoodReceiptNoteItemBatchDetails....."+batchStockDtos);
		} catch (Exception e) {
			log.error("error for getGoodReceiptNoteItemBatchDetails...." + e.getMessage());
			e.printStackTrace();
		}
		return batchStockDtos;
}

	@Override
	public boolean updateGoodReceiptNoteItemDto(Integer grnItemSlaveId,
			HttpServletRequest request) {
		
		try {
			GoodReceiptNoteItemDto obj=	(GoodReceiptNoteItemDto)sessionFactory.getCurrentSession().get(GoodReceiptNoteItemDto.class, grnItemSlaveId);
			obj.setIsItemSlaveUsed("Y");
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
	}
	
	@Override
	public boolean deleteUploadedDocument(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			GoodReceiptNoteDocUploadDto goodReceiptNoteDocUploadDto = (GoodReceiptNoteDocUploadDto) sessionFactory.getCurrentSession().get(GoodReceiptNoteDocUploadDto.class, id);
			goodReceiptNoteDocUploadDto.setDeleted("Y");
			goodReceiptNoteDocUploadDto.setDeletedBy(userId);
			goodReceiptNoteDocUploadDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			 sessionFactory.getCurrentSession().update(goodReceiptNoteDocUploadDto);
			 return true;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return false;
		}
	}

}
