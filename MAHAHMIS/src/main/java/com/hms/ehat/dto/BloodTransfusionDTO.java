package com.hms.ehat.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name="ehat_dialysis_blood_transfusion")
public class BloodTransfusionDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "id_blood_transfusion")
	private int bloodTransfusionId;
	
	@Column(name = "id_treatment")
	private Integer treatmentId; 
	
	@Column(name = "patient_Id")
	private Integer patientId; 
	
	
	@Column(name = "unit")
	private String unit; 
	
	@Column(name = "blood_transfusion_date")
	private String bloodTransfusionDate; 
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_Id")
	private int unitId;
	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	@Transient
	private List<BloodTransfusionDTO> listBloodTransfusion;

	public int getBloodTransfusionId() {
		return bloodTransfusionId;
	}

	public void setBloodTransfusionId(int bloodTransfusionId) {
		this.bloodTransfusionId = bloodTransfusionId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getBloodTransfusionDate() {
		return bloodTransfusionDate;
	}

	public void setBloodTransfusionDate(String bloodTransfusionDate) {
		this.bloodTransfusionDate = bloodTransfusionDate;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	@JsonGetter("listbloodTransfusionTable")
	public List<BloodTransfusionDTO> getListBloodTransfusion() {
		return listBloodTransfusion;
	}

	@JsonSetter("listbloodTransfusionTable")
	public void setListBloodTransfusion(
			List<BloodTransfusionDTO> listBloodTransfusion) {
		this.listBloodTransfusion = listBloodTransfusion;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

}
