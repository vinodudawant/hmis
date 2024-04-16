package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "hospital_specialization")
public class HospitalSpecialisationDto implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idhospital_Specialization")
	private int specialisationId;
	
	@Column(name = "specialization_name")
	private String specializationName;

	@Column(name = "status")
	private String status;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "unit_Id")
	private Integer unitId;	
	
	
	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@Transient
	private List<HospitalSpecialisationDto> listHospSpcl;

	public int getSpecialisationId() {
		return specialisationId;
	}

	public void setSpecialisationId(int specialisationId) {
		this.specialisationId = specialisationId;
	}

	public String getSpecializationName() {
		return specializationName;
	}

	public void setSpecializationName(String specializationName) {
		this.specializationName = specializationName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	@JsonGetter("hospitalspclgetlist")
	public List<HospitalSpecialisationDto> getListHospSpcl() {
		return listHospSpcl;
	}

	@JsonSetter("hospitalspclgetlist")
	public void setListHospSpcl(List<HospitalSpecialisationDto> listHospSpcl) {
		this.listHospSpcl = listHospSpcl;
	}	
}
