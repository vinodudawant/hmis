package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.transaction.TransactionScoped;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="bb_transfusion_observation")
public class TransfusionObservation implements Serializable {
	
private static final long serialVersionUID = 1L;
	

	@Id
	@GeneratedValue
	@Column(name = "id")
	private int observationId;
	
	@Column(name = "observation")
	private String observation;
	
	@Column(name = "pre_transfusion")
	private String preTransfusion;
	
	@Column(name = "post_transfusion")
	private String postTransfusion;
	
	@Column(name = "during_transfusion")
	private String duringTransfusion;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "bloodRequestId")
	private Integer bloodRequestId=0;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "ip_address")
	private String ipAddress = null;
	
	@Transient
	private List<TransfusionObservation> lstTransfusionObservation;
	
	public List<TransfusionObservation> getLstTransfusionObservation() {
		return lstTransfusionObservation;
	}

	public void setLstTransfusionObservation(List<TransfusionObservation> lstTransfusionObservation) {
		this.lstTransfusionObservation = lstTransfusionObservation;
	}
	
	//Added By Annapurna
	

	

	public int getObservationId() {
		return observationId;
	}

	public void setObservationId(int observationId) {
		this.observationId = observationId;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	public String getPreTransfusion() {
		return preTransfusion;
	}

	public void setPreTransfusion(String preTransfusion) {
		this.preTransfusion = preTransfusion;
	}

	public String getPostTransfusion() {
		return postTransfusion;
	}

	public void setPostTransfusion(String postTransfusion) {
		this.postTransfusion = postTransfusion;
	}

	public String getDuringTransfusion() {
		return duringTransfusion;
	}

	public void setDuringTransfusion(String duringTransfusion) {
		this.duringTransfusion = duringTransfusion;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getBloodRequestId() {
		return bloodRequestId;
	}

	public void setBloodRequestId(Integer bloodRequestId) {
		this.bloodRequestId = bloodRequestId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
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

	
	

}