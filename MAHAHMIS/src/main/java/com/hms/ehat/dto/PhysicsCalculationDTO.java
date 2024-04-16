package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_radiation_physics_calculation")
public class PhysicsCalculationDTO implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "physics_calculation_id")
	private int physicsCalculationId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "pc_treatment_time")
	private String pcTreatmentTime;
	
	@Column(name = "pc_dose_fraction")
	private String pcDoseFraction;
	
	@Column(name = "pc_no_fraction")
	private String pcNoFraction;
	
	@Column(name = "pc_inverse_sq")
	private String pcInverseSq;
	
	@Column(name = "pc_other_factor")
	private String pcOtherFactor;	
	
	@Column(name = "pc_mod_factor")
	private String pcModFactor;
	
	@Column(name = "pc_wedge_angle")
	private String pcWedgeAngle;
	
	@Column(name = "pctar")
	private String pcTAR;
	
	@Column(name = "pc_date")
	private String pcDate;
	
	@Column(name = "pc_energy")
	private String pcEnergy;
	
	@Column(name = "pc_field_size")
	private String pcFieldSize;
	
	@Column(name = "pc_eq_sq")
	private String pcEqSq;
	
	@Column(name = "pc_ssd")
	private String pcSSD;
	
	@Column(name = "pc_depth")
	private String pcDepth;	
	
	@Column(name = "pc_output")
	private String pcOutput;
	
	@Column(name = "pc_dose_rate")
	private String pcDoseRate;
	
	@Column(name = "pc_do")
	private String pcDO;	
	

	@Column(name = "added_by",updatable=false)
	private int addedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;
	
	@Column(name = "updated_by")
	private int updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status ="Y";

	@Transient
	private List<PhysicsCalculationDTO> calculationList;

	public int getPhysicsCalculationId() {
		return physicsCalculationId;
	}

	public void setPhysicsCalculationId(int physicsCalculationId) {
		this.physicsCalculationId = physicsCalculationId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getPcTreatmentTime() {
		return pcTreatmentTime;
	}

	public void setPcTreatmentTime(String pcTreatmentTime) {
		this.pcTreatmentTime = pcTreatmentTime;
	}

	public String getPcDoseFraction() {
		return pcDoseFraction;
	}

	public void setPcDoseFraction(String pcDoseFraction) {
		this.pcDoseFraction = pcDoseFraction;
	}

	public String getPcNoFraction() {
		return pcNoFraction;
	}

	public void setPcNoFraction(String pcNoFraction) {
		this.pcNoFraction = pcNoFraction;
	}

	public String getPcInverseSq() {
		return pcInverseSq;
	}

	public void setPcInverseSq(String pcInverseSq) {
		this.pcInverseSq = pcInverseSq;
	}

	public String getPcOtherFactor() {
		return pcOtherFactor;
	}

	public void setPcOtherFactor(String pcOtherFactor) {
		this.pcOtherFactor = pcOtherFactor;
	}

	public String getPcModFactor() {
		return pcModFactor;
	}

	public void setPcModFactor(String pcModFactor) {
		this.pcModFactor = pcModFactor;
	}

	public String getPcWedgeAngle() {
		return pcWedgeAngle;
	}

	public void setPcWedgeAngle(String pcWedgeAngle) {
		this.pcWedgeAngle = pcWedgeAngle;
	}

	public String getPcTAR() {
		return pcTAR;
	}

	public void setPcTAR(String pcTAR) {
		this.pcTAR = pcTAR;
	}

	public String getPcDate() {
		return pcDate;
	}

	public void setPcDate(String pcDate) {
		this.pcDate = pcDate;
	}

	public String getPcEnergy() {
		return pcEnergy;
	}

	public void setPcEnergy(String pcEnergy) {
		this.pcEnergy = pcEnergy;
	}

	public String getPcFieldSize() {
		return pcFieldSize;
	}

	public void setPcFieldSize(String pcFieldSize) {
		this.pcFieldSize = pcFieldSize;
	}

	public String getPcEqSq() {
		return pcEqSq;
	}

	public void setPcEqSq(String pcEqSq) {
		this.pcEqSq = pcEqSq;
	}

	public String getPcSSD() {
		return pcSSD;
	}

	public void setPcSSD(String pcSSD) {
		this.pcSSD = pcSSD;
	}

	public String getPcDepth() {
		return pcDepth;
	}

	public void setPcDepth(String pcDepth) {
		this.pcDepth = pcDepth;
	}

	public String getPcOutput() {
		return pcOutput;
	}

	public void setPcOutput(String pcOutput) {
		this.pcOutput = pcOutput;
	}

	public String getPcDoseRate() {
		return pcDoseRate;
	}

	public void setPcDoseRate(String pcDoseRate) {
		this.pcDoseRate = pcDoseRate;
	}

	public String getPcDO() {
		return pcDO;
	}

	public void setPcDO(String pcDO) {
		this.pcDO = pcDO;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PhysicsCalculationDTO> getCalculationList() {
		return calculationList;
	}

	public void setCalculationList(List<PhysicsCalculationDTO> calculationList) {
		this.calculationList = calculationList;
	}
	
	
}
