package com.hms.administrator.dto;

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

@Entity
@Table(name = "ehat_user_access_module_master")
public class UserAccessModuleDto {

	@Id
	@GeneratedValue
	@Column(name = "module_id")
	private Integer moduleId;
	
	@Column(name = "module_name")
	private String moduleName;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "status", length = 2)
	private String deleteStatus = "Y";
	
	@Column(name = "added_by")
	private String createdBy;
	
	@Column(name = "modify_by")
	private String updatedBy;
	
	@Column(name = "deleted_By")
	private Integer deletedBy;
	
	//@CreationTimestamp
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_on", updatable = false)
	private String createDate;
	
	//@UpdateTimestamp
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "modify_on")
	private String updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_Date_Time")
	private Date deletedDate;

	@Column(name = "remote_ip")
	private String remoteIP;
	
	@Transient
	private List<UserAccessModuleDto> userAccessModuleList;

	
	public Integer getModuleId() {
		return moduleId;
	}

	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleteStatus() {
		return deleteStatus;
	}

	public void setDeleteStatus(String deleteStatus) {
		this.deleteStatus = deleteStatus;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public String getRemoteIP() {
		return remoteIP;
	}

	public void setRemoteIP(String remoteIP) {
		this.remoteIP = remoteIP;
	}

	public List<UserAccessModuleDto> getUserAccessModuleList() {
		return userAccessModuleList;
	}

	public void setUserAccessModuleList(List<UserAccessModuleDto> userAccessModuleList) {
		this.userAccessModuleList = userAccessModuleList;
	}


	@Override
	public String toString() {
		return "UserAccessModuleDto [moduleId=" + moduleId + ", moduleName=" + moduleName + ", unitId=" + unitId
				+ ", deleteStatus=" + deleteStatus + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", remoteIP=" + remoteIP + ", userAccessModuleList="
				+ userAccessModuleList + "]";
	}
}