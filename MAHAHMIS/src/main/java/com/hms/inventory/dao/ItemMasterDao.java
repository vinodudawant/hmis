package com.hms.inventory.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.hms.inventory.dto.InventoryTaxSetUpMDTO;
import com.hms.inventory.dto.ItemContractSlaveDto;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.ItemPartySlaveDto;
import com.hms.inventory.dto.ItemPurchaseSlaveDto;
import com.hms.inventory.dto.ItemSalesSlaveDto;
import com.hms.inventory.dto.ItemWarehouseSlaveDto;
import com.hms.inventory.dto.PartyMasterDto;

public interface ItemMasterDao {

	//Item master and all slave save service
		int saveItemWarehouseMaster(ItemMasterDto itemMasterDto,ItemWarehouseSlaveDto itemWarehouseSlaveDto,
				String itemPurchaseDetails,String itemSalesDetails,String itemPartyDetails,ItemMaintenanceSlaveDto itemMaintenanceSlaveDto,String itemContractDetails,Model model,HttpServletRequest request);

		//item purchase slave get all records
		public List<ItemPurchaseSlaveDto> getItemPurchaseMasterRecords(Integer masterId,HttpServletRequest request);

		//to set the item purchase slave 
		public ItemPurchaseSlaveDto editItemPurchaseSlave(Integer id,HttpServletRequest request);

		//to update item purchase slave
		public int updateItemPurchaseSlave(ItemPurchaseSlaveDto itemPurchaseSlaveDto,HttpServletRequest request);

		//item sales slave get all records
		public List<ItemSalesSlaveDto> getItemSalesSlaveRecords(Integer masterId,HttpServletRequest request);
		
		//item master get all records
		public List<ItemMasterDto> getAllItemMasterRecords(Integer unitId,HttpServletRequest request);
		
		//item Master search by item name
		public List<ItemMasterDto> searchByItemName(String itemName,HttpServletRequest request);
		
		//edit item master
		public ItemMasterDto editItemMaster(Integer id,HttpServletRequest request);
		
		//to set the item sales slave record
		public ItemSalesSlaveDto editItemSalesSlave(Integer id,HttpServletRequest request);
		
		//to update item sales slave record
		public int updateItemSalesSlave(ItemSalesSlaveDto itemSalesSlaveDto,HttpServletRequest request);
		
		//party slave auto fill search
		public PartyMasterDto autoSuggestionsOnPartyMasterName(String partyName,HttpServletRequest request);

		//get the next id of respective table
		public int getNextIdNew(String tableName,HttpServletRequest request);
		
		//item master auto fill search
		public ItemMasterDto autoFillSearchItemMaster(String itemName,String searchAssetOrServiceItem,HttpServletRequest request);
		
		//item master search by ID
		public List<ItemMasterDto> searchByItemMasterId(Integer id,HttpServletRequest request);
		
		//get item warehouse slave details by master id
		public ItemWarehouseSlaveDto getItemWarehouseSlaveRecord(Integer masterId,HttpServletRequest request);
		
		//financial master delete records
		public boolean deleteItemMasterNew(Integer id, HttpServletRequest request);
		
		//get item party slave details by master id
		public List<ItemPartySlaveDto> getItemPartySlaveRecord(Integer masterId,HttpServletRequest request);
		
		//warehouse auto fill search
		public PartyMasterDto autoFillSearchOnPartyMaster(String supplierName,HttpServletRequest request);
		
		//party master search by ID
		public PartyMasterDto searchByPartyMasterId(Integer id,HttpServletRequest request);
		
		//to load all HSN list 
		List<InventoryTaxSetUpMDTO> getAllHSNList(HttpServletRequest request);
		
		//to get HSN details
		public InventoryTaxSetUpMDTO getHSNDetails(Integer hsnId,Integer unitId,HttpServletRequest request);
		
		//to set the item party slave 
		public ItemPartySlaveDto editItemPartySlave(Integer id,HttpServletRequest request);
		
		//to update item party slave
		public int updateItemPartySlave(ItemPartySlaveDto itemPartySlaveDto,HttpServletRequest request);
		
		public Integer getPageCountAllItemMaster(HttpServletRequest request);
		
		public ItemMasterDto getItemMasterPagination(Integer startIndex,HttpServletRequest request);
		
		//get item contract slave details by master id
		public List<ItemContractSlaveDto> getItemContractSlaveRecord(Integer masterId);
		
		//get item maintenance slave details by master id
		public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(Integer masterId);
		
		//to upload the contract related document
		public Integer updateContractDetailsSlave(Integer contractSlaveId,String uploadContractDocument);
		
		//item purchase slave delete records
		public boolean deleteItemPurchaseSlaveNew(Integer id,Integer itemMasterId, HttpServletRequest request);
}