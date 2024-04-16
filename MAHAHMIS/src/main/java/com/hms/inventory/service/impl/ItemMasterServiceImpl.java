package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import com.hms.inventory.dao.ItemMasterDao;
import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.ItemContractSlaveDto;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.ItemPartySlaveDto;
import com.hms.inventory.dto.ItemPurchaseSlaveDto;
import com.hms.inventory.dto.ItemSalesSlaveDto;
import com.hms.inventory.dto.ItemWarehouseSlaveDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.service.ItemMasterService;

@Service
@Transactional
public class ItemMasterServiceImpl implements ItemMasterService{

	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	ItemMasterDao itemMasterDao;
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to save item master and slaves related to item master which are item purchase slave,
	 * item sales slave,item warehouse slave,item party slave
	 */
	@Override
	public int saveItemWarehouse(ItemMasterDto itemMasterDto,
			 ItemWarehouseSlaveDto itemWarehouseSlaveDto,
			String itemPurchaseDetails,String itemSalesDetails,String itemPartyDetails,ItemMaintenanceSlaveDto itemMaintenanceSlaveDto,String itemContractDetails,Model model,HttpServletRequest request) {
		int response;
		//save item master	
		response = itemMasterDao.saveItemWarehouseMaster(itemMasterDto,itemWarehouseSlaveDto,itemPurchaseDetails,itemSalesDetails,itemPartyDetails,itemMaintenanceSlaveDto,itemContractDetails,model,request);
		return response;
	}


	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item purchase records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemPurchaseSlaveDto> getItemPurchaseMasterRecords(Integer masterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return itemMasterDao.getItemPurchaseMasterRecords(masterId,request);
	}

	/**
	 * @since 13112019
	 * @comment This method is created for to edit the item purchase slave w.r.t id 
	 * @param id
	 * @author
	 * @return
	 */
	@Override
	public ItemPurchaseSlaveDto editItemPurchaseSlave(Integer id,HttpServletRequest request) {
		return itemMasterDao.editItemPurchaseSlave(id,request);
	}

	
	/**
	 * @since 13112019
	 * @comment This method is created for to update item purchase slave 
	 * @author Rohit Sandbhor
	 * @param itemPurchaseSlaveDto
	 * @param request
	 * @return
	 */
	@Override
	public int updateItemPurchaseSlave(
			ItemPurchaseSlaveDto itemPurchaseSlaveDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = itemMasterDao.updateItemPurchaseSlave(itemPurchaseSlaveDto,request);
		return response;
	}
	
	/**
	 * @since 13112019
	 * @comment This method is created to get item sales slaves w.r.t master id
	 * @author Rohit Sandbhor
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemSalesSlaveDto> getItemSalesSlaveRecords(Integer masterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return itemMasterDao.getItemSalesSlaveRecords(masterId,request);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get all item master records
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemMasterDto> getAllItemMasterRecords(
			HttpServletRequest request,Integer unitId) {
		return itemMasterDao.getAllItemMasterRecords(unitId,request);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created to get item master details by passing itemName as parameter
	 * @param itemName
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemMasterDto> searchByItemName(String itemName,
			HttpServletRequest request) {
		return itemMasterDao.searchByItemName(itemName,request);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for edit the Item master w.r.t id
	 * @param id
	 * @return
	 */
	@Override
	public ItemMasterDto editItemMaster(Integer id,HttpServletRequest request) {
		return itemMasterDao.editItemMaster(id,request);
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for edit the item sales slave records w.r.t id
	 * @param id
	 * @return
	 */
	@Override
	public ItemSalesSlaveDto editItemSalesSlave(Integer id,HttpServletRequest request) {
		return itemMasterDao.editItemSalesSlave(id,request);
	}
	
	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to update the item sales slave details
	 * @param itemSalesSlaveDto
	 * @param request
	 * @return
	 */
	@Override
	public int updateItemSalesSlave(
			ItemSalesSlaveDto itemSalesSlaveDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = itemMasterDao.updateItemSalesSlave(itemSalesSlaveDto,request);
		return response;
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get auto suggestion on party slave by party name
	 * @param partyName
	 * @return
	 */
	@Override
	public PartyMasterDto autoSuggestionsOnPartyMasterName(String partyName,HttpServletRequest request) {
		return itemMasterDao.autoSuggestionsOnPartyMasterName(partyName,request);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get the next item master id
	 * @param tableName
	 * @param request
	 * @return
	 */
	@Override
	public int getNextIdNew(String tableName,
			HttpServletRequest request) {
		return itemMasterDao.getNextIdNew(tableName, request);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get auto fill search on item master by passing item name as parameter
	 * @param itemName
	 * @return
	 */
	@Override
	public ItemMasterDto autoFillSearchItemMaster(String itemName,String searchAssetOrServiceItem,HttpServletRequest request) {
		return itemMasterDao.autoFillSearchItemMaster(itemName,searchAssetOrServiceItem,request);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment This method is created for to get the item master details w.r.t id
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemMasterDto> searchByItemMasterId(Integer id,
			HttpServletRequest request) {
		return itemMasterDao.searchByItemMasterId(id, request);
	}

	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item warehouse records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public ItemWarehouseSlaveDto getItemWarehouseSlaveRecord(Integer masterId,
			HttpServletRequest request) {
		return itemMasterDao.getItemWarehouseSlaveRecord(masterId,request);
	}

	/**
	 * @author Rohit Sandbhor
	 * @since 13112019
	 * @comment created this function to delete item master and his all related slaves
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	public boolean deleteItemMasterNew(Integer id, HttpServletRequest request) {
	return itemMasterDao.deleteItemMasterNew(id, request);
	}
	
	/**
	 * @since 13112019
	 * @author Rohit Sandbhor
	 * @comment This method is created for to get the all item party records w.r.t to master id
	 * @param masterId
	 * @param request
	 * @return
	 */
	@Override
	public List<ItemPartySlaveDto> getItemPartyDetailsByItemMasterId(
			Integer masterId, HttpServletRequest request) {
		return itemMasterDao.getItemPartySlaveRecord(masterId,request);
	}

	/**
	 * 
	 */
	@Override
	public PartyMasterDto autoFillSearchOnPartyMaster(String supplierName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return itemMasterDao.autoFillSearchOnPartyMaster(supplierName,request);
	}

	@Override
	public PartyMasterDto searchByPartyMasterId(Integer id,
			HttpServletRequest request) {
		return itemMasterDao.searchByPartyMasterId(id, request);
	}

	@Override
	public List<InventoryTaxSetUpMDTO> getAllHSNList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return itemMasterDao.getAllHSNList(request);
	}

	@Override
	public InventoryTaxSetUpMDTO getHSNDetails(Integer hsnId, Integer unitId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return itemMasterDao.getHSNDetails(hsnId, unitId,request);
	}
	
	/**
	 * @since 29-01-2020
	 * @comment This method is created for to edit the item party slave w.r.t id 
	 * @param id
	 * @author
	 * @return
	 */
	@Override
	public ItemPartySlaveDto editItemPartySlave(Integer id,HttpServletRequest request) {
		return itemMasterDao.editItemPartySlave(id,request);
	}


	@Override
	public int updateItemPartySlave(ItemPartySlaveDto itemPartySlaveDto,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = itemMasterDao.updateItemPartySlave(itemPartySlaveDto,request);
		return response;
	}


	@Override
	public Integer getPageCountAllItemMaster(HttpServletRequest request) {
		return itemMasterDao.getPageCountAllItemMaster(request);
	}


	@Override
	public ItemMasterDto getItemMasterPagination(Integer startIndex,HttpServletRequest request) {
		return itemMasterDao.getItemMasterPagination(startIndex,request);
	}
	
	@Override
	public List<ItemContractSlaveDto> getItemContractSlaveRecord(Integer masterId,HttpServletRequest request) {
		return itemMasterDao.getItemContractSlaveRecord(masterId);
	}


	@Override
	public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(
			Integer masterId, HttpServletRequest request) {
		return itemMasterDao.getMaintenanceDetailsByItemMasterId(masterId);
	}


	@Override
	public Integer updateContractDetailsSlave(Integer contractSlaveId,
			String uploadContractDocument) {
		return itemMasterDao.updateContractDetailsSlave(contractSlaveId, uploadContractDocument);
	}


	@Override
	public boolean deleteItemPurchaseSlaveNew(Integer id,Integer itemMasterId,
			HttpServletRequest request) {
		return itemMasterDao.deleteItemPurchaseSlaveNew(id,itemMasterId, request);
	}
	
}
