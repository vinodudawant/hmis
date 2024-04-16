package com.hms.doctordesk.dto;

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
@Table(name = "opd_history_slave")
public class OPDHistorySlaveDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "history_slave_id")
	private int historySalveId;
	
	//@Column(name = "chief_complaints",columnDefinition="varchar(500) default ''")
	@Column(name = "chief_complaints",columnDefinition="LONGTEXT")
	private String chiefComplaints;
	
	@Column(name = "duration",columnDefinition="varchar(20) default 'N'")
	private String duration="0";
	
	@Column(name = "duration_type",columnDefinition="varchar(20) default 'N'")
	private String durationType="N";
	
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
	List<OPDHistorySlaveDTO>  getListOfHistorySlaveDTO;

	public int getHistorySalveId() {
		return historySalveId;
	}

	public void setHistorySalveId(int historySalveId) {
		this.historySalveId = historySalveId;
	}

	public String getChiefComplaints() {
		return chiefComplaints;
	}

	public void setChiefComplaints(String chiefComplaints) {
		this.chiefComplaints = chiefComplaints;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getDurationType() {
		return durationType;
	}

	public void setDurationType(String durationType) {
		this.durationType = durationType;
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

	public List<OPDHistorySlaveDTO> getGetListOfHistorySlaveDTO() {
		return getListOfHistorySlaveDTO;
	}

	public void setGetListOfHistorySlaveDTO(List<OPDHistorySlaveDTO> getListOfHistorySlaveDTO) {
		this.getListOfHistorySlaveDTO = getListOfHistorySlaveDTO;
	}

	@Override
	public String toString() {
		return "OPDHistorySlaveDTO [historySalveId=" + historySalveId + ", chiefComplaints=" + chiefComplaints
				+ ", duration=" + duration + ", durationType=" + durationType + ", createdDateTime=" + createdDateTime
				+ ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime=" + deletedDateTime
				+ ", unitId=" + unitId + ", userId=" + userId + ", getListOfHistorySlaveDTO=" + getListOfHistorySlaveDTO
				+ "]";
	}

	
	
	
	


}
