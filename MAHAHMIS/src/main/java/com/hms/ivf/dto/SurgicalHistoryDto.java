package com.hms.ivf.dto;

import java.io.Serializable;

import java.util.Date;
import java.util.List;

import javax.annotation.Generated;
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
@Table(name="surgical_history_info")
public class SurgicalHistoryDto {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "surgical_his_id")
	private int surgicalHisid;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "ivf_treatment_id")
	private int ivf_treatmentId;
	
	@Column(name = "checkbox")
	private String checkbox;
	
	@Column(name = "operation_name",columnDefinition="varchar(500) default ''")
	private String operationName="";
	
	@Column(name = "date",columnDefinition="varchar(500) default ''")
	private String dateF="";
	
	@Column(name = "descrip_note",columnDefinition="varchar(500) default ''")
	private String descripNote="";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name = "surgical_radio_falg",columnDefinition="varchar(250) default '' ")
	private String surgicalRadioFalg="";
	
	@Transient
	private List<SurgicalHistoryDto> listSurgicalHis;

	@Column(name = "created_by")
	private int createdBy;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	public int getSurgicalHisid() {
		return surgicalHisid;
	}

	public void setSurgicalHisid(int surgicalHisid) {
		this.surgicalHisid = surgicalHisid;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getCheckbox() {
		return checkbox;
	}

	public void setCheckbox(String checkbox) {
		this.checkbox = checkbox;
	}

	public String getOperationName() {
		return operationName;
	}

	public void setOperationName(String operationName) {
		this.operationName = operationName;
	}

	public String getDateF() {
		return dateF;
	}

	public void setDateF(String dateF) {
		this.dateF = dateF;
	}

	public String getDescripNote() {
		return descripNote;
	}

	public void setDescripNote(String descripNote) {
		this.descripNote = descripNote;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<SurgicalHistoryDto> getListSurgicalHis() {
		return listSurgicalHis;
	}

	public void setListSurgicalHis(List<SurgicalHistoryDto> listSurgicalHis) {
		this.listSurgicalHis = listSurgicalHis;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "SurgicalHistoryDto [surgicalHisid=" + surgicalHisid + ", patientId=" + patientId + ", treatmentId="
				+ treatmentId + ", checkbox=" + checkbox + ", operationName=" + operationName + ", dateF=" + dateF
				+ ", descripNote=" + descripNote + ", createdDateTime=" + createdDateTime + ", unitId=" + unitId
				+ ", userId=" + userId + ", listSurgicalHis=" + listSurgicalHis + ", createdBy=" + createdBy
				+ ", updatedDateTime=" + updatedDateTime + ", updatedBy=" + updatedBy + ", deletedDateTime="
				+ deletedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted + "]";
	}

	public String getSurgicalRadioFalg() {
		return surgicalRadioFalg;
	}

	public void setSurgicalRadioFalg(String surgicalRadioFalg) {
		this.surgicalRadioFalg = surgicalRadioFalg;
	}

	public int getIvf_treatmentId() {
		return ivf_treatmentId;
	}

	public void setIvf_treatmentId(int ivf_treatmentId) {
		this.ivf_treatmentId = ivf_treatmentId;
	}

	

	

	

}
