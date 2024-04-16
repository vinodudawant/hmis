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
@Table(name = "ehat_ipd_glasgow_coma_score")
public class GlasgowComaScoreDTO implements Serializable{
	

	@Id
	@GeneratedValue
	@Column(name = "ipd_glasgow_coma_score_id")
	private int glasgowComaScoreId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "action_undertaken")
	private String actionUndertaken;
	
	@Column(name = "total_score")
	private String totalScore;
	
	@Column(name = "eor_score")
	private String eorScore;
	 
	@Column(name = "bvr_score")
	private String bvrScore;
	
	@Column(name = "bmr_score")
	private String bmrScore;	
	
	@Column(name = "eor_time")
	private String eorTime;
	
	@Column(name = "bvr_time")
	private String bvrTime;	
	
	@Column(name = "bmr_time")
	private String bmrTime;	
	
	@Column(name = "date")
	private String date;
	
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
	private List<GlasgowComaScoreDTO> listGCS;

	public int getGlasgowComaScoreId() {
		return glasgowComaScoreId;
	}

	public void setGlasgowComaScoreId(int glasgowComaScoreId) {
		this.glasgowComaScoreId = glasgowComaScoreId;
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

	public String getActionUndertaken() {
		return actionUndertaken;
	}

	public void setActionUndertaken(String actionUndertaken) {
		this.actionUndertaken = actionUndertaken;
	}

	public String getTotalScore() {
		return totalScore;
	}

	public void setTotalScore(String totalScore) {
		this.totalScore = totalScore;
	}

	public String getEorScore() {
		return eorScore;
	}

	public void setEorScore(String eorScore) {
		this.eorScore = eorScore;
	}

	public String getBvrScore() {
		return bvrScore;
	}

	public void setBvrScore(String bvrScore) {
		this.bvrScore = bvrScore;
	}

	public String getBmrScore() {
		return bmrScore;
	}

	public void setBmrScore(String bmrScore) {
		this.bmrScore = bmrScore;
	}

	public String getEorTime() {
		return eorTime;
	}

	public void setEorTime(String eorTime) {
		this.eorTime = eorTime;
	}

	public String getBvrTime() {
		return bvrTime;
	}

	public void setBvrTime(String bvrTime) {
		this.bvrTime = bvrTime;
	}

	public String getBmrTime() {
		return bmrTime;
	}

	public void setBmrTime(String bmrTime) {
		this.bmrTime = bmrTime;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getAddedby() {
		return addedby;
	}

	public void setAddedby(int addedby) {
		this.addedby = addedby;
	}

	public Date getAddeddate() {
		return addeddate;
	}

	public void setAddeddate(Date addeddate) {
		this.addeddate = addeddate;
	}

	public int getUpdatedby() {
		return updatedby;
	}

	public void setUpdatedby(int updatedby) {
		this.updatedby = updatedby;
	}

	public Date getUpdateddate() {
		return updateddate;
	}

	public void setUpdateddate(Date updateddate) {
		this.updateddate = updateddate;
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

	public List<GlasgowComaScoreDTO> getListGCS() {
		return listGCS;
	}

	public void setListGCS(List<GlasgowComaScoreDTO> listGCS) {
		this.listGCS = listGCS;
	}
	
}
