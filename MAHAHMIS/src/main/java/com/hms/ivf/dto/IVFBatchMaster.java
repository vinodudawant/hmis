package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "ehat_ivf_batch_master")
public class IVFBatchMaster

{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ivf_batch_master_id")
	private Integer ivfBatchMasterId;
	
	@Column(name = "batch_cancel_narration")
	private String BatchCancelNarration;
	
	@Column(name = "ivf_batch_status", columnDefinition = "varchar(2) default 'N'")
	private String ivfBatchStatus = "N";
	 
	@Column(name = "pick_up_date")
	private String pickUpDate;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;
	
	@Column(name = "created_by")
	private Integer createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "cancelled_date_time")
	private Date cancelledDateTime;

	@Column(name = "cancelled_by")
	private Integer cancelledBy;

	@Column(name = "unit_id", columnDefinition = "int default 1")
	private int unitId = 1;
	
	@Column(name = "yearmonth")
	private String YearMonth;
	
	@Column(name = "cancel_narration")
	private String cancelNarration;

	@Transient
	private List<IVFBatchMaster> ltivfBatchMaster;
	
	@Transient
	private List<IVFBatchSlave> ltivfBatchSlave;
	
	@Transient
	private String countBatch;

	public String getCountCouple() {
		return countBatch;
	}

	public void setCountBatch(String countBatch) {
		this.countBatch = countBatch;
	}
	
	
	public String getBatchCancelNarration() {
		return BatchCancelNarration;
	}

	public void setBatchCancelNarration(String BatchCancelNarration) {
		this.BatchCancelNarration = BatchCancelNarration;
	}

	public String getIvfBatchStatus() {
		return ivfBatchStatus;
	}

	public void setIvfBatchStatus(String ivfBatchStatus) {
		this.ivfBatchStatus = ivfBatchStatus;
	}

	public List<IVFBatchMaster> getLtivfBatchMaster() {
		return ltivfBatchMaster;
	}

	public void setLtivfBatchMaster(List<IVFBatchMaster> ltivfBatchMaster) {
		this.ltivfBatchMaster = ltivfBatchMaster;
	}

	public Integer getCancelledBy() {
		return cancelledBy;
	}

	public void setIvfBatchMasterId(Integer ivfBatchMasterId) {
		this.ivfBatchMasterId = ivfBatchMasterId;
	}
	
	public Integer getIvfBatchMasterId() {
		return ivfBatchMasterId;
	}

	public void setIvfCoupleId(Integer ivfBatchMasterId) {
		this.ivfBatchMasterId = ivfBatchMasterId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
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
	
	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}
	
	public Integer getCancelledByBy() {
		return cancelledBy;
	}

	public void setCancelledBy(Integer cancelledBy) {
		this.cancelledBy = cancelledBy;
	}

	public Date getCancelledDateTime() {
		return cancelledDateTime;
	}

	public void setCancelledDateTime(Date cancelledDateTime) {
		this.cancelledDateTime = cancelledDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	
	public String getCancelNarration() {
		return cancelNarration;
	}

	public void setCancelNarration(String cancelNarration) {
		this.cancelNarration = cancelNarration;
	}
	
	public List<IVFBatchSlave> getLtivfBatchSlave() {
		return ltivfBatchSlave;
	}

	public void setLtivfBatchSlave(List<IVFBatchSlave> ltivfBatchSlave) {
		this.ltivfBatchSlave = ltivfBatchSlave;
	}
	
	public String getYearMonth() {
		return YearMonth;
	}

	public void setYearMonth(String yearmonth) {
		YearMonth = yearmonth;
	}
	
	public String getPickUpDate() {
		return pickUpDate;
	}
	public void setPickUpDate(String pickUpDate) {
		this.pickUpDate = pickUpDate;
	}
}
