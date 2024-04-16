package com.hms.ipd.nurshing.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "nurshing_drugs")
public class NurshingDrugAdministartionDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID")
	 int id;
	
	@Column(name = "Treatment_ID")
	 int treatmentId;
	
	@Column(name = "time",columnDefinition="varchar(15) default ''")
	String time;
	
	
	@Column(name = "drug_name",columnDefinition="varchar(200) default ''")
	String drugName;
	
	@Column(name = "strength",columnDefinition="varchar(50) default ''")
	String strength;
	

	@Column(name = "dose",columnDefinition="varchar(50) default ''")
	String dose;
	
	@Column(name = "quantity",columnDefinition="varchar(20) default ''")
	String quantity;
	
	@Column(name = "route",columnDefinition="varchar(20) default ''")
	String route;
	
	@Column(name = "frequency",columnDefinition="varchar(20) default ''")
	String frequency;
	 
	 
	@Column(name = "doctor_id")
	 int doctorId;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<NurshingDrugAdministartionDTO>  lstNurshingDrugs;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getStrength() {
		return strength;
	}

	public void setStrength(String strength) {
		this.strength = strength;
	}

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<NurshingDrugAdministartionDTO> getLstNurshingDrugs() {
		return lstNurshingDrugs;
	}

	public void setLstNurshingDrugs(List<NurshingDrugAdministartionDTO> lstNurshingDrugs) {
		this.lstNurshingDrugs = lstNurshingDrugs;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "NurshingDrugAdministartionDTO [id=" + id + ", treatmentId=" + treatmentId + ", time=" + time
				+ ", drugName=" + drugName + ", strength=" + strength + ", dose=" + dose + ", quantity=" + quantity
				+ ", route=" + route + ", frequency=" + frequency + ", doctorId=" + doctorId + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime="
				+ deletedDateTime + ", unitId=" + unitId + ", userId=" + userId + ", lstNurshingDrugs="
				+ lstNurshingDrugs + "]";
	}
	
	

	
	
}
