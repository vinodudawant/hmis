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
@Table(name = "inv_details_asset_maintenance_slave")
public class DetailsAssetMaintenanceSlaveDto {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer detailsId;

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
	
	@Column(name="machine_ownership_type")
	private String machineOwnershipType;
	
	@Column(name="machine_owner")
	private String machineOwner;
	
	@Column(name="used_for")
	private String usedFor;
	
	@Column(name="department_id")
	private Integer departmentId;
	
	@Column(name="department_name")
	private String departmentName;
	
	@Column(name="test_count")
	private Integer testCount;
	
	@Column(name="reagent_name_id")
	private String reagentNameId;
	
	@Column(name="reagent_name")
	private String reagentName;
	
	@Column(name="asset_location_name")
	private String assetLocationName;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="asset_maintenance_master_id")
	private ItemAssetMaintenanceMasterDto obj;
	
	@Transient
	private List<DetailsAssetMaintenanceSlaveDto> lstDetailsAssetMaintenanceSlaveDto;


	public Integer getDetailsId() {
		return detailsId;
	}

	public void setDetailsId(Integer detailsId) {
		this.detailsId = detailsId;
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

	public String getMachineOwnershipType() {
		return machineOwnershipType;
	}

	public void setMachineOwnershipType(String machineOwnershipType) {
		this.machineOwnershipType = machineOwnershipType;
	}

	public String getMachineOwner() {
		return machineOwner;
	}

	public void setMachineOwner(String machineOwner) {
		this.machineOwner = machineOwner;
	}

	public String getUsedFor() {
		return usedFor;
	}

	public void setUsedFor(String usedFor) {
		this.usedFor = usedFor;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public Integer getTestCount() {
		return testCount;
	}

	public void setTestCount(Integer testCount) {
		this.testCount = testCount;
	}

	public String getReagentName() {
		return reagentName;
	}

	public void setReagentName(String reagentName) {
		this.reagentName = reagentName;
	}
	
	public String getAssetLocationName() {
		return assetLocationName;
	}

	public void setAssetLocationName(String assetLocationName) {
		this.assetLocationName = assetLocationName;
	}

	public ItemAssetMaintenanceMasterDto getObj() {
		return obj;
	}

	public void setObj(ItemAssetMaintenanceMasterDto obj) {
		this.obj = obj;
	}

	public List<DetailsAssetMaintenanceSlaveDto> getLstDetailsAssetMaintenanceSlaveDto() {
		return lstDetailsAssetMaintenanceSlaveDto;
	}

	public void setLstDetailsAssetMaintenanceSlaveDto(
			List<DetailsAssetMaintenanceSlaveDto> lstDetailsAssetMaintenanceSlaveDto) {
		this.lstDetailsAssetMaintenanceSlaveDto = lstDetailsAssetMaintenanceSlaveDto;
	}

	public String getReagentNameId() {
		return reagentNameId;
	}

	public void setReagentNameId(String reagentNameId) {
		this.reagentNameId = reagentNameId;
	}

	
	
	
	
}
