package com.hms.ehat.dto;

import java.io.Serializable;
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

@Entity
@Table(name = "ehat_login_history")
public class LoginHistory implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "ehat_login_history_id")	
	private int loginHistoryId;
	
	@Column(name = "user_id")
	private String userId;	
	
	@Column(name = "remote_ip")
	private String remoteId;
	
	@Column(name = "sign_in_time")
	private String signInTime;
	
	@Column(name = "sign_out_time")
	private String signOutTime;
	
	@Column(name = "status")
	private String status;
		
	@Column(name = "improper_sign_out_time")
	private String improperSignOutTime;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
		
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date_time")
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Transient
	private List<LoginHistory> lstLoginHistory;

	public int getLoginHistoryId() {
		return loginHistoryId;
	}

	public void setLoginHistoryId(int loginHistoryId) {
		this.loginHistoryId = loginHistoryId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRemoteId() {
		return remoteId;
	}

	public void setRemoteId(String remoteId) {
		this.remoteId = remoteId;
	}

	public String getSignInTime() {
		return signInTime;
	}

	public void setSignInTime(String signInTime) {
		this.signInTime = signInTime;
	}

	public String getSignOutTime() {
		return signOutTime;
	}

	public void setSignOutTime(String signOutTime) {
		this.signOutTime = signOutTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getImproperSignOutTime() {
		return improperSignOutTime;
	}

	public void setImproperSignOutTime(String improperSignOutTime) {
		this.improperSignOutTime = improperSignOutTime;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
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

	public List<LoginHistory> getLstLoginHistory() {
		return lstLoginHistory;
	}

	public void setLstLoginHistory(List<LoginHistory> lstLoginHistory) {
		this.lstLoginHistory = lstLoginHistory;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}	
}
