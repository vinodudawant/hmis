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
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name = "ehat_ivf_treatment")
public class IVFTreatmentDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ivf_treat_id")
	private Integer ivfTreatId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_id",columnDefinition="int default 0")
	private int billId=0;
	
	@Column(name = "ivf_status",columnDefinition="varchar(2) default 'N'")
	private String ivfStatus="N";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "cancel_narration")
	private String cancelNarration="-";
	
	@Column(name = "adm_cancel_flag")
	private String admCancelFlag="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "admsn_can_date_time")
	private Date admissionCanDateTime;
	
	@Column(name = "admsn_canceled_by")
	private Integer admissionCanceledBy;
	
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "ivf_treat_flag",columnDefinition="varchar(2) default 'Y'")
	private String ivfTreatFlag="Y";
	
	@Transient
	private List<IVFTreatmentDTO> listIvfTreatment;

	public Integer getIvfTreatId() {
		return ivfTreatId;
	}

	public void setIvfTreatId(Integer ivfTreatId) {
		this.ivfTreatId = ivfTreatId;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public String getIvfStatus() {
		return ivfStatus;
	}

	public void setIvfStatus(String ivfStatus) {
		this.ivfStatus = ivfStatus;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	public String getAdmCancelFlag() {
		return admCancelFlag;
	}

	public void setAdmCancelFlag(String admCancelFlag) {
		this.admCancelFlag = admCancelFlag;
	}
	
	public String getCancelNarration() {
		return cancelNarration;
	}

	public void setCancelNarration(String cancelNarration) {
		this.cancelNarration = cancelNarration;
	}
	
	public Date getAdmissionCanDateTime() {
		return admissionCanDateTime;
	}

	public void setAdmissionCanDateTime(Date admissionCanDateTime) {
		this.admissionCanDateTime = admissionCanDateTime;
	}

	public Integer getAdmissionCanceledBy() {
		return admissionCanceledBy;
	}

	public void setAdmissionCanceledBy(Integer admissionCanceledBy) {
		this.admissionCanceledBy = admissionCanceledBy;
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

	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}

	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}
	
	public List<IVFTreatmentDTO> getListIvfTreatment() {
		return listIvfTreatment;
	}

	public void setListIvfTreatment(List<IVFTreatmentDTO> listIvfTreatment) {
		this.listIvfTreatment = listIvfTreatment;
	}

	@Override
	public String toString() {
		return "IVFTreatmentDTO [ivfTreatId=" + ivfTreatId + ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", billId=" + billId + ", ivfStatus=" + ivfStatus + ", createdDateTime=" + createdDateTime
				+ ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deletedDateTime="
				+ deletedDateTime + ", unitId=" + unitId + ", ivfTreatFlag=" + ivfTreatFlag + "]";
	}

	

	
	

}
