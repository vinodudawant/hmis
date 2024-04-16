package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name="ivf_dignosis_info")
public class IVFDignosisDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "dignosis_master_id")
	private Integer dignosisMasterId;
	
	/*
	 * @Column(name = "patient_id") private Integer patientId;
	 * 
	 * @Column(name = "treatment_id") private Integer treatmentId;
	 * 
	 * @Column(name = "ivf_treat_id",columnDefinition="int default 0") private
	 * Integer ivfTreatId=0;
	 * 
	 * @OneToOne
	 * 
	 * @JoinColumn(name="treatment_id") public TreatmentDto treatObj;
	 */
	
		@OneToOne
	  @JoinColumn(name="treatment_id") 
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;
	
	@OneToOne
	@JoinColumn(name="ivf_treat_id")
	public IVFTreatmentDTO ivfTreatObj;
	
	
	
	@Column(name = "patient_name",columnDefinition="varchar(500) default ''")
	private String patientName="";
	
	@Column(name = "patient_age",columnDefinition="varchar(20) default ''")
	private String patient_age="";
	
	@Column(name = "patient_gender",columnDefinition="varchar(20) default ''")
	private String patient_gender="";
	
	@Column(name = "diagnosis",columnDefinition="varchar(500) default ''")
	private String diagnosis="";
	
	@Column(name = "diagnosis_description",columnDefinition="varchar(500) default ''")
	private String diagnosisDescription="";
	
	@Column(name = "icd10_code",columnDefinition="varchar(20) default ''")
	private String iCD10Code="";
	
	@Column(name = "date",columnDefinition="varchar(20) default ''")
	private String date="";
	
	@Column(name = "diagnosistype",columnDefinition="varchar(20) default ''")
	private String 	diagnosisType="";
	
	@Column(name = "diagnosised_by",columnDefinition="varchar(50) default ''")
	private String 	dignosedBy="";
	
	@Column(name = "comments",columnDefinition="varchar(20) default ''")
	private String comments="";
	
	@Column(name = "couple_id",columnDefinition="int default 0")
	private Integer coupleId;
	
	@Column(name = "batch_creation_id",columnDefinition="int default 0")
	private Integer batchCreationId;
	
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
	List<IVFDignosisDTO>  getListOfIVFDignosisDTO;

	public Integer getDignosisMasterId() {
		return dignosisMasterId;
	}

	public void setDignosisMasterId(Integer dignosisMasterId) {
		this.dignosisMasterId = dignosisMasterId;
	}

	

	
	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPatient_age() {
		return patient_age;
	}

	public void setPatient_age(String patient_age) {
		this.patient_age = patient_age;
	}

	

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getiCD10Code() {
		return iCD10Code;
	}

	public void setiCD10Code(String iCD10Code) {
		this.iCD10Code = iCD10Code;
	}

	public String getDiagnosisDescription() {
		return diagnosisDescription;
	}

	public void setDiagnosisDescription(String diagnosisDescription) {
		this.diagnosisDescription = diagnosisDescription;
	}

	

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDiagnosisType() {
		return diagnosisType;
	}

	public void setDiagnosisType(String diagnosisType) {
		this.diagnosisType = diagnosisType;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Integer getCoupleId() {
		return coupleId;
	}

	public void setCoupleId(Integer coupleId) {
		this.coupleId = coupleId;
	}

	public Integer getBatchCreationId() {
		return batchCreationId;
	}

	public void setBatchCreationId(Integer batchCreationId) {
		this.batchCreationId = batchCreationId;
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

	public List<IVFDignosisDTO> getGetListOfIVFDignosisDTO() {
		return getListOfIVFDignosisDTO;
	}

	public void setGetListOfIVFDignosisDTO(
			List<IVFDignosisDTO> getListOfIVFDignosisDTO) {
		this.getListOfIVFDignosisDTO = getListOfIVFDignosisDTO;
	}

	public String getPatient_gender() {
		return patient_gender;
	}

	public void setPatient_gender(String patient_gender) {
		this.patient_gender = patient_gender;
	}

	

	public String getDignosedBy() {
		return dignosedBy;
	}

	public void setDignosedBy(String dignosedBy) {
		this.dignosedBy = dignosedBy;
	}

	public RegistrationDto getPatientObj() {
		return patientObj;
	}

	public void setPatientObj(RegistrationDto patientObj) {
		this.patientObj = patientObj;
	}

	public IVFTreatmentDTO getIvfTreatObj() {
		return ivfTreatObj;
	}

	public void setIvfTreatObj(IVFTreatmentDTO ivfTreatObj) {
		this.ivfTreatObj = ivfTreatObj;
	}

	public TreatmentDto getTreatObj() {
		return treatObj;
	}

	public void setTreatObj(TreatmentDto treatObj) {
		this.treatObj = treatObj;
	}

	@Override
	public String toString() {
		return "IVFDignosisDTO [dignosisMasterId=" + dignosisMasterId + ", treatObj=" + treatObj + ", patientObj="
				+ patientObj + ", ivfTreatObj=" + ivfTreatObj + ", patientName=" + patientName + ", patient_age="
				+ patient_age + ", patient_gender=" + patient_gender + ", diagnosis=" + diagnosis
				+ ", diagnosisDescription=" + diagnosisDescription + ", iCD10Code=" + iCD10Code + ", date=" + date
				+ ", diagnosisType=" + diagnosisType + ", dignosedBy=" + dignosedBy + ", comments=" + comments
				+ ", coupleId=" + coupleId + ", batchCreationId=" + batchCreationId + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime="
				+ deletedDateTime + ", unitId=" + unitId + ", userId=" + userId + ", getListOfIVFDignosisDTO="
				+ getListOfIVFDignosisDTO + "]";
	}

	
	
	
	
	
	
	
}
