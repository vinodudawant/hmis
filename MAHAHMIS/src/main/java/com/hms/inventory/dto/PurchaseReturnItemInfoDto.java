package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
@Entity
@Table(name = "inv_purchase_return_item_info")
@JsonDeserialize(as = PurchaseReturnItemInfoDto.class)
public class PurchaseReturnItemInfoDto {
	@Id
	@GeneratedValue
	@Column(name = "item_id")
	private Integer itemId;
	
	@Column(name = "inventory_item_id")
	private Integer inventoryItemId;

	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "item_quantity",columnDefinition="int(11) default 0")
	private Integer itemQuantity=0;
	
	@Column(name = "item_unit_price",columnDefinition="int(11) default 0")
	private Integer itemUnitPrice=0;
	
	@Column(name = "item_discount_per",columnDefinition="int(11) default 0")
	private Integer itemDiscountPer=0;
	
	@Column(name = "item_discount_rs",columnDefinition="int(11) default 0")
	private Integer itemDiscountRs=0;
	
	@Column(name = "item_discount_amt",columnDefinition="int(11) default 0")
	private Integer itemDiscountAmt=0;
	
	@Column(name = "item_base_amt",columnDefinition="int(11) default 0")
	private Integer itemBaseAmt=0;
	
	@Column(name = "item_gst",columnDefinition="int(11) default 0")
	private Integer itemGst=0;
	
	@Column(name = "item_igst",columnDefinition="int(11) default 0")
	private Integer itemIgst=0;
	
	@Column(name = "item_gst_amt",columnDefinition="int(11) default 0")
	private Integer itemGstAmt=0;
	
	@Column(name = "item_total_amt",columnDefinition="int(11) default 0")
	private Integer itemTotalAmt=0;
	
	@Column(name = "item_factor1",columnDefinition="int(11) default 0")
	private Integer itemFactor1=0;
	
	@Column(name = "item_factor2",columnDefinition="int(11) default 0")
	private Integer itemFactor2=0;
	
	@Column(name = "item_factor3",columnDefinition="int(11) default 0")
	private Integer itemFactor3=0;
	
	@Column(name = "item_factor4",columnDefinition="int(11) default 0")
	private Integer itemFactor4=0;
	
	@Column(name = "item_order_qty",columnDefinition="int(11) default 0")
	private Integer itemOrderQty=0;
	
	@Column(name = "item_pending_qty",columnDefinition="int(11) default 0")
	private Integer itemPendingQty=0;
	
	@Column(name = "item_expected_qty")
	private Integer itemExpectedQty;
	
	@Column(name = "item_received_qty")
	private Integer itemReceivedQty;
	
	@Column(name = "item_bach_no")
	private Integer itemBatchNo;//added by dayanand for batch id
	
	@Column(name = "item_manufacture_date")
	private String manufactureDate;
	
	/*@Column(name = "item_expiry_date")
	private String expiryDate;*/
	
	@Column(name = "item_expiry_date")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date expiryDate;
	
	@Column(name = "item_unit_name")
	private String itemUnitName;
	
	@Column(name = "hsn_name")//added by dayanand to for hsn Name
	private String hsnName;
	
	
	@Column(name = "item_master_id",columnDefinition="int(11) default 0")//added by dayanand for item id
	private Integer itemMasterId=0;
	
	
	@Column(name = "item_batch_code")//added by dayanand for batch code
	private String itembatchCode;
	
	
	@Column(name = "purchase_return_id",columnDefinition="int(11) default 0")//added by dayanand for item id
	private Integer purchaseReturnId=0;


	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	public Integer getPurchaseReturnId() {
		return purchaseReturnId;
	}

	public void setPurchaseReturnId(Integer purchaseReturnId) {
		this.purchaseReturnId = purchaseReturnId;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "igst_amount")
	private Double itemIGstAmt;
	
	 @Transient
	 private Integer availableQuantity;
	 
	 
	 
	
	 
	 public Integer getAvailableQuantity() {
		return availableQuantity;
	}



	public void setAvailableQuantity(Integer availableQuantity) {
		this.availableQuantity = availableQuantity;
	}



	public Integer getInventoryItemId() {
		return inventoryItemId;
	}

	public void setInventoryItemId(Integer inventoryItemId) {
		this.inventoryItemId = inventoryItemId;
	}

	public Integer getItemExpectedQty() {
		return itemExpectedQty;
	}

	public void setItemExpectedQty(Integer itemExpectedQty) {
		this.itemExpectedQty = itemExpectedQty;
	}

	public Integer getItemReceivedQty() {
		return itemReceivedQty;
	}

	public void setItemReceivedQty(Integer itemReceivedQty) {
		this.itemReceivedQty = itemReceivedQty;
	}

	public Double getItemIGstAmt() {
		return itemIGstAmt;
	}

	public void setItemIGstAmt(Double itemIGstAmt) {
		this.itemIGstAmt = itemIGstAmt;
	}

	@Transient
	private List<PurchaseReturnItemInfoDto> lstpurchasereturnitemInfoDto;

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public Integer getItemUnitPrice() {
		return itemUnitPrice;
	}

	public void setItemUnitPrice(Integer itemUnitPrice) {
		this.itemUnitPrice = itemUnitPrice;
	}

	public Integer getItemDiscountPer() {
		return itemDiscountPer;
	}

	public void setItemDiscountPer(Integer itemDiscountPer) {
		this.itemDiscountPer = itemDiscountPer;
	}

	public Integer getItemDiscountRs() {
		return itemDiscountRs;
	}

	public void setItemDiscountRs(Integer itemDiscountRs) {
		this.itemDiscountRs = itemDiscountRs;
	}

	public Integer getItemDiscountAmt() {
		return itemDiscountAmt;
	}

	public void setItemDiscountAmt(Integer itemDiscountAmt) {
		this.itemDiscountAmt = itemDiscountAmt;
	}

	public Integer getItemBaseAmt() {
		return itemBaseAmt;
	}

	public void setItemBaseAmt(Integer itemBaseAmt) {
		this.itemBaseAmt = itemBaseAmt;
	}

	public Integer getItemGst() {
		return itemGst;
	}

	public void setItemGst(Integer itemGst) {
		this.itemGst = itemGst;
	}

	public Integer getItemIgst() {
		return itemIgst;
	}

	public void setItemIgst(Integer itemIgst) {
		this.itemIgst = itemIgst;
	}

	public Integer getItemGstAmt() {
		return itemGstAmt;
	}

	public void setItemGstAmt(Integer itemGstAmt) {
		this.itemGstAmt = itemGstAmt;
	}

	public Integer getItemTotalAmt() {
		return itemTotalAmt;
	}

	public void setItemTotalAmt(Integer itemTotalAmt) {
		this.itemTotalAmt = itemTotalAmt;
	}

	public Integer getItemFactor1() {
		return itemFactor1;
	}

	public void setItemFactor1(Integer itemFactor1) {
		this.itemFactor1 = itemFactor1;
	}

	public Integer getItemFactor2() {
		return itemFactor2;
	}

	public void setItemFactor2(Integer itemFactor2) {
		this.itemFactor2 = itemFactor2;
	}

	public Integer getItemFactor3() {
		return itemFactor3;
	}

	public void setItemFactor3(Integer itemFactor3) {
		this.itemFactor3 = itemFactor3;
	}

	public Integer getItemFactor4() {
		return itemFactor4;
	}

	public void setItemFactor4(Integer itemFactor4) {
		this.itemFactor4 = itemFactor4;
	}

	public Integer getItemOrderQty() {
		return itemOrderQty;
	}

	public void setItemOrderQty(Integer itemOrderQty) {
		this.itemOrderQty = itemOrderQty;
	}

	public Integer getItemPendingQty() {
		return itemPendingQty;
	}

	public void setItemPendingQty(Integer itemPendingQty) {
		this.itemPendingQty = itemPendingQty;
	}

	public Integer getItemBatchNo() {
		return itemBatchNo;
	}

	public void setItemBatchNo(Integer itemBatchNo) {
		this.itemBatchNo = itemBatchNo;
	}

	public String getManufactureDate() {
		return manufactureDate;
	}

	public void setManufactureDate(String manufactureDate) {
		this.manufactureDate = manufactureDate;
	}

	
	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getItemUnitName() {
		return itemUnitName;
	}

	public void setItemUnitName(String itemUnitName) {
		this.itemUnitName = itemUnitName;
	}

	public String getHsnName() {
		return hsnName;
	}

	public void setHsnName(String hsnName) {
		this.hsnName = hsnName;
	}

	public Integer getItemMasterId() {
		return itemMasterId;
	}

	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}

	public String getItembatchCode() {
		return itembatchCode;
	}

	public void setItembatchCode(String itembatchCode) {
		this.itembatchCode = itembatchCode;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public List<PurchaseReturnItemInfoDto> getLstpurchasereturnitemInfoDto() {
		return lstpurchasereturnitemInfoDto;
	}

	public void setLstpurchasereturnitemInfoDto(
			List<PurchaseReturnItemInfoDto> lstpurchasereturnitemInfoDto) {
		this.lstpurchasereturnitemInfoDto = lstpurchasereturnitemInfoDto;
	}

	


}
