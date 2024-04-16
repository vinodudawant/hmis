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
@Table(name = "ehat_follicular_study_report")
public class IVFFollicularSutdyRecord {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idehat_follicular_study_report")
	private int reportId;
	
	@Column(name = "Treatment_ID")
	private int treatmentId;
	
	@Column(name = "Patient_ID")
	private int patientId;
	
	@Column(name = "initiate_date",columnDefinition="varchar(25) default ''")
	private String initiate_date="";
	
	@Column(name = "study_date",columnDefinition="varchar(25) default ''")
	private String study_date="";
	
	@Column(name = "days",columnDefinition="varchar(25) default ''")
	private String days="";
	
	@Column(name = "rtov",columnDefinition="varchar(20) default ''")
	private String rtov="";
	
	@Column(name = "ltov",columnDefinition="varchar(20) default ''")
	private String ltov="";
	
	@Column(name = "endo",columnDefinition="varchar(20) default ''")
	private String endo="";
	
	@Column(name = "lmpdate",columnDefinition="varchar(25) default ''")
	private String lmpdate="";
	
	@Column(name = "studyComment",columnDefinition="varchar(500) default ''")
	private String studyComment="";
	
	private String pod;
	private String drug;
	private String dose;
	
	@Column(name = "del_status",columnDefinition="varchar(2) default 'N'")
	private String delStatus="N";
	
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
	private List<IVFFollicularSutdyRecord> FollicularReportList;
	
	@Transient
	private int studyid;

	public int getReportId() {
		return reportId;
	}

	public void setReportId(int reportId) {
		this.reportId = reportId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getInitiate_date() {
		return initiate_date;
	}

	public void setInitiate_date(String initiate_date) {
		this.initiate_date = initiate_date;
	}

	public String getStudy_date() {
		return study_date;
	}

	public void setStudy_date(String study_date) {
		this.study_date = study_date;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public String getRtov() {
		return rtov;
	}

	public void setRtov(String rtov) {
		this.rtov = rtov;
	}

	public String getLtov() {
		return ltov;
	}

	public void setLtov(String ltov) {
		this.ltov = ltov;
	}

	public String getEndo() {
		return endo;
	}

	public void setEndo(String endo) {
		this.endo = endo;
	}

	public String getLmpdate() {
		return lmpdate;
	}

	public void setLmpdate(String lmpdate) {
		this.lmpdate = lmpdate;
	}

	public String getStudyComment() {
		return studyComment;
	}

	public void setStudyComment(String studyComment) {
		this.studyComment = studyComment;
	}

	public String getPod() {
		return pod;
	}

	public void setPod(String pod) {
		this.pod = pod;
	}

	public String getDrug() {
		return drug;
	}

	public void setDrug(String drug) {
		this.drug = drug;
	}

	public String getDose() {
		return dose;
	}

	public void setDose(String dose) {
		this.dose = dose;
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

	public List<IVFFollicularSutdyRecord> getFollicularReportList() {
		return FollicularReportList;
	}

	public void setFollicularReportList(List<IVFFollicularSutdyRecord> follicularReportList) {
		FollicularReportList = follicularReportList;
	}



	public int getStudyid() {
		return studyid;
	}

	public void setStudyid(int studyid) {
		this.studyid = studyid;
	}

	public String getDelStatus() {
		return delStatus;
	}

	public void setDelStatus(String delStatus) {
		this.delStatus = delStatus;
	}

	

	
	

}
