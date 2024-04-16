package com.hms.doctordesk.dto;

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
public class OPDPrescriptionDtoSP implements Serializable{
	
	private static final long serialVersionUID = 7919569722294032676L;


	private Integer prescriptionId;
	
	private Integer patientId;
	
	private Integer treatmentId;
	
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
	
	private String instructionName; // for print
	private String instructionNameForUI;// for UI
	
	private String administered_status;
	
	private String drugName;
	private int  nutracalProductFlag;
	
	private int  prescriptionSequenceId;
	
	private String routeName;
	
	private String routeUnicode;
	
	@Transient
	int ecogreenPrescrptionId;// added for ecogreen
	
	
	
	public int getPrescriptionSequenceId() {
		return prescriptionSequenceId;
	}

	public void setPrescriptionSequenceId(int prescriptionSequenceId) {
		this.prescriptionSequenceId = prescriptionSequenceId;
	}

	private List<IPDNursingStationMedication> listIPDNursingStationMedication;
	

	public String getAdministered_status() {
		return administered_status;
	}

	public void setAdministered_status(String administered_status) {
		this.administered_status = administered_status;
	}

	//@Transient
	private List<OPDPrescriptionDtoSP> listOPDPrescriptionDtoSP;
	
	

	public List<IPDNursingStationMedication> getListIPDNursingStationMedication() {
		return listIPDNursingStationMedication;
	}

	public void setListIPDNursingStationMedication(List<IPDNursingStationMedication> listIPDNursingStationMedication) {
		this.listIPDNursingStationMedication = listIPDNursingStationMedication;
	}

	public Integer getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(Integer prescriptionId) {
		this.prescriptionId = prescriptionId;
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

	public List<OPDPrescriptionDtoSP> getListOPDPrescriptionDtoSP() {
		return listOPDPrescriptionDtoSP;
	}

	public void setListOPDPrescriptionDtoSP(List<OPDPrescriptionDtoSP> listOPDPrescriptionDtoSP) {
		this.listOPDPrescriptionDtoSP = listOPDPrescriptionDtoSP;
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

	public String getInstructionNameForUI() {
		return instructionNameForUI;
	}

	public void setInstructionNameForUI(String instructionNameForUI) {
		this.instructionNameForUI = instructionNameForUI;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getNutracalProductFlag() {
		return nutracalProductFlag;
	}

	public void setNutracalProductFlag(int nutracalProductFlag) {
		this.nutracalProductFlag = nutracalProductFlag;
	}

	
	
	
	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getRouteName() {
		return routeName;
	}

	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}

	public String getRouteUnicode() {
		return routeUnicode;
	}

	public void setRouteUnicode(String routeUnicode) {
		this.routeUnicode = routeUnicode;
	}

	public int getEcogreenPrescrptionId() {
		return ecogreenPrescrptionId;
	}

	public void setEcogreenPrescrptionId(int ecogreenPrescrptionId) {
		this.ecogreenPrescrptionId = ecogreenPrescrptionId;
	}

	@Override
	public String toString() {
		return "OPDPrescriptionDtoSP [prescriptionId=" + prescriptionId + ", patientId=" + patientId + ", treatmentId="
				+ treatmentId + ", prep=" + prep + ", medicineId=" + medicineId + ", medicineName=" + medicineName
				+ ", strength=" + strength + ", unit=" + unit + ", dose=" + dose + ", frequency=" + frequency
				+ ", instruction=" + instruction + ", route=" + route + ", days=" + days + ", qty=" + qty
				+ ", paediatricsMedicineFlag=" + paediatricsMedicineFlag + ", paediatricsMedicineCapacity="
				+ paediatricsMedicineCapacity + ", dayPrescription=" + dayPrescription + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", deletedBy=" + deletedBy + ", unitId=" + unitId + ", deleted="
				+ deleted + ", prepName=" + prepName + ", unitName=" + unitName + ", instructionName=" + instructionName
				+ ", instructionNameForUI=" + instructionNameForUI + ", administered_status=" + administered_status
				+ ", drugName=" + drugName + ", nutracalProductFlag=" + nutracalProductFlag
				+ ", prescriptionSequenceId=" + prescriptionSequenceId + ", routeName=" + routeName + ", routeUnicode="
				+ routeUnicode + ", ecogreenPrescrptionId=" + ecogreenPrescrptionId
				+ ", listIPDNursingStationMedication=" + listIPDNursingStationMedication + ", listOPDPrescriptionDtoSP="
				+ listOPDPrescriptionDtoSP + "]";
	}


	
	
	
	
	

	
	

	

}
