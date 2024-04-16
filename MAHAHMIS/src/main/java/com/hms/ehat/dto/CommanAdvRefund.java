package com.hms.ehat.dto;

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
@Table(name = "ehat_common_advance_refund_master")
public class CommanAdvRefund {
	@Id
	@GeneratedValue
	@Column(name = "common_adv_refund_id")
	private int common_adv_refund_id;

	@Column(name = "commonadv_id")
	private int commonadv_id;
	
	@Column(name = "treatment_id")
	private int treatmentId=0;

	@Column(name = "common_adv_refund_amnt")
	private double common_adv_refund_amnt;
	
	@Column(name = "created_by",  updatable=false)
	private int createdBy;

	@Column(name = "updated_by")
	private int updatedBy;

	@Column(name = "deleted_by" )
	private int deletedBy;

	@Column(name = "deleted")
	private String deleted="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time", updatable = false)
	private Date deletedDate;
	
	@Column(name = "common_adv_balnce_amnt")
	private Double common_adv_balnce_amnt;
	public Double getCommon_adv_balnce_amnt() {
		return common_adv_balnce_amnt;
	}

	public void setCommon_adv_balnce_amnt(Double common_adv_balnce_amnt) {
		this.common_adv_balnce_amnt = common_adv_balnce_amnt;
	}

	@Transient
	private List<CommanAdvRefund> lstrefund;
	

	public List<CommanAdvRefund> getLstrefund() {
		return lstrefund;
	}

	public void setLstrefund(List<CommanAdvRefund> lstrefund) {
		this.lstrefund = lstrefund;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public int getCommon_adv_refund_id() {
		return common_adv_refund_id;
	}

	public void setCommon_adv_refund_id(int common_adv_refund_id) {
		this.common_adv_refund_id = common_adv_refund_id;
	}

	public int getCommonadv_id() {
		return commonadv_id;
	}

	public void setCommonadv_id(int commonadv_id) {
		this.commonadv_id = commonadv_id;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public double getCommon_adv_refund_amnt() {
		return common_adv_refund_amnt;
	}

	public void setCommon_adv_refund_amnt(double common_adv_refund_amnt) {
		this.common_adv_refund_amnt = common_adv_refund_amnt;
	}
	
	
}
