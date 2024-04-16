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
@Table(name = "opd_clinical_staging_info")
public class OPDClinicalStagingDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "clinical_staging_master_id")
	private int clinicalStagingMasterId;
	
	@Column(name = "body_part_id",columnDefinition="int default 0")
	private int bodyPartId;
	
	@Column(name = "body_part_name",columnDefinition="varchar(100) default ''")
	private String 	bodyPartName="";
	
	@Column(name = "tnm_stage",columnDefinition="varchar(100) default ''")
	private String 	tnmStage="";
	
	@Column(name = "group_name",columnDefinition="varchar(100) default ''")
	private String 	groupName="";
	
	@Column(name = "description",columnDefinition="varchar(500) default ''")
	private String 	description="";
	
	@Column(name = "clinical_date",columnDefinition="varchar(30) default ''")
	private String 	clinicalDate="";
	
	@Column(name = "comment",columnDefinition="varchar(500) default ''")
	private String 	comment="";
	
	@Column(name = "uhid",columnDefinition="varchar(20) default ''")
	private String UHID="";
	
	@Column(name = "investigator_id",columnDefinition="int default 0")
	private int investigatorId;
	
	@Column(name = "investigator_name",columnDefinition="varchar(100) default ''")
	private String 	investigatorName="";
	
	
	@Column(name = "stage_master_id",columnDefinition="varchar(100) default ''")
	private String 	stageMasterId="";
	
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
	List<OPDClinicalStagingDTO>  getListOfOPDClinicalStagingDTO;
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;

	public int getClinicalStagingMasterId() {
		return clinicalStagingMasterId;
	}

	public void setClinicalStagingMasterId(int clinicalStagingMasterId) {
		this.clinicalStagingMasterId = clinicalStagingMasterId;
	}

	public int getBodyPartId() {
		return bodyPartId;
	}

	public void setBodyPartId(int bodyPartId) {
		this.bodyPartId = bodyPartId;
	}

	public String getTnmStage() {
		return tnmStage;
	}

	public void setTnmStage(String tnmStage) {
		this.tnmStage = tnmStage;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getClinicalDate() {
		return clinicalDate;
	}

	public void setClinicalDate(String clinicalDate) {
		this.clinicalDate = clinicalDate;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getUHID() {
		return UHID;
	}

	public void setUHID(String uHID) {
		UHID = uHID;
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

	public List<OPDClinicalStagingDTO> getGetListOfOPDClinicalStagingDTO() {
		return getListOfOPDClinicalStagingDTO;
	}

	public void setGetListOfOPDClinicalStagingDTO(List<OPDClinicalStagingDTO> getListOfOPDClinicalStagingDTO) {
		this.getListOfOPDClinicalStagingDTO = getListOfOPDClinicalStagingDTO;
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

	public String getBodyPartName() {
		return bodyPartName;
	}

	public void setBodyPartName(String bodyPartName) {
		this.bodyPartName = bodyPartName;
	}

	@Override
	public String toString() {
		return "OPDClinicalStagingDTO [clinicalStagingMasterId=" + clinicalStagingMasterId + ", bodyPartId="
				+ bodyPartId + ", bodyPartName=" + bodyPartName + ", tnmStage=" + tnmStage + ", groupName=" + groupName
				+ ", description=" + description + ", clinicalDate=" + clinicalDate + ", comment=" + comment + ", UHID="
				+ UHID + ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime
				+ ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId
				+ ", getListOfOPDClinicalStagingDTO=" + getListOfOPDClinicalStagingDTO + ", treatObj=" + treatObj
				+ ", patientObj=" + patientObj + "]";
	}

	public int getInvestigatorId() {
		return investigatorId;
	}

	public void setInvestigatorId(int investigatorId) {
		this.investigatorId = investigatorId;
	}

	public String getInvestigatorName() {
		return investigatorName;
	}

	public void setInvestigatorName(String investigatorName) {
		this.investigatorName = investigatorName;
	}

	public String getStageMasterId() {
		return stageMasterId;
	}

	public void setStageMasterId(String stageMasterId) {
		this.stageMasterId = stageMasterId;
	}
	
	
	
	

}
