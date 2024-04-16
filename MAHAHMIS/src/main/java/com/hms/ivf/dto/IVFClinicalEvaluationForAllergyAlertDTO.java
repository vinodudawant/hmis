package com.hms.ivf.dto;

import java.io.Serializable;
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

import org.hibernate.annotations.UpdateTimestamp;
@Entity
@Table(name="ivf_clinical_evaluation_allergyalert")
public class IVFClinicalEvaluationForAllergyAlertDTO implements Serializable {
	
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "allergyalert_id")
	private int allergyalertid;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;


	
	@Column(name = "allergyname",columnDefinition="varchar(500) default ''")
	private String allergyName="";
	
	@Column(name = "allergytype",columnDefinition="varchar(500) default ''")
	private String allergyType="";
	
	@Column(name = "allergytypename",columnDefinition="varchar(500) default ''")
	private String allergyTypeName="";
	
	
	@Column(name = "allergyreaction",columnDefinition="varchar(500) default ''")
	private String allergyReaction="";


	@Column(name = "allergyreactionename",columnDefinition="varchar(500) default ''")
	private String allergyReactionName="";
	
	
	@Column(name = "observeddate",columnDefinition="varchar(500) default ''")
	private String firstobservedDdate="";
	
	@Column(name = "allergynote",columnDefinition="varchar(500) default ''")
	private String allergyNote="";
	
	
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

	public int getAllergyalertid() {
		return allergyalertid;
	}

	public void setAllergyalertid(int allergyalertid) {
		this.allergyalertid = allergyalertid;
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

	public String getAllergyName() {
		return allergyName;
	}

	public void setAllergyName(String allergyName) {
		this.allergyName = allergyName;
	}

	public String getAllergyType() {
		return allergyType;
	}

	public void setAllergyType(String allergyType) {
		this.allergyType = allergyType;
	}

	public String getAllergyTypeName() {
		return allergyTypeName;
	}

	public void setAllergyTypeName(String allergyTypeName) {
		this.allergyTypeName = allergyTypeName;
	}

	public String getAllergyReaction() {
		return allergyReaction;
	}

	public void setAllergyReaction(String allergyReaction) {
		this.allergyReaction = allergyReaction;
	}

	public String getAllergyReactionName() {
		return allergyReactionName;
	}

	public void setAllergyReactionName(String allergyReactionName) {
		this.allergyReactionName = allergyReactionName;
	}

	public String getFirstobservedDdate() {
		return firstobservedDdate;
	}

	public void setFirstobservedDdate(String firstobservedDdate) {
		this.firstobservedDdate = firstobservedDdate;
	}

	public String getAllergyNote() {
		return allergyNote;
	}

	public void setAllergyNote(String allergyNote) {
		this.allergyNote = allergyNote;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "IVFClinicalEvaluationForAllergyAlertDTO [allergyalertid=" + allergyalertid + ", patientId=" + patientId
				+ ", treatmentId=" + treatmentId + ", allergyName=" + allergyName + ", allergyType=" + allergyType
				+ ", allergyTypeName=" + allergyTypeName + ", allergyReaction=" + allergyReaction
				+ ", allergyReactionName=" + allergyReactionName + ", firstobservedDdate=" + firstobservedDdate
				+ ", allergyNote=" + allergyNote + ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy
				+ ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + "]";
	}
	
	@Transient
	private List<IVFClinicalEvaluationForAllergyAlertDTO> lstclinicalevaluationallergyallert;

	public List<IVFClinicalEvaluationForAllergyAlertDTO> getLstclinicalevaluationallergyallert() {
		return lstclinicalevaluationallergyallert;
	}

	public void setLstclinicalevaluationallergyallert(
			List<IVFClinicalEvaluationForAllergyAlertDTO> lstclinicalevaluationallergyallert) {
		this.lstclinicalevaluationallergyallert = lstclinicalevaluationallergyallert;
	}
	

	
	
	

}
