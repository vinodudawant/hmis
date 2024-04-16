
package com.hms.administrator.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("deprecation")
@Entity
@Table(name="state")
public class AdminStateDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idstate")
	private int state_ID;
	
	@Column(name = "state_name")
	private String stateName;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<AdminStateDTO> stateList;

	@JsonProperty("state_id")
	public int getState_ID() {
		return state_ID;
	}

	@JsonProperty("state_id")
	public void setState_ID(int state_ID) {
		this.state_ID = state_ID;
	}

	@JsonProperty("state_name")
	public String getStateName() {
		return stateName;
	}

	@JsonProperty("state_name")
	public void setStateName(String stateName) {
		this.stateName = stateName;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@JsonProperty("stateList")
	public List<AdminStateDTO> getStateList() {
		return stateList;
	}
	@JsonProperty("stateList")
	public void setStateList(List<AdminStateDTO> stateList) {
		this.stateList = stateList;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
