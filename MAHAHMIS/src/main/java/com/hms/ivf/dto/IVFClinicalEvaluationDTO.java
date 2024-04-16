package com.hms.ivf.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;
@Entity
@Table(name="ivf_clinical_evaluation")

public class IVFClinicalEvaluationDTO implements Serializable {
	

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "cid")
	private int cid;
	
	
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	
	@Column(name = "idTreatmentCkeditorIvf")
	private int idTreatmentCkeditorIvf;
	
	@Column(name = "speciality",columnDefinition="varchar(500) default ''")
	private String speciality="";
	
	@Column(name = "speciality_name",columnDefinition="varchar(500) default ''")
	private String specialityName="";
	
	@Column(name = "templatet",columnDefinition="varchar(500) default ''")
	
	private String templateT="";
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by")
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	
	
	
	
	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getSpecialityName() {
		return specialityName;
	}

	public void setSpecialityName(String specialityName) {
		this.specialityName = specialityName;
	}

	public String getTemplateT() {
		return templateT;
	}

	public void setTemplateT(String templateT) {
		this.templateT = templateT;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	@Column(name = "template_name",columnDefinition="varchar(500) default ''")
	private String templateName="";
	
	
	
	@Column(name = "keyValueCKEditorArrayDivIvf",columnDefinition="varchar(255) default ''")
	private String keyValueCKEditorArrayDivIvf;
	
	@Column(name = "editorSubObjTreatmentData",columnDefinition="varchar(255) default ''")
	private String editorSubObjTreatmentData;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
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

	public int getIdTreatmentCkeditorIvf() {
		return idTreatmentCkeditorIvf;
	}

	public void setIdTreatmentCkeditorIvf(int idTreatmentCkeditorIvf) {
		this.idTreatmentCkeditorIvf = idTreatmentCkeditorIvf;
	}

	public String getKeyValueCKEditorArrayDivIvf() {
		return keyValueCKEditorArrayDivIvf;
	}

	public void setKeyValueCKEditorArrayDivIvf(String keyValueCKEditorArrayDivIvf) {
		this.keyValueCKEditorArrayDivIvf = keyValueCKEditorArrayDivIvf;
	}

	public String getEditorSubObjTreatmentData() {
		return editorSubObjTreatmentData;
	}

	public void setEditorSubObjTreatmentData(String editorSubObjTreatmentData) {
		this.editorSubObjTreatmentData = editorSubObjTreatmentData;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	@Override
	public String toString() {
		return "IVFClinicalEvaluationDTO [cid=" + cid + ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", idTreatmentCkeditorIvf=" + idTreatmentCkeditorIvf + ", speciality=" + speciality
				+ ", specialityName=" + specialityName + ", templateT=" + templateT + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deletedDateTime=" + deletedDateTime + ", templateName=" + templateName
				+ ", keyValueCKEditorArrayDivIvf=" + keyValueCKEditorArrayDivIvf + ", editorSubObjTreatmentData="
				+ editorSubObjTreatmentData + ", unitId=" + unitId + ", userId=" + userId + "]";
	}

	
	
	
	
}
