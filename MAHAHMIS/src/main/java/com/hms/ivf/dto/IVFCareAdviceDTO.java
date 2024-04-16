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
@Table(name = "ivf_care_advice_master")
public class IVFCareAdviceDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "care_advice_master_id")
	private int careAdviceMasterId;
	
	@Column(name = "palliative_care_advice",columnDefinition="varchar(1000) default ''")
	private String  palliativeCareAdvice="";
	
	@Column(name = "supportive_care",columnDefinition="varchar(1000) default ''")
	private String  supportiveCare="";
	
	@Column(name = "preventive_care",columnDefinition="varchar(1000) default ''")
	private String  preventiveCare="";
	
	@Column(name = "rehabilitative_care",columnDefinition="varchar(1000) default ''")
	private String  rehabilitativeCare="";
	
	@Column(name = "other_services",columnDefinition="varchar(1000) default ''")
	private String  otherServices="";
	
	@Column(name = "uhid",columnDefinition="varchar(20) default ''")
	private String UHID="";
	
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
	List<IVFCareAdviceDTO>  getListOfOPDCareAdviceDTO;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;
	
	@OneToOne
	@JoinColumn(name="ivf_treat_id")
	public IVFTreatmentDTO ivfTreatObj;

	public int getCareAdviceMasterId() {
		return careAdviceMasterId;
	}

	public void setCareAdviceMasterId(int careAdviceMasterId) {
		this.careAdviceMasterId = careAdviceMasterId;
	}

	public String getPalliativeCareAdvice() {
		return palliativeCareAdvice;
	}

	public void setPalliativeCareAdvice(String palliativeCareAdvice) {
		this.palliativeCareAdvice = palliativeCareAdvice;
	}

	public String getSupportiveCare() {
		return supportiveCare;
	}

	public void setSupportiveCare(String supportiveCare) {
		this.supportiveCare = supportiveCare;
	}

	public String getPreventiveCare() {
		return preventiveCare;
	}

	public void setPreventiveCare(String preventiveCare) {
		this.preventiveCare = preventiveCare;
	}

	public String getRehabilitativeCare() {
		return rehabilitativeCare;
	}

	public void setRehabilitativeCare(String rehabilitativeCare) {
		this.rehabilitativeCare = rehabilitativeCare;
	}

	public String getOtherServices() {
		return otherServices;
	}

	public void setOtherServices(String otherServices) {
		this.otherServices = otherServices;
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



	public TreatmentDto getTreatObj() {
		return treatObj;
	}

	public void setTreatObj(TreatmentDto treatObj) {
		this.treatObj = treatObj;
	}

	public RegistrationDto getPatientObj() {
		return patientObj;
	}

	public void setPatientObj(RegistrationDto patientObj) {
		this.patientObj = patientObj;
	}

	public String getUHID() {
		return UHID;
	}

	public void setUHID(String uHID) {
		UHID = uHID;
	}

	public List<IVFCareAdviceDTO> getGetListOfOPDCareAdviceDTO() {
		return getListOfOPDCareAdviceDTO;
	}

	public void setGetListOfOPDCareAdviceDTO(List<IVFCareAdviceDTO> getListOfOPDCareAdviceDTO) {
		this.getListOfOPDCareAdviceDTO = getListOfOPDCareAdviceDTO;
	}

	public IVFTreatmentDTO getIvfTreatObj() {
		return ivfTreatObj;
	}

	public void setIvfTreatObj(IVFTreatmentDTO ivfTreatObj) {
		this.ivfTreatObj = ivfTreatObj;
	}
	
	
	

}
