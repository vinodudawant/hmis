package com.hms.bloodbank.dto;

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

@Entity
@Table(name = "bb_rate_of_transfusion")
public class RateOfTransfusion implements Serializable {


	private static final long serialVersionUID = 7972897005655996774L;

	
	@Id
	@GeneratedValue
	@Column(name = "id_transfusion")
	private int transfusionId;
	
	@Column(name = "transfusion")
	private String transfusion;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_datetime")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "priority_ip")
	private String ipAddress = null;
	
	@Transient
	private List<RateOfTransfusion> listRateOfTransfusion;

	public int getTransfusionId() {
		return transfusionId;
	}

	public void setTransfusionId(int transfusionId) {
		this.transfusionId = transfusionId;
	}

	public String getTransfusion() {
		return transfusion;
	}

	public void setTransfusion(String transfusion) {
		this.transfusion = transfusion;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public List<RateOfTransfusion> getListRateOfTransfusion() {
		return listRateOfTransfusion;
	}

	public void setListRateOfTransfusion(
			List<RateOfTransfusion> listRateOfTransfusion) {
		this.listRateOfTransfusion = listRateOfTransfusion;
	}

	@Override
	public String toString() {
		return "RateOfTransfusion [transfusionId=" + transfusionId
				+ ", transfusion=" + transfusion + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", deletedBy=" + deletedBy + ", unitId="
				+ unitId + ", status=" + status + ", ipAddress=" + ipAddress
				+ ", listRateOfTransfusion=" + listRateOfTransfusion + "]";
	}
	
	
}
