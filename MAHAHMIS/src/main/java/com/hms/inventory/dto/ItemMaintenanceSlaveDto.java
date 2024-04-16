package com.hms.inventory.dto;

import java.util.Date;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name="inv_item_maintenance_slave")
public class ItemMaintenanceSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer maintenanceId;
	@CreationTimestamp
	@Column(name="created_date_time")
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
	@Column(name="warranty_with_product")
	private String warrantyWithProduct;
// this is added by Vishnu
	@Column(name="warranty_with_product_duration")
	private Integer warrantyWithProductDuration;
	
	@Column(name="amccmc_free_text_duration")
	private Integer amccmcFreeTextDuration;
	@Column(name="amc_cmc_duration")
	private String amccmcDuration;
	@Column(name="preventive_maintenance_free_text_duration")
	private Integer preventiveMaintenanceFreeTextDuration;
	@Column(name="preventive_maintenance_duration")
	private String preventiveMaintenanceDuration;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="item_master_id")
	private ItemMasterDto obj;

	public Integer getMaintenanceId() {
		return maintenanceId;
	}

	public void setMaintenanceId(Integer maintenanceId) {
		this.maintenanceId = maintenanceId;
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

	public String getWarrantyWithProduct() {
		return warrantyWithProduct;
	}

	public void setWarrantyWithProduct(String warrantyWithProduct) {
		this.warrantyWithProduct = warrantyWithProduct;
	}

	public Integer getWarrantyWithProductDuration() {
		return warrantyWithProductDuration;
	}

	public void setWarrantyWithProductDuration(Integer warrantyWithProductDuration) {
		this.warrantyWithProductDuration = warrantyWithProductDuration;
	}

	public Integer getAmccmcFreeTextDuration() {
		return amccmcFreeTextDuration;
	}

	public void setAmccmcFreeTextDuration(Integer amccmcFreeTextDuration) {
		this.amccmcFreeTextDuration = amccmcFreeTextDuration;
	}

	public String getAmccmcDuration() {
		return amccmcDuration;
	}

	public void setAmccmcDuration(String amccmcDuration) {
		this.amccmcDuration = amccmcDuration;
	}

	public Integer getPreventiveMaintenanceFreeTextDuration() {
		return preventiveMaintenanceFreeTextDuration;
	}

	public void setPreventiveMaintenanceFreeTextDuration(
			Integer preventiveMaintenanceFreeTextDuration) {
		this.preventiveMaintenanceFreeTextDuration = preventiveMaintenanceFreeTextDuration;
	}

	public String getPreventiveMaintenanceDuration() {
		return preventiveMaintenanceDuration;
	}

	public void setPreventiveMaintenanceDuration(
			String preventiveMaintenanceDuration) {
		this.preventiveMaintenanceDuration = preventiveMaintenanceDuration;
	}

	public ItemMasterDto getObj() {
		return obj;
	}

	public void setObj(ItemMasterDto obj) {
		this.obj = obj;
	}
	
	
	
	
}
