package com.hms.ambulance.dto;

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

@Entity
@Table( name ="checklist")
public class ChecklistMasterDto {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name ="checklist_id")
	private int checklistId;
	
	@Column(name ="checklist_type")
	private String checklistType; 
	
	@Transient
	private List<ChecklistMasterDto> listChecklistMasterDto;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

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
	
	@Column(name = "unit_id")
	private Integer unitId;

	public int getChecklistId() {
		return checklistId;
	}

	public void setChecklistId(int checklistId) {
		this.checklistId = checklistId;
	}

	public String getChecklistType() {
		return checklistType;
	}

	public void setChecklistType(String checklistType) {
		this.checklistType = checklistType;
	}

	public List<ChecklistMasterDto> getListChecklistMasterDto() {
		return listChecklistMasterDto;
	}

	public void setListChecklistMasterDto(List<ChecklistMasterDto> listChecklistMasterDto) {
		this.listChecklistMasterDto = listChecklistMasterDto;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

}
