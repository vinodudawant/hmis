package com.hms.doctordesk.dto;

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

@SuppressWarnings("deprecation")
@Entity
@Table(name="dd_notes")
public class NotesDto implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idnotes")
	private int notesId;
	
	@Column(name = "notes_data")
	private String notesData;
	
	@Column(name="date")
	private String date;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	

	@Column(name="patient_id")
	private int patientId;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	private Integer treatment_id;
	
	private long countNotes;
	
	@Transient
	private List<NotesDto> lstnotes;

	public int getNotesId() {
		return notesId;
	}

	public void setNotesId(int notesId) {
		this.notesId = notesId;
	}

	public String getNotesData() {
		return notesData;
	}

	public void setNotesData(String notesData) {
		this.notesData = notesData;
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

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
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

	public List<NotesDto> getLstnotes() {
		return lstnotes;
	}

	public void setLstnotes(List<NotesDto> lstnotes) {
		this.lstnotes = lstnotes;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public long getCountNotes() {
		return countNotes;
	}

	public void setCountNotes(long countNotes) {
		this.countNotes = countNotes;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
}
