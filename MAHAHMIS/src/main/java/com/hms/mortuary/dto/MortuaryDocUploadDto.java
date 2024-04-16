package com.hms.mortuary.dto;

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
@Table(name="ehat_mortuary_image")
public class MortuaryDocUploadDto {

	@Id
	@GeneratedValue
	@Column(name = "image_id")
	private Integer imageId;

	@Column(name = "mor_id")
	private Integer morId;

	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "deleted")
	private String deleted = "N";

	@Column(name = "image_name")
	private String imageName;
	
	@Column(name = "image_path")
	private String imagePath;

	@Column(name = "folder_id")
	private Integer folderId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "image_status")
	private String imageStatus="N";
	
	@Column(name = "notes")
	private String note;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private String patientName;
	
	@Transient
	private String folderName;

	@Transient
	List<MortuaryDocUploadDto> lstDocUpload;

	public Integer getImageId() {
		return imageId;
	}

	public void setImageId(Integer imageId) {
		this.imageId = imageId;
	}

	public Integer getMorId() {
		return morId;
	}

	public void setMorId(Integer morId) {
		this.morId = morId;
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

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
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

	public String getImageStatus() {
		return imageStatus;
	}

	public void setImageStatus(String imageStatus) {
		this.imageStatus = imageStatus;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public List<MortuaryDocUploadDto> getLstDocUpload() {
		return lstDocUpload;
	}

	public void setLstDocUpload(List<MortuaryDocUploadDto> lstDocUpload) {
		this.lstDocUpload = lstDocUpload;
	}


	@Override
	public String toString() {
		return "MortuaryDocUploadDto [imageId=" + imageId + ", morId=" + morId
				+ ", unitId=" + unitId + ", deleted=" + deleted
				+ ", imageName=" + imageName + ", imagePath=" + imagePath
				+ ", folderId=" + folderId + ", createdBy=" + createdBy
				+ ", createdDateTime=" + createdDateTime + ", updatedBy="
				+ updatedBy + ", updatedDateTime=" + updatedDateTime
				+ ", deletedBy=" + deletedBy + ", imageStatus=" + imageStatus
				+ ", note=" + note + ", deletedDateTime=" + deletedDateTime
				+ ", patientName=" + patientName + ", folderName=" + folderName
				+ ", lstDocUpload=" + lstDocUpload + "]";
	}
}
