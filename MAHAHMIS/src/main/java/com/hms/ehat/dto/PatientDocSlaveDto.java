package com.hms.ehat.dto;

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
@Table(name="ehat_patient_doc_slave")
public class PatientDocSlaveDto {
	@Id
	@GeneratedValue
	@Column(name = "patient_slave_id")
	private Integer patientSlaveID;

	@Column(name = "doc_id")
	private Integer docId;	
	
	@Column(name = "doc_name")
	private String docName;
	
	@Column(name = "folder_id")
	private Integer folderId;
	
	@Column(name = "folder_name")
	private String folderName;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;	

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Transient
	private List<PatientDocSlaveDto> lstPatintSalve;
	
	@Transient
	private List<PatientDocMasterDto> lstPatintMast;
	
	@Transient
	private String patientName;
	@Transient
	private Integer patientId;
	@Transient
	private Integer treatmentId;
	@Transient
	private Integer roomID;
	@Transient
	private Integer rackId;
	@Transient
	private Integer filetype;
	
	@Transient
	private String duration;
	
	@Transient
	private Integer shelFId;
	
	@Transient
	private String barcode;
	
	@Transient
	private Integer patientDocId;
	
	@Transient
	Set<Integer> treatlist;

	public Integer getPatientSlaveID() {
		return patientSlaveID;
	}

	public void setPatientSlaveID(Integer patientSlaveID) {
		this.patientSlaveID = patientSlaveID;
	}

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public Integer getFolderId() {
		return folderId;
	}

	public void setFolderId(Integer folderId) {
		this.folderId = folderId;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

	public List<PatientDocSlaveDto> getLstPatintSalve() {
		return lstPatintSalve;
	}

	public void setLstPatintSalve(List<PatientDocSlaveDto> lstPatintSalve) {
		this.lstPatintSalve = lstPatintSalve;
	}

	public List<PatientDocMasterDto> getLstPatintMast() {
		return lstPatintMast;
	}

	public void setLstPatintMast(List<PatientDocMasterDto> lstPatintMast) {
		this.lstPatintMast = lstPatintMast;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
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

	public Integer getRoomID() {
		return roomID;
	}

	public void setRoomID(Integer roomID) {
		this.roomID = roomID;
	}

	public Integer getRackId() {
		return rackId;
	}

	public void setRackId(Integer rackId) {
		this.rackId = rackId;
	}

	public Integer getFiletype() {
		return filetype;
	}

	public void setFiletype(Integer filetype) {
		this.filetype = filetype;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Integer getShelFId() {
		return shelFId;
	}

	public void setShelFId(Integer shelFId) {
		this.shelFId = shelFId;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public Integer getPatientDocId() {
		return patientDocId;
	}

	public void setPatientDocId(Integer patientDocId) {
		this.patientDocId = patientDocId;
	}

	public Set<Integer> getTreatlist() {
		return treatlist;
	}

	public void setTreatlist(Set<Integer> treatlist) {
		this.treatlist = treatlist;
	}

	

	
}
