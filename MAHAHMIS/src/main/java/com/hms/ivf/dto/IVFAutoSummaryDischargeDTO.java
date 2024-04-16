package com.hms.ivf.dto;

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
@Table(name="ivf_auto_summary_info")
public class IVFAutoSummaryDischargeDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id",columnDefinition="int default 0")
	private Integer treatmentId=0;
	
	@Column(name = "ivf_treatment_id",columnDefinition="int default 0")
	private Integer ivftreatmentId=0;
	
	
	@Column(name = "patient_name",columnDefinition="varchar(200) default ''")
	private String patientName="";
	
	@Column(name = "patient_age",columnDefinition="varchar(20) default ''")
	private String patient_age="";
	
	@Column(name = "patient_gender",columnDefinition="varchar(20) default ''")
	private String patient_gender="";
	
	@Column(name = "ivf_discharge_date",columnDefinition="varchar(20) default ''")
	private String ivfDischargeDate="";
	
	@Column(name = "ivf_discharge_time",columnDefinition="varchar(20) default ''")
	private String ivfDischargeTime="";
	
	@Column(name = "ivf_discharge_type",columnDefinition="varchar(20) default ''")
	private String ivfDischargeType="";
	
	@Column(name = "admission_note",columnDefinition="varchar(5000) default ''")
	private String admissionNote="";
	
	@Column(name = "risk_factor",columnDefinition="varchar(5000) default ''")
	private String riskFactor="";
	

	@Column(name = "complications",columnDefinition="varchar(5000) default ''")
	private String complications="";
	
	@Column(name = "treatment_given",columnDefinition="varchar(5000) default ''")
	private String treatmentGiven="";
	
	@Column(name = "special_investigation",columnDefinition="varchar(5000) default ''")
	private String specialInvestigation="";
	
	@Column(name = "condition_at_discharge",columnDefinition="varchar(5000) default ''")
	private String conditionAtDischarge="";
	
	@Column(name = "advice_at_discharge",columnDefinition="varchar(5000) default ''")
	private String adviceAtDischarge="";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<IVFAutoSummaryDischargeDTO>  lstIVFAutoSummaryDischargeDTO;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	

	public Integer getIvftreatmentId() {
		return ivftreatmentId;
	}

	public void setIvftreatmentId(Integer ivftreatmentId) {
		this.ivftreatmentId = ivftreatmentId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPatient_age() {
		return patient_age;
	}

	public void setPatient_age(String patient_age) {
		this.patient_age = patient_age;
	}

	public String getPatient_gender() {
		return patient_gender;
	}

	public void setPatient_gender(String patient_gender) {
		this.patient_gender = patient_gender;
	}

	public String getAdmissionNote() {
		return admissionNote;
	}

	public void setAdmissionNote(String admissionNote) {
		this.admissionNote = admissionNote;
	}

	public String getRiskFactor() {
		return riskFactor;
	}

	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
	}

	public String getComplications() {
		return complications;
	}

	public void setComplications(String complications) {
		this.complications = complications;
	}

	public String getTreatmentGiven() {
		return treatmentGiven;
	}

	public void setTreatmentGiven(String treatmentGiven) {
		this.treatmentGiven = treatmentGiven;
	}

	public String getSpecialInvestigation() {
		return specialInvestigation;
	}

	public void setSpecialInvestigation(String specialInvestigation) {
		this.specialInvestigation = specialInvestigation;
	}

	public String getConditionAtDischarge() {
		return conditionAtDischarge;
	}

	public void setConditionAtDischarge(String conditionAtDischarge) {
		this.conditionAtDischarge = conditionAtDischarge;
	}

	public String getAdviceAtDischarge() {
		return adviceAtDischarge;
	}

	public void setAdviceAtDischarge(String adviceAtDischarge) {
		this.adviceAtDischarge = adviceAtDischarge;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
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

	public List<IVFAutoSummaryDischargeDTO> getLstIVFAutoSummaryDischargeDTO() {
		return lstIVFAutoSummaryDischargeDTO;
	}

	public void setLstIVFAutoSummaryDischargeDTO(List<IVFAutoSummaryDischargeDTO> lstIVFAutoSummaryDischargeDTO) {
		this.lstIVFAutoSummaryDischargeDTO = lstIVFAutoSummaryDischargeDTO;
	}

	public String getIvfDischargeDate() {
		return ivfDischargeDate;
	}

	public void setIvfDischargeDate(String ivfDischargeDate) {
		this.ivfDischargeDate = ivfDischargeDate;
	}

	public String getIvfDischargeTime() {
		return ivfDischargeTime;
	}

	public void setIvfDischargeTime(String ivfDischargeTime) {
		this.ivfDischargeTime = ivfDischargeTime;
	}

	public String getIvfDischargeType() {
		return ivfDischargeType;
	}

	public void setIvfDischargeType(String ivfDischargeType) {
		this.ivfDischargeType = ivfDischargeType;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	
	
}
