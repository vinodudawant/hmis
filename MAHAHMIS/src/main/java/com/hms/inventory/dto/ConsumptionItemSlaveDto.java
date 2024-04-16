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
@Table(name="inv_consumption_item_slave")
public class ConsumptionItemSlaveDto {

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
	
	@Column(name="required_quantity")
	private Integer requiredQuantity;
	
	@Column(name="available_subinv_quantity")
	private Integer availableSubinvQuantity;
	
	@Column(name="consumption_type")
	private String consumptionType;
	
	@Column(name="sub_inv_id")
	private Integer subInvIdInSlave;
	
	//consumption sub remark
	@Column(name = "consumption_sub_remark")
	private String consumptionSubRemark;
	
	@Transient
	private List<ConsumptionItemSlaveDto> lstConsumptionItemSlaveDto;

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

	public Integer getRequiredQuantity() {
		return requiredQuantity;
	}

	public void setRequiredQuantity(Integer requiredQuantity) {
		this.requiredQuantity = requiredQuantity;
	}

	public Integer getAvailableSubinvQuantity() {
		return availableSubinvQuantity;
	}

	public void setAvailableSubinvQuantity(Integer availableSubinvQuantity) {
		this.availableSubinvQuantity = availableSubinvQuantity;
	}

	public String getConsumptionType() {
		return consumptionType;
	}

	public void setConsumptionType(String consumptionType) {
		this.consumptionType = consumptionType;
	}

	public List<ConsumptionItemSlaveDto> getLstConsumptionItemSlaveDto() {
		return lstConsumptionItemSlaveDto;
	}

	public void setLstConsumptionItemSlaveDto(
			List<ConsumptionItemSlaveDto> lstConsumptionItemSlaveDto) {
		this.lstConsumptionItemSlaveDto = lstConsumptionItemSlaveDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public Integer getSubInvIdInSlave() {
		return subInvIdInSlave;
	}

	public void setSubInvIdInSlave(Integer subInvIdInSlave) {
		this.subInvIdInSlave = subInvIdInSlave;
	}
	
	public String getConsumptionSubRemark() {
		return consumptionSubRemark;
	}

	public void setConsumptionSubRemark(String consumptionSubRemark) {
		this.consumptionSubRemark = consumptionSubRemark;
	}

	@Override
	public String toString() {
		return "ConsumptionItemSlaveDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by
				+ ", deleted=" + deleted + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", itemMasterId=" + itemMasterId
				+ ", itemName=" + itemName + ", itemBatchCode=" + itemBatchCode
				+ ", itemBatchExpDate=" + itemBatchExpDate + ", itemUomUnit="
				+ itemUomUnit + ", requiredQuantity=" + requiredQuantity
				+ ", availableSubinvQuantity=" + availableSubinvQuantity
				+ ", consumptionType=" + consumptionType + ", subInvIdInSlave="
				+ subInvIdInSlave + ", consumptionSubRemark="
				+ consumptionSubRemark + ", lstConsumptionItemSlaveDto="
				+ lstConsumptionItemSlaveDto + "]";
	}

	

	
	
	
}
