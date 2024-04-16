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
@Table(name="ivf_calender_info")
public class IVFCalenderInfoDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ivf_calender_id")
	private Integer ivfCalenderId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "master_mollicular_id",columnDefinition="int default 0")
	private int masterMollicularId=0;
	
	@Column(name = "day_count",columnDefinition="varchar(20) default ''")
	private String dayCount="";
	
	@Column(name = "satrt_date",columnDefinition="varchar(20) default ''")
	private String startDate="";
	
	@Column(name = "days",columnDefinition="varchar(20) default ''")
	private String days="";
	
	@Column(name = "end_date",columnDefinition="varchar(20) default ''")
	private String endDate="";
	
	@Column(name = "drug",columnDefinition="varchar(20) default '-'")
	private String drug="-";
	
	@Column(name = "dose",columnDefinition="varchar(20) default ''")
	private String dose="";
	
	@Column(name = "lmp_date_ivf",columnDefinition="varchar(20) default ''")
	private String lmpdtIvf="";
	
	
	
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
	
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<IVFCalenderInfoDTO>  getListOfIvfCalenderInfo;

	

	public Integer getIvfCalenderId() {
		return ivfCalenderId;
	}

	public void setIvfCalenderId(Integer ivfCalenderId) {
		this.ivfCalenderId = ivfCalenderId;
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

	public int getMasterMollicularId() {
		return masterMollicularId;
	}

	public void setMasterMollicularId(int masterMollicularId) {
		this.masterMollicularId = masterMollicularId;
	}

	public String getDayCount() {
		return dayCount;
	}

	public void setDayCount(String dayCount) {
		this.dayCount = dayCount;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
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

	public List<IVFCalenderInfoDTO> getGetListOfIvfCalenderInfo() {
		return getListOfIvfCalenderInfo;
	}

	public void setGetListOfIvfCalenderInfo(
			List<IVFCalenderInfoDTO> getListOfIvfCalenderInfo) {
		this.getListOfIvfCalenderInfo = getListOfIvfCalenderInfo;
	}

	public String getLmpdtIvf() {
		return lmpdtIvf;
	}

	public void setLmpdtIvf(String lmpdtIvf) {
		this.lmpdtIvf = lmpdtIvf;
	}
	
	
	
	
	
}
