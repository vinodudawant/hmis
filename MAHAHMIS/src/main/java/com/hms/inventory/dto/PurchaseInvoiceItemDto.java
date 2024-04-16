package com.hms.inventory.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "inv_purchase_invoice_item_slave")
public class PurchaseInvoiceItemDto  implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "item_id")
	private Integer itemId;

	@Column(name = "item_name")
	private String itemName;

	@Column(name = "item_quantity")
	private Integer itemQuantity;
	
	@Column(name = "item_unit_price")
	private Integer itemUnitPrice;
	
	@Column(name = "item_discount_per")
	private Double itemDiscountPer;
	
	@Column(name = "item_discount_rs")
	private Double itemDiscountRs;
	
	@Column(name = "item_discount_amt")
	private Double itemDiscountAmt;
	
	@Column(name = "item_base_amt")
	private Double itemBaseAmt;
	
	@Column(name = "item_gst")
	private Double itemGst;
	
	@Column(name = "item_igst")
	private Double itemIgst;
	
	@Column(name = "item_gst_amt")
	private Double itemGstAmt;
	
	@Column(name = "item_total_amt")
	private Double itemTotalAmt;
	
	@Column(name = "item_factor1")
	private Integer itemFactor1;
	
	@Column(name = "item_factor2")
	private Integer itemFactor2;
	
	@Column(name = "item_factor3")
	private Integer itemFactor3;
	
	@Column(name = "item_factor4")
	private Integer itemFactor4;
	
	@Column(name = "item_received_qty")
	private Integer itemReceivedQty;
	
	@Column(name = "item_pending_qty")
	private Integer itemPendingQty;
	
	@Column(name = "item_bach_no")
	private String itemBatchNo;
	
	// this is added by vishnu for batchId  
	@Column(name = "batch_id", nullable = false, columnDefinition="int(11) default 0")
	private Integer batchId = 0;
	
	@Column(name = "hsn_name")
	private String hsnName;
	
	// this is added by vishnu for taxcode  
	@Column(name = "tax_code")
	private String taxCode;
			
	@Column(name = "item_manufacture_date")
	private String itemManufactureDate;
	
	@Column(name = "item_expire_date")
	private String itemExpireDate;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<PurchaseInvoiceItemDto> lstPurchaseInvoiceItemDto;
	
	/*@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "batch_id")
	private BatchMasterDto batchMasterDto;*/

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public Integer getItemId() {
		return itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public Integer getItemQuantity() {
		return itemQuantity;
	}

	public Integer getItemUnitPrice() {
		return itemUnitPrice;
	}

	public Double getItemDiscountPer() {
		return itemDiscountPer;
	}

	public Double getItemDiscountRs() {
		return itemDiscountRs;
	}

	public Double getItemDiscountAmt() {
		return itemDiscountAmt;
	}

	public Double getItemBaseAmt() {
		return itemBaseAmt;
	}

	public Double getItemGst() {
		return itemGst;
	}

	public Double getItemIgst() {
		return itemIgst;
	}

	public Double getItemGstAmt() {
		return itemGstAmt;
	}

	public Double getItemTotalAmt() {
		return itemTotalAmt;
	}

	public Integer getItemFactor1() {
		return itemFactor1;
	}

	public Integer getItemFactor2() {
		return itemFactor2;
	}

	public Integer getItemFactor3() {
		return itemFactor3;
	}

	public Integer getItemFactor4() {
		return itemFactor4;
	}

	public Integer getItemReceivedQty() {
		return itemReceivedQty;
	}

	public Integer getItemPendingQty() {
		return itemPendingQty;
	}

	public String getItemBatchNo() {
		return itemBatchNo;
	}

	public Integer getBatchId() {
		return batchId;
	}

	public String getHsnName() {
		return hsnName;
	}

	public String getTaxCode() {
		return taxCode;
	}

	public String getItemManufactureDate() {
		return itemManufactureDate;
	}

	public String getItemExpireDate() {
		return itemExpireDate;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public List<PurchaseInvoiceItemDto> getLstPurchaseInvoiceItemDto() {
		return lstPurchaseInvoiceItemDto;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public void setItemUnitPrice(Integer itemUnitPrice) {
		this.itemUnitPrice = itemUnitPrice;
	}

	public void setItemDiscountPer(Double itemDiscountPer) {
		this.itemDiscountPer = itemDiscountPer;
	}

	public void setItemDiscountRs(Double itemDiscountRs) {
		this.itemDiscountRs = itemDiscountRs;
	}

	public void setItemDiscountAmt(Double itemDiscountAmt) {
		this.itemDiscountAmt = itemDiscountAmt;
	}

	public void setItemBaseAmt(Double itemBaseAmt) {
		this.itemBaseAmt = itemBaseAmt;
	}

	public void setItemGst(Double itemGst) {
		this.itemGst = itemGst;
	}

	public void setItemIgst(Double itemIgst) {
		this.itemIgst = itemIgst;
	}

	public void setItemGstAmt(Double itemGstAmt) {
		this.itemGstAmt = itemGstAmt;
	}

	public void setItemTotalAmt(Double itemTotalAmt) {
		this.itemTotalAmt = itemTotalAmt;
	}

	public void setItemFactor1(Integer itemFactor1) {
		this.itemFactor1 = itemFactor1;
	}

	public void setItemFactor2(Integer itemFactor2) {
		this.itemFactor2 = itemFactor2;
	}

	public void setItemFactor3(Integer itemFactor3) {
		this.itemFactor3 = itemFactor3;
	}

	public void setItemFactor4(Integer itemFactor4) {
		this.itemFactor4 = itemFactor4;
	}

	public void setItemReceivedQty(Integer itemReceivedQty) {
		this.itemReceivedQty = itemReceivedQty;
	}

	public void setItemPendingQty(Integer itemPendingQty) {
		this.itemPendingQty = itemPendingQty;
	}

	public void setItemBatchNo(String itemBatchNo) {
		this.itemBatchNo = itemBatchNo;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public void setHsnName(String hsnName) {
		this.hsnName = hsnName;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	public void setItemManufactureDate(String itemManufactureDate) {
		this.itemManufactureDate = itemManufactureDate;
	}

	public void setItemExpireDate(String itemExpireDate) {
		this.itemExpireDate = itemExpireDate;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public void setLstPurchaseInvoiceItemDto(
			List<PurchaseInvoiceItemDto> lstPurchaseInvoiceItemDto) {
		this.lstPurchaseInvoiceItemDto = lstPurchaseInvoiceItemDto;
	}

	@Override
	public String toString() {
		return "PurchaseInvoiceItemDto [id=" + id + ", itemId=" + itemId
				+ ", itemName=" + itemName + ", itemQuantity=" + itemQuantity
				+ ", itemUnitPrice=" + itemUnitPrice + ", itemDiscountPer="
				+ itemDiscountPer + ", itemDiscountRs=" + itemDiscountRs
				+ ", itemDiscountAmt=" + itemDiscountAmt + ", itemBaseAmt="
				+ itemBaseAmt + ", itemGst=" + itemGst + ", itemIgst="
				+ itemIgst + ", itemGstAmt=" + itemGstAmt + ", itemTotalAmt="
				+ itemTotalAmt + ", itemFactor1=" + itemFactor1
				+ ", itemFactor2=" + itemFactor2 + ", itemFactor3="
				+ itemFactor3 + ", itemFactor4=" + itemFactor4
				+ ", itemReceivedQty=" + itemReceivedQty + ", itemPendingQty="
				+ itemPendingQty + ", itemBatchNo=" + itemBatchNo
				+ ", batchId=" + batchId + ", hsnName=" + hsnName
				+ ", taxCode=" + taxCode + ", itemManufactureDate="
				+ itemManufactureDate + ", itemExpireDate=" + itemExpireDate
				+ ", createdBy=" + createdBy + ", unitId=" + unitId
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deleted=" + deleted
				+ ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate
				+ ", lstPurchaseInvoiceItemDto=" + lstPurchaseInvoiceItemDto
				+ "]";
	}
	
	

}
