package com.hms.doctordesk.dto;

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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name="opd_clinical_eval_bmi")
public class ClinicalEvaluationBMIDto{

	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Column(name="patient_id")
	private Integer patientId;
	
//	@Column(name="patient_treat_id")
//	private Integer treatmentId;
	
	@OneToOne(optional = false,cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="treatment_id",unique=true)
	private TreatmentDto treatmentDto;
	
	@Column(name="patient_treat_count")
	private String patientTreatmentCount;
	
	@Column(name="patient_weight")
	private Double weight;
	
	@Column(name="patient_height")
	private Double height;
	
	@Column(name="patient_bmi")
	private Double bmi;
	
	@Column(name="patient_bsa")
	private Double bsa;
	
	@Column(name="patient_headcim")
	private Double headCIM;
	
	@Column(name="status",columnDefinition = "varchar(2) default 'Y'")
	private String status="Y";
	
	@Column(name="patient_bmi_date")
	private String dateOfBMI;
	
	@Column(name="finalAgeInMonths")
	private String finalAgeInMonths;
	
	@Transient
	private List<ClinicalEvaluationBMIDto> listClinicalEvalBMIDTO;
	
	
// Metadata
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	
	@Column(name = "user_id")
	private Integer userId;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Column(name = "updated_by" ,columnDefinition = "default 0")
	private Integer updatedBy;
	
	@Column(name = "deleted_by", columnDefinition = "default 0")
	private Integer deleted_by=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public TreatmentDto getTreatmentDto() {
		return treatmentDto;
	}

	public void setTreatmentDto(TreatmentDto treatmentDto) {
		this.treatmentDto = treatmentDto;
	}

	public String getPatientTreatmentCount() {
		return patientTreatmentCount;
	}

	public void setPatientTreatmentCount(String patientTreatmentCount) {
		this.patientTreatmentCount = patientTreatmentCount;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	

	public Double getBmi() {
		return bmi;
	}

	public void setBmi(Double bmi) {
		this.bmi = bmi;
	}

	public Double getBsa() {
		return bsa;
	}

	public void setBsa(Double bsa) {
		this.bsa = bsa;
	}

	public Double getHeadCIM() {
		return headCIM;
	}

	public void setHeadCIM(Double headCIM) {
		this.headCIM = headCIM;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDateOfBMI() {
		return dateOfBMI;
	}

	public void setDateOfBMI(String dateOfBMI) {
		this.dateOfBMI = dateOfBMI;
	}

	public String getFinalAgeInMonths() {
		return finalAgeInMonths;
	}

	public void setFinalAgeInMonths(String finalAgeInMonths) {
		this.finalAgeInMonths = finalAgeInMonths;
	}

	public List<ClinicalEvaluationBMIDto> getListClinicalEvalBMIDTO() {
		return listClinicalEvalBMIDTO;
	}

	public void setListClinicalEvalBMIDTO(List<ClinicalEvaluationBMIDto> listClinicalEvalBMIDTO) {
		this.listClinicalEvalBMIDTO = listClinicalEvalBMIDTO;
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

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
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

	public Integer getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(Integer deleted_by) {
		this.deleted_by = deleted_by;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	@Override
	public String toString() {
		return "ClinicalEvalBMIDTO [id=" + id + ", patientId=" + patientId + ", treatmentDto=" + treatmentDto
				+ ", patientTreatmentCount=" + patientTreatmentCount + ", weight=" + weight + ", height=" + height
				+ ", bmi=" + bmi + ", bsa=" + bsa + ", headCIM=" + headCIM + ", status=" + status + ", dateOfBMI="
				+ dateOfBMI + ", finalAgeInMonths=" + finalAgeInMonths + ", listClinicalEvalBMIDTO="
				+ listClinicalEvalBMIDTO + ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", userId=" + userId + ", unitId=" + unitId + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deleted_by=" + deleted_by + ", deletedDate=" + deletedDate + "]";
	}

	

	

}
