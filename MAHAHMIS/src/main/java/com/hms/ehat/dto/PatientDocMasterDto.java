package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name="ehat_patient_doc_master")
public class PatientDocMasterDto {
	@Id
	@GeneratedValue
	@Column(name = "patient_doc_id")
	private Integer patientDocId;	//@Transient

	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "center_patient_id")
	private String centerPatientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "barcode")
	private String barcode;
	
	@Column(name = "room_id")
	private Integer roomID;
	
	@Column(name = "rack_id")
	private Integer rackId;
	
	@Column(name = "shelf_id")
	private Integer shelfId;
	
	@Column(name = "filetype")
	private Integer filetype;
	
	@Column(name = "duration")
	private String  duration;
	
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
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "storage_location")
	private String storageLocation;

	@Transient
	private List<PatientDocMasterDto> lstPatintMaster;
		
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="master_id")
	private List<PatientDocSlaveDto> lstPatintSalve;

	public Integer getPatientDocId() {
		return patientDocId;
	}

	public void setPatientDocId(Integer patientDocId) {
		this.patientDocId = patientDocId;
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

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
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

	public Integer getShelfId() {
		return shelfId;
	}

	public void setShelfId(Integer shelfId) {
		this.shelfId = shelfId;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStorageLocation() {
		return storageLocation;
	}

	public void setStorageLocation(String storageLocation) {
		this.storageLocation = storageLocation;
	}

	public List<PatientDocMasterDto> getLstPatintMaster() {
		return lstPatintMaster;
	}

	public void setLstPatintMaster(List<PatientDocMasterDto> lstPatintMaster) {
		this.lstPatintMaster = lstPatintMaster;
	}

	public List<PatientDocSlaveDto> getLstPatintSalve() {
		return lstPatintSalve;
	}

	public void setLstPatintSalve(List<PatientDocSlaveDto> lstPatintSalve) {
		this.lstPatintSalve = lstPatintSalve;
	}	
}
