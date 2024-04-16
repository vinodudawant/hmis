package com.hms.ehat.dto;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Immutable;

@Entity 
@Table(name = "ehat_ipd_nursing_care_plan_page4")
public class NursingCarePlanPage4DTO implements Serializable {
	
	@Id
	@GeneratedValue
	@Column(name = "ipd_nursing_care_plan_id")
	private int nursingCarePlanId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "assessment")
	private String assessment;
	
	@Column(name = "evaluation")
	private String evaluation;
	
	@Column(name = "nursing_diagnosis")
	private String nursingDiagnosis;
	
	@Column(name = "planning")
	private String planning;
	
	@Column(name = "implementation")
	private String implementation;	
	
	@Column(name = "tests")
	private String testValues;
	
	@Column(name = "added_by")
	private int addedby;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date")
	private Date addeddate;
	
	@Column(name = "updated_by")
	private int updatedby;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updateddate;
	
	@Column(name = "ip_address")
	private String ipAddress;
	
	@Column(name = "status")
	private String status="Y";
	
	@Transient
	private List<NursingCarePlanPage4DTO> listNCP;

	public int getNursingCarePlanId() {
		return nursingCarePlanId;
	}

	public void setNursingCarePlanId(int nursingCarePlanId) {
		this.nursingCarePlanId = nursingCarePlanId;
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

	public String getAssessment() {
		return assessment;
	}

	public void setAssessment(String assessment) {
		this.assessment = assessment;
	}

	public String getEvaluation() {
		return evaluation;
	}

	public void setEvaluation(String evaluation) {
		this.evaluation = evaluation;
	}

	public String getNursingDiagnosis() {
		return nursingDiagnosis;
	}

	public void setNursingDiagnosis(String nursingDiagnosis) {
		this.nursingDiagnosis = nursingDiagnosis;
	}

	public String getPlanning() {
		return planning;
	}

	public void setPlanning(String planning) {
		this.planning = planning;
	}

	public String getImplementation() {
		return implementation;
	}

	public void setImplementation(String implementation) {
		this.implementation = implementation;
	}

	public String getTestValues() {
		return testValues;
	}

	public void setTestValues(String testValues) {
		this.testValues = testValues;
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
		this.status = "Y";
	}

	public List<NursingCarePlanPage4DTO> getListNCP() {
		return listNCP;
	}

	public void setListNCP(List<NursingCarePlanPage4DTO> listNCP) {
		this.listNCP = listNCP;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	

}
