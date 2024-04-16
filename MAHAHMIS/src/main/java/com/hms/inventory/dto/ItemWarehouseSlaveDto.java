package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Table(name="inv_item_warehouse_slave")
public class ItemWarehouseSlaveDto {
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer wareHouseId;
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
	@Column(name="warehouse_name")
	private String warehouseName;
	@Column(name="warehouse_location")
	private String warehouseLocation;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="item_master_id")
	private ItemMasterDto obj;

	
	
	
	public ItemMasterDto getObj() {
		return obj;
	}

	public void setObj(ItemMasterDto obj) {
		this.obj = obj;
	}

	@Transient
	private List<ItemWarehouseSlaveDto> lstItemWarehouseSlave;

	public Integer getWareHouseId() {
		return wareHouseId;
	}

	public void setWareHouseId(Integer wareHouseId) {
		this.wareHouseId = wareHouseId;
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

	public String getWarehouseName() {
		return warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	public String getWarehouseLocation() {
		return warehouseLocation;
	}

	public void setWarehouseLocation(String warehouseLocation) {
		this.warehouseLocation = warehouseLocation;
	}

	public List<ItemWarehouseSlaveDto> getLstItemWarehouseSlave() {
		return lstItemWarehouseSlave;
	}

	public void setLstItemWarehouseSlave(
			List<ItemWarehouseSlaveDto> lstItemWarehouseSlave) {
		this.lstItemWarehouseSlave = lstItemWarehouseSlave;
	}

	@Override
	public String toString() {
		return "ItemWarehouseSlaveDto [wareHouseId=" + wareHouseId
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", userId=" + userId + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deleted_by="
				+ deleted_by + ", deleted=" + deleted + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId + ", warehouseName="
				+ warehouseName + ", warehouseLocation=" + warehouseLocation
				+ ", obj=" + obj + ", lstItemWarehouseSlave="
				+ lstItemWarehouseSlave + "]";
	}
	
}
