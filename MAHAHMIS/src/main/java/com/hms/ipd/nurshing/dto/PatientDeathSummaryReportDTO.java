package com.hms.ipd.nurshing.dto;


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

@Entity
@Table(name = "patient_death_summary_report")
public class PatientDeathSummaryReportDTO {

	 @Id   
     @GeneratedValue   
     @Column(name = "patient_death_id") 
     private Integer patientDeathId;
	 
	 @Column(name = "patient_id") 
     private Integer patientId; 
	 
	 @Column(name = "treatment_id") 
     private Integer treatmentId; 
	 
	 @Column(name = "patient_name",columnDefinition="varchar(500) default 'N'") 
	 private String patientName="NA";
	 
	 @Column(name = "dpatient_gender",columnDefinition="varchar(10) default 'N'") 
	 private String patientGeneder="NA";
	 
	 @Column(name = "dpatient_age",columnDefinition="varchar(20) default 'N'") 
	 private String patientAge="NA";
	 
	 @Column(name = "dpatient_address",columnDefinition="varchar(900) default 'N'") 
	 private String patientAddress="NA";
	 
	 @Column(name = "dpatient_contact",columnDefinition="varchar(10) default 'N'") 
	 private String patientContact="NA";
	 
	 @Column(name = "dpatient_occupation",columnDefinition="varchar(100) default 'N'") 
	 private String patientOccuption="NA";
	 
	 @Column(name = "dpatient_onset_illness_date",columnDefinition="varchar(20) default 'N'") 
	 private String patientDate="NA";
	 
	 @Column(name = "dpatient_symptom",columnDefinition="varchar(900) default 'N'") 
	 private String patientSymptom="NA";
	 
	 @Column(name = "dpatient_physical_condion",columnDefinition="varchar(900) default 'N'") 
	 private String patientPhysicalCondition="NA";
	 
	 @Column(name = "dpatient_treatment_detail",columnDefinition="varchar(900) default 'N'") 
	 private String patientTreatmentDetail="NA";
	 
	 @Column(name = "dpatient_first_dfrom",columnDefinition="varchar(500) default 'N'") 
	 private String patientFirstDateFrom="NA";
	 
	 @Column(name = "dpatient_second_dfrom",columnDefinition="varchar(500) default 'N'") 
	 private String patientSecondDateFrom="NA";
	 
	 @Column(name = "dpatient_travel_history",columnDefinition="varchar(900) default 'N'") 
	 private String patientTravelHistory="NA";
	 
	 @Column(name = "dpatient_iww_dtfrom",columnDefinition="varchar(20) default 'N'") 
	 private String patientIWWDateFrom="NA";
	 
	 @Column(name = "dpatient_refering_hospital",columnDefinition="varchar(900) default 'N'") 
	 private String patientreferncingHospital="NA";
	 
	 @Column(name = "dpatient_admission_in_iww",columnDefinition="varchar(30) default 'N'") 
	 private String patientAdmissionDateinIWW="NA";
	 
	 @Column(name = "dpatient_admission_time_in_iww",columnDefinition="varchar(30) default 'N'") 
	 private String patientAdmissionTimeinIWW="NA";
	 
	 @Column(name = "dpatient_iww_name",columnDefinition="varchar(900) default 'N'") 
	 private String patientIWWName="NA";
	 
	 @Column(name = "dpatient_date_throat_taken",columnDefinition="varchar(900) default 'N'") 
	 private String patientDateThroatTaken="NA";
	 
	 @Column(name = "dpatient_date_throat_swap_result",columnDefinition="varchar(20) default 'N'") 
	 private String patienTrhoatSwabResultDate="NA";
	 
	 @Column(name = "dpatient_result_throat_swab",columnDefinition="varchar(900) default 'N'") 
	 private String patienTrhoatSwabResult="NA";
	 
	 @Column(name = "dpatient_laboratory_name",columnDefinition="varchar(900) default 'N'") 
	 private String patientLaboratoryName="NA";
	 
	 @Column(name = "dpatient_other_relevant_lab_result",columnDefinition="varchar(900) default 'N'") 
	 private String patientOtRelevantLabResult="NA";
	 
	 @Column(name = "dpatient_special_treatment",columnDefinition="varchar(900) default 'N'") 
	 private String patientSpecialTreatment="NA";
	 
	 @Column(name = "dpatient_death_date",columnDefinition="varchar(30) default 'N'") 
	 private String patientDeathDate="NA";
	 
	 
	 @Column(name = "dpatient_death_time",columnDefinition="varchar(30) default 'N'") 
	 private String patientDeathTime="NA";
	 
	 @Column(name = "dpatient_place_death",columnDefinition="varchar(100) default 'N'") 
	 private String patientDathPlace="NA";
	 
	 @Column(name = "dpatient_cause_death",columnDefinition="varchar(500) default 'N'") 
	 private String patientDeathCause="NA";
	
	 
	 @Column(name = "dpatient_discharge_date",columnDefinition="varchar(30) default 'N'") 
	 private String patientDischargeDate="NA";
	 
	 @Column(name = "dpatient_discharge_time",columnDefinition="varchar(30) default 'N'") 
	 private String patientDischargeTime="NA";
	 
	
	 @Column(name = "created_by", updatable = false) 
	 private Integer createdBy;
	 
	 @Column(name = "updated_by")   
	 private Integer updatedBy;
	 
	 @Temporal(TemporalType.TIMESTAMP) 
	 @CreationTimestamp
	 @Column(name = "created_date_time", updatable = false) 
	 private Date createdDate;
	 
	 @Temporal(TemporalType.TIMESTAMP) 
	 @UpdateTimestamp
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
	 
	 @Transient   
	 private List<PatientDeathSummaryReportDTO> lstpatientDeathSummaryReportDto;

	public Integer getPatientDeathId() {
		return patientDeathId;
	}

	public void setPatientDeathId(Integer patientDeathId) {
		this.patientDeathId = patientDeathId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPatientGeneder() {
		return patientGeneder;
	}

	public void setPatientGeneder(String patientGeneder) {
		this.patientGeneder = patientGeneder;
	}

	public String getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(String patientAge) {
		this.patientAge = patientAge;
	}

	public String getPatientAddress() {
		return patientAddress;
	}

	public void setPatientAddress(String patientAddress) {
		this.patientAddress = patientAddress;
	}

	public String getPatientContact() {
		return patientContact;
	}

	public void setPatientContact(String patientContact) {
		this.patientContact = patientContact;
	}

	public String getPatientOccuption() {
		return patientOccuption;
	}

	public void setPatientOccuption(String patientOccuption) {
		this.patientOccuption = patientOccuption;
	}

	public String getPatientDate() {
		return patientDate;
	}

	public void setPatientDate(String patientDate) {
		this.patientDate = patientDate;
	}

	public String getPatientSymptom() {
		return patientSymptom;
	}

	public void setPatientSymptom(String patientSymptom) {
		this.patientSymptom = patientSymptom;
	}

	public String getPatientPhysicalCondition() {
		return patientPhysicalCondition;
	}

	public void setPatientPhysicalCondition(String patientPhysicalCondition) {
		this.patientPhysicalCondition = patientPhysicalCondition;
	}

	public String getPatientTreatmentDetail() {
		return patientTreatmentDetail;
	}

	public void setPatientTreatmentDetail(String patientTreatmentDetail) {
		this.patientTreatmentDetail = patientTreatmentDetail;
	}

	public String getPatientFirstDateFrom() {
		return patientFirstDateFrom;
	}

	public void setPatientFirstDateFrom(String patientFirstDateFrom) {
		this.patientFirstDateFrom = patientFirstDateFrom;
	}

	public String getPatientSecondDateFrom() {
		return patientSecondDateFrom;
	}

	public void setPatientSecondDateFrom(String patientSecondDateFrom) {
		this.patientSecondDateFrom = patientSecondDateFrom;
	}

	public String getPatientTravelHistory() {
		return patientTravelHistory;
	}

	public void setPatientTravelHistory(String patientTravelHistory) {
		this.patientTravelHistory = patientTravelHistory;
	}

	public String getPatientIWWDateFrom() {
		return patientIWWDateFrom;
	}

	public void setPatientIWWDateFrom(String patientIWWDateFrom) {
		this.patientIWWDateFrom = patientIWWDateFrom;
	}

	public String getPatientreferncingHospital() {
		return patientreferncingHospital;
	}

	public void setPatientreferncingHospital(String patientreferncingHospital) {
		this.patientreferncingHospital = patientreferncingHospital;
	}

	public String getPatientAdmissionDateinIWW() {
		return patientAdmissionDateinIWW;
	}

	public void setPatientAdmissionDateinIWW(String patientAdmissionDateinIWW) {
		this.patientAdmissionDateinIWW = patientAdmissionDateinIWW;
	}

	public String getPatientAdmissionTimeinIWW() {
		return patientAdmissionTimeinIWW;
	}

	public void setPatientAdmissionTimeinIWW(String patientAdmissionTimeinIWW) {
		this.patientAdmissionTimeinIWW = patientAdmissionTimeinIWW;
	}

	public String getPatientIWWName() {
		return patientIWWName;
	}

	public void setPatientIWWName(String patientIWWName) {
		this.patientIWWName = patientIWWName;
	}

	public String getPatientDateThroatTaken() {
		return patientDateThroatTaken;
	}

	public void setPatientDateThroatTaken(String patientDateThroatTaken) {
		this.patientDateThroatTaken = patientDateThroatTaken;
	}

	public String getPatienTrhoatSwabResultDate() {
		return patienTrhoatSwabResultDate;
	}

	public void setPatienTrhoatSwabResultDate(String patienTrhoatSwabResultDate) {
		this.patienTrhoatSwabResultDate = patienTrhoatSwabResultDate;
	}

	public String getPatienTrhoatSwabResult() {
		return patienTrhoatSwabResult;
	}

	public void setPatienTrhoatSwabResult(String patienTrhoatSwabResult) {
		this.patienTrhoatSwabResult = patienTrhoatSwabResult;
	}

	public String getPatientLaboratoryName() {
		return patientLaboratoryName;
	}

	public void setPatientLaboratoryName(String patientLaboratoryName) {
		this.patientLaboratoryName = patientLaboratoryName;
	}

	public String getPatientOtRelevantLabResult() {
		return patientOtRelevantLabResult;
	}

	public void setPatientOtRelevantLabResult(String patientOtRelevantLabResult) {
		this.patientOtRelevantLabResult = patientOtRelevantLabResult;
	}

	public String getPatientSpecialTreatment() {
		return patientSpecialTreatment;
	}

	public void setPatientSpecialTreatment(String patientSpecialTreatment) {
		this.patientSpecialTreatment = patientSpecialTreatment;
	}

	public String getPatientDeathDate() {
		return patientDeathDate;
	}

	public void setPatientDeathDate(String patientDeathDate) {
		this.patientDeathDate = patientDeathDate;
	}

	public String getPatientDeathTime() {
		return patientDeathTime;
	}

	public void setPatientDeathTime(String patientDeathTime) {
		this.patientDeathTime = patientDeathTime;
	}

	public String getPatientDathPlace() {
		return patientDathPlace;
	}

	public void setPatientDathPlace(String patientDathPlace) {
		this.patientDathPlace = patientDathPlace;
	}

	public String getPatientDeathCause() {
		return patientDeathCause;
	}

	public void setPatientDeathCause(String patientDeathCause) {
		this.patientDeathCause = patientDeathCause;
	}

	public String getPatientDischargeDate() {
		return patientDischargeDate;
	}

	public void setPatientDischargeDate(String patientDischargeDate) {
		this.patientDischargeDate = patientDischargeDate;
	}

	public String getPatientDischargeTime() {
		return patientDischargeTime;
	}

	public void setPatientDischargeTime(String patientDischargeTime) {
		this.patientDischargeTime = patientDischargeTime;
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

	public List<PatientDeathSummaryReportDTO> getLstpatientDeathSummaryReportDto() {
		return lstpatientDeathSummaryReportDto;
	}

	public void setLstpatientDeathSummaryReportDto(
			List<PatientDeathSummaryReportDTO> lstpatientDeathSummaryReportDto) {
		this.lstpatientDeathSummaryReportDto = lstpatientDeathSummaryReportDto;
	}

	@Override
	public String toString() {
		return "PatientDeathSummaryReportDTO [patientDeathId=" + patientDeathId
				+ ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", patientName=" + patientName + ", patientGeneder="
				+ patientGeneder + ", patientAge=" + patientAge
				+ ", patientAddress=" + patientAddress + ", patientContact="
				+ patientContact + ", patientOccuption=" + patientOccuption
				+ ", patientDate=" + patientDate + ", patientSymptom="
				+ patientSymptom + ", patientPhysicalCondition="
				+ patientPhysicalCondition + ", patientTreatmentDetail="
				+ patientTreatmentDetail + ", patientFirstDateFrom="
				+ patientFirstDateFrom + ", patientSecondDateFrom="
				+ patientSecondDateFrom + ", patientTravelHistory="
				+ patientTravelHistory + ", patientIWWDateFrom="
				+ patientIWWDateFrom + ", patientreferncingHospital="
				+ patientreferncingHospital + ", patientAdmissionDateinIWW="
				+ patientAdmissionDateinIWW + ", patientAdmissionTimeinIWW="
				+ patientAdmissionTimeinIWW + ", patientIWWName="
				+ patientIWWName + ", patientDateThroatTaken="
				+ patientDateThroatTaken + ", patienTrhoatSwabResultDate="
				+ patienTrhoatSwabResultDate + ", patienTrhoatSwabResult="
				+ patienTrhoatSwabResult + ", patientLaboratoryName="
				+ patientLaboratoryName + ", patientOtRelevantLabResult="
				+ patientOtRelevantLabResult + ", patientSpecialTreatment="
				+ patientSpecialTreatment + ", patientDeathDate="
				+ patientDeathDate + ", patientDeathTime=" + patientDeathTime
				+ ", patientDathPlace=" + patientDathPlace
				+ ", patientDeathCause=" + patientDeathCause
				+ ", patientDischargeDate=" + patientDischargeDate
				+ ", patientDischargeTime=" + patientDischargeTime
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", lstpatientDeathSummaryReportDto="
				+ lstpatientDeathSummaryReportDto + "]";
	}

	
	 

}
