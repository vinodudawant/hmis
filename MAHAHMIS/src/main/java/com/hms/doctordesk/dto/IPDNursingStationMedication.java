package com.hms.doctordesk.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Entity
//@Component
@Table(name = "ipd_nursingstation_medication_dashboard")
public class IPDNursingStationMedication implements Serializable {

	private static final long serialVersionUID = 7919569722294032676L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_ipd_nursingStation_medication_dashboard")
	private Integer ipdNursingStationMedicationId;

	@Column(name = "prescription_id" , columnDefinition="INT(11) default '0'")
	private Integer prescriptionId;
	
	@Column(name = "duration_days", columnDefinition="varchar(45) default 'NULL'")
	private String durationDays;

	@Column(name = "duration_current_day", columnDefinition="INT(11) default '0'")
	private Integer durrationCurrentDay;
	
	@Column(name = "duration_current_date", columnDefinition="varchar(45) default 'NULL'")
	private String durationCurrentDate;
	
	@Column(name = "done_by", columnDefinition="INT(11) default '0'")
	private Integer doneBy;

	@Column(name = "done_date", columnDefinition="varchar(45) default 'NULL'")
	private String doneDate;
	
	@Column(name = "done_time", columnDefinition="varchar(45) default 'NULL'")
	private String doneTime;

	@Column(name = "reverse_by", columnDefinition="INT(11) default '0'")
	private Integer reverseBy;
	
	
	@Column(name = "administered_status", columnDefinition="varchar(45) default 'N'")
	private String administeredStatus="N";
	
	@Column(name = "status", columnDefinition="varchar(45) default 'N'")
	private String status="N";

	@Column(name = "timeslot", columnDefinition="varchar(45) default '0'")
	private String timeslot;
	
	@Column(name = "quantity")
	private double quantity;

	@Column(name = "treatment_id", columnDefinition="INT(45) default '0'")
	private Integer treatmentId;

	public Integer getIpdNursingStationMedicationId() {
		return ipdNursingStationMedicationId;
	}

	public void setIpdNursingStationMedicationId(Integer ipdNursingStationMedicationId) {
		this.ipdNursingStationMedicationId = ipdNursingStationMedicationId;
	}

	public Integer getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(Integer prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

	public String getDurationDays() {
		return durationDays;
	}

	public void setDurationDays(String durationDays) {
		this.durationDays = durationDays;
	}

	public Integer getDurrationCurrentDay() {
		return durrationCurrentDay;
	}

	public void setDurrationCurrentDay(Integer durrationCurrentDay) {
		this.durrationCurrentDay = durrationCurrentDay;
	}

	public String getDurationCurrentDate() {
		return durationCurrentDate;
	}

	public void setDurationCurrentDate(String durationCurrentDate) {
		this.durationCurrentDate = durationCurrentDate;
	}

	public Integer getDoneBy() {
		return doneBy;
	}

	public void setDoneBy(Integer doneBy) {
		this.doneBy = doneBy;
	}

	public String getDoneDate() {
		return doneDate;
	}

	public void setDoneDate(String doneDate) {
		this.doneDate = doneDate;
	}

	public String getDoneTime() {
		return doneTime;
	}

	public void setDoneTime(String doneTime) {
		this.doneTime = doneTime;
	}

	public Integer getReverseBy() {
		return reverseBy;
	}

	public void setReverseBy(Integer reverseBy) {
		this.reverseBy = reverseBy;
	}

	public String getAdministeredStatus() {
		return administeredStatus;
	}

	public void setAdministeredStatus(String administeredStatus) {
		this.administeredStatus = administeredStatus;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTimeslot() {
		return timeslot;
	}

	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	@Override
	public String toString() {
		return "IPDNursingStationMedication [ipdNursingStationMedicationId=" + ipdNursingStationMedicationId
				+ ", prescriptionId=" + prescriptionId + ", durationDays=" + durationDays + ", durrationCurrentDay="
				+ durrationCurrentDay + ", durationCurrentDate=" + durationCurrentDate + ", doneBy=" + doneBy
				+ ", doneDate=" + doneDate + ", doneTime=" + doneTime + ", reverseBy=" + reverseBy
				+ ", administeredStatus=" + administeredStatus + ", status=" + status + ", timeslot=" + timeslot
				+ ", quantity=" + quantity + ", treatmentId=" + treatmentId + "]";
	}
	
	
	
	
	
	
}
