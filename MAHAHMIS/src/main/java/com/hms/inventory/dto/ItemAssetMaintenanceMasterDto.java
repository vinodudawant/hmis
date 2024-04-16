package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "inv_item_asset_maintenance_master")
public class ItemAssetMaintenanceMasterDto {
	
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
	
	@Column(name = "asset_master_id")
	private Integer assetMasterId;
	
	@Column(name = "party_name")
	private String partyName;
	
	@Column(name = "party_master_id")
	private Integer partyMasterId;
	
	@Column(name = "purchase_ref")
	private String purchaseRef;
	
	@Column(name = "unit_price")
	private Double unitPrice;
	
	@Column(name = "org_far_no")
	private String orgFarNo;
	
	@CreationTimestamp
	@Column(name="created_date_time" , updatable = false)
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
	
	//added by rohit
	@Column(name="product_warranty_duration")
	private Integer productWarrantyDuration;
	
	//added by rohit
	@Column(name="product_warranty_time_period")
	private String productWarrantyTimePeriod;
	
	//added by Vishnu
	@Column(name="asset_unit_price")
	private Double assetUnitPrice;
	
	// this  is added by Vishnu
	@Column(name="location_dept_id")
	private Integer locationDeptId;
	
	@Column(name="location_dept_name")
	private String locationDeptName;
	
	@Column(name="location_hospital_dept_id")
	private Integer locationHospitalDeptId;
	
	@Column(name="location_hospital_dept_name")
	private String locationHospitalDeptName;
	
	//added by rohit
	@Column(name="product_category")
	private String productCategory;
	
	//added by rohit
	@Column(name="warranty_status")
	private String warrantyStatus;
	
	//added by rohit
	@Column(name="installation_date")
	private String installationDate;
	
	//added by rohit
	@Column(name="warranty_from_date")
	private String warrantyFromDate;
	
	//added by rohit
	@Column(name="warranty_to_date")
	private String warrantyToDate;
	
	//added by rohit to store lab equipment status value
	@Column(name="asset_type")
	private String assetType;
	
	//record type 1 means grn and 2 means opening stock
	@Column(name="record_type")
	private Integer recordType;
	
	@Column(name="delete_reason")
	private String deleteReason;
	
	//added by vishnu
	@Column(name="purchase_date")
	private String purchaseDate;
	
	@Transient
	private Integer noOfPages;
	
	@Column(name="user_name")
	private String userName;

	@Transient
	private List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMasterDto;
	
	@Transient
	private List<ItemAssetMaintenanceDocUploadDto> lstItemAssetMaintenanceDocUploadDto;
	
	//added by Rohit 15-07-2020
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="asset_maintenance_master_id")
	private List<ItemAssetMaintenanceSlaveDto> itemAssetMaintenanceSlaveDtos;
	
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

	public Integer getAssetMasterId() {
		return assetMasterId;
	}

	public void setAssetMasterId(Integer assetMasterId) {
		this.assetMasterId = assetMasterId;
	}

	public void setAssetItemId(Integer assetItemId) {
		this.assetItemId = assetItemId;
	}

	public String getPartyName() {
		return partyName;
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

	public String getPurchaseRef() {
		return purchaseRef;
	}

	public void setPurchaseRef(String purchaseRef) {
		this.purchaseRef = purchaseRef;
	}

	public Double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getOrgFarNo() {
		return orgFarNo;
	}

	public void setOrgFarNo(String orgFarNo) {
		this.orgFarNo = orgFarNo;
	}

	public List<ItemAssetMaintenanceMasterDto> getLstItemAssetMaintenanceMasterDto() {
		return lstItemAssetMaintenanceMasterDto;
	}

	public void setLstItemAssetMaintenanceMasterDto(
			List<ItemAssetMaintenanceMasterDto> lstItemAssetMaintenanceMasterDto) {
		this.lstItemAssetMaintenanceMasterDto = lstItemAssetMaintenanceMasterDto;
	}
	
	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<ItemAssetMaintenanceSlaveDto> getItemAssetMaintenanceSlaveDtos() {
		return itemAssetMaintenanceSlaveDtos;
	}

	public void setItemAssetMaintenanceSlaveDtos(
			List<ItemAssetMaintenanceSlaveDto> itemAssetMaintenanceSlaveDtos) {
		this.itemAssetMaintenanceSlaveDtos = itemAssetMaintenanceSlaveDtos;
	}
	
	public Integer getProductWarrantyDuration() {
		return productWarrantyDuration;
	}

	public void setProductWarrantyDuration(Integer productWarrantyDuration) {
		this.productWarrantyDuration = productWarrantyDuration;
	}

	public Double getAssetUnitPrice() {
		return assetUnitPrice;
	}

	public void setAssetUnitPrice(Double assetUnitPrice) {
		this.assetUnitPrice = assetUnitPrice;
	}

	public Integer getLocationDeptId() {
		return locationDeptId;
	}

	public void setLocationDeptId(Integer locationDeptId) {
		this.locationDeptId = locationDeptId;
	}

	public String getLocationDeptName() {
		return locationDeptName;
	}

	public void setLocationDeptName(String locationDeptName) {
		this.locationDeptName = locationDeptName;
	}

	public Integer getLocationHospitalDeptId() {
		return locationHospitalDeptId;
	}

	public void setLocationHospitalDeptId(Integer locationHospitalDeptId) {
		this.locationHospitalDeptId = locationHospitalDeptId;
	}

	public String getLocationHospitalDeptName() {
		return locationHospitalDeptName;
	}

	public void setLocationHospitalDeptName(String locationHospitalDeptName) {
		this.locationHospitalDeptName = locationHospitalDeptName;
	}

	public String getProductWarrantyTimePeriod() {
		return productWarrantyTimePeriod;
	}

	public void setProductWarrantyTimePeriod(String productWarrantyTimePeriod) {
		this.productWarrantyTimePeriod = productWarrantyTimePeriod;
	}

	public String getWarrantyStatus() {
		return warrantyStatus;
	}

	public void setWarrantyStatus(String warrantyStatus) {
		this.warrantyStatus = warrantyStatus;
	}

	public String getInstallationDate() {
		return installationDate;
	}

	public void setInstallationDate(String installationDate) {
		this.installationDate = installationDate;
	}

	public String getWarrantyFromDate() {
		return warrantyFromDate;
	}

	public void setWarrantyFromDate(String warrantyFromDate) {
		this.warrantyFromDate = warrantyFromDate;
	}

	public String getWarrantyToDate() {
		return warrantyToDate;
	}

	public void setWarrantyToDate(String warrantyToDate) {
		this.warrantyToDate = warrantyToDate;
	}
	
	public String getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(String purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public List<ItemAssetMaintenanceDocUploadDto> getLstItemAssetMaintenanceDocUploadDto() {
		return lstItemAssetMaintenanceDocUploadDto;
	}

	public void setLstItemAssetMaintenanceDocUploadDto(
			List<ItemAssetMaintenanceDocUploadDto> lstItemAssetMaintenanceDocUploadDto) {
		this.lstItemAssetMaintenanceDocUploadDto = lstItemAssetMaintenanceDocUploadDto;
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

	public String getDeleteReason() {
		return deleteReason;
	}

	public void setDeleteReason(String deleteReason) {
		this.deleteReason = deleteReason;
	}

	@Override
	public String toString() {
		return "ItemAssetMaintenanceMasterDto [id=" + id + ", serialNo=" + serialNo + ", manufactureName="
				+ manufactureName + ", assetItemName=" + assetItemName + ", assetItemId=" + assetItemId
				+ ", assetMasterId=" + assetMasterId + ", partyName=" + partyName + ", partyMasterId=" + partyMasterId
				+ ", purchaseRef=" + purchaseRef + ", unitPrice=" + unitPrice + ", orgFarNo=" + orgFarNo
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime + ", userId=" + userId
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by + ", deleted="
				+ deleted + ", deletedDate=" + deletedDate + ", unitId=" + unitId + ", productWarrantyDuration="
				+ productWarrantyDuration + ", productWarrantyTimePeriod=" + productWarrantyTimePeriod
				+ ", assetUnitPrice=" + assetUnitPrice + ", locationDeptId=" + locationDeptId + ", locationDeptName="
				+ locationDeptName + ", locationHospitalDeptId=" + locationHospitalDeptId
				+ ", locationHospitalDeptName=" + locationHospitalDeptName + ", productCategory=" + productCategory
				+ ", warrantyStatus=" + warrantyStatus + ", installationDate=" + installationDate
				+ ", warrantyFromDate=" + warrantyFromDate + ", warrantyToDate=" + warrantyToDate + ", assetType="
				+ assetType + ", recordType=" + recordType + ", deleteReason=" + deleteReason + ", purchaseDate="
				+ purchaseDate + ", noOfPages=" + noOfPages + ", userName=" + userName
				+ ", lstItemAssetMaintenanceMasterDto=" + lstItemAssetMaintenanceMasterDto
				+ ", lstItemAssetMaintenanceDocUploadDto=" + lstItemAssetMaintenanceDocUploadDto
				+ ", itemAssetMaintenanceSlaveDtos=" + itemAssetMaintenanceSlaveDtos + "]";
	}
	
	
	
}
