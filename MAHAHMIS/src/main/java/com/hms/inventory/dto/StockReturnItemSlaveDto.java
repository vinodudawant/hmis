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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_stock_return_item_slave")
public class StockReturnItemSlaveDto {

	@Transient
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time" ,updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="created_by",updatable = false)
	private int createdBy;
	
	@Column(name="updated_by")
	private int updatedBy;
	
	@Column(name="deleted_by")
	private int deleted_by;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name="item_master_id")
	private Integer itemMasterId;
	
	@Column(name="item_name")
	private String itemName;
	
	@Column(name="item_batch_code")
	private String itemBatchCode;
	
	@Column(name="item_batch_exp_date")
	private String itemBatchExpDate;
	
	@Column(name="item_uom_unit")
	private String itemUomUnit;
	
	@Column(name="return_quantity")
	private Integer returnQuantity;
	
	@Column(name="available_subinv_quantity")
	private Integer availableSubinvQuantity;
	
	@Column(name="sub_inv_id")
	private Integer subInvIdInSlave;
	
	@Column(name="narration")
	private String narration;
	
	@Column(name="stock_return_reason")
	private String stockReturnReason;
	
	//added by Rohit
	//date 05-11-2020
	@Column(name="main_inventory_stock")
	private Integer mainInventoryStock;
	
	@Transient
	private List<StockReturnItemSlaveDto> lstStockReturnItemSlaveDto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Integer getItemMasterId() {
		return itemMasterId;
	}

	public void setItemMasterId(Integer itemMasterId) {
		this.itemMasterId = itemMasterId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemBatchCode() {
		return itemBatchCode;
	}

	public void setItemBatchCode(String itemBatchCode) {
		this.itemBatchCode = itemBatchCode;
	}

	public String getItemBatchExpDate() {
		return itemBatchExpDate;
	}

	public void setItemBatchExpDate(String itemBatchExpDate) {
		this.itemBatchExpDate = itemBatchExpDate;
	}

	public String getItemUomUnit() {
		return itemUomUnit;
	}

	public void setItemUomUnit(String itemUomUnit) {
		this.itemUomUnit = itemUomUnit;
	}

	public Integer getReturnQuantity() {
		return returnQuantity;
	}

	public void setReturnQuantity(Integer returnQuantity) {
		this.returnQuantity = returnQuantity;
	}

	public Integer getAvailableSubinvQuantity() {
		return availableSubinvQuantity;
	}

	public void setAvailableSubinvQuantity(Integer availableSubinvQuantity) {
		this.availableSubinvQuantity = availableSubinvQuantity;
	}

	public Integer getSubInvIdInSlave() {
		return subInvIdInSlave;
	}

	public void setSubInvIdInSlave(Integer subInvIdInSlave) {
		this.subInvIdInSlave = subInvIdInSlave;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public List<StockReturnItemSlaveDto> getLstStockReturnItemSlaveDto() {
		return lstStockReturnItemSlaveDto;
	}

	public void setLstStockReturnItemSlaveDto(
			List<StockReturnItemSlaveDto> lstStockReturnItemSlaveDto) {
		this.lstStockReturnItemSlaveDto = lstStockReturnItemSlaveDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getStockReturnReason() {
		return stockReturnReason;
	}

	public void setStockReturnReason(String stockReturnReason) {
		this.stockReturnReason = stockReturnReason;
	}

	public Integer getMainInventoryStock() {
		return mainInventoryStock;
	}

	public void setMainInventoryStock(Integer mainInventoryStock) {
		this.mainInventoryStock = mainInventoryStock;
	}

	@Override
	public String toString() {
		return "StockReturnItemSlaveDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", itemMasterId=" + itemMasterId
				+ ", itemName=" + itemName + ", itemBatchCode=" + itemBatchCode
				+ ", itemBatchExpDate=" + itemBatchExpDate + ", itemUomUnit="
				+ itemUomUnit + ", returnQuantity=" + returnQuantity
				+ ", availableSubinvQuantity=" + availableSubinvQuantity
				+ ", subInvIdInSlave=" + subInvIdInSlave + ", narration="
				+ narration + ", stockReturnReason=" + stockReturnReason
				+ ", mainInventoryStock=" + mainInventoryStock
				+ ", lstStockReturnItemSlaveDto=" + lstStockReturnItemSlaveDto
				+ "]";
	}

	
	
	
	
	
	
	
	
}
