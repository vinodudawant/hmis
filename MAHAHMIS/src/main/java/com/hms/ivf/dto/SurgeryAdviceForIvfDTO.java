package com.hms.ivf.dto;

import java.io.Serializable;
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

import com.hms.ehat.dto.SubServiceDto;

@Entity
@Table(name="surgery_advice_for_ivfipd")
public class SurgeryAdviceForIvfDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "surgeryadviceforivfid")
	private int adviceID;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "ivf_treatment_id",columnDefinition="int default 0")
	private Integer ivftreatmentId=0;
	
	@Column(name = "proceduretype",columnDefinition="varchar(500) default ''")
	private String procedureType="";
	
	@Column(name = "procedure_name",columnDefinition="varchar(500) default ''")
	private String procedureName="";
	
	
	@Column(name = "proceduregroup",columnDefinition="varchar(500) default ''")
	private String procedureGroup="";
	
	@Column(name = "procedure_group_name",columnDefinition="varchar(500) default ''")
	private String procedureGroupName="";
	
	
	
	@Column(name = "indicationsurgery",columnDefinition="varchar(500) default ''")
	private String indicationSurgery="";
	
	
	@Column(name = "riskfactor",columnDefinition="varchar(500) default ''")
	private String riskFactor="";
	
	
	@Column(name = "operationname",columnDefinition="varchar(500) default ''")
	private String operationName="";
	
	@Column(name = "operation_name_text",columnDefinition="varchar(500) default ''")
	private String operationNameText="";
	
	public String getProcedureGroupName() {
		return procedureGroupName;
	}

	public void setProcedureGroupName(String procedureGroupName) {
		this.procedureGroupName = procedureGroupName;
	}

	public String getOperationNameText() {
		return operationNameText;
	}

	public void setOperationNameText(String operationNameText) {
		this.operationNameText = operationNameText;
	}
	@Column(name = "advicedate",columnDefinition="varchar(500) default ''")
	private String adviceDate="";
	
	
	@Column(name = "radicala",columnDefinition="varchar(500) default ''")
	private String radical="";
	
	@Column(name = "palliativea",columnDefinition="varchar(500) default ''")
	private String palliative="";
	

	@Column(name = "coupled_id",columnDefinition="int default 0")
	private int couple_Id=0;
	
	@Column(name = "batch_creation_id",columnDefinition="int default 0")
	private int batch_creation_Id=0;
	

	
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by")
	private int createdBy;
	
	@Column(name = "updated_by")
	private int updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	public int getAdviceID() {
		return adviceID;
	}

	public void setAdviceID(int adviceID) {
		this.adviceID = adviceID;
	}

	public int getCouple_Id() {
		return couple_Id;
	}

	public void setCouple_Id(int couple_Id) {
		this.couple_Id = couple_Id;
	}

	public int getBatch_creation_Id() {
		return batch_creation_Id;
	}

	public void setBatch_creation_Id(int batch_creation_Id) {
		this.batch_creation_Id = batch_creation_Id;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getProcedureType() {
		return procedureType;
	}

	public void setProcedureType(String procedureType) {
		this.procedureType = procedureType;
	}

	public String getProcedureGroup() {
		return procedureGroup;
	}

	public void setProcedureGroup(String procedureGroup) {
		this.procedureGroup = procedureGroup;
	}

	public String getProcedureName() {
		return procedureName;
	}

	public void setProcedureName(String procedureName) {
		this.procedureName = procedureName;
	}

	public String getIndicationSurgery() {
		return indicationSurgery;
	}

	public void setIndicationSurgery(String indicationSurgery) {
		this.indicationSurgery = indicationSurgery;
	}

	public String getRiskFactor() {
		return riskFactor;
	}

	public void setRiskFactor(String riskFactor) {
		this.riskFactor = riskFactor;
	}

	public String getOperationName() {
		return operationName;
	}

	public void setOperationName(String operationName) {
		this.operationName = operationName;
	}

	public String getAdviceDate() {
		return adviceDate;
	}

	public void setAdviceDate(String adviceDate) {
		this.adviceDate = adviceDate;
	}

	public String getRadical() {
		return radical;
	}

	public void setRadical(String radical) {
		this.radical = radical;
	}

	public String getPalliative() {
		return palliative;
	}

	public void setPalliative(String palliative) {
		this.palliative = palliative;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	@Override
	public String toString() {
		return "SurgeryAdviceForIvfDTO [adviceID=" + adviceID + ", couple_Id=" + couple_Id + ", batch_creation_Id="
				+ batch_creation_Id + ", patientId=" + patientId + ", treatmentId=" + treatmentId + ", procedureType="
				+ procedureType + ", procedureGroup=" + procedureGroup + ", procedureName=" + procedureName
				+ ", indicationSurgery=" + indicationSurgery + ", riskFactor=" + riskFactor + ", operationName="
				+ operationName + ", adviceDate=" + adviceDate + ", radical=" + radical + ", palliative=" + palliative
				+ ", lstSubServiceforSurgeryadvice=" + lstSubServiceforSurgeryadvice + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime="
				+ deletedDateTime + "]";
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Transient
	private List<SurgeryAdviceForIvfDTO> lstSubServiceforSurgeryadvice;
	
	
	public List<SurgeryAdviceForIvfDTO> getLstSubServiceforSurgeryadvice() {
		return lstSubServiceforSurgeryadvice;
	}

	public void setLstSubServiceforSurgeryadvice(List<SurgeryAdviceForIvfDTO> lstSubServiceforSurgeryadvice) {
		this.lstSubServiceforSurgeryadvice = lstSubServiceforSurgeryadvice;
	}

	public Integer getIvftreatmentId() {
		return ivftreatmentId;
	}

	public void setIvftreatmentId(Integer ivftreatmentId) {
		this.ivftreatmentId = ivftreatmentId;
	}

	
	
}
