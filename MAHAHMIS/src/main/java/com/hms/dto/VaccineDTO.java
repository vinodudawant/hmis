package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class VaccineDTO {

	private int patientID;
	private int treatmentID;
	private int saveUpdateImmunizationID;
	private String vaccinePrep;
	private String vaccineName;
	private int vaccineID;
	private String gender;
	private int days;
	private int maxDays;
	private int weeks;
	private int maxWeeks;
	private int months;
	private int maxMonths;
	private int years;
	private int maxYears;
	private String mandatoryFlag;
	private String vaccineNotes;
	private String dobOfPatient;
	private String vaccineFromDate;
	private String vaccineToDate;
	private String companyName;
	private String batchNo;
	private String expiryDate;
	private String dueDate;
	private String vaccineBodyPart;
	private String vaccineGivenDate;
	private String vaccineStatusForPatient;
	private String vaccineNotesForPatient;
	private List<VaccineDTO> vaccineDTOList;
	private String dayWeeksMonthsYearsConstant;

	@JsonGetter("patientID")
	public int getPatientID() {
		return patientID;
	}

	@JsonSetter("patientID")
	public void setPatientID(int patientID) {
		this.patientID = patientID;
	}

	@JsonGetter("treatmentID")
	public int getTreatmentID() {
		return treatmentID;
	}

	@JsonSetter("treatmentID")
	public void setTreatmentID(int treatmentID) {
		this.treatmentID = treatmentID;
	}

	@JsonGetter("vaccineDTOList")
	public List<VaccineDTO> getVaccineDTOList() {
		return vaccineDTOList;
	}

	@JsonSetter("vaccineDTOList")
	public void setVaccineDTOList(List<VaccineDTO> vaccineDTOList) {
		this.vaccineDTOList = vaccineDTOList;
	}

	@JsonGetter("saveUpdateImmunizationID")
	public int getSaveUpdateImmunizationID() {
		return saveUpdateImmunizationID;
	}

	@JsonSetter("saveUpdateImmunizationID")
	public void setSaveUpdateImmunizationID(int saveUpdateImmunizationID) {
		this.saveUpdateImmunizationID = saveUpdateImmunizationID;
	}

	@JsonGetter("vaccinePrep")
	public String getVaccinePrep() {
		return vaccinePrep;
	}

	@JsonSetter("vaccinePrep")
	public void setVaccinePrep(String vaccinePrep) {
		this.vaccinePrep = vaccinePrep;
	}

	@JsonGetter("vaccineName")
	public String getVaccineName() {
		return vaccineName;
	}

	@JsonSetter("vaccineName")
	public void setVaccineName(String vaccineName) {
		this.vaccineName = vaccineName;
	}

	@JsonGetter("vaccineID")
	public int getVaccineID() {
		return vaccineID;
	}

	@JsonSetter("vaccineID")
	public void setVaccineID(int vaccineID) {
		this.vaccineID = vaccineID;
	}

	@JsonGetter("gender")
	public String getGender() {
		return gender;
	}

	@JsonSetter("gender")
	public void setGender(String gender) {
		this.gender = gender;
	}

	@JsonGetter("days")
	public int getDays() {
		return days;
	}

	@JsonSetter("days")
	public void setDays(int days) {
		this.days = days;
	}

	@JsonGetter("maxDays")
	public int getMaxDays() {
		return maxDays;
	}

	@JsonGetter("maxDays")
	public void setMaxDays(int maxDays) {
		this.maxDays = maxDays;
	}

	@JsonGetter("weeks")
	public int getWeeks() {
		return weeks;
	}

	@JsonSetter("weeks")
	public void setWeeks(int weeks) {
		this.weeks = weeks;
	}

	@JsonGetter("maxWeeks")
	public int getMaxWeeks() {
		return maxWeeks;
	}

	@JsonSetter("maxWeeks")
	public void setMaxWeeks(int maxWeeks) {
		this.maxWeeks = maxWeeks;
	}

	@JsonGetter("months")
	public int getMonths() {
		return months;
	}

	@JsonSetter("months")
	public void setMonths(int months) {
		this.months = months;
	}

	@JsonGetter("maxMonths")
	public int getMaxMonths() {
		return maxMonths;
	}

	@JsonSetter("maxMonths")
	public void setMaxMonths(int maxMonths) {
		this.maxMonths = maxMonths;
	}

	@JsonGetter("years")
	public int getYears() {
		return years;
	}

	@JsonSetter("years")
	public void setYears(int years) {
		this.years = years;
	}

	@JsonSetter("maxYears")
	public int getMaxYears() {
		return maxYears;
	}

	@JsonSetter("maxYears")
	public void setMaxYears(int maxYears) {
		this.maxYears = maxYears;
	}

	@JsonGetter("mandatoryFlag")
	public String getMandatoryFlag() {
		return mandatoryFlag;
	}

	@JsonSetter("mandatoryFlag")
	public void setMandatoryFlag(String mandatoryFlag) {
		this.mandatoryFlag = mandatoryFlag;
	}

	@JsonGetter("vaccineNotes")
	public String getVaccineNotes() {
		return vaccineNotes;
	}

	@JsonSetter("vaccineNotes")
	public void setVaccineNotes(String vaccineNotes) {
		this.vaccineNotes = vaccineNotes;
	}

	@JsonGetter("dobOfPatient")
	public String getDobOfPatient() {
		return dobOfPatient;
	}

	@JsonSetter("dobOfPatient")
	public void setDobOfPatient(String dobOfPatient) {
		this.dobOfPatient = dobOfPatient;
	}

	@JsonGetter("vaccineFromDate")
	public String getVaccineFromDate() {
		return vaccineFromDate;
	}

	@JsonSetter("vaccineFromDate")
	public void setVaccineFromDate(String vaccineFromDate) {
		this.vaccineFromDate = vaccineFromDate;
	}

	@JsonGetter("vaccineToDate")
	public String getVaccineToDate() {
		return vaccineToDate;
	}

	@JsonSetter("vaccineToDate")
	public void setVaccineToDate(String vaccineToDate) {
		this.vaccineToDate = vaccineToDate;
	}

	@JsonGetter("companyName")
	public String getCompanyName() {
		return companyName;
	}

	@JsonSetter("companyName")
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	@JsonGetter("batchNo")
	public String getBatchNo() {
		return batchNo;
	}

	@JsonSetter("batchNo")
	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	@JsonGetter("expiryDate")
	public String getExpiryDate() {
		return expiryDate;
	}

	@JsonSetter("expiryDate")
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	@JsonGetter("vaccineBodyPart")
	public String getVaccineBodyPart() {
		return vaccineBodyPart;
	}

	@JsonSetter("vaccineBodyPart")
	public void setVaccineBodyPart(String vaccineBodyPart) {
		this.vaccineBodyPart = vaccineBodyPart;
	}

	@JsonGetter("vaccineGivenDate")
	public String getVaccineGivenDate() {
		return vaccineGivenDate;
	}

	@JsonSetter("vaccineGivenDate")
	public void setVaccineGivenDate(String vaccineGivenDate) {
		this.vaccineGivenDate = vaccineGivenDate;
	}

	@JsonGetter("vaccineStatusForPatient")
	public String getVaccineStatusForPatient() {
		return vaccineStatusForPatient;
	}

	@JsonSetter("vaccineStatusForPatient")
	public void setVaccineStatusForPatient(String vaccineStatusForPatient) {
		this.vaccineStatusForPatient = vaccineStatusForPatient;
	}

	@JsonGetter("vaccineNotesForPatient")
	public String getVaccineNotesForPatient() {
		return vaccineNotesForPatient;
	}

	@JsonSetter("vaccineNotesForPatient")
	public void setVaccineNotesForPatient(String vaccineNotesForPatient) {
		this.vaccineNotesForPatient = vaccineNotesForPatient;
	}

	@Override
	public String toString() {
		return "vaccineName: " + vaccineName + "  gender :" + gender
				+ "  days :" + (days + " : " + maxDays) + "  weeks :"
				+ (weeks + " : " + maxWeeks) + "  months :"
				+ (months + " : " + maxMonths) + "  years :"
				+ (years + " : " + maxYears) + "\n  dobOfPatient :"
				+ dobOfPatient + "  vaccineFromDate :" + vaccineFromDate
				+ "  vaccineToDate :" + vaccineToDate + "  vaccineGivenDate :"
				+ vaccineGivenDate + "  dayWeeksMonthsYearsConstant :"
				+ dayWeeksMonthsYearsConstant;
	}

	public String getDayWeeksMonthsYearsConstant() {
		return dayWeeksMonthsYearsConstant;
	}

	public void setDayWeeksMonthsYearsConstant(
			String dayWeeksMonthsYearsConstant) {
		this.dayWeeksMonthsYearsConstant = dayWeeksMonthsYearsConstant;
	}

	@JsonGetter("dueDate")
	public String getDueDate() {
		return dueDate;
	}

	@JsonGetter("dueDate")
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

}
