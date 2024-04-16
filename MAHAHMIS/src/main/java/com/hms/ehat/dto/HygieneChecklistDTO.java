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
@Table(name = "ehat_ipd_hygiene_checklist")
public class HygieneChecklistDTO implements Serializable{
	
	@Id
	@GeneratedValue
	@Column(name = "ipd_hygiene_checklist_id")
	private int hygieneId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "procedure_name")
	private String procedure;
	
	@Column(name = "done_by")
	private String doneBy;
	
	@Column(name = "protocol_before")
	private String protocolBefore;
	
	@Column(name = "protocol_after")
	private String protocolAfter;
	
	@Column(name = "signature")
	private String signature;	
	
	@Column(name = "icn_sign")
	private String icnSign;
	
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
	private String status= "Y";
	
	@Transient
	private List<HygieneChecklistDTO> listHHC;

	public int getHygieneId() {
		return hygieneId;
	}

	public void setHygieneId(int hygieneId) {
		this.hygieneId = hygieneId;
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

	public String getProcedure() {
		return procedure;
	}

	public void setProcedure(String procedure) {
		this.procedure = procedure;
	}

	public String getDoneBy() {
		return doneBy;
	}

	public void setDoneBy(String doneBy) {
		this.doneBy = doneBy;
	}

	public String getProtocolBefore() {
		return protocolBefore;
	}

	public void setProtocolBefore(String protocolBefore) {
		this.protocolBefore = protocolBefore;
	}

	public String getProtocolAfter() {
		return protocolAfter;
	}

	public void setProtocolAfter(String protocolAfter) {
		this.protocolAfter = protocolAfter;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getIcnSign() {
		return icnSign;
	}

	public void setIcnSign(String icnSign) {
		this.icnSign = icnSign;
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

	public List<HygieneChecklistDTO> getListHHC() {
		return listHHC;
	}

	public void setListHHC(List<HygieneChecklistDTO> listHHC) {
		this.listHHC = listHHC;
	}
	

	
}
