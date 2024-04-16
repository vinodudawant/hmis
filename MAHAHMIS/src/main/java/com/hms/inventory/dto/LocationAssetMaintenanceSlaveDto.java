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
import javax.persistence.Transient;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "inv_location_asset_maintenance_slave")
public class LocationAssetMaintenanceSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer locationId;

	@CreationTimestamp
	@Column(name="created_date_time",updatable = false)
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

//	@Column(name="location_name")
//	private String locationName;
	
	@Column(name="incharge_name")
	private String inchargeName;
	
	@Column(name="incharge_contact_no")
	private String inchargeContactNo;
	
	@Column(name="remark")
	private String remark;
	
	// this  is added by Vishnu
	@Column(name="location_dept_id")
	private Integer locationDeptId;
	
	@Column(name="location_dept_name")
	private String locationDeptName;
	
	@Column(name="location_hospital_dept_id")
	private Integer locationHospitalDeptId;
	
	@Column(name="location_hospital_dept_name")
	private String locationHospitalDeptName;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="asset_maintenance_master_id")
	private ItemAssetMaintenanceMasterDto obj;
	
	@Transient
	private List<LocationAssetMaintenanceSlaveDto> lstLocationAssetMaintenanceSlaveDto;

	public Integer getLocationId() {
		return locationId;
	}

	public void setLocationId(Integer locationId) {
		this.locationId = locationId;
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

//	public String getLocationName() {
//		return locationName;
//	}
//
//	public void setLocationName(String locationName) {
//		this.locationName = locationName;
//	}

	public String getInchargeName() {
		return inchargeName;
	}

	public void setInchargeName(String inchargeName) {
		this.inchargeName = inchargeName;
	}

	public String getInchargeContactNo() {
		return inchargeContactNo;
	}

	public void setInchargeContactNo(String inchargeContactNo) {
		this.inchargeContactNo = inchargeContactNo;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public ItemAssetMaintenanceMasterDto getObj() {
		return obj;
	}

	public void setObj(ItemAssetMaintenanceMasterDto obj) {
		this.obj = obj;
	}

	public List<LocationAssetMaintenanceSlaveDto> getLstLocationAssetMaintenanceSlaveDto() {
		return lstLocationAssetMaintenanceSlaveDto;
	}

	public void setLstLocationAssetMaintenanceSlaveDto(
			List<LocationAssetMaintenanceSlaveDto> lstLocationAssetMaintenanceSlaveDto) {
		this.lstLocationAssetMaintenanceSlaveDto = lstLocationAssetMaintenanceSlaveDto;
	}

	@Override
	public String toString() {
		return "LocationAssetMaintenanceSlaveDto [locationId=" + locationId
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", userId=" + userId + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deleted_by="
				+ deleted_by + ", deleted=" + deleted + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId + ", inchargeName="
				+ inchargeName + ", inchargeContactNo=" + inchargeContactNo
				+ ", remark=" + remark + ", locationDeptId=" + locationDeptId
				+ ", locationDeptName=" + locationDeptName
				+ ", locationHospitalDeptId=" + locationHospitalDeptId
				+ ", locationHospitalDeptName=" + locationHospitalDeptName
				+ ", obj=" + obj + ", lstLocationAssetMaintenanceSlaveDto="
				+ lstLocationAssetMaintenanceSlaveDto + "]";
	}
	
	
}
