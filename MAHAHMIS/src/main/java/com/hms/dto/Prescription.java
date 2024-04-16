package com.hms.dto;

import java.util.List;

/*Author : nIKHIL
 * Date : 23/9/2014
 * purpose : prescription tab on OPDDoctorsDesk2.jsp
 * */

public class Prescription {

	private int prescription_id;
	private String prep;
	private String prepName;
	private String name;
	private int medicineID;
	private String strength;
	private String capacity;
	private String unit;
	private String dose;
	private String frequency;
	private String instruction;
	private String instructionName;
	private String route;
	private double days;
	private double qty;
	private String status;
	private int treatmentId;
	private int treatment_doctor_Id;
	private int company_id;
	private String dosePerDay;
	private String other;
	private String usedFor;
	private String compName;
	private String unitName;
	private String paediatricsMedicineFlag;
	private String paediatricsMedicineCapacity;
	private int docTemplateNameID;
	private List<Prescription> prescriptionList;
	private String dayPrescription;
	
	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	public String getOther() {
		return other;
	}

	public void setOther(String other) {
		this.other = other;
	}

	public String getUsedFor() {
		return usedFor;
	}

	public void setUsedFor(String usedFor) {
		this.usedFor = usedFor;
	}

	// Kavita Bhangale
	public int getCompany_id() {
		return company_id;
	}

	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}

	public String getDosePerDay() {
		return dosePerDay;
	}

	public void setDosePerDay(String dosePerDay) {
		this.dosePerDay = dosePerDay;
	}

	public int getDocTemplateNameID() {
		return docTemplateNameID;
	}

	public void setDocTemplateNameID(int docTemplateNameID) {
		this.docTemplateNameID = docTemplateNameID;
	}

	public int getMedicineID() {
		return medicineID;
	}

	public void setMedicineID(int medicineID) {
		this.medicineID = medicineID;
	}

	public int getPrescription_id() {
		return prescription_id;
	}

	public void setPrescription_id(int prescription_id) {
		this.prescription_id = prescription_id;
	}

	public String getPrep() {
		return prep;
	}

	public void setPrep(String prep) {
		this.prep = prep;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
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

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getTreatment_doctor_Id() {
		return treatment_doctor_Id;
	}

	public void setTreatment_doctor_Id(int treatment_doctor_Id) {
		this.treatment_doctor_Id = treatment_doctor_Id;
	}

	public List<Prescription> getPrescriptionList() {
		return prescriptionList;
	}

	public void setPrescriptionList(List<Prescription> prescriptionList) {
		this.prescriptionList = prescriptionList;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
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

	public String getPaediatricsMedicineFlag() {
		return paediatricsMedicineFlag;
	}

	public void setPaediatricsMedicineFlag(String paediatricsMedicineFlag) {
		this.paediatricsMedicineFlag = paediatricsMedicineFlag;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

	public String getPaediatricsMedicineCapacity() {
		return paediatricsMedicineCapacity;
	}

	public void setPaediatricsMedicineCapacity(
			String paediatricsMedicineCapacity) {
		this.paediatricsMedicineCapacity = paediatricsMedicineCapacity;
	}

	public String getDayPrescription() {
		return dayPrescription;
	}

	public void setDayPrescription(String dayPrescription) {
		this.dayPrescription = dayPrescription;
	}

}
