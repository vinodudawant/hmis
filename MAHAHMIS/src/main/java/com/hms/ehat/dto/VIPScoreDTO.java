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

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_ipd_vip_score")
public class VIPScoreDTO implements Serializable{
	
	
	@Id
	@GeneratedValue
	@Column(name = "ipd_vip_score_id")
	private int vipScoreId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "action_plan")
	private String actionPlan;
	
	
	@Column(name = "vip_score")
	private int vipScore;
	
	@Column(name = "duration")
	private String duration;
	
	@Column(name = "date")
	private String date;
	
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
	
	@Column(name = "ip_address")
	private String ipAddress;
	
	@Column(name = "status")
	private String status ="Y";
	
	@Transient
	private List<VIPScoreDTO> listVIP;

	public int getVipScoreId() {
		return vipScoreId;
	}

	public void setVipScoreId(int vipScoreId) {
		this.vipScoreId = vipScoreId;
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

	public String getActionPlan() {
		return actionPlan;
	}

	public void setActionPlan(String actionPlan) {
		this.actionPlan = actionPlan;
	}

	public int getVipScore() {
		return vipScore;
	}

	public void setVipScore(int vipScore) {
		this.vipScore = vipScore;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public List<VIPScoreDTO> getListVIP() {
		return listVIP;
	}

	public void setListVIP(List<VIPScoreDTO> listVIP) {
		this.listVIP = listVIP;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
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

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
