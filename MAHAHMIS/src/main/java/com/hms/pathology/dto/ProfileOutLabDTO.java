package com.hms.pathology.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_profile_outlab")
public class ProfileOutLabDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer idOutlab;

	@Column(name = "name")
	private Integer name;

	@Column(name = "type")
	private String type;
	
	@Column(name = "labStatus")
	private String labStatus;

	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "update_date_time")
	private Date updatedDate;
	
	@Transient
	private List<ProfileOutLabDTO> outlabList;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "out_lab_id")
	private OutLabMasterDto dto;
	
	@Transient
	private Integer labId;
	
	
	public Integer getIdOutlab() {
		return idOutlab;
	}

	public void setIdOutlab(Integer idOutlab) {
		this.idOutlab = idOutlab;
	}

	public Integer getName() {
		return name;
	}

	public void setName(Integer name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLabStatus() {
		return labStatus;
	}

	public void setLabStatus(String labStatus) {
		this.labStatus = labStatus;
	}


	public List<ProfileOutLabDTO> getOutlabList() {
		return outlabList;
	}

	public void setOutlabList(List<ProfileOutLabDTO> outlabList) {
		this.outlabList = outlabList;
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

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public OutLabMasterDto getDto() {
		return dto;
	}

	public void setDto(OutLabMasterDto dto) {
		this.dto = dto;
	}

	public Integer getLabId() {
		return labId;
	}

	public void setLabId(Integer labId) {
		this.labId = labId;
	}

	@Override
	public String toString() {
		return "ProfileOutLabDTO [idOutlab=" + idOutlab + ", name=" + name
				+ ", type=" + type + ", labStatus=" + labStatus + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deletedBy=" + deletedBy + ", createDate="
				+ createDate + ", updatedDate=" + updatedDate + ", outlabList="
				+ outlabList + ", dto=" + dto + ", labId=" + labId + "]";
	}
}