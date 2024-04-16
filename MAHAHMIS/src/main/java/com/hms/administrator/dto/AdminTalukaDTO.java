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
@Table(name="taluka")
public class AdminTalukaDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "idtaluka")
	private int taluka_ID;
	
	@Column(name="district_id")
    private int district_ID;
	
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
	
	@Column(name = "taluka_name")
	private String talukaName;
	
	@Column(name = "status")
	private String status="Y";

	@Column(name = "state_id")
	private int state_ID;

	@Transient
	private String districtName;
	
	@Transient
	private String stateName;
	
	@Transient
	private List<AdminTalukaDTO> talukaList;

	@JsonProperty("taluka_id")
	public int getTaluka_ID() {
		return taluka_ID;
	}

	@JsonProperty("taluka_id")
	public void setTaluka_ID(int taluka_ID) {
		this.taluka_ID = taluka_ID;
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

	@JsonProperty("taluka_name")
	public String getTalukaName() {
		return talukaName;
	}

	@JsonProperty("taluka_name")
	public void setTalukaName(String talukaName) {
		this.talukaName = talukaName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@JsonProperty("talukaList")
	public List<AdminTalukaDTO> getTalukaList() {
		return talukaList;
	}

	@JsonProperty("talukaList")
	public void setTalukaList(List<AdminTalukaDTO> talukaList) {
		this.talukaList = talukaList;
	}

	public int getDistrict_ID() {
		return district_ID;
	}

	public void setDistrict_ID(int district_ID) {
		this.district_ID = district_ID;
	}

	public int getState_ID() {
		return state_ID;
	}

	public void setState_ID(int state_ID) {
		this.state_ID = state_ID;
	}
	
	

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}



}
