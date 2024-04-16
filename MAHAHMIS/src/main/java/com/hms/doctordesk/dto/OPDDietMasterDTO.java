package com.hms.doctordesk.dto;

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
@Table(name = "opd_diet_master")
public class OPDDietMasterDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "diet_master_id")
	private int dietMasterId;
	
	@Column(name = "template_id",columnDefinition="int default 0")
	private int templateId;
	
	@Column(name = "specialization_id",columnDefinition="int default 0")
	private int specializationId;
	
	@Column(name = "template_name",columnDefinition="varchar(20) default ''")
	private String  templateName="";
	
	
	@Column(name = "template_data",length=1000000)
	private String templateData;
	
	@Column(name = "from_date",columnDefinition="varchar(20) default ''")
	private String fromDate=" ";
	
	@Column(name = "to_date",columnDefinition="varchar(20) default ''")
	private String toDate=" ";
	
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
	List<OPDDietMasterDTO>  getListOfOPDDietDTO;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;

	public int getDietMasterId() {
		return dietMasterId;
	}

	public void setDietMasterId(int dietMasterId) {
		this.dietMasterId = dietMasterId;
	}

	public int getTemplateId() {
		return templateId;
	}

	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}

	public int getSpecializationId() {
		return specializationId;
	}

	public void setSpecializationId(int specializationId) {
		this.specializationId = specializationId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}

	public String getTemplateData() {
		return templateData;
	}

	public void setTemplateData(String templateData) {
		this.templateData = templateData;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
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

	public List<OPDDietMasterDTO> getGetListOfOPDDietDTO() {
		return getListOfOPDDietDTO;
	}

	public void setGetListOfOPDDietDTO(List<OPDDietMasterDTO> getListOfOPDDietDTO) {
		this.getListOfOPDDietDTO = getListOfOPDDietDTO;
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

	@Override
	public String toString() {
		return "OPDDietMasterDTO [dietMasterId=" + dietMasterId + ", templateId=" + templateId + ", specializationId="
				+ specializationId + ", templateName=" + templateName + ", templateData=" + templateData + ", fromDate="
				+ fromDate + ", toDate=" + toDate + ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId
				+ ", userId=" + userId + ", getListOfOPDDietDTO=" + getListOfOPDDietDTO + ", treatObj=" + treatObj
				+ ", patientObj=" + patientObj + "]";
	}
	
	
	

}
