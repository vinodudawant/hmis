package com.hms.dto;

import java.io.Serializable;
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
import org.hibernate.annotations.Immutable;


@Entity 
@Table(name = "ehat_radiology_image_master")
public class RisImageUploadDTONew implements Serializable{
	
	private static final long serialVersionUID = 8516926010573252719L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idradiology_image_master")
	int idRadiologyTestReport;
	
	@Column(name = "ris_file")
	private String risFile;
	
	@Column(name = "treatment_id")
	int treatmentId=0;
	
	@Column(name = "radiology_test_id")
	private int radiologyTestId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	
	@Column(name = "test_id")
	int testId=0;
	
	
	@Column(name = "document_name")
	private String documentName;
	
	@Column(name = "comment")
	private String comment;
	
	
	// Meta data
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status="N";
	
	@Column(name = "created_by_user")
	private String createdByUser;
	
	@Transient
	private String stringDate;
	
	@Transient
	private List<RisImageUploadDTONew> lstRisImageUploadDTONew;

	public int getIdRadiologyTestReport() {
		return idRadiologyTestReport;
	}

	public void setIdRadiologyTestReport(int idRadiologyTestReport) {
		this.idRadiologyTestReport = idRadiologyTestReport;
	}

	public String getRisFile() {
		return risFile;
	}

	public void setRisFile(String risFile) {
		this.risFile = risFile;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getRadiologyTestId() {
		return radiologyTestId;
	}

	public void setRadiologyTestId(int radiologyTestId) {
		this.radiologyTestId = radiologyTestId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedByUser() {
		return createdByUser;
	}

	public void setCreatedByUser(String createdByUser) {
		this.createdByUser = createdByUser;
	}

	public String getStringDate() {
		return stringDate;
	}

	public void setStringDate(String stringDate) {
		this.stringDate = stringDate;
	}

	public List<RisImageUploadDTONew> getLstRisImageUploadDTONew() {
		return lstRisImageUploadDTONew;
	}

	public void setLstRisImageUploadDTONew(List<RisImageUploadDTONew> lstRisImageUploadDTONew) {
		this.lstRisImageUploadDTONew = lstRisImageUploadDTONew;
	}

	@Override
	public String toString() {
		return "RisImageUploadDTONew [idRadiologyTestReport=" + idRadiologyTestReport + ", risFile=" + risFile
				+ ", treatmentId=" + treatmentId + ", radiologyTestId=" + radiologyTestId + ", patientId=" + patientId
				+ ", testId=" + testId + ", documentName=" + documentName + ", comment=" + comment + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", status=" + status + ", createdByUser=" + createdByUser + ", stringDate=" + stringDate
				+ ", lstRisImageUploadDTONew=" + lstRisImageUploadDTONew + "]";
	}
	
}
