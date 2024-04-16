package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.Immutable;

@XmlRootElement
@Entity 
@Immutable
@Table(name = "ehat_claim_api")
public class PatientClaimDetails implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "policy_id")
	private Integer policyId;
	
	@Column(name = "tpa_id")
	private String tpaId;

	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
		
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "sponsor_name")
	private String sponsorName;
	
	@Column(name = "relative_name")
	private String relativeName;
	
	@Column(name = "relation")
	private String relation;
	
	@Column(name = "exp_discharge_date")
	private String expectedDischargeDate;
	
	@Column(name = "exp_discharge_time")
	private String expectedDischargeTime;
	
	@Column(name = "risk_factors")
	private String riskFactors;
	
	@Column(name = "complications")
	private String complications;
	
	@Column(name = "treatment_given")
	private String treatmentGiven;
	
	@Column(name = "condition_at_discharge")
	private String conditionAtDischarge;
	
	@Column(name = "settled_amount")
	private Double settledAmount;
	
	@Column(name = "settled_date")
	private String settledDate;
	
	@Transient
	private List<PatientClaimDetails> listClaimInfo;

	public Integer getPolicyId() {
		return policyId;
	}

	public void setPolicyId(Integer policyId) {
		this.policyId = policyId;
	}

	public String getTpaId() {
		return tpaId;
	}

	public void setTpaId(String tpaId) {
		this.tpaId = tpaId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public String getRelativeName() {
		return relativeName;
	}

	public void setRelativeName(String relativeName) {
		this.relativeName = relativeName;
	}

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

	public String getExpectedDischargeDate() {
		return expectedDischargeDate;
	}

	public void setExpectedDischargeDate(String expectedDischargeDate) {
		this.expectedDischargeDate = expectedDischargeDate;
	}

	public String getExpectedDischargeTime() {
		return expectedDischargeTime;
	}

	public void setExpectedDischargeTime(String expectedDischargeTime) {
		this.expectedDischargeTime = expectedDischargeTime;
	}

	public String getRiskFactors() {
		return riskFactors;
	}

	public void setRiskFactors(String riskFactors) {
		this.riskFactors = riskFactors;
	}

	public String getComplications() {
		return complications;
	}

	public void setComplications(String complications) {
		this.complications = complications;
	}

	public String getTreatmentGiven() {
		return treatmentGiven;
	}

	public void setTreatmentGiven(String treatmentGiven) {
		this.treatmentGiven = treatmentGiven;
	}

	public String getConditionAtDischarge() {
		return conditionAtDischarge;
	}

	public void setConditionAtDischarge(String conditionAtDischarge) {
		this.conditionAtDischarge = conditionAtDischarge;
	}

	public Double getSettledAmount() {
		return settledAmount;
	}

	public void setSettledAmount(Double settledAmount) {
		this.settledAmount = settledAmount;
	}

	public String getSettledDate() {
		return settledDate;
	}

	public void setSettledDate(String settledDate) {
		this.settledDate = settledDate;
	}

	public List<PatientClaimDetails> getListClaimInfo() {
		return listClaimInfo;
	}

	public void setListClaimInfo(List<PatientClaimDetails> listClaimInfo) {
		this.listClaimInfo = listClaimInfo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}	
}
