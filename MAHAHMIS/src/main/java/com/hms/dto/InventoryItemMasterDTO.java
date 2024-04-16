package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


public class InventoryItemMasterDTO {
	
	private Integer item_id;
	private String item_name;
	private String item_type;
	private String item_group;
	private String mfg_by_name;
	private String short_code;
	private String lead_time;
	private Integer min_stock;
	private Integer order_stock;
	private Integer max_stock;
	private String item_category;
	private String item_alias_name;
	private String status;
	private String item_serial_no_type;
	private String item_expire_validity; 
	private String item_other_info;
	private String item_remark;
	private Integer item_master_delete_flag;
	private String item_master_update;
	private String item_batch_No;
	private Integer item_purchase_item;
	private Integer item_Phantam_item;
	private Integer item_sale_item;
	private Integer item_assest_item;
	private Integer item_inventory_item;
	private Integer item_other_item;
	private String radioBtn;
	private Integer item_leadtimeNew;
	private String inv_item_show_in_scheduler;
	private String inv_immunizationr_item;
	private String inv_item_taxcode_and_rate;
	private String inv_item_criticality;
	private String inv_item_purchaseStrategy;
	private Integer inv_item_master_apply_unique_identification;
	private String hsn;
	private String imageFile;
	private String imageComment;
	private String  isLnL;

	public String getHsn() {
		return hsn;
	}
	public void setHsn(String hsn) {
		this.hsn = hsn;
	}
	private Integer party_id;
	private String checked_or_uncheked_flag;
	
	@JsonGetter("item_leadtimeNew")
	public Integer getItem_leadtimeNew() {
		return item_leadtimeNew;
	}
	@JsonSetter("item_leadtimeNew")
	public void setItem_leadtimeNew(Integer item_leadtimeNew) {
		this.item_leadtimeNew = item_leadtimeNew;
	}
	@JsonGetter("item_leadtimeselctor")
	public String getItem_leadtimeselctor() {
		return item_leadtimeselctor;
	}
	@JsonSetter("item_leadtimeselctor")
	public void setItem_leadtimeselctor(String item_leadtimeselctor) {
		this.item_leadtimeselctor = item_leadtimeselctor;
	}
	private String item_leadtimeselctor;

	private InventoryItemPurchaseDTO inventoryItemPurchaseDTO;
	private InventoryItemSaleDTO inventoryItemSaleDTO;
	private InventoryItemWareHouseDTO inventoryItemWareHouseDTO;
	private InventoryItemOtherDetailsDTO inventoryItemOtherDetailsDTO;
	private List<InventoryItemPartyDetailsDTO> inventoryItemPartyDetailsDTO;
	private List<InventoryItemMasterDTO> ltInventoryItemMasterDTOs;
	private InventoryitempurchaseandItemMasterDTO inventoryitempurchaseandItemMasterDTO;
	
	private List<InventoryItemUniqueIdendification> ltInventoryItemUniqueIdendifications;
	
	@JsonGetter("ltInventoryItemUniqueIdendifications")  
	public List<InventoryItemUniqueIdendification> getLtInventoryItemUniqueIdendifications() {
		return ltInventoryItemUniqueIdendifications;
	}
	@JsonSetter("ltInventoryItemUniqueIdendifications")
	public void setLtInventoryItemUniqueIdendifications(
			List<InventoryItemUniqueIdendification> ltInventoryItemUniqueIdendifications) {
		this.ltInventoryItemUniqueIdendifications = ltInventoryItemUniqueIdendifications;
	}
	
	public InventoryitempurchaseandItemMasterDTO getInventoryitempurchaseandItemMasterDTO() {
		return inventoryitempurchaseandItemMasterDTO;
	}
	public void setInventoryitempurchaseandItemMasterDTO(
			InventoryitempurchaseandItemMasterDTO inventoryitempurchaseandItemMasterDTO) {
		this.inventoryitempurchaseandItemMasterDTO = inventoryitempurchaseandItemMasterDTO;
	}
	@JsonGetter("order_stock")
	public Integer getOrder_stock() {
		return order_stock;
	}
	@JsonSetter("order_stock")
	public void setOrder_stock(Integer order_stock) {
		this.order_stock = order_stock;
	}
	
	@JsonGetter("item_id")
	public Integer getItem_id() {
		return item_id;
	}
	@JsonSetter("item_id")
	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}
	@JsonGetter("item_name")
	public String getItem_name() {
		return item_name;
	}
	@JsonSetter("item_name")
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	@JsonGetter("radioBtn")
	public String getRadioBtn() {
		return radioBtn;
	}
	@JsonSetter("radioBtn")
	public void setRadioBtn(String radioBtn) {
		this.radioBtn = radioBtn;
	}
	
	@JsonGetter("item_type")
	public String getItem_type() {
		return item_type;
	}
	@JsonSetter("item_type")
	public void setItem_type(String item_type) {
		this.item_type = item_type;
	}
	@JsonGetter("item_group")
	public String getItem_group() {
		return item_group;
	}
	@JsonSetter("item_group")
	public void setItem_group(String item_group) {
		this.item_group = item_group;
	}
	@JsonGetter("mfg_by_name")
	public String getMfg_by_name() {
		return mfg_by_name;
	}
	@JsonSetter("mfg_by_name")
	public void setMfg_by_name(String mfg_by_name) {
		this.mfg_by_name = mfg_by_name;
	}
	@JsonGetter("short_code")
	public String getShort_code() {
		return short_code;
	}
	@JsonSetter("short_code")
	public void setShort_code(String short_code) {
		this.short_code = short_code;
	}
	@JsonGetter("lead_time")
	public String getLead_time() {
		return lead_time;
	}
	@JsonSetter("lead_time")
	public void setLead_time(String lead_time) {
		this.lead_time = lead_time;
	}
	@JsonGetter("min_stock")
	public Integer getMin_stock() {
		return min_stock;
	}
	@JsonSetter("min_stock")
	public void setMin_stock(Integer min_stock) {
		this.min_stock = min_stock;
	}

	@JsonGetter("item_category")
	public String getItem_category() {
		return item_category;
	}
	@JsonSetter("item_category")
	public void setItem_category(String item_category) {
		this.item_category = item_category;
	}
	@JsonGetter("item_alias_name")
	public String getItem_alias_name() {
		return item_alias_name;
	}
	@JsonSetter("item_alias_name")
	public void setItem_alias_name(String item_alias_name) {
		this.item_alias_name = item_alias_name;
	}
	@JsonGetter("item_serial_no_type")
	public String getItem_serial_no_type() {
		return item_serial_no_type;
	}
	@JsonSetter("item_serial_no_type")
	public void setItem_serial_no_type(String item_serial_no_type) {
		this.item_serial_no_type = item_serial_no_type;
	}
	@JsonGetter("item_expire_validity")
	public String getItem_expire_validity() {
		return item_expire_validity;
	}
	@JsonSetter("item_expire_validity")
	public void setItem_expire_validity(String item_expire_validity) {
		this.item_expire_validity = item_expire_validity;
	}
	@JsonGetter("item_other_info")
	public String getItem_other_info() {
		return item_other_info;
	}
	@JsonSetter("item_other_info")
	public void setItem_other_info(String item_other_info) {
		this.item_other_info = item_other_info;
	}
	@JsonGetter("item_remark")
	public String getItem_remark() {
		return item_remark;
	}
	@JsonSetter("item_remark")
	public void setItem_remark(String item_remark) {
		this.item_remark = item_remark;
	}
	@JsonGetter("item_master_delete_flag")
	public Integer getItem_master_delete_flag() {
		return item_master_delete_flag;
	}
	@JsonSetter("item_master_delete_flag")
	public void setItem_master_delete_flag(Integer item_master_delete_flag) {
		this.item_master_delete_flag = item_master_delete_flag;
	}
	@JsonGetter("item_master_update")
	public String getItem_master_update() {
		return item_master_update;
	}
	@JsonSetter("item_master_update")
	public void setItem_master_update(String item_master_update) {
		this.item_master_update = item_master_update;
	}
	@JsonGetter("max_stock")
	public Integer getMax_stock() {
		return max_stock;
	}
	@JsonSetter("max_stock")
	public void setMax_stock(Integer max_stock) {
		this.max_stock = max_stock;
	}
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	public InventoryItemPurchaseDTO getInventoryItemPurchaseDTO() {
		return inventoryItemPurchaseDTO;
	}
	public void setInventoryItemPurchaseDTO(
			InventoryItemPurchaseDTO inventoryItemPurchaseDTO) {
		this.inventoryItemPurchaseDTO = inventoryItemPurchaseDTO;
	}
	public InventoryItemSaleDTO getInventoryItemSaleDTO() {
		return inventoryItemSaleDTO;
	}
	public void setInventoryItemSaleDTO(InventoryItemSaleDTO inventoryItemSaleDTO) {
		this.inventoryItemSaleDTO = inventoryItemSaleDTO;
	}

	@JsonGetter("inventoryItemWareHouseDTO")
	public InventoryItemWareHouseDTO getInventoryItemWareHouseDTO() {
		return inventoryItemWareHouseDTO;
	}
	@JsonSetter("inventoryItemWareHouseDTO")
	public void setInventoryItemWareHouseDTO(
			InventoryItemWareHouseDTO inventoryItemWareHouseDTO) {
		this.inventoryItemWareHouseDTO = inventoryItemWareHouseDTO;
	}
	
	public InventoryItemOtherDetailsDTO getInventoryItemOtherDetailsDTO() {
		return inventoryItemOtherDetailsDTO;
	}
	public void setInventoryItemOtherDetailsDTO(
			InventoryItemOtherDetailsDTO inventoryItemOtherDetailsDTO) {
		this.inventoryItemOtherDetailsDTO = inventoryItemOtherDetailsDTO;
	}
	@JsonGetter("item_batch_No")
	public String getItem_batch_No() {
		return item_batch_No;
	}
	@JsonSetter("item_batch_No")
	public void setItem_batch_No(String item_batch_No) {
		this.item_batch_No = item_batch_No;
	}
	@JsonGetter("item_purchase_item")
	public Integer getItem_purchase_item() {
		return item_purchase_item;
	}
	@JsonSetter("item_purchase_item")
	public void setItem_purchase_item(Integer item_purchase_item) {
		this.item_purchase_item = item_purchase_item;
	}
	@JsonGetter("item_Phantam_item")
	public Integer getItem_Phantam_item() {
		return item_Phantam_item;
	}
	@JsonSetter("item_Phantam_item")
	public void setItem_Phantam_item(Integer item_Phantam_item) {
		this.item_Phantam_item = item_Phantam_item;
	}
	@JsonGetter("item_sale_item")
	public Integer getItem_sale_item() {
		return item_sale_item;
	};
	@JsonSetter("item_sale_item")
	public void setItem_sale_item(Integer item_sale_item) {
		this.item_sale_item = item_sale_item;
	}
	@JsonGetter("item_assest_item")
	public Integer getItem_assest_item() {
		return item_assest_item;
	}
	@JsonSetter("item_assest_item")
	public void setItem_assest_item(Integer item_assest_item) {
		this.item_assest_item = item_assest_item;
	}
	@JsonGetter("item_inventory_item")
	public Integer getItem_inventory_item() {
		return item_inventory_item;
	}
	@JsonSetter("item_inventory_item")
	public void setItem_inventory_item(Integer item_inventory_item) {
		this.item_inventory_item = item_inventory_item;
	}
	@JsonGetter("item_other_item")
	public Integer getItem_other_item() {
		return item_other_item;
	}
	@JsonSetter("item_other_item")
	public void setItem_other_item(Integer item_other_item) {
		this.item_other_item = item_other_item;
	}
	public List<InventoryItemPartyDetailsDTO> getInventoryItemPartyDetailsDTO() {
		return inventoryItemPartyDetailsDTO;
	}
	public void setInventoryItemPartyDetailsDTO(
			List<InventoryItemPartyDetailsDTO> inventoryItemPartyDetailsDTO) {
		this.inventoryItemPartyDetailsDTO = inventoryItemPartyDetailsDTO;
	}
	public List<InventoryItemMasterDTO> getLtInventoryItemMasterDTOs() {
		return ltInventoryItemMasterDTOs;
	}
	public void setLtInventoryItemMasterDTOs(
			List<InventoryItemMasterDTO> ltInventoryItemMasterDTOs) {
		this.ltInventoryItemMasterDTOs = ltInventoryItemMasterDTOs;
	}
	@JsonGetter("inv_item_show_in_scheduler")
	public String getInv_item_show_in_scheduler() {
		return inv_item_show_in_scheduler;
	}
	@JsonSetter("inv_item_show_in_scheduler")
	public void setInv_item_show_in_scheduler(String inv_item_show_in_scheduler) {
		this.inv_item_show_in_scheduler = inv_item_show_in_scheduler;
	}
	@JsonGetter("inv_immunizationr_item")
	public String getInv_immunizationr_item() {
		return inv_immunizationr_item;
	}
	@JsonSetter("inv_immunizationr_item")
	public void setInv_immunizationr_item(String inv_immunizationr_item) {
		this.inv_immunizationr_item = inv_immunizationr_item;
	}
	@JsonGetter("party_id")
	public Integer getParty_id() {
		return party_id;
	}
	@JsonSetter("party_id")
	public void setParty_id(Integer party_id) {
		this.party_id = party_id;
	}
	@JsonGetter("inv_item_taxcode_and_rate")
	public String getInv_item_taxcode_and_rate() {
		return inv_item_taxcode_and_rate;
	}
	@JsonSetter("inv_item_taxcode_and_rate")
	public void setInv_item_taxcode_and_rate(String inv_item_taxcode_and_rate) {
		this.inv_item_taxcode_and_rate = inv_item_taxcode_and_rate;
	}
	@JsonGetter("inv_item_criticality")
	public String getInv_item_criticality() {
		return inv_item_criticality;
	}
	
	@JsonSetter("inv_item_criticality")
	public void setInv_item_criticality(String inv_item_criticality) {
		this.inv_item_criticality = inv_item_criticality;
	}
	@JsonGetter("inv_item_purchaseStrategy")
	public String getInv_item_purchaseStrategy() {
		return inv_item_purchaseStrategy;
	}
	@JsonSetter("inv_item_purchaseStrategy")
	public void setInv_item_purchaseStrategy(String inv_item_purchaseStrategy) {
		this.inv_item_purchaseStrategy = inv_item_purchaseStrategy;
	}
	@JsonGetter("checked_or_uncheked_flag")
	public String getChecked_or_uncheked_flag() {
		return checked_or_uncheked_flag;
	}
	@JsonSetter("checked_or_uncheked_flag")
	public void setChecked_or_uncheked_flag(String checked_or_uncheked_flag) {
		this.checked_or_uncheked_flag = checked_or_uncheked_flag;
	}
	 
	@JsonGetter("inv_item_master_apply_unique_identification")
	public Integer getInv_item_master_apply_unique_identification() {
		return inv_item_master_apply_unique_identification;
	}
	@JsonSetter("inv_item_master_apply_unique_identification")
	public void setInv_item_master_apply_unique_identification(
			Integer inv_item_master_apply_unique_identification) {
		this.inv_item_master_apply_unique_identification = inv_item_master_apply_unique_identification;
	}
	
	@JsonGetter("image_file")
	public String getImageFile() {
		return imageFile;
	}
	
	@JsonSetter("image_file")
	public void setImageFile(String imageFile) {
		this.imageFile = imageFile;
	}
	
	@JsonGetter("image_comment")
	public String getImageComment() {
		return imageComment;
	}
	@JsonSetter("image_comment")
	public void setImageComment(String imageComment) {
		this.imageComment = imageComment;
	}
	public String getIsLnL() {
		return isLnL;
	}
	public void setIsLnL(String isLnL) {
		this.isLnL = isLnL;
	}
	
}
