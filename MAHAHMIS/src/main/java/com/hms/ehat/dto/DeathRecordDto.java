package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
@Table(name = "death_record_master")
public class DeathRecordDto {

	@Id
	@GeneratedValue
	@Column(name = "death_id")
	private int deathId;

	@Column(name = "narration")
	private String narration;

	@Column(name = "patientId")
	private int patientId;

	@Column(name = "docid")
	private int docId;

	@Column(name = "deleted")
	private String deleted = "N";

	@Column(name = "created_by", updatable = false)
	private int createdBy;

	@Column(name = "updated_by")
	private int updatedBy;

	@Column(name = "deleted_by")
	private int deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Column(name = "unit_id")
	private int unitId; 
	
	@Column(name = "death_flag")
	private String deathFlag;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "death_date")
	private Date deathDate;
	

	@Column(name = "death_time")
	private String  deathTime;
	
	
	
	@Transient
	private List<DeathRecordDto> DeathReclst;

	public int getDeathId() {
		return deathId;
	}

	public void setDeathId(int deathId) {
		this.deathId = deathId;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
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

	public List<DeathRecordDto> getDeathReclst() {
		return DeathReclst;
	}

	public void setDeathReclst(List<DeathRecordDto> deathReclst) {
		DeathReclst = deathReclst;
	}

	public int getDocId() {
		return docId;
	}

	public void setDocId(int docId) {
		this.docId = docId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeathFlag() {
		return deathFlag;
	}

	public void setDeathFlag(String deathFlag) {
		this.deathFlag = deathFlag;
	}

	public Date getDeathDate() {
		return deathDate;
	}

	public void setDeathDate(Date deathDate) {
		this.deathDate = deathDate;
	}

	public String getDeathTime() {
		return deathTime;
	}

	public void setDeathTime(String deathTime) {
		this.deathTime = deathTime;
	}
	

	
}
