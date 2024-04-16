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


@Entity
@Table(name = "inv_purchase_quotation_item_info")
@JsonDeserialize(as = PurchaseQuotationIntemInfoDto.class)
public class PurchaseQuotationIntemInfoDto {
	@Id
	@GeneratedValue
	@Column(name = "item_id")
	private Integer itemId;

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
	
	@Column(name = "item_bach_no",columnDefinition="int(11) default 0")
	private Integer itemBatchNo=0;
	
	@Column(name = "item_unit_id",columnDefinition="int(11) default 0")
	private Integer itemUnitId=0;
	
	@Column(name = "item_unit_name")
	private String itemUnitName;
	
	@Column(name = "item_master_id",columnDefinition="int(11) default 0")
	private Integer itemMasterId=0;
	
	@Column(name = "hsn_Name")
	private String hsnName;
	
	@Column(name = "hsn_name_value")
	private String hsnNameValue;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

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
	
	@Column(name="item_total_gst_igst_amt")
	private Double itemBaseIgstGstAmt;// 27-2-2020 added by dayanand to save total base amount + total tax amount	
	

	@Column(name="item_igst_total_amt")
	private Double itemToatIgstAmt;// 27-2-2020 added by dayanand to save total base amount + total tax amount	
	
	public Double getItemBaseIgstGstAmt() {
		return itemBaseIgstGstAmt;
	}

	public void setItemBaseIgstGstAmt(Double itemBaseIgstGstAmt) {
		this.itemBaseIgstGstAmt = itemBaseIgstGstAmt;
	}

	public Double getItemToatIgstAmt() {
		return itemToatIgstAmt;
	}

	public void setItemToatIgstAmt(Double itemToatIgstAmt) {
		this.itemToatIgstAmt = itemToatIgstAmt;
	}

	@Transient
	private List<PurchaseQuotationIntemInfoDto> lstpurchaseitemInfoDto;

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

	public Integer getItemUnitId() {
		return itemUnitId;
	}

	public void setItemUnitId(Integer itemUnitId) {
		this.itemUnitId = itemUnitId;
	}

	public String getItemUnitName() {
		return itemUnitName;
	}

	public void setItemUnitName(String itemUnitName) {
		this.itemUnitName = itemUnitName;
	}

	public Integer getItemMasterId() {
		return itemMasterId;
	}

	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}

	public String getHsnName() {
		return hsnName;
	}

	public void setHsnName(String hsnName) {
		this.hsnName = hsnName;
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

	public List<PurchaseQuotationIntemInfoDto> getLstpurchaseitemInfoDto() {
		return lstpurchaseitemInfoDto;
	}

	public void setLstpurchaseitemInfoDto(
			List<PurchaseQuotationIntemInfoDto> lstpurchaseitemInfoDto) {
		this.lstpurchaseitemInfoDto = lstpurchaseitemInfoDto;
	}

	public String getHsnNameValue() {
		return hsnNameValue;
	}

	public void setHsnNameValue(String hsnNameValue) {
		this.hsnNameValue = hsnNameValue;
	}
	
	
	
	
	


}
