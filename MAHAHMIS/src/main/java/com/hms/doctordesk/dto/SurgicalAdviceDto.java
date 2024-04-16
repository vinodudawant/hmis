package com.hms.doctordesk.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "dd_surgical_advice")
public class SurgicalAdviceDto {

	@Id
	@GeneratedValue
	@Column(name = "sx_advice_id")
	private int id;

	@Column(name = "procedure_name")
	private String procedureName;

	@Column(name = "procedure_type_name")
	private String proTypeName;

	@Column(name = "procedure_group_name")
	private String proGrpName;

	@Column(name = "procedure_type_id")
	private int procedureTypeId;

	@Column(name = "procedure_grp_id")
	private int procedureGrpId;
	
	@Column(name = "pro_name_id")
	private int pronameid;

	@Column(name = "sur_advice_type")
	private String sadviceType;

	@Column(name = "advice_date")
	private String adviceDate;

	@Column(name = "proceduer_date")
	private String proceduerDate;

	@Column(name = "sx_note")
	private String note;

	@Column(name = "sx_risk_factor")
	private String riskFactor;

	@Column(name = "treatment_id")
	private int treatmentId;
	

	@Column(name="patient_id")
	private Integer patientId;
	
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

	public String getProTypeName() {
		return proTypeName;
	}

	public void setProTypeName(String proTypeName) {
		this.proTypeName = proTypeName;
	}

	public String getProGrpName() {
		return proGrpName;
	}

	public void setProGrpName(String proGrpName) {
		this.proGrpName = proGrpName;
	}

	public int getProcedureTypeId() {
		return procedureTypeId;
	}

	public void setProcedureTypeId(int procedureTypeId) {
		this.procedureTypeId = procedureTypeId;
	}

	public int getProcedureGrpId() {
		return procedureGrpId;
	}

	public void setProcedureGrpId(int procedureGrpId) {
		this.procedureGrpId = procedureGrpId;
	}

	public String getSadviceType() {
		return sadviceType;
	}

	public void setSadviceType(String sadviceType) {
		this.sadviceType = sadviceType;
	}

	public String getAdviceDate() {
		return adviceDate;
	}

	public void setAdviceDate(String adviceDate) {
		this.adviceDate = adviceDate;
	}

	public String getProceduerDate() {
		return proceduerDate;
	}

	public void setProceduerDate(String proceduerDate) {
		this.proceduerDate = proceduerDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getRiskFactor() {
		return riskFactor;
	}

	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
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

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public int getPronameid() {
		return pronameid;
	}

	public void setPronameid(int pronameid) {
		this.pronameid = pronameid;
	}

}
