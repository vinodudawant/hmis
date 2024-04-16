package com.hms.inventory.dto;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
@Table(name = "inv_asset_complaint_master_new")
public class AssetComplaintMasterDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	
	@CreationTimestamp
	@Column(name="created_date_time" , updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;

	@Column(name="user_id")
	private int userId;
	
	@Column(name="user_name")
	private String userName;
	
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
	
	@Column(name="complaint_dept_id")
	private Integer complaintDeptId;
	
	@Column(name = "complaint_dept_name")
	private String complaintDeptName;
	
	@Column(name="complaint_hosp_dept_id")
	private Integer complaintHospDeptId;
	
	@Column(name = "complaint_hosp_dept_name")
	private String complaintHospDeptName;
	
	@Column(name = "complaint_batch_no")
	private String complaintBatchNo;
	
	@Column(name="complaint_batch_master_id")
	private Integer complaintBatchMasterId;
	 
	@Column(name="product_category_id")
	private Integer productCategoryId;
	
	@Column(name = "product_category_name")
	private String productCategoryName;
	
	@Column(name="asset_id")
	private Integer assetId;
	
	@Column(name = "asset_name")
	private String assetName;
	
	@Column(name="serial_no")
	private String serialNo;
	
	@Column(name="complain_type")
	private String complainType;
	
	@Column(name="complainant_contact_no")
	private String complainantContactNo;
	
	@Column(name="location")
	private String location;
	
	@Column(name="description")
	private String description;
	
	@Column(name="rate_of_inconvenience")
	private Integer rateOfInconvenience;
	
	@Column(name="priority")
	private String priority;
	
	@Column(name="urgent")
	private String urgent;
	
	@Column(name="ticket_status")
	private String ticketStatus;
	
	@Column(name="warranty_status")
	private String warrantyStatus;
	
	@Transient
	private Time downtimeHours;
	
	@Transient
	private Integer noOfPages;
	
	@Transient
	private List<AssetComplaintMasterDto> lstAssetComplaintMasterDto;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name="asset_complaint_master_id")
	private List<AssetComplaintSlaveDto> lstAssetComplaintSlaveDtos;

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

	public Integer getComplaintDeptId() {
		return complaintDeptId;
	}

	public void setComplaintDeptId(Integer complaintDeptId) {
		this.complaintDeptId = complaintDeptId;
	}

	public String getComplaintDeptName() {
		return complaintDeptName;
	}

	public void setComplaintDeptName(String complaintDeptName) {
		this.complaintDeptName = complaintDeptName;
	}

	public Integer getComplaintHospDeptId() {
		return complaintHospDeptId;
	}

	public void setComplaintHospDeptId(Integer complaintHospDeptId) {
		this.complaintHospDeptId = complaintHospDeptId;
	}

	public String getComplaintHospDeptName() {
		return complaintHospDeptName;
	}

	public void setComplaintHospDeptName(String complaintHospDeptName) {
		this.complaintHospDeptName = complaintHospDeptName;
	}

	public String getComplaintBatchNo() {
		return complaintBatchNo;
	}

	public void setComplaintBatchNo(String complaintBatchNo) {
		this.complaintBatchNo = complaintBatchNo;
	}

	
	
	public Integer getComplaintBatchMasterId() {
		return complaintBatchMasterId;
	}

	public void setComplaintBatchMasterId(Integer complaintBatchMasterId) {
		this.complaintBatchMasterId = complaintBatchMasterId;
	}

	public Integer getProductCategoryId() {
		return productCategoryId;
	}

	public void setProductCategoryId(Integer productCategoryId) {
		this.productCategoryId = productCategoryId;
	}

	public String getProductCategoryName() {
		return productCategoryName;
	}

	public void setProductCategoryName(String productCategoryName) {
		this.productCategoryName = productCategoryName;
	}

	public Integer getAssetId() {
		return assetId;
	}

	public void setAssetId(Integer assetId) {
		this.assetId = assetId;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getComplainType() {
		return complainType;
	}

	public void setComplainType(String complainType) {
		this.complainType = complainType;
	}

	public String getComplainantContactNo() {
		return complainantContactNo;
	}

	public void setComplainantContactNo(String complainantContactNo) {
		this.complainantContactNo = complainantContactNo;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getRateOfInconvenience() {
		return rateOfInconvenience;
	}

	public void setRateOfInconvenience(Integer rateOfInconvenience) {
		this.rateOfInconvenience = rateOfInconvenience;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getUrgent() {
		return urgent;
	}

	public void setUrgent(String urgent) {
		this.urgent = urgent;
	}

	public List<AssetComplaintMasterDto> getLstAssetComplaintMasterDto() {
		return lstAssetComplaintMasterDto;
	}

	public void setLstAssetComplaintMasterDto(
			List<AssetComplaintMasterDto> lstAssetComplaintMasterDto) {
		this.lstAssetComplaintMasterDto = lstAssetComplaintMasterDto;
	}
	
	public List<AssetComplaintSlaveDto> getLstAssetComplaintSlaveDtos() {
		return lstAssetComplaintSlaveDtos;
	}

	public void setLstAssetComplaintSlaveDtos(
			List<AssetComplaintSlaveDto> lstAssetComplaintSlaveDtos) {
		this.lstAssetComplaintSlaveDtos = lstAssetComplaintSlaveDtos;
	}
	
	public String getTicketStatus() {
		return ticketStatus;
	}

	public void setTicketStatus(String ticketStatus) {
		this.ticketStatus = ticketStatus;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Time getDowntimeHours() {
		return downtimeHours;
	}

	public void setDowntimeHours(Time downtimeHours) {
		this.downtimeHours = downtimeHours;
	}
	
	public String getWarrantyStatus() {
		return warrantyStatus;
	}

	public void setWarrantyStatus(String warrantyStatus) {
		this.warrantyStatus = warrantyStatus;
	}

	@Override
	public String toString() {
		return "AssetComplaintMasterDto [id=" + id + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", userId=" + userId + ", userName=" + userName
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deleted_by=" + deleted_by + ", deleted=" + deleted
				+ ", deletedDate=" + deletedDate + ", unitId=" + unitId
				+ ", complaintDeptId=" + complaintDeptId
				+ ", complaintDeptName=" + complaintDeptName
				+ ", complaintHospDeptId=" + complaintHospDeptId
				+ ", complaintHospDeptName=" + complaintHospDeptName
				+ ", complaintBatchNo=" + complaintBatchNo
				+ ", complaintBatchMasterId=" + complaintBatchMasterId
				+ ", productCategoryId=" + productCategoryId
				+ ", productCategoryName=" + productCategoryName + ", assetId="
				+ assetId + ", assetName=" + assetName + ", serialNo="
				+ serialNo + ", complainType=" + complainType
				+ ", complainantContactNo=" + complainantContactNo
				+ ", location=" + location + ", description=" + description
				+ ", rateOfInconvenience=" + rateOfInconvenience
				+ ", priority=" + priority + ", urgent=" + urgent
				+ ", ticketStatus=" + ticketStatus + ", warrantyStatus="
				+ warrantyStatus + ", downtimeHours=" + downtimeHours
				+ ", noOfPages=" + noOfPages + ", lstAssetComplaintMasterDto="
				+ lstAssetComplaintMasterDto + ", lstAssetComplaintSlaveDtos="
				+ lstAssetComplaintSlaveDtos + "]";
	}

	
	
	
	
}
