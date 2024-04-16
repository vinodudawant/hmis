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
@Entity
@Table(name="inv_process_po_item_info")
public class ProcessPurchaseOrderItemDTO {
	@Id
	@GeneratedValue
	@Column(name = "item_id")
	private Integer itemInfoId;


	@Column(name = "item_name")
	private String itemName;

	@Column(name = "item_qty")
	private Integer itemQty;
	
	@Column(name = "item_purchase_request_qty")
	private Integer itempurchaserequestQty;
		
	@Column(name = "item_purchase_processed_qty")
	private Integer itemprocessedQty;
	
	@Column(name = "item_purchase_type")
	private String purchaseType;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "supplier_id")
	private Integer supplierId;
	
	@Column(name = "supplier_name")
	private String supplierName;
	
	@Column(name = "item_unit_price")
	private Double itemUnitPrice;
	
	@Column(name = "item_discount_percentage")
	private Double itemDiscountPerc;
	
	@Column(name = "item_discount_rs")
	private Double itemDiscountRs;
	
	@Column(name = "item_discount_amt")
	private Double itemDiscountAmt;
	
	@Column(name = "item_base_amt")
	private Double itemBaseAmt;
	
	@Column(name = "item_tax_code")
	private String itemTaxCode;
	
	@Column(name = "item_tax_percentage")
	private Double itemtaxPercen;
	
	@Column(name = "item_tax_amt")
	private Double itemtaxAmt;
	
	@Column(name = "item_total_amt")
	private Double itemtotalAmt;
	
	@Column(name = "item_order_qty")
	private Double itemorderQty;
	
	@Column(name = "item_pending_qty")
	private Double itempendingQty;
	
	@Column(name = "temperature")
	private Integer temperature;
	
	

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	
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
	
	@Column(name = "unit_id")
	private Integer unitId;		
	
	
	
	
	
	@Transient
	private List<ProcessPurchaseOrderItemDTO> lstprocessiteminfo;





	public Integer getItemInfoId() {
		return itemInfoId;
	}





	public void setItemInfoId(Integer itemInfoId) {
		this.itemInfoId = itemInfoId;
	}





	public String getItemName() {
		return itemName;
	}





	public void setItemName(String itemName) {
		this.itemName = itemName;
	}





	public Integer getItemQty() {
		return itemQty;
	}





	public void setItemQty(Integer itemQty) {
		this.itemQty = itemQty;
	}





	public Integer getItempurchaserequestQty() {
		return itempurchaserequestQty;
	}





	public void setItempurchaserequestQty(Integer itempurchaserequestQty) {
		this.itempurchaserequestQty = itempurchaserequestQty;
	}





	public Integer getItemprocessedQty() {
		return itemprocessedQty;
	}





	public void setItemprocessedQty(Integer itemprocessedQty) {
		this.itemprocessedQty = itemprocessedQty;
	}





	public String getPurchaseType() {
		return purchaseType;
	}





	public void setPurchaseType(String purchaseType) {
		this.purchaseType = purchaseType;
	}





	public Integer getQuantity() {
		return quantity;
	}





	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}





	public Integer getSupplierId() {
		return supplierId;
	}





	public void setSupplierId(Integer supplierId) {
		this.supplierId = supplierId;
	}





	public String getSupplierName() {
		return supplierName;
	}





	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}





	public Double getItemUnitPrice() {
		return itemUnitPrice;
	}





	public void setItemUnitPrice(Double itemUnitPrice) {
		this.itemUnitPrice = itemUnitPrice;
	}





	public Double getItemDiscountPerc() {
		return itemDiscountPerc;
	}





	public void setItemDiscountPerc(Double itemDiscountPerc) {
		this.itemDiscountPerc = itemDiscountPerc;
	}





	public Double getItemDiscountRs() {
		return itemDiscountRs;
	}





	public void setItemDiscountRs(Double itemDiscountRs) {
		this.itemDiscountRs = itemDiscountRs;
	}





	public Double getItemDiscountAmt() {
		return itemDiscountAmt;
	}





	public void setItemDiscountAmt(Double itemDiscountAmt) {
		this.itemDiscountAmt = itemDiscountAmt;
	}





	public Double getItemBaseAmt() {
		return itemBaseAmt;
	}





	public void setItemBaseAmt(Double itemBaseAmt) {
		this.itemBaseAmt = itemBaseAmt;
	}





	public String getItemTaxCode() {
		return itemTaxCode;
	}





	public void setItemTaxCode(String itemTaxCode) {
		this.itemTaxCode = itemTaxCode;
	}





	public Double getItemtaxPercen() {
		return itemtaxPercen;
	}





	public void setItemtaxPercen(Double itemtaxPercen) {
		this.itemtaxPercen = itemtaxPercen;
	}





	public Double getItemtaxAmt() {
		return itemtaxAmt;
	}





	public void setItemtaxAmt(Double itemtaxAmt) {
		this.itemtaxAmt = itemtaxAmt;
	}





	public Double getItemtotalAmt() {
		return itemtotalAmt;
	}





	public void setItemtotalAmt(Double itemtotalAmt) {
		this.itemtotalAmt = itemtotalAmt;
	}





	public Double getItemorderQty() {
		return itemorderQty;
	}





	public void setItemorderQty(Double itemorderQty) {
		this.itemorderQty = itemorderQty;
	}





	public Double getItempendingQty() {
		return itempendingQty;
	}





	public void setItempendingQty(Double itempendingQty) {
		this.itempendingQty = itempendingQty;
	}





	public Integer getTemperature() {
		return temperature;
	}





	public void setTemperature(Integer temperature) {
		this.temperature = temperature;
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





	public List<ProcessPurchaseOrderItemDTO> getLstprocessiteminfo() {
		return lstprocessiteminfo;
	}





	public void setLstprocessiteminfo(
			List<ProcessPurchaseOrderItemDTO> lstprocessiteminfo) {
		this.lstprocessiteminfo = lstprocessiteminfo;
	}





	





	

}
