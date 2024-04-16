package com.hms.dto;

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
@Table(name = "ehat_patient_care_advices_details")
public class PatientCareAdvicesDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "care_advice_id")
	private Integer careAdviceId;
	
	@Column(name = "palliative")
	private String pallCare;
	
	@Column(name = "supportive")
	private String suppCare;
	
	@Column(name = "preventive")
	private String prevCare;
	
	@Column(name = "rehabilitative")
	private String rehabCare;
	
	@Column(name = "otherservices")
	private String otherServ;
	
	@Column(name = "patient_id")
	private Integer patId;
	
	@Column(name = "treatment_id")
	private Integer treatId;
	
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
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<PatientCareAdvicesDto> lstPatCareAdvicedetails;

	public Integer getCareAdviceId() {
		return careAdviceId;
	}

	public void setCareAdviceId(Integer careAdviceId) {
		this.careAdviceId = careAdviceId;
	}

	public String getPallCare() {
		return pallCare;
	}

	public void setPallCare(String pallCare) {
		this.pallCare = pallCare;
	}

	public String getSuppCare() {
		return suppCare;
	}

	public void setSuppCare(String suppCare) {
		this.suppCare = suppCare;
	}

	public String getPrevCare() {
		return prevCare;
	}

	public void setPrevCare(String prevCare) {
		this.prevCare = prevCare;
	}

	public String getRehabCare() {
		return rehabCare;
	}

	public void setRehabCare(String rehabCare) {
		this.rehabCare = rehabCare;
	}


	public String getOtherServ() {
		return otherServ;
	}

	public void setOtherServ(String otherServ) {
		this.otherServ = otherServ;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PatientCareAdvicesDto> getLstPatCareAdvicedetails() {
		return lstPatCareAdvicedetails;
	}

	public void setLstPatCareAdvicedetails(
			List<PatientCareAdvicesDto> lstPatCareAdvicedetails) {
		this.lstPatCareAdvicedetails = lstPatCareAdvicedetails;
	}
	
}
