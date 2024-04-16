package com.hms.ot.dto;

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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "ot_procedure_master")
public class ProcedureMasterDto {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "pro_master_id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	@Column(name = "procedure_name")
	private String procedureName;
	@Column(name = "pro_type_id")
	private int proTypeId;
	@Column(name = "pro_grp_id")
	private int proGrpId;
	@Column(name = "pro_cat_id")
	private int procatId;
	@Column(name = "type")
	private String type;
	@Column(name = "cathlab")
	private String cathlab;
	
	@ManyToOne
	@JoinColumn(name="fk_pro_type_id")
	private ProcedureTypeMasterDto procedureTypeMasterDto;
	
	@ManyToOne
	@JoinColumn(name="fk_pro_grp_id")
	private ProcedureGroupMasterDto procedureGroupMasterDto;
	// logs
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	@Column(name = "user_id")
	private int userId;
	@Column(name = "created_by", updatable = false)
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deleted_by;
	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name = "unit_id")
	private Integer unitId;
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getProcedureName() {
		return procedureName;
	}
	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}
	
	
	public int getProTypeId() {
		return proTypeId;
	}
	public void setProTypeId(int proTypeId) {
		this.proTypeId = proTypeId;
	}
	public int getProGrpId() {
		return proGrpId;
	}
	public void setProGrpId(int proGrpId) {
		this.proGrpId = proGrpId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getProcatId() {
		return procatId;
	}
	public void setProcatId(int procatId) {
		this.procatId = procatId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCathlab() {
		return cathlab;
	}
	public void setCathlab(String cathlab) {
		this.cathlab = cathlab;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}
	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
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
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
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
	public ProcedureTypeMasterDto getProcedureTypeMasterDto() {
		return procedureTypeMasterDto;
	}
	public void setProcedureTypeMasterDto(
			ProcedureTypeMasterDto procedureTypeMasterDto) {
		this.procedureTypeMasterDto = procedureTypeMasterDto;
	}
	public ProcedureGroupMasterDto getProcedureGroupMasterDto() {
		return procedureGroupMasterDto;
	}
	public void setProcedureGroupMasterDto(
			ProcedureGroupMasterDto procedureGroupMasterDto) {
		this.procedureGroupMasterDto = procedureGroupMasterDto;
	}
	
	
	
	
}
