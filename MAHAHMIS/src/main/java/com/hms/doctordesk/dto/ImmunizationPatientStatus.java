package com.hms.doctordesk.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;



@Entity
@Table(name="dd_immunization_patient")
public class ImmunizationPatientStatus {

	@Id
	@GeneratedValue
	@Column(name="i_id")
	private int i_id;
	
	@Column(name = "immunizationconfiguration_id")
	private Integer immunizationconfiguration_id;
	
	@Column(name = "treatment_id")
	private Integer treatment_id;
	
	@Column(name = "patient_id")
	private Integer patient_id;
	
	@Column(name = "vaccinename")
	private String vaccinename;
	
	@Column(name = "fromdate")
	private String fromdate;
	
	@Column(name = "todate")
	private String todate;
	
	@Column(name = "givendate")
	private String givendate;
	
	@Column(name = "duedate")
	private String duedate;
	
	@Column(name = "vaccinestatus")
	private String vaccinestatus;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "vaccine_details",columnDefinition="LONGTEXT")
	private String vaccinedetails;

	@Transient
	private List<ImmunizationPatientStatus> list;
	
	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public List<ImmunizationPatientStatus> getList() {
		return list;
	}

	public void setList(List<ImmunizationPatientStatus> list) {
		this.list = list;
	}

	public int getI_id() {
		return i_id;
	}

	public void setI_id(int i_id) {
		this.i_id = i_id;
	}

	
	public Integer getImmunizationconfiguration_id() {
		return immunizationconfiguration_id;
	}

	public void setImmunizationconfiguration_id(Integer immunizationconfiguration_id) {
		this.immunizationconfiguration_id = immunizationconfiguration_id;
	}

	public String getVaccinename() {
		return vaccinename;
	}

	public void setVaccinename(String vaccinename) {
		this.vaccinename = vaccinename;
	}

	public String getFromdate() {
		return fromdate;
	}

	public void setFromdate(String fromdate) {
		this.fromdate = fromdate;
	}

	public String getTodate() {
		return todate;
	}

	public void setTodate(String todate) {
		this.todate = todate;
	}

	public String getGivendate() {
		return givendate;
	}

	public void setGivendate(String givendate) {
		this.givendate = givendate;
	}

	public String getDuedate() {
		return duedate;
	}

	public void setDuedate(String duedate) {
		this.duedate = duedate;
	}

	public String getVaccinestatus() {
		return vaccinestatus;
	}

	public void setVaccinestatus(String vaccinestatus) {
		this.vaccinestatus = vaccinestatus;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getVaccinedetails() {
		return vaccinedetails;
	}

	public void setVaccinedetails(String vaccinedetails) {
		this.vaccinedetails = vaccinedetails;
	}

	@Override
	public String toString() {
		return "ImmunizationPatientStatus [i_id=" + i_id + ", immunizationconfiguration_id="
				+ immunizationconfiguration_id + ", treatment_id=" + treatment_id + ", patient_id=" + patient_id
				+ ", vaccinename=" + vaccinename + ", fromdate=" + fromdate + ", todate=" + todate + ", givendate="
				+ givendate + ", duedate=" + duedate + ", vaccinestatus=" + vaccinestatus + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate
				+ ", deleted=" + deleted + ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", vaccinedetails=" + vaccinedetails + ", list=" + list + "]";
	}
	
	
	
}
