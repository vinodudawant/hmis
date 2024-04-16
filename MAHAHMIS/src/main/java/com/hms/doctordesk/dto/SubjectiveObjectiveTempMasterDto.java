package com.hms.doctordesk.dto;

import java.io.Serializable;
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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.BodyPartMasterDto;

@Entity
@Table(name = "opd_subjective_objective_temp_master_dto")
public class SubjectiveObjectiveTempMasterDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "sub_obj_temp_id")
	private Integer subObjTempId;
	
	@Column(name = "template_name")
	private String subTempName;
	
	@Column(name = "speciality")
	private int subSpeciality;
	
	@Column(name = "body_part")
	private int subBodyPart;
	
	@Column(name = "template_type")
	private int subTemplateType;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private Integer unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private Integer userId=1;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;	

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	//@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "status",columnDefinition="varchar(2) default 'N'")
	private String status="N";
	
	@Transient
	private List<SubjectiveObjectiveTempMasterDto> lstSubjectiveObjectiveTempDto;

	public Integer getSubObjTempId() {
		return subObjTempId;
	}

	public void setSubObjTempId(Integer subObjTempId) {
		this.subObjTempId = subObjTempId;
	}

	public String getSubTempName() {
		return subTempName;
	}

	public void setSubTempName(String subTempName) {
		this.subTempName = subTempName;
	}

	public int getSubSpeciality() {
		return subSpeciality;
	}

	public void setSubSpeciality(int subSpeciality) {
		this.subSpeciality = subSpeciality;
	}

	public int getSubBodyPart() {
		return subBodyPart;
	}

	public void setSubBodyPart(int subBodyPart) {
		this.subBodyPart = subBodyPart;
	}

	public int getSubTemplateType() {
		return subTemplateType;
	}

	public void setSubTemplateType(int subTemplateType) {
		this.subTemplateType = subTemplateType;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<SubjectiveObjectiveTempMasterDto> getLstSubjectiveObjectiveTempDto() {
		return lstSubjectiveObjectiveTempDto;
	}

	public void setLstSubjectiveObjectiveTempDto(List<SubjectiveObjectiveTempMasterDto> lstSubjectiveObjectiveTempDto) {
		this.lstSubjectiveObjectiveTempDto = lstSubjectiveObjectiveTempDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "SubjectiveObjectiveTempMasterDto [subObjTempId=" + subObjTempId + ", subTempName=" + subTempName
				+ ", subSpeciality=" + subSpeciality + ", subBodyPart=" + subBodyPart + ", subTemplateType="
				+ subTemplateType + ", unitId=" + unitId + ", userId=" + userId + ", createdBy=" + createdBy
				+ ", createdDateTime=" + createdDateTime + ", updatedBy=" + updatedBy + ", updatedDateTime="
				+ updatedDateTime + ", deletedDateTime=" + deletedDateTime + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", status=" + status + ", lstSubjectiveObjectiveTempDto=" + lstSubjectiveObjectiveTempDto
				+ "]";
	}

	
	
	
	
}
