package com.hms.ehat.dto;

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

@Entity
@Table(name="ehat_dialysis_careplan")
public class HemodialysisCarePlanDto 
{
		@Id
		@GeneratedValue
		@Column(name = "careplan_id")
		private int careplanId;
		
		@Column(name = "id_treatment")
		private Integer treatmentId; 


		@Column(name = "patient_Id")
		private Integer patientId; 
		
		

		@Column(name = "martial_status")
		private String martialStatus;
		
	
		@Column(name="allergies")
		private String allergies;
	
		@Column(name = "blood_group")
		private String bloodGroup;
		
		@Column(name="estiamted_dry_weight")
		private String estimatedDryWeight;
	

		@Column(name = "date_of_initiation_of_dialysis")
		private String dateOfInitiationDialysis;
		
		@Column(name="frequency_of_dialysis")
		private String frequencyOfDialysis;
		
		@Column(name="primary_renal_disease")
		private String primaryRenalDisease;
	

		@Column(name = "vascular_access_detail")
		private String vascularAccessDetail;
		
		@Column(name="iron_status")
		private String ironStatus;
		
		@Column(name = "last_blood_transfusion")
		private String lastBloodTransfusion;
		
		@Column(name="special_needs_problemsid1")
		private String specialNeedsProblems;
		
		@Column(name = "diabetes_mellitus")
		private String diabetesMellitus;
		
		@Column(name="cerobro_vascular_disease")
		private String cerobroVascularDisease;
		
		@Column(name="ischemic_heart_disease")
		private String isChemicHeartDisease;
	

		@Column(name = "choronic_lung_disease")
		private String choronicLungDisease;
		
		@Column(name="peripheral_vascular_disease")
		private String peripheralVascularDisease;
		
		
		@Column(name = "choronic_liver_disease")
		private String choronicLiverDisease;
		
		@Column(name="tuberculosis")
		private String tuberculosis;
		
		
		@Column(name = "created_by",updatable=false)
		private Integer createdBy;
		
		@Column(name = "updated_by")
		private Integer updatedBy;
		
		@Column(name = "deleted_By")
		private Integer deletedBy;	
		
		@Column(name = "deleted")
		private String deleted="N";
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "created_date_time",updatable=false)
		private Date createdDate;
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "updated_date_time")
		private Date updatedDate;
		
		@Temporal(TemporalType.TIMESTAMP)
		@Column(name = "deleted_date_time")
		private Date deletedDate;
		
		@Column(name = "unit_Id")
		private Integer unitId;	
		
		
		public Integer getUnitId() {
			return unitId;
		}

		public void setUnitId(Integer unitId) {
			this.unitId = unitId;
		}

		@Transient
		private List<HemodialysisCarePlanDto> listCarePlanDialysis;

		public int getCareplanId() {
			return careplanId;
		}

		public void setCareplanId(int careplanId) {
			this.careplanId = careplanId;
		}


		public String getMartialStatus() {
			return martialStatus;
		}

		public void setMartialStatus(String martialStatus) {
			this.martialStatus = martialStatus;
		}
	

		public String getAllergies() {
			return allergies;
		}

		public void setAllergies(String allergies) {
			this.allergies = allergies;
		}

		public String getBloodGroup() {
			return bloodGroup;
		}

		public void setBloodGroup(String bloodGroup) {
			this.bloodGroup = bloodGroup;
		}

		public String getEstimatedDryWeight() {
			return estimatedDryWeight;
		}

		public void setEstimatedDryWeight(String estimatedDryWeight) {
			this.estimatedDryWeight = estimatedDryWeight;
		}

		public String getDateOfInitiationDialysis() {
			return dateOfInitiationDialysis;
		}

		public void setDateOfInitiationDialysis(String dateOfInitiationDialysis) {
			this.dateOfInitiationDialysis = dateOfInitiationDialysis;
		}

		public String getFrequencyOfDialysis() {
			return frequencyOfDialysis;
		}

		public void setFrequencyOfDialysis(String frequencyOfDialysis) {
			this.frequencyOfDialysis = frequencyOfDialysis;
		}

		public String getPrimaryRenalDisease() {
			return primaryRenalDisease;
		}

		public void setPrimaryRenalDisease(String primaryRenalDisease) {
			this.primaryRenalDisease = primaryRenalDisease;
		}

		public String getVascularAccessDetail() {
			return vascularAccessDetail;
		}

		public void setVascularAccessDetail(String vascularAccessDetail) {
			this.vascularAccessDetail = vascularAccessDetail;
		}

		public String getIronStatus() {
			return ironStatus;
		}

		public void setIronStatus(String ironStatus) {
			this.ironStatus = ironStatus;
		}

		public String getLastBloodTransfusion() {
			return lastBloodTransfusion;
		}

		public void setLastBloodTransfusion(String lastBloodTransfusion) {
			this.lastBloodTransfusion = lastBloodTransfusion;
		}

		public String getSpecialNeedsProblems() {
			return specialNeedsProblems;
		}

		public void setSpecialNeedsProblems(String specialNeedsProblems) {
			this.specialNeedsProblems = specialNeedsProblems;
		}

		public String getDiabetesMellitus() {
			return diabetesMellitus;
		}

		public void setDiabetesMellitus(String diabetesMellitus) {
			this.diabetesMellitus = diabetesMellitus;
		}

		public String getCerobroVascularDisease() {
			return cerobroVascularDisease;
		}

		public void setCerobroVascularDisease(String cerobroVascularDisease) {
			this.cerobroVascularDisease = cerobroVascularDisease;
		}

		public String getIsChemicHeartDisease() {
			return isChemicHeartDisease;
		}

		public void setIsChemicHeartDisease(String isChemicHeartDisease) {
			this.isChemicHeartDisease = isChemicHeartDisease;
		}

		public String getChoronicLungDisease() {
			return choronicLungDisease;
		}

		public void setChoronicLungDisease(String choronicLungDisease) {
			this.choronicLungDisease = choronicLungDisease;
		}

		public String getPeripheralVascularDisease() {
			return peripheralVascularDisease;
		}

		public void setPeripheralVascularDisease(String peripheralVascularDisease) {
			this.peripheralVascularDisease = peripheralVascularDisease;
		}

		public String getChoronicLiverDisease() {
			return choronicLiverDisease;
		}

		public void setChoronicLiverDisease(String choronicLiverDisease) {
			this.choronicLiverDisease = choronicLiverDisease;
		}

		public String getTuberculosis() {
			return tuberculosis;
		}

		public void setTuberculosis(String tuberculosis) {
			this.tuberculosis = tuberculosis;
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

		public List<HemodialysisCarePlanDto> getListCarePlanDialysis() {
			return listCarePlanDialysis;
		}

		public void setListCarePlanDialysis(
				List<HemodialysisCarePlanDto> listCarePlanDialysis) {
			this.listCarePlanDialysis = listCarePlanDialysis;
		}

		public Integer getTreatmentId() {
			return treatmentId;
		}

		public void setTreatmentId(Integer treatmentId) {
			this.treatmentId = treatmentId;
		}

		public Integer getPatientId() {
			return patientId;
		}

		public void setPatientId(Integer patientId) {
			this.patientId = patientId;
		}

	
	
}