package com.hms.inventory.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_batch_stock_new")
public class BatchStockDto {

	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "item_master_id")
	private Integer itemMasterId;
	
	@Column(name = "master_id", columnDefinition=" int(11) default 0")
	private Integer masterId;
	
	@Column(name = "item_batch_code")
	private String itemBatchCode;
	
	@Column(name = "item_batch_exp_date")
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date itemBatchExpDate;
	
	@Column(name = "batch_master_id")
	private Integer batchMasterId;
	
	@Column(name = "item_quantity")
	private Integer itemQuantity;
	
	//closing stock
	@Column(name = "stock_out_item_quantity")
	private Integer stockOutItemQuantity;
	
	//call from
	@Column(name = "stock_from")
	private String stockFrom;
	
	@Column(name = "item_name")
	private String itemName;
	
	//closing stock
	@Column(name = "stock_out_date")
	private Date stockOutDate;
	
	@Column(name = "sub_inv_id")
	private Integer subInventoryId;
	
	//sub inv stock
	@Column(name = "current_sub_inventory_stock", columnDefinition=" int(11) default 0")
	private Integer currentSubInventoryStock;
	
	//to store item issue quantity - by Rohit
	@Column(name = "issue_quantity")
	private Integer issueQuantity;
	
	//to store item total quantity - by Rohit
	@Column(name="total_quantity")
	private Integer totalQuantity;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Transient
	private Integer reorderStock;
	
	@Column(name="user_id")
	private Integer userId;
	
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@Column(name="created_by",updatable = false)
	private Integer createdBy;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name="deleted_by")
	private Integer deleted_by;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	//added by Rohit 26-10-2020
	//added for to maintain the stock return qty in batch stock for the stock return report generation
	@Column(name="stock_return_qty")
	private Integer stockReturnQty = 0;
	
	@Column(name = "stock_received_by", updatable = false)//added by dayanand 
	private Integer stockReceivedBy;
	
	@Column(name = "stock_receive_date_time", updatable = false)//added by dayanand
	private Date stockReceiveDateTime;
	
	@Column(name = "item_uom_name")
	private String itemUOMName;
	
	@Column(name = "os_stock_status", columnDefinition=" int(11) default 0")//added by Rohit on 18-11-2020 
	private Integer osStockStatus;
	
	@Column(name = "grn_stock_status", columnDefinition=" int(11) default 0")//added by Rohit on 18-11-2020 
	private Integer grnStockStatus;
	
	@Transient
	private String itemUomUnit;
	
	@Transient
	private String subInvName;
	
	@Transient
	private BigDecimal totalCurrentInvStock;
	
	@Transient
	private BigDecimal currentSubInventoryStockBatchStock;

	
	@Transient
	private List<BatchStockDto> lstBatchStockDto;
	
	@Transient
	private Integer noOfPages;


	public Integer getNoOfPages() {
		return noOfPages;
	}


	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Integer getItemMasterId() {
		return itemMasterId;
	}


	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}


	public Integer getMasterId() {
		return masterId;
	}


	public void setMasterId(Integer masterId) {
		this.masterId = masterId;
	}


	public String getItemBatchCode() {
		return itemBatchCode;
	}


	public void setItemBatchCode(String itemBatchCode) {
		this.itemBatchCode = itemBatchCode;
	}

	public Date getItemBatchExpDate() {
		return itemBatchExpDate;
	}


	public void setItemBatchExpDate(Date itemBatchExpDate) {
		this.itemBatchExpDate = itemBatchExpDate;
	}


	public Integer getItemQuantity() {
		return itemQuantity;
	}


	public void setItemQuantity(Integer itemQuantity) {
		this.itemQuantity = itemQuantity;
	}


	public Integer getStockOutItemQuantity() {
		return stockOutItemQuantity;
	}


	public void setStockOutItemQuantity(Integer stockOutItemQuantity) {
		this.stockOutItemQuantity = stockOutItemQuantity;
	}


	public String getStockFrom() {
		return stockFrom;
	}


	public void setStockFrom(String stockFrom) {
		this.stockFrom = stockFrom;
	}


	public String getItemName() {
		return itemName;
	}


	public void setItemName(String itemName) {
		this.itemName = itemName;
	}


	public Date getStockOutDate() {
		return stockOutDate;
	}


	public void setStockOutDate(Date stockOutDate) {
		this.stockOutDate = stockOutDate;
	}


	public Integer getSubInventoryId() {
		return subInventoryId;
	}


	public void setSubInventoryId(Integer subInventoryId) {
		this.subInventoryId = subInventoryId;
	}

	public Integer getCurrentSubInventoryStock() {
		return currentSubInventoryStock;
	}


	public void setCurrentSubInventoryStock(Integer currentSubInventoryStock) {
		this.currentSubInventoryStock = currentSubInventoryStock;
	}


	public Integer getIssueQuantity() {
		return issueQuantity;
	}


	public void setIssueQuantity(Integer issueQuantity) {
		this.issueQuantity = issueQuantity;
	}


	public Integer getTotalQuantity() {
		return totalQuantity;
	}


	public void setTotalQuantity(Integer totalQuantity) {
		this.totalQuantity = totalQuantity;
	}


	public Integer getUnitId() {
		return unitId;
	}


	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}


	public Integer getUserId() {
		return userId;
	}


	public void setUserId(Integer userId) {
		this.userId = userId;
	}


	public Date getCreatedDateTime() {
		return createdDateTime;
	}


	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}


	public Integer getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}


	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}


	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}


	public Integer getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}


	public String getDeleted() {
		return deleted;
	}


	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}


	public Integer getDeleted_by() {
		return deleted_by;
	}


	public void setDeleted_by(Integer deleted_by) {
		this.deleted_by = deleted_by;
	}


	public Date getDeletedDate() {
		return deletedDate;
	}


	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}


	public Integer getStockReceivedBy() {
		return stockReceivedBy;
	}


	public void setStockReceivedBy(Integer stockReceivedBy) {
		this.stockReceivedBy = stockReceivedBy;
	}


	public Date getStockReceiveDateTime() {
		return stockReceiveDateTime;
	}


	public void setStockReceiveDateTime(Date stockReceiveDateTime) {
		this.stockReceiveDateTime = stockReceiveDateTime;
	}


	public List<BatchStockDto> getLstBatchStockDto() {
		return lstBatchStockDto;
	}


	public void setLstBatchStockDto(List<BatchStockDto> lstBatchStockDto) {
		this.lstBatchStockDto = lstBatchStockDto;
	}


	public Integer getBatchMasterId() {
		return batchMasterId;
	}


	public void setBatchMasterId(Integer batchMasterId) {
		this.batchMasterId = batchMasterId;
	}


	
	public Integer getReorderStock() {
		return reorderStock;
	}


	public void setReorderStock(Integer reorderStock) {
		this.reorderStock = reorderStock;
	}


	public String getItemUomUnit() {
		return itemUomUnit;
	}


	public void setItemUomUnit(String itemUomUnit) {
		this.itemUomUnit = itemUomUnit;
	}


	public String getItemUOMName() {
		return itemUOMName;
	}


	public void setItemUOMName(String itemUOMName) {
		this.itemUOMName = itemUOMName;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public BigDecimal getTotalCurrentInvStock() {
		return totalCurrentInvStock;
	}


	public void setTotalCurrentInvStock(BigDecimal totalCurrentInvStock) {
		this.totalCurrentInvStock = totalCurrentInvStock;
	}


	public String getSubInvName() {
		return subInvName;
	}


	public void setSubInvName(String subInvName) {
		this.subInvName = subInvName;
	}


	public Integer getStockReturnQty() {
		return stockReturnQty;
	}


	public void setStockReturnQty(Integer stockReturnQty) {
		this.stockReturnQty = stockReturnQty;
	}

	public BigDecimal getCurrentSubInventoryStockBatchStock() {
		return currentSubInventoryStockBatchStock;
	}


	public void setCurrentSubInventoryStockBatchStock(
			BigDecimal currentSubInventoryStockBatchStock) {
		this.currentSubInventoryStockBatchStock = currentSubInventoryStockBatchStock;
	}
	
	public Integer getOsStockStatus() {
		return osStockStatus;
	}


	public void setOsStockStatus(Integer osStockStatus) {
		this.osStockStatus = osStockStatus;
	}


	public Integer getGrnStockStatus() {
		return grnStockStatus;
	}


	public void setGrnStockStatus(Integer grnStockStatus) {
		this.grnStockStatus = grnStockStatus;
	}


	@Override
	public String toString() {
		return "BatchStockDto [id=" + id + ", itemMasterId=" + itemMasterId
				+ ", masterId=" + masterId + ", itemBatchCode=" + itemBatchCode
				+ ", itemBatchExpDate=" + itemBatchExpDate + ", batchMasterId="
				+ batchMasterId + ", itemQuantity=" + itemQuantity
				+ ", stockOutItemQuantity=" + stockOutItemQuantity
				+ ", stockFrom=" + stockFrom + ", itemName=" + itemName
				+ ", stockOutDate=" + stockOutDate + ", subInventoryId="
				+ subInventoryId + ", currentSubInventoryStock="
				+ currentSubInventoryStock + ", issueQuantity=" + issueQuantity
				+ ", totalQuantity=" + totalQuantity + ", unitId=" + unitId
				+ ", reorderStock=" + reorderStock + ", userId=" + userId
				+ ", createdDateTime=" + createdDateTime + ", createdBy="
				+ createdBy + ", updatedDateTime=" + updatedDateTime
				+ ", updatedBy=" + updatedBy + ", deleted=" + deleted
				+ ", deleted_by=" + deleted_by + ", deletedDate=" + deletedDate
				+ ", stockReturnQty=" + stockReturnQty + ", stockReceivedBy="
				+ stockReceivedBy + ", stockReceiveDateTime="
				+ stockReceiveDateTime + ", itemUOMName=" + itemUOMName
				+ ", itemUomUnit=" + itemUomUnit + ", subInvName=" + subInvName
				+ ", totalCurrentInvStock=" + totalCurrentInvStock
				+ ", lstBatchStockDto=" + lstBatchStockDto + ", noOfPages="
				+ noOfPages + "]";
	}


	
	

}
