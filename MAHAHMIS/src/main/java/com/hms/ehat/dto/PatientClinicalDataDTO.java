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
@Table(name = "ehat_radiation_clinical_data")
public class PatientClinicalDataDTO implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "radiation_clinical_data_id")
	private int patientClinicalId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "reg_no")
	private String regNo;
	
	@Column(name = "diagnosis")
	private String diagnosis;
	
	@Column(name = "rt_no")
	private String rtNo;

	@Column(name = "histology")
	private String histology;
	
	@Column(name = "stage")
	private String stage;
	
	@Column(name = "tnm")
	private String tnm;
	
	@Column(name = "t")
	private String t;
	
	@Column(name = "n")
	private String n;
	
	@Column(name = "m")
	private String m;	 
	
	@Column(name = "history_and_findings")
	private String historyAndFindings;
	
	@Column(name = "previous_treatment")
	private String previousTreatment;
	
	@Column(name = "surgery")
	private String surgery;
	
	@Column(name = "chemotherapy")
	private String chemotherapy;
	
	@Column(name = "radiotherapy")
	private String radiotherapy;	
	
	@Column(name = "countouring_details")
	private String countouringDetails;
	
	@Column(name = "radiation_summary_from")
	private String radiationSummaryFrom;
	
	@Column(name = "radiation_summary_to")
	private String radiationSummaryTo;
	
	@Column(name = "brachy_therapy")
	private String brachyTherapy;
	
	@Column(name = "final_dosage_p1")
	private String finalDosageP1;
	
	@Column(name = "final_dosage_p2")
	private String finalDosageP2;
	
	@Column(name = "final_dosage_p3")
	private String finalDosageP3;
	
	@Column(name = "gy_p1")
	private String gyP1;
	
	@Column(name = "gy_p2")
	private String gyP2;
	
	@Column(name = "gy_p3")
	private String gyP3;
	
	@Column(name = "site_p1")
	private String siteP1;
	
	@Column(name = "site_p2")
	private String siteP2;
	
	@Column(name = "site_p3")
	private String siteP3;
	
	@Column(name = "fraction_days_p1")
	private String fractionDaysP1;
	
	@Column(name = "fraction_days_p2")
	private String fractionDaysP2;
	
	@Column(name = "fraction_days_p3")
	private String fractionDaysP3;
	
	@Column(name = "cause_of_gap")
	private String causeOfGap;
	
	@Column(name = "protocol")
	private String protocol;
	
	@Column(name = "intention_values")
	private String intentionValues;
	
	@Column(name = "fractionation_values")
	private String fractionationValues;
	
	@Column(name = "evaluation_values")
	private String evaluationValues;
	
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
	
	@Column(name = "status")
	private String status ="Y";

	@Transient
	private List<PatientClinicalDataDTO> clinicalList;

	public int getPatientClinicalId() {
		return patientClinicalId;
	}

	public void setPatientClinicalId(int patientClinicalId) {
		this.patientClinicalId = patientClinicalId;
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

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getRtNo() {
		return rtNo;
	}

	public void setRtNo(String rtNo) {
		this.rtNo = rtNo;
	}

	public String getHistology() {
		return histology;
	}

	public void setHistology(String histology) {
		this.histology = histology;
	}

	public String getStage() {
		return stage;
	}

	public void setStage(String stage) {
		this.stage = stage;
	}

	public String getTnm() {
		return tnm;
	}

	public void setTnm(String tnm) {
		this.tnm = tnm;
	}

	public String getT() {
		return t;
	}

	public void setT(String t) {
		this.t = t;
	}

	public String getN() {
		return n;
	}

	public void setN(String n) {
		this.n = n;
	}

	public String getM() {
		return m;
	}

	public void setM(String m) {
		this.m = m;
	}

	public String getHistoryAndFindings() {
		return historyAndFindings;
	}

	public void setHistoryAndFindings(String historyAndFindings) {
		this.historyAndFindings = historyAndFindings;
	}

	public String getPreviousTreatment() {
		return previousTreatment;
	}

	public void setPreviousTreatment(String previousTreatment) {
		this.previousTreatment = previousTreatment;
	}

	public String getSurgery() {
		return surgery;
	}

	public void setSurgery(String surgery) {
		this.surgery = surgery;
	}

	public String getChemotherapy() {
		return chemotherapy;
	}

	public void setChemotherapy(String chemotherapy) {
		this.chemotherapy = chemotherapy;
	}

	public String getRadiotherapy() {
		return radiotherapy;
	}

	public void setRadiotherapy(String radiotherapy) {
		this.radiotherapy = radiotherapy;
	}

	public String getCountouringDetails() {
		return countouringDetails;
	}

	public void setCountouringDetails(String countouringDetails) {
		this.countouringDetails = countouringDetails;
	}

	public String getRadiationSummaryFrom() {
		return radiationSummaryFrom;
	}

	public void setRadiationSummaryFrom(String radiationSummaryFrom) {
		this.radiationSummaryFrom = radiationSummaryFrom;
	}

	public String getRadiationSummaryTo() {
		return radiationSummaryTo;
	}

	public void setRadiationSummaryTo(String radiationSummaryTo) {
		this.radiationSummaryTo = radiationSummaryTo;
	}

	public String getBrachyTherapy() {
		return brachyTherapy;
	}

	public void setBrachyTherapy(String brachyTherapy) {
		this.brachyTherapy = brachyTherapy;
	}

	public String getFinalDosageP1() {
		return finalDosageP1;
	}

	public void setFinalDosageP1(String finalDosageP1) {
		this.finalDosageP1 = finalDosageP1;
	}

	public String getFinalDosageP2() {
		return finalDosageP2;
	}

	public void setFinalDosageP2(String finalDosageP2) {
		this.finalDosageP2 = finalDosageP2;
	}

	public String getFinalDosageP3() {
		return finalDosageP3;
	}

	public void setFinalDosageP3(String finalDosageP3) {
		this.finalDosageP3 = finalDosageP3;
	}

	public String getGyP1() {
		return gyP1;
	}

	public void setGyP1(String gyP1) {
		this.gyP1 = gyP1;
	}

	public String getGyP2() {
		return gyP2;
	}

	public void setGyP2(String gyP2) {
		this.gyP2 = gyP2;
	}

	public String getGyP3() {
		return gyP3;
	}

	public void setGyP3(String gyP3) {
		this.gyP3 = gyP3;
	}

	public String getSiteP1() {
		return siteP1;
	}

	public void setSiteP1(String siteP1) {
		this.siteP1 = siteP1;
	}

	public String getSiteP2() {
		return siteP2;
	}

	public void setSiteP2(String siteP2) {
		this.siteP2 = siteP2;
	}

	public String getSiteP3() {
		return siteP3;
	}

	public void setSiteP3(String siteP3) {
		this.siteP3 = siteP3;
	}

	public String getFractionDaysP1() {
		return fractionDaysP1;
	}

	public void setFractionDaysP1(String fractionDaysP1) {
		this.fractionDaysP1 = fractionDaysP1;
	}

	public String getFractionDaysP2() {
		return fractionDaysP2;
	}

	public void setFractionDaysP2(String fractionDaysP2) {
		this.fractionDaysP2 = fractionDaysP2;
	}

	public String getFractionDaysP3() {
		return fractionDaysP3;
	}

	public void setFractionDaysP3(String fractionDaysP3) {
		this.fractionDaysP3 = fractionDaysP3;
	}

	public String getCauseOfGap() {
		return causeOfGap;
	}

	public void setCauseOfGap(String causeOfGap) {
		this.causeOfGap = causeOfGap;
	}

	public String getProtocol() {
		return protocol;
	}

	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}

	public String getIntentionValues() {
		return intentionValues;
	}

	public void setIntentionValues(String intentionValues) {
		this.intentionValues = intentionValues;
	}

	public String getFractionationValues() {
		return fractionationValues;
	}

	public void setFractionationValues(String fractionationValues) {
		this.fractionationValues = fractionationValues;
	}

	public String getEvaluationValues() {
		return evaluationValues;
	}

	public void setEvaluationValues(String evaluationValues) {
		this.evaluationValues = evaluationValues;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<PatientClinicalDataDTO> getClinicalList() {
		return clinicalList;
	}

	public void setClinicalList(List<PatientClinicalDataDTO> clinicalList) {
		this.clinicalList = clinicalList;
	}	
	
	
}
