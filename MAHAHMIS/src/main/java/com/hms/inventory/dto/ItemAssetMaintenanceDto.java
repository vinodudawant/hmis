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
@Table(name = "inv_item_asset_maintenance")
public class ItemAssetMaintenanceDto {
	
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "serial_no")
	private String serialNo;
	
	@Column(name = "manufacture_name")
	private String manufactureName;
	
	@Column(name = "asset_item_name")
	private String assetItemName;
	
	@Column(name = "asset_item_id")
	private Integer assetItemId;
	
	@Column(name = "party_name")
	private String partyName;
	
	@Column(name = "party_master_id")
	private Integer partyMasterId;
	
	@Column(name="amc_val")
	private Integer amcVal;
	
	@Column(name="pm_val")
	private Integer pmVal;
	
	@Column(name="amc_Year")
	private String amcYear;
	
	@Column(name="pm_year")
	private String pmYear;
	
	@Column(name="product_warranty")
	private String productWarranty;
	
	@Column(name="product_warranty_duration")
	private Integer productWarrantyDuration;
	
	@Column(name="asset_unit_price")
	private Integer assetUnitPrice;
	
	@Column(name="product_category")
	private String productCategory;
	
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
	
	//added by rohit to store lab equipment status value
	@Column(name="asset_type")
	private String assetType;
	
	//record type 1 means GRN
	@Column(name="record_type")
	private Integer recordType;
	
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

	@Transient
	private List<ItemAssetMaintenanceDto> lstItemAssetMaintenanceDto;
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getManufactureName() {
		return manufactureName;
	}

	public void setManufactureName(String manufactureName) {
		this.manufactureName = manufactureName;
	}

	public String getAssetItemName() {
		return assetItemName;
	}

	public void setAssetItemName(String assetItemName) {
		this.assetItemName = assetItemName;
	}

	public Integer getAssetItemId() {
		return assetItemId;
	}

	public void setAssetItemId(Integer assetItemId) {
		this.assetItemId = assetItemId;
	}

	public String getPartyName() {
		return partyName;
	}

	public Integer getAmcVal() {
		return amcVal;
	}

	public void setAmcVal(Integer amcVal) {
		this.amcVal = amcVal;
	}

	public Integer getPmVal() {
		return pmVal;
	}

	public void setPmVal(Integer pmVal) {
		this.pmVal = pmVal;
	}

	public String getAmcYear() {
		return amcYear;
	}

	public void setAmcYear(String amcYear) {
		this.amcYear = amcYear;
	}

	public String getPmYear() {
		return pmYear;
	}

	public void setPmYear(String pmYear) {
		this.pmYear = pmYear;
	}

	public String getProductWarranty() {
		return productWarranty;
	}

	public void setProductWarranty(String productWarranty) {
		this.productWarranty = productWarranty;
	}

	public Integer getProductWarrantyDuration() {
		return productWarrantyDuration;
	}

	public void setProductWarrantyDuration(Integer productWarrantyDuration) {
		this.productWarrantyDuration = productWarrantyDuration;
	}

	public Integer getAssetUnitPrice() {
		return assetUnitPrice;
	}

	public void setAssetUnitPrice(Integer assetUnitPrice) {
		this.assetUnitPrice = assetUnitPrice;
	}

	public void setPartyName(String partyName) {
		this.partyName = partyName;
	}

	public Integer getPartyMasterId() {
		return partyMasterId;
	}

	public void setPartyMasterId(Integer partyMasterId) {
		this.partyMasterId = partyMasterId;
	}

	public List<ItemAssetMaintenanceDto> getLstItemAssetMaintenanceDto() {
		return lstItemAssetMaintenanceDto;
	}

	public void setLstItemAssetMaintenanceDto(
			List<ItemAssetMaintenanceDto> lstItemAssetMaintenanceDto) {
		this.lstItemAssetMaintenanceDto = lstItemAssetMaintenanceDto;
	}

	public String getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}
	
	public String getAssetType() {
		return assetType;
	}

	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}

	public Integer getRecordType() {
		return recordType;
	}

	public void setRecordType(Integer recordType) {
		this.recordType = recordType;
	}

	@Override
	public String toString() {
		return "ItemAssetMaintenanceDto [id=" + id + ", serialNo=" + serialNo
				+ ", manufactureName=" + manufactureName + ", assetItemName="
				+ assetItemName + ", assetItemId=" + assetItemId
				+ ", partyName=" + partyName + ", partyMasterId="
				+ partyMasterId + ", amcVal=" + amcVal + ", pmVal=" + pmVal
				+ ", amcYear=" + amcYear + ", pmYear=" + pmYear
				+ ", productWarranty=" + productWarranty
				+ ", productWarrantyDuration=" + productWarrantyDuration
				+ ", assetUnitPrice=" + assetUnitPrice + ", productCategory="
				+ productCategory + ", createdDateTime=" + createdDateTime
				+ ", updatedDateTime=" + updatedDateTime + ", userId=" + userId
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deleted_by=" + deleted_by + ", deleted=" + deleted
				+ ", deletedDate=" + deletedDate + ", unitId=" + unitId
				+ ", assetType=" + assetType + ", recordType=" + recordType
				+ ", lstItemAssetMaintenanceDto=" + lstItemAssetMaintenanceDto
				+ "]";
	}

	
	
}
