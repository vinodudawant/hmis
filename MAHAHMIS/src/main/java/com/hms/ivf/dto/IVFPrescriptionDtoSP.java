package com.hms.ivf.dto;

import java.io.Serializable;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.pharmacy.pojo.ProductMaster;

import javassist.SerialVersionUID;

@Component
public class IVFPrescriptionDtoSP implements Serializable{
	
	private static final long serialVersionUID = 7919569722294032676L;


	private Integer ivfPrescriptionId;
	
	private Integer patientId;
	
	private Integer treatmentId;
	
	private Integer ivfTreatmentId; 		// for IVF treatment
	
	private Integer prep;
	
	private Integer medicineId;
	
	private String medicineName;
	
	private String strength;
	
	private Integer	 unit;
	
	private Integer dose;
	
	private double frequency;
	
	private Integer instruction;
	
	private Integer route;
	
	private double days;
	
	private double qty;
	
	private String paediatricsMedicineFlag;
	
	private Integer paediatricsMedicineCapacity;
	
	private String dayPrescription;
	
	private Integer createdBy;

	private Integer updatedBy;

	private Date createdDate;

	private Date updatedDate;
	
	private Date deletedDate;

	private Integer deletedBy;

	private Integer unitId;
	
	private String deleted;
	
	// extra
	private String prepName;
	
	private String unitName;
	
	private String instructionName;
	
	
	
	@Transient
	private List<IVFPrescriptionDtoSP> listIVFPrescriptionDtoSP;

	

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

	public Integer getPrep() {
		return prep;
	}

	public void setPrep(Integer prep) {
		this.prep = prep;
	}

	public Integer getMedicineId() {
		return medicineId;
	}

	public void setMedicineId(Integer medicineId) {
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

	public Integer getUnit() {
		return unit;
	}

	public void setUnit(Integer unit) {
		this.unit = unit;
	}

	public Integer getDose() {
		return dose;
	}

	public void setDose(Integer dose) {
		this.dose = dose;
	}

	public double getFrequency() {
		return frequency;
	}

	public void setFrequency(double frequency) {
		this.frequency = frequency;
	}

	public Integer getInstruction() {
		return instruction;
	}

	public void setInstruction(Integer instruction) {
		this.instruction = instruction;
	}

	public Integer getRoute() {
		return route;
	}

	public void setRoute(Integer route) {
		this.route = route;
	}

	public double getDays() {
		return days;
	}

	public void setDays(double days) {
		this.days = days;
	}

	public double getQty() {
		return qty;
	}

	public void setQty(double qty) {
		this.qty = qty;
	}

	public String getPaediatricsMedicineFlag() {
		return paediatricsMedicineFlag;
	}

	public void setPaediatricsMedicineFlag(String paediatricsMedicineFlag) {
		this.paediatricsMedicineFlag = paediatricsMedicineFlag;
	}

	public Integer getPaediatricsMedicineCapacity() {
		return paediatricsMedicineCapacity;
	}

	public void setPaediatricsMedicineCapacity(Integer paediatricsMedicineCapacity) {
		this.paediatricsMedicineCapacity = paediatricsMedicineCapacity;
	}

	public String getDayPrescription() {
		return dayPrescription;
	}

	public void setDayPrescription(String dayPrescription) {
		this.dayPrescription = dayPrescription;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getPrepName() {
		return prepName;
	}

	public void setPrepName(String prepName) {
		this.prepName = prepName;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getInstructionName() {
		return instructionName;
	}

	public void setInstructionName(String instructionName) {
		this.instructionName = instructionName;
	}

	public Integer getIvfPrescriptionId() {
		return ivfPrescriptionId;
	}

	public void setIvfPrescriptionId(Integer ivfPrescriptionId) {
		this.ivfPrescriptionId = ivfPrescriptionId;
	}

	public Integer getIvfTreatmentId() {
		return ivfTreatmentId;
	}

	public void setIvfTreatmentId(Integer ivfTreatmentId) {
		this.ivfTreatmentId = ivfTreatmentId;
	}

	public List<IVFPrescriptionDtoSP> getListIVFPrescriptionDtoSP() {
		return listIVFPrescriptionDtoSP;
	}

	public void setListIVFPrescriptionDtoSP(List<IVFPrescriptionDtoSP> listIVFPrescriptionDtoSP) {
		this.listIVFPrescriptionDtoSP = listIVFPrescriptionDtoSP;
	}

	@Override
	public String toString() {
		return "IVFPrescriptionDtoSP [ivfPrescriptionId=" + ivfPrescriptionId + ", patientId=" + patientId
				+ ", treatmentId=" + treatmentId + ", ivfTreatmentId=" + ivfTreatmentId + ", prep=" + prep
				+ ", medicineId=" + medicineId + ", medicineName=" + medicineName + ", strength=" + strength + ", unit="
				+ unit + ", dose=" + dose + ", frequency=" + frequency + ", instruction=" + instruction + ", route="
				+ route + ", days=" + days + ", qty=" + qty + ", paediatricsMedicineFlag=" + paediatricsMedicineFlag
				+ ", paediatricsMedicineCapacity=" + paediatricsMedicineCapacity + ", dayPrescription="
				+ dayPrescription + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", deleted=" + deleted + ", prepName=" + prepName + ", unitName="
				+ unitName + ", instructionName=" + instructionName + ", listIVFPrescriptionDtoSP="
				+ listIVFPrescriptionDtoSP + "]";
	}

}
