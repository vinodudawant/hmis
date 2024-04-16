package com.hms.doctordesk.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="dd_clinicl_master")
public class DdClinicalDto {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idclinical")
	private int clinicalId;
	
	@Column(name = "clinical_name")
	private String clinicalName;
	
	@Column(name = "clinical_code")
	private String clinicalCode;
	
	@Column(name="patient_id")
	private int patientId;
	
	/*
	 * @Column(name = "cvs") private String cvs;
	 * 
	 * @Column(name = "rs") private String rs;
	 * 
	 * @Column(name = "pa") private String pa;
	 * 
	 * @Column(name = "cns") private String cns;
	 * 
	 * @Column(name = "other") private String other;
	 */
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	private Integer treatment_id;
	
	@Transient
	private List<DdClinicalDto> lstDdClinicalMaster;

	public int getClinicalId() {
		return clinicalId;
	}

	public void setClinicalId(int clinicalId) {
		this.clinicalId = clinicalId;
	}

	/*
	 * public String getCvs() { return cvs; }
	 * 
	 * public void setCvs(String cvs) { this.cvs = cvs; }
	 * 
	 * public String getRs() { return rs; }
	 * 
	 * public void setRs(String rs) { this.rs = rs; }
	 * 
	 * public String getPa() { return pa; }
	 * 
	 * public void setPa(String pa) { this.pa = pa; }
	 * 
	 * public String getCns() { return cns; }
	 * 
	 * public void setCns(String cns) { this.cns = cns; }
	 * 
	 * public String getOther() { return other; }
	 * 
	 * public void setOther(String other) { this.other = other; }
	 */
	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public List<DdClinicalDto> getLstDdClinicalMaster() {
		return lstDdClinicalMaster;
	}

	public void setLstDdClinicalMaster(List<DdClinicalDto> lstDdClinicalMaster) {
		this.lstDdClinicalMaster = lstDdClinicalMaster;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getClinicalName() {
		return clinicalName;
	}

	public void setClinicalName(String clinicalName) {
		this.clinicalName = clinicalName;
	}

	public String getClinicalCode() {
		return clinicalCode;
	}

	public void setClinicalCode(String clinicalCode) {
		this.clinicalCode = clinicalCode;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}


}
