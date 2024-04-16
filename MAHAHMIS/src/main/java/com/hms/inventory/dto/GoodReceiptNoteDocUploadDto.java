package com.hms.inventory.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;


@Entity
@Component
@Table(name = "inv_grn_document_upload")
public class GoodReceiptNoteDocUploadDto implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "image_path")
	private String imagePath;

	@Column(name = "image_status")
	private String imageStatus="N";
	
	@Column(name = "notes")
	private String note;
	
	@Column(name = "grn_master_id")
	private Integer grnMasterId;
	
	public Integer getGrnMasterId() {
		return grnMasterId;
	}

	public void setGrnMasterId(Integer grnMasterId) {
		this.grnMasterId = grnMasterId;
	}

	@Transient
	private String folderName;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	private List<GoodReceiptNoteDocUploadDto> lstGoodReceiptNoteDocUploadDto;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
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

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<GoodReceiptNoteDocUploadDto> getLstGoodReceiptNoteDocUploadDto() {
		return lstGoodReceiptNoteDocUploadDto;
	}

	public void setLstGoodReceiptNoteDocUploadDto(
			List<GoodReceiptNoteDocUploadDto> lstGoodReceiptNoteDocUploadDto) {
		this.lstGoodReceiptNoteDocUploadDto = lstGoodReceiptNoteDocUploadDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "GoodReceiptNoteDocUploadDto [id=" + id 
				+ ", imagePath=" + imagePath 
				+ ", imageStatus=" + imageStatus + ", note=" + note
				+ ", grnMasterId=" + grnMasterId + ", folderName=" + folderName
				+ ", createdBy=" + createdBy + ", unitId=" + unitId
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deleted=" + deleted
				+ ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate
				+ ", lstGoodReceiptNoteDocUploadDto="
				+ lstGoodReceiptNoteDocUploadDto + "]";
	}
	
	

}
