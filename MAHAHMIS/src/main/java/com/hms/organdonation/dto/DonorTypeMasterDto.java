package com.hms.organdonation.dto;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "organ_donor_type_master")
public class DonorTypeMasterDto {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private int donorTypeId;
	
	@Column(name = "donor_type")
	private String donorType;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Transient
	private List<DonorTypeMasterDto> lstDonorTypeMasterDto;

	public int getDonorTypeId() {
		return donorTypeId;
	}

	public void setDonorTypeId(int donorTypeId) {
		this.donorTypeId = donorTypeId;
	}

	public String getDonorType() {
		return donorType;
	}

	public void setDonorType(String donorType) {
		this.donorType = donorType;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

	public List<DonorTypeMasterDto> getLstDonorTypeMasterDto() {
		return lstDonorTypeMasterDto;
	}

	public void setLstDonorTypeMasterDto(
			List<DonorTypeMasterDto> lstDonorTypeMasterDto) {
		this.lstDonorTypeMasterDto = lstDonorTypeMasterDto;
	}

	@Override
	public String toString() {
		return "DonorTypeMasterDto [donorTypeId=" + donorTypeId
				+ ", donorType=" + donorType + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate="
				+ deletedDate + ", deletedBy=" + deletedBy + ", unitId="
				+ unitId + ", deleted=" + deleted + ", lstDonorTypeMasterDto="
				+ lstDonorTypeMasterDto + "]";
	}
	

}
