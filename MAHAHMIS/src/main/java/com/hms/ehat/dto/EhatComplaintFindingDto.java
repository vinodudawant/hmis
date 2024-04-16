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
@Table(name = "ehat_patient_complaint_findings")
public class EhatComplaintFindingDto implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idehat_patient_complaint_findings")
	private Integer idEhatCompFindId;
	
	@Column(name = "patient_id")
	private Integer patientId;

	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "complaint_findings_id")
	private Integer complaintFindingsId;
	
	@Column(name = "complaint_findings_val")
	private String complaintFindingsVal;
	
	@Column(name = "comp_find_type")
	private String type;
	
	@Column(name = "assigned_by",updatable=false)
	private Integer addedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "assigned_date_time",updatable=false)
	private Date addedOn;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedOn;
	
	@Column(name = "status_complaint_findings",columnDefinition="varchar(2) default 'N'")
	private String status="N";
	
	@Transient
	private List<EhatComplaintFindingDto> listQue;
	
	public List<EhatComplaintFindingDto> getListQue() {
		return listQue;
	}

	public void setListQue(List<EhatComplaintFindingDto> listQue) {
		this.listQue = listQue;
	}

	@Transient
	private List<EhatComplaintFindingDto> listComplaintFinding;

	public Integer getIdEhatCompFindId() {
		return idEhatCompFindId;
	}

	public void setIdEhatCompFindId(Integer idEhatCompFindId) {
		this.idEhatCompFindId = idEhatCompFindId;
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

	public Integer getComplaintFindingsId() {
		return complaintFindingsId;
	}

	public void setComplaintFindingsId(Integer complaintFindingsId) {
		this.complaintFindingsId = complaintFindingsId;
	}

	public String getComplaintFindingsVal() {
		return complaintFindingsVal;
	}

	public void setComplaintFindingsVal(String complaintFindingsVal) {
		this.complaintFindingsVal = complaintFindingsVal;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(Integer addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedOn() {
		return addedOn;
	}

	public void setAddedOn(Date addedOn) {
		this.addedOn = addedOn;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<EhatComplaintFindingDto> getListComplaintFinding() {
		return listComplaintFinding;
	}

	public void setListComplaintFinding(
			List<EhatComplaintFindingDto> listComplaintFinding) {
		this.listComplaintFinding = listComplaintFinding;
	}
	
	
}
