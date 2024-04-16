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

@Entity
@Table(name = "ehat_chemo_patient_order_sheet")
public class PatientChemoOrderSheetDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "patOrderSheet_id")
	private Integer patOrderId;
	
	@Column(name = "patient_id")
	private Integer patId;
	
	@Column(name = "treatment_id")
	private Integer treatId;
	
	@Column(name = "chemoDate")
	private String chemoDt;
	
	@Column(name = "chemo_orders")
	private String chemoOrders;
	
	@Column(name = "start_time")
	private String startTime;
	
	@Column(name = "stoptime")
	private String stopTime;
	
	@Column(name = "sign")
	private String signPat;
	
	@Column(name = "notes")
	private String noteDose;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "flag")
	private String flg="ACTIVE";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Transient
	private List<PatientChemoOrderSheetDto> lstPatChemoOrderSheetdetials;

	public Integer getPatOrderId() {
		return patOrderId;
	}

	public void setPatOrderId(Integer patOrderId) {
		this.patOrderId = patOrderId;
	}

	public Integer getPatId() {
		return patId;
	}

	public void setPatId(Integer patId) {
		this.patId = patId;
	}

	public Integer getTreatId() {
		return treatId;
	}

	public void setTreatId(Integer treatId) {
		this.treatId = treatId;
	}

	public String getChemoDt() {
		return chemoDt;
	}

	public void setChemoDt(String chemoDt) {
		this.chemoDt = chemoDt;
	}
	
	public String getChemoOrders() {
		return chemoOrders;
	}

	public void setChemoOrders(String chemoOrders) {
		this.chemoOrders = chemoOrders;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getStopTime() {
		return stopTime;
	}

	public void setStopTime(String stopTime) {
		this.stopTime = stopTime;
	}

	public String getSignPat() {
		return signPat;
	}

	public void setSignPat(String signPat) {
		this.signPat = signPat;
	}

	public String getNoteDose() {
		return noteDose;
	}

	public void setNoteDose(String noteDose) {
		this.noteDose = noteDose;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFlg() {
		return flg;
	}

	public void setFlg(String flg) {
		this.flg = flg;
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

	public List<PatientChemoOrderSheetDto> getLstPatChemoOrderSheetdetials() {
		return lstPatChemoOrderSheetdetials;
	}

	public void setLstPatChemoOrderSheetdetials(
			List<PatientChemoOrderSheetDto> lstPatChemoOrderSheetdetials) {
		this.lstPatChemoOrderSheetdetials = lstPatChemoOrderSheetdetials;
	}
	
	
}
