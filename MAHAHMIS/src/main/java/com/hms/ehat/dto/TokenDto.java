package com.hms.ehat.dto;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "token_number")
public class TokenDto {
	
	@Id
	@GeneratedValue
	@Column(name = "tokenId")
	private Integer tokenId;
	
 	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "department_id")
	private int departmentId;
	
	@Column(name = "speciality_id")
	private int specialityId;
	
	@Column(name = "doctor_id")
	private String doctorIdList;
	
	@Column(name = "token",columnDefinition="int default 0")
	private int token;
	
	@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
	private String tFlag;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	//Added by Laxman for display LED on 01-Jan-2018.
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "cancel_date_time")
	private Date cancelDateTime;

	@Column(name = "send_by")
	private String sendBy;
	
	@Column(name = "queue_status")
	private String queueStatus;
	
	@Column(name = "narration")
	private String narration;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "checkup_done_date_time")
	private Date checkupDoneDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "app_date")
	private Date appDate;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "cancel_by ",columnDefinition="varchar(10) default '0'")
	private String cancelBy="0";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "send_date_time ")
	private Date sendDateTime;
	
	@CreationTimestamp
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "token_gen_date")
	private Date tokenGenDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public int getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(int specialityId) {
		this.specialityId = specialityId;
	}

	public String getDoctorIdList() {
		return doctorIdList;
	}

	public void setDoctorIdList(String doctorIdList) {
		this.doctorIdList = doctorIdList;
	}

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getCancelDateTime() {
		return cancelDateTime;
	}

	public void setCancelDateTime(Date cancelDateTime) {
		this.cancelDateTime = cancelDateTime;
	}

	public String getSendBy() {
		return sendBy;
	}

	public void setSendBy(String sendBy) {
		this.sendBy = sendBy;
	}

	public String getQueueStatus() {
		return queueStatus;
	}

	public void setQueueStatus(String queueStatus) {
		this.queueStatus = queueStatus;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public Date getCheckupDoneDateTime() {
		return checkupDoneDateTime;
	}

	public void setCheckupDoneDateTime(Date checkupDoneDateTime) {
		this.checkupDoneDateTime = checkupDoneDateTime;
	}

	public Date getAppDate() {
		return appDate;
	}

	public void setAppDate(Date appDate) {
		this.appDate = appDate;
	}

	public int getUnitId() {
		return unitId;
	}
	
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Integer getTokenId() {
		return tokenId;
	}

	public void setTokenId(Integer tokenId) {
		this.tokenId = tokenId;
	}

	public String getCancelBy() {
		return cancelBy;
	}

	public void setCancelBy(String cancelBy) {
		this.cancelBy = cancelBy;
	}

	public Date getSendDateTime() {
		return sendDateTime;
	}

	public void setSendDateTime(Date sendDateTime) {
		this.sendDateTime = sendDateTime;
	}

	public Date getTokenGenDate() {
		return tokenGenDate;
	}

	public void setTokenGenDate(Date tokenGenDate) {
		this.tokenGenDate = tokenGenDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	
	
}
	