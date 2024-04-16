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
@Table(name="ehat_dialysis_virology_vaccination")
public class VirologyVaccinationDTO {

	@Id
	@GeneratedValue
	@Column(name = "id_virology_vaccination")
	private int virologyVaccinationId;
	
	@Column(name = "id_treatment")
	private Integer treatmentId; 
	
	@Column(name = "patient_Id")
	private Integer patientId; 
	
	

	@Column(name="hep_B_vac")
	private String hep_B_vac;
	

	@Column(name="HBSAG")
	private String hbsag;
	

	@Column(name="HEP_C")
	private String hep_c;
	

	@Column(name="HIV")
	private String hiv;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "unit_id")
	private int unitId;
	

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Transient
	private List<VirologyVaccinationDTO> listVirologyVaccination;

	public int getVirologyVaccinationId() {
		return virologyVaccinationId;
	}

	public void setVirologyVaccinationId(int virologyVaccinationId) {
		this.virologyVaccinationId = virologyVaccinationId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getHep_B_vac() {
		return hep_B_vac;
	}

	public void setHep_B_vac(String hep_B_vac) {
		this.hep_B_vac = hep_B_vac;
	}

	public String getHbsag() {
		return hbsag;
	}

	public void setHbsag(String hbsag) {
		this.hbsag = hbsag;
	}

	public String getHep_c() {
		return hep_c;
	}

	public void setHep_c(String hep_c) {
		this.hep_c = hep_c;
	}

	public String getHiv() {
		return hiv;
	}

	public void setHiv(String hiv) {
		this.hiv = hiv;
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

	@JsonGetter("virologyVaccinationTable")
	public List<VirologyVaccinationDTO> getListVirologyVaccination() {
		return listVirologyVaccination;
	}

	@JsonSetter("virologyVaccinationTable")
	public void setListVirologyVaccination(
			List<VirologyVaccinationDTO> listVirologyVaccination) {
		this.listVirologyVaccination = listVirologyVaccination;
	}
	
	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	

}
