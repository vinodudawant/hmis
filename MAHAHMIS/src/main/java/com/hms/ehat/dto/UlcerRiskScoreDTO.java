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
@Table(name = "ehat_ipd_ulcer_risk_score")
public class UlcerRiskScoreDTO {
	
	
	@Id
	@GeneratedValue
	@Column(name = "ipd_ulcer_risk_score_id")
	private int ulcerRiskScoreId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "sensory_perception")
	private int sensoryPerception;
	
	@Column(name = "activity")
	private int activity;
	  
	@Column(name = "risk_level")
	private String riskLevel;
	
	@Column(name = "action_plan")
	private String actionPlan;
	
	@Column(name = "mobility")
	private int mobility;
	
	@Column(name = "moisture")
	private int moisture;
	
	@Column(name = "friction")
	private int friction;	
	
	@Column(name = "nutrition")
	private int nutrition;
	
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
	private String status = "Y";
	
	@Transient
	private List<UlcerRiskScoreDTO> listURS;

	public int getUlcerRiskScoreId() {
		return ulcerRiskScoreId;
	}

	public void setUlcerRiskScoreId(int ulcerRiskScoreId) {
		this.ulcerRiskScoreId = ulcerRiskScoreId;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getRiskLevel() {
		return riskLevel;
	}

	public void setRiskLevel(String riskLevel) {
		this.riskLevel = riskLevel;
	}

	public String getActionPlan() {
		return actionPlan;
	}

	public void setActionPlan(String actionPlan) {
		this.actionPlan = actionPlan;
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

	public List<UlcerRiskScoreDTO> getListURS() {
		return listURS;
	}

	public void setListURS(List<UlcerRiskScoreDTO> listURS) {
		this.listURS = listURS;
	}

	public int getSensoryPerception() {
		return sensoryPerception;
	}

	public void setSensoryPerception(int sensoryPerception) {
		this.sensoryPerception = sensoryPerception;
	}

	public int getActivity() {
		return activity;
	}

	public void setActivity(int activity) {
		this.activity = activity;
	}

	public int getMobility() {
		return mobility;
	}

	public void setMobility(int mobility) {
		this.mobility = mobility;
	}

	public int getMoisture() {
		return moisture;
	}

	public void setMoisture(int moisture) {
		this.moisture = moisture;
	}

	public int getFriction() {
		return friction;
	}

	public void setFriction(int friction) {
		this.friction = friction;
	}

	public int getNutrition() {
		return nutrition;
	}

	public void setNutrition(int nutrition) {
		this.nutrition = nutrition;
	}
	
	
	

}
