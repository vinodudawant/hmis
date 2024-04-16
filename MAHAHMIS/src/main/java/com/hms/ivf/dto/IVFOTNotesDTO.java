package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
@Entity
@Table(name="ivf_ot_notes_info")
public class IVFOTNotesDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id",columnDefinition="int default 0")
	private Integer treatmentId=0;
	
	@Column(name = "ivf_treatment_id",columnDefinition="int default 0")
	private Integer ivftreatmentId=0;
	
	@Column(name = "ot_notes_description",length=1000000)
	private String otNotesDescription="";
	
	@Column(name = "operation_id",columnDefinition="int default 0")
	private Integer operationId=0;
	
	@Column(name = "operation_notes",columnDefinition="varchar(500) default ''")
	private String operatinName="";
	
	
	@Column(name = "estimated_blood_loss",columnDefinition="varchar(30) default ''")
	private String estimatedBloodLoss="";
	
	@Column(name = "actual_blood_loss",columnDefinition="varchar(30) default ''")
	private String actualBloodLoss="";
	
	@Column(name = "instrumental_count",columnDefinition="varchar(30) default ''")
	private String instrumentalCount="";
	
	@Column(name = "recorded_by",columnDefinition="varchar(30) default ''")
	private String recordedBy="";
	
	@Column(name = "mop_count_recorded_by",columnDefinition="varchar(30) default ''")
	private String mOPCountRecordedBy="";
	
	@Column(name = "comment",columnDefinition="varchar(1000) default ''")
	private String Comment="";
	
	@Column(name = "template_id",columnDefinition="int default 0")
	private Integer templateId=0;
	
	@Column(name = "template_name",columnDefinition="varchar(100) default ''")
	private String templateName="";
	
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
	List<IVFOTNotesDTO>  lstIVFOTNotesDTO;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getIvftreatmentId() {
		return ivftreatmentId;
	}

	public void setIvftreatmentId(Integer ivftreatmentId) {
		this.ivftreatmentId = ivftreatmentId;
	}

	public String getOtNotesDescription() {
		return otNotesDescription;
	}

	public void setOtNotesDescription(String otNotesDescription) {
		this.otNotesDescription = otNotesDescription;
	}

	public String getOperatinName() {
		return operatinName;
	}

	public void setOperatinName(String operatinName) {
		this.operatinName = operatinName;
	}

	public String getEstimatedBloodLoss() {
		return estimatedBloodLoss;
	}

	public void setEstimatedBloodLoss(String estimatedBloodLoss) {
		this.estimatedBloodLoss = estimatedBloodLoss;
	}

	public String getActualBloodLoss() {
		return actualBloodLoss;
	}

	public void setActualBloodLoss(String actualBloodLoss) {
		this.actualBloodLoss = actualBloodLoss;
	}

	public String getInstrumentalCount() {
		return instrumentalCount;
	}

	public void setInstrumentalCount(String instrumentalCount) {
		this.instrumentalCount = instrumentalCount;
	}

	public String getRecordedBy() {
		return recordedBy;
	}

	public void setRecordedBy(String recordedBy) {
		this.recordedBy = recordedBy;
	}

	public String getmOPCountRecordedBy() {
		return mOPCountRecordedBy;
	}

	public void setmOPCountRecordedBy(String mOPCountRecordedBy) {
		this.mOPCountRecordedBy = mOPCountRecordedBy;
	}

	public String getComment() {
		return Comment;
	}

	public void setComment(String comment) {
		Comment = comment;
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

	public List<IVFOTNotesDTO> getLstIVFOTNotesDTO() {
		return lstIVFOTNotesDTO;
	}

	public void setLstIVFOTNotesDTO(List<IVFOTNotesDTO> lstIVFOTNotesDTO) {
		this.lstIVFOTNotesDTO = lstIVFOTNotesDTO;
	}

	public Integer getOperationId() {
		return operationId;
	}

	public void setOperationId(Integer operationId) {
		this.operationId = operationId;
	}

	public Integer getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}

	public String getTemplateName() {
		return templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	
	
	
	
	
}
