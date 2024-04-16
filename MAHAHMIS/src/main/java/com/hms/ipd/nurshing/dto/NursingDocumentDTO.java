package com.hms.ipd.nurshing.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Component
@Table(name = "nursing_document")
public class NursingDocumentDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id")
	private int documentId;
	
	@Column(name = "doctor_desk_file")
	private String doctorDeskFile;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(1) default 'N'")
	private String deleted="N";
	
	@ManyToOne(optional = false,fetch = FetchType.EAGER)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="treatment_id",nullable = false)
	private TreatmentDto treatmentDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "patient_id", nullable = false)
	private RegistrationDto patientRegistered;
	
	@Transient
	private List<NursingDocumentDTO> lstNursingDocument;

	

	public int getDocumentId() {
		return documentId;
	}

	public void setDocumentId(int documentId) {
		this.documentId = documentId;
	}

	public String getDoctorDeskFile() {
		return doctorDeskFile;
	}

	public void setDoctorDeskFile(String doctorDeskFile) {
		this.doctorDeskFile = doctorDeskFile;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public TreatmentDto getTreatmentDto() {
		return treatmentDto;
	}

	public void setTreatmentDto(TreatmentDto treatmentDto) {
		this.treatmentDto = treatmentDto;
	}

	public RegistrationDto getPatientRegistered() {
		return patientRegistered;
	}

	public void setPatientRegistered(RegistrationDto patientRegistered) {
		this.patientRegistered = patientRegistered;
	}

	public List<NursingDocumentDTO> getLstNursingDocument() {
		return lstNursingDocument;
	}

	public void setLstNursingDocument(List<NursingDocumentDTO> lstNursingDocument) {
		this.lstNursingDocument = lstNursingDocument;
	}
	
	
}
