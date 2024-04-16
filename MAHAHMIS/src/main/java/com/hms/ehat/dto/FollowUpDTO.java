package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
//@Table(name ="follow_up")
public class FollowUpDTO implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "follow_up_id")
	private int followUpId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "branch_id")
	private int branchId;
	
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "doc_name")
	private String DoctorName;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "radioDayWeekMonth")
	private String radioDayWeekMonth;
	
	@Column(name = "valueDayWeekMonth")
	private String valueDayWeekMonth;
	
	@Transient
	private List<FollowUpDTO> followUpList;

	public int getFollowUpId() {
		return followUpId;
	}

	public void setFollowUpId(int followUpId) {
		this.followUpId = followUpId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
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

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorName() {
		return DoctorName;
	}

	public void setDoctorName(String doctorName) {
		DoctorName = doctorName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRadioDayWeekMonth() {
		return radioDayWeekMonth;
	}

	public void setRadioDayWeekMonth(String radioDayWeekMonth) {
		this.radioDayWeekMonth = radioDayWeekMonth;
	}

	public String getValueDayWeekMonth() {
		return valueDayWeekMonth;
	}

	public void setValueDayWeekMonth(String valueDayWeekMonth) {
		this.valueDayWeekMonth = valueDayWeekMonth;
	}
	
	@JsonGetter("listfollowUp")
	public List<FollowUpDTO> getFollowUpList() {
		return followUpList;
	}

	@JsonSetter("listfollowUp")
	public void setFollowUpList(List<FollowUpDTO> followUpList) {
		this.followUpList = followUpList;
	}
	
	
	
}
