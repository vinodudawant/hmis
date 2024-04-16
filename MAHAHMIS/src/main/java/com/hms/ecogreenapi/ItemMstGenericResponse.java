package com.hms.ecogreenapi;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemMstGenericResponse {

	@JsonProperty("item_code")
	private String itemCode;

	@JsonProperty("item_name")
	private String itemName;

	@JsonProperty("item_sh_name")
	private String itemShortName;

	@JsonProperty("item_qty_box")
	private String itemQtyBox;

	@JsonProperty("item_ldate")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date itemLastModifiedDate;

	@JsonProperty("item_ltime")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
	private Date itemLastModifiedTime;

	@JsonProperty("item_lock_flag")
	private String itemLockFlag;

	@JsonProperty("pack_code")
	private String packCode;

	@JsonProperty("pack_name")
	private String packName;

	@JsonProperty("item_cat_code")
	private String itemCategoryCode;

	@JsonProperty("item_cat_name")
	private String itemCategoryName;

	@JsonProperty("mfac_code")
	private String manufacturerCode;

	@JsonProperty("mfac_name")
	private String manufacturerName;

	@JsonProperty("item_grp_code")
	private String itemGrpCode;

	@JsonProperty("item_grp_name")
	private String itemGrpName;

	@JsonProperty("cont_code")
	private String contCode;

	@JsonProperty("cont_name")
	private String contName;

	@JsonProperty("dis_cat_code")
	private String discountCategoryCode;

	@JsonProperty("dis_cat_name")
	private String discountCategoryName;

	@JsonProperty("pack_type_code")
	private String packTypeCode;

	@JsonProperty("pack_type_name")
	private String packTypeName;

	@JsonProperty("schdule_code")
	private String scheduleCode;

	@JsonProperty("schdule_name")
	private String scheduleName;

	@JsonProperty("brand_code")
	private String brandCode;

	@JsonProperty("brand_name")
	private String brandName;

	@JsonProperty("storage_code")
	private String storageCode;

	@JsonProperty("storage_name")
	private String storageName;

	@JsonProperty("storage_cat_code")
	private String storageCategoryCode;

	@JsonProperty("storage_cat_name")
	private String storageCategoryName;

	@JsonProperty("item_type_code")
	private String itemTypeCode;

	@JsonProperty("item_type_name")
	private String itemTypeName;

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemShortName() {
		return itemShortName;
	}

	public void setItemShortName(String itemShortName) {
		this.itemShortName = itemShortName;
	}

	public String getItemQtyBox() {
		return itemQtyBox;
	}

	public void setItemQtyBox(String itemQtyBox) {
		this.itemQtyBox = itemQtyBox;
	}

	public Date getItemLastModifiedDate() {
		return itemLastModifiedDate;
	}

	public void setItemLastModifiedDate(Date itemLastModifiedDate) {
		this.itemLastModifiedDate = itemLastModifiedDate;
	}

	public Date getItemLastModifiedTime() {
		return itemLastModifiedTime;
	}

	public void setItemLastModifiedTime(Date itemLastModifiedTime) {
		this.itemLastModifiedTime = itemLastModifiedTime;
	}

	public String getItemLockFlag() {
		return itemLockFlag;
	}

	public void setItemLockFlag(String itemLockFlag) {
		this.itemLockFlag = itemLockFlag;
	}

	public String getPackCode() {
		return packCode;
	}

	public void setPackCode(String packCode) {
		this.packCode = packCode;
	}

	public String getPackName() {
		return packName;
	}

	public void setPackName(String packName) {
		this.packName = packName;
	}

	public String getItemCategoryCode() {
		return itemCategoryCode;
	}

	public void setItemCategoryCode(String itemCategoryCode) {
		this.itemCategoryCode = itemCategoryCode;
	}

	public String getItemCategoryName() {
		return itemCategoryName;
	}

	public void setItemCategoryName(String itemCategoryName) {
		this.itemCategoryName = itemCategoryName;
	}

	public String getManufacturerCode() {
		return manufacturerCode;
	}

	public void setManufacturerCode(String manufacturerCode) {
		this.manufacturerCode = manufacturerCode;
	}

	public String getManufacturerName() {
		return manufacturerName;
	}

	public void setManufacturerName(String manufacturerName) {
		this.manufacturerName = manufacturerName;
	}

	public String getItemGrpCode() {
		return itemGrpCode;
	}

	public void setItemGrpCode(String itemGrpCode) {
		this.itemGrpCode = itemGrpCode;
	}

	public String getItemGrpName() {
		return itemGrpName;
	}

	public void setItemGrpName(String itemGrpName) {
		this.itemGrpName = itemGrpName;
	}

	public String getContCode() {
		return contCode;
	}

	public void setContCode(String contCode) {
		this.contCode = contCode;
	}

	public String getContName() {
		return contName;
	}

	public void setContName(String contName) {
		this.contName = contName;
	}

	public String getDiscountCategoryCode() {
		return discountCategoryCode;
	}

	public void setDiscountCategoryCode(String discountCategoryCode) {
		this.discountCategoryCode = discountCategoryCode;
	}

	public String getDiscountCategoryName() {
		return discountCategoryName;
	}

	public void setDiscountCategoryName(String discountCategoryName) {
		this.discountCategoryName = discountCategoryName;
	}

	public String getPackTypeCode() {
		return packTypeCode;
	}

	public void setPackTypeCode(String packTypeCode) {
		this.packTypeCode = packTypeCode;
	}

	public String getPackTypeName() {
		return packTypeName;
	}

	public void setPackTypeName(String packTypeName) {
		this.packTypeName = packTypeName;
	}

	public String getScheduleCode() {
		return scheduleCode;
	}

	public void setScheduleCode(String scheduleCode) {
		this.scheduleCode = scheduleCode;
	}

	public String getScheduleName() {
		return scheduleName;
	}

	public void setScheduleName(String scheduleName) {
		this.scheduleName = scheduleName;
	}

	public String getBrandCode() {
		return brandCode;
	}

	public void setBrandCode(String brandCode) {
		this.brandCode = brandCode;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getStorageCode() {
		return storageCode;
	}

	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	public String getStorageCategoryCode() {
		return storageCategoryCode;
	}

	public void setStorageCategoryCode(String storageCategoryCode) {
		this.storageCategoryCode = storageCategoryCode;
	}

	public String getStorageCategoryName() {
		return storageCategoryName;
	}

	public void setStorageCategoryName(String storageCategoryName) {
		this.storageCategoryName = storageCategoryName;
	}

	public String getItemTypeCode() {
		return itemTypeCode;
	}

	public void setItemTypeCode(String itemTypeCode) {
		this.itemTypeCode = itemTypeCode;
	}

	public String getItemTypeName() {
		return itemTypeName;
	}

	public void setItemTypeName(String itemTypeName) {
		this.itemTypeName = itemTypeName;
	}
}
