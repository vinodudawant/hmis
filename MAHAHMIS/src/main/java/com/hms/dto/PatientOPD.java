package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class PatientOPD {

	private int patientOpdId;
	private int patient_ID;
	private String common_Token_number;
	private Date app_date;
	private int doctor_id;
	private int doctor_spl_id;
	private int doctor_dept_id;
	private int hospital_id;
	private int requestToConvertIPD;
	private int treatmenId;
	private String appTime;
	private String appDate;
	private int prevDocId;
	private List<PatientOPD> listPatientOpd;
	
	@JsonGetter("prevDocId")
	public int getPrevDocId() {
		return prevDocId;
	}
	@JsonSetter("prevDocId")
	public void setPrevDocId(int prevDocId) {
		this.prevDocId = prevDocId;
	}
	@JsonGetter("trid")
	public int getTreatmenId() {
		return treatmenId;
	}
	@JsonSetter("trid")
	public void setTreatmenId(int treatmenId) {
		this.treatmenId = treatmenId;
	}
	@JsonGetter("appTime")
	public String getAppTime() {
		return appTime;
	}
	@JsonSetter("appTime")
	public void setAppTime(String appTime) {
		this.appTime = appTime;
	}
	@JsonGetter("appDate")
	public String getAppDate() {
		return appDate;
	}
	@JsonSetter("appDate")
	public void setAppDate(String appDate) {
		this.appDate = appDate;
	}

	// Amol Saware
	private String queueStatus;

	@JsonGetter("queueStatus")
	public String getQueueStatus() {
		return queueStatus;
	}

	@JsonSetter("queueStatus")
	public void setQueueStatus(String queueStatus) {
		this.queueStatus = queueStatus;
	}

	public int getPatientOpdId() {
		return patientOpdId;
	}

	public void setPatientOpdId(int patientOpdId) {
		this.patientOpdId = patientOpdId;
	}

	public int getPatient_ID() {
		return patient_ID;
	}

	public void setPatient_ID(int patient_ID) {
		this.patient_ID = patient_ID;
	}

	public String getCommon_Token_number() {
		return common_Token_number;
	}

	public void setCommon_Token_number(String common_Token_number) {
		this.common_Token_number = common_Token_number;
	}

	public Date getApp_date() {
		return app_date;
	}

	public void setApp_date(Date date) {
		this.app_date = date;
	}

	public int getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}

	public int getDoctor_spl_id() {
		return doctor_spl_id;
	}

	public void setDoctor_spl_id(int doctor_spl_id) {
		this.doctor_spl_id = doctor_spl_id;
	}

	public int getDoctor_dept_id() {
		return doctor_dept_id;
	}

	public void setDoctor_dept_id(int doctor_dept_id) {
		this.doctor_dept_id = doctor_dept_id;
	}

	public List<PatientOPD> getListPatientOpd() {
		return listPatientOpd;
	}

	public void setListPatientOpd(List<PatientOPD> listPatientOpd) {
		this.listPatientOpd = listPatientOpd;
	}

	public int getHospital_id() {
		return hospital_id;
	}

	public void setHospital_id(int hospital_id) {
		this.hospital_id = hospital_id;
	}

	public int getRequestToConvertIPD() {
		return requestToConvertIPD;
	}
	public void setRequestToConvertIPD(int requestToConvertIPD) {
		this.requestToConvertIPD = requestToConvertIPD;
	}
}
