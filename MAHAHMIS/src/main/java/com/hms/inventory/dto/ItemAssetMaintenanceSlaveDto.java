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
@Table(name = "inv_item_asset_maintenance_slave")
public class ItemAssetMaintenanceSlaveDto {
	
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;

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
	
	@Column(name="asset_maintenance_contract")
	private String assetMaintenanceContract;
	
	@Column(name="asset_maintenance_duration")
	private Integer assetMaintenanceDuration;
	
	@Column(name="asset_maintenance_time_period")
	private String assetMaintenanceTimePeriod;
	
	@Column(name="asset_maintenance_from_date")
	private String assetMaintenanceFromDate;
	
	@Column(name="asset_maintenance_to_date")
	private String assetMaintenanceToDate;
	
	// this  is added by Vishnu
	
	@Column(name = "party_name")
	private String partyName;
	
	@Column(name = "party_master_id")
	private Integer partyMasterId;
	
	@Column(name = "service_cost")
	private Integer serviceCost;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "alert_date")
	private String alertDate;
	
	@Column(name = "remaining_days")
	private Integer remainingDays;
	
	@Column(name = "entry_date_time")
	private String entryDateTime;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "is_active",columnDefinition="int(2) default 0")
	private Integer isActive=0;
	
	@Transient
	private List<ItemAssetMaintenanceSlaveDto> lstItemAssetMaintenanceSlaveDto;
	
	//following fields added by aniket kanse, 17 NOV 21, for auto email alerts
	
	@Column(name = "flag_onAlertDate", columnDefinition = "varchar(2) default 'N'")
	private String flag_onAlertDate = "N";
	
	@Column(name = "flag_before_60_days", columnDefinition = "varchar(2) default 'N'")
	private String flag_before_60_days = "N";
	
	@Column(name = "flag_before_30_days", columnDefinition = "varchar(2) default 'N'")
	private String flag_before_30_days = "N";
	
	@Transient
	private Integer assetMasterId;

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

	public List<ItemAssetMaintenanceSlaveDto> getLstItemAssetMaintenanceSlaveDto() {
		return lstItemAssetMaintenanceSlaveDto;
	}

	public void setLstItemAssetMaintenanceSlaveDto(
			List<ItemAssetMaintenanceSlaveDto> lstItemAssetMaintenanceSlaveDto) {
		this.lstItemAssetMaintenanceSlaveDto = lstItemAssetMaintenanceSlaveDto;
	}

	public Integer getAssetMaintenanceDuration() {
		return assetMaintenanceDuration;
	}

	public void setAssetMaintenanceDuration(Integer assetMaintenanceDuration) {
		this.assetMaintenanceDuration = assetMaintenanceDuration;
	}

	public String getAssetMaintenanceTimePeriod() {
		return assetMaintenanceTimePeriod;
	}

	public void setAssetMaintenanceTimePeriod(String assetMaintenanceTimePeriod) {
		this.assetMaintenanceTimePeriod = assetMaintenanceTimePeriod;
	}

	public String getAssetMaintenanceFromDate() {
		return assetMaintenanceFromDate;
	}

	public void setAssetMaintenanceFromDate(String assetMaintenanceFromDate) {
		this.assetMaintenanceFromDate = assetMaintenanceFromDate;
	}

	public String getAssetMaintenanceToDate() {
		return assetMaintenanceToDate;
	}

	public void setAssetMaintenanceToDate(String assetMaintenanceToDate) {
		this.assetMaintenanceToDate = assetMaintenanceToDate;
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

	public Integer getServiceCost() {
		return serviceCost;
	}

	public void setServiceCost(Integer serviceCost) {
		this.serviceCost = serviceCost;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getAlertDate() {
		return alertDate;
	}

	public void setAlertDate(String alertDate) {
		this.alertDate = alertDate;
	}

	public Integer getRemainingDays() {
		return remainingDays;
	}

	public void setRemainingDays(Integer remainingDays) {
		this.remainingDays = remainingDays;
	}

	public String getEntryDateTime() {
		return entryDateTime;
	}

	public void setEntryDateTime(String entryDateTime) {
		this.entryDateTime = entryDateTime;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getIsActive() {
		return isActive;
	}

	public void setIsActive(Integer isActive) {
		this.isActive = isActive;
	}

	public String getAssetMaintenanceContract() {
		return assetMaintenanceContract;
	}

	public void setAssetMaintenanceContract(String assetMaintenanceContract) {
		this.assetMaintenanceContract = assetMaintenanceContract;
	}

	public String getFlag_onAlertDate() {
		return flag_onAlertDate;
	}

	public void setFlag_onAlertDate(String flag_onAlertDate) {
		this.flag_onAlertDate = flag_onAlertDate;
	}

	public String getFlag_before_60_days() {
		return flag_before_60_days;
	}

	public void setFlag_before_60_days(String flag_before_60_days) {
		this.flag_before_60_days = flag_before_60_days;
	}

	public String getFlag_before_30_days() {
		return flag_before_30_days;
	}

	public void setFlag_before_30_days(String flag_before_30_days) {
		this.flag_before_30_days = flag_before_30_days;
	}

	public Integer getAssetMasterId() {
		return assetMasterId;
	}

	public void setAssetMasterId(Integer assetMasterId) {
		this.assetMasterId = assetMasterId;
	}

	@Override
	public String toString() {
		return "ItemAssetMaintenanceSlaveDto [id=" + id + ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", userId=" + userId + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deleted_by=" + deleted_by + ", deleted=" + deleted + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", assetMaintenanceContract=" + assetMaintenanceContract + ", assetMaintenanceDuration="
				+ assetMaintenanceDuration + ", assetMaintenanceTimePeriod=" + assetMaintenanceTimePeriod
				+ ", assetMaintenanceFromDate=" + assetMaintenanceFromDate + ", assetMaintenanceToDate="
				+ assetMaintenanceToDate + ", partyName=" + partyName + ", partyMasterId=" + partyMasterId
				+ ", serviceCost=" + serviceCost + ", status=" + status + ", remark=" + remark + ", alertDate="
				+ alertDate + ", remainingDays=" + remainingDays + ", entryDateTime=" + entryDateTime + ", userName="
				+ userName + ", isActive=" + isActive + ", lstItemAssetMaintenanceSlaveDto="
				+ lstItemAssetMaintenanceSlaveDto + ", flag_onAlertDate=" + flag_onAlertDate + ", flag_before_60_days="
				+ flag_before_60_days + ", flag_before_30_days=" + flag_before_30_days + ", assetMasterId="
				+ assetMasterId + "]";
	}

	

	

}
