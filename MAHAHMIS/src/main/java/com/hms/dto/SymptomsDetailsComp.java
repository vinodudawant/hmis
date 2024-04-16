package com.hms.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.HospitalSpecialisationDto;

@Entity
@Table(name = "symptomsdetails")
public class SymptomsDetailsComp {
	
	@Id
	@GeneratedValue
	@Column(name = "idsymptomsDetails")
	private Integer idsymptomsDetails;
	
	@Column(name = "Department_Id")
	private String department_Id;
	
	@Column(name = "Symptoms_Name")
	private String Symptoms_Name;
	
	@Column(name = "status", length = 2)
	private String status = "Y";
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "update_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name ="hospital_specialisation_id")
	private HospitalSpecialisationDto hospitalSpecialisationDto;
	
	@Transient
	private List<SymptomsDetailsComp> SymptomsMasterList;
	//private List<SurgicalKitComp> surgicalKitCompList = null;
	
	
	@JsonGetter("idsym")
	public Integer getIdsymptomsDetails() {
		return idsymptomsDetails;
	}
	
	@JsonSetter("idsym")
	public void setIdsymptomsDetails(Integer idsymptomsDetails) {
		this.idsymptomsDetails = idsymptomsDetails;
	}

	@JsonGetter("did")
	public String getDepartment_Id() {
		return department_Id;
	}

	@JsonSetter("did")
	public void setDepartment_Id(String department_Id) {
		this.department_Id = department_Id;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("sn")
	public String getSymptoms_Name() {
		return Symptoms_Name;
	}
	
	@JsonSetter("sn")
	public void setSymptoms_Name(String symptoms_Name) {
		Symptoms_Name = symptoms_Name;
	}
	
	@JsonGetter("sml")
	public List<SymptomsDetailsComp> getSymptomsMasterList() {
		return SymptomsMasterList;
	}
	
	@JsonSetter("sml")
	public void setSymptomsMasterList(List<SymptomsDetailsComp> symptomsMasterList) {
		SymptomsMasterList = symptomsMasterList;
	}
	
	public Integer getUnitId() {
		return unitId;
	}
	
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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
	public Date getCreateDate() {
		return createDate;
	}
	
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
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

	public HospitalSpecialisationDto getHospitalSpecialisationDto() {
		return hospitalSpecialisationDto;
	}

	public void setHospitalSpecialisationDto(HospitalSpecialisationDto hospitalSpecialisationDto) {
		this.hospitalSpecialisationDto = hospitalSpecialisationDto;
	}

	@Override
	public String toString() {
		return "SymptomsDetailsComp [idsymptomsDetails=" + idsymptomsDetails + ", department_Id=" + department_Id
				+ ", Symptoms_Name=" + Symptoms_Name + ", status=" + status + ", unitId=" + unitId + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy + ", createDate=" + createDate
				+ ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", HospitalSpecialisationDto="
				+ hospitalSpecialisationDto + ", SymptomsMasterList=" + SymptomsMasterList + "]";
	}
}