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

@Entity
@Table(name="ivf_doctor_round_info")
public class IvfDoctorRoundDto implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "doctor_round_id")
	private int doctorRoundid;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "ivf_treatment_id")
	private int ivf_treatmentId;
	
	@Column(name = "time",columnDefinition="varchar(50) default ''")
	private String time="";
	
	@Column(name = "tmName",columnDefinition="varchar(500) default ''")
	private String tmName="";
	
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTmNameIvfDoctorName() {
		return tmNameIvfDoctorName;
	}

	public void setTmNameIvfDoctorName(String tmNameIvfDoctorName) {
		this.tmNameIvfDoctorName = tmNameIvfDoctorName;
	}

	@Column(name = "dr_round_date",columnDefinition="varchar(10) default ''")
	private String date="";

	@Column(name = "tmName_ivfDoctorName",columnDefinition="varchar(500) default ''")
	private String tmNameIvfDoctorName="";
	
	@Column(name = "clinicalNotes",columnDefinition="varchar(500) default ''")
	private String clinicalNotes ="";
	
	@Column(name = "investigationAd",columnDefinition="varchar(500) default ''")
	private String investigationAd ="";
	
	@Column(name = "roundBy",columnDefinition="varchar(500) default ''")
	private String roundBy ="";
	
	@Column(name = "roundBy_doctorName",columnDefinition="varchar(500) default ''")
	private String roundByDoctorName ="";
	
	public String getRoundByDoctorName() {
		return roundByDoctorName;
	}

	public void setRoundByDoctorName(String roundByDoctorName) {
		this.roundByDoctorName = roundByDoctorName;
	}


	@Column(name = "batchcreation_id",columnDefinition="int default 0")
	private int batchCreationId=0;
	
	@Column(name = "coupled_id",columnDefinition="int default 0")
	private int coupleId=0;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name = "created_by")
	private int createdBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;	

	@Column(name = "updated_by")
	private int updatedBy;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	

	@Column(name = "deleted_by")
	private int deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Transient
	private List<IvfDoctorRoundDto> listDoctorRound;
	
	public int getDoctorRoundid() {
		return doctorRoundid;
	}

	public void setDoctorRoundid(int doctorRoundid) {
		this.doctorRoundid = doctorRoundid;
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

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getTmName() {
		return tmName;
	}

	public void setTmName(String tmName) {
		this.tmName = tmName;
	}

	public String getClinicalNotes() {
		return clinicalNotes;
	}

	public void setClinicalNotes(String clinicalNotes) {
		this.clinicalNotes = clinicalNotes;
	}

	public String getInvestigationAd() {
		return investigationAd;
	}

	public void setInvestigationAd(String investigationAd) {
		this.investigationAd = investigationAd;
	}

	public String getRoundBy() {
		return roundBy;
	}

	public void setRoundBy(String roundBy) {
		this.roundBy = roundBy;
	}

	public int getBatchCreationId() {
		return batchCreationId;
	}

	public void setBatchCreationId(int batchCreationId) {
		this.batchCreationId = batchCreationId;
	}

	public int getCoupleId() {
		return coupleId;
	}

	public void setCoupleId(int coupleId) {
		this.coupleId = coupleId;
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

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public int getIvf_treatmentId() {
		return ivf_treatmentId;
	}

	public void setIvf_treatmentId(int ivf_treatmentId) {
		this.ivf_treatmentId = ivf_treatmentId;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
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

	public List<IvfDoctorRoundDto> getListDoctorRound() {
		return listDoctorRound;
	}

	public void setListDoctorRound(List<IvfDoctorRoundDto> listDoctorRound) {
		this.listDoctorRound = listDoctorRound;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	@Override
	public String toString() {
		return "DoctorRoundDto [doctorRoundid=" + doctorRoundid + ", patientId=" + patientId + ", treatmentId="
				+ treatmentId + ", time=" + time + ", tmName=" + tmName + ", clinicalNotes=" + clinicalNotes
				+ ", investigationAd=" + investigationAd + ", roundBy=" + roundBy + ", batchCreationId="
				+ batchCreationId + ", coupleId=" + coupleId + ", unitId=" + unitId + ", userId=" + userId
				+ ", createdBy=" + createdBy + ", createdDateTime=" + createdDateTime + ", updatedBy=" + updatedBy
				+ ", updatedDateTime=" + updatedDateTime + ", deletedDateTime=" + deletedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", listDoctorRound=" + listDoctorRound + "]";
	}

}
