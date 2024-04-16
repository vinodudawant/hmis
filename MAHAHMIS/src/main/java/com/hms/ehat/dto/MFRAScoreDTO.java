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
@Table(name = "ehat_ipd_mfra_score")
public class MFRAScoreDTO implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "ipd_mfra_score_id")
	private int mfraScoreId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "total_score")
	private int totalScore;
	
	@Column(name = "action_plan")
	private String actionPlan;
	
	@Column(name = "risk_level")
	private String riskLevel;
	
	@Column(name = "time")
	private String times;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "factors")
	private String factors;
	
	@Column(name = "scores")
	private String scores;

	@Transient
	private String records;
	
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
	private List<MFRAScoreDTO> listMFRA;

	public int getMfraScoreId() {
		return mfraScoreId;
	}

	public void setMfraScoreId(int mfraScoreId) {
		this.mfraScoreId = mfraScoreId;
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

	public int getTotalScore() {
		return totalScore;
	}

	public void setTotalScore(int totalScore) {
		this.totalScore = totalScore;
	}

	public String getActionPlan() {
		return actionPlan;
	}

	public void setActionPlan(String actionPlan) {
		this.actionPlan = actionPlan;
	}

	public String getRiskLevel() {
		return riskLevel;
	}

	public void setRiskLevel(String riskLevel) {
		this.riskLevel = riskLevel;
	}

	public String getTimes() {
		return times;
	}

	public void setTimes(String times) {
		this.times = times;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getFactors() {
		return factors;
	}

	public void setFactors(String factors) {
		this.factors = factors;
	}

	public String getRecords() {
		return records;
	}

	public void setRecords(String records) {
		this.records = records;
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

	public List<MFRAScoreDTO> getListMFRA() {
		return listMFRA;
	}

	public void setListMFRA(List<MFRAScoreDTO> listMFRA) {
		this.listMFRA = listMFRA;
	}

	public String getScores() {
		return scores;
	}

	public void setScores(String scores) {
		this.scores = scores;
	}
	
	
	

}
