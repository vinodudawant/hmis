package com.hms.ehat.dto;
import java.io.Serializable;
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
@Table(name = "ehat_ipd_personal_hygiene")
public class PersonalHygieneChartDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "ipd_personal_hygiene_id")
	private int personalHygieneId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "procedures")
	private String procedure;
	
	@Column(name = "times")
	private String times;
	
	@Column(name = "shifts")
	private String shifts;
	
	@Column(name = "sign")
	private String signatures;
	
	@Column(name = "morning_instructions")
	private String morningInstructions;
	
	@Column(name = "evening_instructions")
	private String eveningInstructions;	
	
	@Column(name = "night_instructions")
	private String nightInstructions;
	
	@Column(name = "icn_orders_morning")
	private String icnOrdersMorning;
	
	@Column(name = "icn_orders_evening")
	private String icnOrdersEvening;
	
	@Column(name = "icn_orders_night")
	private String icnOrdersNight;
	
	@Column(name = "added_by",updatable=false)
	private int addedby;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addeddate;
	
	@Column(name = "updated_by")
	private int updatedby;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updateddate;
	
	@Column(name = "ip_address")
	private String ipAddress;
	
	@Column(name = "status")
	private String status ="Y";

	@Transient
	private String morningRecords;

	@Transient
	private String allInstructions;
	
	@Transient
	private String eveningRecords;
	
	@Transient
	private String nightRecords;
	
	@Transient
	private List<PersonalHygieneChartDTO> listPHC;

	public int getPersonalHygieneId() {
		return personalHygieneId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public String getDate() {
		return date;
	}

	public String getProcedure() {
		return procedure;
	}

	public String getTimes() {
		return times;
	}

	public String getShifts() {
		return shifts;
	}

	public String getMorningInstructions() {
		return morningInstructions;
	}

	public String getEveningInstructions() {
		return eveningInstructions;
	}

	public String getNightInstructions() {
		return nightInstructions;
	}

	public int getAddedby() {
		return addedby;
	}

	public Date getAddeddate() {
		return addeddate;
	}

	public int getUpdatedby() {
		return updatedby;
	}

	public Date getUpdateddate() {
		return updateddate;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public String getStatus() {
		return status;
	}

	public List<PersonalHygieneChartDTO> getListPHC() {
		return listPHC;
	}

	public void setPersonalHygieneId(int personalHygieneId) {
		this.personalHygieneId = personalHygieneId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setProcedure(String procedure) {
		this.procedure = procedure;
	}

	public void setTimes(String times) {
		this.times = times;
	}

	public void setShifts(String shifts) {
		this.shifts = shifts;
	}

	public void setMorningInstructions(String morningInstructions) {
		this.morningInstructions = morningInstructions;
	}

	public void setEveningInstructions(String eveningInstructions) {
		this.eveningInstructions = eveningInstructions;
	}

	public void setNightInstructions(String nightInstructions) {
		this.nightInstructions = nightInstructions;
	}

	public void setAddedby(int addedby) {
		this.addedby = addedby;
	}

	public void setAddeddate(Date addeddate) {
		this.addeddate = addeddate;
	}

	public void setUpdatedby(int updatedby) {
		this.updatedby = updatedby;
	}

	public void setUpdateddate(Date updateddate) {
		this.updateddate = updateddate;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setListPHC(List<PersonalHygieneChartDTO> listPHC) {
		this.listPHC = listPHC;
	}

	public String getMorningRecords() {
		return morningRecords;
	}

	public String getEveningRecords() {
		return eveningRecords;
	}

	public String getNightRecords() {
		return nightRecords;
	}

	public void setMorningRecords(String morningRecords) {
		this.morningRecords = morningRecords;
	}

	public void setEveningRecords(String eveningRecords) {
		this.eveningRecords = eveningRecords;
	}

	public void setNightRecords(String nightRecords) {
		this.nightRecords = nightRecords;
	}

	public String getAllInstructions() {
		return allInstructions;
	}

	public void setAllInstructions(String allInstructions) {
		this.allInstructions = allInstructions;
	}

	public String getSignatures() {
		return signatures;
	}

	public void setSignatures(String signatures) {
		this.signatures = signatures;
	}

	public String getIcnOrdersMorning() {
		return icnOrdersMorning;
	}

	public void setIcnOrdersMorning(String icnOrdersMorning) {
		this.icnOrdersMorning = icnOrdersMorning;
	}

	public String getIcnOrdersEvening() {
		return icnOrdersEvening;
	}

	public void setIcnOrdersEvening(String icnOrdersEvening) {
		this.icnOrdersEvening = icnOrdersEvening;
	}

	public String getIcnOrdersNight() {
		return icnOrdersNight;
	}

	public void setIcnOrdersNight(String icnOrdersNight) {
		this.icnOrdersNight = icnOrdersNight;
	}

	
	
	
}