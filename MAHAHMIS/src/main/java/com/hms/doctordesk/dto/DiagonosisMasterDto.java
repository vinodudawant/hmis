package com.hms.doctordesk.dto;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;

@Entity
@Table(name="dd_diagonosis_master12")
public class DiagonosisMasterDto {

	@Id
	@GeneratedValue
	@Column(name="diagno_master_id")
	private int id;
	
	/*
	 * @Column(name = "treatment_id") private int treatmentId;
	 * 
	 * 
	 * @Column(name="patient_id") private Integer patientId;
	 */
	
	@OneToOne
	@JoinColumn(name="treatment_id")
	public TreatmentDto treatObj;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	public RegistrationDto patientObj;
	
	@Column(name="date")
	private String date;
	
	@Column(name="diagno_description")
	private String diagndesc;
	
	@Column(name="diago_name")
	private String diagoName;
	
	@Column(name="icd10_code")
	private String icd10_code;
	
	@Column(name="diagno_type")
	private String diagnoType;
	
	@Column(name="comment")
	private String comment;
	

	// logs
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Timestamp createdDateTime;
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Timestamp updatedDateTime;
	@Column(name = "user_id")
	private int userId;
	@Column(name = "created_by", updatable = false)
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deleted_by;
	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "dignosis_by", columnDefinition = "varchar(30) default ''")
	private String dignosisBy = "";
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDiagndesc() {
		return diagndesc;
	}
	public void setDiagndesc(String diagndesc) {
		this.diagndesc = diagndesc;
	}
	public String getDiagoName() {
		return diagoName;
	}
	public void setDiagoName(String diagoName) {
		this.diagoName = diagoName;
	}
	public String getIcd10_code() {
		return icd10_code;
	}
	public void setIcd10_code(String icd10_code) {
		this.icd10_code = icd10_code;
	}
	public String getDiagnoType() {
		return diagnoType;
	}
	public void setDiagnoType(String diagnoType) {
		this.diagnoType = diagnoType;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
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
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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
	public Timestamp getUpdatedDateTime() {
		return updatedDateTime;
	}
	public void setUpdatedDateTime(Timestamp updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
	public String getDignosisBy() {
		return dignosisBy;
	}
	public void setDignosisBy(String dignosisBy) {
		this.dignosisBy = dignosisBy;
	}
	public void setCreatedDateTime(Timestamp createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	
	
	
	
	
	
}
