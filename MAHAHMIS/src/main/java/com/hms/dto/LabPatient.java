package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class LabPatient implements Serializable {
	private int idlabPatient;
	private String dateOfEntry;
	private String intial;
	private String patientName;
	private String sex;
	private int age;
	private String ageType;
	private String patientAddress;
	private String patStatus;
	private int patient_ID;
	private int pathologistId;
	private String pathologistName;
	private String qualification;
	private String signature;
	
	@JsonGetter("pathoQualification")
	public String getQualification() {
		return qualification;
	}
	@JsonSetter("pathoQualification")
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	@JsonGetter("pathologistName")
	public String getPathologistName() {
		return pathologistName;
	}
	@JsonSetter("pathologistName")
	public void setPathologistName(String pathologistName) {
		this.pathologistName = pathologistName;
	}
	@JsonGetter("pathId")
	public int getPathologistId() {
		return pathologistId;
	}
	@JsonSetter("pathId")
	public void setPathologistId(int pathologistId) {
		this.pathologistId = pathologistId;
	}

	private List<LabPatient> patli;
	
	private int doctorID;
	private String doctorName;
	
	private String timeOfEntry;
	
	@JsonGetter("timeEn")
	public String getTimeOfEntry() {
		return timeOfEntry;
	}
	@JsonSetter("timeEn")
	public void setTimeOfEntry(String timeOfEntry) {
		this.timeOfEntry = timeOfEntry;
	}
	@JsonGetter("docID")
	public int getDoctorID() {
		return doctorID;
	}
	@JsonSetter("docID")
	public void setDoctorID(int doctorID) {
		this.doctorID = doctorID;
	}
	@JsonGetter("docName")
	public String getDoctorName() {
		return doctorName;
	}

	@JsonSetter("docName")
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	@JsonGetter("pli")
	public List<LabPatient> getPatli() {
		return patli;
	}

	@JsonGetter("pli")
	public void setPatli(List<LabPatient> patli) {
		this.patli = patli;
	}

	@JsonGetter("pid")
	public int getIdlabPatient() {
		return idlabPatient;
	}

	@JsonSetter("pid")
	public void setIdlabPatient(int idlabPatient) {
		this.idlabPatient = idlabPatient;
	}

	@JsonGetter("pdt")
	public String getDateOfEntry() {
		return dateOfEntry;
	}

	@JsonSetter("pdt")
	public void setDateOfEntry(String dateOfEntry) {
		this.dateOfEntry = dateOfEntry;
	}

	@JsonGetter("pini")
	public String getIntial() {
		return intial;
	}

	@JsonSetter("pini")
	public void setIntial(String intial) {
		this.intial = intial;
	}

	@JsonGetter("pnm")
	public String getPatientName() {
		return patientName;
	}

	@JsonSetter("pnm")
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	@JsonGetter("psx")
	public String getSex() {
		return sex;
	}

	@JsonSetter("psx")
	public void setSex(String sex) {
		this.sex = sex;
	}

	@JsonGetter("pag")
	public int getAge() {
		return age;
	}

	@JsonSetter("pag")
	public void setAge(int age) {
		this.age = age;
	}

	@JsonGetter("pagty")
	public String getAgeType() {
		return ageType;
	}

	@JsonSetter("pagty")
	public void setAgeType(String ageType) {
		this.ageType = ageType;
	}

	@JsonGetter("padd")
	public String getPatientAddress() {
		return patientAddress;
	}

	@JsonSetter("padd")
	public void setPatientAddress(String patientAddress) {
		this.patientAddress = patientAddress;
	}

	@JsonGetter("pst")
	public String getPatStatus() {
		return patStatus;
	}

	@JsonSetter("pst")
	public void setPatStatus(String patStatus) {
		this.patStatus = patStatus;
	}

	@JsonGetter("ehatPi")
	public int getPatient_ID() {
		return patient_ID;
	}

	@JsonSetter("ehatPi")
	public void setPatient_ID(int patient_ID) {
		this.patient_ID = patient_ID;
	}

	private String a1;
	private String a2;
	private String a3;
	private String a4;
	private String a7;
	private String town;
	private String taluka;
	private String district;

	@JsonGetter("a1")
	public String getA1() {
		return a1;
	}
	@JsonSetter("a1")
	public void setA1(String a1) {
		this.a1 = a1;
	}
	@JsonGetter("a2")
	public String getA2() {
		return a2;
	}
	@JsonSetter("a2")
	public void setA2(String a2) {
		this.a2 = a2;
	}
	@JsonGetter("a3")
	public String getA3() {
		return a3;
	}
	@JsonSetter("a3")
	public void setA3(String a3) {
		this.a3 = a3;
	}
	@JsonGetter("a4")
	public String getA4() {
		return a4;
	}
	@JsonSetter("a4")
	public void setA4(String a4) {
		this.a4 = a4;
	}
	@JsonGetter("a7")
	public String getA7() {
		return a7;
	}
	@JsonSetter("a7")
	public void setA7(String a7) {
		this.a7 = a7;
	}
	@JsonGetter("town")
	public String getTown() {
		return town;
	}
	@JsonSetter("town")
	public void setTown(String town) {
		this.town = town;
	}
	@JsonGetter("taluka")
	public String getTaluka() {
		return taluka;
	}
	@JsonSetter("taluka")
	public void setTaluka(String taluka) {
		this.taluka = taluka;
	}
	@JsonGetter("district")
	public String getDistrict() {
		return district;
	}
	@JsonSetter("district")
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	
}