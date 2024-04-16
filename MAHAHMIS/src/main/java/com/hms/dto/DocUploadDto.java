package com.hms.dto;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name="ehat_doc_upload")
public class DocUploadDto {
	
	@Id
	@GeneratedValue
	@Column(name = "doc_id")
	private Integer docId;

	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "center_patient_id")
	private String centerPatientId;

	@Column(name = "treatment_id")
	private Integer treatmentId;

	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "deleted")
	private String deleted = "N";

	@Column(name = "doc_name")
	private String docName;
	
	@Column(name = "doc_path")
	private String docPath;

	@Column(name = "folder_id")
	private Integer folderId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "shelf_status")
	private String ShelfStatus="N";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private String patientName;
	
	@Transient
	private String folderName;

	@Transient
	List<DocUploadDto> lstDocUpload;
	
	@Transient
	Set<Integer> treatlist;

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public String getDocPath() {
		return docPath;
	}

	public void setDocPath(String docPath) {
		this.docPath = docPath;
	}

	public Integer getFolderId() {
		return folderId;
	}

	public void setFolderId(Integer folderId) {
		this.folderId = folderId;
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

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
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

	public String getShelfStatus() {
		return ShelfStatus;
	}

	public void setShelfStatus(String shelfStatus) {
		ShelfStatus = shelfStatus;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public List<DocUploadDto> getLstDocUpload() {
		return lstDocUpload;
	}

	public void setLstDocUpload(List<DocUploadDto> lstDocUpload) {
		this.lstDocUpload = lstDocUpload;
	}

	public Set<Integer> getTreatlist() {
		return treatlist;
	}

	public void setTreatlist(Set<Integer> treatlist) {
		this.treatlist = treatlist;
	}	
}
