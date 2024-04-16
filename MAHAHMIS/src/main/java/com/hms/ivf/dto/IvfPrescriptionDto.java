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
@Table(name="ivf_prescription_info")
public class IvfPrescriptionDto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="precription_id")
	private int prescriptionId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "ivf_treatment_id")
	private int ivf_treatmentId;
	
	@Column(name = "preparation",columnDefinition="varchar(500) default ''")
	private String preparation="";
	
	@Column(name = "patient_name",columnDefinition="varchar(20) default ''")
	private String patientName="";
		
	@Column(name = "prep_name",columnDefinition="varchar(500) default ''")
	private String prepName;
	
	@Column(name = "medicine_id",columnDefinition="varchar(50) default ''")
	private String medicineId="";
	
	@Column(name = "medicine_name",columnDefinition="varchar(500) default ''")
	private String medicineName="";
	
	@Column(name = "strength",columnDefinition="varchar(500) default ''")
	private String strength="";
	
	@Column(name = "dose_type",columnDefinition="varchar(500) default ''")
	private String doseType="";
	
	@Column(name = "unit",columnDefinition="varchar(500) default ''")
	private String unit="";
	
	@Column(name = "morning",columnDefinition="varchar(500) default ''")
	private String morning;
	
	@Column(name = "afternoon",columnDefinition="varchar(500) default ''")
	private String afternoon;
	
	@Column(name = "evening",columnDefinition="varchar(500) default ''")
	private String evening;
	
	@Column(name = "night",columnDefinition="varchar(500) default ''")
	private String night;
	
	@Column(name = "frequency",columnDefinition="varchar(500) default ''")
	private String frequency="";
	
	@Column(name = "instruction",columnDefinition="varchar(500) default ''")
	private String instruction="";
	
	@Column(name = "instruction_name",columnDefinition="varchar(500) default ''")
	private String instructionName="";
	
	@Column(name = "route",columnDefinition="varchar(500) default ''")
	private String route="";
	
	@Column(name = "days",columnDefinition="varchar(500) default ''")
	private String days="";
	
	@Column(name = "quantity",columnDefinition="varchar(500) default ''")
	private String quantity="";	
	
	@Column(name = "prescription_date",columnDefinition="varchar(10) default ''")
	private String date="";
	
	@Column(name = "save_from",columnDefinition="varchar(500) default 'doctorstation'")
	private String saveFrom="doctorstation";
		
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@Transient
	private List<IvfPrescriptionDto> ivfPrescriptionList;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name = "created_by")
	private int createdBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;	

	@Column(name = "updated_by")
	private int updatedBy;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	public int getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(int prescriptionId) {
		this.prescriptionId = prescriptionId;
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

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPreparation() {
		return preparation;
	}

	public void setPreparation(String preparation) {
		this.preparation = preparation;
	}

	public String getPrepName() {
		return prepName;
	}

	public void setPrepName(String prepName) {
		this.prepName = prepName;
	}

	public String getMedicineId() {
		return medicineId;
	}

	public void setMedicineId(String medicineId) {
		this.medicineId = medicineId;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public String getDoseType() {
		return doseType;
	}

	public void setDoseType(String doseType) {
		this.doseType = doseType;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getInstructionName() {
		return instructionName;
	}

	public void setInstructionName(String instructionName) {
		this.instructionName = instructionName;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public int getIvf_treatmentId() {
		return ivf_treatmentId;
	}

	public void setIvf_treatmentId(int ivf_treatmentId) {
		this.ivf_treatmentId = ivf_treatmentId;
	}

	public List<IvfPrescriptionDto> getIvfPrescriptionList() {
		return ivfPrescriptionList;
	}

	public void setIvfPrescriptionList(List<IvfPrescriptionDto> ivfPrescriptionList) {
		this.ivfPrescriptionList = ivfPrescriptionList;
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

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
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

	public String getMorning() {
		return morning;
	}

	public void setMorning(String morning) {
		this.morning = morning;
	}

	public String getAfternoon() {
		return afternoon;
	}

	public void setAfternoon(String afternoon) {
		this.afternoon = afternoon;
	}

	public String getEvening() {
		return evening;
	}

	public void setEvening(String evening) {
		this.evening = evening;
	}

	public String getNight() {
		return night;
	}

	public void setNight(String night) {
		this.night = night;
	}

	@Override
	public String toString() {
		return "IvfPrescriptionDto [prescriptionId=" + prescriptionId + ", patientId=" + patientId + ", treatmentId="
				+ treatmentId + ", patientName=" + patientName + ", preparation=" + preparation + ", prepName="
				+ prepName + ", medicineId=" + medicineId + ", medicineName=" + medicineName + ", strength=" + strength
				+ ", unit=" + unit + ", morning=" + morning + ", afternoon="
				+ afternoon + ", evening=" + evening + ", night=" + night + ", frequency=" + frequency
				+ ", instruction=" + instruction + ", instructionName=" + instructionName + ", route=" + route
				+ ", days=" + days + ", quantity=" + quantity + ", ivfPrescriptionList=" + ivfPrescriptionList
				+ ", unitId=" + unitId + ", userId=" + userId + ", createdBy=" + createdBy + ", createdDateTime="
				+ createdDateTime + ", updatedBy=" + updatedBy + ", updatedDateTime=" + updatedDateTime
				+ ", deletedDateTime=" + deletedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted + "]";
	}

	public String getSaveFrom() {
		return saveFrom;
	}

	public void setSaveFrom(String saveFrom) {
		this.saveFrom = saveFrom;
	}
	
	
}
