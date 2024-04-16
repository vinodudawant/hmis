package com.hms.ipd.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.Calendar;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@SuppressWarnings("serial")
@Entity
@Table(name = "treatment_topic")
public class TreatmentTopicDTO implements Serializable{

	@Id
	@GeneratedValue
	@Column(name = "idTreatmentTopic")
	private Integer idTreatmentTopic; 
	
	@Column(name = "topicName")
	private String topicName;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name="unit_id")
	private Integer unitId;
		

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Calendar createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Calendar updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Calendar deletedDate;


	protected Integer getIdTreatmentTopic() {
		return idTreatmentTopic;
	}

	protected void setIdTreatmentTopic(Integer idTreatmentTopic) {
		this.idTreatmentTopic = idTreatmentTopic;
	}

	protected String getTopicName() {
		return topicName;
	}

	protected void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	protected String getStatus() {
		return status;
	}

	protected void setStatus(String status) {
		this.status = status;
	}
	
	protected Integer getUnitId() {
		return unitId;
	}

	protected void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	protected Integer getCreatedBy() {
		return createdBy;
	}

	protected void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	protected Integer getUpdatedBy() {
		return updatedBy;
	}

	protected void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	protected Calendar getCreatedDate() {
		return createdDate;
	}

	protected void setCreatedDate(Calendar createdDate) {
		this.createdDate = createdDate;
	}

	protected Calendar getUpdatedDate() {
		return updatedDate;
	}

	protected void setUpdatedDate(Calendar updatedDate) {
		this.updatedDate = updatedDate;
	}

	protected String getDeleted() {
		return deleted;
	}

	protected void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	protected Integer getDeletedBy() {
		return deletedBy;
	}

	protected void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	protected Calendar getDeletedDate() {
		return deletedDate;
	}

	protected void setDeletedDate(Calendar deletedDate) {
		this.deletedDate = deletedDate;
	}

	@Override
	public int hashCode() {
		return Objects.hash(idTreatmentTopic, status, topicName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TreatmentTopicDTO other = (TreatmentTopicDTO) obj;
		return Objects.equals(idTreatmentTopic, other.idTreatmentTopic) && Objects.equals(status, other.status)
				&& Objects.equals(topicName, other.topicName);
	}

	@Override
	public String toString() {
		return "TreatmentTopicDTO [idTreatmentTopic=" + idTreatmentTopic + ", topicName=" + topicName + ", status="
				+ status + ", unitId=" + unitId + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", deleted=" + deleted
				+ ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate + "]";
	}
	
	
}
