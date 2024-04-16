package com.hms.ehat.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_tnm_service_details")
public class TNMServicedetails implements Serializable {
	
	@Id
	@Column(name = "tnm_stages_id")
	private Integer tnmstagesid;
	
	
	@Column(name = "patient_id")
	private Integer patientid;
	
	@Column(name = "tnm_stage")
	private String tnmstage;
	
	@Column(name = "tnm_description")
	private String tnmdescription;
	
	@Column(name = "tnm_clinical_date")
	private java.util.Date tnmclinicaldate;
	
	@Column(name = "tnm_comment")
	private String tnmcomment;
	
	@Column(name = "tnm_all_stages")
	private String tnmallstages;
	
	//For getting Date with Time
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inserted_date_time")
	private java.util.Date inserted_date_time;
	
	@Column(name = "inserted_by",updatable=false)
	private int insertedby;
	
	@Column(name = "updated_by")
	private int updatedby;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private java.util.Date updated_date_time;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "remote_ip")
	private String remoteip;
	
	@Transient
	private List<TNMServicedetails> listTNMOpd;
	
	public List<TNMServicedetails> getListTNMOpd() {
		return listTNMOpd;
	}

	public void setListTNMOpd(List<TNMServicedetails> listTNMOpd) {
		this.listTNMOpd = listTNMOpd;
	}

	public Integer getTnmstagesid() {
		return tnmstagesid;
	}

	public void setTnmstagesid(Integer tnmstagesid) {
		this.tnmstagesid = tnmstagesid;
	}

	public Integer getPatientid() {
		return patientid;
	}

	public void setPatientid(Integer patientid) {
		this.patientid = patientid;
	}

	public String getTnmstage() {
		return tnmstage;
	}

	public void setTnmstage(String tnmstage) {
		this.tnmstage = tnmstage;
	}

	public String getTnmdescription() {
		return tnmdescription;
	}

	public void setTnmdescription(String tnmdescription) {
		this.tnmdescription = tnmdescription;
	}

	public java.util.Date getTnmclinicaldate() {
		return tnmclinicaldate;
	}

	public void setTnmclinicaldate(java.util.Date tnmclinicaldate) {
		this.tnmclinicaldate = tnmclinicaldate;
	}

	public String getTnmcomment() {
		return tnmcomment;
	}

	public void setTnmcomment(String tnmcomment) {
		this.tnmcomment = tnmcomment;
	}

	public String getTnmallstages() {
		return tnmallstages;
	}

	public void setTnmallstages(String tnmallstages) {
		this.tnmallstages = tnmallstages;
	}

	public java.util.Date getInserted_date_time() {
		return inserted_date_time;
	}

	public void setInserted_date_time(java.util.Date inserted_date_time) {
		this.inserted_date_time = inserted_date_time;
	}

	public int getInsertedby() {
		return insertedby;
	}

	public void setInsertedby(int insertedby) {
		this.insertedby = insertedby;
	}

	public int getUpdatedby() {
		return updatedby;
	}

	public void setUpdatedby(int updatedby) {
		this.updatedby = updatedby;
	}

	public java.util.Date getUpdated_date_time() {
		return updated_date_time;
	}

	public void setUpdated_date_time(java.util.Date updated_date_time) {
		this.updated_date_time = updated_date_time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemoteip() {
		return remoteip;
	}

	public void setRemoteip(String remoteip) {
		this.remoteip = remoteip;
	}
	
	
		
}
