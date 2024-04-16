package com.hms.ivf.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Table(name="ivf_clinical_evaluation_pregnancy")

public class IVFClinicalEvaluatonPregnancyDTO implements Serializable 
{
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "PregnancyIvf_id")
	private int pregnancyid;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;

	@Column(name = "lmpDateIvf",columnDefinition="varchar(255) default '-'")
	private String txtLMPDateIvf;
	
	
	@Column(name = "expectedDeliveryDateIvf",columnDefinition="varchar(255) default '-'")
	private String txtExpDeliveryDateIvf;
	
	@Column(name = "pregnancy")
	private String pregnancyFlag;
	
	
	@Column(name = "pogivf",columnDefinition="varchar(255) default '-'")
	private String txtPOGIvf;

	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by")
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;


	public int getPregnancyid() {
		return pregnancyid;
	}


	public void setPregnancyid(int pregnancyid) {
		this.pregnancyid = pregnancyid;
	}


	public int getPatientId() {
		return patientId;
	}


	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}


	public int getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}


	public String getTxtLMPDateIvf() {
		return txtLMPDateIvf;
	}


	public void setTxtLMPDateIvf(String txtLMPDateIvf) {
		this.txtLMPDateIvf = txtLMPDateIvf;
	}


	public String getTxtExpDeliveryDateIvf() {
		return txtExpDeliveryDateIvf;
	}


	public void setTxtExpDeliveryDateIvf(String txtExpDeliveryDateIvf) {
		this.txtExpDeliveryDateIvf = txtExpDeliveryDateIvf;
	}


	public String getPregnancyFlag() {
		return pregnancyFlag;
	}


	public void setPregnancyFlag(String pregnancyFlag) {
		this.pregnancyFlag = pregnancyFlag;
	}


	public String getTxtPOGIvf() {
		return txtPOGIvf;
	}


	public void setTxtPOGIvf(String txtPOGIvf) {
		this.txtPOGIvf = txtPOGIvf;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}


	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
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


	public Date getDeletedDateTime() {
		return deletedDateTime;
	}


	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}


	@Override
	public String toString() {
		return "IVFClinicalEvaluatonPregnancyDTO [pregnancyid=" + pregnancyid + ", patientId=" + patientId
				+ ", treatmentId=" + treatmentId + ", txtLMPDateIvf=" + txtLMPDateIvf + ", txtExpDeliveryDateIvf="
				+ txtExpDeliveryDateIvf + ", pregnancyFlag=" + pregnancyFlag + ", txtPOGIvf=" + txtPOGIvf
				+ ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime=" + deletedDateTime
				+ "]";
	}


	
 	
	
	

}
