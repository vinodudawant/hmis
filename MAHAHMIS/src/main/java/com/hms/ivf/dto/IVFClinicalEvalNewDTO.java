package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.doctordesk.dto.OPDClinicalEvaluationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name = "ivf_clinical_eval_new")
public class IVFClinicalEvalNewDTO {
	

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "clinical_eval_id")
	private Integer clinicalEvalId;
	
	@Column(name = "patient_id")
	private int patientId;

	@Column(name="treatment_id")
	private Integer treatmentId;
	
	@Column(name = "template_data",length=1000000)
	private String clinicalEvaltemplateData;
	
	@OneToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="ivf_treatment_id",nullable = false)
	private IVFTreatmentDTO ivfTreatmentDto;
	
	// meta data
	
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
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Transient
	List<OPDClinicalEvaluationDto> listOPDClinicalEvaluationDto;

	public Integer getClinicalEvalId() {
		return clinicalEvalId;
	}

	public void setClinicalEvalId(Integer clinicalEvalId) {
		this.clinicalEvalId = clinicalEvalId;
	}

	public String getClinicalEvaltemplateData() {
		return clinicalEvaltemplateData;
	}

	public void setClinicalEvaltemplateData(String clinicalEvaltemplateData) {
		this.clinicalEvaltemplateData = clinicalEvaltemplateData;
	}

	public List<OPDClinicalEvaluationDto> getListOPDClinicalEvaluationDto() {
		return listOPDClinicalEvaluationDto;
	}

	public void setListOPDClinicalEvaluationDto(List<OPDClinicalEvaluationDto> listOPDClinicalEvaluationDto) {
		this.listOPDClinicalEvaluationDto = listOPDClinicalEvaluationDto;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public IVFTreatmentDTO getIvfTreatmentDto() {
		return ivfTreatmentDto;
	}

	public void setIvfTreatmentDto(IVFTreatmentDTO ivfTreatmentDto) {
		this.ivfTreatmentDto = ivfTreatmentDto;
	}

	@Override
	public String toString() {
		return "IVFClinicalEvalNewDTO [clinicalEvalId=" + clinicalEvalId + ", patientId=" + patientId + ", treatmentId="
				+ treatmentId + ", clinicalEvaltemplateData=" + clinicalEvaltemplateData + ", ivfTreatmentDto="
				+ ivfTreatmentDto + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", deletedBy="
				+ deletedBy + ", unitId=" + unitId + ", deleted=" + deleted + ", listOPDClinicalEvaluationDto="
				+ listOPDClinicalEvaluationDto + "]";
	}

	
	



}
